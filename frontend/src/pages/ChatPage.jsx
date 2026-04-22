import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, FileText, MessageCircle, AlertCircle, CheckCircle, Paperclip, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatPage = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [sessionId] = useState('default');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [question]);

  const sanitizeAIResponse = (content) => {
    // Remove <think>...</think> tags and content
    if (content.includes('<think>')) {
      return content.replace(/<think>.*?<\/think>/gs, '').trim();
    }
    return content;
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentQuestion = question;
    setQuestion('');

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentQuestion,
          session_id: sessionId
        })
      });

      const data = await response.json();

      if (response.ok) {
        const aiContent = sanitizeAIResponse(data.response);

        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiContent,
          timestamp: new Date(data.timestamp).toLocaleTimeString(),
          hasContext: data.has_context
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const errorResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: `Error: ${data.error || 'Something went wrong. Please try again.'}`,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      
      const fileMessage = {
        id: Date.now(),
        type: 'user',
        content: `Uploaded document: ${file.name}`,
        isFile: true,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, fileMessage]);
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('session_id', sessionId);

        const response = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          const aiContent = sanitizeAIResponse(`I've successfully analyzed your document "${data.filename}". Based on the content, I can provide legal insights and answer specific questions about the document. What would you like to know about this document?`);

          const aiResponse = {
            id: Date.now() + 1,
            type: 'ai',
            content: aiContent,
            timestamp: new Date(data.timestamp).toLocaleTimeString()
          };
          setMessages(prev => [...prev, aiResponse]);
        } else {
          const errorResponse = {
            id: Date.now() + 1,
            type: 'ai',
            content: `Error uploading file: ${data.error}`,
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, errorResponse]);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        const errorResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'Error uploading file. Please check your connection and try again.',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">How can I help you today?</h2>
              <p className="text-gray-600 mb-8">
                Ask any legal question or upload a PDF document for analysis. I'll provide detailed insights 
                and help you understand complex legal matters.
              </p>
              {/* Sample Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  "What should I look for in a rental agreement?",
                  "How do I handle a contract dispute?",
                  "What are my rights as a tenant?",
                  "Explain employment law basics"
                ].map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(sample)}
                    className="p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800">{sample}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>For informational purposes only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant responses</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div 
            ref={chatContainerRef}
            className="h-full overflow-y-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="max-w-4xl mx-auto px-4 py-6">
              {messages.map((message, index) => (
                <div key={message.id} className="mb-8">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-green-600'
                    }`}>
                      {message.type === 'user' ? (
                        <span className="text-white text-sm font-medium">U</span>
                      ) : (
                        <span className="text-white text-sm font-medium">AI</span>
                      )}
                    </div>
                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {message.type === 'user' ? 'You' : 'AI Legal Assistant'}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.hasContext && message.type === 'ai' && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Document Context
                          </span>
                        )}
                      </div>
                      {message.isFile && (
                        <div className="flex items-center space-x-2 mb-3 p-3 bg-gray-50 rounded-lg border">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Document Upload</span>
                        </div>
                      )}
                      <div className="prose prose-sm max-w-none text-gray-800">
                        {message.type === 'ai' ? (
                          <ReactMarkdown
                            components={{
                              details({ node, ...props }) {
                                return <details className="my-2 bg-gray-100 p-2 rounded">{props.children}</details>;
                              },
                              summary({ node, ...props }) {
                                return <summary className="font-semibold cursor-pointer">💡 {props.children}</summary>;
                              },
                              strong({ node, ...props }) {
                                return <strong className="font-bold text-black">{props.children}</strong>;
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">AI Legal Assistant</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      {dragOver && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl border-2 border-dashed border-blue-400">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your PDF here</p>
            <p className="text-gray-600">to analyze legal documents</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {uploadedFile && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 text-green-700">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          )}
          <form onSubmit={handleSubmitQuestion} className="relative">
            <div className="flex items-end space-x-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-gray-300 p-2">
              <label className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <Paperclip className="w-5 h-5 text-gray-600" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
              <textarea
                ref={textareaRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Message AI Legal Assistant..."
                className="flex-1 min-h-[44px] max-h-[200px] bg-transparent border-none outline-none resize-none py-3 px-2 text-gray-900 placeholder-gray-500"
                disabled={isLoading}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitQuestion(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="flex-shrink-0 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>This AI provides general information only and is not a substitute for professional legal advice.</span>
          </p>
        </div   >
      </div>
    </div>
  );
};

export default ChatPage;
