import os
import pickle
import logging
from typing import List, Dict, Any
import faiss
import numpy as np
from langchain.schema import Document
from langchain_community.embeddings import OllamaEmbeddings
from datetime import datetime

class VectorStore:
    """FAISS-based vector store for document embeddings"""

    def __init__(self, embedding_model: str = "nomic-embed-text", base_url: str = "http://localhost:11434"):
        self.embedding_model = embedding_model
        self.base_url = base_url
        self.sessions: Dict[str, Dict[str, Any]] = {}
        self.vector_store_path = "vector_store"
        os.makedirs(self.vector_store_path, exist_ok=True)

        try:
            self.embeddings = OllamaEmbeddings(model=embedding_model, base_url=base_url)
            logging.info(f"Initialized Ollama embeddings with model: {embedding_model}")
        except Exception:
            logging.exception("Failed to initialize Ollama embeddings. Using fallback.")
            self.embeddings = None

        self._load_from_disk()

    def _get_session_data(self, session_id: str) -> Dict[str, Any]:
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                'documents': [],
                'document_embeddings': [],
                'index': None,
                'created_at': datetime.now().isoformat()
            }
        return self.sessions[session_id]

    def _generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        try:
            if self.embeddings:
                embeddings = self.embeddings.embed_documents(texts)
            else:
                embeddings = []
                for text in texts:
                    emb = [0.0] * 384
                    for i, char in enumerate(text.lower()[:384]):
                        emb[i] = ord(char) / 1000.0
                    embeddings.append(emb)
            max_len = max(len(e) for e in embeddings)
            embeddings = [e + [0] * (max_len - len(e)) for e in embeddings]
            return embeddings
        except Exception:
            logging.exception("Failed to generate embeddings, using fallback.")
            return [[0.1] * 384 for _ in texts]

    def add_documents(self, documents: List[Document], session_id: str = "default") -> List[str]:
        if not documents:
            raise ValueError("No documents provided for addition.")

        session_data = self._get_session_data(session_id)
        texts = [doc.page_content for doc in documents]
        embeddings = self._generate_embeddings(texts)
        embedding_array = np.array(embeddings, dtype=np.float32)
        dim = embedding_array.shape[1]

        if session_data['index'] is None:
            session_data['index'] = faiss.IndexFlatL2(dim)
            logging.info(f"Created FAISS index (dim={dim})")
        session_data['index'].add(embedding_array)

        document_ids = []
        for i, doc in enumerate(documents):
            doc_id = f"{session_id}_{len(session_data['documents']) + i}_{int(datetime.now().timestamp())}"
            doc.metadata.update({'document_id': doc_id, 'session_id': session_id})
            document_ids.append(doc_id)

        session_data['documents'].extend(documents)
        session_data['document_embeddings'].extend(embeddings)
        self._save_to_disk()
        logging.info(f"Added {len(documents)} documents to session {session_id}")
        return document_ids

    def similarity_search(self, query: str, session_id: str = "default", k: int = 4) -> List[Document]:
        try:
            session_data = self._get_session_data(session_id)
            if not session_data['documents'] or session_data['index'] is None:
                logging.warning(f"No documents found for session {session_id}")
                return []

            query_embedding = self._generate_embeddings([query])[0]
            query_vector = np.array([query_embedding], dtype=np.float32)
            scores, indices = session_data['index'].search(query_vector, min(k, len(session_data['documents'])))

            results = []
            for i, idx in enumerate(indices[0]):
                if idx < len(session_data['documents']):
                    doc = session_data['documents'][idx]
                    doc.metadata['similarity_score'] = float(scores[0][i])
                    results.append(doc)
            return results
        except Exception:
            logging.exception("Similarity search failed")
            return []

    def list_documents(self, session_id: str = "default") -> List[Dict[str, Any]]:
        session_data = self._get_session_data(session_id)
        return [
            {
                'document_id': doc.metadata.get('document_id', 'unknown'),
                'source': doc.metadata.get('source', 'unknown'),
                'page': doc.metadata.get('page', 0),
                'chunk_index': doc.metadata.get('chunk_index', 0),
                'content_preview': (doc.page_content[:100] + "...") if len(doc.page_content) > 100 else doc.page_content
            }
            for doc in session_data['documents']
        ]

    def delete_document(self, document_id: str, session_id: str = "default") -> bool:
        try:
            session_data = self._get_session_data(session_id)
            doc_idx = next((i for i, d in enumerate(session_data['documents']) if d.metadata.get('document_id') == document_id), None)
            if doc_idx is None:
                return False

            del session_data['documents'][doc_idx]
            del session_data['document_embeddings'][doc_idx]

            if session_data['documents']:
                emb_array = np.array(session_data['document_embeddings'], dtype=np.float32)
                dim = emb_array.shape[1]
                index = faiss.IndexFlatL2(dim)
                index.add(emb_array)
                session_data['index'] = index
            else:
                session_data['index'] = None

            self._save_to_disk()
            logging.info(f"Deleted document {document_id} from session {session_id}")
            return True
        except Exception:
            logging.exception("Failed to delete document")
            return False

    def clear_session(self, session_id: str = "default"):
        if session_id in self.sessions:
            del self.sessions[session_id]
            self._save_to_disk()
            logging.info(f"Cleared session {session_id}")

    def _save_to_disk(self):
        try:
            save_data = {}

            for sid, s in self.sessions.items():
                save_data[sid] = {
                    'documents': [
                        {
                            'page_content': d.page_content,
                            'metadata': d.metadata
                        }
                        for d in s['documents']
                    ],
                    'document_embeddings': s['document_embeddings'],
                    'created_at': s['created_at']
                }

            with open(os.path.join(self.vector_store_path, 'sessions.pkl'), 'wb') as f:
                pickle.dump(save_data, f)

            logging.debug("Vector store saved to disk")

        except Exception as e:
            logging.exception("Failed to save vector store to disk")

    def _load_from_disk(self):
        try:
            path = os.path.join(self.vector_store_path, 'sessions.pkl')
            if not os.path.exists(path):
                return
    
            with open(path, 'rb') as f:
                save_data = pickle.load(f)
    
            for sid, s in save_data.items():
                documents = [
                    Document(
                        page_content=d['page_content'],
                        metadata=d['metadata']
                    )
                    for d in s['documents']
                ]
    
                embeddings = s['document_embeddings']
                emb_array = np.array(embeddings, dtype=np.float32)
    
                index = None
                if len(embeddings) > 0:
                    dim = emb_array.shape[1]
                    index = faiss.IndexFlatL2(dim)
                    index.add(emb_array)
    
                self.sessions[sid] = {
                    'documents': documents,
                    'document_embeddings': embeddings,
                    'index': index,
                    'created_at': s['created_at']
                }
    
            logging.info(f"Loaded {len(self.sessions)} sessions from disk")
    
        except Exception:
            logging.exception("Failed to load vector store from disk")
    
    def has_documents(self, session_id: str = "default") -> bool:
        """Check if a session has any documents"""
        session_data = self._get_session_data(session_id)
        return len(session_data['documents']) > 0