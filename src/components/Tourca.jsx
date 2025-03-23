// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ToursCarousel = ({ tours, TourCard }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const autoplayIntervalRef = useRef(null);
//   const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

//   // Navigation functions
//   const handleNextTour = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === tours.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePreviousTour = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? tours.length - 1 : prevIndex - 1
//     );
//   };

//   // Autoplay setup
//   const startAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//     }
    
//     autoplayIntervalRef.current = setInterval(() => {
//       if (!isAutoplayPaused) {
//         handleNextTour();
//       }
//     }, 5000); // Change slide every 5 seconds
//   };

//   const stopAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//     }
//   };

//   // Effect for autoplay
//   useEffect(() => {
//     startAutoplay();
//     return () => stopAutoplay();
//   }, [isAutoplayPaused]);

//   // Pause autoplay on hover
//   const handleMouseEnter = () => {
//     setIsAutoplayPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsAutoplayPaused(false);
//   };

//   return (
//     <div 
//       id="trending-tours" 
//       className="relative mt-10"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="max-w-[95vw] mx-auto px-4 py-4 max-h-[500px]">
//         <div className="relative">
//           {/* Desktop Grid (3 columns) */}
//           {/* <div className="hidden md:grid md:grid-cols-3 gap-6">
//             {tours
//               .slice(currentIndex, currentIndex + 3)
//               .map((tour) => (
//                 <TourCard key={tour.id} tour={tour} />
//               ))
//           </div> */}
//           <div className="hidden md:grid md:grid-cols-3 gap-6">
//   {tours
//     .slice(currentIndex, currentIndex + 3)
//     .map((tour) => (                 
//       <TourCard key={tour.id} tour={tour} />               
//     )) // ❌ Missing closing bracket here
// }
// </div>

          
//           {/* Mobile Single Card View */}
//           <div className="md:hidden">
//             {tours[currentIndex] && <TourCard tour={tours[currentIndex]} />}
//           </div>
          
//           {/* Navigation Buttons */}
//           <div 
//             className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-full justify-between px-2" 
//             style={{ left: '-40px', right: '-40px' }}
//           >
//             <button
//               onClick={handlePreviousTour}
//               className="bg-white/70 p-2 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-300"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <button
//               onClick={handleNextTour}
//               className="bg-white/70 p-2 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-300"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="md:hidden absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2">
//             <button
//               onClick={handlePreviousTour}
//               className="bg-white/70 p-2 rounded-full shadow-md"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <button
//               onClick={handleNextTour}
//               className="bg-white/70 p-2 rounded-full shadow-md"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Navigation Dots */}
//           <div className="flex justify-center mt-4 space-x-2">
//             {tours.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`h-2 transition-all duration-300 ${
//                   index === currentIndex 
//                     ? 'bg-blue-500 w-6 rounded-full' 
//                     : 'bg-gray-300 w-2 rounded-full'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default ToursCarousel;



// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Tour {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   duration: string;
// }

// const ToursCarouselProps {
//   tours: Tour[];
//   TourCard: React.ComponentType<{ tour: Tour }>;
//   autoplayInterval?: number;
//   visibleCards?: number;
// }

// const ToursCarousel: React.FC<ToursCarouselProps> = ({
//   tours,
//   TourCard,
//   autoplayInterval = 5000,
//   visibleCards = 3
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
//   const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Responsive breakpoints
//   const [isMobile, setIsMobile] = useState(false);

//   // Advanced navigation functions
//   const handleNextTour = () => {
//     setCurrentIndex((prevIndex) => 
//       (prevIndex + 1) % tours.length
//     );
//   };

//   const handlePreviousTour = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? tours.length - 1 : prevIndex - 1
//     );
//   };

//   // Autoplay management
//   const startAutoplay = () => {
//     stopAutoplay();
    
//     autoplayIntervalRef.current = setInterval(() => {
//       if (!isAutoplayPaused) {
//         handleNextTour();
//       }
//     }, autoplayInterval);
//   };

//   const stopAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//       autoplayIntervalRef.current = null;
//     }
//   };

//   // Responsive handling
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Autoplay effect
//   useEffect(() => {
//     startAutoplay();
//     return () => stopAutoplay();
//   }, [isAutoplayPaused, autoplayInterval]);

//   // Compute visible tours based on current index and screen size
//   const visibleTours = useMemo(() => {
//     const adjustedVisibleCards = isMobile ? 1 : visibleCards;
//     return tours.slice(currentIndex, currentIndex + adjustedVisibleCards)
//       .concat(tours.slice(0, Math.max(0, adjustedVisibleCards - (tours.length - currentIndex))));
//   }, [currentIndex, tours, isMobile, visibleCards]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowRight') handleNextTour();
//       if (e.key === 'ArrowLeft') handlePreviousTour();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Toggle autoplay
//   const toggleAutoplay = () => {
//     setIsAutoplayPaused(prev => !prev);
//   };

//   return (
//     <div 
//       className="relative w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden"
//       aria-label="Tours Carousel"
//     >
//       {/* Carousel Container */}
//       <div 
//         className="relative group"
//         onMouseEnter={() => setIsAutoplayPaused(true)}
//         onMouseLeave={() => setIsAutoplayPaused(false)}
//       >
//         {/* Tours Grid/Slider */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
//           <AnimatePresence>
//             {visibleTours.map((tour, index) => (
//               <motion.div
//                 key={tour.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="w-full"
//               >
//                 <TourCard tour={tour} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center">
//           <button
//             onClick={handlePreviousTour}
//             className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group"
//             aria-label="Previous Tour"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
//           </button>
//           <button
//             onClick={handleNextTour}
//             className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group"
//             aria-label="Next Tour"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
//           </button>
//         </div>

//         {/* Autoplay Toggle */}
//         <button
//           onClick={toggleAutoplay}
//           className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//           aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
//         >
//           {isAutoplayPaused ? (
//             <Play className="w-4 h-4 text-gray-700" />
//           ) : (
//             <Pause className="w-4 h-4 text-gray-700" />
//           )}
//         </button>
//       </div>

//       {/* Navigation Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {tours.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`
//               transition-all duration-300 
//               ${index === currentIndex 
//                 ? 'bg-blue-500 w-6 rounded-full' 
//                 : 'bg-gray-300 w-2 rounded-full'}
//               h-2
//             `}
//             aria-label={`Go to tour ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ToursCarousel;


import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const ToursCarousel = ({ 
  tours, 
  TourCard, 
  autoplayInterval = 5000, 
  visibleCards = 3 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = useRef(null);

  // Navigation functions
  const handleNextTour = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % tours.length
    );
  };

  const handlePreviousTour = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? tours.length - 1 : prevIndex - 1
    );
  };

  // Autoplay management
  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    
    autoplayIntervalRef.current = setInterval(() => {
      if (!isAutoplayPaused) {
        handleNextTour();
      }
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  // Responsive handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autoplay effect
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [isAutoplayPaused, autoplayInterval]);

  // Compute visible tours
  const visibleTours = useMemo(() => {
    const adjustedVisibleCards = isMobile ? 1 : visibleCards;
    return tours.slice(currentIndex, currentIndex + adjustedVisibleCards)
      .concat(tours.slice(0, Math.max(0, adjustedVisibleCards - (tours.length - currentIndex))));
  }, [currentIndex, tours, isMobile, visibleCards]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextTour();
      if (e.key === 'ArrowLeft') handlePreviousTour();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoplayPaused(prev => !prev);
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto  py-8 overflow-hidden"
      aria-label="Tours Carousel"
    >
      <div 
        className="relative group"
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
      >
        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {visibleTours.map((tour) => (
            <div key={tour.id} className="w-full">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center">
          <button
            onClick={handlePreviousTour}
            className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group"
            aria-label="Previous Tour"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>
          <button
            onClick={handleNextTour}
            className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group"
            aria-label="Next Tour"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>
        </div>

        {/* Autoplay Toggle */}
        <button
          onClick={toggleAutoplay}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
        >
          {isAutoplayPaused ? (
            <Play className="w-4 h-4 text-gray-700" />
          ) : (
            <Pause className="w-4 h-4 text-gray-700" />
          )}
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              transition-all duration-300 
              ${index === currentIndex 
                ? 'bg-blue-500 w-6 rounded-full' 
                : 'bg-gray-300 w-2 rounded-full'}
              h-2
            `}
            aria-label={`Go to tour ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// PropTypes for type checking
ToursCarousel.propTypes = {
  tours: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
      price: PropTypes.number.isRequired,
      duration: PropTypes.string.isRequired
    })
  ).isRequired,
  TourCard: PropTypes.elementType.isRequired,
  autoplayInterval: PropTypes.number,
  visibleCards: PropTypes.number
};

export default ToursCarousel;