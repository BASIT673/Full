// import React, { useState, useEffect } from 'react';

// const WebsitePopup = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Show popup after 3 seconds of page load
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Overlay */}
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-50" 
//             onClick={closePopup}
//           ></div>
          
//           {/* Popup Content */}
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden">
//             {/* Header */}
//             <div className="bg-orange-500 py-4 px-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-bold text-white">Premium Kashmir Travel Website</h3>
//                 <button 
//                   onClick={closePopup}
//                   className="text-white hover:text-gray-200"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             {/* Body */}
//             <div className="p-6">
//               <div className="mb-4">
//                 <img 
//                   src="/api/placeholder/400/200" 
//                   alt="Kashmir Website Preview" 
//                   className="w-full h-auto rounded"
//                 />
//               </div>
              
//               <h4 className="text-lg font-semibold mb-2">Dynamic Travel Website For Your Business</h4>
//               <p className="text-gray-600 mb-4">
//                 Get a fully responsive, feature-rich tourism website designed specifically for Kashmir travel businesses.
//               </p>
              
//               <div className="space-y-2 mb-4">
//                 <div className="flex items-start">
//                   <span className="text-orange-500 mr-2">✓</span>
//                   <span>Feature-rich booking system</span>
//                 </div>
//                 <div className="flex items-start">
//                   <span className="text-orange-500 mr-2">✓</span>
//                   <span>Tour package showcases</span>
//                 </div>
//                 <div className="flex items-start">
//                   <span className="text-orange-500 mr-2">✓</span>
//                   <span>Car rental integration</span>
//                 </div>
//                 <div className="flex items-start">
//                   <span className="text-orange-500 mr-2">✓</span>
//                   <span>SEO optimized content</span>
//                 </div>
//                 <div className="flex items-start">
//                   <span className="text-orange-500 mr-2">✓</span>
//                   <span>Mobile responsive design</span>
//                 </div>
//               </div>
              
//               {/* Plans */}
//               <div className="border-t border-b py-4 my-4">
//                 <h5 className="font-semibold mb-2">Choose Your Plan:</h5>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="font-medium">Basic Plan</span>
//                       <p className="text-sm text-gray-500">Essential features for startups</p>
//                     </div>
//                     <span className="font-bold text-orange-500">₹15,999</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="font-medium">Premium Plan</span>
//                       <p className="text-sm text-gray-500">Complete solution with admin panel</p>
//                     </div>
//                     <span className="font-bold text-orange-500">₹29,999</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="font-medium">Enterprise Plan</span>
//                       <p className="text-sm text-gray-500">Custom features & premium support</p>
//                     </div>
//                     <span className="font-bold text-orange-500">₹49,999</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="text-center mb-4">
//                 <p className="font-medium">Developed by Basit Yaqoob</p>
//                 <p className="text-sm text-gray-500">Professional Freelance Developer</p>
//               </div>
              
//               <div className="flex space-x-3">
//                 <button 
//                   className="flex-1 bg-orange-500 text-white py-2 px-4 rounded font-medium hover:bg-orange-600 transition"
//                   onClick={closePopup}
//                 >
//                   Contact Now
//                 </button>
//                 <button 
//                   className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded font-medium hover:bg-orange-50 transition"
//                   onClick={closePopup}
//                 >
//                   View Demo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default WebsitePopup;


// import React, { useState, useEffect } from 'react';

// const WebsitePopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activePlan, setActivePlan] = useState('business');

//   useEffect(() => {
//     // Show popup after 3 seconds of page load
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 3000);

//     // Close popup after user has spent some time on the site
//     const longTermTimer = setTimeout(() => {
//       if (!localStorage.getItem('popupShown')) {
//         localStorage.setItem('popupShown', 'true');
//       }
//     }, 3 * 60 * 1000); // 3 minutes

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(longTermTimer);
//     };
//   }, []);

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   const handleTabChange = (plan) => {
//     setActivePlan(plan);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Overlay */}
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-60" 
//             onClick={closePopup}
//           ></div>
          
//           {/* Popup Content */}
//           <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 z-10 overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 px-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl md:text-2xl font-bold text-white">Premium Kashmir Tourism Solutions</h3>
//                   <p className="text-white text-opacity-90 text-sm">Elevate Your Travel Business with a Professional Online Presence</p>
//                 </div>
//                 <button 
//                   onClick={closePopup}
//                   className="text-white hover:text-gray-200 transition-colors"
//                   aria-label="Close popup"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             {/* Body */}
//             <div className="p-6">
//               <div className="grid md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <img 
//                     src="/api/placeholder/400/250" 
//                     alt="Kashmir Website Preview" 
//                     className="w-full h-auto rounded shadow"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold mb-2">Enterprise-Grade Tourism Platform</h4>
//                   <p className="text-gray-600 mb-4">
//                     A complete digital solution designed specifically for Kashmir tourism businesses, with all the tools you need to showcase your services and grow your customer base.
//                   </p>
                  
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Advanced Booking System</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Tour Package Manager</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Payment Gateway</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Vehicle Rental System</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">SEO Optimization</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Mobile Responsiveness</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Analytics Dashboard</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2">✓</span>
//                       <span className="text-sm">Customer Support</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Plans Tabs */}
//               <div className="mb-6">
//                 <div className="flex border-b mb-4">
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm ${activePlan === 'standard' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('standard')}
//                   >
//                     Standard
//                   </button>
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm ${activePlan === 'business' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('business')}
//                   >
//                     Business
//                   </button>
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm ${activePlan === 'enterprise' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('enterprise')}
//                   >
//                     Enterprise
//                   </button>
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm ${activePlan === 'hybrid' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('hybrid')}
//                   >
//                     Hybrid
//                   </button>
//                 </div>
                
//                 {/* Standard Plan */}
//                 {activePlan === 'standard' && (
//                   <div className="bg-gray-50 p-4 rounded">
//                     <div className="flex justify-between items-center mb-3">
//                       <h5 className="font-semibold text-lg">Standard Plan</h5>
//                       <span className="font-bold text-orange-500 text-xl">₹19,999</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-3">Perfect for small travel agencies and tour guides starting their online journey.</p>
//                     <ul className="space-y-2 text-sm mb-4">
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Responsive website with booking system</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Up to 10 tour packages</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Basic SEO setup</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>3 months technical support</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
                
//                 {/* Business Plan */}
//                 {activePlan === 'business' && (
//                   <div className="bg-orange-50 p-4 rounded border border-orange-100">
//                     <div className="flex justify-between items-center mb-3">
//                       <h5 className="font-semibold text-lg">Business Plan</h5>
//                       <span className="font-bold text-orange-500 text-xl">₹34,999</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-3">Complete solution for established tourism businesses looking to expand their digital presence.</p>
//                     <ul className="space-y-2 text-sm mb-4">
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>All Standard features</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Unlimited tour packages</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Advanced booking management system</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Car rental integration</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Google Ads setup assistance</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>6 months technical support & maintenance</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
                
//                 {/* Enterprise Plan */}
//                 {activePlan === 'enterprise' && (
//                   <div className="bg-gray-50 p-4 rounded">
//                     <div className="flex justify-between items-center mb-3">
//                       <h5 className="font-semibold text-lg">Enterprise Plan</h5>
//                       <span className="font-bold text-orange-500 text-xl">₹59,999</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-3">Premium solution for large tourism operators with advanced customization needs.</p>
//                     <ul className="space-y-2 text-sm mb-4">
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>All Business features</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Custom design & branding</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Advanced analytics dashboard</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Multi-language support</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Complete digital marketing setup (Google Ads, Social Media)</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>12 months priority support & maintenance</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
                
//                 {/* Hybrid Plan */}
//                 {activePlan === 'hybrid' && (
//                   <div className="bg-gray-50 p-4 rounded">
//                     <div className="flex justify-between items-center mb-3">
//                       <h5 className="font-semibold text-lg">Hybrid Ownership Plan</h5>
//                       <span className="font-bold text-orange-500 text-xl">₹42,999</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-3">Partnership model with reduced upfront cost and revenue sharing option.</p>
//                     <ul className="space-y-2 text-sm mb-4">
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>All Business features</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Lower initial investment</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>5% revenue share model</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Ongoing marketing support</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Continuous feature updates</span>
//                       </li>
//                       <li className="flex items-center">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span>Option to buy out after 1 year</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex items-center justify-between border-t pt-4">
//                 <div>
//                   <p className="font-medium">Developed by Basit Yaqoob</p>
//                   <p className="text-sm text-gray-500">Professional Full-Stack Developer</p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button 
//                     className="bg-orange-500 text-white py-2 px-4 rounded font-medium hover:bg-orange-600 transition shadow"
//                     onClick={closePopup}
//                   >
//                     Schedule Demo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default WebsitePopup;



// import React, { useState, useEffect, useRef } from 'react';

// const WebsitePopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activePlan, setActivePlan] = useState('hybrid');
//   const popupRef = useRef(null);

//   useEffect(() => {
//     // Show popup after 3 seconds of page load
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 3000);

//     // Close popup after user has spent some time on the site
//     const longTermTimer = setTimeout(() => {
//       if (!localStorage.getItem('popupShown')) {
//         localStorage.setItem('popupShown', 'true');
//       }
//     }, 3 * 60 * 1000); // 3 minutes

//     // Handle click outside to close
//     const handleClickOutside = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         closePopup();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(longTermTimer);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   const handleTabChange = (plan) => {
//     setActivePlan(plan);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          
//           {/* Popup Content */}
//           <div 
//             ref={popupRef}
//             className="bg-white rounded-lg shadow-2xl w-full max-w-3xl z-10 overflow-hidden relative"
//           >
//             {/* Close Button */}
//             <button 
//               onClick={closePopup}
//               className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
//               aria-label="Close popup"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             </button>
            
//             {/* Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-6 md:px-8">
//               <div className="max-w-3xl mx-auto">
//                 <h3 className="text-xl md:text-3xl font-bold text-white">Premium Kashmir Tourism Solutions</h3>
//                 <p className="text-white text-opacity-90 text-sm md:text-base mt-2">
//                   Professionally Designed & Developed by Basit Yaqoob
//                 </p>
//               </div>
//             </div>
            
//             {/* Body */}
//             <div className="p-5 md:p-8">
//               <div className="grid md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <img 
//                     src="/api/placeholder/400/250" 
//                     alt="Kashmir Website Preview" 
//                     className="w-full h-auto rounded shadow"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="text-lg md:text-xl font-semibold mb-3">Enterprise-Grade Tourism Platform</h4>
//                   <p className="text-gray-600 mb-4">
//                     Transform your Kashmir tourism business with a professional website designed to attract customers and streamline operations.
//                   </p>
                  
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Dynamic Tour Packages</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Online Booking System</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Payment Gateway Integration</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Admin Dashboard</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">SEO Optimization</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Mobile Responsiveness</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">Car Rental System</span>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
//                       <span className="text-sm">User Profile Management</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Plans Tabs */}
//               <div className="mb-6">
//                 <div className="flex border-b mb-4 overflow-x-auto pb-1">
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activePlan === 'onetime' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('onetime')}
//                   >
//                     One-Time Sale
//                   </button>
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activePlan === 'subscription' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('subscription')}
//                   >
//                     Subscription
//                   </button>
//                   <button 
//                     className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activePlan === 'hybrid' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
//                     onClick={() => handleTabChange('hybrid')}
//                   >
//                     Hybrid Model
//                   </button>
//                 </div>
                
//                 {/* One-Time Sale Plan */}
//                 {activePlan === 'onetime' && (
//                   <div className="space-y-4">
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Basic Travel Website</h5>
//                           <p className="text-sm text-gray-600">Static pages, contact form, no dashboard</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹30,000 - ₹50,000</span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Full ownership of website</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Responsive design for all devices</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Basic SEO setup</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Advanced Website</h5>
//                           <p className="text-sm text-gray-600">Dynamic tours, user profiles, agent dashboard, online payments</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹80,000 - ₹1,50,000</span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>All Basic features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Dynamic tour management system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Full booking system with payment integration</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard for business management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Premium Website</h5>
//                           <p className="text-sm text-gray-600">AI chatbots, advanced analytics, booking system, multi-agent features</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹2,00,000+</span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>All Advanced features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>AI-powered customer service chatbot</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Advanced analytics and business intelligence</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Multi-agent system with role management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center text-sm mt-2">
//                       <span className="text-green-500 mr-2">✓</span>
//                       <span className="font-medium">Best for agencies with in-house IT teams who want complete control</span>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Subscription Model */}
//                 {activePlan === 'subscription' && (
//                   <div className="space-y-4">
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Basic Package</h5>
//                           <p className="text-sm text-gray-600">Hosting + domain + basic updates</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹3,000 - ₹5,000 <span className="text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Website hosting and domain management</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Basic content updates (monthly)</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Email support</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                                        
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Advanced Package</h5>
//                           <p className="text-sm text-gray-600">Full dynamic system + user & agent dashboards + booking system</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹8,000 - ₹15,000 <span className="text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>All Basic package features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Full dynamic tour and booking system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard with analytics</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Weekly content updates</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Phone and email support</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
//                         <div>
//                           <h5 className="font-semibold text-lg">Premium Package</h5>
//                           <p className="text-sm text-gray-600">Priority support, SEO, email marketing, analytics</p>
//                         </div>
//                         <span className="font-bold text-orange-500 text-lg md:text-xl">₹20,000+ <span className="text-sm font-normal">/month</span></span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>All Advanced package features</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Priority 24/7 technical support</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Monthly SEO optimization</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Email marketing campaigns</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Google Ads management</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center text-sm mt-2">
//                       <span className="text-green-500 mr-2">✓</span>
//                       <span className="font-medium">Best for agencies that want ongoing support without IT overhead</span>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Hybrid Model */}
//                 {activePlan === 'hybrid' && (
//                   <div className="bg-orange-50 border border-orange-100 rounded-lg p-6">
//                     <div className="text-center mb-4">
//                       <h5 className="font-bold text-xl text-orange-600">Hybrid Model</h5>
//                       <p className="text-gray-600">The Best of Both Worlds</p>
//                     </div>
                    
//                     <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
//                       <div className="text-center bg-white p-4 rounded-lg shadow-sm w-full md:w-auto">
//                         <p className="text-sm text-gray-500 mb-1">One-Time Setup Fee</p>
//                         <p className="text-3xl font-bold text-orange-500">₹50,000</p>
//                       </div>
                      
//                       <div className="hidden md:block text-3xl text-gray-300">+</div>
                      
//                       <div className="text-center bg-white p-4 rounded-lg shadow-sm w-full md:w-auto">
//                         <p className="text-sm text-gray-500 mb-1">Monthly Charge</p>
//                         <p className="text-3xl font-bold text-orange-500">₹5,000</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-4 mb-6">
//                       <div>
//                         <h6 className="font-semibold mb-2">What You Get Initially:</h6>
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Fully functional dynamic website</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Admin dashboard & booking system</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Payment gateway integration</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Initial SEO setup</span>
//                           </li>
//                         </ul>
//                       </div>
                      
//                       <div>
//                         <h6 className="font-semibold mb-2">Ongoing Monthly Services:</h6>
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Hosting & domain management</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Regular content updates</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>Technical support</span>
//                           </li>
//                           <li className="flex items-start">
//                             <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
//                             <span>System maintenance & security</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white p-4 rounded-lg text-center">
//                       <p className="font-medium text-gray-700">💰 Get big upfront payment + stable recurring income</p>
//                       <p className="text-sm text-gray-600 mt-1">Optional buy-out agreement available after 12 months</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
//                 <div>
//                   <p className="font-medium">Developed by <span className="text-orange-500">Basit Yaqoob</span></p>
//                   <p className="text-sm text-gray-500">Professional Full-Stack Developer</p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                   <button 
//                     className="bg-orange-500 text-white py-2 px-6 rounded font-medium hover:bg-orange-600 transition shadow w-full sm:w-auto"
//                     onClick={closePopup}
//                   >
//                     Schedule Demo
//                   </button>
//                   <button 
//                     className="border border-orange-500 text-orange-500 py-2 px-6 rounded font-medium hover:bg-orange-50 transition w-full sm:w-auto"
//                     onClick={closePopup}
//                   >
//                     Contact Me
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default WebsitePopup;




import React, { useState, useEffect, useRef } from 'react';

const WebsitePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlan, setActivePlan] = useState('hybrid');
  const popupRef = useRef(null);

//   useEffect(() => {
//     // Check if popup was already shown
//     const popupShown = localStorage.getItem('popupShown');
    
//     if (!popupShown) {
//       // Show popup after 10 seconds of page load
//       const timer = setTimeout(() => {
//         setIsOpen(true);
//         localStorage.setItem('popupShown', 'true');
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleTabChange = (plan) => {
    setActivePlan(plan);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 overflow-y-auto">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          
          {/* Popup Content */}
          <div 
            ref={popupRef}
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] md:max-h-[80vh] z-10 overflow-hidden relative flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-1 shadow"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 md:py-6 px-6">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg md:text-2xl font-bold text-white">Premium Kashmir Tourism Solutions</h3>
                <p className="text-white text-opacity-90 text-xs md:text-sm mt-1">
                  Professionally Designed & Developed by Basit Yaqoob
                </p>
              </div>
            </div>
            
            {/* Body - Scrollable content */}
            <div className="p-4 md:p-6 overflow-y-auto flex-grow">
              <div className="mb-6">
                <h4 className="text-md md:text-lg font-semibold mb-3">Enterprise-Grade Tourism Platform</h4>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Transform your Kashmir tourism business with a professional website designed to attract customers and streamline operations.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Dynamic Tour Packages</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Online Booking System</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Payment Gateway Integration</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Admin Dashboard</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">SEO Optimization</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Mobile Responsiveness</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">Car Rental System</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-xs md:text-sm">User Profile Management</span>
                  </div>
                </div>
              </div>
              
              {/* Plans Tabs */}
              <div className="mb-6">
                <div className="flex border-b mb-4 overflow-x-auto pb-1">
                  <button 
                    className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'onetime' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
                    onClick={() => handleTabChange('onetime')}
                  >
                    One-Time Sale
                  </button>
                  <button 
                    className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'subscription' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
                    onClick={() => handleTabChange('subscription')}
                  >
                    Subscription
                  </button>
                  <button 
                    className={`px-3 py-1 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${activePlan === 'hybrid' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
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
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹30,000 - ₹50,000</span>
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
                        <span className="font-bold text-orange-500 text-base md:text-lg">₹3,000 - ₹5,000 <span className="text-xs md:text-sm font-normal">/month</span></span>
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
            </div>
            
            {/* Footer - Fixed at bottom */}
            <div className="mt-auto border-t p-4 bg-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-xs md:text-sm">Developed by <span className="text-orange-500">Basit Yaqoob</span></p>
                  <p className="text-gray-500 text-xs">Professional Full-Stack Developer</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button 
                    className="bg-orange-500 text-white py-1 md:py-2 px-4 md:px-6 rounded font-medium hover:bg-orange-600 transition shadow text-xs md:text-sm w-full sm:w-auto"
                    onClick={closePopup}
                  >
                    Schedule Demo
                  </button>
                  <button 
                    className="border border-orange-500 text-orange-500 py-1 md:py-2 px-4 md:px-6 rounded font-medium hover:bg-orange-50 transition text-xs md:text-sm w-full sm:w-auto"
                    onClick={closePopup}
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebsitePopup;