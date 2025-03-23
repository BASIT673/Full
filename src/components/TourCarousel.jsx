import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';

const TourCarousel = ({ tours, autoPlayInterval = 5000, onTourClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Advanced navigation methods
  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === tours.length - 1 ? 0 : prevIndex + 1
    );
  }, [tours]);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? tours.length - 1 : prevIndex - 1
    );
  }, [tours]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play logic with pause on hover
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goToNextSlide, autoPlayInterval);
      return () => clearInterval(intervalRef.current);
    }
  }, [goToNextSlide, isPaused, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNextSlide();
      if (e.key === 'ArrowLeft') goToPrevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Swipe detection for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNextSlide();
    }

    if (touchStart - touchEnd < -75) {
      goToPrevSlide();
    }
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out space-x-4"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${tours.length * 110}%`
        }}
      >
        {tours.map((tour, index) => (
          <div 
            key={index} 
            className="w-full px-2 flex-shrink-0"
            style={{ width: `${100 / tours.length}%` }}
          >
            <TourCard tour={tour} onClick={() => onTourClick && onTourClick(tour)} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide} 
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
      >
        <ChevronLeft className="text-gray-700" />
      </button>
      <button 
        onClick={goToNextSlide} 
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
      >
        <ChevronRight className="text-gray-700" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${currentIndex === index 
                ? 'bg-orange-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default TourCarousel;