import os
import logging
import re
from typing import List, Optional
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from services.vector_store import VectorStore

class RAGPipeline:
    """RAG (Retrieval-Augmented Generation) pipeline using Groq"""
    
    def __init__(self, vector_store: VectorStore):
        """
        Initialize RAG pipeline
        
        Args:
            vector_store: Vector store instance for document retrieval
        """
        self.vector_store = vector_store
        
        # Initialize Groq chat model
        api_key = os.environ.get('GROQ_API_KEY', 'default_groq_key')
        model_name = os.environ.get('MODEL_NAME', 'llama-3.3-70b-versatile')
        
        try:
            self.llm = ChatGroq(
                groq_api_key=api_key,
                model_name=model_name,
                temperature=0.4,
                max_tokens=2048
            )
            logging.info(f"Initialized Groq LLM with model: {model_name}")
        except Exception as e:
            logging.error(f"Failed to initialize Groq LLM: {str(e)}")
            raise Exception(f"Failed to initialize AI model: {str(e)}")
        
        # Define prompts
        self.document_qa_prompt = PromptTemplate(
            input_variables=["context", "question"],
            template="""
        You are a legal assistant answering STRICTLY from the provided document context.

        RULES:
        - Answer ONLY using the document context below.
        - If the requested article or information is NOT present, say:
          "The provided document does not contain this information."
        - DO NOT use general legal knowledge.
        - DO NOT guess or infer missing content.

        Document Context:
        {context}

        Question:
        {question}

        Answer (cite article/page if applicable):

        IMPORTANT:
        End with this disclaimer exactly:
        "This response is for informational purposes only and not legal advice."
        """
        )

        
        self.general_qa_prompt = PromptTemplate(
            input_variables=["question"],
            template="""You are an expert legal assistant. Answer the following legal question with accurate, 
            helpful information. Provide clear explanations and relevant legal concepts.

            IMPORTANT: Always include a disclaimer that this is for informational purposes only and not legal advice. 
            Recommend consulting with a qualified attorney for specific legal matters.

            Question: {question}

            Legal Analysis:"""
        )
    
    def query_with_context(self, question: str, session_id: str = "default", k: int = 4) -> str:
        """
        Query with document context using RAG
        
        Args:
            question: User question
            session_id: Session identifier for document retrieval
            k: Number of relevant documents to retrieve
            
        Returns:
            AI response based on document context
        """
        try:
            # Retrieve relevant documents
            article_number = self._extract_article_number(question)
            
            if article_number is not None and (article_number < 1 or article_number > 30):
                return (
                    f"Article {article_number} does not exist in the provided document "
                    "(Universal Declaration of Human Rights).\n\n"
                    "Disclaimer: This response is for informational purposes only and not legal advice."
                )

            relevant_docs = self.vector_store.similarity_search(question, session_id, k)


            if not relevant_docs:
                logging.warning(f"No relevant documents found for question in session {session_id}")
                return self.query_general(question)
            
            # Combine document content for context
            context = "\n\n".join([
                f"Document {i+1} (Page {doc.metadata.get('page', 'unknown')}):\n{doc.page_content}"
                for i, doc in enumerate(relevant_docs)
            ])
            
            # Format prompt with context
            formatted_prompt = self.document_qa_prompt.format(
                context=context,
                question=question
            )
            
            # Generate response
            response = self.llm.invoke(formatted_prompt)
            
            # Extract content from response
            if hasattr(response, 'content'):
                answer = response.content
            else:
                answer = str(response)
            
            # Add information about sources
            source_info = self._format_source_info(relevant_docs)
            full_response = f"{answer}\n\n---\n**Sources:** {source_info}"
            
            logging.info(f"Generated RAG response for session {session_id}")
            return full_response
            
        except Exception as e:
            logging.error(f"Error in RAG query: {str(e)}")
            return f"I apologize, but I encountered an error while processing your question: {str(e)}. Please try again."
    
    def query_general(self, question: str) -> str:
        """
        Query without document context for general legal questions
        
        Args:
            question: User question
            
        Returns:
            AI response based on general legal knowledge
        """
        try:
            # Format prompt
            formatted_prompt = self.general_qa_prompt.format(question=question)
            
            # Generate response
            response = self.llm.invoke(formatted_prompt)
            
            # Extract content from response
            if hasattr(response, 'content'):
                answer = response.content
            else:
                answer = str(response)
            
            logging.info("Generated general legal response")
            return answer
            
        except Exception as e:
            logging.error(f"Error in general query: {str(e)}")
            return f"I apologize, but I encountered an error while processing your question: {str(e)}. Please try again."
    
    def has_documents(self, session_id: str = "default") -> bool:
        """Check if session has documents available for RAG"""
        return self.vector_store.has_documents(session_id)
    
    def _format_source_info(self, documents: List) -> str:
        """Format source information from retrieved documents"""
        if not documents:
            return "No specific documents referenced."
        
        sources = set()
        for doc in documents:
            source = doc.metadata.get('source', 'Unknown document')
            page = doc.metadata.get('page', 'Unknown page')
            sources.add(f"{os.path.basename(source)} (Page {page})")
        
        return ", ".join(sorted(sources))
    import re

    def _extract_article_number(self, question: str):
        match = re.search(r'article\s+(\d+)', question.lower())
        if match:
            return int(match.group(1))
        return None

    def get_document_summary(self, session_id: str = "default") -> str:
        """Get a summary of available documents in the session"""
        try:
            if not self.has_documents(session_id):
                return "No documents available in this session."
            
            # Get all documents for the session
            documents = self.vector_store.list_documents(session_id)
            
            if not documents:
                return "No documents available in this session."
            
            # Create summary
            doc_sources = set()
            total_chunks = len(documents)
            
            for doc in documents:
                source = doc.get('source', 'Unknown')
                doc_sources.add(os.path.basename(source))
            
            summary = f"Available documents: {', '.join(sorted(doc_sources))} ({total_chunks} total sections)"
            return summary
            
        except Exception as e:
            logging.error(f"Error creating document summary: {str(e)}")
            return "Error retrieving document information."
