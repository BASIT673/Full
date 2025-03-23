import React, { useState } from 'react';
import { ChevronRight, MapPin, Calendar, TrendingUp, Globe, Star } from 'lucide-react';

const DiscoveryPanel = ({
  category,
  setCategory,
  highlights,
  popular
}) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  const categories = [
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'destinations', label: 'Destinations', icon: <MapPin className="w-5 h-5" /> },
    { id: 'seasonal', label: 'Seasonal', icon: <Calendar className="w-5 h-5" /> },
    { id: 'international', label: 'International', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
      {/* Category Selector */}
      <div className="flex mb-6 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`flex items-center px-6 py-3 mr-4 rounded-full flex-shrink-0 transition-all ${
              category === cat.id
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setCategory(cat.id)}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Destinations */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Featured Places</h3>
          <button className="text-blue-600 text-sm font-medium flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.slice(0, 3).map((destination) => (
            <div 
              key={destination.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer h-48"
              onClick={() => setSelectedDestination(destination)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${destination.imageUrl || '/api/placeholder/400/320'})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{destination.name}</h4>
                <div className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5">
                <Star className={`w-4 h-4 ${destination.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Searches */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Now</h3>
        <div className="flex flex-wrap gap-2">
          {popular.map((item) => (
            <button
              key={item.id}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-800 transition-colors"
              onClick={() => setSelectedDestination(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Explore All
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Guided Tours
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Top Rated
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPanel;