
// import React, { useState, useEffect } from 'react';
// import { Loader2,Search, X, MapPin, Clock, Users, DollarSign, ChevronLeft, Star, CircleDollarSign, Mountain, Compass } from 'lucide-react';

// const tours = [
//   {
//     id: 1,
//     title: "Gulmarg Ski Adventure",
//     location: "Gulmarg",
//     description: "Experience world-class skiing in the Himalayas with professional instructors and stunning mountain views.",
//     price: 299,
//     duration: "2 days",
//     groupSize: 8,
//     image: "/api/placeholder/800/500",
//     rating: 4.8,
//     highlights: [
//       "Professional ski instruction",
//       "Equipment rental included",
//       "Stunning mountain views",
//       "Luxury accommodation"
//     ],
//     included: [
//       "Professional guide",
//       "Accommodation",
//       "Meals",
//       "Equipment",
//       "Transportation"
//     ]
//   },
 
// ];

// const TourCard = ({ tour, onClick }) => {
//   return (
//     <div 
//       className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
//     >
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
//         <img 
//           src={tour.image} 
//           alt={tour.title} 
//           className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
//           loading="lazy"
//         />
//         <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 z-20">
//           <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//           <span className="text-sm font-medium">{tour.rating}</span>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//           {tour.title}
//         </h3>
        
//         <div className="flex items-center gap-2 mt-3 text-gray-600">
//           <MapPin className="w-4 h-4" />
//           <span className="text-sm">{tour.location}</span>
//         </div>
        
//         <div className="mt-4 flex flex-wrap gap-4">
//           <div className="flex items-center gap-1 text-gray-600">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm">{tour.duration}</span>
//           </div>
//           <div className="flex items-center gap-1 text-gray-600">
//             <Users className="w-4 h-4" />
//             <span className="text-sm">Max {tour.groupSize}</span>
//           </div>
//           <div className="flex items-center gap-1 text-green-600 font-medium">
//             <CircleDollarSign className="w-4 h-4" />
//             <span className="text-sm">${tour.price}</span>
//           </div>
//         </div>
        
//         <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tour.description}</p>
        
//         <div className="mt-6 flex justify-end">
//           <button 
//             onClick={onClick}
//             className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:translate-x-2 transition-transform"
//           >
//             View Details
//             <ChevronLeft className="w-4 h-4 rotate-180" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TourDetailPage = ({ tour, onBack }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Tours
//         </button>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="relative h-96">
//             <img 
//               src={tour.image} 
//               alt={tour.title} 
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             <div className="absolute bottom-8 left-8 right-8">
//               <h1 className="text-4xl font-bold text-white mb-4">{tour.title}</h1>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center gap-2 text-white/90">
//                   <MapPin className="w-5 h-5" />
//                   <span>{tour.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-white/90">
//                   <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
//                   <span>{tour.rating} rating</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="md:col-span-2">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
//                 <p className="text-gray-600">{tour.description}</p>

//                 <div className="mt-8">
//                   <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
//                     <Mountain className="w-5 h-5 text-blue-600" />
//                     Tour Highlights
//                   </h3>
//                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {tour.highlights.map((highlight, index) => (
//                       <li key={index} className="flex items-center gap-3 text-gray-600">
//                         <Compass className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                         <span>{highlight}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-6">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Duration</span>
//                     <span className="font-medium">{tour.duration}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Group Size</span>
//                     <span className="font-medium">Max {tour.groupSize}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="text-gray-600">Price</span>
//                     <span className="font-bold text-green-600">${tour.price}</span>
//                   </div>
//                   <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4">
//                     Book Now
//                   </button>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="font-medium mb-3">What's Included:</h4>
//                   <ul className="space-y-2">
//                     {tour.included.map((item, index) => (
//                       <li key={index} className="flex items-center gap-2 text-gray-600">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Search
//         </button>

//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Tours in {location}</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tours.map(tour => (
//             <TourCard 
//               key={tour.id} 
//               tour={tour} 
//               onClick={() => onTourSelect(tour)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [destinations, setDestinations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filteredDestinations, setFilteredDestinations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [locationTours, setLocationTours] = useState([]);
//   const [selectedTour, setSelectedTour] = useState(null);

//   const fetchDestinations = async () => {
//     setIsLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const uniqueLocations = [...new Set(tours.map(tour => tour.location))];
//       const destinationsWithTours = uniqueLocations.map(location => ({
//         id: location,
//         name: location,
//         description: `Explore ${location}`,
//         price: `From $${Math.min(...tours.filter(t => t.location === location).map(t => t.price))}`
//       }));
//       setDestinations(destinationsWithTours);
//     } catch (error) {
//       console.error("Error fetching destinations:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDestinationSelect = (destination) => {
//     const toursForLocation = tours.filter(tour => tour.location === destination.name);
//     setLocationTours(toursForLocation);
//     setSelectedLocation(destination.name);
//     setSearchQuery("");
//   };

//   const handleTourSelect = (tour) => {
//     setSelectedTour(tour);
//   };

//   const handleBackToSearch = () => {
//     setSelectedLocation(null);
//     setLocationTours([]);
//     setSelectedTour(null);
//   };

//   const handleBackToTours = () => {
//     setSelectedTour(null);
//   };

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredDestinations([]);
//       return;
//     }

//     const filtered = destinations.filter(destination =>
//       destination.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredDestinations(filtered);
//   }, [searchQuery, destinations]);

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   if (selectedTour) {
//     return <TourDetailPage 
//       tour={selectedTour} 
//       onBack={handleBackToTours}
//     />;
//   }

//   if (selectedLocation) {
//     return <LocationToursPage 
//       location={selectedLocation} 
//       tours={locationTours} 
//       onBack={handleBackToSearch}
//       onTourSelect={handleTourSelect}
//     />;
//   }

//   return (
// //    
// <div className="w-full max-w-4xl mx-auto p-4 space-y-3 ">
//       {/* Search Container */}
//       <div className="relative flex items-center w-full bg-white rounded-xl shadow-lg">
//         {/* Location Icon */}
//         <div className="absolute left-4">
//           <MapPin className="text-red-500" size={20} />
//         </div>

//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Where do you want to go?"
//           className="w-full py-3 pl-12 pr-16 text-gray-700 placeholder-gray-400 text-base md:text-lg rounded-xl focus:outline-none"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         {/* Clear Button - Moved inside container for better positioning */}
//         {searchQuery && (
//           <button
//             onClick={() => setSearchQuery('')}
//             className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X size={20} />
//           </button>
//         )}

//         {/* Loading Spinner - Adjusted positioning */}
//         {isLoading && (
//           <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
//             <Loader2 className="animate-spin text-gray-400" size={20} />
//           </div>
//         )}

//         {/* Search Button */}
//         <button className="absolute right-0 h-full px-4 bg-red-500 hover:bg-red-600 text-white rounded-r-xl">
//           <Search size={20} />
//         </button>
//       </div>

//       {/* Top Destinations */}
//       <div className="px-1 text-sm md:text-base">
//         <span className="font-medium text-gray-800">Top Destinations: </span>
//         <span className="text-gray-500">
//           Shimla, Manali, Goa, Kashmir, Kerala, Jaipur, Singapore, Thailand, Malaysia
//         </span>
//       </div>

//       {/* Filtered Destinations - Fixed positioning and styling */}
//       {searchQuery && filteredDestinations.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-4 w-full">
//           <ul className="space-y-2">
//             {filteredDestinations.map((destination) => (
//               <li
//                 key={destination.id}
//                 className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all cursor-pointer"
//                 onClick={() => handleDestinationSelect(destination)}
//               >
//                 <div>
//                   <div className="text-gray-800 font-medium">{destination.name}</div>
//                   <div className="text-gray-500 text-sm">{destination.description}</div>
//                 </div>
//                 <div className="text-blue-600 font-semibold">{destination.price}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Loader2, Search, X, MapPin, Clock, Users, DollarSign, ChevronLeft, Star, CircleDollarSign, Mountain, Compass } from 'lucide-react';

// const TourCard = ({ tour, onClick }) => {
//   return (
//     <div 
//       className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
//     >
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
//         <img 
//           src={tour.image || "../images/Hero.jpg"} 
//           alt={tour.title} 
//           className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
//           loading="lazy"
//         />
//         <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 z-20">
//           <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//           <span className="text-sm font-medium">{tour.rating}</span>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//           {tour.title}
//         </h3>
        
//         <div className="flex items-center gap-2 mt-3 text-gray-600">
//           <MapPin className="w-4 h-4" />
//           <span className="text-sm">{tour.location}</span>
//         </div>
        
//         <div className="mt-4 flex flex-wrap gap-4">
//           <div className="flex items-center gap-1 text-gray-600">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm">{tour.duration}</span>
//           </div>
//           <div className="flex items-center gap-1 text-gray-600">
//             <Users className="w-4 h-4" />
//             <span className="text-sm">Max {tour.groupSize}</span>
//           </div>
//           <div className="flex items-center gap-1 text-green-600 font-medium">
//             <CircleDollarSign className="w-4 h-4" />
//             <span className="text-sm">${tour.price}</span>
//           </div>
//         </div>
        
//         <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tour.description}</p>
        
//         <div className="mt-6 flex justify-end">
//           <button 
//             onClick={onClick}
//             className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:translate-x-2 transition-transform"
//           >
//             View Details
//             <ChevronLeft className="w-4 h-4 rotate-180" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TourDetailPage = ({ tour, onBack }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Tours
//         </button>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="relative h-96">
//             <img 
//               src={tour.image || "/api/placeholder/800/500"} 
//               alt={tour.title} 
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             <div className="absolute bottom-8 left-8 right-8">
//               <h1 className="text-4xl font-bold text-white mb-4">{tour.title}</h1>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center gap-2 text-white/90">
//                   <MapPin className="w-5 h-5" />
//                   <span>{tour.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-white/90">
//                   <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
//                   <span>{tour.rating} rating</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="md:col-span-2">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
//                 <p className="text-gray-600">{tour.description}</p>

//                 <div className="mt-8">
//                   <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
//                     <Mountain className="w-5 h-5 text-blue-600" />
//                     Tour Highlights
//                   </h3>
//                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {tour.highlights?.map((highlight, index) => (
//                       <li key={index} className="flex items-center gap-3 text-gray-600">
//                         <Compass className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                         <span>{highlight}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-6">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Duration</span>
//                     <span className="font-medium">{tour.duration}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Group Size</span>
//                     <span className="font-medium">Max {tour.groupSize}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="text-gray-600">Price</span>
//                     <span className="font-bold text-green-600">${tour.price}</span>
//                   </div>
//                   <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4">
//                     Book Now
//                   </button>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="font-medium mb-3">What's Included:</h4>
//                   <ul className="space-y-2">
//                     {tour.included?.map((item, index) => (
//                       <li key={index} className="flex items-center gap-2 text-gray-600">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Search
//         </button>

//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Tours in {location}</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tours.map(tour => (
//             <TourCard 
//               key={tour.id} 
//               tour={tour} 
//               onClick={() => onTourSelect(tour)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [destinations, setDestinations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filteredDestinations, setFilteredDestinations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [locationTours, setLocationTours] = useState([]);
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchDestinations = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/tours');
//       setDestinations(response.data);
//     } catch (error) {
//       console.error("Error fetching destinations:", error);
//       setError("Failed to load destinations");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const fetchToursByLocation = async (location) => {
//   //   setIsLoading(true);
//   //   setError(null);
//   //   try {
//   //     const response = await axios.get(`http://localhost:5000/api/tours?location=${location}`);
//   //     setLocationTours(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching tours:", error);
//   //     setError("Failed to load tours");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const   fetchToursByLocation = async (title) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/tours?title=${title}`);
//       setLocationTours(response.data);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   const handleDestinationSelect = (destination) => {
//     fetchToursByLocation(destination.name);
//     setSelectedLocation(destination.name);
//     setSearchQuery("");
//   };

//   const handleTourSelect = async (tour) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/tours/${tour.id}`);
//       setSelectedTour(response.data);
//     } catch (error) {
//       console.error("Error fetching tour details:", error);
//       setSelectedTour(tour);
//     }
//   };

//   const handleBackToSearch = () => {
//     setSelectedLocation(null);
//     setLocationTours([]);
//     setSelectedTour(null);
//   };

//   const handleBackToTours = () => {
//     setSelectedTour(null);
//   };

//   // useEffect(() => {
//   //   if (searchQuery.trim() === "") {
//   //     setFilteredDestinations([]);
//   //     return;
//   //   }

//   //   const filtered = destinations.filter(destination =>
//   //     destination.name.toLowerCase().includes(searchQuery.toLowerCase())
//   //   );
//   //   setFilteredDestinations(filtered);
//   // }, [searchQuery, destinations]);

//   // useEffect(() => {
//   //   fetchDestinations();
//   // }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredDestinations([]);
//       return;
//     }
  
//     // Add null/undefined check
//     if (!destinations || !Array.isArray(destinations)) {
//       setFilteredDestinations([]);
//       return;
//     }
  
//     const filtered = destinations.filter(destination =>
//       destination.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredDestinations(filtered);
//   }, [searchQuery, destinations]);

//   useEffect(() => {
//       fetchDestinations();
//     }, []);

//   if (selectedTour) {
//     return <TourDetailPage 
//       tour={selectedTour} 
//       onBack={handleBackToTours}
//     />;
//   }

//   if (selectedLocation) {
//     return <LocationToursPage 
//       location={selectedLocation} 
//       tours={locationTours} 
//       onBack={handleBackToSearch}
//       onTourSelect={handleTourSelect}
//     />;
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 space-y-3">
//       <div className="relative flex items-center w-full bg-white rounded-xl shadow-lg">
//         <div className="absolute left-4">
//           <MapPin className="text-red-500" size={20} />
//         </div>

//         <input
//           type="text"
//           placeholder="Where do you want to go?"
//           className="w-full py-3 pl-12 pr-16 text-gray-700 placeholder-gray-400 text-base md:text-lg rounded-xl focus:outline-none"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         {searchQuery && (
//           <button
//             onClick={() => setSearchQuery('')}
//             className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X size={20} />
//           </button>
//         )}

//         {isLoading && (
//           <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
//             <Loader2 className="animate-spin text-gray-400" size={20} />
//           </div>
//         )}

//         <button className="absolute right-0 h-full px-4 bg-red-500 hover:bg-red-600 text-white rounded-r-xl">
//           <Search size={20} />
//         </button>
//       </div>

//       {error && (
//         <div className="text-red-500 text-center">
//           {error}
//         </div>
//       )}

//       <div className="px-1 text-sm md:text-base">
//         <span className="font-medium text-gray-800">Top Destinations: </span>
//         <span className="text-gray-500">
//           Shimla, Manali, Goa, Kashmir, Kerala, Jaipur, Singapore, Thailand, Malaysia
//         </span>
//       </div>

//       {searchQuery && filteredDestinations.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-4 w-full">
//           <ul className="space-y-2">
//             {filteredDestinations.map((destination) => (
//               <li
//                 key={destination.id}
//                 className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all cursor-pointer"
//                 onClick={() => handleDestinationSelect(destination)}
//               >
//                 <div>
//                   <div className="text-gray-800 font-medium">{destination.name}</div>
//                   <div className="text-gray-500 text-sm">{destination.description}</div>
//                 </div>
//                 <div className="text-blue-600 font-semibold">{destination.price}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Loader2, Search, X, MapPin, Clock, Users, DollarSign, ChevronLeft, Star, CircleDollarSign, Mountain, Compass } from 'lucide-react';
import axios from 'axios';

const TourCard = ({ tour, onClick }) => {
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          // src={tour.image || "../images/Hero/jpg"} 
          src={tour.image}
          // src={`http://localhost:5000${tour.image}`} 
          alt={tour.title} 
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 z-20">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{tour.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{tour.location}</span>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Max {tour.groupSize}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <CircleDollarSign className="w-4 h-4" />
            <span className="text-sm">${tour.price}</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tour.description}</p>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClick}
            className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:translate-x-2 transition-transform"
          >
            View Details
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TourDetailPage = ({ tour, onBack }) =>
   {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Tours
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img 
              src={tour.image} 
              // src={`http://localhost:5000${tour.image}`} 
              // src={`http://localhost:5000/uploads/${tour.image}`}

              alt={tour.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl font-bold text-white mb-4">{tour.title}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span>{tour.rating} rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
                <p className="text-gray-600">{tour.description}</p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Mountain className="w-5 h-5 text-blue-600" />
                    Tour Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <Compass className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-medium">Max {tour.groupSize}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600">Price</span>
                    <span className="font-bold text-green-600">${tour.price}</span>
                  </div>
                  <button onClick={() => handleBookNow(tour)} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4">
                    Book Now
                  </button>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const handleBookNow = async (tour) => {
  if (!tour) {
    alert("❌ Invalid tour selected. Please try again.");
    return;
  }

  const { title, price, description } = tour;
  if (!title || !price) {
    alert("❌ Missing tour information. Please check the destination data.");
    return;
  }

  // Fetch user token
  const token = localStorage.getItem('token');
  let userData = null;

  if (token) {
    try {
      const userRes = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      userData = userRes.data;
    } catch (error) {
      console.error('🚨 Error fetching user data:', error);
    }
  }

  // Ask for email if not found
  let userEmail = userData?.email?.trim() || prompt("Please enter your email for booking confirmation:");
  if (!userEmail) {
    alert("❌ Email is required for booking.");
    return;
  }

  const packageDetails = {
    id: `tour-${Date.now()}`,
    name: title,
    description: `Tour package for ${title}`,
  };

  // Payment Process
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
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
      const amountInPaise = Number(price) * 100; // Convert to paise

      const payload = {
        amount: amountInPaise,
        packageDetails,
        email: userEmail,
        name: userData?.username || 'Guest',
      };

      const orderResponse = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
        return;
      }

      const { order } = await orderResponse.json();
      if (!order?.id) {
        alert("Order creation failed. Please try again.");
        return;
      }

      const options = {
        key: "rzp_live_VQS2zWKwCIE5ON",
        amount: price * 100,
        currency: 'INR',
        name: "Your Travel Company",
        description: packageDetails.description,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: {
                  name: userData?.username || 'Guest',
                  email: userEmail,
                },
              }),
            });

            const data = await verifyResponse.json();
            if (data.success) {
              alert('🎉 Booking successful!');
            } else {
              alert('❌ Payment verification failed');
            }
          } catch (error) {
            alert('❌ Payment verification failed');
          }
        },
        prefill: {
          name: userData?.username || 'Guest',
          email: userEmail,
        },
        theme: { color: '#3399cc' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('❌ Payment initiation failed');
    }
  };

  initiatePayment();
};

const LocationToursPage = ({ location, tours, onBack, onTourSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Search
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tours in {location}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map(tour => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onClick={() => onTourSelect(tour)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationTours, setLocationTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tours, setTours] = useState([]); // State to store fetched tours

  // Fetch tours from the backend
  // const fetchTours = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:5000/api/tours');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch tours');
  //     }
  //     const data = await response.json();
  //     setTours(data);
  //   } catch (error) {
  //     console.error("Error fetching tours:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch both APIs in parallel
      const [toursResponse, destinationsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/Grid'),
        fetch('http://localhost:5000/api/tours')
      ]);
  
      // Check for errors
      if (!toursResponse.ok || !destinationsResponse.ok) {
        throw new Error('Failed to fetch data');
      }
  
      // Parse JSON responses
      const [toursData, destinationsData] = await Promise.all([
        toursResponse.json(),
        destinationsResponse.json()
      ]);
  
      // Store data in state
      setTours(toursData);
      setDestinations(destinationsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Fetch destinations based on tours
  const fetchDestinations = async () => {
    setIsLoading(true);
    try {
      const uniqueLocations = [...new Set(tours.map(tour => tour.location))];
      const destinationsWithTours = uniqueLocations.map(location => ({
        id: location,
        name: location,
        description: `Explore ${location}`,
        price: `From $${Math.min(...tours.filter(t => t.location === location).map(t => t.price))}`
      }));
      setDestinations(destinationsWithTours);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    const toursForLocation = tours.filter(tour => tour.location === destination.name);
    setLocationTours(toursForLocation);
    setSelectedLocation(destination.name);
    setSearchQuery("");
  };

  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
  };

  const handleBackToSearch = () => {
    setSelectedLocation(null);
    setLocationTours([]);
    setSelectedTour(null);
  };

  const handleBackToTours = () => {
    setSelectedTour(null);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDestinations([]);
      return;
    }

    // const filtered = destinations.filter(destination =>
    //   destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const filtered = (destinations || [])
  .filter(destination => destination?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()));

    setFilteredDestinations(filtered);
  }, [searchQuery, destinations]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tours.length > 0) {
      fetchDestinations();
    }
  }, [tours]);

  if (selectedTour) {
    return <TourDetailPage 
      tour={selectedTour} 
      onBack={handleBackToTours}
    />;
  }

  if (selectedLocation) {
    return <LocationToursPage 
      location={selectedLocation} 
      tours={locationTours} 
      onBack={handleBackToSearch}
      onTourSelect={handleTourSelect}
    />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-3 ">
      {/* Search Container */}
      <div className="relative flex items-center w-full bg-white rounded-xl shadow-lg">
        {/* Location Icon */}
        <div className="absolute left-4">
          <MapPin className="text-red-500" size={20} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="w-full py-3 pl-12 pr-16 text-gray-700 placeholder-gray-400 text-base md:text-lg rounded-xl focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
            <Loader2 className="animate-spin text-gray-400" size={20} />
          </div>
        )}

        {/* Search Button */}
        <button className="absolute right-0 h-full px-4 bg-red-500 hover:bg-red-600 text-white rounded-r-xl">
          <Search size={20} />
        </button>
      </div>

      {/* Top Destinations */}
      <div className="px-1 text-sm md:text-base">
        <span className="font-medium text-gray-800">Top Destinations: </span>
        <span className="text-gray-500">
          Shimla, Manali, Goa, Kashmir, Kerala, Jaipur, Singapore, Thailand, Malaysia
        </span>
      </div>

      {/* Filtered Destinations */}
      {searchQuery && filteredDestinations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 w-full">
          <ul className="space-y-2">
            {filteredDestinations.map((destination) => (
              <li
                key={destination.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all cursor-pointer"
                onClick={() => handleDestinationSelect(destination)}
              >
                <div>
                  <div className="text-gray-800 font-medium">{destination.name}</div>
                  <div className="text-gray-500 text-sm">{destination.description}</div>
                </div>
                <div className="text-blue-600 font-semibold">{destination.price}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SearchBar