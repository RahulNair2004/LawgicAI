import React from 'react'
import { Users, Star, Award } from 'lucide-react';

import { Search } from 'lucide-react';
import { Filter } from 'lucide-react';

import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Shield } from 'lucide-react';


// LawyerFilters Component
const LawyerFilter = ({ filters, onFilterChange }) => {
  const specialties = [
    'All',
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Personal Injury',
    'Real Estate',
    'Immigration',
    'Tax Law',
    'Employment Law',
    'Intellectual Property'
  ];

  const locations = [
    'All Locations',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Miami, FL',
    'Seattle, WA',
    'Boston, MA',
    'Denver, CO'
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4+ Stars', value: 4 },
    { label: '4.5+ Stars', value: 4.5 }
  ];

  const priceRanges = [
    { label: 'All Prices', min: 0, max: 1000 },
    { label: 'Rs.1000-2000/hr', min: 1000, max: 2000 },
    { label: 'Rs.2000-3000/hr', min: 2000, max: 3000 },
    { label: 'Rs.3000-4000/hr', min: 3000, max: 4000 },
    { label: 'Rs.4000+/hr', min: 4000, max: 10000 }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Filter Lawyers</h2>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          <select
            value={filters.specialty}
            onChange={(e) => onFilterChange('specialty', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => onFilterChange('minRating', parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {ratingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={`${filters.priceMin}-${filters.priceMax}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              onFilterChange('priceMin', min);
              onFilterChange('priceMax', max);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={`${range.min}-${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={() => {
            onFilterChange('searchTerm', '');
            onFilterChange('specialty', 'All');
            onFilterChange('location', 'All Locations');
            onFilterChange('minRating', 0);
            onFilterChange('priceMin', 0);
            onFilterChange('priceMax', 1000);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default LawyerFilter;