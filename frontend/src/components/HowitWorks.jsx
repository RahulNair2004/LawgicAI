import React from 'react'

import { MessageCircle, ArrowRight } from 'lucide-react';


const HowitWorks = () => {
  const steps = [
      {
        number: "1",
        title: "Ask a Question",
        description: "Simply type your legal question or upload documents for review"
      },
      {
        number: "2",
        title: "AI Understands Legal Context",
        description: "Our AI analyzes your query using advanced legal knowledge base"
      },
      {
        number: "3",
        title: "Get Accurate, Actionable Answers",
        description: "Receive detailed responses with relevant legal insights and next steps"
      }
    ];

    return (
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How LawgicAI Works
            </h2>
            <p className="text-xl text-gray-600">
              Get legal help in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="fade-in text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default HowitWorks