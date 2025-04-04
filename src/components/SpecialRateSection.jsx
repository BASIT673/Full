// // import React, { useState } from 'react';
// // import { Tag, Calendar, Download, Search, Filter, Info } from 'lucide-react';

// // const SpecialRatesSection = ({ activeTab, setActiveTab }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterType, setFilterType] = useState('all');
// //   const [specialRates, setSpecialRates] = useState([
// //     { id: 1, package: "Deluxe Houseboat Stay", location: "Srinagar", regularRate: 8000, agentRate: 6800, validUntil: "30 Apr 2025", category: "stay", discount: 15, isNew: true },
// //     { id: 2, package: "Gulmarg Ski Resort", location: "Gulmarg", regularRate: 12000, agentRate: 10200, validUntil: "15 May 2025", category: "adventure", discount: 15, isNew: false },
// //     { id: 3, package: "Srinagar City Tour", location: "Srinagar", regularRate: 3500, agentRate: 2800, validUntil: "Ongoing", category: "tour", discount: 20, isNew: false },
// //     { id: 4, package: "Pahalgam Adventure Package", location: "Pahalgam", regularRate: 9500, agentRate: 7600, validUntil: "31 May 2025", category: "adventure", discount: 20, isNew: true },
// //     { id: 5, package: "Dal Lake Shikara Ride", location: "Srinagar", regularRate: 1800, agentRate: 1350, validUntil: "Ongoing", category: "activity", discount: 25, isNew: false }
// //   ]);
  
// //   // Filter rates based on search and filter
// //   const filteredRates = specialRates.filter(rate => {
// //     const matchesSearch = rate.package.toLowerCase().includes(searchTerm.toLowerCase()) || 
// //                           rate.location.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesFilter = filterType === 'all' || rate.category === filterType;
// //     return matchesSearch && matchesFilter;
// //   });

// //   // Calculate days remaining for validity
// //   const calculateDaysRemaining = (validDate) => {
// //     if (validDate === "Ongoing") return Infinity;
    
// //     const validUntil = new Date(validDate);
// //     const today = new Date();
// //     const timeDiff = validUntil - today;
// //     return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// //   };

// //   return (
// //     <div className={`p-6 ${activeTab === 'special-rates' ? 'block' : 'hidden'}`}>
// //       <div className="flex flex-col space-y-6">
// //         <div className="flex justify-between items-center">
// //           <h2 className="text-2xl font-bold">Special Agent Rates</h2>
// //           <div className="flex space-x-2">
// //             <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium">
// //               <Calendar size={16} className="mr-2" />
// //               Apr-May 2025
// //             </button>
// //             <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
// //               <Download size={16} className="mr-2" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
        
// //         {/* Search and filter bar */}
// //         <div className="flex space-x-4">
// //           <div className="relative flex-grow">
// //             <Search size={16} className="absolute left-3 top-3 text-gray-400" />
// //             <input
// //               placeholder="Search packages or locations..."
// //               className="pl-10 w-full px-3 py-2 border rounded-md text-sm"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>
// //           <div className="flex space-x-2">
// //             <button 
// //               className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                 filterType === 'all' ? 'bg-blue-600 text-white' : 'border text-gray-700'
// //               }`}
// //               onClick={() => setFilterType('all')}
// //             >
// //               All
// //             </button>
// //             <button 
// //               className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                 filterType === 'stay' ? 'bg-blue-600 text-white' : 'border text-gray-700'
// //               }`}
// //               onClick={() => setFilterType('stay')}
// //             >
// //               Stays
// //             </button>
// //             <button 
// //               className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                 filterType === 'tour' ? 'bg-blue-600 text-white' : 'border text-gray-700'
// //               }`}
// //               onClick={() => setFilterType('tour')}
// //             >
// //               Tours
// //             </button>
// //             <button 
// //               className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                 filterType === 'adventure' ? 'bg-blue-600 text-white' : 'border text-gray-700'
// //               }`}
// //               onClick={() => setFilterType('adventure')}
// //             >
// //               Adventure
// //             </button>
// //             <button 
// //               className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                 filterType === 'activity' ? 'bg-blue-600 text-white' : 'border text-gray-700'
// //               }`}
// //               onClick={() => setFilterType('activity')}
// //             >
// //               Activities
// //             </button>
// //           </div>
// //         </div>
        
// //         {/* Rates cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredRates.map((rate) => {
// //             const daysRemaining = calculateDaysRemaining(rate.validUntil);
// //             const isExpiringSoon = daysRemaining < 30 && daysRemaining !== Infinity;
            
// //             return (
// //               <div key={rate.id} className="overflow-hidden border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
// //                 <div className="bg-gray-50 p-4 border-b">
// //                   <div className="flex justify-between items-start">
// //                     <h3 className="text-lg font-bold">{rate.package}</h3>
// //                     {rate.isNew && (
// //                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //                         NEW
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="text-sm text-gray-500 flex items-center mt-1">
// //                     <Tag size={14} className="mr-1" />
// //                     {rate.location}
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   <div className="flex justify-between text-sm pb-2">
// //                     <span className="text-gray-500">Regular Rate</span>
// //                     <span className="line-through">₹{rate.regularRate}</span>
// //                   </div>
// //                   <div className="flex justify-between pb-3">
// //                     <span className="font-semibold">Agent Rate</span>
// //                     <span className="font-bold text-blue-600">₹{rate.agentRate}</span>
// //                   </div>
// //                   <div className="bg-blue-50 p-2 rounded-md flex items-center justify-between">
// //                     <div className="flex items-center">
// //                       <Info size={14} className="text-blue-500 mr-2" />
// //                       <span className="text-blue-700 text-sm">Save {rate.discount}%</span>
// //                     </div>
// //                     <span className={`text-sm font-medium ${isExpiringSoon ? 'text-red-500' : 'text-gray-600'}`}>
// //                       {rate.validUntil === "Ongoing" ? 
// //                         "No expiry" : 
// //                         isExpiringSoon ? 
// //                           `Expires in ${daysRemaining} days` : 
// //                           `Valid until ${rate.validUntil}`
// //                       }
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div className="bg-gray-50 p-4 flex justify-between">
// //                   <button className="px-3 py-1.5 border rounded-md text-sm font-medium">Details</button>
// //                   <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium">Book Now</button>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
        
// //         {filteredRates.length === 0 && (
// //           <div className="text-center py-12 bg-gray-50 rounded-lg">
// //             <div className="text-gray-400 mb-2">
// //               <Search size={32} className="mx-auto" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-700">No matching packages found</h3>
// //             <p className="text-gray-500">Try adjusting your search or filters</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpecialRatesSection;





// import React, { useState } from 'react';
// import { Tag, Calendar, Download, Search, Info } from 'lucide-react';

// const SpecialRatesSection = ({ activeTab, setActiveTab }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [specialRates, setSpecialRates] = useState([
//     { id: 1, package: "Deluxe Houseboat Stay", location: "Srinagar", regularRate: 8000, agentRate: 6800, validUntil: "30 Apr 2025", discount: 15, isNew: true },
//     { id: 2, package: "Gulmarg Ski Resort", location: "Gulmarg", regularRate: 12000, agentRate: 10200, validUntil: "15 May 2025", discount: 15, isNew: false },
//     { id: 3, package: "Srinagar City Tour", location: "Srinagar", regularRate: 3500, agentRate: 2800, validUntil: "Ongoing", discount: 20, isNew: false },
//     { id: 4, package: "Pahalgam Adventure Package", location: "Pahalgam", regularRate: 9500, agentRate: 7600, validUntil: "31 May 2025", discount: 20, isNew: true },
//     { id: 5, package: "Dal Lake Shikara Ride", location: "Srinagar", regularRate: 1800, agentRate: 1350, validUntil: "Ongoing", discount: 25, isNew: false }
//   ]);
  
//   // Filter rates based on search only (removed category filter)
//   const filteredRates = specialRates.filter(rate => {
//     return rate.package.toLowerCase().includes(searchTerm.toLowerCase()) || 
//            rate.location.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   // Calculate days remaining for validity
//   const calculateDaysRemaining = (validDate) => {
//     if (validDate === "Ongoing") return Infinity;
    
//     const validUntil = new Date(validDate);
//     const today = new Date();
//     const timeDiff = validUntil - today;
//     return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   };
  
//   // Handle booking function
//   const handleBookNow = (rateId) => {
//     alert(`Booking package ID: ${rateId}`);
//     // Here you would typically redirect to a booking page or open a booking modal
//     console.log(`Booking initiated for package ID: ${rateId}`);
//   };
  
//   // Handle details function
//   const handleViewDetails = (rateId) => {
//     alert(`Viewing details for package ID: ${rateId}`);
//     // Here you would typically show more details or redirect to a details page
//     console.log(`Viewing details for package ID: ${rateId}`);
//   };

//   return (
//     <div className={`p-6 ${activeTab === 'special-rates' ? 'block' : 'hidden'}`}>
//       <div className="flex flex-col space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-orange-700">Special Agent Rates</h2>
//           <div className="flex space-x-2">
//             <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium">
//               <Calendar size={16} className="mr-2" />
//               Apr-May 2025
//             </button>
//             <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
//               <Download size={16} className="mr-2" />
//               Export
//             </button>
//           </div>
//         </div>
        
//         {/* Search bar (removed filter buttons) */}
//         <div className="flex">
//           <div className="relative flex-grow">
//             <Search size={16} className="absolute left-3 top-3 text-gray-400" />
//             <input
//               placeholder="Search packages or locations..."
//               className="pl-10 w-full px-3 py-2 border rounded-md text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
        
//         {/* Rates cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRates.map((rate) => {
//             const daysRemaining = calculateDaysRemaining(rate.validUntil);
//             const isExpiringSoon = daysRemaining < 30 && daysRemaining !== Infinity;
            
//             return (
//               <div key={rate.id} className="overflow-hidden border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all">
//                 <div className="bg-gray-50 p-4 border-b">
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-lg font-bold text-orange-700">{rate.package}</h3>
//                     {rate.isNew && (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         NEW
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-500 flex items-center mt-1">
//                     <Tag size={14} className="mr-1" />
//                     {rate.location}
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between text-sm pb-2">
//                     <span className="text-gray-500">Regular Rate</span>
//                     <span className="line-through">₹{rate.regularRate}</span>
//                   </div>
//                   <div className="flex justify-between pb-3">
//                     <span className="font-semibold">Agent Rate</span>
//                     <span className="font-bold text-orange-600">₹{rate.agentRate}</span>
//                   </div>
//                   <div className="bg-orange-50 p-2 rounded-md flex items-center justify-between">
//                     <div className="flex items-center">
//                       <Info size={14} className="text-orange-500 mr-2" />
//                       <span className="text-orange-700 text-sm">Save {rate.discount}%</span>
//                     </div>
//                     <span className={`text-sm font-medium ${isExpiringSoon ? 'text-red-500' : 'text-gray-600'}`}>
//                       {rate.validUntil === "Ongoing" ? 
//                         "No expiry" : 
//                         isExpiringSoon ? 
//                           `Expires in ${daysRemaining} days` : 
//                           `Valid until ${rate.validUntil}`
//                       }
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 flex justify-between">
//                   <button 
//                     onClick={() => handleViewDetails(rate.id)} 
//                     className="px-3 py-1.5 border border-orange-500 text-orange-500 rounded-md text-sm font-medium hover:bg-orange-50"
//                   >
//                     Details
//                   </button>
//                   <button 
//                     onClick={() => handleBookNow(rate.id)} 
//                     className="px-3 py-1.5 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         {filteredRates.length === 0 && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <div className="text-gray-400 mb-2">
//               <Search size={32} className="mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-700">No matching packages found</h3>
//             <p className="text-gray-500">Try adjusting your search</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpecialRatesSection;






import React, { useState } from 'react';
import { Tag, Calendar, Download, Search, Info, Phone, Clock, MapPin } from 'lucide-react';

const SpecialRatesSection = ({ activeTab, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [specialRates, setSpecialRates] = useState([
    { 
      id: 1, 
      package: "Deluxe Houseboat Stay", 
      location: "Srinagar", 
      regularRate: 8000, 
      agentRate: 6800, 
      validUntil: "30 Apr 2025", 
      discount: 15, 
      isNew: true,
      duration: "3 Days / 2 Nights",
      itinerary: "Day 1: Check-in to luxury houseboat, evening Shikara ride\nDay 2: Local sightseeing, Mughal Gardens\nDay 3: Breakfast, check-out by 11AM",
    
    },
    { 
      id: 2, 
      package: "Gulmarg Ski Resort", 
      location: "Gulmarg", 
      regularRate: 12000, 
      agentRate: 10200, 
      validUntil: "15 May 2025", 
      discount: 15, 
      isNew: false,
      duration: "4 Days / 3 Nights",
      itinerary: "Day 1: Arrival and transfer to resort\nDay 2: Ski lessons with instructor\nDay 3: Gondola ride and free skiing\nDay 4: Departure after breakfast",
    
    },
    { 
      id: 3, 
      package: "Srinagar City Tour", 
      location: "Srinagar", 
      regularRate: 3500, 
      agentRate: 2800, 
      validUntil: "Ongoing", 
      discount: 20, 
      isNew: false,
      duration: "1 Day",
      itinerary: "Morning: Visit Shankaracharya Temple and Dal Lake\nAfternoon: Explore Mughal Gardens and old city markets\nEvening: Return with souvenir shopping",
   
    },
    { 
      id: 4, 
      package: "Pahalgam Adventure Package", 
      location: "Pahalgam", 
      regularRate: 9500, 
      agentRate: 7600, 
      validUntil: "31 May 2025", 
      discount: 20, 
      isNew: true,
      duration: "5 Days / 4 Nights",
      itinerary: "Day 1: Arrival and hotel check-in\nDay 2: River rafting in Lidder river\nDay 3: Trekking to Tulian Lake\nDay 4: Horse riding and local exploring\nDay 5: Departure after breakfast",
     
    },
    { 
      id: 5, 
      package: "Dal Lake Shikara Ride", 
      location: "Srinagar", 
      regularRate: 1800, 
      agentRate: 1350, 
      validUntil: "Ongoing", 
      discount: 25, 
      isNew: false,
      duration: "2 Hours",
      itinerary: "Scenic ride through the famous Dal Lake\nVisit to floating gardens and markets\nPhotography opportunities at sunset",
    //   phoneNumber: "+91 9876543214"
    }
  ]);
  
  // Filter rates based on search
  const filteredRates = specialRates.filter(rate => {
    return rate.package.toLowerCase().includes(searchTerm.toLowerCase()) || 
           rate.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate days remaining for validity
  const calculateDaysRemaining = (validDate) => {
    if (validDate === "Ongoing") return Infinity;
    
    const validUntil = new Date(validDate);
    const today = new Date();
    const timeDiff = validUntil - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  
  // Handle booking function - now makes a phone call
  const handleBookNow = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
    console.log(`Calling to book: ${phoneNumber}`);
  };
  
  // Handle details function
  const handleViewDetails = (rateId) => {
    if (expandedDetails === rateId) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(rateId);
    }
  };

  return (
    <div className={`p-6 ${activeTab === 'special-rates' ? '' : ''}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-700">Special Agent Rates</h2>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium">
              <Calendar size={16} className="mr-2" />
              Apr-May 2025
            </button>
            <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="flex">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search packages or locations..."
              className="pl-10 w-full px-3 py-2 border rounded-md text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Rates cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRates.map((rate) => {
            const daysRemaining = calculateDaysRemaining(rate.validUntil);
            const isExpiringSoon = daysRemaining < 30 && daysRemaining !== Infinity;
            const isExpanded = expandedDetails === rate.id;
            
            return (
              <div key={rate.id} className="overflow-hidden border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-orange-700">{rate.package}</h3>
                    {rate.isNew && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {rate.location}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {rate.duration}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between text-sm pb-2">
                    <span className="text-gray-500">Regular Rate</span>
                    <span className="line-through">₹{rate.regularRate}</span>
                  </div>
                  <div className="flex justify-between pb-3">
                    <span className="font-semibold">Agent Rate</span>
                    <span className="font-bold text-orange-600">₹{rate.agentRate}</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <Info size={14} className="text-orange-500 mr-2" />
                      <span className="text-orange-700 text-sm">Save {rate.discount}%</span>
                    </div>
                    <span className={`text-sm font-medium ${isExpiringSoon ? 'text-red-500' : 'text-gray-600'}`}>
                      {rate.validUntil === "Ongoing" ? 
                        "No expiry" : 
                        isExpiringSoon ? 
                          `Expires in ${daysRemaining} days` : 
                          `Valid until ${rate.validUntil}`
                      }
                    </span>
                  </div>
                </div>
                
                {/* Expandable Details Section */}
                {isExpanded && (
                  <div className="p-4 border-t border-b bg-orange-50">
                    <h4 className="font-medium text-orange-700 mb-2">Brief Itinerary</h4>
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {rate.itinerary}
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 flex justify-between">
                  <button 
                    onClick={() => handleViewDetails(rate.id)} 
                    className={`px-3 py-1.5 border rounded-md text-sm font-medium ${
                      isExpanded ? 'bg-orange-100 border-orange-500 text-orange-700' : 'border-orange-500 text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                  </button>
                  <button 
                    onClick={() => handleBookNow(rate.phoneNumber)} 
                    className="px-3 py-1.5 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 flex items-center"
                  >
                    <Phone size={14} className="mr-1" />
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredRates.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 mb-2">
              <Search size={32} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No matching packages found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialRatesSection;