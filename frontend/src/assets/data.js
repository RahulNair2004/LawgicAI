import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Phone, Calendar, MessageCircle, Menu, X, Filter, Shield, Users, Award, Mail, Clock } from 'lucide-react';

// Mock data for lawyers
const mockLawyers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    designation: "Senior Criminal Advocate",
    specialty: "Criminal Law",
    location: "Mumbai",
    rating: 4.9,
    reviews: 234,
    experience: "15+ years",
    description: "Specialized in criminal defense with a proven track record of successful cases. Expert in white-collar crimes, corporate fraud, and high-profile criminal matters.",
    photo: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face",
    contact: "priya.sharma@legalai.com",
    phone: "+91 98765 43210",
    availability: "Available Today"
  },
  {
    id: 2,
    name: "Adv. Rajesh Kumar",
    designation: "Corporate Law Expert",
    specialty: "Corporate Law",
    location: "Delhi",
    rating: 4.8,
    reviews: 189,
    experience: "12+ years",
    description: "Expert in corporate governance, mergers & acquisitions, and business compliance. Trusted advisor to Fortune 500 companies and startups.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    contact: "rajesh.kumar@legalai.com",
    phone: "+91 98765 43211",
    availability: "Available Tomorrow"
  },
  {
    id: 3,
    name: "Adv. Meera Patel",
    designation: "Family Court Advocate",
    specialty: "Family Law",
    location: "Bangalore",
    rating: 4.9,
    reviews: 156,
    experience: "10+ years",
    description: "Compassionate approach to family disputes, divorce proceedings, and child custody cases. Known for achieving amicable resolutions and protecting client interests.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    contact: "meera.patel@legalai.com",
    phone: "+91 98765 43212",
    availability: "Available Today"
  },
  {
    id: 4,
    name: "Adv. Arjun Singh",
    designation: "Property & Real Estate Lawyer",
    specialty: "Property Law",
    location: "Mumbai",
    rating: 4.7,
    reviews: 198,
    experience: "14+ years",
    description: "Specializes in real estate transactions, property disputes, and land acquisition. Expert in commercial and residential property matters.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    contact: "arjun.singh@legalai.com",
    phone: "+91 98765 43213",
    availability: "Available This Week"
  },
  {
    id: 5,
    name: "Adv. Kavita Reddy",
    designation: "Employment & Labor Lawyer",
    specialty: "Labor Law",
    location: "Hyderabad",
    rating: 4.8,
    reviews: 167,
    experience: "11+ years",
    description: "Expert in employment disputes, workplace harassment, and labor compliance. Advocates for both employees and employers with fair solutions.",
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    contact: "kavita.reddy@legalai.com",
    phone: "+91 98765 43214",
    availability: "Available Today"
  },
  {
    id: 6,
    name: "Adv. Vikram Joshi",
    designation: "Tax & Financial Consultant",
    specialty: "Tax Law",
    location: "Pune",
    rating: 4.6,
    reviews: 143,
    experience: "13+ years",
    description: "Comprehensive tax planning and litigation services. Specializes in GST, income tax, international taxation, and financial compliance matters.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    contact: "vikram.joshi@legalai.com",
    phone: "+91 98765 43215",
    availability: "Available Tomorrow"
  }
];

const specialties = ["All Specialties", "Criminal Law", "Corporate Law", "Family Law", "Property Law", "Labor Law", "Tax Law"];
const locations = ["All Locations", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"];