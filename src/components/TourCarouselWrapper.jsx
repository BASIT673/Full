import React from 'react';
import TourCarousel from './TourCarousel';
import TourCard from './SearchBar'; // Assuming this is the component you provided
// import TourCard from './TourCard'
const TourCarouselWrapper = ({ tours }) => {
  const handleTourClick = (tour) => {
    // Add your click handling logic here
    console.log('Tour clicked:', tour);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Explore Our Tours</h2>
        <TourCarousel 
          tours={tours} 
          autoPlayInterval={5000} 
          onTourClick={handleTourClick} 
        />
      </div>
    </div>
  );
};

export default TourCarouselWrapper;