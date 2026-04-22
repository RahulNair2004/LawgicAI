import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.scrollTo(0, 0); 
    navigate(path);
    setIsMenuOpen(false); 
  };

  return (
    <nav className="fixed w-full top-0 bg-white/90 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center space-x-2"
          >
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LawgicAI
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate('/')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => handleNavigate('/chat')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Chat
            </button>

           

            <button
              onClick={() => handleNavigate('/findlawyers')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Find a Lawyer
            </button>

            <button
              onClick={() => handleNavigate('/chat')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Try Free
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t mt-2 rounded-b-lg shadow-md"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => handleNavigate('/')}
                  className="block w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigate('/chat')}
                  className="block w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Chat
                </button>
                
                <button
                  onClick={() => handleNavigate('/findlawyers')}
                  className="block w-full text-left text-gray-700 hover:text-blue-600"
                >
                  Find a Lawyer
                </button>
                <button
                  onClick={() => handleNavigate('/chat')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full"
                >
                  Try Free
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
