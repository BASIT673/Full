// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const categories = [
//     { 
//       title: "Popular Destinations", 
//       icon: <MapPin size={24} className="text-white" />,
//       color: "bg-blue-600",
//       options: featuredDestinations.slice(0, 5)
//     },
//     { 
//       title: "Seasonal Experiences", 
//       icon: <Calendar size={24} className="text-white" />,
//       color: "bg-emerald-600",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" }
//       ]
//     },
//     { 
//       title: "Group Size", 
//       icon: <Users size={24} className="text-white" />,
//       color: "bg-amber-600",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" }
//       ]
//     },
//     { 
//       title: "Activities", 
//       icon: <Mountain size={24} className="text-white" />,
//       color: "bg-purple-600",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" }
//       ]
//     }
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   const handleCategorySelect = (option) => {
//     // Handle navigation to the selected category page
//     console.log(`Navigating to ${option.slug}`);
//     // You would add your navigation logic here
//     // e.g., router.push(`/tours/${option.slug}`);
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Discover Kashmir</h2>
//         <div className="flex items-center space-x-2">
//           <button 
//             onClick={prevCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Previous category"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button 
//             onClick={nextCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Next category"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-3">
//           <div className={`p-2 rounded-full ${currentCategory.color}`}>
//             {currentCategory.icon}
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700">{currentCategory.title}</h3>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {currentCategory.options.map((option, idx) => (
//             <button 
//               key={idx}
//               onClick={() => handleCategorySelect(option)}
//               className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-left"
//             >
//               <span className="font-medium text-gray-800">{option.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
      
//       <div className="flex justify-center">
//         <div className="flex space-x-2">
//           {categories.map((_, idx) => (
//             <button 
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`w-2 h-2 rounded-full ${idx === currentIndex ? currentCategory.color : 'bg-gray-300'}`}
//               aria-label={`Go to category ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;





// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';
// // import { useRouter } from 'next/router'; // Assuming you're using Next.js

// const VisualCategoryCarousel = ({ featuredDestinations }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter(); // For navigation
  
//   const categories = [
//     { 
//       title: "Popular Destinations", 
//       icon: <MapPin size={24} className="text-white" />,
//       color: "bg-blue-600",
//       options: featuredDestinations.slice(0, 5)
//     },
//     { 
//       title: "Seasonal Experiences", 
//       icon: <Calendar size={24} className="text-white" />,
//       color: "bg-emerald-600",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" }
//       ]
//     },
//     { 
//       title: "Group Size", 
//       icon: <Users size={24} className="text-white" />,
//       color: "bg-amber-600",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" }
//       ]
//     },
//     { 
//       title: "Activities", 
//       icon: <Mountain size={24} className="text-white" />,
//       color: "bg-purple-600",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" }
//       ]
//     }
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   const handleCategorySelect = (option, categoryIndex) => {
//     // Get the current category type
//     const categoryType = getCategoryType(categoryIndex);
    
//     // Navigate to the appropriate page based on category type and selection
//     switch(categoryType) {
//       case 'destinations':
//         router.push(`/destination/${option.slug}`);
//         break;
//       case 'seasonal':
//         router.push(`/tours/seasonal/${option.slug}`);
//         break;
//       case 'group-size':
//         router.push(`/tours/group/${option.slug}`);
//         break;
//       case 'activities':
//         router.push(`/activities/${option.slug}`);
//         break;
//       default:
//         router.push(`/search?q=${encodeURIComponent(option.name)}`);
//     }
//   };
  
//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Discover Kashmir</h2>
//         <div className="flex items-center space-x-2">
//           <button 
//             onClick={prevCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Previous category"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button 
//             onClick={nextCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Next category"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-3">
//           <div className={`p-2 rounded-full ${currentCategory.color}`}>
//             {currentCategory.icon}
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700">{currentCategory.title}</h3>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {currentCategory.options.map((option, idx) => (
//             <button 
//               key={idx}
//               onClick={() => handleCategorySelect(option, currentIndex)}
//               className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-left"
//             >
//               <span className="font-medium text-gray-800">{option.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
      
//       <div className="flex justify-center">
//         <div className="flex space-x-2">
//           {categories.map((_, idx) => (
//             <button 
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`w-2 h-2 rounded-full ${idx === currentIndex ? currentCategory.color : 'bg-gray-300'}`}
//               aria-label={`Go to category ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "Popular Destinations",
//       icon: <MapPin size={24} className="text-white" />,
//       color: "bg-blue-600",
//       options: featuredDestinations.slice(0, 5),
//     },
//     {
//       title: "Seasonal Experiences",
//       icon: <Calendar size={24} className="text-white" />,
//       color: "bg-emerald-600",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" },
//       ],
//     },
//     {
//       title: "Group Size",
//       icon: <Users size={24} className="text-white" />,
//       color: "bg-amber-600",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" },
//       ],
//     },
//     {
//       title: "Activities",
//       icon: <Mountain size={24} className="text-white" />,
//       color: "bg-purple-600",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" },
//       ],
//     },
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   const handleCategorySelect = (option, categoryIndex) => {
//     const categoryType = getCategoryType(categoryIndex);
//     switch (categoryType) {
//       case 'destinations':
//         navigate(`/destination/${option.slug}`);
//         break;
//       case 'seasonal':
//         navigate(`/tours/seasonal/${option.slug}`);
//         break;
//       case 'group-size':
//         navigate(`/tours/group/${option.slug}`);
//         break;
//       case 'activities':
//         navigate(`/activities/${option.slug}`);
//         break;
//       default:
//         navigate(`/search?q=${encodeURIComponent(option.name)}`);
//     }
//   };

//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Discover Kashmir</h2>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={prevCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Previous category"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextCategory}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//             aria-label="Next category"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-3">
//           <div className={`p-2 rounded-full ${currentCategory.color}`}>
//             {currentCategory.icon}
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700">{currentCategory.title}</h3>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {currentCategory.options.map((option, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleCategorySelect(option, currentIndex)}
//               className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-left"
//             >
//               <span className="font-medium text-gray-800">{option.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <div className="flex space-x-2">
//           {categories.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`w-2 h-2 rounded-full ${idx === currentIndex ? currentCategory.color : 'bg-gray-300'}`}
//               aria-label={`Go to category ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain, Search } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showQueryForm, setShowQueryForm] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "Popular Destinations",
//       icon: <MapPin size={24} className="text-white" />,
//       color: "bg-blue-600",
//       options: featuredDestinations.slice(0, 5),
//     },
//     {
//       title: "Seasonal Experiences",
//       icon: <Calendar size={24} className="text-white" />,
//       color: "bg-emerald-600",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" },
//       ],
//     },
//     {
//       title: "Group Size",
//       icon: <Users size={24} className="text-white" />,
//       color: "bg-amber-600", // Keeping amber for the orange accent
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" },
//       ],
//     },
//     {
//       title: "Activities",
//       icon: <Mountain size={24} className="text-white" />,
//       color: "bg-purple-600",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" },
//       ],
//     },
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//     setShowQueryForm(false);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//     setShowQueryForm(false);
//   };

//   const handleCategorySelect = (option, categoryIndex) => {
//     setSelectedOption(option);
//     setShowQueryForm(true);
    
//     // Alternative direct navigation approach
//     // const categoryType = getCategoryType(categoryIndex);
//     // switch (categoryType) {
//     //   case 'destinations':
//     //     navigate(`/destination/${option.slug}`);
//     //     break;
//     //   case 'seasonal':
//     //     navigate(`/tours/seasonal/${option.slug}`);
//     //     break;
//     //   case 'group-size':
//     //     navigate(`/tours/group/${option.slug}`);
//     //     break;
//     //   case 'activities':
//     //     navigate(`/activities/${option.slug}`);
//     //     break;
//     //   default:
//     //     navigate(`/search?q=${encodeURIComponent(option.name)}`);
//     // }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const params = new URLSearchParams();
    
//     for (const [key, value] of formData.entries()) {
//       if (value) params.append(key, value);
//     }
    
//     params.append('category', getCategoryType(currentIndex));
//     params.append('option', selectedOption.slug);
    
//     navigate(`/search?${params.toString()}`);
//     setShowQueryForm(false);
//   };

//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Discover Kashmir</h2>
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={prevCategory}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             aria-label="Previous category"
//           >
//             <ChevronLeft size={20} className="text-gray-700" />
//           </button>
//           <button
//             onClick={nextCategory}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             aria-label="Next category"
//           >
//             <ChevronRight size={20} className="text-gray-700" />
//           </button>
//         </div>
//       </div>

//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-5">
//           <div className={`p-3 rounded-lg ${currentCategory.color} shadow-sm`}>
//             {currentCategory.icon}
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-700">{currentCategory.title}</h3>
//         </div>

//         {!showQueryForm ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {currentCategory.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleCategorySelect(option, currentIndex)}
//                 className="group p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 text-left border border-gray-100 hover:border-gray-200 hover:shadow-sm"
//               >
//                 <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">{option.name}</span>
//               </button>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fadeIn">
//             <div className="flex items-center justify-between mb-4">
//               <h4 className="text-lg font-medium text-gray-800">
//                 Customize your {selectedOption?.name} experience
//               </h4>
//               <button 
//                 onClick={() => setShowQueryForm(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//                     When are you planning to visit?
//                   </label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
//                     Duration (days)
//                   </label>
//                   <select
//                     id="duration"
//                     name="duration"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
//                   >
//                     <option value="">Select duration</option>
//                     <option value="1-3">1-3 days</option>
//                     <option value="4-7">4-7 days</option>
//                     <option value="8-14">8-14 days</option>
//                     <option value="15+">15+ days</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-1">
//                   Any specific preferences?
//                 </label>
//                 <textarea
//                   id="preferences"
//                   name="preferences"
//                   rows="3"
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
//                   placeholder="Tell us about your preferences..."
//                 ></textarea>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-medium transition-colors shadow-sm flex items-center gap-2"
//                 >
//                   <Search size={18} />
//                   Find Experiences
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center">
//         <div className="flex space-x-3">
//           {categories.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setCurrentIndex(idx);
//                 setShowQueryForm(false);
//               }}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 idx === currentIndex 
//                   ? `${currentCategory.color} transform scale-125` 
//                   : 'bg-gray-300'
//               }`}
//               aria-label={`Go to category ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations = [], onOptionSelect }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "Popular Destinations",
//       icon: <MapPin size={24} className="text-white" />,
//       color: "bg-blue-600",
//       hoverColor: "bg-blue-700",
//       lightColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       options: featuredDestinations.slice(0, 5),
//     },
//     {
//       title: "Seasonal Experiences",
//       icon: <Calendar size={24} className="text-white" />,
//       color: "bg-emerald-600",
//       hoverColor: "bg-emerald-700",
//       lightColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" },
//       ],
//     },
//     {
//       title: "Group Size",
//       icon: <Users size={24} className="text-white" />,
//       color: "bg-amber-600",
//       hoverColor: "bg-amber-700",
//       lightColor: "bg-amber-50",
//       borderColor: "border-amber-200",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" },
//       ],
//     },
//     {
//       title: "Activities",
//       icon: <Mountain size={24} className="text-white" />,
//       color: "bg-purple-600",
//       hoverColor: "bg-purple-700",
//       lightColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" },
//       ],
//     },
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   const handleCategorySelect = (option, categoryIndex) => {
//     const categoryType = getCategoryType(categoryIndex);
//     // Call the parent component's handler to open the query form
//     if (onOptionSelect) {
//       onOptionSelect(option, categoryType, categories[categoryIndex].title);
//     }
//   };

//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Background accent color */}
//       <div className={`h-2 w-full ${currentCategory.color}`}></div>
      
//       <div className="px-6 pt-6 pb-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-bold text-gray-800">Discover Kashmir</h2>
//             <p className="text-gray-500 mt-1">Find your perfect experience</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={prevCategory}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
//               aria-label="Previous category"
//             >
//               <ChevronLeft size={20} className="text-gray-700" />
//             </button>
//             <button
//               onClick={nextCategory}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
//               aria-label="Next category"
//             >
//               <ChevronRight size={20} className="text-gray-700" />
//             </button>
//           </div>
//         </div>

//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-5">
//             <div className={`p-3 rounded-lg ${currentCategory.color} shadow-sm transform transition-transform duration-300 hover:scale-105`}>
//               {currentCategory.icon}
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-800">{currentCategory.title}</h3>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {currentCategory.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleCategorySelect(option, currentIndex)}
//                 className={`group p-4 rounded-lg ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-300 text-left hover:shadow-md relative overflow-hidden`}
//               >
//                 <span className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors">
//                   {option.name}
//                 </span>
//                 <div className={`absolute bottom-0 left-0 w-0 h-1 ${currentCategory.color} group-hover:w-full transition-all duration-300`}></div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <div className="flex space-x-3">
//             {categories.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   idx === currentIndex 
//                     ? `${categories[idx].color} transform scale-110` 
//                     : 'bg-gray-200 hover:bg-gray-300'
//                 }`}
//                 aria-label={`Go to category ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations = [], onOptionSelect }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "Popular Destinations",
//       icon: <MapPin size={20} className="text-white" />,
//       color: "bg-blue-600",
//       hoverColor: "bg-blue-700",
//       lightColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       options: featuredDestinations.slice(0, 5),
//     },
//     {
//       title: "Seasonal Experiences",
//       icon: <Calendar size={20} className="text-white" />,
//       color: "bg-emerald-600",
//       hoverColor: "bg-emerald-700",
//       lightColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" },
//       ],
//     },
//     {
//       title: "Group Size",
//       icon: <Users size={20} className="text-white" />,
//       color: "bg-amber-600",
//       hoverColor: "bg-amber-700",
//       lightColor: "bg-amber-50",
//       borderColor: "border-amber-200",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" },
//       ],
//     },
//     {
//       title: "Activities",
//       icon: <Mountain size={20} className="text-white" />,
//       color: "bg-purple-600",
//       hoverColor: "bg-purple-700",
//       lightColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" },
//       ],
//     },
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   const handleCategorySelect = (option, categoryIndex) => {
//     const categoryType = getCategoryType(categoryIndex);
//     // Call the parent component's handler to open the query form
//     if (onOptionSelect) {
//       onOptionSelect(option, categoryType, categories[categoryIndex].title);
//     }
//   };

//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//       {/* Background accent color */}
//       <div className={`h-1 w-full ${currentCategory.color}`}></div>
      
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Discover Kashmir</h2>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={prevCategory}
//               className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               aria-label="Previous category"
//             >
//               <ChevronLeft size={16} className="text-gray-700" />
//             </button>
//             <button
//               onClick={nextCategory}
//               className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               aria-label="Next category"
//             >
//               <ChevronRight size={16} className="text-gray-700" />
//             </button>
//           </div>
//         </div>

//         <div className="mb-3">
//           <div className="flex items-center gap-2 mb-3">
//             <div className={`p-2 rounded-md ${currentCategory.color} shadow-sm`}>
//               {currentCategory.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700">{currentCategory.title}</h3>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {currentCategory.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleCategorySelect(option, currentIndex)}
//                 className={`group p-2 rounded-md ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-200 text-left hover:shadow-sm relative overflow-hidden`}
//               >
//                 <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-sm">
//                   {option.name}
//                 </span>
//                 <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${currentCategory.color} group-hover:w-full transition-all duration-200`}></div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <div className="flex space-x-2">
//             {categories.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                   idx === currentIndex 
//                     ? `${categories[idx].color}` 
//                     : 'bg-gray-200 hover:bg-gray-300'
//                 }`}
//                 aria-label={`Go to category ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

// const VisualCategoryCarousel = ({ featuredDestinations = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "Popular Destinations",
//       icon: <MapPin size={20} className="text-white" />,
//       color: "bg-blue-600",
//       hoverColor: "bg-blue-700",
//       lightColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       options: featuredDestinations.slice(0, 5),
//     },
//     {
//       title: "Seasonal Experiences",
//       icon: <Calendar size={20} className="text-white" />,
//       color: "bg-emerald-600",
//       hoverColor: "bg-emerald-700",
//       lightColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       options: [
//         { name: "Winter Wonderland", slug: "winter" },
//         { name: "Spring Blossoms", slug: "spring" },
//         { name: "Summer Adventures", slug: "summer" },
//         { name: "Autumn Colors", slug: "autumn" },
//       ],
//     },
//     {
//       title: "Group Size",
//       icon: <Users size={20} className="text-white" />,
//       color: "bg-amber-600",
//       hoverColor: "bg-amber-700",
//       lightColor: "bg-amber-50",
//       borderColor: "border-amber-200",
//       options: [
//         { name: "Solo Travelers", slug: "solo" },
//         { name: "Couples", slug: "couples" },
//         { name: "Families", slug: "families" },
//         { name: "Large Groups", slug: "groups" },
//       ],
//     },
//     {
//       title: "Activities",
//       icon: <Mountain size={20} className="text-white" />,
//       color: "bg-purple-600",
//       hoverColor: "bg-purple-700",
//       lightColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       options: [
//         { name: "Trekking", slug: "trekking" },
//         { name: "Cultural Tours", slug: "cultural" },
//         { name: "Houseboat Stays", slug: "houseboat" },
//         { name: "Photography", slug: "photography" },
//         { name: "Culinary Experiences", slug: "culinary" },
//       ],
//     },
//   ];

//   const nextCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
//   };

//   const prevCategory = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
//   };

//   // const handleCategorySelect = (option, categoryIndex) => {
//   //   const categoryType = getCategoryType(categoryIndex);
    
//   //   // Navigate to the query form page and pass data as state
//   //   navigate('/query-form', { 
//   //     state: { 
//   //       option, 
//   //       categoryType, 
//   //       categoryTitle: categories[categoryIndex].title 
//   //     } 
//   //   });
//   // };
 
//   const handleCategorySelect = () => {
//     navigate('/query-form'); // ✅ Navigate to the query form page
//   };

//   const getCategoryType = (index) => {
//     const types = ['destinations', 'seasonal', 'group-size', 'activities'];
//     return types[index];
//   };

//   const currentCategory = categories[currentIndex];

//   return (
//     <div className="relative w-full  max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//       {/* Background accent color */}
//       <div className={`h-1 w-full ${currentCategory.color}`}></div>
      
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Discover Kashmir</h2>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={prevCategory}
//               className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               aria-label="Previous category"
//             >
//               <ChevronLeft size={16} className="text-gray-700" />
//             </button>
//             <button
//               onClick={nextCategory}
//               className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               aria-label="Next category"
//             >
//               <ChevronRight size={16} className="text-gray-700" />
//             </button>
//           </div>
//         </div>

//         <div className="mb-3">
//           <div className="flex items-center gap-2 mb-3">
//             <div className={`p-2 rounded-md ${currentCategory.color} shadow-sm`}>
//               {currentCategory.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700">{currentCategory.title}</h3>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {currentCategory.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleCategorySelect(option, currentIndex)}
//                 // onClick={() => handleCategorySelect}
//                 className={`group p-2 rounded-md ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-200 text-left hover:shadow-sm relative overflow-hidden`}
//               >
//                 <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-sm">
//                   {option.name}
//                 </span>
//                 <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${currentCategory.color} group-hover:w-full transition-all duration-200`}></div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <div className="flex space-x-2">
//             {categories.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                   idx === currentIndex 
//                     ? `${categories[idx].color}` 
//                     : 'bg-gray-200 hover:bg-gray-300'
//                 }`}
//                 aria-label={`Go to category ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualCategoryCarousel;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Mountain } from 'lucide-react';

const VisualCategoryCarousel = ({ featuredDestinations = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const categories = [
    // {
    //   title: "Popular Destinations",
    //   icon: <MapPin size={20} className="text-white" />,
    //   color: "bg-blue-600",
    //   hoverColor: "bg-blue-700",
    //   lightColor: "bg-blue-50",
    //   borderColor: "border-blue-200",
    //   options: featuredDestinations.slice(0, 5).length > 0 
    //     ? featuredDestinations.slice(0, 5) 
    //     : [
    //         { name: "Srinagar", slug: "srinagar" },
    //         { name: "Gulmarg", slug: "gulmarg" },
    //         { name: "Pahalgam", slug: "pahalgam" },
    //         { name: "Sonmarg", slug: "sonmarg" },
    //         { name: "Dal Lake", slug: "dal-lake" },
    //       ],
    // },
    {
      title: "Popular Destinations",
      icon: <MapPin size={20} className="text-white" />, // Note: You might want to change this icon too
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      options: [
        { name: "Srinagar", slug: "srinagar" },
        { name: "Gulmarg", slug: "gulmarg" },
        { name: "Pahalgam", slug: "pahalgam" },
        { name: "Sonmarg", slug: "sonmarg" },
        { name: "Dal Lake", slug: "dal-lake" },
      ],
    },
    // {
    //   title: "Popular Destinations",
    //   icon: <Calendar size={20} className="text-white" />,
    //   color: "bg-emerald-600",
    //   hoverColor: "bg-emerald-700",
    //   lightColor: "bg-emerald-50",
    //   borderColor: "border-emerald-200",
    //    options: [
      
      
    //       { name: "Srinagar", slug: "srinagar" },
    //             { name: "Gulmarg", slug: "gulmarg" },
    //           { name: "Pahalgam", slug: "pahalgam" },
    //              { name: "Sonmarg", slug: "sonmarg" },
    //        { name: "Dal Lake", slug: "dal-lake" },
    //           ],
    // },
    {
      title: "Seasonal Experiences",
      icon: <Calendar size={20} className="text-white" />,
      color: "bg-emerald-600",
      hoverColor: "bg-emerald-700",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      options: [
        { name: "Snow Adventures ", slug: "winter-gulmarg" },
        { name: "Tulip Festival ", slug: "spring-tulip-festival" },
        { name: "Spring Blossoms", slug: "spring" },
       
        { name: "Golden Chinar Trails", slug: "autumn-pahalgam" },
      ],
    },
    
    {
      title: "Group Size",
      icon: <Users size={20} className="text-white" />,
      color: "bg-amber-600",
      hoverColor: "bg-amber-700", 
      lightColor: "bg-amber-50",
      borderColor: "border-amber-200",
      options: [
        { name: "Solo Travelers", slug: "solo" },
        { name: "Couples", slug: "couples" },
        { name: "Families", slug: "families" },
        { name: "Large Groups", slug: "groups" },
      ],
    },
   
    {
      title: "Trekking Adventures",
      icon: <Mountain size={20} className="text-white" />,
      color: "bg-green-600",
      hoverColor: "bg-green-700",
      lightColor: "bg-green-50",
      borderColor: "border-green-200",
      options: [
        { name: "Great Lakes Trek", slug: "great-lakes-trek" },
        { name: "Tarsar Marsar Trek", slug: "tarsar-marsar" },
        { name: "Kolahoi Glacier Trek", slug: "kolahoi-glacier" },
        { name: "Gulmarg Alpine Trek", slug: "gulmarg-alpine-trek" },
        { name: "Pahalgam Valley Trek", slug: "pahalgam-valley-trek" },
        { name: "Sonmarg Glacier Trek", slug: "sonmarg-glacier-trek" },
        // { name: "Yousmarg Meadow Trek", slug: "yousmarg-meadow-trek" },
      ],
    },
    
  ];

  const nextCategory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  // Simple navigation to the query form without passing context data
  // const handleCategorySelect = () => {
  //   navigate('/query-form');
  // };
  // const handleCategorySelect = (option) => {
  //   // Navigate to different query forms based on the current category
  //   const categoryType = currentCategory.type;
    
  //   switch(categoryType) {
  //     case 'Popular Destinations':
  //       navigate('/PopularDestinations', { state: { option } });
  //       break;
  //     case 'Trekking Adventures':
  //       navigate('/TrekkingAdventures', { state: { option } });
  //       break;
  //     case 'Seasonal Experiences':
  //       navigate('/SeasonalExperiences', { state: { option } });
  //       break;
  //     case 'Group Size':
  //       navigate('/PopularGroupDestinations', { state: { option } });
  //       break;
  //     default:
  //       navigate('/PopularDestinations', { state: { option } });
  //   }
  // };
  const handleCategorySelect = (option) => {
    // Use the category's title instead of a type property
    const categoryTitle = currentCategory.title;
    
    switch(categoryTitle) {
      case 'Popular Destinations':
        navigate('/PopularDestinations', { state: { option } });
        break;
      case 'Trekking Adventures':
        navigate('/TrekkingAdventures', { state: { option } });
        break;
      case 'Seasonal Experiences':
        navigate('/SeasonalExperiences', { state: { option } });
        break;
      case 'Group Size':
        navigate('/PopularGroupDestinations', { state: { option } });
        break;
      default:
        navigate('/PopularDestinations', { state: { option } });
    }
  };
  const currentCategory = categories[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md  overflow-hidden">
      {/* Background accent color */}
      <div className={`h-1 w-full ${currentCategory.color}`}></div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Discover Kashmir</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevCategory}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous category"
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </button>
            <button
              onClick={nextCategory}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next category"
            >
              <ChevronRight size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  {currentCategory.options.map((option, idx) => (
    <button
      key={idx}
      onClick={() => handleCategorySelect(option)}
      className={`group p-2 rounded-md ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-200 text-left hover:shadow-sm relative overflow-hidden`}
    >
      <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-sm">
        {option.name}
      </span>
      <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${currentCategory.color} group-hover:w-full transition-all duration-200`}></div>
    </button>
  ))}
</div>
        {/* <div className="mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-md ${currentCategory.color} shadow-sm`}>
              {currentCategory.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{currentCategory.title}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {currentCategory.options.map((option, idx) => (
              <button
                key={idx}
                onClick={handleCategorySelect}
                className={`group p-2 rounded-md ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-200 text-left hover:shadow-sm relative overflow-hidden`}
              >
                <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-sm">
                  {option.name}
                </span>
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${currentCategory.color} group-hover:w-full transition-all duration-200`}></div>
              </button>
            ))}
          </div>
        </div> */}
{/* {currentCategory.options.map((option, idx) => (
  <button
    key={idx}
    onClick={() => handleCategorySelect(option)}
    className={`group p-2 rounded-md ${currentCategory.lightColor} border ${currentCategory.borderColor} transition-all duration-200 text-left hover:shadow-sm relative overflow-hidden`}
  >
    <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-sm">
      {option.name}
    </span>
    <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${currentCategory.color} group-hover:w-full transition-all duration-200`}></div>
  </button>
))} */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex 
                    ? `${categories[idx].color}` 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to category ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualCategoryCarousel;