// import React, { useState } from 'react';

// const TrekkingSection = () => {
//   const [activeTab, setActiveTab] = useState('popular');
  
// //   const popularTreks = [
// //     {
// //       id: 1,
// //       name: 'Great Lakes Trek',
// //       difficulty: 'Moderate',
// //       duration: '7 days',
// //       altitude: '13,000 ft',
// //       season: 'July to September',
// //       image: '/api/placeholder/600/400',
// //       description: 'Discover the pristine alpine lakes surrounded by meadows and snow-capped peaks. This trek takes you through Kashmir's most beautiful landscapes.'
// //     },
// //     {
// //       id: 2,
// //       name: 'Tarsar Marsar Trek',
// //       difficulty: 'Moderate to Difficult',
// //       duration: '6 days',
// //       altitude: '13,500 ft',
// //       season: 'June to September',
// //       image: '/api/placeholder/600/400',
// //       description: 'Experience the twin lakes of Tarsar and Marsar, surrounded by meadows and stunning Himalayan views.'
// //     },
// //     {
// //       id: 3,
// //       name: 'Kolahoi Glacier Trek',
// //       difficulty: 'Difficult',
// //       duration: '4 days',
// //       altitude: '15,500 ft',
// //       season: 'June to September',
// //       image: '/api/placeholder/600/400',
// //       description: 'Journey to the largest glacier in Kashmir Valley, offering breathtaking views of surrounding peaks.'
// //     }
// //   ];

// //   const easyTreks = [
// //     {
// //       id: 4,
// //       name: 'Pahalgam Valley Trek',
// //       difficulty: 'Easy',
// //       duration: '2 days',
// //       altitude: '9,000 ft',
// //       season: 'April to October',
// //       image: '/api/placeholder/600/400',
// //       description: 'An ideal weekend getaway trek through the beautiful valleys and forests of Pahalgam.'
// //     },
// //     {
// //       id: 5,
// //       name: 'Tulian Lake Trek',
// //       difficulty: 'Easy to Moderate',
// //       duration: '3 days',
// //       altitude: '11,500 ft',
// //       season: 'June to September',
// //       image: '/api/placeholder/600/400',
// //       description: 'A scenic trek to the pristine Tulian Lake, surrounded by snow-covered mountains.'
// //     }
// //   ];

// //   const testimonials = [
// //     {
// //       id: 1,
// //       name: 'Rahul Sharma',
// //       trek: 'Great Lakes Trek',
// //       comment: 'The most beautiful trek I've ever experienced! Our guide was knowledgeable and the arrangements were perfect.',
// //       rating: 5
// //     },
// //     {
// //       id: 2,
// //       name: 'Priya Patel',
// //       trek: 'Tarsar Marsar Trek',
// //       comment: 'Words cannot describe the beauty of Kashmir's mountains. This trek was challenging but absolutely worth it!',
// //       rating: 5
// //     },
// //     {
// //       id: 3,
// //       name: 'Michael Chen',
// //       trek: 'Pahalgam Valley Trek',
// //       comment: 'Perfect for beginners like me. Stunning views and excellent support from the team.',
// //       rating: 4
// //     }
// //   ];

// //   const displayTreks = activeTab === 'popular' ? popularTreks : easyTreks;
// const popularTreks = [
//     {
//       id: 1,
//       name: 'Great Lakes Trek',
//       difficulty: 'Moderate',
//       duration: '7 days',
//       altitude: '13,000 ft',
//       season: 'July to September',
//       image: '/api/placeholder/600/400',
//       description: 'Discover the pristine alpine lakes surrounded by meadows and snow-capped peaks. This trek takes you through Kashmir\'s most beautiful landscapes.'
//     },
//     {
//       id: 2,
//       name: 'Tarsar Marsar Trek',
//       difficulty: 'Moderate to Difficult',
//       duration: '6 days',
//       altitude: '13,500 ft',
//       season: 'June to September',
//       image: '/api/placeholder/600/400',
//       description: 'Experience the twin lakes of Tarsar and Marsar, surrounded by meadows and stunning Himalayan views.'
//     },
//     {
//       id: 3,
//       name: 'Kolahoi Glacier Trek',
//       difficulty: 'Difficult',
//       duration: '4 days',
//       altitude: '15,500 ft',
//       season: 'June to September',
//       image: '/api/placeholder/600/400',
//       description: 'Journey to the largest glacier in Kashmir Valley, offering breathtaking views of surrounding peaks.'
//     }
//   ];
  
//   const easyTreks = [
//     {
//       id: 4,
//       name: 'Pahalgam Valley Trek',
//       difficulty: 'Easy',
//       duration: '2 days',
//       altitude: '9,000 ft',
//       season: 'April to October',
//       image: '/api/placeholder/600/400',
//       description: 'An ideal weekend getaway trek through the beautiful valleys and forests of Pahalgam.'
//     },
//     {
//       id: 5,
//       name: 'Tulian Lake Trek',
//       difficulty: 'Easy to Moderate',
//       duration: '3 days',
//       altitude: '11,500 ft',
//       season: 'June to September',
//       image: '/api/placeholder/600/400',
//       description: 'A scenic trek to the pristine Tulian Lake, surrounded by snow-covered mountains.'
//     }
//   ];
  
//   const testimonials = [
//     {
//       id: 1,
//       name: 'Rahul Sharma',
//       trek: 'Great Lakes Trek',
//       comment: 'The most beautiful trek I\'ve ever experienced! Our guide was knowledgeable and the arrangements were perfect.',
//       rating: 5
//     },
//     {
//       id: 2,
//       name: 'Priya Patel',
//       trek: 'Tarsar Marsar Trek',
//       comment: 'Words cannot describe the beauty of Kashmir\'s mountains. This trek was challenging but absolutely worth it!',
//       rating: 5
//     },
//     {
//       id: 3,
//       name: 'Michael Chen',
//       trek: 'Pahalgam Valley Trek',
//       comment: 'Perfect for beginners like me. Stunning views and excellent support from the team.',
//       rating: 4
//     }
//   ];
  
//   const displayTreks = activeTab === 'popular' ? popularTreks : easyTreks;
  
//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section */}
//       <div 
//         className="relative bg-cover bg-center h-96 flex items-center justify-center" 
//         style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Trekking in Kashmir
//           </h1>
//           <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
//             Explore the majestic Himalayas and discover the untouched beauty of Kashmir's mountains
//           </p>
//           <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
//             Book Your Trek Now
//           </button>
//         </div>
//       </div>

//       {/* Introduction Section */}
//       <div className="container mx-auto py-16 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">
//             Experience the Heaven on Earth
//           </h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Kashmir offers some of the most spectacular trekking routes in the world. From alpine lakes and meadows to glaciers and snow-capped peaks, each trek provides a unique experience that will leave you breathless. Our expertly guided treks ensure safety while letting you immerse in the pristine beauty of the Himalayas.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="text-green-600 text-4xl mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
//               <p className="text-gray-600">Experienced local guides who know every trail and are trained in first aid and mountain rescue.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="text-green-600 text-4xl mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Quality Equipment</h3>
//               <p className="text-gray-600">Premium camping gear, safety equipment, and comfortable accommodations during your trek.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="text-green-600 text-4xl mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">All-Inclusive Packages</h3>
//               <p className="text-gray-600">Transportation, meals, permits, and accommodations are all taken care of in our packages.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trek Listings */}
//       <div className="bg-green-50 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Popular Treks</h2>
          
//           <div className="flex justify-center mb-8">
//             <div className="inline-flex rounded-md shadow-sm" role="group">
//               <button
//                 type="button"
//                 className={`py-2 px-4 text-sm font-medium rounded-l-lg border ${
//                   activeTab === 'popular' 
//                     ? 'bg-green-600 text-white border-green-600' 
//                     : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
//                 }`}
//                 onClick={() => setActiveTab('popular')}
//               >
//                 Popular Treks
//               </button>
//               <button
//                 type="button"
//                 className={`py-2 px-4 text-sm font-medium rounded-r-lg border ${
//                   activeTab === 'easy' 
//                     ? 'bg-green-600 text-white border-green-600' 
//                     : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
//                 }`}
//                 onClick={() => setActiveTab('easy')}
//               >
//                 Easy Treks
//               </button>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {displayTreks.map(trek => (
//               <div key={trek.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
//                 <img 
//                   src={trek.image} 
//                   alt={trek.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-bold text-gray-800">{trek.name}</h3>
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       trek.difficulty.includes('Easy') ? 'bg-green-100 text-green-800' :
//                       trek.difficulty.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {trek.difficulty}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-4">{trek.description}</p>
//                   <div className="border-t border-gray-200 pt-4">
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       <div className="flex items-center text-sm text-gray-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {trek.duration}
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                         </svg>
//                         {trek.altitude}
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                         {trek.season}
//                       </div>
//                     </div>
//                     <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition duration-300">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="container mx-auto py-16 px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Trekkers Say</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map(testimonial => (
//             <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg 
//                     key={i} 
//                     className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                     fill="currentColor" 
//                     viewBox="0 0 20 20" 
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-500">{testimonial.trek}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-green-600 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2>
//           <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
//             Book your trekking tour today and discover the unparalleled beauty of Kashmir's mountains
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg transition duration-300">
//               View All Treks
//             </button>
//             <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
//               Contact Our Team
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Preparation Tips */}
//       <div className="container mx-auto py-16 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Trek Preparation Tips</h2>
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Physical Preparation
//                 </h3>
//                 <p className="text-gray-600">Start training at least 4-6 weeks before your trek. Focus on cardiovascular endurance and leg strength with activities like hiking, running, and stair climbing.</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Essential Packing
//                 </h3>
//                 <p className="text-gray-600">Pack layers of clothing, quality hiking boots, rain gear, sunscreen, and personal medications. Don't forget a hat, sunglasses, and a reusable water bottle.</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Altitude Sickness Prevention
//                 </h3>
//                 <p className="text-gray-600">Ascend gradually, stay hydrated, avoid alcohol, and consider medication like Diamox after consulting with your doctor. Know the symptoms and don't push yourself too hard.</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Travel Insurance
//                 </h3>
//                 <p className="text-gray-600">Get comprehensive travel insurance that covers trekking activities and emergency evacuation at high altitudes. Keep a copy of your insurance details with you.</p>
//               </div>
//             </div>
//             <div className="mt-8 text-center">
//               <a href="#" className="text-green-600 hover:text-green-800 font-medium">
//                 Download Complete Trekking Guide
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-gray-50 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
//           <div className="max-w-3xl mx-auto">
//             <div className="space-y-4">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold mb-2">What is the best time to trek in Kashmir?</h3>
//                 <p className="text-gray-600">The best time for trekking in Kashmir is from June to September when the weather is relatively stable and the mountain passes are clear of snow. Some lower altitude treks can be done from April to October.</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold mb-2">Do I need to be very fit to go trekking?</h3>
//                 <p className="text-gray-600">The level of fitness required depends on the trek you choose. Easy treks require basic fitness, while moderate to difficult treks demand good cardiovascular endurance and strength. We recommend preparing for any trek with regular exercise for at least 4-6 weeks before your trip.</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold mb-2">What kind of accommodation is provided during treks?</h3>
//                 <p className="text-gray-600">For most treks, we provide high-quality camping equipment including tents, sleeping bags, and mattresses. On some routes, we stay in basic mountain huts or local homestays depending on availability.</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold mb-2">Is it safe to trek in Kashmir?</h3>
//                 <p className="text-gray-600">Yes, the trekking routes in Kashmir are generally safe for tourists. We monitor local conditions closely and employ experienced local guides who know the terrain well. We prioritize your safety and follow all security protocols recommended by local authorities.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrekkingSection;

import React, { useState } from 'react';

const TrekkingSection = () => {
  const [activeTab, setActiveTab] = useState('popular');
  
  const popularTreks = [
    {
      id: 1,
      name: 'Great Lakes Trek',
      difficulty: 'Moderate',
      duration: '7 days',
      altitude: '13,000 ft',
      season: 'July to September',
      image: '/api/placeholder/600/400',
      description: 'Discover the pristine alpine lakes surrounded by meadows and snow-capped peaks.'
    },
    {
      id: 2,
      name: 'Tarsar Marsar Trek',
      difficulty: 'Moderate to Difficult',
      duration: '6 days',
      altitude: '13,500 ft',
      season: 'June to September',
      image: '/api/placeholder/600/400',
      description: 'Experience the twin lakes of Tarsar and Marsar with stunning Himalayan views.'
    },
    {
      id: 3,
      name: 'Kolahoi Glacier Trek',
      difficulty: 'Difficult',
      duration: '4 days',
      altitude: '15,500 ft',
      season: 'June to September',
      image: '/api/placeholder/600/400',
      description: 'Journey to the largest glacier in Kashmir Valley with breathtaking peak views.'
    }
  ];

  const easyTreks = [
    {
      id: 4,
      name: 'Pahalgam Valley Trek',
      difficulty: 'Easy',
      duration: '2 days',
      altitude: '9,000 ft',
      season: 'April to October',
      image: '/api/placeholder/600/400',
      description: 'An ideal weekend getaway trek through the beautiful valleys of Pahalgam.'
    },
    {
      id: 5,
      name: 'Tulian Lake Trek',
      difficulty: 'Easy to Moderate',
      duration: '3 days',
      altitude: '11,500 ft',
      season: 'June to September',
      image: '/api/placeholder/600/400',
      description: 'A scenic trek to the pristine Tulian Lake, surrounded by snow-covered mountains.'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      trek: 'Great Lakes Trek',
      comment: 'The most beautiful trek Ive ever experienced! The arrangements were perfect.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Patel',
      trek: 'Tarsar Marsar Trek',
      comment: 'Words cannot describe Kashmirs beauty. Challenging but absolutely worth it!',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Chen',
      trek: 'Pahalgam Valley Trek',
      comment: 'Perfect for beginners like me. Stunning views and excellent support team.',
      rating: 4
    }
  ];

  const displayTreks = activeTab === 'popular' ? popularTreks : easyTreks;

  return (
    <div className="bg-gray-50">
      {/* Hero Section - More Compact */}
      <div 
        className="relative bg-cover bg-center h-64 flex items-center justify-center" 
        style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Trekking in Kashmir
          </h1>
          <p className="text-lg text-white mb-4 max-w-2xl mx-auto">
            Explore the majestic Himalayas and discover the untouched beauty
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Book Your Trek Now
          </button>
        </div>
      </div>

      {/* Introduction Section - More Compact */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Experience the Heaven on Earth
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Kashmir offers spectacular trekking routes with alpine lakes, meadows, glaciers and snow-capped peaks. Our expertly guided treks ensure safety while immersing you in the pristine beauty of the Himalayas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-orange-500 mb-2 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">Expert Guides</h3>
              <p className="text-gray-600 text-sm text-center">Local guides trained in first aid and mountain rescue.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-orange-500 mb-2 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">Quality Equipment</h3>
              <p className="text-gray-600 text-sm text-center">Premium camping gear and safety equipment.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-orange-500 mb-2 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">All-Inclusive</h3>
              <p className="text-gray-600 text-sm text-center">Transportation, meals, permits, and accommodations included.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trek Listings - More Compact */}
      <div className="bg-orange-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Our Popular Treks</h2>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`py-1 px-4 text-sm font-medium rounded-l-lg border ${
                  activeTab === 'popular' 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('popular')}
              >
                Popular Treks
              </button>
              <button
                type="button"
                className={`py-1 px-4 text-sm font-medium rounded-r-lg border ${
                  activeTab === 'easy' 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('easy')}
              >
                Easy Treks
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTreks.map(trek => (
              <div key={trek.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
                <img 
                  src={trek.image} 
                  alt={trek.name} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{trek.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      trek.difficulty.includes('Easy') ? 'bg-green-100 text-green-800' :
                      trek.difficulty.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trek.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{trek.description}</p>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex flex-wrap gap-2 mb-3 text-xs">
                      <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {trek.duration}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {trek.altitude}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {trek.season}
                      </div>
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 rounded text-sm transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - More Compact */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">What Our Trekkers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-orange-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic text-sm mb-2">"{testimonial.comment}"</p>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                <p className="text-xs text-gray-500">{testimonial.trek}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - More Compact */}
      <div className="bg-orange-500 py-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready for Your Next Adventure?</h2>
          <p className="text-white mb-4 max-w-2xl mx-auto">
            Book your trekking tour today and discover the beauty of Kashmir
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
              View All Treks
            </button>
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Preparation Tips - More Compact */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Trek Preparation Tips</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-semibold mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Physical Preparation
                </h3>
                <p className="text-gray-600 text-sm">Start training 4-6 weeks before your trek. Focus on cardiovascular endurance and leg strength with hiking, running, and stair climbing.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Essential Packing
                </h3>
                <p className="text-gray-600 text-sm">Pack layers of clothing, quality hiking boots, rain gear, sunscreen, medications, hat, sunglasses, and a reusable water bottle.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Altitude Sickness Prevention
                </h3>
                <p className="text-gray-600 text-sm">Ascend gradually, stay hydrated, avoid alcohol, and consider appropriate medication after consulting with your doctor.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Travel Insurance
                </h3>
                <p className="text-gray-600 text-sm">Get comprehensive travel insurance that covers trekking activities and emergency evacuation at high altitudes.</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="#" className="text-orange-500 hover:text-orange-700 font-medium text-sm">
                Download Complete Trekking Guide
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - More Compact */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-base font-semibold mb-1">What is the best time to trek in Kashmir?</h3>
                <p className="text-gray-600 text-sm">The best time is from June to September when the weather is stable and mountain passes are clear of snow. Some lower altitude treks can be done from April to October.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-base font-semibold mb-1">Do I need to be very fit to go trekking?</h3>
                <p className="text-gray-600 text-sm">The fitness level depends on the trek. Easy treks require basic fitness, while difficult treks demand good endurance. We recommend regular exercise for 4-6 weeks before your trip.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-base font-semibold mb-1">What kind of accommodation is provided?</h3>
                <p className="text-gray-600 text-sm">We provide high-quality camping equipment including tents, sleeping bags, and mattresses. On some routes, we stay in basic mountain huts or local homestays.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-base font-semibold mb-1">Is it safe to trek in Kashmir?</h3>
                <p className="text-gray-600 text-sm">Yes, our trekking routes are generally safe. We monitor conditions closely and employ experienced local guides who know the terrain well and follow all security protocols.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekkingSection;