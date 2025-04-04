
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { SearchBar } from "./HeroSection/SearchBar";
// import { FeatureCards } from './HeroSection/FeatureCards';

// import CTAButtons from "./HeroSection/CtaButtons";

// const HeroSection = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);
//   ;
//   // Tour data
//   const tours = [
//     {
//       id: 1,
//       name: 'Dal Lake',
//       location: 'Srinagar',
//       image: '/public/Tour1 (11).jpg',
//       rating: 8.0,
//       ratingText: 'Very Good',
//       reviews: 1,
//       price: 47,
//       originalPrice: 71,
//       totalPrice: 105,
//       VIPAccess: false,
//     },
//     {
//       id: 2,
//       name: 'Pahalgam',
//       location: 'Kashmir',
//       image: '/public/Tour1 (13).jpg',
//       rating: 9.0,
//       ratingText: 'Wonderful',
//       reviews: 184,
//       price: 129,
//       originalPrice: 172,
//       totalPrice: 335,
//       VIPAccess: true,
//     },
//     {
//       id: 3,
//       name: 'Hair Parpat',
//       location: 'Srinagar',
//       image: '/public/Tour1 (21).jpg',
//       rating: 8.0,
//       ratingText: 'Very Good',
//       reviews: 1,
//       price: 38,
//       originalPrice: 57,
//       totalPrice: 85,
//       VIPAccess: false,
//     },
//     {
//       id: 4,
//       name: 'Gulmarg',
//       location: 'Budgam Kashmir',
//       image: '/public/Tour1 (22).jpg',
//       rating: 7.2,
//       ratingText: 'Good',
//       reviews: 331,
//       price: 113,
//       originalPrice: 150,
//       totalPrice: 266,
//       VIPAccess: false,
//     },
//   ];

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div id="hero-section" className=" relative w-full ">
//       <div className="absolute inset-0 h-[85vh] z-0">
//         <div className="relative w-full h-full">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'http://localhost:5000/uploads/1739868518762.jpg',
//               backgroundPosition: 'center right',
//               backgroundSize: 'cover',
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white"></div>
//         </div>
//       </div>

//       <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center w-full">
//           <FeatureCards isMobile={isMobile} />

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex items-center gap-2 mb-6"
//           >
//             <span className="px-4  py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
//               Start Your Journey Today 🌟
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl   md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight w-full"
//           >
//             Discover the World's{" "}
//             {/* <span className="text-red-500">Hidden Treasures</span> */}
//           </motion.h1>

//           <SearchBar onDestinationSelect={setSelectedDestination} tours={tours} />

//           <CTAButtons />
         
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;
// import React, { useState, useEffect } from 'react';
// import { Search, Map, Calendar, Users, ChevronDown, Navigation, TrendingUp, Tag } from 'lucide-react';

// // Assume SearchQuery component is imported like this:
// // import SearchQuery from './SearchQuery';

// const HeroSection = () => {
//   const [activeTab, setActiveTab] = useState('destinations');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentBackground, setCurrentBackground] = useState(0);
  
//   // Background images for carousel
//   const backgrounds = [
//     {
//       url: "./images/Hero.jpg", 
//       location: "Santorini, Greece",
//       tagline: "Discover breathtaking views and crystal blue waters"
//     },
//     {
//       url: "./images/Heross.jpg", 
//       location: "Kyoto, Japan",
//       tagline: "Experience ancient traditions in modern times"
//     },
//     {
//       url: "./images/Hero1.jpg", 
//       location: "Machu Picchu, Peru",
//       tagline: "Trek through history's most magnificent ruins"
//     },
//     {
//       url: "./images/Hero1.jpg", 
//       location: "Serengeti, Tanzania",
//       tagline: "Witness the majesty of nature in its purest form"
//     }
//   ];
  
//   // Popular search suggestions
//   const popularSearches = {
//     destinations: ["Bali", "Maldives", "Santorini", "Swiss Alps", "New York"],
//     tours: ["Island Hopping", "Food Tour", "Historical Sites", "Adventure Trek", "Cultural Experience"],
//     activities: ["Scuba Diving", "Hot Air Balloon", "Wine Tasting", "Safari", "Mountain Biking"]
//   };
  
//   // Automate background rotation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
//     }, 6000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Track scroll for header transparency
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Background Image Carousel */}
//       <div className="absolute inset-0 w-full h-full">
//         {backgrounds.map((bg, index) => (
//           <div 
//             key={index}
//             className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
//               index === currentBackground ? 'opacity-100' : 'opacity-0'
//             }`}
//             style={{
//               backgroundImage: `url(${bg.url})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//             aria-hidden="true"
//           >
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
//           </div>
//         ))}
//       </div>
      
//       {/* Location indicator */}
//       <div className="absolute bottom-32 md:bottom-48 left-8 text-white z-10 max-w-md transition-all duration-700 transform translate-y-0 opacity-100">
//         <div className="flex items-center mb-2">
//           <Navigation className="text-blue-400 mr-2" size={20} />
//           <h3 className="text-xl font-semibold tracking-wide">
//             {backgrounds[currentBackground].location}
//           </h3>
//         </div>
//         <p className="text-gray-200 text-lg">
//           {backgrounds[currentBackground].tagline}
//         </p>
//       </div>
      
//       {/* Hero content */}
//       <div className="relative z-10 h-full flex flex-col">
//         <div className="container mx-auto px-4 flex-grow flex flex-col justify-center items-center text-center pt-20">
//           {/* Main headline */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight animate-fadeIn">
//             Explore the World's Hidden Gems with WanderWise
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fadeInDelay">
//             Discover authentic experiences curated by travel experts, 
//             backed by millions of traveler reviews.
//           </p>
          
//           {/* Search Container */}
//           <div className="w-full max-w-5xl mx-auto mt-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden animate-slideUp">
//             {/* Search tabs */}
//             <div className="flex border-b">
//               {[
//                 {id: 'destinations', label: 'Destinations', icon: <Map size={18} />},
//                 {id: 'tours', label: 'Tours & Packages', icon: <Tag size={18} />},
//                 {id: 'activities', label: 'Activities', icon: <TrendingUp size={18} />}
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   className={`flex-1 py-4 px-2 flex items-center justify-center gap-2 font-medium transition-colors duration-300 hover:bg-gray-100 ${
//                     activeTab === tab.id 
//                       ? 'text-blue-600 border-b-2 border-blue-600' 
//                       : 'text-gray-600'
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   {tab.icon}
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </div>
            
//             {/* Search controls */}
//             <div className="p-6">
//               {/* This is where you would include your existing SearchQuery component */}
//               {/* <SearchQuery /> */}
              
//               {/* Placeholder for SearchQuery component */}
//               <div className="flex flex-col md:flex-row md:items-center gap-4">
//                 <div className="flex-grow relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder={`Search for ${activeTab === 'destinations' ? 'cities, countries or regions' : 
//                                 activeTab === 'tours' ? 'guided tours and packages' : 
//                                 'adventure activities'}`}
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 md:flex gap-4">
//                   <button className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center text-gray-700 hover:border-blue-500 transition duration-300">
//                     <Calendar className="h-5 w-5 text-gray-400 mr-2" />
//                     <span>When</span>
//                     <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
//                   </button>
                  
//                   <button className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center text-gray-700 hover:border-blue-500 transition duration-300">
//                     <Users className="h-5 w-5 text-gray-400 mr-2" />
//                     <span>Guests</span>
//                     <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
//                   </button>
                  
//                   <button className="col-span-2 md:col-span-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold transition duration-300 transform hover:scale-105">
//                     Search
//                   </button>
//                 </div>
//               </div>
              
//               {/* Popular searches */}
//               <div className="mt-4 flex flex-wrap items-center">
//                 <span className="text-sm text-gray-500 mr-3">Popular:</span>
//                 {popularSearches[activeTab].map((term, i) => (
//                   <a
//                     key={i}
//                     href="#"
//                     className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 transition-colors duration-300"
//                   >
//                     {term}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Trust indicators */}
//           <div className="mt-8 text-white flex flex-col items-center animate-fadeInDelay2">
//             <div className="flex items-center mb-2">
//               <div className="flex -space-x-2">
//                 {[...Array(5)].map((_, i) => (
//                   <div 
//                     key={i} 
//                     className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300"
//                   >
//                     <img src={`/api/placeholder/32/32`} alt="" className="w-full h-full object-cover" />
//                   </div>
//                 ))}
//               </div>
//               <div className="ml-3">
//                 <span className="font-semibold">2M+ Happy Travelers</span>
//                 <div className="flex text-yellow-400 text-sm">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i}>★</span>
//                   ))}
//                   <span className="text-white ml-1">(24k+ reviews)</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Carousel indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {backgrounds.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentBackground(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentBackground ? 'bg-white scale-125' : 'bg-white/50 scale-100'
//               }`}
//               aria-label={`View slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes fadeInDelay {
//           0% { opacity: 0; }
//           30% { opacity: 0; }
//           100% { opacity: 1; }
//         }
//         @keyframes fadeInDelay2 {
//           0% { opacity: 0; }
//           60% { opacity: 0; }
//           100% { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-fadeInDelay {
//           animation: fadeInDelay 1.5s ease-out forwards;
//         }
//         .animate-fadeInDelay2 {
//           animation: fadeInDelay2 2s ease-out forwards;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.8s ease-out 0.5s both;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSection;


// import React, { useState, useEffect } from 'react';
// import { ChevronDown, Search, Map, Calendar, Users, ChevronRight } from 'lucide-react';

// const HeroSection = () => {
//   const [activeTab, setActiveTab] = useState('Popular Tours');
//   const [currentBgIndex, setCurrentBgIndex] = useState(0);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
  
//   // Featured destinations with location coordinates
//   const featuredDestinations = [
//     { id: 1, name: 'Santorini, Greece', x: 25, y: 35, category: 'Beach' },
//     { id: 2, name: 'Bali, Indonesia', x: 70, y: 55, category: 'Island' },
//     { id: 3, name: 'Swiss Alps', x: 40, y: 20, category: 'Mountain' },
//     { id: 4, name: 'Tokyo, Japan', x: 85, y: 30, category: 'City' },
//     { id: 5, name: 'Machu Picchu, Peru', x: 20, y: 65, category: 'Adventure' },
//   ];
  
//   // Background images rotation
//   const backgroundImages = [
//     './images/bg.jpg',
//     './images/bg4.jpg',
//     './images/bg3.jpg',
//   ];
  
//   // Popular search suggestions
//   const popularSearches = [
//     'Beach Getaways', 'Mountain Retreats', 'Cultural Tours',
//     'Wildlife Safaris', 'Food & Wine Tours', 'Adventure Trips'
//   ];
  
//   // Auto-rotate background images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//     }, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
 


// <div className="relative min-h-screen w-full overflow-y-auto font-sans ">
//   {/* Background Image Carousel with Overlay */}
//   {backgroundImages.map((img, index) => (
//     <div
//       key={index}
//       className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
//         index === currentBgIndex ? 'opacity-100' : 'opacity-0'
//       }`}
//       style={{ backgroundImage: `url(${img})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
//     </div>
//   ))}
  
//   {/* Hero Content */}
//   {/* <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//     <div className="text-center mb-8">
//       <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//         Explore the <span className="text-blue-400">World</span> Like Never Before
//       </h1>
//       <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto">
//         Discover breathtaking destinations and unforgettable experiences curated by travel experts
//       </p>
//     </div> */}
//     {/* <div className="relative h-screen flex items-center justify-center z-10 w-full px-6">
//   <div className="text-center">
//     <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//       Explore the <span className="text-blue-400">World</span> Like Never Before
//     </h1>
//     <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto">
//       Discover breathtaking destinations and unforgettable experiences curated by travel experts
//     </p>
//   </div> */}
//   {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//     <div className="text-center mb-8">
//       <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//         Explore the <span className="text-blue-400">World</span> Like Never Before
//       </h1>
//       <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto">
//         Discover breathtaking destinations and unforgettable experiences curated by travel experts
//       </p>
//     </div> */}
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//     <div className="text-center mb-8">
//       <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//         {/* Explore the <span className="text-blue-400">World</span> Like Never Before */}
//       </h1>
//       <p className="text-4xl md:text-6xl font-bold text-white mb-6">
//         {/* Discover breathtaking destinations and unforgettable experiences curated by travel experts. */}
//         Explore the <span className="text-blue-400">World</span> Like Never Before
//       </p>
//     </div>
    
//     {/* TripClap-inspired Search Container */}
//     <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
//       {/* Search Tabs - TripClap Style */}
//       <div className="flex overflow-x-auto scrollbar-hide">
//         {['Popular Tours', 'Adventure Activities', 'Beach Getaways', 'City Breaks', 'Cultural Experiences'].map((tab) => (
//           <button
//             key={tab}
//             className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition duration-300 border-b-2 ${
//               activeTab === tab 
//                 ? 'text-blue-600 border-blue-600 bg-blue-50/50' 
//                 : 'text-gray-600 border-transparent hover:text-blue-500'
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
      
//       {/* Airbnb-inspired Search Form */}
//       <div className="p-5">
//         <div className={`flex flex-col md:flex-row md:items-center rounded-lg border-2 transition-all duration-300 ${isSearchFocused ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
//           {/* Search Input */}
//           <div className="flex-1 min-w-0 relative p-2 md:p-3 border-b md:border-b-0 md:border-r border-gray-200">
//             <div className="flex items-center">
//               <Search className="w-5 h-5 text-blue-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Where would you like to go?"
//                 className="w-full outline-none text-gray-700"
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setIsSearchFocused(false)}
//               />
//             </div>
            
//             {/* Dropdown suggestions (Airbnb-style) */}
//             {isSearchFocused && (
//               <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-lg mt-1 z-30 p-3 border border-gray-100">
//                 <div className="mb-2">
//                   <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Popular Destinations</h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {featuredDestinations.map(dest => (
//                       <div key={dest.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
//                         <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center">
//                           <Map className="w-4 h-4 text-blue-500" />
//                         </div>
//                         <span className="text-sm text-gray-700">{dest.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Date Input */}
//           <div className="md:w-1/4 relative p-2 md:p-3 border-b md:border-b-0 md:border-r border-gray-200">
//             <div className="flex items-center">
//               <Calendar className="w-5 h-5 text-blue-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="When"
//                 className="w-full outline-none text-gray-700"
//                 onFocus={() => document.getElementById('datepicker').showPicker()}
//               />
//               <input
//                 id="datepicker"
//                 type="date"
//                 className="sr-only"
//               />
//               <ChevronDown className="w-4 h-4 text-gray-400" />
//             </div>
//           </div>
          
//           {/* Travelers Select */}
//           <div className="md:w-1/4 p-2 md:p-3 border-b md:border-b-0 md:border-r border-gray-200">
//             <div className="flex items-center">
//               <Users className="w-5 h-5 text-blue-500 mr-2" />
//               <select className="w-full outline-none text-gray-700 bg-transparent appearance-none">
//                 <option value="">Travelers</option>
//                 <option value="1">1 Person</option>
//                 <option value="2">2 People</option>
//                 <option value="3">3 People</option>
//                 <option value="4+">4+ People</option>
//               </select>
//               <ChevronDown className="w-4 h-4 text-gray-400" />
//             </div>
//           </div>
          
//           {/* Search Button */}
//           <div className="p-2 md:p-0">
//             <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 md:py-6 md:px-8 rounded-lg md:rounded-r-lg md:rounded-l-none transition duration-300 flex items-center justify-center">
//               <Search className="w-5 h-5 mr-2" />
//               <span>Search</span>
//             </button>
//           </div>
//         </div>
        
//         {/* Popular Searches - TripClap Style */}
//         <div className="mt-4 flex flex-wrap gap-2">
//           <span className="text-sm text-gray-600 self-center">Popular:</span>
//           {popularSearches.map((search, index) => (
//             <a 
//               key={index} 
//               href="#" 
//               className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition duration-300"
//             >
//               {search}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
    
//     {/* Featured Promotions - Inspired by Airbnb */}
//     <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
//       <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group">
//         <div className="mr-3 bg-blue-500 text-white p-2 rounded">
//           <Calendar className="w-5 h-5" />
//         </div>
//         <div>
//           <h4 className="text-white text-sm font-semibold">Last Minute Deals</h4>
//           <p className="text-white/80 text-xs">Up to 40% off</p>
//         </div>
//         <ChevronRight className="w-5 h-5 text-white/70 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
//       </div>
//       <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group">
//         <div className="mr-3 bg-green-500 text-white p-2 rounded">
//           <Map className="w-5 h-5" />
//         </div>
//         <div>
//           <h4 className="text-white text-sm font-semibold">Guided Tours</h4>
//           <p className="text-white/80 text-xs">Explore with experts</p>
//         </div>
//         <ChevronRight className="w-5 h-5 text-white/70 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
//       </div>
//     </div>
//   </div>
  
//   {/* Destination Counter Stats - Thrillophilia Inspired */}
//   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex space-x-12 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
//     <div className="text-center">
//       <div className="text-2xl font-bold text-white">500+</div>
//       <div className="text-xs text-white/80 uppercase tracking-wide">Destinations</div>
//     </div>
//     <div className="text-center">
//       <div className="text-2xl font-bold text-white">1200+</div>
//       <div className="text-xs text-white/80 uppercase tracking-wide">Tours</div>
//     </div>
//     <div className="text-center">
//       <div className="text-2xl font-bold text-white">15k+</div>
//       <div className="text-xs text-white/80 uppercase tracking-wide">Happy Travelers</div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default HeroSection;
// import React, { useState, useEffect } from 'react';

// import { ChevronDown, Search, Map, Calendar, Users, ChevronRight } from 'lucide-react'

// import SearchBar from "./SearchBar"

// const HeroSection = () => {
//   const [activeTab, setActiveTab] = useState('Popular Tours');
//   const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
//   // Featured destinations with location coordinates
//   const featuredDestinations = [
//     { id: 1, name: 'Santorini, Greece', x: 25, y: 35, category: 'Beach' },
//     { id: 2, name: 'Bali, Indonesia', x: 70, y: 55, category: 'Island' },
//     { id: 3, name: 'Swiss Alps', x: 40, y: 20, category: 'Mountain' },
//     { id: 4, name: 'Tokyo, Japan', x: 85, y: 30, category: 'City' },
//     { id: 5, name: 'Machu Picchu, Peru', x: 20, y: 65, category: 'Adventure' },
//   ];
  
//   // Background images rotation
//   const backgroundImages = [
//     './images/bg5.jpg',
//     './images/bg6.jpg',
//     './images/bg4.jpg',
//   ];
  
//   // Popular search suggestions
//   const popularSearches = [
//     'Beach Getaways', 'Mountain Retreats', 'Cultural Tours',
//     'Wildlife Safaris', 'Food & Wine Tours', 'Adventure Trips'
//   ];
  
//   // Auto-rotate background images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//     }, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full overflow-y-auto  top-0 left-0 font-sans">
//       {/* Background Image Carousel with Overlay */}
//       {backgroundImages.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
//             index === currentBgIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//           style={{ backgroundImage: `url(${img})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
//         </div>
//       ))}
      
//       {/* Hero Content */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//         <div className="text-center mb-8 mt-10">
//           {/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//             Explore the <span className="text-orange-600">World</span> Like Never 
//           </h1> */}
//           <h1 className="text-4xl font-bold text-white mb sm:mb-0 mt-[-10]sm:mt-0 ">
//   Explore the <span className="">World</span> Like Never Before
// </h1>

//           <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mt-5 sm:mb-0  "> 
//              Discover breathtaking destinations and unforgettable experiences curated by travel experts 
//           </p>
//         </div>
        
//         {/* Use the SearchBox Component */}
       
//         <SearchBar
//   activeTab={activeTab}
//   setActiveTab={setActiveTab}
//   featuredDestinations={featuredDestinations}
//   popularSearches={popularSearches}
// />
        
//         {/* Featured Promotions - Inspired by Airbnb */}
//         <div className="translate-y-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group">
//             <div className="mr-3 bg-blue-500 text-white p-2 rounded">
//               <Calendar className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-white text-sm font-semibold">Last Minute Deals</h4>
//               <p className="text-white/80 text-xs">Up to 40% off</p>
//             </div>
//             <ChevronRight className="w-5 h-5 text-white/70 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
//           </div>
//           <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group">
//             <div className="mr-3 bg-green-500 text-white p-2 rounded">
//               <Map className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-white text-sm font-semibold">Guided Tours</h4>
//               <p className="text-white/80 text-xs">Explore with experts</p>
//             </div>
//             <ChevronRight className="w-5 h-5 text-white/70 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
//           </div>
//         </div>
//       </div>
      
//       {/* Destination Counter Stats - Thrillophilia Inspired */}
//       {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex space-x-12 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-white">500+</div>
//           <div className="text-xs text-white/80 uppercase tracking-wide">Destinations</div>
//         </div>
//         <div className="text-center">
//           <div className="text-2xl font-bold text-white">1200+</div>
//           <div className="text-xs text-white/80 uppercase tracking-wide">Tours</div>
//         </div>
//         <div className="text-center">
//           <div className="text-2xl font-bold text-white">15k+</div>
//           <div className="text-xs text-white/80 uppercase tracking-wide">Happy Travelers</div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default HeroSection;





// // Add these to your tailwind.config.js
// /*
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         ping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
//       },
//     },
//   },
//   plugins: [
//     require('tailwind-scrollbar-hide'),
//   ],
// }
// */



import TripPlanner from './TripPlanner';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Map, Calendar, Users, ChevronRight } from 'lucide-react';
// import SearchBar from "./SearchBar";
import SearchBar from "../components/HeroSection/SearchBar"
import VisualCategoryCarousel from './VisualCategoryCarousel;';
// import TrekkingSection from "./TrekingSection";
import  TourQueryForm from './querfrom';

import FeatureCards from './FeaturedCards';
import EnhancedKashmirButton from './EnhancedKashmirButton';
// import TripPlanner from './TripPlanner';
// const HeroSection = () => {
  const handleDiscoverPackages = () => {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
    
    // Create popup content
    popup.innerHTML = `
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 my-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Exclusive Kashmir Offers</h3>
          <button id="closePopup" class="text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3 sm:space-y-4">
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p class="font-bold text-amber-800">Limited Time Offer!</p>
            <p class="text-amber-700">Save 20% on all Kashmir packages when you book this week.</p>
          </div>
          
          <div class="border-t border-b py-3">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">Srinagar Explorer</p>
                <p class="text-xs text-gray-500">5 days, 4 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹15,999</span> <span class="font-bold text-orange-600">₹12,799</span></p>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div>
                <p class="font-medium">Gulmarg Adventure</p>
                <p class="text-xs text-gray-500">7 days, 6 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹18,499</span> <span class="font-bold text-orange-600">₹14,799</span></p>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div>
                <p class="font-medium">Complete Kashmir</p>
                <p class="text-xs text-gray-500">10 days, 9 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹24,999</span> <span class="font-bold text-orange-600">₹19,999</span></p>
            </div>
          </div>
          
          <button id="bookNowBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            Book Now & Save
          </button>
          
          <div class="mt-2 text-center">
            <p class="text-sm text-gray-500">Offer valid until March 21, 2025</p>
            <p class="text-xs text-gray-400 mt-1">Terms and conditions apply</p>
          </div>
        </div>
      </div>
    `;
    
    // Add popup to body
    document.body.appendChild(popup);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      popup.classList.add('opacity-100');
      const popupContent = popup.querySelector('div');
      popupContent.classList.remove('scale-95');
      popupContent.classList.add('scale-100');
    }, 10);
    
    // Add close functionality
    document.getElementById('closePopup').addEventListener('click', () => {
      closePopup(popup);
    });
    
    // Close when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
    
    // Book Now button functionality
    document.getElementById('bookNowBtn').addEventListener('click', () => {
      // Close current popup
      closePopup(popup);
      
      // Create booking form popup
      setTimeout(() => {
        showBookingForm();
      }, 300);
    });
    
    // Helper function to close popup with animation
    function closePopup(popupElement) {
      const popupContent = popupElement.querySelector('div');
      popupElement.classList.remove('opacity-100');
      popupElement.classList.add('opacity-0');
      popupContent.classList.remove('scale-100');
      popupContent.classList.add('scale-95');
      
      setTimeout(() => {
        document.body.removeChild(popupElement);
      }, 300);
    }
    
    // Function to show booking form
    function showBookingForm() {
      // Create booking form popup
      const bookingForm = document.createElement('div');
      bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
      // Package details for dynamic population and pricing
      const packages = {
        'srinagar': { 
          name: 'Srinagar Explorer', 
          price: 15999, 
          discountedPrice: 12799, 
        
          duration: '5 days, 4 nights' ,
         
        },
        'gulmarg': { 
          name: 'Gulmarg Adventure', 
          price: 18499, 
          discountedPrice: 14799, 
          duration: '7 days, 6 nights' 
        },
        'complete': { 
          name: 'Complete Kashmir', 
          price: 24999, 
          discountedPrice: 19999, 
          duration: '10 days, 9 nights' 
        }
      };
      
      // Valid promo codes with discount percentages
      const promoCodes = {
        'KASHMIR2025': 10,
        'SPRING25': 15,
        'FAMILY20': 20
      };
      
      // Create form content with advanced design
      bookingForm.innerHTML = `
        <div class="bg-white rounded-xl p-0  max-w-lg w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
          <!-- Header with gradient background -->
          <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-6 text-white relative">
            <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
            <p class="mt-1 opacity-90">Exclusive 20% off for limited time</p>
            <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <!-- Decorative elements -->
            <div class="absolute -bottom-6 left-0 w-full flex justify-between px-8">
              <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Form content -->
          <div class="p-4 sm:p-6 pt-8 sm:pt-10 max-h-[calc(100vh-200px)] overflow-y-auto">
            <form id="kashmirBookingForm" class="space-y-4">
              <!-- Package selection -->
              <div class="mb-4 sm:mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="package-option">
                    <input type="radio" id="package1" name="package" value="srinagar" class="hidden peer" checked>
                    <label for="package1" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Srinagar</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="srinagar-price">12,799</span></span>
                      <span class="block text-xs text-gray-500 mt-1">5 days, 4 nights</span>
                    </label>
                  </div>
                  <div class="package-option">
                    <input type="radio" id="package2" name="package" value="gulmarg" class="hidden peer">
                    <label for="package2" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Gulmarg</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="gulmarg-price">14,799</span></span>
                      <span class="block text-xs text-gray-500 mt-1">7 days, 6 nights</span>
                    </label>
                  </div>
                  <div class="package-option">
                    <input type="radio" id="package3" name="package" value="complete" class="hidden peer">
                    <label for="package3" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Complete</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="complete-price">19,999</span></span>
                      <span class="block text-xs text-gray-500 mt-1">10 days, 9 nights</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Order summary -->
              <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 class="font-medium mb-2">Order Summary</h4>
                <div class="flex justify-between text-sm mb-1">
                  <span>Package: <span id="selectedPackageName">Srinagar Explorer</span></span>
                  <span id="packageBasePrice">₹15,999</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Duration:</span>
                  <span id="packageDuration">5 days, 4 nights</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Special offer discount (20%):</span>
                  <span class="text-green-600">-₹<span id="specialDiscount">3,200</span></span>
                </div>
                <div id="promoDiscountRow" class="justify-between text-sm mb-1 hidden">
                  <span>Promo code discount: <span id="promoCodeLabel"></span></span>
                  <span class="text-green-600">-₹<span id="promoDiscount">0</span></span>
                </div>
                <div class="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>₹<span id="totalPrice">12,799</span></span>
                </div>
              </div>
              
              <!-- Two columns layout -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Personal information -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                  <div class="flex">
                    <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200">-</button>
                    <input type="number" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
                    <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">+</button>
                  </div>
                </div>
              </div>
              
              <!-- Date selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
              </div>
              
              <!-- Special requests -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
              </div>
              
              <!-- Promo code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <div class="flex items-center space-x-2">
                  <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
                </div>
                <div id="promoMessage" class="mt-1 text-sm hidden"></div>
              </div>
              
              <!-- Submit button -->
              <div class="pt-2">
                <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  <span>Secure Your Booking</span>
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Terms and conditions -->
              <div class="text-center text-sm text-gray-500">
                <p>By booking, you agree to our <a href="#" class="text-orange-600 hover:underline">Terms & Conditions</a></p>
              </div>
            </form>
          </div>
        </div>
      `;
      
      // Add form to body
      document.body.appendChild(bookingForm);
      
      // Trigger animation
      setTimeout(() => {
        bookingForm.classList.add('opacity-100');
        const formContent = bookingForm.querySelector('div');
        formContent.classList.remove('scale-95');
        formContent.classList.add('scale-100');
      }, 10);
      
      // Tracking variables for promo code 
      let currentPackage = 'srinagar';
      let currentPromoCode = null;
      let promoDiscountPercent = 0;
      
      // Initial order summary setup
      updateOrderSummary();
      
      // Function to update the order summary
      function updateOrderSummary() {
        const packageData = packages[currentPackage];
        const basePrice = packageData.price;
        const specialDiscountAmount = Math.round(basePrice * 0.2); // 20% off
        let promoDiscountAmount = 0;
        
        // Calculate promo discount if applicable
        if (promoDiscountPercent > 0) {
          promoDiscountAmount = Math.round((basePrice - specialDiscountAmount) * (promoDiscountPercent / 100));
          document.getElementById('promoDiscountRow').classList.remove('hidden');
          document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
          document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
        } else {
          document.getElementById('promoDiscountRow').classList.add('hidden');
        }
        
        // Calculate total price
        const totalPrice = basePrice - specialDiscountAmount - promoDiscountAmount;
        
        // Update display
        document.getElementById('selectedPackageName').textContent = packageData.name;
        document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
        document.getElementById('packageDuration').textContent = packageData.duration;
        document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
        document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
        
        // Update package price display
        document.getElementById('srinagar-price').textContent = packages.srinagar.discountedPrice.toLocaleString();
        document.getElementById('gulmarg-price').textContent = packages.gulmarg.discountedPrice.toLocaleString();
        document.getElementById('complete-price').textContent = packages.complete.discountedPrice.toLocaleString();
      }
      
      // Listen for package selection changes
      document.querySelectorAll('input[name="package"]').forEach(radio => {
        radio.addEventListener('change', function() {
          currentPackage = this.value;
          updateOrderSummary();
        });
      });
      
      // Handle promo code application
      document.getElementById('applyPromo').addEventListener('click', function() {
        const promoInput = document.getElementById('promoCode');
        const enteredCode = promoInput.value.trim().toUpperCase();
        const messageDiv = document.getElementById('promoMessage');
        
        // Reset message styling
        messageDiv.className = 'mt-1 text-sm';
        
        if (!enteredCode) {
          messageDiv.textContent = 'Please enter a promo code.';
          messageDiv.classList.add('text-orange-600');
          messageDiv.classList.remove('hidden');
          return;
        }
        
        if (promoCodes[enteredCode]) {
          // Valid promo code
          promoDiscountPercent = promoCodes[enteredCode];
          currentPromoCode = enteredCode;
          
          messageDiv.textContent = `Success! ${promoDiscountPercent}% additional discount applied.`;
          messageDiv.classList.add('text-green-600');
          messageDiv.classList.remove('hidden');
          
          updateOrderSummary();
        } else {
          // Invalid promo code
          promoDiscountPercent = 0;
          currentPromoCode = null;
          
          messageDiv.textContent = 'Invalid promo code. Please try again.';
          messageDiv.classList.add('text-red-600');
          messageDiv.classList.remove('hidden');
          
          document.getElementById('promoDiscountRow').classList.add('hidden');
          updateOrderSummary();
        }
      });
      
      // Add close functionality
      document.getElementById('closeBookingForm').addEventListener('click', () => {
        closeBookingForm(bookingForm);
      });
      
      // Close when clicking outside
      bookingForm.addEventListener('click', (e) => {
        if (e.target === bookingForm) {
          closeBookingForm(bookingForm);
        }
      });
      
      // Handle travelers count
      document.getElementById('decreaseTravelers').addEventListener('click', () => {
        const travelersInput = document.getElementById('travelers');
        if (parseInt(travelersInput.value) > 1) {
          travelersInput.value = parseInt(travelersInput.value) - 1;
        }
      });
      
      document.getElementById('increaseTravelers').addEventListener('click', () => {
        const travelersInput = document.getElementById('travelers');
        if (parseInt(travelersInput.value) < 10) {
          travelersInput.value = parseInt(travelersInput.value) + 1;
        }
      });
      
      // Form submission
      document.getElementById('kashmirBookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = document.getElementById('submitBooking');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        `;
        
        // Simulate form processing
        setTimeout(() => {
          // Close the form
          closeBookingForm(bookingForm);
          
          // Show success message
          setTimeout(() => {
            showSuccessMessage(currentPackage, currentPromoCode);
          }, 300);
        }, 1500);
      });
      
      // Helper function to close booking form with animation
      function closeBookingForm(formElement) {
        const formContent = formElement.querySelector('div');
        formElement.classList.remove('opacity-100');
        formElement.classList.add('opacity-0');
        formContent.classList.remove('scale-100');
        formContent.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(formElement);
        }, 300);
      }
      
      // Add ESC key to close form
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeBookingForm(bookingForm);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Function to show success message
    function showSuccessMessage(packageType, promoCode) {
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
      // Get package data
      const packageData = {
        'srinagar': { name: 'Srinagar Explorer', duration: '5 days, 4 nights' },
        'gulmarg': { name: 'Gulmarg Adventure', duration: '7 days, 6 nights' },
        'complete': { name: 'Complete Kashmir', duration: '10 days, 9 nights' }
      }[packageType || 'srinagar'];
      
      // Generate a random booking reference
      const bookingRef = 'KASH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      // Create promo text if applicable
      const promoText = promoCode ? `<p class="mt-1 text-gray-600">Promo code applied: <span class="font-medium">${promoCode}</span></p>` : '';
      
      successMessage.innerHTML = `
        <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 text-center">
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mt-4">Booking Successful!</h3>
          <p class="mt-2 text-gray-600">Your ${packageData.name} (${packageData.duration}) is confirmed. We've sent the details to your email.</p>
          <p class="mt-1 text-gray-600">Booking reference: <span class="font-medium">${bookingRef}</span></p>
          ${promoText}
          <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
            Continue
          </button>
        </div>
      `;
      
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.classList.add('opacity-100');
        const messageContent = successMessage.querySelector('div');
        messageContent.classList.remove('scale-95');
        messageContent.classList.add('scale-100');
      }, 10);
      
      // Close success message when the continue button is clicked
      document.getElementById('closeSuccess').addEventListener('click', () => {
        successMessage.classList.remove('opacity-100');
        successMessage.classList.add('opacity-0');
        const messageContent = successMessage.querySelector('div');
        messageContent.classList.remove('scale-100');
        messageContent.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 300);
      });
      
      // Close when clicking outside
      successMessage.addEventListener('click', (e) => {
        if (e.target === successMessage) {
          successMessage.classList.remove('opacity-100');
          successMessage.classList.add('opacity-0');
          const messageContent = successMessage.querySelector('div');
          messageContent.classList.remove('scale-100');
          messageContent.classList.add('scale-95');
          
          setTimeout(() => {
            document.body.removeChild(successMessage);
          }, 300);
        }
      });
      
      // Add ESC key to close success message
      // const handleEscKey = (e) => {
      //   if (e.key === 'Escape') {
      //     successMessage.classList.remove('opacity-100');
      //     successMessage.classList.add('opacity-0');
      //     const messageContent = successMessage.querySelector('div');
      //     messageContent.classList.remove('scale
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeBookingForm(bookingForm);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }};
  
  const handleOptionSelect = (option, categoryType, categoryTitle) => {
    setQueryParams({
      option: option,
      type: categoryType,
      categoryTitle: categoryTitle
    });
    setShowQueryForm(true);
  };
  
//   // Featured destinations with location coordinates
//   const featuredDestinations = [
//     { id: 1, name: 'Santorini, Greece', x: 25, y: 35, category: 'Beach' },
//     { id: 2, name: 'Bali, Indonesia', x: 70, y: 55, category: 'Island' },
//     { id: 3, name: 'Swiss Alps', x: 40, y: 20, category: 'Mountain' },
//     { id: 4, name: 'Tokyo, Japan', x: 85, y: 30, category: 'City' },
//     { id: 5, name: 'Machu Picchu, Peru', x: 20, y: 65, category: 'Adventure' },
//   ];
  
  // import React from 'react';
  // import VisualCategoryCarousel from './VisualCategoryCarousel';
  // import TripPlanner from './TripPlanner';
     {/* Hero Content */}
      {/* //   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
      //     <div className="text-center mb-8 mt-0">
      //       <h1 className="text-4xl font-bold text-gray-800 mb-0 mt-0 md:mt-20">
      //         Explore the <span className="text-orange-600">World</span> Like Never Before
      //       </h1>
      //       <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden">
      //         Discover breathtaking destinations and unforgettable experiences curated by travel experts
      //       </p>
      //     </div> */}
         {/* Hero Container */}
{/* Hero Container */}
// import React from 'react';
// Assuming TripPlanner is a component you've already defined
// import TripPlanner from './TripPlanner';
// import VisualCategoryCarousel from './VisualCategoryCarousel';
const HeroSection = ({ featuredDestinations, handleOptionSelect }) => {
  return (
 <div className="relative min-h-screen w-full overflow-y-auto font-sans bg-white">
 
 {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4 sm:px-6">
 <div className="text-center mb-6 sm:mb-8">
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-0 sm:mt-0 md:mt-20">
  Explore the <span className="text-orange-600">World</span> Like Never Before
  </h1>
 <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-5">
  Discover breathtaking destinations and unforgettable experiences curated by travel experts
 </p>
 </div>
 </div>  */}
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
  <div className="text-center mb-8 mt-0">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-0 mt-0 md:mt-20">
      Explore the <span className="text-orange-600">World</span> Like Never Before
    </h1>
    {/* <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 hidden sm:block">
  Discover breathtaking destinations and unforgettable experiences curated by travel experts
</p> */}

    {/* <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden">
      Discover breathtaking destinations and unforgettable experiences curated by travel experts
    </p> */}
  </div>
{/* </div> */}

    {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
          <div className="text-center mb-8 mt-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-0 mt-0 md:mt-20">
              Explore the <span className="text-orange-600">World</span> Like Never Before
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden">
              Discover breathtaking destinations and unforgettable experiences curated by travel experts
            </p>
          </div> */}
 <VisualCategoryCarousel
  featuredDestinations={featuredDestinations}
 onOptionSelect={handleOptionSelect}
 />
 <div className="mt-10 bg-gray-50 rounded-lg p-4 shadow-sm relative z-20">
 <div className="flex flex-col md:flex-row items-center justify-between">
 {/* Heading & Trip Planner */}
 <div className="flex  items-center mb-3 md:mb-0 relative">
  {/* <h3 className="text-sm  md:hidden sm:text-base font-semibold text-gray-800 mr-2 sm:mr-4 whitespace-nowrap">
 Need inspiration?
 </h3> */}
  <div className="relative z-20">
  <TripPlanner />
 </div>
 </div>
 

 {/* Feature Cards */}
  <div className=" md:hidden flex flex-wrap justify-center gap-2">

   {[
  {
 bgColor: "bg-blue-100",
  iconColor: "text-blue-600",
 text: "Save up to 30%",
 icon: (
 <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
),
  },
 {
 bgColor: "bg-green-100",
  iconColor: "text-green-600",
  text: "Verified stays",
  icon: (
  <path
 fillRule="evenodd"
d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
 clipRule="evenodd"
 />
  ),
 },
  {
 bgColor: "bg-purple-100",
  iconColor: "text-purple-600",
 text: "24/7 support",
 icon: (
  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
 ),
  },
  ].map((item, index) => (
  <div
  key={index}
 className="bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center min-w-[120px] sm:min-w-[150px]"
  >
  <div
  className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${item.bgColor}`}
  >
  <svg
 xmlns="http://www.w3.org/2000/svg"
 className={`h-4 w-4 ${item.iconColor}`}
 viewBox="0 0 20 20"
  fill="currentColor"
  >
  {item.icon}
 </svg>
  </div>
  <span className="text-xs sm:text-sm font-medium">{item.text}</span>
 </div>
  ))} 
   </div> 
   <EnhancedKashmirButton/>
   {/* <button
  onClick={handleDiscoverPackages}
  className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-orange-200"
  aria-label="Explore our popular Kashmir tour packages"
>
  <span className="block sm:hidden">Discover Kashmir Packages</span>  
  <span className="hidden sm:block">Discover Kashmir Packages</span>
</button> */}
 
 </div>
 </div>


 </div>

 </div>
  );
 }

  export default HeroSection; 
// const HeroSection = ({ featuredDestinations, handleOptionSelect }) => {
//   return (
//     <div className="relative min-h-screen w-full overflow-y-auto font-sans bg-white">
//       {/* Hero content - centered and responsive  */}
      
//        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
//           <div className="text-center mb-8 mt-0">
//             <h1 className="text-4xl font-bold text-gray-800 mb-0 mt-0 md:mt-20">
//               Explore the <span className="text-orange-600">World</span> Like Never Before
//             </h1>
//             <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden">
//               Discover breathtaking destinations and unforgettable experiences curated by travel experts
//             </p>
//           </div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-3 sm:px-4 md:px-6">
//         <div className="text-center mb-4 sm:mb-6 md:mb-8">
//           <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-0 sm:mt-0 md:mt-16 lg:mt-20 leading-tight">
//             Explore the <span className="text-orange-600">World</span> Like Never Before
//           </h1>
//           <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mt-2 sm:mt-3 md:mt-5 px-2">
//             Discover breathtaking destinations and unforgettable experiences curated by travel experts
//           </p>
//         </div>
//       </div> 
//   {/* Additional content here - Ensure it is positioned with padding to avoid overlap */}
//   <div className="relative z-0 mt-[500px] sm:mt-[600px]">
//     <p>Additional content goes here...</p>
//      {/* Visual Category Carousel */}
//      <VisualCategoryCarousel
//         featuredDestinations={featuredDestinations}
//         onOptionSelect={handleOptionSelect}
//       />
      
//       {/* Bottom info box - made more responsive */}
//       <div className="mt-2 bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 shadow-sm relative z-20 mx-2 sm:mx-3 md:mx-4">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           {/* Heading & Trip Planner */}
//           <div className="flex items-center mb-3 md:mb-0 relative w-full md:w-auto justify-center md:justify-start">
//             <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mr-2 sm:mr-4 whitespace-nowrap">
//               Need inspiration?
//             </h3>
//             <div className="relative z-20">
//               <TripPlanner />
//             </div>
//           </div>
          
//           {/* Feature Cards - responsive grid */}
//           <div className="flex flex-wrap justify-center md:justify-end gap-1 sm:gap-2 w-full md:w-auto">
//             {/* Feature Items */}
//             {[
//               {
//                 bgColor: "bg-blue-100",
//                 iconColor: "text-blue-600",
//                 text: "Save up to 30%",
//                 icon: (
//                   <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
//                 ),
//               },
//               {
//                 bgColor: "bg-green-100",
//                 iconColor: "text-green-600",
//                 text: "Verified stays",
//                 icon: (
//                   <path
//                     fillRule="evenodd"
//                     d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 ),
//               },
//               {
//                 bgColor: "bg-purple-100",
//                 iconColor: "text-purple-600",
//                 text: "24/7 support",
//                 icon: (
//                   <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//                 ),
//               },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white px-2 xs:px-3 py-1 rounded-lg border border-gray-100 flex items-center min-w-[100px] xs:min-w-[120px] sm:min-w-[150px]"
//               >
//                 <div
//                   className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center mr-1 sm:mr-2 ${item.bgColor}`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`h-3 w-3 sm:h-4 sm:w-4 ${item.iconColor}`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     {item.icon}
//                   </svg>
//                 </div>
//                 <span className="text-xs sm:text-sm font-medium">{item.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// // </div>

      
     
//   );
// };

// export default HeroSection;
//   const HeroSection = ({ featuredDestinations, handleOptionSelect }) => {
//     return (
//       <div className="relative min-h-screen w-full overflow-y-auto font-sans bg-white">
      
// <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4 sm:px-6">
//   <div className="text-center mb-6 sm:mb-8">
//     <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-0 sm:mt-0 md:mt-20">
//       Explore the <span className="text-orange-600">World</span> Like Never Before
//     </h1>
//     <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-5">
//       Discover breathtaking destinations and unforgettable experiences curated by travel experts
//     </p>
//   </div>
// </div>

          
//           <VisualCategoryCarousel
//             featuredDestinations={featuredDestinations}
//             onOptionSelect={handleOptionSelect}
//           />
//           <div className="mt-2 bg-gray-50 rounded-lg p-4 shadow-sm relative z-20">
//   <div className="flex flex-col md:flex-row items-center justify-between">
//     {/* Heading & Trip Planner */}
//     <div className="flex items-center mb-3 md:mb-0 relative">
//       <h3 className="text-sm sm:text-base font-semibold text-gray-800 mr-2 sm:mr-4 whitespace-nowrap">
//         Need inspiration?
//       </h3>
//       <div className="relative z-20">
//         <TripPlanner />
//       </div>
//     </div>

//     {/* Feature Cards */}
//     <div className="flex flex-wrap justify-center gap-2">
//       {/* Feature Item */}
//       {[
//         {
//           bgColor: "bg-blue-100",
//           iconColor: "text-blue-600",
//           text: "Save up to 30%",
//           icon: (
//             <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
//           ),
//         },
//         {
//           bgColor: "bg-green-100",
//           iconColor: "text-green-600",
//           text: "Verified stays",
//           icon: (
//             <path
//               fillRule="evenodd"
//               d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           ),
//         },
//         {
//           bgColor: "bg-purple-100",
//           iconColor: "text-purple-600",
//           text: "24/7 support",
//           icon: (
//             <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//           ),
//         },
//       ].map((item, index) => (
//         <div
//           key={index}
//           className="bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center min-w-[120px] sm:min-w-[150px]"
//         >
//           <div
//             className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${item.bgColor}`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-4 w-4 ${item.iconColor}`}
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               {item.icon}
//             </svg>
//           </div>
//           <span className="text-xs sm:text-sm font-medium">{item.text}</span>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>


//         </div>
     
      
//     );
//   };
  
//   export default HeroSection;

//   return (
//     <div className="   z-40 relative min-h-screen w-full overflow-y-auto  left-0 font-sans bg-white">
//       {/* Hero Content */}
//        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//       <div className="text-center   mb-8 mt-0">
//           <h1 className="text-4xl  font-bold text-gray-800 mb sm:mb-0 mt-[-10]sm:mt-0 md:mt-20 ">
//             Explore the <span className="text-orange-600">World</span> Like Never Before
//           </h1>
        

//           <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden "> 
//             Discover breathtaking destinations and unforgettable experiences curated by travel experts 
//           </p> 
    
//         </div> 
        
     
 
// <VisualCategoryCarousel 
//       featuredDestinations={featuredDestinations}
//       onOptionSelect={handleOptionSelect} 
//     />
    
    
   
// <div className="mt-2 bg-gray-50 rounded-lg p-4 shadow-sm">
//   <div className="flex flex-col md:flex-row items-center justify-between">
//     <div className="flex items-center mb-3 md:mb-0">
//       <h3 className="text-base font-semibold text-gray-800 mr-4">Need inspiration?</h3>
     
// <TripPlanner/>

//     </div>
    
//     <div className="flex flex-wrap justify-center gap-2">
//       <div className="bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center">
//         <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
//           </svg>
//         </div>
//         <span className="text-xs font-medium">Save up to 30%</span>
//       </div>
      
//       <div className="bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center">
//         <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//         </div>
//         <span className="text-xs font-medium">Verified stays</span>
//       </div>
      
//       <div className="bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center">
//         <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//           </svg>
//         </div>
//         <span className="text-xs font-medium">24/7 support</span>
//       </div>
//     </div>
//   </div>
// </div>
     
// </div>
//  </div>
//   );
// };

// export default HeroSection;

// import React, { useState, useEffect } from 'react';

// import React, { useState } from 'react';

// const HeroSection = () => {
//   const [showQueryForm, setShowQueryForm] = useState(false);
//   const [queryParams, setQueryParams] = useState({});
//   const [activeSeason, setActiveSeason] = useState('summer');

//   const handleOptionSelect = (option, categoryType, categoryTitle) => {
//     setQueryParams({
//       option: option,
//       type: categoryType,
//       categoryTitle: categoryTitle
//     });
//     setShowQueryForm(true);
//   };

//   // Featured destinations with location coordinates
//   const featuredDestinations = [
//     { id: 1, name: 'Dal Lake, Srinagar', x: 25, y: 35, category: 'Lakes' },
//     { id: 2, name: 'Gulmarg', x: 70, y: 55, category: 'Mountains' },
//     { id: 3, name: 'Pahalgam', x: 40, y: 20, category: 'Valleys' },
//     { id: 4, name: 'Sonamarg', x: 85, y: 30, category: 'Adventure' },
//     { id: 5, name: 'Mughal Gardens', x: 20, y: 65, category: 'Heritage' },
//   ];

//   // Seasonal highlights
//   const seasonalHighlights = {
//     summer: {
//       title: "Summer Paradise",
//       description: "Experience lush green meadows and cool mountain air",
//       image: "/images/bg.jpg"
//     },
//     autumn: {
//       title: "Golden Autumn",
//       description: "Witness the magical transformation as valleys turn golden",
//       image: "/images/autumn-kashmir.jpg"
//     },
//     winter: {
//       title: "Winter Wonderland",
//       description: "Pristine snow-covered landscapes and thrilling skiing adventures",
//       image: "/images/winter-kashmir.jpg"
//     },
//     spring: {
//       title: "Blossoming Spring",
//       description: "Marvel at colorful tulip gardens and blooming orchards",
//       image: "/images/spring-kashmir.jpg"
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-y-auto top-0 left-0 font-sans bg-white">
//       {/* Background with overlay */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src="/images/Hero.jpg" 
//           alt="Kashmir Landscape" 
//           className="w-full h-full object-cover opacity-80"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
//       </div>

//       {/* Hero Content */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-6">
//         <div className="text-center mb-8 mt-10">
//           <div className="inline-block mb-3 px-4 py-1 bg-orange-600 bg-opacity-90 rounded-full text-white text-sm font-medium">
//             Experience Kashmir's Magic
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-3 drop-shadow-lg">
//             Explore the <span className="text-orange-600">Heaven</span> on Earth
//           </h1>
//           <p className="text-lg text-white max-w-2xl mx-auto mb-6">
//             Where breathtaking landscapes meet rich cultural heritage and unforgettable adventures await
//           </p>

//           {/* Quick booking CTA */}
//           <div className="inline-block bg-white bg-opacity-95 rounded-lg shadow-lg p-4 mb-8">
//             <div className="flex flex-col sm:flex-row items-center gap-3">
//               <input 
//                 type="text" 
//                 placeholder="Search destinations..." 
//                 className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
//               />
//               <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto">
//                 <option value="">Select Experience</option>
//                 <option value="adventure">Adventure</option>
//                 <option value="cultural">Cultural Tours</option>
//                 <option value="wellness">Wellness Retreat</option>
//                 <option value="photography">Photography Tours</option>
//               </select>
//               <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md transition duration-300 w-full sm:w-auto">
//                 Find Your Journey
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Seasonal toggles */}
//         <div className="mb-6 flex justify-center">
//           <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-1 flex">
//             {Object.keys(seasonalHighlights).map((season) => (
//               <button
//                 key={season}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                   activeSeason === season 
//                     ? 'bg-orange-600 text-white' 
//                     : 'text-white hover:bg-white hover:bg-opacity-10'
//                 }`}
//                 onClick={() => setActiveSeason(season)}
//               >
//                 {season.charAt(0).toUpperCase() + season.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Seasonal highlight card */}
//         <div className="mb-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-white border border-white border-opacity-20">
//           <div className="flex flex-col md:flex-row items-center">
//             <img 
//               src={seasonalHighlights[activeSeason].image} 
//               alt={`Kashmir in ${activeSeason}`} 
//               className="w-full md:w-1/3 h-40 object-cover rounded-lg"
//             />
//             <div className="md:ml-4 mt-4 md:mt-0">
//               <h3 className="text-xl font-bold mb-2">{seasonalHighlights[activeSeason].title}</h3>
//               <p>{seasonalHighlights[activeSeason].description}</p>
//               <button className="mt-3 px-4 py-1 bg-orange-600 hover:bg-orange-700 rounded-md transition">
//                 View {activeSeason.charAt(0).toUpperCase() + activeSeason.slice(1)} Packages
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Visual Category Carousel - Your existing component */}
//         <VisualCategoryCarousel
//           featuredDestinations={featuredDestinations}
//           onOptionSelect={handleOptionSelect}
//         />

//         {/* Trust badges */}
//         <div className="mt-8 bg-white bg-opacity-80 rounded-lg p-4">
//           <div className="flex flex-wrap justify-center items-center gap-6 text-gray-700">
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//               <span>4.9/5 Customer Rating</span>
//             </div>
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>10+ Years Experience</span>
//             </div>
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//               <span>100% Secure Booking</span>
//             </div>
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
//               </svg>
//               <span>Best Price Guarantee</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;;
  {/* <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mt-5 sm:mb-0 md:hidden"> 
            Discover breathtaking destinations and unforgettable experiences curated by travel experts 
          </p> */}
   {/* Use the SearchBox Component */}
        {/* <SearchBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          featuredDestinations={featuredDestinations}
          popularSearches={popularSearches}
        /> */}
    {/* Featured Promotions - Inspired by Airbnb */}
        {/* <div className="translate-y-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group shadow-md">
            <div className="mr-3 bg-blue-500 text-white p-2 rounded">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-gray-800 text-sm font-semibold">Last Minute Deals</h4>
              <p className="text-gray-600 text-xs">Up to 40% off</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <div className="bg-green-50 hover:bg-green-100 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group shadow-md">
            <div className="mr-3 bg-green-500 text-white p-2 rounded">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-gray-800 text-sm font-semibold">Guided Tours</h4>
              <p className="text-gray-600 text-xs">Explore with experts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div> */}
        
        {/* Additional features for mobile - Only visible on mobile screens */}
        {/* <div className="md:hidden mt-20 space-y-4">
          <div className="bg-purple-50 hover:bg-purple-100 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group shadow-md">
            <div className="mr-3 bg-purple-500 text-white p-2 rounded">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-gray-800 text-sm font-semibold">Group Discounts</h4>
              <p className="text-gray-600 text-xs">Save when traveling together</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          
          <div className="bg-orange-50 hover:bg-orange-100 px-5 py-3 rounded-lg cursor-pointer transition duration-300 flex items-center group shadow-md">
            <div className="mr-3 bg-orange-500 text-white p-2 rounded">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-gray-800 text-sm font-semibold">Seasonal Specials</h4>
              <p className="text-gray-600 text-xs">Limited time offers</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div> */}
      {/* Destination Counter Stats - Only visible on mobile */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 md:hidden flex flex-col space-y-2 w-full max-w-xs px-4">
        <div className="bg-white shadow-md rounded-lg px-4 py-3 flex justify-between items-center">
          <div className="text-gray-800 font-medium">Destinations</div>
          <div className="text-xl font-bold text-orange-600">500+</div>
        </div>
        <div className="bg-white shadow-md rounded-lg px-4 py-3 flex justify-between items-center">
          <div className="text-gray-800 font-medium">Tours</div>
          <div className="text-xl font-bold text-orange-600">1200+</div>
        </div>
        <div className="bg-white shadow-md rounded-lg px-4 py-3 flex justify-between items-center">
          <div className="text-gray-800 font-medium">Happy Travelers</div>
          <div className="text-xl font-bold text-orange-600">15k+</div>
        </div> */}
      {/* </div> */}