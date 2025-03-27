import ToursCarousel from './components/Tourca';

import { useState,useRef ,useEffect,useMemo} from 'react';
import { Heart, Share2,Loader,ChevronLeft,ChevronRight,Pause,Clock,Play,ChevronDown,Filter, X,Info, Star, MapPin, Calendar, Users, Globe, Check } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
// import { Loader, Heart, Share2, ChevronDown, Info, Map, Calendar, Users, Star, ChevronLeft, ChevronRight, Pause, Play, Filter, MapPin } from 'lucide-react';
import { useCallback } from 'react';
import axios from 'axios';
const DestinationGallery = ({ onViewAll }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [destinationCategories, setDestinationCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('top');
  const [isAllDestinationsPage, setIsAllDestinationsPage] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoplayInterval = 5000;
  const [activeModalTab, setActiveModalTab] = useState('overview');
  // const autoplayIntervalRef = useRef(null);
 
  const isComponentMounted = useRef(true);
  useEffect(() => {
    fetchDestinations();
    
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/destinations', {
        method: "GET",
        mode: "cors", // Explicitly enabling CORS mode
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      // Log the raw response for debugging
      const text = await response.text();
      console.log("Raw response:", text.substring(0, 500));
  
      // Handle non-200 responses
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = JSON.parse(text);
      setDestinationCategories(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err.message || "Failed to fetch destinations");
    } finally {
      setLoading(false);
    }
  };
  
  // const fetchDestinations = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await fetch('http://localhost:5000/api/destinations');
      
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch destinations');
  //     }
      
  //     const data = await response.json();
  //     console.log(data)
  //     setDestinationCategories(data);
  //   } catch (err) {
  //     setError(err.message || 'Failed to fetch destinations');
  //     console.error('Error fetching destinations:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const featureIcons = {
    map: Map,
    calendar: Calendar,
    users: Users,
    info: Info,
  };
  const handleTabClick = useCallback((tab) => {
    console.log('Tab changed to:' );
    setActiveModalTab(tab);
  }, []);
  const handleViewMore = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    // setActiveTab('top')
    // setActiveTab(tab);
    // setCurrentIndex(0);
    // setActiveModalTab('overview')
    // setActiveTab('overview')
    // setSelectedDestination(destination);
    // setIsModalOpen(true);
    // Explicitly set both states to 'overview'
    // setActiveModalTab('overview');
    
    // If you're using a separate handleTabClick function, reset it there too
    // if (typeof handleTabClick === 'function') {
    //   handleTabClick('overview');
    // }
  };


  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDestination(null);
    setActiveModalTab('overview');
  }, []);
  

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };
  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  //   setCurrentIndex(0);
  // };

  const handleViewAllClick = () => {
    setIsAllDestinationsPage(true);
    // activeTab("overview")
    // setActiveTab(tab);
    // setCurrentIndex(0);
    setActiveModalTab('overview');
    handleTabClick('overview');
    
  };
  // const handleViewAllClick = (destination) => {
  //   setSelectedDestination(destination);
  //   // setIsModalOpen(true);
  //   // Explicitly set both states to 'overview'
  //   setActiveModalTab('overview');
    
  //   // If you're using a separate handleTabClick function, reset it there too
  //   if (typeof handleTabClick === 'function') {
  //     handleTabClick('overview');
  //   }
  // };
  
  
  const handleBackToHome = () => {
    setIsAllDestinationsPage(false);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

 
  const currentDestinations = useMemo(() => {
    let categoryTitle = '';
    if (activeTab === 'top') categoryTitle = 'Top Destinations';
    if (activeTab === 'food') categoryTitle = 'Food Destinations';
    if (activeTab === 'ancient') categoryTitle = 'Ancient Destinations';
  
    const category = destinationCategories.find(cat => 
      cat.title.toLowerCase() === categoryTitle.toLowerCase()
    );
  
    return category ? category.items : [];
  }, [activeTab, destinationCategories]);  // Only recalculate when these change
  const filteredDestinations = useMemo(() => {
    if (!currentDestinations || currentDestinations.length === 0) {
      return [];
    }
    
    // Convert destinations to a map with IDs as keys to ensure uniqueness
    const destinationMap = new Map();
    
    currentDestinations.forEach(destination => {
      if (!destination) return;
      
      // Only include destinations that match all filters
      let matchesSearch = true;
      if (searchTerm && searchTerm !== '') {
        const title = (destination.title || '').toLowerCase();
        matchesSearch = title.includes(searchTerm.toLowerCase());
      }
      
      let matchesPrice = true;
      if (priceRange && Array.isArray(priceRange) && priceRange.length === 2) {
        const priceString = destination.tourDetails?.price || '0';
        const numericPrice = parseInt(priceString.replace(/,/g, '').replace(/[^\d.]/g, ''));
        
        matchesPrice = !isNaN(numericPrice) && 
                      numericPrice >= priceRange[0] && 
                      numericPrice <= priceRange[1];
      }
      
      let matchesCategories = true;
      if (selectedCategories.length > 0) {
        matchesCategories = selectedCategories.includes(destination.category);
      }
      
      // If passes all filters, add to our map using ID to ensure uniqueness
      if (matchesSearch && matchesPrice && matchesCategories) {
        const id = destination.id || `dest-${destination.title}`;
        destinationMap.set(id, destination);
      }
    });
    
    // Convert back to array
    return Array.from(destinationMap.values());
  }, [searchTerm, priceRange, currentDestinations, selectedCategories]);
  
  //   console.log("Starting filter function");
  //   console.log("Current destinations:", currentDestinations?.length || 0);
  //   console.log("Search term:", searchTerm);
    
  //   // If there are no current destinations, return empty array
  //   if (!currentDestinations || currentDestinations.length === 0) {
  //     console.log("No current destinations available");
  //     return [];
  //   }
    
  //   // For debugging - log the first destination to see its structure
  //   if (currentDestinations.length > 0) {
  //     console.log("Sample destination structure:", JSON.stringify(currentDestinations[0], null, 2));
  //   }
    
  //   // Apply filters to the current destinations
  //   const filtered = currentDestinations.filter(destination => {
  //     // Guard against null or undefined destination
  //     if (!destination) {
  //       console.log("Found a null destination");
  //       return false;
  //     }
      
  //     // When search term is empty, show all destinations
  //     if (searchTerm === '') {
  //       return true;
  //     }
      
  //     // Search term filter with extensive logging
  //     const title = destination.title || '';
  //     const lowerTitle = title.toLowerCase();
  //     const lowerSearchTerm = searchTerm.toLowerCase();
      
  //     const titleIncludes = lowerTitle.includes(lowerSearchTerm);
  //     console.log(`Title "${lowerTitle}" includes "${lowerSearchTerm}"? ${titleIncludes}`);
  //     return titleIncludes;
  //   });
    
  //   console.log(`Filtered down to ${filtered.length} destinations`);
  //   return filtered;
  // }, [searchTerm, currentDestinations]);
 
  // // Get all unique categories
  const allCategories = useMemo(() => {
    return [...new Set(currentDestinations
      .filter(dest => dest.category)
      .map(dest => dest.category))];
  }, [currentDestinations]);

  // Reset index when filtered destinations change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredDestinations]);

  // Navigation functions
  const handleNextDestination = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % filteredDestinations.length
    );
  };

  const handlePreviousDestination = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredDestinations.length - 1 : prevIndex - 1
    );
  };

  // Autoplay management
  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    
    autoplayIntervalRef.current = setInterval(() => {
      if (!isAutoplayPaused && filteredDestinations.length > 0) {
        handleNextDestination();
      }
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  // Autoplay effect
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [isAutoplayPaused, filteredDestinations]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextDestination();
      if (e.key === 'ArrowLeft') handlePreviousDestination();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoplayPaused(prev => !prev);
  };

  // Compute visible destinations for desktop
  // const visibleDestinations = useMemo(() => {
  //   const visibleCards = isMobile ? 1 : 3;
  //   return filteredDestinations.slice(currentIndex, currentIndex + visibleCards)
  //     .concat(filteredDestinations.slice(0, Math.max(0, visibleCards - (filteredDestinations.length - currentIndex))));
  // }, [currentIndex, filteredDestinations, isMobile]);

  // Slider variants
  const sliderVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const LoadingState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Loading destinations...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchDestinations}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center p-8">
      <p className="text-gray-500 text-lg">No destinations found matching your search.</p>
      <div className="mt-4 flex flex-col items-center gap-2">
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear search term
          </button>
        )}
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear category filters
          </button>
        )}
        {(priceRange[0] > 0 || priceRange[1] < 5000) && (
          <button
            onClick={() => setPriceRange([0, 5000])}
            className="text-orange-500 hover:text-orange-600"
          >
            Reset price range
          </button>
        )}
      </div>
    </div>
  );
 
  const DestinationCard = ({ destination, onViewMore }) => {
    const [isLiked, setIsLiked] = useState(false);
    
    // Calculate real discount if available
    const calculateDiscount = () => {
      if (destination.tourDetails?.originalPrice && destination.tourDetails?.price) {
        const originalPrice = parseFloat(destination.tourDetails.originalPrice);
        const currentPrice = parseFloat(destination.tourDetails.price);
        if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
          return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        }
      }
      return destination.tourDetails?.discount || 0;
    };
  
    const discount = calculateDiscount();
    
    // Format price with currency
    const formatPrice = (price) => {
      if (!price) return "₹0";
      const numPrice = parseFloat(price);
      if (isNaN(numPrice)) return "₹0";
      return `₹${numPrice.toLocaleString('en-IN')}`;
    };
  
    // Format ratings for display
    const formatRating = (rating) => {
      const numRating = parseFloat(rating);
      return isNaN(numRating) ? '4.5' : numRating.toFixed(1);
    };
  
    return (
      <div className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 via-white to-amber-50 border border-orange-100 hover:border-orange-200">
        {/* Image Container with overlays and badges */}
        <div className="relative h-56">
          <img 
            // src={destination.image || "/api/placeholder/300/200"} 
            src={`https://backend-1-7zwm.onrender.com${destination.image}`}
            alt={destination.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Wishlist icon */}
          <button 
            className={`absolute top-3 right-3 p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'} backdrop-blur-sm`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <svg className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          
          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {destination.category || "Travel"}
          </div>
          
          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-12 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {discount}% OFF
            </div>
          )}
  
          {/* NEW badge if desired */}
          {destination.isNew && (
            <div className="absolute top-12 left-3 ml-16 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              NEW
            </div>
          )}
          
          {/* Price badge at bottom */}
          {/* {destination.tourDetails?.price && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              {formatPrice(destination.tourDetails.price)}
            </div>
          )} */}
          
          {/* Location on image */}
          {destination.location && (
            <div className="absolute bottom-3 right-3 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              {destination.tourDetails?.location || destination.location}
            </div>
          )}
        </div>
  
        {/* Content Container */}
        <div className="p-5">
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1 hover:text-orange-600 transition-colors">
                {destination.title}
              </h3>
              {/* Rating display */}
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded mr-1">
                  {formatRating(destination.rating)}
                  <svg className="w-3 h-3 ml-0.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <span className="text-xs text-gray-600">
                  {destination.reviews || '0'} Reviews
                </span>
              </div>
            </div>
          </div>
          
          {/* Package details row */}
          <div className="flex flex-wrap gap-3 mb-3">
            {/* Duration */}
            {destination.tourDetails?.duration && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs">{destination.tourDetails.duration}</span>
              </div>
            )}
            
            {/* Group Size */}
            {destination.tourDetails?.groupSize && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-.94z"></path>
                </svg>
                <span className="text-xs">Group: {destination.tourDetails.groupSize}</span>
              </div>
            )}
            
            {/* Cancellation policy */}
            {destination.tourDetails?.cancellation && (
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs">{destination.tourDetails.cancellation}</span>
              </div>
            )}
          </div>
          
          {/* Activity/Details tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {destination.details?.slice(0, 3).map((detail, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                {detail}
              </span>
            ))}
          </div>
          
          {/* Best Time indicator */}
          {destination.tourDetails?.bestTime && (
            <div className="flex items-center mt-2 mb-3 text-xs font-medium text-gray-700">
              <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 01-.293-.707V6a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              <span>Best Time: <span className="text-orange-600 font-medium">{destination.tourDetails.bestTime}</span></span>
            </div>
          )}
          
          {/* Facilities icons */}
          {destination.facilities && destination.facilities.length > 0 && (
            <div className="flex space-x-3 mb-3">
              {destination.facilities.includes('meals') && (
                <div className="flex flex-col items-center" title="Meals Included">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Meals</span>
                </div>
              )}
              {destination.facilities.includes('transport') && (
                <div className="flex flex-col items-center" title="Transport Included">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-6a3 3 0 00-.78-2.01L16.81 3.4A1 1 0 0016.14 3H3z" />
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Transport</span>
                </div>
              )}
              {destination.facilities.includes('guide') && (
                <div className="flex flex-col items-center" title="Guide Included">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-.94z"></path>
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Guide</span>
                </div>
              )}
            </div>
          )}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>
          
          {/* Price section */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <div>
                {destination.tourDetails?.originalPrice && parseFloat(destination.tourDetails.originalPrice) > parseFloat(destination.tourDetails.price) && !isNaN(parseFloat(destination.tourDetails.originalPrice)) && (
                  <span className="text-xs text-gray-500 line-through block">
                    {formatPrice(destination.tourDetails.originalPrice)}
                  </span>
                )}
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(destination.tourDetails.price)}
                  </span>
                  <span className="text-xs ml-1 text-gray-600">
                    per adult
                  </span>
                </div>
              </div>
              
              {/* EMI information */}
              {destination.tourDetails?.emi && (
                <div className="text-right">
                  <span className="text-xs text-gray-600 block">Starting from</span>
                  <span className="text-sm font-medium text-green-600">{destination.tourDetails.emi}/month</span>
                </div>
              )}
            </div>
            
            {/* View button */}
            <button
              onClick={() => handleViewMore(destination)}
              className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>View Details</span>
              <svg 
                className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DestinationModal = ({ isOpen, destination, onClose,  activeTab, setActiveTab   }) => {
    // const [activeTab, setActiveTab] = useState('overview');
    const [isFavorite, setIsFavorite] = useState(false);
    
    if (!isOpen || !destination) return null;
    
    // Format price with comma separators and handle invalid values
    const formatPrice = (price) => {
      const numPrice = Number(price);
      return isNaN(numPrice) ? '₹0' : `₹${numPrice.toLocaleString('en-IN')}`;
    };
    
    // Calculate discount if available
    const calculateDiscount = () => {
      if (destination.tourDetails?.originalPrice && destination.tourDetails?.price) {
        const originalPrice = Number(destination.tourDetails.originalPrice);
        const currentPrice = Number(destination.tourDetails.price);
        if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
          return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        }
      }
      return destination.tourDetails?.discount || 0;
    };
  
    // Check if price data exists and is valid
    const hasValidPriceData = () => {
      return destination.tourDetails?.price && !isNaN(Number(destination.tourDetails.price));
    };
  
  



        const showDestinationQueryForm = (selectedDestination,selectedTour, userData, token, isLoggedIn) => {
          // Create modal container
          console.log(destination.price)
          // const price = destinatio
          // n.tourDetails.price || selectedDestination.basePrice; // Define price
          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'query-form-overlay';
          modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          `;
        
          // Create modal content with responsive design
          const modalContent = document.createElement('div');
          modalContent.className = 'query-form-content';
          modalContent.style.cssText = `
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            width: 90%;
            max-width: 450px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          `;
        
          // Pre-fill form data if user is logged in
          const name = userData?.username || '';
          const email = userData?.email || '';
          const phone = userData?.phone || '';
        
          // Form with responsive design for both desktop and mobile
          modalContent.innerHTML = `
            <style>
              /* Base styles */
              .query-form-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
              }
              .query-form-title {
                margin: 0;
                color: #FF6B00;
                font-size: 1.4rem;
                font-weight: 600;
              }
              .close-button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
              }
              .highlight-box {
                background: linear-gradient(to right, #FFF3E0, #FFE0B2);
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 15px;
              }
              .price-box {
                margin: 0 0 15px;
                background-color: #F5F5F5;
                padding: 12px;
                border-radius: 6px;
                text-align: center;
              }
              .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 10px;
              }
              .form-full-width {
                grid-column: span 2;
              }
              .form-label {
                display: block;
                margin-bottom: 3px;
                font-weight: 500;
                font-size: 0.85rem;
                color: #555;
              }
              .form-input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 0.9rem;
              }
              .form-checkbox {
                display: flex;
                align-items: flex-start;
                cursor: pointer;
              }
              .submit-container {
                grid-column: span 2;
                text-align: center;
                margin-top: 5px;
              }
              .submit-button {
                background: linear-gradient(to right, #FF6B00, #FF9800);
                color: white;
                border: none;
                padding: 10px 0;
                width: 80%;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3);
                transition: all 0.3s;
              }
              .promotional-text {
                grid-column: span 2;
                text-align: center;
                margin-top: 8px;
                font-size: 0.75rem;
                color: #888;
              }
              
              /* Mobile optimizations */
              @media (max-width: 480px) {
                .form-grid {
                  grid-template-columns: 1fr;
                }
                .form-half-width {
                  grid-column: span 1;
                }
                .submit-button {
                  width: 100%;
                }
                .query-form-title {
                  font-size: 1.2rem;
                }
                .price-box {
                  padding: 8px;
                }
              }
            </style>
            
            <div class="query-form-header">
              <h2 class="query-form-title">Almost There! 🎯</h2>
              <button id="closeQueryForm" class="close-button">&times;</button>
            </div>
            
            <div class="highlight-box">
              <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
                <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable journey to ${selectedDestination.title}!
              </p>
            </div>
            
            <!-- Price Display Box -->
           <div class="price-box">
               <p style="margin: 0; font-size: 0.9rem; color: #333;">
                 <span style="font-weight: 600;">Package Price:</span> 
                 <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${destination.price}</span>
                 <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
                   Base price: ₹${destination.price} per person | Group discounts available
                 </span>
              </p>
             </div>
            
            <form id="destinationQueryForm" class="form-grid">
              <div class="form-full-width">
                <label for="queryName" class="form-label">Full Name*</label>
                <input type="text" id="queryName" required value="${name}" class="form-input">
              </div>
              
              <div class="form-full-width">
                <label for="queryEmail" class="form-label">Email Address*</label>
                <input type="email" id="queryEmail" required value="${email}" class="form-input">
              </div>
              
              <div class="form-full-width">
                <label for="queryPhone" class="form-label">Phone Number*</label>
                <input type="tel" id="queryPhone" required value="${phone}" class="form-input">
              </div>
              
              <div class="form-half-width">
                <label for="queryTravelDate" class="form-label">Travel Date*</label>
                <input type="date" id="queryTravelDate" required class="form-input">
              </div>
              
              <div class="form-half-width">
                <label for="queryDuration" class="form-label">Duration (Days)*</label>
                <select id="queryDuration" required class="form-input">
                  <option value="3">3 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div class="form-half-width">
                <label for="queryAdults" class="form-label">Adults*</label>
                <select id="queryAdults" required class="form-input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6+">6+</option>
                </select>
              </div>
              
              <div class="form-half-width">
                <label for="queryChildren" class="form-label">Children (Under 12)</label>
                <select id="queryChildren" class="form-input">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
              
              <div class="form-full-width">
                <label for="queryBudget" class="form-label">Budget Range</label>
                <select id="queryBudget" class="form-input">
                  <option value="economy">Economy</option>
                  <option value="standard" selected>Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              
              <div class="form-full-width">
                <label for="queryMessage" class="form-label">Special Requirements</label>
                <textarea id="queryMessage" rows="2" class="form-input" style="resize: none;"></textarea>
              </div>
              
              <div class="form-full-width" style="margin: 5px 0 10px;">
                <label class="form-checkbox">
                  <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
                  <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
                </label>
              </div>
              
              <div class="submit-container">
                <button type="submit" id="proceedBtn" class="submit-button">
                  Send Query & Continue to Booking
                </button>
                <!-- Loading state message -->
                <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
                  Taking you to checkout page...
                </p>
              </div>
              
              <div class="promotional-text">
                <p style="margin: 0;">
                  <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
                </p>
              </div>
            </form>
          `;
        
          // Append modal to body
          modalOverlay.appendChild(modalContent);
          document.body.appendChild(modalOverlay);
        
          // Close modal functionality
          document.getElementById('closeQueryForm').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
          });
        
          // Price calculation function for destinations
          const updateDestinationPrice = () => {
            const basePrice =destination.price;
            const adults = document.getElementById('queryAdults').value;
            const adultsCount = adults === '6+' ? 6 : parseInt(adults || 1);
            const children = document.getElementById('queryChildren').value;
            const childrenCount = children === '4+' ? 4 : parseInt(children || 0);
            const duration = document.getElementById('queryDuration').value;
            const durationDays = duration === 'custom' ? 7 : parseInt(duration);
            const budget = document.getElementById('queryBudget').value;
            
            // Budget multipliers
            const budgetMultipliers = {
              'economy': 0.8,
              'standard': 1.0,
              'premium': 1.3,
              'luxury': 1.8
            };
            
            // Calculate package price based on people, duration and budget preference
            let totalPrice = basePrice * adultsCount;
            totalPrice += basePrice * 0.6 * childrenCount; // Children at 60% of adult price
            totalPrice = totalPrice * (durationDays / 5); // Adjust for duration (normalized to 5 days)
            totalPrice = totalPrice * budgetMultipliers[budget]; // Adjust for budget preference
            
            // Round to nearest hundred
            totalPrice = Math.round(totalPrice / 100) * 100;
            
            document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
            
            // Store the calculated price to use in the booking process
            window.calculatedDestinationPrice = totalPrice;
            
            console.log("Destination Price Updated:", totalPrice);
          };
        
          // Add event listeners for live price updates
          setTimeout(() => {
            document.getElementById('queryAdults').addEventListener('change', updateDestinationPrice);
            document.getElementById('queryChildren').addEventListener('change', updateDestinationPrice);
            document.getElementById('queryDuration').addEventListener('change', updateDestinationPrice);
            document.getElementById('queryBudget').addEventListener('change', updateDestinationPrice);
            
            // Initialize price calculation
            updateDestinationPrice();
          }, 100);
        
          // Form submission handler
          document.getElementById('destinationQueryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading message
            const proceedBtn = document.getElementById('proceedBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            proceedBtn.disabled = true;
            proceedBtn.style.opacity = '0.7';
            proceedBtn.textContent = 'Processing...';
            loadingMessage.style.display = 'block';
            
            // Get values from form
            const adults = document.getElementById('queryAdults').value;
            const children = document.getElementById('queryChildren').value;
            const duration = document.getElementById('queryDuration').value;
            const budget = document.getElementById('queryBudget').value;
            
            // Make sure to get the most up-to-date calculated price
            updateDestinationPrice();
            
            const formData = {
              name: document.getElementById('queryName').value,
              email: document.getElementById('queryEmail').value,
              phone: document.getElementById('queryPhone').value,
              travelDate: document.getElementById('queryTravelDate').value,
              duration: duration,
              adults: adults,
              children: children,
              budget: budget,
              totalTravelers: (adults === '6+' ? 6 : parseInt(adults)) + (children === '4+' ? 4 : parseInt(children)),
              message: document.getElementById('queryMessage').value,
              destinationTitle: selectedDestination.title,
              basePrice: selectedDestination.price,
              // basePrice:destination.tourDetails.price,
              calculatedPrice: window.calculatedDestinationPrice || selectedDestination.price,
              termsAccepted: document.getElementById('queryTerms').checked
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
              alert('Please fill in all required fields');
              // Reset button state
              proceedBtn.disabled = false;
              proceedBtn.style.opacity = '1';
              proceedBtn.textContent = 'Send Query & Continue to Booking';
              loadingMessage.style.display = 'none';
              return;
            }
            
            try {
              // 1. Send to backend API
              try {
                await axios.post('http://localhost:5000/api/destination-queries', formData);
                console.log('✅ Destination query saved to database');
              } catch (error) {
                console.error('❌ Error saving destination query:', error);
              }
            
              // 2. Send to WhatsApp in the background
              sendDestinationWhatsAppInBackground(formData);
              
              // Create/update userData object with form data
              const updatedUserData = {
                username: formData.name,
                email: formData.email,
                phone: formData.phone
              };
              
              // Short delay to show the "taking you to checkout" message
              setTimeout(() => {
                // Close the modal
                document.body.removeChild(modalOverlay);
                
                // Proceed with payment - using either existing userData (if logged in) or form data
                // Pass the calculated total price to the payment function
                proceedWithDestinationPayment(selectedDestination, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
              }, 1500);
              
            } catch (error) {
              console.error('🚨 Error processing destination query:', error);
              alert('Failed to submit query. Please try again.');
              
              // Reset button state
              proceedBtn.disabled = false;
              proceedBtn.style.opacity = '1';
              proceedBtn.textContent = 'Send Query & Continue to Booking';
              loadingMessage.style.display = 'none';
            }
          });
        };
        
        // Function to send WhatsApp message for destination bookings
        const sendDestinationWhatsAppInBackground = (formData) => {
          // Format message for WhatsApp
          const message = `
        *New Destination Query*
        ------------------
        *Destination:* ${formData.destinationTitle}
        *Base Price:* ₹${formData.basePrice}
        *Total Price:* ₹${formData.calculatedPrice}
        
        *Customer Details*
        ------------------
        *Name:* ${formData.name}
        *Email:* ${formData.email}
        *Phone:* ${formData.phone}
        *Travel Date:* ${formData.travelDate}
        
        *Booking Details*
        ------------------
        *Duration:* ${formData.duration} days
        *Adults:* ${formData.adults}
        *Children:* ${formData.children}
        *Budget Preference:* ${formData.budget}
        *Total Travelers:* ${formData.totalTravelers}
        
        *Message:* ${formData.message || 'N/A'}
        ------------------
        Sent on: ${new Date().toLocaleString()}
          `.trim();
        
          // Use your backend API to send WhatsApp message
          try {
            // Send via your own backend API
            axios.post('http://localhost:5000/api/send-whatsapp', {
              phone: "9541515012",
              message: message
            }).then(() => {
              console.log('✅ WhatsApp destination notification sent successfully');
            }).catch(error => {
              console.error('❌ Error sending WhatsApp destination notification:', error);
              // Fallback option if needed
            });
          } catch (error) {
            console.error('❌ Error sending WhatsApp destination notification:', error);
          }
        };
        
        // Function to proceed with payment for destinations
        const proceedWithDestinationPayment = async (selectedDestination, userData, token, calculatedPrice) => {
          const userEmail = userData?.email?.trim();
          
          if (!userEmail) {
            alert("❌ Email is required for booking.");
            return;
          }
        
          console.log("✅ Final User Email:", userEmail);
          console.log("✅ Calculated Destination Price:", calculatedPrice);
        
          const packageDetails = {
            id: `destination-${Date.now()}`,
            name: selectedDestination.title,
            description: `Destination package for ${selectedDestination.title}`,
          };
        
          const loadRazorpay = () => {
            return new Promise((resolve) => {
              const script = document.createElement('script');
              script.src = 'https://checkout.razorpay.com/v1/checkout.js';
              script.onload = () => resolve(true);
              script.onerror = () => {
                console.error("❌ Razorpay SDK failed to load");
                resolve(false);
              };
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
        
              // Use the calculated price
              const finalAmount = calculatedPrice || selectedDestination.price;
        
              const payload = {
                amount: finalAmount,
                packageDetails,
                email: userEmail,
                name: userData?.username || 'Guest',
                phone: userData?.phone || '',
              };
        
              console.log("Request Payload:", payload);
        
              console.log("🟢 Sending Create Order API Call...");
              const orderResponse = await fetch('https://backend-1-7zwm.onrender.com/api/create-order', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(payload),
              });
        
              if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                console.error("❌ Create Order API failed:", errorData);
                alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
                return;
              }
        
              const { order } = await orderResponse.json();
        
              if (!order || !order.id) {
                console.error("❌ Invalid order response:", order);
                alert("Order creation failed. Please try again.");
                return;
              }
        
              console.log("✅ Order Created Successfully:", order);
        
              const options = {
                key: "rzp_live_VQS2zWKwCIE5ON",
                amount: finalAmount * 100,
                currency: 'INR',
                name: "Your Travel Company",
                description: packageDetails.description,
                order_id: order.id,
                handler: async function (response) {
                  try {
                    console.log("🟢 Payment Successful! Sending verification request...");
                    const verifyResponse = await fetch('https://backend-1-7zwm.onrender.com/api/verify-payment', {
                      method: 'POST',
                      headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : ''
                      },
                      body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        customerDetails: { 
                          name: userData?.username || 'Guest', 
                          email: userEmail,
                          phone: userData?.phone || ''
                        }
                      }),
                    });
        
                    const data = await verifyResponse.json();
                    if (data.success) {
                      alert('🎉 Destination booking successful!');
                    } else {
                      alert('❌ Payment verification failed');
                    }
                  } catch (error) {
                    console.error("🚨 Payment verification error:", error);
                    alert('❌ Payment verification failed');
                  }
                },
                prefill: {
                  name: userData?.username || 'Guest',
                  email: userEmail,
                  contact: userData?.phone || ''
                },
                theme: { color: '#FF6B00' }
              };
        
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            } catch (error) {
              console.error('🚨 Payment error:', error);
              alert('❌ Payment initiation failed');
            }
          };
        
          initiatePayment();
        };
        const handleBookNow = async (selectedDestination) => {
          const title = selectedDestination?.title || selectedDestination?.destinationName;
          const price = selectedDestination?.price || selectedDestination?.basePrice;
        
          // Validate selectedDestination
          // if (!selectedDestination || !title || !price) {
          //   alert("❌ Invalid destination selected. Please select a valid destination.");
          //   return;
          // }
        
          console.log("✅ Final Destination Title:", title);
          console.log("✅ Final Price:", price);
        
          const token = localStorage.getItem('token');
          let userData = null;
          let isLoggedIn = false;
        
          // ✅ Fetch user details if logged in
          if (token) {
            try {
              console.log("🟢 Fetching user details...");
              const userRes = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
              });
              userData = userRes.data;
              isLoggedIn = true;
              console.log("✅ User Data Retrieved:", userData);
            } catch (error) {
              console.error('🚨 Error fetching user data:', error);
            }
          }
        
          // Show query form for BOTH logged-in and guest users
          showDestinationQueryForm(selectedDestination, userData, token, isLoggedIn);
        };


        const handleGetQuote = () => {
          console.log("Get quote for:", destination.title);
          
          // Create modal container if it doesn't exist
          let modalContainer = document.getElementById('quote-modal-container');
          if (!modalContainer) {
            modalContainer = document.createElement('div');
            modalContainer.id = 'quote-modal-container';
            document.body.appendChild(modalContainer);
          }
          // Show loading state
        
          // Create and populate the modal content with marketing elements
          modalContainer.innerHTML = `
            <div class="quote-modal-overlay">
              <div class="quote-modal">
                <div class="quote-modal-header">
                  <h2>Get Your Exclusive Quote for ${destination.title || 'This Experience'}</h2>
                  <button class="quote-close-btn">&times;</button>
                </div>
                
                <div class="quote-banner">
                  <div class="quote-banner-content">
                    <div class="quote-banner-icon">🎁</div>
                    <div class="quote-banner-text">
                      <strong>Limited Time Offer!</strong> Book within 48 hours and receive a 15% early bird discount!
                    </div>
                  </div>
                </div>
                
                <div class="quote-modal-body">
                  <div class="quote-intro">
                    <p>Join thousands of satisfied travelers who have experienced this journey of a lifetime. Our expert travel advisors are ready to craft your perfect adventure.</p>
                    <div class="quote-benefits">
                      <div class="benefit-item"><span class="benefit-icon">✓</span> Best Price Guarantee</div>
                      <div class="benefit-item"><span class="benefit-icon">✓</span> Free Cancellation</div>
                      <div class="benefit-item"><span class="benefit-icon">✓</span> 24/7 Support</div>
                    </div>
                  </div>
                  
                  <form id="quote-request-form">
                    <div class="form-group">
                      <label for="quote-name">Full Name*</label>
                      <input type="text" id="quote-name" placeholder="Your Name" required />
                    </div>
                    <div class="form-group">
                      <label for="quote-email">Email Address*</label>
                      <input type="email" id="quote-email" placeholder="your@email.com" required />
                    </div>
                    <div class="form-group">
                      <label for="quote-phone">Phone Number*</label>
                      <input type="tel" id="quote-phone" placeholder="+1 (234) 567-8900" required />
                    </div>
                    <div class="form-row">
                      <div class="form-group">
                        <label for="quote-travelers">Number of Travelers*</label>
                        <select id="quote-travelers" required>
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3-5">3-5</option>
                          <option value="6-10">6-10</option>
                          <option value="10+">10+</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="quote-date">Travel Date*</label>
                        <input type="date" id="quote-date" required />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="quote-message">Special Requirements or Customizations</label>
                      <textarea id="quote-message" placeholder="Tell us about any special requirements, preferences, or questions you have about this experience"></textarea>
                    </div>
                    
                    <div class="quote-promo">
                      <div class="promo-icon">🔥</div>
                      <p>Act fast! <strong>7 other travelers</strong> are looking at this tour right now.</p>
                    </div>
                    
                    <div class="form-checkbox">
                      <input type="checkbox" id="quote-newsletter" checked />
                      <label for="quote-newsletter">Send me exclusive deals and offers (10% off your first booking!)</label>
                    </div>
                    
                    <button type="submit" class="quote-submit-btn">
                      <span class="btn-text">Get My Personalized Quote</span>
                      <span class="btn-icon">→</span>
                    </button>
                  </form>
                  
                  <div class="quote-trust">
                    <p>Trusted by over 1M+ happy travelers worldwide</p>
                    <div class="trust-icons">
                      <div class="trust-icon">⭐⭐⭐⭐⭐</div>
                      <div class="trust-text">4.9/5 from 10,000+ reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          // Add styling for the enhanced modal
          const style = document.createElement('style');
          style.textContent = `
            .quote-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideIn {
              from { transform: translateY(30px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            
            .quote-modal {
              background-color: white;
              border-radius: 10px;
              width: 95%;
              max-width: 650px;
              max-height: 90vh;
              overflow-y: auto;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
              animation: slideIn 0.4s ease;
            }
            
            .quote-modal-header {
              padding: 22px 25px;
              border-bottom: 1px solid #eee;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #FF6B00;
              border-radius: 10px 10px 0 0;
            }
            
            .quote-modal-header h2 {
              margin: 0;
              color: white;
              font-size: 22px;
              font-weight: 700;
            }
            
            .quote-close-btn {
              background: none;
              border: none;
              font-size: 28px;
              cursor: pointer;
              color: white;
              opacity: 0.8;
              transition: opacity 0.2s;
            }
            
            .quote-close-btn:hover {
              opacity: 1;
            }
            
            .quote-banner {
              background: linear-gradient(90deg, #FFF3E0, #FFECB3);
              padding: 12px 25px;
              border-bottom: 1px solid #FFE0B2;
            }
            
            .quote-banner-content {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            
            .quote-banner-icon {
              font-size: 24px;
            }
            
            .quote-banner-text {
              font-size: 15px;
              color: #E65100;
            }
            
            .quote-modal-body {
              padding: 25px;
            }
            
            .quote-intro {
              margin-bottom: 25px;
            }
            
            .quote-intro p {
              margin-top: 0;
              margin-bottom: 15px;
              color: #555;
              line-height: 1.5;
            }
            
            .quote-benefits {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              margin-bottom: 20px;
            }
            
            .benefit-item {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #333;
              margin-right: 15px;
            }
            
            .benefit-icon {
              color: #FF6B00;
              font-weight: bold;
              margin-right: 5px;
            }
            
            .form-group {
              margin-bottom: 20px;
            }
            
            .form-row {
              display: flex;
              gap: 20px;
            }
            
            .form-row .form-group {
              flex: 1;
            }
            
            label {
              display: block;
              margin-bottom: 8px;
              font-weight: 600;
              color: #333;
              font-size: 15px;
            }
            
            input, select, textarea {
              width: 100%;
              padding: 14px;
              border: 1px solid #ddd;
              border-radius: 6px;
              font-size: 15px;
              transition: border-color 0.3s;
            }
            
            input:focus, select:focus, textarea:focus {
              outline: none;
              border-color: #FF6B00;
              box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
            }
            
            textarea {
              height: 110px;
              resize: vertical;
            }
            
            .quote-promo {
              background-color: #FFF8E1;
              border-radius: 6px;
              padding: 12px 15px;
              margin: 20px 0;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .promo-icon {
              font-size: 20px;
            }
            
            .quote-promo p {
              margin: 0;
              color: #333;
              font-size: 14px;
            }
            
            .form-checkbox {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 20px;
            }
            
            .form-checkbox input {
              width: auto;
            }
            
            .form-checkbox label {
              margin-bottom: 0;
              font-weight: normal;
              font-size: 14px;
              cursor: pointer;
            }
            
            .quote-submit-btn {
              background-color: #FF6B00;
              color: white;
              border: none;
              border-radius: 6px;
              padding: 16px 24px;
              font-size: 17px;
              font-weight: 700;
              cursor: pointer;
              width: 100%;
              transition: all 0.3s;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
              box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
            }
            
            .quote-submit-btn:hover {
              background-color: #E55F00;
              transform: translateY(-2px);
              box-shadow: 0 6px 15px rgba(255, 107, 0, 0.4);
            }
            
            .btn-icon {
              font-size: 18px;
              transition: transform 0.3s;
            }
            
            .quote-submit-btn:hover .btn-icon {
              transform: translateX(5px);
            }
            
            .quote-trust {
              margin-top: 25px;
              text-align: center;
              padding-top: 15px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
            
            .quote-trust p {
              margin-bottom: 10px;
            }
            
            .trust-icons {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;
            }
            
            .quote-success {
              text-align: center;
              padding: 40px 25px;
              animation: fadeIn 0.5s ease;
            }
            
            .quote-success-icon {
              background-color: #FF6B00;
              color: white;
              width: 70px;
              height: 70px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 35px;
              margin: 0 auto 25px;
              box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
            }
            
            .quote-success h3 {
              color: #333;
              margin-bottom: 15px;
              font-size: 24px;
            }
            
            .quote-success p {
              color: #555;
              margin-bottom: 25px;
              line-height: 1.6;
            }
            
            .quote-close-success-btn {
              background-color: #FF6B00;
              color: white;
              border: none;
              border-radius: 6px;
              padding: 14px 30px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
            }
            
            .quote-close-success-btn:hover {
              background-color: #E55F00;
              transform: translateY(-2px);
              box-shadow: 0 6px 15px rgba(255, 107, 0, 0.35);
            }
            
            @media (max-width: 600px) {
              .form-row {
                flex-direction: column;
                gap: 15px;
              }
              
              .quote-banner-content {
                flex-direction: column;
                text-align: center;
                gap: 8px;
              }
              
              .quote-modal-header h2 {
                font-size: 18px;
              }
              
              .quote-benefits {
                flex-direction: column;
                gap: 10px;
              }
            }
          `;
          document.head.appendChild(style);
          
          // Add event listeners
          document.querySelector('.quote-close-btn').addEventListener('click', () => {
            modalContainer.remove();
          });
          
          document.getElementById('quote-request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
              name: document.getElementById('quote-name').value,
              email: document.getElementById('quote-email').value,
              phone: document.getElementById('quote-phone').value,
              travelers: document.getElementById('quote-travelers').value,
              travelDate: document.getElementById('quote-date').value,
              message: document.getElementById('quote-message').value,
              newsletterSubscription: document.getElementById('quote-newsletter').checked,
              tourId: tour.id || '',
              tourName: tour.name || '',
              requestTimestamp: new Date().toISOString(),
              source: window.location.href,
              utm: getUTMParams() // Function to get UTM parameters if available
            };
            
            console.log("Quote form submitted:", formData);
            
            // Show loading state
            // const submitBtn = document.querySelector('.quote-
           const  submitBtn = document.querySelector('.quote-submit-btn');
        submitBtn.innerHTML = '<span>Processing...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call to submit quote request
        setTimeout(() => {
          // Replace form with success message
          document.querySelector('.quote-modal-body').innerHTML = `
            <div class="quote-success">
              <div class="quote-success-icon">✓</div>
              <h3>Your Quote Request is Confirmed!</h3>
              <p>Thank you, ${formData.name}! Our travel experts will prepare your personalized quote for ${tour.name || 'this experience'} and contact you within 24 hours at ${formData.email}.</p>
              <p>Don't forget - book within 48 hours to claim your exclusive 15% early bird discount!</p>
              <button class="quote-close-success-btn">Close</button>
            </div>
          `;
          
          // Add event listener to new close button
          document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
            modalContainer.remove();
          });
          
          // Actually send the form data to server
          // sendQuoteRequestToServer(formData);
        }, 1500);
        });
        
        // Function to get UTM parameters if available
        function getUTMParams() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
          if (urlParams.has(param)) {
            params[param] = urlParams.get(param);
          }
        });
        
        return params;
        }
        };
        const handleTabClick = (tab) => {
          console.log(`Setting tab to: ${tab}`);
          setActiveTab(tab);
        };

        const handleBookNow2 = async () => {
            if (!destination || !destination.tourDetails) {
              alert("❌ Invalid destination selected. Please try again.");
              return;
            }
          
            const selectedTour = destination.tourDetails; // Ensure we get the correct tour details
            const title = selectedTour.title || destination.title;
            const price = selectedTour.price;
            const description = selectedTour.description || destination.description;
          
            console.log("✅ Final Title:", title);
            console.log("✅ Final Price:", price);
            console.log("✅ Description:", description);
          
            if (!title || !price) {
              alert("❌ Missing tour information. Please check the destination data.");
              return;
            }
          
            // Fetch the user token
            const token = localStorage.getItem('token');
            console.log("🔵 Token Retrieved:", token);
          
            let userData = null;
          
            // Fetch user details if logged in
            if (token) {
              try {
                console.log("🟢 Fetching user details...");
                const userRes = await axios.get('http://localhost:5000/api/auth/me', {
                  headers: { Authorization: `Bearer ${token}` },
                });
                userData = userRes.data;
                console.log("✅ User Data Retrieved:", userData);
              } catch (error) {
                console.error('🚨 Error fetching user data:', error);
              }
            }
          
            // Ask for email if not found
            let userEmail = userData?.email?.trim() || '';
            if (!userEmail) {
              console.warn("⚠️ No email found! Asking user...");
              userEmail = prompt("Please enter your email for booking confirmation:");
              if (!userEmail) {
                alert("❌ Email is required for booking.");
                return;
              }
            }
          
            console.log("✅ Final User Email:", userEmail);
          
            // Package Details
            const packageDetails = {
              id: `tour-${Date.now()}`,
              name: title,
              description: `Tour package for ${title}`,
            };
          
            console.log("Package Details:", packageDetails);
          
            // Payment Process
            const loadRazorpay = () => {
              return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => {
                  console.error("❌ Razorpay SDK failed to load");
                  resolve(false);
                };
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
                const amountInPaise = parseInt(price.replace(/\D/g, '')) * 100; // Convert to paise
          
                const payload = {
                  amount: amountInPaise,
                  packageDetails,
                  email: userEmail,
                  name: userData?.username || 'Guest',
                };
                
                console.log("✅ Corrected Request Payload:", payload);
                
                const orderResponse = await fetch('http://localhost:5000/api/create-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(payload),
                });
                
               
          
                if (!orderResponse.ok) {
                  const errorData = await orderResponse.json();
                  console.error("❌ Create Order API failed:", errorData);
                  alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
                  return;
                }
          
                const { order } = await orderResponse.json();
          
                if (!order || !order.id) {
                  console.error("❌ Invalid order response:", order);
                  alert("Order creation failed. Please try again.");
                  return;
                }
          
                console.log("✅ Order Created Successfully:", order);
          
                const options = {
                  key: "rzp_live_VQS2zWKwCIE5ON",
                  amount: price * 100,
                  currency: 'INR',
                  name: "Your Travel Company",
                  description: packageDetails.description,
                  order_id: order.id,
                  handler: async function (response) {
                    try {
                      console.log("🟢 Payment Successful! Sending verification request...");
                      const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                          customerDetails: {
                            name: userData?.username || 'Guest',
                            email: userEmail
                          }
                        }),
                      });
          
                      console.log("✅ Sent Token in API Call:", token);
          
                      const data = await verifyResponse.json();
                      if (data.success) {
                        alert('🎉 Booking successful!');
                      } else {
                        alert('❌ Payment verification failed');
                      }
                    } catch (error) {
                      console.error("🚨 Payment verification error:", error);
                      alert('❌ Payment verification failed');
                    }
                  },
                  prefill: {
                    name: userData?.username || 'Guest',
                    email: userEmail,
                  },
                  theme: { color: '#3399cc' }
                };
          
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
              } catch (error) {
                console.error('🚨 Payment error:', error);
                alert('❌ Payment initiation failed');
              }
            };}
            const handleBookNow3 = async () => {
              if (!destination || !destination.tourDetails) {
                alert("❌ Invalid destination selected. Please try again.");
                return;
              }
            
              const selectedTour = destination.tourDetails; // Ensure we get the correct tour details
              const title = selectedTour.title || destination.title;
              const price = selectedTour.price;
              const description = selectedTour.description || destination.description;
            
              console.log("✅ Final Title:", title);
              console.log("✅ Final Price:", price);
              console.log("✅ Description:", description);
            
              if (!title || !price) {
                alert("❌ Missing tour information. Please check the destination data.");
                return;
              }
            
              // Fetch the user token
              const token = localStorage.getItem('token');
              let userData = null;
              let isLoggedIn = false;
            
              // Fetch user details if logged in
              if (token) {
                try {
                  console.log("🟢 Fetching user details...");
                  const userRes = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  userData = userRes.data;
                  isLoggedIn = true;
                  console.log("✅ User Data Retrieved:", userData);
                } catch (error) {
                  console.error('🚨 Error fetching user data:', error);
                }
              }
            
              // Show query form for BOTH logged-in and guest users
              showQueryForm(selectedTour, userData, token, isLoggedIn);
            };
            
            const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
              // Create modal container
              const modalOverlay = document.createElement('div');
              modalOverlay.className = 'query-form-overlay';
              modalOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
              `;
            
              // Create modal content with responsive design
              const modalContent = document.createElement('div');
              modalContent.className = 'query-form-content';
              modalContent.style.cssText = `
                background-color: white;
                border-radius: 12px;
                padding: 30px;
                width: 92%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
              `;
            
              // Pre-fill form data if user is logged in
              const name = userData?.username || '';
              const email = userData?.email || '';
              const phone = userData?.phone || '';
            
              // Form with marketing text and responsive design
              modalContent.innerHTML = `
                <style>
                  /* Custom Styles */
                  .query-form-content {
                    scrollbar-width: thin;
                    scrollbar-color: #ddd #f5f5f5;
                  }
                  .query-form-content::-webkit-scrollbar {
                    width: 6px;
                  }
                  .query-form-content::-webkit-scrollbar-track {
                    background: #f5f5f5;
                    border-radius: 10px;
                  }
                  .query-form-content::-webkit-scrollbar-thumb {
                    background: #ddd;
                    border-radius: 10px;
                  }
                  
                  /* Animation for price */
                  @keyframes pricePulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                  }
                  .price-animation {
                    animation: pricePulse 2s ease-in-out;
                  }
                  
                  /* Focus states */
                  .form-input:focus {
                    border-color: #FF6B00 !important;
                    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1) !important;
                    outline: none !important;
                  }
                  
                  /* Hover states */
                  .submit-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 8px rgba(255, 107, 0, 0.4) !important;
                  }
                  
                  /* Responsive CSS */
                  @media (min-width: 768px) {
                    .form-grid {
                      grid-template-columns: 1fr 1fr 1fr !important;
                    }
                    .title-text {
                      font-size: 1.7rem !important;
                    }
                    .subtitle-text {
                      font-size: 1rem !important;
                    }
                    .price-summary {
                      display: grid !important;
                      grid-template-columns: 1fr 1fr !important;
                      gap: 15px !important;
                    }
                    .price-total {
                      font-size: 1.5rem !important;
                    }
                    .form-label {
                      font-size: 0.9rem !important;
                    }
                    .form-input {
                      padding: 12px !important;
                      font-size: 1rem !important;
                    }
                  }
                </style>
            
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
                  <div>
                    <h2 class="title-text" style="margin: 0 0 5px 0; color: #333; font-size: 1.5rem; font-weight: 600;">Book Your Experience</h2>
                    <p class="subtitle-text" style="margin: 0; color: #FF6B00; font-size: 0.9rem; font-weight: 500;">${destination.title}</p>
                  </div>
                  <button id="closeQueryForm" style="background: none; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: all 0.2s;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <!-- Price Summary Box - Enhanced and More Detailed -->
                <div class="price-summary-container" style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                  <div style="background: linear-gradient(135deg, #FF6B00, #FF9800); padding: 15px; color: white;">
                    <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Price Summary</h3>
                    <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Transparent pricing with no hidden fees</p>
                  </div>
                  
                  <div style="background: #fff; padding: 20px; border: 1px solid #f0f0f0; border-top: none;">
                    <div class="price-summary" style="display: block; margin-bottom: 15px;">
                      <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.9rem; color: #555;">Base Price (per adult)</span>
                          <span style="font-weight: 500; color: #333;">₹${selectedTour.price}</span>
                        </div>
                        <div id="adultPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
                          <span style="font-size: 0.85rem; color: #666;">Adults: <span id="adultCountDisplay">1</span></span>
                          <span style="font-weight: 500; color: #333;">₹<span id="adultPriceDisplay">${selectedTour.price}</span></span>
                        </div>
                        <div id="childPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
                          <span style="font-size: 0.85rem; color: #666;">Children: <span id="childCountDisplay">0</span> (50% off)</span>
                          <span style="font-weight: 500; color: #333;">₹<span id="childPriceDisplay">0</span></span>
                        </div>
                      </div>
                      
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.9rem; color: #555;">Additional</span>
                          <span style="font-weight: 500; color: #333;">₹0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
                          <span style="font-size: 0.85rem; color: #666;">Taxes & Fees</span>
                          <span style="font-weight: 500; color: #333;">Included</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                      <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
                      <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
                    </div>
                    
                    <div style="margin-top: 12px; padding: 8px 12px; background: #FFF9F5; border-radius: 6px; border-left: 3px solid #FF6B00;">
                      <p style="margin: 0; font-size: 0.8rem; color: #333;">
                        <span style="color: #FF6B00; font-weight: 600;">✓</span> Best price guarantee
                        <span style="color: #FF6B00; font-weight: 600; margin-left: 10px;">✓</span> Free cancellation up to 24 hours before
                      </p>
                    </div>
                  </div>
                </div>
                
                <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 16px;">
                  <div class="full-span" style="grid-column: span 2;">
                    <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Personal Information</h3>
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2;">
                    <label for="queryName" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Full Name*</label>
                    <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Email Address*</label>
                    <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Phone Number*</label>
                    <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2; margin-top: 10px;">
                    <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Travel Details</h3>
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Travel Date*</label>
                    <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Adults (13+ yrs)*</label>
                    <select id="queryAdults" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="5">5 Adults</option>
                      <option value="6">6 Adults</option>
                      <option value="7">7 Adults</option>
                      <option value="8">8 Adults</option>
                    </select>
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Children (5-12 yrs)</label>
                    <select id="queryChildren" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
                      <option value="0">0 Children</option>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3">3 Children</option>
                      <option value="4">4 Children</option>
                      <option value="5">5 Children</option>
                    </select>
                  </div>
                  
                  <div style="grid-column: span 1;">
                    <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Infants (0-4 yrs)</label>
                    <select id="queryInfants" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
                      <option value="0">0 Infants</option>
                      <option value="1">1 Infant</option>
                      <option value="2">2 Infants</option>
                      <option value="3">3 Infants</option>
                    </select>
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2;">
                    <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Special Requirements or Questions</label>
                    <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; resize: none;" placeholder="Dietary requirements, accessibility needs, or any questions..."></textarea>
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2; margin: 8px 0 12px;">
                    <label style="display: flex; align-items: flex-start; cursor: pointer;">
                      <input type="checkbox" id="queryTerms" required style="margin-right: 10px; margin-top: 3px; min-width: 16px; height: 16px; accent-color: #FF6B00;">
                      <span style="font-size: 0.85rem; color: #555;">I agree to receive updates via email and WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none; font-weight: 500;">Terms & Conditions</a>*</span>
                    </label>
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 10px;">
                    <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 12px 0; width: 70%; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 3px 6px rgba(255, 107, 0, 0.3); transition: all 0.3s ease;">
                      Continue to Secure Checkout
                    </button>
                    
                    <!-- Loading state message -->
                    <div id="loadingMessage" style="display: none; margin-top: 15px;">
                      <div style="display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
                          <style>
                            @keyframes rotate {
                              0% { transform: rotate(0deg); }
                              100% { transform: rotate(360deg); }
                            }
                          </style>
                          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                          <path d="M12 2a10 10 0 0 1 10 10"></path>
                        </svg>
                        <span style="margin-left: 10px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">Processing your booking...</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 16px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span style="font-size: 0.8rem; color: #555;">Secure Payment</span>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span style="font-size: 0.8rem; color: #555;">100% Safe</span>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                        </svg>
                        <span style="font-size: 0.8rem; color: #555;">24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </form>
              `;
            
              // Append modal to body
              modalOverlay.appendChild(modalContent);
              document.body.appendChild(modalOverlay);
            
              // Close modal functionality with improved animation
              document.getElementById('closeQueryForm').addEventListener('click', () => {
                modalOverlay.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.transition = 'transform 0.2s ease';
                modalOverlay.style.transition = 'opacity 0.2s ease';
                
                setTimeout(() => {
                  document.body.removeChild(modalOverlay);
                }, 200);
              });
            
              // Enhanced price calculation function with animations
              const updateTotalPrice = () => {
                const basePrice = selectedTour.price;
                const adults = parseInt(document.getElementById('queryAdults').value || 1);
                const children = parseInt(document.getElementById('queryChildren').value || 0);
                
                // Update display counts
                document.getElementById('adultCountDisplay').textContent = adults;
                document.getElementById('childCountDisplay').textContent = children;
                
                // Adults pay full price, children pay half price
                const childrenPrice = basePrice * 0.5 * children;
                const adultsPrice = basePrice * adults;
                
                // Update price displays with formatting
                document.getElementById('adultPriceDisplay').textContent = (adultsPrice).toLocaleString();
                document.getElementById('childPriceDisplay').textContent = (childrenPrice).toLocaleString();
                
                const totalPrice = adultsPrice + childrenPrice;
                
                // Apply animation by removing and re-adding the class
                const totalPriceElement = document.getElementById('totalPriceDisplay');
                totalPriceElement.classList.remove('price-animation');
                
                // Trigger reflow to restart animation
                void totalPriceElement.offsetWidth;
                
                totalPriceElement.textContent = '₹' + totalPrice.toLocaleString();
                totalPriceElement.classList.add('price-animation');
                
                // Store the calculated price to use in the booking process
                window.calculatedTotalPrice = totalPrice;
              };
            
              // Add event listeners for price updates
              document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
              document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
              
              // Initialize price calculation
              updateTotalPrice();
            
              // Set minimum date for travel date to tomorrow
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
              document.getElementById('queryTravelDate').setAttribute('min', tomorrowFormatted);
            
              // Form submission handler with improved UX feedback
              document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Show loading state
                const proceedBtn = document.getElementById('proceedBtn');
                const loadingMessage = document.getElementById('loadingMessage');
                proceedBtn.disabled = true;
                proceedBtn.style.opacity = '0.7';
                proceedBtn.style.transform = 'none';
                proceedBtn.textContent = 'Processing...';
                loadingMessage.style.display = 'block';
                
                // Get values from form
                const adults = document.getElementById('queryAdults').value;
                const children = document.getElementById('queryChildren').value;
                const infants = document.getElementById('queryInfants').value;
                
                // Make sure to get the most up-to-date calculated price
                updateTotalPrice();
                
                const formData = {
                  name: document.getElementById('queryName').value,
                  email: document.getElementById('queryEmail').value,
                  phone: document.getElementById('queryPhone').value,
                  travelDate: document.getElementById('queryTravelDate').value,
                  adults: adults,
                  children: children,
                  infants: infants,
                  totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
                  message: document.getElementById('queryMessage').value,
                  tourTitle: selectedTour.title,
                  tourPrice: selectedTour.price,
                  calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
                  termsAccepted: document.getElementById('queryTerms').checked
                };
            
                // Enhanced form validation with field-specific feedback
                let isValid = true;
                let errorFields = [];
                
                // Basic form validation
                if (!formData.name) {
                  isValid = false;
                  errorFields.push('Full Name');
                  document.getElementById('queryName').style.borderColor = '#ff4d4f';
                }
                
                if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
                  isValid = false;
                  errorFields.push('Email Address');
                  document.getElementById('queryEmail').style.borderColor = '#ff4d4f';
                }
                
                if (!formData.phone) {
                  isValid = false;
                  errorFields.push('Phone Number');
                  document.getElementById('queryPhone').style.borderColor = '#ff4d4f';
                }
                
                if (!formData.travelDate) {
                  isValid = false;
                  errorFields.push('Travel Date');
                  document.getElementById('queryTravelDate').style.borderColor = '#ff4d4f';
                }
                
                if (!formData.termsAccepted) {
                  isValid = false;
                  errorFields.push('Terms & Conditions');
                  document.getElementById('queryTerms').parentNode.style.color = '#ff4d4f';
                }
                
                if (!isValid) {
                  // Alert with specific fields that need attention
                  alert(`Please fill in all required fields: ${errorFields.join(', ')}`);
                  
                  // Reset button state
                  proceedBtn.disabled = false;
                  proceedBtn.style.opacity = '1';
                  proceedBtn.textContent = 'Continue to Secure Checkout';
                  loadingMessage.style.display = 'none';
                  return;
                }
            
                try {
                  // 1. Send to backend API
                  try {
                    await axios.post('https://backend-1-7zwm.onrender.com/api/tour-queries', formData);
                    console.log('✅ Query saved to database');
                  } catch (error) {
                    console.error('❌ Error saving query:', error);
                    // Continue with the booking process even if the query saving fails
                  }
            
                  // 2. Send to WhatsApp in the background
                  sendWhatsAppInBackground(formData);
                  
                  // Create/update userData object with form data
                  const updatedUserData = {
                    username: formData.name,
                    email: formData.email,
                    phone: formData.phone
                  };
                  
                  // Add a slightly longer delay for better UX
                  setTimeout(() => {
                    // Close the modal with animation
                    modalOverlay.style.opacity = '0';
                    modalContent.style.transform = 'scale(0.9)';
                    modalContent.style.transition = 'transform 0.3s ease';
                    modalOverlay.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                      document.body.removeChild(modalOverlay);
                      
                      // Proceed with payment - using either existing userData (if logged in) or form data
                      proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
                    }, 300);
                  }, 1800);
                  
                } catch (error) {
                  console.error('🚨 Error processing query:', error);
                  
                  // Show error message with retry option
                  loadingMessage.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; color: #ff4d4f; margin-top: 10px;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      // <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
        <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
                </div>
              `;
              
              // Reset button state
              proceedBtn.disabled = false;
              proceedBtn.style.opacity = '1';
              proceedBtn.textContent = 'Continue to Secure Checkout';
            }
          });
        
          // Function to send WhatsApp notification in the background
          const sendWhatsAppInBackground = (formData) => {
            try {
              // Format the WhatsApp message
              const message = `*New Booking Request*\n\n*Tour:* ${formData.tourTitle}\n*Date:* ${formData.travelDate}\n*Guests:* ${formData.adults} Adults, ${formData.children} Children, ${formData.infants} Infants\n*Total:* ₹${formData.calculatedPrice}\n\n*From:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\n*Message:* ${formData.message || 'None'}`;
              
              // Send to WhatsApp API
              const adminNumber = '+919876543210'; // Replace with actual admin number
              const encodedMessage = encodeURIComponent(message);
              const whatsappLink = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`;
              
              // Use fetch with no-cors mode to avoid CORS issues
              fetch(whatsappLink, { mode: 'no-cors' })
                .then(() => console.log('✅ WhatsApp notification sent'))
                .catch(error => console.error('⚠️ WhatsApp notification error:', error));
              
            } catch (error) {
              console.error('❌ Error sending WhatsApp notification:', error);
              // Fail silently - this should not interrupt the booking process
            }
          };
        };
            // Function to show the query form modal
//             const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//               // Create modal container
//               const modalOverlay = document.createElement('div');
//               modalOverlay.className = 'query-form-overlay';
//               modalOverlay.style.cssText = `
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background-color: rgba(0, 0, 0, 0.7);
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 z-index: 1000;
//               `;
            
//               // Create modal content - responsive design
//               const modalContent = document.createElement('div');
//               modalContent.className = 'query-form-content';
//               modalContent.style.cssText = `
//                 background-color: white;
//                 border-radius: 8px;
//                 padding: 25px;
//                 width: 90%;
//                 max-width: 450px;
//                 max-height: 85vh;
//                 overflow-y: auto;
//                 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//               `;
            
//               // Pre-fill form data if user is logged in
//               const name = userData?.username || '';
//               const email = userData?.email || '';
//               const phone = userData?.phone || '';
            
//               // Form with responsive design
//               modalContent.innerHTML = `
//                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//                   <h2 style="margin: 0; color: #3399cc; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//                   <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//                 </div>
                
//                 <div style="background: linear-gradient(to right, #E3F2FD, #BBDEFB); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//                   <p style="margin: 0; color: #0D47A1; font-weight: 500; font-size: 0.9rem;">
//                     <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title || destination.title}!
//                   </p>
//                 </div>
                
//                 <!-- Price Display Box -->
//                 <div style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
//                   <p style="margin: 0; font-size: 0.9rem; color: #333;">
//                     <span style="font-weight: 600;">Total Price:</span> 
//                     <span id="totalPriceDisplay" style="color: #3399cc; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
//                     <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//                       Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
//                     </span>
//                   </p>
//                 </div>
                
//                 <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
//                   <div style="grid-column: span 2;">
//                     <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//                     <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                   </div>
                  
//                   <div style="grid-column: span 2;">
//                     <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//                     <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                   </div>
                  
//                   <div style="grid-column: span 2;">
//                     <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//                     <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                   </div>
                  
//                   <div>
//                     <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//                     <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                   </div>
                  
//                   <div>
//                     <label for="queryAdults" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//                     <select id="queryAdults" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                       <option value="7">7</option>
//                       <option value="8">8</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label for="queryChildren" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//                     <select id="queryChildren" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label for="queryInfants" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//                     <select id="queryInfants" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                     </select>
//                   </div>
                  
//                   <div style="grid-column: span 2;">
//                     <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//                     <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//                   </div>
                  
//                   <div style="grid-column: span 2; margin: 5px 0 10px;">
//                     <label style="display: flex; align-items: flex-start; cursor: pointer;">
//                       <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//                       <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #3399cc; text-decoration: none;">Terms & Conditions</a>*</span>
//                     </label>
//                   </div>
                  
//                   <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
//                     <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #3399cc, #64B5F6); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(51, 153, 204, 0.3); transition: all 0.3s;">
//                       Send Query & Continue to Booking
//                     </button>
//                     <!-- Loading state message -->
//                     <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #3399cc; font-weight: 500;">
//                       Taking you to checkout page...
//                     </p>
//                   </div>
                  
//                   <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
//                     <p style="font-size: 0.75rem; color: #888; margin: 0;">
//                       <span style="color: #3399cc; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//                     </p>
//                   </div>
//                 </form>
//               `;
            
//               // Append modal to body
//               modalOverlay.appendChild(modalContent);
//               document.body.appendChild(modalOverlay);
            
//               // Close modal functionality
//               document.getElementById('closeQueryForm').addEventListener('click', () => {
//                 document.body.removeChild(modalOverlay);
//               });
            
//               // Price calculation function
//               const updateTotalPrice = () => {
//                 // const basePrice = selectedTour.price;
//                 const basePrice = parseFloat(selectedTour.price.replace(/[^\d.]/g, '')) || 0;
//                 // console.log("Price Value:", price);

//                 console.log("Price Value:", selectedTour.price);
// console.log("baseprice",basePrice)



//                 const adults = parseInt(document.getElementById('queryAdults').value || 1);
//                 const children = parseInt(document.getElementById('queryChildren').value || 0);
                
//                 // Adults pay full price, children pay half price
//                 const childrenPrice = basePrice * 0.5 * children;
//                 const adultsPrice = basePrice * adults;
                
//                 const totalPrice = adultsPrice + childrenPrice;
                
//                 document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
                
//                 // Store the calculated price to use in the booking process
//                 window.calculatedTotalPrice = totalPrice;
                
//                 console.log("Price Updated:", totalPrice);
//               };
            
//               // Add event listeners AFTER the modal is added to the DOM
//               document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//               document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
              
//               // Initialize price calculation
//               updateTotalPrice();
            
//               // Form submission handler
//               document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//                 e.preventDefault();
                
//                 // Show loading message
//                 const proceedBtn = document.getElementById('proceedBtn');
//                 const loadingMessage = document.getElementById('loadingMessage');
//                 proceedBtn.disabled = true;
//                 proceedBtn.style.opacity = '0.7';
//                 proceedBtn.textContent = 'Processing...';
//                 loadingMessage.style.display = 'block';
                
//                 // Get values from form
//                 const adults = document.getElementById('queryAdults').value;
//                 const children = document.getElementById('queryChildren').value;
//                 const infants = document.getElementById('queryInfants').value;
                
//                 // Make sure to get the most up-to-date calculated price
//                 updateTotalPrice();
                
//                 const formData = {
//                   name: document.getElementById('queryName').value,
//                   email: document.getElementById('queryEmail').value,
//                   phone: document.getElementById('queryPhone').value,
//                   travelDate: document.getElementById('queryTravelDate').value,
//                   adults: adults,
//                   children: children,
//                   infants: infants,
//                   totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//                   message: document.getElementById('queryMessage').value,
//                   tourTitle: selectedTour.title || destination.title,
//                   tourPrice: selectedTour.price,
//                   calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//                   termsAccepted: document.getElementById('queryTerms').checked
//                 };
            
//                 // Validate form
//                 if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//                   alert('Please fill in all required fields');
//                   // Reset button state
//                   proceedBtn.disabled = false;
//                   proceedBtn.style.opacity = '1';
//                   proceedBtn.textContent = 'Send Query & Continue to Booking';
//                   loadingMessage.style.display = 'none';
//                   return;
//                 }
            
//                 try {
                 
              
//                   // 1. Send to backend API
//                   try {
//                     await axios.post('http://localhost:5000/api/tour-queries', formData);
//                     console.log('✅ Query saved to database');
//                   } catch (error) {
//                     console.error('❌ Error saving query:', error);
//                   }
            
//                   // 2. Send to WhatsApp in the background
//                   sendWhatsAppInBackground(formData);
                  
//                   // Create/update userData object with form data
//                   const updatedUserData = {
//                     username: formData.name,
//                     email: formData.email,
//                     phone: formData.phone
//                   };
                  
//                   // Short delay to show the "taking you to checkout" message
//                   setTimeout(() => {
//                     // Close the modal
//                     document.body.removeChild(modalOverlay);
                    
//                     // Proceed with payment - using either existing userData (if logged in) or form data
//                     // Pass the calculated total price to the payment function
//                     proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//                   }, 1500);
                  
//                 } catch (error) {
//                   console.error('🚨 Error processing query:', error);
//                   alert('Failed to submit query. Please try again.');
                  
//                   // Reset button state
//                   proceedBtn.disabled = false;
//                   proceedBtn.style.opacity = '1';
//                   proceedBtn.textContent = 'Send Query & Continue to Booking';
//                   loadingMessage.style.display = 'none';
//                 }
//               });
//             };
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content with responsive design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 650px; /* Increased for desktop */
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and responsive design
//   modalContent.innerHTML = `
//     <style>
//       /* Responsive CSS */
//       @media (min-width: 768px) {
//         .form-grid {
//           grid-template-columns: 1fr 1fr 1fr !important;
//         }
//         .modal-header {
//           margin-bottom: 15px !important;
//         }
//         .title-text {
//           font-size: 1.6rem !important;
//         }
//         .promo-box {
//           padding: 15px !important;
//           margin-bottom: 20px !important;
//         }
//         .promo-text {
//           font-size: 1rem !important;
//         }
//         .price-box {
//           margin-bottom: 20px !important;
//           padding: 15px !important;
//         }
//         .price-amount {
//           font-size: 1.4rem !important;
//         }
//         .price-details {
//           font-size: 0.85rem !important;
//         }
//         .form-input {
//           padding: 10px !important;
//           font-size: 1rem !important;
//         }
//         .form-label {
//           font-size: 0.9rem !important;
//           margin-bottom: 5px !important;
//         }
//         .submit-btn {
//           width: 60% !important;
//           padding: 12px 0 !important;
//         }
//         .full-span {
//           grid-column: span 3 !important;
//         }
//         .half-span {
//           grid-column: span 1 !important;
//         }
//       }
//     </style>

//     <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 class="title-text" style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div class="promo-box" style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p class="promo-text" style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${destination.title}!
//       </p>
//     </div>
    
//     <!-- Price Display Box - Moved to the top -->
//     <div class="price-box" style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
//       <p style="margin: 0; font-size: 0.9rem; color: #333;">
//         <span style="font-weight: 600;">Total Price:</span> 
//         <span id="totalPriceDisplay" class="price-amount" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
//         <span class="price-details" style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//           Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
//         </span>
//       </p>
//     </div>
    
//     <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 12px;">
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryName" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="half-span">
//         <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="half-span">
//         <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//         <select id="queryAdults" required class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//         </select>
//       </div>
      
//       <div class="half-span">
//         <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//         <select id="queryChildren" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
      
//       <div class="half-span">
//         <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//         <!-- Loading state message -->
//         <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
//           Taking you to checkout page...
//         </p>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Price calculation function
//   const updateTotalPrice = () => {
//     const basePrice = selectedTour.price;
//     const adults = parseInt(document.getElementById('queryAdults').value || 1);
//     const children = parseInt(document.getElementById('queryChildren').value || 0);
    
//     // Adults pay full price, children pay half price
//     const childrenPrice = basePrice * 0.5 * children;
//     const adultsPrice = basePrice * adults;
    
//     const totalPrice = adultsPrice + childrenPrice;
    
//     document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
    
//     // Store the calculated price to use in the booking process
//     window.calculatedTotalPrice = totalPrice;
    
//     console.log("Price Updated:", totalPrice);
//   };

//   // Important: Add event listeners AFTER the modal is added to the DOM
//   document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//   document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
//   // Initialize price calculation
//   updateTotalPrice();

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading message
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.style.opacity = '0.7';
//     proceedBtn.textContent = 'Processing...';
//     loadingMessage.style.display = 'block';
    
//     // Get values from form
//     const adults = document.getElementById('queryAdults').value;
//     const children = document.getElementById('queryChildren').value;
//     const infants = document.getElementById('queryInfants').value;
    
//     // Make sure to get the most up-to-date calculated price
//     updateTotalPrice();
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: adults,
//       children: children,
//       infants: infants,
//       totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Short delay to show the "taking you to checkout" message
//       setTimeout(() => {
//         // Close the modal
//         document.body.removeChild(modalOverlay);
        
//         // Proceed with payment - using either existing userData (if logged in) or form data
//         // Pass the calculated total price to the payment function
//         proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//       }, 1500);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
      
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//     }
//   });
// };
            // Function to send WhatsApp message in the background
            const sendWhatsAppInBackground = (formData) => {
              // Format message for WhatsApp
              const message = `
            *New Tour Query*
            ------------------
            *Tour:* ${formData.tourTitle}
            *Base Price:* ₹${formData.tourPrice}
            *Total Price:* ₹${formData.calculatedPrice}
            
            *Customer Details*
            ------------------
            *Name:* ${formData.name}
            *Email:* ${formData.email}
            *Phone:* ${formData.phone}
            *Travel Date:* ${formData.travelDate}
            
            *Booking Details*
            ------------------
            *Adults:* ${formData.adults}
            *Children (5-12):* ${formData.children}
            *Infants (0-4):* ${formData.infants}
            *Total Travelers:* ${formData.totalTravelers}
            
            *Message:* ${formData.message || 'N/A'}
            ------------------
            Sent on: ${new Date().toLocaleString()}
              `.trim();
            
              // Use your backend API to send WhatsApp message
              try {
                // Option 1: Send via your own backend API
                axios.post('http://localhost:5000/api/send-whatsapp', {
                  phone: "9541515012",
                  message: message
                }).then(() => {
                  console.log('✅ WhatsApp notification sent successfully');
                }).catch(error => {
                  console.error('❌ Error sending WhatsApp notification:', error);
                  // Fallback option - try alternate WhatsApp sending method
                  sendViaWhatsAppAPI(message);
                });
              } catch (error) {
                console.error('❌ Error sending WhatsApp notification:', error);
              }
            };
            
            // Fallback method to send WhatsApp message via third-party service if direct API fails
            const sendViaWhatsAppAPI = (message) => {
              // You could use a third-party service API here as a backup
              console.log('Using fallback WhatsApp service');
              
              // Example using a hypothetical third-party API - replace with your actual implementation
              try {
                fetch('https://api.whatsapp-service.com/send', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    apiKey: 'your-api-key',
                    phone: '9541515012',
                    message: message
                  })
                });
              } catch (error) {
                console.error('❌ Fallback WhatsApp service also failed:', error);
              }
            };
            
            // Function to proceed with payment
            const proceedWithPayment = async (selectedTour, userData, token, calculatedPrice) => {
              const userEmail = userData?.email?.trim();
              
              if (!userEmail) {
                alert("❌ Email is required for booking.");
                return;
              }
            
              console.log("✅ Final User Email:", userEmail);
              console.log("✅ Calculated Price:", calculatedPrice);
            
              const packageDetails = {
                id: `tour-${Date.now()}`,
                name: selectedTour.title || destination.title,
                description: `Tour package for ${selectedTour.title || destination.title}`,
              };
            
              const loadRazorpay = () => {
                return new Promise((resolve) => {
                  const script = document.createElement('script');
                  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                  script.onload = () => resolve(true);
                  script.onerror = () => {
                    console.error("❌ Razorpay SDK failed to load");
                    resolve(false);
                  };
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
            
                  // Use the calculated price instead of the base tour price
                  const finalAmount = calculatedPrice || selectedTour.price;
            
                  const payload = {
                    amount: finalAmount,
                    packageDetails,
                    email: userEmail,
                    name: userData?.username || 'Guest',
                    phone: userData?.phone || '',
                  };
            
                  console.log("Request Payload:", payload);
            
                  console.log("🟢 Sending Create Order API Call...");
                  const orderResponse = await fetch('https://backend-1-7zwm.onrender.com/api/create-order', {
                    method: 'POST',
                    headers: { 
                      'Content-Type': 'application/json',
                      'Authorization': token ? `Bearer ${token}` : ''
                    },
                    body: JSON.stringify(payload),
                  });
            
                  if (!orderResponse.ok) {
                    const errorData = await orderResponse.json();
                    console.error("❌ Create Order API failed:", errorData);
                    alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
                    return;
                  }
            
                  const { order } = await orderResponse.json();
            
                  if (!order || !order.id) {
                    console.error("❌ Invalid order response:", order);
                    alert("Order creation failed. Please try again.");
                    return;
                  }
            
                  console.log("✅ Order Created Successfully:", order);
            
                  const options = {
                    key: "rzp_live_VQS2zWKwCIE5ON",
                    amount: finalAmount * 100, // Use the calculated price
                    currency: 'INR',
                    name: "Kashmir Travels",
                    description: packageDetails.description,
                    order_id: order.id,
                    handler: async function (response) {
                      try {
                        console.log("🟢 Payment Successful! Sending verification request...");
                        const verifyResponse = await fetch('https://backend-1-7zwm.onrender.com/api/verify-payment', {
                          method: 'POST',
                          headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': token ? `Bearer ${token}` : ''
                          },
                          body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            customerDetails: { 
                              name: userData?.username || 'Guest', 
                              email: userEmail,
                              phone: userData?.phone || ''
                            }
                          }),
                        });
            
                        const data = await verifyResponse.json();
                        if (data.success) {
                          // Show success modal instead of alert
                          showSuccessModal(selectedTour, calculatedPrice, userData);
                        } else {
                          alert('❌ Payment verification failed');
                        }
                      } catch (error) {
                        console.error("🚨 Payment verification error:", error);
                        alert('❌ Payment verification failed');
                      }
                    },
                    prefill: {
                      name: userData?.username || 'Guest',
                      email: userEmail,
                      contact: userData?.phone || ''
                    },
                    theme: { color: '#3399cc' }
                  };
            
                  const paymentObject = new window.Razorpay(options);
                  paymentObject.open();
                } catch (error) {
                  console.error('🚨 Payment error:', error);
                  alert('❌ Payment initiation failed');
                }
              };
            
              initiatePayment();
            };
            
            // Function to show success modal
            const showSuccessModal = (selectedTour, totalPrice, userData) => {
              // Create modal container
              const modalOverlay = document.createElement('div');
              modalOverlay.className = 'success-modal-overlay';
              modalOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
              `;
            
              // Create modal content
              const modalContent = document.createElement('div');
              modalContent.className = 'success-modal-content';
              modalContent.style.cssText = `
                background-color: white;
                border-radius: 12px;
                padding: 30px;
                width: 90%;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                animation: scaleIn 0.3s ease-out;
              `;
            
              // Add some CSS animations
              const style = document.createElement('style');
              style.textContent = `
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes scaleIn {
                  from { transform: scale(0.9); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                  40% { transform: translateY(-20px); }
                  60% { transform: translateY(-10px); }
                }
                .success-checkmark {
                  animation: bounce 1s ease;
                }
              `;
              document.head.appendChild(style);
            
              // Format the success message
              modalContent.innerHTML = `
                <div class="success-checkmark" style="font-size: 4rem; color: #4CAF50; margin-bottom: 10px;">✓</div>
                <h2 style="margin: 0 0 15px; color: #333; font-size: 1.5rem;">Booking Successful!</h2>
                
                <div style="background-color: #F5F5F5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 10px; color: #3399cc; font-size: 1.2rem;">${selectedTour.title || destination.title}</h3>
                  <p style="margin: 0; font-size: 0.9rem; color: #666;">
                    <strong>Total Amount:</strong> ₹${totalPrice.toLocaleString()}
                  </p>
                </div>
                
                <p style="margin: 0 0 15px; color: #555; font-size: 0.95rem;">
                  A confirmation email has been sent to <strong>${userData?.email || 'your email'}</strong>.<br>
                  You will also receive a WhatsApp update shortly.
                </p>
                
                <div style="background: linear-gradient(to right, #E3F2FD, #BBDEFB); padding: 12px; border-radius: 6px; margin-bottom: 20px; text-align: left;">
                  <p style="margin: 0; color: #0D47A1; font-size: 0.9rem;">
                    <strong>What's Next?</strong><br>
                    Our team will contact you within 24 hours to confirm your booking details and answer any questions.
                  </p>
                </div>
                
                <button id="closeSuccessModal" style="background: linear-gradient(to right, #3399cc, #64B5F6); color: white; border: none; padding: 10px 25px; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(51, 153, 204, 0.3); transition: all 0.3s;">
                  Awesome!
                </button>
                
                <p style="margin: 15px 0 0; font-size: 0.8rem; color: #888;">
                  Questions? Contact our support team at <a href="tel:+919541515012" style="color: #3399cc; text-decoration: none;">+91 9541515012</a>
                </p>
              `;
            
              // Append modal to body
              modalOverlay.appendChild(modalContent);
              document.body.appendChild(modalOverlay);
            
              // Close modal functionality
              document.getElementById('closeSuccessModal').addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
                // Optional: Redirect to homepage or booking history page
                // window.location.href = '/my-bookings';
              });
            
              // Auto-close after 10 seconds
              setTimeout(() => {
                if (document.body.contains(modalOverlay)) {
                  document.body.removeChild(modalOverlay);
                }
              }, 10000);
            };
            useEffect(() => {
              console.log('Tab changed to:', activeTab);
            }, [activeTab]);
    return (
      <div  id="destinations" className=" z-50 fixed inset-0 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
  
        {/* Modal Container */}
        <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-2/5 relative h-52 md:h-auto">
              <img
                // src={destination.image || "/api/placeholder/400/320"}
                src={`https://backend-1-7zwm.onrender.com${destination.image}`}
                alt={destination.title || "Destination"}
                className="h-full w-full object-cover md:rounded-l-lg"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
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
                <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="font-semibold">{destination.rating?.toFixed(1) || '4.5'}</span>
                  <span className="text-xs text-gray-500">({destination.reviews || '0'})</span>
                </div>
              </div>
  
              {/* Location and Price */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-1 h-4 w-4 text-orange-500" />
                  <span>{destination.tourDetails?.location || 'Location'}</span>
                </div>
                <div className="text-lg font-bold text-orange-500">
                  {/* {hasValidPriceData() ? formatPrice(destination.tourDetails.price) : '₹0'} */}
                  {destination.tourDetails.price}
                  <span className="text-xs text-gray-500">/person</span>
                  {calculateDiscount() > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                      {calculateDiscount()}% OFF
                    </span>
                  )}
                </div>
              </div>
  
              {/* Tour Details Row */}
              <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  {destination.tourDetails?.duration || 'Duration'}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  Max {destination.tourDetails?.groupSize || 'Group Size'}
                </div>
                <div className="flex items-center">
                  <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
                  {destination.tourDetails?.language || 'English'}
                </div>
              </div>
  
              {/* Tabs - Horizontal Pills */}
              <div className="mt-3">
                <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
                  <button
                    // onClick={() => setActiveTab('overview')}
                    onClick={() => handleTabClick('overview')}
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
                    // onClick={() => handleTabClick('itinerary')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      activeTab === 'itinerary'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Itinerary
                  </button>
                  <button
                    // onClick={() => handleTabClick('inclusions')}
                    onClick={() => setActiveTab('inclusions')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      activeTab === 'inclusions'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    What's Included
                  </button>
                </div>
  
                {/* Tab Content - Scrollable container */}
                <div className="mt-3 overflow-y-auto max-h-56">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {destination.description || 'No description available.'}
                      </p>
                      
                      <div className="mt-2">
                        <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
                        <ul className="mt-1 space-y-1">
                          {destination.details && destination.details.length > 0 ? (
                            destination.details.map((detail, index) => (
                              <li key={index} className="flex items-start text-xs text-gray-600">
                                <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                                  <Check className="h-2 w-2" />
                                </span>
                                {detail}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs text-gray-600">No highlights available.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
  
                  {/* Itinerary Tab */}
                  {activeTab === 'itinerary' && (
                    <div className="space-y-3">
                      {destination.itinerary && destination.itinerary.length > 0 ? (
                        destination.itinerary.map((day, index) => (
                          <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                            <h3 className="text-sm font-semibold text-gray-800">Day {day.day}: {day.title}</h3>
                            {day.activities && day.activities.length > 0 ? (
                              <ul className="mt-1 space-y-1">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx} className="flex items-start text-xs text-gray-600">
                                    <Check className="mr-1.5 h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-1 text-xs text-gray-600">No activities specified for this day.</p>
                            )}
                            {day.meals && day.meals.length > 0 && (
                              <p className="mt-1 text-xs text-gray-600">
                                <span className="font-medium">Meals:</span> {day.meals.join(', ')}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-600">Detailed itinerary will be provided upon booking.</p>
                      )}
                    </div>
                  )}
  
                  {/* Inclusions Tab */}
                  {activeTab === 'inclusions' && (
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Included</h3>
                        <ul className="mt-1 space-y-1">
                          {destination.tourDetails?.inclusions && destination.tourDetails.inclusions.length > 0 ? (
                            destination.tourDetails.inclusions.map((item, index) => (
                              <li key={index} className="flex items-start text-xs text-gray-600">
                                <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs text-gray-600">No inclusions specified.</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
                        <ul className="mt-1 space-y-1">
                          {destination.tourDetails?.notIncluded && destination.tourDetails.notIncluded.length > 0 ? (
                            destination.tourDetails.notIncluded.map((item, index) => (
                              <li key={index} className="flex items-start text-xs text-gray-600">
                                <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs text-gray-600">No exclusions specified.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="mt-4 flex gap-x-4">
                {/* Book Now Button */}
                <button 
                  onClick={handleBookNow3} 
                  className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
                >
                  Book Now
                </button>
  
                {/* Get Quote Button (Outlined) */}
                <button 
                  onClick={handleGetQuote} 
                  className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

//   if (isAllDestinationsPage) {
//     return (
//       <div className="container mx-auto p-4 w-full max-w-7xl">
//         {/* <div className="flex items-center mb-6 gap-4">
//           <button 
//             onClick={handleBackToHome}
//             className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded-full"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">
//             All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations
//           </h1>
//         </div> */}
//         <div className="flex justify-between items-center mb-6">
//   <h1 className="text-2xl font-bold text-gray-800">
//     All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations
//   </h1>

//   {/* <button
//     onClick={handleBackToHome}
//     className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg shadow-md
//                hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg"
//   >
//     <ChevronLeft className="w-5 h-5" />
//     <span>Show less</span>
//   </button> */}
//     <button
//           className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg shadow-md
//                      hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg"
//           onClick={handleBackToHome}
//         >
//           <span className="truncate max-w-[100px] sm:max-w-none">Show less</span>
//           <span className="arrow-icon text-lg sm:text-xl">→</span>
//         </button>
// </div>


//         {/* Search and Filter */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative w-full md:w-2/3">
//               <input
//                 type="text"
//                 placeholder="Search destinations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//             <button 
//               onClick={toggleFilter}
//               className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters {filterOpen ? '▲' : '▼'}
//             </button>
//           </div>
  
//           {/* Filters Panel */}
//           {filterOpen && (
//             <div
//               className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Price Range */}
//                 <div>
//                   <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
//                   <div className="flex items-center gap-4">
//                     <input 
//                       type="range" 
//                       min="0" 
//                       max="20000" 
//                       value={priceRange[0]} 
//                       onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
//                       className="w-full accent-orange-500"
//                     />
//                     <span>${priceRange[0]}</span>
//                   </div>
//                   <div className="flex items-center gap-4 mt-2">
//                     <input 
//                       type="range" 
//                       min="0" 
//                       max="20000" 
//                       value={priceRange[1]} 
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full accent-orange-500"
//                     />
//                     <span>${priceRange[1]}</span>
//                   </div>
//                 </div>
                
//                 {/* Categories */}
//                 {allCategories.length > 0 && (
//                   <div>
//                     <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {allCategories.map((category) => (
//                         <label key={category} className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             checked={selectedCategories.includes(category)}
//                             onChange={() => handleCategoryToggle(category)}
//                             className="rounded text-orange-500 focus:ring-orange-500"
//                           />
//                           <span className="text-gray-700">{category}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Render Destinations */}
//         {loading && <LoadingState />}
//         {error && <ErrorState />}
//         {!loading && !error && filteredDestinations.length === 0 && <EmptyState />}
        
//         {!loading && !error && filteredDestinations.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredDestinations.map((destination, index) => (
//               <div
//                 key={destination.id || `dest-${index}`}
//               >
//                 <DestinationCard 
//                   destination={destination}
//                 />
//               </div> 
//             ))}
//           </div>
//         )}
        
//         {/* Modal */}
//         <DestinationModal 
//           isOpen={isModalOpen} 
//           destination={selectedDestination}
//           onClose={handleCloseModal}
//         />
//       </div>
//     );
//   }
  // if (isAllDestinationsPage) {
  //   return (
  //     <div className="container mx-auto p-4 w-full max-w-7xl">
  //       <div className="flex items-center mb-6 gap-4">
  //         <motion.button 
  //           onClick={handleBackToHome}
  //           whileHover={{ scale: 1.05 }}
  //           whileTap={{ scale: 0.95 }}
  //           className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded-full"
  //         >
  //           <ChevronLeft className="w-5 h-5" />
  //         </motion.button>
  //         <h1 className="text-2xl font-bold text-gray-800">
  //           All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations
  //         </h1>
  //       </div>
        
  //       {/* Search and Filter */}
  //       <div className="mb-8">
  //         <div className="flex flex-col md:flex-row gap-4 items-center">
  //           <div className="relative w-full md:w-2/3">
  //             <input
  //               type="text"
  //               placeholder="Search destinations..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
  //             />
  //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //               <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  //               </svg>
  //             </div>
  //           </div>
  //           <button 
  //             onClick={toggleFilter}
  //             className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
  //           >
  //             <Filter className="w-5 h-5" />
  //             Filters {filterOpen ? '▲' : '▼'}
  //           </button>
  //         </div>

  //         {/* Filters Panel */}
  //         <AnimatePresence>
  //           {filterOpen && (
  //             <motion.div
  //               initial={{ height: 0, opacity: 0 }}
  //               animate={{ height: 'auto', opacity: 1 }}
  //               exit={{ height: 0, opacity: 0 }}
  //               className="overflow-hidden bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md"
  //             >
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 {/* Price Range */}
  //                 <div>
  //                   <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
  //                   <div className="flex items-center gap-4">
  //                     <input 
  //                       type="range" 
  //                       min="0" 
  //                       max="20000" 
  //                       value={priceRange[0]} 
  //                       onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
  //                       className="w-full accent-orange-500"
  //                     />
  //                     <span>${priceRange[0]}</span>
  //                   </div>
  //                   <div className="flex items-center gap-4 mt-2">
  //                     <input 
  //                       type="range" 
  //                       min="0" 
  //                       max="20000" 
  //                       value={priceRange[1]} 
  //                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
  //                       className="w-full accent-orange-500"
  //                     />
  //                     <span>${priceRange[1]}</span>
  //                   </div>
  //                 </div>
                  
  //                 {/* Categories */}
  //                 {allCategories.length > 0 && (
  //                   <div>
  //                     <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
  //                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  //                       {allCategories.map((category) => (
  //                         <label key={category} className="flex items-center space-x-2">
  //                           <input
  //                             type="checkbox"
  //                             checked={selectedCategories.includes(category)}
  //                             onChange={() => handleCategoryToggle(category)}
  //                             className="rounded text-orange-500 focus:ring-orange-500"
  //                           />
  //                           <span className="text-gray-700">{category}</span>
  //                         </label>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </motion.div>
  //           )}
  //         </AnimatePresence>
  //       </div>
        
  //       {/* Render Destinations */}
  //       {loading && <LoadingState />}
  //       {error && <ErrorState />}
  //       {!loading && !error && filteredDestinations.length === 0 && <EmptyState />}
        
  //       {!loading && !error && filteredDestinations.length > 0 && (
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {filteredDestinations.map((destination, index) => (
  //              <motion.div
  //               key={destination.id || `dest-${index}`}
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: index * 0.1 }}
  //             >
  //               <DestinationCard 
  //                 destination={destination}
  //               />
  //              </motion.div> 
  //           ))}
  //         </div>
  //       )}
        
  //       {/* Modal */}
  //       <DestinationModal 
  //         isOpen={isModalOpen} 
  //         destination={selectedDestination}
  //         onClose={handleCloseModal}
  //       />
  //     </div>
  //   );
  // }
// Calculate visible destinations for slider
const calculateVisibleDestinations = () => {
  if (!filteredDestinations || filteredDestinations.length === 0) {
    return [];
  }
  
  if (isMobile) {
    // On mobile, just show the current destination
    return [filteredDestinations[currentIndex]];
  } else {
    // On desktop, show three destinations without duplicates
    const totalDestinations = filteredDestinations.length;
    
    // If we have 3 or more destinations, get 3 unique ones
    if (totalDestinations >= 3) {
      return [
        filteredDestinations[currentIndex],
        filteredDestinations[(currentIndex + 1) % totalDestinations],
        filteredDestinations[(currentIndex + 2) % totalDestinations]
      ];
    } 
    // If we have exactly 2 destinations, show both
    else if (totalDestinations === 2) {
      return [
        filteredDestinations[0],
        filteredDestinations[1]
      ];
    }
    // If we have only 1 destination, just show it
    else if (totalDestinations === 1) {
      return [filteredDestinations[0]];
    }
    
    return [];
  }
};

// Replace your visibleDestinations calculation with this function call
const visibleDestinations = calculateVisibleDestinations();
  // useEffect(() => {
  //   const checkIfMobile = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
    
  //   checkIfMobile();
  //   window.addEventListener('resize', checkIfMobile);
    
  //   return () => window.removeEventListener('resize', checkIfMobile);
  // }, []);
  
  // // Control autoplay based on isAutoplayPaused state
  // useEffect(() => {
  //   if (!isAutoplayPaused) {
  //     startAutoplay();
  //   }
    
  //   // Clean up effect
  //   return () => {
  //     stopAutoplay();
  //   };
  // }, [isAutoplayPaused, filteredDestinations.length, isMobile]);
  
  // // Clean up on unmount
  // useEffect(() => {
  //   return () => {
  //     isComponentMounted.current = false;
  //     stopAutoplay();
  //   };
  // }, []);
 
// console.log("About to render with:", {
//   filteredDestinations: filteredDestinations?.length || 0,
//   visibleDestinations: visibleDestinations?.length || 0,
//   currentIndex,
//   isMobile
// });
// useEffect(() => {
//   console.log("About to render with:", {
//     filteredDestinations: filteredDestinations.length, 
//     visibleDestinations: visibleDestinations.length,
//     currentIndex, 
//     isMobile
//   });
// }, [filteredDestinations, visibleDestinations, currentIndex, isMobile]);
// return (
//   <div id="destinations" className="container mx-auto p-4 w-full max-w-7xl">
//     {/* Header Section */}
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
     



//     </div>
    
//     {/* Tabs */}
//     <div className="flex border-b border-orange-200 mb-6">
//       <button
//         className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
//         onClick={() => handleTabChange('top')}
//       >
//         Top Destinations
//       </button>
//       <button
//         className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
//         onClick={() => handleTabChange('food')}
//       >
//         Food Destinations
//       </button>
//       <button
//         className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
//         onClick={() => handleTabChange('ancient')}
//       >
//         Ancient Destinations
//       </button>
//     </div>
    
//     {/* Search Bar */}
//     <div className="mb-8">
//       <div className="relative w-full md:w-2/3">
//         <input
//           type="text"
//           placeholder="Search destinations..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
//         />
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </div>
//     </div>

//     {/* Loading & Error States */}
//     {loading && <LoadingState />}
//     {error && <ErrorState />}
//     {!loading && !error && filteredDestinations.length === 0 && <EmptyState />}

//     {/* Destinations Slider */}
//     {!loading && !error && filteredDestinations.length > 0 && (
//       <div className="mb-8">
//         <div className="relative"> 
//           {/* Navigation Controls */}
//           <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between z-10 px-2">
//             <button
//               onClick={handlePreviousDestination}
//               className="bg-white/80 p-3 rounded-full shadow-lg text-gray-800 hover:bg-white backdrop-blur-sm"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
            
//             <button
//               onClick={handleNextDestination}
//               className="bg-white/80 p-3 rounded-full shadow-lg text-gray-800 hover:bg-white backdrop-blur-sm"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>  
          
//           {/* Autoplay Toggle */}
//           <button
//             onClick={toggleAutoplay}
//             className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 p-2 rounded-full shadow-lg text-gray-800 hover:bg-white z-10 backdrop-blur-sm"
//           >
//             {isAutoplayPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
//           </button>

//           {/* Desktop View - Multiple Cards */}
//           {!isMobile && (
//             <div className="hidden md:grid grid-cols-3 gap-6">
//               {visibleDestinations.map((destination, index) => (
//                 <div key={`desktop-${destination.id || index}`}>
//                   <DestinationCard 
//                     destination={destination}
//                     onClick={() => {
//                       setSelectedDestination(destination);
//                       setIsModalOpen(true);
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           )} 
          
//           {/* Mobile View - Single Card */}
//           {isMobile && (
//             <div className="relative h-[36rem] md:hidden">
//               <div className="absolute inset-0">
//                 <DestinationCard 
//                   destination={filteredDestinations[currentIndex]} 
//                   isSlider={true}
//                   onClick={() => {
//                     setSelectedDestination(filteredDestinations[currentIndex]);
//                     setIsModalOpen(true);
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Pagination Dots */}
//         <div className="flex justify-center mt-6 space-x-2">
//           {filteredDestinations.map((_, index) => (
//             <button
//               key={`pagination-${index}`}
//               onClick={() => setCurrentIndex(index)}
//               className={`h-2.5 rounded-full transition-all ${
//                 currentIndex === index 
//                   ? 'w-8 bg-orange-500' 
//                   : 'w-2.5 bg-orange-200 hover:bg-orange-300'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     )}
    
//     {/* Destination Modal */}
//      {isModalOpen && (
//       <DestinationModal 
//         isOpen={isModalOpen} 
//         destination={selectedDestination}
//         onClose={handleCloseModal}
//         activeTab={activeModalTab}
//         setActiveTab={setActiveModalTab}
//       />

//     )} 
    
//   </div>
// );

return (
  <div id="destinations" className="container mx-auto p-4 w-full max-w-7xl">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {isAllDestinationsPage ? 'All Destinations' : 'Popular Destinations'}
      </h2>
      {filteredDestinations.length > (isMobile ? 1 : 3) && (
        // <button
        //   onClick={() => setIsAllDestinationsPage(!isAllDestinationsPage)}
        //   className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-300"
        // >
        //   {isAllDestinationsPage ? 'Back to Featured' : 'View All'}
        //   {/* <ArrowRight className="ml-2 w-4 h-4" /> */}
        // </button>
        <button
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
                   hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
        // onClick={toggleShowAllTours}
        onClick={() => setIsAllDestinationsPage(!isAllDestinationsPage)}
      >
        {isAllDestinationsPage ? "Show Less" : "View All"} <span className="arrow-icon text-lg">→</span>
      </button>
      )}
    </div>
    
    {/* Tabs */}
    <div className="flex border-b border-orange-200 mb-6">
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
        onClick={() => handleTabChange('top')}
      >
        Top Destinations
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
        onClick={() => handleTabChange('food')}
      >
        Food Destinations
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
        onClick={() => handleTabChange('ancient')}
      >
        Ancient Destinations
      </button>
    </div>
    
    {/* Search Bar */}
    <div className="mb-8">
      <div className="relative w-full md:w-2/3">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Loading & Error States */}
    {loading && <LoadingState />}
    {error && <ErrorState />}
    {!loading && !error && filteredDestinations.length === 0 && <EmptyState />}

    {/* Destinations View */}
    {!loading && !error && filteredDestinations.length > 0 && (
      <div className="mb-8">
       
          {isAllDestinationsPage ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard 
                  key={destination.id || index}
                  destination={destination}
                  onClick={() => {
                    setSelectedDestination(destination);
                    setIsModalOpen(true);
                  }}
                  className="w-full" // Ensure full width within grid cell
                />
              ))}
            </div>
        ) : (
          // Carousel view
          <div className="relative"> 
            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between z-10 px-2">
              <button
                onClick={handlePreviousDestination}
                className="bg-white/80 p-3 rounded-full shadow-lg text-gray-800 hover:bg-white backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNextDestination}
                className="bg-white/80 p-3 rounded-full shadow-lg text-gray-800 hover:bg-white backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>  
            
            {/* Autoplay Toggle */}
            <button
              onClick={toggleAutoplay}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 p-2 rounded-full shadow-lg text-gray-800 hover:bg-white z-10 backdrop-blur-sm"
            >
              {isAutoplayPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>

            {/* Desktop View - Multiple Cards */}
            {!isMobile && (
              <div className="hidden md:grid grid-cols-3 gap-6">
                {visibleDestinations.map((destination, index) => (
                  <div key={`desktop-${destination.id || index}`}>
                    <DestinationCard 
                      destination={destination}
                      onClick={() => {
                        setSelectedDestination(destination);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )} 
            
            {/* Mobile View - Single Card */}
            {isMobile && (
              <div className="relative h-[36rem] md:hidden">
                <div className="absolute inset-0">
                  <DestinationCard 
                    destination={filteredDestinations[currentIndex]} 
                    isSlider={true}
                    onClick={() => {
                      setSelectedDestination(filteredDestinations[currentIndex]);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination Dots - Only for Carousel View */}
        {!isAllDestinationsPage && (
          <div className="flex justify-center mt-6 space-x-2">
            {filteredDestinations.map((_, index) => (
              <button
                key={`pagination-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2.5 bg-orange-200 hover:bg-orange-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )}
    
    {/* Destination Modal */}
    {isModalOpen && (
      <DestinationModal 
        isOpen={isModalOpen} 
        destination={selectedDestination}
        onClose={handleCloseModal}
        activeTab={activeModalTab}
        setActiveTab={setActiveModalTab}
      />
    )} 
  </div>
);
};


export default DestinationGallery;