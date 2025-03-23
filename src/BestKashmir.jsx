// import React from 'react';

// const BestKashmir = () => {
//   return (
//     <div className="best-kashmir-container">
//       <div className="hero-section">
//         <h1 className="main-title">Discover Paradise: Best of Kashmir</h1>
//         <p className="subtitle">Experience the breathtaking beauty of the crown jewel of India</p>
//       </div>

//       <section className="destination-highlights">
//         <h2>Top Destinations in Kashmir</h2>
//         <div className="destinations-grid">
//           {destinations.map((destination) => (
//             <div className="destination-card" key={destination.id}>
//               <div className="destination-image">
//                 <img src={destination.image} alt={destination.name} />
//               </div>
//               <div className="destination-info">
//                 <h3>{destination.name}</h3>
//                 <p>{destination.description}</p>
//                 <div className="destination-meta">
//                   <span className="best-time">Best time: {destination.bestTime}</span>
//                   <span className="duration">Duration: {destination.duration}</span>
//                 </div>
//                 <button className="explore-btn">Explore More</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="kashmir-experience">
//         <h2>Why Visit Kashmir?</h2>
//         <div className="experience-grid">
//           {experiences.map((experience) => (
//             <div className="experience-card" key={experience.id}>
//               <div className="experience-icon">{experience.icon}</div>
//               <h3>{experience.title}</h3>
//               <p>{experience.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="travel-tips">
//         <h2>Essential Travel Tips</h2>
//         <div className="tips-container">
//           {travelTips.map((tip) => (
//             <div className="tip-card" key={tip.id}>
//               <h3>{tip.title}</h3>
//               <p>{tip.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="booking-section">
//         <h2>Ready to Explore Kashmir?</h2>
//         <p>Plan your dream vacation to the paradise on earth with our expert travel advisors.</p>
//         <div className="booking-actions">
//           <button className="primary-btn">Book a Package</button>
//           <button className="secondary-btn">Custom Tour</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Data for destinations
// const destinations = [
//   {
//     id: 1,
//     name: "Srinagar - Dal Lake",
//     description: "Experience the serene beauty of Dal Lake with a stay in a traditional houseboat and explore the floating markets.",
//     image: "/images/dal-lake.jpg",
//     bestTime: "Apr-Oct",
//     duration: "2-3 days"
//   },
//   {
//     id: 2,
//     name: "Gulmarg",
//     description: "Visit Asia's premier ski destination with breathtaking meadows, gondola rides and panoramic Himalayan views.",
//     image: "/images/gulmarg.jpg",
//     bestTime: "Dec-Feb (Snow), Jun-Sep (Summer)",
//     duration: "2 days"
//   },
//   {
//     id: 3,
//     name: "Pahalgam",
//     description: "Discover the Valley of Shepherds with lush pine forests, flowing rivers and stunning mountain trails.",
//     image: "/images/pahalgam.jpg",
//     bestTime: "Mar-Jun, Sep-Nov",
//     duration: "2-3 days"
//   },
//   {
//     id: 4,
//     name: "Sonmarg",
//     description: "Explore the Meadow of Gold with glaciers, alpine lakes and spectacular mountain scenery.",
//     image: "/images/sonmarg.jpg",
//     bestTime: "Apr-Jun, Sep-Oct",
//     duration: "1-2 days"
//   },
//   {
//     id: 5,
//     name: "Betaab Valley",
//     description: "Trek through the scenic valley made famous by Bollywood, with crystal-clear streams and towering mountains.",
//     image: "/images/betaab.jpg",
//     bestTime: "Apr-Oct",
//     duration: "1 day"
//   },
//   {
//     id: 6,
//     name: "Mughal Gardens",
//     description: "Tour the spectacular Persian-style gardens featuring terraced lawns, cascading fountains, and colorful flowerbeds.",
//     image: "/images/mughal-gardens.jpg",
//     bestTime: "Apr-Oct",
//     duration: "1 day"
//   }
// ];

// // Data for experiences
// const experiences = [
//   {
//     id: 1,
//     icon: "🏔️",
//     title: "Breathtaking Landscapes",
//     description: "From snow-capped mountains to lush valleys, Kashmir offers diverse natural beauty that will leave you spellbound."
//   },
//   {
//     id: 2,
//     icon: "🛥️",
//     title: "Unique Houseboats",
//     description: "Experience luxurious stays aboard traditional Kashmiri houseboats with ornate woodwork and personalized service."
//   },
//   {
//     id: 3,
//     icon: "🥘",
//     title: "Rich Culinary Heritage",
//     description: "Savor authentic Wazwan cuisine with aromatic spices and traditional cooking techniques passed down generations."
//   },
//   {
//     id: 4,
//     icon: "🧵",
//     title: "Exquisite Handicrafts",
//     description: "Shop for world-famous Pashmina shawls, Kashmiri carpets, and intricate papier-mâché crafts from local artisans."
//   }
// ];

// // Data for travel tips
// const travelTips = [
//   {
//     id: 1,
//     title: "Best Time to Visit",
//     description: "For lush green valleys, visit between March and October. For snow adventures, plan your trip between December and February."
//   },
//   {
//     id: 2,
//     title: "Local Transportation",
//     description: "Hire local taxis for day trips or book a package tour. Shikara rides in Dal Lake are a must for local sightseeing."
//   },
//   {
//     id: 3,
//     title: "Accommodations",
//     description: "Choose from luxurious houseboats on Dal Lake, heritage hotels in Srinagar, or cozy cottages in hill stations."
//   },
//   {
//     id: 4,
//     title: "Safety Information",
//     description: "Check the latest travel advisories before planning. Most tourist areas are safe and welcoming to visitors."
//   }
// ];

// export default BestKashmir;



import React from 'react';

const BestKashmir = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative py-24 px-4 bg-cover bg-center h-96 flex items-center justify-center" 
           style={{backgroundImage: "url('/images/kashmir-panorama.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Discover Paradise: Best of Kashmir</h1>
          <p className="text-xl text-white">Experience the breathtaking beauty of the crown jewel of India</p>
          <button className="mt-8 bg-white text-blue-800 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
            Explore Now
          </button>
        </div>
      </div>

      {/* Top Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Top Destinations in Kashmir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center mb-2 sm:mb-0">
                    <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Best time: {destination.bestTime}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Duration: {destination.duration}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Visit Kashmir */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Visit Kashmir?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{experience.title}</h3>
                <p className="text-gray-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Essential Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelTips.map((tip) => (
            <div key={tip.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Kashmir Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg h-48 shadow-md hover:shadow-xl transition duration-300">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Kashmir?</h2>
          <p className="text-xl mb-8">Plan your dream vacation to the paradise on earth with our expert travel advisors.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
              Book a Package
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
              Custom Tour
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.date}</p>
                </div>
              </div>
              <div className="flex mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

// Data for destinations
const destinations = [
  {
    id: 1,
    name: "Srinagar - Dal Lake",
    description: "Experience the serene beauty of Dal Lake with a stay in a traditional houseboat and explore the floating markets.",
    image: "/images/dal-lake.jpg",
    bestTime: "Apr-Oct",
    duration: "2-3 days"
  },
  {
    id: 2,
    name: "Gulmarg",
    description: "Visit Asia's premier ski destination with breathtaking meadows, gondola rides and panoramic Himalayan views.",
    image: "/images/gulmarg.jpg",
    bestTime: "Dec-Feb (Snow), Jun-Sep (Summer)",
    duration: "2 days"
  },
  {
    id: 3,
    name: "Pahalgam",
    description: "Discover the Valley of Shepherds with lush pine forests, flowing rivers and stunning mountain trails.",
    image: "/images/pahalgam.jpg",
    bestTime: "Mar-Jun, Sep-Nov",
    duration: "2-3 days"
  },
  {
    id: 4,
    name: "Sonmarg",
    description: "Explore the Meadow of Gold with glaciers, alpine lakes and spectacular mountain scenery.",
    image: "/images/sonmarg.jpg",
    bestTime: "Apr-Jun, Sep-Oct",
    duration: "1-2 days"
  },
  {
    id: 5,
    name: "Betaab Valley",
    description: "Trek through the scenic valley made famous by Bollywood, with crystal-clear streams and towering mountains.",
    image: "/images/betaab.jpg",
    bestTime: "Apr-Oct",
    duration: "1 day"
  },
  {
    id: 6,
    name: "Mughal Gardens",
    description: "Tour the spectacular Persian-style gardens featuring terraced lawns, cascading fountains, and colorful flowerbeds.",
    image: "/images/mughal-gardens.jpg",
    bestTime: "Apr-Oct",
    duration: "1 day"
  }
];

// Data for experiences
const experiences = [
  {
    id: 1,
    icon: "🏔️",
    title: "Breathtaking Landscapes",
    description: "From snow-capped mountains to lush valleys, Kashmir offers diverse natural beauty that will leave you spellbound."
  },
  {
    id: 2,
    icon: "🛥️",
    title: "Unique Houseboats",
    description: "Experience luxurious stays aboard traditional Kashmiri houseboats with ornate woodwork and personalized service."
  },
  {
    id: 3,
    icon: "🥘",
    title: "Rich Culinary Heritage",
    description: "Savor authentic Wazwan cuisine with aromatic spices and traditional cooking techniques passed down generations."
  },
  {
    id: 4,
    icon: "🧵",
    title: "Exquisite Handicrafts",
    description: "Shop for world-famous Pashmina shawls, Kashmiri carpets, and intricate papier-mâché crafts from local artisans."
  }
];

// Data for travel tips
const travelTips = [
  {
    id: 1,
    title: "Best Time to Visit",
    description: "For lush green valleys, visit between March and October. For snow adventures, plan your trip between December and February."
  },
  {
    id: 2,
    title: "Local Transportation",
    description: "Hire local taxis for day trips or book a package tour. Shikara rides in Dal Lake are a must for local sightseeing."
  },
  {
    id: 3,
    title: "Accommodations",
    description: "Choose from luxurious houseboats on Dal Lake, heritage hotels in Srinagar, or cozy cottages in hill stations."
  },
  {
    id: 4,
    title: "Safety Information",
    description: "Check the latest travel advisories before planning. Most tourist areas are safe and welcoming to visitors."
  }
];

// Data for gallery
const galleryImages = [
  { id: 1, url: "/images/kashmir-gallery-1.jpg", alt: "Dal Lake Houseboats" },
  { id: 2, url: "/images/kashmir-gallery-2.jpg", alt: "Gulmarg Snow" },
  { id: 3, url: "/images/kashmir-gallery-3.jpg", alt: "Mughal Gardens" },
  { id: 4, url: "/images/kashmir-gallery-4.jpg", alt: "Pahalgam Valley" },
  { id: 5, url: "/images/kashmir-gallery-5.jpg", alt: "Kashmiri Food" },
  { id: 6, url: "/images/kashmir-gallery-6.jpg", alt: "Shikara Ride" },
  { id: 7, url: "/images/kashmir-gallery-7.jpg", alt: "Kashmiri Handicrafts" },
  { id: 8, url: "/images/kashmir-gallery-8.jpg", alt: "Mountain Trekking" }
];

// Data for testimonials
// const testimon
export default BestKashmir;