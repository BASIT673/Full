import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
// Sample authentication check - replace with your actual auth logic
const useAuth = () => {
  // This would typically connect to your authentication context/provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  // Simulate checking auth status
  useEffect(() => {
    // Replace with actual auth check
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  return { isLoggedIn, user };
};

const TripPlanner = () => {
  // Refs
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();
  // Auth state
  const { isLoggedIn, user } = useAuth();
  const goBack = () => {
    navigate("/");
  };
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [availablePackages, setAvailablePackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Form data
  const [tripDetails, setTripDetails] = useState({
    destination: 'Srinagar',
    startDate: format(new Date().setDate(new Date().getDate() + 30), 'yyyy-MM-dd'),
    endDate: format(new Date().setDate(new Date().getDate() + 37), 'yyyy-MM-dd'),
    travelers: 2,
    adults: 2,
    children: 0,
    accommodation: 'hotel',
    hotelClass: 'deluxe',
    activities: [],
    transportation: 'private',
    specialRequirements: '',
    budget: 'flexible',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || '',
    newsletter: true,
  });
  
  const kashmirDestinations = [
    { id: 'srinagar', name: 'Srinagar', description: 'The summer capital of Jammu and Kashmir', image: '/images/srinagar.jpg' },
    { id: 'gulmarg', name: 'Gulmarg', description: 'Famous for skiing and the world\'s highest gondola', image: '/images/gulmarg.jpg' },
    { id: 'pahalgam', name: 'Pahalgam', description: 'Valley of Shepherds with breathtaking views', image: '/images/pahalgam.jpg' },
    { id: 'sonamarg', name: 'Sonamarg', description: 'The Meadow of Gold with stunning glaciers', image: '/images/sonamarg.jpg' },
    { id: 'dachigam', name: 'Dachigam', description: 'National park known for the Hangul deer', image: '/images/dachigam.jpg' },
    { id: 'mughalGardens', name: 'Mughal Gardens', description: 'Historic gardens from the Mughal era', image: '/images/mughal.jpg' },
    { id: 'wularLake', name: 'Wular Lake', description: 'One of Asia\'s largest freshwater lakes', image: '/images/wular.jpg' },
    { id: 'leh', name: 'Leh', description: 'High-altitude desert city with Buddhist influences', image: '/images/leh.jpg' },
  ];
  
  const accommodationTypes = [
    { id: 'hotel', name: 'Hotel', icon: '🏨' },
    { id: 'resort', name: 'Resort', icon: '🌄' },
    { id: 'houseboat', name: 'Houseboat', icon: '⛵' },
    { id: 'homestay', name: 'Homestay', icon: '🏡' },
    { id: 'camp', name: 'Luxury Camp', icon: '⛺' },
  ];
  
  const hotelClasses = [
    { id: 'budget', name: 'Budget', description: 'Comfortable accommodation with basic amenities' },
    { id: 'standard', name: 'Standard', description: 'Good quality hotels with additional facilities' },
    { id: 'deluxe', name: 'Deluxe', description: 'Premium hotels with excellent service and amenities' },
    { id: 'luxury', name: 'Luxury', description: 'Top-tier luxury hotels and resorts with exceptional service' },
  ];
  
  const activities = [
    { id: 'trekking', name: 'Trekking', icon: '🥾' },
    { id: 'boating', name: 'Shikara Boat Rides', icon: '🚣' },
    { id: 'skiing', name: 'Skiing', icon: '⛷️' },
    { id: 'wildlife', name: 'Wildlife Safari', icon: '🦌' },
    { id: 'cultural', name: 'Cultural Tours', icon: '🏛️' },
    { id: 'shopping', name: 'Shopping Tours', icon: '🛍️' },
    { id: 'photography', name: 'Photography Tours', icon: '📸' },
    { id: 'golfing', name: 'Golfing', icon: '⛳' },
    { id: 'paragliding', name: 'Paragliding', icon: '🪂' },
    { id: 'fishing', name: 'Fishing', icon: '🎣' },
  ];
  
  const transportationOptions = [
    { id: 'private', name: 'Private Car with Driver', icon: '🚗' },
    { id: 'shared', name: 'Shared Transfers', icon: '🚐' },
    { id: 'rental', name: 'Self-Drive Rental', icon: '🔑' },
    { id: 'public', name: 'Public Transport', icon: '🚌' },
    { id: 'premium', name: 'Premium SUV Service', icon: '🏎️' },
  ];
  
  const budgetOptions = [
    { id: 'budget', name: 'Budget-friendly', range: '₹10,000 - ₹20,000 per person' },
    { id: 'midRange', name: 'Mid-range', range: '₹20,000 - ₹40,000 per person' },
    { id: 'luxury', name: 'Luxury', range: '₹40,000 - ₹70,000 per person' },
    { id: 'ultraLuxury', name: 'Ultra Luxury', range: '₹70,000+ per person' },
    { id: 'flexible', name: 'Flexible', range: 'Customize based on preferences' },
  ];
  
  // Sample packages - in a real app, these would come from your API
  const packageData = [
    {
      id: 'classic',
      name: 'Classic Kashmir',
      duration: 7,
      price: 25000,
      description: 'Experience the best of Kashmir with this classic tour package',
      highlights: ['Srinagar', 'Dal Lake Houseboat Stay', 'Gulmarg Excursion', 'Pahalgam Visit'],
      image: '/images/package-classic.jpg'
    },
    {
      id: 'adventure',
      name: 'Kashmir Adventure',
      duration: 8,
      price: 35000,
      description: 'For the adventure enthusiasts - trekking, skiing and more',
      highlights: ['Gulmarg Skiing', 'Sonamarg Trek', 'River Rafting', 'Wildlife Safari'],
      image: '/images/package-adventure.jpg'
    },
    {
      id: 'luxury',
      name: 'Luxury Kashmir Retreat',
      duration: 10,
      price: 65000,
      description: 'Experience Kashmir in the most luxurious way possible',
      highlights: ['5-Star Accommodations', 'Private Tours', 'Gourmet Dining', 'Spa Treatments'],
      image: '/images/package-luxury.jpg'
    }
  ];
  
  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);
  
  // Calculate price estimate when relevant form fields change
  useEffect(() => {
    if (currentStep === 3) {
      calculatePriceEstimate();
    }
    
    // Fetch available packages based on selection
    if (currentStep === 2) {
      fetchAvailablePackages();
    }
  }, [currentStep, tripDetails.destination, tripDetails.startDate, tripDetails.endDate, 
      tripDetails.travelers, tripDetails.accommodation, tripDetails.hotelClass, tripDetails.transportation]);
  
  const calculatePriceEstimate = () => {
    // This would typically be an API call in a real application
    // Here we're just doing a simple calculation for demonstration
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let basePrice = 15000; // Base price per person in INR
      
      // Adjust for accommodation type
      const accommodationMultiplier = {
        hotel: 1,
        resort: 1.3,
        houseboat: 1.2,
        homestay: 0.8,
        camp: 1.1
      };
      
      // Adjust for hotel class
      const hotelClassMultiplier = {
        budget: 0.7,
        standard: 1,
        deluxe: 1.4,
        luxury: 2
      };
      
      // Adjust for transportation
      const transportationMultiplier = {
        private: 1.3,
        shared: 1,
        rental: 1.2,
        public: 0.7,
        premium: 1.8
      };
      
      // Calculate duration
      const startDate = new Date(tripDetails.startDate);
      const endDate = new Date(tripDetails.endDate);
      const duration = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
      
      // Calculate total
      const totalPrice = basePrice * 
                         tripDetails.travelers * 
                         duration * 
                         accommodationMultiplier[tripDetails.accommodation] * 
                         hotelClassMultiplier[tripDetails.hotelClass] * 
                         transportationMultiplier[tripDetails.transportation];
      
      setPriceEstimate({
        perPerson: Math.round(totalPrice / tripDetails.travelers),
        total: Math.round(totalPrice),
        duration: duration
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const fetchAvailablePackages = () => {
    // This would be an API call in a real app
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Filter packages based on user preferences
      let filtered = [...packageData];
      
      // In a real app, you'd filter based on more sophisticated criteria
      // For now we'll just return all packages
      setAvailablePackages(filtered);
      setIsLoading(false);
    }, 800);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'activities') {
        let updatedActivities = [...tripDetails.activities];
        if (checked) {
          updatedActivities.push(value);
        } else {
          updatedActivities = updatedActivities.filter(activity => activity !== value);
        }
        setTripDetails(prev => ({ ...prev, activities: updatedActivities }));
      } else {
        setTripDetails(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setTripDetails(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAdultChange = (increment) => {
    const newValue = Math.max(1, tripDetails.adults + increment);
    setTripDetails(prev => ({ 
      ...prev, 
      adults: newValue,
      travelers: newValue + prev.children
    }));
  };
  
  const handleChildrenChange = (increment) => {
    const newValue = Math.max(0, tripDetails.children + increment);
    setTripDetails(prev => ({ 
      ...prev, 
      children: newValue,
      travelers: prev.adults + newValue
    }));
  };
  
  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    
    // In a real app, you'd fetch package details and update form fields
    const selected = packageData.find(pkg => pkg.id === packageId);
    if (selected) {
      // Update duration based on package
      const startDate = new Date(tripDetails.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + selected.duration - 1);
      
      setTripDetails(prev => ({
        ...prev,
        endDate: format(endDate, 'yyyy-MM-dd')
      }));
    }
  };
  
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Reset form state when opening
    setCurrentStep(1);
    setShowSuccessMessage(false);
    setPriceEstimate(null);
  };
  
  const closeModal = () => {
    if (showSuccessMessage || window.confirm('Are you sure you want to cancel your trip planning?')) {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
      
      // Reset state after animation completes
      setTimeout(() => {
        setCurrentStep(1);
        setShowSuccessMessage(false);
      }, 300);
    }
  };
  
  const goToNextStep = () => {
    // Basic validation before proceeding
    if (currentStep === 1) {
      if (!tripDetails.startDate || !tripDetails.endDate) {
        alert('Please select your travel dates');
        return;
      }
      
      const start = new Date(tripDetails.startDate);
      const end = new Date(tripDetails.endDate);
      if (start >= end) {
        alert('End date must be after start date');
        return;
      }
    }
    
    // Contact info validation
    if (currentStep === 3) {
      if (!tripDetails.contactName || !tripDetails.contactEmail || !tripDetails.contactPhone) {
        alert('Please fill in all contact information');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tripDetails.contactEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Phone validation - basic check for now
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(tripDetails.contactPhone)) {
        alert('Please enter a valid phone number');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
    
    // Scroll to top of modal when changing steps
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    
    // Scroll to top of modal when changing steps
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would send this data to your API
    // For this demo, we'll simulate an API call
    setTimeout(() => {
      console.log('Submitting trip details:', tripDetails);
      setIsLoading(false);
      setShowSuccessMessage(true);
      
      // In a real app, you would redirect to a confirmation page 
      // or show a success message modal
    }, 2000);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate number of nights from date range
  const calculateNights = () => {
    if (!tripDetails.startDate || !tripDetails.endDate) return 0;
    const start = new Date(tripDetails.startDate);
    const end = new Date(tripDetails.endDate);
    return Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
  };
  
  // User login prompt for non-logged in users
  const LoginPrompt = () => (
    <div className="bg-orange-50 p-4 rounded-lg mb-6 border border-orange-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <svg className="h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-orange-800">Sign in for a better experience</h4>
          <p className="mt-1 text-sm text-orange-700">
            Login or create an account to save your trip details, access special offers, and track your bookings.
          </p>
          <div className="mt-2">
            <button
              type="button"
              className="text-sm font-medium text-orange-600 hover:text-orange-800 transition"
              onClick={() => {/* Add your login redirect here */}}
            >
              Login or Sign Up →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Destination card component for step 1
  const DestinationCard = ({ destination, isSelected, onSelect }) => (
    <div 
      className={`border rounded-lg overflow-hidden cursor-pointer transition transform hover:shadow-lg hover:-translate-y-1 ${
        isSelected ? 'border-orange-500 ring-2 ring-orange-500 shadow-md' : 'border-gray-200 hover:border-orange-300'
      }`}
      onClick={() => onSelect(destination.id)}
    >
      <div className="relative h-32 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
        <div className="absolute bottom-2 left-2 text-white font-bold">{destination.name}</div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-600">{destination.description}</p>
      </div>
    </div>
  );
  
  // Package card component for step 2
  const PackageCard = ({ pkg, isSelected, onSelect }) => (
    <div 
      className={`border rounded-lg overflow-hidden cursor-pointer transition hover:shadow-lg ${
        isSelected ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200'
      }`}
      onClick={() => onSelect(pkg.id)}
    >
      <div className="relative h-40 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-white font-bold text-lg">{pkg.name}</div>
          <div className="text-orange-300 font-medium">{pkg.duration} days</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">{pkg.highlights.length} activities included</span>
          <span className="text-lg font-bold text-orange-600">{formatCurrency(pkg.price)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
        <div className="space-y-1">
          {pkg.highlights.slice(0, 2).map((highlight, index) => (
            <div key={index} className="flex items-center text-sm">
              <svg className="h-4 w-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {highlight}
            </div>
          ))}
          {pkg.highlights.length > 2 && (
            <div className="text-sm text-orange-600 font-medium">+ {pkg.highlights.length - 2} more</div>
          )}
        </div>
      </div>
    </div>
  );



          return (
  <>
   <button
  onClick={openModal}
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-0.5 font-medium text-white hover:text-white shadow-md hover:shadow-lg active:shadow-sm transition duration-300 ease-out"
  aria-label="Plan your trip to Kashmir"
>
  <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-[0.5rem] sm:px-6 sm:py-3 text-[clamp(0.75rem,2vw,1rem)] transition-all duration-300 ease-out group-hover:bg-opacity-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[clamp(1rem,4vw,1.25rem)] w-[clamp(1rem,4vw,1.25rem)]"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
    Plan My Trip
  </span>
</button>

    {/* <button
  onClick={openModal}
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-0.5 font-medium text-white hover:text-white shadow-md hover:shadow-lg active:shadow-sm transition duration-300 ease-out"
  aria-label="Plan your trip to Kashmir"
>
  <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 ease-out group-hover:bg-opacity-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 sm:h-5 sm:w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
    Plan My Trip
  </span>
</button> */}


    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-[100] overflow-y-auto">
        <div className="fixed inset-0 z-[60]  flex min-h-screen items-center justify-center p-4 text-center sm:p-0">

        {/* <div className=" fixed inset-0 z-[100]flex min-h-screen items-center justify-center p-4 text-center sm:p-0"> */}
          <div className=" inset-0  bg-black bg-opacity-60 transition-opacity" onClick={closeModal}></div>

          <div
            ref={modalRef}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Content */}
            {!showSuccessMessage ? (
              <div className="bg-white">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">
                    {currentStep === 1 && "Plan Your Kashmir Trip"}
                    {currentStep === 2 && "Choose Your Experience"}
                    {currentStep === 3 && "Travel Details"}
                    {currentStep === 4 && "Review & Confirm"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-3 bg-gray-50 border-b">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center w-full max-w-2xl">
                      {[1, 2, 3, 4].map((step) => (
                        <React.Fragment key={step}>
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${
                                currentStep >= step
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-gray-300 text-gray-500"
                              }`}
                            >
                              {step}
                            </div>
                            <div className="text-xs mt-1 font-medium text-gray-500">
                              {step === 1 && "Destination"}
                              {step === 2 && "Package"}
                              {step === 3 && "Details"}
                              {step === 4 && "Confirm"}
                            </div>
                          </div>
                          {step < 4 && (
                            <div
                              className={`flex-1 h-0.5 mx-2 ${
                                currentStep > step ? "bg-orange-500" : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <form ref={formRef} onSubmit={handleSubmit} className="p-6">
                  {/* Step 1: Destination & Dates */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Where in Kashmir would you like to go?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                          {kashmirDestinations.map((destination) => (
                            <DestinationCard
                              key={destination.id}
                              destination={destination}
                              isSelected={tripDetails.destination === destination.id}
                              onSelect={(id) => setTripDetails({ ...tripDetails, destination: id })}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">When would you like to travel?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                              Check-in Date
                            </label>
                            <input
                              id="startDate"
                              name="startDate"
                              type="date"
                              required
                              min={format(new Date(), "yyyy-MM-dd")}
                              value={tripDetails.startDate}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                              Check-out Date
                            </label>
                            <input
                              id="endDate"
                              name="endDate"
                              type="date"
                              required
                              min={tripDetails.startDate}
                              value={tripDetails.endDate}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {calculateNights()} nights in Kashmir
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">How many travelers?</h4>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="border border-gray-300 rounded-lg p-3 flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Adults</div>
                                <div className="text-sm text-gray-500">Ages 13+</div>
                              </div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleAdultChange(-1)}
                                  disabled={tripDetails.adults <= 1}
                                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                                    tripDetails.adults <= 1
                                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <span className="mx-3 w-6 text-center">{tripDetails.adults}</span>
                                <button
                                  type="button"
                                  onClick={() => handleAdultChange(1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="border border-gray-300 rounded-lg p-3 flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Children</div>
                                <div className="text-sm text-gray-500">Ages 0-12</div>
                              </div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleChildrenChange(-1)}
                                  disabled={tripDetails.children <= 0}
                                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                                    tripDetails.children <= 0
                                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <span className="mx-3 w-6 text-center">{tripDetails.children}</span>
                                <button
                                  type="button"
                                  onClick={() => handleChildrenChange(1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Package Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">Recommended Packages</h4>
                        <p className="text-sm text-gray-500 mb-4">Choose from our curated packages or customize your own</p>

                        {isLoading ? (
                          <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-r-2 border-b-2 border-gray-300"></div>
                            <span className="ml-3 text-gray-600">Finding the best packages...</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {availablePackages.map((pkg) => (
                              <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                isSelected={selectedPackage === pkg.id}
                                onSelect={handlePackageSelect}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Or customize your trip</h4>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Type of Accommodation</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                            {accommodationTypes.map((type) => (
                              <div
                                key={type.id}
                                onClick={() => setTripDetails({ ...tripDetails, accommodation: type.id })}
                                className={`border rounded-lg px-3 py-2 cursor-pointer transition ${
                                  tripDetails.accommodation === type.id
                                    ? "bg-orange-50 border-orange-500 text-orange-700"
                                    : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                                }`}
                              >
                                <div className="text-xl mb-1">{type.icon}</div>
                                <div className="text-sm font-medium">{type.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Hotel Class</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            {hotelClasses.map((hotelClass) => (
                              <div
                                key={hotelClass.id}
                                onClick={() => setTripDetails({ ...tripDetails, hotelClass: hotelClass.id })}
                                className={`border rounded-lg p-3 cursor-pointer transition ${
                                  tripDetails.hotelClass === hotelClass.id
                                    ? "bg-orange-50 border-orange-500"
                                    : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                                }`}
                              >
                                <div className="font-medium mb-1">{hotelClass.name}</div>
                                <div className="text-xs text-gray-500">{hotelClass.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Activities</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {activities.map((activity) => (
                              <label
                                key={activity.id}
                                className={`border rounded-lg px-3 py-2 cursor-pointer transition ${
                                  tripDetails.activities.includes(activity.id)
                                    ? "bg-orange-50 border-orange-500 text-orange-700"
                                    : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                                }`}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    name="activities"
                                    value={activity.id}
                                    checked={tripDetails.activities.includes(activity.id)}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                  />
                                  <div className="ml-2">
                                    <div className="text-lg mb-1">{activity.icon}</div>
                                    <div className="text-sm font-medium">{activity.name}</div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Travel Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Transportation Preferences</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                          {transportationOptions.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => setTripDetails({ ...tripDetails, transportation: option.id })}
                              className={`border rounded-lg p-3 cursor-pointer transition ${
                                tripDetails.transportation === option.id
                                  ? "bg-orange-50 border-orange-500 text-orange-700"
                                  : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                              }`}
                            >
                              <div className="text-xl mb-1">{option.icon}</div>
                              <div className="text-sm font-medium">{option.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Budget Range</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                          {budgetOptions.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => setTripDetails({ ...tripDetails, budget: option.id })}
                              className={`border rounded-lg p-3 cursor-pointer transition ${
                                tripDetails.budget === option.id
                                  ? "bg-orange-50 border-orange-500"
                                  : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                              }`}
                            >
                              <div className="font-medium text-sm mb-1">{option.name}</div>
                              <div className="text-xs text-gray-500">{option.range}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Special Requirements</h4>
                        <div className="mb-4">
                          <textarea
                            name="specialRequirements"
                            value={tripDetails.specialRequirements}
                            onChange={handleInputChange}
                            placeholder="Any special requests or accessibility needs? Let us know!"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            rows={3}
                          ></textarea>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactName">
                              Full Name
                            </label>
                            <input
                              id="contactName"
                              name="contactName"
                              type="text"
                              required
                              value={tripDetails.contactName}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactEmail">
                                Email
                              </label>
                              <input
                                id="contactEmail"
                                name="contactEmail"
                                type="email"
                                required
                                value={tripDetails.contactEmail}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactPhone">
                                Phone Number
                              </label>
                              <input
                                id="contactPhone"
                                name="contactPhone"
                                type="tel"
                                required
                                value={tripDetails.contactPhone}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="newsletter"
                            checked={tripDetails.newsletter}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Send me special offers, travel inspiration, and updates about Kashmir tourism
                          </span>
                        </label>
                      </div>

                      {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-r-2 border-b-2 border-gray-300"></div>
                          <span className="ml-3 text-gray-600">Calculating your trip cost...</span>
                        </div>
                      ) : priceEstimate && (
                        <div className="border-t border-gray-200 pt-6">
                          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Price Estimate</h4>
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <div className="text-sm text-gray-600 mb-1">
                                  <span className="font-medium">{priceEstimate.duration}</span> nights • <span className="font-medium">{tripDetails.travelers}</span> travelers
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">{formatCurrency(priceEstimate.perPerson)}</span> per person
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-orange-600 mt-2 sm:mt-0">
                                {formatCurrency(priceEstimate.total)}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              *Final price may vary based on specific accommodations, activities, and available promotions
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Review & Confirm */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Trip Summary</h4>

                        <div className="space-y-4">
                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Destination</div>
                            <div className="text-sm text-right font-semibold">
                              {kashmirDestinations.find((d) => d.id === tripDetails.destination)?.name || tripDetails.destination}
                            </div>
                          </div>

                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Travel Dates</div>
                            <div className="text-sm text-right">
                              <div className="font-semibold">
                                {tripDetails.startDate} to {tripDetails.endDate}
                              </div>
                              <div className="text-gray-600">({calculateNights()} nights)</div>
                            </div>
                          </div>

                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Travelers</div>
                            <div className="text-sm text-right">
                              <div className="font-semibold">{tripDetails.travelers} travelers</div>
                              <div className="text-gray-600">{tripDetails.adults} adults, {tripDetails.children} children</div>
                            </div>
                          </div>

                          {selectedPackage && (
                            <div className="flex justify-between pb-3 border-b border-gray-200">
                              <div className="text-sm font-medium text-gray-500">Package</div>
                              <div className="text-sm text-right font-semibold">
                                {packageData.find((p) => p.id === selectedPackage)?.name || "Custom Package"}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Accommodation</div>
                            <div className="text-sm text-right">
                              <div className="font-semibold">
                                {accommodationTypes.find((a) => a.id === tripDetails.accommodation)?.name || tripDetails.accommodation}
                              </div>
                              <div className="text-gray-600">
                                {hotelClasses.find((c) => c.id === tripDetails.hotelClass)?.name || tripDetails.hotelClass} class
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Transportation</div>
                            <div className="text-sm text-right font-semibold">
                              {transportationOptions.find((t) => t.id === tripDetails.transportation)?.name || tripDetails.transportation}
                            </div>
                          </div>

                          {tripDetails.activities.length > 0 && (
                            <div className="flex justify-between pb-3 border-b border-gray-200">
                              <div className="text-sm font-medium text-gray-500">Activities</div>
                              <div className="text-sm text-right">
                                {tripDetails.activities
                                  .map((act) => activities.find((a) => a.id === act)?.name)
                                  .join(", ")}
                              </div>
                            </div>
                          )}

                          {tripDetails.specialRequirements && (
                            <div className="flex justify-between pb-3 border-b border-gray-200">
                              <div className="text-sm font-medium text-gray-500">Special Requests</div>
                              <div className="text-sm text-right">{tripDetails.specialRequirements}</div>
                            </div>
                          )}

                          <div className="flex justify-between pb-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Contact</div>
                            <div className="text-sm text-right">
                              <div className="font-semibold">{tripDetails.contactName}</div>
                              <div className="text-gray-600">{tripDetails.contactEmail}</div>
                              <div className="text-gray-600">{tripDetails.contactPhone}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {priceEstimate && (
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">Total Price</h4>
                              <div className="text-sm text-gray-600 mt-1">
                                {priceEstimate.duration} nights, {tripDetails.travelers} travelers
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-orange-600">
                              {formatCurrency(priceEstimate.total)}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            *A trip expert will contact you to confirm availability and final pricing
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Terms and Conditions</h4>
                        <div className="text-sm text-gray-600 mb-4">
                          By confirming this trip request, you agree to our{" "}
                          <button type="button" className="text-orange-600 hover:underline">
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button type="button" className="text-orange-600 hover:underline">
                            Cancellation Policy
                          </button>
                          .
                        </div>
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            required
                            className="h-4 w-4 mt-1 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            I understand that this is a trip request and not a confirmed booking. A travel expert will contact me within 24 hours to confirm availability and finalize details.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className={`${currentStep === 4 ? "mt-8" : "mt-6"} flex justify-between`}>
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="flex items-center text-gray-700 font-medium hover:text-orange-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow transition"
                      >
                        Continue
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow transition ${
                          isLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            Confirm Trip Request
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white px-6 py-12 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-green-100 p-2">
                    <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Trip Request Has Been Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for choosing to explore the beauty of Kashmir with us. One of our travel experts will contact you within 24 hours to confirm your itinerary.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 w-full max-w-md">
                    <div className="text-sm text-gray-700 mb-2 font-medium">Reference Number:</div>
                    {/* <div className="text-lg font-bold text-orange-600">{bookingReference}</div> */}
                    <div className="text-lg font-bold text-orange-600">TRIP-56789XYZ</div>

                  </div>

                  <p className="text-gray-600 text-sm">
                    We've sent a confirmation email to <span className="font-medium">{tripDetails.contactEmail}</span> with your trip details.
                  </p>

                  <button
                    // onClick={() => router.push("/")}
                    // onClick={() => goBack}
                    // onClick={goBack} 
                    onClick={closeModal}
                    className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow transition"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  
);  
}
export default TripPlanner
