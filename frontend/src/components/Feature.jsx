import React from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react';
import { FileText, Shield, Clock, Scale, Users } from 'lucide-react';


const Feature = () => {
   const features = [
      {
        icon: <MessageCircle className="h-8 w-8" />,
        title: "Answer Legal Questions Instantly",
        description: "Get immediate responses to complex legal queries with AI-powered accuracy"
      },
      {
        icon: <FileText className="h-8 w-8" />,
        title: "Draft & Review Contracts",
        description: "Create, analyze, and optimize legal documents with intelligent assistance"
      },
      {
        icon: <Shield className="h-8 w-8" />,
        title: "Stay Compliant with Local Laws",
        description: "Ensure your business follows all relevant regulations and legal requirements"
      },
      {
        icon: <Clock className="h-8 w-8" />,
        title: "Available 24/7",
        description: "Access legal help anytime, anywhere - your AI assistant never sleeps"
      },
      {
        icon: <Scale className="h-8 w-8" />,
        title: "Trained on Indian Legal Database",
        description: "Specialized knowledge of Indian laws, regulations, and legal precedents"
      },
      {
        icon: <Users className="h-8 w-8" />,
        title: "Multi-User Support",
        description: "Perfect for teams, law firms, and organizations of all sizes"
      }
    ];

    return (
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LawgicAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful AI technology meets legal expertise to provide you with reliable, 
              instant legal assistance whenever you need it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="fade-in bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Feature