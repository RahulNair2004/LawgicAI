import os
import logging
from flask import Flask
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Enable CORS for all routes
CORS(app, origins=["*"], supports_credentials=True)

# Import configuration
from config import Config
app.config.from_object(Config)

# Register API blueprints
from api.upload import upload_bp
from api.chat import chat_bp

app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(chat_bp, url_prefix='/api')

# Import services to initialize them
from services.vector_store import VectorStore
from services.rag_pipeline import RAGPipeline

# Initialize services
vector_store = VectorStore()
rag_pipeline = RAGPipeline(vector_store)

# Store references in app context
app.vector_store = vector_store
app.rag_pipeline = rag_pipeline

@app.route('/')
def index():
    """Serve the main page"""
    return app.send_static_file('index.html')

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "AI Legal Assistant API is running"}

@app.errorhandler(404)
def not_found(error):
    return {"error": "Endpoint not found"}, 404

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Internal server error: {str(error)}")
    return {"error": "Internal server error"}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
