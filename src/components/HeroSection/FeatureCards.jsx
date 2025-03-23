// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const iconVariants = {
//     hover: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.8, ease: "easeInOut" }
//     }
//   };

//   if (isMobile) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.8 }}
//         className="flex md:hidden gap-8 mb-12"
//       >
//         {features.map(({ Icon, label }) => (
//           <motion.div
//             key={label}
//             className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//             whileHover="hover"
//             variants={iconVariants}
//           >
//             <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//               <Icon size={20} className="text-white" />
//             </div>
//             <span className="text-xs font-medium">{label}</span>
//           </motion.div>
//         ))}
//       </motion.div>
//     );
//   }

//   return (
//     <div className="hidden md:grid grid-cols-4 gap-6 w-full mb-16">
//       {features.map(({ Icon, label, description }) => (
//         <motion.div
//           key={label}
//           whileHover={{ y: -10 }}
//           className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300"
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="p-3 bg-white/10 rounded-full mb-4">
//               <Icon size={24} className="text-white" />
//             </div>
//             <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
//             <p className="text-white/80 text-sm">{description}</p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };
// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const iconVariants = {
//     hover: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.8, ease: "easeInOut" }
//     }
//   };

//   return (
//     <div>
//       {/* Mobile Design */}
//       {isMobile && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex md:hidden gap-8 mb-12 mt-10"
//         >
//           {features.map(({ Icon, label }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               variants={iconVariants}
//             >
//               <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//                 <Icon size={20} className="text-white" />
//               </div>
//               <span className="text-xs font-medium">{label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Desktop Design */}
//       {!isMobile && (
//         <div className="hidden md:flex gap-8 mb-12">
//           {features.map(({ Icon, label, description }) => (
//             <div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//             >
//               <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//                 <Icon size={40} className="text-white" />
//               </div>
//               <span className="text-lg font-medium">{label}</span>
//               <p className="text-sm">{description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const iconVariants = {
//     initial: {
//       scale: 1,
//       rotate: 0
//     },
//     clicked: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.8, ease: 'easeInOut' }
//     }
//   };

//   return (
//     <div>
//       {/* Mobile Design */}
//       {isMobile && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex md:hidden gap-8 mb-12 mt-8"
//         >
//           {features.map(({ Icon, label }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               initial="initial"
//               whileTap="clicked"
//               variants={iconVariants}
//             >
//               <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//                 <Icon size={20} className="text-white" />
//               </div>
//               <span className="text-xs font-medium">{label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Desktop Design */}
//       {!isMobile && (
//         <div className="hidden md:flex gap-8 mb-12">
//           {features.map(({ Icon, label, description }) => (
//             <div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//             >
//               <motion.div
//                 className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
//                 initial="initial"
//                 whileTap="clicked"
//                 variants={iconVariants}
//               >
//                 <Icon size={40} className="text-white" />
//               </motion.div>
//               <span className="text-lg font-medium">{label}</span>
//               <p className="text-sm">{description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const iconVariants = {
//     hover: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.8, ease: "easeInOut" }
//     }
//   };

//   return (
//     <div>
//       {/* Mobile Design */}
//       {isMobile && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex md:hidden gap-8 mb-12 mt-8"
//         >
//           {features.map(({ Icon, label }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               variants={iconVariants}
//             >
//               <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//                 <Icon size={20} className="text-white" />
//               </div>
//               <span className="text-xs font-medium">{label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Desktop Design */}
//       {!isMobile && (
//         <div className="hidden md:flex gap-8 mb-12">
//           {features.map(({ Icon, label, description }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               variants={iconVariants}
//             >
//               <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
//                 <Icon size={40} className="text-white" />
//               </div>
//               <span className="text-lg font-medium">{label}</span>
//               <p className="text-sm">{description}</p>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const iconVariants = {
//     hover: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.8, ease: "easeInOut" }
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.2 }
//     }
//   };

//   return (
//     <div>
//       {/* Mobile Design */}
//       {isMobile && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex md:hidden gap-8 mb-12 mt-8"
//         >
//           {features.map(({ Icon, label }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               whileTap="tap"
//               variants={iconVariants}
//             >
//               <motion.div
//                 className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
//                 whileHover="hover"
//                 whileTap="tap"
//                 variants={iconVariants}
//               >
//                 <Icon size={20} className="text-white" />
//               </motion.div>
//               <span className="text-xs font-medium">{label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Desktop Design */}
//       {!isMobile && (
//         <div className="hidden md:flex gap-8 mb-12">
//           {features.map(({ Icon, label, description }) => (
//             <motion.div
//               key={label}
//               className="flex flex-col items-center gap-2 text-white hover:text-red-500 cursor-pointer"
//               whileHover="hover"
//               whileTap="tap"
//               variants={iconVariants}
//             >
//               <motion.div
//                 className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
//                 whileHover="hover"
//                 whileTap="tap"
//                 variants={iconVariants}
//               >
//                 <Icon size={40} className="text-white" />
//               </motion.div>
//               <span className="text-lg font-medium">{label}</span>
//               <p className="text-sm">{description}</p>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// import { motion } from 'framer-motion';
// import { Compass, Map, Plane, Sun } from 'lucide-react';

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" }
// ];

// export const FeatureCards = ({ isMobile }) => {
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const iconContainerVariants = {
//     initial: { 
//       backgroundColor: "rgba(255, 255, 255, 0.1)",
//       scale: 1 
//     },
//     hover: {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//       scale: 1.1,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     }
//   };

//   const iconVariants = {
//     initial: { rotate: 0 },
//     hover: {
//       rotate: 360,
//       transition: {
//         duration: 1.2,
//         ease: "easeInOut",
//         repeat: Infinity,
//         repeatType: "loop"
//       }
//     },
//     tap: {
//       scale: 0.9,
//       transition: { duration: 0.2 }
//     }
//   };

//   const textVariants = {
//     initial: { y: 0 },
//     hover: {
//       y: -5,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Mobile Design */}
//       {isMobile && (
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="flex md:hidden gap-8 mb-12 mt-8"
//         >
//           {features.map(({ Icon, label }) => (
//             <motion.div
//               key={label}
//               variants={itemVariants}
//               className="flex flex-col items-center gap-2 cursor-pointer group"
//               whileHover="hover"
//               initial="initial"
//             >
//               <motion.div
//                 className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//                 variants={iconContainerVariants}
//               >
//                 <motion.div variants={iconVariants}>
//                   <Icon 
//                     size={20} 
//                     className="text-white group-hover:text-red-400 transition-colors duration-300" 
//                   />
//                 </motion.div>
//               </motion.div>
//               <motion.span 
//                 variants={textVariants}
//                 className="text-xs font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//               >
//                 {label}
//               </motion.span>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Desktop Design */}
//       {!isMobile && (
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="hidden md:flex gap-8 mb-12"
//         >
//           {features.map(({ Icon, label, description }) => (
//             <motion.div
//               key={label}
//               variants={itemVariants}
//               className="flex flex-col items-center gap-3 cursor-pointer group"
//               whileHover="hover"
//               initial="initial"
//             >
//               <motion.div
//                 className="p-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//                 variants={iconContainerVariants}
//               >
//                 <motion.div variants={iconVariants}>
//                   <Icon 
//                     size={40} 
//                     className="text-white group-hover:text-red-400 transition-colors duration-300" 
//                   />
//                 </motion.div>
//               </motion.div>
//               <motion.span 
//                 variants={textVariants}
//                 className="text-lg font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//               >
//                 {label}
//               </motion.span>
//               <motion.p 
//                 variants={textVariants}
//                 className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 text-center"
//               >
//                 {description}
//               </motion.p>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };
// import { motion } from "framer-motion";
// import { Compass, Map, Plane, Sun } from "lucide-react";

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" },
// ];

// // Variants for animations
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const iconContainerVariants = {
//   initial: { backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1 },
//   hover: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     scale: 1.1,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
// };

// const iconVariants = {
//   initial: { rotate: 0 },
//   hover: {
//     rotate: 360,
//     transition: {
//       duration: 1.2,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatType: "loop",
//     },
//   },
// };

// const textVariants = {
//   initial: { y: 0 },
//   hover: {
//     y: -5,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
// };

// // Mobile Design
// const MobileFeatureCards = () => (
//   <motion.div
//     variants={containerVariants}
//     initial="hidden"
//     animate="visible"
//     className="flex md:hidden gap-8 mb-12 mt-8"
//   >
//     {features.map(({ Icon, label }) => (
//       <motion.div
//         key={label}
//         variants={itemVariants}
//         className="flex flex-col items-center gap-2 cursor-pointer group"
//         whileHover="hover"
//         initial="initial"
//       >
//         <motion.div
//           className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//           variants={iconContainerVariants}
//         >
//           <motion.div variants={iconVariants}>
//             <Icon
//               size={20}
//               className="text-white group-hover:text-red-400 transition-colors duration-300"
//             />
//           </motion.div>
//         </motion.div>
//         <motion.span
//           variants={textVariants}
//           className="text-xs font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//         >
//           {label}
//         </motion.span>
//       </motion.div>
//     ))}
//   </motion.div>
// );

// // Desktop Design
// // const DesktopFeatureCards = () => (
// //   <motion.div
// //     variants={containerVariants}
// //     initial="hidden"
// //     animate="visible"
// //     className="hidden md:flex gap-8 mb-12"
// //   >
// //     {features.map(({ Icon, label, description }) => (
// //       <motion.div
// //         key={label}
// //         variants={itemVariants}
// //         className="flex flex-col items-center gap-3 cursor-pointer group"
// //         whileHover="hover"
// //         initial="initial"
// //       >
// //         <motion.div
// //           className="p-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
// //           variants={iconContainerVariants}
// //         >
// //           <motion.div variants={iconVariants}>
// //             <Icon
// //               size={40}
// //               className="text-white group-hover:text-red-400 transition-colors duration-300"
// //             />
// //           </motion.div>
// //         </motion.div>
// //         <motion.span
// //           variants={textVariants}
// //           className="text-lg font-medium text-white group-hover:text-red-400 transition-colors duration-300"
// //         >
// //           {label}
// //         </motion.span>
// //         <motion.p
// //           variants={textVariants}
// //           className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 text-center"
// //         >
// //           {description}
// //         </motion.p>
// //       </motion.div>
// //     ))}
// //   </motion.div>
// // );
// const DesktopFeatureCards = () => (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="hidden md:flex gap-8 mb-12"
//     >
//       {features.map(({ Icon, label, description }) => (
//         <motion.div
//           key={label}
//           variants={itemVariants}
//           className="flex flex-col items-center gap-3 cursor-pointer group w-[160%]"
//           whileHover="hover"
//           initial="initial"
//         >
//           <motion.div
//             className="p-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//             variants={iconContainerVariants}
//           >
//             <motion.div variants={iconVariants}>
//               <Icon
//                 size={40}
//                 className="text-white group-hover:text-red-400 transition-colors duration-300"
//               />
//             </motion.div>
//           </motion.div>
//           <motion.span
//             variants={textVariants}
//             className="text-lg font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//           >
//             {label}
//           </motion.span>
//           <motion.p
//             variants={textVariants}
//             className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 text-center"
//           >
//             {description}
//           </motion.p>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// // Main Component
// export const FeatureCards = ({ isMobile }) => (
//   <div>
//     {isMobile ? <MobileFeatureCards /> : <DesktopFeatureCards />}
//   </div>
// );
// import { motion } from "framer-motion";
// import { Compass, Map, Plane, Sun } from "lucide-react";

// export const features = [
//   { Icon: Compass, label: "Explore", description: "Find new places" },
//   { Icon: Map, label: "Discover", description: "Hidden gems" },
//   { Icon: Plane, label: "Travel", description: "Journey safely" },
//   { Icon: Sun, label: "Experience", description: "Create memories" },
// ];

// // Variants for animations
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const iconContainerVariants = {
//   initial: { backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1 },
//   hover: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     scale: 1.1,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
// };

// const iconVariants = {
//   initial: { rotate: 0 },
//   hover: {
//     rotate: 360,
//     transition: {
//       duration: 1.2,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatType: "loop",
//     },
//   },
// };

// const textVariants = {
//   initial: { y: 0 },
//   hover: {
//     y: -5,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
// };

// // Mobile Design
// const MobileFeatureCards = () => (
//   <motion.div
//     variants={containerVariants}
//     initial="hidden"
//     animate="visible"
//     className="flex md:hidden gap-8 mb-12 mt-8"
//   >
//     {features.map(({ Icon, label }) => (
//       <motion.div
//         key={label}
//         variants={itemVariants}
//         className="flex flex-col items-center gap-2 cursor-pointer group"
//         whileHover="hover"
//         initial="initial"
//       >
//         <motion.div
//           className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//           variants={iconContainerVariants}
//         >
//           <motion.div variants={iconVariants}>
//             <Icon
//               size={20}
//               className="text-white group-hover:text-red-400 transition-colors duration-300"
//             />
//           </motion.div>
//         </motion.div>
//         <motion.span
//           variants={textVariants}
//           className="text-xs font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//         >
//           {label}
//         </motion.span>
//       </motion.div>
//     ))}
//   </motion.div>
// );



//  const DesktopFeatureCards = () => (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="hidden md:flex gap-20 mb-12 w-4/5 mx-auto"
//     >
//       {features.map(({ Icon, label, description }) => (
//         <motion.div
//           key={label}
//           variants={itemVariants}
//           className="flex flex-col items-center gap-3 cursor-pointer group w-1/5"
//           whileHover="hover"
//           initial="initial"
//         >
//           <motion.div
//             className="p-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
//             variants={iconContainerVariants}
//           >
//             <motion.div variants={iconVariants}>
//               <Icon
//                 size={40}
//                 className="text-white group-hover:text-red-400 transition-colors duration-300"
//               />
//             </motion.div>
//           </motion.div>
//           <motion.span
//             variants={textVariants}
//             className="text-lg font-medium text-white group-hover:text-red-400 transition-colors duration-300"
//           >
//             {label}
//           </motion.span>
//           <motion.p
//             variants={textVariants}
//             className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 text-center"
//           >
//             {description}
//           </motion.p>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// // export const DesktopFeatureCards = () => (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="visible"
// //       className="hidden md:flex justify-center gap-25 mb-12 w-full max-w-6xl mx-auto px-4"
// //     >
// //       {features.map(({ Icon, label, description }) => (
// //         <motion.div
// //           key={label}
// //           variants={itemVariants}
// //           className="flex flex-col items-center p-6 cursor-pointer group relative"
// //           whileHover="hover"
// //           initial="initial"
// //         >
// //           <motion.div
// //             className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg shadow-lg border border-white/10"
// //             variants={iconContainerVariants}
// //           >
// //             <motion.div 
// //               variants={iconVariants}
// //               className="relative z-10"
// //             >
// //               <Icon
// //                 size={32}
// //                 className="text-white group-hover:text-red-400 transition-colors duration-300"
// //               />
// //             </motion.div>
// //             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //           </motion.div>
  
// //           <motion.span
// //             variants={textVariants}
// //             className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors duration-300 mt-6 mb-3"
// //           >
// //             {label}
// //           </motion.span>
  
// //           <motion.p
// //             variants={textVariants}
// //             className="text-base text-white/80 group-hover:text-white transition-colors duration-300 text-center max-w-[200px] leading-relaxed"
// //           >
// //             {description}
// //           </motion.p>
  
// //           <motion.div
// //             className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 rounded-3xl -z-10 group-hover:from-red-500/5 group-hover:to-red-500/10 transition-all duration-300"
// //           />
// //         </motion.div>
// //       ))}
// //     </motion.div>
// //   );
// // Main Component
// export const FeatureCards = ({ isMobile }) => (
//   <div>
//     {isMobile ? <MobileFeatureCards /> : <DesktopFeatureCards />}
//   </div>
// );



import { motion } from "framer-motion";
import { Compass, Map, Plane, Sun } from "lucide-react";

export const features = [
  { Icon: Compass, label: "Explore", description: "Find new places" },
  { Icon: Map, label: "Discover", description: "Hidden gems" },
  { Icon: Plane, label: "Travel", description: "Journey safely" },
  { Icon: Sun, label: "Experience", description: "Create memories" },
];

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const iconContainerVariants = {
  initial: { backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1 },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const iconVariants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const textVariants = {
  initial: { y: 0 },
  hover: {
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Mobile Design
const MobileFeatureCards = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="flex md:hidden gap-8 mb-12 "
  >
    {features.map(({ Icon, label }) => (
      <motion.div
        key={label}
        variants={itemVariants}
        className="flex flex-col items-center gap-2 cursor-pointer group"
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
          variants={iconContainerVariants}
        >
          <motion.div variants={iconVariants}>
            <Icon
              size={20}
              className="text-white group-hover:text-red-400 transition-colors duration-300"
            />
          </motion.div>
        </motion.div>
        <motion.span
          variants={textVariants}
          className="text-xs font-medium text-white group-hover:text-red-400 transition-colors duration-300"
        >
          {label}
        </motion.span>
      </motion.div>
    ))}
  </motion.div>
);



 const DesktopFeatureCards = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex  gap-20 mb-15 w-[80vw] mx-auto"
    >
      {features.map(({ Icon, label, description }) => (
        <motion.div
          key={label}
          variants={itemVariants}
          className="flex flex-col items-center gap-3 cursor-pointer group w-1/5"
          whileHover="hover"
          initial="initial"
        >
          <motion.div
            className="p-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg"
            variants={iconContainerVariants}
          >
            <motion.div variants={iconVariants}>
              <Icon
                size={40}
                className="text-white group-hover:text-red-400 transition-colors duration-300"
              />
            </motion.div>
          </motion.div>
          <motion.span
            variants={textVariants}
            className="text-lg font-medium text-white group-hover:text-red-400 transition-colors duration-300"
          >
            {label}
          </motion.span>
          <motion.p
            variants={textVariants}
            className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 text-center"
          >
            {description}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );

export const FeatureCards = ({ isMobile }) => (
  <div>
    {isMobile ? <MobileFeatureCards /> : <DesktopFeatureCards />}
  </div>
);
