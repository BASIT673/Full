


// import React, { useState } from 'react';
// import { Calendar, Map, Users, ChevronRight, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const FeatureCards = () => {
//     // const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
// // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [viewingAllOffers, setViewingAllOffers] = useState(false);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
// const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

// const [paymentProcessing, setPaymentProcessing] = useState(false);
// const [paymentSuccess, setPaymentSuccess] = useState(false);
// // Update your initial state to include the new fields
// const [bookingDetails, setBookingDetails] = useState({
//     fullName: '',
//     email: '',
//     mobileNumber: '',
//     startDate: '',
//     endDate: '',
//     adults: 2,
//     children: 0,
//     infants: 0,
//     childrenAges: [],
//     infantAges: [],
//     guideLang: 'english',
//     groupName: '',
//     specialRequests: ''
//   });
  
//   // Function to calculate base price based on package type and number of people
//   const calculateBasePrice = () => {
//     let basePrice = 12500; // Default base price
    
//     if (activeFeature === 'guided-tours') {
//       // Price per person
//       return basePrice * bookingDetails.adults;
//     } else if (activeFeature === 'group-discounts') {
//       if (item.name?.includes("Family")) {
//         // Family package (up to 6 people)
//         return basePrice;
//       } else if (item.name?.includes("Friends")) {
//         // Friends package (up to 10 people)
//         return basePrice * 1.5;
//       } else if (item.name?.includes("Corporate")) {
//         // Corporate package (up to 20 people)
//         return basePrice * 3;
//       }
//     }
    
//     // For other packages, calculate based on adults
//     return basePrice * (bookingDetails.adults > 2 ? bookingDetails.adults / 2 : 1);
//   };
  
//   // Function to calculate children discount (50% off for 5-12 years)
//   const calculateChildrenDiscount = () => {
//     if (bookingDetails.children <= 0) return 0;
    
//     const adultPricePerPerson = 12500 / 2; // Base price per adult
//     return adultPricePerPerson * bookingDetails.children * 0.5; // 50% discount
//   };
  
//   // Function to calculate package discount
//   const calculatePackageDiscount = () => {
//     if (activeFeature === 'last-minute') {
//       return 5000;
//     } else if (activeFeature === 'group-discounts') {
//       return 2500;
//     }
//     return 0;
//   };
  
//   // Function to calculate taxes and fees
//   const calculateTaxesAndFees = () => {
//     // Calculate taxes as 10% of the price after discounts
//     const priceAfterDiscounts = calculateBasePrice() - calculateChildrenDiscount() - calculatePackageDiscount();
//     return Math.round(priceAfterDiscounts * 0.1);
//   };
  
//   // Function to calculate total price
//   const calculateTotalPrice = () => {
//     return calculateBasePrice() - calculateChildrenDiscount() - calculatePackageDiscount() + calculateTaxesAndFees();
//   };
  
//   // Function to update booking details
//   const updateBookingDetails = (field, value) => {
//     setBookingDetails(prev => {
//       const updated = { ...prev, [field]: value };
      
//       // Handle children ages array updates
//       if (field === 'children') {
//         const childrenCount = parseInt(value);
//         const currentAges = [...prev.childrenAges];
        
//         if (childrenCount > currentAges.length) {
//           // Add new ages for additional children
//           for (let i = currentAges.length; i < childrenCount; i++) {
//             currentAges.push(5); // Default age for children
//           }
//         } else if (childrenCount < currentAges.length) {
//           // Remove extra ages
//           currentAges.splice(childrenCount);
//         }
        
//         updated.childrenAges = currentAges;
//       }
      
//       // Handle infant ages array updates
//       if (field === 'infants') {
//         const infantCount = parseInt(value);
//         const currentAges = [...prev.infantAges];
        
//         if (infantCount > currentAges.length) {
//           // Add new ages for additional infants
//           for (let i = currentAges.length; i < infantCount; i++) {
//             currentAges.push(0); // Default age for infants
//           }
//         } else if (infantCount < currentAges.length) {
//           // Remove extra ages
//           currentAges.splice(infantCount);
//         }
        
//         updated.infantAges = currentAges;
//       }
      
//       return updated;
//     });
//   };
// //   const features = [
// //     {
// //       id: 'last-minute',
// //       title: 'Last Minute Deals',
// //       subtitle: 'Up to 40% off',
// //       icon: <Calendar className="w-5 h-5" />,
// //       bgClass: 'bg-blue-50',
// //       iconBgClass: 'bg-blue-500',
// //       hoverClass: 'hover:bg-blue-100',
// //       content: [
// //         { name: 'Weekend in Gulmarg', discount: '30% off', remaining: '3 spots left', slug: 'gulmarg-weekend', description: 'Enjoy a weekend getaway in the stunning mountains of Gulmarg with skiing, hiking, and luxury accommodations.' },
// //         { name: 'Dal Lake Houseboat Stay', discount: '40% off', remaining: '1 night left', slug: 'dal-houseboat', description: 'Experience the tranquility of Dal Lake with a traditional houseboat stay including meals and boat rides.' },
// //         { name: 'Sonmarg Adventure', discount: '25% off', remaining: 'Book today', slug: 'sonmarg-adventure', description: 'Adventure awaits in Sonmarg with trekking, river rafting, and camping under the stars.' }
// //       ]
// //     },
// //     {
// //       id: 'guided-tours',
// //       title: 'Guided Tours',
// //       subtitle: 'Explore with experts',
// //       icon: <Map className="w-5 h-5" />,
// //       bgClass: 'bg-green-50',
// //       iconBgClass: 'bg-green-500',
// //       hoverClass: 'hover:bg-green-100',
// //       content: [
// //         { name: 'Historic Old City Walk', duration: '3 hours', rating: '4.9/5', slug: 'old-city-walk', description: 'Discover the rich history and culture of the Old City with our expert local guides.' },
// //         { name: 'Mughal Gardens Tour', duration: '6 hours', rating: '4.8/5', slug: 'mughal-gardens', description: 'Visit the stunning Mughal Gardens with transportation and a knowledgeable guide included.' },
// //         { name: 'Photography Expedition', duration: 'Full day', rating: '5.0/5', slug: 'photo-expedition', description: 'Capture the beauty of Kashmir with our professional photography guide who knows all the best spots.' }
// //       ]
// //     },
// //     {
// //       id: 'group-discounts',
// //       title: 'Group Discounts',
// //       subtitle: 'Save when traveling together',
// //       icon: <Users className="w-5 h-5" />,
// //       bgClass: 'bg-purple-50',
// //       iconBgClass: 'bg-purple-500',
// //       hoverClass: 'hover:bg-purple-100',
// //       content: [
// //         { name: 'Family Package (4-6 people)', discount: '15% off', popular: true, slug: 'family-package', description: 'Perfect for families looking to explore Kashmir together with special activities for children.' },
// //         { name: 'Friends Getaway (6-10 people)', discount: '20% off', popular: false, slug: 'friends-getaway', description: 'Bring your friends for an unforgettable adventure with customized itineraries and group activities.' },
// //         { name: 'Corporate Retreats (10+ people)', discount: '25% off', popular: false, slug: 'corporate-retreat', description: 'Team-building activities, meeting facilities, and luxury accommodations for your corporate retreat.' }
// //       ]
// //     },
// //     {
// //       id: 'seasonal-specials',
// //       title: 'Seasonal Specials',
// //       subtitle: 'Limited time offers',
// //       icon: <Calendar className="w-5 h-5" />,
// //       bgClass: 'bg-orange-50',
// //       iconBgClass: 'bg-orange-500',
// //       hoverClass: 'hover:bg-orange-100',
// //       content: [
// //         { name: 'Spring Tulip Festival', season: 'April-May', status: 'Booking open', slug: 'tulip-festival', description: 'Witness the spectacular blooming of millions of tulips in Asia s largest tulip garden.' },
// //         { name: 'Summer Trekking Package', season: 'June-August', status: 'Early bird discount', slug: 'summer-trekking', description: 'Explore the lush green valleys and mountains of Kashmir during the perfect trekking season.' },
// //         { name: 'Winter Skiing Adventure', season: 'December-February', status: 'Pre-booking open', slug: 'winter-skiing', description: 'Experience world-class skiing in Gulmarg with equipment rentals and instructor options.' }
// //       ]
// //     }
// //   ];
// const features = [
//     {
//       id: 'last-minute',
//       title: 'Last Minute Deals',
//       subtitle: 'Up to 40% off',
//       icon: <Calendar className="w-5 h-5" />,
//       bgClass: 'bg-blue-50',
//       iconBgClass: 'bg-blue-500',
//       hoverClass: 'hover:bg-blue-100',
//       content: [
//         {
//           name: 'Weekend in Gulmarg',
//           discount: '30% off',
//           remaining: '3 spots left',
//           slug: 'gulmarg-weekend',
//           description: 'Enjoy a weekend getaway in the stunning mountains of Gulmarg with skiing, hiking, and luxury accommodations.',
//           originalPrice: '₹24,999',
//           discountedPrice: '₹17,499',
//           duration: '3 days, 2 nights',
//           validDates: 'March 22-24, 2025',
//           accommodation: 'Khyber Himalayan Resort & Spa (4-star)',
//           includes: ['Accommodation', 'Breakfast and dinner', 'Skiing equipment', 'Airport transfers'],
//           excludes: ['Flights', 'Personal expenses', 'Travel insurance']
//         },
//         {
//           name: 'Dal Lake Houseboat Stay',
//           discount: '40% off',
//           remaining: '1 night left',
//           slug: 'dal-houseboat',
//           description: 'Experience the tranquility of Dal Lake with a traditional houseboat stay including meals and boat rides.',
//           originalPrice: '₹18,500',
//           discountedPrice: '₹11,100',
//           duration: '2 days, 1 night',
//           validDates: 'March 19-20, 2025',
//           accommodation: 'Luxury Houseboat (Deluxe category)',
//           includes: ['Houseboat accommodation', 'All meals', 'Shikara rides', 'Airport transfers'],
//           excludes: ['Flights', 'Personal expenses', 'Optional activities']
//         },
//         {
//           name: 'Sonmarg Adventure',
//           discount: '25% off',
//           remaining: 'Book today',
//           slug: 'sonmarg-adventure',
//           description: 'Adventure awaits in Sonmarg with trekking, river rafting, and camping under the stars.',
//           originalPrice: '₹15,999',
//           discountedPrice: '₹11,999',
//           duration: '3 days, 2 nights',
//           validDates: 'March 21-30, 2025',
//           accommodation: 'Luxury camping tents',
//           includes: ['Camping equipment', 'All meals', 'Guided trekking', 'Rafting experience'],
//           excludes: ['Transportation to Sonmarg', 'Personal gear', 'Travel insurance']
//         }
//       ]
//     },
//     {
//       id: 'guided-tours',
//       title: 'Guided Tours',
//       subtitle: 'Explore with experts',
//       icon: <Map className="w-5 h-5" />,
//       bgClass: 'bg-green-50',
//       iconBgClass: 'bg-green-500',
//       hoverClass: 'hover:bg-green-100',
//       content: [
//         {
//           name: 'Historic Old City Walk',
//           duration: '3 hours',
//           rating: '4.9/5',
//           slug: 'old-city-walk',
//           description: 'Discover the rich history and culture of the Old City with our expert local guides.',
//           originalPrice: '₹1,999',
//           discountedPrice: '₹1,799',
//           timeSlots: ['10:00 AM', '2:00 PM'],
//           validDates: 'Daily',
//           meetingPoint: 'Jamia Masjid entrance',
//           includes: ['English-speaking guide', 'Monument entrance fees', 'Local snacks'],
//           excludes: ['Transportation to meeting point', 'Personal expenses', 'Tips']
//         },
//         {
//           name: 'Mughal Gardens Tour',
//           duration: '6 hours',
//           rating: '4.8/5',
//           slug: 'mughal-gardens',
//           description: 'Visit the stunning Mughal Gardens with transportation and a knowledgeable guide included.',
//           originalPrice: '₹3,500',
//           discountedPrice: '₹3,150',
//           timeSlots: ['9:00 AM'],
//           validDates: 'Tuesday-Sunday',
//           meetingPoint: 'Hotel pickup available',
//           includes: ['Transportation', 'English-speaking guide', 'Entrance fees', 'Bottled water'],
//           excludes: ['Lunch', 'Personal expenses', 'Tips']
//         },
//         {
//           name: 'Photography Expedition',
//           duration: 'Full day',
//           rating: '5.0/5',
//           slug: 'photo-expedition',
//           description: 'Capture the beauty of Kashmir with our professional photography guide who knows all the best spots.',
//           originalPrice: '₹6,999',
//           discountedPrice: '₹6,299',
//           timeSlots: ['Sunrise to sunset'],
//           validDates: 'Monday, Wednesday, Friday',
//           meetingPoint: 'Hotel pickup available',
//           includes: ['Transportation', 'Professional photographer guide', 'Lunch', 'Refreshments'],
//           excludes: ['Camera equipment', 'Personal expenses', 'Tips']
//         }
//       ]
//     },
//     {
//       id: 'group-discounts',
//       title: 'Group Discounts',
//       subtitle: 'Save when traveling together',
//       icon: <Users className="w-5 h-5" />,
//       bgClass: 'bg-purple-50',
//       iconBgClass: 'bg-purple-500',
//       hoverClass: 'hover:bg-purple-100',
//       content: [
//         {
//           name: 'Family Package (4-6 people)',
//           discount: '15% off',
//           popular: true,
//           slug: 'family-package',
//           description: 'Perfect for families looking to explore Kashmir together with special activities for children.',
//           originalPrice: '₹45,000',
//           discountedPrice: '₹38,250',
//           duration: '5 days, 4 nights',
//           validDates: 'March-May 2025',
//           accommodation: 'Family suites in 4-star hotels',
//           includes: ['Accommodation', 'Daily breakfast', 'Private transportation', 'Family activities', 'Kid-friendly guides'],
//           excludes: ['Flights', 'Other meals', 'Optional activities']
//         },
//         {
//           name: 'Friends Getaway (6-10 people)',
//           discount: '20% off',
//           popular: false,
//           slug: 'friends-getaway',
//           description: 'Bring your friends for an unforgettable adventure with customized itineraries and group activities.',
//           originalPrice: '₹55,000',
//           discountedPrice: '₹44,000',
//           duration: '4 days, 3 nights',
//           validDates: 'March-June 2025',
//           accommodation: 'Luxury cottages with shared living spaces',
//           includes: ['Accommodation', 'Welcome dinner', 'Adventure activities', 'Group transportation', 'Photography session'],
//           excludes: ['Flights', 'Most meals', 'Personal expenses']
//         },
//         {
//           name: 'Corporate Retreats (10+ people)',
//           discount: '25% off',
//           popular: false,
//           slug: 'corporate-retreat',
//           description: 'Team-building activities, meeting facilities, and luxury accommodations for your corporate retreat.',
//           originalPrice: '₹95,000',
//           discountedPrice: '₹71,250',
//           duration: '3 days, 2 nights',
//           validDates: 'Year-round',
//           accommodation: 'Business resort with conference facilities',
//           includes: ['Accommodation', 'Meeting rooms', 'Team-building activities', 'All meals', 'Airport transfers'],
//           excludes: ['Flights', 'Specialized equipment', 'Additional activities']
//         }
//       ]
//     },
//     {
//       id: 'seasonal-specials',
//       title: 'Seasonal Specials',
//       subtitle: 'Limited time offers',
//       icon: <Calendar className="w-5 h-5" />,
//       bgClass: 'bg-orange-50',
//       iconBgClass: 'bg-orange-500',
//       hoverClass: 'hover:bg-orange-100',
//       content: [
//         {
//           name: 'Spring Tulip Festival',
//           season: 'April-May',
//           status: 'Booking open',
//           slug: 'tulip-festival',
//           description: 'Witness the spectacular blooming of millions of tulips in Asia\'s largest tulip garden.',
//           originalPrice: '₹12,999',
//           discountedPrice: '₹10,999',
//           duration: '3 days, 2 nights',
//           validDates: 'April 1-30, 2025',
//           accommodation: 'Boutique hotels in Srinagar',
//           includes: ['Accommodation', 'Daily breakfast', 'Tulip garden entrance', 'City tour', 'Airport transfers'],
//           excludes: ['Flights', 'Other meals', 'Optional activities']
//         },
//         {
//           name: 'Summer Trekking Package',
//           season: 'June-August',
//           status: 'Early bird discount',
//           slug: 'summer-trekking',
//           description: 'Explore the lush green valleys and mountains of Kashmir during the perfect trekking season.',
//           originalPrice: '₹22,500',
//           discountedPrice: '₹18,750',
//           duration: '5 days, 4 nights',
//           validDates: 'June 1-August 31, 2025',
//           accommodation: 'Mix of hotels and mountain camps',
//           includes: ['Accommodation', 'All meals during trek', 'Professional guides', 'Trekking permits', 'Safety equipment'],
//           excludes: ['Flights', 'Personal trekking gear', 'Travel insurance']
//         },
//         {
//           name: 'Winter Skiing Adventure',
//           season: 'December-February',
//           status: 'Pre-booking open',
//           slug: 'winter-skiing',
//           description: 'Experience world-class skiing in Gulmarg with equipment rentals and instructor options.',
//           originalPrice: '₹35,999',
//           discountedPrice: '₹30,599',
//           duration: '4 days, 3 nights',
//           validDates: 'December 15, 2025-February 28, 2026',
//           accommodation: 'Mountain resorts with ski access',
//           includes: ['Accommodation', 'Ski equipment', 'Ski pass', 'Beginner lessons', 'Breakfast and dinner'],
//           excludes: ['Flights', 'Lunch', 'Advanced lessons', 'Personal winter gear']
//         }
//       ]
//     }
//   ];
// // Add this function to handle Razorpay checkout
// const handlePayment = async (item) => {
//     try {
//       setPaymentProcessing(true);
      
//       // 1. Create order in backend
//       const packageDetails = {
//         id: item.slug,
//         name: item.name,
//         description: item.description,
//         startDate: bookingDetails.startDate,
//         endDate: bookingDetails.endDate,
//         adults: bookingDetails.adults,
//         children: bookingDetails.children
//       };
      
//       // Calculate amount based on package and discounts
//       const basePrice = 12500;
//       let discountPercent = 0;
      
//       if (activeFeature === 'last-minute') {
//         discountPercent = parseInt(item.discount.replace('% off', ''));
//       } else if (activeFeature === 'group-discounts') {
//         discountPercent = parseInt(item.discount.replace('% off', ''));
//       }
      
//       const discountAmount = basePrice * (discountPercent / 100);
//       const amount = basePrice - discountAmount + 1250; // Base - discount + taxes
      
//       const response = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
//         },
//         // console.log('Raw Response:', response);
//         body: JSON.stringify({
//           amount,
//           packageDetails,
//           name: "Guest User", // Will be overridden if authenticated
//           email: "", // Will be overridden if authenticated
//         })
      
//       });
//       console.log('Raw Response:', response);
      
//       const data = await response.json();
      
//       if (!data.success) {
//         throw new Error(data.error || 'Failed to create order');
//       }
      
//       // 2. Initialize Razorpay
//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON", // Replace with your Razorpay key ID
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "Kashmir Travel",
//         description: `Booking for ${item.name}`,
//         order_id: data.order.id,
//         handler: async function (response) {
//           const verifyData = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             customerDetails: {
//               email: "", // Will be filled by authenticated user or payment form
//               name: "", // Will be filled by authenticated user or payment form
//               bookingDetails
//             }
//           };
          
//           // 3. Verify payment
//           const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(verifyData)
//           });
          
//           const verifyResult = await verifyResponse.json();
          
//           if (verifyResult.success) {
//             setPaymentSuccess(true);
//             setPaymentProcessing(false);
//             setIsPaymentModalOpen(false);
//             // Show success notification
//             alert('Booking successful! A confirmation email will be sent to your registered email address.');
//           } else {
//             throw new Error(verifyResult.message || 'Payment verification failed');
//           }
//         },
//         prefill: {
//           name: "", // Will be filled if user is logged in
//           email: "", // Will be filled if user is logged in
//         },
//         theme: {
//           color: "#f97316" // Orange color matching your theme
//         }
//       };
      
//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
//       setPaymentProcessing(false);
      
//     } catch (error) {
//       console.error('Payment error:', error);
//       setPaymentProcessing(false);
//       alert(`Payment failed: ${error.message}`);
//     }
//   };
  
//   // Add this function to handle form updates
// //   const updateBookingDetails = (field, value) => {
// //     setBookingDetails({
// //       ...bookingDetails,
// //       [field]: value
// //     });
    
//     // Special handling for children count
//     if (field === 'children') {
//       const childrenCount = parseInt(value);
//       let updatedAges = [...bookingDetails.childrenAges];
      
//       // Adjust the childrenAges array based on new count
//       if (childrenCount > updatedAges.length) {
//         // Add new age entries
//         for (let i = updatedAges.length; i < childrenCount; i++) {
//           updatedAges.push(2); // Default age
//         }
//       } else if (childrenCount < updatedAges.length) {
//         // Remove excess age entries
//         updatedAges = updatedAges.slice(0, childrenCount);
//       }
      
//       setBookingDetails({
//         ...bookingDetails,
//         children: childrenCount,
//         childrenAges: updatedAges
//       });
//     }
//   }
//   const handleFeatureClick = (id) => {
//     // If clicking the same feature that's open, close it
//     if (activeFeature === id) {
//       setActiveFeature(null);
//       return;
//     }
//     setActiveFeature(id);
//     setViewingAllOffers(false);
//     setSelectedOffer(null);
//   };

//   const navigateToOffer = (featureId, item) => {
//     setSelectedOffer({
//       featureId,
//       item
//     });
//   };

//   const viewAllOffers = (featureId) => {
//     setViewingAllOffers(true);
//     setSelectedOffer(null);
//   };

//   const goBack = () => {
//     if (selectedOffer) {
//       setSelectedOffer(null);
//     } else if (viewingAllOffers) {
//       setViewingAllOffers(false);
//     } else {
//       setActiveFeature(null);
//     }
//   };

//   // Render the selected offer details
//   const renderOfferDetails = () => {
//     if (!selectedOffer) return null;
//     const feature = features.find(f => f.id === selectedOffer.featureId);
//     const item = selectedOffer.item;
    
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="bg-white p-6 rounded-lg shadow-lg"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
//           <button 
//             onClick={goBack}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
        
//         <div className="mb-4">
//           <div className={`${feature.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
//             {feature.icon}
//           </div>
//           <span className="ml-2 text-gray-700">{feature.title}</span>
//         </div>
        
//         <div className="mb-4">
//           <p className="text-gray-700">{item.description}</p>
//         </div>
//        ]
// {/* Price section */}
// <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//   {/* Price comparison */}
//   <div className="flex items-baseline mb-2">
//     <span className="text-gray-600 mr-2">Price:</span>
//     <span className="text-gray-500 line-through text-sm mr-2">{item.originalPrice}</span>
//     <span className="text-green-600 font-bold text-lg">{item.discountedPrice}</span>
//     <span className="text-green-600 text-xs ml-2">Save {item.originalPrice && item.discountedPrice ? 
//       `${Math.round(((parseFloat(item.originalPrice.replace(/[^0-9.-]+/g, '')) - 
//       parseFloat(item.discountedPrice.replace(/[^0-9.-]+/g, ''))) / 
//       parseFloat(item.originalPrice.replace(/[^0-9.-]+/g, ''))) * 100)}%` : ''}</span>
//   </div>
  
//   {/* Pricing explanation */}
//   <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
//     {selectedOffer?.featureId === 'last-minute' && 
//       <span>Complete package for 2 people</span>
//     }
//     {selectedOffer?.featureId === 'guided-tours' && 
//       <span>Price shown is per person</span>
//     }
//     {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Family") &&
//       <span>Family package price (includes up to 6 people)</span>
//     }
//     {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Friends") &&
//       <span>Group price (includes up to 10 people)</span>
//     }
//     {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Corporate") &&
//       <span>Corporate group price (includes up to 20 people)</span>
//     }
//     {selectedOffer?.featureId === 'seasonal-specials' && 
//       <span>Complete package for 2 people</span>
//     }
//     {!selectedOffer?.featureId &&
//       <span>{activeFeature === 'guided-tours' ? 'Price per person' : 
//              activeFeature === 'group-discounts' ? 'Total price for your group' : 
//              'Complete package price'}</span>
//     }
//   </div>
// </div>


        
//         {/* Feature specific information */}
//         <div className="mb-4 p-4 rounded-lg bg-gray-50">
//           {selectedOffer.featureId === 'last-minute' && (
//             <>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Discount:</span>
//                 <span className="text-red-600 font-bold">{item.discount}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Availability:</span>
//                 <span className="text-orange-600">{item.remaining}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Duration:</span>
//                 <span className="text-gray-800">{item.duration}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Valid Dates:</span>
//                 <span className="text-gray-800">{item.validDates}</span>
//               </div>
//             </>
//           )}
          
//           {selectedOffer.featureId === 'guided-tours' && (
//             <>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Duration:</span>
//                 <span className="text-gray-800">{item.duration}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Rating:</span>
//                 <span className="text-green-600">★ {item.rating}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Available Times:</span>
//                 <span className="text-gray-800">{item.timeSlots.join(', ')}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Valid Days:</span>
//                 <span className="text-gray-800">{item.validDates}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Meeting Point:</span>
//                 <span className="text-gray-800">{item.meetingPoint}</span>
//               </div>
//             </>
//           )}
          
//           {selectedOffer.featureId === 'group-discounts' && (
//             <>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Discount:</span>
//                 <span className="text-purple-600 font-bold">{item.discount}</span>
//               </div>
//               {item.popular && (
//                 <div className="mt-2">
//                   <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Most Popular Choice</span>
//                 </div>
//               )}
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Duration:</span>
//                 <span className="text-gray-800">{item.duration}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Valid Dates:</span>
//                 <span className="text-gray-800">{item.validDates}</span>
//               </div>
//             </>
//           )}
          
//           {selectedOffer.featureId === 'seasonal-specials' && (
//             <>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Season:</span>
//                 <span className="text-gray-800">{item.season}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Status:</span>
//                 <span className="text-orange-600">{item.status}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Duration:</span>
//                 <span className="text-gray-800">{item.duration}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Valid Dates:</span>
//                 <span className="text-gray-800">{item.validDates}</span>
//               </div>
//             </>
//           )}
//         </div>
        
//         {/* Accommodation section */}
//         <div className="mb-4">
//           <h4 className="font-semibold text-gray-800 mb-2">Accommodation</h4>
//           <p className="text-gray-700">{item.accommodation}</p>
//         </div>
        
//         {/* Inclusions & Exclusions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <h4 className="font-semibold text-gray-800 mb-2">Includes</h4>
//             <ul className="list-disc list-inside text-gray-700">
//               {item.includes.map((inclusion, idx) => (
//                 <li key={idx}>{inclusion}</li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-800 mb-2">Excludes</h4>
//             <ul className="list-disc list-inside text-gray-700">
//               {item.excludes.map((exclusion, idx) => (
//                 <li key={idx}>{exclusion}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
   
      
// <div className="mt-6 space-y-4">
//     <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-3">
//       <button 
//         className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
//         onClick={goBack}
//       >
//         <X className="w-4 h-4 mr-2" />
//         Go Back
//       </button>
//       <button 
//         className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
//         onClick={() => setIsBookingModalOpen(true)}
//       >
//         <Calendar className="w-4 h-4 mr-2" />
//         Book Now
//       </button>
//     </div>

 

// {isBookingModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
//     <div className="min-h-[200px] max-h-[90vh] w-full max-w-2xl">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white rounded-lg shadow-xl p-6 w-full overflow-y-auto max-h-[calc(100vh-40px)]"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">Book {item.name}</h3>
//           <button 
//             onClick={() => setIsBookingModalOpen(false)}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="mb-6">
//           <div className={`${feature.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
//             {feature.icon}
//           </div>
//           <span className="ml-2 text-gray-700">{feature.title}</span>
//           {activeFeature === 'last-minute' && (
//             <span className="ml-2 text-red-600 font-bold">{item.discount}</span>
//           )}
//           {activeFeature === 'group-discounts' && (
//             <span className="ml-2 text-purple-600 font-bold">{item.discount}</span>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-4 mb-6 border-b border-gray-200 pb-4">
//           <h4 className="font-medium text-gray-800">Contact Information</h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter your full name"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.fullName}
//                 onChange={(e) => updateBookingDetails('fullName', e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input 
//                 type="email" 
//                 placeholder="you@example.com"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.email}
//                 onChange={(e) => updateBookingDetails('email', e.target.value)}
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//             <input 
//               type="tel" 
//               placeholder="Enter your mobile number"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               value={bookingDetails.mobileNumber}
//               onChange={(e) => updateBookingDetails('mobileNumber', e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
//               <input 
//                 type="date" 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 min={new Date().toISOString().split('T')[0]}
//                 value={bookingDetails.startDate}
//                 onChange={(e) => updateBookingDetails('startDate', e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
//               <input 
//                 type="date" 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
//                 value={bookingDetails.endDate}
//                 onChange={(e) => updateBookingDetails('endDate', e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Adults (13+ years)</label>
//               <select 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.adults}
//                 onChange={(e) => updateBookingDetails('adults', e.target.value)}
//               >
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
//                   <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Children (5-12 years)</label>
//               <select 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.children}
//                 onChange={(e) => updateBookingDetails('children', e.target.value)}
//               >
//                 {[0, 1, 2, 3, 4, 5, 6].map(num => (
//                   <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
//                 ))}
//               </select>
//               <span className="text-xs text-gray-500 mt-1 block">50% of adult price</span>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Infants (0-4 years)</label>
//               <select 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.infants}
//                 onChange={(e) => updateBookingDetails('infants', e.target.value)}
//               >
//                 {[0, 1, 2, 3, 4].map(num => (
//                   <option key={num} value={num}>{num} {num === 1 ? 'Infant' : 'Infants'}</option>
//                 ))}
//               </select>
//               <span className="text-xs text-gray-500 mt-1 block">Free of charge</span>
//             </div>
//           </div>

//           {/* Child Age Selection - Only shown if children count > 0 */}
//           {bookingDetails.children > 0 && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Children's Ages (5-12 years)</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                 {Array.from({ length: bookingDetails.children }).map((_, index) => (
//                   <div key={index} className="flex flex-col">
//                     <label className="block text-xs text-gray-500 mb-1">Child {index + 1}</label>
//                     <select
//                       className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       value={bookingDetails.childrenAges[index]}
//                       onChange={(e) => {
//                         const newAges = [...bookingDetails.childrenAges];
//                         newAges[index] = parseInt(e.target.value);
//                         setBookingDetails({
//                           ...bookingDetails,
//                           childrenAges: newAges
//                         });
//                       }}
//                     >
//                       {[5, 6, 7, 8, 9, 10, 11, 12].map(age => (
//                         <option key={age} value={age}>{age} years</option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Infant Age Selection - Only shown if infants count > 0 */}
//           {bookingDetails.infants > 0 && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Infants' Ages (0-4 years)</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                 {Array.from({ length: bookingDetails.infants }).map((_, index) => (
//                   <div key={index} className="flex flex-col">
//                     <label className="block text-xs text-gray-500 mb-1">Infant {index + 1}</label>
//                     <select
//                       className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       value={bookingDetails.infantAges[index]}
//                       onChange={(e) => {
//                         const newAges = [...bookingDetails.infantAges];
//                         newAges[index] = parseInt(e.target.value);
//                         setBookingDetails({
//                           ...bookingDetails,
//                           infantAges: newAges
//                         });
//                       }}
//                     >
//                       {[0, 1, 2, 3, 4].map(age => (
//                         <option key={age} value={age}>{age} {age === 1 ? 'year' : 'years'}</option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeFeature === 'guided-tours' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Guide Language</label>
//               <select 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.guideLang}
//                 onChange={(e) => updateBookingDetails('guideLang', e.target.value)}
//               >
//                 <option value="english">English</option>
//                 <option value="hindi">Hindi</option>
//                 <option value="urdu">Urdu</option>
//                 <option value="kashmiri">Kashmiri</option>
//               </select>
//             </div>
//           )}

//           {activeFeature === 'group-discounts' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter your group name"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 value={bookingDetails.groupName}
//                 onChange={(e) => updateBookingDetails('groupName', e.target.value)}
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
//             <textarea 
//               placeholder="Any special requirements or requests"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
//               value={bookingDetails.specialRequests}
//               onChange={(e) => updateBookingDetails('specialRequests', e.target.value)}
//             ></textarea>
//           </div>
//         </div>

//         <div className="mt-6 border-t border-gray-200 pt-4">
//           {/* Dynamic price calculation based on package type and number of people */}
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-gray-700">Base Price:</span>
//             <span className="text-gray-700">₹{calculateBasePrice().toLocaleString()}</span>
//           </div>
          
//           {bookingDetails.children > 0 && (
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-700">Children (5-12 years) - 50% discount:</span>
//               <span className="text-green-600">-₹{calculateChildrenDiscount().toLocaleString()}</span>
//             </div>
//           )}
          
//           {(activeFeature === 'last-minute' || activeFeature === 'group-discounts') && (
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-700">Package Discount:</span>
//               <span className="text-green-600">-₹{calculatePackageDiscount().toLocaleString()}</span>
//             </div>
//           )}
          
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-gray-700">Taxes & Fees:</span>
//             <span className="text-gray-700">₹{calculateTaxesAndFees().toLocaleString()}</span>
//           </div>
          
//           <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
//             <span className="font-bold text-gray-800">Total:</span>
//             <span className="font-bold text-gray-800">₹{calculateTotalPrice().toLocaleString()}</span>
//           </div>
          
//           <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
//             {activeFeature === 'last-minute' && (
//               <span>Complete package for {bookingDetails.adults} adults, {bookingDetails.children} children, {bookingDetails.infants} infants</span>
//             )}
//             {activeFeature === 'guided-tours' && (
//               <span>Price shown includes {bookingDetails.adults} adults, {bookingDetails.children} children (half price), {bookingDetails.infants} infants (free)</span>
//             )}
//             {activeFeature === 'group-discounts' && item.name?.includes("Family") && (
//               <span>Family package price (up to 6 people, additional guests extra)</span>
//             )}
//             {activeFeature === 'group-discounts' && item.name?.includes("Friends") && (
//               <span>Group price (up to 10 people, additional guests extra)</span>
//             )}
//             {activeFeature === 'group-discounts' && item.name?.includes("Corporate") && (
//               <span>Corporate group price (up to 20 people, additional guests extra)</span>
//             )}
//             {activeFeature === 'seasonal-specials' && (
//               <span>Complete package for {bookingDetails.adults} adults, {bookingDetails.children} children, {bookingDetails.infants} infants</span>
//             )}
//             {!activeFeature && (
//               <span>Complete package price</span>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
//           <button 
//             className="order-2 md:order-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
//             onClick={() => setIsBookingModalOpen(false)}
//           >
//             Cancel
//           </button>
//           <button 
//             className="order-1 md:order-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
//             onClick={handlePayment}
//             disabled={!bookingDetails.startDate || !bookingDetails.endDate || !bookingDetails.fullName || !bookingDetails.email || !bookingDetails.mobileNumber}
//           >
//             {paymentProcessing ? 'Processing...' : 'Continue to Payment'}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   </div>
// )}
//   </div>
//       </motion.div>
//     );
//    };

// ;
// const renderAllOffers = () => {
//     if (!viewingAllOffers) return null;
    
//     const feature = features.find(f => f.id === activeFeature);
    
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="bg-white p-6 rounded-lg shadow-lg"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">All {feature.title}</h3>
//           <button 
//             onClick={goBack}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {feature.content.map((item, idx) => (
//             <div 
//               key={idx}
//               onClick={() => navigateToOffer(activeFeature, item)}
//               className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 border border-gray-200"
//             >
//               <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
              
//               {activeFeature === 'last-minute' && (
//                 // <div>
//                 //   <span className="text-red-600 font-medium text-sm">{item.discount}</span>
//                 //   <p className="text-gray-500 text-xs mt-1">{item.remaining}</p>
//                 //   <div className="mt-2 flex items-baseline">
//                 //     <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
//                 //     <span className="text-green-600 font-medium">{item.discountedPrice}</span>
//                 //   </div>
//                 //   <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
//                 //   <p className="text-gray-600 text-xs">{item.validDates}</p>
//                 // </div>
//                 <div className="mt-2">
//   <div className="flex items-baseline">
//     <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
//     <span className="text-green-600 font-medium">{item.discountedPrice}</span>
//   </div>
//   <p className="text-xs text-gray-600 mt-1">
//     {activeFeature === 'guided-tours' ? 'Per person' : 
//      activeFeature === 'group-discounts' ? 'Total for group' : 
//      'Package price'}
//   </p>
//   <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
//   <p className="text-gray-600 text-xs">{item.validDates}</p>
// </div>        )}
              
//               {activeFeature === 'guided-tours' && (
//                 <div>
//                   <span className="text-gray-600 text-sm">{item.duration}</span>
//                   <p className="text-green-600 text-xs mt-1">★ {item.rating}</p>
//                   <div className="mt-2 flex items-baseline">
//                     <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
//                     <span className="text-green-600 font-medium">{item.discountedPrice}</span>
//                   </div>
//                   <p className="text-gray-600 text-xs mt-1">{item.timeSlots.join(', ')}</p>
//                   <p className="text-gray-600 text-xs">{item.validDates}</p>
//                 </div>
//               )}
              
//               {activeFeature === 'group-discounts' && (
//                 <div>
//                   <span className="text-purple-600 font-medium text-sm">{item.discount}</span>
//                   {item.popular && (
//                     <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
//                   )}
//                   <div className="mt-2 flex items-baseline">
//                     <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
//                     <span className="text-green-600 font-medium">{item.discountedPrice}</span>
//                   </div>
//                   <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
//                   <p className="text-gray-600 text-xs">{item.validDates}</p>
//                 </div>
//               )}
              
//               {activeFeature === 'seasonal-specials' && (
//                 <div>
//                   <span className="text-gray-600 text-sm">{item.season}</span>
//                   <p className="text-orange-600 text-xs mt-1">{item.status}</p>
//                   <div className="mt-2 flex items-baseline">
//                     <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
//                     <span className="text-green-600 font-medium">{item.discountedPrice}</span>
//                   </div>
//                   <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
//                   <p className="text-gray-600 text-xs">{item.validDates}</p>
//                 </div>
//               )}
              
//               <div className="mt-2">
//                 <p className="text-gray-600 text-xs line-clamp-2">{item.description}</p>
//               </div>
              
//               <div className="mt-3 flex justify-end">
//                 <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
//                   View Details <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//    };

//   return (
//     <div className="relative  bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Explore Our Offers</h2>
        
//         {/* Feature Cards */}
//         <div className="translate-y-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
//           {features.slice(0, 2).map((feature) => (
//             <div 
//               key={feature.id}
//               className={`${feature.bgClass} ${feature.hoverClass} px-5 py-3 rounded-lg cursor-pointer 
//                         transition duration-300 flex items-center group shadow-md
//                         ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
//               onClick={() => handleFeatureClick(feature.id)}
//             >
//               <div className={`mr-3 ${feature.iconBgClass} text-white p-2 rounded`}>
//                 {feature.icon}
//               </div>
//               <div>
//                 <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
//                 <p className="text-gray-600 text-xs">{feature.subtitle}</p>
//               </div>
//             <ChevronRight className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} />

//                     </div>
//                   ))}
//                 </div>
        
//                 {/* Additional features for mobile */}
//                 <div className="md:hidden mt-20 space-y-4">
//                   {features.slice(2).map((feature) => (
//                     <div 
//                       key={feature.id}
//                       className={`${feature.bgClass} ${feature.hoverClass} px-5 py-3 rounded-lg cursor-pointer 
//                                 transition duration-300 flex items-center group shadow-md
//                                 ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
//                       onClick={() => handleFeatureClick(feature.id)}
//                     >
//                       <div className={`mr-3 ${feature.iconBgClass} text-white p-2 rounded`}>
//                         {feature.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
//                         <p className="text-gray-600 text-xs">{feature.subtitle}</p>
//                       </div>
//                       <ChevronRight className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 
//                                             ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} />
//                     </div>
//                   ))}
//                 </div>
        
//                 {/* Expanded content - shows when a feature is selected */}
//                 <AnimatePresence>
//                   {activeFeature && !viewingAllOffers && !selectedOffer && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 20 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute z-10 left-0 right-0 mt-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200"
//                     >
//                       <div className="flex justify-between items-center mb-3">
//                         <h3 className="font-bold text-lg">
//                           {features.find(f => f.id === activeFeature)?.title}
//                         </h3>
//                         <button 
//                           onClick={() => setActiveFeature(null)}
//                           className="p-1 rounded-full hover:bg-gray-100"
//                         >
//                           <X className="w-5 h-5 text-gray-500" />
//                         </button>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                         {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
//                           <div 
//                             key={idx}
//                             onClick={() => navigateToOffer(activeFeature, item)}
//                             className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition duration-300"
//                           >
//                             <h4 className="font-medium text-gray-800">{item.name}</h4>
                            
//                             {/* Conditional rendering based on feature type */}
//                             {activeFeature === 'last-minute' && (
//                               <div className="mt-1">
//                                 <span className="text-red-600 font-medium text-sm">{item.discount}</span>
//                                 <p className="text-gray-500 text-xs mt-1">{item.remaining}</p>
//                               </div>
//                             )}
                            
//                             {activeFeature === 'guided-tours' && (
//                               <div className="mt-1">
//                                 <span className="text-gray-600 text-sm">{item.duration}</span>
//                                 <p className="text-green-600 text-xs mt-1">★ {item.rating}</p>
//                               </div>
//                             )}
                            
//                             {activeFeature === 'group-discounts' && (
//                               <div className="mt-1">
//                                 <span className="text-purple-600 font-medium text-sm">{item.discount}</span>
//                                 {item.popular && (
//                                   <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
//                                 )}
//                               </div>
//                             )}
                            
//                             {activeFeature === 'seasonal-specials' && (
//                               <div className="mt-1">
//                                 <span className="text-gray-600 text-sm">{item.season}</span>
//                                 <p className="text-orange-600 text-xs mt-1">{item.status}</p>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
                      
//                       <div className="mt-4 flex justify-end">
//                         <button 
//                           onClick={() => viewAllOffers(activeFeature)}
//                           className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//                         >
//                           View all offers
//                           <ChevronRight className="w-4 h-4 ml-1" />
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
                  
//                   {/* Show all offers view */}
//                   {activeFeature && viewingAllOffers && renderAllOffers()}
                  
//                   {/* Show selected offer details */}
//                   {activeFeature && selectedOffer && renderOfferDetails()}
//                 </AnimatePresence>
//               </div>
//             </div>
//           );
        
  
//         export default FeatureCards;





        import React, { useState ,useEffect} from 'react';
import { Calendar, Map, Users, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCards = (props) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [viewingAllOffers, setViewingAllOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [bookingDetails, setBookingDetails] = useState({
  //   adults: 2,
  //   children: 0,
  //   childrenAges: [],
  //   infants: 0,
  //   infantAges: []
  // });
  // const [activeFeature, setActiveFeature] = useState('last-minute');
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    childrenAges: [],
    infantAges: [],
    guideLang: 'english',
    groupName: '',
    specialRequests: ''
  });
  
  // Function to calculate base price based on package type and number of people
//   const calculateBasePrice = () => {
//     let basePrice = 12500; // Default base price

//     if (activeFeature === 'guided-tours') {
//       // Price per person
//       return basePrice * bookingDetails.adults;
//     } else if (activeFeature === 'group-discounts') {
//       if (selectedOffer?.item.name?.includes("Family")) {
//         // Family package (up to 6 people)
//         return basePrice;
//       } else if (selectedOffer?.item.name?.includes("Friends")) {
//         // Friends package (up to 10 people)
//         return basePrice * 1.5;
//       } else if (selectedOffer?.item.name?.includes("Corporate")) {
//         // Corporate package (up to 20 people)
//         return basePrice * 3;
//       }
//     }

//     // For other packages, calculate based on adults
//     return basePrice * (bookingDetails.adults > 2 ? bookingDetails.adults / 2 : 1);
//   };

  // Function to calculate children discount (50% off for 5-12 years)
//   const calculateChildrenDiscount = () => {
//     if (bookingDetails.children <= 0) return 0;

//     const adultPricePerPerson = 12500 / 2; // Base price per adult
//     return adultPricePerPerson * bookingDetails.children * 0.5; // 50% discount
//   };

  // Function to calculate package discount
//   const calculatePackageDiscount = () => {
//     if (activeFeature === 'last-minute') {
//       return 5000;
//     } else if (activeFeature === 'group-discounts') {
//       return 2500;
//     }
//     return 0;
//   };

  // Function to calculate taxes and fees
//   const calculateTaxesAndFees = () => {
//     // Calculate taxes as 10% of the price after discounts
//     const priceAfterDiscounts = calculateBasePrice() - calculateChildrenDiscount() - calculatePackageDiscount();
//     return Math.round(priceAfterDiscounts * 0.1);
//   };

  // Function to calculate total price
//   const calculateTotalPrice = () => {
//     return calculateBasePrice() - calculateChildrenDiscount() - calculatePackageDiscount() + calculateTaxesAndFees();
//   };

  // Function to update booking details
//   const updateBookingDetails = (field, value) => {
//     setBookingDetails(prev => {
//       const updated = { ...prev, [field]: value };

//       // Handle children ages array updates
//       if (field === 'children') {
//         const childrenCount = parseInt(value);
//         const currentAges = [...prev.childrenAges];

//         if (childrenCount > currentAges.length) {
//           // Add new ages for additional children
//           for (let i = currentAges.length; i < childrenCount; i++) {
//             currentAges.push(5); // Default age for children
//           }
//         } else if (childrenCount < currentAges.length) {
//           // Remove extra ages
//           currentAges.splice(childrenCount);
//         }

//         updated.childrenAges = currentAges;
//       }

//       // Handle infant ages array updates
//       if (field === 'infants') {
//         const infantCount = parseInt(value);
//         const currentAges = [...prev.infantAges];

//         if (infantCount > currentAges.length) {
//           // Add new ages for additional infants
//           for (let i = currentAges.length; i < infantCount; i++) {
//             currentAges.push(0); // Default age for infants
//           }
//         } else if (infantCount < currentAges.length) {
//           // Remove extra ages
//           currentAges.splice(infantCount);
//         }

//         updated.infantAges = currentAges;
//       }

//       return updated;
//     });
//   };

 // Update your initial state to include the new fields
 const features = [
  {
    id: 'last-minute',
    title: 'Last Minute Deals',
    subtitle: 'Up to 40% off',
    icon: <Calendar className="w-5 h-5" />,
    bgClass: 'bg-blue-50',
    iconBgClass: 'bg-blue-500',
    hoverClass: 'hover:bg-blue-100',
    content: [
      {
        name: 'Weekend in Gulmarg',
        discount: '30% off',
        remaining: '3 spots left',
        slug: 'gulmarg-weekend',
        description: 'Enjoy a weekend getaway in the stunning mountains of Gulmarg with skiing, hiking, and luxury accommodations.',
        originalPrice: '₹24,999',
        discountedPrice: '₹17,499',
        duration: '3 days, 2 nights',
        validDates: 'March 22-24, 2025',
        accommodation: 'Khyber Himalayan Resort & Spa (4-star)',
        includes: ['Accommodation', 'Breakfast and dinner', 'Skiing equipment', 'Airport transfers'],
        excludes: ['Flights', 'Personal expenses', 'Travel insurance']
      },
      {
        name: 'Dal Lake Houseboat Stay',
        discount: '40% off',
        remaining: '1 night left',
        slug: 'dal-houseboat',
        description: 'Experience the tranquility of Dal Lake with a traditional houseboat stay including meals and boat rides.',
        originalPrice: '₹18,500',
        discountedPrice: '₹11,100',
        duration: '2 days, 1 night',
        validDates: 'March 19-20, 2025',
        accommodation: 'Luxury Houseboat (Deluxe category)',
        includes: ['Houseboat accommodation', 'All meals', 'Shikara rides', 'Airport transfers'],
        excludes: ['Flights', 'Personal expenses', 'Optional activities']
      },
      {
        name: 'Sonmarg Adventure',
        discount: '25% off',
        remaining: 'Book today',
        slug: 'sonmarg-adventure',
        description: 'Adventure awaits in Sonmarg with trekking, river rafting, and camping under the stars.',
        originalPrice: '₹15,999',
        discountedPrice: '₹11,999',
        duration: '3 days, 2 nights',
        validDates: 'March 21-30, 2025',
        accommodation: 'Luxury camping tents',
        includes: ['Camping equipment', 'All meals', 'Guided trekking', 'Rafting experience'],
        excludes: ['Transportation to Sonmarg', 'Personal gear', 'Travel insurance']
      }
    ]
  },
  {
    id: 'guided-tours',
    title: 'Guided Tours',
    subtitle: 'Explore with experts',
    icon: <Map className="w-5 h-5" />,
    bgClass: 'bg-green-50',
    iconBgClass: 'bg-green-500',
    hoverClass: 'hover:bg-green-100',
    content: [
      {
        name: 'Historic Old City Walk',
        duration: '3 hours',
        rating: '4.9/5',
        slug: 'old-city-walk',
        description: 'Discover the rich history and culture of the Old City with our expert local guides.',
        originalPrice: '₹1,999',
        discountedPrice: '₹1,799',
        timeSlots: ['10:00 AM', '2:00 PM'],
        validDates: 'Daily',
        meetingPoint: 'Jamia Masjid entrance',
        includes: ['English-speaking guide', 'Monument entrance fees', 'Local snacks'],
        excludes: ['Transportation to meeting point', 'Personal expenses', 'Tips']
      },
      {
        name: 'Mughal Gardens Tour',
        duration: '6 hours',
        rating: '4.8/5',
        slug: 'mughal-gardens',
        description: 'Visit the stunning Mughal Gardens with transportation and a knowledgeable guide included.',
        originalPrice: '₹3,500',
        discountedPrice: '₹3,150',
        timeSlots: ['9:00 AM'],
        validDates: 'Tuesday-Sunday',
        meetingPoint: 'Hotel pickup available',
        includes: ['Transportation', 'English-speaking guide', 'Entrance fees', 'Bottled water'],
        excludes: ['Lunch', 'Personal expenses', 'Tips']
      },
      {
        name: 'Photography Expedition',
        duration: 'Full day',
        rating: '5.0/5',
        slug: 'photo-expedition',
        description: 'Capture the beauty of Kashmir with our professional photography guide who knows all the best spots.',
        originalPrice: '₹6,999',
        discountedPrice: '₹6,299',
        timeSlots: ['Sunrise to sunset'],
        validDates: 'Monday, Wednesday, Friday',
        meetingPoint: 'Hotel pickup available',
        includes: ['Transportation', 'Professional photographer guide', 'Lunch', 'Refreshments'],
        excludes: ['Camera equipment', 'Personal expenses', 'Tips']
      }
    ]
  },
  {
    id: 'group-discounts',
    title: 'Group Discounts',
    subtitle: 'Save when traveling together',
    icon: <Users className="w-5 h-5" />,
    bgClass: 'bg-purple-50',
    iconBgClass: 'bg-purple-500',
    hoverClass: 'hover:bg-purple-100',
    content: [
      {
        name: 'Family Package (4-6 people)',
        discount: '15% off',
        popular: true,
        slug: 'family-package',
        description: 'Perfect for families looking to explore Kashmir together with special activities for children.',
        originalPrice: '₹45,000',
        discountedPrice: '₹38,250',
        duration: '5 days, 4 nights',
        validDates: 'March-May 2025',
        accommodation: 'Family suites in 4-star hotels',
        includes: ['Accommodation', 'Daily breakfast', 'Private transportation', 'Family activities', 'Kid-friendly guides'],
        excludes: ['Flights', 'Other meals', 'Optional activities']
      },
      {
        name: 'Friends Getaway (6-10 people)',
        discount: '20% off',
        popular: false,
        slug: 'friends-getaway',
        description: 'Bring your friends for an unforgettable adventure with customized itineraries and group activities.',
        originalPrice: '₹55,000',
        discountedPrice: '₹44,000',
        duration: '4 days, 3 nights',
        validDates: 'March-June 2025',
        accommodation: 'Luxury cottages with shared living spaces',
        includes: ['Accommodation', 'Welcome dinner', 'Adventure activities', 'Group transportation', 'Photography session'],
        excludes: ['Flights', 'Most meals', 'Personal expenses']
      },
      {
        name: 'Corporate Retreats (10+ people)',
        discount: '25% off',
        popular: false,
        slug: 'corporate-retreat',
        description: 'Team-building activities, meeting facilities, and luxury accommodations for your corporate retreat.',
        originalPrice: '₹95,000',
        discountedPrice: '₹71,250',
        duration: '3 days, 2 nights',
        validDates: 'Year-round',
        accommodation: 'Business resort with conference facilities',
        includes: ['Accommodation', 'Meeting rooms', 'Team-building activities', 'All meals', 'Airport transfers'],
        excludes: ['Flights', 'Specialized equipment', 'Additional activities']
      }
    ]
  },
  {
    id: 'seasonal-specials',
    title: 'Seasonal Specials',
    subtitle: 'Limited time offers',
    icon: <Calendar className="w-5 h-5" />,
    bgClass: 'bg-orange-50',
    iconBgClass: 'bg-orange-500',
    hoverClass: 'hover:bg-orange-100',
    content: [
      {
        name: 'Spring Tulip Festival',
        season: 'April-May',
        status: 'Booking open',
        slug: 'tulip-festival',
        description: 'Witness the spectacular blooming of millions of tulips in Asia\'s largest tulip garden.',
        originalPrice: '₹12,999',
        discountedPrice: '₹10,999',
        duration: '3 days, 2 nights',
        validDates: 'April 1-30, 2025',
        accommodation: 'Boutique hotels in Srinagar',
        includes: ['Accommodation', 'Daily breakfast', 'Tulip garden entrance', 'City tour', 'Airport transfers'],
        excludes: ['Flights', 'Other meals', 'Optional activities']
      },
      {
        name: 'Summer Trekking Package',
        season: 'June-August',
        status: 'Early bird discount',
        slug: 'summer-trekking',
        description: 'Explore the lush green valleys and mountains of Kashmir during the perfect trekking season.',
        originalPrice: '₹22,500',
        discountedPrice: '₹18,750',
        duration: '5 days, 4 nights',
        validDates: 'June 1-August 31, 2025',
        accommodation: 'Mix of hotels and mountain camps',
        includes: ['Accommodation', 'All meals during trek', 'Professional guides', 'Trekking permits', 'Safety equipment'],
        excludes: ['Flights', 'Personal trekking gear', 'Travel insurance']
      },
      {
        name: 'Winter Skiing Adventure',
        season: 'December-February',
        status: 'Pre-booking open',
        slug: 'winter-skiing',
        description: 'Experience world-class skiing in Gulmarg with equipment rentals and instructor options.',
        originalPrice: '₹35,999',
        discountedPrice: '₹30,599',
        duration: '4 days, 3 nights',
        validDates: 'December 15, 2025-February 28, 2026',
        accommodation: 'Mountain resorts with ski access',
        includes: ['Accommodation', 'Ski equipment', 'Ski pass', 'Beginner lessons', 'Breakfast and dinner'],
        excludes: ['Flights', 'Lunch', 'Advanced lessons', 'Personal winter gear']
      }
    ]
  }
];
const handlePayment = async (item) => {
  try {
    setPaymentProcessing(true);
    
    // 1. Create order in backend
    const packageDetails = {
      id: item.slug,
      name: item.name,
      description: item.description,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      adults: bookingDetails.adults,
      children: bookingDetails.children
    };
    
    // Calculate amount based on package and discounts
    const basePrice = 12500;
    let discountPercent = 0;
    
    if (activeFeature === 'last-minute') {
      discountPercent = parseInt(item.discount.replace('% off', ''));
    } else if (activeFeature === 'group-discounts') {
      discountPercent = parseInt(item.discount.replace('% off', ''));
    }
    
    const discountAmount = basePrice * (discountPercent / 100);
    const amount = basePrice - discountAmount + 1250; // Base - discount + taxes
    
    const response = await fetch('https://backend-1-7zwm.onrender.com/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
      },
      // console.log('Raw Response:', response);
      body: JSON.stringify({
        amount,
        packageDetails,
        name: "Guest User", // Will be overridden if authenticated
        email: "", // Will be overridden if authenticated
      })
    
    });
    console.log('Raw Response:', response);
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }
    
    // 2. Initialize Razorpay
    const options = {
      key: "rzp_live_VQS2zWKwCIE5ON", // Replace with your Razorpay key ID
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Kashmir Travel",
      description: `Booking for ${item.name}`,
      order_id: data.order.id,
      handler: async function (response) {
        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          customerDetails: {
            email: "", // Will be filled by authenticated user or payment form
            name: "", // Will be filled by authenticated user or payment form
            bookingDetails
          }
        };
        
        // 3. Verify payment
        const verifyResponse = await fetch('https://backend-1-7zwm.onrender.com/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(verifyData)
        });
        
        const verifyResult = await verifyResponse.json();
        
        if (verifyResult.success) {
          setPaymentSuccess(true);
          setPaymentProcessing(false);
          setIsPaymentModalOpen(false);
          // Show success notification
          alert('Booking successful! A confirmation email will be sent to your registered email address.');
        } else {
          throw new Error(verifyResult.message || 'Payment verification failed');
        }
      },
      prefill: {
        name: "", // Will be filled if user is logged in
        email: "", // Will be filled if user is logged in
      },
      theme: {
        color: "#f97316" // Orange color matching your theme
      }
    };
    
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
    setPaymentProcessing(false);
    
  } catch (error) {
    console.error('Payment error:', error);
    setPaymentProcessing(false);
    alert(`Payment failed: ${error.message}`);
  }
};

const handleFeatureClick = (id) => {
  // If clicking the same feature that's open, close it
  if (activeFeature === id) {
    setActiveFeature(null);
    return;
  }
  setActiveFeature(id);
  setViewingAllOffers(false);
  setSelectedOffer(null);
};

const navigateToOffer = (featureId, item) => {
  setSelectedOffer({
    featureId,
    item
  });
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

// const parsePrice = (priceString) => {
//   if (!priceString) return 0;
//   return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
// };

// Function to calculate base price
// const calculateBasePrice = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;
//   if (!item?.originalPrice) return 0;

//   const basePrice = parsePrice(item.originalPrice);

//   switch (activeFeature) {
//     case 'guided-tours':
//       return basePrice * (bookingDetails?.adults || 1);

//     case 'group-discounts':
//       return basePrice;

//     case 'last-minute':
//     case 'seasonal-specials':
//       if (!bookingDetails?.adults || bookingDetails.adults <= 2) {
//         return basePrice;
//       } else {
//         const extraAdults = bookingDetails.adults - 2;
//         const extraAdultPrice = (basePrice / 2) * extraAdults;
//         return basePrice + extraAdultPrice;
//       }

//     default:
//       return basePrice;
//   }
// };

// Function to calculate children discount
// const calculateChildrenDiscount = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;

//   if (!bookingDetails?.children || bookingDetails.children <= 0 || !item?.originalPrice) return 0;

//   let perChildPrice = 0;

//   switch (activeFeature) {
//     case 'guided-tours':
//       perChildPrice = parsePrice(item.originalPrice) * 0.5;
//       break;

//     case 'group-discounts':
//       return 0;

//     case 'last-minute':
//     case 'seasonal-specials':
//     default:
//       perChildPrice = parsePrice(item.originalPrice) * 0.5;
//       break;
//   }

//   return perChildPrice * bookingDetails.children;
// };

// Fixed calculation of taxes and fees
// const calculateTaxesAndFees = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const item = selectedOffer.item;

//   if (!item?.discountedPrice) return 0;

//   const discountedPrice = parsePrice(item.discountedPrice);
//   let subtotal = discountedPrice;

//   if (activeFeature === 'guided-tours') {
//     subtotal *= bookingDetails?.adults || 1;

//     if (bookingDetails?.children > 0) {
//       subtotal += discountedPrice * 0.5 * bookingDetails.children;
//     }
//   } else if (activeFeature === 'last-minute' || activeFeature === 'seasonal-specials') {
//     if (bookingDetails?.adults > 2) {
//       const extraAdults = bookingDetails.adults - 2;
//       subtotal += (discountedPrice / 2) * extraAdults;
//     }

//     if (bookingDetails?.children > 0) {
//       subtotal += (discountedPrice / 2) * 0.5 * bookingDetails.children;
//     }
//   }

//   return Math.round(subtotal * 0.1);
// };

// Fixed total price calculation
// const calculateTotalPrice = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;

//   if (!item?.discountedPrice) return 0;

//   const discountedBasePrice = parsePrice(item.discountedPrice);
//   let subtotal = discountedBasePrice;

//   if (activeFeature === 'guided-tours') {
//     subtotal *= bookingDetails?.adults || 1;

//     if (bookingDetails?.children > 0) {
//       subtotal += discountedBasePrice * 0.5 * bookingDetails.children;
//     }
//   } else if (activeFeature === 'last-minute' || activeFeature === 'seasonal-specials') {
//     if (bookingDetails?.adults > 2) {
//       const extraAdults = bookingDetails.adults - 2;
//       subtotal += (discountedBasePrice / 2) * extraAdults;
//     }

//     if (bookingDetails?.children > 0) {
//       subtotal += (discountedBasePrice / 2) * 0.5 * bookingDetails.children;
//     }
//   }

//   const taxes = calculateTaxesAndFees(bookingDetails, activeFeature, selectedOffer, features);

//   return Math.round(subtotal + taxes);
// };



// const updateBookingDetails = (field, value) => {
//   const numValue = parseInt(value);
  
//   // Update the specific field
//   const newDetails = {
//     ...bookingDetails,
//     [field]: numValue
//   };
  
//   // Additional logic for children/infant ages arrays
//   if (field === 'children') {
//     if (numValue > bookingDetails.childrenAges.length) {
//       // Add new default ages if needed
//       newDetails.childrenAges = [
//         ...bookingDetails.childrenAges,
//         ...Array(numValue - bookingDetails.childrenAges.length).fill(5)
//       ];
//     } else {
//       // Truncate array if fewer children selected
//       newDetails.childrenAges = bookingDetails.childrenAges.slice(0, numValue);
//     }
//   }
  
//   if (field === 'infants') {
//     if (numValue > bookingDetails.infantAges.length) {
//       newDetails.infantAges = [
//         ...bookingDetails.infantAges,
//         ...Array(numValue - bookingDetails.infantAges.length).fill(0)
//       ];
//     } else {
//       newDetails.infantAges = bookingDetails.infantAges.slice(0, numValue);
//     }
//   }
  
//   setBookingDetails(newDetails);
// };
// const getPriceBreakdown = (bookingDetails, activeFeature) => {
//   if (!selectedOffer) return null;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;
  
//   if (!item?.discountedPrice) {
//     return {
//       basePackage: 0,
//       adjustments: [],
//       taxes: 0,
//       total: 0
//     };
//   }
  
//   const discountedPrice = parsePrice(item.discountedPrice);
//   let subtotal = 0;
//   const breakdown = {
//     basePackage: discountedPrice,
//     adjustments: []
//   };
  
//   if (activeFeature === 'guided-tours') {
//     const adults = bookingDetails?.adults || 1;
//     const adultAmount = discountedPrice * adults;
//     subtotal += adultAmount;
    
//     breakdown.adjustments.push({
//       label: `${adults} adults`,
//       amount: adultAmount
//     });
    
//     if (bookingDetails?.children > 0) {
//       const childrenAmount = discountedPrice * 0.5 * bookingDetails.children;
//       subtotal += childrenAmount;
      
//       breakdown.adjustments.push({
//         label: `${bookingDetails.children} children (50% off)`,
//         amount: childrenAmount
//       });
//     }
//   } else if (activeFeature === 'last-minute' || activeFeature === 'seasonal-specials') {
//     breakdown.adjustments.push({
//       label: 'Base package (for 2 adults)',
//       amount: discountedPrice
//     });
//     subtotal += discountedPrice;
    
//     if (bookingDetails?.adults > 2) {
//       const extraAdults = bookingDetails.adults - 2;
//       const extraAmount = (discountedPrice / 2) * extraAdults;
//       subtotal += extraAmount;
      
//       breakdown.adjustments.push({
//         label: `${extraAdults} additional adults`,
//         amount: extraAmount
//       });
//     }
    
//     if (bookingDetails?.children > 0) {
//       const childrenAmount = (discountedPrice / 2) * 0.5 * bookingDetails.children;
//       subtotal += childrenAmount;
      
//       breakdown.adjustments.push({
//         label: `${bookingDetails.children} children (50% off)`,
//         amount: childrenAmount
//       });
//     }
//   } else if (activeFeature === 'group-discounts') {
//     // For group packages, show the included capacity
//     let capacity = '';
//     if (item.name?.includes('Family')) {
//       capacity = 'up to 6 people';
//     } else if (item.name?.includes('Friends')) {
//       capacity = 'up to 10 people';
//     } else if (item.name?.includes('Corporate')) {
//       capacity = 'up to 20 people';
//     }
    
//     breakdown.adjustments.push({
//       label: `Group package (${capacity})`,
//       amount: discountedPrice
//     });
//     subtotal += discountedPrice;
//   }
  
//   // Add taxes
//   const taxes = Math.round(subtotal * 0.1);
//   breakdown.taxes = taxes;
//   breakdown.total = subtotal + taxes;
  
//   return breakdown;
// };
  


 
  // const calculatePackageDiscount = () => {
  //       if (activeFeature === 'last-minute') {
  //         return 5000;
  //       } else if (activeFeature === 'group-discounts') {
  //         return 2500;
  //       }
  //       return 0;
  //     };
// const parsePrice = (priceString) => {
//   if (!priceString) return 0;
//   return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
// };

// Function to calculate base price
// const calculateBasePrice = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;
//   if (!item?.originalPrice) return 0;

//   const basePrice = parsePrice(item.originalPrice);

//   switch (activeFeature) {
//     case 'guided-tours':
//       return basePrice * (bookingDetails?.adults || 1);

//     case 'group-discounts':
//       return basePrice;

//     case 'last-minute':
//     case 'seasonal-specials':
//       if (!bookingDetails?.adults || bookingDetails.adults <= 2) {
//         return basePrice;
//       } else {
//         const extraAdults = bookingDetails.adults - 2;
//         const extraAdultPrice = (basePrice / 2) * extraAdults;
//         return basePrice + extraAdultPrice;
//       }

//     default:
//       return basePrice;
//   }
// };

// Function to calculate children discount
// const calculateChildrenDiscount = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;

//   if (!bookingDetails?.children || bookingDetails.children <= 0 || !item?.originalPrice) return 0;

//   let perChildPrice = 0;

//   switch (activeFeature) {
//     case 'guided-tours':
//       perChildPrice = parsePrice(item.originalPrice) * 0.5;
//       break;

//     case 'group-discounts':
//       return 0;

//     case 'last-minute':
//     case 'seasonal-specials':
//     default:
//       perChildPrice = parsePrice(item.originalPrice) * 0.5;
//       break;
//   }

//   return perChildPrice * bookingDetails.children;
// };

// Fixed calculation of taxes and fees
// const calculateTaxesAndFees = (bookingDetails, activeFeature, selectedOffer) => {
//   if (!selectedOffer) return 0;
//   const item = selectedOffer.item;

//   if (!item?.discountedPrice) return 0;

//   const discountedPrice = parsePrice(item.discountedPrice);
//   let subtotal = discountedPrice;

//   if (activeFeature === 'guided-tours') {
//     subtotal *= bookingDetails?.adults || 1;

//     if (bookingDetails?.children > 0) {
//       subtotal += discountedPrice * 0.5 * bookingDetails.children;
//     }
//   } else if (activeFeature === 'last-minute' || activeFeature === 'seasonal-specials') {
//     if (bookingDetails?.adults > 2) {
//       const extraAdults = bookingDetails.adults - 2;
//       subtotal += (discountedPrice / 2) * extraAdults;
//     }

//     if (bookingDetails?.children > 0) {
//       subtotal += (discountedPrice / 2) * 0.5 * bookingDetails.children;
//     }
//   }

//   return Math.round(subtotal * 0.1);
// };

// Fixed total price calculation
// const calculateTotalPrice = (bookingDetails, activeFeature, selectedOffer, features) => {
//   if (!selectedOffer) return 0;
//   const feature = features.find(f => f.id === selectedOffer.featureId);
//   const item = selectedOffer.item;

//   if (!item?.discountedPrice) return 0;

//   const discountedBasePrice = parsePrice(item.discountedPrice);
//   let subtotal = discountedBasePrice;

//   if (activeFeature === 'guided-tours') {
//     subtotal *= bookingDetails?.adults || 1;

//     if (bookingDetails?.children > 0) {
//       subtotal += discountedBasePrice * 0.5 * bookingDetails.children;
//     }
//   } else if (activeFeature === 'last-minute' || activeFeature === 'seasonal-specials') {
//     if (bookingDetails?.adults > 2) {
//       const extraAdults = bookingDetails.adults - 2;
//       subtotal += (discountedBasePrice / 2) * extraAdults;
//     }

//     if (bookingDetails?.children > 0) {
//       subtotal += (discountedBasePrice / 2) * 0.5 * bookingDetails.children;
//     }
//   }

//   const taxes = calculateTaxesAndFees(bookingDetails, activeFeature, selectedOffer);

//   return Math.round(subtotal + taxes);
// };
const { isOpen } = props; 




const feature = features.find(f => f.id === activeFeature);
const item = selectedOffer?.item;

// Initialize adult price when modal opens
useEffect(() => {
  if (item) {
    let basePrice = parsePrice(item.discountedPrice);
    
    // Set initial adult price based on feature type
    if (activeFeature === 'guided-tours') {
      // For guided tours, price is per person
      updateBookingDetails('adultPrice', basePrice);
    } else if (activeFeature === 'group-discounts') {
      // For group discounts, price is for the entire group
      updateBookingDetails('adultPrice', 0); // Price per adult doesn't apply here
    } else {
      // For other packages, adjust price based on number of adults
      if (bookingDetails.adults === 1) {
        // Apply solo traveler surcharge (15% more)
        updateBookingDetails('adultPrice', basePrice * 1.15);
      } else {
        updateBookingDetails('adultPrice', basePrice / 2); // Price per adult for 2 or more
      }
    }
    
    // Calculate initial total price
    const totalPrice = calculateTotalPrice();
    updateBookingDetails('totalPrice', totalPrice);
  }
}, [isOpen , selectedOffer]);

const parsePrice = (priceString) => {
  if (!priceString) return 0;
  return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
};

const updateBookingDetails = (field, value) => {
  setBookingDetails(prev => {
    const newDetails = { ...prev, [field]: value };
    
    // Additional logic for children/infant ages arrays
    if (field === 'children') {
      const numValue = parseInt(value);
      if (numValue > prev.childrenAges.length) {
        // Add new default ages if needed
        newDetails.childrenAges = [
          ...prev.childrenAges,
          ...Array(numValue - prev.childrenAges.length).fill(5)
        ];
      } else {
        // Truncate array if fewer children selected
        newDetails.childrenAges = prev.childrenAges.slice(0, numValue);
      }
    }
    
    if (field === 'infants') {
      const numValue = parseInt(value);
      if (numValue > prev.infantAges.length) {
        newDetails.infantAges = [
          ...prev.infantAges,
          ...Array(numValue - prev.infantAges.length).fill(0)
        ];
      } else {
        newDetails.infantAges = prev.infantAges.slice(0, numValue);
      }
    }
    
    // If updating adults, recalculate adult price except for group packages
    if (field === 'adults' && activeFeature !== 'group-discounts') {
      const adultCount = parseInt(value);
      let newAdultPrice = prev.adultPrice;
      
      if (activeFeature === 'guided-tours') {
        // For guided tours, price remains the same per person
        newAdultPrice = parsePrice(item.discountedPrice);
      } else {
        // For other packages, adjust price for solo travelers
        if (adultCount === 1) {
          // Solo traveler surcharge
          newAdultPrice = parsePrice(item.discountedPrice) * 1.15;
        } else {
          // Regular price for 2+ adults
          newAdultPrice = parsePrice(item.discountedPrice) / 2;
        }
      }
      
      newDetails.adultPrice = newAdultPrice;
      
      // Update total price after changing adult count
      newDetails.totalPrice = calculateTotalPrice(newDetails);
    }
    
    // Update total price if changing people count
    if (['adults', 'children', 'infants'].includes(field)) {
      newDetails.totalPrice = calculateTotalPrice(newDetails);
    }
    
    return newDetails;
  });
};

const calculateBasePrice = () => {
  if (!item) return 0;
  
  switch (activeFeature) {
    case 'guided-tours':
      // For guided tours, price is per person
      return parsePrice(item.originalPrice) * bookingDetails.adults;
      
    case 'group-discounts':
      // For group discounts, price is for the entire group
      return parsePrice(item.originalPrice);
      
    default:
      // For other packages, price is base price plus extra adults
      const basePrice = parsePrice(item.originalPrice);
      if (bookingDetails.adults <= 2) {
        return basePrice;
      } else {
        const extraAdults = bookingDetails.adults - 2;
        return basePrice + (basePrice / 2) * extraAdults;
      }
  }
};

const calculateChildrenDiscount = () => {
  if (!item || bookingDetails.children <= 0) return 0;
  
  switch (activeFeature) {
    case 'guided-tours':
      // 50% discount per child
      return parsePrice(item.originalPrice) * 0.5 * bookingDetails.children;
      
    case 'group-discounts':
      // No additional discount for children in group packages
      return 0;
      
    default:
      // 50% discount on the per-adult price for children
      return (parsePrice(item.originalPrice) / 2) * 0.5 * bookingDetails.children;
  }
};

const calculatePackageDiscount = () => {
  if (!item) return 0;
  
  // Calculate the discount amount (original price - discounted price)
  const originalPrice = calculateBasePrice();
  const discountedBasePrice = parsePrice(item.discountedPrice);
  
  switch (activeFeature) {
    case 'guided-tours':
      return (parsePrice(item.originalPrice) - discountedBasePrice) * bookingDetails.adults;
      
    case 'group-discounts':
      return parsePrice(item.originalPrice) - discountedBasePrice;
      
    default:
      // For other packages, calculate discount on base price plus extra adults
      let discountedPrice = discountedBasePrice;
      if (bookingDetails.adults > 2) {
        const extraAdults = bookingDetails.adults - 2;
        discountedPrice += (discountedBasePrice / 2) * extraAdults;
      }
      return originalPrice - discountedPrice;
  }
};

const calculateTaxesAndFees = (details = bookingDetails) => {
  if (!item) return 0;
  
  let subtotal = 0;
  
  switch (activeFeature) {
    case 'guided-tours':
      // Calculate taxes on per-person price
      subtotal = parsePrice(item.discountedPrice) * details.adults;
      if (details.children > 0) {
        subtotal += parsePrice(item.discountedPrice) * 0.5 * details.children;
      }
      break;
      
    case 'group-discounts':
      // Calculate taxes on flat group price
      subtotal = parsePrice(item.discountedPrice);
      break;
      
    default:
      // Calculate taxes on base price plus extra people
      subtotal = parsePrice(item.discountedPrice);
      if (details.adults > 2) {
        const extraAdults = details.adults - 2;
        subtotal += (parsePrice(item.discountedPrice) / 2) * extraAdults;
      }
      if (details.children > 0) {
        subtotal += (parsePrice(item.discountedPrice) / 2) * 0.5 * details.children;
      }
  }
  
  // Apply 10% tax
  return Math.round(subtotal * 0.1);
};

const calculateTotalPrice = (details = bookingDetails) => {
  if (!item) return 0;
  
  let subtotal = 0;
  
  switch (activeFeature) {
    case 'guided-tours':
      // Per-person pricing
      subtotal = parsePrice(item.discountedPrice) * details.adults;
      if (details.children > 0) {
        subtotal += parsePrice(item.discountedPrice) * 0.5 * details.children;
      }
      break;
      
    case 'group-discounts':
      // Flat group pricing with potential extra person fees
      subtotal = parsePrice(item.discountedPrice);
      
      // Handle extra people for group packages
      if (item.name?.includes("Family") && (details.adults + details.children) > 6) {
        const extraPeople = (details.adults + details.children) - 6;
        subtotal += extraPeople * 5000;
      } else if (item.name?.includes("Friends") && (details.adults + details.children) > 10) {
        const extraPeople = (details.adults + details.children) - 10;
        subtotal += extraPeople * 4500;
      } else if (item.name?.includes("Corporate") && (details.adults + details.children) > 20) {
        const extraPeople = (details.adults + details.children) - 20;
        subtotal += extraPeople * 3500;
      }
      break;
      
    default:
      // Base package price with additional people
      subtotal = parsePrice(item.discountedPrice);
      if (details.adults > 2) {
        const extraAdults = details.adults - 2;
        subtotal += (parsePrice(item.discountedPrice) / 2) * extraAdults;
      }
      if (details.children > 0) {
        subtotal += (parsePrice(item.discountedPrice) / 2) * 0.5 * details.children;
      }
  }
  
  // Add taxes and fees
  const taxes = calculateTaxesAndFees(details);
  
  return Math.round(subtotal + taxes);
};
const onClose=()=>{
isBookingModalOpen(false)
}
const renderOfferDetails = () => {
    if (!selectedOffer) return null;
    const feature = features.find(f => f.id === selectedOffer.featureId);
    const item = selectedOffer.item;

    console.log('Item passed to getPriceBreakdown:', item)
    console.log('Available features:', features);
    console.log('Active Feature:', activeFeature);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <button 
            onClick={goBack}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className={`${feature.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
            {feature.icon}
          </div>
          <span className="ml-2 text-gray-700">{feature.title}</span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">{item.description}</p>
        </div>
       
{/* Price section */}
<div className="mb-4 p-4 bg-gray-50 rounded-lg"> 
  {/* Price comparison */}
   <div className="flex items-baseline mb-2">
    <span className="text-gray-600 mr-2">Price:</span>
    <span className="text-gray-500 line-through text-sm mr-2">{item.originalPrice}</span>
    <span className="text-green-600 font-bold text-lg">{item.discountedPrice}</span>
    <span className="text-green-600 text-xs ml-2">Save {item.originalPrice && item.discountedPrice ? 
      `${Math.round(((parseFloat(item.originalPrice.replace(/[^0-9.-]+/g, '')) - 
      parseFloat(item.discountedPrice.replace(/[^0-9.-]+/g, ''))) / 
      parseFloat(item.originalPrice.replace(/[^0-9.-]+/g, ''))) * 100)}%` : ''}</span>
  </div> 
  
   {/* Pricing explanation  */}
  <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
    {selectedOffer?.featureId === 'last-minute' && 
      <span>Complete package for 2 people</span>
    }
    {selectedOffer?.featureId === 'guided-tours' && 
      <span>Price shown is per person</span>
    }
    {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Family") &&
      <span>Family package price (includes up to 6 people)</span>
    }
    {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Friends") &&
      <span>Group price (includes up to 10 people)</span>
    }
    {selectedOffer?.featureId === 'group-discounts' && item.name?.includes("Corporate") &&
      <span>Corporate group price (includes up to 20 people)</span>
    }
    {selectedOffer?.featureId === 'seasonal-specials' && 
      <span>Complete package for 2 people</span>
    }
    {!selectedOffer?.featureId &&
      <span>{activeFeature === 'guided-tours' ? 'Price per person' : 
             activeFeature === 'group-discounts' ? 'Total price for your group' : 
             'Complete package price'}</span>
    }
  </div>
</div>
{/* Price breakdown */}

 {/* <div className="mt-4 bg-gray-50 p-4 rounded"> */}
  {/* <h3 className="font-semibold mb-2">Price Breakdown</h3>  */}
 {/*  */}
  {/* {getPriceBreakdown().adjustments.map((item, index) => (
  
    
    <div key={index} className="flex justify-between text-sm mb-1">
      <span>{item.label}</span>
      <span>₹{item.amount.toLocaleString()}</span>
    </div>
  ))} */}
  
  {/* <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between text-sm">
    <span>Taxes and fees (10%)</span>
    <span>₹{getPriceBreakdown().taxes.toLocaleString()}</span>
  </div>
  
  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-semibold">
    <span>Total</span>
    <span>₹{getPriceBreakdown().total.toLocaleString()}</span>
  </div> */}
{/* </div> */}

        
        {/* Feature specific information */}
        <div className="mb-4 p-4 rounded-lg bg-gray-50">
          {selectedOffer.featureId === 'last-minute' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-red-600 font-bold">{item.discount}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Availability:</span>
                <span className="text-orange-600">{item.remaining}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Duration:</span>
                <span className="text-gray-800">{item.duration}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Valid Dates:</span>
                <span className="text-gray-800">{item.validDates}</span>
              </div>
            </>
          )}
          
          {selectedOffer.featureId === 'guided-tours' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="text-gray-800">{item.duration}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Rating:</span>
                <span className="text-green-600">★ {item.rating}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Available Times:</span>
                <span className="text-gray-800">{item.timeSlots.join(', ')}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Valid Days:</span>
                <span className="text-gray-800">{item.validDates}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Meeting Point:</span>
                <span className="text-gray-800">{item.meetingPoint}</span>
              </div>
            </>
          )}
          
          {selectedOffer.featureId === 'group-discounts' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-purple-600 font-bold">{item.discount}</span>
              </div>
              {item.popular && (
                <div className="mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Most Popular Choice</span>
                </div>
              )}
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Duration:</span>
                <span className="text-gray-800">{item.duration}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Valid Dates:</span>
                <span className="text-gray-800">{item.validDates}</span>
              </div>
            </>
          )}
          
          {selectedOffer.featureId === 'seasonal-specials' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Season:</span>
                <span className="text-gray-800">{item.season}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Status:</span>
                <span className="text-orange-600">{item.status}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Duration:</span>
                <span className="text-gray-800">{item.duration}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Valid Dates:</span>
                <span className="text-gray-800">{item.validDates}</span>
              </div>
            </>
          )}
        </div>
        
        {/* Accommodation section */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Accommodation</h4>
          <p className="text-gray-700">{item.accommodation}</p>
        </div>
        
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
   
      
<div className="mt-6 space-y-4">
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

 

 


{isBookingModalOpen && ( <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="min-h-[200px] max-h-[90vh] w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full overflow-y-auto max-h-[calc(100vh-40px)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Book {item?.name}</h3>
            <button 
              // onClick={onClose}
              onClick={() => setIsBookingModalOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className={`${feature?.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
              {feature?.icon}
            </div>
            <span className="ml-2 text-gray-700">{feature?.title}</span>
            {activeFeature === 'last-minute' && (
              <span className="ml-2 text-red-600 font-bold">{item?.discount}</span>
            )}
            {activeFeature === 'group-discounts' && (
              <span className="ml-2 text-purple-600 font-bold">{item?.discount}</span>
            )}
          </div>

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

          <div className="space-y-4">
            {/* Show date inputs for all packages except guided tours */}
            {activeFeature !== 'guided-tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prefered Travel Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDetails.startDate}
                    onChange={(e) => updateBookingDetails('startDate', e.target.value)}
                  />
                </div>
                 {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
                    value={bookingDetails.endDate}
                    onChange={(e) => updateBookingDetails('endDate', e.target.value)}
                  />
                </div>  */}
              </div>
            )}

            {/* Show specific date for guided tours */}
            {activeFeature === 'guided-tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDetails.startDate}
                    onChange={(e) => updateBookingDetails('startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {item?.timeSlots?.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    )) || (
                      <option value="10:00 AM">10:00 AM</option>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Person counts for all packages except group discounts */}
            {activeFeature !== 'group-discounts' && (
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
                  {bookingDetails.adults === 1 && activeFeature !== 'guided-tours' && (
                    <span className="text-xs text-gray-500 mt-1 block">Solo traveler surcharge applied</span>
                  )}
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
                  <span className="text-xs text-gray-500 mt-1 block">50% of adult price</span>
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
                  <span className="text-xs text-gray-500 mt-1 block">Free of charge</span>
                </div>
              </div>
            )}

            {/* Group package people count */}
            {activeFeature === 'group-discounts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total People</label>
                  <div className="flex items-center">
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={bookingDetails.adults + bookingDetails.children}
                      onChange={(e) => {
                        const total = parseInt(e.target.value);
                        // Default to all adults, but maintain children count if possible
                        const children = Math.min(bookingDetails.children, total);
                        const adults = total - children;
                        updateBookingDetails('adults', adults);
                        updateBookingDetails('children', children);
                      }}
                    >
                      {item?.name?.includes("Family") ? (
                        // Family package: 2-10 people
                        Array.from({length: 9}, (_, i) => i + 2).map(num => (
                          <option key={num} value={num}>{num} people</option>
                        ))
                      ) : item?.name?.includes("Friends") ? (
                        // Friends package: 6-15 people
                        Array.from({length: 10}, (_, i) => i + 6).map(num => (
                          <option key={num} value={num}>{num} people</option>
                        ))
                      ) : (
                        // Corporate package: 10-30 people
                        Array.from({length: 21}, (_, i) => i + 10).map(num => (
                          <option key={num} value={num}>{num} people</option>
                        ))
                      )}
                    </select>
                  </div>
                  {item?.name?.includes("Family") && (bookingDetails.adults + bookingDetails.children) > 6 && (
                    <span className="text-xs text-gray-500 mt-1 block">Extra person fee applies above 6 people</span>
                  )}
                  {item?.name?.includes("Friends") && (bookingDetails.adults + bookingDetails.children) > 10 && (
                    <span className="text-xs text-gray-500 mt-1 block">Extra person fee applies above 10 people</span>
                  )}
                  {item?.name?.includes("Corporate") && (bookingDetails.adults + bookingDetails.children) > 20 && (
                    <span className="text-xs text-gray-500 mt-1 block">Extra person fee applies above 20 people</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your group name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={bookingDetails.groupName}
                    onChange={(e) => updateBookingDetails('groupName', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Price Summary</h3>
              <div className="mt-2 space-y-2">
                {activeFeature === 'guided-tours' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Adults: {bookingDetails.adults} × ₹{parsePrice(item?.discountedPrice).toLocaleString()}
                    </span>
                    <span className="font-medium">₹{(bookingDetails.adults * parsePrice(item?.discountedPrice)).toLocaleString()}</span>
                  </div>
                )}
                
                {activeFeature === 'group-discounts' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Group package ({item?.name?.includes("Family") ? "up to 6 people" : 
                        item?.name?.includes("Friends") ? "up to 10 people" : 
                        "up to 20 people"})
                    </span>
                    <span className="font-medium">₹{parsePrice(item?.discountedPrice).toLocaleString()}</span>
                  </div>
                )}
                
                {activeFeature !== 'guided-tours' && activeFeature !== 'group-discounts' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Base package {bookingDetails.adults <= 2 ? `(${bookingDetails.adults} adults)` : '(2 adults)'}
                    </span>
                    <span className="font-medium">₹{parsePrice(item?.discountedPrice).toLocaleString()}</span>
                  </div>
                )}
                
                {activeFeature !== 'guided-tours' && activeFeature !== 'group-discounts' && bookingDetails.adults > 2 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Additional adults: {bookingDetails.adults - 2} × ₹{(parsePrice(item?.discountedPrice) / 2).toLocaleString()}
                    </span>
                    <span className="font-medium">₹{((bookingDetails.adults - 2) * (parsePrice(item?.discountedPrice) / 2)).toLocaleString()}</span>
                  </div>
                )}
                
                {activeFeature !== 'group-discounts' && bookingDetails.children > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Children: {bookingDetails.children} × ₹{activeFeature === 'guided-tours' ? 
                        (parsePrice(item?.discountedPrice) * 0.5).toLocaleString() : 
                        (parsePrice(item?.discountedPrice) / 2 * 0.5).toLocaleString()}
                    </span>
                    <span className="font-medium">₹{activeFeature === 'guided-tours' ? 
                      (bookingDetails.children * parsePrice(item?.discountedPrice) * 0.5).toLocaleString() : 
                      (bookingDetails.children * parsePrice(item?.discountedPrice) / 2 * 0.5).toLocaleString()}</span>
                  </div>
                )}
                
                {activeFeature === 'group-discounts' && (
                  <>
                    {item?.name?.includes("Family") && (bookingDetails.adults + bookingDetails.children) > 6 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Extra people: {(bookingDetails.adults + bookingDetails.children) - 6} × ₹5,000
                        </span>
                        <span className="font-medium">₹{(((bookingDetails.adults + bookingDetails.children) - 6) * 5000).toLocaleString()}</span>
                      </div>
                    )}
                    {item?.name?.includes("Friends") && (bookingDetails.adults + bookingDetails.children) > 10 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Extra people: {(bookingDetails.adults + bookingDetails.children) - 10} × ₹4,500
                        </span>
                        <span className="font-medium">₹{(((bookingDetails.adults + bookingDetails.children) - 10) * 4500).toLocaleString()}</span>
                      </div>
                    )}
                    {item?.name?.includes("Corporate") && (bookingDetails.adults + bookingDetails.children) > 20 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Extra people: {(bookingDetails.adults + bookingDetails.children) - 20} × ₹3,500
                        </span>
                        <span className="font-medium">₹{(((bookingDetails.adults + bookingDetails.children) - 20) * 3500).toLocaleString()}</span>
                      </div>
                    )}
                  </>
                )}
                
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

            {/* Feature-specific fields */}
            {activeFeature === 'guided-tours' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Guide Language</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={bookingDetails.guideLang}
                  onChange={(e) => updateBookingDetails('guideLang', e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="urdu">Urdu</option>
                  <option value="kashmiri">Kashmiri</option>
                </select>
              </div>
            )}

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea 
                placeholder="Any special requests or requirements?"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                value={bookingDetails.specialRequests}
                onChange={(e) => updateBookingDetails('specialRequests', e.target.value)}
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                // onClick={onClose}
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
)
}



  </div>
      </motion.div>
    );
   };



            
            

const renderAllOffers = () => {
    if (!viewingAllOffers) return null;
    
    const feature = features.find(f => f.id === activeFeature);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">All {feature.title}</h3>
          <button 
            onClick={goBack}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feature.content.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigateToOffer(activeFeature, item)}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 border border-gray-200"
            >
              <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
              
              {activeFeature === 'last-minute' && (
            
            
                <div className="mt-2">
  <div className="flex items-baseline">
    <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
    <span className="text-green-600 font-medium">{item.discountedPrice}</span>
  </div>
  <p className="text-xs text-gray-600 mt-1">
    {activeFeature === 'guided-tours' ? 'Per person' : 
     activeFeature === 'group-discounts' ? 'Total for group' : 
     'Package price'}
  </p>
  <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
  <p className="text-gray-600 text-xs">{item.validDates}</p>
</div>        )}
              
              {activeFeature === 'guided-tours' && (
                <div>
                  <span className="text-gray-600 text-sm">{item.duration}</span>
                  <p className="text-green-600 text-xs mt-1">★ {item.rating}</p>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
                    <span className="text-green-600 font-medium">{item.discountedPrice}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{item.timeSlots.join(', ')}</p>
                  <p className="text-gray-600 text-xs">{item.validDates}</p>
                </div>
              )}
              
              {activeFeature === 'group-discounts' && (
                <div>
                  <span className="text-purple-600 font-medium text-sm">{item.discount}</span>
                  {item.popular && (
                    <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
                  )}
                  <div className="mt-2 flex items-baseline">
                    <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
                    <span className="text-green-600 font-medium">{item.discountedPrice}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
                  <p className="text-gray-600 text-xs">{item.validDates}</p>
                </div>
              )}
              
              {activeFeature === 'seasonal-specials' && (
                <div>
                  <span className="text-gray-600 text-sm">{item.season}</span>
                  <p className="text-orange-600 text-xs mt-1">{item.status}</p>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-gray-500 line-through text-xs mr-2">{item.originalPrice}</span>
                    <span className="text-green-600 font-medium">{item.discountedPrice}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
                  <p className="text-gray-600 text-xs">{item.validDates}</p>
                </div>
              )}
              
              <div className="mt-2">
                <p className="text-gray-600 text-xs line-clamp-2">{item.description}</p>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
   };

  return (
    <div className="relative bg-gray-50 p-4 mb-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Explore Our Offers</h2>

        {/* Feature Cards */}
        {/* <div className="translate-y-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          {features.slice(0, 2).map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgClass} ${feature.hoverClass} px-5 py-3 rounded-lg cursor-pointer 
                        transition duration-300 flex items-center group shadow-md
                        ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`mr-3 ${feature.iconBgClass} text-white p-2 rounded`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
                <p className="text-gray-600 text-xs">{feature.subtitle}</p>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} />
            </div>
          ))}
        </div> */}

        {/* Additional features for mobile */}
        {/* <div className="md:hidden mt-20 space-y-4">
          {features.slice(2).map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgClass} ${feature.hoverClass} px-5 py-3 rounded-lg cursor-pointer 
                        transition duration-300 flex items-center group shadow-md
                        ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`mr-3 ${feature.iconBgClass} text-white p-2 rounded`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
                <p className="text-gray-600 text-xs">{feature.subtitle}</p>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 
                                    ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} />
            </div>
          ))}
        </div> */}
        {/* Feature Cards - Visible on all devices */}
{/* <div className="translate-y-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
  {features.map((feature) => (
    <div
      key={feature.id}
      className={`${feature.bgClass} ${feature.hoverClass} px-5 py-3 rounded-lg cursor-pointer 
                  transition duration-300 flex items-center group shadow-md
                  ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
      onClick={() => handleFeatureClick(feature.id)}
    >
      <div className={`mr-3 ${feature.iconBgClass} text-white p-2 rounded`}>
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
</div> */}
{/* Feature Cards - Responsive for All Devices */}

<div className="translate-y-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12">
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



        {/* Expanded content - shows when a feature is selected */}
        <AnimatePresence>
          {activeFeature && !viewingAllOffers && !selectedOffer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 left-0 right-0 mt-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">
                  {features.find(f => f.id === activeFeature)?.title}
                </h3>
                <button
                  onClick={() => setActiveFeature(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateToOffer(activeFeature, item)}
                    className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition duration-300"
                  >
                    <h4 className="font-medium text-gray-800">{item.name}</h4>

                    {/* Conditional rendering based on feature type */}
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

export default FeatureCards;