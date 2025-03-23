// Frontend - React Component for Agent Profile

// src/components/AgentProfile.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const AgentProfile = () => {
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('tours');
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAgentData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/agents/${id}`);
//         setAgent(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching agent data:', error);
//         setLoading(false);
//       }
//     };

//     fetchAgentData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mb-4"></div>
//         <p className="text-gray-600">Loading agent profile...</p>
//       </div>
//     );
//   }

//   if (!agent) {
//     return <div className="text-center text-red-500 p-8 text-lg">Agent not found or error loading profile.</div>;
//   }

//   // Function to render star ratings
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <svg 
//             key={i} 
//             className={`w-4 h-4 ${i < Math.floor(rating) ? "text-orange-500" : "text-gray-300"}`} 
//             fill="currentColor" 
//             viewBox="0 0 20 20"
//           >
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Profile Header */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//         {/* Cover Photo */}
//         <div 
//           className="h-64 bg-cover bg-center relative" 
//           style={{ backgroundImage: `url(${agent.coverPhoto || '/images/kashmir-bg.jpg'})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
//         </div>
        
//         {/* Profile Info Section */}
//         <div className="relative px-6 pb-6">
//           {/* Profile Photo */}
//           <div className="absolute -top-16 left-6">
//             <img 
//               src={agent.profilePhoto || '/images/default-agent.jpg'} 
//               alt={agent.name} 
//               className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//             />
//           </div>
          
//           {/* Contact Button */}
//           <div className="flex justify-end pt-4">
//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition duration-200">
//               Contact Agent
//             </button>
//           </div>
          
//           {/* Agent Details */}
//           <div className="mt-16">
//             <h1 className="text-3xl font-bold text-gray-800">{agent.name}</h1>
            
//             <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
//               {agent.verified && (
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   Verified
//                 </span>
//               )}
              
//               <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                 </svg>
//                 {agent.location}
//               </span>
              
//               <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                 </svg>
//                 {agent.experience} years experience
//               </span>
//             </div>
            
//             <div className="flex items-center gap-2 mt-3">
//               {renderStars(agent.rating)}
//               <span className="font-semibold text-gray-800">{agent.rating.toFixed(1)}</span>
//               <span className="text-gray-500">({agent.reviewCount} reviews)</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Tabs Navigation */}
//       <div className="border-b border-gray-200 mb-8">
//         <nav className="flex -mb-px">
//           <button 
//             onClick={() => setActiveTab('tours')}
//             className={`py-4 px-6 font-medium text-sm border-b-2 ${
//               activeTab === 'tours' 
//                 ? 'border-orange-500 text-orange-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Tours
//           </button>
//           <button 
//             onClick={() => setActiveTab('about')}
//             className={`py-4 px-6 font-medium text-sm border-b-2 ${
//               activeTab === 'about' 
//                 ? 'border-orange-500 text-orange-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             About
//           </button>
//           <button 
//             onClick={() => setActiveTab('reviews')}
//             className={`py-4 px-6 font-medium text-sm border-b-2 ${
//               activeTab === 'reviews' 
//                 ? 'border-orange-500 text-orange-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Reviews
//           </button>
//           <button 
//             onClick={() => setActiveTab('gallery')}
//             className={`py-4 px-6 font-medium text-sm border-b-2 ${
//               activeTab === 'gallery' 
//                 ? 'border-orange-500 text-orange-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Gallery
//           </button>
//         </nav>
//       </div>
      
//       {/* Tab Content */}
//       <div>
//         {/* Tours Tab */}
//         {activeTab === 'tours' && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Tours by {agent.name}</h2>
            
//             {agent.tours && agent.tours.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {agent.tours.map(tour => (
//                   <div key={tour._id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
//                     <div className="relative">
//                       <img 
//                         src={tour.coverImage} 
//                         alt={tour.title} 
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white px-3 py-1 text-sm m-2 rounded-full">
//                         {tour.duration.days}D/{tour.duration.nights}N
//                       </div>
//                     </div>
                    
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-2">{tour.title}</h3>
//                       <div className="flex items-center text-gray-600 mb-2">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                         </svg>
//                         {tour.location}
//                       </div>
                      
//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center">
//                           {renderStars(tour.rating)}
//                           <span className="text-gray-500 text-sm ml-2">({tour.reviewCount})</span>
//                         </div>
//                         <div className="text-lg font-bold text-orange-500">
//                           ₹{tour.price.amount.toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No tours available at the moment.</p>
//             )}
//           </div>
//         )}
        
//         {/* About Tab */}
//         {activeTab === 'about' && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">About {agent.name}</h2>
            
//             <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//               <p className="text-gray-700 leading-relaxed">{agent.bio}</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Specializations */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {agent.specializations && agent.specializations.map((spec, index) => (
//                     <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
//                       {spec}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Languages */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Languages</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {agent.languages && agent.languages.map((lang, index) => (
//                     <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                       {lang}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Certifications */}
//               <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Certifications & Memberships</h3>
//                 <ul className="list-disc pl-5 text-gray-700">
//                   {agent.certifications && agent.certifications.map((cert, index) => (
//                     <li key={index} className="mb-2">{cert}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Reviews Tab */}
//         {activeTab === 'reviews' && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Reviews</h2>
            
//             {/* Reviews Summary */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//               <div className="flex flex-col md:flex-row md:items-center gap-8">
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-gray-800">{agent.rating.toFixed(1)}</div>
//                   <div className="flex justify-center my-2">{renderStars(agent.rating)}</div>
//                   <div className="text-gray-500">Based on {agent.reviewCount} reviews</div>
//                 </div>
                
//                 <div className="flex-1">
//                   {agent.ratingBreakdown && agent.ratingBreakdown.map((item, index) => (
//                     <div key={index} className="flex items-center mb-2">
//                       <span className="w-16 text-sm text-gray-600">{5 - index} Stars</span>
//                       <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
//                         <div 
//                           className="h-2 bg-orange-500 rounded" 
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="w-12 text-sm text-gray-600 text-right">{item.percentage}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             {/* Reviews List */}
//             <div className="space-y-6">
//               {agent.reviews && agent.reviews.length > 0 ? (
//                 agent.reviews.map(review => (
//                   <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex justify-between mb-4">
//                       <div className="flex items-center">
//                         <img 
//                           src={review.user.photo || '/images/default-user.jpg'} 
//                           alt={review.user.name} 
//                           className="w-10 h-10 rounded-full mr-4 object-cover"
//                         />
//                         <div>
//                           <div className="font-medium text-gray-800">{review.user.name}</div>
//                           <div className="text-sm text-gray-500">
//                             {new Date(review.date).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                       <div>{renderStars(review.rating)}</div>
//                     </div>
                    
//                     <h3 className="font-semibold text-lg text-gray-800 mb-2">{review.title}</h3>
//                     <p className="text-gray-700 mb-4">{review.content}</p>
                    
//                     {review.photos && review.photos.length > 0 && (
//                       <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
//                         {review.photos.map((photo, index) => (
//                           <img 
//                             key={index} 
//                             src={photo} 
//                             alt={`Review photo ${index + 1}`} 
//                             className="w-24 h-24 rounded object-cover flex-shrink-0"
//                           />
//                         ))}
//                       </div>
//                     )}
                    
//                     <div className="flex justify-end">
//                       <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
//                         </svg>
//                         Helpful ({review.helpful})
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No reviews yet.</p>
//               )}
//             </div>
//           </div>
//         )}
        
//         {/* Gallery Tab */}
//         {activeTab === 'gallery' && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {agent.gallery && agent.gallery.length > 0 ? (
//                 agent.gallery.map((photo, index) => (
//                   <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
//                     <img 
//                       src={photo.url} 
//                       alt={photo.caption} 
//                       className="w-full h-48 object-cover transition duration-300 transform group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300"></div>
//                     {photo.caption && (
//                       <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70 text-white text-sm transform translate-y-full group-hover:translate-y-0 transition duration-300">
//                         {photo.caption}
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 col-span-full">No gallery photos available.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AgentProfile;

// // Backend Model for Agent Profile
// // models/Agent.js
// const mongoose = require('mongoose');

// const AgentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   profilePhoto: {
//     type: String,
//     default: '/images/default-agent.jpg'
//   },
//   coverPhoto: {
//     type: String,
//     default: '/images/kashmir-bg.jpg'
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   bio: {
//     type: String,
//     required: true
//   },
//   verified: {
//     type: Boolean,
//     default: false
//   },
//   experience: {
//     type: Number,
//     required: true
//   },
//   specializations: [{
//     type: String
//   }],
//   certifications: [{
//     type: String
//   }],
//   languages: [{
//     type: String
//   }],
//   rating: {
//     type: Number,
//     default: 0
//   },
//   reviewCount: {
//     type: Number,
//     default: 0
//   },
//   ratingBreakdown: [{
//     stars: Number,
//     count: Number,
//     percentage: Number
//   }],
//   reviews: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Review'
//   }],
//   tours: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Tour'
//   }],
//   gallery: [{
//     url: String,
//     caption: String
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Agent', AgentSchema);

// // Backend Route for Agent Profile
// // routes/agents.js
// const express = require('express');
// const router = express.Router();
// const Agent = require('../models/Agent');

// // Get single agent with all details
// router.get('/:id', async (req, res) => {
//   try {
//     const agent = await Agent.findById(req.params.id)
//       .populate({
//         path: 'reviews',
//         options: { sort: { date: -1 } }
//       })
//       .populate({
//         path: 'tours',
//         select: 'title location duration price coverImage rating reviewCount'
//       });
    
//     if (!agent) {
//       return res.status(404).json({ message: 'Agent not found' });
//     }
    
//     res.json(agent);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


// import React from 'react';

// const AgentProfile = () => {
//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Travel Agents</h2>
//         <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//           Meet our team of experienced travel specialists who know every corner of Kashmir and can help you plan your perfect journey.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {/* Agent 1 */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
//           <div className="relative h-72">
//             <img 
//               src="/api/placeholder/400/320" 
//               alt="Arif Khan" 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
//               <div className="flex items-center text-white gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>4.9 (124 reviews)</span>
//               </div>
//             </div>
//           </div>
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Arif Khan</h3>
//             <p className="text-sm text-emerald-600 font-medium mb-4">Kashmir Trekking Specialist</p>
//             <p className="text-gray-600 mb-6">
//               Born and raised in Srinagar, Arif has 12+ years experience leading treks through the Himalayan valleys. Expert in organizing adventures to Sonamarg, Pahalgam, and Gulmarg.
//             </p>
//             <div className="flex items-center gap-4 mb-4">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                 Trekking
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
//                 Adventure
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
//                 Photography
//               </span>
//             </div>
//             <div className="border-t pt-4">
//               <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                 <span>View Full Profile</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Agent 2 */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
//           <div className="relative h-72">
//             <img 
//               src="/api/placeholder/400/320" 
//               alt="Priya Sharma" 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
//               <div className="flex items-center text-white gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>4.8 (98 reviews)</span>
//               </div>
//             </div>
//           </div>
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
//             <p className="text-sm text-emerald-600 font-medium mb-4">Cultural Heritage Expert</p>
//             <p className="text-gray-600 mb-6">
//               With a background in Kashmiri history, Priya specializes in cultural tours through Old Srinagar, houseboat stays on Dal Lake, and visits to ancient temples and gardens.
//             </p>
//             <div className="flex items-center gap-4 mb-4">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
//                 Heritage
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
//                 Food Tours
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 Handicrafts
//               </span>
//             </div>
//             <div className="border-t pt-4">
//               <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                 <span>View Full Profile</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Agent 3 */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
//           <div className="relative h-72">
//             <img 
//               src="/api/placeholder/400/320" 
//               alt="Farooq Ahmed" 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
//               <div className="flex items-center text-white gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>4.9 (157 reviews)</span>
//               </div>
//             </div>
//           </div>
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Farooq Ahmed</h3>
//             <p className="text-sm text-emerald-600 font-medium mb-4">Luxury Travel Consultant</p>
//             <p className="text-gray-600 mb-6">
//               Specializing in high-end experiences, Farooq creates customized itineraries featuring Kashmir's finest accommodations, private shikara rides, and exclusive dining experiences.
//             </p>
//             <div className="flex items-center gap-4 mb-4">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                 Luxury
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
//                 Honeymoon
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
//                 Golf Tours
//               </span>
//             </div>
//             <div className="border-t pt-4">
//               <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                 <span>View Full Profile</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="text-center mt-12">
//         <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150">
//           Meet Our Full Team
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default AgentProfile;

// import React, { useState } from 'react';

// const TravelAgentProfile = () => {
//   const [activeTab, setActiveTab] = useState('about');
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState('');
  
//   // Sample upcoming tours data
//   const upcomingTours = [
//     {
//       id: 1,
//       title: "Gulmarg Winter Wonderland",
//       date: "Jan 15 - Jan 22, 2025",
//       price: "₹32,500",
//       spots: "4 spots left",
//       image: "/api/placeholder/400/250"
//     },
//     {
//       id: 2,
//       title: "Pahalgam Valley Trek",
//       date: "Apr 5 - Apr 12, 2025",
//       price: "₹28,900",
//       spots: "7 spots left",
//       image: "/api/placeholder/400/250"
//     },
//     {
//       id: 3,
//       title: "Dal Lake Houseboat Experience",
//       date: "May 10 - May 15, 2025",
//       price: "₹24,500",
//       spots: "2 spots left",
//       image: "/api/placeholder/400/250"
//     }
//   ];
  
//   // Reviews data
//   const reviews = [
//     {
//       id: 1,
//       name: "Rahul Mehta",
//       date: "February 2025",
//       rating: 5,
//       content: "Farooq was absolutely incredible! His knowledge of hidden spots in Kashmir made our family trip truly special. He arranged everything perfectly - from our stay at a luxury houseboat to the most amazing views of Gulmarg. His attention to detail and ability to customize the tour to our interests made all the difference.",
//       image: "/api/placeholder/64/64"
//     },
//     {
//       id: 2,
//       name: "Ananya Sharma",
//       date: "January 2025",
//       rating: 5,
//       content: "I cannot recommend Farooq enough! As a solo female traveler, I was a bit apprehensive about visiting Kashmir, but Farooq made me feel completely safe and comfortable. He knows all the best photo spots, introduced me to local artisans, and even helped me bargain for some beautiful Kashmiri shawls!",
//       image: "/api/placeholder/64/64"
//     },
//     {
//       id: 3,
//       name: "David Wilson",
//       date: "December 2024",
//       rating: 4,
//       content: "Great experience overall. Farooq is very knowledgeable about the region's history and culture. The itinerary was well-planned and he was flexible with changes when weather didn't cooperate. The only minor issue was a slight delay with one of our transfers, but Farooq quickly resolved it.",
//       image: "/api/placeholder/64/64"
//     },
//     {
//       id: 4,
//       name: "Priya and Nikhil",
//       date: "October 2024",
//       rating: 5,
//       content: "We booked our honeymoon trip with Farooq and it exceeded all our expectations! From the moment we landed, everything was perfectly arranged. The romantic dinner on a shikara boat with floating candles was magical. Farooq understood exactly what we wanted and delivered a dream experience.",
//       image: "/api/placeholder/64/64"
//     },
//     {
//       id: 5,
//       name: "Michael Chang",
//       date: "September 2024",
//       rating: 5,
//       content: "As a photographer, I was looking for unique locations in Kashmir, and Farooq did not disappoint. He took me to incredible spots at perfect times for lighting. His connections with local people gave me access to authentic cultural experiences. My photo collection from this trip is priceless!",
//       image: "/api/placeholder/64/64"
//     }
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero section */}
//       <div className="relative h-80 bg-blue-900">
//         <img 
//           src="/api/placeholder/1920/500" 
//           alt="Kashmir mountains" 
//           className="w-full h-full object-cover opacity-40"
//         />
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex justify-between items-end">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <span className="bg-emerald-500 text-white px-3 py-1 text-sm font-bold rounded-full">Verified Expert</span>
//               <span className="bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded-full">Top Rated</span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold">Farooq Ahmed</h1>
//             <p className="text-lg md:text-xl mt-1">Kashmir Travel Specialist & Luxury Tour Expert</p>
//           </div>
//           <div className="hidden md:block">
//             <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold transition hover:bg-blue-50">Contact Now</button>
//           </div>
//         </div>
//       </div>
      
//       {/* Main content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="md:flex">
//             {/* Left column - Agent info */}
//             <div className="md:w-1/3 border-r">
//               <div className="p-6">
//                 <div className="flex flex-col items-center mb-6">
//                   <div className="relative">
//                     <img 
//                       src="/api/placeholder/200/200" 
//                       alt="Farooq Ahmed" 
//                       className="w-32 h-32 rounded-full border-4 border-white shadow-md"
//                     />
//                     <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-blue-900 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-md">
//                       4.9
//                     </div>
//                   </div>
//                   <div className="flex items-center mt-4 text-yellow-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   </div>
//                   <p className="text-gray-600 text-sm mt-1">4.9 out of 5 (157 reviews)</p>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-800 mb-2">Quick Info</h3>
//                   <div className="space-y-3 text-sm">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       <span>From Srinagar, Kashmir</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       <span>12+ years experience</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       <span>Response time:  2 hours</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                       </svg>
//                       <span>Accepts credit cards & UPI</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
//                   <div className="flex flex-wrap gap-2">
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">English</span>
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Hindi</span>
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Urdu</span>
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Kashmiri</span>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-800 mb-2">Specialities</h3>
//                   <div className="flex flex-wrap gap-2">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Luxury Travel</span>
//                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Adventure Tours</span>
//                     <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Honeymoon Packages</span>
//                     <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Photography Tours</span>
//                     <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Houseboat Stays</span>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-800 mb-2">Certifications</h3>
//                   <div className="flex flex-wrap gap-3">
//                     <img src="/api/placeholder/80/40" alt="Tourism Certified" className="h-8" />
//                     <img src="/api/placeholder/80/40" alt="Adventure Licensed" className="h-8" />
//                     <img src="/api/placeholder/80/40" alt="First Aid Certified" className="h-8" />
//                   </div>
//                 </div>
                
//                 <div className="pt-4 border-t">
//                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">
//                     Contact Farooq
//                   </button>
//                   <button className="w-full mt-3 border border-blue-600 text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition">
//                     Save to Favorites
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             {/* Right column - Main content */}
//             <div className="md:w-2/3">
//               {/* Tabs */}
//               <div className="border-b">
//                 <nav className="flex">
//                   <button 
//                     onClick={() => setActiveTab('about')}
//                     className={`px-6 py-4 text-sm font-medium ${activeTab === 'about' 
//                       ? 'border-b-2 border-blue-600 text-blue-600' 
//                       : 'text-gray-500 hover:text-gray-700'}`}
//                   >
//                     About
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('tours')}
//                     className={`px-6 py-4 text-sm font-medium ${activeTab === 'tours' 
//                       ? 'border-b-2 border-blue-600 text-blue-600' 
//                       : 'text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Tours & Experiences
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('reviews')}
//                     className={`px-6 py-4 text-sm font-medium ${activeTab === 'reviews' 
//                       ? 'border-b-2 border-blue-600 text-blue-600' 
//                       : 'text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Reviews
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('gallery')}
//                     className={`px-6 py-4 text-sm font-medium ${activeTab === 'gallery' 
//                       ? 'border-b-2 border-blue-600 text-blue-600' 
//                       : 'text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Gallery
//                   </button>
//                 </nav>
//               </div>
              
//               {/* Tab content */}
//               <div className="p-6">
//                 {/* About tab */}
//                 {activeTab === 'about' && (
//                   <div>
//                     <div className="mb-8">
//                       <h2 className="text-2xl font-bold text-gray-900 mb-4">About Farooq</h2>
//                       <div className="text-gray-700 space-y-4">
//                         <p>
//                           Born and raised in the heart of Kashmir, I've spent the last 12 years sharing the beauty of my homeland with travelers from around the world. My journey began as a local guide in Srinagar, and today I specialize in creating unforgettable luxury experiences that showcase the very best of Kashmir.
//                         </p>
//                         <p>
//                           With an intimate knowledge of hidden gems that most tourists never discover, I pride myself on crafting personalized itineraries that balance iconic destinations with authentic local experiences. Whether it's arranging a private dinner on a shikara boat at sunset, organizing helicopter tours over the Himalayan peaks, or introducing you to master craftsmen in remote villages, my goal is to create memories that will last a lifetime.
//                         </p>
//                         <p>
//                           I'm passionate about sustainable tourism and work closely with local communities to ensure that your visit benefits the people of Kashmir. My connections throughout the region allow me to offer exclusive access to private homes, gardens, and workshops that aren't available to the general public.
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="mb-8">
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">My Signature Experiences</h3>
//                       <div className="grid md:grid-cols-3 gap-4">
//                         <div className="border rounded-lg overflow-hidden">
//                           <img src="/api/placeholder/300/200" alt="Luxury Houseboat" className="w-full h-40 object-cover" />
//                           <div className="p-4">
//                             <h4 className="font-bold">Premium Houseboat Stays</h4>
//                             <p className="text-sm text-gray-600 mt-1">Curated luxury experiences on Dal and Nigeen Lakes with private chefs and cultural performances.</p>
//                           </div>
//                         </div>
//                         <div className="border rounded-lg overflow-hidden">
//                           <img src="/api/placeholder/300/200" alt="Gulmarg Adventure" className="w-full h-40 object-cover" />
//                           <div className="p-4">
//                             <h4 className="font-bold">Gulmarg Adventures</h4>
//                             <p className="text-sm text-gray-600 mt-1">Premier skiing in winter and trekking in summer with expert guides and luxury accommodations.</p>
//                           </div>
//                         </div>
//                         <div className="border rounded-lg overflow-hidden">
//                           <img src="/api/placeholder/300/200" alt="Culinary Tour" className="w-full h-40 object-cover" />
//                           <div className="p-4">
//                             <h4 className="font-bold">Culinary Journeys</h4>
//                             <p className="text-sm text-gray-600 mt-1">Authentic Wazwan feasts, cooking classes, and exclusive dining in historical settings.</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Destinations I Specialize In</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="text-center">
//                           <div className="relative rounded-lg overflow-hidden mb-2">
//                             <img src="/api/placeholder/200/200" alt="Srinagar" className="w-full h-32 object-cover" />
//                             <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//                           </div>
//                           <h4 className="font-medium">Srinagar</h4>
//                         </div>
//                         <div className="text-center">
//                           <div className="relative rounded-lg overflow-hidden mb-2">
//                             <img src="/api/placeholder/200/200" alt="Gulmarg" className="w-full h-32 object-cover" />
//                             <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//                           </div>
//                           <h4 className="font-medium">Gulmarg</h4>
//                         </div>
//                         <div className="text-center">
//                           <div className="relative rounded-lg overflow-hidden mb-2">
//                             <img src="/api/placeholder/200/200" alt="Pahalgam" className="w-full h-32 object-cover" />
//                             <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//                           </div>
//                           <h4 className="font-medium">Pahalgam</h4>
//                         </div>
//                         <div className="text-center">
//                           <div className="relative rounded-lg overflow-hidden mb-2">
//                             <img src="/api/placeholder/200/200" alt="Sonamarg" className="w-full h-32 object-cover" />
//                             <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//                           </div>
//                           <h4 className="font-medium">Sonamarg</h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Tours tab */}
//                 {activeTab === 'tours' && (
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <h2 className="text-2xl font-bold text-gray-900">Upcoming Tours</h2>
//                       <div className="relative">
//                         <select 
//                           className="appearance-none bg-white border rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           value={selectedMonth}
//                           onChange={(e) => setSelectedMonth(e.target.value)}
//                         >
//                           <option value="">All Months</option>
//                           <option value="jan">January 2025</option>
//                           <option value="feb">February 2025</option>
//                           <option value="mar">March 2025</option>
//                           <option value="apr">April 2025</option>
//                           <option value="may">May 2025</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
//                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-6">
//                       {upcomingTours.map(tour => (
//                         <div key={tour.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row">
//                           <div className="md:w-1/3">
//                             <img src={tour.image} alt={tour.title} className="w-full h-48 md:h-full object-cover" />
//                           </div>
//                           <div className="p-6 md:w-2/3 flex flex-col justify-between">
//                             <div>
//                               <div className="flex items-center justify-between mb-2">
//                                 <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
//                                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">{tour.spots}</span>
//                               </div>
//                               <p className="flex items-center text-gray-600 mb-4">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 {tour.date}
//                               </p>
//                               <div className="mb-4">
//                                 <div className="flex gap-2 mb-2">
//                                   <span className="bg-gray-100 px-2 py-1 rounded text-xs">7 days</span>
//                                   <span className="bg-gray-100 px-2 py-1 rounded text-xs">Small group</span>
//                                   <span className="bg-gray-100 px-2 py-1 rounded text-xs">Photography</span>
//                                 </div>
//                                 <p className="text-gray-600 text-sm">Experience the breathtaking beauty of Kashmir in winter with this expertly curated tour featuring luxury accommodations, guided activities, and authentic cultural experiences.</p>
//                               </div>
//                             </div>
//                             {/* <div className="flex items-center justify-between mt-4"></div> */}
//                             <div className="flex items-center justify-between mt-4">
//                               <div>
//                                 <span className="text-2xl font-bold text-gray-900">{tour.price}</span>
//                                 <span className="text-gray-600 text-sm ml-1">per person</span>
//                               </div>
//                               <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
//                                 View Details
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Reviews tab */}
//                 {activeTab === 'reviews' && (
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
//                       <div className="text-gray-600">
//                         <span className="font-bold text-yellow-500">4.9</span> out of 5 (157 reviews)
//                       </div>
//                     </div>
                    
//                     <div className="space-y-6">
//                       {(showAllReviews ? reviews : reviews.slice(0, 3)).map(review => (
//                         <div key={review.id} className="border rounded-lg p-5 bg-white">
//                           <div className="flex justify-between mb-3">
//                             <div className="flex items-center">
//                               <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full mr-3" />
//                               <div>
//                                 <h4 className="font-medium text-gray-900">{review.name}</h4>
//                                 <p className="text-gray-500 text-sm">{review.date}</p>
//                               </div>
//                             </div>
//                             <div className="flex text-yellow-500">
//                               {[...Array(review.rating)].map((_, i) => (
//                                 <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                               ))}
//                             </div>
//                           </div>
//                           <p className="text-gray-700">{review.content}</p>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {!showAllReviews && (
//                       <div className="mt-6 text-center">
//                         <button 
//                           onClick={() => setShowAllReviews(true)}
//                           className="text-blue-600 font-medium hover:text-blue-800"
//                         >
//                           Show all {reviews.length} reviews
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {/* Gallery tab */}
//                 {activeTab === 'gallery' && (
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Gallery</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                       {[...Array(9)].map((_, i) => (
//                         <div key={i} className="rounded-lg overflow-hidden">
//                           <img src={`/api/placeholder/400/300?text=Trip${i+1}`} alt={`Trip photo ${i+1}`} className="w-full h-48 object-cover hover:opacity-90 transition cursor-pointer" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelAgentProfile;
import React, { useState } from 'react';
import { User, Settings, Calendar, DollarSign, Tag, Briefcase, BarChart2, Mail, Phone, MapPin, LogOut } from 'lucide-react';

const AgentProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample agent data
  const agent = {
    name: "",
    agentId: "KT-4872",
    agency: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    profileImg: "/api/placeholder/150/150",
    stats: {
      totalBookings: 0,
      activeBookings: 0,
      monthlyRevenue: 0,
      totalCommission: 0,
      conversionRate: 0
    }
  };
  
  // Sample bookings data
  const recentBookings = [
    { id: "BK-9872", client: "Raj Sharma", package: "Gulmarg Winter Retreat", date: "15 Mar 2025", value: 45000, status: "Confirmed" },
    { id: "BK-9871", client: "Priya Patel", package: "Dal Lake Houseboat Experience", date: "12 Mar 2025", value: 28000, status: "Pending" },
    { id: "BK-9868", client: "John Williams", package: "Pahalgam Adventure Trek", date: "10 Mar 2025", value: 35000, status: "Confirmed" },
    { id: "BK-9865", client: "Meera Singh", package: "Kashmir Cultural Tour", date: "05 Mar 2025", value: 42000, status: "Completed" }
  ];
  
  // Sample special rates
  const specialRates = [
    { package: "Deluxe Houseboat Stay", regularRate: 8000, agentRate: 6800, validUntil: "30 Apr 2025" },
    { package: "Gulmarg Ski Resort", regularRate: 12000, agentRate: 10200, validUntil: "15 May 2025" },
    { package: "Srinagar City Tour", regularRate: 3500, agentRate: 2800, validUntil: "Ongoing" }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-900">Kashmir Travel</h2>
          <p className="text-sm text-gray-500">Agent Portal</p>
        </div>
        
        <div className="flex flex-col mt-6">
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'overview' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            <User size={18} className="mr-3" />
            <span>Overview</span>
          </button>
          
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'bookings' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} className="mr-3" />
            <span>Bookings</span>
          </button>
          
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'commission' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('commission')}
          >
            <DollarSign size={18} className="mr-3" />
            <span>Commission</span>
          </button>
          
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'special-rates' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('special-rates')}
          >
            <Tag size={18} className="mr-3" />
            <span>Special Rates</span>
          </button>
          
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'marketing' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('marketing')}
          >
            <Briefcase size={18} className="mr-3" />
            <span>Marketing</span>
          </button>
          
          <button 
            className={`flex items-center px-6 py-3 ${activeTab === 'settings' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </button>
        </div>
        
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button className="flex items-center text-red-600">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Agent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <img 
                  src="/api/placeholder/40/40" 
                  alt="Agent profile" 
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content based on active tab */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              {/* Profile section */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-start">
                  <img 
                    src={agent.profileImg} 
                    alt={agent.name} 
                    className="h-24 w-24 rounded-full object-cover mr-6"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
                        <p className="text-gray-600">Agent ID: {agent.agentId}</p>
                        <p className="text-gray-600">{agent.agency}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit Profile
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">{agent.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">{agent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">{agent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <h3 className="text-2xl font-bold text-gray-800">{agent.stats.totalBookings}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar size={20} className="text-blue-700" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Monthly Revenue</p>
                      <h3 className="text-2xl font-bold text-gray-800">₹{agent.stats.monthlyRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <BarChart2 size={20} className="text-green-700" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Commission</p>
                      <h3 className="text-2xl font-bold text-gray-800">₹{agent.stats.totalCommission.toLocaleString()}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <DollarSign size={20} className="text-purple-700" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Conversion Rate</p>
                      <h3 className="text-2xl font-bold text-gray-800">{agent.stats.conversionRate}%</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Tag size={20} className="text-yellow-700" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent bookings */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Bookings</h3>
                  <button className="text-blue-600 text-sm">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{booking.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.package}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹{booking.value.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'special-rates' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Special Agent Rates</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regular Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {specialRates.map((rate, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rate.package}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{rate.regularRate.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">₹{rate.agentRate.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                          {Math.round((1 - rate.agentRate/rate.regularRate) * 100)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{rate.validUntil}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                            Book Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Placeholder content for other tabs */}
          {activeTab === 'bookings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">All Bookings</h3>
              {/* <p className="text-gray-600">Detailed booking management interface would go here.</p> */}
            </div>
          )}
          
          {activeTab === 'commission' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Commission Tracking</h3>
              {/* <p className="text-gray-600">Commission history and payment tracking would go here.</p> */}
            </div>
          )}
          
          {activeTab === 'marketing' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Marketing Resources</h3>
              {/* <p className="text-gray-600">Marketing materials and promotional content would go here.</p> */}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              {/* <p className="text-gray-600">Profile and preference settings would go here.</p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfileDashboard;