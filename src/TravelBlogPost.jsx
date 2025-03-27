
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   ChevronRight,
//   MapPin,
//   Calendar,
//   Clock,
//   Heart,
//   Mountain,
//   TreeDeciduous,
//   Waves
// } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);

//   const handleLike = () => {
//     if (isLiked) {
//       setLikes(likes - 1);
//       setIsLiked(false);
//     } else {
//       setLikes(likes + 1);
//       setIsLiked(true);
//     }
//   };

//   const travelHighlights = [
//     {
//       title: "Baisaran Valley",
//       description:
//         "Known as 'Mini Switzerland,' Baisaran Valley is surrounded by dense pine forests and offers lush green meadows with breathtaking views of the snow-capped mountains.",
//       icon: Mountain
//     },
//     {
//       title: "Aru Valley",
//       description:
//         "A serene village located 12 km from Pahalgam, Aru Valley is a hub for trekking, camping, and fishing in the Lidder River amidst verdant landscapes.",
//       icon: TreeDeciduous
//     },
//     {
//       title: "Betaab Valley",
//       description:
//         "Famous for its Bollywood connection, Betaab Valley is an idyllic spot with crystal-clear streams, lush meadows, and a backdrop of majestic mountains.",
//       icon: Waves
//     }
//   ];

//   const recommendedActivities = [
//     "Enjoy a pony ride to explore the picturesque surroundings",
//     "Go river rafting in the Lidder River",
//     "Take a scenic hike to Kolahoi Glacier",
//     "Visit the ancient Mamaleshwar Temple",
//     "Camp under the stars in Aru Valley"
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50"
//     >
//       {/* Header with Enhanced Content */}
//       <motion.header
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
//           Pahalgam: A Gateway to Kashmir's Natural Splendor
//         </h1>
//         <p className="text-xl text-teal-700 max-w-3xl mx-auto">
//           Discover the tranquility of Pahalgam, where pristine rivers, lush meadows, and majestic mountains create a paradise on Earth.
//         </p>

//         {/* Meta Information */}
//         <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//           <div className="flex items-center">
//             <MapPin className="mr-2" />
//             <span>Pahalgam, Kashmir, India</span>
//           </div>
//           <div className="flex items-center">
//             <Calendar className="mr-2" />
//             <span>August 10-17, 2024</span>
//           </div>
//           <div className="flex items-center">
//             <Clock className="mr-2" />
//             <span>7 Days Adventure</span>
//           </div>
//         </div>
//       </motion.header>

//       {/* Featured Image */}
//       <motion.figure
//         whileHover={{ scale: 1.02 }}
//         className="mb-12 rounded-xl overflow-hidden shadow-2xl group"
//       >
//         <img
//           src="/images/Hero.jpg"
//           alt="Pahalgam Landscape"
//           className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
//           Serene beauty of Betaab Valley, Pahalgam
//         </figcaption>
//       </motion.figure>

//       {/* Highlights Section */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         {travelHighlights.map((highlight, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white/70 p-6 rounded-xl shadow-md"
//           >
//             <div className="flex items-center mb-4">
//               <highlight.icon className="w-8 h-8 text-teal-600 mr-4" />
//               <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//             </div>
//             <p className="text-gray-700">{highlight.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Detailed Narrative Section */}
//       <motion.article
//         className="prose lg:prose-xl max-w-full mb-12"
//         initial="hidden"
//         whileInView="visible"
//       >
//         <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">
//           Journey Into the Heart of Nature
//         </h2>
//         <p className="text-lg text-gray-800 leading-relaxed">
//           Pahalgam offers a retreat into nature's lap, where the serenity of the valleys and the charm of the mountains create an unforgettable experience. A favorite destination for nature lovers and adventurers alike, Pahalgam showcases Kashmir's unmatched beauty.
//         </p>

//         <h3 className="text-2xl text-teal-800 mt-8 mb-4">Immersive Activities in Pahalgam</h3>
//         <div className="bg-white/60 p-6 rounded-xl">
//           <h4 className="text-xl font-semibold text-teal-700 mb-4">Must-Do Activities</h4>
//           <ul className="space-y-3">
//             {recommendedActivities.map((activity, index) => (
//               <li key={index} className="flex items-center">
//                 <ChevronRight className="text-teal-600 mr-3" />
//                 <span>{activity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </motion.article>

//       {/* Like Section */}
//       <motion.div
//         className="flex justify-center items-center my-8"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <button
//           onClick={handleLike}
//           className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//             isLiked
//               ? "bg-red-500 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           <Heart
//             className={`w-6 h-6 ${isLiked ? "text-white" : "text-gray-500"}`}
//             fill={isLiked ? "currentColor" : "none"}
//           />
//           <span>{isLiked ? "Loved!" : "Love this post"}</span>
//           {likes > 0 && (
//             <span className="ml-2 text-sm">{likes}</span>
//           )}
//         </button>
//       </motion.div>

//       {/* Call to Action */}
//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-black p-8 rounded-xl text-center"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Pahalgam Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty of Pahalgam and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className=" text-teal-400 px-10 py-4 rounded-full text-lg font-bold"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>

     
//     </motion.div>
//   );
// };

// export default TravelBlogPost;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [blogData, setBlogData] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => setBlogData(data))
//       .catch((err) => console.error('Error fetching blog data:', err));
//   }, []);

//   const handleLike = () => {
//     setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
//     setIsLiked(!isLiked);
//   };

//   if (!blogData) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   return (
//     <motion.div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       <motion.header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{blogData.title}</h1>
//         <p className="text-xl text-teal-700 max-w-3xl mx-auto">{blogData.description}</p>
//         <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//           <div className="flex items-center"><MapPin className="mr-2" /><span>{blogData.location}</span></div>
//           <div className="flex items-center"><Calendar className="mr-2" /><span>{blogData.date}</span></div>
//           <div className="flex items-center"><Clock className="mr-2" /><span>{blogData.duration}</span></div>
//         </div>
//       </motion.header>

//       <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//         <img src={blogData.image} alt={blogData.title} className="w-full h-auto object-cover" />
//         <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{blogData.imageCaption}</figcaption>
//       </motion.figure>

//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         {blogData.highlights.map((highlight, index) => (
//           <motion.div key={index} className="bg-white/70 p-6 rounded-xl shadow-md">
//             <div className="flex items-center mb-4">
//               <span className="w-8 h-8 text-teal-600 mr-4">{highlight.icon}</span>
//               <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//             </div>
//             <p className="text-gray-700">{highlight.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.article className="prose lg:prose-xl max-w-full mb-12">
//         <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">{blogData.mainHeading}</h2>
//         <p className="text-lg text-gray-800 leading-relaxed">{blogData.mainContent}</p>
//         <h3 className="text-2xl text-teal-800 mt-8 mb-4">{blogData.activitiesTitle}</h3>
//         <div className="bg-white/60 p-6 rounded-xl">
//           <ul className="space-y-3">
//             {blogData.activities.map((activity, index) => (
//               <li key={index} className="flex items-center">
//                 <ChevronRight className="text-teal-600 mr-3" />
//                 <span>{activity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </motion.article>

//       <motion.div className="flex justify-center items-center my-8">
//         <button
//           onClick={handleLike}
//           className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//             isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           <Heart className={`w-6 h-6 ${isLiked ? 'text-white' : 'text-gray-500'}`} fill={isLiked ? 'currentColor' : 'none'} />
//           <span>{isLiked ? 'Loved!' : 'Love this post'}</span>
//           {likes > 0 && <span className="ml-2 text-sm">{likes}</span>}
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TravelBlogPost;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [blogData, setBlogData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     date: '',
//     duration: '',
//     image: '',
//     imageCaption: '',
//     highlights: [],
//     mainHeading: '',
//     mainContent: '',
//     activitiesTitle: '',
//     activities: [],
//   });

//   useEffect(() => {
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         setBlogData(data);
//       })
//       .catch((err) => console.error('Error fetching blog data:', err));
//   }, []);

//   const handleLike = () => {
//     setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
//     setIsLiked(!isLiked);
//   };

//   if (!blogData || !blogData.highlights || !blogData.activities) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   return (
//     <motion.div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       <motion.header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{blogData.title}</h1>
//         <p className="text-xl text-teal-700 max-w-3xl mx-auto">{blogData.description}</p>
//         <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//           <div className="flex items-center"><MapPin className="mr-2" /><span>{blogData.location}</span></div>
//           <div className="flex items-center"><Calendar className="mr-2" /><span>{blogData.date}</span></div>
//           <div className="flex items-center"><Clock className="mr-2" /><span>{blogData.duration}</span></div>
//         </div>
//       </motion.header>

//       <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//         <img src={blogData.image} alt={blogData.title} className="w-full h-auto object-cover" />
//         <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{blogData.imageCaption}</figcaption>
//       </motion.figure>

//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         {blogData?.highlights?.map((highlight, index) => (
//           <motion.div key={index} className="bg-white/70 p-6 rounded-xl shadow-md">
//             <div className="flex items-center mb-4">
//               <span className="w-8 h-8 text-teal-600 mr-4">{highlight.icon}</span>
//               <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//             </div>
//             <p className="text-gray-700">{highlight.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.article className="prose lg:prose-xl max-w-full mb-12">
//         <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">{blogData.mainHeading}</h2>
//         <p className="text-lg text-gray-800 leading-relaxed">{blogData.mainContent}</p>
//         <h3 className="text-2xl text-teal-800 mt-8 mb-4">{blogData.activitiesTitle}</h3>
//         <div className="bg-white/60 p-6 rounded-xl">
//           <ul className="space-y-3">
//             {blogData?.activities?.map((activity, index) => (
//               <li key={index} className="flex items-center">
//                 <ChevronRight className="text-teal-600 mr-3" />
//                 <span>{activity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </motion.article>

//       <motion.div className="flex justify-center items-center my-8">
//         <button
//           onClick={handleLike}
//           className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//             isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           <Heart className={`w-6 h-6 ${isLiked ? 'text-white' : 'text-gray-500'}`} fill={isLiked ? 'currentColor' : 'none'} />
//           <span>{isLiked ? 'Loved!' : 'Love this post'}</span>
//           {likes > 0 && <span className="ml-2 text-sm">{likes}</span>}
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TravelBlogPost;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [blogData, setBlogData] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         // Use the first item in the array (or handle multiple posts)
//         if (Array.isArray(data) && data.length > 0) {
//           setBlogData(data[0]);
//         }
//       })
//       .catch((err) => console.error('Error fetching blog data:', err));
//   }, []);

//   const handleLike = () => {
//     setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
//     setIsLiked(!isLiked);
//   };

//   if (!blogData) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   // Map API fields to component fields
//   const {
//     title,
//     subtitle,
//     location,
//     dateRange,
//     duration,
//     featuredImage,
//     imageCaption,
//     highlights,
//     narrative,
//     recommendedActivities,
//   } = blogData;

//   return (
//     <motion.div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       <motion.header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//         <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>
//         <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//           <div className="flex items-center">
//             <MapPin className="mr-2" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center">
//             <Calendar className="mr-2" />
//             {/* <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span> */}
//           </div>
//           <div className="flex items-center">
//             <Clock className="mr-2" />
//             <span>{duration} Days</span>
//           </div>
//         </div>
//       </motion.header>

//       <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//         <img src={featuredImage} alt={title} className="w-full h-auto object-cover" />
//         <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{imageCaption}</figcaption>
//       </motion.figure>

//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         {highlights?.map((highlight, index) => (
//           <motion.div key={index} className="bg-white/70 p-6 rounded-xl shadow-md">
//             <div className="flex items-center mb-4">
//               <span className="w-8 h-8 text-teal-600 mr-4">{highlight.icon}</span>
//               <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//             </div>
//             <p className="text-gray-700">{highlight.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.article className="prose lg:prose-xl max-w-full mb-12">
//         <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">Journey Into the Heart of Nature</h2>
//         <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//         <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//         <div className="bg-white/60 p-6 rounded-xl">
//           <ul className="space-y-3">
//             {recommendedActivities?.map((activity, index) => (
//               <li key={index} className="flex items-center">
//                 <ChevronRight className="text-teal-600 mr-3" />
//                 <span>{activity.trim()}</span> {/* Trim to remove extra spaces */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </motion.article>

//       <motion.div className="flex justify-center items-center my-8">
//         <button
//           onClick={handleLike}
//           className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//             isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           <Heart className={`w-6 h-6 ${isLiked ? 'text-white' : 'text-gray-500'}`} fill={isLiked ? 'currentColor' : 'none'} />
//           <span>{isLiked ? 'Loved!' : 'Love this post'}</span>
//           {likes > 0 && <span className="ml-2 text-sm">{likes}</span>}
//         </button>
//       </motion.div>
//     </motion.div>
//      <motion.div
//              className="bg-gradient-to-r from-teal-500 to-blue-600 text-black p-8 rounded-xl text-center"
//              whileHover={{ scale: 1.02 }}
//             >
//               <h3 className="text-3xl font-bold mb-4">Your Pahalgam Adventure Awaits</h3>
//               <p className="text-xl mb-6">
//               Embark on a journey to explore the pristine beauty of Pahalgam and create memories to cherish forever.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                className=" text-teal-400 px-10 py-4 rounded-full text-lg font-bold"
//              >
//                Plan Your Journey
//              </motion.button>
//            </motion.div>
//   );
// };

// export default TravelBlogPost;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [blogData, setBlogData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         if (Array.isArray(data)) {
//           setBlogData(data); // Set the entire array of posts
//         }
//       })
//       .catch((err) => console.error('Error fetching blog data:', err));
//   }, []);

//   const handleLike = () => {
//     setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
//     setIsLiked(!isLiked);
//   };

//   if (blogData.length === 0) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       {blogData.map((post, index) => {
//         const {
//           title,
//           subtitle,
//           location,
//           dateRange,
//           duration,
//           featuredImage,
//           imageCaption,
//           highlights,
//           narrative,
//           recommendedActivities,
//         } = post;

//         return (
//           <motion.div key={index} className="mb-12">
//             <motion.header className="text-center mb-12">
//               <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//               <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>
//               <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//                 <div className="flex items-center">
//                   <MapPin className="mr-2" />
//                   <span>{location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="mr-2" />
//                   {/* <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span> */}
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="mr-2" />
//                   <span>{duration} Days</span>
//                 </div>
//               </div>
//             </motion.header>

//             <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//               <img src={featuredImage} alt={title} className="w-full h-auto object-cover" />
//               <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{imageCaption}</figcaption>
//             </motion.figure>

//             <div className="grid md:grid-cols-3 gap-6 mb-12">
//               {highlights?.map((highlight, index) => (
//                 <motion.div key={index} className="bg-white/70 p-6 rounded-xl shadow-md">
//                   <div className="flex items-center mb-4">
//                     <span className="w-8 h-8 text-teal-600 mr-4">{highlight.icon}</span>
//                     <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//                   </div>
//                   <p className="text-gray-700">{highlight.description}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.article className="prose lg:prose-xl max-w-full mb-12">
//               <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">Journey Into the Heart of Nature</h2>
//               <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//               <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//               <div className="bg-white/60 p-6 rounded-xl">
//                 <ul className="space-y-3">
//                   {recommendedActivities?.map((activity, index) => (
//                     <li key={index} className="flex items-center">
//                       <ChevronRight className="text-teal-600 mr-3" />
//                       <span>{activity.trim()}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.article>

//             <motion.div className="flex justify-center items-center my-8">
//               <button
//                 onClick={handleLike}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//                   isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 <Heart className={`w-6 h-6 ${isLiked ? 'text-white' : 'text-gray-500'}`} fill={isLiked ? 'currentColor' : 'none'} />
//                 <span>{isLiked ? 'Loved!' : 'Love this post'}</span>
//                 {likes > 0 && <span className="ml-2 text-sm">{likes}</span>}
//               </button>
//             </motion.div>
//           </motion.div>
//         );
//       })}

//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-black p-8 rounded-xl text-center"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Pahalgam Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty of Pahalgam and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="text-teal-400 px-10 py-4 rounded-full text-lg font-bold"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default TravelBlogPost;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [likes, setLikes] = useState({}); // Track likes for each post
//   const [blogData, setBlogData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         if (Array.isArray(data)) {
//           setBlogData(data); // Set the entire array of posts
//           // Initialize likes for each post
//           const initialLikes = {};
//           data.forEach((post, index) => {
//             initialLikes[index] = { count: 0, isLiked: false };
//           });
//           setLikes(initialLikes);
//         }
//       })
//       .catch((err) => console.error('Error fetching blog data:', err));
//   }, []);

//   const handleLike = (index) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [index]: {
//         count: prevLikes[index].isLiked ? prevLikes[index].count - 1 : prevLikes[index].count + 1,
//         isLiked: !prevLikes[index].isLiked,
//       },
//     }));
//   };

//   if (blogData.length === 0) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       {blogData.map((post, index) => {
//         const {
//           title,
//           subtitle,
//           location,
//           dateRange,
//           duration,
//           featuredImage,
//           imageCaption,
//           highlights,
//           narrative,
//           recommendedActivities,
//         } = post;

//         return (
//           <motion.div key={index} className="mb-12">
//             <motion.header className="text-center mb-12">
//               <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//               <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>
//               <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//                 <div className="flex items-center">
//                   <MapPin className="mr-2" />
//                   <span>{location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="mr-2" />
//                   {/* <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span> */}
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="mr-2" />
//                   <span>{duration} Days</span>
//                 </div>
//               </div>
//             </motion.header>

//             <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//               <img src={featuredImage} alt={title} className="w-full h-auto object-cover" />
//               <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{imageCaption}</figcaption>
//             </motion.figure>

//             <div className="grid md:grid-cols-3 gap-6 mb-12">
//               {highlights?.map((highlight, idx) => (
//                 <motion.div key={idx} className="bg-white/70 p-6 rounded-xl shadow-md">
//                   <div className="flex items-center mb-4">
//                     {/* <span className="w-8 h-8 text-teal-600 mr-4">{highlight.icon}</span>
//                      */}
//                        <MapPin className=" w-8 h-8 text-teal-600 mr-4" />
//                     <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//                   </div>
//                   <p className="text-gray-700">{highlight.description}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.article className="prose lg:prose-xl max-w-full mb-12">
//               <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">Journey Into the Heart of Nature</h2>
//               <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//               <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//               <div className="bg-white/60 p-6 rounded-xl">
//                 <ul className="space-y-3">
//                   {recommendedActivities?.map((activity, idx) => (
//                     <li key={idx} className="flex items-center">
//                       <ChevronRight className="text-teal-600 mr-3" />
//                       <span>{activity.trim()}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.article>

//             {/* Like button for each post */}
//             <motion.div className="flex justify-center items-center my-8">
//               <button
//                 onClick={() => handleLike(index)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//                   likes[index]?.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 <Heart
//                   className={`w-6 h-6 ${likes[index]?.isLiked ? 'text-white' : 'text-gray-500'}`}
//                   fill={likes[index]?.isLiked ? 'currentColor' : 'none'}
//                 />
//                 <span>{likes[index]?.isLiked ? 'Loved!' : 'Love this post'}</span>
//                 {likes[index]?.count > 0 && <span className="ml-2 text-sm">{likes[index].count}</span>}
//               </button>
//             </motion.div>
//           </motion.div>
//         );
//       })}

//       {/* Plan Your Journey button at the bottom of the page */}
//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl text-center mt-12"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Pahalgam Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty of Pahalgam and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default TravelBlogPost;

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// // Modified to accept a post prop
// const TravelBlogPost = ({ post }) => {
//   const [likes, setLikes] = useState({ count: 0, isLiked: false });
  
//   // If no post is provided, show a loading state
//   if (!post) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   const handleLike = () => {
//     setLikes((prevLikes) => ({
//       count: prevLikes.isLiked ? prevLikes.count - 1 : prevLikes.count + 1,
//       isLiked: !prevLikes.isLiked,
//     }));
//   };

//   const {
//     title,
//     subtitle,
//     location,
//     dateRange,
//     duration,
//     featuredImage,
//     imageCaption,
//     highlights,
//     narrative,
//     recommendedActivities,
//   } = post;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       <motion.div className="mb-12">
//         <motion.header className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//           <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>
//           <div className="flex flex-wrap justify-center items-center space-x-4 mt-6 text-teal-700">
//             <div className="flex items-center">
//               <MapPin className="mr-2" />
//               <span>{location}</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar className="mr-2" />
//               {/* <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span> */}
//             </div>
//             <div className="flex items-center">
//               <Clock className="mr-2" />
//               <span>{duration} Days</span>
//             </div>
//           </div>
//         </motion.header>

//         <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//           <img src={featuredImage} alt={title} className="w-full h-auto object-cover" />
//           <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">{imageCaption}</figcaption>
//         </motion.figure>

//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           {highlights?.map((highlight, idx) => (
//             <motion.div key={idx} className="bg-white/70 p-6 rounded-xl shadow-md">
//               <div className="flex items-center mb-4">
//                 <MapPin className="w-8 h-8 text-teal-600 mr-4" />
//                 <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
//               </div>
//               <p className="text-gray-700">{highlight.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.article className="prose lg:prose-xl max-w-full mb-12">
//           <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">Journey Into the Heart of Nature</h2>
//           <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//           <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//           <div className="bg-white/60 p-6 rounded-xl">
//             <ul className="space-y-3">
//               {recommendedActivities?.map((activity, idx) => (
//                 <li key={idx} className="flex items-center">
//                   <ChevronRight className="text-teal-600 mr-3" />
//                   <span>{activity.trim()}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </motion.article>

//         {/* Like button */}
//         <motion.div className="flex justify-center items-center my-8">
//           <button
//             onClick={handleLike}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//               likes.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             <Heart
//               className={`w-6 h-6 ${likes.isLiked ? 'text-white' : 'text-gray-500'}`}
//               fill={likes.isLiked ? 'currentColor' : 'none'}
//             />
//             <span>{likes.isLiked ? 'Loved!' : 'Love this post'}</span>
//             {likes.count > 0 && <span className="ml-2 text-sm">{likes.count}</span>}
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Plan Your Journey button at the bottom of the page */}
//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl text-center mt-12"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Pahalgam Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty of Pahalgam and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default TravelBlogPost;
// import React, { useState,useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = ({post}) => {
//   const [likes, setLikes] = useState({ count: 0, isLiked: false });
  
//   // Debug output to help identify issues
//   // console.log("Rendering blog post:", post);
  
//   // If no post is provided, show a loading state
//   if (!post) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   const handleLike = () => {
//     setLikes((prevLikes) => ({
//       count: prevLikes.isLiked ? prevLikes.count - 1 : prevLikes.count + 1,
//       isLiked: !prevLikes.isLiked,
//     }));
//   };

//   // Safely extract post data with fallbacks
//   const {
//     title = "Untitled Post",
//     subtitle = "",
//     location = "",
//     dateRange = {},
//     duration = "",
//     featuredImage = "",
//     imageCaption = "",
//     highlights = [],
//     narrative = "",
//     recommendedActivities = [],
//   } = post || {};

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50">
//       <motion.div className="mb-12">
//         {/* Title Section */}
//         <motion.header className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//           {subtitle && <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>}
          
//           {/* Location, Date, Duration info */}
//           <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-teal-700">
//             {location && (
//               <div className="flex items-center">
//                 <MapPin className="mr-2" />
//                 <span>{location}</span>
//               </div>
//             )}
            
//             {dateRange && dateRange.start && dateRange.end && (
//               <div className="flex items-center">
//                 <Calendar className="mr-2" />
//                 <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
//               </div>
//             )}
            
//             {duration && (
//               <div className="flex items-center">
//                 <Clock className="mr-2" />
//                 <span>{duration}</span>
//               </div>
//             )}
//           </div>
//         </motion.header>

//         {/* Featured Image */}
//         {featuredImage && (
//           <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//             <img 
//               src={featuredImage} 
//               alt={title} 
//               className="w-full h-auto object-cover max-h-96" 
//               onError={(e) => {
//                 console.error("Failed to load image:", featuredImage);
//                 e.target.onerror = null;
//                 e.target.src = "/placeholder-image.jpg"; // Fallback image
//               }}
//             />
//             {imageCaption && (
//               <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
//                 {imageCaption}
//               </figcaption>
//             )}
//           </motion.figure>
//         )}

//         {/* Highlights Section */}
//         {/* {highlights && highlights.length > 0 && (
//           <div className="grid md:grid-cols-3 gap-6 mb-12">
//             {highlights.map((highlight, idx) => (
//               <motion.div key={idx} className="bg-white/70 p-6 rounded-xl shadow-md">
//                 <div className="flex items-center mb-4">
//                   <MapPin className="w-8 h-8 text-teal-600 mr-4" />
//                   <h3 className="text-xl font-bold text-teal-800">{highlight.title || "Highlight"}</h3>
//                 </div>
//                 <p className="text-gray-700">{highlight.description || ""}</p>
//               </motion.div>
//             ))}
//           </div>
//         )} */}
  
//         {/* Narrative/Story Section */}
//         <motion.article className="prose lg:prose-xl max-w-full mb-12">
//           {/* Change this static heading to use the post title */}
//           <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">
//             {title || "Journey Into the Heart of Nature"}
//           </h2>
          
//           {narrative ? (
//             <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//           ) : (
//             <p className="text-lg text-gray-800 leading-relaxed">No content available for this post.</p>
//           )}
          
//           {/* Recommended Activities */}
//           {recommendedActivities && recommendedActivities.length > 0 && (
//             <>
//               <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//               <div className="bg-white/60 p-6 rounded-xl">
//                 <ul className="space-y-3">
//                   {recommendedActivities.map((activity, idx) => (
//                     <li key={idx} className="flex items-center">
//                       <ChevronRight className="text-teal-600 mr-3" />
//                       <span>{typeof activity === 'string' ? activity.trim() : ''}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}
//         </motion.article>

//         {/* Like button */}
//         <motion.div className="flex justify-center items-center my-8">
//           <button
//             onClick={handleLike}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//               likes.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             <Heart
//               className={`w-6 h-6 ${likes.isLiked ? 'text-white' : 'text-gray-500'}`}
//               fill={likes.isLiked ? 'currentColor' : 'none'}
//             />
//             <span>{likes.isLiked ? 'Loved!' : 'Love this post'}</span>
//             {likes.count > 0 && <span className="ml-2 text-sm">{likes.count}</span>}
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Plan Your Journey button */}
//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl text-center mt-12"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default TravelBlogPost;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// const TravelBlogPost = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     setIsLoading(true);
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         if (Array.isArray(data)) {
//           setBlogData(data); // Set the entire array of posts
//           // Initialize likes for each post
//           const initialLikes = {};
//           data.forEach((post, index) => {
//             initialLikes[index] = { count: 0, isLiked: false };
//           });
//           setLikes(initialLikes);
//         }
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching blog data:', err);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleLike = (index) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [index]: {
//         count: prevLikes[index].isLiked 
//           ? prevLikes[index].count - 1 
//           : prevLikes[index].count + 1,
//         isLiked: !prevLikes[index].isLiked,
//       }
//     }));
//   };

//   if (isLoading) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   if (blogData.length === 0) {
//     return <div className="text-center py-10 text-lg font-bold">No blog posts found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {blogData.map((post, index) => {
//         // Safely extract post data with fallbacks
//         const {
//           title = "Untitled Post",
//           subtitle = "",
//           location = "",
//           dateRange = {},
//           duration = "",
//           featuredImage = "",
//           imageCaption = "",
//           highlights = [],
//           narrative = "",
//           recommendedActivities = [],
//         } = post || {};

//         return (
//           <div key={index} className="mb-20 bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl">
//             <motion.div className="mb-12">
//               {/* Title Section */}
//               <motion.header className="text-center mb-12">
//                 <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//                 {subtitle && <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>}
                
//                 {/* Location, Date, Duration info */}
//                 <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-teal-700">
//                   {location && (
//                     <div className="flex items-center">
//                       <MapPin className="mr-2" />
//                       <span>{location}</span>
//                     </div>
//                   )}
                  
//                   {dateRange && dateRange.start && dateRange.end && (
//                     <div className="flex items-center">
//                       <Calendar className="mr-2" />
//                       <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
//                     </div>
//                   )}
                  
//                   {duration && (
//                     <div className="flex items-center">
//                       <Clock className="mr-2" />
//                       <span>{duration}</span>
//                     </div>
//                   )}
//                 </div>
//               </motion.header>

//               {/* Featured Image */}
//               {featuredImage && (
//                 <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//                   <img 
//                     src={featuredImage} 
//                     alt={title} 
//                     className="w-full h-auto object-cover max-h-96" 
//                     onError={(e) => {
//                       console.error("Failed to load image:", featuredImage);
//                       e.target.onerror = null;
//                       e.target.src = "/placeholder-image.jpg"; // Fallback image
//                     }}
//                   />
//                   {imageCaption && (
//                     <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
//                       {imageCaption}
//                     </figcaption>
//                   )}
//                 </motion.figure>
//               )}

//               {/* Highlights Section - Uncommented */}
//               {highlights && highlights.length > 0 && (
//                 <div className="grid md:grid-cols-3 gap-6 mb-12">
//                   {highlights.map((highlight, idx) => (
//                     <motion.div key={idx} className="bg-white/70 p-6 rounded-xl shadow-md">
//                       <div className="flex items-center mb-4">
//                         <MapPin className="w-8 h-8 text-teal-600 mr-4" />
//                         <h3 className="text-xl font-bold text-teal-800">{highlight.title || "Highlight"}</h3>
//                       </div>
//                       <p className="text-gray-700">{highlight.description || ""}</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
        
//               {/* Narrative/Story Section */}
//               <motion.article className="prose lg:prose-xl max-w-full mb-12">
//                 <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">
//                   {title || "Journey Into the Heart of Nature"}
//                 </h2>
                
//                 {narrative ? (
//                   <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//                 ) : (
//                   <p className="text-lg text-gray-800 leading-relaxed">No content available for this post.</p>
//                 )}
                
//                 {/* Recommended Activities */}
//                 {recommendedActivities && recommendedActivities.length > 0 && (
//                   <>
//                     <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//                     <div className="bg-white/60 p-6 rounded-xl">
//                       <ul className="space-y-3">
//                         {recommendedActivities.map((activity, idx) => (
//                           <li key={idx} className="flex items-center">
//                             <ChevronRight className="text-teal-600 mr-3" />
//                             <span>{typeof activity === 'string' ? activity.trim() : ''}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </>
//                 )}
//               </motion.article>

//               {/* Like button */}
//               <motion.div className="flex justify-center items-center my-8">
//                 <button
//                   onClick={() => handleLike(index)}
//                   className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//                     likes[index]?.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   <Heart
//                     className={`w-6 h-6 ${likes[index]?.isLiked ? 'text-white' : 'text-gray-500'}`}
//                     fill={likes[index]?.isLiked ? 'currentColor' : 'none'}
//                   />
//                   <span>{likes[index]?.isLiked ? 'Loved!' : 'Love this post'}</span>
//                   {likes[index]?.count > 0 && <span className="ml-2 text-sm">{likes[index].count}</span>}
//                 </button>
//               </motion.div>
//             </motion.div>

//             {/* Plan Your Journey button */}
//             <motion.div
//               className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl text-center mt-12"
//               whileHover={{ scale: 1.02 }}
//             >
//               <h3 className="text-3xl font-bold mb-4">Your Adventure Awaits</h3>
//               <p className="text-xl mb-6">
//                 Embark on a journey to explore the pristine beauty and create memories to cherish forever.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
//               >
//                 Plan Your Journey
//               </motion.button>
//             </motion.div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TravelBlogPost;

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart } from 'lucide-react';

// // Single Blog Post Component
// const BlogPostCard = ({ post, postIndex, likeState, onLike }) => {
//   // Safely extract post data with fallbacks
//   const {
//     title = "Untitled Post",
//     subtitle = "",
//     location = "",
//     dateRange = {},
//     duration = "",
//     featuredImage = "",
//     imageCaption = "",
//     highlights = [],
//     narrative = "",
//     recommendedActivities = [],
//   } = post || {};

//   return (
//     <div className="mb-20 bg-gradient-to-br from-blue-50 to-teal-50 m-0 rounded-xl  ">
//       <motion.div className="mb-12">
//         {/* Title Section */}
//         <motion.header className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">{title}</h1>
//           {subtitle && <p className="text-xl text-teal-700 max-w-3xl mx-auto">{subtitle}</p>}
          
//           {/* Location, Date, Duration info */}
//           <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-teal-700">
//             {location && (
//               <div className="flex items-center">
//                 <MapPin className="mr-2" />
//                 <span>{location}</span>
//               </div>
//             )}
            
//             {dateRange && dateRange.start && dateRange.end && (
//               <div className="flex items-center">
//                 <Calendar className="mr-2" />
//                 <span>{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
//               </div>
//             )}
            
//             {duration && (
//               <div className="flex items-center">
//                 <Clock className="mr-2" />
//                 <span>{duration}</span>
//               </div>
//             )}
//           </div>
//         </motion.header>

//         {/* Featured Image */}
//         {featuredImage && (
//           <motion.figure className="mb-12 rounded-xl overflow-hidden shadow-2xl group">
//             <img 
//               src={featuredImage} 
//               alt={title} 
//               className="w-full h-auto object-cover max-h-96" 
//               onError={(e) => {
//                 console.error("Failed to load image:", featuredImage);
//                 e.target.onerror = null;
//                 e.target.src = "/placeholder-image.jpg"; // Fallback image
//               }}
//             />
//             {imageCaption && (
//               <figcaption className="p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
//                 {imageCaption}
//               </figcaption>
//             )}
//           </motion.figure>
//         )}

//         {/* Highlights Section */}
//         {highlights && highlights.length > 0 && (
//           <div className="grid md:grid-cols-3 gap-6 mb-12">
//             {highlights.map((highlight, idx) => (
//               <motion.div key={idx} className="bg-white/70 p-6 rounded-xl shadow-md">
//                 <div className="flex items-center mb-4">
//                   <MapPin className="w-8 h-8 text-teal-600 mr-4" />
//                   <h3 className="text-xl font-bold text-teal-800">{highlight.title || "Highlight"}</h3>
//                 </div>
//                 <p className="text-gray-700">{highlight.description || ""}</p>
//               </motion.div>
//             ))}
//           </div>
//         )}
  
//         {/* Narrative/Story Section */}
//         <motion.article className="prose lg:prose-xl max-w-full mb-12">
//           <h2 className="text-3xl text-teal-900 border-b-4 border-teal-500 pb-3 mb-6">
//             {title || "Journey Into the Heart of Nature"}
//           </h2>
          
//           {narrative ? (
//             <p className="text-lg text-gray-800 leading-relaxed">{narrative}</p>
//           ) : (
//             <p className="text-lg text-gray-800 leading-relaxed">No content available for this post.</p>
//           )}
          
//           {/* Recommended Activities */}
//           {recommendedActivities && recommendedActivities.length > 0 && (
//             <>
//               <h3 className="text-2xl text-teal-800 mt-8 mb-4">Recommended Activities</h3>
//               <div className="bg-white/60 p-6 rounded-xl">
//                 <ul className="space-y-3">
//                   {recommendedActivities.map((activity, idx) => (
//                     <li key={idx} className="flex items-center">
//                       <ChevronRight className="text-teal-600 mr-3" />
//                       <span>{typeof activity === 'string' ? activity.trim() : ''}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}
//         </motion.article>

//         {/* Like button */}
//         <motion.div className="flex justify-center items-center my-8">
//           <button
//             onClick={() => onLike(postIndex)}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
//               likeState.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             <Heart
//               className={`w-6 h-6 ${likeState.isLiked ? 'text-white' : 'text-gray-500'}`}
//               fill={likeState.isLiked ? 'currentColor' : 'none'}
//             />
//             <span>{likeState.isLiked ? 'Loved!' : 'Love this post'}</span>
//             {likeState.count > 0 && <span className="ml-2 text-sm">{likeState.count}</span>}
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Plan Your Journey button */}
//       <motion.div
//         className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl text-center mt-12"
//         whileHover={{ scale: 1.02 }}
//       >
//         <h3 className="text-3xl font-bold mb-4">Your Adventure Awaits</h3>
//         <p className="text-xl mb-6">
//           Embark on a journey to explore the pristine beauty and create memories to cherish forever.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
//         >
//           Plan Your Journey
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// // Main Component
// const TravelBlogPost = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [activePostIndex, setActivePostIndex] = useState(0);
  
//   useEffect(() => {
//     setIsLoading(true);
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         if (Array.isArray(data)) {
//           setBlogData(data); // Set the entire array of posts
//           // Initialize likes for each post
//           const initialLikes = {};
//           data.forEach((post, index) => {
//             initialLikes[index] = { count: 0, isLiked: false };
//           });
//           setLikes(initialLikes);
//         }
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching blog data:', err);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleLike = (index) => {
//     setLikes((prevLikes) => {
//       const newLikes = { ...prevLikes };
//       newLikes[index] = {
//         count: prevLikes[index].isLiked 
//           ? prevLikes[index].count - 1 
//           : prevLikes[index].count + 1,
//         isLiked: !prevLikes[index].isLiked,
//       };
//       return newLikes;
//     });
//   };

//   const handleNextPost = () => {
//     setActivePostIndex((prev) => (prev + 1) % blogData.length);
//   };

//   const handlePrevPost = () => {
//     setActivePostIndex((prev) => (prev - 1 + blogData.length) % blogData.length);
//   };

//   if (isLoading) {
//     return <div className="text-center py-10 text-lg font-bold">Loading...</div>;
//   }

//   if (blogData.length === 0) {
//     return <div className="text-center py-10 text-lg font-bold">No blog posts found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {/* Navigation Controls */}
//       {blogData.length > 1 && (
//         <div className="flex justify-between mb-8">
//           <button 
//             onClick={handlePrevPost}
//             className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
//           >
//             Previous Post
//           </button>
//           <div className="flex items-center space-x-2">
//             {blogData.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActivePostIndex(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === activePostIndex ? 'bg-teal-600' : 'bg-gray-300'
//                 }`}
//                 aria-label={`Go to post ${index + 1}`}
//               />
//             ))}
//           </div>
//           <button 
//             onClick={handleNextPost}
//             className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
//           >
//             Next Post
//           </button>
//         </div>
//       )}
      
//       {/* Display only the active post */}
//       <BlogPostCard 
//         post={blogData[activePostIndex]} 
//         postIndex={activePostIndex} 
//         likeState={likes[activePostIndex] || { count: 0, isLiked: false }} 
//         onLike={handleLike} 
//       />
//     </div>
//   );
// };

// export default TravelBlogPost;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, MapPin, Calendar, Clock, Heart, ArrowLeft, ArrowRight } from 'lucide-react';

// // Single Blog Post Component
// const BlogPostCard = ({ post, postIndex, likeState, onLike }) => {
//   // Safely extract post data with fallbacks
//   const {
//     title = "Untitled Post",
//     subtitle = "",
//     location = "",
//     dateRange = {},
//     duration = "",
//     featuredImage = "",
//     imageCaption = "",
//     highlights = [],
//     narrative = "",
//     recommendedActivities = [],
//   } = post || {};

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   return (
//     <div className="mb-20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl shadow-lg">
//       <motion.div className="mb-12" initial="initial" animate="animate" variants={fadeInUp}>
//         {/* Title Section */}
//         <motion.header className="text-center mb-12" variants={fadeInUp}>
//           <motion.div 
//             className="h-2 w-32 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-8 rounded-full"
//             variants={fadeInUp}
//           />
//           <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6 font-serif">{title}</h1>
//           {subtitle && <p className="text-xl text-orange-700 max-w-3xl mx-auto font-light italic">{subtitle}</p>}
          
//           {/* Location, Date, Duration info */}
//           <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-orange-700">
//             {location && (
//               <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
//                 <MapPin className="mr-2 text-orange-500" />
//                 <span className="font-medium">{location}</span>
//               </div>
//             )}
            
//             {dateRange && dateRange.start && dateRange.end && (
//               <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
//                 <Calendar className="mr-2 text-orange-500" />
//                 <span className="font-medium">{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
//               </div>
//             )}
            
//             {duration && (
//               <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
//                 <Clock className="mr-2 text-orange-500" />
//                 <span className="font-medium">{duration}</span>
//               </div>
//             )}
//           </div>
//         </motion.header>

//         {/* Featured Image */}
//         {featuredImage && (
//           <motion.figure 
//             className="mb-12 rounded-xl overflow-hidden shadow-2xl group relative"
//             variants={fadeInUp}
//           >
//             <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
//             <img 
//               src={featuredImage} 
//               alt={title} 
//               className="w-full h-auto object-cover max-h-96 transform transition-transform duration-700 group-hover:scale-105" 
//               onError={(e) => {
//                 console.error("Failed to load image:", featuredImage);
//                 e.target.onerror = null;
//                 e.target.src = "/placeholder-image.jpg"; // Fallback image
//               }}
//             />
//             {imageCaption && (
//               <figcaption className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium">
//                 {imageCaption}
//               </figcaption>
//             )}
//           </motion.figure>
//         )}

//         {/* Highlights Section */}
//         {highlights && highlights.length > 0 && (
//           <motion.div 
//             className="grid md:grid-cols-3 gap-6 mb-12"
//             variants={fadeInUp}
//           >
//             {highlights.map((highlight, idx) => (
//               <motion.div 
//                 key={idx} 
//                 className="bg-white/70 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-orange-400"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
//                     <MapPin className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-orange-800">{highlight.title || "Highlight"}</h3>
//                 </div>
//                 <p className="text-gray-700">{highlight.description || ""}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
  
//         {/* Narrative/Story Section */}
//         <motion.article 
//           className="prose lg:prose-xl max-w-full mb-12 bg-white/80 p-8 rounded-xl shadow-md"
//           variants={fadeInUp}
//         >
//           <h2 className="text-3xl text-orange-900 border-b-4 border-orange-400 pb-3 mb-6 font-serif">
//             {title || "Journey Into the Heart of Nature"}
//           </h2>
          
//           {narrative ? (
//             <p className="text-lg text-gray-800 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:mr-2 first-letter:float-left">{narrative}</p>
//           ) : (
//             <p className="text-lg text-gray-800 leading-relaxed">No content available for this post.</p>
//           )}
          
//           {/* Recommended Activities */}
//           {recommendedActivities && recommendedActivities.length > 0 && (
//             <>
//               <h3 className="text-2xl text-orange-800 mt-8 mb-4 font-serif">Recommended Activities</h3>
//               <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
//                 <ul className="space-y-4">
//                   {recommendedActivities.map((activity, idx) => (
//                     <li key={idx} className="flex items-center">
//                       <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
//                         <ChevronRight className="text-orange-600 w-5 h-5" />
//                       </div>
//                       <span className="text-gray-800">{typeof activity === 'string' ? activity.trim() : ''}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}
//         </motion.article>

//         {/* Like button */}
//         <motion.div 
//           className="flex justify-center items-center my-8"
//           variants={fadeInUp}
//         >
//           <button
//             onClick={() => onLike(postIndex)}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
//               likeState.isLiked 
//                 ? 'bg-red-500 text-white shadow-lg transform scale-105' 
//                 : 'bg-white text-gray-700 hover:bg-orange-100 shadow-md'
//             }`}
//           >
//             <Heart
//               className={`w-6 h-6 ${likeState.isLiked ? 'text-white' : 'text-orange-500'}`}
//               fill={likeState.isLiked ? 'currentColor' : 'none'}
//             />
//             <span>{likeState.isLiked ? 'Loved!' : 'Love this post'}</span>
//             {likeState.count > 0 && (
//               <span className={`ml-2 ${likeState.isLiked ? 'bg-white text-red-500' : 'bg-orange-100 text-orange-600'} px-2 py-1 rounded-full text-sm font-bold`}>
//                 {likeState.count}
//               </span>
//             )}
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Plan Your Journey Section */}
//       <motion.div
//         className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 rounded-xl text-center mt-12 shadow-xl overflow-hidden relative"
//         whileHover={{ scale: 1.02 }}
//         variants={fadeInUp}
//       >
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 z-0" />
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 z-0" />
        
//         <div className="relative z-10">
//           <h3 className="text-3xl font-bold mb-4 font-serif">Your Adventure Awaits</h3>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Embark on a journey to explore the pristine beauty and create memories to cherish forever.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-orange-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 hover:bg-orange-50"
//           >
//             Plan Your Journey
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Main Component
// const TravelBlogPost = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [activePostIndex, setActivePostIndex] = useState(0);
  
//   useEffect(() => {
//     setIsLoading(true);
//     fetch('http://localhost:5000/api/blogsection')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('API Response:', data); // Debugging
//         if (Array.isArray(data)) {
//           setBlogData(data); // Set the entire array of posts
//           // Initialize likes for each post
//           const initialLikes = {};
//           data.forEach((post, index) => {
//             initialLikes[index] = { count: 0, isLiked: false };
//           });
//           setLikes(initialLikes);
//         }
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching blog data:', err);
//         // Provide fallback data for demo purposes
//         const fallbackData = [
//           {
//             title: "Exploring the Majestic Landscapes of New Zealand",
//             subtitle: "A journey through the land of the long white cloud",
//             location: "New Zealand",
//             dateRange: { start: "2024-06-15", end: "2024-06-30" },
//             duration: "2 weeks",
//             featuredImage: "/api/placeholder/800/400",
//             imageCaption: "Panoramic view of Milford Sound, New Zealand",
//             highlights: [
//               { title: "Milford Sound", description: "Cruise through the stunning fjords surrounded by ancient rainforest." },
//               { title: "Queenstown", description: "The adventure capital offering bungee jumping, skiing, and jet boating." },
//               { title: "Rotorua", description: "Experience geothermal wonders and Maori cultural performances." }
//             ],
//             narrative: "New Zealand's landscapes are nothing short of extraordinary. From the moment you arrive, you're enveloped in a world where nature reigns supreme. Towering mountains, crystal-clear lakes, and lush forests create a tapestry of natural beauty that feels almost surreal. During our two-week adventure, we traversed both the North and South Islands, each day bringing new wonders and unexpected discoveries. The locals, with their warm hospitality and deep connection to the land, made our journey even more meaningful. Whether hiking through ancient forests or sailing along dramatic coastlines, New Zealand offers an immersive experience that reconnects you with the raw power and beauty of our planet.",
//             recommendedActivities: [
//               "Hike the Tongariro Alpine Crossing",
//               "Take a helicopter tour over Fox and Franz Josef Glaciers",
//               "Visit Hobbiton Movie Set in Matamata",
//               "Go whale watching in Kaikoura",
//               "Explore the glowworm caves in Waitomo"
//             ]
//           }
//         ];
//         setBlogData(fallbackData);
//         setLikes({ 0: { count: 0, isLiked: false } });
//         setIsLoading(false);
//       });
//   }, []);

//   const handleLike = (index) => {
//     setLikes((prevLikes) => {
//       const newLikes = { ...prevLikes };
//       newLikes[index] = {
//         count: prevLikes[index].isLiked 
//           ? prevLikes[index].count - 1 
//           : prevLikes[index].count + 1,
//         isLiked: !prevLikes[index].isLiked,
//       };
//       return newLikes;
//     });
//   };

//   const handleNextPost = () => {
//     setActivePostIndex((prev) => (prev + 1) % blogData.length);
//   };

//   const handlePrevPost = () => {
//     setActivePostIndex((prev) => (prev - 1 + blogData.length) % blogData.length);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-orange-50">
//         <div className="text-center p-8 rounded-lg bg-white shadow-md">
//           <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-lg font-medium text-orange-800">Loading amazing adventures...</p>
//         </div>
//       </div>
//     );
//   }

//   if (blogData.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-orange-50">
//         <div className="text-center p-8 rounded-lg bg-white shadow-md">
//           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <MapPin className="w-8 h-8 text-orange-500" />
//           </div>
//           <p className="text-lg font-bold text-orange-800">No blog posts found</p>
//           <p className="text-gray-600 mt-2">Check back later for exciting travel stories!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-7xl bg-gradient-to-b from-orange-100/50 to-transparent">
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-bold text-orange-800 font-serif">Travel Adventures</h1>
//         <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-4" />
//       </div>
      
//       {/* Navigation Controls */}
//       {blogData.length > 1 && (
//         <div className="flex justify-between items-center mb-12">
//           <motion.button 
//             onClick={handlePrevPost}
//             className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-md transition-all duration-300"
//             whileHover={{ x: -5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ArrowLeft className="mr-2" />
//             Previous
//           </motion.button>
          
//           <div className="flex items-center space-x-3">
//             {blogData.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActivePostIndex(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                   index === activePostIndex 
//                     ? 'bg-orange-600 scale-125' 
//                     : 'bg-orange-200 hover:bg-orange-300'
//                 }`}
//                 aria-label={`Go to post ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           <motion.button 
//             onClick={handleNextPost}
//             className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-md transition-all duration-300"
//             whileHover={{ x: 5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Next
//             <ArrowRight className="ml-2" />
//           </motion.button>
//         </div>
//       )}
      
//       {/* Display only the active post */}
//       <BlogPostCard 
//         post={blogData[activePostIndex]} 
//         postIndex={activePostIndex} 
//         likeState={likes[activePostIndex] || { count: 0, isLiked: false }} 
//         onLike={handleLike} 
//       />
//     </div>
//   );
// };

// export default TravelBlogPost;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, Clock, Heart, ArrowLeft, ArrowRight, X } from 'lucide-react';

// Modal Component for Journey Planning
const PlanJourneyModal = ({ isOpen, onClose, postDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelDates: '',
    numberOfTravelers: '2',
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      console.log('Journey planned for:', postDetails?.title);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4  z-50 overflow-auto">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full p-1"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold">Plan Your Journey</h3>
          {postDetails?.title && (
            <p className="text-sm text-orange-100 mt-1">
              {postDetails.title}
            </p>
          )}
        </div>
        
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-700">Request Submitted!</h4>
              <p className="text-gray-600 mt-2">We'll contact you shortly with your personalized travel plan.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Dates</label>
                  <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="MM/DD/YYYY - MM/DD/YYYY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <select
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3-4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Any special requirements or preferences..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:from-orange-600 hover:to-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    'Plan My Journey'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Reusable handler for Plan Journey functionality
export const usePlanJourney = () => {
  const [isPlanningJourney, setIsPlanningJourney] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  
  const handlePlanJourney = (post) => {
    setCurrentPost(post);
    setIsPlanningJourney(true);
    
    // You could also track analytics here
    console.log('Journey planning initiated for:', post?.title);
  };
  
  const handleCloseModal = () => {
    setIsPlanningJourney(false);
  };
  
  return {
    isPlanningJourney,
    currentPost,
    handlePlanJourney,
    handleCloseModal,
    PlanJourneyModal
  };
};

// Single Blog Post Component
const BlogPostCard = ({ post, postIndex, likeState, onLike, onPlanJourney }) => {
  // Safely extract post data with fallbacks
  const {
    title = "Untitled Post",
    subtitle = "",
    location = "",
    dateRange = {},
    duration = "",
    featuredImage = "",
    imageCaption = "",
    highlights = [],
    narrative = "",
    recommendedActivities = [],
  } = post || {};

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="mb-20 bg-gradient-to-br from-orange-50 to-amber-50  rounded-xl shadow-lg">
      <motion.div className="mb-12" initial="initial" animate="animate" variants={fadeInUp}>
        {/* Title Section */}
        <motion.header className="text-center mb-12" variants={fadeInUp}>
          <motion.div 
            className="h-2 w-32 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-8 rounded-full"
            variants={fadeInUp}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6 font-serif">{title}</h1>
          {subtitle && <p className="text-xl text-orange-700 max-w-3xl mx-auto font-light italic">{subtitle}</p>}
          
          {/* Location, Date, Duration info */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-orange-700">
            {location && (
              <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
                <MapPin className="mr-2 text-orange-500" />
                <span className="font-medium">{location}</span>
              </div>
            )}
            
            {dateRange && dateRange.start && dateRange.end && (
              <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
                <Calendar className="mr-2 text-orange-500" />
                <span className="font-medium">{new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
              </div>
            )}
            
            {duration && (
              <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
                <Clock className="mr-2 text-orange-500" />
                <span className="font-medium">{duration}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Featured Image */}
        {featuredImage && (
          <motion.figure 
            className="mb-12 rounded-xl overflow-hidden shadow-2xl group relative"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
            <img 
              // src={featuredImage} 
              src={`https://backend-1-7zwm.onrender.com${featuredImage}`}
              alt={title} 
              className="w-full h-auto object-cover max-h-96 transform transition-transform duration-700 group-hover:scale-105" 
              onError={(e) => {
                console.error("Failed to load image:", featuredImage);
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg"; // Fallback image
              }}
            />
            {imageCaption && (
              <figcaption className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium">
                {imageCaption}
              </figcaption>
            )}
          </motion.figure>
        )}

        {/* Highlights Section */}
        {highlights && highlights.length > 0 && (
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={fadeInUp}
          >
            {highlights.map((highlight, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white/70 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-orange-400"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-800">{highlight.title || "Highlight"}</h3>
                </div>
                <p className="text-gray-700">{highlight.description || ""}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
  
        {/* Narrative/Story Section */}
        <motion.article 
          className="prose lg:prose-xl max-w-full mb-12 bg-white/80 p-8 rounded-xl shadow-md"
          variants={fadeInUp}
        >
          <h2 className="text-3xl text-orange-900 border-b-4 border-orange-400 pb-3 mb-6 font-serif">
            {title || "Journey Into the Heart of Nature"}
          </h2>
          
          {narrative ? (
            <p className="text-lg text-gray-800 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:mr-2 first-letter:float-left">{narrative}</p>
          ) : (
            <p className="text-lg text-gray-800 leading-relaxed">No content available for this post.</p>
          )}
          
          {/* Recommended Activities */}
          {recommendedActivities && recommendedActivities.length > 0 && (
            <>
              <h3 className="text-2xl text-orange-800 mt-8 mb-4 font-serif">Recommended Activities</h3>
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
                <ul className="space-y-4">
                  {recommendedActivities.map((activity, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <ChevronRight className="text-orange-600 w-5 h-5" />
                      </div>
                      <span className="text-gray-800">{typeof activity === 'string' ? activity.trim() : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </motion.article>

        {/* Like button */}
        <motion.div 
          className="flex justify-center items-center my-8"
          variants={fadeInUp}
        >
          <button
            onClick={() => onLike(postIndex)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              likeState.isLiked 
                ? 'bg-red-500 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-orange-100 shadow-md'
            }`}
          >
            <Heart
              className={`w-6 h-6 ${likeState.isLiked ? 'text-white' : 'text-orange-500'}`}
              fill={likeState.isLiked ? 'currentColor' : 'none'}
            />
            <span>{likeState.isLiked ? 'Loved!' : 'Love this post'}</span>
            {likeState.count > 0 && (
              <span className={`ml-2 ${likeState.isLiked ? 'bg-white text-red-500' : 'bg-orange-100 text-orange-600'} px-2 py-1 rounded-full text-sm font-bold`}>
                {likeState.count}
              </span>
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Plan Your Journey Section */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 rounded-xl text-center mt-12 shadow-xl overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        variants={fadeInUp}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 z-0" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 z-0" />
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4 font-serif">Your Adventure Awaits</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Embark on a journey to explore the pristine beauty and create memories to cherish forever.
          </p>
          <motion.button
            onClick={() => onPlanJourney(post)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 hover:bg-orange-50"
          >
            Plan Your Journey
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const TravelBlogPost = () => {
  const [blogData, setBlogData] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activePostIndex, setActivePostIndex] = useState(0);
  
  // Use the journey planning hook
  const { 
    isPlanningJourney, 
    currentPost, 
    handlePlanJourney, 
    handleCloseModal, 
    PlanJourneyModal 
  } = usePlanJourney();
  useEffect(() => {
    setIsLoading(true);
    fetch('https://backend-1-7zwm.onrender.com/api/blogsection')
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data); // Debugging
        if (Array.isArray(data)) {
          setBlogData(data); // Set the entire array of posts
          // Initialize likes for each post
          const initialLikes = {};
          data.forEach((post, index) => {
            initialLikes[index] = { count: 0, isLiked: false };
          });
          setLikes(initialLikes);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog data:', err);
        // Provide fallback data for demo purposes
        const fallbackData = [
          {
            title: "Exploring the Majestic Landscapes of New Zealand",
            subtitle: "A journey through the land of the long white cloud",
            location: "New Zealand",
            dateRange: { start: "2024-06-15", end: "2024-06-30" },
            duration: "2 weeks",
            featuredImage: "/api/placeholder/800/400",
            imageCaption: "Panoramic view of Milford Sound, New Zealand",
            highlights: [
              { title: "Milford Sound", description: "Cruise through the stunning fjords surrounded by ancient rainforest." },
              { title: "Queenstown", description: "The adventure capital offering bungee jumping, skiing, and jet boating." },
              { title: "Rotorua", description: "Experience geothermal wonders and Maori cultural performances." }
            ],
            narrative: "New Zealand's landscapes are nothing short of extraordinary. From the moment you arrive, you're enveloped in a world where nature reigns supreme. Towering mountains, crystal-clear lakes, and lush forests create a tapestry of natural beauty that feels almost surreal. During our two-week adventure, we traversed both the North and South Islands, each day bringing new wonders and unexpected discoveries. The locals, with their warm hospitality and deep connection to the land, made our journey even more meaningful. Whether hiking through ancient forests or sailing along dramatic coastlines, New Zealand offers an immersive experience that reconnects you with the raw power and beauty of our planet.",
            recommendedActivities: [
              "Hike the Tongariro Alpine Crossing",
              "Take a helicopter tour over Fox and Franz Josef Glaciers",
              "Visit Hobbiton Movie Set in Matamata",
              "Go whale watching in Kaikoura",
              "Explore the glowworm caves in Waitomo"
            ]
          }
        ];
        setBlogData(fallbackData);
        setLikes({ 0: { count: 0, isLiked: false } });
        setIsLoading(false);
      });
  }, []);
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('http://localhost:5000/api/blogsection')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('API Response:', data); // Debugging
  //       if (Array.isArray(data)) {
  //         setBlogData(data); // Set the entire array of posts
  //         // Initialize likes for each post
  //         const initialLikes = {};
  //         data.forEach((post, index) => {
  //           initialLikes[index] = { count: 0, isLiked: false };
  //         });
  //         setLikes(initialLikes);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching blog data:', err);
  //       // Provide fallback data for demo purposes
  //       const fallbackData = [
  //         {
  //           title: "Exploring the Majestic Landscapes of New Zealand",
  //           subtitle: "A journey through the land of the long white cloud",
  //           location: "New Zealand",
  //           dateRange: { start: "2024-06-15", end: "2024-06-30" },
  //           duration: "2 weeks",
  //           featuredImage: "/api/placeholder/800/400",
  //           imageCaption: "Panoramic view of Milford Sound, New Zealand",
  //           highlights: [
  //             { title: "Milford Sound", description: "Cruise through the stunning fjords surrounded by ancient rainforest." },
  //             { title: "Queenstown", description: "The adventure capital offering bungee jumping, skiing, and jet boating." },
  //             { title: "Rotorua", description: "Experience geothermal wonders and Maori cultural performances." }
  //           ],
  //           narrative: "New Zealand's landscapes are nothing short of extraordinary. From the moment you arrive, you're enveloped in a world where nature reigns supreme. Towering mountains, crystal-clear lakes, and lush forests create a tapestry of natural beauty that feels almost surreal. During our two-week adventure, we traversed both the North and South Islands, each day bringing new wonders and unexpected discoveries. The locals, with their warm hospitality and deep connection to the land, made our journey even more meaningful. Whether hiking through ancient forests or sailing along dramatic coastlines, New Zealand offers an immersive experience that reconnects you with the raw power and beauty of our planet.",
  //           recommendedActivities: [
  //             "Hike the Tongariro Alpine Crossing",
  //             "Take a helicopter tour over Fox and Franz Josef Glaciers",
  //             "Visit Hobbiton Movie Set in Matamata",
  //             "Go whale watching in Kaikoura",
  //             "Explore the glowworm caves in Waitomo"
  //           ]
  //         }
  //       ];
  //       setBlogData(fallbackData);
  //       setLikes({ 0: { count: 0, isLiked: false } });
  //       setIsLoading(false);
  //     });
  // }, []);

  const handleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[index] = {
        count: prevLikes[index].isLiked 
          ? prevLikes[index].count - 1 
          : prevLikes[index].count + 1,
        isLiked: !prevLikes[index].isLiked,
      };
      return newLikes;
    });
  };

  const handleNextPost = () => {
    setActivePostIndex((prev) => (prev + 1) % blogData.length);
  };

  const handlePrevPost = () => {
    setActivePostIndex((prev) => (prev - 1 + blogData.length) % blogData.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-orange-800">Loading amazing adventures...</p>
        </div>
      </div>
    );
  }

  if (blogData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-lg font-bold text-orange-800">No blog posts found</p>
          <p className="text-gray-600 mt-2">Check back later for exciting travel stories!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl bg-gradient-to-b from-orange-100/50 to-transparent">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-orange-800 font-serif">Travel Adventures</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-4" />
      </div>
      
      {/* Navigation Controls */}
      {blogData.length > 1 && (
        <div className="flex justify-between items-center mb-12">
          <motion.button 
            onClick={handlePrevPost}
            className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-md transition-all duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2" />
            Previous
          </motion.button>
          
          <div className="flex items-center space-x-3">
            {blogData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePostIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === activePostIndex 
                    ? 'bg-orange-600 scale-125' 
                    : 'bg-orange-200 hover:bg-orange-300'
                }`}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
          
          <motion.button 
            onClick={handleNextPost}
            className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-md transition-all duration-300"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ArrowRight className="ml-2" />
          </motion.button>
        </div>
      )}
      
      {/* Display only the active post */}
      <BlogPostCard 
        post={blogData[activePostIndex]} 
        postIndex={activePostIndex} 
        likeState={likes[activePostIndex] || { count: 0, isLiked: false }} 
        onLike={handleLike}
        onPlanJourney={handlePlanJourney}
      />

      {/* Journey Planning Modal */}
      <PlanJourneyModal 
        isOpen={isPlanningJourney} 
        onClose={handleCloseModal} 
        postDetails={currentPost}
      />
    </div>
  );
};

export default TravelBlogPost;