




// import React, { useState, useEffect } from "react";
// // import Login from "../Logis";
// import Login from './Logis'
// import {
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Phone,
//   Globe,
//   Menu,
//   X,
// } from "lucide-react";

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolling(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setIsMenuOpen(false); // Close mobile menu after clicking
//     }
//   };

//   const navigationItems = [
//     { name: "Home", section: "hero-section" },
//     { name: "Packages", section: "Destinations" },
//     { name: "Deals", section: "trending-tours" },
//     { name: "Rent Cars", section: "cars" },
//     {name:"Blogs",section:"blogs"},
//     { name: "Contact", section: "footer" },

//   ];

//   return (
//     <header className="w-full relative">
//       {/* Background wrapper */}
//       <div className="absolute inset-0 w-full h-[calc(100%+85vh)] -z-10">
//         <div className="relative w-full h-full">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/images/hero1.jpg")',
//               backgroundPosition: "center right",
//               backgroundSize: "cover",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
//         </div>
//       </div>

//       {/* Top Menu - Desktop */}
//       <div className="hidden md:block w-full backdrop-blur-sm text-white py-2 sticky top-0 z-50 transition-all duration-300">
//         <div className="relative">
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex justify-between items-center">
//               {/* Left Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Mail size={16} className="mr-2" />
//                   <span className="text-sm">Basityaqoob36@gmail.com</span>
//                 </a>
//                 <div className="flex space-x-4">
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Facebook size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Twitter size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Instagram size={16} />
//                   </a>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="tel:+919541515012"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Phone size={16} className="mr-2" />
//                   <span className="text-sm">+91 9541515012</span>
//                 </a>
//                 <div className="flex items-center space-x-6">
//                   <button className="flex items-center hover:text-gray-300 transition-colors">
//                     <Globe size={16} className="mr-2" />
//                     <span className="text-sm">English</span>
//                   </button>
//                   <button onClick={()=><Login/>} className="text-sm hover:text-gray-300 transition-colors">
//                     Sign Up
//                   </button>
//                   <button className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors">
//                     Register
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div
//         className={`w-full transition-all duration-500 backdrop-blur-sm ${
//           scrolling ? "fixed top-0 bg-black/30" : "fixed md:top-10 top:0 bg-transparent"
//         } left-0 right-0 z-40`}
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex items-center justify-between h-20">
//               {/* Logo */}
//               <div className="text-3xl font-bold text-white transform transition-all duration-300 hover:scale-105">
//                 Expedia
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex space-x-8">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="relative text-white font-semibold text-lg py-2 transition-all duration-300 hover:text-white group"
//                   >
//                     {item.name}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
//                     <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white" />
//                   </button>
//                 ))}
//               </nav>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden text-white"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black z-50 md:hidden">
//           <div className="h-full flex flex-col p-6">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-8 mt-8">
//               {/* Contact Information */}
//               <div className="space-y-4 text-white">
//                 <a href="tel:+919541515012" className="flex items-center">
//                   <Phone size={18} className="mr-3" />
//                   <span>+91 9541515012</span>
//                 </a>
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center"
//                 >
//                   <Mail size={18} className="mr-3" />
//                   <span>Basityaqoob36@gmail.com</span>
//                 </a>
//                 <button className="flex items-center">
//                   <Globe size={18} className="mr-3" />
//                   <span>English</span>
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <nav className="flex flex-col space-y-4">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="text-white text-lg font-semibold hover:text-gray-300 transition-colors text-left"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </nav>

//               {/* Auth Buttons */}
//               <div className="space-y-4">
//                 <button className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition-colors">
//                   Sign Up
//                 </button>
//                 <button className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
//                   Register
//                 </button>
//               </div>

//               {/* Social Links */}
//               <div className="flex justify-center space-x-6 text-white">
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Facebook size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Twitter size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Instagram size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default ExpediaHeader;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import {
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Phone,
//   Globe,
//   Menu,
//   X,
// } from "lucide-react";

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolling(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setIsMenuOpen(false); // Close mobile menu after clicking
//     }
//   };

//   const navigationItems = [
//     { name: "Home", section: "hero-section" },
//     { name: "Packages", section: "Destinations" },
//     { name: "Deals", section: "trending-tours" },
//     { name: "Rent Cars", section: "cars" },
//     { name: "Blogs", section: "blogs" },
//     { name: "Contact", section: "footer" },
//   ];

//   return (
//     <header className="w-full relative">
//       {/* Background wrapper */}
//       <div className="absolute inset-0 w-full h-[calc(100%+85vh)] -z-10">
//         <div className="relative w-full h-full">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/images/hero1.jpg")',
//               backgroundPosition: "center right",
//               backgroundSize: "cover",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
//         </div>
//       </div>

//       {/* Top Menu - Desktop */}
//       <div className="hidden md:block w-full backdrop-blur-sm text-white py-2 sticky top-0 z-50 transition-all duration-300">
//         <div className="relative">
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex justify-between items-center">
//               {/* Left Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Mail size={16} className="mr-2" />
//                   <span className="text-sm">Basityaqoob36@gmail.com</span>
//                 </a>
//                 <div className="flex space-x-4">
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Facebook size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Twitter size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Instagram size={16} />
//                   </a>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="tel:+919541515012"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Phone size={16} className="mr-2" />
//                   <span className="text-sm">+91 9541515012</span>
//                 </a>
//                 <div className="flex items-center space-x-6">
//                   <button className="flex items-center hover:text-gray-300 transition-colors">
//                     <Globe size={16} className="mr-2" />
//                     <span className="text-sm">English</span>
//                   </button>
//                   <button
//                     onClick={() => navigate("/login")} // Navigate to /login
//                     className="text-sm hover:text-gray-300 transition-colors"
//                   >
//                     Sign Up
//                   </button>
//                   <button
//                     onClick={() => navigate("/register")} // Navigate to /register
//                     className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                   >
//                     Register
//                   </button>
//                   <button
//                     onClick={() => navigate("/agent")} // Navigate to /agent
//                     className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                   >
//                     Register as Agent
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div
//         className={`w-full transition-all duration-500 backdrop-blur-sm ${
//           scrolling ? "fixed top-0 bg-black/30" : "fixed md:top-10 top:0 bg-transparent"
//         } left-0 right-0 z-40`}
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex items-center justify-between h-20">
//               {/* Logo */}
//               <div className="text-3xl font-bold text-white transform transition-all duration-300 hover:scale-105">
//                 Expedia
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex space-x-8">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="relative text-white font-semibold text-lg py-2 transition-all duration-300 hover:text-white group"
//                   >
//                     {item.name}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
//                     <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white" />
//                   </button>
//                 ))}
//               </nav>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden text-white"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black z-50 md:hidden">
//           <div className="h-full flex flex-col p-6">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-8 mt-8">
//               {/* Contact Information */}
//               <div className="space-y-4 text-white">
//                 <a href="tel:+919541515012" className="flex items-center">
//                   <Phone size={18} className="mr-3" />
//                   <span>+91 9541515012</span>
//                 </a>
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center"
//                 >
//                   <Mail size={18} className="mr-3" />
//                   <span>Basityaqoob36@gmail.com</span>
//                 </a>
//                 <button className="flex items-center">
//                   <Globe size={18} className="mr-3" />
//                   <span>English</span>
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <nav className="flex flex-col space-y-4">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="text-white text-lg font-semibold hover:text-gray-300 transition-colors text-left"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </nav>

//               {/* Auth Buttons */}
//               <div className="space-y-4">
//                 <button
//                   onClick={() => navigate("/login")} // Navigate to /login
//                   className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition-colors"
//                 >
//                   Sign Up
//                 </button>
//                 <button
//                   onClick={() => navigate("/register")} // Navigate to /register
//                   className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                 >
//                   Register
//                 </button>
//                 <button
//                   onClick={() => navigate("/agent")} // Navigate to /agent
//                   className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                 >
//                   Register as Agent
//                 </button>
//               </div>

//               {/* Social Links */}
//               <div className="flex justify-center space-x-6 text-white">
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Facebook size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Twitter size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Instagram size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default ExpediaHeader;



// ExpediaHeader.js
// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";
// import {
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Phone,
//   Globe,
//   Menu,
//   X,
// } from "lucide-react";

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false);
//   const navigate = useNavigate();
//   const { isAuthenticated, user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolling(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setIsMenuOpen(false); // Close mobile menu after clicking
//     }
//   };

//   const navigationItems = [
//     { name: "Home", section: "hero-section" },
//     { name: "Packages", section: "Destinations" },
//     { name: "Deals", section: "trending-tours" },
//     { name: "Rent Cars", section: "cars" },
//     { name: "Blogs", section: "blogs" },
//     { name: "Contact", section: "footer" },
//   ];

//   return (
//     <header className="w-full relative">
//       {/* Background wrapper */}
//       <div className="absolute inset-0 w-full h-[calc(100%+85vh)] -z-10">
//         <div className="relative w-full h-full">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/images/hero1.jpg")',
//               backgroundPosition: "center right",
//               backgroundSize: "cover",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
//         </div>
//       </div>

//       {/* Top Menu - Desktop */}
//       <div className="hidden md:block w-full backdrop-blur-sm text-white py-2 sticky top-0 z-50 transition-all duration-300">
//         <div className="relative">
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex justify-between items-center">
//               {/* Left Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Mail size={16} className="mr-2" />
//                   <span className="text-sm">Basityaqoob36@gmail.com</span>
//                 </a>
//                 <div className="flex space-x-4">
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Facebook size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Twitter size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Instagram size={16} />
//                   </a>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="tel:+919541515012"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Phone size={16} className="mr-2" />
//                   <span className="text-sm">+91 9541515012</span>
//                 </a>
//                 <div className="flex items-center space-x-6">
//                   <button className="flex items-center hover:text-gray-300 transition-colors">
//                     <Globe size={16} className="mr-2" />
//                     <span className="text-sm">English</span>
//                   </button>
//                   {!isAuthenticated ? (
//                     <>
//                       <button
//                         onClick={() => navigate("/login")}
//                         className="text-sm hover:text-gray-300 transition-colors"
//                       >
//                         Sign Up
//                       </button>
//                       <button
//                         onClick={() => navigate("/register")}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Register
//                       </button>
//                       <button
//                         onClick={() => navigate("/agent")}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Register as Agent
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => navigate("/profile")}
//                         className="text-sm hover:text-gray-300 transition-colors"
//                       >
//                         {user?.username}
//                       </button>
//                       <button
//                         onClick={logout}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Rest of the code (Main Navigation and Mobile Menu) */}
//       {/* ... */}
//       <div
//         className={`w-full transition-all duration-500 backdrop-blur-sm ${
//           scrolling ? "fixed top-0 bg-black/30" : "fixed md:top-10 top:0 bg-transparent"
//         } left-0 right-0 z-40`}
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex items-center justify-between h-20">
//               {/* Logo */}
//               <div className="text-3xl font-bold text-white transform transition-all duration-300 hover:scale-105">
//                 Expedia
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex space-x-8">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="relative text-white font-semibold text-lg py-2 transition-all duration-300 hover:text-white group"
//                   >
//                     {item.name}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
//                     <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white" />
//                   </button>
//                 ))}
//               </nav>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden text-white"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black z-50 md:hidden">
//           <div className="h-full flex flex-col p-6">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-8 mt-8">
//               {/* Contact Information */}
//               <div className="space-y-4 text-white">
//                 <a href="tel:+919541515012" className="flex items-center">
//                   <Phone size={18} className="mr-3" />
//                   <span>+91 9541515012</span>
//                 </a>
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center"
//                 >
//                   <Mail size={18} className="mr-3" />
//                   <span>Basityaqoob36@gmail.com</span>
//                 </a>
//                 <button className="flex items-center">
//                   <Globe size={18} className="mr-3" />
//                   <span>English</span>
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <nav className="flex flex-col space-y-4">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="text-white text-lg font-semibold hover:text-gray-300 transition-colors text-left"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </nav>

//               {/* Auth Buttons */}
//               <div className="space-y-4">
//                 <button
//                   onClick={() => navigate("/login")} // Navigate to /login
//                   className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition-colors"
//                 >
//                   Sign Up
//                 </button>
//                 <button
//                   onClick={() => navigate("/register")} // Navigate to /register
//                   className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                 >
//                   Register
//                 </button>
//                 <button
//                   onClick={() => navigate("/agent")} // Navigate to /agent
//                   className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                 >
//                   Register as Agent
//                 </button>
//               </div>

//               {/* Social Links */}
//               <div className="flex justify-center space-x-6 text-white">
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Facebook size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Twitter size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Instagram size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default ExpediaHeader;



// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";
// import {
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Phone,
//   Globe,
//   Menu,
//   X,
//   User,
// } from "lucide-react";

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false);
//   const navigate = useNavigate();
//   const { isAuthenticated, user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolling(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setIsMenuOpen(false); // Close mobile menu after clicking
//     }
//   };

//   const navigationItems = [
//     { name: "Home", section: "hero-section" },
//     { name: "Packages", section: "Destinations" },
//     { name: "Deals", section: "trending-tours" },
//     { name: "Rent Cars", section: "cars" },
//     { name: "Blogs", section: "blogs" },
//     { name: "Contact", section: "footer" },
//   ];

//   return (
//     <header className="w-full relative">
//       {/* Background wrapper */}
//       <div className="absolute inset-0 w-full h-[calc(100%+85vh)] -z-10">
//         <div className="relative w-full h-full">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/images/hero1.jpg")',
//               backgroundPosition: "center right",
//               backgroundSize: "cover",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
//         </div>
//       </div>

//       {/* Top Menu - Desktop */}
//       <div className="hidden md:block w-full backdrop-blur-sm text-white py-2 sticky top-0 z-50 transition-all duration-300">
//         <div className="relative">
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex justify-between items-center">
//               {/* Left Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Mail size={16} className="mr-2" />
//                   <span className="text-sm">Basityaqoob36@gmail.com</span>
//                 </a>
//                 <div className="flex space-x-4">
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Facebook size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Twitter size={16} />
//                   </a>
//                   <a href="#" className="hover:text-gray-300 transition-colors">
//                     <Instagram size={16} />
//                   </a>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex items-center space-x-6">
//                 <a
//                   href="tel:+919541515012"
//                   className="flex items-center hover:text-gray-300 transition-colors"
//                 >
//                   <Phone size={16} className="mr-2" />
//                   <span className="text-sm">+91 9541515012</span>
//                 </a>
//                 <div className="flex items-center space-x-6">
//                   <button className="flex items-center hover:text-gray-300 transition-colors">
//                     <Globe size={16} className="mr-2" />
//                     <span className="text-sm">English</span>
//                   </button>
//                   {!isAuthenticated ? (
//                     <>
//                       <button
//                         onClick={() => navigate("/login")}
//                         className="text-sm hover:text-gray-300 transition-colors"
//                       >
//                         Sign Up
//                       </button>
//                       <button
//                         onClick={() => navigate("/register")}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Register
//                       </button>
//                       <button
//                         onClick={() => navigate("/agent")}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Register as Agent
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       {/* Profile Icon for Desktop */}
//                       <button
//                         onClick={() => navigate("/profile")}
//                         className="flex items-center hover:text-gray-300 transition-colors"
//                       >
//                         <User size={20} className="mr-2" />
//                         <span className="text-sm">{user?.username}</span>
//                       </button>
//                       <button
//                         onClick={logout}
//                         className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div
//         className={`w-full transition-all duration-500 backdrop-blur-sm ${
//           scrolling ? "fixed top-0 bg-black/30" : "fixed md:top-10 top:0 bg-transparent"
//         } left-0 right-0 z-40`}
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
//           <div className="max-w-7xl mx-auto px-4 relative">
//             <div className="flex items-center justify-between h-20">
//               {/* Logo */}
//               <div className="text-3xl font-bold text-white transform transition-all duration-300 hover:scale-105">
//                 Expedia
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex space-x-8">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="relative text-white font-semibold text-lg py-2 transition-all duration-300 hover:text-white group"
//                   >
//                     {item.name}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
//                     <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white" />
//                   </button>
//                 ))}
//               </nav>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden text-white"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black z-50 md:hidden">
//           <div className="h-full flex flex-col p-6">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-8 mt-8">
//               {/* Contact Information */}
//               <div className="space-y-4 text-white">
//                 <a href="tel:+919541515012" className="flex items-center">
//                   <Phone size={18} className="mr-3" />
//                   <span>+91 9541515012</span>
//                 </a>
//                 <a
//                   href="mailto:Basityaqoob36@gmail.com"
//                   className="flex items-center"
//                 >
//                   <Mail size={18} className="mr-3" />
//                   <span>Basityaqoob36@gmail.com</span>
//                 </a>
//                 <button className="flex items-center">
//                   <Globe size={18} className="mr-3" />
//                   <span>English</span>
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <nav className="flex flex-col space-y-4">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => scrollToSection(item.section)}
//                     className="text-white text-lg font-semibold hover:text-gray-300 transition-colors text-left"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </nav>

//               {/* Auth Buttons */}
//               <div className="space-y-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => navigate("/login")}
//                       className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition-colors"
//                     >
//                       Sign Up
//                     </button>
//                     <button
//                       onClick={() => navigate("/register")}
//                       className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                     >
//                       Register
//                     </button>
//                     <button
//                       onClick={() => navigate("/agent")}
//                       className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                     >
//                       Register as Agent
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {/* Profile Icon for Mobile */}
//                     <button
//                       onClick={() => navigate("/profile")}
//                       className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition-colors flex items-center justify-center"
//                     >
//                       <User size={20} className="mr-2" />
//                       <span>{user?.username}</span>
//                     </button>
//                     <button
//                       onClick={logout}
//                       className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* Social Links */}
//               <div className="flex justify-center space-x-6 text-white">
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Facebook size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Twitter size={24} />
//                 </a>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   <Instagram size={24} />
//                 </a>
//               </div>

//               {/* Privacy, Cookies, Terms of Service, and Developed by Basit */}
//               {/* <div className="text-center text-white text-sm space-y-2">
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   Privacy Policy
//                 </a>
//                 <span> | </span>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   Cookies
//                 </a>
//                 <span> | </span>
//                 <a href="#" className="hover:text-gray-300 transition-colors">
//                   Terms of Service
//                 </a>
//                 {/* <div className="mt-4">Developed by Basit</div> */}
//               {/* </div> */} 
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default ExpediaHeader;


// import React, { useState } from 'react';
// import { ChevronDown, User, Menu, X } from 'lucide-react';

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
  
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   return (
//     <header className="bg-white shadow-md fixed w-full z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img 
//               src="./images/hero.jpg" 
//               alt="TravelEase Logo" 
//               className="h-10 w-auto mr-2" 
//             />
//             <span className="text-2xl font-bold text-blue-600">TravelEase</span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <a href="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</a>
//             <a href="/destinations" className="text-gray-800 hover:text-blue-600 font-medium">Destinations</a>
//             <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium">Packages</a>
//             {/* <a href="/flights" className="text-gray-800 hover:text-blue-600 font-medium">Flights</a> */}
//             {/* <a href="/hotels" className="text-gray-800 hover:text-blue-600 font-medium">Hotels</a> */}
//             <a href="/about" className="text-gray-800 hover:text-blue-600 font-medium">About Us</a>
//             <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium">Contact</a>
//           </nav>
          
//           {/* User Profile and Mobile Menu Button */}
//           <div className="flex items-center space-x-4">
//             {/* Search Icon */}
//             <button className="text-gray-700 hover:text-blue-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
            
//             {/* User Profile Dropdown */}
//             <div className="relative">
//               <button 
//                 onClick={toggleProfileDropdown}
//                 className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
//               >
//                 <div className="bg-gray-200 rounded-full p-2">
//                   <User size={20} />
//                 </div>
//                 <span className="ml-2 hidden sm:inline">Hi, User</span>
//                 <ChevronDown size={16} className="ml-1" />
//               </button>
              
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
//                   <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Login</a>
//                   <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Sign Up</a>
//                   <a href="/register-agent" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                 </div>
//               )}
//             </div>
            
//             {/* Mobile menu button */}
//             <button 
//               className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none" 
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4">
//             <nav className="flex flex-col space-y-3">
//               <a href="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</a>
//               <a href="/destinations" className="text-gray-800 hover:text-blue-600 font-medium">Destinations</a>
//               <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium">Packages</a>
//               {/* <a href="/flights" className="text-gray-800 hover:text-blue-600 font-medium">Flights</a> */}
//               {/* <a href="/hotels" className="text-gray-800 hover:text-blue-600 font-medium">Hotels</a> */}
//               <a href="/about" className="text-gray-800 hover:text-blue-600 font-medium">About Us</a>
//               <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium">Contact</a>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default ExpediaHeader;
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, User, Menu, X, LogOut, Heart, ShoppingCart, MapPin } from 'lucide-react';

// const  ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state for login status
  
//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (!isMenuOpen) {
//       document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   };
  
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   // Toggle login status (demo function)
//   const toggleLogin = () => {
//     setIsLoggedIn(!isLoggedIn);
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-900 to-blue-700 py-4'}`}>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img 
//               src="./images/Hero1.jpg" 
//               alt="WanderWise Logo" 
//               className="h-11 w-auto mr-2" 
//             />
//             <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>WanderWise</span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex space-x-6">
//             <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Home</a>
//             <div className="relative group">
//               <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Destinations <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <div className="grid grid-cols-2 gap-2 px-4">
//                   <a href="/destinations/asia" className="py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                   <a href="/destinations/europe" className="py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                   <a href="/destinations/africa" className="py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                   <a href="/destinations/americas" className="py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                   <a href="/destinations/oceania" className="py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                   <a href="/destinations/middle-east" className="py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                 </div>
//               </div>
//             </div>
//             <div className="relative group">
//               <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Experiences <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <a href="/experiences/adventure" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                 <a href="/experiences/cultural" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                 <a href="/experiences/wildlife" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                 <a href="/experiences/food" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//               </div>
//             </div>
//             <a href="/deals" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Deals</a>
//             {/* <a href="/hotels" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Hotels</a> */}
//             {/* <a href="/flights" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Flights</a> */}
//             <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Travel Blog</a>
//           </nav>
          
//           {/* User Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Wishlist icon */}
//             <a href="/wishlist" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <Heart size={20} />
//             </a>
            
//             {/* Cart icon */}
//             <a href="/cart" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <div className="relative">
//                 <ShoppingCart size={20} />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
//               </div>
//             </a>
            
//             {/* User Profile Dropdown */}
//             <div className="relative">
//               <button 
//                 onClick={toggleProfileDropdown}
//                 className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
//               >
//                 <div className={`${isScrolled ? 'bg-gray-200' : 'bg-blue-800'} rounded-full p-1.5`}>
//                   <User size={18} />
//                 </div>
//                 <span className="ml-2 hidden sm:inline">{isLoggedIn ? 'John' : 'Hi, Guest'}</span>
//                 <ChevronDown size={16} className="ml-1" />
//               </button>
              
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                   {isLoggedIn ? (
//                     <>
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <p className="text-sm font-medium text-gray-900">John Smith</p>
//                         <p className="text-xs text-gray-500">john.smith@example.com</p>
//                       </div>
//                       <a href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50">
//                         <User size={16} className="mr-2 text-blue-600" />
//                         My Profile
//                       </a>
//                       <a href="/bookings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50">
//                         <MapPin size={16} className="mr-2 text-blue-600" />
//                         My Bookings
//                       </a>
//                       <button 
//                         onClick={toggleLogin} 
//                         className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
//                       >
//                         <LogOut size={16} className="mr-2 text-blue-600" />
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={toggleLogin}>Login</a>
//                       <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Sign Up</a>
//                       <div className="border-t border-gray-100 my-1"></div>
//                       <a href="/register-agent" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
            
//             {/* Mobile menu button */}
//             <button 
//               className={`lg:hidden hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`} 
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Navigation - Fullscreen */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-white z-40 lg:hidden pt-20">
//           <div className="container mx-auto px-6 py-6 h-full overflow-y-auto">
//             <nav className="flex flex-col space-y-6">
//               <a href="/" className="text-xl font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 pb-4">Home</a>
              
//               <div className="border-b border-gray-100 pb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-xl font-medium text-gray-800">Destinations</span>
//                   <ChevronDown size={20} className="text-gray-500" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 ml-4">
//                   <a href="/destinations/asia" className="text-gray-700 hover:text-blue-600">Asia</a>
//                   <a href="/destinations/europe" className="text-gray-700 hover:text-blue-600">Europe</a>
//                   <a href="/destinations/africa" className="text-gray-700 hover:text-blue-600">Africa</a>
//                   <a href="/destinations/americas" className="text-gray-700 hover:text-blue-600">Americas</a>
//                   <a href="/destinations/oceania" className="text-gray-700 hover:text-blue-600">Oceania</a>
//                   <a href="/destinations/middle-east" className="text-gray-700 hover:text-blue-600">Middle East</a>
//                 </div>
//               </div>
              
//               <div className="border-b border-gray-100 pb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-xl font-medium text-gray-800">Experiences</span>
//                   <ChevronDown size={20} className="text-gray-500" />
//                 </div>
//                 <div className="flex flex-col space-y-3 ml-4">
//                   <a href="/experiences/adventure" className="text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                   <a href="/experiences/cultural" className="text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                   <a href="/experiences/wildlife" className="text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                   <a href="/experiences/food" className="text-gray-700 hover:text-blue-600">Food & Culinary</a>
//                 </div>
//               </div>
              
//               <a href="/deals" className="text-xl font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 pb-4">Deals</a>
//               {/* <a href="/hotels" className="text-xl font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 pb-4">Hotels</a> */}
//               {/* <a href="/flights" className="text-xl font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 pb-4">Flights</a> */}
//               <a href="/blog" className="text-xl font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 pb-4">Travel Blog</a>
              
//               <div className="pt-6 flex flex-col space-y-4">
//                 <div className="flex space-x-6">
//                   <a href="/wishlist" className="flex items-center text-gray-700 hover:text-blue-600">
//                     <Heart size={20} className="mr-2" />
//                     <span>Wishlist</span>
//                   </a>
//                   <a href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
//                     <ShoppingCart size={20} className="mr-2" />
//                     <span>Cart (2)</span>
//                   </a>
//                 </div>
                
//                 {isLoggedIn ? (
//                   <div className="flex flex-col space-y-3 pt-2">
//                     <a href="/profile" className="flex items-center px-4 py-2 bg-blue-50 rounded-md text-blue-700">
//                       <User size={18} className="mr-2" />
//                       My Profile
//                     </a>
//                     <button onClick={toggleLogin} className="flex items-center px-4 py-2 border border-gray-200 rounded-md text-gray-700">
//                       <LogOut size={18} className="mr-2" />
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col space-y-3 pt-2">
//                     <a href="/login" onClick={toggleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-md text-center font-medium">
//                       Login
//                     </a>
//                     <a href="/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-center font-medium">
//                       Sign Up
//                     </a>
//                     <a href="/register-agent" className="px-4 py-2 text-gray-700 hover:text-blue-600">
//                       Register as Agent
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default  ExpediaHeader;
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, User, Menu, X, LogOut, Heart, ShoppingCart } from 'lucide-react';

// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state for login status
  
//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
  
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   // Toggle login status (demo function)
//   const toggleLogin = () => {
//     setIsLoggedIn(!isLoggedIn);
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-900 to-blue-700 py-4'}`}>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img 
//               src="/api/placeholder/45/45" 
//               alt="WanderWise Logo" 
//               className="h-11 w-auto mr-2" 
//             />
//             <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>WanderWise</span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex space-x-6">
//             <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Home</a>
//             <div className="relative group">
//               <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Destinations <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <div className="grid grid-cols-2 gap-2 px-4">
//                   <a href="/destinations/asia" className="py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                   <a href="/destinations/europe" className="py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                   <a href="/destinations/africa" className="py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                   <a href="/destinations/americas" className="py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                   <a href="/destinations/oceania" className="py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                   <a href="/destinations/middle-east" className="py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                 </div>
//               </div>
//             </div>
//             <div className="relative group">
//               <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Experiences <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <a href="/experiences/adventure" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                 <a href="/experiences/cultural" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                 <a href="/experiences/wildlife" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                 <a href="/experiences/food" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//               </div>
//             </div>
//             <a href="/deals" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Deals</a>
//             <a href="/hotels" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Hotels</a>
//             <a href="/flights" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Flights</a>
//             <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Travel Blog</a>
//           </nav>
          
//           {/* User Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Wishlist icon - desktop only */}
//             <a href="/wishlist" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <Heart size={20} />
//             </a>
            
//             {/* Cart icon - desktop only */}
//             <a href="/cart" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <div className="relative">
//                 <ShoppingCart size={20} />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
//               </div>
//             </a>
            
//             {/* User Profile Dropdown - always visible */}
//             <div className="relative">
//               <button 
//                 onClick={toggleProfileDropdown}
//                 className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
//               >
//                 <div className={`${isScrolled ? 'bg-gray-200' : 'bg-blue-800'} rounded-full p-1.5`}>
//                   <User size={18} />
//                 </div>
//                 <span className="ml-2 hidden sm:inline">
//                   {isLoggedIn ? 'Hi, User' : 'Hi, Guest'}
//                 </span>
//                 <ChevronDown size={16} className="ml-1" />
//               </button>
              
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                   {isLoggedIn ? (
//                     <>
//                       <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                       <button 
//                         onClick={toggleLogin} 
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={toggleLogin}>Login</a>
//                       <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Sign Up</a>
//                       <div className="border-t border-gray-100 my-1"></div>
//                       <a href="/register-agent" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
            
//             {/* Mobile menu button */}
//             <button 
//               className={`lg:hidden hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`} 
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Navigation - from earlier design but now covers full screen */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//             <div className="h-full overflow-y-auto pb-20">
//               <nav className="flex flex-col p-4">
//                 <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>
//                 <a href="/destinations" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Destinations</a>
//                 <a href="/experiences" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Experiences</a>
//                 <a href="/deals" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Deals</a>
//                 <a href="/hotels" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Hotels</a>
//                 <a href="/flights" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Flights</a>
//                 <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
                
//                 <div className="mt-6 space-y-3">
//                   <a href="/wishlist" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <Heart size={20} className="mr-3" />
//                     <span>Wishlist</span>
//                   </a>
//                   <a href="/cart" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <ShoppingCart size={20} className="mr-3" />
//                     <span>Cart (2 items)</span>
//                   </a>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default ExpediaHeader;
// import React, { useState, useEffect, useContext } from 'react';
// import { ChevronDown, User, Menu, X,  Heart, ShoppingCart } from 'lucide-react';
// import { AuthContext } from './AuthContext'; // Adjust the import path as needed

// const  ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   const { isLoggedIn, user, logout } = useContext(AuthContext); // Use AuthContext

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
  
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-900 to-blue-700 py-4'}`}>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img 
//               src="/api/placeholder/45/45" 
//               alt="WanderWise Logo" 
//               className="h-11 w-auto mr-2" 
//             />
//             <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>WanderWise</span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex space-x-6">
//             <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Home</a>
//             <div className="relative group">
//               <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Destinations <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <div className="grid grid-cols-2 gap-2 px-4">
//                   <a href="/destinations/asia" className="py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                   <a href="/destinations/europe" className="py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                   <a href="/destinations/africa" className="py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                   <a href="/destinations/americas" className="py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                   <a href="/destinations/oceania" className="py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                   <a href="/destinations/middle-east" className="py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                 </div>
//               </div>
//             </div>
//             <div className="relative group">
//               <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
//                 Experiences <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <a href="/experiences/adventure" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                 <a href="/experiences/cultural" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                 <a href="/experiences/wildlife" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                 <a href="/experiences/food" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//               </div>
//             </div>
//             <a href="/deals" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Deals</a>
//             <a href="/hotels" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Hotels</a>
//             <a href="/flights" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Flights</a>
//             <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Travel Blog</a>
//           </nav>
          
//           {/* User Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Wishlist icon - desktop only */}
//             <a href="/wishlist" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <Heart size={20} />
//             </a>
            
//             {/* Cart icon - desktop only */}
//             <a href="/cart" className={`hidden md:block hover:text-blue-400 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
//               <div className="relative">
//                 <ShoppingCart size={20} />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
//               </div>
//             </a>
            
//             {/* User Profile Dropdown - always visible */}
//             <div className="relative">
//               <button 
//                 onClick={toggleProfileDropdown}
//                 className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
//               >
//                 <div className={`${isScrolled ? 'bg-gray-200' : 'bg-blue-800'} rounded-full p-1.5`}>
//                   <User size={18} />
//                 </div>
//                 <span className="ml-2 hidden sm:inline">
//                   {isLoggedIn ? `Hi, ${user?.name || 'User'}` : 'Hi, Guest'}
//                 </span>
//                 <ChevronDown size={16} className="ml-1" />
//               </button>
              
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                   {isLoggedIn ? (
//                     <>
//                       <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                       <button 
//                         onClick={handleLogout} 
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Login</a>
//                       <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Sign Up</a>
//                       <div className="border-t border-gray-100 my-1"></div>
//                       <a href="/register-agent" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
            
//             {/* Mobile menu button */}
//             <button 
//               className={`lg:hidden hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`} 
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Navigation - with dropdowns and X button */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//             <div className="h-full overflow-y-auto pb-20">
//               <nav className="flex flex-col p-4">
//                 <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>
                
//                 {/* Destinations Dropdown */}
//                 <div className="relative">
//                   <button 
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Destinations <ChevronDown size={16} />
//                   </button>
//                   <div className="pl-4">
//                     <a href="/destinations/asia" className="block py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                     <a href="/destinations/europe" className="block py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                     <a href="/destinations/africa" className="block py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                     <a href="/destinations/americas" className="block py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                     <a href="/destinations/oceania" className="block py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                     <a href="/destinations/middle-east" className="block py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                   </div>
//                 </div>
                
//                 {/* Experiences Dropdown */}
//                 <div className="relative">
//                   <button 
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Experiences <ChevronDown size={16} />
//                   </button>
//                   <div className="pl-4">
//                     <a href="/experiences/adventure" className="block py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                     <a href="/experiences/cultural" className="block py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                     <a href="/experiences/wildlife" className="block py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                     <a href="/experiences/food" className="block py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//                   </div>
//                 </div>
                
//                 <a href="/deals" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Deals</a>
//                 <a href="/hotels" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Hotels</a>
//                 <a href="/flights" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Flights</a>
//                 <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
                
//                 <div className="mt-6 space-y-3">
//                   <a href="/wishlist" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <Heart size={20} className="mr-3" />
//                     <span>Wishlist</span>
//                   </a>
//                   <a href="/cart" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <ShoppingCart size={20} className="mr-3" />
//                     <span>Cart (2 items)</span>
//                   </a>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default  ExpediaHeader;
// import  { useState, useEffect, useContext } from 'react';
// import { ChevronDown, User, Menu, X, Heart, ShoppingCart,ChevronUp } from 'lucide-react';
// import { AuthContext } from './AuthContext'; // Adjust the import path
// import React, { useState, useEffect, useContext } from 'react';

// import AuthModal from "./auth/AuthModal"
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Assuming you have an AuthContext
//   const { isAuthenticated, user, logout ,agent} = useContext(AuthContext); 

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${user?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {/* Check if user is agent and provide different profile link */}
//                         {user?.role === 'agent' ? (
//                           <a href="/agent/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {user?.role === 'agent' ? (
//                         <a href="/agent/profile" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Assuming you have an AuthContext
//   const { isAuthenticated, user, logout } = useContext(AuthContext); 

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${user?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {/* Check if user is agent and provide different profile link */}
//                         {user?.role === 'agent' ? (
//                           <a href="/agent/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {user?.role === 'agent' ? (
//                         <a href="/agent/profile" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context
//   const { isAuthenticated, user, agent, logout } = useContext(AuthContext);
  
//   // This is the key fix - properly detect if logged in user is an agent
//   // Only check the agent object without fallback to user properties
//   const isAgent = agent !== null;

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   // For debugging - can be removed in production
//   useEffect(() => {
//     console.log("Auth state:", { isAuthenticated, user, agent, isAgent });
//   }, [isAuthenticated, user, agent, isAgent]);

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${agent?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {isAgent ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context
//   const { isAuthenticated, user, agent, logout } = useContext(AuthContext);
  
//   // Fix: Properly check if agent exists
//   const isAgent = agent !== null && agent !== undefined;

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   // For debugging - can be removed in production
//   useEffect(() => {
//     console.log("Auth state:", { isAuthenticated, user, agent, isAgent });
//   }, [isAuthenticated, user, agent, isAgent]);

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${agent?.username || user?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {isAgent ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;

// import React, { useState, useEffect, useContext } from 'react';
// import { ChevronDown, ChevronUp, Menu, User, X } from 'lucide-react';
// import { AuthContext } from './path/to/AuthContext'; // Update this path to match your project structure
// import AuthModal from './AuthModal'; // Update this path if needed

// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context
//   const { isAuthenticated, user, agent, logout } = useContext(AuthContext);
  
//   // Fix: Determine if the logged-in user is an agent by checking specific agent properties
//   const isAgent = Boolean(agent && (agent.isAgent || agent.role === 'agent'));

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   // For debugging - can be removed in production
//   useEffect(() => {
//     console.log("Auth state:", { isAuthenticated, user, agent, isAgent });
//   }, [isAuthenticated, user, agent, isAgent]);

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${(agent && agent.username) || (user && user.username) || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {isAgent ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context
//   const { isAuthenticated, user, agent, logout } = useContext(AuthContext);
  
//   // Improved: Determine if we should show agent-specific UI
//   // This checks if agent exists AND has either isAgent=true OR role='agent'
//   const isAgentUser = Boolean(isAuthenticated && agent && (agent.isAgent || agent.role === 'agent'));

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   // For debugging - change this to better log the auth state
//   useEffect(() => {
//     console.log("Auth state:", { 
//       isAuthenticated, 
//       user, 
//       agent, 
//       isAgentUser,
//       userType: isAgentUser ? 'AGENT' : 'REGULAR USER'
//     });
//   }, [isAuthenticated, user, agent, isAgentUser]);

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${(isAgentUser ? agent?.username : user?.username) || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {isAgentUser ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {isAgentUser ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { User, ChevronDown, ChevronUp, Menu, X , Calendar,LogOut,UserCircle} from 'lucide-react'; // Assuming these are imported
import { AuthContext } from './AuthContext'; // Update with correct path
import AuthModal from './auth/AuthModal'; // Update with correct path
import TripPlanner from './TripPlanner';
const KashmirHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);

  // Get authentication context with our simplified API
  const { isAuthenticated, userData, logout } = useContext(AuthContext);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpandedMobileSection(null); // Reset expanded sections when toggling menu
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleMobileSection = (section) => {
    setExpandedMobileSection(
      expandedMobileSection === section ? null : section
    );
  };
 
  // Get the username to display
  const displayName = isAuthenticated ? (userData?.username || 'User') : 'Guest';
  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              {/* <img
                src="./images/logo.jpg"
                alt="Kashmir Travels Logo"
                className="h-11 w-auto mr-2"
              /> */}
              <span className={`text-2xl font-bold ${isScrolled ? 'text-orange-600' : 'text-orange-600'}`}>Kashmir Travels</span>
            </div>
  
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 items-center">
              <a href="/" className={`font-medium hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}
                 onClick={(e) => handleSmoothScroll(e, '/')}>Home</a>
              
              {/* Destinations Dropdown */}
              <div className="relative group">
                <a href="#destinations" className={`flex items-center font-medium group-hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}
                   onClick={(e) => handleSmoothScroll(e, '#destinations')}>
                  Destinations <ChevronDown size={16} className="ml-1" />
                </a>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Srinagar</a>
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Gulmarg</a>
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Pahalgam</a>
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Sonamarg</a>
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Leh Ladakh</a>
                    <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#tours')}>Jammu</a>
                  </div>
                </div>
              </div>
              
              {/* Experiences Dropdown */}
              <div className="relative group">
                <a href="#experiences" className={`flex items-center font-medium group-hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}
                   onClick={(e) => handleSmoothScroll(e, '#experiences')}>
                  Experiences <ChevronDown size={16} className="ml-1" />
                </a>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#destinations')}>Shikara Rides</a>
                  <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#destinations')}>Houseboat Stays</a>
                  <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#destinations')}>Himalayan Trekking</a>
                  <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#destinations')}>Wazwan Cuisine</a>
                  <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#destinations')}>Skiing in Gulmarg</a>
                </div>
              </div>
              
              <a href="#cars" className="font-medium text-gray-800 hover:text-orange-600" onClick={(e) => handleSmoothScroll(e, '#cars')}>
                Rent a Car
              </a>
              
              <Link to="/register" className="font-medium text-gray-800 hover:text-orange-600">
                Agent Portal
              </Link>
            </nav>
  
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className={`flex items-center hover:text-orange-500 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
                >
                  <div className={`${isScrolled ? 'bg-orange-100' : 'bg-orange-100'} rounded-full p-1.5`}>
                    <User size={18} />
                  </div>
                  <span className="ml-2 hidden sm:inline">
                    Hi, {displayName}
                  </span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
  
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
                    {isAuthenticated ? (
                      <>
                        <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">My Profile</a>
                        <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">My Bookings</a>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50">
                          Login / Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
  
              {/* Mobile menu button */}
              <button
                className="lg:hidden hover:text-orange-500 focus:outline-none text-gray-700"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={toggleMenu}>
          {/* Prevent clicks inside from closing */}
          <div className="absolute right-0 top-0 h-full w-3/4 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="h-full overflow-y-auto pb-20">
              {/* Logo and Close button */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  {/* <img
                    src="./images/logo.jpg"
                    alt="Kashmir Travels Logo"
                    className="h-8 w-auto mr-2"
                  /> */}
                  <span className="text-xl font-bold text-orange-600">Kashmir</span>
                </div>
                
                <button 
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-orange-600"
                >
                  <X size={24} />
                </button>
              </div>
            
              <nav className="flex flex-col p-4">
                <TripPlanner/>
                <a href="/" 
                   className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100"
                   onClick={(e) => { handleSmoothScroll(e, '/'); toggleMenu(); }}>
                  Home
                </a>
               
                {/* Destinations Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleMobileSection('destinations')}
                    className="w-full text-left text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
                  >
                    Destinations 
                    {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedMobileSection === 'destinations' && (
                    <div className="pl-4 py-2 bg-gray-50 rounded-md my-2">
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Srinagar
                      </a>
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Gulmarg
                      </a>
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Pahalgam
                      </a>
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Sonamarg
                      </a>
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Leh Ladakh
                      </a>
                      <a href="#tours" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#tours'); toggleMenu(); }}>
                        Jammu
                      </a>
                    </div>
                  )}
                </div>
  
                {/* Experiences Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleMobileSection('experiences')}
                    className="w-full text-left text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
                  >
                    Experiences 
                    {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedMobileSection === 'experiences' && (
                    <div className="pl-4 py-2 bg-gray-50 rounded-md my-2">
                      <a href="#destinations" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#destinations'); toggleMenu(); }}>
                        Shikara Rides
                      </a>
                      <a href="#destinations" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#destinations'); toggleMenu(); }}>
                        Houseboat Stays
                      </a>
                      <a href="#destinations" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#destinations'); toggleMenu(); }}>
                        Himalayan Trekking
                      </a>
                      <a href="#destinations" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#destinations'); toggleMenu(); }}>
                        Wazwan Cuisine
                      </a>
                      <a href="#destinations" 
                         className="block py-2 text-gray-700 hover:text-orange-600"
                         onClick={(e) => { handleSmoothScroll(e, '#destinations'); toggleMenu(); }}>
                        Skiing in Gulmarg
                      </a>
                    </div>
                  )}
                </div>
            
                <a href="#cars" 
                   className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100"
                   onClick={(e) => { handleSmoothScroll(e, '#cars'); toggleMenu(); }}>
                  Rent a Car
                </a>
                <Link to="/register" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
                  Agent Portal
                </Link>
  
                {!isAuthenticated ? (
                  <button 
                    onClick={openAuthModal}
                    className="mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors w-full font-medium"
                  >
                    Login / Sign Up
                  </button>
                ) : (
                  <div className="mt-6 space-y-3">
                    <div className="bg-orange-50 p-4 rounded-lg flex items-center space-x-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <User size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{displayName}</p>
                        <p className="text-sm text-gray-500">Manage your account</p>
                      </div>
                    </div>
                    <a href="/profile" className="block py-2 text-gray-800 hover:text-orange-600">
                      <div className="flex items-center space-x-2">
                        <UserCircle size={18} />
                        <span>My Profile</span>
                      </div>
                    </a>
                    <a href="/bookings" className="block py-2 text-gray-800 hover:text-orange-600">
                      <div className="flex items-center space-x-2">
                        <Calendar size={18} />
                        <span>My Bookings</span>
                      </div>
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="mt-2 w-full bg-orange-100 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-200 transition-colors font-medium flex justify-center items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </>
  );
//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               {/* <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               /> */}
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-orange-600' : 'text-orange-600'}`}>Kashmir Travels</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
              
//               {/* Destinations Dropdown */}
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   {/* <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Srinagar</a>
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Gulmarg</a>
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Pahalgam</a>
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Sonamarg</a>
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Leh Ladakh</a>
//                     <a href="/tours" className="py-2 text-gray-700 hover:text-orange-600">Jammu</a>
//                   </div> */}
//                   <div className="grid grid-cols-2 gap-2 px-4">
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Srinagar</a>
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Gulmarg</a>
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Pahalgam</a>
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Sonamarg</a>
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Leh Ladakh</a>
//   <a href="#tours" className="py-2 text-gray-700 hover:text-orange-600">Jammu</a>
// </div>

//                 </div>
//               </div>
              
//               {/* Experiences Dropdown */}
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-orange-500 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600">Shikara Rides</a>
//                   <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600">Houseboat Stays</a>
//                   <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600">Himalayan Trekking</a>
//                   <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600">Wazwan Cuisine</a>
//                   <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:text-orange-600">Skiing in Gulmarg</a>
//                 </div>
//                 <a href="#cars" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Rent a Car</a>
// <Link to="/register" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   Agent Portal
// </Link>
//               </div>
              
           
//               <a href="#cars" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Rent a Car</a>
// <Link to="/register" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   Agent Portal
// </Link>
//             </nav>
// {/* <TripPlanner/> */}
//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-orange-500 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-orange-100' : 'bg-orange-100'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     Hi, {displayName}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">My Profile</a>
//                         <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50">
//                           Login / Sign Up
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-orange-500 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>
      
//       {/* Mobile Navigation Overlay */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={toggleMenu}>
//           {/* Prevent clicks inside from closing */}
//           <div className="absolute right-0 top-0 h-full w-3/4 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
//             <div className="h-full overflow-y-auto pb-20">
//               {/* Logo and Close button */}
//               <div className="flex justify-between items-center p-4 border-b border-gray-100">
//                 <div className="flex items-center">
//                   {/* <img
//                     src="./images/logo.jpg"
//                     alt="Kashmir Travels Logo"
//                     className="h-8 w-auto mr-2"
//                   /> */}
//                   <span className="text-xl font-bold text-orange-600">Kashmir</span>
//                 </div>
                
//                 <button 
//                   onClick={toggleMenu}
//                   className="text-gray-700 hover:text-orange-600"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
            
//               <nav className="flex flex-col p-4">
//               <TripPlanner/>
//                 <a href="/" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Home</a>
               
//                 {/* Destinations Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => toggleMobileSection('destinations')}
//                     className="w-full text-left text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Destinations 
//                     {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                   </button>
//                   {expandedMobileSection === 'destinations' && (
//                     <div className="pl-4 py-2 bg-gray-50 rounded-md my-2">
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Srinagar</a>
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Gulmarg</a>
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Pahalgam</a>
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Sonamarg</a>
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Leh Ladakh</a>
//                       <a href="#tours" className="block py-2 text-gray-700 hover:text-orange-600">Jammu</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Experiences Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => toggleMobileSection('experiences')}
//                     className="w-full text-left text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Experiences 
//                     {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                   </button>
//                   {expandedMobileSection === 'experiences' && (
//                     <div className="pl-4 py-2 bg-gray-50 rounded-md my-2">
//                       <a href="#destinations" className="block py-2 text-gray-700 hover:text-orange-600">Shikara Rides</a>
//                       <a href="#destinations" className="block py-2 text-gray-700 hover:text-orange-600">Houseboat Stays</a>
//                       <a href="#destinations" className="block py-2 text-gray-700 hover:text-orange-600">Himalayan Trekking</a>
//                       <a href="#destinations" className="block py-2 text-gray-700 hover:text-orange-600">Wazwan Cuisine</a>
//                       <a href="#destinations" className="block py-2 text-gray-700 hover:text-orange-600">Skiing in Gulmarg</a>
//                     </div>
//                   )}
//                 </div>
            
// {/* 
// <Link to="/packages" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   Rent a Car
// </Link>

// <Link to="/blog" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   Travel Blog
// </Link> */}
// {/* <Link to="#cars" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   cars
// </Link> */}
// <a href="#cars" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Rent a Car</a>
// <Link to="/register" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">
//   Agent Portal
// </Link>

//                 {/* <a href="/packages" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Tour Packages</a> */}
//                 {/* <a href="/blog" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Travel Blog</a> */}
//                 {/* <a href="/contact" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Contact Us</a> */}
              
               
//                 {/* <a href="/register" className="text-gray-800 hover:text-orange-600 font-medium py-3 border-b border-gray-100">Agent Portal</a> */}
              
//                 {!isAuthenticated ? (
//                   <button 
//                     onClick={openAuthModal}
//                     className="mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors w-full font-medium"
//                   >
//                     Login / Sign Up
//                   </button>
//                 ) : (
//                   <div className="mt-6 space-y-3">
//                     <div className="bg-orange-50 p-4 rounded-lg flex items-center space-x-3">
//                       <div className="bg-orange-100 rounded-full p-2">
//                         <User size={20} className="text-orange-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium">{displayName}</p>
//                         <p className="text-sm text-gray-500">Manage your account</p>
//                       </div>
//                     </div>
//                     <a href="/profile" className="block py-2 text-gray-800 hover:text-orange-600">
//                       <div className="flex items-center space-x-2">
//                         <UserCircle size={18} />
//                         <span>My Profile</span>
//                       </div>
//                     </a>
//                     <a href="/bookings" className="block py-2 text-gray-800 hover:text-orange-600">
//                       <div className="flex items-center space-x-2">
//                         <Calendar size={18} />
//                         <span>My Bookings</span>
//                       </div>
//                     </a>
//                     <button 
//                       onClick={handleLogout}
//                       className="mt-2 w-full bg-orange-100 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-200 transition-colors font-medium flex justify-center items-center space-x-2"
//                     >
//                       <LogOut size={18} />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
};

export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context with our new simplified API
//   const { isAuthenticated, isAgent, userData, logout } = useContext(AuthContext);

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Log the auth state for debugging
//   useEffect(() => {
//     console.log("Auth state in header:", { 
//       isAuthenticated, 
//       isAgent, 
//       userData,
//       userType: isAgent ? 'AGENT' : 'REGULAR USER'
//     });
//   }, [isAuthenticated, isAgent, userData]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     setExpandedMobileSection(
//       expandedMobileSection === section ? null : section
//     );
//   };

//   // Get the username to display
//   const displayName = isAuthenticated ? (userData?.username || 'User') : 'Guest';

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
              
//               {/* Destinations Dropdown */}
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Experiences Dropdown */}
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
              
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     Hi, {displayName}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {/* This is the critical part - show different links based on user type */}
//                         {isAgent ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {/* Mobile menu profile links - also based on user type */}
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Get authentication context with our new simplified API
//   const { isAuthenticated, isAgent, userData, logout } = useContext(AuthContext);

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);


//   useEffect(() => {
//     console.log("Auth state in header:", { 
//       isAuthenticated, 
//       isAgent, 
//       userData,
//       userType: isAgent === true ? 'AGENT' : 'REGULAR USER'
//     });
//   }, [isAuthenticated, isAgent, userData]);
  
 
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     setExpandedMobileSection(
//       expandedMobileSection === section ? null : section
//     );
//   };
 
//   // Get the username to display
//   const displayName = isAuthenticated ? (userData?.username || 'User') : 'Guest';

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
              
//               {/* Destinations Dropdown */}
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Experiences Dropdown */}
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
              
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
              
//               {/* Added Register as Agent to main navigation */}
//               <a href="/register" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                 Travel Agent Portal
//               </a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     Hi, {displayName}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {/* This is the critical part - show different links based on user type */}
//                         {isAgent ? (
//                           <a href="/agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         {/* Removed "Register as Agent" from here */}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>
                  
//                   {/* Added Travel Agent Portal to mobile menu */}
//                   <a href="/register" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Agent Portal</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {/* Mobile menu profile links - also based on user type */}
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [expandedMobileSection, setExpandedMobileSection] = useState(null);

//   // Assuming you have an AuthContext
//   const { isAuthenticated, user, agent, logout } = useContext(AuthContext); 
  
//   // Fixed agent check - checks both agent existence and user properties
//   const isAgent = agent !== null || user?.type === 'agent' || user?.userType === 'agent';

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setExpandedMobileSection(null); // Reset expanded sections when toggling menu
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const toggleMobileSection = (section) => {
//     if (expandedMobileSection === section) {
//       setExpandedMobileSection(null);
//     } else {
//       setExpandedMobileSection(section);
//     }
//   };

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${user?.username || agent?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         {/* Check if user is agent using the updated logic */}
//                         {isAgent ? (
//                           <a href="/agent-Profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Agent Dashboard</a>
//                         ) : (
//                           <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         )}
//                         {/* <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a> */}
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 {/* Close button for mobile menu */}
//                 <button 
//                   onClick={toggleMenu}
//                   className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
//                 >
//                   <X size={24} />
//                 </button>
                
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('destinations')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations 
//                       {expandedMobileSection === 'destinations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'destinations' && (
//                       <div className="pl-4">
//                         <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                         <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                         <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                         <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                         <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                         <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                       </div>
//                     )}
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleMobileSection('experiences')}
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences 
//                       {expandedMobileSection === 'experiences' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedMobileSection === 'experiences' && (
//                       <div className="pl-4">
//                         <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                         <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                         <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                         <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                         <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                       </div>
//                     )}
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated ? (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   ) : (
//                     <div className="mt-4 flex flex-col space-y-3">
//                       {isAgent ? (
//                         <a href="/agent-dashboard" className="text-gray-800 hover:text-blue-600">Agent Dashboard</a>
//                       ) : (
//                         <a href="/profile" className="text-gray-800 hover:text-blue-600">My Profile</a>
//                       )}
//                       <a href="/bookings" className="text-gray-800 hover:text-blue-600">My Bookings</a>
//                       <button 
//                         onClick={handleLogout}
//                         className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={closeAuthModal} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const KashmirHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

//   // Assuming you have an AuthContext
//   const { isAuthenticated, user, logout } = useContext(AuthContext); 

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const openAuthModal = () => {
//     setIsAuthModalOpen(true);
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <>
//       <header
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 alt="Kashmir Travels Logo"
//                 className="h-11 w-auto mr-2"
//               />
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}>Kashmir</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex space-x-6">
//               <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//               <div className="relative group">
//                 <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Destinations <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <div className="grid grid-cols-2 gap-2 px-4">
//                     <a href="/destinations/srinagar" className="py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                     <a href="/destinations/gulmarg" className="py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                     <a href="/destinations/pahalgam" className="py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                     <a href="/destinations/sonamarg" className="py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                     <a href="/destinations/leh-ladakh" className="py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                     <a href="/destinations/jammu" className="py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative group">
//                 <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                   Experiences <ChevronDown size={16} className="ml-1" />
//                 </a>
//                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                   <a href="/experiences/shikara-rides" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                   <a href="/experiences/houseboats" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                   <a href="/experiences/trekking" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                   <a href="/experiences/wazwan" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                   <a href="/experiences/skiing" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                 </div>
//               </div>
//               {/* <a href="/packages" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Tour Packages</a>
//               <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//               <a href="/contact" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Contact Us</a> */}
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//                 >
//                   <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                     <User size={18} />
//                   </div>
//                   <span className="ml-2 hidden sm:inline">
//                     {isAuthenticated ? `Hi, ${user?.username || 'User'}` : 'Hi, Guest'}
//                   </span>
//                   <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                     {isAuthenticated ? (
//                       <>
//                         <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                         <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Bookings</a>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                         >
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={openAuthModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
//                           Login / Sign Up
//                         </button>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 className="lg:hidden hover:text-blue-400 focus:outline-none text-gray-700"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//               <div className="h-full overflow-y-auto pb-20">
//                 <nav className="flex flex-col p-4">
//                   <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                   {/* Destinations Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => {}} // You'll need proper toggle functionality here
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Destinations <ChevronDown size={16} />
//                     </button>
//                     <div className="pl-4">
//                       <a href="/destinations/srinagar" className="block py-2 text-gray-700 hover:text-blue-600">Srinagar</a>
//                       <a href="/destinations/gulmarg" className="block py-2 text-gray-700 hover:text-blue-600">Gulmarg</a>
//                       <a href="/destinations/pahalgam" className="block py-2 text-gray-700 hover:text-blue-600">Pahalgam</a>
//                       <a href="/destinations/sonamarg" className="block py-2 text-gray-700 hover:text-blue-600">Sonamarg</a>
//                       <a href="/destinations/leh-ladakh" className="block py-2 text-gray-700 hover:text-blue-600">Leh Ladakh</a>
//                       <a href="/destinations/jammu" className="block py-2 text-gray-700 hover:text-blue-600">Jammu</a>
//                     </div>
//                   </div>

//                   {/* Experiences Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => {}} // You'll need proper toggle functionality here
//                       className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                     >
//                       Experiences <ChevronDown size={16} />
//                     </button>
//                     <div className="pl-4">
//                       <a href="/experiences/shikara-rides" className="block py-2 text-gray-700 hover:text-blue-600">Shikara Rides</a>
//                       <a href="/experiences/houseboats" className="block py-2 text-gray-700 hover:text-blue-600">Houseboat Stays</a>
//                       <a href="/experiences/trekking" className="block py-2 text-gray-700 hover:text-blue-600">Himalayan Trekking</a>
//                       <a href="/experiences/wazwan" className="block py-2 text-gray-700 hover:text-blue-600">Wazwan Cuisine</a>
//                       <a href="/experiences/skiing" className="block py-2 text-gray-700 hover:text-blue-600">Skiing in Gulmarg</a>
//                     </div>
//                   </div>

//                   <a href="/packages" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Tour Packages</a>
//                   <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>
//                   <a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Contact Us</a>

//                   {!isAuthenticated && (
//                     <button 
//                       onClick={openAuthModal}
//                       className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       Login / Sign Up
//                     </button>
//                   )}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
      
//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={() => setIsAuthModalOpen(false)} 
//       />
//     </>
//   );
// };

// export default KashmirHeader;
// const ExpediaHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const { isAuthenticated, user, logout } = useContext(AuthContext); // Use AuthContext

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   return (
   
  
//  <header
//   className={`fixed w-full z-50 transition-all duration-300 ${
//     isScrolled ? 'bg-white shadow-md py-2 text-black' : 'bg-white shadow-md py-2 text-black'
//   }`}
 
  
// > 







//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img
//               src="./images/logo.jpg"
//               alt="WanderWise Logo"
//               className="h-11 w-auto mr-2"
//             />
//             <span className={`text-2xl font-bold ${isScrolled ? 'text-black-200' : 'text-black'}`}></span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex space-x-6">
//             <a href="/" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800 border-spacing-0'}`}>Home</a>
//             <div className="relative group">
//               <a href="/destinations" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                 Destinations <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <div className="grid grid-cols-2 gap-2 px-4">
//                   <a href="/destinations/asia" className="py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                   <a href="/destinations/europe" className="py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                   <a href="/destinations/africa" className="py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                   <a href="/destinations/americas" className="py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                   <a href="/destinations/oceania" className="py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                   <a href="/destinations/middle-east" className="py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                 </div>
//               </div>
//             </div>
//             <div className="relative group">
//               <a href="/experiences" className={`flex items-center font-medium group-hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
//                 Experiences <ChevronDown size={16} className="ml-1" />
//               </a>
//               <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
//                 <a href="/experiences/adventure" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                 <a href="/experiences/cultural" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                 <a href="/experiences/wildlife" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                 <a href="/experiences/food" className="block px-4 py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//               </div>
//             </div>
//             <a href="/deals" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Deals</a>
//             {/* <a href="/hotels" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Hotels</a> */}
//             {/* <a href="/flights" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Flights</a> */}
//             <a href="/blog" className={`font-medium hover:text-blue-400 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>Travel Blog</a>
//           </nav>

//           {/* User Actions */}
//            <div className="flex items-center space-x-4">
          
//             <div className="relative">
//               <button
//                 onClick={toggleProfileDropdown}
//                 className={`flex items-center hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
//               >
//                 <div className={`${isScrolled ? 'bg-gray-200' : 'bg-gray-200'} rounded-full p-1.5`}>
//                   <User size={18} />
//                 </div>
//                 <span className="ml-2 hidden sm:inline">
//                   {isAuthenticated ? `Hi, ${user?.username || 'User'}` : 'Hi, Guest'}
//                 </span>
//                 <ChevronDown size={16} className="ml-1" />
//               </button>

//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
//                   {isAuthenticated ? (
//                     <>
//                       <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</a>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Login</a>
//                       <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Sign Up</a>
//                       <div className="border-t border-gray-100 my-1"></div>
//                       <a href="/register-agent" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Register as Agent</a>
//                     </>
                      
                   
                  
                
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className={`lg:hidden hover:text-blue-400 focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation - with dropdowns and X button */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
//             <div className="h-full overflow-y-auto pb-20">
//               <nav className="flex flex-col p-4">
//                 <a href="/" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Home</a>

//                 {/* Destinations Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Destinations <ChevronDown size={16} />
//                   </button>
//                   <div className="pl-4">
//                     <a href="/destinations/asia" className="block py-2 text-gray-700 hover:text-blue-600">Asia</a>
//                     <a href="/destinations/europe" className="block py-2 text-gray-700 hover:text-blue-600">Europe</a>
//                     <a href="/destinations/africa" className="block py-2 text-gray-700 hover:text-blue-600">Africa</a>
//                     <a href="/destinations/americas" className="block py-2 text-gray-700 hover:text-blue-600">Americas</a>
//                     <a href="/destinations/oceania" className="block py-2 text-gray-700 hover:text-blue-600">Oceania</a>
//                     <a href="/destinations/middle-east" className="block py-2 text-gray-700 hover:text-blue-600">Middle East</a>
//                   </div>
//                 </div>

//                 {/* Experiences Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="w-full text-left text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100 flex items-center justify-between"
//                   >
//                     Experiences <ChevronDown size={16} />
//                   </button>
//                   <div className="pl-4">
//                     <a href="/experiences/adventure" className="block py-2 text-gray-700 hover:text-blue-600">Adventure Tours</a>
//                     <a href="/experiences/cultural" className="block py-2 text-gray-700 hover:text-blue-600">Cultural Experiences</a>
//                     <a href="/experiences/wildlife" className="block py-2 text-gray-700 hover:text-blue-600">Wildlife Safaris</a>
//                     <a href="/experiences/food" className="block py-2 text-gray-700 hover:text-blue-600">Food & Culinary</a>
//                   </div>
//                 </div>

//                 <a href="/deals" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Deals</a>
//                 <a href="/hotels" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Hotels</a>
//                 <a href="/flights" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Flights</a>
//                 <a href="/blog" className="text-gray-800 hover:text-blue-600 font-medium py-3 border-b border-gray-100">Travel Blog</a>

//                 <div className="mt-6 space-y-3">
//                   <a href="/wishlist" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <Heart size={20} className="mr-3" />
//                     <span>Wishlist</span>
//                   </a>
//                   <a href="/cart" className="flex items-center text-gray-800 hover:text-blue-600 py-2">
//                     <ShoppingCart size={20} className="mr-3" />
//                     <span>Cart (2 items)</span>
//                   </a>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default ExpediaHeader;