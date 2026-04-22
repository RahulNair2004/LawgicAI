import React from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react';
import { FileText, Shield, Clock, Scale, Users } from 'lucide-react';
import { Building, Briefcase, GraduationCap, User } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react';


const UseCase = () => {
  const useCases = [
      {
        icon: <Building className="h-12 w-12" />,
        title: "For Startups",
        description: "Legal compliance & incorporation",
        details: "Navigate company registration, compliance requirements, and regulatory frameworks"
      },
      {
        icon: <Briefcase className="h-12 w-12" />,
        title: "For Law Firms",
        description: "Boost productivity",
        details: "Streamline research, document drafting, and client consultation processes"
      },
      {
        icon: <GraduationCap className="h-12 w-12" />,
        title: "For Students",
        description: "Learn law faster",
        details: "Get instant explanations of legal concepts, case studies, and exam preparation"
      },
      {
        icon: <User className="h-12 w-12" />,
        title: "For General Users",
        description: "Know your rights",
        details: "Understand consumer rights, employment law, and everyday legal matters"
      }
    ];

    return (
      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Need
            </h2>
            <p className="text-xl text-gray-600">
              Lexi adapts to serve different users and use cases
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="fade-in group">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-300 h-full">
                  <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {useCase.description}
                  </p>
                  <p className="text-gray-600">
                    {useCase.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default UseCase