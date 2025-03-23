import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, Star, X, Clock, Globe, Coffee, Hotel } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

const PriceRangeTab = ({ range, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    Under ${range}
  </button>
);

const TourModal = ({ tour, isOpen, onClose }) => {
  if (!tour) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-xl md:h-full">
              <img
                src="/api/placeholder/800/600"
                alt={tour.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">{tour.title}</h2>
              
              <div className="mt-4 flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>{tour.duration} Days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Max {tour.groupSize} People</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="mr-2 h-5 w-5" />
                  <span>English Speaking Guide</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Hotel className="mr-2 h-5 w-5" />
                  <span>4-5 Star Accommodations</span>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{tour.description}</p>

              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-800">Tour Highlights</h3>
                <ul className="mt-2 space-y-2">
                  {tour.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Coffee className="mr-2 h-4 w-4" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  ${tour.price}
                  <span className="text-sm text-gray-500">/person</span>
                </div>
                <button className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const TourCard = ({ tour, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
  >
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <img
        src="/api/placeholder/800/600"
        alt="Tour destination"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-4 left-4 right-4">
        <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
          Featured
        </span>
        <h3 className="mt-2 text-xl font-bold text-white">{tour.title}</h3>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {tour.duration} Days
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          {tour.groupSize} People
        </div>
        <div className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          {tour.location}
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-gray-600">
        {tour.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 fill-current text-yellow-400" />
          <span className="font-semibold">{tour.rating}</span>
          <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span className="text-xl font-bold text-green-600">{tour.price}</span>
        </div>
      </div>
    </div>
  </div>
);

const ToursGrid = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tours = [
    {
      title: "Swiss Alps Adventure",
      duration: 7,
      groupSize: 12,
      location: "Switzerland",
      description: "Experience the breathtaking beauty of the Swiss Alps with guided hiking and scenic train rides through picturesque mountain villages and glacial valleys.",
      rating: 4.8,
      reviews: 128,
      price: 4999,
      highlights: [
        "Guided hiking tours",
        "Scenic train rides",
        "Mountain lodge stays",
        "Local cuisine experiences",
        "Photography workshops"
      ]
    },
    {
      title: "Tropical Paradise",
      duration: 5,
      groupSize: 8,
      location: "Maldives",
      description: "Relax in luxury overwater villas and explore vibrant coral reefs in the crystal-clear waters of the Maldives. Perfect for honeymoons and special occasions.",
      rating: 4.9,
      reviews: 89,
      price: 5999,
      highlights: [
        "Overwater villa accommodation",
        "Snorkeling tours",
        "Sunset cruises",
        "Spa treatments",
        "Water sports activities"
      ]
    },
    {
      title: "Ancient Wonders",
      duration: 10,
      groupSize: 15,
      location: "Egypt",
      description: "Journey through time exploring pyramids, temples, and the rich history of ancient Egypt. Including a luxury Nile cruise and expert archaeological guides.",
      rating: 4.7,
      reviews: 156,
      price: 6999,
      highlights: [
        "Pyramid tours",
        "Nile River cruise",
        "Temple visits",
        "Archaeological sites",
        "Local market tours"
      ]
    }
  ];

  const priceRanges = [0, 5000, 6000, 7000];

  const filteredTours = tours.filter(tour => 
    selectedPriceRange === 0 || tour.price <= selectedPriceRange
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Featured Tours
      </h2>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <PriceRangeTab 
          range="All" 
          active={selectedPriceRange === 0} 
          onClick={() => setSelectedPriceRange(0)}
        />
        {priceRanges.slice(1).map(range => (
          <PriceRangeTab
            key={range}
            range={range}
            active={selectedPriceRange === range}
            onClick={() => setSelectedPriceRange(range)}
          />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTours.map((tour, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TourCard 
              tour={tour} 
              onClick={() => {
                setSelectedTour(tour);
                setIsModalOpen(true);
              }}
            />
          </motion.div>
        ))}
      </div>

      <TourModal 
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTour(null);
        }}
      />
    </div>
  );
};

export default ToursGrid;