import os
import logging
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from datetime import datetime
from utils.file_validator import FileValidator
from services.pdf_processor import PDFProcessor

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    """Handle PDF file uploads and process them"""
    try:
        # Check if file is present in request
        if 'file' not in request.files:
            return jsonify({
                'error': 'No file provided in request'
            }), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({
                'error': 'No file selected'
            }), 400
        
        # Get session ID (optional, for multi-user support)
        session_id = request.form.get('session_id', 'default')
        
        # Validate file
        validator = FileValidator()
        is_valid, error_message = validator.validate_pdf(file)
        
        if not is_valid:
            return jsonify({
                'error': error_message
            }), 400
        
        # Secure the filename
        filename = secure_filename(file.filename)
        if not filename:
            filename = f"document_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        
        # Save file temporarily
        upload_folder = current_app.config['UPLOAD_FOLDER']
        filepath = os.path.join(upload_folder, f"{session_id}_{filename}")
        file.save(filepath)
        
        # Process the PDF
        pdf_processor = PDFProcessor()
        documents = pdf_processor.process_pdf(filepath)
        
        if not documents:
            # Clean up file
            os.remove(filepath)
            return jsonify({
                'error': 'Failed to extract text from PDF. The file may be corrupted or contain only images.'
            }), 400
        
        # Store documents in vector store
        vector_store = current_app.vector_store
        document_ids = vector_store.add_documents(documents, session_id)
        
        # Clean up temporary file
        os.remove(filepath)
        
        logging.info(f"Successfully processed PDF: {filename} for session: {session_id}")
        
        return jsonify({
            'message': f'Successfully processed document: {filename}',
            'filename': filename,
            'session_id': session_id,
            'document_count': len(documents),
            'document_ids': document_ids,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        # Clean up file if it exists
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        
        logging.exception("Error in upload endpoint")

        return jsonify({
            'error': f'An error occurred while processing the file: {str(e)}'
        }), 500

@upload_bp.route('/upload/status', methods=['GET'])
def upload_status():
    """Get upload status and configuration"""
    try:
        return jsonify({
            'max_file_size': current_app.config['MAX_CONTENT_LENGTH'],
            'allowed_extensions': list(current_app.config['ALLOWED_EXTENSIONS']),
            'upload_folder': current_app.config['UPLOAD_FOLDER']
        })
        
    except Exception as e:
        logging.error(f"Error getting upload status: {str(e)}")
        return jsonify({
            'error': f'An error occurred while getting upload status: {str(e)}'
        }), 500

@upload_bp.route('/documents', methods=['GET'])
def list_documents():
    """List all documents for a session"""
    try:
        session_id = request.args.get('session_id', 'default')
        
        vector_store = current_app.vector_store
        documents = vector_store.list_documents(session_id)
        
        return jsonify({
            'session_id': session_id,
            'documents': documents,
            'count': len(documents)
        })
        
    except Exception as e:
        logging.error(f"Error listing documents: {str(e)}")
        return jsonify({
            'error': f'An error occurred while listing documents: {str(e)}'
        }), 500

@upload_bp.route('/documents/<document_id>', methods=['DELETE'])
def delete_document():
    """Delete a specific document"""
    try:
        session_id = request.args.get('session_id', 'default')
        document_id = request.view_args['document_id']
        
        vector_store = current_app.vector_store
        success = vector_store.delete_document(document_id, session_id)
        
        if success:
            return jsonify({
                'message': f'Document {document_id} deleted successfully',
                'document_id': document_id,
                'session_id': session_id
            })
        else:
            return jsonify({
                'error': f'Document {document_id} not found'
            }), 404
        
    except Exception as e:
        logging.error(f"Error deleting document: {str(e)}")
        return jsonify({
            'error': f'An error occurred while deleting document: {str(e)}'
        }), 500
