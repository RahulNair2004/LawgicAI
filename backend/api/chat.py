import logging
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages and return AI responses"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'Missing message in request body'
            }), 400
        
        user_message = data['message'].strip()
        if not user_message:
            return jsonify({
                'error': 'Message cannot be empty'
            }), 400
        
        # Get session ID for document context (optional)
        session_id = data.get('session_id', 'default')
        
        # Get RAG pipeline from app context
        rag_pipeline = current_app.rag_pipeline
        
        # Check if there are any documents in the vector store for this session
        has_documents = rag_pipeline.has_documents(session_id)
        
        if has_documents:
            # Use RAG pipeline for document-based responses
            logging.info(f"Using RAG pipeline for session {session_id}")
            response = rag_pipeline.query_with_context(user_message, session_id)
        else:
            # Use general legal knowledge
            logging.info("Using general legal knowledge - no documents available")
            response = rag_pipeline.query_general(user_message)
        
        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat(),
            'has_context': has_documents,
            'session_id': session_id
        })
        
    except Exception as e:
        logging.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': f'An error occurred while processing your request: {str(e)}'
        }), 500

@chat_bp.route('/chat/clear', methods=['POST'])
def clear_chat():
    """Clear chat history and documents for a session"""
    try:
        data = request.get_json() or {}
        session_id = data.get('session_id', 'default')
        
        # Clear documents from vector store for this session
        vector_store = current_app.vector_store
        vector_store.clear_session(session_id)
        
        return jsonify({
            'message': f'Chat history and documents cleared for session {session_id}',
            'session_id': session_id
        })
        
    except Exception as e:
        logging.error(f"Error clearing chat: {str(e)}")
        return jsonify({
            'error': f'An error occurred while clearing chat: {str(e)}'
        }), 500

@chat_bp.route('/chat/status', methods=['GET'])
def chat_status():
    """Get status of chat system and available documents"""
    try:
        session_id = request.args.get('session_id', 'default')
        
        vector_store = current_app.vector_store
        rag_pipeline = current_app.rag_pipeline
        
        # Get document count for session
        doc_count = vector_store.get_document_count(session_id)
        has_documents = rag_pipeline.has_documents(session_id)
        
        return jsonify({
            'status': 'active',
            'session_id': session_id,
            'document_count': doc_count,
            'has_documents': has_documents,
            'model_available': True 
        })
        
    except Exception as e:
        logging.error(f"Error getting chat status: {str(e)}")
        return jsonify({
            'error': f'An error occurred while getting status: {str(e)}'
        }), 500
