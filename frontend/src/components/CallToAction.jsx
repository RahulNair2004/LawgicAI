import React, { useState, useEffect } from 'react';
import { Star, MapPin, Award, Clock, ArrowRight, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  const lawyers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      specialization: "Corporate Law",
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      experience: "12+ years",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      expertise: ["M&A", "Securities", "Contract Law"],
      available: true
    },
    {
      id: 2,
      name: "Marcus Chen",
      specialization: "Criminal Defense",
      rating: 4.8,
      reviews: 203,
      location: "Los Angeles, CA",
      experience: "15+ years",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: ["White Collar", "DUI", "Appeals"],
      available: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "Family Law",
      rating: 4.9,
      reviews: 156,
      location: "Chicago, IL",
      experience: "10+ years",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["Divorce", "Custody", "Adoption"],
      available: false
    },
    {
      id: 4,
      name: "David Thompson",
      specialization: "Personal Injury",
      rating: 4.7,
      reviews: 89,
      location: "Miami, FL",
      experience: "8+ years",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      expertise: ["Auto Accidents", "Medical Malpractice", "Slip & Fall"],
      available: true
    },
    {
      id: 5,
      name: "Jennifer Liu",
      specialization: "Intellectual Property",
      rating: 4.9,
      reviews: 174,
      location: "San Francisco, CA",
      experience: "14+ years",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      expertise: ["Patents", "Trademarks", "Copyright"],
      available: true
    },
    {
      id: 6,
      name: "Michael Johnson",
      specialization: "Tax Law",
      rating: 4.8,
      reviews: 112,
      location: "Austin, TX",
      experience: "9+ years",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      expertise: ["Corporate Tax", "International Tax", "Estate Planning"],
      available: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(lawyers.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [lawyers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(lawyers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(lawyers.length / 3)) % Math.ceil(lawyers.length / 3));
  };

  const getVisibleLawyers = () => {
    const start = currentSlide * 3;
    return lawyers.slice(start, start + 3);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Scale className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Real Experts, Real Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Legal Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When AI isn't enough, connect with top-rated attorneys who specialize in your specific legal needs.
          </p>
        </div>

        {/* Lawyer Cards Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(lawyers.length / 3) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8 px-4">
                    {lawyers.slice(slideIndex * 3, slideIndex * 3 + 3).map((lawyer) => (
                      <div
                        key={lawyer.id}
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={lawyer.avatar}
                                alt={lawyer.name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                                lawyer.available ? 'bg-green-500' : 'bg-gray-400'
                              }`}></div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {lawyer.name}
                              </h3>
                              <p className="text-blue-600 font-medium">{lawyer.specialization}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-bold text-gray-900">{lawyer.rating}</span>
                            </div>
                            <p className="text-sm text-gray-500">({lawyer.reviews} reviews)</p>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{lawyer.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Award className="w-4 h-4 mr-2" />
                            <span className="text-sm">{lawyer.experience} experience</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {lawyer.available ? 'Available now' : 'Next available: Tomorrow'}
                            </span>
                          </div>
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {lawyer.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                          Book Consultation
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(lawyers.length / 3) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find the right expert?
            </h3>
            <p className="text-gray-600 mb-6">
              Search our directory of 5,000+ verified attorneys across all practice areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={()=>navigate('/findlawyers')}  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center justify-center space-x-2">
                  <span>Search All Lawyers</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;