import React from 'react';
import { Star, MapPin, Phone, Mail, Calendar } from 'lucide-react';


// LawyerCard Component
const LawyerCard = ({ lawyer, onBookAppointment }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={lawyer.photo}
              alt={lawyer.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
              <div className="flex items-center space-x-1">
                {renderStars(lawyer.rating)}
                <span className="text-sm text-gray-600 ml-1">({lawyer.reviews})</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex flex-wrap gap-2">
                {lawyer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {lawyer.location}
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-1" />
                {lawyer.phone}
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-1" />
                {lawyer.email}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{lawyer.bio}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-green-600">
                Rs.{lawyer.hourlyRate}/hour
              </div>
              <button
                onClick={() => onBookAppointment(lawyer)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;