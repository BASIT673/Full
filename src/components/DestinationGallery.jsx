// import ToursCarousel from './components/Tourca';
import axios from 'axios';
import { useState,useRef ,useEffect,useMemo,useCallback} from 'react';
import { Heart, Share2,Loader,ChevronLeft,ChevronRight,Pause,Clock,Play,ChevronDown,Filter, X,Info, Star, MapPin, Calendar, Users, Globe, Check } from 'lucide-react';

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
  
    // Check for mobile device on mount and window resize (with debounce)
    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIsMobile();
      
      // Setup debounced resize listener
      let timeoutId;
      const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkIsMobile, 100);
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const fetchDestinations = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
    
        const response = await fetch('https://backend-1-7zwm.onrender.com/api/destinations', {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
    
        // Handle non-200 responses
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
    
        // Parse the JSON response
        const text = await response.text();
        const data = JSON.parse(text);
        setDestinationCategories(data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError(err.message || "Failed to fetch destinations");
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Fetch destinations on mount
    useEffect(() => {
      fetchDestinations();
    }, [fetchDestinations]);
    const handleViewMore = useCallback((destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
        setIsAutoplayPaused(true); // Add this line to pause autoplay
      }, []);
      
      const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedDestination(null);
        setActiveModalTab('overview');
        setIsAutoplayPaused(false); // Add this line to resume autoplay
      }, []);
    // const handleViewMore = useCallback((destination) => {
    //   setSelectedDestination(destination);
    //   setIsModalOpen(true);
    // }, []);
  
    // const handleCloseModal = useCallback(() => {
    //   setIsModalOpen(false);
    //   setSelectedDestination(null);
    //   setActiveModalTab('overview');
    // }, []);
  
    const handleTabChange = useCallback((tab) => {
      setActiveTab(tab);
      setCurrentIndex(0);
    }, []);
  
    // Filter destinations by active tab
    const currentDestinations = useMemo(() => {
      let categoryTitle = '';
      if (activeTab === 'top') categoryTitle = 'Top Destinations';
      if (activeTab === 'food') categoryTitle = 'Food Destinations';
      if (activeTab === 'ancient') categoryTitle = 'Ancient Destinations';
    
      const category = destinationCategories.find(cat => 
        cat.title.toLowerCase() === categoryTitle.toLowerCase()
      );
    
      return category ? category.items : [];
    }, [activeTab, destinationCategories]);
    
    // Apply filters to current destinations
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
    
    // Calculate visible destinations based on device type and current index
    const visibleDestinations = useMemo(() => {
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
    }, [filteredDestinations, currentIndex, isMobile]);
   
    const allCategories = useMemo(() => {
      return [...new Set(currentDestinations
        .filter(dest => dest.category)
        .map(dest => dest.category))];
    }, [currentDestinations]);
  
    // Reset index when filtered destinations change
    useEffect(() => {
      setCurrentIndex(0);
    }, [filteredDestinations.length]);
  
    // Navigation functions
    const handleNextDestination = useCallback(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % filteredDestinations.length
      );
    }, [filteredDestinations.length]);
  
    const handlePreviousDestination = useCallback(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? filteredDestinations.length - 1 : prevIndex - 1
      );
    }, [filteredDestinations.length]);
  
    // Autoplay management
    const startAutoplay = useCallback(() => {
      stopAutoplay();
      
      if (!isAutoplayPaused && filteredDestinations.length > 1) {
        autoplayIntervalRef.current = setInterval(() => {
          handleNextDestination();
        }, autoplayInterval);
      }
    }, [isAutoplayPaused, filteredDestinations.length, handleNextDestination]);
  
    const stopAutoplay = useCallback(() => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    }, []);
  
    // Autoplay effect with proper cleanup
    useEffect(() => {
      if (isAutoplayPaused || filteredDestinations.length <= 1) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
      
      return stopAutoplay;
    }, [isAutoplayPaused, filteredDestinations.length, startAutoplay, stopAutoplay]);
  
    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') handleNextDestination();
        if (e.key === 'ArrowLeft') handlePreviousDestination();
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNextDestination, handlePreviousDestination]);
  
    // Toggle autoplay
    const toggleAutoplay = useCallback(() => {
      setIsAutoplayPaused(prev => !prev);
    }, []);
  
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
              src={destination.image || "/api/placeholder/300/200"} 
              // src={`https://backend-1-7zwm.onrender.com${destination.image}`}
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
              // onClick={() => handleGetQuote1}
              // onClick={handleGetQuote1} 
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
    // const DestinationModal = ({ isOpen, destination, onClose,  activeTab, setActiveTab   }) => {
    //     // const [activeTab, setActiveTab] = useState('overview');
       
        
         
    //     const [isFavorite, setIsFavorite] = useState(false);
        
    //     if (!isOpen || !destination) return null;
    
       
    
    //   useEffect(() => {
    //     // Prevent body scroll when modal is open
    //     if (isOpen) {
    //       document.body.style.overflow = 'hidden';
    //     }
    
    //     return () => {
    //       document.body.style.overflow = 'auto';
    //     };
    //   }, [isOpen]);
    
      
        
    //     // Format price with comma separators and handle invalid values
    //     const formatPrice = (price) => {
    //       const numPrice = Number(price);
    //       return isNaN(numPrice) ? '₹0' : `₹${numPrice.toLocaleString('en-IN')}`;
    //     };
        
    //     // Calculate discount if available
    //     const calculateDiscount = () => {
    //       if (destination.tourDetails?.originalPrice && destination.tourDetails?.price) {
    //         const originalPrice = Number(destination.tourDetails.originalPrice);
    //         const currentPrice = Number(destination.tourDetails.price);
    //         if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
    //           return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    //         }
    //       }
    //       return destination.tourDetails?.discount || 0;
    //     };
      
       
          
    
    
               
    //     return (
    //       <div  id="destinations" className=" z-50 fixed inset-0 flex items-center justify-center p-4">
    //         {/* Backdrop */}
    //         <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      
    //         {/* Modal Container */}
            
    //         <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
    //           <div className="flex flex-col md:flex-row">
    //             {/* Image Section */}
    //             <div className="md:w-2/5 relative h-52 md:h-auto">
    //               <img
    //                 // src={destination.image || "/api/placeholder/400/320"}
    //                 src={`https://backend-1-7zwm.onrender.com${destination.image}`}
    //                 alt={destination.title || "Destination"}
    //                 className="h-full w-full object-cover md:rounded-l-lg"
    //               />
    //               <button
    //                 onClick={onClose}
    //                 className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
    //               >
    //                 <X className="h-4 w-4" />
    //               </button>
    //               <div className="absolute bottom-3 right-3 flex space-x-1.5">
    //                 <button 
    //                   onClick={() => setIsFavorite(!isFavorite)}
    //                   className="rounded-full bg-white/90 p-1.5 hover:bg-white"
    //                 >
    //                   <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
    //                 </button>
    //                 <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
    //                   <Share2 className="h-4 w-4 text-gray-700" />
    //                 </button>
    //               </div>
    //             </div>
      
    //             {/* Content Section */}
    //             <div className="md:w-3/5 p-4">
    //               <div className="flex items-center justify-between">
    //                 <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
    //                 <div className="flex items-center space-x-1">
    //                   <Star className="h-4 w-4 fill-current text-yellow-500" />
    //                   <span className="font-semibold">{destination.rating?.toFixed(1) || '4.5'}</span>
    //                   <span className="text-xs text-gray-500">({destination.reviews || '0'})</span>
    //                 </div>
    //               </div>
      
    //               {/* Location and Price */}
    //               <div className="mt-2 flex items-center justify-between">
    //                 <div className="flex items-center text-sm text-gray-600">
    //                   <MapPin className="mr-1 h-4 w-4 text-orange-500" />
    //                   <span>{destination.tourDetails?.location || 'Location'}</span>
    //                 </div>
    //                 <div className="text-lg font-bold text-orange-500">
    //                   {/* {hasValidPriceData() ? formatPrice(destination.tourDetails.price) : '₹0'} */}
    //                   {destination.tourDetails.price}
    //                   <span className="text-xs text-gray-500">/person</span>
    //                   {calculateDiscount() > 0 && (
    //                     <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
    //                       {calculateDiscount()}% OFF
    //                     </span>
    //                   )}
    //                 </div>
    //               </div>
      
    //               {/* Tour Details Row */}
    //               <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
    //                 <div className="flex items-center">
    //                   <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
    //                   {destination.tourDetails?.duration || 'Duration'}
    //                 </div>
    //                 <div className="flex items-center">
    //                   <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
    //                   Max {destination.tourDetails?.groupSize || 'Group Size'}
    //                 </div>
    //                 <div className="flex items-center">
    //                   <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
    //                   {destination.tourDetails?.language || 'English'}
    //                 </div>
    //               </div>
      
    //               {/* Tabs - Horizontal Pills */}
    //               <div className="mt-3">
    //                 <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
    //                   <button
    //                   //  onClick={() => handleTabChange('overview')}
    //                     onClick={() => setActiveTab('overview')}
    //                     // onClick={() => handleTabClick('overview')}
    //                     className={`px-3 py-1 rounded-full whitespace-nowrap ${
    //                       activeTab === 'overview'
    //                         ? 'bg-orange-500 text-white'
    //                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    //                     }`}
    //                   >
    //                     Overview
    //                   </button>
    //                   <button
    //                     onClick={() => setActiveTab('itinerary')}
    //                     // onClick={() => handleTabClick('itinerary')}
    //                     className={`px-3 py-1 rounded-full whitespace-nowrap ${
    //                       activeTab === 'itinerary'
    //                         ? 'bg-orange-500 text-white'
    //                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    //                     }`}
    //                   >
    //                     Itinerary
    //                   </button>
    //                   <button
    //                     // onClick={() => handleTabClick('inclusions')}
    //                     onClick={() => setActiveTab('inclusions')}
    //                     className={`px-3 py-1 rounded-full whitespace-nowrap ${
    //                       activeTab === 'inclusions'
    //                         ? 'bg-orange-500 text-white'
    //                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    //                     }`}
    //                   >
    //                     What's Included
    //                   </button>
    //                 </div>
      
    //                 {/* Tab Content - Scrollable container */}
    //                 <div className="mt-3 overflow-y-auto max-h-56">
    //                   {/* Overview Tab */}
    //                   {activeTab === 'overview' && (
    //                     <div className="space-y-3">
    //                       <p className="text-sm text-gray-600 leading-relaxed">
    //                         {destination.description || 'No description available.'}
    //                       </p>
                          
    //                       <div className="mt-2">
    //                         <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
    //                         <ul className="mt-1 space-y-1">
    //                           {destination.details && destination.details.length > 0 ? (
    //                             destination.details.map((detail, index) => (
    //                               <li key={index} className="flex items-start text-xs text-gray-600">
    //                                 <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
    //                                   <Check className="h-2 w-2" />
    //                                 </span>
    //                                 {detail}
    //                               </li>
    //                             ))
    //                           ) : (
    //                             <li className="text-xs text-gray-600">No highlights available.</li>
    //                           )}
    //                         </ul>
    //                       </div>
    //                     </div>
    //                   )}
      
    //                   {/* Itinerary Tab */}
    //                   {activeTab === 'itinerary' && (
    //                     <div className="space-y-3">
    //                       {destination.itinerary && destination.itinerary.length > 0 ? (
    //                         destination.itinerary.map((day, index) => (
    //                           <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
    //                             <h3 className="text-sm font-semibold text-gray-800">Day {day.day}: {day.title}</h3>
    //                             {day.activities && day.activities.length > 0 ? (
    //                               <ul className="mt-1 space-y-1">
    //                                 {day.activities.map((activity, idx) => (
    //                                   <li key={idx} className="flex items-start text-xs text-gray-600">
    //                                     <Check className="mr-1.5 h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
    //                                     {activity}
    //                                   </li>
    //                                 ))}
    //                               </ul>
    //                             ) : (
    //                               <p className="mt-1 text-xs text-gray-600">No activities specified for this day.</p>
    //                             )}
    //                             {day.meals && day.meals.length > 0 && (
    //                               <p className="mt-1 text-xs text-gray-600">
    //                                 <span className="font-medium">Meals:</span> {day.meals.join(', ')}
    //                               </p>
    //                             )}
    //                           </div>
    //                         ))
    //                       ) : (
    //                         <p className="text-xs text-gray-600">Detailed itinerary will be provided upon booking.</p>
    //                       )}
    //                     </div>
    //                   )}
      
    //                   {/* Inclusions Tab */}
    //                   {activeTab === 'inclusions' && (
    //                     <div className="grid grid-cols-1 gap-3">
    //                       <div>
    //                         <h3 className="text-sm font-semibold text-gray-800">Included</h3>
    //                         <ul className="mt-1 space-y-1">
    //                           {destination.tourDetails?.inclusions && destination.tourDetails.inclusions.length > 0 ? (
    //                             destination.tourDetails.inclusions.map((item, index) => (
    //                               <li key={index} className="flex items-start text-xs text-gray-600">
    //                                 <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
    //                                 {item}
    //                               </li>
    //                             ))
    //                           ) : (
    //                             <li className="text-xs text-gray-600">No inclusions specified.</li>
    //                           )}
    //                         </ul>
    //                       </div>
    //                       <div>
    //                         <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
    //                         <ul className="mt-1 space-y-1">
    //                           {destination.tourDetails?.notIncluded && destination.tourDetails.notIncluded.length > 0 ? (
    //                             destination.tourDetails.notIncluded.map((item, index) => (
    //                               <li key={index} className="flex items-start text-xs text-gray-600">
    //                                 <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
    //                                 {item}
    //                               </li>
    //                             ))
    //                           ) : (
    //                             <li className="text-xs text-gray-600">No exclusions specified.</li>
    //                           )}
    //                         </ul>
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
      
    //               {/* Action Buttons */}
    //               <div className="mt-4 flex gap-x-4">
    //                 {/* Book Now Button */}
    //                 <button 
    //                   onClick={handleBookNow3} 
    //                   className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
    //                 >
    //                   Book Now
    //                 </button>
      
    //                 {/* Get Quote Button (Outlined) */}
    //                 <button 
    //                   onClick={handleGetQuote} 
    //                   className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
    //                 >
    //                   Get Quote
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   };
    const DestinationModal = ({ isOpen, destination, onClose, activeTab, setActiveTab }) => {
        const [isFavorite, setIsFavorite] = useState(false);
        const modalContentRef = useRef(null);
        const scrollPositionRef = useRef(0); // Use ref instead of state to avoid re-renders
        
        if (!isOpen || !destination) return null;
      
        // Store scroll position when scrolling occurs without triggering re-render
        // const handleScroll = (e) => {
        //   scrollPositionRef.current = e.target.scrollTop;
        // };
      
        // useEffect(() => {
        //   // Prevent body scroll when modal is open
        //   if (isOpen) {
        //     document.body.style.overflow = 'hidden';
        //   }
      
        //   return () => {
        //     document.body.style.overflow = 'auto';
        //   };
        // }, [isOpen]);
      
        // Reset scroll position when tab changes and restore it
        // useEffect(() => {
        //   const contentElement = modalContentRef.current;
        //   if (contentElement) {
        //     // Only reset to top when tab changes
        //     contentElement.scrollTop = 0;
        //     scrollPositionRef.current = 0;
        //   }
        // }, [activeTab]);
        
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
      
        // Custom scrollbar CSS to ensure it's visible across all browsers
        const handleGetQuote = () => {
            console.log("Get quote for:", destination.title);
            
            // Create modal container if it doesn't exist
            let modalContainer = document.getElementById('quote-modal-container');
            if (!modalContainer) {
              modalContainer = document.createElement('div');
              modalContainer.id = 'quote-modal-container';
              document.body.appendChild(modalContainer);
            }
            
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
            
            document.getElementById('quote-request-form').addEventListener('submit', async (e) => {
              e.preventDefault();
              
              // Get form data
              const formData = {
                name: document.getElementById('quote-name').value,
                email: document.getElementById('quote-email').value,
                phone: document.getElementById('quote-phone').value,
                totalTravelers: document.getElementById('quote-travelers').value,
                travelDate: document.getElementById('quote-date').value,
                message: document.getElementById('quote-message').value,
                newsletterSubscription: document.getElementById('quote-newsletter').checked,
                tourName: destination.title || '',
                tourId: destination.id || '',
                tourName: destination.name || '',
                tourId: selectedDestination._id,
                tourTitle: selectedDestination.title,
                createdAt: new Date().toISOString()
              };
              
              console.log("Quote form submitted:", formData);
              
              // Show loading state
              const submitBtn = document.querySelector('.quote-submit-btn');
              submitBtn.innerHTML = '<span>Processing...</span>';
              submitBtn.disabled = true;
              
              try {
                // Send the data to your backend API
                const response = await fetch('http://localhost:5000/api/tour-queries', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });
                
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                
                // Replace form with success message
                document.querySelector('.quote-modal-body').innerHTML = `
                  <div class="quote-success">
                    <div class="quote-success-icon">✓</div>
                    <h3>Your Quote Request is Confirmed!</h3>
                    <p>Thank you, ${formData.name}! Our travel experts will prepare your personalized quote for ${destination.title || 'this experience'} and contact you within 24 hours at ${formData.email}.</p>
                    <p>Don't forget - book within 48 hours to claim your exclusive 15% early bird discount!</p>
                    <button class="quote-close-success-btn">Close</button>
                  </div>
                `;
                
                // Add event listener to new close button
                document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
                  modalContainer.remove();
                });
              } catch (error) {
                console.error('Error submitting form:', error);
                submitBtn.innerHTML = '<span>Error! Try Again</span>';
                setTimeout(() => {
                  submitBtn.innerHTML = '<span class="btn-text">Get My Personalized Quote</span><span class="btn-icon">→</span>';
                  submitBtn.disabled = false;
                }, 2000);
              }
            });
          };
      
        // const handleGetQuote = () => {
        //     console.log("Get quote for:", destination.title);
            
        //     // Create modal container if it doesn't exist
        //     let modalContainer = document.getElementById('quote-modal-container');
        //     if (!modalContainer) {
        //       modalContainer = document.createElement('div');
        //       modalContainer.id = 'quote-modal-container';
        //       document.body.appendChild(modalContainer);
        //     }
        //     // Show loading state
          
        //     // Create and populate the modal content with marketing elements
        //     modalContainer.innerHTML = `
        //       <div class="quote-modal-overlay">
        //         <div class="quote-modal">
        //           <div class="quote-modal-header">
        //             <h2>Get Your Exclusive Quote for ${destination.title || 'This Experience'}</h2>
        //             <button class="quote-close-btn">&times;</button>
        //           </div>
                  
        //           <div class="quote-banner">
        //             <div class="quote-banner-content">
        //               <div class="quote-banner-icon">🎁</div>
        //               <div class="quote-banner-text">
        //                 <strong>Limited Time Offer!</strong> Book within 48 hours and receive a 15% early bird discount!
        //               </div>
        //             </div>
        //           </div>
                  
        //           <div class="quote-modal-body">
        //             <div class="quote-intro">
        //               <p>Join thousands of satisfied travelers who have experienced this journey of a lifetime. Our expert travel advisors are ready to craft your perfect adventure.</p>
        //               <div class="quote-benefits">
        //                 <div class="benefit-item"><span class="benefit-icon">✓</span> Best Price Guarantee</div>
        //                 <div class="benefit-item"><span class="benefit-icon">✓</span> Free Cancellation</div>
        //                 <div class="benefit-item"><span class="benefit-icon">✓</span> 24/7 Support</div>
        //               </div>
        //             </div>
                    
        //             <form id="quote-request-form">
        //               <div class="form-group">
        //                 <label for="quote-name">Full Name*</label>
        //                 <input type="text" id="quote-name" placeholder="Your Name" required />
        //               </div>
        //               <div class="form-group">
        //                 <label for="quote-email">Email Address*</label>
        //                 <input type="email" id="quote-email" placeholder="your@email.com" required />
        //               </div>
        //               <div class="form-group">
        //                 <label for="quote-phone">Phone Number*</label>
        //                 <input type="tel" id="quote-phone" placeholder="+1 (234) 567-8900" required />
        //               </div>
        //               <div class="form-row">
        //                 <div class="form-group">
        //                   <label for="quote-travelers">Number of Travelers*</label>
        //                   <select id="quote-travelers" required>
        //                     <option value="">Select</option>
        //                     <option value="1">1</option>
        //                     <option value="2">2</option>
        //                     <option value="3-5">3-5</option>
        //                     <option value="6-10">6-10</option>
        //                     <option value="10+">10+</option>
        //                   </select>
        //                 </div>
        //                 <div class="form-group">
        //                   <label for="quote-date">Travel Date*</label>
        //                   <input type="date" id="quote-date" required />
        //                 </div>
        //               </div>
        //               <div class="form-group">
        //                 <label for="quote-message">Special Requirements or Customizations</label>
        //                 <textarea id="quote-message" placeholder="Tell us about any special requirements, preferences, or questions you have about this experience"></textarea>
        //               </div>
                      
        //               <div class="quote-promo">
        //                 <div class="promo-icon">🔥</div>
        //                 <p>Act fast! <strong>7 other travelers</strong> are looking at this tour right now.</p>
        //               </div>
                      
        //               <div class="form-checkbox">
        //                 <input type="checkbox" id="quote-newsletter" checked />
        //                 <label for="quote-newsletter">Send me exclusive deals and offers (10% off your first booking!)</label>
        //               </div>
                      
        //               <button type="submit" class="quote-submit-btn">
        //                 <span class="btn-text">Get My Personalized Quote</span>
        //                 <span class="btn-icon">→</span>
        //               </button>
        //             </form>
                    
        //             <div class="quote-trust">
        //               <p>Trusted by over 1M+ happy travelers worldwide</p>
        //               <div class="trust-icons">
        //                 <div class="trust-icon">⭐⭐⭐⭐⭐</div>
        //                 <div class="trust-text">4.9/5 from 10,000+ reviews</div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     `;
            
        //     // Add styling for the enhanced modal
        //     const style = document.createElement('style');
        //     style.textContent = `
        //       .quote-modal-overlay {
        //         position: fixed;
        //         top: 0;
        //         left: 0;
        //         width: 100%;
        //         height: 100%;
        //         background-color: rgba(0, 0, 0, 0.5);
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //         z-index: 1000;
        //         animation: fadeIn 0.3s ease;
        //       }
              
        //       @keyframes fadeIn {
        //         from { opacity: 0; }
        //         to { opacity: 1; }
        //       }
              
        //       @keyframes slideIn {
        //         from { transform: translateY(30px); opacity: 0; }
        //         to { transform: translateY(0); opacity: 1; }
        //       }
              
        //       .quote-modal {
        //         background-color: white;
        //         border-radius: 10px;
        //         width: 95%;
        //         max-width: 650px;
        //         max-height: 90vh;
        //         overflow-y: auto;
        //         box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        //         animation: slideIn 0.4s ease;
        //       }
              
        //       .quote-modal-header {
        //         padding: 22px 25px;
        //         border-bottom: 1px solid #eee;
        //         display: flex;
        //         justify-content: space-between;
        //         align-items: center;
        //         background-color: #FF6B00;
        //         border-radius: 10px 10px 0 0;
        //       }
              
        //       .quote-modal-header h2 {
        //         margin: 0;
        //         color: white;
        //         font-size: 22px;
        //         font-weight: 700;
        //       }
              
        //       .quote-close-btn {
        //         background: none;
        //         border: none;
        //         font-size: 28px;
        //         cursor: pointer;
        //         color: white;
        //         opacity: 0.8;
        //         transition: opacity 0.2s;
        //       }
              
        //       .quote-close-btn:hover {
        //         opacity: 1;
        //       }
              
        //       .quote-banner {
        //         background: linear-gradient(90deg, #FFF3E0, #FFECB3);
        //         padding: 12px 25px;
        //         border-bottom: 1px solid #FFE0B2;
        //       }
              
        //       .quote-banner-content {
        //         display: flex;
        //         align-items: center;
        //         gap: 15px;
        //       }
              
        //       .quote-banner-icon {
        //         font-size: 24px;
        //       }
              
        //       .quote-banner-text {
        //         font-size: 15px;
        //         color: #E65100;
        //       }
              
        //       .quote-modal-body {
        //         padding: 25px;
        //       }
              
        //       .quote-intro {
        //         margin-bottom: 25px;
        //       }
              
        //       .quote-intro p {
        //         margin-top: 0;
        //         margin-bottom: 15px;
        //         color: #555;
        //         line-height: 1.5;
        //       }
              
        //       .quote-benefits {
        //         display: flex;
        //         flex-wrap: wrap;
        //         gap: 15px;
        //         margin-bottom: 20px;
        //       }
              
        //       .benefit-item {
        //         display: flex;
        //         align-items: center;
        //         font-size: 14px;
        //         color: #333;
        //         margin-right: 15px;
        //       }
              
        //       .benefit-icon {
        //         color: #FF6B00;
        //         font-weight: bold;
        //         margin-right: 5px;
        //       }
              
        //       .form-group {
        //         margin-bottom: 20px;
        //       }
              
        //       .form-row {
        //         display: flex;
        //         gap: 20px;
        //       }
              
        //       .form-row .form-group {
        //         flex: 1;
        //       }
              
        //       label {
        //         display: block;
        //         margin-bottom: 8px;
        //         font-weight: 600;
        //         color: #333;
        //         font-size: 15px;
        //       }
              
        //       input, select, textarea {
        //         width: 100%;
        //         padding: 14px;
        //         border: 1px solid #ddd;
        //         border-radius: 6px;
        //         font-size: 15px;
        //         transition: border-color 0.3s;
        //       }
              
        //       input:focus, select:focus, textarea:focus {
        //         outline: none;
        //         border-color: #FF6B00;
        //         box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
        //       }
              
        //       textarea {
        //         height: 110px;
        //         resize: vertical;
        //       }
              
        //       .quote-promo {
        //         background-color: #FFF8E1;
        //         border-radius: 6px;
        //         padding: 12px 15px;
        //         margin: 20px 0;
        //         display: flex;
        //         align-items: center;
        //         gap: 12px;
        //       }
              
        //       .promo-icon {
        //         font-size: 20px;
        //       }
              
        //       .quote-promo p {
        //         margin: 0;
        //         color: #333;
        //         font-size: 14px;
        //       }
              
        //       .form-checkbox {
        //         display: flex;
        //         align-items: center;
        //         gap: 10px;
        //         margin-bottom: 20px;
        //       }
              
        //       .form-checkbox input {
        //         width: auto;
        //       }
              
        //       .form-checkbox label {
        //         margin-bottom: 0;
        //         font-weight: normal;
        //         font-size: 14px;
        //         cursor: pointer;
        //       }
              
        //       .quote-submit-btn {
        //         background-color: #FF6B00;
        //         color: white;
        //         border: none;
        //         border-radius: 6px;
        //         padding: 16px 24px;
        //         font-size: 17px;
        //         font-weight: 700;
        //         cursor: pointer;
        //         width: 100%;
        //         transition: all 0.3s;
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //         gap: 10px;
        //         box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
        //       }
              
        //       .quote-submit-btn:hover {
        //         background-color: #E55F00;
        //         transform: translateY(-2px);
        //         box-shadow: 0 6px 15px rgba(255, 107, 0, 0.4);
        //       }
              
        //       .btn-icon {
        //         font-size: 18px;
        //         transition: transform 0.3s;
        //       }
              
        //       .quote-submit-btn:hover .btn-icon {
        //         transform: translateX(5px);
        //       }
              
        //       .quote-trust {
        //         margin-top: 25px;
        //         text-align: center;
        //         padding-top: 15px;
        //         border-top: 1px solid #eee;
        //         color: #666;
        //         font-size: 14px;
        //       }
              
        //       .quote-trust p {
        //         margin-bottom: 10px;
        //       }
              
        //       .trust-icons {
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //         gap: 8px;
        //       }
              
        //       .quote-success {
        //         text-align: center;
        //         padding: 40px 25px;
        //         animation: fadeIn 0.5s ease;
        //       }
              
        //       .quote-success-icon {
        //         background-color: #FF6B00;
        //         color: white;
        //         width: 70px;
        //         height: 70px;
        //         border-radius: 50%;
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;
        //         font-size: 35px;
        //         margin: 0 auto 25px;
        //         box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        //       }
              
        //       .quote-success h3 {
        //         color: #333;
        //         margin-bottom: 15px;
        //         font-size: 24px;
        //       }
              
        //       .quote-success p {
        //         color: #555;
        //         margin-bottom: 25px;
        //         line-height: 1.6;
        //       }
              
        //       .quote-close-success-btn {
        //         background-color: #FF6B00;
        //         color: white;
        //         border: none;
        //         border-radius: 6px;
        //         padding: 14px 30px;
        //         font-size: 16px;
        //         font-weight: 600;
        //         cursor: pointer;
        //         transition: all 0.3s;
        //         box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
        //       }
              
        //       .quote-close-success-btn:hover {
        //         background-color: #E55F00;
        //         transform: translateY(-2px);
        //         box-shadow: 0 6px 15px rgba(255, 107, 0, 0.35);
        //       }
              
        //       @media (max-width: 600px) {
        //         .form-row {
        //           flex-direction: column;
        //           gap: 15px;
        //         }
                
        //         .quote-banner-content {
        //           flex-direction: column;
        //           text-align: center;
        //           gap: 8px;
        //         }
                
        //         .quote-modal-header h2 {
        //           font-size: 18px;
        //         }
                
        //         .quote-benefits {
        //           flex-direction: column;
        //           gap: 10px;
        //         }
        //       }
        //     `;
        //     document.head.appendChild(style);
            
        //     // Add event listeners
        //     document.querySelector('.quote-close-btn').addEventListener('click', () => {
        //       modalContainer.remove();
        //     });
            
        //     document.getElementById('quote-request-form').addEventListener('submit', (e) => {
        //       e.preventDefault();
              
        //       // Get form data
        //       const formData = {
        //         name: document.getElementById('quote-name').value,
        //         email: document.getElementById('quote-email').value,
        //         phone: document.getElementById('quote-phone').value,
        //         travelers: document.getElementById('quote-travelers').value,
        //         travelDate: document.getElementById('quote-date').value,
        //         message: document.getElementById('quote-message').value,
        //         newsletterSubscription: document.getElementById('quote-newsletter').checked,
        //         tourId: tour.id || '',
        //         tourName: tour.name || '',
        //         requestTimestamp: new Date().toISOString(),
        //         source: window.location.href,
        //         utm: getUTMParams() // Function to get UTM parameters if available
        //       };
              
        //       console.log("Quote form submitted:", formData);
              
        //       // Show loading state
        //       // const submitBtn = document.querySelector('.quote-
        //      const  submitBtn = document.querySelector('.quote-submit-btn');
        //   submitBtn.innerHTML = '<span>Processing...</span>';
        //   submitBtn.disabled = true;
          
        //   // Simulate API call to submit quote request
        //   setTimeout(() => {
        //     // Replace form with success message
        //     document.querySelector('.quote-modal-body').innerHTML = `
        //       <div class="quote-success">
        //         <div class="quote-success-icon">✓</div>
        //         <h3>Your Quote Request is Confirmed!</h3>
        //         <p>Thank you, ${formData.name}! Our travel experts will prepare your personalized quote for ${tour.name || 'this experience'} and contact you within 24 hours at ${formData.email}.</p>
        //         <p>Don't forget - book within 48 hours to claim your exclusive 15% early bird discount!</p>
        //         <button class="quote-close-success-btn">Close</button>
        //       </div>
        //     `;
            
        //     // Add event listener to new close button
        //     document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
        //       modalContainer.remove();
        //     });
            
        //     // Actually send the form data to server
        //     // sendQuoteRequestToServer(formData);
        //   }, 1500);
        //   });
          
        //   // Function to get UTM parameters if available
        //   function getUTMParams() {
        //   const params = {};
        //   const queryString = window.location.search;
        //   const urlParams = new URLSearchParams(queryString);
          
        //   ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        //     if (urlParams.has(param)) {
        //       params[param] = urlParams.get(param);
        //     }
        //   });
          
        //   return params;
        //   }
        //   };
       
  
        
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
                // Alternative version with delayed auto-focus
                
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
              
                // const modalOverlay = document.createElement('div');
                // modalOverlay.className = 'query-form-overlay';
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
                    
                    /* CSS for Promo Code */
                    .promo-container {
                      display: flex;
                      gap: 8px;
                      margin-top: 10px;
                    }
                    .promo-input {
                      flex-grow: 1;
                    }
                    .promo-button {
                      background: #FF6B00;
                      color: white;
                      border: none;
                      padding: 0 15px;
                      border-radius: 6px;
                      font-weight: 500;
                      cursor: pointer;
                      transition: all 0.2s;
                    }
                    .promo-button:hover {
                      background: #FF8800;
                    }
                    .promo-button:disabled {
                      background: #ccc;
                      cursor: not-allowed;
                    }
                    .promo-status {
                      margin-top: 8px;
                      font-size: 0.85rem;
                    }
                    .promo-success {
                      color: #10b981;
                      display: flex;
                      align-items: center;
                      gap: 6px;
                    }
                    .promo-error {
                      color: #ef4444;
                      display: flex;
                      align-items: center;
                      gap: 6px;
                    }
                    .discount-row {
                      display: flex;
                      justify-content: space-between;
                      padding-left: 15px;
                      margin-bottom: 8px;
                      font-weight: 500;
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
                          
                          <!-- Promo code discount row (initially hidden) -->
                          <div id="promoDiscountRow" class="discount-row" style="color: #10b981; display: none;">
                            <span style="font-size: 0.85rem;">Promo Discount: <span id="promoCodeDisplay"></span></span>
                            <span>-₹<span id="discountAmountDisplay">0</span></span>
                          </div>
                        </div>
                      </div>
                      
                      <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
                      
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                        <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
                        <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
                      </div>
                      
                      <!-- Promo Code Section -->
                      <div style="margin-top: 20px; padding: 12px; background: #f9f9f9; border-radius: 8px; border: 1px dashed #ddd;">
                        <label for="promoCode" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Have a Promo Code?</label>
                        <div class="promo-container">
                          <input type="text" id="promoCode" placeholder="Enter code" class="form-input promo-input" style="padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
                          <button id="applyPromoBtn" class="promo-button">Apply</button>
                        </div>
                        <div id="promoStatus" class="promo-status"></div>
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
              
                // State variables for price calculation and promo code
                let promoCodeData = null;
                let baseSubtotal = 0;
              
                // Enhanced price calculation function with animations
                const updateTotalPrice1 = () => {
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
                  
                  // Calculate subtotal before any discounts
                  baseSubtotal = adultsPrice + childrenPrice;
                  
                  // Calculate final price after discounts (if promo code applied)
                  let finalPrice = baseSubtotal;
                  let discountAmount = 0;
                  
                  if (promoCodeData) {
                    // Calculate discount based on promo code
                    discountAmount = Math.min(
                      (baseSubtotal * promoCodeData.discount) / 100, 
                      promoCodeData.maxDiscount || Number.MAX_SAFE_INTEGER
                    );
                    
                    // Update the discount display
                    document.getElementById('promoDiscountRow').style.display = 'flex';
                    document.getElementById('promoCodeDisplay').textContent = promoCodeData.code;
                    document.getElementById('discountAmountDisplay').textContent = discountAmount.toLocaleString();
                    
                    // Apply discount
                    finalPrice = baseSubtotal - discountAmount;
                  } else {
                    // Hide discount row if no promo code
                    document.getElementById('promoDiscountRow').style.display = 'none';
                  }
                  
                  // Apply animation by removing and re-adding the class
                  const totalPriceElement = document.getElementById('totalPriceDisplay');
                  totalPriceElement.classList.remove('price-animation');
                  
                  // Trigger reflow to restart animation
                  void totalPriceElement.offsetWidth;
                  
                  totalPriceElement.textContent = '₹' + finalPrice.toLocaleString();
                  totalPriceElement.classList.add('price-animation');
                  
                  // Store the calculated prices to use in the booking process
                  window.calculatedSubtotal = baseSubtotal;
                  window.calculatedDiscount = discountAmount;
                  window.calculatedTotalPrice = finalPrice;
                  
                  // If a promo code is applied, revalidate it with the new package price
                  if (promoCodeData) {
                    validatePromoCode(document.getElementById('promoCode').value, baseSubtotal, true);
                  }
                };
              // Add debounce function to prevent continuous requests
          // const debounce = (func, delay) => {
          //   let timeoutId;
          //   return function(...args) {
          //     clearTimeout(timeoutId);
          //     timeoutId = setTimeout(() => func.apply(this, args), delay);
          //   };
          // };
          // Add debounce function to prevent continuous requests
          const debounce = (func, delay) => {
            let timeoutId;
            return function(...args) {
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
          };
          
          // Improved promo code validation with better error handling
          const validatePromoCode = async (code, packagePrice, isRevalidation = false) => {
            if (!code) {
              // Clear the promo data if code is empty
              promoCodeData = null;
              updateTotalPrice(true); // Pass true to avoid revalidation loop
              document.getElementById('promoStatus').innerHTML = '';
              return;
            }
            
            const promoStatusElement = document.getElementById('promoStatus');
            const applyButton = document.getElementById('applyPromoBtn');
            
            if (!isRevalidation) {
              // Only show loading state for initial validation, not revalidations
              applyButton.disabled = true;
              promoStatusElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px; color: #666;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10"></path>
                  </svg>
                  <span>Validating code...</span>
                </div>
              `;
            }
            
            try {
              // Ensure URL is correctly formatted and uses relative path
              const apiUrl = `http://localhost:5000/api/promos/validate/${encodeURIComponent(code)}?packagePrice=${packagePrice}`;
              
              // Create headers object
              const headers = {
                'Content-Type': 'application/json'
              };
              
              // Only add token if it exists and is valid
              if (token && typeof token === 'string' && token.trim() !== '') {
                headers['Authorization'] = `Bearer ${token}`;
              }
              
              const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
              });
              const result = await response.json(); // Parse JSON response first
          
              if (!response.ok) { 
                // Instead of throwing an error, handle the error message from the response
                throw new Error(result.error || `HTTP error! status: ${response.status}`);
              }
          
              // Check if response is OK (status 200-299)
              // if (!response.ok) {
              //   throw new Error(`HTTP error! status: ${response.status}`);
              // }
              
              // const result = await response.json();
              
              // If is a revalidation check, only update the promo data, don't show messages
              if (isRevalidation) {
                if (result.success) {
                  promoCodeData = result.data;
                  updateTotalPrice(true); // Pass true to avoid revalidation loop
                } else {
                  // If revalidation fails (promo no longer valid), remove the promo
                  promoCodeData = null;
                  document.getElementById('promoCode').value = '';
                  updateTotalPrice(true); // Pass true to avoid revalidation loop
                }
                return;
              }
              
              applyButton.disabled = false;
              
              if (result.success) {
                promoCodeData = result.data;
                promoStatusElement.innerHTML = `
                  <div class="promo-success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Promo code applied! ${result.data.description || ''}</span>
                  </div>
                `;
                updateTotalPrice(true); // Pass true to avoid revalidation loop
              } else {
                promoCodeData = null;
                promoStatusElement.innerHTML = `
                  <div class="promo-error">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>${result.message || 'Invalid promo code'}</span>
                  </div>
                `;
                updateTotalPrice(true); // Pass true to avoid revalidation loop
              }
            } catch (error) {
              console.error('Error validating promo code:', error);
              applyButton.disabled = false;
              promoCodeData = null;
              promoStatusElement.innerHTML = `
                <div class="promo-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>${error.message || 'Error validating promo code. Please try again.'}</span>
                </div>
              `;
              updateTotalPrice(true); // Pass true to avoid revalidation loop
            }
          };
          
          // Fixed price calculation function that avoids revalidation loops
          const updateTotalPrice = (skipRevalidation = false) => {
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
            
            // Calculate subtotal before any discounts
            baseSubtotal = adultsPrice + childrenPrice;
            
            // Calculate final price after discounts (if promo code applied)
            let finalPrice = baseSubtotal;
            let discountAmount = 0;
            
            if (promoCodeData) {
              // Calculate discount based on promo code
              discountAmount = Math.min(
                (baseSubtotal * promoCodeData.discount) / 100, 
                promoCodeData.maxDiscount || Number.MAX_SAFE_INTEGER
              );
              
              // Update the discount display
              document.getElementById('promoDiscountRow').style.display = 'flex';
              document.getElementById('promoCodeDisplay').textContent = promoCodeData.code;
              document.getElementById('discountAmountDisplay').textContent = discountAmount.toLocaleString();
              
              // Apply discount
              finalPrice = baseSubtotal - discountAmount;
            } else {
              // Hide discount row if no promo code
              document.getElementById('promoDiscountRow').style.display = 'none';
            }
            
            // Apply animation by removing and re-adding the class
            const totalPriceElement = document.getElementById('totalPriceDisplay');
            totalPriceElement.classList.remove('price-animation');
            
            // Trigger reflow to restart animation
            void totalPriceElement.offsetWidth;
            
            totalPriceElement.textContent = '₹' + finalPrice.toLocaleString();
            totalPriceElement.classList.add('price-animation');
            
            // Store the calculated prices to use in the booking process
            window.calculatedSubtotal = baseSubtotal;
            window.calculatedDiscount = discountAmount;
            window.calculatedTotalPrice = finalPrice;
            
            // Avoid the circular dependency by checking skipRevalidation flag
            if (promoCodeData && !skipRevalidation) {
              validatePromoCode(document.getElementById('promoCode').value, baseSubtotal, true);
            }
          };
          
          // Add CSS for better responsiveness
          const styleTag = document.createElement('style');
          styleTag.textContent = `
            /* Enhanced responsiveness for promo code section */
            @media (max-width: 576px) {
              .promo-container {
                flex-direction: column;
              }
              .promo-button {
                margin-top: 8px;
                width: 100%;
                padding: 10px;
              }
              .form-input.promo-input {
                width: 100%;
              }
            }
          `;
          document.head.appendChild(styleTag);
          
          // Initialize event listeners
          document.addEventListener('DOMContentLoaded', () => {
            // Create a debounced version of validatePromoCode
            const debouncedValidatePromoCode = debounce((code, packagePrice) => {
              validatePromoCode(code, packagePrice);
            }, 500); // 500ms delay
            
            // Set up event listeners
            
            // Promo code input with debounce
            const promoCodeInput = document.getElementById('promoCode');
            if (promoCodeInput) {
              promoCodeInput.addEventListener('input', (e) => {
                const code = e.target.value.trim();
                if (code) {
                  debouncedValidatePromoCode(code, baseSubtotal);
                } else {
                  // Clear promo data immediately if field is empty
                  promoCodeData = null;
                  document.getElementById('promoStatus').innerHTML = '';
                  updateTotalPrice(true); // Pass true to avoid revalidation loop
                }
              });
            }
            
            // Apply button click
            const applyPromoBtn = document.getElementById('applyPromoBtn');
            if (applyPromoBtn) {
              applyPromoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const promoCode = document.getElementById('promoCode').value.trim();
                if (!promoCode) return;
                
                validatePromoCode(promoCode, baseSubtotal);
              });
            }
            
            // Price change listeners
            const queryAdults = document.getElementById('queryAdults');
            const queryChildren = document.getElementById('queryChildren');
            
            if (queryAdults) queryAdults.addEventListener('change', () => updateTotalPrice());
            if (queryChildren) queryChildren.addEventListener('change', () => updateTotalPrice());
            
            // Initialize price calculation
            updateTotalPrice();
          });
          
          
                // Event listeners for price updates
                document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
                document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
                
                // Promo code application
                document.getElementById('applyPromoBtn').addEventListener('click', (e) => {
                  e.preventDefault();
                
                  const promoCode = document.getElementById('promoCode').value.trim();
                  if (!promoCode) return;
                  
                  validatePromoCode(promoCode, baseSubtotal);
                });
                
                // Form submission handler
                // document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
                //   e.preventDefault();
                  
                //   const form = e.target;
                //   const submitButton = document.getElementById('proceedBtn');
                //   const loadingMessage = document.getElementById('loadingMessage');
                  
                //   // Show loading state
                //   submitButton.style.display = 'none';
                //   loadingMessage.style.display = 'block';
                  
                //   // Collect form data
                //   const formData = {
                //     tourId: selectedTour._id,
                //     tourTitle: selectedTour.title,
                //     name: document.getElementById('queryName').value,
                //     email: document.getElementById('queryEmail').value,
                //     phone: document.getElementById('queryPhone').value,
                //     travelDate: document.getElementById('queryTravelDate').value,
                //     adults: parseInt(document.getElementById('queryAdults').value),
                //     children: parseInt(document.getElementById('queryChildren').value),
                //     infants: parseInt(document.getElementById('queryInfants').value),
                //     message: document.getElementById('queryMessage').value,
                //     subtotal: window.calculatedSubtotal,
                //     discount: window.calculatedDiscount,
                //     totalPrice: window.calculatedTotalPrice,
                //     promoCode: promoCodeData ? promoCodeData.code : null,
                //     termsAgreed: document.getElementById('queryTerms').checked
                //   };
                  
                //   try {
                //     const response = await fetch('http://localhost:5000/api/tour-queries', {
                //       method: 'POST',
                //       headers: {
                //         'Content-Type': 'application/json',
                //         ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                //       },
                //       body: JSON.stringify(formData)
                //     });
                    
                //     const result = await response.json();
          
                //     if (response.ok) {
                //       // Redirect to payment page or show success message
                      
                //       // window.location.href = `/booking/payment/${result.bookingId}`;
                //     } else {
                //       // Show error message
                //       loadingMessage.style.display = 'none';
                //       submitButton.style.display = 'block';
                      
                //       alert(result.message || 'Failed to create booking. Please try again.');
                //     }
                //   } catch (error) {
                //     console.error('Booking error:', error);
                //     loadingMessage.style.display = 'none';
                //     submitButton.style.display = 'block';
                    
                //     alert('An error occurred. Please check your connection and try again.');
                //   }
                // });
                // Form submission handler
          document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const form = e.target;
            const submitButton = document.getElementById('proceedBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            
            // Show loading state
            submitButton.style.display = 'none';
            loadingMessage.style.display = 'block';
            
            // Collect form data
            const formData = {
              tourId: selectedTour._id,
              tourTitle: selectedTour.title,
              name: document.getElementById('queryName').value,
              email: document.getElementById('queryEmail').value,
              phone: document.getElementById('queryPhone').value,
              travelDate: document.getElementById('queryTravelDate').value,
              adults: parseInt(document.getElementById('queryAdults').value),
              children: parseInt(document.getElementById('queryChildren').value),
              infants: parseInt(document.getElementById('queryInfants').value),
              message: document.getElementById('queryMessage').value,
              subtotal: window.calculatedSubtotal,
              discount: window.calculatedDiscount,
              totalPrice: window.calculatedTotalPrice,
              promoCode: promoCodeData ? promoCodeData.code : null,
              termsAgreed: document.getElementById('queryTerms').checked
            };
            
            try {
              // First, save the tour query
              const response = await fetch('http://localhost:5000/api/tour-queries', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(formData)
              });
              
              const result = await response.json();
          
              if (response.ok) {
                console.log("query saved")
                // If query was saved successfully, proceed with payment
                proceedWithPayment(
                  selectedTour, 
                  {
                    ...userData,
                    email: formData.email, // Use the email from the form
                    username: formData.name, // Use the name from the form
                    phone: formData.phone // Use the phone from the form
                  },
                  token,
                  window.calculatedTotalPrice
                );
              } else {
                // Show error message
                loadingMessage.style.display = 'none';
                submitButton.style.display = 'block';
                alert(result.message || 'Failed to create booking. Please try again.');
              }
            } catch (error) {
              console.error('Booking error:', error);
              loadingMessage.style.display = 'none';
              submitButton.style.display = 'block';
              alert('An error occurred. Please check your connection and try again.');
            } finally {
              // Always hide loading state when done (payment window will handle its own loading)
              loadingMessage.style.display = 'none';
              submitButton.style.display = 'block';
            }
          });
                // Set minimum date for travel date (today or later)
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('queryTravelDate').min = today;
                
                // Initialize price calculation
                updateTotalPrice();
                
                // Focus on first input field when modal opens
                // setTimeout(() => {
                //   const firstInput = document.getElementById('queryName');
                //   if (firstInput) firstInput.focus();
                // }, 100);
              };
          //     const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
          //       // Create modal container
          //       const modalOverlay = document.createElement('div');
          //       modalOverlay.className = 'query-form-overlay';
          //       modalOverlay.style.cssText = `
          //         position: fixed;
          //         top: 0;
          //         left: 0;
          //         width: 100%;
          //         height: 100%;
          //         background-color: rgba(0, 0, 0, 0.5);
          //         display: flex;
          //         justify-content: center;
          //         align-items: center;
          //         z-index: 1000;
          //         backdrop-filter: blur(3px);
          //         -webkit-backdrop-filter: blur(3px);
          //       `;
              
          //       // Create modal content with responsive design
          //       const modalContent = document.createElement('div');
          //       modalContent.className = 'query-form-content';
          //       modalContent.style.cssText = `
          //         background-color: white;
          //         border-radius: 12px;
          //         padding: 30px;
          //         width: 92%;
          //         max-width: 700px;
          //         max-height: 90vh;
          //         overflow-y: auto;
          //         box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          //       `;
              
          //       // Pre-fill form data if user is logged in
          //       const name = userData?.username || '';
          //       const email = userData?.email || '';
          //       const phone = userData?.phone || '';
              
          //       // Form with marketing text and responsive design
          //       modalContent.innerHTML = `
          //         <style>
          //           /* Custom Styles */
          //           .query-form-content {
          //             scrollbar-width: thin;
          //             scrollbar-color: #ddd #f5f5f5;
          //           }
          //           .query-form-content::-webkit-scrollbar {
          //             width: 6px;
          //           }
          //           .query-form-content::-webkit-scrollbar-track {
          //             background: #f5f5f5;
          //             border-radius: 10px;
          //           }
          //           .query-form-content::-webkit-scrollbar-thumb {
          //             background: #ddd;
          //             border-radius: 10px;
          //           }
                    
          //           /* Animation for price */
          //           @keyframes pricePulse {
          //             0% { transform: scale(1); }
          //             50% { transform: scale(1.05); }
          //             100% { transform: scale(1); }
          //           }
          //           .price-animation {
          //             animation: pricePulse 2s ease-in-out;
          //           }
                    
          //           /* Focus states */
          //           .form-input:focus {
          //             border-color: #FF6B00 !important;
          //             box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1) !important;
          //             outline: none !important;
          //           }
                    
          //           /* Hover states */
          //           .submit-btn:hover {
          //             transform: translateY(-2px) !important;
          //             box-shadow: 0 4px 8px rgba(255, 107, 0, 0.4) !important;
          //           }
                    
          //           /* Responsive CSS */
          //           @media (min-width: 768px) {
          //             .form-grid {
          //               grid-template-columns: 1fr 1fr 1fr !important;
          //             }
          //             .title-text {
          //               font-size: 1.7rem !important;
          //             }
          //             .subtitle-text {
          //               font-size: 1rem !important;
          //             }
          //             .price-summary {
          //               display: grid !important;
          //               grid-template-columns: 1fr 1fr !important;
          //               gap: 15px !important;
          //             }
          //             .price-total {
          //               font-size: 1.5rem !important;
          //             }
          //             .form-label {
          //               font-size: 0.9rem !important;
          //             }
          //             .form-input {
          //               padding: 12px !important;
          //               font-size: 1rem !important;
          //             }
          //           }
          //         </style>
              
          //         <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
          //           <div>
          //             <h2 class="title-text" style="margin: 0 0 5px 0; color: #333; font-size: 1.5rem; font-weight: 600;">Book Your Experience</h2>
          //             <p class="subtitle-text" style="margin: 0; color: #FF6B00; font-size: 0.9rem; font-weight: 500;">${destination.title}</p>
          //           </div>
          //           <button id="closeQueryForm" style="background: none; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: all 0.2s;">
          //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          //               <line x1="18" y1="6" x2="6" y2="18"></line>
          //               <line x1="6" y1="6" x2="18" y2="18"></line>
          //             </svg>
          //           </button>
          //         </div>
                  
          //         <!-- Price Summary Box - Enhanced and More Detailed -->
          //         <div class="price-summary-container" style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          //           <div style="background: linear-gradient(135deg, #FF6B00, #FF9800); padding: 15px; color: white;">
          //             <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Price Summary</h3>
          //             <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Transparent pricing with no hidden fees</p>
          //           </div>
                    
          //           <div style="background: #fff; padding: 20px; border: 1px solid #f0f0f0; border-top: none;">
          //             <div class="price-summary" style="display: block; margin-bottom: 15px;">
          //               <div style="margin-bottom: 12px;">
          //                 <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          //                   <span style="font-size: 0.9rem; color: #555;">Base Price (per adult)</span>
          //                   <span style="font-weight: 500; color: #333;">₹${selectedTour.price}</span>
          //                 </div>
          //                 <div id="adultPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
          //                   <span style="font-size: 0.85rem; color: #666;">Adults: <span id="adultCountDisplay">1</span></span>
          //                   <span style="font-weight: 500; color: #333;">₹<span id="adultPriceDisplay">${selectedTour.price}</span></span>
          //                 </div>
          //                 <div id="childPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
          //                   <span style="font-size: 0.85rem; color: #666;">Children: <span id="childCountDisplay">0</span> (50% off)</span>
          //                   <span style="font-weight: 500; color: #333;">₹<span id="childPriceDisplay">0</span></span>
          //                 </div>
          //               </div>
                        
          //               <div>
          //                 <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          //                   <span style="font-size: 0.9rem; color: #555;">Additional</span>
          //                   <span style="font-weight: 500; color: #333;">₹0</span>
          //                 </div>
          //                 <div style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
          //                   <span style="font-size: 0.85rem; color: #666;">Taxes & Fees</span>
          //                   <span style="font-weight: 500; color: #333;">Included</span>
          //                 </div>
          //               </div>
          //             </div>
                      
          //             <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
                      
          //             <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          //               <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
          //               <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
          //             </div>
                      
          //             <div style="margin-top: 12px; padding: 8px 12px; background: #FFF9F5; border-radius: 6px; border-left: 3px solid #FF6B00;">
          //               <p style="margin: 0; font-size: 0.8rem; color: #333;">
          //                 <span style="color: #FF6B00; font-weight: 600;">✓</span> Best price guarantee
          //                 <span style="color: #FF6B00; font-weight: 600; margin-left: 10px;">✓</span> Free cancellation up to 24 hours before
          //               </p>
          //             </div>
          //           </div>
          //         </div>
                  
          //         <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 16px;">
          //           <div class="full-span" style="grid-column: span 2;">
          //             <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Personal Information</h3>
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2;">
          //             <label for="queryName" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Full Name*</label>
          //             <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Email Address*</label>
          //             <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Phone Number*</label>
          //             <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2; margin-top: 10px;">
          //             <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Travel Details</h3>
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Travel Date*</label>
          //             <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Adults (13+ yrs)*</label>
          //             <select id="queryAdults" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          //               <option value="1">1 Adult</option>
          //               <option value="2">2 Adults</option>
          //               <option value="3">3 Adults</option>
          //               <option value="4">4 Adults</option>
          //               <option value="5">5 Adults</option>
          //               <option value="6">6 Adults</option>
          //               <option value="7">7 Adults</option>
          //               <option value="8">8 Adults</option>
          //             </select>
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Children (5-12 yrs)</label>
          //             <select id="queryChildren" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          //               <option value="0">0 Children</option>
          //               <option value="1">1 Child</option>
          //               <option value="2">2 Children</option>
          //               <option value="3">3 Children</option>
          //               <option value="4">4 Children</option>
          //               <option value="5">5 Children</option>
          //             </select>
          //           </div>
                    
          //           <div style="grid-column: span 1;">
          //             <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Infants (0-4 yrs)</label>
          //             <select id="queryInfants" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          //               <option value="0">0 Infants</option>
          //               <option value="1">1 Infant</option>
          //               <option value="2">2 Infants</option>
          //               <option value="3">3 Infants</option>
          //             </select>
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2;">
          //             <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Special Requirements or Questions</label>
          //             <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; resize: none;" placeholder="Dietary requirements, accessibility needs, or any questions..."></textarea>
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2; margin: 8px 0 12px;">
          //             <label style="display: flex; align-items: flex-start; cursor: pointer;">
          //               <input type="checkbox" id="queryTerms" required style="margin-right: 10px; margin-top: 3px; min-width: 16px; height: 16px; accent-color: #FF6B00;">
          //               <span style="font-size: 0.85rem; color: #555;">I agree to receive updates via email and WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none; font-weight: 500;">Terms & Conditions</a>*</span>
          //             </label>
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 10px;">
          //             <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 12px 0; width: 70%; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 3px 6px rgba(255, 107, 0, 0.3); transition: all 0.3s ease;">
          //               Continue to Secure Checkout
          //             </button>
                      
          //             <!-- Loading state message -->
          //             <div id="loadingMessage" style="display: none; margin-top: 15px;">
          //               <div style="display: flex; align-items: center; justify-content: center;">
          //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
          //                   <style>
          //                     @keyframes rotate {
          //                       0% { transform: rotate(0deg); }
          //                       100% { transform: rotate(360deg); }
          //                     }
          //                   </style>
          //                   <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          //                   <path d="M12 2a10 10 0 0 1 10 10"></path>
          //                 </svg>
          //                 <span style="margin-left: 10px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">Processing your booking...</span>
          //               </div>
          //             </div>
          //           </div>
                    
          //           <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 16px;">
          //             <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
          //               <div style="display: flex; align-items: center; gap: 6px;">
          //                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          //                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          //                   <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          //                 </svg>
          //                 <span style="font-size: 0.8rem; color: #555;">Secure Payment</span>
          //               </div>
                        
          //               <div style="display: flex; align-items: center; gap: 6px;">
          //                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          //                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          //                 </svg>
          //                 <span style="font-size: 0.8rem; color: #555;">100% Safe</span>
          //               </div>
                        
          //               <div style="display: flex; align-items: center; gap: 6px;">
          //                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          //                   <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          //                 </svg>
          //                 <span style="font-size: 0.8rem; color: #555;">24/7 Support</span>
          //               </div>
          //             </div>
          //           </div>
          //         </form>
          //       `;
              
          //       // Append modal to body
          //       modalOverlay.appendChild(modalContent);
          //       document.body.appendChild(modalOverlay);
              
          //       // Close modal functionality with improved animation
          //       document.getElementById('closeQueryForm').addEventListener('click', () => {
          //         modalOverlay.style.opacity = '0';
          //         modalContent.style.transform = 'scale(0.9)';
          //         modalContent.style.transition = 'transform 0.2s ease';
          //         modalOverlay.style.transition = 'opacity 0.2s ease';
                  
          //         setTimeout(() => {
          //           document.body.removeChild(modalOverlay);
          //         }, 200);
          //       });
              
          //       // Enhanced price calculation function with animations
          //       const updateTotalPrice = () => {
          //         const basePrice = selectedTour.price;
          //         const adults = parseInt(document.getElementById('queryAdults').value || 1);
          //         const children = parseInt(document.getElementById('queryChildren').value || 0);
                  
          //         // Update display counts
          //         document.getElementById('adultCountDisplay').textContent = adults;
          //         document.getElementById('childCountDisplay').textContent = children;
                  
          //         // Adults pay full price, children pay half price
          //         const childrenPrice = basePrice * 0.5 * children;
          //         const adultsPrice = basePrice * adults;
                  
          //         // Update price displays with formatting
          //         document.getElementById('adultPriceDisplay').textContent = (adultsPrice).toLocaleString();
          //         document.getElementById('childPriceDisplay').textContent = (childrenPrice).toLocaleString();
                  
          //         const totalPrice = adultsPrice + childrenPrice;
                  
          //         // Apply animation by removing and re-adding the class
          //         const totalPriceElement = document.getElementById('totalPriceDisplay');
          //         totalPriceElement.classList.remove('price-animation');
                  
          //         // Trigger reflow to restart animation
          //         void totalPriceElement.offsetWidth;
                  
          //         totalPriceElement.textContent = '₹' + totalPrice.toLocaleString();
          //         totalPriceElement.classList.add('price-animation');
                  
          //         // Store the calculated price to use in the booking process
          //         window.calculatedTotalPrice = totalPrice;
          //       };
              
          //       // Add event listeners for price updates
          //       document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
          //       document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
                
          //       // Initialize price calculation
          //       updateTotalPrice();
              
          //       // Set minimum date for travel date to tomorrow
          //       const tomorrow = new Date();
          //       tomorrow.setDate(tomorrow.getDate() + 1);
          //       const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
          //       document.getElementById('queryTravelDate').setAttribute('min', tomorrowFormatted);
              
          //       // Form submission handler with improved UX feedback
          //       document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
          //         e.preventDefault();
                  
          //         // Show loading state
          //         const proceedBtn = document.getElementById('proceedBtn');
          //         const loadingMessage = document.getElementById('loadingMessage');
          //         proceedBtn.disabled = true;
          //         proceedBtn.style.opacity = '0.7';
          //         proceedBtn.style.transform = 'none';
          //         proceedBtn.textContent = 'Processing...';
          //         loadingMessage.style.display = 'block';
                  
          //         // Get values from form
          //         const adults = document.getElementById('queryAdults').value;
          //         const children = document.getElementById('queryChildren').value;
          //         const infants = document.getElementById('queryInfants').value;
                  
          //         // Make sure to get the most up-to-date calculated price
          //         updateTotalPrice();
                  
          //         const formData = {
          //           name: document.getElementById('queryName').value,
          //           email: document.getElementById('queryEmail').value,
          //           phone: document.getElementById('queryPhone').value,
          //           travelDate: document.getElementById('queryTravelDate').value,
          //           adults: adults,
          //           children: children,
          //           infants: infants,
          //           totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
          //           message: document.getElementById('queryMessage').value,
          //           tourTitle: selectedTour.title,
          //           tourPrice: selectedTour.price,
          //           calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
          //           termsAccepted: document.getElementById('queryTerms').checked
          //         };
              
          //         // Enhanced form validation with field-specific feedback
          //         let isValid = true;
          //         let errorFields = [];
                  
          //         // Basic form validation
          //         if (!formData.name) {
          //           isValid = false;
          //           errorFields.push('Full Name');
          //           document.getElementById('queryName').style.borderColor = '#ff4d4f';
          //         }
                  
          //         if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
          //           isValid = false;
          //           errorFields.push('Email Address');
          //           document.getElementById('queryEmail').style.borderColor = '#ff4d4f';
          //         }
                  
          //         if (!formData.phone) {
          //           isValid = false;
          //           errorFields.push('Phone Number');
          //           document.getElementById('queryPhone').style.borderColor = '#ff4d4f';
          //         }
                  
          //         if (!formData.travelDate) {
          //           isValid = false;
          //           errorFields.push('Travel Date');
          //           document.getElementById('queryTravelDate').style.borderColor = '#ff4d4f';
          //         }
                  
          //         if (!formData.termsAccepted) {
          //           isValid = false;
          //           errorFields.push('Terms & Conditions');
          //           document.getElementById('queryTerms').parentNode.style.color = '#ff4d4f';
          //         }
                  
          //         if (!isValid) {
          //           // Alert with specific fields that need attention
          //           alert(`Please fill in all required fields: ${errorFields.join(', ')}`);
                    
          //           // Reset button state
          //           proceedBtn.disabled = false;
          //           proceedBtn.style.opacity = '1';
          //           proceedBtn.textContent = 'Continue to Secure Checkout';
          //           loadingMessage.style.display = 'none';
          //           return;
          //         }
              
          //         try {
          //           // 1. Send to backend API
          //           try {
          //             await axios.post('http://localhost:5000/api/tour-queries', formData);
          //             console.log('✅ Query saved to database');
          //           } catch (error) {
          //             console.error('❌ Error saving query:', error);
          //             // Continue with the booking process even if the query saving fails
          //           }
              
          //           // 2. Send to WhatsApp in the background
          //           sendWhatsAppInBackground(formData);
                    
          //           // Create/update userData object with form data
          //           const updatedUserData = {
          //             username: formData.name,
          //             email: formData.email,
          //             phone: formData.phone
          //           };
                    
          //           // Add a slightly longer delay for better UX
          //           setTimeout(() => {
          //             // Close the modal with animation
          //             modalOverlay.style.opacity = '0';
          //             modalContent.style.transform = 'scale(0.9)';
          //             modalContent.style.transition = 'transform 0.3s ease';
          //             modalOverlay.style.transition = 'opacity 0.3s ease';
                      
          //             setTimeout(() => {
          //               document.body.removeChild(modalOverlay);
                        
          //               // Proceed with payment - using either existing userData (if logged in) or form data
          //               proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
          //             }, 300);
          //           }, 1800);
                    
          //         } catch (error) {
          //           console.error('🚨 Error processing query:', error);
                    
          //           // Show error message with retry option
          //           loadingMessage.innerHTML = `
          //             <div style="display: flex; align-items: center; justify-content: center; color: #ff4d4f; margin-top: 10px;">
          //               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          //                 <circle cx="12" cy="12" r="10"></circle>
          //                 <line x1="12" y1="8" x2="12" y2="12"></line>
          //                 <line x1="12" y1="16" x2="12.01" y2="16"></line>
          //               </svg>
          //               // <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
          // <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
          //         </div>
          //       `;
                
          //       // Reset button state
          //       proceedBtn.disabled = false;
          //       proceedBtn.style.opacity = '1';
          //       proceedBtn.textContent = 'Continue to Secure Checkout';
          //     }
          //   });
          
          //   // Function to send WhatsApp notification in the background
          //   const sendWhatsAppInBackground = (formData) => {
          //     try {
          //       // Format the WhatsApp message
          //       const message = `*New Booking Request*\n\n*Tour:* ${formData.tourTitle}\n*Date:* ${formData.travelDate}\n*Guests:* ${formData.adults} Adults, ${formData.children} Children, ${formData.infants} Infants\n*Total:* ₹${formData.calculatedPrice}\n\n*From:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\n*Message:* ${formData.message || 'None'}`;
                
          //       // Send to WhatsApp API
          //       const adminNumber = '+919876543210'; // Replace with actual admin number
          //       const encodedMessage = encodeURIComponent(message);
          //       const whatsappLink = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`;
                
          //       // Use fetch with no-cors mode to avoid CORS issues
          //       fetch(whatsappLink, { mode: 'no-cors' })
          //         .then(() => console.log('✅ WhatsApp notification sent'))
          //         .catch(error => console.error('⚠️ WhatsApp notification error:', error));
                
          //     } catch (error) {
          //       console.error('❌ Error sending WhatsApp notification:', error);
          //       // Fail silently - this should not interrupt the booking process
          //     }
          //   };
          // };
    
              
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

              return (
                <div id="destinations" className="z-50 fixed inset-0 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/70" onClick={onClose} />
              
                  {/* Modal Container */}
                  <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="flex flex-col md:flex-row overflow-hidden">
                      {/* Image Section - Further reduced height on mobile */}
                      <div className="md:w-2/5 relative h-40 md:h-auto">
                        <img
                        src={destination.image}

                          // src={`https://backend-1-7zwm.onrender.com${destination.image}`}
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
              
                      {/* Content Section - With scrollable area and fixed buttons */}
                      <div className="md:w-3/5 flex flex-col overflow-hidden">
                        {/* Scrollable Content Area */}
                        <div className="p-4 overflow-y-auto flex-grow pb-20">
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
              
                            {/* Tab Content */}
                            <div className="mt-3">
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
              
                              {activeTab === 'itinerary' && (
                                <div className="space-y-3">
                                  {destination.itinerary && destination.itinerary.length > 0 ? (
                                    destination.itinerary.map((day, index) => (
                                      <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                                        <h3 className="text-sm font-semibold text-gray-800">Day {day.day}: {day.title}</h3>
                                        {day.activities && day.activities.length > 0 ? (
                                          <ul className="mt-1 space-y-1">
                                            {day.activities.map((activity, idx) => (
                                              <li key={idx} className="text-xs text-gray-600">{activity}</li>
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
                        </div>
              
                        {/* Fixed Buttons at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100 shadow-md">
                          <div className="flex gap-x-4">
                            <button
                              onClick={handleBookNow3}
                              className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
                            >
                              Book Now
                            </button>
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
                </div>
              );
              // return (
              //   <div  id="destinations" className=" z-50 fixed inset-0 flex items-center justify-center p-4">
              //     {/* Backdrop */}
              //     <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            
              //     {/* Modal Container */}
                  
              //     <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
              //       <div className="flex flex-col md:flex-row">
              //         {/* Image Section */}
              //         <div className="md:w-2/5 relative h-52 md:h-auto">
              //           <img
              //             // src={destination.image || "/api/placeholder/400/320"}
              //             src={`https://backend-1-7zwm.onrender.com${destination.image}`}
              //             alt={destination.title || "Destination"}
              //             className="h-full w-full object-cover md:rounded-l-lg"
              //           />
              //           <button
              //             onClick={onClose}
              //             className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
              //           >
              //             <X className="h-4 w-4" />
              //           </button>
              //           <div className="absolute bottom-3 right-3 flex space-x-1.5">
              //             <button 
              //               onClick={() => setIsFavorite(!isFavorite)}
              //               className="rounded-full bg-white/90 p-1.5 hover:bg-white"
              //             >
              //               <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              //             </button>
              //             <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
              //               <Share2 className="h-4 w-4 text-gray-700" />
              //             </button>
              //           </div>
              //         </div>
            
              //         {/* Content Section */}
              //         <div className="md:w-3/5 p-4">
              //           <div className="flex items-center justify-between">
              //             <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
              //             <div className="flex items-center space-x-1">
              //               <Star className="h-4 w-4 fill-current text-yellow-500" />
              //               <span className="font-semibold">{destination.rating?.toFixed(1) || '4.5'}</span>
              //               <span className="text-xs text-gray-500">({destination.reviews || '0'})</span>
              //             </div>
              //           </div>
            
              //           {/* Location and Price */}
              //           <div className="mt-2 flex items-center justify-between">
              //             <div className="flex items-center text-sm text-gray-600">
              //               <MapPin className="mr-1 h-4 w-4 text-orange-500" />
              //               <span>{destination.tourDetails?.location || 'Location'}</span>
              //             </div>
              //             <div className="text-lg font-bold text-orange-500">
              //               {/* {hasValidPriceData() ? formatPrice(destination.tourDetails.price) : '₹0'} */}
              //               {destination.tourDetails.price}
              //               <span className="text-xs text-gray-500">/person</span>
              //               {calculateDiscount() > 0 && (
              //                 <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              //                   {calculateDiscount()}% OFF
              //                 </span>
              //               )}
              //             </div>
              //           </div>
            
              //           {/* Tour Details Row */}
              //           <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
              //             <div className="flex items-center">
              //               <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
              //               {destination.tourDetails?.duration || 'Duration'}
              //             </div>
              //             <div className="flex items-center">
              //               <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
              //               Max {destination.tourDetails?.groupSize || 'Group Size'}
              //             </div>
              //             <div className="flex items-center">
              //               <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
              //               {destination.tourDetails?.language || 'English'}
              //             </div>
              //           </div>
            
              //           {/* Tabs - Horizontal Pills */}
              //           <div className="mt-3">
              //             <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
              //               <button
              //               //  onClick={() => handleTabChange('overview')}
              //                 onClick={() => setActiveTab('overview')}
              //                 // onClick={() => handleTabClick('overview')}
              //                 className={`px-3 py-1 rounded-full whitespace-nowrap ${
              //                   activeTab === 'overview'
              //                     ? 'bg-orange-500 text-white'
              //                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              //                 }`}
              //               >
              //                 Overview
              //               </button>
              //               <button
              //                 onClick={() => setActiveTab('itinerary')}
              //                 // onClick={() => handleTabClick('itinerary')}
              //                 className={`px-3 py-1 rounded-full whitespace-nowrap ${
              //                   activeTab === 'itinerary'
              //                     ? 'bg-orange-500 text-white'
              //                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              //                 }`}
              //               >
              //                 Itinerary
              //               </button>
              //               <button
              //                 // onClick={() => handleTabClick('inclusions')}
              //                 onClick={() => setActiveTab('inclusions')}
              //                 className={`px-3 py-1 rounded-full whitespace-nowrap ${
              //                   activeTab === 'inclusions'
              //                     ? 'bg-orange-500 text-white'
              //                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              //                 }`}
              //               >
              //                 What's Included
              //               </button>
              //             </div>
            
              //             {/* Tab Content - Scrollable container */}
              //             <div className="mt-3 overflow-y-auto max-h-56">
              //               {/* Overview Tab */}
              //               {activeTab === 'overview' && (
              //                 <div className="space-y-3">
              //                   <p className="text-sm text-gray-600 leading-relaxed">
              //                     {destination.description || 'No description available.'}
              //                   </p>
                                
              //                   <div className="mt-2">
              //                     <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
              //                     <ul className="mt-1 space-y-1">
              //                       {destination.details && destination.details.length > 0 ? (
              //                         destination.details.map((detail, index) => (
              //                           <li key={index} className="flex items-start text-xs text-gray-600">
              //                             <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
              //                               <Check className="h-2 w-2" />
              //                             </span>
              //                             {detail}
              //                           </li>
              //                         ))
              //                       ) : (
              //                         <li className="text-xs text-gray-600">No highlights available.</li>
              //                       )}
              //                     </ul>
              //                   </div>
              //                 </div>
              //               )}
            
              //               {/* Itinerary Tab */}
              //               {activeTab === 'itinerary' && (
              //                 <div className="space-y-3">
              //                   {destination.itinerary && destination.itinerary.length > 0 ? (
              //                     destination.itinerary.map((day, index) => (
              //                       <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
              //                         <h3 className="text-sm font-semibold text-gray-800">Day {day.day}: {day.title}</h3>
              //                         {day.activities && day.activities.length > 0 ? (
              //                           <ul className="mt-1 space-y-1">
              //                             {day.activities.map((activity, idx) => (
              //                               <li key={idx} className="flex items-start text-xs text-gray-600">
              //                                 <Check className="mr-1.5 h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
              //                                 {activity}
              //                               </li>
              //                             ))}
              //                           </ul>
              //                         ) : (
              //                           <p className="mt-1 text-xs text-gray-600">No activities specified for this day.</p>
              //                         )}
              //                         {day.meals && day.meals.length > 0 && (
              //                           <p className="mt-1 text-xs text-gray-600">
              //                             <span className="font-medium">Meals:</span> {day.meals.join(', ')}
              //                           </p>
              //                         )}
              //                       </div>
              //                     ))
              //                   ) : (
              //                     <p className="text-xs text-gray-600">Detailed itinerary will be provided upon booking.</p>
              //                   )}
              //                 </div>
              //               )}
            
              //               {/* Inclusions Tab */}
              //               {activeTab === 'inclusions' && (
              //                 <div className="grid grid-cols-1 gap-3">
              //                   <div>
              //                     <h3 className="text-sm font-semibold text-gray-800">Included</h3>
              //                     <ul className="mt-1 space-y-1">
              //                       {destination.tourDetails?.inclusions && destination.tourDetails.inclusions.length > 0 ? (
              //                         destination.tourDetails.inclusions.map((item, index) => (
              //                           <li key={index} className="flex items-start text-xs text-gray-600">
              //                             <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              //                             {item}
              //                           </li>
              //                         ))
              //                       ) : (
              //                         <li className="text-xs text-gray-600">No inclusions specified.</li>
              //                       )}
              //                     </ul>
              //                   </div>
              //                   <div>
              //                     <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
              //                     <ul className="mt-1 space-y-1">
              //                       {destination.tourDetails?.notIncluded && destination.tourDetails.notIncluded.length > 0 ? (
              //                         destination.tourDetails.notIncluded.map((item, index) => (
              //                           <li key={index} className="flex items-start text-xs text-gray-600">
              //                             <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
              //                             {item}
              //                           </li>
              //                         ))
              //                       ) : (
              //                         <li className="text-xs text-gray-600">No exclusions specified.</li>
              //                       )}
              //                     </ul>
              //                   </div>
              //                 </div>
              //               )}
              //             </div>
              //           </div>
            
              //           {/* Action Buttons */}
              //           <div className="mt-4 flex gap-x-4">
              //             {/* Book Now Button */}
              //             <button 
              //               onClick={handleBookNow3} 
              //               className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
              //             >
              //               Book Now
              //             </button>
            
              //             {/* Get Quote Button (Outlined) */}
              //             <button 
              //               onClick={handleGetQuote} 
              //               className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
              //             >
              //               Get Quote
              //             </button>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // );
        // return (
        //   <div id="destinations" className="z-50 fixed inset-0 flex items-center justify-center p-4">
        //     {/* Backdrop */}
        //     <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      
        //     {/* Modal Container */}
        //     <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-hidden">
        //       <div className="flex flex-col md:flex-row h-full">
        //         {/* Image Section */}
        //         <div className="md:w-2/5 relative h-52 md:h-auto">
        //           <img
        //             src={`https://backend-1-7zwm.onrender.com${destination.image}`}
        //             alt={destination.title || "Destination"}
        //             className="h-full w-full object-cover md:rounded-l-lg"
        //           />
        //           <button
        //             onClick={onClose}
        //             className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
        //           >
        //             <X className="h-4 w-4" />
        //           </button>
        //           <div className="absolute bottom-3 right-3 flex space-x-1.5">
        //             <button 
        //               onClick={() => setIsFavorite(!isFavorite)}
        //               className="rounded-full bg-white/90 p-1.5 hover:bg-white"
        //             >
        //               <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        //             </button>
        //             <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
        //               <Share2 className="h-4 w-4 text-gray-700" />
        //             </button>
        //           </div>
        //         </div>
      
        //         {/* Content Section */}
        //         <div className="md:w-3/5 flex flex-col h-full overflow-hidden">
        //           <div className="p-4 border-b border-gray-100">
        //             <div className="flex items-center justify-between">
        //               <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
        //               <div className="flex items-center space-x-1">
        //                 <Star className="h-4 w-4 fill-current text-yellow-500" />
        //                 <span className="font-semibold">{destination.rating?.toFixed(1) || '4.5'}</span>
        //                 <span className="text-xs text-gray-500">({destination.reviews || '0'})</span>
        //               </div>
        //             </div>
      
        //             {/* Location and Price */}
        //             <div className="mt-2 flex items-center justify-between">
        //               <div className="flex items-center text-sm text-gray-600">
        //                 <MapPin className="mr-1 h-4 w-4 text-orange-500" />
        //                 <span>{destination.tourDetails?.location || 'Location'}</span>
        //               </div>
        //               <div className="text-lg font-bold text-orange-500">
        //                 {formatPrice(destination.tourDetails?.price)}
        //                 <span className="text-xs text-gray-500">/person</span>
        //                 {calculateDiscount() > 0 && (
        //                   <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
        //                     {calculateDiscount()}% OFF
        //                   </span>
        //                 )}
        //               </div>
        //             </div>
      
        //             {/* Tour Details Row */}
        //             <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
        //               <div className="flex items-center">
        //                 <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
        //                 {destination.tourDetails?.duration || 'Duration'}
        //               </div>
        //               <div className="flex items-center">
        //                 <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
        //                 Max {destination.tourDetails?.groupSize || 'Group Size'}
        //               </div>
        //               <div className="flex items-center">
        //                 <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
        //                 {destination.tourDetails?.language || 'English'}
        //               </div>
        //             </div>
      
        //             {/* Tabs - Horizontal Pills */}
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
        //                   onClick={() => setActiveTab('inclusions')}
        //                   className={`px-3 py-1 rounded-full whitespace-nowrap ${
        //                     activeTab === 'inclusions'
        //                       ? 'bg-orange-500 text-white'
        //                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        //                   }`}
        //                 >
        //                   What's Included
        //                 </button>
        //               </div>
        //             </div>
        //           </div>
      
        //           {/* Tab Content - Scrollable container with fixed scroll handling */}
                 
      
        //             {/* Overview Tab */}
        //             {activeTab === 'overview' && (
        //               <div className="space-y-3 min-h-full">
        //                 <p className="text-sm text-gray-600 leading-relaxed">
        //                   {destination.description || 'No description available.'}
        //                 </p>
                        
        //                 <div className="mt-2">
        //                   <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
        //                   <ul className="mt-1 space-y-1">
        //                     {destination.details && destination.details.length > 0 ? (
        //                       destination.details.map((detail, index) => (
        //                         <li key={index} className="flex items-start text-xs text-gray-600">
        //                           <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
        //                             <Check className="h-2 w-2" />
        //                           </span>
        //                           {detail}
        //                         </li>
        //                       ))
        //                     ) : (
        //                       <li className="text-xs text-gray-600">No highlights available.</li>
        //                     )}
        //                   </ul>
        //                 </div>
        //               </div>
        //             )}
      
        //             {/* Itinerary Tab */}
        //             {activeTab === 'itinerary' && (
        //               <div className="space-y-3 min-h-full">
        //                 {destination.itinerary && destination.itinerary.length > 0 ? (
        //                   destination.itinerary.map((day, index) => (
        //                     <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
        //                       <h3 className="text-sm font-semibold text-gray-800">Day {day.day}: {day.title}</h3>
        //                       {day.activities && day.activities.length > 0 ? (
        //                         <ul className="mt-1 space-y-1">
        //                           {day.activities.map((activity, idx) => (
        //                             <li key={idx} className="flex items-start text-xs text-gray-600">
        //                               <Check className="mr-1.5 h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
        //                               {activity}
        //                             </li>
        //                           ))}
        //                         </ul>
        //                       ) : (
        //                         <p className="mt-1 text-xs text-gray-600">No activities specified for this day.</p>
        //                       )}
        //                       {day.meals && day.meals.length > 0 && (
        //                         <p className="mt-1 text-xs text-gray-600">
        //                           <span className="font-medium">Meals:</span> {day.meals.join(', ')}
        //                         </p>
        //                       )}
        //                     </div>
        //                   ))
        //                 ) : (
        //                   <p className="text-xs text-gray-600">Detailed itinerary will be provided upon booking.</p>
        //                 )}
        //               </div>
        //             )}
      
        //             {/* Inclusions Tab */}
        //             {activeTab === 'inclusions' && (
        //               <div className="grid grid-cols-1 gap-3 min-h-full">
        //                 <div>
        //                   <h3 className="text-sm font-semibold text-gray-800">Included</h3>
        //                   <ul className="mt-1 space-y-1">
        //                     {destination.tourDetails?.inclusions && destination.tourDetails.inclusions.length > 0 ? (
        //                       destination.tourDetails.inclusions.map((item, index) => (
        //                         <li key={index} className="flex items-start text-xs text-gray-600">
        //                           <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
        //                           {item}
        //                         </li>
        //                       ))
        //                     ) : (
        //                       <li className="text-xs text-gray-600">No inclusions specified.</li>
        //                     )}
        //                   </ul>
        //                 </div>
        //                 <div>
        //                   <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
        //                   <ul className="mt-1 space-y-1">
        //                     {destination.tourDetails?.notIncluded && destination.tourDetails.notIncluded.length > 0 ? (
        //                       destination.tourDetails.notIncluded.map((item, index) => (
        //                         <li key={index} className="flex items-start text-xs text-gray-600">
        //                           <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
        //                           {item}
        //                         </li>
        //                       ))
        //                     ) : (
        //                       <li className="text-xs text-gray-600">No exclusions specified.</li>
        //                     )}
        //                   </ul>
        //                 </div>
        //               </div>
        //             )}
        //           </div>
      
        //           {/* Action Buttons */}
        //           <div className="p-4 border-t border-gray-100 mt-auto">
        //             <div className="flex gap-x-4">
        //               {/* Book Now Button */}
        //               <button onClick={handleBookNow3}
        //                 className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
        //               >
        //                 Book Now
        //               </button>
      
        //               {/* Get Quote Button (Outlined) */}
        //               <button onClick={handleGetQuote}
        //                 className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
        //               >
        //                 Get Quote
        //               </button>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
       
        // );
      };
   
      useEffect(() => {
        console.log("Destinations rendered with:", {
          filteredDestinations: filteredDestinations.length, 
          visibleDestinations: visibleDestinations.length,
          currentIndex, 
          isMobile
        });
      }, []); 
  
    return (
      <div id="destinations" className=" overflow-hidden container mx-auto p-4 w-full max-w-7xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isAllDestinationsPage ? 'All Destinations' : 'Popular Destinations'}
          </h2>
          {filteredDestinations.length > (isMobile ? 1 : 3) && (
            <button
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
                       hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
              onClick={() => setIsAllDestinationsPage(!isAllDestinationsPage)}
            >
              {isAllDestinationsPage ? "Show Less" : "View All"} <span className="arrow-icon text-lg">→</span>
            </button>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-orange-200 mb-6">
          <button id='top-destinations'
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
            onClick={() => handleTabChange('top')}
          >
            Top Destinations
          </button>
          <button id='food-destinations'
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
            onClick={() => handleTabChange('food')}
          >
            Food Destinations
          </button>
          <button id='ancient-destinations'
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
                    key={destination.id || `grid-dest-${index}`}
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
                {isMobile && filteredDestinations[currentIndex] && (
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
        {isModalOpen && selectedDestination && (
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

      // const handleGetQuote = () => {