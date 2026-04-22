import React, { useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const VerticalNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-64 h-screen bg-white border-r shadow-lg fixed top-0 left-0 z-50 p-4 flex flex-col"
          >
            {/* Logo and Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LawgicAI
                </span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-4">
              <button onClick={() => handleNavigate('/')} className="text-gray-700 hover:text-blue-600 text-left">
                Home
              </button>
              <button onClick={() => handleNavigate('/chat')} className="text-gray-700 hover:text-blue-600 text-left">
                Chat
              </button>
              <button onClick={() => handleNavigate('/findlawyers')} className="text-gray-700 hover:text-blue-600 text-left">
                Find a Lawyer
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hamburger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default VerticalNavbar;
