import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, Star } from 'lucide-react';

const TourListings = ({ selectedDestination, allTours }) => {
  // Filter tours based on selected destination
  const matchingTours = allTours.filter(
    tour => tour.location.toLowerCase() === selectedDestination?.name?.toLowerCase()
  );
  
  const otherTours = allTours.filter(
    tour => tour.location.toLowerCase() !== selectedDestination?.name?.toLowerCase()
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const TourCard = ({ tour, isHighlighted = false }) => (
    <motion.div
      variants={item}
      className={`rounded-xl overflow-hidden shadow-lg ${
        isHighlighted ? 'bg-red-50/10' : 'bg-white/5'
      } backdrop-blur-lg`}
    >
      <div className="relative">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${tour.price}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{tour.title}</h3>
        
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <MapPin size={16} />
          <span className="text-sm">{tour.location}</span>
        </div>
        
        <p className="text-white/80 text-sm mb-4">{tour.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar size={16} />
            <span className="text-sm">{tour.duration} days</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Clock size={16} />
            <span className="text-sm">Best time: {tour.bestTime}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Users size={16} />
            <span className="text-sm">Max: {tour.maxPeople} people</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Star size={16} className="text-yellow-400" />
            <span className="text-sm">{tour.rating} ({tour.reviews} reviews)</span>
          </div>
        </div>
        
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors">
          Book Now
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedDestination && matchingTours.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Tours in {selectedDestination.name}
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {matchingTours.map(tour => (
              <TourCard key={tour.id} tour={tour} isHighlighted={true} />
            ))}
          </motion.div>
        </div>
      )}

      {otherTours.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Other Popular Tours
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TourListings;
// const tours = [
//   {
//     id: 1,
//     title: "Dal Lake Houseboat Experience",
//     location: "Srinagar",
//     description: "Experience the beauty of Dal Lake...",
//     price: 299,
//     image: "/path-to-image.jpg",
//     duration: 3,
//     bestTime: "Apr-Oct",
//     maxPeople: 8,
//     rating: 4.8,
//     reviews: 127
//   },
//   // ... more tours
// ];const MainPage = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
  
//   return (
//     <div>
//       <SearchBar 
//         onDestinationSelect={setSelectedDestination}
//         tours={tours} // Your tours data
//       />
//       <TourListings 
//         selectedDestination={selectedDestination}
//         allTours={tours} // Your tours data
//       />
//     </div>
//   );
// };
// const MainPage = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
  
//   return (
//     <div>
//       <SearchBar 
//         onDestinationSelect={setSelectedDestination}
//         tours={tours} // Your tours data
//       />
//       <TourListings 
//         selectedDestination={selectedDestination}
//         allTours={tours} // Your tours data
//       />
//     </div>
//   );
// };