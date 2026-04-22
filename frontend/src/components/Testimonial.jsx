import React from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react';
import { FileText, Shield, Clock, Scale, Users } from 'lucide-react';
import { Building, Briefcase, GraduationCap, User } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Star } from 'lucide-react';

const Testimonial = () => {
   const testimonials = [
      {
        name: "Priya Sharma",
        role: "Startup Founder",
        content: "Lexi helped me understand all the legal requirements for my tech startup. The AI is incredibly accurate and saved me thousands in legal fees.",
        rating: 5
      },
      {
        name: "Advocate Rajesh Kumar",
        role: "Senior Partner, Kumar & Associates",
        content: "As a practicing lawyer, I'm impressed by Lexi's knowledge of Indian law. It's become an invaluable research assistant for our firm.",
        rating: 5
      },
      {
        name: "Anita Patel",
        role: "Law Student, NLU Delhi",
        content: "Lexi makes complex legal concepts so easy to understand. It's like having a personal tutor available 24/7. Absolutely game-changing!",
        rating: 5
      }
    ];

    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about Lexi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-in bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Testimonial