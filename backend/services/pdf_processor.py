import logging
from typing import List
from langchain_community.document_loaders import PDFPlumberLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

class PDFProcessor:
    """Handles PDF processing, text extraction, and chunking."""

    def __init__(self, chunk_size: int = 1000, chunk_overlap: int = 200):
        """
        Initialize PDF processor with chunking parameters.

        Args:
            chunk_size: Maximum size of text chunks
            chunk_overlap: Number of overlapping characters between chunks
        """
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )

    def process_pdf(self, file_path: str) -> List[Document]:
        """
        Process a PDF file and return chunked documents for vector storage.

        Args:
            file_path: Path to the PDF file

        Returns:
            List of Document objects with metadata for all pages
        """
        try:
            logging.info(f"Processing PDF: {file_path}")
            loader = PDFPlumberLoader(file_path)
            documents = loader.load()

            if not documents:
                logging.warning(f"No content extracted from PDF: {file_path}")
                return []

            # Add page-level metadata
            for i, doc in enumerate(documents):
                doc.metadata.update({
                    "source": file_path,
                    "page": i + 1,
                    "document_type": "pdf",
                    "chunk_id": f"{file_path}_page_{i+1}"
                })

            # Split pages into chunks
            chunked_documents = self.text_splitter.split_documents(documents)

            # Add chunk-level metadata
            for i, chunk in enumerate(chunked_documents):
                chunk.metadata.update({
                    "chunk_index": i,
                    "total_chunks": len(chunked_documents)
                })

            logging.info(f"Created {len(chunked_documents)} chunks from PDF")
            return chunked_documents

        except Exception:
            logging.exception(f"Failed to process PDF: {file_path}")
            raise Exception(f"Failed to process PDF: {file_path}")

    def extract_text_only(self, file_path: str) -> str:
        """
        Extract raw text from PDF without chunking.

        Args:
            file_path: Path to the PDF file

        Returns:
            Full raw text content of the PDF
        """
        try:
            loader = PDFPlumberLoader(file_path)
            documents = loader.load()
            if not documents:
                return ""
            return "\n\n".join([doc.page_content for doc in documents])
        except Exception:
            logging.exception(f"Failed to extract text from PDF: {file_path}")
            raise Exception(f"Failed to extract text from PDF: {file_path}")

    def get_pdf_metadata(self, file_path: str) -> dict:
        """
        Extract metadata from PDF.

        Args:
            file_path: Path to the PDF file

        Returns:
            Dictionary with total pages, source path, and first page metadata
        """
        try:
            loader = PDFPlumberLoader(file_path)
            documents = loader.load()
            if not documents:
                return {}

            metadata = {
                "total_pages": len(documents),
                "file_path": file_path,
                "document_type": "pdf"
            }

            if documents[0].metadata:
                metadata.update(documents[0].metadata)

            return metadata
        except Exception:
            logging.exception(f"Failed to extract metadata from PDF: {file_path}")
            return {}
