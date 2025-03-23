// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

// const BlogSection = () => {
//   const [isB, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const blogPosts = [
//     {
//       id: 1,
//       title: "10 Hidden Gems in chinab valley You Can't Miss",
//       excerpt: "Discover secret waterfalls and pristine beaches away from the tourist crowds...",
//       image: "/images/Hero.jpg",
//       author: "Sarah Walker",
//       date: "Jan 15, 2025",
//       readTime: "5 min read",
//       category: "Adventure"
//     },
//     {
//       id: 2,
//       title: "A Food Lover's Guide to Italian Countryside",
//       excerpt: "From homemade pasta to vineyard tours, experience authentic Italian cuisine...",
//       image: "/api/placeholder/800/600",
//       author: "Marco Rossi",
//       date: "Jan 18, 2025",
//       readTime: "4 min read",
//       category: "Food & Culture"
//     },
//     {
//       id: 3,
//       title: "Ultimate Safari Guide: Kenya's Wildlife",
//       excerpt: "Plan your perfect African safari with these expert tips and locations...",
//       image: "/api/placeholder/800/600",
//       author: "David Thompson",
//       date: "Jan 20, 2025",
//       readTime: "6 min read",
//       category: "Wildlife"
//     }
//   ];

//   return (
//     <section className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7.5xl mx-auto">
//         {/* Animated Header */}
//         <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </div>

//         {/* Blog Posts Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post, index) => (
//             <article 
//               key={post.id}
//               className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-1000 hover:scale-105 ${
//                 isVisible 
//                   ? 'translate-y-0 opacity-100' 
//                   : 'translate-y-10 opacity-0'
//               }`}
//               style={{ transitionDelay: `${index * 200}ms` }}
//             >
//               {/* Image Container */}
//               <div className="relative overflow-hidden h-48">
//                 <img 
//                   src={post.image} 
//                   alt={post.title}
//                   className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   {post.excerpt}
//                 </p>

//                 {/* Meta Information */}
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <User size={16} className="mr-1" />
//                   <span className="mr-4">{post.author}</span>
//                   <Calendar size={16} className="mr-1" />
//                   <span className="mr-4">{post.date}</span>
//                   <Clock size={16} className="mr-1" />
//                   <span>{post.readTime}</span>
//                 </div>

//                 {/* Read More Button */}
//                 <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
//                   Read More 
//                   <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;
// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TravelBlogPost from '../TravelBlogPost';


// const BlogSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const blogPosts = [
//     {
//       id: 1,
//       title: "10 Hidden Gems in chinab valley You Can't Miss",
//       excerpt: "Discover secret waterfalls and pristine beaches away from the tourist crowds...",
//       image: "/images/Hero.jpg",
//       author: "Sarah Walker",
//       date: "Jan 15, 2025",
//       readTime: "5 min read",
//       category: "Adventure"
//     },
//     {
//       id: 2,
//       title: "A Food Lover's Guide to Italian Countryside",
//       excerpt: "From homemade pasta to vineyard tours, experience authentic Italian cuisine...",
//       image: "/api/placeholder/800/600",
//       author: "Marco Rossi",
//       date: "Jan 18, 2025",
//       readTime: "4 min read",
//       category: "Food & Culture"
//     },
//     {
//       id: 3,
//       title: "Ultimate Safari Guide: Kenya's Wildlife",
//       excerpt: "Plan your perfect African safari with these expert tips and locations...",
//       image: "/api/placeholder/800/600",
//       author: "David Thompson",
//       date: "Jan 20, 2025",
//       readTime: "6 min read",
//       category: "Wildlife"
//     }
//   ];

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
//   };

//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//   };

//   return (
//     <section className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {/* Mobile Slider */}
//         <div className="block md:hidden relative">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.3 }}
//               className="w-full"
//             >
//               <article 
//                 className="bg-white rounded-lg shadow-lg overflow-hidden"
//                 onClick={() => handleCardClick(blogPosts[currentIndex])}
//               >
//                 <div className="relative overflow-hidden h-48">
//                   <img 
//                     src={blogPosts[currentIndex].image} 
//                     alt={blogPosts[currentIndex].title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                       {blogPosts[currentIndex].category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3">{blogPosts[currentIndex].title}</h3>
//                   <p className="text-gray-600 mb-4">{blogPosts[currentIndex].excerpt}</p>
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <User size={16} className="mr-1" />
//                     <span className="mr-4">{blogPosts[currentIndex].author}</span>
//                     <Calendar size={16} className="mr-1" />
//                     <span className="mr-4">{blogPosts[currentIndex].date}</span>
//                     <Clock size={16} className="mr-1" />
//                     <span>{blogPosts[currentIndex].readTime}</span>
//                   </div>
//                 </div>
//               </article>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handlePrev}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={handleNext}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Desktop Grid */}
//         <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post, index) => (
//             <motion.article 
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//               onClick={() => handleCardClick(post)}
//             >
//               <div className="relative overflow-hidden h-48">
//                 <img 
//                   src={post.image} 
//                   alt={post.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-3">{post.title}</h3>
//                 <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <User size={16} className="mr-1" />
//                   <span className="mr-4">{post.author}</span>
//                   <Calendar size={16} className="mr-1" />
//                   <span className="mr-4">{post.date}</span>
//                   <Clock size={16} className="mr-1" />
//                   <span>{post.readTime}</span>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>

//         {/* Render BlogPost component when a post is selected */}
//         {selectedPost && <TravelBlogPost post={selectedPost} onClose={() => setSelectedPost(null)} />}
//       </div>
//     </section>
//   );
// };

// export default BlogSection;
// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TravelBlogPost from './TravelBlogPost';

// const BlogSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeView, setActiveView] = useState('blog-list');
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const [blogPosts, setBlogPosts] = useState([]);

//   // useEffect(() => {
//   //   setIsVisible(true);
//   // }, []);



  
//   useEffect(() => {
//     setIsVisible(true);
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/posts');
//       const data = await response.json();
//       setBlogPosts(data);
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//     }
//   };


//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
//   };

//   const handleCardClick = (postId) => {
//     setSelectedPostId(postId);
//     setActiveView(`blog-post-${postId}`);
//   };

//   const handleBackClick = () => {
//     setActiveView('blog-list');
//     setSelectedPostId(null);
//   };

//   const renderBlogPost = () => {
//     switch (selectedPostId) {
//       case 1:
//         return <TravelBlogPost />;
//       case 2:
//         return <TravelBlogPost />;
//       case 3:
//         return <TravelBlogPost />;
//       default:
//         return null;
//     }
//   };

//   if (activeView !== 'blog-list') {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-gray-50 p-4"
//       >
//         <button
//           onClick={handleBackClick}
//           className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ArrowLeft className="mr-2" />
//           Back to Blog
//         </button>
//         {renderBlogPost()}
//       </motion.div>
//     );
//   }

//   return (
//     <section id='blogs' className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {/* Mobile Slider */}
//         <div className="block md:hidden relative">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.3 }}
//               className="w-full"
//             >
//               <article 
//                 className="bg-white rounded-lg shadow-lg overflow-hidden"
//                 onClick={() => handleCardClick(blogPosts[currentIndex].id)}
//               >
//                 <div className="relative overflow-hidden h-48">
//                   <img 
//                     src={blogPosts[currentIndex].image} 
//                     alt={blogPosts[currentIndex].title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                       {blogPosts[currentIndex].category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3">{blogPosts[currentIndex].title}</h3>
//                   <p className="text-gray-600 mb-4">{blogPosts[currentIndex].excerpt}</p>
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <User size={16} className="mr-1" />
//                     <span className="mr-4">{blogPosts[currentIndex].author}</span>
//                     <Calendar size={16} className="mr-1" />
//                     <span className="mr-4">{blogPosts[currentIndex].date}</span>
//                     <Clock size={16} className="mr-1" />
//                     <span>{blogPosts[currentIndex].readTime}</span>
//                   </div>
//                 </div>
//               </article>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handlePrev}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={handleNext}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Desktop Grid */}
//         <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post, index) => (
//             <motion.article 
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//               onClick={() => handleCardClick(post.id)}
//             >
//               <div className="relative overflow-hidden h-48">
//                 <img 
//                   src={post.image} 
//                   alt={post.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-3">{post.title}</h3>
//                 <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <User size={16} className="mr-1" />
//                   <span className="mr-4">{post.author}</span>
//                   <Calendar size={16} className="mr-1" />
//                   <span className="mr-4">{post.date}</span>
//                   <Clock size={16} className="mr-1" />
//                   <span>{post.readTime}</span>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;


// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TravelBlogPost from './TravelBlogPost';

// const BlogSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeView, setActiveView] = useState('blog-list');
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const [blogPosts, setBlogPosts] = useState([]);

//   useEffect(() => {
//     setIsVisible(true);
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/posts');
//       const data = await response.json();
//       setBlogPosts(data);
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//     }
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
//   };

//   const handleCardClick = (postId) => {
//     setSelectedPostId(postId);
//     setActiveView(`blog-post-${postId}`);
//   };

//   const handleBackClick = () => {
//     setActiveView('blog-list');
//     setSelectedPostId(null);
//   };

//   if (activeView !== 'blog-list') {
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 p-4">
//         <button onClick={handleBackClick} className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors">
//           <ArrowLeft className="mr-2" />
//           Back to Blog
//         </button>
//         <TravelBlogPost postId={selectedPostId} />
//       </motion.div>
//     );
//   }

//   return (
//     <section id='blogs' className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {blogPosts.length > 0 ? (
//           <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogPosts.map((post, index) => (
//               <motion.article 
//                 key={post.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//                 onClick={() => handleCardClick(post.id)}
//               >
//                 <div className="relative overflow-hidden h-48">
//                   <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                       {post.category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3">{post.title}</h3>
//                   <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <User size={16} className="mr-1" />
//                     <span className="mr-4">{post.author}</span>
//                     <Calendar size={16} className="mr-1" />
//                     <span className="mr-4">{post.date}</span>
//                     <Clock size={16} className="mr-1" />
//                     <span>{post.readTime}</span>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Loading blog posts...</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BlogSection;



// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TravelBlogPost from './TravelBlogPost';

// const BlogSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeView, setActiveView] = useState('blog-list');
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const [blogPosts, setBlogPosts] = useState([]);

//   // useEffect(() => {
//   //   setIsVisible(true);
//   // }, []);



  
//   useEffect(() => {
//     setIsVisible(true);
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/posts');
//       const data = await response.json();
//       setBlogPosts(data);
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//     }
//   };


//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
//   };

//   const handleCardClick = (postId) => {
//     setSelectedPostId(postId);
//     setActiveView(`blog-post-${postId}`);
//   };

//   const handleBackClick = () => {
//     setActiveView('blog-list');
//     setSelectedPostId(null);
//   };

//   const renderBlogPost = () => {
//     switch (selectedPostId) {
//       case 1:
//         return <TravelBlogPost />;
//       case 2:
//         return <TravelBlogPost />;
//       case 3:
//         return <TravelBlogPost />;
//       default:
//         return null;
//     }
//   };

//   if (activeView !== 'blog-list') {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-gray-50 p-4"
//       >
//         <button
//           onClick={handleBackClick}
//           className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ArrowLeft className="mr-2" />
//           Back to Blog
//         </button>
//         {renderBlogPost()}
//       </motion.div>
//     );
//   }

//   return (
//     <section id='blogs' className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {/* Mobile Slider */}
//         <div className="block md:hidden relative">
//           {blogPosts.length > 0 ? (
//             <>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentIndex}
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.3 }}
//                   className="w-full"
//                 >
//                   <article 
//                     className="bg-white rounded-lg shadow-lg overflow-hidden"
//                     onClick={() => blogPosts[currentIndex] && handleCardClick(blogPosts[currentIndex]?.id)}
//                   >
//                     <div className="relative overflow-hidden h-48">
//                       <img 
//                         src={blogPosts[currentIndex]?.image} 
//                         alt={blogPosts[currentIndex]?.title}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-4 left-4">
//                         <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                           {blogPosts[currentIndex]?.category}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold mb-3">{blogPosts[currentIndex]?.title}</h3>
//                       <p className="text-gray-600 mb-4">{blogPosts[currentIndex]?.excerpt}</p>
//                       <div className="flex items-center text-sm text-gray-500 mb-4">
//                         <User size={16} className="mr-1" />
//                         <span className="mr-4">{blogPosts[currentIndex]?.author}</span>
//                         <Calendar size={16} className="mr-1" />
//                         <span className="mr-4">{blogPosts[currentIndex]?.date}</span>
//                         <Clock size={16} className="mr-1" />
//                         <span>{blogPosts[currentIndex]?.readTime}</span>
//                       </div>
//                     </div>
//                   </article>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Navigation Buttons */}
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={handlePrev}
//                   className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-8">Loading...</div>
//           )}
//         </div>

//         {/* Desktop Grid */}
//         <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post, index) => (
//             <motion.article 
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//               onClick={() => handleCardClick(post.id)}
//             >
//               <div className="relative overflow-hidden h-48">
//                 <img 
//                   src={post.image} 
//                   alt={post.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-3">{post.title}</h3>
//                 <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <User size={16} className="mr-1" />
//                   <span className="mr-4">{post.author}</span>
//                   <Calendar size={16} className="mr-1" />
//                   <span className="mr-4">{post.date}</span>
//                   <Clock size={16} className="mr-1" />
//                   <span>{post.readTime}</span>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;



// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TravelBlogPost from './TravelBlogPost';

// const BlogSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeView, setActiveView] = useState('blog-list');
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const [blogPosts, setBlogPosts] = useState([]);

//   useEffect(() => {
//     setIsVisible(true);
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/posts');
//       const data = await response.json();
//       setBlogPosts(data);
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//     }
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
//   };

// ;
//   const renderBlogPost = () => {
//     const selectedPost = blogPosts.find((post) => post.id === selectedPostId);
//     if (!selectedPost) return <p className="text-center text-gray-600">Blog post not found.</p>;
  
//     return <TravelBlogPost post={selectedPost} />;
//   };
  

//   if (activeView !== 'blog-list') {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-gray-50 p-4"
//       >
//         <button
//           onClick={handleBackClick}
//           className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ArrowLeft className="mr-2" />
//           Back to Blog
//         </button>
//         {renderBlogPost()}
//       </motion.div>
//     );
//   }

//   return (
//     <section id='blogs' className="py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {/* Mobile Slider */}
//         <div className="block md:hidden relative">
//           <AnimatePresence mode="wait">
//             {blogPosts.length > 0 && (
//               <motion.div
//                 key={blogPosts[currentIndex].id}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.3 }}
//                 className="w-full"
//               >
//                 <article 
//                   className="bg-white rounded-lg shadow-lg overflow-hidden"
//                   onClick={() => handleCardClick(blogPosts[currentIndex].id)}
//                 >
//                   <div className="relative overflow-hidden h-48">
//                     <img 
//                       src={blogPosts[currentIndex].image} 
//                       alt={blogPosts[currentIndex].title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute top-4 left-4">
//                       <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                         {blogPosts[currentIndex].category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold mb-3">{blogPosts[currentIndex].title}</h3>
//                     <p className="text-gray-600 mb-4">{blogPosts[currentIndex].excerpt}</p>
//                     <div className="flex items-center text-sm text-gray-500 mb-4">
//                       <User size={16} className="mr-1" />
//                       <span className="mr-4">{blogPosts[currentIndex].author}</span>
//                       <Calendar size={16} className="mr-1" />
//                       <span className="mr-4">{blogPosts[currentIndex].date}</span>
//                       <Clock size={16} className="mr-1" />
//                       <span>{blogPosts[currentIndex].readTime}</span>
//                     </div>
//                   </div>
//                 </article>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handlePrev}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={handleNext}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Desktop Grid */}
//         <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.length > 0 ? (
//             blogPosts.map((post, index) => (
//               <motion.article 
//                 key={post.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//                 onClick={() => handleCardClick(post.id)}
//               >
//                 <div className="relative overflow-hidden h-48">
//                   <img 
//                     src={post.image} 
//                     alt={post.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//                       {post.category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3">{post.title}</h3>
//                   <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <User size={16} className="mr-1" />
//                     <span className="mr-4">{post.author}</span>
//                     <Calendar size={16} className="mr-1" />
//                     <span className="mr-4">{post.date.trim()}</span>
//                     <Clock size={16} className="mr-1" />
//                     <span>{post.readTime}</span>
//                   </div>
//                 </div>
//               </motion.article>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No blog posts available.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { Loader, Heart, Share2, ChevronDown, Info, Calendar, Clock, User, ChevronLeft, ChevronRight, Pause, Play, Filter, Star, MapPin, ArrowLeft, Book } from 'lucide-react';
// import TravelBlogPost from './TravelBlogPost';

// const BlogSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoplayIntervalRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeView, setActiveView] = useState('blog-list');
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const autoplayInterval = 5000;

//   useEffect(() => {
//     fetchPosts();
    
//     // Check for mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('http://localhost:5000/api/posts');
//       if (response.data) {
//         setBlogPosts(response.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch blog posts');
//       console.error('Error fetching blog posts:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCardClick = (postId) => {
//     setSelectedPostId(postId);
//     setActiveView('blog-post');
//   };

//   const handleBackClick = () => {
//     setActiveView('blog-list');
//     setSelectedPostId(null);
//   };

//   const toggleFilter = () => {
//     setFilterOpen(!filterOpen);
//   };

//   const handleCategoryToggle = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter(c => c !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   const filteredPosts = useMemo(() => {
//     return blogPosts.filter(post => {
//       // Search term filter
//       const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Category filter - if no categories selected, show all
//       const matchesCategory = selectedCategories.length === 0 || 
//                               (post.category && selectedCategories.includes(post.category));
      
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchTerm, blogPosts, selectedCategories]);

//   // Reset index when filtered posts change
//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [filteredPosts]);

//   // Navigation functions
//   const handleNextPost = () => {
//     setCurrentIndex((prevIndex) => 
//       (prevIndex + 1) % filteredPosts.length
//     );
//   };

//   const handlePreviousPost = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? filteredPosts.length - 1 : prevIndex - 1
//     );
//   };

//   // Autoplay management
//   const startAutoplay = () => {
//     if (autoplayIntervalRef.current) {
//       clearInterval(autoplayIntervalRef.current);
//     }
    
//     autoplayIntervalRef.current = setInterval(() => {
//       if (!isAutoplayPaused && filteredPosts.length > 0) {
//         handleNextPost();
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
//   }, [isAutoplayPaused, filteredPosts]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowRight') handleNextPost();
//       if (e.key === 'ArrowLeft') handlePreviousPost();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Toggle autoplay
//   const toggleAutoplay = () => {
//     setIsAutoplayPaused(prev => !prev);
//   };

//   // Compute visible posts for desktop
//   const visiblePosts = useMemo(() => {
//     const visibleCards = isMobile ? 1 : 3;
//     return filteredPosts.slice(currentIndex, currentIndex + visibleCards)
//       .concat(filteredPosts.slice(0, Math.max(0, visibleCards - (filteredPosts.length - currentIndex))));
//   }, [currentIndex, filteredPosts, isMobile]);

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
//         <p className="text-gray-600">Loading blog posts...</p>
//       </div>
//     </div>
//   );

//   const ErrorState = () => (
//     <div className="flex items-center justify-center h-64">
//       <div className="text-center space-y-4">
//         <p className="text-red-500">{error}</p>
//         <button 
//           onClick={fetchPosts}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const EmptyState = () => (
//     <div className="text-center p-8">
//       <p className="text-gray-500 text-lg">No blog posts found matching your search.</p>
//       <div className="mt-4 flex flex-col items-center gap-2">
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm('')}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Clear search term
//           </button>
//         )}
//         {selectedCategories.length > 0 && (
//           <button
//             onClick={() => setSelectedCategories([])}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Clear category filters
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   const BlogPostCard = ({ post, isSlider = false }) => {
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
//         onClick={() => handleCardClick(post.id)}
//       >
//         <div className="relative group">
//           <motion.img 
//             src={post.image}
//             alt={post.title} 
//             className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           />
          
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
//           <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//             {post.category || "Travel"}
//           </div>

//           <div className="absolute top-4 right-4 flex space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsLiked(!isLiked);
//               }}
//               className={`p-2 rounded-full backdrop-blur-sm ${
//                 isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={(e) => e.stopPropagation()}
//               className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
//             >
//               <Share2 className="w-5 h-5" />
//             </motion.button>
//           </div>

//           <div className="absolute bottom-4 left-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {post.readTime}
//           </div>

//           {post.location && (
//             <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
//               <MapPin className="w-3 h-3" />
//               {post.location}
//             </div>
//           )}
//         </div>

//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h2 className={`${
//                 isSlider ? 'text-2xl' : 'text-xl'
//               } font-bold text-gray-800`}>
//                 {post.title}
//               </h2>
//               <div className="flex items-center mt-1">
//                 <User className="w-4 h-4 text-orange-500" />
//                 <span className="ml-1 text-sm text-gray-600">
//                   {post.author}
//                 </span>
//                 <span className="mx-2 text-gray-400">•</span>
//                 <Calendar className="w-4 h-4 text-orange-500" />
//                 <span className="ml-1 text-sm text-gray-600">
//                   {post.date}
//                 </span>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowDetails(!showDetails);
//               }}
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
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                 <div className="flex items-center justify-start space-x-2 text-sm text-gray-500 mb-6">
//                   <Info className="w-4 h-4" />
//                   <span>Published on {post.date}</span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.button
//             whileHover={{ scale: 1.02, backgroundColor: '#EA580C' }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
//               shadow-lg shadow-orange-200 hover:shadow-orange-300
//               ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
//               flex items-center justify-center gap-2
//             `}
//           >
//             <Book className="w-5 h-5" />
//             Read Full Story
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const renderBlogPost = () => {
//     const selectedPost = blogPosts.find((post) => post.id === selectedPostId);
//     if (!selectedPost) return <p className="text-center text-gray-600">Blog post not found.</p>;

//     return <TravelBlogPost post={selectedPost} />;
//   };

//   if (activeView !== 'blog-list') {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-orange-50 p-4"
//       >
//         <button
//           onClick={handleBackClick}
//           className="flex items-center mb-6 text-orange-600 hover:text-orange-800 transition-colors"
//         >
//           <ArrowLeft className="mr-2" />
//           Back to Blog
//         </button>
//         {renderBlogPost()}
//       </motion.div>
//     );
//   }

//   // Render loading, error, and empty states
//   if (loading) return <LoadingState />;
//   if (error) return <ErrorState />;
//   if (filteredPosts.length === 0) return <EmptyState />;

//   const categories = [...new Set(blogPosts.filter(post => post.category).map(post => post.category))];

//   return (
//     <section id="blogs" className="py-16 px-4 md:px-8 bg-orange-50">
//       <div className="container mx-auto w-full max-w-7xl">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Travel Stories & Tips</h2>
//           <p className="text-gray-600 text-center max-w-2xl mx-auto">
//             Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
//           </p>
//         </motion.div>

//         {/* Search and Filter */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative w-full md:w-2/3">
//               <input
//                 type="text"
//                 placeholder="Search blog posts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//             <button 
//               onClick={toggleFilter}
//               className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters {filterOpen ? '▲' : '▼'}
//             </button>
//           </div>

//           {/* Filters Panel */}
//           <AnimatePresence>
//             {filterOpen && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="overflow-hidden bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md"
//               >
//                 <div>
//                   <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     {categories.map((category) => (
//                       <label key={category} className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={selectedCategories.includes(category)}
//                           onChange={() => handleCategoryToggle(category)}
//                           className="rounded text-orange-500 focus:ring-orange-500"
//                         />
//                         <span className="text-gray-700">{category}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Desktop View - Grid Layout */}
//         {!isMobile && (
//           <div className="relative w-full">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {visiblePosts.map((post, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <BlogPostCard post={post} />
//                 </motion.div>
//               ))}
//             </div>

//             {/* Navigation Buttons */}
//             <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
//               <button
//                 onClick={handlePreviousPost}
//                 className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//                 aria-label="Previous Post"
//               >
//                 <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//               </button>
//               <button
//                 onClick={handleNextPost}
//                 className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//                 aria-label="Next Post"
//               >
//                 <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Mobile View - Carousel */}
//         {isMobile && (
//           <div className="relative"
//             onMouseEnter={() => setIsAutoplayPaused(true)}
//             onMouseLeave={() => setIsAutoplayPaused(false)}
//           >
//             <AnimatePresence initial={false} custom={currentIndex}>
//               <motion.div
//                 key={currentIndex}
//                 variants={sliderVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 custom={currentIndex}
//               >
//                 <BlogPostCard post={filteredPosts[currentIndex]} isSlider />
//               </motion.div>
//             </AnimatePresence>
            
//             {/* Mobile Controls */}
//             <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
//               <button
//                 onClick={handlePreviousPost}
//                 className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//                 aria-label="Previous Post"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-700" />
//               </button>
//               <button
//                 onClick={handleNextPost}
//                 className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//                 aria-label="Next Post"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-700" />
//               </button>
//             </div>

//             {/* Autoplay Toggle */}
//             <button
//               onClick={toggleAutoplay}
//               className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//               aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
//             >
//               {isAutoplayPaused ? (
//                 <Play className="w-4 h-4 text-gray-700" />
//               ) : (
//                 <Pause className="w-4 h-4 text-gray-700" />
//               )}
//             </button>
//           </div>
//         )}

//         {/* Navigation Dots */}
//         <div className="flex justify-center mt-6 space-x-2">
//           {filteredPosts.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`
//                 transition-all duration-300 
//                 ${index === currentIndex 
//                   ? 'bg-orange-500 w-6 rounded-full' 
//                   : 'bg-gray-300 w-2 rounded-full'}
//                 h-2
//               `}
//               aria-label={`Go to post ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;
import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { Loader, Heart, Share2, ChevronDown, Info, Calendar, Clock, User, ChevronLeft, ChevronRight, Pause, Play, Filter, Star, MapPin, ArrowLeft, Book } from 'lucide-react';
import TravelBlogPost from './TravelBlogPost';

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('blog-list');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const autoplayInterval = 5000;

  useEffect(() => {
    fetchPosts();
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get('https://backend-1-7zwm.onrender.com/api/posts');
  
      if (response.data) {
        setBlogPosts(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // const fetchPosts = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.get('http://localhost:5000/api/posts');
  //     if (response.data) {
  //       setBlogPosts(response.data);
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message || 'Failed to fetch blog posts');
  //     console.error('Error fetching blog posts:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleCardClick = (postId) => {
  //   setSelectedPostId(postId);
  //   setActiveView('blog-post');
  // };
  // const handleCardClick = (id) => {
  //   // Map of blog IDs to post IDs for proper matching
  //   const idMapping = {
  //     // Blog IDs mapped to Post IDs
  //     '67b7ee4f1f64171d40439d97': '67b84fb125a780ad630cab22',
  //     '67a5a8f56657f1fe9ab87c7c': '67b84cbe25a780ad630caaf1',
  //     '67a5a7406657f1fe9ab87c6b': '67b847eb25a780ad630ca8a9'
  //   };
    
  //   // If we're clicking a blog ID, get the associated post ID
  //   const postId = idMapping[id] || id;
    
  //   setSelectedPostId(postId);
  //   setActiveView('blog-post');
  // };
  const handleCardClick = (id) => {
    // Map of post IDs to blog IDs for proper matching
    const idMapping = {
      // Post IDs mapped to Blog IDs (now using _id)
      '67b84fb125a780ad630cab22': '67b7ee4f1f64171d40439d97',
      '67b84cbe25a780ad630caaf1': '67a5a8f56657f1fe9ab87c7c',
      '67b847eb25a780ad630ca8a9': '67a5a7406657f1fe9ab87c6b'
    };
    
    // If we're clicking a post ID, get the associated blog ID
    const blogId = idMapping[id] || id;
    
    setSelectedPostId(blogId);
    setActiveView('blog-post');
  };
  const handleBackClick = () => {
    setActiveView('blog-list');
    setSelectedPostId(null);
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

  
  // const filteredPosts = useMemo(() => {
  //   const uniquePosts = new Map();
  
  //   blogPosts.forEach((post) => {
  //     const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
  
  //     const matchesCategory = selectedCategories.length === 0 ||
  //       (post.category && selectedCategories.includes(post.category));
  
  //     if (matchesSearch && matchesCategory) {
  //       uniquePosts.set(post.id || post._id, post); // Ensure uniqueness using post ID
  //     }
  //   });
  
  //   return Array.from(uniquePosts.values());
  // }, [searchTerm, blogPosts, selectedCategories]);
  const filteredPosts = useMemo(() => {
    const uniquePosts = new Map();
  
    blogPosts.forEach((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesCategory = selectedCategories.length === 0 ||
        (post.category && selectedCategories.includes(post.category));
  
      if (matchesSearch && matchesCategory) {
        uniquePosts.set(post.id || post._id, post); // Ensure uniqueness using post ID
      }
    });
  
    return Array.from(uniquePosts.values());
  }, [searchTerm, blogPosts, selectedCategories]);
  useEffect(() => {
    // Reset currentIndex when filter changes
    // But ensure it doesn't go out of bounds
    const maxIndex = Math.max(0, filteredPosts.length - 1);
    setCurrentIndex(prev => prev > maxIndex ? maxIndex : 0);
  }, [filteredPosts]);
  // const visiblePosts = useMemo(() => {
  //   const visibleCards = isMobile ? 1 : 3;
  //   if (filteredPosts.length === 0) return [];
    
  //   return filteredPosts.slice(currentIndex, currentIndex + visibleCards)
  //     .concat(filteredPosts.slice(0, Math.max(0, visibleCards - (filteredPosts.length - currentIndex))));
  // }, [currentIndex, filteredPosts, isMobile]);


  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredPosts]);

  const handleNextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPosts.length);
  };

  const handlePreviousPost = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredPosts.length - 1 : prevIndex - 1
    );
  };

  const startAutoplay = () => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      if (!isAutoplayPaused && filteredPosts.length > 0) handleNextPost();
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [isAutoplayPaused, filteredPosts]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextPost();
      if (e.key === 'ArrowLeft') handlePreviousPost();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleAutoplay = () => setIsAutoplayPaused(prev => !prev);

  // const visiblePosts = useMemo(() => {
  //   const visibleCards = isMobile ? 1 : 3;
  //   return filteredPosts.slice(currentIndex, currentIndex + visibleCards)
  //     .concat(filteredPosts.slice(0, Math.max(0, visibleCards - (filteredPosts.length - currentIndex))));
  // }, [currentIndex, filteredPosts, isMobile]);
  const visiblePosts = useMemo(() => {
    if (filteredPosts.length === 0) return [];
    
    const visibleCards = isMobile ? 1 : Math.min(3, filteredPosts.length);
    const result = [];
    
    // Only show actual posts, never duplicate them
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % filteredPosts.length;
      result.push(filteredPosts[index]);
    }
    
    return result;
  }, [currentIndex, filteredPosts, isMobile]);
  const LoadingState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Loading blog posts...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchPosts}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center p-8">
      <p className="text-gray-500 text-lg">No blog posts found matching your search.</p>
      <div className="mt-4 flex flex-col items-center gap-2">
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-orange-500 hover:text-orange-600">
            Clear search term
          </button>
        )}
        {selectedCategories.length > 0 && (
          <button onClick={() => setSelectedCategories([])} className="text-orange-500 hover:text-orange-600">
            Clear category filters
          </button>
        )}
      </div>
    </div>
  );

  const BlogPostCard = ({ post, isSlider = false }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    return (
      <div className={`bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl overflow-hidden  ${
        isSlider ? 'max-w-lg mx-auto' : ''
      } border border-orange-100 hover:border-orange-200 transition-all duration-300`}>
        <div className="relative group">
          <img 
            src={post.image}
            alt={post.title} 
            className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
          />
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {post.category || "Travel"}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>

          {post.location && (
            <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {post.location}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`${isSlider ? 'text-2xl' : 'text-xl'} font-bold text-gray-800`}>
                {post.title}
              </h2>
              <div className="flex items-center mt-1">
                <User className="w-4 h-4 text-orange-500" />
                <span className="ml-1 text-sm text-gray-600">{post.author}</span>
                <span className="mx-2 text-gray-400">•</span>
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="ml-1 text-sm text-gray-600">{post.date}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="text-orange-500 hover:text-orange-600"
            >
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${
                showDetails ? 'rotate-180' : ''
              }`} />
            </button>
          </div>

          {showDetails && (
            <div className="overflow-hidden">
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-start space-x-2 text-sm text-gray-500 mb-6">
                <Info className="w-4 h-4" />
                <span>Published on {post.date}</span>
              </div>
            </div>
          )}

          {/* <button className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
            shadow-lg hover:shadow-orange-300 ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
            flex items-center justify-center gap-2 transition-all`}>
            <Book className="w-5 h-5" />
            Read Full Story
          </button> */}
          <button 
            onClick={() => handleCardClick(post.id || post._id)}
            className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
              shadow-lg hover:shadow-orange-300 ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
              flex items-center justify-center gap-2 transition-all`}
          >
            <Book className="w-5 h-5" />
            Read Full Story
          </button>
           
        </div>
      </div>
    );
  };


  // const renderBlogPost = () => {
  //   const selectedPost = blogPosts.find((post) => post.id === selectedPostId);
  //   if (!selectedPost) return <p className="text-center text-gray-600">Blog post not found.</p>;
  //   return <TravelBlogPost post={selectedPost} />;
  // };
  // const renderBlogPost = () => {
  //   // Use our consistent postId field for comparison
  //   const selectedPost = blogPosts.find(post => post.postId === selectedPostId);
    
  //   if (!selectedPost) {
  //     console.error("Post not found with ID:", selectedPostId);
  //     console.log("Available post IDs:", blogPosts.map(p => ({ id: p.id, _id: p._id, postId: p.postId })));
  //     return (
  //       <div className="text-center text-gray-600">
  //         <p>Blog post not found.</p>
  //         <p className="mt-4">Post ID: {selectedPostId}</p>
  //       </div>
  //     );
  //   }
    
  //   return <TravelBlogPost post={selectedPost} />;
  // };
  
// Updated renderBlogPost function to handle different ID formats
const renderBlogPost = () => {
  // First try to find the post by postId
  let selectedPost = blogPosts.find(post => post.postId === selectedPostId);
  
  // If not found, try other ID formats
  if (!selectedPost) {
    selectedPost = blogPosts.find(post => 
      post.id === selectedPostId || 
      post._id === selectedPostId ||
      (post.blogId && post.blogId === selectedPostId)
    );
  }
  
  if (!selectedPost) {
    console.error("Post not found with ID:", selectedPostId);
    console.log("Available post IDs:", blogPosts.map(p => ({ 
      id: p.id, 
      _id: p._id, 
      postId: p.postId,
      blogId: p.blogId
    })));
    
    return (
      <div className="text-center text-gray-600">
        <p>Blog post not found.</p>
        <p className="mt-4">Post ID: {selectedPostId}</p>
      </div>
    );
  }
  
  return <TravelBlogPost path post={selectedPost} />;
};

// Updated handleCardClick function to handle ID mapping




  if (activeView !== 'blog-list') {
    return (
      <div className="min-h-screen bg-orange-50 p-4">
        <button
          onClick={handleBackClick}
          className="flex items-center mb-6 text-orange-600 hover:text-orange-800 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Blog
        </button>
        {renderBlogPost()}
      </div>
    );
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (filteredPosts.length === 0) return <EmptyState />;

  const categories = [...new Set(blogPosts.filter(post => post.category).map(post => post.category))];
  console.log("Filtered Posts: ", filteredPosts);

  return (
    <section id="blogs" className="py-16 px-4 md:px-8 bg-orange-50">
      <div className="container mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Travel Stories & Tips</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover inspiring stories, expert tips, and hidden gems from our global community of travelers
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search blog posts..."
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

          {filterOpen && (
            <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map((category) => (
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
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="relative w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visiblePosts.map((post, index) => (
                <div key={index}>
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
              <button
                onClick={handlePreviousPost}
                className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
              </button>
              <button
                onClick={handleNextPost}
                className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
              </button>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="relative">
            <BlogPostCard post={filteredPosts[currentIndex]} isSlider />
            
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
              <button
                onClick={handlePreviousPost}
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleNextPost}
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <button
              onClick={toggleAutoplay}
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              {isAutoplayPaused ? (
                <Play className="w-4 h-4 text-gray-700" />
              ) : (
                <Pause className="w-4 h-4 text-gray-700" />
              )}
            </button>
          </div>
        )}

        <div className="flex justify-center mt-6 space-x-2">
          {filteredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 h-2 ${
                index === currentIndex 
                  ? 'bg-orange-500 w-6 rounded-full' 
                  : 'bg-gray-300 w-2 rounded-full'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;