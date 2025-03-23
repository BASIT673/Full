


import React, { useState, useEffect,useRef,useCallback } from 'react';
// import { ChevronDown, Search, Map, Calendar, Users, MapPin, Loader2, X ,ChevronLeft,star } from 'lucide-react';
import axios from 'axios';
import ToursCarousel from './Tourca';
import { Loader2,ChevronDown,CheckCircle,Share2, Search, X,Calendar, MapPin, Clock, Users, DollarSign, ChevronLeft,  ChevronRight,Star,Check,Globe,Heart, CircleDollarSign, Mountain, Compass, } from 'lucide-react';
// const TourCard = ({ tour, onClick }) => {
//     const handleBackdropClick = (e) => {
//         if (e.target === e.currentTarget) {
//           onBack();
//         }
//       };
//     return (
//       <div 
       
//       className=" z-10000 group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2  "
//       onClick={handleBackdropClick}
//       > 
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
//           <img 
//             // src={tour.image || "../images/Hero/jpg"} 
//             src={tour.image}
//             // src={`http://localhost:5000${tour.image}`} 
//             alt={tour.title} 
//             className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
//             loading="lazy"
//           />
//           <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 z-20">
//             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//             <span className="text-sm font-medium">{tour.rating}</span>
//           </div>
//         </div>
        
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//             {tour.title}
//           </h3>
          
//           <div className="flex items-center gap-2 mt-3 text-gray-600">
//             <MapPin className="w-4 h-4" />
//             <span className="text-sm">{tour.location}</span>
//           </div>
          
//           <div className="mt-4 flex flex-wrap gap-4">
//             <div className="flex items-center gap-1 text-gray-600">
//               <Clock className="w-4 h-4" />
//               <span className="text-sm">{tour.duration}</span>
//             </div>
//             <div className="flex items-center gap-1 text-gray-600">
//               <Users className="w-4 h-4" />
//               <span className="text-sm">Max {tour.groupSize}</span>
//             </div>
//             <div className="flex items-center gap-1 text-green-600 font-medium">
//               <CircleDollarSign className="w-4 h-4" />
//               <span className="text-sm">${tour.price}</span>
//             </div>
//           </div>
          
//           <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tour.description}</p>
          
//           <div className="mt-6 flex justify-end">
//             <button 
//               onClick={onClick}
//               className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:translate-x-2 transition-transform"
//             >
//               View Details
//               <ChevronLeft className="w-4 h-4 rotate-180" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }; 
const TourCard = ({ tour, onClick }) => (
  <div
    onClick={onClick}
    className="group relative mt-0 md:mt-0 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    {/* Image Container */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={tour.image}
        alt={tour.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-20 flex space-x-2">
        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          Featured
        </span>
        {tour.trending && (
          <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Trending
          </span>
        )}
      </div>
      
      {/* Discount Tag */}
      {tour.discount && (
        <div className="absolute top-3 right-3 bg-white py-1 px-3 text-xs font-bold text-orange-600 rounded-full shadow-sm">
          {tour.discount}% OFF
        </div>
      )}
      
      {/* Thrillophilia-style "Bestseller" tag */}
      {tour.bestseller && (
        <div className="absolute bottom-3 left-3 bg-green-500 py-1 px-2 text-xs font-medium text-white rounded">
          BESTSELLER
        </div>
      )}
    </div>
    
    {/* Content Section */}
    <div className="p-4">
      {/* Title - Reduced font */}
      <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">
        {tour.title}
      </h3>
      
      {/* Tour Details - Essential info only */}
      <div className="flex flex-wrap items-center gap-x-4 text-xs text-gray-600 mb-3">
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3 text-orange-500" />
          <span>{tour.duration}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-1 h-3 w-3 text-orange-500" />
          <span>{tour.location}</span>
        </div>
      </div>
      
      {/* Marketing Element - Thrillophilia-style highlights */}
      <div className="flex items-center justify-between py-2 mb-3 border-y border-gray-100">
        <div className="flex flex-wrap gap-x-3 text-xs">
          {/* Collection Badge - like Thrillophilia uses */}
          {tour.collection && (
            <div className="flex items-center">
              <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
              <span className="text-gray-600">{tour.collection}</span>
            </div>
          )}
          
          {/* Instant Confirmation Badge */}
          <div className="flex items-center">
            <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">Instant Confirmation</span>
          </div>
          
          {/* Cancellation Badge - if applicable */}
          {tour.cancellation && (
            <div className="flex items-center">
              <svg className="h-3 w-3 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">{tour.cancellation}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom section with Rating and Price - Exact Thrillophilia style */}
      <div className="flex items-center justify-between">
        {/* Rating - Thrillophilia exact style */}
        <div className="flex items-center">
          <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
            <span>{tour.rating}</span>
            <Star className="h-3 w-3 ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
        </div>
        
        {/* Price - Exact Thrillophilia style */}
        <div className="flex flex-col items-end">
          {tour.originalPrice && (
            <div className="flex items-center">
              <span className="text-xs text-gray-500 line-through">₹{tour.originalPrice}</span>
              <span className="ml-1 text-xs font-medium text-green-600">
                {Math.round((tour.originalPrice - tour.price) / tour.originalPrice * 100)}% off
              </span>
            </div>
          )}
          <div className="flex items-baseline">
            <span className="text-xs text-gray-500">From </span>
            <span className="ml-1 text-lg font-semibold text-gray-800">₹{tour.price}</span>
            {/* <div className="text-xs text-gray-500">per person </div> */}
          </div>
        </div>
      </div>
      
      {/* View More Button */}
      <button className="mt-3 w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 flex items-center justify-center">
        <span>View More</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
);
// const TourCarousel = ({ tours, autoPlayInterval = 5000, onTourClick }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const carouselRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Advanced navigation methods
//   const goToNextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === tours.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [tours]);

//   const goToPrevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? tours.length - 1 : prevIndex - 1
//     );
//   }, [tours]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Auto-play logic with pause on hover
//   useEffect(() => {
//     if (!isPaused) {
//       intervalRef.current = setInterval(goToNextSlide, autoPlayInterval);
//       return () => clearInterval(intervalRef.current);
//     }
//   }, [goToNextSlide, isPaused, autoPlayInterval]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowRight') goToNextSlide();
//       if (e.key === 'ArrowLeft') goToPrevSlide();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [goToNextSlide, goToPrevSlide]);

//   // Swipe detection for mobile
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       goToNextSlide();
//     }

//     if (touchStart - touchEnd < -75) {
//       goToPrevSlide();
//     }
//   };

//   return (
//     <div 
//       className="relative w-full max-w-6xl mx-auto py-4"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       ref={carouselRef}
//     >
//       {/* Slides Container */}
//       <div 
//         className="flex transition-transform duration-500 ease-in-out space-x-4"
//         style={{ 
//           transform: `translateX(-${currentIndex * 100}%)`,
//           width: `${tours.length * 110}%`
//         }}
//       >
//         {tours.map((tour, index) => (
//           <div 
//             key={index} 
//             className="w-full px-2 flex-shrink-0"
//             style={{ width: `${100 / tours.length}%` }}
//           >
//             <TourCard tour={tour} onClick={() => onTourClick && onTourClick(tour)} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button 
//         onClick={goToPrevSlide} 
//         className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
//       >
//         <ChevronLeft className="text-gray-700" />
//       </button>
//       <button 
//         onClick={goToNextSlide} 
//         className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
//       >
//         <ChevronRight className="text-gray-700" />
//       </button>

//       {/* Progress Dots */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
//         {tours.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`
//               w-3 h-3 rounded-full transition-all duration-300
//               ${currentIndex === index 
//                 ? 'bg-orange-500 w-6' 
//                 : 'bg-gray-300 hover:bg-gray-400'}
//             `}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// const TourCarousel = ({ 
//   tours, 
//   autoPlayInterval = 5000, 
//   onTourClick,
//   visibleSlides = 3 
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const carouselRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Advanced navigation methods
//   const goToNextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex >= tours.length - visibleSlides ? 0 : prevIndex + 1
//     );
//   }, [tours, visibleSlides]);

//   const goToPrevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? tours.length - visibleSlides : prevIndex - 1
//     );
//   }, [tours, visibleSlides]);

//   // Auto-play logic with pause on hover
//   useEffect(() => {
//     if (!isPaused && tours.length > visibleSlides) {
//       intervalRef.current = setInterval(goToNextSlide, autoPlayInterval);
//       return () => clearInterval(intervalRef.current);
//     }
//   }, [goToNextSlide, isPaused, autoPlayInterval, tours, visibleSlides]);

//   // Responsive slide calculation
//   const calculateSlideWidth = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth < 640) return '100%';  // Mobile
//     if (screenWidth < 1024) return '50%';  // Tablet
//     return `${100 / visibleSlides}%`;  // Desktop
//   };

//   return (
//     <div 
//       className="relative w-full max-w-6xl mx-auto px-4 py-8"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       ref={carouselRef}
//     >
//       {/* Slides Container */}
//       <div 
//         className="flex overflow-hidden transition-all duration-500 ease-in-out space-x-4"
//         style={{ 
//           transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
//         }}
//       >
//         {tours.map((tour, index) => (
//           <div 
//             key={index} 
//             className="flex-shrink-0 transition-all duration-300"
//             style={{ 
//               width: calculateSlideWidth(),
//               opacity: Math.abs(index - currentIndex) < visibleSlides ? 1 : 0.5
//             }}
//           >
//             <TourCard 
//               tour={tour} 
//               onClick={() => onTourClick && onTourClick(tour)} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       {tours.length > visibleSlides && (
//         <>
//           <button 
//             onClick={goToPrevSlide} 
//             className="absolute left-0 top-1/2 -translate-y-1/2 
//               bg-white shadow-lg hover:bg-gray-100 
//               p-3 rounded-full transition z-20"
//           >
//             <ChevronLeft className="text-gray-700 w-6 h-6" />
//           </button>
//           <button 
//             onClick={goToNextSlide} 
//             className="absolute right-0 top-1/2 -translate-y-1/2 
//               bg-white shadow-lg hover:bg-gray-100 
//               p-3 rounded-full transition z-20"
//           >
//             <ChevronRight className="text-gray-700 w-6 h-6" />
//           </button>
//         </>
//       )}

//       {/* Progress Dots */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 mt-4">
//         {Array.from({ length: tours.length - visibleSlides + 1 }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`
//               w-3 h-3 rounded-full transition-all duration-300
//               ${currentIndex === index 
//                 ? 'bg-orange-500 w-6' 
//                 : 'bg-gray-300 hover:bg-gray-400'}
//             `}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// const TourCarouselWrapper = ({ tours }) => {
//   const handleTourClick = (tour) => {
//     // Add your click handling logic here
//     console.log('Tour clicked:', tour);
//   };

//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-6">Explore Our Tours</h2>
//         <TourCarousel 
//           tours={tours} 
//           autoPlayInterval={5000} 
//           onTourClick={handleTourClick} 
//         />
//       </div>
//     </div>
//   );
// };
// const TourCarousel = ({ tours, autoPlayInterval = 5000, onTourClick }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const carouselRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Advanced navigation methods
//   const goToNextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === tours.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [tours]);

//   const goToPrevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? tours.length - 1 : prevIndex - 1
//     );
//   }, [tours]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Auto-play logic with pause on hover
//   useEffect(() => {
//     if (!isPaused) {
//       intervalRef.current = setInterval(goToNextSlide, autoPlayInterval);
//       return () => clearInterval(intervalRef.current);
//     }
//   }, [goToNextSlide, isPaused, autoPlayInterval]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowRight') goToNextSlide();
//       if (e.key === 'ArrowLeft') goToPrevSlide();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [goToNextSlide, goToPrevSlide]);

//   // Swipe detection for mobile
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       goToNextSlide();
//     }

//     if (touchStart - touchEnd < -75) {
//       goToPrevSlide();
//     }
//   };

//   return (
//     <div 
//       className="relative w-full max-w-6xl mx-auto py-4"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       ref={carouselRef}
//     >
//       {/* Slides Container */}
//       <div 
//         className="flex transition-transform duration-500 ease-in-out space-x-4"
//         style={{ 
//           transform: `translateX(-${currentIndex * 100}%)`,
//           width: `${tours.length * 110}%`
//         }}
//       >
//         {tours.map((tour, index) => (
//           <div 
//             key={index} 
//             className="w-full px-2 flex-shrink-0"
//             style={{ width: `${100 / tours.length}%` }}
//           >
//             <TourCard tour={tour} onClick={() => onTourClick && onTourClick(tour)} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button 
//         onClick={goToPrevSlide} 
//         className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
//       >
//         <ChevronLeft className="text-gray-700" />
//       </button>
//       <button 
//         onClick={goToNextSlide} 
//         className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition z-20"
//       >
//         <ChevronRight className="text-gray-700" />
//       </button>

//       {/* Progress Dots */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
//         {tours.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`
//               w-3 h-3 rounded-full transition-all duration-300
//               ${currentIndex === index 
//                 ? 'bg-orange-500 w-6' 
//                 : 'bg-gray-300 hover:bg-gray-400'}
//             `}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const TourCarouselWrapper = ({ tours }) => {
//   const handleTourClick = (tour) => {
//     // Add your click handling logic here
//     console.log('Tour clicked:', tour);
//   };

//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-6">Explore Our Tours</h2>
//         <TourCarousel 
//           tours={tours} 
//           autoPlayInterval={5000} 
//           onTourClick={handleTourClick} 
//         />
//       </div>
//     </div>
//   );
// };
// const TourDetailPage = ({ tour, onBack }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <>
//      {/* <div className="fixed inset-0 bg-gray-50 overflow-y-auto z-50"> */}
    
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-20 " >
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Tours
//         </button>
        
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Hero Section with Image and Essential Info */}
//           <div className="relative h-56 sm:h-64 md:h-72">
//             <img
//               src={tour.image}
//               alt={tour.title}
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
//             <div className="absolute bottom-0 left-0 right-0 p-6">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">BESTSELLER</span>
//                 <div className="flex items-center gap-1 text-white bg-black/30 px-2 py-1 rounded text-xs">
//                   <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                   <span>{tour.rating}</span>
//                 </div>
//               </div>
              
//               <h1 className="text-2xl sm:text-3xl font-bold text-white">{tour.title}</h1>
              
//               <div className="flex items-center gap-2 text-white/90 mt-2">
//                 <MapPin className="w-4 h-4" />
//                 <span className="text-sm">{tour.location}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Quick Info Bar */}
//           <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-50">
//             <div className="p-3 text-center">
//               <div className="flex flex-col items-center justify-center">
//                 <Calendar className="w-4 h-4 text-orange-500 mb-1" />
//                 <span className="text-xs text-gray-500">Duration</span>
//                 <span className="text-sm font-medium">{tour.duration}</span>
//               </div>
//             </div>
//             <div className="p-3 text-center">
//               <div className="flex flex-col items-center justify-center">
//                 <Users className="w-4 h-4 text-orange-500 mb-1" />
//                 <span className="text-xs text-gray-500">Group Size</span>
//                 <span className="text-sm font-medium">Max {tour.groupSize}</span>
//               </div>
//             </div>
//             <div className="p-3 text-center">
//               <div className="flex flex-col items-center justify-center">
//                 <DollarSign className="w-4 h-4 text-orange-500 mb-1" />
//                 <span className="text-xs text-gray-500">Price</span>
//                 <span className="text-sm font-bold text-green-600">${tour.price}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Tabs Navigation */}
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`px-4 py-3 text-sm font-medium transition-colors ${
//                 activeTab === 'overview'
//                   ? 'text-orange-500 border-b-2 border-orange-500'
//                   : 'text-gray-600 hover:text-orange-500'
//               }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('highlights')}
//               className={`px-4 py-3 text-sm font-medium transition-colors ${
//                 activeTab === 'highlights'
//                   ? 'text-orange-500 border-b-2 border-orange-500'
//                   : 'text-gray-600 hover:text-orange-500'
//               }`}
//             >
//               Highlights
//             </button>
//             <button
//               onClick={() => setActiveTab('inclusions')}
//               className={`px-4 py-3 text-sm font-medium transition-colors ${
//                 activeTab === 'inclusions'
//                   ? 'text-orange-500 border-b-2 border-orange-500'
//                   : 'text-gray-600 hover:text-orange-500'
//               }`}
//             >
//               Inclusions
//             </button>
//           </div>
          
//           {/* Tab Content */}
//           <div className="p-4 md:p-6">
//             {activeTab === 'overview' && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-900 mb-3">Tour Overview</h2>
//                 <p className="text-gray-600">{tour.description}</p>
                
                
//                   <div className="mt-6 flex justify-end gap-x-4">
//   {/* Book Now Button */}
//   <button 
//     onClick={() => handleBookNow(tour)} 
//     className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
//   >
//     Book Now
//   </button>

//   {/* Get Quote Button */}
//   <button 
//     onClick={() => handleGetQuote(tour)} 
// className="border border-orange-500 text-orange-500 py-2 px-6 rounded-lg hover:bg-orange-500 hover:text-white transition-colors font-medium"
//   >
//     Get Quote
//   </button>
// </div>

//                 </div>
//               // </div>
//             )}
            
//             {activeTab === 'highlights' && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <Mountain className="w-5 h-5 text-orange-500" />
//                   Tour Highlights
//                 </h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {tour.highlights.map((highlight, index) => (
//                     <li key={index} className="flex items-start gap-3 text-gray-600">
//                       <Compass className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
//                       <span>{highlight}</span>
//                     </li>
//                   ))}
//                 </ul>
                
//                 <div className="mt-6 flex justify-end">
//                   <button 
//                     onClick={() => handleBookNow(tour)} 
//                     className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'inclusions' && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-900 mb-3">What's Included:</h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {tour.included.map((item, index) => (
//                     <li key={index} className="flex items-center gap-2 text-gray-600">
//                       <CheckCircle className="w-4 h-4 text-orange-500" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
                
//                 <div className="mt-6 flex justify-end">
//                   <button 
//                     onClick={() => handleBookNow(tour)} 
//                     className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     {/* </div> */}
  
//     </>
// //     
    
//   );
// };


// export default TourDetailPage;
// import React, { useState } from 'react';
// import { 
//   X, Heart, Share2, Star, MapPin, Calendar, Users, Globe, 
//   Check, ChevronLeft 
// } from 'lucide-react';
// const ToursCarousels = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayTimerRef = useRef(null);
//   const carouselRef = useRef(null);

//   // Function to check if the screen is mobile
//   const checkIfMobile = () => {
//     setIsMobile(window.innerWidth < 768); // 768px is standard breakpoint for tablet
//   };

//   // Initialize mobile check and set up window resize listener
//   useEffect(() => {
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Calculate how many cards to display based on screen size
//   const displayCount = isMobile ? 1 : visibleCards;

//   // Total number of distinct positions in the carousel
//   const totalPositions = Math.max(1, tours.length - (displayCount - 1));

//   // Handle next slide
//   const nextSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex + 1) % totalPositions);
//   };

//   // Handle previous slide
//   const prevSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex - 1 + totalPositions) % totalPositions);
//   };

//   // Set up autoplay
//   useEffect(() => {
//     if (!isPaused && autoplayInterval > 0) {
//       autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
//     }
//     return () => clearInterval(autoplayTimerRef.current);
//   }, [isPaused, currentIndex, totalPositions, autoplayInterval]);

//   // Pause autoplay when hovering over carousel
//   const handleMouseEnter = () => setIsPaused(true);
//   const handleMouseLeave = () => setIsPaused(false);

//   // If no tours, return null
//   if (!tours || tours.length === 0) {
//     return null;
//   }

    
//   return (
//     <div 
//       className="relative w-full" 
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       ref={carouselRef}
//     >
//       {/* Cards container with smooth transition */}
//       <div className="overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * (100 / displayCount)}%)` }}
//         >
//           {tours.map((tour, index) => (
//             <div 
//               key={tour._id || index}
//               className={`flex-shrink-0 ${isMobile ? 'w-full' : `w-1/3`} px-2`}
//             >
//               <TourCard tour={tour} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows */}
//       {tours.length > displayCount && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {/* Pagination indicators */}
//       <div className="flex justify-center mt-4 gap-1">
//         {Array.from({ length: totalPositions }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
const TourCarouselWrapper = ({ tours }) => {
  const handleTourClick = (tour) => {
    // Add your click handling logic here
    console.log('Tour clicked:', tour);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Explore Our Tours</h2>
        <ToursCarousel
          tours={tours} 
          autoPlayInterval={5000} 
          onTourClick={handleTourClick}
          visibleSlides={3}
        />
      </div>
    </div>
  );
};

const TourDetailPage = ({ tour, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!tour) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Tours
        </button>

        <div className="relative w-full rounded-lg bg-white shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-2/5 relative h-52 md:h-auto">
              <img
                src={tour.image || "http://localhost:5000/uploads/placeholder.jpg"}
                alt={tour.title}
                className="h-full w-full object-cover md:rounded-l-lg"
              />
              <div className="absolute bottom-3 right-3 flex space-x-1.5">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="rounded-full bg-white/90 p-1.5 hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
                <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
                  <Share2 className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/5 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">{tour.title}</h2>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-xs text-gray-500">({tour.reviews})</span>
                </div>
              </div>

              {/* Location and Price */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-1 h-4 w-4 text-orange-500" />
                  <span>{tour.location}</span>
                </div>
                <div className="text-lg font-bold text-orange-500">
                  ${tour.price}
                  <span className="text-xs text-gray-500">/person</span>
                </div>
              </div>

              {/* Tour Details Row */}
              <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  {tour.duration} Days
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  Max {tour.groupSize}
                </div>
                <div className="flex items-center">
                  <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  English
                </div>
              </div>

              {/* Simplified Tabs - Horizontal Pills */}
              <div className="mt-3">
                <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      activeTab === 'overview'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      activeTab === 'itinerary'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => setActiveTab('included')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      activeTab === 'included'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    What's Included
                  </button>
                </div>

                {/* Tab Content - Scrollable container */}
                <div className="mt-3 overflow-y-auto max-h-56">
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">{tour.description}</p>
                      
                      <div className="mt-2">
                        <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
                        <ul className="mt-1 space-y-1">
                          {tour.highlights?.map((highlight, index) => (
                            <li key={index} className="flex items-start text-xs text-gray-600">
                              <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                                <Check className="h-2 w-2" />
                              </span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'itinerary' && (
                    <div className="space-y-3">
                      {tour.itinerary?.map((day, index) => (
                        <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                          <h3 className="text-sm font-semibold text-gray-800">Day {index + 1}</h3>
                          <p className="mt-1 text-xs text-gray-600">{day}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'included' && (
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Included</h3>
                        <ul className="mt-1 space-y-1">
                          {tour.included?.map((item, index) => (
                            <li key={index} className="flex items-start text-xs text-gray-600">
                              <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
                        <ul className="mt-1 space-y-1">
                          {tour.notIncluded?.map((item, index) => (
                            <li key={index} className="flex items-start text-xs text-gray-600">
                              <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Now and Get Quote Buttons */}
              <div className="mt-4 flex gap-x-4">
                <button 
                  onClick={() => handleBookNow(tour)} 
                  className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
                >
                  Book Now
                </button>

                <button 
                  onClick={() => handleGetQuote(tour)} 
                  className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TourDetailPage;
// const Tourmodel = ({ tour, isOpen, onClose, selectedTour, handleBookNow }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isFavorite, setIsFavorite] = useState(false);

//   if (!tour || !isOpen) return null;

//   return (
//     <div className="z-50 fixed inset-0 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/70" onClick={onClose} />

//       {/* Modal Container */}
//       <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
//         <div className="flex flex-col md:flex-row">
//           {/* Image Section - Reduced height */}
//           <div className="md:w-2/5 relative h-52 md:h-auto">
//             <img
//               src={tour.image || "http://localhost:5000/uploads/placeholder.jpg"}
//               alt={tour.title}
//               className="h-full w-full object-cover md:rounded-l-lg"
//             />
//             <button
//               onClick={onClose}
//               className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
//             >
//               <X className="h-4 w-4" />
//             </button>
//             <div className="absolute bottom-3 right-3 flex space-x-1.5">
//               <button 
//                 onClick={() => setIsFavorite(!isFavorite)}
//                 className="rounded-full bg-white/90 p-1.5 hover:bg-white"
//               >
//                 <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
//               </button>
//               <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
//                 <Share2 className="h-4 w-4 text-gray-700" />
//               </button>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="md:w-3/5 p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">{tour.title}</h2>
//               <div className="flex items-center space-x-1">
//                 <Star className="h-4 w-4 fill-current text-yellow-500" />
//                 <span className="font-semibold">{tour.rating}</span>
//                 <span className="text-xs text-gray-500">({tour.reviews})</span>
//               </div>
//             </div>

//             {/* Location and Price */}
//             <div className="mt-2 flex items-center justify-between">
//               <div className="flex items-center text-sm text-gray-600">
//                 <MapPin className="mr-1 h-4 w-4 text-orange-500" />
//                 <span>{tour.location}</span>
//               </div>
//               <div className="text-lg font-bold text-orange-500">
//                 ${tour.price}
//                 <span className="text-xs text-gray-500">/person</span>
//               </div>
//             </div>

//             {/* Tour Details Row */}
//             <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
//               <div className="flex items-center">
//                 <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
//                 {tour.duration} Days
//               </div>
//               <div className="flex items-center">
//                 <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
//                 Max {tour.groupSize}
//               </div>
//               <div className="flex items-center">
//                 <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
//                 English
//               </div>
//             </div>

//             {/* Simplified Tabs - Horizontal Pills */}
//             <div className="mt-3">
//               <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`px-3 py-1 rounded-full whitespace-nowrap ${
//                     activeTab === 'overview'
//                       ? 'bg-orange-500 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('itinerary')}
//                   className={`px-3 py-1 rounded-full whitespace-nowrap ${
//                     activeTab === 'itinerary'
//                       ? 'bg-orange-500 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   Itinerary
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('included')}
//                   className={`px-3 py-1 rounded-full whitespace-nowrap ${
//                     activeTab === 'included'
//                       ? 'bg-orange-500 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   What's Included
//                 </button>
//               </div>

//               {/* Tab Content - Scrollable container */}
//               <div className="mt-3 overflow-y-auto max-h-56">
//                 {activeTab === 'overview' && (
//                   <div className="space-y-3">
//                     <p className="text-sm text-gray-600 leading-relaxed">{tour.description}</p>
                    
//                     <div className="mt-2">
//                       <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
//                       <ul className="mt-1 space-y-1">
//                         {tour.highlights?.map((highlight, index) => (
//                           <li key={index} className="flex items-start text-xs text-gray-600">
//                             <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
//                               <Check className="h-2 w-2" />
//                             </span>
//                             {highlight}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'itinerary' && (
//                   <div className="space-y-3">
//                     {tour.itinerary?.map((day, index) => (
//                       <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
//                         <h3 className="text-sm font-semibold text-gray-800">Day {index + 1}</h3>
//                         <p className="mt-1 text-xs text-gray-600">{day}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {activeTab === 'included' && (
//                   <div className="grid grid-cols-1 gap-3">
//                     <div>
//                       <h3 className="text-sm font-semibold text-gray-800">Included</h3>
//                       <ul className="mt-1 space-y-1">
//                         {tour.included?.map((item, index) => (
//                           <li key={index} className="flex items-start text-xs text-gray-600">
//                             <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
//                       <ul className="mt-1 space-y-1">
//                         {tour.notIncluded?.map((item, index) => (
//                           <li key={index} className="flex items-start text-xs text-gray-600">
//                             <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Book Now Button */}
//             {/* <div className="mt-4">
//               <button 
//                 onClick={() => handleBookNow(tour)} 
//                 className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
//               >
//                 Book Now
//               </button>
//             </div> */}
//             <div className="mt-4 flex gap-x-4">
//   {/* Book Now Button */}
//   <button 
//     onClick={() => handleBookNow(tour)} 
//     className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
//   >
//     Book Now
//   </button>

//   {/* Get Quote Button (Outlined) */}
//   <button 
//     onClick={() => handleGetQuote(tour)} 
//     className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
//   >
//     Get Quote
//   </button>
// </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const handleBookNow = async (tour) => {
    if (!tour) {
      alert("❌ Invalid tour selected. Please try again.");
      return;
    }
  
    const { title, price, description } = tour;
    if (!title || !price) {
      alert("❌ Missing tour information. Please check the destination data.");
      return;
    }
  
    // Fetch user token
    const token = localStorage.getItem('token');
    let userData = null;
  
    if (token) {
      try {
        const userRes = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        userData = userRes.data;
      } catch (error) {
        console.error('🚨 Error fetching user data:', error);
      }
    }
  
    // Ask for email if not found
    let userEmail = userData?.email?.trim() || prompt("Please enter your email for booking confirmation:");
    if (!userEmail) {
      alert("❌ Email is required for booking.");
      return;
    }
  
    const packageDetails = {
      id: `tour-${Date.now()}`,
      name: title,
      description: `Tour package for ${title}`,
    };
  
    // Payment Process
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
  
    const initiatePayment = async () => {
      try {
        const res = await loadRazorpay();
        if (!res) {
          alert('❌ Razorpay SDK failed to load');
          return;
        }
        const amountInPaise = Number(price) * 100; // Convert to paise
  
        const payload = {
          amount: amountInPaise,
          packageDetails,
          email: userEmail,
          name: userData?.username || 'Guest',
        };
  
        const orderResponse = await fetch('http://localhost:5000/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
          return;
        }
  
        const { order } = await orderResponse.json();
        if (!order?.id) {
          alert("Order creation failed. Please try again.");
          return;
        }
  
        const options = {
          key: "rzp_live_VQS2zWKwCIE5ON",
          amount: price * 100,
          currency: 'INR',
          name: "Your Travel Company",
          description: packageDetails.description,
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  customerDetails: {
                    name: userData?.username || 'Guest',
                    email: userEmail,
                  },
                }),
              });
  
              const data = await verifyResponse.json();
              if (data.success) {
                alert('🎉 Booking successful!');
              } else {
                alert('❌ Payment verification failed');
              }
            } catch (error) {
              alert('❌ Payment verification failed');
            }
          },
          prefill: {
            name: userData?.username || 'Guest',
            email: userEmail,
          },
          theme: { color: '#3399cc' },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert('❌ Payment initiation failed');
      }
    };
  
    initiatePayment();
  };
  
  // const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => {
  //   return (
  //     <div className="min-h-screen bg-gray-50 p-4 md:p-8  z-auto  mt-0">
  //       <div className="max-w-7xl mx-auto">
  //         <button
  //           onClick={onBack}
  //           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
  //         >
  //           <ChevronLeft className="w-5 h-5 " />
  //           Back to Search
  //         </button>
  
  //         <h1 className="text-3xl font-bold text-gray-900 mb-8">Tours in {location}</h1>
          
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {tours.map(tour => (
  //             <TourCard 
  //               key={tour.id} 
  //               tour={tour} 
  //               onClick={() => onTourSelect(tour)}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
    
      
  //   );
  // };

  
  const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => {
    return (
      <div className="min-h-screen bg-gray-50  z-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="mb-0 flex items-center gap-2 text-black-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Search
          </button>
          
          {/* <h1 className="text-1xl font-bold text-black-900 mb-2">Tours in {location}</h1> */}
          
          {tours && tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map(tour => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onClick={() => onTourSelect(tour)}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-700">No tours available for this location.</p>
          )}
        </div>
      </div>
    );
  };

// // export const SearchBar = () => {
  // const [searchState, setSearchState] = useState({
  //   query: "",
  //   isLoading: false,
  //   destinations: [],
  //   tours: [],
  //   filteredResults: [],
  //   selectedLocation: null,
  //   locationTours: [],
  //   selectedTour: null,
  //   currentPlaceholder: "",
  //   isSearchFocused: false,
  //   showSuggestions: false,
  // });

  // const searchInputRef = useRef(null);
  // const resultsContainerRef = useRef(null);
  // const typingTimerRef = useRef(null);

  // const {
  //   query,
  //   isLoading,
  //   destinations,
  //   tours,
  //   filteredResults,
  //   selectedLocation,
  //   locationTours,
  //   selectedTour,
  //   currentPlaceholder,
  //   isSearchFocused,
  //   showSuggestions,
  // } = searchState;

  // // Update any part of the search state
  // const updateSearchState = (updates) => {
  //   setSearchState(prev => ({ ...prev, ...updates }));
  // };

  // // Destinations for typewriter effect
  // const placeholders = [
  //   "sonamarg", "Gulmarg", "Kashmir", "Pahalgam", 
  //   "Thailand", "Dubai", "Singapore", "Dal Lake"
  // ];

  // // Typewriter effect function - remains unchanged
  // const typewriterEffect = () => {
  //   let currentIndex = 0;
  //   let charIndex = 0;
  //   let isDeleting = false;
  //   let currentWord = placeholders[0];
    
  //   const type = () => {
  //     if (isSearchFocused) {
  //       typingTimerRef.current = setTimeout(type, 2000);
  //       return;
  //     }
      
  //     currentWord = placeholders[currentIndex];
      
  //     if (isDeleting) {
  //       charIndex--;
  //     } else {
  //       charIndex++;
  //     }
      
  //     updateSearchState({
  //       currentPlaceholder: currentWord.substring(0, charIndex)
  //     });
      
  //     if (!isDeleting && charIndex === currentWord.length) {
  //       isDeleting = true;
  //       typingTimerRef.current = setTimeout(type, 1500);
  //       return;
  //     } else if (isDeleting && charIndex === 0) {
  //       isDeleting = false;
  //       currentIndex = (currentIndex + 1) % placeholders.length;
  //       typingTimerRef.current = setTimeout(type, 500);
  //       return;
  //     }
      
  //     typingTimerRef.current = setTimeout(
  //       type, 
  //       isDeleting ? 100 : 150
  //     );
  //   };
    
  //   typingTimerRef.current = setTimeout(type, 1000);
  // };

  // const fetchData = async () => {
  //   updateSearchState({ isLoading: true });
    
  //   try {
  //     const [toursResponse, destinationsResponse] = await Promise.all([
  //       fetch('http://localhost:5000/api/Grid'),
  //       fetch('http://localhost:5000/api/tours')
  //     ]);

  //     const [toursData, destinationsData] = await Promise.all([
  //       toursResponse.json(),
  //       destinationsResponse.json()
  //     ]);

  //     updateSearchState({
  //       tours: toursData || [],
  //       destinations: destinationsData || [],
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     updateSearchState({ isLoading: false });
  //   }
  // };

  // // Search function - remains the same
  // const searchLocations = (searchQuery) => {
  //   if (!searchQuery.trim()) return [];
  //   const query = searchQuery.toLowerCase();
    
  //   const matchingTours = tours.filter(tour => 
  //     tour.title?.toLowerCase().includes(query) ||
  //     tour.location?.toLowerCase().includes(query)
  //   );

  //   const matchingDestinations = destinations.filter(dest => 
  //     dest.title?.toLowerCase().includes(query) ||
  //     dest.location?.toLowerCase().includes(query) ||
  //     dest.description?.toLowerCase().includes(query)
  //   );

  //   const combinedResults = [...matchingTours, ...matchingDestinations];
  //   const uniqueLocations = Array.from(new Set(
  //     combinedResults.map(item => item.location)
  //   )).map(location => 
  //     combinedResults.find(item => item.location === location)
  //   );

  //   return uniqueLocations;
  // };

  // const handleLocationSelect = (item) => {
  //   const relevantTours = tours.filter(tour => 
  //     tour.location?.toLowerCase() === item.location?.toLowerCase()
  //   );
    
  //   updateSearchState({
  //     locationTours: relevantTours,
  //     selectedLocation: item.location,
  //     query: "",
  //     filteredResults: [],
  //     showSuggestions: false,
  //   });
  // };

  // const handleBackToSearch = () => {
  //   updateSearchState({
  //     selectedLocation: null,
  //     locationTours: [],
  //     selectedTour: null,
  //   });
  // };

  // const handleTourSelect = (tour) => {
  //   updateSearchState({
  //     selectedTour: tour,
  //   });
  // };

  // const handleBackToTours = () => {
  //   updateSearchState({
  //     selectedTour: null,
  //   });
  // };

  // // Handle click outside to close dropdown
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       resultsContainerRef.current && 
  //       !resultsContainerRef.current.contains(event.target) &&
  //       !searchInputRef.current?.contains(event.target)
  //     ) {
  //       updateSearchState({ 
  //         isSearchFocused: false, 
  //         showSuggestions: false 
  //       });
  //     }
  //   };
    
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  // // Initial data fetch
  // useEffect(() => {
  //   fetchData();
  //   typewriterEffect();
  //   return () => clearTimeout(typingTimerRef.current);
  // }, []);

  // // Search effect with debounce
  // useEffect(() => {
  //   const debounceTimeout = setTimeout(() => {
  //     if (query.trim()) {
  //       const results = searchLocations(query);
  //       updateSearchState({ 
  //         filteredResults: results,
  //         showSuggestions: true 
  //       });
  //     } else {
  //       updateSearchState({ 
  //         filteredResults: [],
  //         showSuggestions: false 
  //       });
  //     }
  //   }, 300);

  //   return () => clearTimeout(debounceTimeout);
  // }, [query]);

  // // Render TourDetailPage if a tour is selected
  // if (selectedTour) {
  //   return <TourDetailPage tour={selectedTour} onBack={handleBackToTours} />;
  // }

  // // Render LocationToursPage if a location is selected
  // if (selectedLocation) {
  //   return (
  //     <LocationToursPage
  //       location={selectedLocation}
  //       tours={locationTours}
  //       onBack={handleBackToSearch}
  //       onTourSelect={handleTourSelect}
  //     />
  //   );
  // }

  // // Popular destinations
  // const popularDestinations = ['Sonamarg', 'Pahalgam', 'Gulmarg', 'Kashmir', 'Thailand'];

  // // Render the main search bar - redesigned for compactness
  // return (
   
  //   <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
  //     {/* Main container with reduced padding */}
    
  //        {filteredResults.length > 0 && (
  //       <div className="bg-gray-50 p-4"> 
  //        {/* <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
  //           Search Results for "{query}"
  //        </h3>  */}
  //          {/* <TourCarouselWrapper tours={filteredResults} /> */}
  //           {/* <ToursCarousel tours={filteredResults}  autoplayInterval={6000} /> */}
  //            <ToursCarousel tours={filteredResults} TourCard={TourCard} autoplayInterval={6000}
  //                 visibleCards={3} />
  //        </div> 
  //      )}  
  //     <div className="px-4 py-3 md:px-6 md:py-4"> 
  //         {/* Title with reduced margin  */}
  //       <h2 className="text-lg font-bold text-center mb-2 text-gray-800 whitespace-nowrap">
  //         Discover Your Perfect Adventure
  //       </h2>
        
  //       <div className="relative" ref={resultsContainerRef}>
  //         {/* Search input with reduced height */}
  //         <div className={`relative flex items-center w-full bg-white rounded-lg border-2 transition-all duration-200 ${
  //           isSearchFocused ? "border-orange-500 shadow-sm" : "border-gray-200"
  //         }`}>
  //           <MapPin className="absolute left-3 text-orange-500" size={18} />
  //           <input
  //             ref={searchInputRef}
  //             type="text"
  //             placeholder={`Search for ${currentPlaceholder || "destinations"}...`}
  //             className="w-full py-2 pl-10 pr-16 text-gray-700 placeholder-gray-400 text-base rounded-lg focus:outline-none"
  //             value={query}
  //             onChange={(e) => updateSearchState({ query: e.target.value })}
  //             onFocus={() => updateSearchState({ 
  //               isSearchFocused: true, 
  //               showSuggestions: true 
  //             })}
  //           />
  //           {query && (
  //             <button
  //               onClick={() => updateSearchState({ 
  //                 query: '', 
  //                 filteredResults: [], 
  //                 showSuggestions: false 
  //               })}
  //               className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
  //             >
  //               <X size={18} />
  //             </button>
  //           )}
  //           {isLoading ? (
  //             <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-orange-500" size={18} />
  //           ) : (
  //             <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition-colors">
  //               <Search size={16} />
  //             </button>
  //           )}
  //         </div>

  //         {/* Popular destinations - inline with search */}
  //         <div className="flex items-center mt-2 overflow-x-auto pb-1 scrollbar-thin">
  //           <span className="text-xs font-medium text-gray-500 whitespace-nowrap mr-2">Popular:</span>
  //           <div className="flex gap-1.5">
  //             {popularDestinations.map(destination => (
  //               <button 
  //                 key={destination}
  //                 onClick={() => {
  //                   updateSearchState({ 
  //                     query: destination,
  //                     filteredResults: searchLocations(destination),
  //                     isSearchFocused: true,
  //                     showSuggestions: true
  //                   });
  //                 }}
  //                 className="bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
  //               >
  //                 {destination}
  //               </button>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Suggestions dropdown - with fixed height and scrollbar */}
  //         {showSuggestions && query && (
  //           <div 
  //             className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100"
  //             style={{ 
  //               width: '100%',
  //               maxHeight: '300px',
  //             }}
  //           >
  //             {filteredResults.length > 0 ? (
  //               <div className="max-h-64 overflow-y-auto custom-scrollbar">
  //                 <ul>
  //                   {filteredResults.map((item, index) => (
  //                     <li
  //                       key={item._id || index}
  //                       onClick={() => handleLocationSelect(item)}
  //                       className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
  //                     >
  //                       <div className="flex items-center">
  //                         <div className="bg-orange-100 rounded-full p-1.5 mr-2">
  //                           <MapPin className="text-orange-500" size={14} />
  //                         </div>
  //                         <div>
  //                           <div className="text-gray-800 font-medium text-sm">
  //                             {item.location}
  //                           </div>
  //                           <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
  //                             {item.title || `${item.description?.slice(0, 40)}...`}
  //                           </div>
  //                         </div>
  //                       </div>
  //                       {item.price && (
  //                         <div className="text-orange-600 font-medium text-sm ml-2">
  //                           {item.price}
  //                         </div>
  //                       )}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             ) : (
  //               <div className="p-3 text-center text-gray-500 text-sm">
  //                 No destinations found. Try a different search term.
  //               </div>
  //             )}
  //             {/* Quick filters at bottom of dropdown */}
  //             {filteredResults.length > 0 && (
  //               <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
  //                 <span className="text-xs text-gray-500">Filter by:</span>
  //                 <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
  //                   Price ↓
  //                 </button>
  //                 <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
  //                   Popular
  //                 </button>
  //                 <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
  //                   Ratings
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     </div>

  //      {/* Optional: Recently viewed (collapsible section) */}
  //     <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 block md:hidden">
  //       <div className="flex justify-between items-center">
  //         <span className="text-xs font-medium text-gray-500">Recently viewed</span>
  //         <button className="text-orange-500 text-xs hover:underline">See all</button>
  //       </div>
  //       <div className="flex gap-2 mt-1 overflow-x-auto pb-1 scrollbar-thin">
  //         {['Gulmarg', 'Dal Lake', 'Thailand'].map(recent => (
  //           <div key={recent} className="flex items-center bg-white rounded px-2 py-1 border border-gray-200 whitespace-nowrap">
  //             <Clock className="text-gray-400 mr-1" size={12} />
  //             <span className="text-xs text-gray-700">{recent}</span>
  //           </div>
  //         ))}
  //       </div> 
  //     </div>
  //   </div>
   
  // );
// };

// export default SearchBar;



// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, MapPin, X, Loader2, Search, Clock } from 'lucide-react';

export const SearchBar = () => {
  const [searchState, setSearchState] = useState({
    query: "",
    isLoading: false,
    destinations: [],
    tours: [],
    filteredResults: [],
    selectedLocation: null,
    locationTours: [],
    selectedTour: null,
    currentPlaceholder: "",
    isSearchFocused: false,
    showSuggestions: false,
    displayedTours: [], // New state to track tours that should be displayed
  });

  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const typingTimerRef = useRef(null);

  const {
    query,
    isLoading,
    destinations,
    tours,
    filteredResults,
    selectedLocation,
    locationTours,
    selectedTour,
    currentPlaceholder,
    isSearchFocused,
    showSuggestions,
    displayedTours, // Include in destructuring
  } = searchState;

  // Update any part of the search state
  const updateSearchState = (updates) => {
    setSearchState(prev => ({ ...prev, ...updates }));
  };

  // Destinations for typewriter effect
  const placeholders = [
    "sonamarg", "Gulmarg", "Kashmir", "Pahalgam", 
    "Thailand", "Dubai", "Singapore", "Dal Lake"
  ];

  // Typewriter effect function
  const typewriterEffect = () => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = placeholders[0];
    
    const type = () => {
      if (isSearchFocused) {
        typingTimerRef.current = setTimeout(type, 2000);
        return;
      }
      
      currentWord = placeholders[currentIndex];
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      
      updateSearchState({
        currentPlaceholder: currentWord.substring(0, charIndex)
      });
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingTimerRef.current = setTimeout(type, 1500);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % placeholders.length;
        typingTimerRef.current = setTimeout(type, 500);
        return;
      }
      
      typingTimerRef.current = setTimeout(
        type, 
        isDeleting ? 100 : 150
      );
    };
    
    typingTimerRef.current = setTimeout(type, 1000);
  };

  const fetchData = async () => {
    updateSearchState({ isLoading: true });
    
    try {
      const [toursResponse, destinationsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/Grid'),
        fetch('http://localhost:5000/api/tours')
      ]);

      const [toursData, destinationsData] = await Promise.all([
        toursResponse.json(),
        destinationsResponse.json()
      ]);

      updateSearchState({
        tours: toursData || [],
        destinations: destinationsData || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      updateSearchState({ isLoading: false });
    }
  };

  // Search function - updated to not trigger results display
  const searchLocations = (searchQuery) => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const matchingTours = tours.filter(tour => 
      tour.title?.toLowerCase().includes(query) ||
      tour.location?.toLowerCase().includes(query)
    );

    const matchingDestinations = destinations.filter(dest => 
      dest.title?.toLowerCase().includes(query) ||
      dest.location?.toLowerCase().includes(query) ||
      dest.description?.toLowerCase().includes(query)
    );

    const combinedResults = [...matchingTours, ...matchingDestinations];
    const uniqueLocations = Array.from(new Set(
      combinedResults.map(item => item.location)
    )).map(location => 
      combinedResults.find(item => item.location === location)
    );

    return uniqueLocations;
  };

  // Updated handler to show tours in the carousel only after selection
  const handleLocationSelect = (item) => {
    const relevantTours = tours.filter(tour => 
      tour.location?.toLowerCase() === item.location?.toLowerCase()
    );
    
    updateSearchState({
      locationTours: relevantTours,
      selectedLocation: item.location,
      query: item.location, // Set query to selected location
      filteredResults: [], // Clear filtered results
      displayedTours: relevantTours, // Update displayed tours
      showSuggestions: false,
    });
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      const results = searchLocations(query);
      
      if (results.length === 1) {
        // If there's only one result, select it automatically
        handleLocationSelect(results[0]);
      } else if (results.length > 1) {
        // Just show suggestions if there are multiple results
        updateSearchState({ 
          filteredResults: results,
          showSuggestions: true,
          displayedTours: [] // Clear displayed tours
        });
      } else {
        // No results found
        updateSearchState({
          filteredResults: [],
          showSuggestions: true,
          displayedTours: [] // Clear displayed tours
        });
      }
    }
  };

  const handleBackToSearch = () => {
    updateSearchState({
      selectedLocation: null,
      locationTours: [],
      selectedTour: null,
      displayedTours: [] // Clear displayed tours when going back
    });
  };

  const handleTourSelect = (tour) => {
    updateSearchState({
      selectedTour: tour,
    });
  };

  const handleBackToTours = () => {
    updateSearchState({
      selectedTour: null,
    });
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsContainerRef.current && 
        !resultsContainerRef.current.contains(event.target) &&
        !searchInputRef.current?.contains(event.target)
      ) {
        updateSearchState({ 
          isSearchFocused: false, 
          showSuggestions: false 
        });
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
    typewriterEffect();
    return () => clearTimeout(typingTimerRef.current);
  }, []);

  // Modified search effect with debounce - only updates suggestions, not displayed tours
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.trim()) {
        const results = searchLocations(query);
        updateSearchState({ 
          filteredResults: results,
          showSuggestions: true
          // Not updating displayedTours here
        });
      } else {
        updateSearchState({ 
          filteredResults: [],
          showSuggestions: false
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Render TourDetailPage if a tour is selected
  if (selectedTour) {
    return <TourDetailPage tour={selectedTour} onBack={handleBackToTours} />;
  }

  // Render LocationToursPage if a location is selected
  if (selectedLocation) {
    return (
      <LocationToursPage
        location={selectedLocation}
        tours={locationTours}
        onBack={handleBackToSearch}
        onTourSelect={handleTourSelect}
      />
    );
  }

  // Popular destinations
  const popularDestinations = ['Sonamarg', 'Pahalgam', 'Gulmarg', 'Kashmir', 'Thailand'];

  // Render the main search bar
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Display carousel only when we have tours to display */}
      {displayedTours.length > 0 && (
        <div className="bg-gray-50 p-4"> 
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
            Tours in {selectedLocation || query}
          </h3>
          <ToursCarousel tours={displayedTours} TourCard={TourCard} autoplayInterval={6000} visibleCards={3} />
        </div> 
      )}
      
      <div className="px-4 py-3 md:px-6 md:py-4"> 
        <h2 className="text-lg font-bold text-center mb-2 text-gray-800 whitespace-nowrap">
          Discover Your Perfect Adventure
        </h2>
        
        <div className="relative" ref={resultsContainerRef}>
          {/* Search input wrapped in form for submission */}
          <form onSubmit={handleSearchSubmit}>
            <div className={`relative flex items-center w-full bg-white rounded-lg border-2 transition-all duration-200 ${
              isSearchFocused ? "border-orange-500 shadow-sm" : "border-gray-200"
            }`}>
              <MapPin className="absolute left-3 text-orange-500" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={`Search for ${currentPlaceholder || "destinations"}...`}
                className="w-full py-2 pl-10 pr-16 text-gray-700 placeholder-gray-400 text-base rounded-lg focus:outline-none"
                value={query}
                onChange={(e) => updateSearchState({ query: e.target.value })}
                onFocus={() => updateSearchState({ 
                  isSearchFocused: true, 
                  showSuggestions: query.trim() ? true : false
                })}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateSearchState({ 
                    query: '', 
                    filteredResults: [], 
                    showSuggestions: false,
                    displayedTours: [] // Clear displayed tours
                  })}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
              {isLoading ? (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-orange-500" size={18} />
              ) : (
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition-colors"
                >
                  <Search size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Popular destinations - inline with search */}
          <div className="flex items-center mt-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap mr-2">Popular:</span>
            <div className="flex gap-1.5">
              {popularDestinations.map(destination => (
                <button 
                  key={destination}
                  onClick={() => {
                    updateSearchState({ query: destination });
                    // Find matching location
                    const matchingLocation = searchLocations(destination)[0];
                    if (matchingLocation) {
                      handleLocationSelect(matchingLocation);
                    }
                  }}
                  className="bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && query && (
            <div 
              className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100"
              style={{ 
                width: '100%',
                maxHeight: '300px',
              }}
            >
              {filteredResults.length > 0 ? (
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  <ul>
                    {filteredResults.map((item, index) => (
                      <li
                        key={item._id || index}
                        onClick={() => handleLocationSelect(item)}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="bg-orange-100 rounded-full p-1.5 mr-2">
                            <MapPin className="text-orange-500" size={14} />
                          </div>
                          <div>
                            <div className="text-gray-800 font-medium text-sm">
                              {item.location}
                            </div>
                            <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                              {item.title || `${item.description?.slice(0, 40)}...`}
                            </div>
                          </div>
                        </div>
                        {item.price && (
                          <div className="text-orange-600 font-medium text-sm ml-2">
                            {item.price}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No destinations found. Try a different search term.
                </div>
              )}
              {/* Quick filters at bottom of dropdown */}
              {filteredResults.length > 0 && (
                <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
                  <span className="text-xs text-gray-500">Filter by:</span>
                  <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
                    Price ↓
                  </button>
                  <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
                    Popular
                  </button>
                  <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
                    Ratings
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional: Recently viewed (collapsible section) */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 ">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">Recently viewed</span>
          <button className="text-orange-500 text-xs hover:underline">See all</button>
        </div>
        <div className="flex gap-2 mt-1 overflow-x-auto pb-1 scrollbar-thin">
          {['Gulmarg', 'Dal Lake', 'Thailand'].map(recent => (
            <div key={recent} className="flex items-center bg-white rounded px-2 py-1 border border-gray-200 whitespace-nowrap">
              <Clock className="text-gray-400 mr-1" size={12} />
              <span className="text-xs text-gray-700">{recent}</span>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
};

export default SearchBar;


// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, MapPin, X, Loader2, Search, Clock } from 'lucide-react';

// export const SearchBar = () => {
//   const [searchState, setSearchState] = useState({
//     query: "",
//     isLoading: false,
//     destinations: [],
//     tours: [],
//     filteredResults: [],
//     selectedLocation: null,
//     locationTours: [],
//     selectedTour: null,
//     currentPlaceholder: "",
//     isSearchFocused: false,
//     showSuggestions: false,
//     displayedTours: [], // For showing tours after selection
//   });

//   const searchInputRef = useRef(null);
//   const resultsContainerRef = useRef(null);
//   const typingTimerRef = useRef(null);

//   const {
//     query,
//     isLoading,
//     destinations,
//     tours,
//     filteredResults,
//     selectedLocation,
//     locationTours,
//     selectedTour,
//     currentPlaceholder,
//     isSearchFocused,
//     showSuggestions,
//     displayedTours,
//   } = searchState;

//   // Update any part of the search state
//   const updateSearchState = (updates) => {
//     setSearchState(prev => ({ ...prev, ...updates }));
//   };

//   // Destinations for typewriter effect
//   const placeholders = [
//     "sonamarg", "Gulmarg", "Kashmir", "Pahalgam", 
//     "Thailand", "Dubai", "Singapore", "Dal Lake"
//   ];

//   // Typewriter effect function
//   const typewriterEffect = () => {
//     let currentIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     let currentWord = placeholders[0];
    
//     const type = () => {
//       if (isSearchFocused) {
//         typingTimerRef.current = setTimeout(type, 2000);
//         return;
//       }
      
//       currentWord = placeholders[currentIndex];
      
//       if (isDeleting) {
//         charIndex--;
//       } else {
//         charIndex++;
//       }
      
//       updateSearchState({
//         currentPlaceholder: currentWord.substring(0, charIndex)
//       });
      
//       if (!isDeleting && charIndex === currentWord.length) {
//         isDeleting = true;
//         typingTimerRef.current = setTimeout(type, 1500);
//         return;
//       } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         currentIndex = (currentIndex + 1) % placeholders.length;
//         typingTimerRef.current = setTimeout(type, 500);
//         return;
//       }
      
//       typingTimerRef.current = setTimeout(
//         type, 
//         isDeleting ? 100 : 150
//       );
//     };
    
//     typingTimerRef.current = setTimeout(type, 1000);
//   };

//   const fetchData = async () => {
//     updateSearchState({ isLoading: true });
    
//     try {
//       const [toursResponse, destinationsResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/Grid'),
//         fetch('http://localhost:5000/api/tours')
//       ]);

//       const [toursData, destinationsData] = await Promise.all([
//         toursResponse.json(),
//         destinationsResponse.json()
//       ]);

//       updateSearchState({
//         tours: toursData || [],
//         destinations: destinationsData || [],
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       updateSearchState({ isLoading: false });
//     }
//   };

//   // Enhanced search function to provide more accurate suggestions
//   const searchLocations = (searchQuery) => {
//     if (!searchQuery.trim()) return [];
//     const query = searchQuery.toLowerCase();
    
//     // Match tours by title or location
//     const matchingTours = tours.filter(tour => 
//       tour.title?.toLowerCase().includes(query) ||
//       tour.location?.toLowerCase().includes(query)
//     );

//     // Match destinations by title, location or description
//     const matchingDestinations = destinations.filter(dest => 
//       dest.title?.toLowerCase().includes(query) ||
//       dest.location?.toLowerCase().includes(query) ||
//       dest.description?.toLowerCase().includes(query)
//     );

//     // Combine results
//     const combinedResults = [...matchingTours, ...matchingDestinations];
    
//     // Get unique locations for suggestions
//     const uniqueLocations = Array.from(new Set(
//       combinedResults.map(item => item.location)
//     )).map(location => 
//       combinedResults.find(item => item.location === location)
//     );

//     return uniqueLocations;
//   };

//   // Updated handler to show ONLY the selected tour/location
//   const handleLocationSelect = (item) => {
//     // Find relevant tours for the selected location
//     const relevantTours = tours.filter(tour => 
//       tour.location?.toLowerCase() === item.location?.toLowerCase()
//     );
    
//     updateSearchState({
//       locationTours: relevantTours,
//       selectedLocation: item.location,
//       query: item.location, // Set query to selected location
//       filteredResults: [], // Clear filtered results
//       displayedTours: relevantTours, // Only display tours for selected location
//       showSuggestions: false, // Hide suggestions after selection
//     });
//   };

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     if (e) e.preventDefault();
    
//     if (query.trim()) {
//       const results = searchLocations(query);
      
//       if (results.length === 1) {
//         // If there's only one result, select it automatically
//         handleLocationSelect(results[0]);
//       } else if (results.length > 0) {
//         // Just show suggestions if there are multiple results
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true,
//           displayedTours: [] // Clear displayed tours until user selects
//         });
//       } else {
//         // No results found
//         updateSearchState({
//           filteredResults: [],
//           showSuggestions: true,
//           displayedTours: [] 
//         });
//       }
//     }
//   };

//   const handleBackToSearch = () => {
//     updateSearchState({
//       selectedLocation: null,
//       locationTours: [],
//       selectedTour: null,
//       displayedTours: [] // Clear displayed tours when going back
//     });
//   };

//   const handleTourSelect = (tour) => {
//     updateSearchState({
//       selectedTour: tour,
//     });
//   };

//   const handleBackToTours = () => {
//     updateSearchState({
//       selectedTour: null,
//     });
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         resultsContainerRef.current && 
//         !resultsContainerRef.current.contains(event.target) &&
//         !searchInputRef.current?.contains(event.target)
//       ) {
//         updateSearchState({ 
//           isSearchFocused: false, 
//           showSuggestions: false 
//         });
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchData();
//     typewriterEffect();
//     return () => clearTimeout(typingTimerRef.current);
//   }, []);

//   // Show suggestions as user types with debounce
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (query.trim()) {
//         const results = searchLocations(query);
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true
//           // Not updating displayedTours here - only on selection
//         });
//       } else {
//         updateSearchState({ 
//           filteredResults: [],
//           showSuggestions: false
//         });
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [query]);

//   // Render TourDetailPage if a tour is selected
//   if (selectedTour) {
//     return <TourDetailPage tour={selectedTour} onBack={handleBackToTours} />;
//   }

//   // Render LocationToursPage if a location is selected
//   if (selectedLocation) {
//     return (
//       <LocationToursPage
//         location={selectedLocation}
//         tours={locationTours}
//         onBack={handleBackToSearch}
//         onTourSelect={handleTourSelect}
//       />
//     );
//   }

//   // Popular destinations
//   const popularDestinations = ['Sonamarg', 'Pahalgam', 'Gulmarg', 'Kashmir', 'Thailand'];

//   // Render the main search bar
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
//       {/* Display carousel only when we have tours to display  */}
//        {displayedTours.length > 0 && (
//         <div className="bg-gray-50 p-4"> 
//           <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
//             Tours in {selectedLocation || query}
//           </h3>
//           <ToursCarousel tours={displayedTours} TourCard={TourCard} autoplayInterval={6000} visibleCards={3} />
//         </div> 
//       )} 
      

       
    
//       <div className="px-4 py-3 md:px-6 md:py-4"> 
//         <h2 className="text-lg font-bold text-center mb-2 text-gray-800 whitespace-nowrap">
//           Discover Your Perfect Adventure
//         </h2>
        
//         <div className="relative" ref={resultsContainerRef}>
//           {/* Search input wrapped in form for submission */}
//           <form onSubmit={handleSearchSubmit}>
//             <div className={`relative flex items-center w-full bg-white rounded-lg border-2 transition-all duration-200 ${
//               isSearchFocused ? "border-orange-500 shadow-sm" : "border-gray-200"
//             }`}>
//               <MapPin className="absolute left-3 text-orange-500" size={18} />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder={`Search for ${currentPlaceholder || "destinations"}...`}
//                 className="w-full py-2 pl-10 pr-16 text-gray-700 placeholder-gray-400 text-base rounded-lg focus:outline-none"
//                 value={query}
//                 onChange={(e) => updateSearchState({ query: e.target.value })}
//                 onFocus={() => updateSearchState({ 
//                   isSearchFocused: true, 
//                   showSuggestions: query.trim() ? true : false
//                 })}
//               />
//               {query && (
//                 <button
//                   type="button"
//                   onClick={() => updateSearchState({ 
//                     query: '', 
//                     filteredResults: [], 
//                     showSuggestions: false,
//                     displayedTours: [] // Clear displayed tours
//                   })}
//                   className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//               {isLoading ? (
//                 <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-orange-500" size={18} />
//               ) : (
//                 <button 
//                   type="submit"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition-colors"
//                 >
//                   <Search size={16} />
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Popular destinations - inline with search */}
//           <div className="flex items-center mt-2 overflow-x-auto pb-1 scrollbar-thin">
//             <span className="text-xs font-medium text-gray-500 whitespace-nowrap mr-2">Popular:</span>
//             <div className="flex gap-1.5">
//               {popularDestinations.map(destination => (
//                 <button 
//                   key={destination}
//                   onClick={() => {
//                     updateSearchState({ query: destination });
//                     // Find matching location
//                     const matchingLocation = searchLocations(destination)[0];
//                     if (matchingLocation) {
//                       handleLocationSelect(matchingLocation);
//                     }
//                   }}
//                   className="bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
//                 >
//                   {destination}
//                 </button>
//               ))}
//             </div>
//           </div>
         
//           {/* Suggestions dropdown - now works on all screen sizes */}
//           {showSuggestions && query && (
//             <div 
//               className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100 w-full"
//               style={{ maxHeight: '300px' }}
//             >
//               {filteredResults.length > 0 ? (
//                 <div className="max-h-64 overflow-y-auto custom-scrollbar">
//                   <ul>
//                     {filteredResults.map((item, index) => (
//                       <li
//                         key={item._id || index}
//                         onClick={() => handleLocationSelect(item)}
//                         className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <div className="bg-orange-100 rounded-full p-1.5 mr-2">
//                             <MapPin className="text-orange-500" size={14} />
//                           </div>
//                           <div>
//                             <div className="text-gray-800 font-medium text-sm">
//                               {item.location}
//                             </div>
//                             <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                               {item.title || `${item.description?.slice(0, 40)}...`}
//                             </div>
//                           </div>
//                         </div>
//                         {item.price && (
//                           <div className="text-orange-600 font-medium text-sm ml-2">
//                             {item.price}
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="p-3 text-center text-gray-500 text-sm">
//                   No destinations found. Try a different search term.
//                 </div>
//               )}
//               {/* Quick filters at bottom of dropdown */}
//               {filteredResults.length > 0 && (
//                 <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
//                   <span className="text-xs text-gray-500">Filter by:</span>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Price ↓
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Popular
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Ratings
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

    

//           {/* Suggestions dropdown - now works on all screen sizes */}
//           {/* {showSuggestions && query && (
//             <div 
//               className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100 w-full"
//               style={{ maxHeight: '300px' }}
//             >
//               {filteredResults.length > 0 ? (
//                 <div className="max-h-64 overflow-y-auto custom-scrollbar">
//                   <ul>
//                     {filteredResults.map((item, index) => (
//                       <li
//                         key={item._id || index}
//                         onClick={() => handleLocationSelect(item)}
//                         className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <div className="bg-orange-100 rounded-full p-1.5 mr-2">
//                             <MapPin className="text-orange-500" size={14} />
//                           </div>
//                           <div>
//                             <div className="text-gray-800 font-medium text-sm">
//                               {item.location}
//                             </div>
//                             <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                               {item.title || `${item.description?.slice(0, 40)}...`}
//                             </div>
//                           </div>
//                         </div>
//                         {item.price && (
//                           <div className="text-orange-600 font-medium text-sm ml-2">
//                             {item.price}
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="p-3 text-center text-gray-500 text-sm">
//                   No destinations found. Try a different search term.
//                 </div>
//               )} */}
//               {/* Quick filters at bottom of dropdown */}
//                {/* {filteredResults.length > 0 && (
//                 <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
//                   <span className="text-xs text-gray-500">Filter by:</span>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Price ↓
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Popular
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Ratings
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>   */}

//       {/* Recently viewed section */}
//       <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
//         <div className="flex justify-between items-center">
//           <span className="text-xs font-medium text-gray-500">Recently viewed</span>
//           <button className="text-orange-500 text-xs hover:underline">See all</button>
//         </div>
//         <div className="flex gap-2 mt-1 overflow-x-auto pb-1 scrollbar-thin">
//           {['Gulmarg', 'Dal Lake', 'Thailand'].map(recent => (
//             <div key={recent} className="flex items-center bg-white rounded px-2 py-1 border border-gray-200 whitespace-nowrap">
//               <Clock className="text-gray-400 mr-1" size={12} />
//               <span className="text-xs text-gray-700">{recent}</span>
//             </div>
//           ))}
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default SearchBar;


// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, MapPin, X, Loader2, Search, Clock } from 'lucide-react';

// export const SearchBar = () => {
//   const [searchState, setSearchState] = useState({
//     query: "",
//     isLoading: false,
//     destinations: [],
//     tours: [],
//     filteredResults: [],
//     selectedLocation: null,
//     locationTours: [],
//     selectedTour: null,
//     currentPlaceholder: "",
//     isSearchFocused: false,
//     showSuggestions: false,
//     displayedTours: [], // For showing tours after selection
//   });

//   const searchInputRef = useRef(null);
//   const resultsContainerRef = useRef(null);
//   const typingTimerRef = useRef(null);

//   const {
//     query,
//     isLoading,
//     destinations,
//     tours,
//     filteredResults,
//     selectedLocation,
//     locationTours,
//     selectedTour,
//     currentPlaceholder,
//     isSearchFocused,
//     showSuggestions,
//     displayedTours,
//   } = searchState;

//   // Update any part of the search state
//   const updateSearchState = (updates) => {
//     setSearchState(prev => ({ ...prev, ...updates }));
//   };

//   // Destinations for typewriter effect
//   const placeholders = [
//     "sonamarg", "Gulmarg", "Kashmir", "Pahalgam", 
//     "Thailand", "Dubai", "Singapore", "Dal Lake"
//   ];

//   // Typewriter effect function
//   const typewriterEffect = () => {
//     let currentIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     let currentWord = placeholders[0];
    
//     const type = () => {
//       if (isSearchFocused) {
//         typingTimerRef.current = setTimeout(type, 2000);
//         return;
//       }
      
//       currentWord = placeholders[currentIndex];
      
//       if (isDeleting) {
//         charIndex--;
//       } else {
//         charIndex++;
//       }
      
//       updateSearchState({
//         currentPlaceholder: currentWord.substring(0, charIndex)
//       });
      
//       if (!isDeleting && charIndex === currentWord.length) {
//         isDeleting = true;
//         typingTimerRef.current = setTimeout(type, 1500);
//         return;
//       } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         currentIndex = (currentIndex + 1) % placeholders.length;
//         typingTimerRef.current = setTimeout(type, 500);
//         return;
//       }
      
//       typingTimerRef.current = setTimeout(
//         type, 
//         isDeleting ? 100 : 150
//       );
//     };
    
//     typingTimerRef.current = setTimeout(type, 1000);
//   };

//   const fetchData = async () => {
//     updateSearchState({ isLoading: true });
    
//     try {
//       const [toursResponse, destinationsResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/Grid'),
//         fetch('http://localhost:5000/api/tours')
//       ]);

//       const [toursData, destinationsData] = await Promise.all([
//         toursResponse.json(),
//         destinationsResponse.json()
//       ]);

//       updateSearchState({
//         tours: toursData || [],
//         destinations: destinationsData || [],
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       updateSearchState({ isLoading: false });
//     }
//   };

//   // Enhanced search function to provide more accurate suggestions
//   const searchLocations = (searchQuery) => {
//     if (!searchQuery.trim()) return [];
//     const query = searchQuery.toLowerCase();
    
//     // Match tours by title or location
//     const matchingTours = tours.filter(tour => 
//       tour.title?.toLowerCase().includes(query) ||
//       tour.location?.toLowerCase().includes(query)
//     );

//     // Match destinations by title, location or description
//     const matchingDestinations = destinations.filter(dest => 
//       dest.title?.toLowerCase().includes(query) ||
//       dest.location?.toLowerCase().includes(query) ||
//       dest.description?.toLowerCase().includes(query)
//     );

//     // Combine results
//     const combinedResults = [...matchingTours, ...matchingDestinations];
    
//     // Get unique locations for suggestions
//     const uniqueLocations = Array.from(new Set(
//       combinedResults.map(item => item.location)
//     )).map(location => 
//       combinedResults.find(item => item.location === location)
//     );

//     return uniqueLocations;
//   };

//   // Updated handler to show the selected tour/location and carousel
//   const handleLocationSelect = (item) => {
//     // Find relevant tours for the selected location
//     const relevantTours = tours.filter(tour => 
//       tour.location?.toLowerCase() === item.location?.toLowerCase()
//     );
    
//     updateSearchState({
//       locationTours: relevantTours,
//       selectedLocation: item.location,
//       query: item.location, // Set query to selected location
//       filteredResults: [], // Clear filtered results
//       displayedTours: relevantTours, // Display tours for selected location
//       showSuggestions: false, // Hide suggestions after selection
//     });
//   };

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     if (e) e.preventDefault();
    
//     if (query.trim()) {
//       const results = searchLocations(query);
      
//       if (results.length === 1) {
//         // If there's only one result, select it automatically
//         handleLocationSelect(results[0]);
//       } else if (results.length > 0) {
//         // Just show suggestions if there are multiple results
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true,
//           // Show carousel for search results
//           displayedTours: results.length > 0 ? tours.filter(tour => 
//             results.some(result => result.location?.toLowerCase() === tour.location?.toLowerCase())
//           ) : []
//         });
//       } else {
//         // No results found
//         updateSearchState({
//           filteredResults: [],
//           showSuggestions: true,
//           displayedTours: [] 
//         });
//       }
//     }
//   };

//   const handleBackToSearch = () => {
//     updateSearchState({
//       selectedLocation: null,
//       locationTours: [],
//       selectedTour: null,
//       displayedTours: [] // Clear displayed tours when going back
//     });
//   };

//   const handleTourSelect = (tour) => {
//     updateSearchState({
//       selectedTour: tour,
//     });
//   };

//   const handleBackToTours = () => {
//     updateSearchState({
//       selectedTour: null,
//     });
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         resultsContainerRef.current && 
//         !resultsContainerRef.current.contains(event.target) &&
//         !searchInputRef.current?.contains(event.target)
//       ) {
//         updateSearchState({ 
//           isSearchFocused: false, 
//           showSuggestions: false 
//         });
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchData();
//     typewriterEffect();
//     return () => clearTimeout(typingTimerRef.current);
//   }, []);

//   // Show suggestions as user types with debounce
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (query.trim()) {
//         const results = searchLocations(query);
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true
//         });
//       } else {
//         updateSearchState({ 
//           filteredResults: [],
//           showSuggestions: false
//         });
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [query]);

//   // Render TourDetailPage if a tour is selected
//   if (selectedTour) {
//     return <TourDetailPage tour={selectedTour} onBack={handleBackToTours} />;
//   }

//   // Render LocationToursPage if a location is selected
//   if (selectedLocation) {
//     return (
//       <LocationToursPage
//         location={selectedLocation}
//         tours={locationTours}
//         onBack={handleBackToSearch}
//         onTourSelect={handleTourSelect}
//       />
//     );
//   }

//   // Popular destinations
//   const popularDestinations = ['Sonamarg', 'Pahalgam', 'Gulmarg', 'Kashmir', 'Thailand'];

//   // Render the main search bar
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
//       {/* Display carousel only when we have tours to display */}
//       {displayedTours.length > 0 && (
//         <div className="bg-gray-50 p-4"> 
//           <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
//             {selectedLocation ? `Tours in ${selectedLocation}` : `Tours for "${query}"`}
//           </h3>
//           <ToursCarousel tours={displayedTours} TourCard={TourCard} autoplayInterval={6000} visibleCards={3} />
//         </div> 
//       )}
      
//       <div className="px-4 py-3 md:px-6 md:py-4"> 
//         <h2 className="text-lg font-bold text-center mb-2 text-gray-800 whitespace-nowrap">
//           Discover Your Perfect Adventure
//         </h2>
        
//         <div className="relative" ref={resultsContainerRef}>
//           {/* Search input wrapped in form for submission */}
//           <form onSubmit={handleSearchSubmit}>
//             <div className={`relative flex items-center w-full bg-white rounded-lg border-2 transition-all duration-200 ${
//               isSearchFocused ? "border-orange-500 shadow-sm" : "border-gray-200"
//             }`}>
//               <MapPin className="absolute left-3 text-orange-500" size={18} />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder={`Search for ${currentPlaceholder || "destinations"}...`}
//                 className="w-full py-2 pl-10 pr-16 text-gray-700 placeholder-gray-400 text-base rounded-lg focus:outline-none"
//                 value={query}
//                 onChange={(e) => updateSearchState({ query: e.target.value })}
//                 onFocus={() => updateSearchState({ 
//                   isSearchFocused: true, 
//                   showSuggestions: query.trim() ? true : false
//                 })}
//               />
//               {query && (
//                 <button
//                   type="button"
//                   onClick={() => updateSearchState({ 
//                     query: '', 
//                     filteredResults: [], 
//                     showSuggestions: false,
//                     displayedTours: [] // Clear displayed tours
//                   })}
//                   className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//               {isLoading ? (
//                 <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-orange-500" size={18} />
//               ) : (
//                 <button 
//                   type="submit"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition-colors"
//                 >
//                   <Search size={16} />
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Popular destinations - inline with search */}
//           <div className="flex items-center mt-2 overflow-x-auto pb-1 scrollbar-thin">
//             <span className="text-xs font-medium text-gray-500 whitespace-nowrap mr-2">Popular:</span>
//             <div className="flex gap-1.5">
//               {popularDestinations.map(destination => (
//                 <button 
//                   key={destination}
//                   onClick={() => {
//                     updateSearchState({ query: destination });
//                     // Find matching location
//                     const matchingLocation = searchLocations(destination)[0];
//                     if (matchingLocation) {
//                       handleLocationSelect(matchingLocation);
//                     }
//                   }}
//                   className="bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
//                 >
//                   {destination}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Suggestions dropdown - optimized for desktop */}
//           {showSuggestions && query && (
//             <div 
//               className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100 w-full"
//             >
//               {filteredResults.length > 0 ? (
//                 <div className="max-h-48 md:max-h-64 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
//                   <ul>
//                     {filteredResults.map((item, index) => (
//                       <li
//                         key={item._id || index}
//                         onClick={() => handleLocationSelect(item)}
//                         className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <div className="bg-orange-100 rounded-full p-1.5 mr-2">
//                             <MapPin className="text-orange-500" size={14} />
//                           </div>
//                           <div>
//                             <div className="text-gray-800 font-medium text-sm">
//                               {item.location}
//                             </div>
//                             <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                               {item.title || `${item.description?.slice(0, 40)}...`}
//                             </div>
//                           </div>
//                         </div>
//                         {item.price && (
//                           <div className="text-orange-600 font-medium text-sm ml-2">
//                             {item.price}
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="p-3 text-center text-gray-500 text-sm">
//                   No destinations found. Try a different search term.
//                 </div>
//               )}
//               {/* Quick filters at bottom of dropdown */}
//               {filteredResults.length > 0 && (
//                 <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
//                   <span className="text-xs text-gray-500">Filter by:</span>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Price ↓
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Popular
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Ratings
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recently viewed section */}
//       <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
//         <div className="flex justify-between items-center">
//           <span className="text-xs font-medium text-gray-500">Recently viewed</span>
//           <button className="text-orange-500 text-xs hover:underline">See all</button>
//         </div>
//         <div className="flex gap-2 mt-1 overflow-x-auto pb-1 scrollbar-thin">
//           {['Gulmarg', 'Dal Lake', 'Thailand'].map(recent => (
//             <div key={recent} className="flex items-center bg-white rounded px-2 py-1 border border-gray-200 whitespace-nowrap">
//               <Clock className="text-gray-400 mr-1" size={12} />
//               <span className="text-xs text-gray-700">{recent}</span>
//             </div>
//           ))}
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default SearchBar;




// Tours Carousel Component




// Tours Carousel Component
// const ToursCarousel = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayTimerRef = useRef(null);
//   const carouselRef = useRef(null);

//   // Function to check if the screen is mobile
//   const checkIfMobile = () => {
//     setIsMobile(window.innerWidth < 768); // 768px is standard breakpoint for tablet
//   };

//   // Initialize mobile check and set up window resize listener
//   useEffect(() => {
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Calculate how many cards to display based on screen size
//   const displayCount = isMobile ? 1 : visibleCards;

//   // Total number of distinct positions in the carousel
//   const totalPositions = Math.max(1, tours.length - (displayCount - 1));

//   // Handle next slide
//   const nextSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex + 1) % totalPositions);
//   };

//   // Handle previous slide
//   const prevSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex - 1 + totalPositions) % totalPositions);
//   };

//   // Set up autoplay
//   useEffect(() => {
//     if (!isPaused && autoplayInterval > 0) {
//       autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
//     }
//     return () => clearInterval(autoplayTimerRef.current);
//   }, [isPaused, currentIndex, totalPositions, autoplayInterval]);

//   // Pause autoplay when hovering over carousel
//   const handleMouseEnter = () => setIsPaused(true);
//   const handleMouseLeave = () => setIsPaused(false);

//   // If no tours, return null
//   if (!tours || tours.length === 0) {
//     return null;
//   }

//   return (
//     <div 
//       className="relative w-full" 
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       ref={carouselRef}
//     >
//       {/* Cards container with smooth transition */}
//       <div className="overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * (100 / displayCount)}%)` }}
//         >
//           {tours.map((tour, index) => (
//             <div 
//               key={tour._id || index}
//               className={`flex-shrink-0 ${isMobile ? 'w-full' : `w-1/3`} px-2`}
//             >
//               <TourCard tour={tour} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows */}
//       {tours.length > displayCount && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {/* Pagination indicators */}
//       <div className="flex justify-center mt-4 gap-1">
//         {Array.from({ length: totalPositions }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };



// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Make sure this import exists
// const TourCard = ({ tour, onClick }) => (
//   <div
//     onClick={onClick}
//     className="group relative mt-0 md:mt-0 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//   >
//     {/* Image Container */}
//     <div className="relative h-56 overflow-hidden">
//       <img
//         src={tour.image}
//         alt={tour.title}
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
      
//       {/* Badges Overlay */}
//       <div className="absolute top-3 left-3 z-20 flex space-x-2">
//         <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
//           Featured
//         </span>
//         {tour.trending && (
//           <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
//             Trending
//           </span>
//         )}
//       </div>
      
//       {/* Discount Tag */}
//       {tour.discount && (
//         <div className="absolute top-3 right-3 bg-white py-1 px-3 text-xs font-bold text-orange-600 rounded-full shadow-sm">
//           {tour.discount}% OFF
//         </div>
//       )}
      
//       {/* Thrillophilia-style "Bestseller" tag */}
//       {tour.bestseller && (
//         <div className="absolute bottom-3 left-3 bg-green-500 py-1 px-2 text-xs font-medium text-white rounded">
//           BESTSELLER
//         </div>
//       )}
//     </div>
    
//     {/* Content Section */}
//     <div className="p-4">
//       {/* Title - Reduced font */}
//       <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">
//         {tour.title}
//       </h3>
      
//       {/* Tour Details - Essential info only */}
//       <div className="flex flex-wrap items-center gap-x-4 text-xs text-gray-600 mb-3">
//         <div className="flex items-center">
//           <Calendar className="mr-1 h-3 w-3 text-orange-500" />
//           <span>{tour.duration}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-3 w-3 text-orange-500" />
//           <span>{tour.location}</span>
//         </div>
//       </div>
      
//       {/* Marketing Element - Thrillophilia-style highlights */}
//       <div className="flex items-center justify-between py-2 mb-3 border-y border-gray-100">
//         <div className="flex flex-wrap gap-x-3 text-xs">
//           {/* Collection Badge - like Thrillophilia uses */}
//           {tour.collection && (
//             <div className="flex items-center">
//               <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
//                 <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
//               </svg>
//               <span className="text-gray-600">{tour.collection}</span>
//             </div>
//           )}
          
//           {/* Instant Confirmation Badge */}
//           <div className="flex items-center">
//             <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//             <span className="text-gray-600">Instant Confirmation</span>
//           </div>
          
//           {/* Cancellation Badge - if applicable */}
//           {tour.cancellation && (
//             <div className="flex items-center">
//               <svg className="h-3 w-3 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
//                 <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
//               </svg>
//               <span className="text-gray-600">{tour.cancellation}</span>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Bottom section with Rating and Price - Exact Thrillophilia style */}
//       <div className="flex items-center justify-between">
//         {/* Rating - Thrillophilia exact style */}
//         <div className="flex items-center">
//           <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
//             <span>{tour.rating}</span>
//             <Star className="h-3 w-3 ml-0.5 fill-current" />
//           </div>
//           <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
//         </div>
        
//         {/* Price - Exact Thrillophilia style */}
//         <div className="flex flex-col items-end">
//           {tour.originalPrice && (
//             <div className="flex items-center">
//               <span className="text-xs text-gray-500 line-through">₹{tour.originalPrice}</span>
//               <span className="ml-1 text-xs font-medium text-green-600">
//                 {Math.round((tour.originalPrice - tour.price) / tour.originalPrice * 100)}% off
//               </span>
//             </div>
//           )}
//           <div className="flex items-baseline">
//             <span className="text-xs text-gray-500">From </span>
//             <span className="ml-1 text-lg font-semibold text-gray-800">₹{tour.price}</span>
//             {/* <div className="text-xs text-gray-500">per person </div> */}
//           </div>
//         </div>
//       </div>
      
//       {/* View More Button */}
//       <button className="mt-3 w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 flex items-center justify-center">
//         <span>View More</span>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   </div>
// );
// const ToursCarousel = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayTimerRef = useRef(null);
//   const carouselRef = useRef(null);

//   // Function to check if the screen is mobile
//   const checkIfMobile = () => {
//     setIsMobile(window.innerWidth < 768); // 768px is standard breakpoint for tablet
//   };

//   // Initialize mobile check and set up window resize listener
//   useEffect(() => {
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Calculate how many cards to display based on screen size
//   const displayCount = isMobile ? 1 : visibleCards;

//   // Total number of distinct positions in the carousel
//   const totalPositions = Math.max(1, tours.length - (displayCount - 1));

//   // Handle next slide
//   const nextSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex + 1) % totalPositions);
//   };

//   // Handle previous slide
//   const prevSlide = () => {
//     setCurrentIndex(prevIndex => (prevIndex - 1 + totalPositions) % totalPositions);
//   };

//   // Set up autoplay
//   useEffect(() => {
//     if (!isPaused && autoplayInterval > 0) {
//       autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
//     }
//     return () => clearInterval(autoplayTimerRef.current);
//   }, [isPaused, currentIndex, totalPositions, autoplayInterval]);

//   // Pause autoplay when hovering over carousel
//   const handleMouseEnter = () => setIsPaused(true);
//   const handleMouseLeave = () => setIsPaused(false);

//   // If no tours, return null
//   if (!tours || tours.length === 0) {
//     return null;
//   }

//   // If TourCard component is missing, provide fallback
//   if (!TourCard) {
//     console.error("TourCard component is required for ToursCarousel");
//     return <div>Error: TourCard component is missing</div>;
//   }

//   // Calculate width percentage based on displayCount
//   const cardWidthPercentage = 100 / displayCount;

//   return (
//     <div 
//       className="relative w-full" 
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       ref={carouselRef}
//     >
//       {/* Cards container with smooth transition */}
//       <div className="overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * cardWidthPercentage}%)` }}
//         >
//           {tours.map((tour, index) => (
//             <div 
//               key={tour._id || index}
//               className="flex-shrink-0 px-2"
//               style={{ width: `${cardWidthPercentage}%` }}
//             >
//               <TourCard tour={tour} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows */}
//       {tours.length > displayCount && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {/* Pagination indicators */}
//       <div className="flex justify-center mt-4 gap-1">
//         {Array.from({ length: totalPositions }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ToursCarousel;
// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ToursCarousel = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayTimerRef = useRef(null);
//   const carouselRef = useRef(null);

//   // Function to check if the screen is mobile
//   const checkIfMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   // Initialize mobile check and set up window resize listener
//   useEffect(() => {
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Calculate how many cards to display based on screen size
//   const displayCount = isMobile ? 1 : visibleCards;

//   // Recalculate total positions - this is critical for slider functionality
//   // It should be the number of tours minus the number of visible cards plus 1
//   const totalPositions = Math.max(1, tours.length - displayCount + 1);

//   // Handle next slide - make sure this changes the currentIndex
//   const nextSlide = () => {
//     console.log("Next slide clicked, current:", currentIndex, "total:", totalPositions);
//     setCurrentIndex(prevIndex => {
//       const newIndex = (prevIndex + 1) % totalPositions;
//       console.log("New index:", newIndex);
//       return newIndex;
//     });
//   };

//   // Handle previous slide
//   const prevSlide = () => {
//     console.log("Prev slide clicked, current:", currentIndex, "total:", totalPositions);
//     setCurrentIndex(prevIndex => {
//       const newIndex = (prevIndex - 1 + totalPositions) % totalPositions;
//       console.log("New index:", newIndex);
//       return newIndex;
//     });
//   };

//   // Set up autoplay with proper cleanup
//   useEffect(() => {
//     // Clear any existing timer first
//     if (autoplayTimerRef.current) {
//       clearInterval(autoplayTimerRef.current);
//       autoplayTimerRef.current = null;
//     }
    
//     // Only set a new timer if not paused and we have multiple positions
//     if (!isPaused && autoplayInterval > 0 && totalPositions > 1) {
//       autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
//     }
    
//     return () => {
//       if (autoplayTimerRef.current) {
//         clearInterval(autoplayTimerRef.current);
//       }
//     };
//   }, [isPaused, currentIndex, totalPositions, autoplayInterval]);

//   // Pause autoplay when hovering over carousel
//   const handleMouseEnter = () => setIsPaused(true);
//   const handleMouseLeave = () => setIsPaused(false);

//   // Effect to log when currentIndex changes
//   useEffect(() => {
//     console.log("Current index changed to:", currentIndex);
//   }, [currentIndex]);

//   // If no tours, return null
//   if (!tours || tours.length === 0) {
//     return null;
//   }

//   console.log("Rendering carousel with", tours.length, "tours", "currentIndex:", currentIndex);

//   return (
//     <div 
//       className="relative w-full" 
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       ref={carouselRef}
//     >
//       {/* Cards container with smooth transition */}
//       <div className="overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ 
//             transform: `translateX(-${currentIndex * (100 / displayCount)}%)`,
//             width: `${(tours.length / displayCount) * 100}%` // Make the container wide enough
//           }}
//         >
//           {tours.map((tour, index) => (
//             <div 
//               key={tour._id || index}
//               className="flex-shrink-0 px-2"
//               style={{ width: `${100 / tours.length}%` }} // Each card takes equal width
//             >
//               <TourCard tour={tour} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows - Only show if we have enough items to scroll */}
//       {totalPositions > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {/* Pagination indicators - Only show if we have multiple positions */}
//       {totalPositions > 1 && (
//         <div className="flex justify-center mt-4 gap-1">
//           {Array.from({ length: totalPositions }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`h-2 rounded-full transition-all ${
//                 currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ToursCarousel = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   // Basic state management
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const autoplayTimerRef = useRef(null);
  
//   // Responsive handling
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
//   const actualVisibleCards = windowWidth < 768 ? 1 : visibleCards;
  
//   // Total number of "pages" in the carousel
//   const totalSlides = Math.max(1, Math.ceil(tours.length / actualVisibleCards));
  
//   // Update window width on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
  
//   // Handle navigation
//   const goToSlide = (index) => {
//     // Ensure index is within bounds
//     const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
//     setActiveIndex(newIndex);
//   };
  
//   const goToNextSlide = () => {
//     const nextIndex = (activeIndex + 1) % totalSlides;
//     goToSlide(nextIndex);
//   };
  
//   const goToPrevSlide = () => {
//     const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
//     goToSlide(prevIndex);
//   };
  
//   // Autoplay logic
//   useEffect(() => {
//     if (autoplayTimerRef.current) {
//       clearInterval(autoplayTimerRef.current);
//     }
    
//     if (!isPaused && autoplayInterval > 0 && totalSlides > 1) {
//       autoplayTimerRef.current = setInterval(goToNextSlide, autoplayInterval);
//     }
    
//     return () => {
//       if (autoplayTimerRef.current) {
//         clearInterval(autoplayTimerRef.current);
//       }
//     };
//   }, [isPaused, activeIndex, totalSlides, autoplayInterval]);
  
//   // If no tours or no TourCard component, don't render
//   if (!tours?.length || !TourCard) {
//     return null;
//   }
  
//   // Calculate which tours to show in the current view
//   const startIndex = activeIndex * actualVisibleCards;
//   const visibleTours = tours.slice(startIndex, startIndex + actualVisibleCards);
  
//   return (
//     <div 
//       className="relative w-full"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Main carousel container */}
//       <div className="relative overflow-hidden">
//         {/* Visible tour cards */}
//         <div className="flex w-full">
//           {visibleTours.map((tour, index) => (
//             <div 
//               key={tour._id || `tour-${startIndex + index}`}
//               className="flex-1 px-2"
//             >
//               <TourCard tour={tour} />
//             </div>
//           ))}
//         </div>
        
//         {/* Navigation buttons - only show if we have multiple slides */}
//         {totalSlides > 1 && (
//           <>
//             <button
//               onClick={goToPrevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={goToNextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//               aria-label="Next slide"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </>
//         )}
//       </div>
      
//       {/* Pagination indicators - only show if we have multiple slides */}
//       {totalSlides > 1 && (
//         <div className="flex justify-center mt-4 gap-1">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={`indicator-${index}`}
//               onClick={() => goToSlide(index)}
//               className={`h-2 rounded-full transition-all ${
//                 activeIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Star, Clock } from 'lucide-react';

// First, define the TourCard component
// const TourCard = ({ tour }) => {
//   if (!tour) return null;
  
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
//       <div className="relative h-40 bg-gray-200">
//         {tour.image ? (
//           <img 
//             src={tour.image} 
//             alt={tour.title || 'Tour'} 
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400">
//             No Image
//           </div>
//         )}
//         {tour.price && (
//           <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm font-bold py-1 px-2 rounded">
//             {tour.price}
//           </div>
//         )}
//       </div>
//       <div className="p-3 flex-grow flex flex-col">
//         <h3 className="font-semibold text-gray-800">{tour.title || 'Unnamed Tour'}</h3>
//         {tour.location && (
//           <div className="flex items-center mt-1 text-sm text-gray-500">
//             <MapPin size={14} className="mr-1" />
//             <span>{tour.location}</span>
//           </div>
//         )}
//         {tour.rating && (
//           <div className="flex items-center mt-1 text-sm">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 className={i < tour.rating ? "text-yellow-400" : "text-gray-300"}
//                 fill={i < tour.rating ? "currentColor" : "none"}
//               />
//             ))}
//             <span className="ml-1 text-gray-600 text-xs">
//               ({tour.reviewCount || 0} reviews)
//             </span>
//           </div>
//         )}
//         {tour.duration && (
//           <div className="flex items-center mt-1 text-sm text-gray-500">
//             <Clock size={14} className="mr-1" />
//             <span>{tour.duration}</span>
//           </div>
//         )}
//         <div className="mt-auto pt-2">
//           <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-sm transition-colors">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// Now the carousel component


// const ToursCarousel = ({ tours, TourCard, autoplayInterval = 5000, visibleCards = 3 }) => {
//   // Basic state management
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const autoplayTimerRef = useRef(null);
  
//   // Responsive handling
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
//   const actualVisibleCards = windowWidth < 768 ? 1 : visibleCards;
  
//   // Total number of "pages" in the carousel
//   const totalSlides = Math.max(1, Math.ceil(tours.length / actualVisibleCards));
  
//   // Update window width on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
  
//   // Handle navigation
//   const goToSlide = (index) => {
//     // Ensure index is within bounds
//     const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
//     setActiveIndex(newIndex);
//   };
  
//   const goToNextSlide = () => {
//     const nextIndex = (activeIndex + 1) % totalSlides;
//     goToSlide(nextIndex);
//   };
  
//   const goToPrevSlide = () => {
//     const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
//     goToSlide(prevIndex);
//   };
  
//   // Autoplay logic
//   useEffect(() => {
//     if (autoplayTimerRef.current) {
//       clearInterval(autoplayTimerRef.current);
//     }
    
//     if (!isPaused && autoplayInterval > 0 && totalSlides > 1) {
//       autoplayTimerRef.current = setInterval(goToNextSlide, autoplayInterval);
//     }
    
//     return () => {
//       if (autoplayTimerRef.current) {
//         clearInterval(autoplayTimerRef.current);
//       }
//     };
//   }, [isPaused, activeIndex, totalSlides, autoplayInterval]);
  
//   // If no tours, don't render
//   if (!tours?.length) {
//     return null;
//   }
  
//   // Use the provided TourCard component or fall back to the default one
//   const CardComponent = TourCard || TourCard;
  
//   // Calculate which tours to show in the current view
//   const startIndex = activeIndex * actualVisibleCards;
//   const visibleTours = tours.slice(startIndex, startIndex + actualVisibleCards);
  
//   return (
//     <div 
//       className="relative w-full"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Main carousel container */}
//       <div className="relative overflow-hidden">
//         {/* Visible tour cards */}
//         <div className="flex w-full gap-4">
//           {visibleTours.map((tour, index) => (
//             <div 
//               key={tour._id || `tour-${startIndex + index}`}
//               className="flex-1 px-2"
//             >
//               <CardComponent tour={tour} />
//             </div>
//           ))}
//         </div>
        
//         {/* Navigation buttons - only show if we have multiple slides */}
//         {totalSlides > 1 && (
//           <>
//             <button
//               onClick={goToPrevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -ml-3"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={goToNextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-gray-800 -mr-3"
//               aria-label="Next slide"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </>
//         )}
//       </div>
      
//       {/* Pagination indicators - only show if we have multiple slides */}
//       {totalSlides > 1 && (
//         <div className="flex justify-center mt-4 gap-1">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={`indicator-${index}`}
//               onClick={() => goToSlide(index)}
//               className={`h-2 rounded-full transition-all ${
//                 activeIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';


// Export both components
// export { TourCard, ToursCarousel };

// Export both components so they can be used together
// export { TourCard, ToursCarousel };

// export default ToursCarousel;

// export default ToursCarousel;
// export const SearchBar = () => {
//   const [searchState, setSearchState] = useState({
//     query: "",
//     isLoading: false,
//     destinations: [],
//     tours: [],
//     filteredResults: [],
//     selectedLocation: null,
//     locationTours: [],
//     selectedTour: null,
//     currentPlaceholder: "",
//     isSearchFocused: false,
//     showSuggestions: false,
//     displayedTours: [], // For showing tours after selection
//   });

//   const searchInputRef = useRef(null);
//   const resultsContainerRef = useRef(null);
//   const typingTimerRef = useRef(null);

//   const {
//     query,
//     isLoading,
//     destinations,
//     tours,
//     filteredResults,
//     selectedLocation,
//     locationTours,
//     selectedTour,
//     currentPlaceholder,
//     isSearchFocused,
//     showSuggestions,
//     displayedTours,
//   } = searchState;

//   // Update any part of the search state
//   const updateSearchState = (updates) => {
//     setSearchState(prev => ({ ...prev, ...updates }));
//   };

//   // Destinations for typewriter effect
//   const placeholders = [
//     "sonamarg", "Gulmarg", "Kashmir", "Pahalgam", 
//     "Thailand", "Dubai", "Singapore", "Dal Lake"
//   ];

//   // Typewriter effect function
//   const typewriterEffect = () => {
//     let currentIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     let currentWord = placeholders[0];
    
//     const type = () => {
//       if (isSearchFocused) {
//         typingTimerRef.current = setTimeout(type, 2000);
//         return;
//       }
      
//       currentWord = placeholders[currentIndex];
      
//       if (isDeleting) {
//         charIndex--;
//       } else {
//         charIndex++;
//       }
      
//       updateSearchState({
//         currentPlaceholder: currentWord.substring(0, charIndex)
//       });
      
//       if (!isDeleting && charIndex === currentWord.length) {
//         isDeleting = true;
//         typingTimerRef.current = setTimeout(type, 1500);
//         return;
//       } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         currentIndex = (currentIndex + 1) % placeholders.length;
//         typingTimerRef.current = setTimeout(type, 500);
//         return;
//       }
      
//       typingTimerRef.current = setTimeout(
//         type, 
//         isDeleting ? 100 : 150
//       );
//     };
    
//     typingTimerRef.current = setTimeout(type, 1000);
//   };

//   const fetchData = async () => {
//     updateSearchState({ isLoading: true });
    
//     try {
//       const [toursResponse, destinationsResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/Grid'),
//         fetch('http://localhost:5000/api/tours')
//       ]);

//       const [toursData, destinationsData] = await Promise.all([
//         toursResponse.json(),
//         destinationsResponse.json()
//       ]);

//       updateSearchState({
//         tours: toursData || [],
//         destinations: destinationsData || [],
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       updateSearchState({ isLoading: false });
//     }
//   };

//   // Enhanced search function to provide more accurate suggestions
//   const searchLocations = (searchQuery) => {
//     if (!searchQuery.trim()) return [];
//     const query = searchQuery.toLowerCase();
    
//     // Match tours by title or location
//     const matchingTours = tours.filter(tour => 
//       tour.title?.toLowerCase().includes(query) ||
//       tour.location?.toLowerCase().includes(query)
//     );

//     // Match destinations by title, location or description
//     const matchingDestinations = destinations.filter(dest => 
//       dest.title?.toLowerCase().includes(query) ||
//       dest.location?.toLowerCase().includes(query) ||
//       dest.description?.toLowerCase().includes(query)
//     );

//     // Combine results
//     const combinedResults = [...matchingTours, ...matchingDestinations];
    
//     // Get unique locations for suggestions
//     const uniqueLocations = Array.from(new Set(
//       combinedResults.map(item => item.location)
//     )).map(location => 
//       combinedResults.find(item => item.location === location)
//     );

//     return uniqueLocations;
//   };

//   // Updated handler to show the selected tour/location and carousel
//   const handleLocationSelect = (item) => {
//     // Find relevant tours for the selected location
//     const relevantTours = tours.filter(tour => 
//       tour.location?.toLowerCase() === item.location?.toLowerCase()
//     );
    
//     updateSearchState({
//       locationTours: relevantTours,
//       selectedLocation: item.location,
//       query: item.location, // Set query to selected location
//       filteredResults: [], // Clear filtered results
//       displayedTours: relevantTours, // Display tours for selected location
//       showSuggestions: false, // Hide suggestions after selection
//     });
//   };

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     if (e) e.preventDefault();
    
//     if (query.trim()) {
//       const results = searchLocations(query);
      
//       if (results.length === 1) {
//         // If there's only one result, select it automatically
//         handleLocationSelect(results[0]);
//       } else if (results.length > 0) {
//         // Just show suggestions if there are multiple results
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true,
//           // Show carousel for search results
//           displayedTours: results.length > 0 ? tours.filter(tour => 
//             results.some(result => result.location?.toLowerCase() === tour.location?.toLowerCase())
//           ) : []
//         });
//       } else {
//         // No results found
//         updateSearchState({
//           filteredResults: [],
//           showSuggestions: true,
//           displayedTours: [] 
//         });
//       }
//     }
//   };

//   const handleBackToSearch = () => {
//     updateSearchState({
//       selectedLocation: null,
//       locationTours: [],
//       selectedTour: null,
//       displayedTours: [] // Clear displayed tours when going back
//     });
//   };

//   const handleTourSelect = (tour) => {
//     updateSearchState({
//       selectedTour: tour,
//     });
//   };

//   const handleBackToTours = () => {
//     updateSearchState({
//       selectedTour: null,
//     });
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         resultsContainerRef.current && 
//         !resultsContainerRef.current.contains(event.target) &&
//         !searchInputRef.current?.contains(event.target)
//       ) {
//         updateSearchState({ 
//           isSearchFocused: false, 
//           showSuggestions: false 
//         });
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchData();
//     typewriterEffect();
//     return () => clearTimeout(typingTimerRef.current);
//   }, []);

//   // Show suggestions as user types with debounce
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (query.trim()) {
//         const results = searchLocations(query);
//         updateSearchState({ 
//           filteredResults: results,
//           showSuggestions: true
//         });
//       } else {
//         updateSearchState({ 
//           filteredResults: [],
//           showSuggestions: false
//         });
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [query]);

//   // Render TourDetailPage if a tour is selected
//   if (selectedTour) {
//     return <TourDetailPage tour={selectedTour} onBack={handleBackToTours} />;
//   }

//   // Render LocationToursPage if a location is selected
//   if (selectedLocation) {
//     return (
//       <LocationToursPage
//         location={selectedLocation}
//         tours={locationTours}
//         onBack={handleBackToSearch}
//         onTourSelect={handleTourSelect}
//       />
//     );
//   }

//   // Popular destinations
//   const popularDestinations = ['Sonamarg', 'Pahalgam', 'Gulmarg', 'Kashmir', 'Thailand'];

//   // Render the main search bar
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
//       {/* Display carousel only when we have tours to display */}
//       {displayedTours.length > 0 && (
//         <div className="bg-gray-50 p-4"> 
//           <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
//             {selectedLocation ? `Tours in ${selectedLocation}` : `Tours for "${query}"`}
//           </h3>
//           {/* <ToursCarousel 
//   tours={displayedTours} 
//   TourCard={TourCard} 
//   autoplayInterval={6000} 
//   visibleCards={3} 

// /> */}
// <TourCarouselWrapper tours={filteredResults} /> 
//              <ToursCarousel tours={filteredResults}  autoplayInterval={6000} /> 
//              <ToursCarousel tours={filteredResults} TourCard={TourCard} autoplayInterval={6000}
//                   visibleCards={3} />
//           {/* <ToursCarousel tours={displayedTours} TourCard={TourCard} autoplayInterval={6000} visibleCards={3} /> */}
//         </div> 
//       )}
      
//       <div className="px-4 py-3 md:px-6 md:py-4"> 
//         <h2 className="text-lg font-bold text-center mb-2 text-gray-800 whitespace-nowrap">
//           Discover Your Perfect Adventure
//         </h2>
        
//         <div className="relative" ref={resultsContainerRef}>
//           {/* Search input wrapped in form for submission */}
//           <form onSubmit={handleSearchSubmit}>
//             <div className={`relative flex items-center w-full bg-white rounded-lg border-2 transition-all duration-200 ${
//               isSearchFocused ? "border-orange-500 shadow-sm" : "border-gray-200"
//             }`}>
//               <MapPin className="absolute left-3 text-orange-500" size={18} />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder={`Search for ${currentPlaceholder || "destinations"}...`}
//                 className="w-full py-2 pl-10 pr-16 text-gray-700 placeholder-gray-400 text-base rounded-lg focus:outline-none"
//                 value={query}
//                 onChange={(e) => updateSearchState({ query: e.target.value })}
//                 onFocus={() => updateSearchState({ 
//                   isSearchFocused: true, 
//                   showSuggestions: query.trim() ? true : false
//                 })}
//               />
//               {query && (
//                 <button
//                   type="button"
//                   onClick={() => updateSearchState({ 
//                     query: '', 
//                     filteredResults: [], 
//                     showSuggestions: false,
//                     displayedTours: [] // Clear displayed tours
//                   })}
//                   className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//               {isLoading ? (
//                 <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-orange-500" size={18} />
//               ) : (
//                 <button 
//                   type="submit"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition-colors"
//                 >
//                   <Search size={16} />
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Popular destinations - inline with search */}
//           <div className="flex items-center mt-2 overflow-x-auto pb-1 scrollbar-thin">
//             <span className="text-xs font-medium text-gray-500 whitespace-nowrap mr-2">Popular:</span>
//             <div className="flex gap-1.5">
//               {popularDestinations.map(destination => (
//                 <button 
//                   key={destination}
//                   onClick={() => {
//                     updateSearchState({ query: destination });
//                     // Find matching location
//                     const matchingLocation = searchLocations(destination)[0];
//                     if (matchingLocation) {
//                       handleLocationSelect(matchingLocation);
//                     }
//                   }}
//                   className="bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
//                 >
//                   {destination}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Suggestions dropdown - optimized for desktop */}
//           {showSuggestions && query && (
//             <div 
//               className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 z-50 border border-gray-100 w-full"
//             >
//               {filteredResults.length > 0 ? (
//                 <div className="max-h-48 md:max-h-64 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
//                   <ul>
//                     {filteredResults.map((item, index) => (
//                       <li
//                         key={item._id || index}
//                         onClick={() => handleLocationSelect(item)}
//                         className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <div className="bg-orange-100 rounded-full p-1.5 mr-2">
//                             <MapPin className="text-orange-500" size={14} />
//                           </div>
//                           <div>
//                             <div className="text-gray-800 font-medium text-sm">
//                               {item.location}
//                             </div>
//                             <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                               {item.title || `${item.description?.slice(0, 40)}...`}
//                             </div>
//                           </div>
//                         </div>
//                         {item.price && (
//                           <div className="text-orange-600 font-medium text-sm ml-2">
//                             {item.price}
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="p-3 text-center text-gray-500 text-sm">
//                   No destinations found. Try a different search term.
//                 </div>
//               )}
//               {/* Quick filters at bottom of dropdown */}
//               {filteredResults.length > 0 && (
//                 <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1">
//                   <span className="text-xs text-gray-500">Filter by:</span>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Price ↓
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Popular
//                   </button>
//                   <button className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 hover:border-orange-300 text-gray-600">
//                     Ratings
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recently viewed section */}
//       <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
//         <div className="flex justify-between items-center">
//           <span className="text-xs font-medium text-gray-500">Recently viewed</span>
//           <button className="text-orange-500 text-xs hover:underline">See all</button>
//         </div>
//         <div className="flex gap-2 mt-1 overflow-x-auto pb-1 scrollbar-thin">
//           {['Gulmarg', 'Dal Lake', 'Thailand'].map(recent => (
//             <div key={recent} className="flex items-center bg-white rounded px-2 py-1 border border-gray-200 whitespace-nowrap">
//               <Clock className="text-gray-400 mr-1" size={12} />
//               <span className="text-xs text-gray-700">{recent}</span>
//             </div>
//           ))}
//         </div> 
//       </div>
//     </div>
//   );
// };



// Placeholder components for PageToursPage and TourDetailPage that would be defined elsewhere
// These are included to make the code compile
// const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => <div>Location Page</div>;
// const TourDetailPage = ({ tour, onBack }) => <div>Tour Detail Page</div>;

// export default SearchBar;