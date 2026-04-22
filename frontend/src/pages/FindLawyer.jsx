import React, { useState, useMemo } from 'react';
import { Scale, Search, Filter, Star, MapPin, Phone, Mail, Calendar, Clock, User, MessageSquare, X } from 'lucide-react';

import LawyerCard from '../components/LawyerCard';
import LawyerFilters from '../components/LawyerFilter';
import AppointmentModal from '../components/AppointmentModal';


// Mock data for lawyers
const mockLawyers = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108755-2616c88dd3c2?w=150&h=150&fit=crop&crop=face",
    specialties: ["Criminal Law", "Family Law"],
    location: "New York, NY",
    phone: "(555) 123-4567",
    email: "sarah.johnson@lawfirm.com",
    rating: 4.8,
    reviews: 127,
    hourlyRate: 350,
    bio: "Experienced criminal defense attorney with over 15 years of practice. Specializes in white-collar crimes and family disputes."
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Corporate Law", "Intellectual Property"],
    location: "Los Angeles, CA",
    phone: "(555) 234-5678",
    email: "michael.chen@corplaw.com",
    rating: 4.9,
    reviews: 89,
    hourlyRate: 425,
    bio: "Corporate law expert helping startups and established companies navigate complex business regulations and IP protection."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    specialties: ["Personal Injury", "Medical Malpractice"],
    location: "Chicago, IL",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@injurylaw.com",
    rating: 4.7,
    reviews: 203,
    hourlyRate: 275,
    bio: "Dedicated personal injury lawyer with a track record of securing substantial settlements for clients injured due to negligence."
  },
  {
    id: 4,
    name: "David Thompson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialties: ["Real Estate", "Tax Law"],
    location: "Houston, TX",
    phone: "(555) 456-7890",
    email: "david.thompson@realestatelaw.com",
    rating: 4.6,
    reviews: 156,
    hourlyRate: 320,
    bio: "Real estate and tax law specialist helping clients with property transactions, tax planning, and compliance issues."
  },
  {
    id: 5,
    name: "Jessica Williams",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialties: ["Immigration", "Employment Law"],
    location: "Miami, FL",
    phone: "(555) 567-8901",
    email: "jessica.williams@immigrationlaw.com",
    rating: 4.9,
    reviews: 174,
    hourlyRate: 295,
    bio: "Immigration attorney passionate about helping individuals and families navigate complex immigration processes and workplace rights."
  },
  {
    id: 6,
    name: "Robert Kim",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Criminal Law", "Personal Injury"],
    location: "Seattle, WA",
    phone: "(555) 678-9012",
    email: "robert.kim@criminaldefense.com",
    rating: 4.5,
    reviews: 98,
    hourlyRate: 380,
    bio: "Criminal defense and personal injury attorney with extensive courtroom experience and a commitment to client advocacy."
  }
];


// Main FindLawyer Component
const FindLawyer = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    specialty: 'All',
    location: 'All Locations',
    minRating: 0,
    priceMin: 0,
    priceMax: 1000
  });
  
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBookAppointment = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsModalOpen(true);
  };

  const filteredLawyers = useMemo(() => {
    return mockLawyers.filter(lawyer => {
      const matchesSearch = filters.searchTerm === '' || 
        lawyer.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        lawyer.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      
      const matchesSpecialty = filters.specialty === 'All' || 
        lawyer.specialties.includes(filters.specialty);
      
      const matchesLocation = filters.location === 'All Locations' || 
        lawyer.location === filters.location;
      
      const matchesRating = lawyer.rating >= filters.minRating;
      
      const matchesPrice = lawyer.hourlyRate >= filters.priceMin && 
        lawyer.hourlyRate <= filters.priceMax;
      
      return matchesSearch && matchesSpecialty && matchesLocation && 
             matchesRating && matchesPrice;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Find a Lawyer</h1>
                <p className="text-gray-600">Connect with experienced legal professionals</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {filteredLawyers.length} lawyers found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <LawyerFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
        />

        {/* Results */}
        <div className="space-y-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map(lawyer => (
              <LawyerCard 
                key={lawyer.id} 
                lawyer={lawyer} 
                onBookAppointment={handleBookAppointment}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lawyers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lawyer={selectedLawyer}
      />
    </div>
  );
};

export default FindLawyer;