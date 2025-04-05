// import React, { useState } from 'react';

// const KashmirTravelSalesBanner = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const plans = [
//     {
//       id: 1,
//       name: "Basic License",
//       price: "₹12,999",
//       priceDesc: "One-time payment",
//       features: [
//         "Full website source code",
//         "Single domain use",
//         "3 months technical support",
//         "No branding rights",
//         "Documentation included"
//       ]
//     },
//     {
//       id: 2,
//       name: "Business License",
//       price: "₹24,999",
//       priceDesc: "One-time payment",
//       isPopular: true,
//       features: [
//         "Full website source code",
//         "Use on up to 3 domains",
//         "6 months technical support",
//         "White label rights",
//         "Documentation & installation guide"
//       ]
//     },
//     {
//       id: 3,
//       name: "Enterprise License",
//       price: "₹49,999",
//       priceDesc: "One-time payment",
//       features: [
//         "Full website source code",
//         "Unlimited domains",
//         "12 months technical support",
//         "White label & resell rights",
//         "Custom modifications included",
//         "Priority support"
//       ]
//     }
//   ];

//   const features = [
//     { name: "Dynamic Content Management", desc: "10+ customizable sections" },
//     { name: "Booking System", desc: "Complete end-to-end management" },
//     { name: "Sales Pipeline", desc: "Track and manage all leads" },
//     { name: "Promo Code System", desc: "Create and manage promotions" },
//     { name: "Inquiry Management", desc: "Automated organization of queries" },
//     { name: "Responsive Design", desc: "Optimized for all devices" }
//   ];

//   return (
//     <div className="font-sans">
//       {/* Floating Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
//         >
//           <span className="hidden md:inline">Explore Licensing Options</span>
//           <span className="inline md:hidden">Buy Now</span>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//           </svg>
//         </button>
//       </div>

//       {/* Modal Overlay */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 relative">
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-white hover:text-orange-200"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//               <h2 className="text-2xl font-bold">Kashmir Tour & Travel MERN Website</h2>
//               <p className="mt-2 opacity-90">Complete MERN Stack solution for your tour business</p>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Features Section */}
//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800">Key Features</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {features.map((feature, index) => (
//                     <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-100">
//                       <h4 className="font-medium text-orange-700">{feature.name}</h4>
//                       <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Pricing Plans */}
//               <div>
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800">Licensing Options</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {plans.map((plan) => (
//                     <div 
//                       key={plan.id} 
//                       className={`border rounded-lg overflow-hidden ${plan.isPopular ? 'ring-2 ring-orange-500' : 'border-gray-200'}`}
//                     >
//                       {plan.isPopular && (
//                         <div className="bg-orange-500 text-white text-center py-1 text-sm font-medium">
//                           MOST POPULAR
//                         </div>
//                       )}
//                       <div className="p-5">
//                         <h4 className="font-bold text-lg">{plan.name}</h4>
//                         <div className="mt-2">
//                           <span className="text-2xl font-bold">{plan.price}</span>
//                           <span className="text-gray-500 text-sm ml-1">{plan.priceDesc}</span>
//                         </div>
//                         <ul className="mt-4 space-y-2">
//                           {plan.features.map((feature, idx) => (
//                             <li key={idx} className="flex items-start">
//                               <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                               </svg>
//                               <span className="text-gray-700 text-sm">{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
//                         <button 
//                           onClick={() => setSelectedPlan(plan)}
//                           className={`mt-6 w-full py-2 px-4 rounded font-medium ${plan.isPopular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-100 hover:bg-orange-200 text-orange-700'}`}
//                         >
//                           Select Plan
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Contact Info */}
//               <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg">
//                 <p className="text-gray-600">Have questions? Contact us for custom requirements or demo access.</p>
//                 <div className="mt-2 flex justify-center gap-4">
//                   <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     Email Us
//                   </button>
//                   <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                     </svg>
//                     Request Demo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Plan Selection Modal */}
//       {selectedPlan && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
//               <h3 className="font-bold text-lg">Purchase {selectedPlan.name}</h3>
//             </div>
//             <div className="p-6">
//               <p className="mb-4">To complete your purchase of the {selectedPlan.name} package at {selectedPlan.price}, please fill in your details below:</p>
              
//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
//                 </div>
                
//                 <div className="flex gap-3 mt-6">
//                   <button type="button" onClick={() => setSelectedPlan(null)} className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
//                     Cancel
//                   </button>
//                   <button type="submit" className="flex-1 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
//                     Proceed to Payment
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KashmirTravelSalesBanner



// import React, { useState } from 'react';

// const KashmirTravelSalesBanner = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activePlan, setActivePlan] = useState('onetime');
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const handleTabChange = (tab) => {
//     setActivePlan(tab);
//   };

//   const features = [
//     { name: "Dynamic Tour Packages", desc: "Easily create & update tour offerings" },
//     { name: "Online Booking System", desc: "24/7 automated reservations" },
//     { name: "Payment Gateway Integration", desc: "Secure online payments" },
//     { name: "Admin Dashboard", desc: "Complete business control" },
//     { name: "SEO Optimization", desc: "Rank higher on Google" },
//     { name: "Mobile Responsiveness", desc: "Works on all devices" },
//     { name: "Car Rental System", desc: "Additional revenue stream" },
//     { name: "User Profile Management", desc: "Customer relationship building" }
//   ];

//   return (
//     <div className="font-sans">
//       {/* Floating Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
//         >
//           <span className="hidden md:inline">Explore Website Solutions</span>
//           <span className="inline md:hidden">View Solutions</span>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//           </svg>
//         </button>
//       </div>

//       {/* Modal Overlay */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-hidden flex flex-col">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:p-6 relative">
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-white hover:text-orange-200"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//               <h2 className="text-xl md:text-2xl font-bold">Kashmir Tour & Travel Website</h2>
//               <p className="mt-1 md:mt-2 opacity-90 text-sm md:text-base">Enterprise-Grade Tourism Platform for Your Business</p>
//             </div>

//             {/* Body - Scrollable content */}
//             <div className="p-4 md:p-6 overflow-y-auto flex-grow">
//               <div className="mb-6">
//                 <h4 className="text-md md:text-lg font-semibold mb-3">Enterprise-Grade Tourism Platform</h4>
//                 <p className="text-gray-600 mb-4 text-sm md:text-base">
//                   Transform your Kashmir tourism business with a professional website designed to attract customers and streamline operations.
//                 </p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Dynamic Tour Packages</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Online Booking System</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Payment Gateway Integration</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Admin Dashboard</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">SEO Optimization</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Mobile Responsiveness</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">Car Rental System</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                     <span className="text-xs md:text-sm">User Profile Management</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Admin Panel Highlight */}
//               <div className="mb-6 bg-orange-50 border border-orange-100 rounded-lg p-4">
//                 <h4 className="text-md md:text-lg font-semibold mb-2 text-orange-600">Powerful Admin Dashboard</h4>
//                 <p className="text-gray-700 mb-3 text-sm">Complete control over your business operations with our comprehensive admin panel:</p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Booking Management</h5>
//                     <p className="text-xs text-gray-600">Track and manage all reservations in real-time</p>
//                   </div>
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Sales Analytics</h5>
//                     <p className="text-xs text-gray-600">Detailed reports on revenue and bookings</p>
//                   </div>
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Inventory Control</h5>
//                     <p className="text-xs text-gray-600">Manage tour availability and pricing</p>
//                   </div>
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Customer Database</h5>
//                     <p className="text-xs text-gray-600">Complete customer information management</p>
//                   </div>
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Promo Code System</h5>
//                     <p className="text-xs text-gray-600">Create and track marketing campaigns</p>
//                   </div>
//                   <div className="bg-white p-3 rounded shadow-sm">
//                     <h5 className="font-medium text-sm mb-1">Multi-User Access</h5>
//                     <p className="text-xs text-gray-600">Role-based access for your team members</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Plans Tabs */}
//               <div className="mb-6">
//                 <div className="flex border-b mb-4 overflow-x-auto pb-1">
//                   <button 
//                     className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'onetime' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('onetime')}
//                   >
//                     One-Time Sale
//                   </button>
//                   <button 
//                     className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'subscription' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('subscription')}
//                   >
//                     Subscription
//                   </button>
//                   <button 
//                     className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'hybrid' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('hybrid')}
//                   >
//                     Hybrid Model
//                   </button>
//                 </div>
                
//                 {/* One-Time Sale Plan */}
//                 {activePlan === 'onetime' && (
//                   <div className="space-y-3">
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Basic Travel Website</h5>
//                           <p className="text-xs md:text-sm text-gray-600">Static pages, contact form, no dashboard</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹30,000 - ₹50,000</span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Full ownership of website</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Responsive design for all devices</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Basic SEO setup</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Advanced Website</h5>
//                           <p className="text-xs md:text-sm text-gray-600">Dynamic tours, user profiles, agent dashboard, online payments</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹80,000 - ₹1,50,000</span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>All Basic features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Dynamic tour management system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Full booking system with payment integration</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard for business management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Premium Website</h5>
//                           <p className="text-xs md:text-sm text-gray-600">AI chatbots, advanced analytics, booking system, multi-agent features</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹2,00,000+</span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>All Advanced features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>AI-powered customer service chatbot</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Advanced analytics and business intelligence</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Multi-agent system with role management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center text-xs md:text-sm mt-1 md:mt-2">
//                       <span className="text-green-500 mr-1 md:mr-2">✓</span>
//                       <span className="font-medium">Best for agencies with in-house IT teams who want complete control</span>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Subscription Model */}
//                 {activePlan === 'subscription' && (
//                   <div className="space-y-3">
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Basic Package</h5>
//                           <p className="text-xs md:text-sm text-gray-600">Hosting + domain + basic updates</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹3,000 - ₹5,000 <span className="text-xs md:text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Website hosting and domain management</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Basic content updates (monthly)</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Email support</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                                        
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Advanced Package</h5>
//                           <p className="text-xs md:text-sm text-gray-600">Full dynamic system + user & agent dashboards + booking system</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹8,000 - ₹15,000 <span className="text-xs md:text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>All Basic package features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Full dynamic tour and booking system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard with analytics</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Weekly content updates</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Phone and email support</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
//                         <div>
//                           <h5 className="font-semibold text-sm md:text-base">Premium Package</h5>
//                           <p className="text-xs md:text-sm text-gray-600">Priority support, SEO, email marketing, analytics</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-base md:text-lg">₹20,000+ <span className="text-xs md:text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>All Advanced package features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Priority 24/7 technical support</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Monthly SEO optimization</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Email marketing campaigns</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Google Ads management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center text-xs md:text-sm mt-1 md:mt-2">
//                       <span className="text-green-500 mr-1 md:mr-2">✓</span>
//                       <span className="font-medium">Best for agencies that want ongoing support without IT overhead</span>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Hybrid Model */}
//                 {activePlan === 'hybrid' && (
//                   <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 md:p-6">
//                     <div className="text-center mb-3 md:mb-4">
//                       <h5 className="font-bold text-lg md:text-xl text-orange-600">Hybrid Model</h5>
//                       <p className="text-gray-600 text-xs md:text-sm">The Best of Both Worlds</p>
//                     </div>
                    
//                     <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-4 md:mb-6">
//                       <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
//                         <p className="text-xs md:text-sm text-gray-500 mb-1">One-Time Setup Fee</p>
//                         <p className="text-xl md:text-2xl font-bold text-orange-500">₹50,000</p>
//                       </div>
                      
//                       <div className="hidden md:block text-xl md:text-2xl text-gray-300">+</div>
//                       <div className="md:hidden text-sm text-gray-400">plus</div>
                      
//                       <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
//                         <p className="text-xs md:text-sm text-gray-500 mb-1">Monthly Charge</p>
//                         <p className="text-xl md:text-2xl font-bold text-orange-500">₹5,000</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
//                       <div>
//                         <h6 className="font-semibold text-sm md:text-base mb-1 md:mb-2">What You Get Initially:</h6>
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Fully functional dynamic website</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard & booking system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Payment gateway integration</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Initial SEO setup</span>
//                           </li>
//                         </ul>
//                       </div>
                      
//                       <div>
//                         <h6 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Ongoing Monthly Services:</h6>
//                         <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Hosting & domain management</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Regular content updates</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>Technical support</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
//                             <span>System maintenance & security</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white p-3 md:p-4 rounded-lg text-center">
//                       <p className="font-medium text-gray-700 text-sm md:text-base">💰 Get big upfront payment + stable recurring income</p>
//                       <p className="text-xs text-gray-600 mt-1">Optional buy-out agreement available after 12 months</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Contact Section */}
//               <div className="bg-gray-50 p-4 rounded-lg text-center">
//                 <h4 className="font-semibold text-base mb-2">Ready to Grow Your Tourism Business?</h4>
//                 <p className="text-sm text-gray-600 mb-3">Contact us now to discuss your specific requirements or schedule a demo</p>
//                 <div className="flex flex-col sm:flex-row justify-center gap-3">
//                   <button 
//                     onClick={() => setSelectedPlan('contact')}
//                     className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
//                   >
//                     Get in Touch
//                   </button>
//                   <button className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 text-sm">
//                     Schedule Demo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Contact Form Modal */}
//       {selectedPlan === 'contact' && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
//               <h3 className="font-bold text-lg">Get in Touch</h3>
//             </div>
//             <div className="p-6">
//               {/* <p className="mb-4">Leave your details and our team will contact you to discuss the perfect website solution for your Kashmir tourism business.</p> */}
              
//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                   <input 
//                     type="text" 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
//                     placeholder="Enter your full name"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
//                   <input 
//                     type="text" 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
//                     placeholder="Your company name"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input 
//                     type="tel" 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
//                     placeholder="Your contact number"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                   <input 
//                     type="email" 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
//                     placeholder="Your email address"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
//                     <option value="">Select an option</option>
//                     <option value="onetime">One-Time Purchase</option>
//                     <option value="subscription">Monthly Subscription</option>
//                     <option value="hybrid">Hybrid Model</option>
//                     <option value="custom">Custom Solution</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
//                   <textarea 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     rows="3"
//                     placeholder="Tell us more about your requirements"
//                   ></textarea>
//                 </div>
                
//                 <div className="flex justify-between items-center pt-2">
//                   <button 
//                     type="button" 
//                     onClick={() => setSelectedPlan(null)}
//                     className="text-gray-500 hover:text-gray-700 text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 text-sm font-medium"
//                   >
//                     Submit Request
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KashmirTravelSalesBanner;


import React, { useState } from 'react';
import ContactForm from './ContactForm';

const KashmirTravelSalesBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState('onetime');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleTabChange = (tab) => {
    setActivePlan(tab);
  };

  const features = [
    { name: "Dynamic Tour Packages", desc: "Easily create & update tour offerings" },
    { name: "Online Booking System", desc: "24/7 automated reservations" },
    { name: "Payment Gateway Integration", desc: "Secure online payments" },
    { name: "Admin Dashboard", desc: "Complete business control" },
    { name: "SEO Optimization", desc: "Rank higher on Google" },
    { name: "Mobile Responsiveness", desc: "Works on all devices" },
    { name: "Car Rental System", desc: "Additional revenue stream" },
    { name: "User Profile Management", desc: "Customer relationship building" }
  ];

  return (
    <div className="font-sans">
      {/* Floating Button - Improved positioning for mobile */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
              {/* <span className="hidden md:inline">Explore Licensing Options</span> */}
                       {/* <span className="inline md:hidden">Buy Now</span> */}
          <span className="hidden md:inline">Explore Licensing Options</span>
         <span className="inline md:hidden">Buy Now</span> 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Modal Overlay - Improved height handling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:p-6 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-orange-200 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl md:text-2xl font-bold">Kashmir Tour & Travel Website</h2>
              <p className="mt-1 md:mt-2 opacity-90 text-sm md:text-base">Enterprise-Grade Tourism Platform for Your Business</p>
            </div>

            {/* Body - Improved scrollable content */}
            <div className="p-4 md:p-6 overflow-y-auto flex-grow">
              <div className="mb-6">
                <h4 className="text-md md:text-lg font-semibold mb-3">Enterprise-Grade Tourism Platform</h4>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Transform your Kashmir tourism business with a professional website designed to attract customers and streamline operations.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-xs md:text-sm">{feature.name}: {feature.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Admin Panel Highlight */}
              <div className="mb-6 bg-orange-50 border border-orange-100 rounded-lg p-4">
                <h4 className="text-md md:text-lg font-semibold mb-2 text-orange-600">Powerful Admin Dashboard</h4>
                <p className="text-gray-700 mb-3 text-sm">Complete control over your business operations with our comprehensive admin panel:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Booking Management</h5>
                    <p className="text-xs text-gray-600">Track and manage all reservations in real-time</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Sales Analytics</h5>
                    <p className="text-xs text-gray-600">Detailed reports on revenue and bookings</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Inventory Control</h5>
                    <p className="text-xs text-gray-600">Manage tour availability and pricing</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Customer Database</h5>
                    <p className="text-xs text-gray-600">Complete customer information management</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Promo Code System</h5>
                    <p className="text-xs text-gray-600">Create and track marketing campaigns</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="font-medium text-sm mb-1">Multi-User Access</h5>
                    <p className="text-xs text-gray-600">Role-based access for your team members</p>
                  </div>
                </div>
              </div>
              {/* Agent Dashboard Highlight */}
<div className="mb-6 bg-orange-50 border border-orange-100 rounded-lg p-4">
  <h4 className="text-md md:text-lg font-semibold mb-2 text-orange-600">Agent Dashboard Features</h4>
  <p className="text-gray-700 mb-3 text-sm">Specialized tools designed for travel agents and resellers:</p>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Client Booking Portal</h5>
      <p className="text-xs text-gray-600">Easy booking interface for your clients</p>
    </div>
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Commission Tracking</h5>
      <p className="text-xs text-gray-600">Real-time commission reports and earnings</p>
    </div>
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Client Management</h5>
      <p className="text-xs text-gray-600">Organize and access client information</p>
    </div>
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Exclusive Rates</h5>
      <p className="text-xs text-gray-600">Access to special agent pricing</p>
    </div>
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Booking Calendar</h5>
      <p className="text-xs text-gray-600">Visual overview of all client bookings</p>
    </div>
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="font-medium text-sm mb-1">Document Generation</h5>
      <p className="text-xs text-gray-600">Automated vouchers and tickets</p>
    </div>
  </div>
</div>
              {/* Plans Tabs - Improved tab navigation for mobile */}
              <div className="mb-6">
                <div className="flex border-b mb-4 overflow-x-auto pb-1 scrollbar-hide">
                  <button 
                    className={`px-3 py-2 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'onetime' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('onetime')}
                  >
                    One-Time Sale
                  </button>
                  <button 
                    className={`px-3 py-2 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'subscription' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('subscription')}
                  >
                    Subscription
                  </button>
                  <button 
                    className={`px-3 py-2 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'hybrid' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('hybrid')}
                  >
                    Hybrid Model
                  </button>
                </div>
                
                {/* One-Time Sale Plan */}
                {activePlan === 'onetime' && (
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Basic Travel Website</h5>
                          <p className="text-xs md:text-sm text-gray-600">Static pages, contact form, no dashboard</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹10,000 - ₹25,000</span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Full ownership of website</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Responsive design for all devices</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Basic SEO setup</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Advanced Website</h5>
                          <p className="text-xs md:text-sm text-gray-600">Dynamic tours, user profiles, agent dashboard, online payments</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹80,000 - ₹1,50,000</span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>All Basic features</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Dynamic tour management system</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Full booking system with payment integration</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Admin dashboard for business management</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Premium Website</h5>
                          <p className="text-xs md:text-sm text-gray-600">AI chatbots, advanced analytics, booking system, multi-agent features</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹2,00,000+</span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>All Advanced features</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>AI-powered customer service chatbot</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Advanced analytics and business intelligence</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Multi-agent system with role management</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs md:text-sm mt-1 md:mt-2">
                      <span className="text-green-500 mr-1 md:mr-2">✓</span>
                      <span className="font-medium">Best for agencies with in-house IT teams who want complete control</span>
                    </div>
                  </div>
                )}
                
                {/* Subscription Model */}
                {activePlan === 'subscription' && (
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Basic Package</h5>
                          <p className="text-xs md:text-sm text-gray-600">Hosting + domain + basic updates</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹10,000 - ₹25,000 <span className="text-xs md:text-sm font-normal">/month</span></span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Website hosting and domain management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Basic content updates (monthly)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Email support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                                        
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Advanced Package</h5>
                          <p className="text-xs md:text-sm text-gray-600">Full dynamic system + user & agent dashboards + booking system</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹8,000 - ₹15,000 <span className="text-xs md:text-sm font-normal">/month</span></span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>All Basic package features</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Full dynamic tour and booking system</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Admin dashboard with analytics</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Weekly content updates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Phone and email support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                        <div>
                          <h5 className="font-semibold text-sm md:text-base">Premium Package</h5>
                          <p className="text-xs md:text-sm text-gray-600">Priority support, SEO, email marketing, analytics</p>
                        </div>
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹20,000+ <span className="text-xs md:text-sm font-normal">/month</span></span>
                      </div>
                      <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>All Advanced package features</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Priority 24/7 technical support</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Monthly SEO optimization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Email marketing campaigns</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Google Ads management</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs md:text-sm mt-1 md:mt-2">
                      <span className="text-green-500 mr-1 md:mr-2">✓</span>
                      <span className="font-medium">Best for agencies that want ongoing support without IT overhead</span>
                    </div>
                  </div>
                )}
                
                {/* Hybrid Model */}
                {activePlan === 'hybrid' && (
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 md:p-6">
                    <div className="text-center mb-3 md:mb-4">
                      <h5 className="font-bold text-lg md:text-xl text-orange-600">Hybrid Model</h5>
                      <p className="text-gray-600 text-xs md:text-sm">The Best of Both Worlds</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-4 md:mb-6">
                      <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
                        <p className="text-xs md:text-sm text-gray-500 mb-1">One-Time Setup Fee</p>
                        <p className="text-xl md:text-2xl font-bold text-orange-500">₹50,000</p>
                      </div>
                      
                      <div className="hidden md:block text-xl md:text-2xl text-gray-300">+</div>
                      <div className="md:hidden text-sm text-gray-400">plus</div>
                      
                      <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
                        <p className="text-xs md:text-sm text-gray-500 mb-1">Monthly Charge</p>
                        <p className="text-xl md:text-2xl font-bold text-orange-500">₹5,000</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      <div>
                        <h6 className="font-semibold text-sm md:text-base mb-1 md:mb-2">What You Get Initially:</h6>
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Fully functional dynamic website</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Admin dashboard & booking system</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Payment gateway integration</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Initial SEO setup</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Ongoing Monthly Services:</h6>
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Hosting & domain management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Regular content updates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>Technical support</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-1 md:mr-2 flex-shrink-0">✓</span>
                            <span>System maintenance & security</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 md:p-4 rounded-lg text-center">
                      <p className="font-medium text-gray-700 text-sm md:text-base">💰 Get big upfront payment + stable recurring income</p>
                      <p className="text-xs text-gray-600 mt-1">Optional buy-out agreement available after 12 months</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Section */}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-base mb-2">Ready to Grow Your Tourism Business?</h4>
                <p className="text-sm text-gray-600 mb-3">Contact us now to discuss your specific requirements or schedule a demo</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button 
                    // onClick={() => setSelectedPlan('contact')}
                    onClick={() =>
                        setSelectedPlan(prev => (prev === 'contact' ? null : 'contact'))
                      }
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Get in Touch
                  </button>
                 

                  {/* <button 
                    className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Schedule Demo
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal - Improved responsive sizing */}
      {/* {selectedPlan === 'contact' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
              <h3 className="font-bold text-lg">Get in Touch</h3>
            </div>
            <div className="p-4 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" 
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" 
                    placeholder="Your contact number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" 
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base">
                    <option value="">Select an option</option>
                    <option value="onetime">One-Time Purchase</option>
                    <option value="subscription">Monthly Subscription</option>
                    <option value="hybrid">Hybrid Model</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                    rows="3"
                    placeholder="Tell us more about your requirements"
                  ></textarea>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <button 
                    type="button" 
                    onClick={() => setSelectedPlan(null)}
                    className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
      {/* <ContactForm/>
      
      */}
      {/* {selectedPlan === 'contact' && <ContactForm />} */}
      {selectedPlan === 'contact' && (
  <ContactForm onClose={() => setSelectedPlan(null)} />
)}


    </div>
  );
};

export default KashmirTravelSalesBanner;