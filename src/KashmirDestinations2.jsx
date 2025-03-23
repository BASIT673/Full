import ToursCarousel from './components/Tourca';
// const handleBookNow = async () => {
//   if (!destination || !destination.tourDetails) {
//     alert("❌ Invalid destination selected. Please try again.");
//     return;
//   }

//   const selectedTour = destination.tourDetails; // Ensure we get the correct tour details
//   const title = selectedTour.title || destination.title;
//   const price = selectedTour.price;
//   const description = selectedTour.description || destination.description;

//   console.log("✅ Final Title:", title);
//   console.log("✅ Final Price:", price);
//   console.log("✅ Description:", description);

//   if (!title || !price) {
//     alert("❌ Missing tour information. Please check the destination data.");
//     return;
//   }

//   // Fetch the user token
//   const token = localStorage.getItem('token');
//   console.log("🔵 Token Retrieved:", token);

//   let userData = null;

//   // Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data;
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error('🚨 Error fetching user data:', error);
//     }
//   }

//   // Ask for email if not found
//   let userEmail = userData?.email?.trim() || '';
//   if (!userEmail) {
//     console.warn("⚠️ No email found! Asking user...");
//     userEmail = prompt("Please enter your email for booking confirmation:");
//     if (!userEmail) {
//       alert("❌ Email is required for booking.");
//       return;
//     }
//   }

//   console.log("✅ Final User Email:", userEmail);

//   // Package Details
//   const packageDetails = {
//     id: `tour-${Date.now()}`,
//     name: title,
//     description: `Tour package for ${title}`,
//   };

//   console.log("Package Details:", packageDetails);

//   // Payment Process
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }
//       const amountInPaise = parseInt(price.replace(/\D/g, '')) * 100; // Convert to paise

//       const payload = {
//         amount: amountInPaise,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//       };
      
//       console.log("✅ Corrected Request Payload:", payload);
      
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload),
//       });
      
     

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: price * 100,
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: {
//                   name: userData?.username || 'Guest',
//                   email: userEmail
//                 }
//               }),
//             });

//             console.log("✅ Sent Token in API Call:", token);

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//         },
//         theme: { color: '#3399cc' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// };
// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import BookNowButton from './components/BookNowButton';
// import { MapPin, Mountain, Star,Users,Utensils, Building, X, Clock, DollarSign, Calendar, ChevronLeft, ChevronRight,Heart, Share2, TagIcon, Camera ,Check} from 'lucide-react';



// // const DestinationModal = ({ destination, onClose }) => {
// //   if (!destination) return null;
// //   const handleBookNow = async () => {
// //           if (!destination || !destination.tourDetails) {
// //             alert("❌ Invalid destination selected. Please try again.");
// //             return;
// //           }
        
          
// //         };
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
// //       <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl relative">
// //         {/* Close button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white z-10 shadow-md"
// //         >
// //           <X className="h-4 w-4" />
// //         </button>
        
// //         {/* Header image with gradient overlay */}
// //         <div className="relative h-48 md:h-64">
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30" />
// //           <img
// //             src={`http://localhost:5000${destination.image}`}
// //             alt={destination.title}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-4 left-4 right-4">
// //             <div className="flex items-center">
// //               <span className="bg-orange-500/90 p-1.5 rounded-full text-white">
// //                 {destination.icon}
// //               </span>
// //               <h2 className="text-2xl font-bold text-white ml-3">{destination.title}</h2>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="p-4 md:p-5">
// //           {/* Tour Details Card */}
// //           <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
// //             <div className="grid grid-cols-3 gap-2 text-sm">
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Clock className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Duration</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.duration}</span>
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <DollarSign className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Price</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.price}</span>
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Calendar className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Best Time</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.bestTime}</span>
// //               </div>
// //             </div>
            
// //             {/* Action Buttons */}
// //             <div className="mt-4 grid grid-cols-2 gap-3">
// //               <button onClick={handleBookNow}
// //                 className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
// //               >
// //                 Book Now
// //               </button>
// //               <button
// //                 className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm border border-gray-200"
// //               >
// //                 Get Quote
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Content Section */}
// //           <div className="grid md:grid-cols-2 gap-5">
// //             <div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Destination</h3>
// //               <p className="text-sm text-gray-600 leading-relaxed">{destination.description}</p>
// //             </div>
            
// //             {destination.details && (
// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
// //                 <ul className="space-y-2">
// //                   {destination.details.map((detail, index) => (
// //                     <li key={index} className="flex items-start text-sm">
// //                       <span className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
// //                         <Check className="h-2.5 w-2.5" />
// //                       </span>
// //                       <span className="text-gray-600">{detail}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}
// //           </div>
          
// //           {/* Package Inclusions */}
// //           {destination.tourDetails.inclusions && (
// //             <div className="mt-6">
// //               <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Inclusions</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                 {destination.tourDetails.inclusions.map((inclusion, index) => (
// //                   <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                     <Check className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
// //                     <span>{inclusion}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// const DestinationCard = ({ destination,item, onViewMore }) => {
  
//   const discountPercentage = Math.round(
//     ((destination.originalPrice - destination.price) / destination.originalPrice) * 100
//   );
  
//   // Format price with comma separators
//   const formatPrice = (price) => {
//     return `₹${price}`;
//   };

//   return (
//     <div className="w-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
//       {/* Image Container with overlay gradient */}
//       <div className="relative h-44">
//         <img 
//           src={destination.imageUrl || "/api/placeholder/300/200"} 
//           alt={destination.name} 
//           className="w-full h-full object-cover"
//         />
//         {/* Gradient overlay at bottom of image */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
//         {/* Discount badge */}
//         {discountPercentage > 0 && (
//           <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
//             {discountPercentage}% OFF
//           </div>
//         )}
        
//         {/* Location info on image */}
//         <div className="absolute bottom-2 left-2 text-white">
//           <div className="flex items-center">
//             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//             </svg>
//             <span className="text-xs font-medium">{destination.location}</span>
//           </div>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="p-3">
//         {/* Title with truncate */}
//         <h3 className="text-sm font-semibold text-gray-800 h-10 line-clamp-2">
//           {/* {item.title} */}
//         </h3>
        
//         {/* Package details */}
//         <div className="flex items-center mt-2 mb-1">
//           <svg className="w-3 h-3 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//           </svg>
//           <span className="text-xs text-gray-50" {destination.duration}</span>
//         </div>
        
//         {/* Activity tags in horizontal scroll */}
//         <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
//           {destination.activities?.map((activity, index) => (
//             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
//               {activity}
//             </span>
//           ))}
//         </div>
        
//         {/* Rating bar */}
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-xs font-medium bg-green-600 text-white px-1.5 py-0.5 rounded mr-1">
//               {destination.rating}
//             </span>
//             <span className="text-xs text-gray-600">
//               {destination.reviewCount} Activities
//             </span>
//           </div>
          
//           {/* Bestseller tag if applicable */}
//           {destination.isBestseller && (
//             <span className="text-xs font-medium text-orange-600">
//               Bestseller
//             </span>
//           )}
//         </div>
        
//         {/* Divider */}
//         <div className="border-t border-gray-200 my-2"></div>
        
//         {/* Price section */}
//         <div className="flex items-center justify-between">
//           <div>
//             {destination.originalPrice > destination.price && (
//               <span className="text-xs text-gray-500 line-through block">
//                 {formatPrice(destination.originalPrice)}
//               </span>
//             )}
//             <div className="flex items-baseline">
//               <span className="text-base font-bold text-gray-900">
//                 {formatPrice(destination.price)}
//               </span>
//               <span className="text-xs ml-1 text-gray-600">
//                 per adult
//               </span>
//             </div>
//           </div>
          
//           {/* View More button */}
//           <button
//             onClick={() => onViewMore(destination)}
//             className="text-sm px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors duration-200"
//           >
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // const DestinationModal = ({ destination, onClose }) => {
// //   const [activeTab, setActiveTab] = React.useState('about');
  
// //   // if (!destination) return null;
  
// //   const handleBookNow = async () => {
// //     if (!destination || !destination.tourDetails) {
// //       alert("❌ Invalid destination selected. Please try again.");
// //       return;
// //     }
// //   };
  
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
// //       <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl relative">
// //         {/* Close button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white z-10 shadow-md"
// //         >
// //           <X className="h-4 w-4" />
// //         </button>
        
// //         {/* Header image with gradient overlay */}
// //         <div className="relative h-48 md:h-64">
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30" />
// //           <img
// //             src={`http://localhost:5000${destination.image}`}
// //             alt={destination.title}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-4 left-4 right-4">
// //             <div className="flex items-center">
// //               <span className="bg-orange-500/90 p-1.5 rounded-full text-white">
// //                 {destination.icon}
// //               </span>
// //               <h2 className="text-2xl font-bold text-white ml-3">{destination.title}</h2>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="p-4 md:p-5">
// //           {/* Tour Details Card */}
// //           <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
// //             <div className="grid grid-cols-3 gap-2 text-sm">
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Clock className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Duration</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.duration}</span>
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <DollarSign className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Price</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.price}</span>
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Calendar className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Best Time</span>
// //                 <span className="font-medium text-gray-800">{destination.tourDetails.bestTime}</span>
// //               </div>
// //             </div>
            
// //             {/* Action Buttons */}
// //             <div className="mt-4 grid grid-cols-2 gap-3">
// //               <button onClick={handleBookNow}
// //                 className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
// //               >
// //                 Book Now
// //               </button>
// //               <button
// //                 className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm border border-gray-200"
// //               >
// //                 Get Quote
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Tabs Navigation */}
// //           <div className="border-b border-gray-200 mb-5">
// //             <nav className="flex space-x-6" aria-label="Tabs">
// //               <button
// //                 onClick={() => setActiveTab('about')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'about'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 About
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('itinerary')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'itinerary'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 Itinerary
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('inclusions')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'inclusions'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 Inclusions & Exclusions
// //               </button>
// //             </nav>
// //           </div>
          
// //           {/* Tab Content */}
// //           {activeTab === 'about' && (
// //             <div className="grid md:grid-cols-2 gap-5">
// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Destination</h3>
// //                 <p className="text-sm text-gray-600 leading-relaxed">{destination.description}</p>
// //               </div>
              
// //               {destination.details && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
// //                   <ul className="space-y-2">
// //                     {destination.details.map((detail, index) => (
// //                       <li key={index} className="flex items-start text-sm">
// //                         <span className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
// //                           <Check className="h-2.5 w-2.5" />
// //                         </span>
// //                         <span className="text-gray-600">{detail}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           )}
          
// //           {activeTab === 'itinerary' && destination.itinerary && (
// //             <div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Itinerary</h3>
// //               <div className="space-y-4">
// //                 {destination.itinerary.map((day, index) => (
// //                   <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
// //                     <div className="flex items-center mb-3">
// //                       <div className="bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3">
// //                         {index + 1}
// //                       </div>
// //                       <h4 className="font-medium text-gray-800">{day.day}: {day.title}</h4>
// //                     </div>
                    
// //                     <div className="ml-9">
// //                       {day.activities.length > 0 && (
// //                         <div className="mb-3">
// //                           <h5 className="text-sm font-medium text-gray-700 mb-2">Activities:</h5>
// //                           <ul className="space-y-1">
// //                             {day.activities.map((activity, idx) => (
// //                               <li key={idx} className="flex items-start text-sm">
// //                                 <MapPin className="h-3.5 w-3.5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
// //                                 <span className="text-gray-600">{activity}</span>
// //                               </li>
// //                             ))}
// //                           </ul>
// //                         </div>
// //                       )}
                      
// //                       {day.meals.length > 0 && (
// //                         <div>
// //                           <h5 className="text-sm font-medium text-gray-700 mb-2">Meals:</h5>
// //                           <div className="flex flex-wrap gap-2">
// //                             {day.meals.map((meal, idx) => (
// //                               <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
// //                                 <Utensils className="h-3 w-3 mr-1" />
// //                                 {meal}
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
          
// //           {activeTab === 'inclusions' && (
// //             <div className="space-y-6">
// //               {destination.tourDetails.inclusions && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Inclusions</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                     {destination.tourDetails.inclusions.map((inclusion, index) => (
// //                       <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                         <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
// //                         <span>{inclusion}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //               {destination.tourDetails.notIncluded && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Exclusions</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                     {destination.tourDetails.notIncluded.map((notIncluded, index) => (
// //                       <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                         {/* <X className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" /> */}
// //                         <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
// //                         <span>{notIncluded}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
              
              
// //               {destination.notIncluded && destination.notIncluded.length > 0 && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Not Included</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                     {destination.tourDetails.notIncluded.map((item, index) => (
// //                       <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                         <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
// //                         <span>{item.type}</span> 
                        
                        
// //                       </div>
// //                     ))} 
// //                    </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const DestinationCard=()=>{
// //   console.log("hi")
// // }
// // const DestinationCard = ({ tour,destination,onClick }) => (
// //   <div
// //     onClick={onClick}
// //     className="group relative cursor-pointer max-w-full min-w-[300px] min-h-[420px] overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
// //   >
// //     {/* Image Container */}
// //     <div className="relative h-56 overflow-hidden">
// //       <img
// //         src={destination.image}
// //         alt={destination.title}
// //         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
// //       />
      
// //       {/* Badges Overlay */}
// //       <div className="absolute top-3 left-3 z-20 flex space-x-2">
// //         <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
// //           Featured
// //         </span>
// //         {destination.trending && (
// //           <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
// //             Trending
// //           </span>
// //         )}
// //       </div>
      
// //       {/* Discount Tag */}
// //       {destination.discount && (
// //         <div className="absolute top-3 right-3 bg-white py-1 px-3 text-xs font-bold text-orange-600 rounded-full shadow-sm">
// //           {destination.discount}% OFF
// //         </div>
// //       )}
      
// //       {/* Thrillophilia-style "Bestseller" tag */}
// //       {destination.bestseller && (
// //         <div className="absolute bottom-3 left-3 bg-green-500 py-1 px-2 text-xs font-medium text-white rounded">
// //           BESTSELLER
// //         </div>
// //       )}
// //     </div>
    
// //     {/* Content Section */}
// //     <div className="p-4">
// //       {/* Title - Reduced font */}
// //       <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">
// //         {destination.title}
// //       </h3>
      
// //       {/* Tour Details - Essential info only */}
// //       <div className="flex flex-wrap items-center gap-x-4 text-xs text-gray-600 mb-3">
// //         <div className="flex items-center">
// //           <Calendar className="mr-1 h-3 w-3 text-orange-500" />
// //           <span>{destination.duration}</span>
// //         </div>
// //         <div className="flex items-center">
// //           <MapPin className="mr-1 h-3 w-3 text-orange-500" />
// //           <span>{destination.location}</span>
// //         </div>
// //       </div>
      
// //       {/* Marketing Element - Thrillophilia-style highlights */}
// //       <div className="flex items-center justify-between py-2 mb-3 border-y border-gray-100">
// //         <div className="flex flex-wrap gap-x-3 text-xs">
// //           {/* Collection Badge - like Thrillophilia uses */}
// //           {/* {tour.collection && (
// //             <div className="flex items-center">
// //               <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
// //                 <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
// //               </svg>
// //               <span className="text-gray-600">{tour.collection}</span>
// //             </div>
// //           )} */}
// //           {destination.collection && (
// //   <div className="flex items-center">
// //     {destination.collection === "Premium" && (
// //       <svg className="h-3 w-3 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.26 5.82 22 7 14.14l-5-4.87 6.91-1.01z"></path>
// //       </svg> 
// //     )}

// //     {destination.collection === "Budget" && (
// //       <svg className="h-3 w-3 mr-1 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M12 1v22M19 5H5M19 12H5M19 19H5"></path>
// //       </svg>
// //     )}

// //     {destination.collection === "Luxury" && (
// //       <svg className="h-3 w-3 mr-1 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M21 8L9 20l-5.5-5.5L5 12l4 4 10-10z"></path>
// //       </svg>
// //     )}

// //     {destination.collection === "Adventure" && (
// //       <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M12 2L2 22h20L12 2z"></path>
// //       </svg>
// //     )}

// //     <span className="text-gray-600">{destination.collection}</span>
// //   </div>
// // )}

          
// //           {/* Instant Confirmation Badge */}
// //           <div className="flex items-center">
// //             <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
// //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //             </svg>
// //             <span className="text-gray-600">Instant Confirmation</span>
// //           </div>
          
// //           {/* Cancellation Badge - if applicable */}
// //           {destination.cancellation && (
// //             <div className="flex items-center">
// //               <svg className="h-3 w-3 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
// //                 <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
// //               </svg>
// //               <span className="text-gray-600">{destination.cancellation}</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
      
// //       {/* Bottom section with Rating and Price - Exact Thrillophilia style */}
// //       <div className="flex items-center justify-between">
// //         {/* Rating - Thrillophilia exact style */}
// //         <div className="flex items-center">
// //           <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
// //             <span>{destination.rating}</span>
// //             <Star className="h-3 w-3 ml-0.5 fill-current" />
// //           </div>
// //           <span className="text-xs text-gray-500 ml-1">({destination
// //           .reviews})</span>
// //         </div>
        
// //         {/* Price - Exact Thrillophilia style */}
// //         <div className="flex flex-col items-end">
// //           {destination.originalPrice && (
// //             <div className="flex items-center">
// //               <span className="text-xs text-gray-500 line-through">₹{destination.originalPrice}</span>
// //               <span className="ml-1 text-xs font-medium text-green-600">
// //                 {Math.round((destination.originalPrice - destination.price) / destination.originalPrice * 100)}% off
// //               </span>
// //             </div>
// //           )}
// //           <div className="flex items-baseline">
// //             <span className="text-xs text-gray-500">From </span>
// //             <span className="ml-1 text-lg font-semibold text-gray-800">₹{destination.price}</span>
// //             {/* <div className="text-xs text-gray-500">per person </div> */}
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* View More Button */}
// //       <button className="mt-3 w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 flex items-center justify-center">
// //         <span>View More</span>
// //         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
// //           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
// //         </svg>
// //       </button>
// //     </div>
// //   </div>
// // );
// // const DestinationCard = ({ tour,destination, onClose }) => {
// //   const [activeTab, setActiveTab] = React.useState('about');
  
// //   // if (!tour) return null;
  
// //   const handleBookNow = async () => {
// //     if (!tour) {
// //       alert("❌ Invalid tour selected. Please try again.");
// //       return;
// //     }
// //     // Add your booking logic here
// //   };
  
// //   const handleGetQuote = () => {
// //     // Add your quote logic here
// //     console.log("Getting quote for:", tour.title);
// //   };
  
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
// //       <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl relative">
// //         {/* Close button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white z-10 shadow-md"
// //         >
// //           <X className="h-4 w-4" />
// //         </button>
        
// //         {/* Header image with gradient overlay */}
// //         <div className="relative h-48 md:h-64">
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30" />
// //           <img
// //             src={destination.image || "/api/placeholder/800/400"}
// //             alt={destination.title}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-4 left-4 right-4">
// //             <div className="flex items-center">
// //               <span className="bg-orange-500/90 p-1.5 rounded-full text-white">
// //                 <MapPin className="h-4 w-4" />
// //               </span>
// //               <h2 className="text-2xl font-bold text-white ml-3">{destination.title}</h2>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="p-4 md:p-5">
// //           {/* Tour Details Card */}
// //           <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
// //             <div className="grid grid-cols-3 gap-2 text-sm">
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Clock className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Duration</span>
// //                 <span className="font-medium text-gray-800">{destination.duration}</span>
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <DollarSign className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Price</span>
// //                 {/* <span className="font-medium text-gray-800">₹{destination.price.toLocaleString()}</span> */}
// //               </div>
// //               <div className="flex flex-col items-center justify-center p-2 border-r border-gray-200 last:border-0">
// //                 <Star className="h-5 w-5 text-orange-500 mb-1" />
// //                 <span className="text-gray-500 text-xs">Rating</span>
// //                 <span className="font-medium text-gray-800">{destination.rating} ({destination.reviews})</span>
// //               </div>
// //             </div>
            
// //             {/* Action Buttons */}
// //             <div className="mt-4 grid grid-cols-2 gap-3">
// //               <button 
// //                 onClick={handleBookNow}
// //                 className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
// //               >
// //                 Book Now
// //               </button>
// //               <button
// //                 onClick={handleGetQuote}
// //                 className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm border border-gray-200"
// //               >
// //                 Get Quote
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Tabs Navigation */}
// //           <div className="border-b border-gray-200 mb-5">
// //             <nav className="flex space-x-6" aria-label="Tabs">
// //               <button
// //                 onClick={() => setActiveTab('about')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'about'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 About
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('itinerary')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'itinerary'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 Itinerary
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('inclusions')}
// //                 className={`py-3 text-sm font-medium border-b-2 ${
// //                   activeTab === 'inclusions'
// //                     ? 'border-orange-500 text-orange-500'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 Inclusions & Exclusions
// //               </button>
// //             </nav>
// //           </div>
          
// //           {/* Tab Content */}
// //           {activeTab === 'about' && (
// //             <div className="grid md:grid-cols-2 gap-5">
// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Tour</h3>
// //                 <p className="text-sm text-gray-600 leading-relaxed">{destination.description}</p>
                
// //                 {destination.amenities && destination.amenities.length > 0 && (
// //                   <div className="mt-4">
// //                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {destination.amenities.map((amenity, idx) => (
// //                         <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
// //                           {amenity}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
              
// //               {destination.highlights && destination.highlights.length > 0 && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
// //                   <ul className="space-y-2">
// //                     {destination.highlights.map((highlight, index) => (
// //                       <li key={index} className="flex items-start text-sm">
// //                         <span className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
// //                           <Check className="h-2.5 w-2.5" />
// //                         </span>
// //                         <span className="text-gray-600">{highlight}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           )}
          
// //           {activeTab === 'itinerary' && destination.itinerary && (
// //             <div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Itinerary</h3>
// //               <div className="space-y-4">
// //                 {Array.isArray(destination.itinerary) && destination.itinerary.map((day, index) => {
// //                   if (typeof day === 'string') {
// //                     // Handle simple string format
// //                     return (
// //                       <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
// //                         <div className="flex items-center mb-3">
// //                           <div className="bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3">
// //                             {index + 1}
// //                           </div>
// //                           <h4 className="font-medium text-gray-800">Day {index + 1}</h4>
// //                         </div>
// //                         <div className="ml-9">
// //                           <p className="text-sm text-gray-600">{day}</p>
// //                         </div>
// //                       </div>
// //                     );
// //                   } else if (day && typeof day === 'object') {
// //                     // Handle object format with day, title, activities
// //                     return (
// //                       <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
// //                         <div className="flex items-center mb-3">
// //                           <div className="bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3">
// //                             {index + 1}
// //                           </div>
// //                           <h4 className="font-medium text-gray-800">{day.day}: {day.title}</h4>
// //                         </div>
                        
// //                         <div className="ml-9">
// //                           {day.activities && day.activities.length > 0 && (
// //                             <div className="mb-3">
// //                               <h5 className="text-sm font-medium text-gray-700 mb-2">Activities:</h5>
// //                               <ul className="space-y-1">
// //                                 {day.activities.map((activity, idx) => (
// //                                   <li key={idx} className="flex items-start text-sm">
// //                                     <MapPin className="h-3.5 w-3.5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
// //                                     <span className="text-gray-600">{activity}</span>
// //                                   </li>
// //                                 ))}
// //                               </ul>
// //                             </div>
// //                           )}
                          
// //                           {day.meals && day.meals.length > 0 && (
// //                             <div>
// //                               <h5 className="text-sm font-medium text-gray-700 mb-2">Meals:</h5>
// //                               <div className="flex flex-wrap gap-2">
// //                                 {day.meals.map((meal, idx) => (
// //                                   <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
// //                                     <Utensils className="h-3 w-3 mr-1" />
// //                                     {meal}
// //                                   </span>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     );
// //                   }
// //                   return null;
// //                 })}
// //               </div>
// //             </div>
// //           )}
          
// //           {activeTab === 'inclusions' && (
// //             <div className="space-y-6">
// //               {destination.included && destination.included.length > 0 && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Inclusions</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                     {destination.included.map((inclusion, index) => (
// //                       <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                         <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
// //                         <span>{inclusion}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
              
// //               {(destination.excluded || destination.notIncluded) && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Exclusions</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                     {(tour.excluded || tour.notIncluded || []).map((item, index) => (
// //                       <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-start">
// //                         <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
// //                         <span>{typeof item === 'object' ? item.type : item}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// const DestinationCarousel = ({ items, onSelect }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Number of items to show per slide
//   const itemsPerSlide = 3;

//   // Calculate the total number of slides
//   const totalSlides = Math.ceil(items.length / itemsPerSlide);

//   // Function to handle next slide
//   const nextSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === totalSlides - 1 ? 0 : prev + 1
//     );
//   };

//   // Function to handle previous slide
//   const prevSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === 0 ? totalSlides - 1 : prev - 1
//     );
//   };

//   // Get the visible items for the current slide
//   const visibleItems = items.slice(
//     currentSlide * itemsPerSlide,
//     currentSlide * itemsPerSlide + itemsPerSlide
//   );
//   console.log("Props received in DestinationCarousel:", items);

//   return (
//     <>
//       {/* <div>
//         <h3 className="text-xl font-bold">Carousel Items</h3>
//         {items.length > 0 ? (
//           items.map((item, index) => (
//             <div key={index} className="p-4 border rounded-lg shadow-md">
//               <h4 className="text-lg font-semibold">{item.title}</h4>
//               <img src={item.image} alt={item.title} className="w-40 h-40 object-cover" />
//               <p>{item.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No items available</p>
//         )}
//       </div>
    
      
//   <div className="border border-green-500 p-4">
//     <h3 className="text-xl font-bold">Carousel Items</h3>
//     {items.length > 0 ? (
//       items.map((item, index) => (
//         <div key={index} className="p-4 border rounded-lg shadow-md">
//           <h4 className="text-lg font-semibold">{item.title}</h4>
//           <img src={item.image} alt={item.title} className="w-40 h-40 object-cover" />
//           <p>{item.description}</p>
//         </div>
//       ))
//     ) : (
//       <p>No items available</p>
//     )}
//   </div> */}


//     <div className="relative">
//       {/* Navigation buttons for mobile */}
//       {items.length > itemsPerSlide && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors md:hidden"
//           >
//             <ChevronLeft className="w-6 h-6 text-blue-600" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors md:hidden"
//           >
//             <ChevronRight className="w-6 h-6 text-blue-600" />
//           </button>
//         </>
//       )}

//       {/* Grid layout for desktop and carousel for mobile */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//         {visibleItems.map((destination, index) => (
//           <div key={index} className="transform transition-all duration-500">
//             <DestinationCard 
//               destination={destination}
//               onSelect={onSelect}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Dots indicator for mobile */}
//       {items.length > itemsPerSlide && (
//         <div className="flex justify-center mt-6 space-x-2 md:hidden">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentSlide === index ? 'bg-blue-600 w-6' : 'bg-blue-200'
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// // export default DestinationCarousel;
// const KashmirDestinations2 = () => {
//   const [destinations, setDestinations] = useState([]); // State to store fetched destinations
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [activeTab, setActiveTab] = useState('Top Destinations');
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch destinations from the backend
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/destinations');
//         setDestinations(response.data); 
//         // Set fetched data to state
//         console.log("Fetched Data:", response.data);
//         // console.log("Filtered Destinations:", filteredDestinations);
//         setLoading(false); // Set loading to false
//       } catch (err) {
//         setError(err.message); // Set error message
//         setLoading(false); // Set loading to false
//       }
//     };

//     fetchDestinations();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   const tabs = ["Top Destinations", "Food Destinations", "Ancient Destinations"];

//   if (loading) {
//     return <div className="text-center py-12">Loading destinations...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-12 text-red-600">Error: {error}</div>;
//   }
//   const filteredDestinations = destinations.filter(section => section.title.trim().toLowerCase() === activeTab.trim().toLowerCase());

//   console.log("Filtered Destinations:", filteredDestinations);
//   {filteredDestinations.map((section, sectionIndex) => (
//     <div key={sectionIndex} className="space-y-8">
//       <h2>{section.title}</h2>
//       <p>{section.subtitle || "No subtitle available"}</p>
  
//       {/* Debugging: Check if items exist */}
//       {console.log("Items for section:", section.items)}
  
//       {section.items && section.items.length > 0 ? (
//         <DestinationCarousel items={section.items} onSelect={setSelectedDestination} />
//       ) : (
//         <p className="text-center text-gray-500">No tours available.</p>
//       )}
//     </div>
//   ))}
  
//   return (
//     <div id='Destinations' className="w-full flex justify-center py-12 bg-blue-50">
//       <div className="w-[95%] md:w-[95%] max-w-7xl space-y-8">
//         <div className="flex justify-center mb-8">
//           <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-md">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`
//                   px-4 py-2 rounded-lg transition-all duration-300
//                   ${activeTab === tab 
//                     ? 'bg-blue-600 text-white shadow-md' 
//                     : 'bg-transparent text-blue-600 hover:bg-blue-50'}
//                 `}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {destinations
//           .filter(section => section.title === activeTab)
//           .map((section, sectionIndex) => (
//             <div key={sectionIndex} className="space-y-8">
//               <div className="text-center space-y-2">
//                 <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
//                   {section.title}
//                 </h2>
//                 <p className="text-lg text-blue-600">{section.subtitle}</p>
//               </div>
//               <DestinationCarousel 
//                 items={section.items}
//                 onSelect={setSelectedDestination}
//               />
//             </div>
//           ))}
        
//         {selectedDestination && (
//           <DestinationModal 
//             destination={selectedDestination} 
//             onClose={() => setSelectedDestination(null)} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default KashmirDestinations2;
// import React, { useState } from 'react';
import React, { useState, useEffect, useMemo, useRef } from 'react';

// Destination Card Component
// const DestinationCard = ({ destination, onViewMore }) => {
//   // Calculate real discount if available
//   const calculateDiscount = () => {
//     if (destination.tourDetails.originalPrice && destination.tourDetails.price) {
//       const originalPrice = Number(destination.tourDetails.originalPrice);
//       const currentPrice = Number(destination.tourDetails.price);
//       if (originalPrice > currentPrice) {
//         return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//       }
//     }
//     return destination.tourDetails.discount || 0;
//   };

//   const discount = calculateDiscount();
  
//   // Format price with comma separators
//   const formatPrice = (price) => {
//     return `₹${Number(price).toLocaleString('en-IN')}`;
//   };

//   return (
//     <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
//       {/* Image Container with overlay gradient */}
//       <div className="relative h-44">
//         <img 
//           src={destination.image || "/api/placeholder/300/200"} 
//           alt={destination.title} 
//           className="w-full h-full object-cover"
//         />
//         {/* Gradient overlay at bottom of image */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
//         {/* Discount badge */}
//         {discount > 0 && (
//           <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
//             {discount}% OFF
//           </div>
//         )}
        
//         {/* Location info on image */}
//         <div className="absolute bottom-2 left-2 text-white">
//           <div className="flex items-center">
//             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//             </svg>
//             <span className="text-xs font-medium">{destination.tourDetails.location || 'Location'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="p-3">
//         {/* Title with truncate */}
//         <h3 className="text-sm font-semibold text-gray-800 h-10 line-clamp-2">
//           {destination.title}
//         </h3>
        
//         {/* Package details */}
//         <div className="flex items-center mt-2 mb-1">
//           <svg className="w-3 h-3 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//           </svg>
//           <span className="text-xs text-gray-500">{destination.tourDetails.duration}</span>
//         </div>
        
//         {/* Activity/Details tags in horizontal scroll */}
//         <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
//           {destination.details?.slice(0, 3).map((detail, index) => (
//             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
//               {detail}
//             </span>
//           ))}
//         </div>
        
//         {/* Rating bar */}
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-xs font-medium bg-green-600 text-white px-1.5 py-0.5 rounded mr-1">
//               {destination.rating?.toFixed(1) || '4.5'}
//             </span>
//             <span className="text-xs text-gray-600">
//               {destination.reviews || '0'} Reviews
//             </span>
//           </div>
          
//           {/* Best Time tag if available */}
//           {destination.tourDetails.bestTime && (
//             <span className="text-xs font-medium text-orange-600 truncate max-w-24">
//               Best: {destination.tourDetails.bestTime}
//             </span>
//           )}
//         </div>
        
//         {/* Divider */}
//         <div className="border-t border-gray-200 my-2"></div>
        
//         {/* Price section */}
//         <div className="flex items-center justify-between">
//           <div>
//             {destination.tourDetails.originalPrice && Number(destination.tourDetails.originalPrice) > Number(destination.tourDetails.price) && (
//               <span className="text-xs text-gray-500 line-through block">
//                 {formatPrice(destination.tourDetails.originalPrice)}
//               </span>
//             )}
//             <div className="flex items-baseline">
//               <span className="text-base font-bold text-gray-900">
//                 {formatPrice(destination.tourDetails.price)}
//               </span>
//               <span className="text-xs ml-1 text-gray-600">
//                 per adult
//               </span>
//             </div>
//           </div>
          
//           {/* View More button */}
//           <button
//             onClick={() => onViewMore(destination)}
//             className="text-sm px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors duration-200"
//           >
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const DestinationCard = ({ destination, onViewMore }) => {
  // Calculate real discount if available
  const calculateDiscount = () => {
    if (destination.tourDetails.originalPrice && destination.tourDetails.price) {
      const originalPrice = parseFloat(destination.tourDetails.originalPrice);
      const currentPrice = parseFloat(destination.tourDetails.price);
      if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
      }
    }
    return destination.tourDetails.discount || 0;
  };

  const discount = calculateDiscount();
  
  // Format price with comma separators and handle NaN
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return "₹0";
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  return (
    <div className="w-[380px]   rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image Container with improved overlay */}
      <div className="relative h-48">
        <img 
          // src={destination.image || "/api/placeholder/300/200"} 
          src={`http://localhost:5000${destination.image}`}
          alt={destination.title} 
          className="w-full h-full object-cover"
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Improved discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {discount}% OFF
          </div>
        )}
        
        {/* Enhanced location info on image */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-sm font-medium">{destination.tourDetails.location || 'Location'}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Content Container */}
      <div className="p-4">
        {/* Title with better line clamp */}
        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
          {destination.title}
        </h3>
        
        {/* Improved package details */}
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            <span className="text-xs text-gray-600">{destination.tourDetails.duration}</span>
          </div>
          
          {/* Rating display with stars */}
          <div className="flex items-center">
            <span className="flex items-center justify-center bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded mr-1">
              {destination.rating?.toFixed(1) || '4.5'}
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </span>
            <span className="text-xs text-gray-600">
              {destination.reviews || '0'} Reviews
            </span>
          </div>
        </div>
        
        {/* Activity/Details tags with improved styling */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {destination.details?.slice(0, 3).map((detail, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
              {detail}
            </span>
          ))}
        </div>
        
        {/* Best Time indicator */}
        {destination.tourDetails.bestTime && (
          <div className="flex items-center mt-2 text-xs font-medium text-orange-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 01-.293-.707V6a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            Best Time: {destination.tourDetails.bestTime}
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>
        
        {/* Enhanced Price section */}
        <div className="flex items-center justify-between">
          <div>
            {destination.tourDetails.originalPrice && parseFloat(destination.tourDetails.originalPrice) > parseFloat(destination.tourDetails.price) && !isNaN(parseFloat(destination.tourDetails.originalPrice)) && (
              <span className="text-xs text-gray-500 line-through block">
                {formatPrice(destination.tourDetails.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(destination.tourDetails.price)}
              </span>
              <span className="text-xs ml-1 text-gray-600">
                per adult
              </span>
            </div>
          </div>
          </div>
          {/* Improved View More button */}
          {/* <button
            onClick={() => onViewMore(destination)}
            className="text-sm px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow"
          >
            View Details
          </button> */}
          <button
            onClick={() => onViewMore(destination)}
            className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow group"
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
  );
};
// const DestinationCard = ({ destination, onViewMore }) => {
//   // Calculate real discount if available
//   const calculateDiscount = () => {
//     if (destination.tourDetails.originalPrice && destination.tourDetails.price) {
//       const originalPrice = parseFloat(destination.tourDetails.originalPrice);
//       const currentPrice = parseFloat(destination.tourDetails.price);
//       if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
//         return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//       }
//     }
//     return destination.tourDetails.discount || 0;
//   };

//   const discount = calculateDiscount();
  
//   // Format price with comma separators and handle NaN
//   const formatPrice = (price) => {
//     const numPrice = parseFloat(price);
//     if (isNaN(numPrice)) return "₹0";
//     return `₹${numPrice.toLocaleString('en-IN')}`;
//   };

//   // Format ratings for display
//   const formatRating = (rating) => {
//     const numRating = parseFloat(rating);
//     return isNaN(numRating) ? '4.5' : numRating.toFixed(1);
//   };

//   return (
//     <div className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
//       {/* Image Container with premium overlay and badge */}
//       <div className="relative h-52">
//         <img 
//           src={destination.image || "/api/placeholder/300/200"} 
//           alt={destination.title} 
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         {/* Enhanced gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
//         {/* Wishlist icon */}
//         <button className="absolute top-3 right-3 bg-white/30 hover:bg-white/70 p-1.5 rounded-full transition-colors duration-200">
//           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//           </svg>
//         </button>
        
//         {/* Improved discount badge */}
//         {discount > 0 && (
//           <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
//             {discount}% OFF
//           </div>
//         )}

//         {/* NEW badge if desired */}
//         {destination.isNew && (
//           <div className="absolute top-3 left-3 ml-16 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
//             NEW
//           </div>
//         )}
        
//         {/* Enhanced location info on image */}
//         <div className="absolute bottom-3 left-3 text-white">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//             </svg>
//             <span className="text-sm font-medium">{destination.tourDetails.location || 'Location'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Content Container with better spacing */}
//       <div className="p-4">
//         {/* Title with better line clamp */}
//         <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors duration-200">
//           {destination.title}
//         </h3>
        
//         {/* Improved package details */}
//         <div className="flex flex-wrap gap-3 mb-3">
//           <div className="flex items-center text-gray-600">
//             <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//             </svg>
//             <span className="text-xs">{destination.tourDetails.duration}</span>
//           </div>
          
//           {/* Cancellation policy if available */}
//           {destination.tourDetails.cancellation && (
//             <div className="flex items-center text-gray-600">
//               <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//               </svg>
//               <span className="text-xs">{destination.tourDetails.cancellation}</span>
//             </div>
//           )}
          
//           {/* Rating display with stars */}
//           <div className="flex items-center ml-auto">
//             <div className="flex items-center justify-center bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded mr-1">
//               {formatRating(destination.rating)}
//               <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//             </div>
//             <span className="text-xs text-gray-600">
//               {destination.reviews || '0'} Reviews
//             </span>
//           </div>
//         </div>
        
//         {/* Activity/Details tags with improved styling */}
//         {/* <div className="flex flex-wrap gap-1.5 mb-3">
//           {destination.details?.slice(0, 3).map((detail, index) => (
//             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
//               {detail}
//             </span>
//           ))}
//         </div> */}
        
//         {/* Best Time indicator with styled icon */}
//         {destination.tourDetails.bestTime && (
//           <div className="flex items-center mt-2 mb-3 text-xs font-medium text-gray-700">
//             <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
//               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 01-.293-.707V6a1 1 0 011-1z" clipRule="evenodd"></path>
//             </svg>
//             <span>Best Time: <span className="text-orange-600 font-medium">{destination.tourDetails.bestTime}</span></span>
//           </div>
//         )}
        
//         {/* Enhanced facilities icons if available */}
//         {destination.facilities && destination.facilities.length > 0 && (
//           <div className="flex space-x-3 mb-3">
//             {destination.facilities.includes('meals') && (
//               <div className="flex flex-col items-center" title="Meals Included">
//                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
//                 </svg>
//                 <span className="text-xs text-gray-500 mt-1">Meals</span>
//               </div>
//             )}
//             {destination.facilities.includes('transport') && (
//               <div className="flex flex-col items-center" title="Transport Included">
//                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//                   <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-6a3 3 0 00-.78-2.01L16.81 3.4A1 1 0 0016.14 3H3z" />
//                 </svg>
//                 <span className="text-xs text-gray-500 mt-1">Transport</span>
//               </div>
//             )}
//             {destination.facilities.includes('guide') && (
//               <div className="flex flex-col items-center" title="Guide Included">
//                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-.94z"></path>
//                 </svg>
//                 <span className="text-xs text-gray-500 mt-1">Guide</span>
//               </div>
//             )}
//           </div>
//         )}
        
//         {/* Divider */}
//         <div className="border-t border-gray-200 my-3"></div>
        
//         {/* Enhanced Price section */}
//         <div>
//           <div className="flex items-baseline justify-between mb-3">
//             <div>
//               {destination.tourDetails.originalPrice && parseFloat(destination.tourDetails.originalPrice) > parseFloat(destination.tourDetails.price) && !isNaN(parseFloat(destination.tourDetails.originalPrice)) && (
//                 <span className="text-xs text-gray-500 line-through block">
//                   {formatPrice(destination.tourDetails.originalPrice)}
//                 </span>
//               )}
//               <div className="flex items-baseline">
//                 <span className="text-xl font-bold text-gray-900">
//                   {formatPrice(destination.tourDetails.price)}
//                 </span>
//                 <span className="text-xs ml-1 text-gray-600">
//                   per adult
//                 </span>
//               </div>
//             </div>
            
//             {/* EMI information if available */}
//             {destination.tourDetails.emi && (
//               <div className="text-right">
//                 <span className="text-xs text-gray-600 block">Starting from</span>
//                 <span className="text-sm font-medium text-green-600">{destination.tourDetails.emi}/month</span>
//               </div>
//             )}
//           </div>
          
//           {/* Full-width View button with arrow */}
//           <button
//             onClick={() => onViewMore(destination)}
//             className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow group"
//           >
//             <span>View Details</span>
//             <svg 
//               className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// Destination Modal Component
// const DestinationModal = ({ isOpen, destination, onClose }) => {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   if (!isOpen || !destination) return null;
  
//   // Format price with comma separators
//   const formatPrice = (price) => {
//     return `₹${Number(price).toLocaleString('en-IN')}`;
//   };
  
//   // Calculate discount if available
//   const calculateDiscount = () => {
//     if (destination.tourDetails.originalPrice && destination.tourDetails.price) {
//       const originalPrice = Number(destination.tourDetails.originalPrice);
//       const currentPrice = Number(destination.tourDetails.price);
//       if (originalPrice > currentPrice) {
//         return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//       }
//     }
//     return destination.tourDetails.discount || 0;
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-hidden flex flex-col">
//         {/* Modal Header with close button */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Modal Content */}
//         <div className="overflow-y-auto flex-grow">
//           {/* Hero Section with Image and Quick Details */}
//           <div className="relative h-64 md:h-80">
//             <img 
//               src={destination.image || "/api/placeholder/800/400"} 
//               alt={destination.title} 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
//             {/* Price and Discount */}
//             <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
//               <div className="flex items-center mb-1">
//                 {calculateDiscount() > 0 && (
//                   <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
//                     {calculateDiscount()}% OFF
//                   </span>
//                 )}
//                 {destination.tourDetails.originalPrice && Number(destination.tourDetails.originalPrice) > Number(destination.tourDetails.price) && (
//                   <span className="text-sm text-gray-500 line-through">
//                     {formatPrice(destination.tourDetails.originalPrice)}
//                   </span>
//                 )}
//               </div>
//               <div className="flex items-baseline">
//                 <span className="text-2xl font-bold text-gray-900">
//                   {formatPrice(destination.tourDetails.price)}
//                 </span>
//                 <span className="text-sm ml-1 text-gray-600">
//                   per adult
//                 </span>
//               </div>
//               <button className="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
//                 Book Now
//               </button>
//             </div>
            
//             {/* Location, Duration, Rating */}
//             <div className="absolute bottom-4 left-4 text-white">
//               <h3 className="text-xl font-bold mb-2 max-w-lg">{destination.title}</h3>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                   </svg>
//                   <span className="text-sm">{destination.tourDetails.location || 'Location'}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//                   </svg>
//                   <span className="text-sm">{destination.tourDetails.duration}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                   <span className="text-sm">{destination.rating?.toFixed(1) || '4.5'} ({destination.reviews || '0'} reviews)</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Tabs Navigation */}
//           <div className="border-b">
//             <nav className="flex">
//               <button 
//                 className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Overview
//               </button>
//               <button 
//                 className={`px-4 py-3 font-medium text-sm ${activeTab === 'itinerary' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
//                 onClick={() => setActiveTab('itinerary')}
//               >
//                 Itinerary
//               </button>
//               <button 
//                 className={`px-4 py-3 font-medium text-sm ${activeTab === 'inclusions' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
//                 onClick={() => setActiveTab('inclusions')}
//               >
//                 Inclusions
//               </button>
//             </nav>
//           </div>
          
//           {/* Tab Content */}
//           <div className="p-6">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">About the Tour</h3>
//                 <p className="text-gray-700 mb-6">{destination.description}</p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-800 mb-2">Tour Details</h4>
//                     <ul className="space-y-2">
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium text-sm">Duration:</span>
//                           <p className="text-sm text-gray-600">{destination.tourDetails.duration}</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium text-sm">Location:</span>
//                           <p className="text-sm text-gray-600">{destination.tourDetails.location || 'Location'}</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium text-sm">Best Time to Visit:</span>
//                           <p className="text-sm text-gray-600">{destination.tourDetails.bestTime}</p>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
                  
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-800 mb-2">Tour Highlights</h4>
//                     <ul className="space-y-2">
//                       {destination.details?.map((detail, index) => (
//                         <li key={index} className="flex items-start">
//                           <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                           </svg>
//                           <span className="text-sm text-gray-700">{detail}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Itinerary Tab */}
//             {activeTab === 'itinerary' && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Tour Itinerary</h3>
//                 {destination.itinerary?.length > 0 ? (
//                   <div className="space-y-6">
//                     {destination.itinerary.map((day, index) => (
//                       <div key={index} className="border-l-4 border-orange-500 pl-4">
//                         <h4 className="font-medium text-gray-800">Day {day.day}: {day.title}</h4>
//                         <ul className="mt-2 space-y-2">
//                           {day.activities.map((activity, idx) => (
//                             <li key={idx} className="flex items-start">
//                               <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                               </svg>
//                               <span className="text-sm text-gray-700">{activity}</span>
//                             </li>
//                           ))}
//                         </ul>
//                         {day.meals?.length > 0 && (
//                           <div className="mt-2">
//                             <span className="text-sm font-medium text-gray-700">Meals:</span>
//                             <span className="text-sm text-gray-600 ml-2">{day.meals.join(', ')}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-600">Itinerary details will be provided upon booking.</p>
//                 )}
//               </div>
//             )}
            
//             {/* Inclusions Tab */}
//             {activeTab === 'inclusions' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Inclusions</h3>
//                   <ul className="space-y-2">
//                     {destination.tourDetails.inclusions?.map((item, index) => (
//                       <li key={index} className="flex items-start">
//                         <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                         </svg>
//                         <span className="text-sm text-gray-700">{item}</span>
//                       </li>
//                     ))}
//                     {(!destination.tourDetails.inclusions || destination.tourDetails.inclusions.length === 0) && (
//                       <li className="text-sm text-gray-600">No inclusions specified.</li>
//                     )}
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Exclusions</h3>
//                   <ul className="space-y-2">
//                     {destination.tourDetails.notIncluded?.map((item, index) => (
//                       <li key={index} className="flex items-start">
//                         <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
//                         </svg>
//                         <span className="text-sm text-gray-700">{item}</span>
//                       </li>
//                     ))}
//                     {(!destination.tourDetails.notIncluded || destination.tourDetails.notIncluded.length === 0) && (
//                       <li className="text-sm text-gray-600">No exclusions specified.</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const DestinationModal = ({ isOpen, destination, onClose }) => {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   if (!isOpen || !destination) return null;
  
//   // Format price with comma separators and handle invalid values
//   const formatPrice = (price) => {
//     const numPrice = Number(price);
//     return isNaN(numPrice) ? '₹0' : `₹${numPrice.toLocaleString('en-IN')}`;
//   };
  
//   // Calculate discount if available
//   const calculateDiscount = () => {
//     if (destination.tourDetails?.originalPrice && destination.tourDetails?.price) {
//       const originalPrice = Number(destination.tourDetails.originalPrice);
//       const currentPrice = Number(destination.tourDetails.price);
//       if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
//         return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//       }
//     }
//     return destination.tourDetails?.discount || 0;
//   };

//   // Check if price data exists and is valid
//   const hasValidPriceData = () => {
//     return destination.tourDetails?.price && !isNaN(Number(destination.tourDetails.price));
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col" style={{ maxHeight: '90vh' }}>
//         {/* Modal Header with close button */}
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h2 className="text-2xl font-bold text-gray-800">{destination.title}</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//             aria-label="Close modal"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Modal Content */}
//         <div className="overflow-y-auto flex-grow">
//           {/* Hero Section with Image and Quick Details */}
//           <div className="relative">
//             <div className="aspect-video w-full overflow-hidden">
//               <img 
//                 // src={destination.image || "/api/placeholder/800/400"} 
//                 src={`http://localhost:5000${destination.image}`}
//                 alt={destination.title || "Destination"} 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
//             {/* Location, Duration, Rating */}
//             <div className="absolute bottom-0 left-0 w-full p-6">
//               <div className="flex flex-col md:flex-row md:items-end justify-between">
//                 <div className="text-white mb-4 md:mb-0">
//                   <h3 className="text-2xl font-bold mb-3 max-w-lg">{destination.title}</h3>
//                   <div className="flex flex-wrap gap-4">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                       </svg>
//                       <span>{destination.tourDetails?.location || 'Location'}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//                       </svg>
//                       <span>{destination.tourDetails?.duration || 'Duration'}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                       </svg>
//                       <span>{destination.rating?.toFixed(1) || '4.5'} ({destination.reviews || '0'} reviews)</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Price and Booking */}
//                 <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs">
//                   <div className="flex items-center mb-1">
//                     {calculateDiscount() > 0 && (
//                       <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md mr-2">
//                         {calculateDiscount()}% OFF
//                       </span>
//                     )}
//                     {destination.tourDetails?.originalPrice && 
//                      Number(destination.tourDetails.originalPrice) > Number(destination.tourDetails.price) && 
//                      !isNaN(Number(destination.tourDetails.originalPrice)) && (
//                       <span className="text-sm text-gray-500 line-through">
//                         {formatPrice(destination.tourDetails.originalPrice)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-baseline">
//                     <span className="text-2xl font-bold text-gray-900">
//                       {hasValidPriceData() ? formatPrice(destination.tourDetails.price) : '₹0'}
//                     </span>
//                     <span className="text-sm ml-1 text-gray-600">
//                       per adult
//                     </span>
//                   </div>
//                   <button className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
//                     Get Quote
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Tabs Navigation */}
//           <div className="border-b">
//             <nav className="flex px-6">
//               <button 
//                 className={`px-4 py-4 font-medium ${activeTab === 'overview' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Overview
//               </button>
//               <button 
//                 className={`px-4 py-4 font-medium ${activeTab === 'itinerary' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
//                 onClick={() => setActiveTab('itinerary')}
//               >
//                 Itinerary
//               </button>
//               <button 
//                 className={`px-4 py-4 font-medium ${activeTab === 'inclusions' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
//                 onClick={() => setActiveTab('inclusions')}
//               >
//                 Inclusions
//               </button>
//             </nav>
//           </div>
          
//           {/* Tab Content */}
//           <div className="p-6">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Tour</h3>
//                 <p className="text-gray-700 mb-6">{destination.description || 'No description available.'}</p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
//                     <h4 className="font-medium text-gray-800 mb-3">Tour Details</h4>
//                     <ul className="space-y-3">
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium">Duration:</span>
//                           <p className="text-gray-600">{destination.tourDetails?.duration || 'Not specified'}</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium">Location:</span>
//                           <p className="text-gray-600">{destination.tourDetails?.location || 'Not specified'}</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                         </svg>
//                         <div>
//                           <span className="font-medium">Best Time to Visit:</span>
//                           <p className="text-gray-600">{destination.tourDetails?.bestTime || 'Not specified'}</p>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
                  
//                   <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
//                     <h4 className="font-medium text-gray-800 mb-3">Tour Highlights</h4>
//                     {destination.details && destination.details.length > 0 ? (
//                       <ul className="space-y-3">
//                         {destination.details.map((detail, index) => (
//                           <li key={index} className="flex items-start">
//                             <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                             </svg>
//                             <span className="text-gray-700">{detail}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-600">No highlights available.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Itinerary Tab */}
//             {activeTab === 'itinerary' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Tour Itinerary</h3>
//                 {destination.itinerary && destination.itinerary.length > 0 ? (
//                   <div className="space-y-6">
//                     {destination.itinerary.map((day, index) => (
//                       <div key={index} className="border-l-4 border-orange-500 pl-4 pb-6">
//                         <h4 className="font-semibold text-gray-800">Day {day.day}: {day.title}</h4>
//                         {day.activities && day.activities.length > 0 ? (
//                           <ul className="mt-3 space-y-2">
//                             {day.activities.map((activity, idx) => (
//                               <li key={idx} className="flex items-start">
//                                 <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                                 </svg>
//                                 <span className="text-gray-700">{activity}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p className="mt-2 text-gray-600">No activities specified for this day.</p>
//                         )}
//                         {day.meals && day.meals.length > 0 && (
//                           <div className="mt-3 flex items-center">
//                             <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-1-7a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clipRule="evenodd"></path>
//                             </svg>
//                             <span className="font-medium text-gray-700">Meals:</span>
//                             <span className="text-gray-600 ml-2">{day.meals.join(', ')}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-gray-50 p-4 rounded-xl text-center">
//                     <p className="text-gray-600">Detailed itinerary will be provided upon booking.</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {/* Inclusions Tab */}
//             {activeTab === 'inclusions' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                     </svg>
//                     Inclusions
//                   </h3>
//                   {destination.tourDetails?.inclusions && destination.tourDetails.inclusions.length > 0 ? (
//                     <ul className="space-y-3">
//                       {destination.tourDetails.inclusions.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                           <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                           </svg>
//                           <span className="text-gray-700">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-600">No inclusions specified.</p>
//                   )}
//                 </div>
                
//                 <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
//                     </svg>
//                     Exclusions
//                   </h3>
//                   {destination.tourDetails?.notIncluded && destination.tourDetails.notIncluded.length > 0 ? (
//                     <ul className="space-y-3">
//                       {destination.tourDetails.notIncluded.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                           <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
//                           </svg>
//                           <span className="text-gray-700">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-600">No exclusions specified.</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// import { useState } from 'react';

import { Heart, Share2,Loader,ChevronLeft,ChevronRight,Pause,Clock,Play,ChevronDown,Filter, X,Info, Star, MapPin, Calendar, Users, Globe, Check } from 'lucide-react';

const DestinationModal = ({ isOpen, destination, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const handleGetQuote = () => {
    // Implement get quote functionality
    console.log("Get quote for", destination.title);
  };

  const handleBookNow = () => {
    // Implement booking functionality
    console.log("Book now for", destination.title);
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-2/5 relative h-52 md:h-auto">
            <img
              src={destination.image || "/api/placeholder/400/320"}
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
                {hasValidPriceData() ? formatPrice(destination.tourDetails.price) : '₹0'}
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
                onClick={handleBookNow} 
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

// export default DestinationModal;
// Example Usage Component
// const DestinationGallery = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Sample data based on your mongoose schema
//   const sampleDestinations = [
//     {
//       title: "Bali Adventure Package with Water Sports & Sunset Cruise",
//       description: "Experience the best of Bali with this comprehensive tour package. Explore pristine beaches, enjoy thrilling water sports, visit ancient temples, and experience the vibrant culture of this Indonesian paradise.",
//       icon: "beach-icon",
//       image: "/api/placeholder/300/200",
//       details: ["Water Sports", "Temple Tour", "Sunset Cruise", "Cultural Show"],
//       tourDetails: {
//         duration: "5D/4N",
//         price: "24999",
//         location: "Bali, Indonesia",
//         bestTime: "Apr-Oct",
//         inclusions: [
//           "Airport transfers",
//           "Hotel accommodation (4-star)",
//           "Daily breakfast",
//           "Water sports activities",
//           "Sunset dinner cruise",
//           "English speaking guide",
//           "All taxes included"
//         ],
//         notIncluded: [
//           "Airfare",
//           "Personal expenses",
//           "Optional activities",
//           "Travel insurance"
//         ],
//         originalPrice: 32999,
//         discount: 25
//       },
//       itinerary: [
//         {
//           day: "1",
//           title: "Arrival and Welcome",
//           activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"],
//           meals: ["Dinner"]
//         },
//         {
//           day: "2",
//           title: "Water Sports Day",
//           activities: ["Breakfast at hotel", "Full day water sports at Nusa Dua", "Parasailing", "Jet ski", "Banana boat"],
//           meals: ["Breakfast", "Lunch"]
//         },
//         {
//           day: "3",
//           title: "Temple Tour",
//           activities: ["Breakfast at hotel", "Visit Uluwatu Temple", "Tanah Lot sunset tour", "Cultural dance performance"],
//           meals: ["Breakfast"]
//         },
//         {
//           day: "4",
//           title: "Sunset Cruise",
//           activities: ["Morning at leisure", "Afternoon sunset cruise", "Dinner onboard with live music"],
//           meals: ["Breakfast", "Dinner"]
//         },
//         {
//           day: "5",
//           title: "Departure",
//           activities: ["Breakfast at hotel", "Last minute shopping", "Airport transfer"],
//           meals: ["Breakfast"]
//         }
//       ],
//       rating: 4.7,
//       reviews: 324
//     },
//     {
//       title: "Goa Beach Adventure with Nightlife & Water Activities",
//       description: "Enjoy the perfect beach holiday in Goa with this comprehensive package that combines relaxation, adventure, and the famous Goa nightlife experience.",
//       icon: "beach-icon",
//       image: "/api/placeholder/300/200",
//       details: ["Beach Time", "Water Sports", "Nightlife", "Spice Plantation"],
//       tourDetails: {
//         duration: "4D/3N",
//         price: "12999",
//         location: "Goa, India",
//         bestTime: "Nov-Feb",
//         inclusions: [
//           "Hotel accommodation (3-star)",
//           "Daily breakfast",
//           "Water sports (parasailing, banana ride)",
//           "Beach club entry",
//           "North Goa sightseeing"
//         ],
//         notIncluded: [
//           "Airfare/Train tickets",
//           "Personal expenses",
//           "Additional activities",
//           "Travel insurance"
//         ],
//         originalPrice: 16999,
//         discount: 23
//       },
//       itinerary: [
//         {
//           day: "1",
//           title: "Arrival in Goa",
//           activities: ["Airport/Railway station pickup", "Hotel check-in", "Leisure time at beach", "Evening free for nightlife"],
//           meals: ["Breakfast"]
//         },
//         {
//           day: "2",
//           title: "Water Sports Day",
//           activities: ["Breakfast at hotel", "Full day water sports at Baga Beach", "Evening beach club experience"],
//           meals: ["Breakfast"]
//         },
//         {
//           day: "3",
//           title: "North Goa Tour",
//           activities: ["Breakfast at hotel", "Visit Aguada Fort", "Calangute Beach", "Spice plantation visit", "Evening free for nightlife"],
//           meals: ["Breakfast", "Lunch at spice plantation"]
//         },
//         {
//           day: "4",
//           title: "Departure",
//           activities: ["Breakfast at hotel", "Checkout", "Transfer to airport/railway station"],
//           meals: ["Breakfast"]
//         }
//       ],
//       rating: 4.5,
//       reviews: 187
//     }
//   ];

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-gray-50 p-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//         {sampleDestinations.map((destination, index) => (
//           <DestinationCard 
//             key={index}
//             destination={destination}
//             onViewMore={handleViewMore}
//           />
//         ))}
//       </div>
      
//       {/* Modal */}
//       <DestinationModal 
//         isOpen={isModalOpen} 
//         destination={selectedDestination}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };
// import { useEffect } from 'react';

// const DestinationGallery = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top'); // Default tab: 'top', 'food', or 'ancient'

//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        

//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinations(data);
//         console.log(data)
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // Filter destinations based on active tab
//   const filteredDestinations = destinations.filter(destination => {
//     switch (activeTab) {
//       case 'top':
//         return destination.category === 'top' || destination.isTopRated;
//       case 'food':
//         return destination.category === 'food' || destination.isFoodDestination;
//       case 'ancient':
//         return destination.category === 'ancient' || destination.isAncient;
//       default:
//         return true;
//     }
//   });

//   return (
//     <div className="bg-gray-50 p-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* Destinations grid */}
//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {filteredDestinations.length > 0 ? (
//             filteredDestinations.map((destination, index) => (
//               <DestinationCard 
//                 key={index}
//                 destination={destination}
//                 onViewMore={handleViewMore}
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-10 text-gray-500">
//               No destinations found for this category.
//             </div>
//           )}
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
// };

// export default DestinationGallery;
// export default DestinationGallery;

// const DestinationGallery = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinationCategories, setDestinationCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top'); // Default tab: 'top', 'food', or 'ancient'

//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinationCategories(data);
//         console.log(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   const handleViewAllClick = () => {
//     if (onViewAll && typeof onViewAll === 'function') {
//       onViewAll();
//     }
//   };
//   // Get current tab destinations
//   const getCurrentDestinations = () => {
//     const category = destinationCategories.find(cat => {
//       if (activeTab === 'top' && cat.title === 'Top Destinations') return true;
//       if (activeTab === 'food' && cat.title === 'Food Destinations') return true;
//       if (activeTab === 'ancient' && cat.title === 'Ancient Destinations') return true;
//       return false;
//     });
    
//     return category ? category.items : [];
//   };

//   const currentDestinations = getCurrentDestinations();

//   return (
//     <div className="bg-gray-50  gap-4 min-w-full">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* Destinations grid */}
//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
//           {currentDestinations.length > 0 ? (
//             currentDestinations.map((destination, index) => (
//               <DestinationCard 
//                 key={index}
//                 destination={destination}
//                 onViewMore={handleViewMore}
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-10 text-gray-500">
//               No destinations found for this category.
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Modal */}
//       <DestinationModal 
//         isOpen={isModalOpen} 
//         destination={selectedDestination}
//         onClose={handleCloseModal}
//       />
    
//      </div>
     
//   );
  
    
// } 

// export default DestinationGallery;
// import React, { useState, useEffect } from 'react';
// import { ToursCarousel } from './ToursCarousel'; // Import your existing ToursCarousel component
// import DestinationCard from './DestinationCard'; // Import your existing card component
// import DestinationModal from './DestinationModal'; // Import your existing modal component

// const DestinationGallery = ({ onViewAll }) => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinationCategories, setDestinationCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top'); // Default tab: 'top', 'food', or 'ancient'

//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinationCategories(data);
//         console.log(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleViewAllClick = () => {
//     if (onViewAll && typeof onViewAll === 'function') {
//       onViewAll(activeTab);
//     }
//   };

//   // Get current tab destinations
//   const getCurrentDestinations = () => {
//     const category = destinationCategories.find(cat => {
//       if (activeTab === 'top' && cat.title === 'Top Destinations') return true;
//       if (activeTab === 'food' && cat.title === 'Food Destinations') return true;
//       if (activeTab === 'ancient' && cat.title === 'Ancient Destinations') return true;
//       return false;
//     });
    
//     return category ? category.items : [];
//   };

//   const currentDestinations = getCurrentDestinations();

//   // For debugging
//   console.log("Current destinations:", currentDestinations);

//   // Custom TourCard wrapper function to debug prop structure
//   const renderCustomTourCard = (tourData) => {
//     console.log("Tour data received by TourCard:", tourData);
//     // Ensure we have all required properties
//     return (
//       <DestinationCard 
//         destination={tourData}
//         onViewMore={() => handleViewMore(tourData)}
//       />
//     );
//   };

//   return (
//     <div className="container p-6 mt-10 max-w-[95vw] mx-auto bg-gray-50">
//       {/* Header Section with View All Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
//         <button
//           className="view-all-button bg-blue-600 text-white px-5 py-2 rounded-md shadow-md
//                     hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
//           onClick={handleViewAllClick}
//         >
//           View All <span className="arrow-icon text-lg">→</span>
//         </button>
//       </div>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* Use regular grid instead of carousel until we debug the issue */}
//       {!loading && !error && currentDestinations.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
//           {currentDestinations.map((destination, index) => (
//             <DestinationCard 
//               key={index}
//               destination={destination}
//               onViewMore={handleViewMore}
//             />
//           ))}
//         </div>
//       )}
      
//       {/* Commented out ToursCarousel for now */}
//       {/* 
//       {!loading && !error && currentDestinations.length > 0 && (
//         <div className="mb-8">
//           <ToursCarousel
//             tours={currentDestinations}
//             TourCard={renderCustomTourCard}
//             autoplayInterval={6000}
//             visibleCards={4}
//           />
//         </div>
//       )} 
//       */}
//       {!loading && !error && currentDestinations.length > 0 && (
//   <div className="mb-8">
//     <ToursCarousel
//       tours={currentDestinations}
//       // Option 1: If ToursCarousel passes the tour object directly to TourCard
//       TourCard={(tourProps) => {
//         // Log what we're receiving to help debug
//         console.log("Tour props received:", tourProps);
//         return (
//           <DestinationCard 
//             destination={tourProps} // Pass the entire tour object as destination
//             onViewMore={() => handleViewMore(tourProps)}
//           />
//         );
//       }}
//       autoplayInterval={6000}
//       visibleCards={4}
//     />
//   </div>
// )}
//       {/* No destinations message */}
//       {!loading && !error && currentDestinations.length === 0 && (
//         <div className="text-center py-10 text-gray-500">
//           No destinations found for this category.
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
// };

// export default DestinationGallery;
// import React, { useState, useEffect } from 'react';
// import ToursCarousel from './ToursCarousel'; // Correct import statement
// import DestinationCard from './DestinationCard';
// import DestinationModal from './DestinationModal';

// const DestinationGallery = ({ onViewAll }) => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinationCategories, setDestinationCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top');
//    const [isAllToursPage, setIsAllToursPage] = useState(false);
//     const handleViewAllClick = () => {
//       try {
//         // Make sure the AllToursPage component exists before setting state
//         if (typeof AllToursPage === 'function' || typeof AllToursPage === 'object') {
//           setIsAllToursPage(true);
//         } else {
//           throw new Error("AllToursPage component is not defined properly");
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error("Error in handleViewAllClick:", err);
//       }
//     };
  
//     const handleTourClick = (tour) => {
//       try {
//         setSelectedTour(tour);
//         setIsDetailPage(true);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error in handleTourClick:", err);
//       }
//     };
  
//     const handleBackToList = () => {
//       setIsDetailPage(false);
//       setSelectedTour(null);
//     };
  
//     const handleBackToHome = () => {
//       setIsAllToursPage(false);
//       setIsDetailPage(false);
//       setSelectedTour(null);
//     };
//     const AllToursPage = ({ tours, onTourClick, onBack }) => {
//       return (
//         <div className="all-tours-page">
//           <div className="header flex items-center mb-6">
//             <button 
//               onClick={onBack}
//               className="back-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mr-4"
//             >
//               ← Back
//             </button>
//             <h1 className="text-2xl font-bold">All Trending Tours</h1>
//           </div>
          
//           <div className="tours-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tours.map(tour => (
//               <TourCard key={tour.id} tour={tour} onClick={onTourClick} />
//             ))}
//           </div>
//         </div>
//       );
//     };
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinationCategories(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // const handleViewAllClick = () => {
//   //   if (onViewAll && typeof onViewAll === 'function') {
//   //     onViewAll(activeTab);
//   //   }
//   // };

//   // Get current tab destinations
//   const getCurrentDestinations = () => {
//     const category = destinationCategories.find(cat => {
//       if (activeTab === 'top' && cat.title === 'Top Destinations') return true;
//       if (activeTab === 'food' && cat.title === 'Food Destinations') return true;
//       if (activeTab === 'ancient' && cat.title === 'Ancient Destinations') return true;
//       return false;
//     });
    
//     return category ? category.items : [];
//   };

//   // Map destinations to the format expected by ToursCarousel
//   const mapDestinationsToTourFormat = (destinations) => {
//     return destinations.map((destination, index) => ({
//       id: destination.id || `dest-${index}`, // Ensure there's an ID
//       title: destination.title,
//       description: destination.description || '',
//       image: destination.image,
//       price: destination.tourDetails?.price || 0,
//       duration: destination.tourDetails?.duration || '',
//       // Add the original destination object so we can pass it to the DestinationCard
//       originalDestination: destination
//     }));
//   };

//   const currentDestinations = getCurrentDestinations();
//   const formattedToursForCarousel = mapDestinationsToTourFormat(currentDestinations);

//   // Custom wrapper component to pass the destination data correctly
//   const TourCardWrapper = ({ tour }) => {
//     // The tour prop contains the formatted tour data
//     // We need to pass the originalDestination to DestinationCard
//     return (
//       <DestinationCard 
//         destination={tour.originalDestination}
//         onViewMore={handleViewMore}
//       />
//     );
//   };
//   if (isAllToursPage) {
//     // Define the AllToursPage component inline if it's not imported
//     const AllToursPage = ({ destination, onTourClick, onBack }) => {
//       return (
//         <div className="all-tours-page p-4">
//           <div className="header flex items-center mb-6">
//             <button 
//               onClick={onBack}
//               className="back-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mr-4"
//             >
//               ← Back
//             </button>
//             <h1 className="text-2xl font-bold">All Trending Tours</h1>
//           </div>
          
//           <div className="tours-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {destination && destination.length > 0 ? (
//               destination.map((tour, index) => (
//                 <DestinationCard
//                   key={tour.id || index} 
//                   tour={tour} 
//                   onClick={onTourClick} 
//                 />
//               ))
//             ) : (
//               <p>No tours available</p>
//             )}
//           </div>
//         </div>
//       );
//     };
    
//     return <AllToursPage tours={tours} onTourClick={handleTourClick} onBack={handleBackToHome} />;
//   }
//   return (
//     <div className="container  mt-10 max-w-[95vw] mx-auto bg-gray-50">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
//         <button
//           className="view-all-button bg-blue-600 text-white px-5 py-2 rounded-md shadow-md
//                     hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
//           onClick={handleViewAllClick}
//         >
//           View All <span className="arrow-icon text-lg">→</span>
//         </button>
//       </div>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* ToursCarousel when data is available */}
//       {!loading && !error && formattedToursForCarousel.length > 0 && (
//         <div className="mb-8">
//           <ToursCarousel
//             tours={formattedToursForCarousel}
//             TourCard={TourCardWrapper}
//             autoplayInterval={6000}
//             visibleCards={3}
//           />
//         </div>
//       )}
      
//       {/* No destinations message */}
//       {!loading && !error && currentDestinations.length === 0 && (
//         <div className="text-center py-10 text-gray-500">
//           No destinations found for this category.
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
// };

// export default DestinationGallery;


// const DestinationGallery = ({ onViewAll }) => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinationCategories, setDestinationCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top');
//   const [isAllDestinationsPage, setIsAllDestinationsPage] = useState(false);
  
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinationCategories(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // Updated handleViewAllClick to work with destinations
//   const handleViewAllClick = () => {
//     try {
//       setIsAllDestinationsPage(true);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error in handleViewAllClick:", err);
//     }
//   };
  
//   const handleDestinationClick = (destination) => {
//     try {
//       setSelectedDestination(destination);
//       setIsModalOpen(true);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error in handleDestinationClick:", err);
//     }
//   };
  
//   const handleBackToHome = () => {
//     setIsAllDestinationsPage(false);
//     setIsModalOpen(false);
//     setSelectedDestination(null);
//   };

//   // Get current tab destinations
//   const getCurrentDestinations = () => {
//     const category = destinationCategories.find(cat => {
//       if (activeTab === 'top' && cat.title === 'Top Destinations') return true;
//       if (activeTab === 'food' && cat.title === 'Food Destinations') return true;
//       if (activeTab === 'ancient' && cat.title === 'Ancient Destinations') return true;
//       return false;
//     });
    
//     return category ? category.items : [];
//   };

//   // Map destinations to the format expected by ToursCarousel
//   const mapDestinationsToTourFormat = (destinations) => {
//     return destinations.map((destination, index) => ({
//       id: destination.id || `dest-${index}`, // Ensure there's an ID
//       title: destination.title,
//       description: destination.description || '',
//       image: destination.image,
//       price: destination.tourDetails?.price || 0,
//       duration: destination.tourDetails?.duration || '',
//       // Add the original destination object so we can pass it to the DestinationCard
//       originalDestination: destination
//     }));
//   };

//   const currentDestinations = getCurrentDestinations();
//   const formattedToursForCarousel = mapDestinationsToTourFormat(currentDestinations);

//   // Custom wrapper component to pass the destination data correctly
//   const TourCardWrapper = ({ tour }) => {
//     // The tour prop contains the formatted tour data
//     // We need to pass the originalDestination to DestinationCard
//     return (
//       <DestinationCard 
//         destination={tour.originalDestination}
//         onViewMore={handleViewMore}
//       />
//     );
//   };
  
//   // Component for All Destinations Page
//   const AllDestinationsPage = ({ destinations, onDestinationClick, onBack }) => {
//     return (
//       <div className="all-destinations-page p-4">
//         <div className="header flex items-center mb-6">
//           <button 
//             onClick={onBack}
//             className="back-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mr-4"
//           >
//             ← Back
//           </button>
//           <h1 className="text-2xl font-bold">All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations</h1>
//         </div>
        
//         <div className="destinations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {destinations && destinations.length > 0 ? (
//             destinations.map((destination, index) => (
//               <DestinationCard
//                 key={destination.id || index} 
//                 destination={destination} 
//                 onViewMore={() => onDestinationClick(destination)} 
//               />
//             ))
//           ) : (
//             <p>No destinations available</p>
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   if (isAllDestinationsPage) {
//     return (
//       <AllDestinationsPage 
//         destinations={currentDestinations} 
//         onDestinationClick={handleDestinationClick} 
//         onBack={handleBackToHome} 
//       />
//     );
//   }
  
//   return (
//     <div className="container mt-10 max-w-[95vw] mx-auto bg-gray-50">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
//         <button
//           className="view-all-button bg-blue-600 text-white px-5 py-2 rounded-md shadow-md
//                     hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
//           onClick={handleViewAllClick}
//         >
//           View All <span className="arrow-icon text-lg">→</span>
//         </button>
//       </div>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* ToursCarousel when data is available */}
//       {!loading && !error && formattedToursForCarousel.length > 0 && (
//         <div className="mb-8">
//           <ToursCarousel
//             tours={formattedToursForCarousel}
//             TourCard={TourCardWrapper}
//             autoplayInterval={6000}
//             visibleCards={3}
//           />
//         </div>
//       )}
      
//       {/* No destinations message */}
//       {!loading && !error && currentDestinations.length === 0 && (
//         <div className="text-center py-10 text-gray-500">
//           No destinations found for this category.
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
// };

// export default DestinationGallery;
// const DestinationGallery = ({ onViewAll }) => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [destinationCategories, setDestinationCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('top');
//   const [isAllDestinationsPage, setIsAllDestinationsPage] = useState(false);
  
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/destinations');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch destinations');
//         }
        
//         const data = await response.json();
//         setDestinationCategories(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching destinations:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewMore = (destination) => {
//     setSelectedDestination(destination);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleViewAllClick = () => {
//     setIsAllDestinationsPage(true);
//   };
  
//   const handleBackToHome = () => {
//     setIsAllDestinationsPage(false);
//   };

//   // Get current tab destinations - fixed to correctly filter by category title
//   const getCurrentDestinations = () => {
//     let categoryTitle = '';
    
//     if (activeTab === 'top') {
//       categoryTitle = 'Top Destinations';
//     } else if (activeTab === 'food') {
//       categoryTitle = 'Food Destinations';
//     } else if (activeTab === 'ancient') {
//       categoryTitle = 'Ancient Destinations';
//     }
    
//     const category = destinationCategories.find(cat => cat.title === categoryTitle);
//     return category ? category.items : [];
//   };

//   // Map destinations to the format expected by ToursCarousel
//   const mapDestinationsToTourFormat = (destinations) => {
//     return destinations.map((destination, index) => ({
//       id: destination.id || `dest-${index}`,
//       title: destination.title,
//       description: destination.description || '',
//       image: destination.image,
//       price: destination.tourDetails?.price || 0,
//       duration: destination.tourDetails?.duration || '',
//       originalDestination: destination
//     }));
//   };

//   const currentDestinations = getCurrentDestinations();
//   const formattedToursForCarousel = mapDestinationsToTourFormat(currentDestinations);
//   // const formattedToursForCarousel = useMemo(() => {
//   //   return mapDestinationsToTourFormat(currentDestinations);
//   // }, [currentDestinations]);
  
//   // Custom wrapper component to pass the destination data correctly
//   const TourCardWrapper = ({ tour }) => {
//     return (
//       <DestinationCard 
//         destination={tour.originalDestination}
//         onViewMore={handleViewMore}
//       />
//     );
//   };
  
//   // If we're showing all destinations, render only that page
//   if (isAllDestinationsPage) {
//     return (
//       <div className="all-destinations-page p-4">
//         <div className="header flex items-center mb-6">
//           <button 
//             onClick={handleBackToHome}
//             className="back-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mr-4"
//           >
//             ← Back
//           </button>
//           <h1 className="text-2xl font-bold">
//             All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations
//           </h1>
//         </div>
        
//         <div className="destinations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentDestinations && currentDestinations.length > 0 ? (
//             currentDestinations.map((destination, index) => (
//               <DestinationCard
//                 key={destination.id || `dest-${index}`}
//                 destination={destination} 
//                 onViewMore={() => handleViewMore(destination)} 
//               />
//             ))
//           ) : (
//             <p>No destinations available</p>
//           )}
//         </div>
//       </div>
//     );
//   }
//   console.log("Formatted Tours:", formattedToursForCarousel);
//   // Main gallery view with carousel
//   return (
//     <div className="container mt-10 max-w-[95vw] mx-auto bg-gray-50">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
//         <button
//           className="view-all-button bg-blue-600 text-white px-5 py-2 rounded-md shadow-md
//                    hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
//           onClick={handleViewAllClick}
//         >
//           View All <span className="arrow-icon text-lg">→</span>
//         </button>
//       </div>
      
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('top')}
//         >
//           Top Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('food')}
//         >
//           Food Destinations
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm ${activeTab === 'ancient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => handleTabChange('ancient')}
//         >
//           Ancient Destinations
//         </button>
//       </div>
      
//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {/* ToursCarousel when data is available */}
//       {!loading && !error && formattedToursForCarousel.length > 0 && (
//         <div className="mb-8">
//           <ToursCarousel
//             tours={formattedToursForCarousel}
            

//             TourCard={TourCardWrapper}
//             // autoplayInterval={6000}
//             visibleCards={3}
//           />
//         </div>
//       )}
      
//       {/* No destinations message */}
//       {!loading && !error && currentDestinations.length === 0 && (
//         <div className="text-center py-10 text-gray-500">
//           No destinations found for this category.
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
// };

// export default DestinationGallery;
// import React, { useState, useEffect, useMemo, useRef } from 'react';
 // const DestinationCard = ({ destination, onViewMore }) => {
  //   // Calculate real discount if available
  //   const calculateDiscount = () => {
  //     if (destination.tourDetails.originalPrice && destination.tourDetails.price) {
  //       const originalPrice = parseFloat(destination.tourDetails.originalPrice);
  //       const currentPrice = parseFloat(destination.tourDetails.price);
  //       if (!isNaN(originalPrice) && !isNaN(currentPrice) && originalPrice > currentPrice) {
  //         return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  //       }
  //     }
  //     return destination.tourDetails.discount || 0;
  //   };
  
  //   const discount = calculateDiscount();
    
  //   // Format price with comma separators and handle NaN
  //   const formatPrice = (price) => {
  //     const numPrice = parseFloat(price);
  //     if (isNaN(numPrice)) return "₹0";
  //     return `₹${numPrice.toLocaleString('en-IN')}`;
  //   };
  
  //   // Format ratings for display
  //   const formatRating = (rating) => {
  //     const numRating = parseFloat(rating);
  //     return isNaN(numRating) ? '4.5' : numRating.toFixed(1);
  //   };
  
  //   return (
  //     <div className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
  //       {/* Image Container with premium overlay and badge */}
  //       <div className="relative h-52">
  //         <img 
  //           src={destination.image || "/api/placeholder/300/200"} 
  //           alt={destination.title} 
  //           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  //         />
  //         {/* Enhanced gradient overlay */}
  //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
  //         {/* Wishlist icon */}
  //         <button className="absolute top-3 right-3 bg-white/30 hover:bg-white/70 p-1.5 rounded-full transition-colors duration-200">
  //           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  //           </svg>
  //         </button>
          
  //         {/* Improved discount badge */}
  //         {discount > 0 && (
  //           <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
  //             {discount}% OFF
  //           </div>
  //         )}
  
  //         {/* NEW badge if desired */}
  //         {destination.isNew && (
  //           <div className="absolute top-3 left-3 ml-16 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
  //             NEW
  //           </div>
  //         )}
          
  //         {/* Enhanced location info on image */}
  //         <div className="absolute bottom-3 left-3 text-white">
  //           <div className="flex items-center">
  //             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
  //             </svg>
  //             <span className="text-sm font-medium">{destination.tourDetails.location || 'Location'}</span>
  //           </div>
  //         </div>
  //       </div>
  
  //       {/* Enhanced Content Container with better spacing */}
  //       <div className="p-4">
  //         {/* Title with better line clamp */}
  //         <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors duration-200">
  //           {destination.title}
  //         </h3>
          
  //         {/* Improved package details */}
  //         <div className="flex flex-wrap gap-3 mb-3">
  //           <div className="flex items-center text-gray-600">
  //             <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
  //             </svg>
  //             <span className="text-xs">{destination.tourDetails.duration}</span>
  //           </div>
            
  //           {/* Cancellation policy if available */}
  //           {destination.tourDetails.cancellation && (
  //             <div className="flex items-center text-gray-600">
  //               <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
  //                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  //               </svg>
  //               <span className="text-xs">{destination.tourDetails.cancellation}</span>
  //             </div>
  //           )}
            
  //           {/* Rating display with stars */}
  //           <div className="flex items-center ml-auto">
  //             <div className="flex items-center justify-center bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded mr-1">
  //               {formatRating(destination.rating)}
  //               <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
  //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //               </svg>
  //             </div>
  //             <span className="text-xs text-gray-600">
  //               {destination.reviews || '0'} Reviews
  //             </span>
  //           </div>
  //         </div>
          
  //         {/* Activity/Details tags with improved styling */}
  //         <div className="flex flex-wrap gap-1.5 mb-3">
  //           {destination.details?.slice(0, 3).map((detail, index) => (
  //             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
  //               {detail}
  //             </span>
  //           ))}
  //         </div>
          
  //         {/* Best Time indicator with styled icon */}
  //         {destination.tourDetails.bestTime && (
  //           <div className="flex items-center mt-2 mb-3 text-xs font-medium text-gray-700">
  //             <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
  //               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 01-.293-.707V6a1 1 0 011-1z" clipRule="evenodd"></path>
  //             </svg>
  //             <span>Best Time: <span className="text-orange-600 font-medium">{destination.tourDetails.bestTime}</span></span>
  //           </div>
  //         )}
          
  //         {/* Enhanced facilities icons if available */}
  //         {destination.facilities && destination.facilities.length > 0 && (
  //           <div className="flex space-x-3 mb-3">
  //             {destination.facilities.includes('meals') && (
  //               <div className="flex flex-col items-center" title="Meals Included">
  //                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
  //                   <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
  //                 </svg>
  //                 <span className="text-xs text-gray-500 mt-1">Meals</span>
  //               </div>
  //             )}
  //             {destination.facilities.includes('transport') && (
  //               <div className="flex flex-col items-center" title="Transport Included">
  //                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
  //                   <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  //                   <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-6a3 3 0 00-.78-2.01L16.81 3.4A1 1 0 0016.14 3H3z" />
  //                 </svg>
  //                 <span className="text-xs text-gray-500 mt-1">Transport</span>
  //               </div>
  //             )}
  //             {destination.facilities.includes('guide') && (
  //               <div className="flex flex-col items-center" title="Guide Included">
  //                 <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
  //                   <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-.94z"></path>
  //                 </svg>
  //                 <span className="text-xs text-gray-500 mt-1">Guide</span>
  //               </div>
  //             )}
  //           </div>
  //         )}
          
  //         {/* Divider */}
  //         <div className="border-t border-gray-200 my-3"></div>
          
  //         {/* Enhanced Price section */}
  //         <div>
  //           <div className="flex items-baseline justify-between mb-3">
  //             <div>
  //               {destination.tourDetails.originalPrice && parseFloat(destination.tourDetails.originalPrice) > parseFloat(destination.tourDetails.price) && !isNaN(parseFloat(destination.tourDetails.originalPrice)) && (
  //                 <span className="text-xs text-gray-500 line-through block">
  //                   {formatPrice(destination.tourDetails.originalPrice)}
  //                 </span>
  //               )}
  //               <div className="flex items-baseline">
  //                 <span className="text-xl font-bold text-gray-900">
  //                   {formatPrice(destination.tourDetails.price)}
  //                 </span>
  //                 <span className="text-xs ml-1 text-gray-600">
  //                   per adult
  //                 </span>
  //               </div>
  //             </div>
              
  //             {/* EMI information if available */}
  //             {destination.tourDetails.emi && (
  //               <div className="text-right">
  //                 <span className="text-xs text-gray-600 block">Starting from</span>
  //                 <span className="text-sm font-medium text-green-600">{destination.tourDetails.emi}/month</span>
  //               </div>
  //             )}
  //           </div>
            
  //           {/* Full-width View button with arrow */}
  //           <button
  //             onClick={() => onViewMore(destination)}
  //             className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow group"
  //           >
  //             <span>View Details</span>
  //             <svg 
  //               className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
  //               fill="none" 
  //               stroke="currentColor" 
  //               viewBox="0 0 24 24"
  //             >
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  //             </svg>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
 
  // const DestinationCard = ({ destination, isSlider = false }) => {
  //   const [isLiked, setIsLiked] = useState(false);
  //   const [showDetails, setShowDetails] = useState(false);

  //   const cardVariants = {
  //     hover: {
  //       scale: 1.02,
  //       transition: { duration: 0.3, ease: "easeOut" }
  //     }
  //   };

  //   const detailsVariants = {
  //     hidden: { height: 0, opacity: 0 },
  //     visible: { 
  //       height: "auto", 
  //       opacity: 1,
  //       transition: {
  //         height: { type: "spring", stiffness: 100, damping: 20 },
  //         opacity: { duration: 0.2 }
  //       }
  //     }
  //   };

  //   const formatPrice = (price) => {
  //     return new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //       minimumFractionDigits: 0
  //     }).format(price);
  //   };

  //   const getFeatures = () => {
  //     const features = [];
      
  //     if (destination.tourDetails?.duration) {
  //       features.push({
  //         icon: 'calendar',
  //         text: `${destination.tourDetails.duration} days`
  //       });
  //     }
      
  //     if (destination.tourDetails?.groupSize) {
  //       features.push({
  //         icon: 'users',
  //         text: `Group: ${destination.tourDetails.groupSize} people`
  //       });
  //     }
      
  //     if (destination.location) {
  //       features.push({
  //         icon: 'map',
  //         text: destination.location
  //       });
  //     }
      
  //     if (destination.category) {
  //       features.push({
  //         icon: 'info',
  //         text: destination.category
  //       });
  //     }
      
  //     return features;
  //   };

  //   return (
  //     <motion.div 
  //       className={`bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl overflow-hidden ${
  //         isSlider ? 'max-w-lg mx-auto' : ''
  //       } border border-orange-100 hover:border-orange-200 transition-all duration-300`}
  //       variants={cardVariants}
  //       whileHover="hover"
  //     >
  //       <div className="relative group">
  //         <motion.img 
  //           src={destination.image}
  //           alt={destination.title} 
  //           className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
  //           whileHover={{ scale: 1.05 }}
  //           transition={{ duration: 0.4 }}
  //         />
          
  //         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
  //         <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
  //           {destination.category || "Travel"}
  //         </div>

  //         <div className="absolute top-4 right-4 flex space-x-2">
  //           <motion.button
  //             whileHover={{ scale: 1.1 }}
  //             whileTap={{ scale: 0.9 }}
  //             onClick={() => setIsLiked(!isLiked)}
  //             className={`p-2 rounded-full backdrop-blur-sm ${
  //               isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
  //             }`}
  //           >
  //             <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
  //           </motion.button>
            
  //           <motion.button
  //             whileHover={{ scale: 1.1 }}
  //             whileTap={{ scale: 0.9 }}
  //             className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
  //           >
  //             <Share2 className="w-5 h-5" />
  //           </motion.button>
  //         </div>

  //         {destination.tourDetails?.price && (
  //           <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
  //             {formatPrice(destination.tourDetails.price)}
  //           </div>
  //         )}

  //         {destination.location && (
  //           <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
  //             <MapPin className="w-3 h-3" />
  //             {destination.location}
  //           </div>
  //         )}
  //       </div>

  //       <div className="p-6">
  //         <div className="flex justify-between items-start mb-4">
  //           <div>
  //             <h2 className={`${
  //               isSlider ? 'text-2xl' : 'text-xl'
  //             } font-bold text-gray-800`}>
  //               {destination.title}
  //             </h2>
  //             <div className="flex items-center mt-1">
  //               <div className="flex items-center">
  //                 <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
  //                 <span className="ml-1 text-sm text-gray-600">
  //                   {destination.rating || "4.8"} 
  //                   <span className="text-gray-400 ml-1">
  //                     ({destination.reviews || "24"} reviews)
  //                   </span>
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //           <motion.button
  //             whileHover={{ scale: 1.05 }}
  //             whileTap={{ scale: 0.95 }}
  //             onClick={() => setShowDetails(!showDetails)}
  //             className="text-orange-500 hover:text-orange-600"
  //           >
  //             <ChevronDown 
  //               className={`w-6 h-6 transform transition-transform duration-300 ${
  //                 showDetails ? 'rotate-180' : ''
  //               }`}
  //             />
  //           </motion.button>
  //         </div>

  //         <AnimatePresence>
  //           {showDetails && (
  //             <motion.div
  //               key="details"
  //               variants={detailsVariants}
  //               initial="hidden"
  //               animate="visible"
  //               exit="hidden"
  //               className="overflow-hidden"
  //             >
  //               <div className="grid grid-cols-2 gap-3 mb-6">
  //                 {getFeatures().map((feature, i) => (
  //                   <motion.div 
  //                     key={i}
  //                     initial={{ opacity: 0, y: 10 }}
  //                     animate={{ opacity: 1, y: 0 }}
  //                     className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3"
  //                   >
  //                     <span className="text-orange-500">
  //                       {featureIcons[feature.icon] 
  //                         ? React.createElement(featureIcons[feature.icon], { className: 'w-4 h-4' }) 
  //                         : "✦"
  //                       }
  //                     </span>
  //                     <span className="truncate">{feature.text}</span>
  //                   </motion.div>
  //                 ))}
  //               </div>

  //               {destination.description && (
  //                 <p className="text-sm text-gray-600 mb-4 line-clamp-3">
  //                   {destination.description}
  //                 </p>
  //               )}
  //             </motion.div>
  //           )}
  //         </AnimatePresence>

  //         <motion.button
  //           onClick={() => handleViewMore(destination)}
  //           whileHover={{ scale: 1.02, backgroundColor: '#EA580C' }}
  //           whileTap={{ scale: 0.98 }}
  //           className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
  //             shadow-lg shadow-orange-200 hover:shadow-orange-300
  //             ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
  //           `}
  //         >
  //           View Details
  //         </motion.button>
  //       </div>
  //     </motion.div>
  //   );
  // };
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
      const response = await fetch('http://localhost:5000/api/destinations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      
      const data = await response.json();
      console.log(data)
      setDestinationCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch destinations');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const featureIcons = {
    map: Map,
    calendar: Calendar,
    users: Users,
    info: Info,
  };

  const handleViewMore = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    setActiveModalTab('overview');
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

  const handleViewAllClick = () => {
    setIsAllDestinationsPage(true);
  };
  
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
            src={`http://localhost:5000${destination.image}`}
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
  
    // const handleGetQuote = () => {
    //   // Implement get quote functionality
    //   console.log("Get quote for", destination.title);
    // };
  
    // const handleBookNow = () => {
    //   // Implement booking functionality
    //   console.log("Book now for", destination.title);
    // };
    // const handleBookNow = async (selectedDestination) => {
    //   const title = selectedDestination.title || selectedDestination.destinationName;
    //   const price = selectedDestination.price || selectedDestination.basePrice;
    //   console.log("✅ Final Destination Title:", title);
    //   console.log("✅ Final Price:", price);
      
    //   // if (!selectedDestination || !title || !price) {
    //   //   alert("❌ Invalid destination selected. Please select a valid destination.");
    //   //   return;
    //   // }
    
    //   const token = localStorage.getItem('token');
    //   let userData = null;
    //   let isLoggedIn = false;
    
    //   // ✅ Fetch user details if logged in
    //   if (token) {
    //     try {
    //       console.log("🟢 Fetching user details...");
    //       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       userData = userRes.data;
    //       isLoggedIn = true;
    //       console.log("✅ User Data Retrieved:", userData);
    //     } catch (error) {
    //       console.error('🚨 Error fetching user data:', error);
    //     }
    //   }
    
    //   // Show query form for BOTH logged-in and guest users
    //   showDestinationQueryForm(selectedDestination, userData, token, isLoggedIn);
    // };
    
    // Function to show the destination query form modal
//     const showDestinationQueryForm = (selectedDestination, userData, token, isLoggedIn) => {
//       // Create modal container
//       const modalOverlay = document.createElement('div');
//       modalOverlay.className = 'query-form-overlay';
//       modalOverlay.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(0, 0, 0, 0.7);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 1000;
//       `;
    
//       // Create modal content with responsive design
//       const modalContent = document.createElement('div');
//       modalContent.className = 'query-form-content';
//       modalContent.style.cssText = `
//         background-color: white;
//         border-radius: 8px;
//         padding: 20px;
//         width: 90%;
//         max-width: 450px;
//         max-height: 85vh;
//         overflow-y: auto;
//         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//       `;
    
//       // Pre-fill form data if user is logged in
//       const name = userData?.username || '';
//       const email = userData?.email || '';
//       const phone = userData?.phone || '';
    
//       // Form with responsive design for both desktop and mobile
//       modalContent.innerHTML = `
//         <style>
//           /* Base styles */
//           .query-form-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 12px;
//           }
//           .query-form-title {
//             margin: 0;
//             color: #FF6B00;
//             font-size: 1.4rem;
//             font-weight: 600;
//           }
//           .close-button {
//             background: none;
//             border: none;
//             font-size: 1.5rem;
//             cursor: pointer;
//           }
//           .highlight-box {
//             background: linear-gradient(to right, #FFF3E0, #FFE0B2);
//             padding: 12px;
//             border-radius: 6px;
//             margin-bottom: 15px;
//           }
//           .price-box {
//             margin: 0 0 15px;
//             background-color: #F5F5F5;
//             padding: 12px;
//             border-radius: 6px;
//             text-align: center;
//           }
//           .form-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             grid-gap: 10px;
//           }
//           .form-full-width {
//             grid-column: span 2;
//           }
//           .form-label {
//             display: block;
//             margin-bottom: 3px;
//             font-weight: 500;
//             font-size: 0.85rem;
//             color: #555;
//           }
//           .form-input {
//             width: 100%;
//             padding: 8px;
//             border: 1px solid #ddd;
//             border-radius: 4px;
//             font-size: 0.9rem;
//           }
//           .form-checkbox {
//             display: flex;
//             align-items: flex-start;
//             cursor: pointer;
//           }
//           .submit-container {
//             grid-column: span 2;
//             text-align: center;
//             margin-top: 5px;
//           }
//           .submit-button {
//             background: linear-gradient(to right, #FF6B00, #FF9800);
//             color: white;
//             border: none;
//             padding: 10px 0;
//             width: 80%;
//             border-radius: 25px;
//             font-size: 1rem;
//             font-weight: 600;
//             cursor: pointer;
//             box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3);
//             transition: all 0.3s;
//           }
//           .promotional-text {
//             grid-column: span 2;
//             text-align: center;
//             margin-top: 8px;
//             font-size: 0.75rem;
//             color: #888;
//           }
          
//           /* Mobile optimizations */
//           @media (max-width: 480px) {
//             .form-grid {
//               grid-template-columns: 1fr;
//             }
//             .form-half-width {
//               grid-column: span 1;
//             }
//             .submit-button {
//               width: 100%;
//             }
//             .query-form-title {
//               font-size: 1.2rem;
//             }
//             .price-box {
//               padding: 8px;
//             }
//           }
//         </style>
        
//         <div class="query-form-header">
//           <h2 class="query-form-title">Almost There! 🎯</h2>
//           <button id="closeQueryForm" class="close-button">&times;</button>
//         </div>
        
//         <div class="highlight-box">
//           <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//             <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable journey to ${selectedDestination.title}!
//           </p>
//         </div>
        
//         <!-- Price Display Box -->
//         <div class="price-box">
//           <p style="margin: 0; font-size: 0.9rem; color: #333;">
//             <span style="font-weight: 600;">Package Price:</span> 
//             <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${price}</span>
//             <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//               Base price: ₹${price} per person | Group discounts available
//             </span>
//           </p>
//         </div>
        
//         <form id="destinationQueryForm" class="form-grid">
//           <div class="form-full-width">
//             <label for="queryName" class="form-label">Full Name*</label>
//             <input type="text" id="queryName" required value="${name}" class="form-input">
//           </div>
          
//           <div class="form-full-width">
//             <label for="queryEmail" class="form-label">Email Address*</label>
//             <input type="email" id="queryEmail" required value="${email}" class="form-input">
//           </div>
          
//           <div class="form-full-width">
//             <label for="queryPhone" class="form-label">Phone Number*</label>
//             <input type="tel" id="queryPhone" required value="${phone}" class="form-input">
//           </div>
          
//           <div class="form-half-width">
//             <label for="queryTravelDate" class="form-label">Travel Date*</label>
//             <input type="date" id="queryTravelDate" required class="form-input">
//           </div>
          
//           <div class="form-half-width">
//             <label for="queryDuration" class="form-label">Duration (Days)*</label>
//             <select id="queryDuration" required class="form-input">
//               <option value="3">3 Days</option>
//               <option value="5">5 Days</option>
//               <option value="7">7 Days</option>
//               <option value="10">10 Days</option>
//               <option value="custom">Custom</option>
//             </select>
//           </div>
          
//           <div class="form-half-width">
//             <label for="queryAdults" class="form-label">Adults*</label>
//             <select id="queryAdults" required class="form-input">
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6+">6+</option>
//             </select>
//           </div>
          
//           <div class="form-half-width">
//             <label for="queryChildren" class="form-label">Children (Under 12)</label>
//             <select id="queryChildren" class="form-input">
//               <option value="0">0</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4+">4+</option>
//             </select>
//           </div>
          
//           <div class="form-full-width">
//             <label for="queryBudget" class="form-label">Budget Range</label>
//             <select id="queryBudget" class="form-input">
//               <option value="economy">Economy</option>
//               <option value="standard" selected>Standard</option>
//               <option value="premium">Premium</option>
//               <option value="luxury">Luxury</option>
//             </select>
//           </div>
          
//           <div class="form-full-width">
//             <label for="queryMessage" class="form-label">Special Requirements</label>
//             <textarea id="queryMessage" rows="2" class="form-input" style="resize: none;"></textarea>
//           </div>
          
//           <div class="form-full-width" style="margin: 5px 0 10px;">
//             <label class="form-checkbox">
//               <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//               <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//             </label>
//           </div>
          
//           <div class="submit-container">
//             <button type="submit" id="proceedBtn" class="submit-button">
//               Send Query & Continue to Booking
//             </button>
//             <!-- Loading state message -->
//             <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
//               Taking you to checkout page...
//             </p>
//           </div>
          
//           <div class="promotional-text">
//             <p style="margin: 0;">
//               <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//             </p>
//           </div>
//         </form>
//       `;
    
//       // Append modal to body
//       modalOverlay.appendChild(modalContent);
//       document.body.appendChild(modalOverlay);
    
//       // Close modal functionality
//       document.getElementById('closeQueryForm').addEventListener('click', () => {
//         document.body.removeChild(modalOverlay);
//       });
    
//       // Price calculation function for destinations
//       const updateDestinationPrice = () => {
//         const basePrice = price;
//         const adults = document.getElementById('queryAdults').value;
//         const adultsCount = adults === '6+' ? 6 : parseInt(adults || 1);
//         const children = document.getElementById('queryChildren').value;
//         const childrenCount = children === '4+' ? 4 : parseInt(children || 0);
//         const duration = document.getElementById('queryDuration').value;
//         const durationDays = duration === 'custom' ? 7 : parseInt(duration);
//         const budget = document.getElementById('queryBudget').value;
        
//         // Budget multipliers
//         const budgetMultipliers = {
//           'economy': 0.8,
//           'standard': 1.0,
//           'premium': 1.3,
//           'luxury': 1.8
//         };
        
//         // Calculate package price based on people, duration and budget preference
//         let totalPrice = basePrice * adultsCount;
//         totalPrice += basePrice * 0.6 * childrenCount; // Children at 60% of adult price
//         totalPrice = totalPrice * (durationDays / 5); // Adjust for duration (normalized to 5 days)
//         totalPrice = totalPrice * budgetMultipliers[budget]; // Adjust for budget preference
        
//         // Round to nearest hundred
//         totalPrice = Math.round(totalPrice / 100) * 100;
        
//         document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
        
//         // Store the calculated price to use in the booking process
//         window.calculatedDestinationPrice = totalPrice;
        
//         console.log("Destination Price Updated:", totalPrice);
//       };
    
//       // Add event listeners after the modal is added to the DOM
//       setTimeout(() => {
//         document.getElementById('queryAdults').addEventListener('change', updateDestinationPrice);
//         document.getElementById('queryChildren').addEventListener('change', updateDestinationPrice);
//         document.getElementById('queryDuration').addEventListener('change', updateDestinationPrice);
//         document.getElementById('queryBudget').addEventListener('change', updateDestinationPrice);
        
//         // Initialize price calculation
//         updateDestinationPrice();
//       }, 100);
    
//       // Form submission handler
//       document.getElementById('destinationQueryForm').addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         // Show loading message
//         const proceedBtn = document.getElementById('proceedBtn');
//         const loadingMessage = document.getElementById('loadingMessage');
//         proceedBtn.disabled = true;
//         proceedBtn.style.opacity = '0.7';
//         proceedBtn.textContent = 'Processing...';
//         loadingMessage.style.display = 'block';
        
//         // Get values from form
//         const adults = document.getElementById('queryAdults').value;
//         const children = document.getElementById('queryChildren').value;
//         const duration = document.getElementById('queryDuration').value;
//         const budget = document.getElementById('queryBudget').value;
        
//         // Make sure to get the most up-to-date calculated price
//         updateDestinationPrice();
        
//         // const formData = {
//         //   name: document.getElementById('queryName').value,
//         //   email: document.getElementById('queryEmail').value,
//         //   phone: document.getElementById('queryPhone').value,
//         //   travelDate: document.getElementById('queryTravelDate').value,
//         //   duration: duration,
//         //   adults:
//         const formData = {
//           name: document.getElementById('queryName').value,
//           email: document.getElementById('queryEmail').value,
//           phone: document.getElementById('queryPhone').value,
//           travelDate: document.getElementById('queryTravelDate').value,
//           duration: duration,
//           adults: adults,
//           children: children,
//           budget: budget,
//           totalTravelers: (adults === '6+' ? 6 : parseInt(adults)) + (children === '4+' ? 4 : parseInt(children)),
//           message: document.getElementById('queryMessage').value,
//           destinationTitle: selectedDestination.title,
//           basePrice: selectedDestination.price,
//           calculatedPrice: window.calculatedDestinationPrice || selectedDestination.price,
//           termsAccepted: document.getElementById('queryTerms').checked
//         };
        
//         // Validate form
//         if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//           alert('Please fill in all required fields');
//           // Reset button state
//           proceedBtn.disabled = false;
//           proceedBtn.style.opacity = '1';
//           proceedBtn.textContent = 'Send Query & Continue to Booking';
//           loadingMessage.style.display = 'none';
//           return;
//         }
        
//         try {
//           // 1. Send to backend API
//           try {
//             await axios.post('http://localhost:5000/api/destination-queries', formData);
//             console.log('✅ Destination query saved to database');
//           } catch (error) {
//             console.error('❌ Error saving destination query:', error);
//           }
        
//           // 2. Send to WhatsApp in the background
//           sendDestinationWhatsAppInBackground(formData);
          
//           // Create/update userData object with form data
//           const updatedUserData = {
//             username: formData.name,
//             email: formData.email,
//             phone: formData.phone
//           };
          
//           // Short delay to show the "taking you to checkout" message
//           setTimeout(() => {
//             // Close the modal
//             document.body.removeChild(modalOverlay);
            
//             // Proceed with payment - using either existing userData (if logged in) or form data
//             // Pass the calculated total price to the payment function
//             proceedWithDestinationPayment(selectedDestination, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//           }, 1500);
          
//         } catch (error) {
//           console.error('🚨 Error processing destination query:', error);
//           alert('Failed to submit query. Please try again.');
          
//           // Reset button state
//           proceedBtn.disabled = false;
//           proceedBtn.style.opacity = '1';
//           proceedBtn.textContent = 'Send Query & Continue to Booking';
//           loadingMessage.style.display = 'none';
//           // Add event listeners for live price updates
// // setTimeout(() => {
// //   document.getElementById('queryAdults').addEventListener('change', updateDestinationPrice);
// //   document.getElementById('queryChildren').addEventListener('change', updateDestinationPrice);
// //   document.getElementById('queryDuration').addEventListener('change', updateDestinationPrice);
// //   document.getElementById('queryBudget').addEventListener('change', updateDestinationPrice);
// // }, 0);
// // Function to send WhatsApp message for destination bookings
// const sendDestinationWhatsAppInBackground = (formData) => {
//   // Format message for WhatsApp
//   const message = `
// *New Destination Query*
// ------------------
// *Destination:* ${formData.destinationTitle}
// *Base Price:* ₹${formData.basePrice}
// *Total Price:* ₹${formData.calculatedPrice}

// *Customer Details*
// ------------------
// *Name:* ${formData.name}
// *Email:* ${formData.email}
// *Phone:* ${formData.phone}
// *Travel Date:* ${formData.travelDate}

// *Booking Details*
// ------------------
// *Duration:* ${formData.duration} days
// *Adults:* ${formData.adults}
// *Children:* ${formData.children}
// *Budget Preference:* ${formData.budget}
// *Total Travelers:* ${formData.totalTravelers}

// *Message:* ${formData.message || 'N/A'}
// ------------------
// Sent on: ${new Date().toLocaleString()}
//   `.trim();

//   // Use your backend API to send WhatsApp message
//   try {
//     // Send via your own backend API
//     axios.post('http://localhost:5000/api/send-whatsapp', {
//       phone: "9541515012",
//       message: message
//     }).then(() => {
//       console.log('✅ WhatsApp destination notification sent successfully');
//     }).catch(error => {
//       console.error('❌ Error sending WhatsApp destination notification:', error);
//       // Fallback option if needed
//     });
//   } catch (error) {
//     console.error('❌ Error sending WhatsApp destination notification:', error);
//   }
// };

// // Function to proceed with payment for destinations
// const proceedWithDestinationPayment = async (selectedDestination, userData, token, calculatedPrice) => {
//   const userEmail = userData?.email?.trim();
  
//   if (!userEmail) {
//     alert("❌ Email is required for booking.");
//     return;
//   }

//   console.log("✅ Final User Email:", userEmail);
//   console.log("✅ Calculated Destination Price:", calculatedPrice);

//   const packageDetails = {
//     id: `destination-${Date.now()}`,
//     name: selectedDestination.title,
//     description: `Destination package for ${selectedDestination.title}`,
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }

//       // Use the calculated price
//       const finalAmount = calculatedPrice || selectedDestination.price;

//       const payload = {
//         amount: finalAmount,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//         phone: userData?.phone || '',
//       };

//       console.log("Request Payload:", payload);

//       console.log("🟢 Sending Create Order API Call...");
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: finalAmount * 100,
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: { 
//                   name: userData?.username || 'Guest', 
//                   email: userEmail,
//                   phone: userData?.phone || ''
//                 }
//               }),
//             });

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Destination booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//           contact: userData?.phone || ''
//         },
//         theme: { color: '#FF6B00' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// }};

        // }



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
              const orderResponse = await fetch('http://localhost:5000/api/create-order', {
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
                    const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
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
                    await axios.post('http://localhost:5000/api/tour-queries', formData);
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
                  const orderResponse = await fetch('http://localhost:5000/api/create-order', {
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
                        const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
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
      <div className="z-50 fixed inset-0 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
  
        {/* Modal Container */}
        <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-2/5 relative h-52 md:h-auto">
              <img
                // src={destination.image || "/api/placeholder/400/320"}
                src={`http://localhost:5000${destination.image}`}
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

  if (isAllDestinationsPage) {
    return (
      <div className="container mx-auto p-4 w-full max-w-7xl">
        <div className="flex items-center mb-6 gap-4">
          <button 
            onClick={handleBackToHome}
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            All {activeTab === 'top' ? 'Top' : activeTab === 'food' ? 'Food' : 'Ancient'} Destinations
          </h1>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
            <button 
              onClick={toggleFilter}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters {filterOpen ? '▲' : '▼'}
            </button>
          </div>
  
          {/* Filters Panel */}
          {filterOpen && (
            <div
              className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="20000" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full accent-orange-500"
                    />
                    <span>${priceRange[0]}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="20000" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-orange-500"
                    />
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Categories */}
                {allCategories.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allCategories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Render Destinations */}
        {loading && <LoadingState />}
        {error && <ErrorState />}
        {!loading && !error && filteredDestinations.length === 0 && <EmptyState />}
        
        {!loading && !error && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id || `dest-${index}`}
              >
                <DestinationCard 
                  destination={destination}
                />
              </div> 
            ))}
          </div>
        )}
        
        {/* Modal */}
        <DestinationModal 
          isOpen={isModalOpen} 
          destination={selectedDestination}
          onClose={handleCloseModal}
        />
      </div>
    );
  }
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
return (
  <div className="container mx-auto p-4 w-full max-w-7xl">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
      <button
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
                 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
        onClick={handleViewAllClick}
      >
        View All <span className="arrow-icon text-lg">→</span>
      </button>
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

    {/* Destinations Slider */}
    {!loading && !error && filteredDestinations.length > 0 && (
      <div className="mb-8">
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
        
        {/* Pagination Dots */}
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


}
export default DestinationGallery;