
// import React, { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Car, Fuel, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

// const carData = [
//   {
//     id: 1,
//     name: 'Luxury Sedan',
//     image: '/api/placeholder/400/250',
//     price: 120,
//     features: [
//       { icon: <Car />, text: 'Acceleration 0-60 in 5.2s' },
//       { icon: <Fuel />, text: '28 MPG City' },
//       { icon: <Users />, text: '5 Passenger Comfort' },
//       { icon: <Car />, text: 'Leather Interior' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Sports Coupe',
//     image: '/api/placeholder/400/250',
//     price: 180,
//     features: [
//       { icon: <Car />, text: 'Acceleration 0-60 in 3.8s' },
//       { icon: <Fuel />, text: '22 MPG City' },
//       { icon: <Users />, text: '2 Passenger' },
//       { icon: <Car />, text: 'Carbon Fiber Trim' }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Electric SUV',
//     image: '/api/placeholder/400/250',
//     price: 150,
//     features: [
//       { icon: <Car />, text: 'Acceleration 0-60 in 4.5s' },
//       { icon: <Fuel />, text: '300 Mile Range' },
//       { icon: <Users />, text: '7 Passenger Space' },
//       { icon: <Car />, text: 'Advanced Tech' }
//     ]
//   },
// //    {
// //     id: 4,
// //     name: 'Family Crossover',
// //     image: '/api/placeholder/400/250',
// //     price: 100,
// //     features: [
// //       { icon: <Car />, text: 'Acceleration 0-60 in 7.2s' },
// //       { icon: <Fuel />, text: '32 MPG Highway' },
// //       { icon: <Users />, text: '5 Passenger Comfort' },
// //       { icon: <Car />, text: 'Safety Features' }
// //     ]
// //   }
// ];

// const RentCARS = () => {
//   const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
//   const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCars = useMemo(() => {
//     return carData.filter(car => 
//       car.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const gridCars = filteredCars.slice(0, 3);
//   const sliderCars = filteredCars.slice(3);

//   const navigateMobileSlide = (direction) => {
//     setMobileSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === filteredCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? filteredCars.length - 1 : prev - 1;
//     });
//   };

//   const navigateDesktopSlide = (direction) => {
//     setDesktopSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === sliderCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? sliderCars.length - 1 : prev - 1;
//     });
//   };

//   const sliderVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <div   id='cars' className="w-full md:w-[85%] mx-auto p-4 bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-8">Rent CARS</h1>
      
//       {/* Search Bar */}
//       <div className="mb-6 flex items-center">
//         <div className="relative w-full">
//           <input 
//             type="text" 
//             placeholder="Search cars..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           {searchTerm && (
//             <X 
//               onClick={() => setSearchTerm('')}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
//             />
//           )}
//         </div>
//       </div>

//       {/* Desktop View - First 3 Cars */}
//       <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
//         {gridCars.map((car) => (
//           <motion.div 
//             key={car.id}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white shadow-lg rounded-xl overflow-hidden"
//           >
//             <img 
//               src={car.image} 
//               alt={car.name} 
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//               <div className="grid grid-cols-2 gap-2">
//                 {car.features.map((feature, index) => (
//                   <div key={index} className="flex items-center text-sm">
//                     {feature.icon}
//                     <span className="ml-2">{feature.text}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-lg font-bold">${car.price}/day</span>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Rent Now
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Desktop Animated Slider for Remaining Cars */}
//       {sliderCars.length > 0 && (
//         <div className="hidden md:block relative">
//           <div className="relative overflow-hidden">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={desktopSlideIndex}
//                 custom={desktopSlideIndex}
//                 variants={sliderVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//                 className="w-full"
//               >
//                 <motion.div 
//                   className="bg-white shadow-lg rounded-xl overflow-hidden max-w-lg mx-auto"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <img 
//                     src={sliderCars[desktopSlideIndex].image} 
//                     alt={sliderCars[desktopSlideIndex].name} 
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-4">
//                     <h2 className="text-2xl font-semibold mb-4">
//                       {sliderCars[desktopSlideIndex].name}
//                     </h2>
//                     <div className="grid grid-cols-2 gap-3">
//                       {sliderCars[desktopSlideIndex].features.map((feature, index) => (
//                         <div key={index} className="flex items-center text-sm">
//                           {feature.icon}
//                           <span className="ml-2">{feature.text}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="mt-6 flex justify-between items-center">
//                       <span className="text-xl font-bold">
//                         ${sliderCars[desktopSlideIndex].price}/day
//                       </span>
//                       <motion.button 
//                         whileHover={{ scale: 1.1 }}
//                         className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                       >
//                         Rent Now
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Desktop Slider Navigation */}
//             <button
//               onClick={() => navigateDesktopSlide('prev')}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-800" />
//             </button>
//             <button
//               onClick={() => navigateDesktopSlide('next')}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-800" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Mobile View */}
//       <div className="md:hidden relative overflow-hidden">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={mobileSlideIndex}
//             custom={mobileSlideIndex}
//             variants={sliderVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: "spring", stiffness: 300, damping: 30 },
//               opacity: { duration: 0.2 }
//             }}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(e, { offset, velocity }) => {
//               const swipe = swipePower(offset.x, velocity.x);

//               if (swipe < -swipeConfidenceThreshold) {
//                 navigateMobileSlide('next');
//               } else if (swipe > swipeConfidenceThreshold) {
//                 navigateMobileSlide('prev');
//               }
//             }}
//             className="w-full"
//           >
//             {filteredCars.length > 0 ? (
//               <motion.div 
//                 className="bg-white shadow-lg rounded-xl overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img 
//                   src={filteredCars[mobileSlideIndex].image} 
//                   alt={filteredCars[mobileSlideIndex].name} 
//                   className="w-full h-64 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-2xl font-semibold mb-4">
//                     {filteredCars[mobileSlideIndex].name}
//                   </h2>
//                   <div className="grid grid-cols-2 gap-3">
//                     {filteredCars[mobileSlideIndex].features.map((feature, index) => (
//                       <div key={index} className="flex items-center text-sm">
//                         {feature.icon}
//                         <span className="ml-2">{feature.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-6 flex justify-between items-center">
//                     <span className="text-xl font-bold">
//                       ${filteredCars[mobileSlideIndex].price}/day
//                     </span>
//                     <motion.button 
//                       whileHover={{ scale: 1.1 }}
//                       className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                     >
//                       Rent Now
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="text-center p-4 text-gray-500">
//                 No cars found
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {/* Mobile Navigation Arrows */}
//         <button
//           onClick={() => navigateMobileSlide('prev')}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-800" />
//         </button>
//         <button
//           onClick={() => navigateMobileSlide('next')}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-800" />
//         </button>
        
//         {/* Mobile Navigation Dots */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {filteredCars.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setMobileSlideIndex(index)}
//               className={`h-2 w-2 rounded-full ${
//                 mobileSlideIndex === index ? 'bg-blue-500' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentCARS;

// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Car, Fuel, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

// const carData = [
//     {
//       id: 1,
//       name: 'Luxury Sedan',
//       image: '/api/placeholder/400/250',
//       price: 120,
//       features: [
//         { icon: <Car />, text: 'Acceleration 0-60 in 5.2s' },
//         { icon: <Fuel />, text: '28 MPG City' },
//         { icon: <Users />, text: '5 Passenger Comfort' },
//         { icon: <Car />, text: 'Leather Interior' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Sports Coupe',
//       image: '/api/placeholder/400/250',
//       price: 180,
//       features: [
//         { icon: <Car />, text: 'Acceleration 0-60 in 3.8s' },
//         { icon: <Fuel />, text: '22 MPG City' },
//         { icon: <Users />, text: '2 Passenger' },
//         { icon: <Car />, text: 'Carbon Fiber Trim' }
//       ]
//     },]
// const RentCARS = () => {
//   const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
//   const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cars, setCars] = useState([]);

  
//   const filteredCars = useMemo(() => {
//     return cars.filter(car => 
//       car.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, cars]);

//   const gridCars = filteredCars.slice(0, 3);
//   const sliderCars = filteredCars.slice(3);

//   const navigateMobileSlide = (direction) => {
//     setMobileSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === filteredCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? filteredCars.length - 1 : prev - 1;
//     });
//   };

//   const navigateDesktopSlide = (direction) => {
//     setDesktopSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === sliderCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? sliderCars.length - 1 : prev - 1;
//     });
//   };

//   const sliderVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <div id='cars' className="w-full md:w-[85%] mx-auto p-4 bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-8">Rent CARS</h1>
      
//       {/* Search Bar */}
//       <div className="mb-6 flex items-center">
//         <div className="relative w-full">
//           <input 
//             type="text" 
//             placeholder="Search cars..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           {searchTerm && (
//             <X 
//               onClick={() => setSearchTerm('')}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
//             />
//           )}
//         </div>
//       </div>

//       {/* Desktop View - First 3 Cars */}
//       <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
//         {gridCars.map((car) => (
//           <motion.div 
//             key={car._id}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white shadow-lg rounded-xl overflow-hidden"
//           >
//             <img 
//               src={car.image} 
//               alt={car.name} 
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//               <div className="grid grid-cols-2 gap-2">
//                 {car.features.map((feature, index) => (
//                   <div key={index} className="flex items-center text-sm">
//                     {feature.icon}
//                     <span className="ml-2">{feature.text}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-lg font-bold">${car.price}/day</span>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Rent Now
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Desktop Animated Slider for Remaining Cars */}
//       {sliderCars.length > 0 && (
//         <div className="hidden md:block relative">
//           <div className="relative overflow-hidden">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={desktopSlideIndex}
//                 custom={desktopSlideIndex}
//                 variants={sliderVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//                 className="w-full"
//               >
//                 <motion.div 
//                   className="bg-white shadow-lg rounded-xl overflow-hidden max-w-lg mx-auto"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <img 
//                     src={sliderCars[desktopSlideIndex].image} 
//                     alt={sliderCars[desktopSlideIndex].name} 
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-4">
//                     <h2 className="text-2xl font-semibold mb-4">
//                       {sliderCars[desktopSlideIndex].name}
//                     </h2>
//                     <div className="grid grid-cols-2 gap-3">
//                       {sliderCars[desktopSlideIndex].features.map((feature, index) => (
//                         <div key={index} className="flex items-center text-sm">
//                           {feature.icon}
//                           <span className="ml-2">{feature.text}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="mt-6 flex justify-between items-center">
//                       <span className="text-xl font-bold">
//                         ${sliderCars[desktopSlideIndex].price}/day
//                       </span>
//                       <motion.button 
//                         whileHover={{ scale: 1.1 }}
//                         className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                       >
//                         Rent Now
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Desktop Slider Navigation */}
//             <button
//               onClick={() => navigateDesktopSlide('prev')}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-800" />
//             </button>
//             <button
//               onClick={() => navigateDesktopSlide('next')}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-800" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Mobile View */}
//       <div className="md:hidden relative overflow-hidden">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={mobileSlideIndex}
//             custom={mobileSlideIndex}
//             variants={sliderVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: "spring", stiffness: 300, damping: 30 },
//               opacity: { duration: 0.2 }
//             }}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(e, { offset, velocity }) => {
//               const swipe = swipePower(offset.x, velocity.x);

//               if (swipe < -swipeConfidenceThreshold) {
//                 navigateMobileSlide('next');
//               } else if (swipe > swipeConfidenceThreshold) {
//                 navigateMobileSlide('prev');
//               }
//             }}
//             className="w-full"
//           >
//             {filteredCars.length > 0 ? (
//               <motion.div 
//                 className="bg-white shadow-lg rounded-xl overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img 
//                   src={filteredCars[mobileSlideIndex].image} 
//                   alt={filteredCars[mobileSlideIndex].name} 
//                   className="w-full h-64 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-2xl font-semibold mb-4">
//                     {filteredCars[mobileSlideIndex].name}
//                   </h2>
//                   <div className="grid grid-cols-2 gap-3">
//                     {filteredCars[mobileSlideIndex].features.map((feature, index) => (
//                       <div key={index} className="flex items-center text-sm">
//                         {feature.icon}
//                         <span className="ml-2">{feature.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-6 flex justify-between items-center">
//                     <span className="text-xl font-bold">
//                       ${filteredCars[mobileSlideIndex].price}/day
//                     </span>
//                     <motion.button 
//                       whileHover={{ scale: 1.1 }}
//                       className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                     >
//                       Rent Now
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className="text-center p-4 text-gray-500">
//                 No cars found
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {/* Mobile Navigation Arrows */}
//         <button
//           onClick={() => navigateMobileSlide('prev')}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-800" />
//         </button>
//         <button
//           onClick={() => navigateMobileSlide('next')}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-800" />
//         </button>
        
//         {/* Mobile Navigation Dots */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {filteredCars.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setMobileSlideIndex(index)}
//               className={`h-2 w-2 rounded-full ${
//                 mobileSlideIndex === index ? 'bg-blue-500' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentCARS;

// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { Car, Fuel, Users, Settings } from 'lucide-react'
// import { 
//   Car, 
//   Fuel, 
//   Users, 
//   Search, 
//   X, 
//   ChevronLeft, 
//   ChevronRight,
//   Loader
// } from 'lucide-react';
// import axios from 'axios';
// // You can add this at the top of your file or in a separate config file
// const CONFIG = {
//   BACKEND_URL:   'http://localhost:5000/uploads/cars',
//   IMAGE_FALLBACK: '/images/Hero.jpg'  // Optional default fallback image
// };
// const featureIcons = [Car, Fuel, Users, Car];

// // Then update getImageUrl to use it:
// const getImageUrl = (imagePath) => {
//   if (!imagePath) return CONFIG.IMAGE_FALLBACK;
//   if (imagePath.startsWith('http')) return imagePath;
//   return `${CONFIG.BACKEND_URL}${imagePath}`;
// };
// const handleRentCar = async (car) => {
//   // if (!selectedCar) {
//   //   alert("❌ Invalid car selected. Please try again.");
//   //   return;
//   // }

//   // const title = selectedCar.name;
//   // const price = selectedCar.price;
//   // const description = `Rent ${selectedCar.name} for your trip`;

//   // console.log("✅ Final Car:", title);
//   // console.log("✅ Final Price:", price);
//   // console.log("✅ Description:", description);

//   // if (!title || !price) {
//   //   alert("❌ Missing car rental details. Please check the selection.");
//   //   return;
//   // }
//   if (!car) {
//     alert("❌ Invalid car selected. Please try again.");
//     return;
//   }

//   const title = car.name;  // Ensure correct car name
//   const price = car.price; // Ensure correct car price
//   const description = `Rent ${car.name} for your trip`;

//   console.log("✅ Final Car:", title);
//   console.log("✅ Final Price:", price);
//   console.log("✅ Description:", description);

//   if (!title || !price) {
//     alert("❌ Missing car information. Please check the selected car data.");
//     return;
//   }

//   // Fetch the user token
//   const token = localStorage.getItem("token");
//   console.log("🔵 Token Retrieved:", token);

//   let userData = null;

//   // Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data;
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error("🚨 Error fetching user data:", error);
//     }
//   }

//   // Ask for email if not found
//   let userEmail = userData?.email?.trim() || "";
//   if (!userEmail) {
//     console.warn("⚠️ No email found! Asking user...");
//     userEmail = prompt("Please enter your email for booking confirmation:");
//     if (!userEmail) {
//       alert("❌ Email is required for car rental.");
//       return;
//     }
//   }

//   console.log("✅ Final User Email:", userEmail);

//   // Car Rental Details
//   const rentalDetails = {
//     id: `car-${Date.now()}`,
//     name: title,
//     description,
//   };

//   console.log("Car Rental Details:", rentalDetails);

//   // Payment Process
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
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
//         alert("❌ Razorpay SDK failed to load");
//         return;
//       }

//       const amountInPaise = String(price).replace(",", "");

//       const payload = {
//         amount: amountInPaise,
//         rentalDetails,
//         email: userEmail,
//         name: userData?.username || "Guest",
//       };

//       console.log("✅ Corrected Request Payload:", payload);

//       const orderResponse = await fetch("http://localhost:5000/api/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
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
//         currency: "INR",
//         name: "Your Rental Company",
//         description: rentalDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch("http://localhost:5000/api/verify-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: {
//                   name: userData?.username || "Guest",
//                   email: userEmail,
//                 },
//               }),
//             });

//             console.log("✅ Sent Token in API Call:", token);

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert("🎉 Car rental successful!");
//             } else {
//               alert("❌ Payment verification failed");
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: {
//           name: userData?.username || "Guest",
//           email: userEmail,
//         },
//         theme: { color: "#3399cc" },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("🚨 Payment error:", error);
//       alert("❌ Payment initiation failed");
//     }
//   };

//   initiatePayment();
// };

// const RentCARS = () => {
//   const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
//   const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('http://localhost:5000/api/cars');
//       if (response.data) {
//         setCars(response.data);
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to fetch cars');
//       console.error('Error fetching cars:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredCars = useMemo(() => {
//     return cars.filter(car => 
//       car.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, cars]);

//   const gridCars = filteredCars.slice(0, 3);
//   const sliderCars = filteredCars.slice(3);

//   const navigateMobileSlide = (direction) => {
//     setMobileSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === filteredCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? filteredCars.length - 1 : prev - 1;
//     });
//   };

//   const navigateDesktopSlide = (direction) => {
//     setDesktopSlideIndex(prev => {
//       if (direction === 'next') {
//         return prev === sliderCars.length - 1 ? 0 : prev + 1;
//       }
//       return prev === 0 ? sliderCars.length - 1 : prev - 1;
//     });
//   };

//   const sliderVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   const LoadingState = () => (
//     <div className="flex items-center justify-center h-64">
//       <div className="flex flex-col items-center space-y-4">
//         <Loader className="w-8 h-8 animate-spin text-blue-500" />
//         <p className="text-gray-600">Loading cars...</p>
//       </div>
//     </div>
//   );

//   const ErrorState = () => (
//     <div className="flex items-center justify-center h-64">
//       <div className="text-center space-y-4">
//         <p className="text-red-500">{error}</p>
//         <button 
//           onClick={fetchCars}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const EmptyState = () => (
//     <div className="text-center p-8">
//       <p className="text-gray-500 text-lg">No cars found matching your search.</p>
//       {searchTerm && (
//         <button
//           onClick={() => setSearchTerm('')}
//           className="mt-4 text-blue-500 hover:text-blue-600"
//         >
//           Clear search
//         </button>
//       )}
//     </div>
//   );
  // const iconComponents = {
  //   0: Car,    // Assuming 0 maps to the Car icon
  //   1: Fuel,   // Assuming 1 maps to the Fuel icon
  //   2: Users,  // Assuming 2 maps to the Users icon
  //   3: Settings, // Assuming 3 maps to the Settings icon
  // };
//   const CarCard = ({ car, isSlider = false }) => (
//     <motion.div 
//       className={`bg-white shadow-lg rounded-xl overflow-hidden ${isSlider ? 'max-w-lg mx-auto' : ''}`}
//       whileHover={{ scale: 1.05 }}
//     >
//       <img 
//         // src={car.image} 
//         // src={car.image || "../images/Hero.jpg"}
//         src={getImageUrl(car.image)}
//         alt={car.name} 
//         className={`w-full object-cover ${isSlider ? 'h-64' : 'h-48'}`}
//       />
//       <div className="p-4">
//         <h2 className={`${isSlider ? 'text-2xl' : 'text-xl'} font-semibold mb-2`}>
//           {car.name}
//         </h2>
//         {/* <div className="grid grid-cols-2 gap-2">
//           {car.features.map((feature, index) => (
           
//             <div key={index} className="flex items-center text-sm">
//               {feature.icon}
//               <span className="ml-2">{feature.text}</span>
//             </div>
//               //             <div key={feature._id} className="flex items-center gap-2 text-sm text-gray-600">
//               // {featureIcons[feature.icon] ? React.createElement(featureIcons[feature.icon]) : "🔧"} 
//               // {feature.text}
//               // <div/>
//           ))}
//         </div> */}
//         <div className="grid grid-cols-2 gap-2">
//   {car.features.map((feature) => (
//     <div key={feature._id} className="flex items-center text-sm text-gray-600">
//       {featureIcons[feature.icon] ? React.createElement(featureIcons[feature.icon]) : "🔧"} 
//       <span className="ml-2">{feature.text}</span>
//     </div>
//   ))}
// </div>

//         <div className={`${isSlider ? 'mt-6' : 'mt-4'} flex justify-between items-center`}>
//           <span className={`${isSlider ? 'text-xl' : 'text-lg'} font-bold`}>
//             ${car.price}/day
//           </span>
//           <motion.button   onClick={() => handleRentCar(car)} 
//             whileHover={{ scale: 1.1 }}
//             className={`bg-blue-500 text-white rounded-md
//               ${isSlider ? 'px-6 py-3' : 'px-4 py-2'}`}
//           >
//             Rent Now
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
//   // w-full md:w-[85%]
//   return (
//     <div id='cars' className=" max-w-[95vw] mx-auto p-4 bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-8">Rent CARS</h1>
      
//       {/* Search Bar */}
//       <div className="mb-6 flex items-center">
//         <div className="relative w-full">
//           <input 
//             type="text" 
//             placeholder="Search cars..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           {searchTerm && (
//             <X 
//               onClick={() => setSearchTerm('')}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
//             />
//           )}
//         </div>
//       </div>

//       {loading ? (
//         <LoadingState />
//       ) : error ? (
//         <ErrorState />
//       ) : filteredCars.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <>
//           {/* Desktop View - First 3 Cars */}
//           <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
//             {gridCars.map((car) => (
//               <CarCard key={car._id} car={car} />
//             ))}
//           </div>

//           {/* Desktop Animated Slider for Remaining Cars */}
//           {sliderCars.length > 0 && (
//             <div className="hidden md:block relative">
//               <div className="relative overflow-hidden">
//                 <AnimatePresence initial={false}>
//                   <motion.div
//                     key={desktopSlideIndex}
//                     custom={desktopSlideIndex}
//                     variants={sliderVariants}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={{
//                       x: { type: "spring", stiffness: 300, damping: 30 },
//                       opacity: { duration: 0.2 }
//                     }}
//                     className="w-full"
//                   >
//                     <CarCard car={sliderCars[desktopSlideIndex]} isSlider={true} />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Desktop Slider Navigation */}
//                 <button
//                   onClick={() => navigateDesktopSlide('prev')}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//                 >
//                   <ChevronLeft className="w-6 h-6 text-gray-800" />
//                 </button>
//                 <button
//                   onClick={() => navigateDesktopSlide('next')}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//                 >
//                   <ChevronRight className="w-6 h-6 text-gray-800" />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Mobile View */}
//           <div className="md:hidden relative overflow-hidden">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={mobileSlideIndex}
//                 custom={mobileSlideIndex}
//                 variants={sliderVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);
//                   if (swipe < -swipeConfidenceThreshold) {
//                     navigateMobileSlide('next');
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     navigateMobileSlide('prev');
//                   }
//                 }}
//                 className="w-full"
//               >
//                 <CarCard car={filteredCars[mobileSlideIndex]} isSlider={true} />
//               </motion.div>
//             </AnimatePresence>

//             {/* Mobile Navigation */}
//             <button
//               onClick={() => navigateMobileSlide('prev')}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-800" />
//             </button>
//             <button
//               onClick={() => navigateMobileSlide('next')}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-800" />
//             </button>
            
//             {/* Mobile Navigation Dots */}
//             <div className="flex justify-center mt-4 space-x-2">
//               {filteredCars.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setMobileSlideIndex(index)}
//                   className={`h-2 w-2 rounded-full ${
//                     mobileSlideIndex === index ? 'bg-blue-500' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default RentCARS;
;






// import React, { useState, useEffect, useMemo, useRef } from 'react';

// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { Loader, Heart, Share2, ChevronDown, Info, Car, Fuel, Users, Settings, ChevronLeft, ChevronRight, Pause, Play, Filter, Star, MapPin } from 'lucide-react';

// const RentCARS = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayIntervalRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 500]);
//   const [selectedCarTypes, setSelectedCarTypes] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const autoplayInterval = 5000;

//   useEffect(() => {
//     fetchCars();
    
//     // Check for mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('http://localhost:5000/api/cars');
//       if (response.data) {
//         setCars(response.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch cars');
//       console.error('Error fetching cars:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const featureIcons = {
//     0: Car,
//     1: Fuel,
//     2: Users,
//     3: Settings,
//   };

//   const getImageUrl = (image) => {
//     return `http://localhost:5000/uploads/${image}`;
//   };

//   const handleRentCar = (car) => {
//     // Implement your rental logic here
//     console.log('Renting car:', car);
//     alert(`Renting ${car.name} - $${car.price}/day`);
//   };

//   const toggleFilter = () => {
//     setFilterOpen(!filterOpen);
//   };

//   const handleCarTypeToggle = (type) => {
//     if (selectedCarTypes.includes(type)) {
//       setSelectedCarTypes(selectedCarTypes.filter(t => t !== type));
//     } else {
//       setSelectedCarTypes([...selectedCarTypes, type]);
//     }
//   };

//   const filteredCars = useMemo(() => {
//     return cars.filter(car => {
//       // Search term filter
//       const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Price range filter
//       const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
//       // Car type filter - if no types selected, show all
//       const matchesType = selectedCarTypes.length === 0 || 
//                           (car.type && selectedCarTypes.includes(car.type));
      
//       return matchesSearch && matchesPrice && matchesType;
//     });
//   }, [searchTerm, cars, priceRange, selectedCarTypes]);

//   // Reset index when filtered cars change
//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [filteredCars]);

//   // Navigation functions
//   const handleNextCar = () => {
//     setCurrentIndex((prevIndex) => 
//       (prevIndex + 1) % filteredCars.length
//     );
//   };

//   const handlePreviousCar = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? filteredCars.length - 1 : prevIndex - 1
//     );
//   };

//   // Autoplay management
//   const startAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//     }
    
//     autoplayIntervalRef.current = setInterval(() => {
//       if (!isAutoplayPaused && filteredCars.length > 0) {
//         handleNextCar();
//       }
//     }, autoplayInterval);
//   };

//   const stopAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//     }
//   };

//   // Autoplay effect
//   useEffect(() => {
//     startAutoplay();
//     return () => stopAutoplay();
//   }, [isAutoplayPaused, filteredCars]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowRight') handleNextCar();
//       if (e.key === 'ArrowLeft') handlePreviousCar();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Toggle autoplay
//   const toggleAutoplay = () => {
//     setIsAutoplayPaused(prev => !prev);
//   };

//   // Compute visible cars for desktop
//   const visibleCars = useMemo(() => {
//     const visibleCards = isMobile ? 1 : 3;
//     return filteredCars.slice(currentIndex, currentIndex + visibleCards)
//       .concat(filteredCars.slice(0, Math.max(0, visibleCards - (filteredCars.length - currentIndex))));
//   }, [currentIndex, filteredCars, isMobile]);

//   // Slider variants
//   const sliderVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   const LoadingState = () => (
//     <div className="flex items-center justify-center h-64">
//       <div className="flex flex-col items-center space-y-4">
//         <Loader className="w-8 h-8 animate-spin text-orange-500" />
//         <p className="text-gray-600">Loading cars...</p>
//       </div>
//     </div>
//   );

//   const ErrorState = () => (
//     <div className="flex items-center justify-center h-64">
//       <div className="text-center space-y-4">
//         <p className="text-red-500">{error}</p>
//         <button 
//           onClick={fetchCars}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const EmptyState = () => (
//     <div className="text-center p-8">
//       <p className="text-gray-500 text-lg">No cars found matching your search.</p>
//       <div className="mt-4 flex flex-col items-center gap-2">
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm('')}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Clear search term
//           </button>
//         )}
//         {selectedCarTypes.length > 0 && (
//           <button
//             onClick={() => setSelectedCarTypes([])}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Clear car type filters
//           </button>
//         )}
//         {(priceRange[0] > 0 || priceRange[1] < 500) && (
//           <button
//             onClick={() => setPriceRange([0, 500])}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Reset price range
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   const CarCard = ({ car, isSlider = false }) => {
//     const [isLiked, setIsLiked] = useState(false);
//     const [showDetails, setShowDetails] = useState(false);

//     const cardVariants = {
//       hover: {
//         scale: 1.02,
//         transition: { duration: 0.3, ease: "easeOut" }
//       }
//     };

//     const detailsVariants = {
//       hidden: { height: 0, opacity: 0 },
//       visible: { 
//         height: "auto", 
//         opacity: 1,
//         transition: {
//           height: { type: "spring", stiffness: 100, damping: 20 },
//           opacity: { duration: 0.2 }
//         }
//       }
//     };

//     return (
//       <motion.div 
//         className={`bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl overflow-hidden ${
//           isSlider ? 'max-w-lg mx-auto' : ''
//         } border border-orange-100 hover:border-orange-200 transition-all duration-300`}
//         variants={cardVariants}
//         whileHover="hover"
//       >
//         <div className="relative group">
//           <motion.img 
//             // src={getImageUrl(car.image)}
//             src={car.image}
//             alt={car.name} 
//             className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           />
          
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
//           <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//             {car.type || "Sedan"}
//           </div>

//           <div className="absolute top-4 right-4 flex space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setIsLiked(!isLiked)}
//               className={`p-2 rounded-full backdrop-blur-sm ${
//                 isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
//             >
//               <Share2 className="w-5 h-5" />
//             </motion.button>
//           </div>

//           <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
//             ${car.price}/day
//           </div>

//           {car.location && (
//             <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
//               <MapPin className="w-3 h-3" />
//               {car.location}
//             </div>
//           )}
//         </div>

//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h2 className={`${
//                 isSlider ? 'text-2xl' : 'text-xl'
//               } font-bold text-gray-800`}>
//                 {car.name}
//               </h2>
//               <div className="flex items-center mt-1">
//                 <div className="flex items-center">
//                   <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
//                   <span className="ml-1 text-sm text-gray-600">
//                     {car.rating || "4.8"} 
//                     <span className="text-gray-400 ml-1">
//                       ({car.reviewCount || "24"} reviews)
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowDetails(!showDetails)}
//               className="text-orange-500 hover:text-orange-600"
//             >
//               <ChevronDown 
//                 className={`w-6 h-6 transform transition-transform duration-300 ${
//                   showDetails ? 'rotate-180' : ''
//                 }`}
//               />
//             </motion.button>
//           </div>

//           <AnimatePresence>
//             {showDetails && (
//               <motion.div
//                 key="details"
//                 variants={detailsVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 className="overflow-hidden"
//               >
//                 <div className="grid grid-cols-2 gap-3 mb-6">
//                   {car.features && car.features.map((feature) => (
//                     <motion.div 
//                       key={feature._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3"
//                     >
//                       <span className="text-orange-500">
//                         {featureIcons[feature.icon] 
//                           ? React.createElement(featureIcons[feature.icon], { className: 'w-4 h-4' }) 
//                           : "🔧"
//                         }
//                       </span>
//                       <span className="truncate">{feature.text}</span>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <div className="flex items-center justify-start space-x-2 text-sm text-gray-500 mb-6">
//                   <Info className="w-4 h-4" />
//                   <span>Available for immediate rental</span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.button
//             onClick={() => handleRentCar(car)}
//             whileHover={{ scale: 1.02, backgroundColor: '#EA580C' }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
//               shadow-lg shadow-orange-200 hover:shadow-orange-300
//               ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
//             `}
//           >
//             Rent Now
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   // Render loading, error, and empty states
//   if (loading) return <LoadingState />;
//   if (error) return <ErrorState />;
//   if (filteredCars.length === 0) return <EmptyState />;

//   const carTypes = [...new Set(cars.filter(car => car.type).map(car => car.type))];

//   return (
//     <div className="container mx-auto p-4 w-full max-w-7xl">
//       {/* Search and Filter */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4 items-center">
//           <div className="relative w-full md:w-2/3">
//             <input
//               type="text"
//               placeholder="Search cars..."
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
//                       max="500" 
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
//                       max="500" 
//                       value={priceRange[1]} 
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full accent-orange-500"
//                     />
//                     <span>${priceRange[1]}</span>
//                   </div>
//                 </div>
                
//                 {/* Car Types */}
//                 <div>
//                   <h3 className="font-medium text-gray-700 mb-2">Car Type</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {carTypes.map((type) => (
//                       <label key={type} className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={selectedCarTypes.includes(type)}
//                           onChange={() => handleCarTypeToggle(type)}
//                           className="rounded text-orange-500 focus:ring-orange-500"
//                         />
//                         <span className="text-gray-700">{type}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Desktop View - Grid Layout */}
//       {!isMobile && (
//         <div className="relative w-full">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {visibleCars.map((car, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <CarCard car={car} />
//               </motion.div>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
//             <button
//               onClick={handlePreviousCar}
//               className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//               aria-label="Previous Car"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//             </button>
//             <button
//               onClick={handleNextCar}
//               className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//               aria-label="Next Car"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Mobile View - Carousel */}
//       {isMobile && (
//         <div className="relative"
//           onMouseEnter={() => setIsAutoplayPaused(true)}
//           onMouseLeave={() => setIsAutoplayPaused(false)}
//         >
//           <AnimatePresence initial={false} custom={currentIndex}>
//             <motion.div
//               key={currentIndex}
//               variants={sliderVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               custom={currentIndex}
//             >
//               <CarCard car={filteredCars[currentIndex]} isSlider />
//             </motion.div>
//           </AnimatePresence>
          
//           {/* Mobile Controls */}
//           <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
//             <button
//               onClick={handlePreviousCar}
//               className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//               aria-label="Previous Car"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>
//             <button
//               onClick={handleNextCar}
//               className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//               aria-label="Next Car"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>

//           {/* Autoplay Toggle */}
//           <button
//             onClick={toggleAutoplay}
//             className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//             aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
//           >
//             {isAutoplayPaused ? (
//               <Play className="w-4 h-4 text-gray-700" />
//             ) : (
//               <Pause className="w-4 h-4 text-gray-700" />
//             )}
//           </button>
//         </div>
//       )}

//       {/* Navigation Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {filteredCars.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`
//               transition-all duration-300 
//               ${index === currentIndex 
//                 ? 'bg-orange-500 w-6 rounded-full' 
//                 : 'bg-gray-300 w-2 rounded-full'}
//               h-2
//             `}
//             aria-label={`Go to car ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RentCARS;
import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { Loader, Heart, Share2, ChevronDown, Info, Car, Fuel, Users, Settings, ChevronLeft, ChevronRight, Pause, Play, Filter, Star, MapPin } from 'lucide-react';

const RentCARS = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
const [selectedCar, setSelectedCar] = useState(null);
  const autoplayInterval = 5000;

  useEffect(() => {
    fetchCars();
    
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get('https://backend-1-7zwm.onrender.com/api/cars');
  
      if (response.data) {
        setCars(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // const fetchCars = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.get('http://localhost:5000/api/cars');
  //     if (response.data) {
  //       setCars(response.data);
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message || 'Failed to fetch cars');
  //     console.error('Error fetching cars:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const featureIcons = {
    0: Car,
    1: Fuel,
    2: Users,
    3: Settings,
  };

  // const getImageUrl = (image) => {
  //   return ` src={`https://backend-1-7zwm.onrender.com${featuredImage}`}/${image}`;
  // };

  // const handleRentCar = (car) => {
  //   // Implement your rental logic here
  //   console.log('Renting car:', car);
  //   alert(`Renting ${car.name} - $${car.price}/day`);
  // };

//   const handleRentCar = async (car) => {
//     if (!car) {
//       alert("❌ Invalid car selected. Please try again.");
//       return;
//     }
  
//     // Open the query form modal
//     setShowRentalForm(true);
//     setSelectedCar(car);
//   };
  
//   // Component for the Rental Query Form
//   const RentalQueryForm = ({ car, onSubmit, onClose }) => {
//     const [formData, setFormData] = useState({
//       startDate: new Date(),
//       endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
//       pickupLocation: "",
//       dropoffLocation: "",
//       driverName: "",
//       phoneNumber: "",
//       email: "",
//       additionalRequirements: "",
//     });
    
//     const [isLoading, setIsLoading] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(car.price);
    
//     // Calculate number of days between dates
//     const calculateDays = (start, end) => {
//       const diffTime = Math.abs(end - start);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return diffDays > 0 ? diffDays : 1;
//     };
    
//     // Calculate total price based on number of rental days
//     const calculatePrice = (startDate, endDate) => {
//       const days = calculateDays(startDate, endDate);
//       return car.price * days;
//     };
    
//     useEffect(() => {
//       // Update price whenever dates change
//       const newPrice = calculatePrice(formData.startDate, formData.endDate);
//       setTotalPrice(newPrice);
//     }, [formData.startDate, formData.endDate]);
    
//     // Handle input changes
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     // Handle date changes
//     const handleDateChange = (name, date) => {
//       setFormData(prev => ({ ...prev, [name]: date }));
//     };
    
//     // Handle form submission
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
      
//       try {
//         // Fetch user data if available
//         const token = localStorage.getItem("token");
//         let userData = null;
        
//         if (token) {
//           try {
//             console.log("🟢 Fetching user details...");
//             const userRes = await axios.get("http://localhost:5000/api/auth/me", {
//               headers: { Authorization: `Bearer ${token}` },
//             });
//             userData = userRes.data;
//             console.log("✅ User Data Retrieved:", userData);
            
//             // Pre-fill email if user is logged in and form email is empty
//             if (userData?.email && !formData.email) {
//               setFormData(prev => ({ ...prev, email: userData.email }));
//             }
//           } catch (error) {
//             console.error("🚨 Error fetching user data:", error);
//           }
//         }
        
//         // Use form email or fall back to user email or ask for email
//         let userEmail = formData.email?.trim() || userData?.email?.trim() || "";
//         if (!userEmail) {
//           console.warn("⚠️ No email found! Asking user...");
//           userEmail = prompt("Please enter your email for booking confirmation:");
//           if (!userEmail) {
//             alert("❌ Email is required for car rental.");
//             setIsLoading(false);
//             return;
//           }
//           setFormData(prev => ({ ...prev, email: userEmail }));
//         }
        
//         // Create rental details
//         const rentalDetails = {
//           id: `car-${Date.now()}`,
//           name: car.name,
//           description: `Rent ${car.name} for your trip from ${formData.startDate.toLocaleDateString()} to ${formData.endDate.toLocaleDateString()}`,
//           days: calculateDays(formData.startDate, formData.endDate),
//           pickupLocation: formData.pickupLocation,
//           dropoffLocation: formData.dropoffLocation,
//           totalPrice,
//           customerInfo: {
//             name: formData.driverName || userData?.username || "Guest",
//             phone: formData.phoneNumber,
//             email: userEmail,
//             additionalRequirements: formData.additionalRequirements
//           }
//         };
        
//         console.log("✅ Rental Details:", rentalDetails);
        
//         // Close the form and proceed to payment
//         onClose();
//         onSubmit(rentalDetails);
//       } catch (error) {
//         console.error("🚨 Form submission error:", error);
//         alert("❌ Form submission failed. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     
//     //   <div className="rental-form-overlay">
//     //     <div className="rental-form-container">
//     //       <div className="rental-form-header" style={{ backgroundColor: "#FF7A00", color: "white" }}>
//     //         <h2>Rent {car.name}</h2>
//     //         <button className="close-button" onClick={onClose}>×</button>
//     //       </div>
          
//     //       <form onSubmit={handleSubmit} className="rental-form">
//     //         <div className="form-row">
//     //           <div className="form-group">
//     //             <label>Pick-up Date</label>
//     //             <input 
//     //               type="date" 
//     //               value={formData.startDate.toISOString().split('T')[0]} 
//     //               onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
//     //               required 
//     //             />
//     //           </div>
//     //           <div className="form-group">
//     //             <label>Return Date</label>
//     //             <input 
//     //               type="date" 
//     //               value={formData.endDate.toISOString().split('T')[0]} 
//     //               onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
//     //               required 
//     //               min={formData.startDate.toISOString().split('T')[0]} 
//     //             />
//     //           </div>
//     //         </div>
            
//     //         <div className="form-row">
//     //           <div className="form-group">
//     //             <label>Pick-up Location</label>
//     //             <input 
//     //               type="text" 
//     //               name="pickupLocation" 
//     //               value={formData.pickupLocation} 
//     //               onChange={handleChange}
//     //               placeholder="Enter pick-up location" 
//     //               required 
//     //             />
//     //           </div>
//     //           <div className="form-group">
//     //             <label>Drop-off Location</label>
//     //             <input 
//     //               type="text" 
//     //               name="dropoffLocation" 
//     //               value={formData.dropoffLocation} 
//     //               onChange={handleChange}
//     //               placeholder="Enter drop-off location" 
//     //               required 
//     //             />
//     //           </div>
//     //         </div>
            
//     //         <div className="form-row">
//     //           <div className="form-group">
//     //             <label>Full Name</label>
//     //             <input 
//     //               type="text" 
//     //               name="driverName" 
//     //               value={formData.driverName} 
//     //               onChange={handleChange}
//     //               placeholder="Enter driver's full name" 
//     //               required 
//     //             />
//     //           </div>
//     //           <div className="form-group">
//     //             <label>Phone Number</label>
//     //             <input 
//     //               type="tel" 
//     //               name="phoneNumber" 
//     //               value={formData.phoneNumber} 
//     //               onChange={handleChange}
//     //               placeholder="Enter contact number" 
//     //               required 
//     //             />
//     //           </div>
//     //         </div>
            
//     //         <div className="form-row">
//     //           <div className="form-group full-width">
//     //             <label>Email Address</label>
//     //             <input 
//     //               type="email" 
//     //               name="email" 
//     //               value={formData.email} 
//     //               onChange={handleChange}
//     //               placeholder="Enter email for confirmation" 
//     //               required 
//     //             />
//     //           </div>
//     //         </div>
            
//     //         <div className="form-row">
//     //           <div className="form-group full-width">
//     //             <label>Additional Requirements</label>
//     //             <textarea 
//     //               name="additionalRequirements" 
//     //               value={formData.additionalRequirements} 
//     //               onChange={handleChange}
//     //               placeholder="Any special requests or requirements?" 
//     //               rows="3"
//     //             />
//     //           </div>
//     //         </div>
            
//     //         <div className="rental-summary" style={{ backgroundColor: "#FFF3E0", padding: "15px", borderRadius: "5px" }}>
//     //           <h3>Rental Summary</h3>
//     //           <p>Vehicle: <strong>{car.name}</strong></p>
//     //           <p>Duration: <strong>{calculateDays(formData.startDate, formData.endDate)} days</strong></p>
//     //           <p>Base Rate: <strong>₹{car.price}/day</strong></p>
//     //           <p className="total-price">Total Price: <strong>₹{totalPrice}</strong></p>
//     //         </div>
            
//     //         <div className="form-actions">
//     //           <button 
//     //             type="button" 
//     //             onClick={onClose} 
//     //             className="cancel-button"
//     //           >
//     //             Cancel
//     //           </button>
//     //           <button 
//     //             type="submit" 
//     //             className="submit-button" 
//     //             style={{ backgroundColor: "#FF7A00" }}
//     //             disabled={isLoading}
//     //           >
//     //             {isLoading ? "Processing..." : "Proceed to Payment"}
//     //           </button>
//     //         </div>
//     //       </form>
//     //     </div>
//     //   </div>
//     // );
//   // Component for the Rental Query Form
// const RentalQueryForm = ({ car, onSubmit, onClose }) => {
//   // ... [existing state and calculations remain the same] ...

//   // Complete JSX structure
//   return (
//     <div className="rental-form-overlay">
//       <div className="rental-form-container">
//         {/* Form Header */}
//         <div className="rental-form-header" style={{ backgroundColor: "#FF7A00", color: "white" }}>
//           <h2>Rent {car.name}</h2>
//           <button className="close-button" onClick={onClose} aria-label="Close form">×</button>
//         </div>

//         {/* Main Form Content */}
//         <form onSubmit={handleSubmit} className="rental-form">
//           {/* Date Selection Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="startDate">Pick-up Date</label>
//               <input
//                 id="startDate"
//                 type="date"
//                 value={formData.startDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="endDate">Return Date</label>
//               <input
//                 id="endDate"
//                 type="date"
//                 value={formData.endDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
//                 required
//                 min={formData.startDate.toISOString().split('T')[0]}
//               />
//             </div>
//           </div>

//           {/* Location Details Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="pickupLocation">Pick-up Location</label>
//               <input
//                 id="pickupLocation"
//                 type="text"
//                 name="pickupLocation"
//                 value={formData.pickupLocation}
//                 onChange={handleChange}
//                 placeholder="Enter pick-up location"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="dropoffLocation">Drop-off Location</label>
//               <input
//                 id="dropoffLocation"
//                 type="text"
//                 name="dropoffLocation"
//                 value={formData.dropoffLocation}
//                 onChange={handleChange}
//                 placeholder="Enter drop-off location"
//                 required
//               />
//             </div>
//           </div>

//           {/* Driver Information Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="driverName">Full Name</label>
//               <input
//                 id="driverName"
//                 type="text"
//                 name="driverName"
//                 value={formData.driverName}
//                 onChange={handleChange}
//                 placeholder="Enter driver's full name"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phoneNumber">Phone Number</label>
//               <input
//                 id="phoneNumber"
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Enter contact number"
//                 required
//                 pattern="[0-9]{10}"
//                 title="Please enter a 10-digit phone number"
//               />
//             </div>
//           </div>

//           {/* Email and Additional Info */}
//           <div className="form-row">
//             <div className="form-group full-width">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email for confirmation"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group full-width">
//               <label htmlFor="additionalRequirements">Additional Requirements</label>
//               <textarea
//                 id="additionalRequirements"
//                 name="additionalRequirements"
//                 value={formData.additionalRequirements}
//                 onChange={handleChange}
//                 placeholder="Any special requests or requirements?"
//                 rows="3"
//               />
//             </div>
//           </div>

//           {/* Price Summary Section */}
//           <div className="rental-summary">
//             <h3>Rental Summary</h3>
//             <div className="summary-item">
//               <span>Vehicle:</span>
//               <strong>{car.name}</strong>
//             </div>
//             <div className="summary-item">
//               <span>Duration:</span>
//               <strong>{calculateDays(formData.startDate, formData.endDate)} days</strong>
//             </div>
//             <div className="summary-item">
//               <span>Daily Rate:</span>
//               <strong>₹{car.price}/day</strong>
//             </div>
//             <div className="summary-total">
//               <span>Total Price:</span>
//               <strong>₹{totalPrice}</strong>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button
//               type="button"
//               onClick={onClose}
//               className="cancel-button"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="submit-button"
//               style={{ backgroundColor: "#FF7A00" }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="spinner"></span>
//                   Processing...
//                 </>
//               ) : (
//                 "Proceed to Payment"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//       <style jsx>{rentalFormStyles}</style>
//     </div>
//   );
// }
//   };
  
//   // Updated handleRentCar function to include the form and payment process
//   const processRentalPayment = async (rentalDetails) => {
//     try {
//       // Fetch the user token
//       const token = localStorage.getItem("token");
//       console.log("🔵 Token Retrieved:", token);
      
//       const userEmail = rentalDetails.customerInfo.email;
//       console.log("✅ Final User Email:", userEmail);
      
//       // Payment Process
//       const loadRazorpay = () => {
//         return new Promise((resolve) => {
//           const script = document.createElement("script");
//           script.src = "https://checkout.razorpay.com/v1/checkout.js";
//           script.onload = () => resolve(true);
//           script.onerror = () => {
//             console.error("❌ Razorpay SDK failed to load");
//             resolve(false);
//           };
//           document.body.appendChild(script);
//         });
//       };
      
//       const res = await loadRazorpay();
//       if (!res) {
//         alert("❌ Razorpay SDK failed to load");
//         return;
//       }
  
//       const amountInPaise = String(rentalDetails.totalPrice).replace(",", "");
  
//       const payload = {
//         amount: amountInPaise,
//         rentalDetails,
//         email: userEmail,
//         name: rentalDetails.customerInfo.name,
//       };
  
//       console.log("✅ Request Payload:", payload);
  
//       const orderResponse = await fetch("http://localhost:5000/api/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
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
//         amount: rentalDetails.totalPrice * 100,
//         currency: "INR",
//         name: "Your Rental Company",
//         description: rentalDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch("http://localhost:5000/api/verify-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: {
//                   name: rentalDetails.customerInfo.name,
//                   email: userEmail,
//                   phone: rentalDetails.customerInfo.phone,
//                   pickupLocation: rentalDetails.pickupLocation,
//                   dropoffLocation: rentalDetails.dropoffLocation,
//                   rentalDays: rentalDetails.days,
//                   startDate: rentalDetails.startDate,
//                   endDate: rentalDetails.endDate
//                 },
//               }),
//             });
  
//             console.log("✅ Sent Token in API Call:", token);
  
//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert("🎉 Car rental successful! Confirmation sent to your email.");
//             } else {
//               alert("❌ Payment verification failed");
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: {
//           name: rentalDetails.customerInfo.name,
//           email: userEmail,
//           contact: rentalDetails.customerInfo.phone
//         },
//         theme: { color: "#FF7A00" },
//       };
  
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("🚨 Payment error:", error);
//       alert("❌ Payment initiation failed");
//     }
//   };
  
//   // CSS for the rental form
//   const rentalFormStyles = `
//   .rental-form-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   }
  
//   .rental-form-container {
//     width: 100%;
//     max-width: 800px;
//     background-color: white;
//     border-radius: 8px;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//     overflow: hidden;
//   }
  
//   .rental-form-header {
//     padding: 20px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
  
//   .rental-form-header h2 {
//     margin: 0;
//     font-size: 20px;
//     font-weight: 600;
//   }
  
//   .close-button {
//     background: none;
//     border: none;
//     font-size: 24px;
//     color: white;
//     cursor: pointer;
//   }
  
//   .rental-form {
//     padding: 20px;
//   }
  
//   .form-row {
//     display: flex;
//     gap: 20px;
//     margin-bottom: 15px;
//   }
  
//   .form-group {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//   }

//     .form-group.full-width {
//     flex: 0 0 100%;
//     max-width: 100%;
//   }

//   .form-group label {
//     font-weight: 500;
//     margin-bottom: 8px;
//     color: #333;
//   }

//   .form-group input,
//   .form-group textarea,
//   .form-group select {
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     font-size: 14px;
//     transition: border-color 0.3s ease;
//   }

//   .form-group input:focus,
//   .form-group textarea:focus {
//     outline: none;
//     border-color: #FF7A00;
//     box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.1);
//   }

//   .form-group textarea {
//     resize: vertical;
//     min-height: 80px;
//   }

//   .rental-summary {
//     margin: 20px 0;
//     border: 1px solid #eee;
//   }

//   .rental-summary h3 {
//     margin-top: 0;
//     color: #FF7A00;
//     border-bottom: 1px solid #eee;
//     padding-bottom: 10px;
//   }

//   .total-price {
//     font-size: 18px;
//     color: #FF7A00;
//     margin: 10px 0;
//   }

//   .form-actions {
//     display: flex;
//     gap: 15px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }

//   .cancel-button,
//   .submit-button {
//     padding: 12px 25px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     font-weight: 500;
//     transition: all 0.3s ease;
//   }

//   .cancel-button {
//     background-color: #f0f0f0;
//     color: #333;
//   }

//   .cancel-button:hover {
//     background-color: #e0e0e0;
//   }

//   .submit-button {
//     color: white;
//   }

//   .submit-button:hover {
//     background-color: #FF6500;
//     transform: translateY(-1px);
//   }

//   @media (max-width: 768px) {
//     .rental-form-container {
//       width: 95%;
//       margin: 10px;
//     }

//     .form-row {
//       flex-direction: column;
//       gap: 15px;
//     }

//     .form-group {
//       width: 100%;
//     }

//     .form-actions {
//       flex-direction: column-reverse;
//     }

//     .cancel-button,
//     .submit-button {
//       width: 100%;
//       text-align: center;
//     }
//   }

//   @media (max-width: 480px) {
//     .rental-form-header h2 {
//       font-size: 18px;
//     }

//     .form-group input,
//     .form-group textarea {
//       font-size: 13px;
//     }
//   }
// `;
const handleRentCar = async (car) => {
  if (!car) {
    alert("❌ Invalid car selected. Please try again.");
    return;
  }

  // Open the query form modal
  setShowRentalForm(true);
  setSelectedCar(car);
};

// Component for the Rental Query Form
const RentalQueryForm = ({ car, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    pickupLocation: "",
    dropoffLocation: "",
    driverName: "",
    phoneNumber: "",
    email: "",
    additionalRequirements: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(car.price);
  
  // Calculate number of days between dates
  const calculateDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };
  
  // Calculate total price based on number of rental days
  const calculatePrice = (startDate, endDate) => {
    const days = calculateDays(startDate, endDate);
    return car.price * days;
  };
  
  useEffect(() => {
    // Update price whenever dates change
    const newPrice = calculatePrice(formData.startDate, formData.endDate);
    setTotalPrice(newPrice);
  }, [formData.startDate, formData.endDate]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle date changes
  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Fetch user data if available
      const token = localStorage.getItem("token");
      let userData = null;
      
      if (token) {
        try {
          console.log("🟢 Fetching user details...");
          const userRes = await axios.get("https://backend-1-7zwm.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          userData = userRes.data;
          console.log("✅ User Data Retrieved:", userData);
          
          // Pre-fill email if user is logged in and form email is empty
          if (userData?.email && !formData.email) {
            setFormData(prev => ({ ...prev, email: userData.email }));
          }
        } catch (error) {
          console.error("🚨 Error fetching user data:", error);
        }
      }
      
      // Use form email or fall back to user email or ask for email
      let userEmail = formData.email?.trim() || userData?.email?.trim() || "";
      if (!userEmail) {
        console.warn("⚠️ No email found! Asking user...");
        userEmail = prompt("Please enter your email for booking confirmation:");
        if (!userEmail) {
          alert("❌ Email is required for car rental.");
          setIsLoading(false);
          return;
        }
        setFormData(prev => ({ ...prev, email: userEmail }));
      }
      
      // Create rental details
      const rentalDetails = {
        id: `car-${Date.now()}`,
        name: car.name,
        description: `Rent ${car.name} for your trip from ${formData.startDate.toLocaleDateString()} to ${formData.endDate.toLocaleDateString()}`,
        days: calculateDays(formData.startDate, formData.endDate),
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        totalPrice,
        customerInfo: {
          name: formData.driverName || userData?.username || "Guest",
          phone: formData.phoneNumber,
          email: userEmail,
          additionalRequirements: formData.additionalRequirements
        }
      };
      
      console.log("✅ Rental Details:", rentalDetails);
      
      // Close the form and proceed to payment
      onClose();
      onSubmit(rentalDetails);
    } catch (error) {
      console.error("🚨 Form submission error:", error);
      alert("❌ Form submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Complete JSX structure
  return (
    <div className="rental-form-overlay">
      <div className="rental-form-container">
        {/* Form Header */}
        <div className="rental-form-header" style={{ backgroundColor: "#FF7A00", color: "white" }}>
          <h2>Rent {car.name}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close form">×</button>
        </div>

        {/* Main Form Content */}
        <form onSubmit={handleSubmit} className="rental-form">
          {/* Date Selection Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Pick-up Date</label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">Return Date</label>
              <input
                id="endDate"
                type="date"
                value={formData.endDate.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
                required
                min={formData.startDate.toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Location Details Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pickupLocation">Pick-up Location</label>
              <input
                id="pickupLocation"
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter pick-up location"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dropoffLocation">Drop-off Location</label>
              <input
                id="dropoffLocation"
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                placeholder="Enter drop-off location"
                required
              />
            </div>
          </div>

          {/* Driver Information Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="driverName">Full Name</label>
              <input
                id="driverName"
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Enter driver's full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
          </div>

          {/* Email and Additional Info */}
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email for confirmation"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="additionalRequirements">Additional Requirements</label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                placeholder="Any special requests or requirements?"
                rows="3"
              />
            </div>
          </div>

          {/* Price Summary Section */}
          <div className="rental-summary">
            <h3>Rental Summary</h3>
            <div className="summary-item">
              <span>Vehicle:</span>
              <strong>{car.name}</strong>
            </div>
            <div className="summary-item">
              <span>Duration:</span>
              <strong>{calculateDays(formData.startDate, formData.endDate)} days</strong>
            </div>
            <div className="summary-item">
              <span>Daily Rate:</span>
              <strong>₹{car.price}/day</strong>
            </div>
            <div className="summary-total">
              <span>Total Price:</span>
              <strong>₹{totalPrice}</strong>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              style={{ backgroundColor: "#FF7A00" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </form>
      </div>
      <style jsx>{rentalFormStyles}</style>
    </div>
  );
};

// Payment processing function
const processRentalPayment = async (rentalDetails) => {
  try {
    // Fetch the user token
    const token = localStorage.getItem("token");
    console.log("🔵 Token Retrieved:", token);
    
    const userEmail = rentalDetails.customerInfo.email;
    console.log("✅ Final User Email:", userEmail);
    
    // Payment Process
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => {
          console.error("❌ Razorpay SDK failed to load");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    
    const res = await loadRazorpay();
    if (!res) {
      alert("❌ Razorpay SDK failed to load");
      return;
    }

    const amountInPaise = String(rentalDetails.totalPrice).replace(",", "");

    const payload = {
      amount: amountInPaise,
      rentalDetails,
      email: userEmail,
      name: rentalDetails.customerInfo.name,
    };

    console.log("✅ Request Payload:", payload);

    const orderResponse = await fetch("https://backend-1-7zwm.onrender.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      amount: rentalDetails.totalPrice * 100,
      currency: "INR",
      name: "Your Rental Company",
      description: rentalDetails.description,
      order_id: order.id,
      handler: async function (response) {
        try {
          console.log("🟢 Payment Successful! Sending verification request...");
          const verifyResponse = await fetch("https://backend-1-7zwm.onrender.com/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerDetails: {
                name: rentalDetails.customerInfo.name,
                email: userEmail,
                phone: rentalDetails.customerInfo.phone,
                pickupLocation: rentalDetails.pickupLocation,
                dropoffLocation: rentalDetails.dropoffLocation,
                rentalDays: rentalDetails.days,
                startDate: rentalDetails.startDate,
                endDate: rentalDetails.endDate
              },
            }),
          });

          console.log("✅ Sent Token in API Call:", token);

          const data = await verifyResponse.json();
          if (data.success) {
            alert("🎉 Car rental successful! Confirmation sent to your email.");
          } else {
            alert("❌ Payment verification failed");
          }
        } catch (error) {
          console.error("🚨 Payment verification error:", error);
          alert("❌ Payment verification failed");
        }
      },
      prefill: {
        name: rentalDetails.customerInfo.name,
        email: userEmail,
        contact: rentalDetails.customerInfo.phone
      },
      theme: { color: "#FF7A00" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("🚨 Payment error:", error);
    alert("❌ Payment initiation failed");
  }
};

// CSS for the rental form
// const rentalFormStyles = `
// .rental-form-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }

// .rental-form-container {
//   width: 100%;
//   max-width: 800px;
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   overflow: hidden;
// }

// .rental-form-header {
//   padding: 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .rental-form-header h2 {
//   margin: 0;
//   font-size: 20px;
//   font-weight: 600;
// }

// .close-button {
//   background: none;
//   border: none;
//   font-size: 24px;
//   color: white;
//   cursor: pointer;
// }

// .rental-form {
//   padding: 20px;
// }

// .form-row {
//   display: flex;
//   gap: 20px;
//   margin-bottom: 15px;
// }

// .form-group {
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// }

// .form-group.full-width {
//   flex: 0 0 100%;
//   max-width: 100%;
// }

// .form-group label {
//   font-weight: 500;
//   margin-bottom: 8px;
//   color: #333;
// }

// .form-group input,
// .form-group textarea,
// .form-group select {
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 14px;
//   transition: border-color 0.3s ease;
// }

// .form-group input:focus,
// .form-group textarea:focus {
//   outline: none;
//   border-color: #FF7A00;
//   box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.1);
// }

// .form-group textarea {
//   resize: vertical;
//   min-height: 80px;
// }

// .rental-summary {
//   margin: 20px 0;
//   border: 1px solid #eee;
//   background-color: #FFF3E0;
//   padding: 15px;
//   border-radius: 5px;
// }

// .rental-summary h3 {
//   margin-top: 0;
//   color: #FF7A00;
//   border-bottom: 1px solid #eee;
//   padding-bottom: 10px;
// }

// .summary-item {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
// }

// .summary-total {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 10px;
//   padding-top: 10px;
//   border-top: 1px solid #eee;
//   font-size: 18px;
//   color: #FF7A00;
// }

// .form-actions {
//   display: flex;
//   gap: 15px;
//   justify-content: flex-end;
//   margin-top: 20px;
// }

// .cancel-button,
// .submit-button {
//   padding: 12px 25px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-weight: 500;
//   transition: all 0.3s ease;
// }

// .cancel-button {
//   background-color: #f0f0f0;
//   color: #333;
// }

// .cancel-button:hover {
//   background-color: #e0e0e0;
// }

// .submit-button {
//   color: white;
// }

// .submit-button:hover {
//   background-color: #FF6500;
//   transform: translateY(-1px);
// }

// .spinner {
//   display: inline-block;
//   width: 18px;
//   height: 18px;
//   border: 2px solid rgba(255, 255, 255, 0.3);
//   border-radius: 50%;
//   border-top-color: #fff;
//   animation: spin 1s ease-in-out infinite;
//   margin-right: 8px;
// }

// @keyframes spin {
//   to { transform: rotate(360deg); }
// }

// @media (max-width: 768px) {
//   .rental-form-container {
//     width: 95%;
//     margin: 10px;
//   }

//   .form-row {
//     flex-direction: column;
//     gap: 15px;
//   }

//   .form-group {
//     width: 100%;
//   }

//   .form-actions {
//     flex-direction: column-reverse;
//   }

//   .cancel-button,
//   .submit-button {
//     width: 100%;
//     text-align: center;
//   }
// }

// @media (max-width: 480px) {
//   .rental-form-header h2 {
//     font-size: 18px;
//   }

//   .form-group input,
//   .form-group textarea {
//     font-size: 13px;
//   }
// }
// `;
 const rentalFormStyles =`
  .rental-form-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto; /* Ensure scroll if content overflows */
}

.rental-form-container {
  width: 100%;
  max-width: 800px;
  max-height: 90vh; /* Limit max height for better fit */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rental-form-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0; /* Prevent header from shrinking */
}

.rental-form-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.rental-form {
  padding: 20px;
  overflow-y: auto; /* Enable scrolling for form content */
  flex-grow: 1; /* Allow the form to expand */
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: 0 0 100%;
  max-width: 100%;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.rental-summary {
  margin: 20px 0;
  border: 1px solid #eee;
  background-color: #FFF3E0;
  padding: 15px;
  border-radius: 5px;
}

.rental-summary h3 {
  margin-top: 0;
  color: #FF7A00;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 18px;
  color: #FF7A00;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
  flex-shrink: 0; /* Prevent actions from shrinking */
}

.cancel-button,
.submit-button {
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.submit-button {
  color: white;
}

.submit-button:hover {
  background-color: #FF6500;
  transform: translateY(-1px);
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .rental-form-container {
    width: 95%;
    margin: 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    width: 100%;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .rental-form-header h2 {
    font-size: 18px;
  }

  .form-group input,
  .form-group textarea {
    font-size: 13px;
  }
}`

// CSS styles remain the same as in your original code
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCarTypeToggle = (type) => {
    if (selectedCarTypes.includes(type)) {
      setSelectedCarTypes(selectedCarTypes.filter(t => t !== type));
    } else {
      setSelectedCarTypes([...selectedCarTypes, type]);
    }
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Search term filter
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price range filter
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      // Car type filter - if no types selected, show all
      const matchesType = selectedCarTypes.length === 0 || 
                          (car.type && selectedCarTypes.includes(car.type));
      
      return matchesSearch && matchesPrice && matchesType;
    });
  }, [searchTerm, cars, priceRange, selectedCarTypes]);

  // Reset index when filtered cars change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredCars]);

  // Navigation functions
  const handleNextCar = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % filteredCars.length
    );
  };

  const handlePreviousCar = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredCars.length - 1 : prevIndex - 1
    );
  };

  // Autoplay management
  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    
    autoplayIntervalRef.current = setInterval(() => {
      if (!isAutoplayPaused && filteredCars.length > 0) {
        handleNextCar();
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
  }, [isAutoplayPaused, filteredCars]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextCar();
      if (e.key === 'ArrowLeft') handlePreviousCar();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoplayPaused(prev => !prev);
  };

  // Fix for the duplication issue in desktop view
  const visibleCars = useMemo(() => {
    const visibleCards = isMobile ? 1 : 3;
    // Use slice with modulo to ensure we don't show duplicates
    const uniqueSlice = [];
    
    // Only add each car once based on its ID
    const addedIds = new Set();
    let count = 0;
    let index = currentIndex;
    
    while (count < visibleCards && filteredCars.length > 0) {
      const car = filteredCars[index % filteredCars.length];
      if (!addedIds.has(car._id || index)) {
        uniqueSlice.push(car);
        addedIds.add(car._id || index);
        count++;
      }
      index++;
      
      // Safety check to prevent infinite loop if we have fewer cars than visible cards
      if (uniqueSlice.length < visibleCards && index - currentIndex >= filteredCars.length) {
        break;
      }
    }
    
    return uniqueSlice;
  }, [currentIndex, filteredCars, isMobile]);

  const LoadingState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Loading cars...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchCars}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center p-8">
      <p className="text-gray-500 text-lg">No cars found matching your search.</p>
      <div className="mt-4 flex flex-col items-center gap-2">
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear search term
          </button>
        )}
        {selectedCarTypes.length > 0 && (
          <button
            onClick={() => setSelectedCarTypes([])}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear car type filters
          </button>
        )}
        {(priceRange[0] > 0 || priceRange[1] < 500) && (
          <button
            onClick={() => setPriceRange([0, 500])}
            className="text-orange-500 hover:text-orange-600"
          >
            Reset price range
          </button>
        )}
      </div>
    </div>
  );

  const CarCard = ({ car, isSlider = false }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    return (
      <div className={`bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl overflow-hidden ${
        isSlider ? 'max-w-lg mx-auto' : ''
      } border border-orange-100 hover:border-orange-200 transition-all duration-300`}>
        <div className="relative group">
          <img 
            // src={car.image}
            src={`https://backend-1-7zwm.onrender.com${car.image}}`}
            alt={car.name} 
            className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
          />
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {car.type || "Sedan"}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-sm ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
            ${car.price}/day
          </div>

          {car.location && (
            <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {car.location}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`${
                isSlider ? 'text-2xl' : 'text-xl'
              } font-bold text-gray-800`}>
                {car.name}
              </h2>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="ml-1 text-sm text-gray-600">
                    {car.rating || "4.8"} 
                    <span className="text-gray-400 ml-1">
                      ({car.reviewCount || "24"} reviews)
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-orange-500 hover:text-orange-600"
            >
              <ChevronDown 
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  showDetails ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {showDetails && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {car.features && car.features.map((feature) => (
                  <div 
                    key={feature._id}
                    className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3"
                  >
                    <span className="text-orange-500">
                      {featureIcons[feature.icon] 
                        ? React.createElement(featureIcons[feature.icon], { className: 'w-4 h-4' }) 
                        : "🔧"
                      }
                    </span>
                    <span className="truncate">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-start space-x-2 text-sm text-gray-500 mb-6">
                <Info className="w-4 h-4" />
                <span>Available for immediate rental</span>
              </div>
            </div>
          )}

          <button
            onClick={() => handleRentCar(car)}
            className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
              shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-orange-600
              ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
            `}
          >
            Rent Now
          </button>
        </div>
      </div>
    );
  };

  // Render loading, error, and empty states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (filteredCars.length === 0) return <EmptyState />;

  const carTypes = [...new Set(cars.filter(car => car.type).map(car => car.type))];

  return (
    // In your parent component's render/return section

    <div id='cars' className="container mx-auto p-4 w-full max-w-7xl">
      {/* Search and Filter */}
      {showRentalForm && selectedCar && (
  <RentalQueryForm 
    car={selectedCar} 
    onSubmit={processRentalPayment} 
    onClose={() => setShowRentalForm(false)} 
  />
)}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search cars..."
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
        {/* {showRentalForm && selectedCar && (
  <RentalQueryForm 
    car={selectedCar} 
    onSubmit={processRentalPayment} 
    onClose={() => setShowRentalForm(false)} 
  />
)} */}
        {/* Filters Panel */}
        {filterOpen && (
          <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
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
                    max="500" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-orange-500"
                  />
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Car Types */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Car Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {carTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCarTypes.includes(type)}
                        onChange={() => handleCarTypeToggle(type)}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop View - Grid Layout */}
      {!isMobile && (
        <div className="relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleCars.map((car, index) => (
              <div key={car._id || index}>
                <CarCard car={car} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
            <button
              onClick={handlePreviousCar}
              className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
              aria-label="Previous Car"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
            </button>
            <button
              onClick={handleNextCar}
              className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
              aria-label="Next Car"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile View - Carousel */}
      {isMobile && filteredCars.length > 0 && (
        <div className="relative"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          <div>
            <CarCard car={filteredCars[currentIndex]} isSlider />
          </div>
          
          {/* Mobile Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
            <button
              onClick={handlePreviousCar}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Previous Car"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNextCar}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Next Car"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Autoplay Toggle */}
          <button
            onClick={toggleAutoplay}
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
          >
            {isAutoplayPaused ? (
              <Play className="w-4 h-4 text-gray-700" />
            ) : (
              <Pause className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {filteredCars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              transition-all duration-300 
              ${index === currentIndex 
                ? 'bg-orange-500 w-6 rounded-full' 
                : 'bg-gray-300 w-2 rounded-full'}
              h-2
            `}
            aria-label={`Go to car ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RentCARS;