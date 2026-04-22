import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Application configuration"""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SESSION_SECRET', 'dev-secret-key')
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    # File upload settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'uploads')
    ALLOWED_EXTENSIONS = {'pdf'}
    
    # AI/ML settings
    GROQ_API_KEY = os.environ.get('GROQ_API_KEY', 'default_groq_key')
    MODEL_NAME = os.environ.get('MODEL_NAME', 'deepseek-r1-distill-llama-70b')
    
    # Vector store settings
    EMBEDDING_MODEL = os.environ.get('EMBEDDING_MODEL', 'llama3')
    VECTOR_STORE_PATH = os.environ.get('VECTOR_STORE_PATH', 'vector_store')
    CHUNK_SIZE = int(os.environ.get('CHUNK_SIZE', '1000'))
    CHUNK_OVERLAP = int(os.environ.get('CHUNK_OVERLAP', '200'))
    
    # Ollama settings
    OLLAMA_BASE_URL = os.environ.get('OLLAMA_BASE_URL', 'http://localhost:11434')
    
    @staticmethod
    def init_app(app):
        """Initialize app with config"""
        # Create upload directory if it doesn't exist
        upload_dir = os.path.join(os.getcwd(), Config.UPLOAD_FOLDER)
        os.makedirs(upload_dir, exist_ok=True)
        
        # Create vector store directory if it doesn't exist
        vector_dir = os.path.join(os.getcwd(), Config.VECTOR_STORE_PATH)
        os.makedirs(vector_dir, exist_ok=True)
