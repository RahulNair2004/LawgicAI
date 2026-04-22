import os
import logging
from typing import Tuple
from werkzeug.datastructures import FileStorage

class FileValidator:
    """Validates uploaded files for security and format requirements"""
    
    def __init__(self, max_size_mb: int = 16):
        """
        Initialize file validator
        
        Args:
            max_size_mb: Maximum file size in megabytes
        """
        self.max_size_bytes = max_size_mb * 1024 * 1024
        self.allowed_extensions = {'pdf'}
        self.allowed_mime_types = {'application/pdf'}
    
    def validate_pdf(self, file: FileStorage) -> Tuple[bool, str]:
        """
        Validate PDF file upload
        
        Args:
            file: Uploaded file object
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        try:
            # Check if file exists
            if not file:
                return False, "No file provided"
            
            # Check filename
            if not file.filename:
                return False, "No filename provided"
            
            # Check file extension
            if not self._has_allowed_extension(file.filename):
                return False, f"Invalid file type. Only PDF files are allowed."
            
            # Check MIME type
            if file.content_type not in self.allowed_mime_types:
                return False, f"Invalid MIME type: {file.content_type}. Expected: application/pdf"
            
            # Check file size
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)  # Reset file pointer
            
            if file_size > self.max_size_bytes:
                size_mb = file_size / (1024 * 1024)
                max_mb = self.max_size_bytes / (1024 * 1024)
                return False, f"File too large: {size_mb:.1f}MB. Maximum allowed: {max_mb}MB"
            
            # Check if file is empty
            if file_size == 0:
                return False, "File is empty"
            
            # Basic PDF header check
            file.seek(0)
            header = file.read(10)
            file.seek(0)  # Reset file pointer
            
            if not header.startswith(b'%PDF-'):
                return False, "Invalid PDF file format"
            
            logging.info(f"File validation passed: {file.filename} ({file_size} bytes)")
            return True, "File is valid"
            
        except Exception as e:
            logging.error(f"Error validating file: {str(e)}")
            return False, f"File validation error: {str(e)}"
    
    def _has_allowed_extension(self, filename: str) -> bool:
        """Check if filename has allowed extension"""
        if '.' not in filename:
            return False
        
        extension = filename.rsplit('.', 1)[1].lower()
        return extension in self.allowed_extensions
    
    def get_file_info(self, file: FileStorage) -> dict:
        """Get file information for logging/debugging"""
        try:
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)
            
            return {
                'filename': file.filename,
                'content_type': file.content_type,
                'size_bytes': file_size,
                'size_mb': round(file_size / (1024 * 1024), 2)
            }
        except Exception as e:
            logging.error(f"Error getting file info: {str(e)}")
            return {}
    
    def sanitize_filename(self, filename: str) -> str:
        """Sanitize filename for safe storage"""
        # Remove or replace dangerous characters
        dangerous_chars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*']
        safe_filename = filename
        
        for char in dangerous_chars:
            safe_filename = safe_filename.replace(char, '_')
        
        # Limit length
        max_length = 100
        if len(safe_filename) > max_length:
            name, ext = os.path.splitext(safe_filename)
            safe_filename = name[:max_length-len(ext)] + ext
        
        return safe_filename
