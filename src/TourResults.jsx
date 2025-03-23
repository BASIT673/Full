import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, ArrowLeft, Filter, DollarSign } from 'lucide-react';

export const TourResults = ({ selection, onBack }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    duration: 'any',
    rating: 0
  });

  // Simulate loading tour data based on selection
  useEffect(() => {
    // This would be replaced with an actual API call in production
    setLoading(true);
    setTimeout(() => {
      // Generate sample tours based on selection
      const sampleTours = Array(8).fill().map((_, i) => ({
        id: `tour-${i}`,
        title: `${selection.activity} Tour in ${selection.destination}`,
        description: `Experience the best of ${selection.destination} with our guided ${selection.activity.toLowerCase()} tour.`,
        price: Math.round((500 + Math.random() * 2000) / 10) * 10,
        duration: Math.floor(Math.random() * 10) + 3,
        rating: (3 + Math.random() * 2).toFixed(1),
        reviewCount: Math.floor(Math.random() * 200) + 10,
        imageUrl: `/api/placeholder/400/250`,
        startDate: getRandomDate(selection.dates)
      }));
      
      setTours(sampleTours);
      setFilteredTours(sampleTours);
      setLoading(false);
    }, 1000);
  }, [selection]);
  
  // Helper function to generate plausible start dates based on selection
  const getRandomDate = (datePreference) => {
    const today = new Date();
    let date = new Date();
    
    switch(datePreference) {
      case 'Next Weekend':
        date.setDate(today.getDate() + (6 - today.getDay() + 7));
        break;
      case 'Within 30 Days':
        date.setDate(today.getDate() + Math.floor(Math.random() * 30) + 7);
        break;
      case 'Within 90 Days':
        date.setDate(today.getDate() + Math.floor(Math.random() * 90) + 14);
        break;
      case 'Next 6 Months':
        date.setMonth(today.getMonth() + Math.floor(Math.random() * 6) + 1);
        break;
      case 'This Summer':
        date = new Date(today.getFullYear(), 5 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1);
        break;
      case 'This Winter':
        date = new Date(today.getFullYear(), 11 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1);
        if (date.getMonth() > 11) {
          date.setFullYear(date.getFullYear() + 1);
          date.setMonth(date.getMonth() - 12);
        }
        break;
      default:
        date.setDate(today.getDate() + Math.floor(Math.random() * 60) + 30);
    }
    
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Filter tours based on user selections
  const applyFilters = (newFilters) => {
    const updated = {...filters, ...newFilters};
    setFilters(updated);
    
    const filtered = tours.filter(tour => {
      const matchesPrice = tour.price >= updated.priceRange[0] && tour.price <= updated.priceRange[1];
      const matchesDuration = updated.duration === 'any' || 
        (updated.duration === 'short' && tour.duration <= 5) ||
        (updated.duration === 'medium' && tour.duration > 5 && tour.duration <= 10) ||
        (updated.duration === 'long' && tour.duration > 10);
      const matchesRating = parseFloat(tour.rating) >= updated.rating;
      
      return matchesPrice && matchesDuration && matchesRating;
    });
    
    setFilteredTours(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with selection summary */}
      <div className="p-6 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <button 
            className="flex items-center text-blue-600 font-medium"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
          
          <div className="text-right">
            <h2 className="text-lg font-medium text-gray-900">
              {/* {selection.activity} in {selection.destination} */}
            </h2>
            {/* <p className="text-sm text-gray-600">{selection.dates}</p> */}
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">$0</span>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => applyFilters({ priceRange: [0, parseInt(e.target.value)] })}
                    className="w-full"
                  />
                  <span className="text-gray-500">${filters.priceRange[1]}</span>
                </div>
              </div>
              
              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'any', label: 'Any duration' },
                    { id: 'short', label: '1-5 days' },
                    { id: 'medium', label: '6-10 days' },
                    { id: 'long', label: '10+ days' }
                  ].map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        checked={filters.duration === option.id}
                        onChange={() => applyFilters({ duration: option.id })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(rating => (
                    <button
                      key={rating}
                      className={`p-2 ${filters.rating === rating + 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => applyFilters({ rating: rating + 1 })}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tour results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Finding the perfect tours for you...</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No tours found matching your criteria.</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => applyFilters({
                    priceRange: [0, 5000],
                    duration: 'any',
                    rating: 0
                  })}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">{filteredTours.length} tours found</p>
                  <select className="p-2 border border-gray-300 rounded">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Duration</option>
                  </select>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTours.map(tour => (
                    <div key={tour.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={tour.imageUrl} alt={tour.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{tour.title}</h3>
                          <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>${tour.price}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Start date: {tour.startDate}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{tour.duration} days</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{tour.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({tour.reviewCount} reviews)</span>
                          </div>
                          
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourResults;