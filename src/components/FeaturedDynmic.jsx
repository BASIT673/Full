import React, { useState, useEffect } from 'react';
import { Calendar, Map, Users, ChevronRight, X,Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping of category icons
const CATEGORY_ICONS = {
  'Last Minute Deals': <Calendar className="w-5 h-5" />,
  'Guided Tours': <Map className="w-5 h-5" />,
  'Group Discounts': <Users className="w-5 h-5" />,
  'Seasonal Specials': <Calendar className="w-5 h-5" />
};

// Mapping of category colors
const CATEGORY_COLORS = {
  'Last Minute Deals': {
    bgClass: 'bg-blue-50',
    iconBgClass: 'bg-blue-500',
    hoverClass: 'hover:bg-blue-100'
  },
  'Guided Tours': {
    bgClass: 'bg-green-50',
    iconBgClass: 'bg-green-500',
    hoverClass: 'hover:bg-green-100'
  },
  'Group Discounts': {
    bgClass: 'bg-purple-50',
    iconBgClass: 'bg-purple-500',
    hoverClass: 'hover:bg-purple-100'
  },
  'Seasonal Specials': {
    bgClass: 'bg-orange-50',
    iconBgClass: 'bg-orange-500',
    hoverClass: 'hover:bg-orange-100'
  }
};

const FeatureCards1 = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Selected item state
  const [selectedItem, setSelectedItem] = useState(null);

  // Booking details state
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    totalPrice: 0,
    guideLang: 'english',
    groupName: '',
    specialRequests: '',
    childrenAges: [],
    infantAges: []
  });

  // Helper function to update booking details
  const updateBookingDetails = (field, value) => {
    setBookingDetails(prev => {
      const updatedDetails = { ...prev, [field]: value };
      const feature = features.find(f => f.id === selectedOffer.featureId);
      const item = selectedOffer.item;
      // Calculate total price (this is a placeholder - you'll want to implement actual pricing logic)
      const basePrice = item.originalPrice; // Example base price
      const adultPrice = basePrice;
      const childPrice = adultPrice * 0.5;
      const infantPrice = 0;

      const totalPrice = (
        (updatedDetails.adults * adultPrice) + 
        (updatedDetails.children * childPrice) + 
        (updatedDetails.infants * infantPrice)
      ) * 1.1; // Adding 10% taxes

      return {
        ...updatedDetails,
        totalPrice: Math.round(totalPrice)
      };
    });
  };

  // Placeholder functions (you'll implement actual logic)
  const handlePayment = () => {
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setIsBookingModalOpen(false);
    }, 2000);
  };

  const parsePrice = (price) => {
    // Placeholder price parsing function
    return typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price || 0;
  };

  const calculateTaxesAndFees = () => {
    // Placeholder taxes and fees calculation
    return Math.round(bookingDetails.totalPrice * 0.1);
  };

  const openBookingModal = (item) => {
    setSelectedItem(item);
    setIsBookingModalOpen(true);
  };


//   // Transform packages into features
//   const transformPackagesToFeatures = (packageData) => {
//     return packageData.map(pkg => {
//       const category = pkg.category;
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: pkg.packageId,
//         title: pkg.name,
//         subtitle: pkg.features[0]?.subtitle || 'Explore our packages',
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: pkg.features.flatMap(feature => feature.content)
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     const packageArray = Array.isArray(packageData) ? packageData : Object.values(packageData);
  
//     return packageArray.map(pkg => {
//       const category = pkg.category;
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
  
//       return {
//         id: pkg.packageId,
//         title: pkg.name,
//         subtitle: Array.isArray(pkg.features) && pkg.features.length > 0
//           ? pkg.features[0].subtitle
//           : 'Explore our packages',
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: Array.isArray(pkg.features) 
//           ? pkg.features.flatMap(feature => feature.content) 
//           : []
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     // Group packages by category
//     const categorizedPackages = packageData.reduce((acc, pkg) => {
//       if (!acc[pkg.category]) {
//         acc[pkg.category] = [];
//       }
//       acc[pkg.category].push(pkg);
//       return acc;
//     }, {});
  
//     // Transform categories into features
//     return Object.keys(categorizedPackages).map(category => {
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: category.toLowerCase().replace(/\s+/g, '-'),
//         title: category,
//         subtitle: getCategorySubtitle(category),
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: categorizedPackages[category].map(pkg => {
//           // Get the first feature content or create a default one
//           const featureContent = pkg.features?.[0]?.content?.[0] || {};
//           const itinerary = pkg.itinerary?.[0] || {};
  
//           return {
//             // Package identification
//             id: pkg._id,
//             packageId: pkg.packageId,
//             name: pkg.name,
            
//             // Pricing information
//             originalPrice: featureContent.originalPrice || 'Contact for pricing',
//             discountedPrice: featureContent.discountedPrice || 'Contact for pricing',
//             discount: featureContent.discount || pkg.discount || '10%',
            
//             // Timing information
//             duration: featureContent.duration || itinerary.duration || 'Flexible',
//             validDates: featureContent.validDates || 'Year-round',
//             bookingDeadline: pkg.bookingDeadline || null,
            
//             // Description and details
//             description: featureContent.description || itinerary.description || pkg.description || 'Exciting adventure package',
//             difficulty: pkg.difficulty || 'Moderate',
//             bestSeason: pkg.bestSeason || 'Seasonal',
            
//             // Logistics
//             accommodation: featureContent.accommodation || itinerary.accommodation || 'Various options available',
//             meetingPoint: featureContent.meetingPoint || 'Main office',
//             timeSlots: featureContent.timeSlots || ['Morning', 'Afternoon'],
            
//             // Inclusions/Exclusions
//             includes: featureContent.includes || ['Accommodation', 'Meals'],
//             excludes: featureContent.excludes || ['Airfare', 'Personal expenses'],
//             activities: itinerary.activities || featureContent.activities || [],
            
//             // Group information
//             recommendedFor: pkg.recommendedFor || ['Families', 'Friends'],
//             totalSpots: pkg.totalSpots || 0,
//             spotsLeft: pkg.spotsLeft || 0,
//             remaining: pkg.spotsLeft ? `${pkg.spotsLeft} spots left` : 'Limited availability',
            
//             // Ratings and popularity
//             rating: featureContent.rating || '4.5',
//             popular: featureContent.popular || false,
//             status: 'Available',
            
//             // Additional metadata
//             createdAt: pkg.createdAt,
//             updatedAt: pkg.updatedAt
//           };
//         })
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     // Group packages by category
//     const categorizedPackages = packageData.reduce((acc, pkg) => {
//       if (!acc[pkg.category]) {
//         acc[pkg.category] = [];
//       }
//       acc[pkg.category].push(pkg);
//       return acc;
//     }, {});
  
//     // Transform categories into features
//     return Object.keys(categorizedPackages).map(category => {
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: category.toLowerCase().replace(/\s+/g, '-'),
//         title: category,
//         subtitle: getCategorySubtitle(category),
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: categorizedPackages[category].map(pkg => {
//           // Get feature content (first feature's first content item)
//           const featureContent = pkg.features?.[0]?.content?.[0] || {};
          
//           // Get itinerary (first day)
//           const itinerary = pkg.itinerary?.[0] || {};
          
//           // Get meals if available
//           const meals = itinerary.meals || {};
          
//           return {
//             // Package identification
//             id: pkg._id,
//             packageId: pkg.packageId,
//             name: pkg.name,
//             category: pkg.category,
            
//             // Feature content
//             ...featureContent,
            
//             // Itinerary data
//             itinerary: {
//               day: itinerary.day,
//               title: itinerary.title,
//               description: itinerary.description,
//               activities: itinerary.activities || [],
//               meals: {
//                 breakfast: meals.breakfast || 'Not included',
//                 lunch: meals.lunch || 'Not included',
//                 dinner: meals.dinner || 'Not included'
//               },
//               accommodation: itinerary.accommodation
//             },
            
//             // Package metadata
//             difficulty: pkg.difficulty,
//             bestSeason: pkg.bestSeason,
//             recommendedFor: pkg.recommendedFor || [],
//             totalSpots: pkg.totalSpots,
//             spotsLeft: pkg.spotsLeft,
//             bookingDeadline: pkg.bookingDeadline,
            
//             // Fallbacks for required fields
//             description: featureContent.description || itinerary.description || pkg.description || 'Exciting adventure package',
//             duration: featureContent.duration || itinerary.duration || 'Flexible',
//             validDates: featureContent.validDates || 'Year-round',
//             accommodation: featureContent.accommodation || itinerary.accommodation || 'Various options available',
//             includes: featureContent.includes || ['Accommodation', 'Meals'],
//             excludes: featureContent.excludes || ['Airfare', 'Personal expenses'],
            
//             // Default values
//             rating: featureContent.rating || '4.5',
//             popular: featureContent.popular || false,
//             status: 'Available'
//           };
//         })
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     return packageData.reduce((acc, pkg) => {
//       const category = pkg.category;
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       // Get the first feature content
//       const featureContent = pkg.features?.[0]?.content?.[0] || {};
      
//       // Get the first itinerary item
//       const itineraryItem = pkg.itinerary?.[0] || {};
  
//       const transformedPackage = {
//         id: pkg._id,
//         packageId: pkg.packageId,
//         name: pkg.name,
//         category: pkg.category,
//         description: featureContent.description || itineraryItem.description || pkg.description || 'Exciting adventure package',
//         originalPrice: featureContent.originalPrice || 'Contact for pricing',
//         discountedPrice: featureContent.discountedPrice || 'Contact for pricing',
//         duration: featureContent.duration || itineraryItem.duration || 'Flexible',
//         validDates: featureContent.validDates || 'Year-round',
//         accommodation: featureContent.accommodation || itineraryItem.accommodation || 'Various options',
//         includes: featureContent.includes || ['Accommodation', 'Meals'],
//         excludes: featureContent.excludes || ['Airfare', 'Personal expenses'],
//         difficulty: pkg.difficulty || 'Moderate',
//         bestSeason: pkg.bestSeason || 'All year',
//         spotsLeft: pkg.spotsLeft || 0,
//         totalSpots: pkg.totalSpots || 0,
//         recommendedFor: pkg.recommendedFor || [],
//         bookingDeadline: pkg.bookingDeadline,
//         // Include complete itinerary data
//         itinerary: {
//           day: itineraryItem.day,
//           title: itineraryItem.title,
//           description: itineraryItem.description,
//           activities: itineraryItem.activities || [],
//           meals: itineraryItem.meals || {
//             breakfast: 'Not included',
//             lunch: 'Not included',
//             dinner: 'Not included'
//           },
//           accommodation: itineraryItem.accommodation
//         }
//       };
  
//       // Group by category
//       const existingCategory = acc.find(f => f.id === category.toLowerCase().replace(/\s+/g, '-'));
//       if (existingCategory) {
//         existingCategory.content.push(transformedPackage);
//       } else {
//         acc.push({
//           id: category.toLowerCase().replace(/\s+/g, '-'),
//           title: category,
//           subtitle: getCategorySubtitle(category),
//           icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//           ...categoryColors,
//           content: [transformedPackage]
//         });
//       }
  
//       return acc;
//     }, []);
//   };
const transformPackagesToFeatures = (packageData) => {
    return packageData.reduce((acc, pkg) => {
      const category = pkg.category;
      const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
      // Get the first feature content
      const featureContent = pkg.features?.[0]?.content?.[0] || {};
      
      // Get ALL itinerary items
      const fullItinerary = pkg.itinerary || [];
  
      const transformedPackage = {
        id: pkg._id,
        packageId: pkg.packageId,
        name: pkg.name,
        category: pkg.category,
        description: featureContent.description || pkg.description || 'Exciting adventure package',
        originalPrice: featureContent.originalPrice || 'Contact for pricing',
        discountedPrice: featureContent.discountedPrice || 'Contact for pricing',
        duration: featureContent.duration || pkg.duration || 'Flexible',
        validDates: featureContent.validDates || 'Year-round',
        accommodation: featureContent.accommodation || 'Various options',
        includes: featureContent.includes || ['Accommodation', 'Meals'],
        excludes: featureContent.excludes || ['Airfare', 'Personal expenses'],
        difficulty: pkg.difficulty || 'Moderate',
        bestSeason: pkg.bestSeason || 'All year',
        spotsLeft: pkg.spotsLeft || 0,
        totalSpots: pkg.totalSpots || 0,
        recommendedFor: pkg.recommendedFor || [],
        bookingDeadline: pkg.bookingDeadline,
        // Include COMPLETE itinerary array
        fullItinerary: fullItinerary.map(item => ({
          day: item.day,
          title: item.title,
          description: item.description,
          activities: item.activities || [],
          meals: item.meals || {
            breakfast: 'Not included',
            lunch: 'Not included',
            dinner: 'Not included'
          },
          accommodation: item.accommodation
        })),
        // Keep first day as primary itinerary for quick reference
        itinerary: fullItinerary[0] ? {
          day: fullItinerary[0].day,
          title: fullItinerary[0].title,
          description: fullItinerary[0].description,
          activities: fullItinerary[0].activities || [],
          meals: fullItinerary[0].meals || {
            breakfast: 'Not included',
            lunch: 'Not included',
            dinner: 'Not included'
          },
          accommodation: fullItinerary[0].accommodation
        } : null
      };
  
      // Group by category
      const existingCategory = acc.find(f => f.id === category.toLowerCase().replace(/\s+/g, '-'));
      if (existingCategory) {
        existingCategory.content.push(transformedPackage);
      } else {
        acc.push({
          id: category.toLowerCase().replace(/\s+/g, '-'),
          title: category,
          subtitle: getCategorySubtitle(category),
          icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
          ...categoryColors,
          content: [transformedPackage]
        });
      }
  
      return acc;
    }, []);
  };
// const transformPackagesToFeatures = (packageData) => {
//     // Group packages by category
//     const categorizedPackages = packageData.reduce((acc, pkg) => {
//       if (!acc[pkg.category]) {
//         acc[pkg.category] = [];
//       }
//       acc[pkg.category].push(pkg);
//       return acc;
//     }, {});
  
//     // Transform categories into features
//     return Object.keys(categorizedPackages).map(category => {
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: category.toLowerCase().replace(/\s+/g, '-'),
//         title: category,
//         subtitle: getCategorySubtitle(category),
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: categorizedPackages[category].map(pkg => {
//           // Get the first feature or create a default one
//           const feature = pkg.features?.[0] || {};
          
//           // Get itinerary details if available
//           const itinerary = pkg.itinerary?.[0] || {};
          
//           return {
//             name: pkg.name,
//             description: feature.description || itinerary.description || 'Exciting adventure package',
//             originalPrice: feature.originalPrice || 'Contact for pricing',
//             discountedPrice: feature.discountedPrice || 'Contact for pricing',
//             duration: feature.duration || itinerary.duration || 'Flexible',
//             validDates: feature.validDates || 'Year-round',
//             accommodation: feature.accommodation || itinerary.accommodation || 'Various options available',
//             // Add other fields from feature or package
//             includes: feature.includes || ['Accommodation', 'Meals'],
//             excludes: feature.excludes || ['Airfare', 'Personal expenses'],
//             discount: feature.discount || '10%',
//             remaining: pkg.spotsLeft ? `${pkg.spotsLeft} spots left` : 'Limited availability',
//             rating: feature.rating || '4.5',
//             timeSlots: feature.timeSlots || ['Morning', 'Afternoon'],
//             meetingPoint: feature.meetingPoint || 'Main office',
//             season: pkg.bestSeason || 'Seasonal',
//             status: 'Available',
//             popular: feature.popular || false
//           };
//         })
//       };
//     });
//   };  
// const transformPackagesToFeatures = (packageData) => {
//     return packageData.map(pkg => {
//       const category = pkg.category;
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: pkg.packageId,
//         title: pkg.name,
//         subtitle: pkg.features && pkg.features.length > 0 
//           ? pkg.features[0].subtitle || 'Explore our packages'
//           : 'Explore our packages',
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: pkg.features ? pkg.features.map(feature => ({
//           name: pkg.name,
//           description: feature.description || 'No description available',
//           // Add other necessary fields from the feature or package
//           originalPrice: feature.originalPrice || 'N/A',
//           discountedPrice: feature.discountedPrice || 'N/A',
//           duration: feature.duration || 'N/A',
//           validDates: feature.validDates || 'N/A'
//         })) : []
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     // Group packages by category
//     const categorizedPackages = packageData.reduce((acc, pkg) => {
//       if (!acc[pkg.category]) {
//         acc[pkg.category] = [];
//       }
//       acc[pkg.category].push(pkg);
//       return acc;
//     }, {});
  
//     // Transform categories into features
//     return Object.keys(categorizedPackages).map(category => {
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: category.toLowerCase().replace(/\s+/g, '-'),
//         title: category,
//         subtitle: getCategorySubtitle(category),
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: categorizedPackages[category].map(pkg => ({
//           name: pkg.name,
//           description: pkg.features?.[0]?.description || 'Exciting adventure package',
//           originalPrice: pkg.features?.[0]?.originalPrice || 'Contact for pricing',
//           discountedPrice: pkg.features?.[0]?.discountedPrice || 'Contact for pricing',
//           duration: pkg.features?.[0]?.duration || 'Flexible',
//           validDates: pkg.features?.[0]?.validDates || 'Year-round',
//           accommodation: pkg.features?.[0]?.accommodation || 'Various options available'
//         }))
//       };
//     });
//   };
// const transformPackagesToFeatures = (packageData) => {
//     // Group packages by category
//     const categorizedPackages = packageData.reduce((acc, pkg) => {
//       if (!acc[pkg.category]) {
//         acc[pkg.category] = [];
//       }
//       acc[pkg.category].push(pkg);
//       return acc;
//     }, {});
  
//     // Transform categories into features
//     return Object.keys(categorizedPackages).map(category => {
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       return {
//         id: category.toLowerCase().replace(/\s+/g, '-'),
//         title: category,
//         subtitle: getCategorySubtitle(category),
//         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//         ...categoryColors,
//         content: categorizedPackages[category].map(pkg => ({
//           name: pkg.name,
//           description: pkg.features?.[0]?.description || 'Exciting adventure package',
//           originalPrice: pkg.features?.[0]?.originalPrice || 'Contact for pricing',
//           discountedPrice: pkg.features?.[0]?.discountedPrice || 'Contact for pricing',
//           duration: pkg.features?.[0]?.duration || 'Flexible',
//           validDates: pkg.features?.[0]?.validDates || 'Year-round',
//           accommodation: pkg.itinerary?.[0]?.accommodation || 'Various options available',
//           includes: pkg.features?.[0]?.includes || ['Accommodation', 'Meals'],
//           excludes: pkg.features?.[0]?.excludes || ['Airfare', 'Personal expenses'],
//           // Add fallbacks for other fields used in your render methods
//           discount: pkg.features?.[0]?.discount || '10%',
//           remaining: pkg.spotsLeft || 'Limited',
//           rating: pkg.features?.[0]?.rating || '4.5',
//           timeSlots: pkg.features?.[0]?.timeSlots || ['Morning', 'Afternoon'],
//           meetingPoint: pkg.features?.[0]?.meetingPoint || 'Main office',
//           season: pkg.bestSeason || 'Seasonal',
//           status: 'Available',
//           popular: pkg.features?.[0]?.popular || false
//         }))
//       };
//     });
//   };
  // Helper function to get category subtitles
//   const getCategorySubtitle = (category) => {
//     switch(category) {
//       case 'Last Minute Deals':
//         return 'Grab incredible discounts on spontaneous adventures';
//       case 'Guided Tours':
//         return 'Expertly curated travel experiences';
//       case 'Group Discounts':
//         return 'Save more when you travel together';
//       case 'Seasonal Specials':
//         return 'Unique experiences tailored to the season';
//       default:
//         return 'Explore our exciting packages';
//     }
//   };
const getCategorySubtitle = (category) => {
    switch(category) {
      case 'Last Minute Deals':
        return 'Flash deals—book now!';
      case 'Guided Tours':
        return 'Expert-led adventures!';
      case 'Group Discounts':
        return 'Bigger groups, bigger savings!';
      case 'Seasonal Specials':
        return 'Limited-time seasonal offers!';
      default:
        return 'Unforgettable trips await!';
    }
  };
  
  const [features, setFeatures] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
  const [viewingAllOffers, setViewingAllOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/packages');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Raw packages data:", data);
        console.log("Packages:", data.packages);
        console.log("Total Pages:", data.totalPages);
        
        setPackages(data.packages);
        
        // Transform packages to features
        const transformedFeatures = transformPackagesToFeatures(data.packages);
        console.log("Transformed Features:", transformedFeatures);
        setFeatures(transformedFeatures);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    fetchPackages();
  }, []);
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/packages');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log(data)
//         setPackages(data);
        
//         // Transform packages to features
//         const transformedFeatures = transformPackagesToFeatures(data);
//         setFeatures(transformedFeatures);
        
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch packages:", error);
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchPackages();
//   }, []);

  const handleFeatureClick = (id) => {
    setActiveFeature(activeFeature === id ? null : id);
    setViewingAllOffers(false);
    setSelectedOffer(null);
  };

  const navigateToOffer = (featureId, item) => {
    setSelectedOffer({ featureId, item });
  };

  const viewAllOffers = (featureId) => {
    setViewingAllOffers(true);
    setSelectedOffer(null);
  };

  const goBack = () => {
    if (selectedOffer) {
      setSelectedOffer(null);
    } else if (viewingAllOffers) {
      setViewingAllOffers(false);
    } else {
      setActiveFeature(null);
    }
  };
  const renderOfferDetails = () => {
    if (!selectedOffer) return null;
    const feature = features.find(f => f.id === selectedOffer.featureId);
    const item = selectedOffer.item;
  
    const calculateDiscount = (original, discounted) => {
      try {
        const orig = parseFloat(original.replace(/[^0-9.-]+/g, ''));
        const disc = parseFloat(discounted.replace(/[^0-9.-]+/g, ''));
        return Math.round(((orig - disc) / orig) * 100);
      } catch {
        return 0;
      }
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'Not specified';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <button onClick={goBack} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Category Info */}
        <div className="mb-4">
          <div className={`${feature.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
            {feature.icon}
          </div>
          <span className="ml-2 text-gray-700">{feature.title}</span>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-700">{item.description}</p>
        </div>
       
        {/* Price Section */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-baseline mb-2">
            <span className="text-gray-600 mr-2">Price:</span>
            {item.originalPrice && item.originalPrice !== 'Contact for pricing' && (
              <span className="text-gray-500 line-through text-sm mr-2">
                {item.originalPrice}
              </span>
            )}
            <span className="text-green-600 font-bold text-lg">
              {item.discountedPrice}
            </span>
            {item.originalPrice && item.discountedPrice && 
             item.originalPrice !== 'Contact for pricing' && (
              <span className="text-green-600 text-xs ml-2">
                Save {calculateDiscount(item.originalPrice, item.discountedPrice)}%
              </span>
            )}
          </div>
          <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
            {feature.id === 'guided-tours' ? 'Price per person' : 
             feature.id === 'group-discounts' ? 'Group pricing available' : 
             'Complete package price'}
          </div>
        </div>
  
        {/* Package Details */}
        <div className="mb-4 p-4 rounded-lg bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-3">Package Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="text-gray-800">{item.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valid Dates:</span>
              <span className="text-gray-800">{item.validDates}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty:</span>
              <span className="text-gray-800 capitalize">{item.difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best Season:</span>
              <span className="text-gray-800 capitalize">{item.bestSeason}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Availability:</span>
              <span className="text-gray-800">
                {item.spotsLeft} of {item.totalSpots} spots remaining
              </span>
            </div>
            {item.bookingDeadline && (
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Deadline:</span>
                <span className="text-gray-800">{formatDate(item.bookingDeadline)}</span>
              </div>
            )}
          </div>
        </div>
  
      
   
   {item.fullItinerary?.length > 0 && (
        <div className="mb-4 p-4 rounded-lg bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-3">Complete Itinerary</h4>
          
          <div className="space-y-6">
            {item.fullItinerary.map((day, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h5 className="font-medium text-gray-700">
                  Day {day.day}: {day.title}
                </h5>
                <p className="text-gray-600 mt-1">{day.description}</p>
                
                {day.activities?.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">Activities:</span>
                    <ul className="list-disc list-inside pl-2 text-gray-600">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm">{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-green-50 p-2 rounded text-sm">
                    <span className="font-medium">Breakfast:</span> {day.meals.breakfast}
                  </div>
                  <div className="bg-green-50 p-2 rounded text-sm">
                    <span className="font-medium">Lunch:</span> {day.meals.lunch}
                  </div>
                  <div className="bg-green-50 p-2 rounded text-sm">
                    <span className="font-medium">Dinner:</span> {day.meals.dinner}
                  </div>
                </div>

                {day.accommodation && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">Accommodation:</span>
                    <p className="text-gray-600 text-sm">{day.accommodation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
        {/* Recommended For */}
        {item.recommendedFor?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Recommended For</h4>
            <div className="flex flex-wrap gap-2">
              {item.recommendedFor.map((group, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {group}
                </span>
              ))}
            </div>
          </div>
        )}
  
        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Includes</h4>
            <ul className="list-disc list-inside text-gray-700">
              {item.includes.map((inclusion, idx) => (
                <li key={idx}>{inclusion}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Excludes</h4>
            <ul className="list-disc list-inside text-gray-700">
              {item.excludes.map((exclusion, idx) => (
                <li key={idx}>{exclusion}</li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Action Buttons */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-3">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
              onClick={goBack}
            >
              <X className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <button 
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </button>
          </div>
          
          {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="min-h-[200px] max-h-[90vh] w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full overflow-y-auto max-h-[calc(100vh-40px)]"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Book {selectedItem?.name}</h3>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-4 mb-6 border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-800">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={bookingDetails.fullName}
                        onChange={(e) => updateBookingDetails('fullName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={bookingDetails.email}
                        onChange={(e) => updateBookingDetails('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your mobile number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={bookingDetails.mobileNumber}
                      onChange={(e) => updateBookingDetails('mobileNumber', e.target.value)}
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDetails.startDate}
                      onChange={(e) => updateBookingDetails('startDate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Person Counts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adults (13+ years)</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={bookingDetails.adults}
                      onChange={(e) => updateBookingDetails('adults', parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Children (5-12 years)</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={bookingDetails.children}
                      onChange={(e) => updateBookingDetails('children', parseInt(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Infants (0-4 years)</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={bookingDetails.infants}
                      onChange={(e) => updateBookingDetails('infants', parseInt(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Infant' : 'Infants'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">Price Summary</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Adults: {bookingDetails.adults} 

                        {/* Adults: {bookingDetails.adults} × ₹10,000 */}
                      </span>
                      <span className="font-medium">₹{(bookingDetails.adults * 10000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Children: {bookingDetails.children} × ₹5,000
                      </span>
                      <span className="font-medium">₹{(bookingDetails.children * 5000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees (10%)</span>
                      <span className="font-medium">₹{calculateTaxesAndFees().toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-orange-600">
                          ₹{bookingDetails.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea 
                    placeholder="Any special requests or requirements?"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                    value={bookingDetails.specialRequests}
                    onChange={(e) => updateBookingDetails('specialRequests', e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={paymentProcessing || !bookingDetails.fullName || !bookingDetails.email || !bookingDetails.mobileNumber || !bookingDetails.startDate}
                    className={`px-4 py-2 rounded-md text-white ${paymentProcessing || !bookingDetails.fullName || !bookingDetails.email || !bookingDetails.mobileNumber || !bookingDetails.startDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                  >
                    {paymentProcessing ? 'Processing...' : `Pay ₹${bookingDetails.totalPrice.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
        </div>
      </motion.div>
    );
  };



 
  
  const renderAllOffers = () => {
    if (!viewingAllOffers) return null;
    
    const feature = features.find(f => f.id === activeFeature);
    if (!feature || !feature.content) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">All {feature.title}</h3>
          <button onClick={goBack} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feature.content.map((item, idx) => {
            // Get the first feature from the package (if exists)
            const packageFeatures = packages.find(pkg => pkg.name === item.name)?.features || [];
            const firstFeature = packageFeatures[0] || {};
            const featureContent = firstFeature.content?.[0] || {};
  
            return (
              <div 
                key={`${feature.id}-${idx}`}
                onClick={() => navigateToOffer(activeFeature, {
                  ...item,
                  ...featureContent, // Merge feature content with base item
                  featureId: feature.id
                })}
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 border border-gray-200"
              >
                <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                
                {/* Price section */}
                <div className="mt-2">
                  <div className="flex items-baseline">
                    {featureContent.originalPrice && (
                      <span className="text-gray-500 line-through text-xs mr-2">
                        {featureContent.originalPrice}
                      </span>
                    )}
                    <span className="text-green-600 font-medium">
                      {featureContent.discountedPrice || item.discountedPrice || 'Contact for pricing'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {activeFeature === 'guided-tours' ? 'Per person' : 
                     activeFeature === 'group-discounts' ? 'Group pricing' : 
                     'Package price'}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    {featureContent.duration || item.duration || 'Flexible'}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {featureContent.validDates || item.validDates || 'Year-round'}
                  </p>
                </div>
  
                {/* Description */}
                <div className="mt-2">
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {featureContent.description || item.description || 'Exciting adventure package'}
                  </p>
                </div>
                
                {/* View details button */}
                <div className="mt-3 flex justify-end">
                  <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };


return (
    <div className="relative bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Explore Our Offers</h2>
  
        <div className="translate-y-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-10 md:px-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgClass} ${feature.hoverClass} px-6 py-4 rounded-lg cursor-pointer 
                transition duration-300 flex items-center group shadow-md
                ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`mr-4 ${feature.iconBgClass} text-white p-3 rounded`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
                <p className="text-gray-600 text-xs">{feature.subtitle}</p>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 
                  ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} 
              />
            </div>
          ))}
        </div>
  
        <AnimatePresence>
          {activeFeature && !viewingAllOffers && !selectedOffer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="  bg-white rounded-lg shadow-xl p-4 border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateToOffer(activeFeature, item)}
                    className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition duration-300"
                  >
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
  
             
                    {activeFeature === 'last-minute' && (
                      <div className="mt-1">
                        <span className="text-red-600 font-medium text-sm">{item.discount}</span>
                        <p className="text-gray-500 text-xs mt-1">{item.remaining}</p>
                      </div>
                    )}
  
                    {activeFeature === 'guided-tours' && (
                      <div className="mt-1">
                        <span className="text-gray-600 text-sm">{item.duration}</span>
                        <p className="text-green-600 text-xs mt-1">★ {item.rating}</p>
                      </div>
                    )}
  
                    {activeFeature === 'group-discounts' && (
                      <div className="mt-1">
                        <span className="text-purple-600 font-medium text-sm">{item.discount}</span>
                        {item.popular && (
                          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                    )}
  
                    {activeFeature === 'seasonal-specials' && (
                      <div className="mt-1">
                        <span className="text-gray-600 text-sm">{item.season}</span>
                        <p className="text-orange-600 text-xs mt-1">{item.status}</p>
                      </div>
                    )}
                  </div>
                ))} */}
                {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
  <div
    key={idx}
    onClick={() => navigateToOffer(activeFeature, item)}
    className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 shadow-sm"
  >
    <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
    
    {/* Price and Duration Section */}
    <div className="mb-2">
      <div className="flex items-baseline">
        {item.originalPrice && (
          <span className="text-gray-500 line-through text-xs mr-2">
            ${item.originalPrice}
          </span>
        )}
        <span className="text-green-600 font-semibold text-sm">
          {item.discountedPrice 
            ? `$${item.discountedPrice}` 
            : 'Custom Pricing'}
        </span>
      </div>
      
      {/* Duration or Key Highlight */}
      <div className="text-xs text-gray-600 mt-1 flex items-center">
        {activeFeature === 'guided-tours' && (
          <>
            <Clock className="w-3 h-3 mr-2 text-blue-500" />
            {item.duration || 'Flexible Duration'}
          </>
        )}
        
        {activeFeature === 'last-minute' && (
          <>
            <Zap className="w-3 h-3 mr-2 text-yellow-500" />
            {item.discount} Off • Limited Time
          </>
        )}
        
        {activeFeature === 'group-discounts' && (
          <>
            <Users className="w-3 h-3 mr-2 text-purple-500" />
            Group Size: {item.groupSize || 'Flexible'}
          </>
        )}
        
        {activeFeature === 'seasonal-specials' && (
          <>
            <Calendar className="w-3 h-3 mr-2 text-orange-500" />
            {item.season} Special
          </>
        )}
      </div>
    </div>
    
    {/* Short Description or Key Benefit */}
    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
      {item.shortDescription || 'Exciting adventure awaits!'}
    </p>
    
    {/* Marketing Badges or Highlights */}
    <div className="flex items-center justify-between">
      <div className="space-x-1">
        {item.popular && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
        {item.bestSeller && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
            Best Seller
          </span>
        )}
      </div>
      
      {/* Quick Action */}
      <div className="text-blue-600 text-xs flex items-center">
        View Details
        <ChevronRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  </div>
))}
              </div>
  
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => viewAllOffers(activeFeature)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all offers
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}
  
          {/* Show all offers view */}
          {activeFeature && viewingAllOffers && renderAllOffers()}
  
          {/* Show selected offer details */}
          {activeFeature && selectedOffer && renderOfferDetails()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureCards1;