import React from 'react'
import { MessageCircle, ArrowRight, Link } from 'lucide-react';
import { FileText, Shield, Clock, Scale, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get Instant 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Legal Help </span> 
              with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              LawgicAI is your 24/7 AI legal assistant for contracts, legal questions, and compliance. 
              Get accurate answers instantly, trained on Indian legal database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={()=>navigate('/chat')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center">
                Try for Free <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={()=>navigate('/findlawyers')} className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all">
                Find a Lawyer
              </button>
            </div>
          </div>
          
          <div className="fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 font-semibold">LawgicAI</span>
                </div>
                <p className="text-gray-700">How can I help you with your legal questions today?</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-700">"What are the requirements for starting a tech startup in India?"</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4">
                <p className="text-gray-700">Great question! Here are the key requirements for starting a tech startup in India...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
}

export default Hero