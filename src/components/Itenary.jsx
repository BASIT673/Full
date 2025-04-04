// import React, { useState } from 'react';
// import { Calendar, Clock, MapPin, Plus, Trash2, Edit, DollarSign, Send, Download, Clipboard, MessageSquare, Save, Zap,  Globe, Hotel, Train, Bus, Plane, Coffee, Navigation, Camera, Star } from 'lucide-react';

// const ItineraryBuilder = () => {
//   // Sample destinations
//   const destinations = [
//     { id: 1, name: "Srinagar", image: "/api/placeholder/100/60" },
//     { id: 2, name: "Gulmarg", image: "/api/placeholder/100/60" },
//     { id: 3, name: "Pahalgam", image: "/api/placeholder/100/60" },
//     { id: 4, name: "Sonamarg", image: "/api/placeholder/100/60" },
//     { id: 5, name: "Leh", image: "/api/placeholder/100/60" }
//   ];

//   // Sample services
//   const services = [
//     { id: 1, type: "hotel", name: "Vivanta Dal View", location: "Srinagar", price: 12000, rating: 4.8 },
//     { id: 2, type: "hotel", name: "The Khyber Himalayan", location: "Gulmarg", price: 18000, rating: 4.9 },
//     { id: 3, type: "transfer", name: "Private Car Transfer", from: "Srinagar", to: "Gulmarg", price: 3500, type: "car" },
//     { id: 4, type: "activity", name: "Shikara Ride on Dal Lake", location: "Srinagar", price: 1200, duration: "1.5 hours" },
//     { id: 5, type: "meal", name: "Traditional Wazwan Dinner", location: "Srinagar", price: 1500, cuisine: "Kashmiri" }
//   ];

//   // Sample templates
//   const templates = [
//     { id: 1, name: "Kashmir Honeymoon - 5 Days", destinations: ["Srinagar", "Gulmarg", "Pahalgam"] },
//     { id: 2, name: "Kashmir Family Adventure - 7 Days", destinations: ["Srinagar", "Gulmarg", "Sonamarg", "Pahalgam"] },
//     { id: 3, name: "Ladakh Explorer - 10 Days", destinations: ["Leh", "Nubra Valley", "Pangong Lake", "Tso Moriri"] }
//   ];

//   // State for current itinerary
//   const [currentItinerary, setCurrentItinerary] = useState({
//     clientName: "Aryan Sharma",
//     travelDates: "April 10-16, 2025",
//     numberOfTravelers: 2,
//     budget: 85000,
//     currency: "INR",
//     days: [
//       {
//         day: 1,
//         date: "Apr 10, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "14:00", type: "transfer", title: "Airport Pickup", description: "Meet and greet at Srinagar International Airport", icon: "car", price: 1200 },
//           { id: 2, time: "16:00", type: "hotel", title: "Check-in at Vivanta Dal View", description: "Lake view room with breakfast included", icon: "hotel", price: 12000 },
//           { id: 3, time: "18:00", type: "activity", title: "Evening Shikara Ride", description: "Relaxing boat ride on Dal Lake", icon: "activity", price: 1200 }
//         ]
//       },
//       {
//         day: 2,
//         date: "Apr 11, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "09:00", type: "meal", title: "Breakfast at Hotel", description: "Included in stay", icon: "meal", price: 0 },
//           { id: 2, time: "10:30", type: "activity", title: "Mughal Gardens Tour", description: "Visit Nishat, Shalimar and Chashme Shahi gardens", icon: "activity", price: 2500 },
//           { id: 3, time: "13:30", type: "meal", title: "Lunch at Ahdoos", description: "Traditional Kashmiri cuisine", icon: "meal", price: 1500 }
//         ]
//       }
//     ]
//   });
  
//   const [activeTab, setActiveTab] = useState('build');
//   const [draggedItem, setDraggedItem] = useState(null);
//   const [editingDayIndex, setEditingDayIndex] = useState(null);
//   const [showServiceModal, setShowServiceModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
//   // Currency conversion rates (sample)
//   const currencyRates = {
//     INR: 1,
//     USD: 0.012,
//     EUR: 0.011,
//     GBP: 0.0095
//   };
  
//   // Handler for dropping items into the itinerary
//   const handleDrop = (e, dayIndex) => {
//     e.preventDefault();
//     if (!draggedItem) return;
    
//     // Clone the current itinerary to avoid direct state mutation
//     const updatedItinerary = {...currentItinerary};
    
//     // Add the dragged service to the specified day's activities
//     const newActivity = {
//       id: Date.now(), // Generate a unique ID
//       time: "12:00", // Default time
//       type: draggedItem.type,
//       title: draggedItem.name,
//       description: draggedItem.location || `${draggedItem.from} to ${draggedItem.to}`,
//       icon: draggedItem.type,
//       price: draggedItem.price
//     };
    
//     updatedItinerary.days[dayIndex].activities.push(newActivity);
//     setCurrentItinerary(updatedItinerary);
//     setDraggedItem(null);
//   };
  
//   // Handle drag over
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };
  
//   // Add a new day to the itinerary
//   const addNewDay = () => {
//     const lastDay = currentItinerary.days[currentItinerary.days.length - 1];
//     const newDay = {
//       day: lastDay.day + 1,
//       date: "Apr " + (10 + lastDay.day) + ", 2025", // Simple date calculation
//       location: "To be determined",
//       activities: []
//     };
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: [...currentItinerary.days, newDay]
//     });
//   };
  
//   // Remove a day from the itinerary
//   const removeDay = (dayIndex) => {
//     const updatedDays = currentItinerary.days.filter((_, index) => index !== dayIndex);
//     // Renumber the days
//     updatedDays.forEach((day, index) => {
//       day.day = index + 1;
//     });
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Remove an activity from a day
//   const removeActivity = (dayIndex, activityId) => {
//     const updatedDays = [...currentItinerary.days];
//     updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
//       activity => activity.id !== activityId
//     );
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Filter services based on search term
//   const filteredServices = services.filter(service => 
//     service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.location && service.location.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
  
//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let total = 0;
//     currentItinerary.days.forEach(day => {
//       day.activities.forEach(activity => {
//         total += activity.price || 0;
//       });
//     });
//     return total;
//   };
  
//   // Convert price to selected currency
//   const convertPrice = (price) => {
//     return (price * currencyRates[selectedCurrency]).toFixed(2);
//   };
  
//   // Get currency symbol
//   const getCurrencySymbol = (currency) => {
//     switch(currency) {
//       case 'USD': return '$';
//       case 'EUR': return '€';
//       case 'GBP': return '£';
//       case 'INR': 
//       default: return '₹';
//     }
//   };
  
//   // Apply template
//   const applyTemplate = (templateId) => {
//     const template = templates.find(t => t.id === templateId);
//     if (!template) return;
    
//     // In a real application, this would fetch the template data from an API
//     // For this example, we'll just create a simple structure
//     const templateDays = template.destinations.map((dest, index) => ({
//       day: index + 1,
//       date: `Apr ${11 + index}, 2025`,
//       location: dest,
//       activities: []
//     }));
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: templateDays
//     });
//   };
  
//   // Get icon component based on type
//   const getIconForType = (type) => {
//     switch(type) {
//       case 'hotel': return <Hotel size={16} />;
//       case 'transfer': return <Navigation size={16} />;
//       case 'activity': return <Camera size={16} />;
//       case 'meal': return <Coffee size={16} />;
//       default: return <Star size={16} />;
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-4 shadow-md">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">ripClap</h1>
//             <p className="text-sm">Dynamic Itinerary Builder</p>
//           </div>
//           <div className="flex space-x-4">
//             <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium flex items-center">
//               <Save size={16} className="mr-2" />
//               Save
//             </button>
//             <button 
//               className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium flex items-center"
//               onClick={() => setShowShareOptions(!showShareOptions)}
//             >
//               <Send size={16} className="mr-2" />
//               Share
//             </button>
//             {showShareOptions && (
//               <div className="absolute right-8 top-16 bg-white text-gray-800 shadow-lg rounded-lg p-2 z-10">
//                 <button className="flex items-center p-2 hover:bg-gray-100 w-full text-left rounded">
//                   <Download size={16} className="mr-2 text-blue-600" />
//                   Download PDF
//                 </button>
//                 <button className="flex items-center p-2 hover:bg-gray-100 w-full text-left rounded">
//                   <MessageSquare size={16} className="mr-2 text-green-600" />
//                   Share via WhatsApp
//                 </button>
//                 <button className="flex items-center p-2 hover:bg-gray-100 w-full text-left rounded">
//                   <Mail size={16} className="mr-2 text-red-600" />
//                   Send via Email
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>
      
//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-medium text-gray-700">Client Details</h2>
//               <button className="text-blue-600">
//                 <Edit size={16} />
//               </button>
//             </div>
//             <div className="space-y-2 text-sm">
//               <p><span className="text-gray-500">Client:</span> {currentItinerary.clientName}</p>
//               <p><span className="text-gray-500">Travel Dates:</span> {currentItinerary.travelDates}</p>
//               <p><span className="text-gray-500">Travelers:</span> {currentItinerary.numberOfTravelers}</p>
//               <p>
//                 <span className="text-gray-500">Budget:</span> 
//                 {getCurrencySymbol(selectedCurrency)}{convertPrice(currentItinerary.budget)} {selectedCurrency}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex border-b">
//             <button 
//               className={`flex-1 py-3 text-sm font-medium ${activeTab === 'build' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('build')}
//             >
//               Build
//             </button>
//             <button 
//               className={`flex-1 py-3 text-sm font-medium ${activeTab === 'tools' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('tools')}
//             >
//               Tools
//             </button>
//           </div>
          
//           {activeTab === 'build' && (
//             <div className="flex-1 overflow-y-auto p-4">
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-700 mb-2 flex items-center">
//                   {/* <Template size={16} className="mr-2" /> */}
//                   Templates
//                 </h3>
//                 <div className="space-y-2">
//                   {templates.map(template => (
//                     <div 
//                       key={template.id}
//                       className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100"
//                       onClick={() => applyTemplate(template.id)}
//                     >
//                       <p className="font-medium text-sm">{template.name}</p>
//                       <p className="text-xs text-gray-500">{template.destinations.join(' • ')}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-700 mb-2 flex items-center">
//                   <Globe size={16} className="mr-2" />
//                   Destinations
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {destinations.map(destination => (
//                     <div 
//                       key={destination.id}
//                       className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100"
//                       draggable
//                       onDragStart={() => setDraggedItem({...destination, type: 'destination'})}
//                     >
//                       <img 
//                         src={destination.image} 
//                         alt={destination.name} 
//                         className="w-full h-12 object-cover rounded mb-1"
//                       />
//                       <p className="text-xs font-medium text-center">{destination.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-medium text-gray-700 flex items-center">
//                     <Clipboard size={16} className="mr-2" />
//                     Services
//                   </h3>
//                   <select 
//                     className="text-xs border rounded py-1"
//                     value={selectedCurrency}
//                     onChange={(e) => setSelectedCurrency(e.target.value)}
//                   >
//                     <option value="INR">₹ INR</option>
//                     <option value="USD">$ USD</option>
//                     <option value="EUR">€ EUR</option>
//                     <option value="GBP">£ GBP</option>
//                   </select>
//                 </div>
                
//                 <div className="mb-3">
//                   <input 
//                     type="text" 
//                     placeholder="Search services..." 
//                     className="w-full p-2 border border-gray-300 rounded text-sm"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   {filteredServices.map(service => (
//                     <div 
//                       key={service.id}
//                       className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
//                       draggable
//                       onDragStart={() => setDraggedItem(service)}
//                     >
//                       <div className="flex items-center">
//                         <div className="mr-2 p-1 rounded bg-blue-100 text-blue-700">
//                           {service.type === 'hotel' && <Hotel size={16} />}
//                           {service.type === 'transfer' && <Navigation size={16} />}
//                           {service.type === 'activity' && <Camera size={16} />}
//                           {service.type === 'meal' && <Coffee size={16} />}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium">{service.name}</p>
//                           <p className="text-xs text-gray-500">
//                             {service.location || `${service.from} to ${service.to}`}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-sm font-medium">
//                         {getCurrencySymbol(selectedCurrency)}{convertPrice(service.price)}
//                       </div>
//                     </div>
//                   ))}
                  
//                   <button 
//                     className="w-full p-2 border border-dashed border-blue-300 rounded text-blue-600 text-sm flex items-center justify-center"
//                     onClick={() => setShowServiceModal(true)}
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Custom Service
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'tools' && (
//             <div className="flex-1 overflow-y-auto p-4">
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-700 mb-2 flex items-center">
//                   <Zap size={16} className="mr-2" />
//                   AI Tools
//                 </h3>
//                 <button className="w-full p-2 mb-2 bg-blue-50 border border-blue-200 rounded text-blue-600 text-sm flex items-center">
//                   <Zap size={16} className="mr-2" />
//                   Generate Description
//                 </button>
//                 <button className="w-full p-2 bg-blue-50 border border-blue-200 rounded text-blue-600 text-sm flex items-center">
//                   <Zap size={16} className="mr-2" />
//                   Suggest Activities
//                 </button>
//               </div>
              
//               <div>
//                 <h3 className="font-medium text-gray-700 mb-2">Export Options</h3>
//                 <div className="space-y-2">
//                   <button className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm flex items-center">
//                     <Download size={16} className="mr-2" />
//                     PDF (Detailed)
//                   </button>
//                   <button className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm flex items-center">
//                     <Download size={16} className="mr-2" />
//                     PDF (Compact)
//                   </button>
//                   <button className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm flex items-center">
//                     <Download size={16} className="mr-2" />
//                     Excel Costing Sheet
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Main Itinerary Builder */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {currentItinerary.clientName}'s Kashmir Itinerary
//               </h2>
              
//               <div className="text-gray-700">
//                 <span className="text-sm">Total Cost: </span>
//                 <span className="font-bold">
//                   {getCurrencySymbol(selectedCurrency)}{convertPrice(calculateTotalPrice())} {selectedCurrency}
//                 </span>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               {currentItinerary.days.map((day, dayIndex) => (
//                 <div 
//                   key={dayIndex}
//                   className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                 >
//                   <div className="bg-blue-50 p-4 flex justify-between items-center border-b border-gray-200">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
//                         Day {day.day}
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{day.date}</h3>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <MapPin size={14} className="mr-1" />
//                           {day.location}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button 
//                         className="p-2 text-gray-500 hover:text-gray-700"
//                         onClick={() => setEditingDayIndex(dayIndex === editingDayIndex ? null : dayIndex)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button 
//                         className="p-2 text-red-500 hover:text-red-700"
//                         onClick={() => removeDay(dayIndex)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div 
//                     className="p-4 space-y-3"
//                     onDrop={(e) => handleDrop(e, dayIndex)}
//                     onDragOver={handleDragOver}
//                   >
//                     {day.activities.length > 0 ? (
//                       day.activities.map((activity, activityIndex) => (
//                         <div 
//                           key={activityIndex}
//                           className="flex p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                         >
//                           <div className="w-20 text-center">
//                             <div className="text-sm font-medium text-gray-700">{activity.time}</div>
//                           </div>
                          
//                           <div className="ml-4 flex-1">
//                             <div className="flex justify-between">
//                               <div className="flex items-center">
//                                 <div className="mr-2 p-1 rounded bg-blue-100 text-blue-700">
//                                   {getIconForType(activity.type)}
//                                 </div>
//                                 <div className="font-medium">{activity.title}</div>
//                               </div>
                              
//                               <div className="flex items-center">
//                                 <div className="mr-3 text-gray-700 font-medium">
//                                   {activity.price > 0 ? (
//                                     <span>{getCurrencySymbol(selectedCurrency)}{convertPrice(activity.price)}</span>
//                                   ) : (
//                                     <span className="text-green-600">Included</span>
//                                   )}
//                                 </div>
//                                 <button 
//                                   className="text-red-500"
//                                   onClick={() => removeActivity(dayIndex, activity.id)}
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </div>
                            
//                             <div className="text-sm text-gray-600 mt-1">
//                               {activity.description}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
//                         Drag and drop activities here
//                       </div>
//                     )}
                    
//                     {editingDayIndex === dayIndex && (
//                       <button className="w-full p-2 border border-dashed border-blue-300 rounded text-blue-600 text-sm flex items-center justify-center">
//                         <Plus size={16} className="mr-1" />
//                         Add Custom Activity
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
              
//               <button 
//                 className="w-full p-3 border border-dashed border-blue-300 rounded-lg text-blue-600 flex items-center justify-center"
//                 onClick={addNewDay}
//               >
//                 <Plus size={16} className="mr-2" />
//                 Add Day
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Right Sidebar - Chat */}
//         <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
//           <div className="p-4 border-b">
//             <h2 className="font-medium text-gray-700">Client Communication</h2>
//           </div>
          
//           <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//             <div className="space-y-4">
//               <div className="flex justify-end">
//                 <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none max-w-xs">
//                   <p className="text-sm">Here is the first draft of your Kashmir itinerary. Let me know what you think!</p>
//                 </div>
//               </div>
              
//               <div className="flex">
//                 <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-xs shadow-sm">
//                   <p className="text-sm">Looks great! Can we add a day trip to Pahalgam?</p>
//                 </div>
//               </div>
              
//               <div className="flex justify-end">
//                 <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none max-w-xs">
//                   <p className="text-sm">Absolutely! I'll add that to the itinerary right away.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="p-4 border-t">
//             <div className="relative">
//               <input 
//                 type="text" 
//                 placeholder="Type a message..."
//                 className="w-full p-2 pr-10 border border-gray-300 rounded-full text-sm"
//               />
//               <button className="absolute right-2 top-2 text-blue-600">
//                 <Send size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Add Service Modal */}
//       {showServiceModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//             <h3 className="text-xl font-bold mb-4">Add Custom Service</h3>
//             {/* Modal content would go here */}
//             <div className="mt-6 flex justify-end">
//               <button 
//                 className="px-4 py-2 text-gray-600 mr-2"
//                 onClick={() => setShowServiceModal(false)}
//               >
//                 Cancel
//               </button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded">
//                 Add Service
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryBuilder;

// import React, { useState } from 'react';
// import { Calendar, MapPin, Plus, Trash2, Edit, DollarSign, Hotel, Navigation, Camera, Coffee, Star, X, Save, Clock } from 'lucide-react';

// const EnhancedItineraryBuilder = () => {
//   // Sample destinations
//   const destinations = [
//     { id: 1, name: "Srinagar", image: "/api/placeholder/100/60" },
//     { id: 2, name: "Gulmarg", image: "/api/placeholder/100/60" },
//     { id: 3, name: "Pahalgam", image: "/api/placeholder/100/60" },
//     { id: 4, name: "Sonamarg", image: "/api/placeholder/100/60" },
//     { id: 5, name: "Leh", image: "/api/placeholder/100/60" }
//   ];

//   // Sample services
//   const services = [
//     { id: 1, type: "hotel", name: "Vivanta Dal View", location: "Srinagar", price: 12000, rating: 4.8 },
//     { id: 2, type: "hotel", name: "The Khyber Himalayan", location: "Gulmarg", price: 18000, rating: 4.9 },
//     { id: 3, type: "transfer", name: "Private Car Transfer", from: "Srinagar", to: "Gulmarg", price: 3500, type: "car" },
//     { id: 4, type: "activity", name: "Shikara Ride on Dal Lake", location: "Srinagar", price: 1200, duration: "1.5 hours" },
//     { id: 5, type: "meal", name: "Traditional Wazwan Dinner", location: "Srinagar", price: 1500, cuisine: "Kashmiri" }
//   ];

//   // State for current itinerary
//   const [currentItinerary, setCurrentItinerary] = useState({
//     clientName: "Aryan Sharma",
//     travelDates: "April 10-16, 2025",
//     numberOfTravelers: 2,
//     budget: 85000,
//     currency: "INR",
//     days: [
//       {
//         day: 1,
//         date: "Apr 10, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "14:00", type: "transfer", title: "Airport Pickup", description: "Meet and greet at Srinagar International Airport", icon: "car", price: 1200 },
//           { id: 2, time: "16:00", type: "hotel", title: "Check-in at Vivanta Dal View", description: "Lake view room with breakfast included", icon: "hotel", price: 12000 },
//           { id: 3, time: "18:00", type: "activity", title: "Evening Shikara Ride", description: "Relaxing boat ride on Dal Lake", icon: "activity", price: 1200 }
//         ]
//       },
//       {
//         day: 2,
//         date: "Apr 11, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "09:00", type: "meal", title: "Breakfast at Hotel", description: "Included in stay", icon: "meal", price: 0 },
//           { id: 2, time: "10:30", type: "activity", title: "Mughal Gardens Tour", description: "Visit Nishat, Shalimar and Chashme Shahi gardens", icon: "activity", price: 2500 },
//           { id: 3, time: "13:30", type: "meal", title: "Lunch at Ahdoos", description: "Traditional Kashmiri cuisine", icon: "meal", price: 1500 }
//         ]
//       }
//     ]
//   });
  
//   const [draggedItem, setDraggedItem] = useState(null);
//   const [editingDayIndex, setEditingDayIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
//   // New state for CRUD operations
//   const [editingActivity, setEditingActivity] = useState(null);
//   const [editingClientDetails, setEditingClientDetails] = useState(false);
//   const [newService, setNewService] = useState(null);
//   const [editingDay, setEditingDay] = useState(null);
  
//   // Currency conversion rates (sample)
//   const currencyRates = {
//     INR: 1,
//     USD: 0.012,
//     EUR: 0.011,
//     GBP: 0.0095
//   };
  
//   // Handler for dropping items into the itinerary
//   const handleDrop = (e, dayIndex) => {
//     e.preventDefault();
//     if (!draggedItem) return;
    
//     // Clone the current itinerary to avoid direct state mutation
//     const updatedItinerary = {...currentItinerary};
    
//     // Add the dragged service to the specified day's activities
//     const newActivity = {
//       id: Date.now(), // Generate a unique ID
//       time: "12:00", // Default time
//       type: draggedItem.type,
//       title: draggedItem.name,
//       description: draggedItem.location || `${draggedItem.from} to ${draggedItem.to}`,
//       icon: draggedItem.type,
//       price: draggedItem.price
//     };
    
//     updatedItinerary.days[dayIndex].activities.push(newActivity);
//     setCurrentItinerary(updatedItinerary);
//     setDraggedItem(null);
//   };
  
//   // Handle drag over
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };
  
//   // Add a new day to the itinerary
//   const addNewDay = () => {
//     const lastDay = currentItinerary.days[currentItinerary.days.length - 1];
//     const newDay = {
//       day: lastDay.day + 1,
//       date: "Apr " + (10 + lastDay.day) + ", 2025", // Simple date calculation
//       location: "To be determined",
//       activities: []
//     };
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: [...currentItinerary.days, newDay]
//     });
//   };
  
//   // Remove a day from the itinerary
//   const removeDay = (dayIndex) => {
//     const updatedDays = currentItinerary.days.filter((_, index) => index !== dayIndex);
//     // Renumber the days
//     updatedDays.forEach((day, index) => {
//       day.day = index + 1;
//     });
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Remove an activity from a day
//   const removeActivity = (dayIndex, activityId) => {
//     const updatedDays = [...currentItinerary.days];
//     updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
//       activity => activity.id !== activityId
//     );
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Filter services based on search term
//   const filteredServices = services.filter(service => 
//     service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.location && service.location.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
  
//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let total = 0;
//     currentItinerary.days.forEach(day => {
//       day.activities.forEach(activity => {
//         total += activity.price || 0;
//       });
//     });
//     return total;
//   };
  
//   // Convert price to selected currency
//   const convertPrice = (price) => {
//     return (price * currencyRates[selectedCurrency]).toFixed(2);
//   };
  
//   // Get currency symbol
//   const getCurrencySymbol = (currency) => {
//     switch(currency) {
//       case 'USD': return '$';
//       case 'EUR': return '€';
//       case 'GBP': return '£';
//       case 'INR': 
//       default: return '₹';
//     }
//   };
  
//   // Get icon component based on type
//   const getIconForType = (type) => {
//     switch(type) {
//       case 'hotel': return <Hotel size={16} />;
//       case 'transfer': return <Navigation size={16} />;
//       case 'activity': return <Camera size={16} />;
//       case 'meal': return <Coffee size={16} />;
//       default: return <Star size={16} />;
//     }
//   };
  
//   // CRUD - Open activity editor
//   const openActivityEditor = (dayIndex, activity = null) => {
//     // If activity is null, we're creating a new activity
//     if (activity === null) {
//       setEditingActivity({
//         dayIndex,
//         activity: {
//           id: Date.now(),
//           time: "12:00",
//           type: "activity",
//           title: "",
//           description: "",
//           icon: "activity",
//           price: 0
//         },
//         isNew: true
//       });
//     } else {
//       // We're editing an existing activity
//       setEditingActivity({
//         dayIndex,
//         activity: {...activity},
//         isNew: false
//       });
//     }
//   };
  
//   // CRUD - Save activity
//   const saveActivity = () => {
//     if (!editingActivity) return;
    
//     const { dayIndex, activity, isNew } = editingActivity;
//     const updatedDays = [...currentItinerary.days];
    
//     if (isNew) {
//       // Add new activity
//       updatedDays[dayIndex].activities.push(activity);
//     } else {
//       // Update existing activity
//       const activityIndex = updatedDays[dayIndex].activities.findIndex(a => a.id === activity.id);
//       if (activityIndex !== -1) {
//         updatedDays[dayIndex].activities[activityIndex] = activity;
//       }
//     }
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
    
//     setEditingActivity(null);
//   };
  
//   // CRUD - Open new service creator
//   const openServiceCreator = () => {
//     setNewService({
//       id: Date.now(),
//       type: "activity",
//       name: "",
//       location: "",
//       price: 0,
//       rating: 5.0
//     });
//   };
  
//   // CRUD - Save new service
//   const saveNewService = () => {
//     if (!newService) return;
//     // In a real app, you would add this to your services database
//     // For this demo, we'll just add it to the services array
//     services.push(newService);
//     setNewService(null);
//   };
  
//   // CRUD - Update client details
//   const saveClientDetails = (updatedDetails) => {
//     setCurrentItinerary({
//       ...currentItinerary,
//       ...updatedDetails
//     });
//     setEditingClientDetails(false);
//   };
  
//   // CRUD - Open day editor
//   const openDayEditor = (dayIndex) => {
//     setEditingDay({
//       index: dayIndex,
//       data: {...currentItinerary.days[dayIndex]}
//     });
//   };
  
//   // CRUD - Save day details
//   const saveDayDetails = () => {
//     if (!editingDay) return;
    
//     const updatedDays = [...currentItinerary.days];
//     updatedDays[editingDay.index] = editingDay.data;
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
    
//     setEditingDay(null);
//   };
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-4 shadow-md">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">TripPlanner</h1>
//             <p className="text-sm">Itinerary Builder</p>
//           </div>
//         </div>
//       </header>
      
//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-medium text-gray-700">Client Details</h2>
//               <button 
//                 className="text-blue-600"
//                 onClick={() => setEditingClientDetails(true)}
//               >
//                 <Edit size={16} />
//               </button>
//             </div>
//             <div className="space-y-2 text-sm">
//               <p><span className="text-gray-500">Client:</span> {currentItinerary.clientName}</p>
//               <p><span className="text-gray-500">Travel Dates:</span> {currentItinerary.travelDates}</p>
//               <p><span className="text-gray-500">Travelers:</span> {currentItinerary.numberOfTravelers}</p>
//               <p>
//                 <span className="text-gray-500">Budget:</span> 
//                 {getCurrencySymbol(selectedCurrency)}{convertPrice(currentItinerary.budget)} {selectedCurrency}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex-1 overflow-y-auto p-4">              
//             <div className="mb-4">
//               <h3 className="font-medium text-gray-700 mb-2 flex items-center">
//                 <Calendar size={16} className="mr-2" />
//                 Destinations
//               </h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {destinations.map(destination => (
//                   <div 
//                     key={destination.id}
//                     className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100"
//                     draggable
//                     onDragStart={() => setDraggedItem({...destination, type: 'destination'})}
//                   >
//                     <img 
//                       src={destination.image} 
//                       alt={destination.name} 
//                       className="w-full h-12 object-cover rounded mb-1"
//                     />
//                     <p className="text-xs font-medium text-center">{destination.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-medium text-gray-700 flex items-center">
//                   <DollarSign size={16} className="mr-2" />
//                   Services
//                 </h3>
//                 <select 
//                   className="text-xs border rounded py-1"
//                   value={selectedCurrency}
//                   onChange={(e) => setSelectedCurrency(e.target.value)}
//                 >
//                   <option value="INR">₹ INR</option>
//                   <option value="USD">$ USD</option>
//                   <option value="EUR">€ EUR</option>
//                   <option value="GBP">£ GBP</option>
//                 </select>
//               </div>
              
//               <div className="mb-3">
//                 <input 
//                   type="text" 
//                   placeholder="Search services..." 
//                   className="w-full p-2 border border-gray-300 rounded text-sm"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 {filteredServices.map(service => (
//                   <div 
//                     key={service.id}
//                     className="p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
//                     draggable
//                     onDragStart={() => setDraggedItem(service)}
//                   >
//                     <div className="flex items-center">
//                       <div className="mr-2 p-1 rounded bg-blue-100 text-blue-700">
//                         {service.type === 'hotel' && <Hotel size={16} />}
//                         {service.type === 'transfer' && <Navigation size={16} />}
//                         {service.type === 'activity' && <Camera size={16} />}
//                         {service.type === 'meal' && <Coffee size={16} />}
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium">{service.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {service.location || `${service.from} to ${service.to}`}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-sm font-medium">
//                       {getCurrencySymbol(selectedCurrency)}{convertPrice(service.price)}
//                     </div>
//                   </div>
//                 ))}
                
//                 <button 
//                   className="w-full p-2 border border-dashed border-blue-300 rounded text-blue-600 text-sm flex items-center justify-center"
//                   onClick={openServiceCreator}
//                 >
//                   <Plus size={16} className="mr-1" />
//                   Add Custom Service
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Main Itinerary Builder */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {currentItinerary.clientName}'s Kashmir Itinerary
//               </h2>
              
//               <div className="text-gray-700">
//                 <span className="text-sm">Total Cost: </span>
//                 <span className="font-bold">
//                   {getCurrencySymbol(selectedCurrency)}{convertPrice(calculateTotalPrice())} {selectedCurrency}
//                 </span>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               {currentItinerary.days.map((day, dayIndex) => (
//                 <div 
//                   key={dayIndex}
//                   className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                 >
//                   <div className="bg-blue-50 p-4 flex justify-between items-center border-b border-gray-200">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
//                         Day {day.day}
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{day.date}</h3>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <MapPin size={14} className="mr-1" />
//                           {day.location}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button 
//                         className="p-2 text-gray-500 hover:text-gray-700"
//                         onClick={() => openDayEditor(dayIndex)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button 
//                         className="p-2 text-red-500 hover:text-red-700"
//                         onClick={() => removeDay(dayIndex)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div 
//                     className="p-4 space-y-3"
//                     onDrop={(e) => handleDrop(e, dayIndex)}
//                     onDragOver={handleDragOver}
//                   >
//                     {day.activities.length > 0 ? (
//                       day.activities.map((activity, activityIndex) => (
//                         <div 
//                           key={activityIndex}
//                           className="flex p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                         >
//                           <div className="w-20 text-center">
//                             <div className="text-sm font-medium text-gray-700">{activity.time}</div>
//                           </div>
                          
//                           <div className="ml-4 flex-1">
//                             <div className="flex justify-between">
//                               <div className="flex items-center">
//                                 <div className="mr-2 p-1 rounded bg-blue-100 text-blue-700">
//                                   {getIconForType(activity.type)}
//                                 </div>
//                                 <div className="font-medium">{activity.title}</div>
//                               </div>
                              
//                               <div className="flex items-center">
//                                 <div className="mr-3 text-gray-700 font-medium">
//                                   {activity.price > 0 ? (
//                                     <span>{getCurrencySymbol(selectedCurrency)}{convertPrice(activity.price)}</span>
//                                   ) : (
//                                     <span className="text-green-600">Included</span>
//                                   )}
//                                 </div>
//                                 <button 
//                                   className="p-1 text-blue-500 mr-1"
//                                   onClick={() => openActivityEditor(dayIndex, activity)}
//                                 >
//                                   <Edit size={16} />
//                                 </button>
//                                 <button 
//                                   className="p-1 text-red-500"
//                                   onClick={() => removeActivity(dayIndex, activity.id)}
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </div>
                            
//                             <div className="text-sm text-gray-600 mt-1">
//                               {activity.description}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
//                         Drag and drop activities here
//                       </div>
//                     )}
                    
//                     <button 
//                       className="w-full p-2 border border-dashed border-blue-300 rounded text-blue-600 text-sm flex items-center justify-center"
//                       onClick={() => openActivityEditor(dayIndex)}
//                     >
//                       <Plus size={16} className="mr-1" />
//                       Add Custom Activity
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               <button 
//                 className="w-full p-3 border border-dashed border-blue-300 rounded-lg text-blue-600 flex items-center justify-center"
//                 onClick={addNewDay}
//               >
//                 <Plus size={16} className="mr-2" />
//                 Add Day
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Modal for editing activity */}
//       {editingActivity && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">
//                 {editingActivity.isNew ? "Add New Activity" : "Edit Activity"}
//               </h3>
//               <button className="text-gray-500" onClick={() => setEditingActivity(null)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
//                 <select 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.type}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, type: e.target.value}
//                   })}
//                 >
//                   <option value="hotel">Hotel</option>
//                   <option value="transfer">Transfer</option>
//                   <option value="activity">Activity</option>
//                   <option value="meal">Meal</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.title}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, title: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                 <input 
//                   type="time"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.time}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, time: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   rows="3"
//                   value={editingActivity.activity.description}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, description: e.target.value}
//                   })}
//                 ></textarea>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price ({selectedCurrency})</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.price}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, price: parseFloat(e.target.value) || 0}
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingActivity(null)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
//                 onClick={saveActivity}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Modal for editing client details */}
//       {editingClientDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Edit Client Details</h3>
//               <button className="text-gray-500" onClick={() => setEditingClientDetails(false)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.clientName}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     clientName: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Travel Dates</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.travelDates}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     travelDates: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.numberOfTravelers}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     numberOfTravelers: parseInt(e.target.value) || 1
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ({selectedCurrency})</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.budget}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     budget: parseFloat(e.target.value) || 0
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingClientDetails(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
//                 onClick={() => setEditingClientDetails(false)}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Modal for creating new service */}
//            {/* Modal for creating new service */}
//            {newService && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Add New Service</h3>
//               <button className="text-gray-500" onClick={() => setNewService(null)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
//                 <select 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={newService.type}
//                   onChange={(e) => setNewService({
//                     ...newService,
//                     type: e.target.value
//                   })}
//                 >
//                   <option value="hotel">Hotel</option>
//                   <option value="transfer">Transfer</option>
//                   <option value="activity">Activity</option>
//                   <option value="meal">Meal</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={newService.name}
//                   onChange={(e) => setNewService({
//                     ...newService,
//                     name: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={newService.location}
//                   onChange={(e) => setNewService({
//                     ...newService,
//                     location: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price ({selectedCurrency})</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={newService.price}
//                   onChange={(e) => setNewService({
//                     ...newService,
//                     price: parseFloat(e.target.value) || 0
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={newService.rating}
//                   onChange={(e) => setNewService({
//                     ...newService,
//                     rating: parseFloat(e.target.value) || 0
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setNewService(null)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
//                 onClick={saveNewService}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Modal for editing day details */}
//       {editingDay && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Edit Day Details</h3>
//               <button className="text-gray-500" onClick={() => setEditingDay(null)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingDay.data.date}
//                   onChange={(e) => setEditingDay({
//                     ...editingDay,
//                     data: {...editingDay.data, date: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingDay.data.location}
//                   onChange={(e) => setEditingDay({
//                     ...editingDay,
//                     data: {...editingDay.data, location: e.target.value}
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingDay(null)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
//                 onClick={saveDayDetails}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnhancedItineraryBuilder;




// import React, { useState } from 'react';
// import { Calendar, MapPin, Plus, Trash2, Edit, DollarSign, Hotel, Navigation, Camera, Coffee, Star, X, Save, Clock, Mail, Download, Share2 } from 'lucide-react';

// const ItineraryBuilder = () => {
//   // State for current itinerary
//   const [currentItinerary, setCurrentItinerary] = useState({
//     clientName: "Aryan Sharma",
//     travelDates: "April 10-16, 2025",
//     numberOfTravelers: 2,
//     budget: 85000,
//     currency: "INR",
//     destination: "Kashmir",
//     days: [
//       {
//         day: 1,
//         date: "Apr 10, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "14:00", type: "transfer", title: "Airport Pickup", description: "Meet and greet at Srinagar International Airport", icon: "transfer", price: 1200 },
//           { id: 2, time: "16:00", type: "hotel", title: "Check-in at Vivanta Dal View", description: "Lake view room with breakfast included", icon: "hotel", price: 12000 },
//           { id: 3, time: "18:00", type: "activity", title: "Evening Shikara Ride", description: "Relaxing boat ride on Dal Lake", icon: "activity", price: 1200 }
//         ]
//       },
//       {
//         day: 2,
//         date: "Apr 11, 2025",
//         location: "Srinagar",
//         activities: [
//           { id: 1, time: "09:00", type: "meal", title: "Breakfast at Hotel", description: "Included in stay", icon: "meal", price: 0 },
//           { id: 2, time: "10:30", type: "activity", title: "Mughal Gardens Tour", description: "Visit Nishat, Shalimar and Chashme Shahi gardens", icon: "activity", price: 2500 },
//           { id: 3, time: "13:30", type: "meal", title: "Lunch at Ahdoos", description: "Traditional Kashmiri cuisine", icon: "meal", price: 1500 }
//         ]
//       }
//     ]
//   });
  
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
//   // States for CRUD operations
//   const [editingActivity, setEditingActivity] = useState(null);
//   const [editingClientDetails, setEditingClientDetails] = useState(false);
//   const [editingDay, setEditingDay] = useState(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);
  
//   // Currency conversion rates (sample)
//   const currencyRates = {
//     INR: 1,
//     USD: 0.012,
//     EUR: 0.011,
//     GBP: 0.0095
//   };
  
//   // Add a new day to the itinerary
//   const addNewDay = () => {
//     const lastDay = currentItinerary.days[currentItinerary.days.length - 1];
//     const newDay = {
//       day: lastDay.day + 1,
//       date: "Apr " + (10 + lastDay.day) + ", 2025", // Simple date calculation
//       location: "To be determined",
//       activities: []
//     };
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: [...currentItinerary.days, newDay]
//     });
//   };
  
//   // Remove a day from the itinerary
//   const removeDay = (dayIndex) => {
//     const updatedDays = currentItinerary.days.filter((_, index) => index !== dayIndex);
//     // Renumber the days
//     updatedDays.forEach((day, index) => {
//       day.day = index + 1;
//     });
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Remove an activity from a day
//   const removeActivity = (dayIndex, activityId) => {
//     const updatedDays = [...currentItinerary.days];
//     updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
//       activity => activity.id !== activityId
//     );
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
//   };
  
//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let total = 0;
//     currentItinerary.days.forEach(day => {
//       day.activities.forEach(activity => {
//         total += activity.price || 0;
//       });
//     });
//     return total;
//   };
  
//   // Convert price to selected currency
//   const convertPrice = (price) => {
//     return (price * currencyRates[selectedCurrency]).toFixed(2);
//   };
  
//   // Get currency symbol
//   const getCurrencySymbol = (currency) => {
//     switch(currency) {
//       case 'USD': return '$';
//       case 'EUR': return '€';
//       case 'GBP': return '£';
//       case 'INR': 
//       default: return '₹';
//     }
//   };
  
//   // Get icon component based on type
//   const getIconForType = (type) => {
//     switch(type) {
//       case 'hotel': return <Hotel size={16} />;
//       case 'transfer': return <Navigation size={16} />;
//       case 'activity': return <Camera size={16} />;
//       case 'meal': return <Coffee size={16} />;
//       default: return <Star size={16} />;
//     }
//   };
  
//   // CRUD - Open activity editor
//   const openActivityEditor = (dayIndex, activity = null) => {
//     // If activity is null, we're creating a new activity
//     if (activity === null) {
//       setEditingActivity({
//         dayIndex,
//         activity: {
//           id: Date.now(),
//           time: "12:00",
//           type: "activity",
//           title: "",
//           description: "",
//           icon: "activity",
//           price: 0
//         },
//         isNew: true
//       });
//     } else {
//       // We're editing an existing activity
//       setEditingActivity({
//         dayIndex,
//         activity: {...activity},
//         isNew: false
//       });
//     }
//   };
  
//   // CRUD - Save activity
//   const saveActivity = () => {
//     if (!editingActivity) return;
    
//     const { dayIndex, activity, isNew } = editingActivity;
//     const updatedDays = [...currentItinerary.days];
    
//     if (isNew) {
//       // Add new activity
//       updatedDays[dayIndex].activities.push(activity);
//     } else {
//       // Update existing activity
//       const activityIndex = updatedDays[dayIndex].activities.findIndex(a => a.id === activity.id);
//       if (activityIndex !== -1) {
//         updatedDays[dayIndex].activities[activityIndex] = activity;
//       }
//     }
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
    
//     setEditingActivity(null);
//   };
  
//   // CRUD - Update client details
//   const saveClientDetails = () => {
//     setEditingClientDetails(false);
//   };
  
//   // CRUD - Open day editor
//   const openDayEditor = (dayIndex) => {
//     setEditingDay({
//       index: dayIndex,
//       data: {...currentItinerary.days[dayIndex]}
//     });
//   };
  
//   // CRUD - Save day details
//   const saveDayDetails = () => {
//     if (!editingDay) return;
    
//     const updatedDays = [...currentItinerary.days];
//     updatedDays[editingDay.index] = editingDay.data;
    
//     setCurrentItinerary({
//       ...currentItinerary,
//       days: updatedDays
//     });
    
//     setEditingDay(null);
//   };

//   // Export itinerary (mock function)
//   const exportItinerary = () => {
//     alert('Itinerary exported successfully!');
//   };

//   // Send itinerary (mock function)
//   const sendItinerary = () => {
//     alert('Itinerary sent successfully!');
//     setShowShareOptions(false);
//   };
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-orange-600 text-white p-4 shadow-md">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">TravelPlanner</h1>
//             <p className="text-sm">Itinerary Builder</p>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               className="px-3 py-1 bg-orange-700 rounded-md text-sm flex items-center"
//               onClick={() => setShowShareOptions(true)}
//             >
//               <Share2 size={16} className="mr-1" />
//               Share
//             </button>
//             <button 
//               className="px-3 py-1 bg-orange-700 rounded-md text-sm flex items-center"
//               onClick={exportItinerary}
//             >
//               <Download size={16} className="mr-1" />
//               Export
//             </button>
//           </div>
//         </div>
//       </header>
      
//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-medium text-gray-700">Client Details</h2>
//               <button 
//                 className="text-orange-600"
//                 onClick={() => setEditingClientDetails(true)}
//               >
//                 <Edit size={16} />
//               </button>
//             </div>
//             <div className="space-y-2 text-sm">
//               <p><span className="text-gray-500">Client:</span> {currentItinerary.clientName}</p>
//               <p><span className="text-gray-500">Destination:</span> {currentItinerary.destination}</p>
//               <p><span className="text-gray-500">Travel Dates:</span> {currentItinerary.travelDates}</p>
//               <p><span className="text-gray-500">Travelers:</span> {currentItinerary.numberOfTravelers}</p>
//               <p>
//                 <span className="text-gray-500">Budget:</span> 
//                 {getCurrencySymbol(selectedCurrency)}{convertPrice(currentItinerary.budget)} {selectedCurrency}
//               </p>
//             </div>
//           </div>
          
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-medium text-gray-700">Currency</h3>
//               <select 
//                 className="text-xs border rounded py-1"
//                 value={selectedCurrency}
//                 onChange={(e) => setSelectedCurrency(e.target.value)}
//               >
//                 <option value="INR">₹ INR</option>
//                 <option value="USD">$ USD</option>
//                 <option value="EUR">€ EUR</option>
//                 <option value="GBP">£ GBP</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="p-4 border-b">
//             <h3 className="font-medium text-gray-700 mb-2">Itinerary Summary</h3>
//             <div className="space-y-2 text-sm">
//               <p><span className="text-gray-500">Total Days:</span> {currentItinerary.days.length}</p>
//               <p><span className="text-gray-500">Total Activities:</span> {currentItinerary.days.reduce((count, day) => count + day.activities.length, 0)}</p>
//               <p><span className="text-gray-500">Total Cost:</span> {getCurrencySymbol(selectedCurrency)}{convertPrice(calculateTotalPrice())} {selectedCurrency}</p>
//             </div>
//           </div>
          
//           <div className="flex-1 overflow-y-auto p-4">
//             <h3 className="font-medium text-gray-700 mb-3">Itinerary Overview</h3>
//             <div className="space-y-2">
//               {currentItinerary.days.map((day, index) => (
//                 <div key={index} className="p-2 border rounded hover:bg-orange-50">
//                   <div className="font-medium">Day {day.day}: {day.date}</div>
//                   <div className="text-sm text-gray-500 flex items-center">
//                     <MapPin size={14} className="mr-1" />
//                     {day.location}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Main Itinerary Builder */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {currentItinerary.clientName}'s {currentItinerary.destination} Itinerary
//               </h2>
              
//               <div className="text-gray-700">
//                 <span className="text-sm">Total Cost: </span>
//                 <span className="font-bold">
//                   {getCurrencySymbol(selectedCurrency)}{convertPrice(calculateTotalPrice())} {selectedCurrency}
//                 </span>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               {currentItinerary.days.map((day, dayIndex) => (
//                 <div 
//                   key={dayIndex}
//                   className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                 >
//                   <div className="bg-orange-50 p-4 flex justify-between items-center border-b border-gray-200">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-orange-600 text-white flex items-center justify-center mr-3">
//                         Day {day.day}
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{day.date}</h3>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <MapPin size={14} className="mr-1" />
//                           {day.location}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button 
//                         className="p-2 text-gray-500 hover:text-gray-700"
//                         onClick={() => openDayEditor(dayIndex)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button 
//                         className="p-2 text-red-500 hover:text-red-700"
//                         onClick={() => removeDay(dayIndex)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="p-4 space-y-3">
//                     {day.activities.length > 0 ? (
//                       day.activities.map((activity, activityIndex) => (
//                         <div 
//                           key={activityIndex}
//                           className="flex p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                         >
//                           <div className="w-20 text-center">
//                             <div className="text-sm font-medium text-gray-700">{activity.time}</div>
//                             <div className="mt-1 p-1 rounded bg-orange-100 text-orange-700 inline-flex">
//                               {getIconForType(activity.type)}
//                             </div>
//                           </div>
                          
//                           <div className="ml-4 flex-1">
//                             <div className="flex justify-between">
//                               <div className="font-medium">{activity.title}</div>
                              
//                               <div className="flex items-center">
//                                 <div className="mr-3 text-gray-700 font-medium">
//                                   {activity.price > 0 ? (
//                                     <span>{getCurrencySymbol(selectedCurrency)}{convertPrice(activity.price)}</span>
//                                   ) : (
//                                     <span className="text-green-600">Included</span>
//                                   )}
//                                 </div>
//                                 <button 
//                                   className="p-1 text-orange-500 mr-1"
//                                   onClick={() => openActivityEditor(dayIndex, activity)}
//                                 >
//                                   <Edit size={16} />
//                                 </button>
//                                 <button 
//                                   className="p-1 text-red-500"
//                                   onClick={() => removeActivity(dayIndex, activity.id)}
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </div>
                            
//                             <div className="text-sm text-gray-600 mt-1">
//                               {activity.description}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
//                         No activities planned for this day
//                       </div>
//                     )}
                    
//                     <button 
//                       className="w-full p-2 border border-dashed border-orange-300 rounded text-orange-600 text-sm flex items-center justify-center"
//                       onClick={() => openActivityEditor(dayIndex)}
//                     >
//                       <Plus size={16} className="mr-1" />
//                       Add Activity
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               <button 
//                 className="w-full p-3 border border-dashed border-orange-300 rounded-lg text-orange-600 flex items-center justify-center"
//                 onClick={addNewDay}
//               >
//                 <Plus size={16} className="mr-2" />
//                 Add Day
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Modal for editing activity */}
//       {editingActivity && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">
//                 {editingActivity.isNew ? "Add New Activity" : "Edit Activity"}
//               </h3>
//               <button className="text-gray-500" onClick={() => setEditingActivity(null)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
//                 <select 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.type}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, type: e.target.value}
//                   })}
//                 >
//                   <option value="hotel">Hotel</option>
//                   <option value="transfer">Transfer</option>
//                   <option value="activity">Activity</option>
//                   <option value="meal">Meal</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.title}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, title: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                 <input 
//                   type="time"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.time}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, time: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   rows="3"
//                   value={editingActivity.activity.description}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, description: e.target.value}
//                   })}
//                 ></textarea>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price ({selectedCurrency})</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingActivity.activity.price}
//                   onChange={(e) => setEditingActivity({
//                     ...editingActivity,
//                     activity: {...editingActivity.activity, price: parseFloat(e.target.value) || 0}
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingActivity(null)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
//                 onClick={saveActivity}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Modal for editing client details */}
//       {editingClientDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Edit Client Details</h3>
//               <button className="text-gray-500" onClick={() => setEditingClientDetails(false)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.clientName}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     clientName: e.target.value
//                   })}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.destination}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     destination: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Travel Dates</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.travelDates}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     travelDates: e.target.value
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.numberOfTravelers}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     numberOfTravelers: parseInt(e.target.value) || 1
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ({selectedCurrency})</label>
//                 <input 
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={currentItinerary.budget}
//                   onChange={(e) => setCurrentItinerary({
//                     ...currentItinerary,
//                     budget: parseFloat(e.target.value) || 0
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingClientDetails(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
//                 onClick={saveClientDetails}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Modal for editing day details */}
//       {editingDay && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Edit Day Details</h3>
//               <button className="text-gray-500" onClick={() => setEditingDay(null)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingDay.data.date}
//                   onChange={(e) => setEditingDay({
//                     ...editingDay,
//                     data: {...editingDay.data, date: e.target.value}
//                   })}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input 
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={editingDay.data.location}
//                   onChange={(e) => setEditingDay({
//                     ...editingDay,
//                     data: {...editingDay.data, location: e.target.value}
//                   })}
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setEditingDay(null)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
//                 onClick={saveDayDetails}
//               >
//                 <Save size={16} className="mr-1" />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Share options modal */}
//       {showShareOptions && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-bold text-lg">Share Itinerary</h3>
//               <button className="text-gray-500" onClick={() => setShowShareOptions(false)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                 <input 
//                   type="email"
//                   placeholder="client@example.com"
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
//                 <select className="w-full p-2 border border-gray-300 rounded">
//                   <option value="pdf">PDF Document</option>
//                   <option value="docx">Word Document</option>
//                   <option value="html">Web Page</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//                 <textarea 
//                   className="w-full p-2 border border-gray-300 rounded"
//                   rows="3"
//                   placeholder="Include a personal message..."
//                 ></textarea>
//               </div>
//             </div>
            
//             <div className="p-4 border-t flex justify-end space-x-2">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
//                 onClick={() => setShowShareOptions(false)}
//               >
//                 Cancel
//               </button>
//                 <button 
//                 className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
//                 onClick={sendItinerary}
//                 >
//                   <Mail size={16} className="mr-1" />
//                   Send Itinerary
//                 </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 };
                
//                 export default ItineraryBuilder;
      


import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Plus, Trash2, Edit, DollarSign, Hotel, Navigation, Camera, Coffee, Star, X, Save, Clock, Mail, Download, Share2, User, Users, ChevronDown, ChevronUp, Search } from 'lucide-react';

const ItineraryBuilder = () => {
  // State for clients list
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // State for current itinerary
  const [currentItinerary, setCurrentItinerary] = useState(null);
  
  // State for creating new client
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  // State for searching clients
  const [searchQuery, setSearchQuery] = useState('');
  
  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
  // States for CRUD operations
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingClientDetails, setEditingClientDetails] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('basityaqb819@cgmailc.com');
  const [emailMessage, setEmailMessage] = useState('');
  const [shareFormat, setShareFormat] = useState('pdf');
  
  // Currency conversion rates (sample)
  const currencyRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095
  };

  // Initialize with empty itinerary when a client is selected
  useEffect(() => {
    if (selectedClient) {
      // Check if client has an existing itinerary
      const existingItinerary = selectedClient.itinerary;
      
      if (existingItinerary) {
        setCurrentItinerary(existingItinerary);
      } else {
        // Create a new empty itinerary
        setCurrentItinerary({
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          travelDates: "",
          numberOfTravelers: 1,
          budget: 0,
          currency: "INR",
          destination: "",
          days: []
        });
      }
    } else {
      setCurrentItinerary(null);
    }
  }, [selectedClient]);
  
  // Add a new client
  const addClient = () => {
    const clientId = Date.now().toString();
    const clientWithId = {
      ...newClient,
      id: clientId
    };
    
    setClients([...clients, clientWithId]);
    setNewClient({
      id: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setShowAddClient(false);
    
    // Select the newly added client
    setSelectedClient(clientWithId);
  };
  
  // Remove a client
  const removeClient = (clientId) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
    
    // If the removed client was selected, clear selection
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(null);
    }
  };
  
  // Save itinerary to client
  const saveItineraryToClient = () => {
    if (!selectedClient || !currentItinerary) return;
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          itinerary: currentItinerary
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    // Update selected client with the itinerary
    setSelectedClient({
      ...selectedClient,
      itinerary: currentItinerary
    });
    
    alert('Itinerary saved successfully!');
  };
  
  // Add a new day to the itinerary
  const addNewDay = () => {
    if (!currentItinerary) return;
    
    let newDay;
    if (currentItinerary.days.length === 0) {
      newDay = {
        day: 1,
        date: getTomorrowDate(),
        location: currentItinerary.destination || "Location",
        activities: []
      };
    } else {
      const lastDay = currentItinerary.days[currentItinerary.days.length - 1];
      newDay = {
        day: lastDay.day + 1,
        date: getNextDate(lastDay.date),
        location: lastDay.location,
        activities: []
      };
    }
    
    setCurrentItinerary({
      ...currentItinerary,
      days: [...currentItinerary.days, newDay]
    });
  };
  
  // Helper function to get tomorrow's date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };
  
  // Helper function to get next date from a string date
  const getNextDate = (dateStr) => {
    // Very simple implementation - would need proper date parsing in production
    try {
      const parts = dateStr.split(', ');
      const dateParts = parts[0].split(' ');
      const month = dateParts[0];
      const day = parseInt(dateParts[1]);
      const year = parts[1];
      
      return `${month} ${day + 1}, ${year}`;
    } catch (e) {
      return getTomorrowDate();
    }
  };
  
  // Helper function to format date
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  // Remove a day from the itinerary
  const removeDay = (dayIndex) => {
    const updatedDays = currentItinerary.days.filter((_, index) => index !== dayIndex);
    // Renumber the days
    updatedDays.forEach((day, index) => {
      day.day = index + 1;
    });
    
    setCurrentItinerary({
      ...currentItinerary,
      days: updatedDays
    });
  };
  
  // Remove an activity from a day
  const removeActivity = (dayIndex, activityId) => {
    const updatedDays = [...currentItinerary.days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
      activity => activity.id !== activityId
    );
    
    setCurrentItinerary({
      ...currentItinerary,
      days: updatedDays
    });
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (!currentItinerary) return 0;
    
    let total = 0;
    currentItinerary.days.forEach(day => {
      day.activities.forEach(activity => {
        total += activity.price || 0;
      });
    });
    return total;
  };
  
  // Convert price to selected currency
  const convertPrice = (price) => {
    return (price * currencyRates[selectedCurrency]).toFixed(2);
  };
  
  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    switch(currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'INR': 
      default: return '₹';
    }
  };
  
  // Get icon component based on type
  const getIconForType = (type) => {
    switch(type) {
      case 'hotel': return <Hotel size={16} />;
      case 'transfer': return <Navigation size={16} />;
      case 'activity': return <Camera size={16} />;
      case 'meal': return <Coffee size={16} />;
      default: return <Star size={16} />;
    }
  };
  
  // CRUD - Open activity editor
  const openActivityEditor = (dayIndex, activity = null) => {
    // If activity is null, we're creating a new activity
    if (activity === null) {
      setEditingActivity({
        dayIndex,
        activity: {
          id: Date.now(),
          time: "12:00",
          type: "activity",
          title: "",
          description: "",
          icon: "activity",
          price: 0
        },
        isNew: true
      });
    } else {
      // We're editing an existing activity
      setEditingActivity({
        dayIndex,
        activity: {...activity},
        isNew: false
      });
    }
  };
  
  // CRUD - Save activity
  const saveActivity = () => {
    if (!editingActivity) return;
    
    const { dayIndex, activity, isNew } = editingActivity;
    const updatedDays = [...currentItinerary.days];
    
    if (isNew) {
      // Add new activity
      updatedDays[dayIndex].activities.push(activity);
    } else {
      // Update existing activity
      const activityIndex = updatedDays[dayIndex].activities.findIndex(a => a.id === activity.id);
      if (activityIndex !== -1) {
        updatedDays[dayIndex].activities[activityIndex] = activity;
      }
    }
    
    setCurrentItinerary({
      ...currentItinerary,
      days: updatedDays
    });
    
    setEditingActivity(null);
  };
  
  // CRUD - Update client details
  const saveClientDetails = () => {
    setEditingClientDetails(false);
  };
  
  // CRUD - Open day editor
  const openDayEditor = (dayIndex) => {
    setEditingDay({
      index: dayIndex,
      data: {...currentItinerary.days[dayIndex]}
    });
  };
  
  // CRUD - Save day details
  const saveDayDetails = () => {
    if (!editingDay) return;
    
    const updatedDays = [...currentItinerary.days];
    updatedDays[editingDay.index] = editingDay.data;
    
    setCurrentItinerary({
      ...currentItinerary,
      days: updatedDays
    });
    
    setEditingDay(null);
  };

  // Export itinerary (mock function)
  const exportItinerary = () => {
    alert('Itinerary exported successfully!');
  };

  // Send itinerary (mock function)
  const sendItinerary = () => {
    alert(`Itinerary sent successfully to ${emailRecipient}!`);
    setShowShareOptions(false);
  };
  
  // Filtered clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Render client management UI when no client is selected
  if (!selectedClient) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-orange-600 text-white p-4 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">TravelPlanner</h1>
              <p className="text-sm">Itinerary Builder</p>
            </div>
          </div>
        </header>
        
        {/* Client Management */}
        <div className="flex-1 max-w-4xl mx-auto w-full p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Client Management</h2>
            <button 
              className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
              onClick={() => setShowAddClient(true)}
            >
              <Plus size={16} className="mr-2" />
              Add New Client
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients by name or email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Clients List */}
          <div className="bg-white rounded-lg shadow">
            {filteredClients.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                {searchQuery ? "No clients match your search" : "No clients yet. Add your first client to get started."}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <li key={client.id} className="p-4 hover:bg-orange-50">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center mr-3">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">{client.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm"
                          onClick={() => setSelectedClient(client)}
                        >
                          {client.itinerary ? "View Itinerary" : "Create Itinerary"}
                        </button>
                        <button
                          className="p-1 text-red-500"
                          onClick={() => removeClient(client.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Modal for adding new client */}
        {showAddClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">Add New Client</h3>
                <button className="text-gray-500" onClick={() => setShowAddClient(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                  <input 
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    value={newClient.notes}
                    onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="p-4 border-t flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => setShowAddClient(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
                  onClick={addClient}
                  disabled={!newClient.name.trim()}
                >
                  <Save size={16} className="mr-1" />
                  Add Client
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">TravelPlanner</h1>
            <p className="text-sm">Itinerary Builder</p>
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 bg-orange-700 rounded-md text-sm flex items-center"
              onClick={() => setShowShareOptions(true)}
            >
              <Share2 size={16} className="mr-1" />
              Share
            </button>
            <button 
              className="px-3 py-1 bg-orange-700 rounded-md text-sm flex items-center"
              onClick={exportItinerary}
            >
              <Download size={16} className="mr-1" />
              Export
            </button>
            <button 
              className="px-3 py-1 bg-orange-700 rounded-md text-sm"
              onClick={saveItineraryToClient}
            >
              Save
            </button>
            <button 
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
              onClick={() => setSelectedClient(null)}
            >
              Back to Clients
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-gray-700">Client Details</h2>
              <button 
                className="text-orange-600"
                onClick={() => setEditingClientDetails(true)}
              >
                <Edit size={16} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
  <p><span className="text-gray-500">Client:</span> {currentItinerary?.clientName || "-"}</p>
  <p><span className="text-gray-500">Destination:</span> {currentItinerary?.destination || "-"}</p>
  <p><span className="text-gray-500">Travel Dates:</span> {currentItinerary?.travelDates || "-"}</p>
  <p><span className="text-gray-500">Travelers:</span> {currentItinerary?.numberOfTravelers || "-"}</p>
  <p>
    <span className="text-gray-500">Budget:</span> 
    {getCurrencySymbol(selectedCurrency)}{convertPrice(currentItinerary?.budget || 0)} {selectedCurrency}
  </p>
</div>

          </div>
          
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Currency</h3>
              <select 
                className="text-xs border rounded py-1"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>
          </div>
          
       

<div className="p-4 border-b">
  <h3 className="font-medium text-gray-700 mb-2">Itinerary Summary</h3>
  <div className="space-y-2 text-sm">
    <p>
      <span className="text-gray-500">Total Days:</span> 
      {currentItinerary?.days?.length || 0}
    </p>
    <p>
      <span className="text-gray-500">Total Activities:</span> 
      {currentItinerary?.days?.reduce((count, day) => count + (day.activities?.length || 0), 0) || 0}
    </p>
    <p>
      <span className="text-gray-500">Total Cost:</span> 
      {getCurrencySymbol(selectedCurrency)}
      {convertPrice(calculateTotalPrice() || 0)} {selectedCurrency}
    </p>
  </div>
</div>

          
      

<div className="flex-1 overflow-y-auto p-4">
  <h3 className="font-medium text-gray-700 mb-3">Itinerary Overview</h3>
  <div className="space-y-2">
    {currentItinerary?.days?.length === 0 ? (
      <div className="text-center text-gray-500 p-4 border border-dashed border-gray-300 rounded">
        No days added yet.<br />
        Click "Add Day" to start building your itinerary.
      </div>
    ) : (
      currentItinerary?.days?.map((day, index) => (
        <div key={index} className="p-2 border rounded hover:bg-orange-50">
          <div className="font-medium">Day {day?.day || index + 1}: {day?.date || "No Date"}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <MapPin size={14} className="mr-1" />
            {day?.location || "No Location"}
          </div>
        </div>
      ))
    )}
  </div>
</div>

        </div>
        
       

<div className="flex-1 overflow-y-auto p-6">
  <div className="max-w-4xl mx-auto">
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">
        {currentItinerary?.clientName || "Client"}'s {currentItinerary?.destination || ""} Itinerary
      </h2>

      <div className="text-gray-700">
        <span className="text-sm">Total Cost: </span>
        <span className="font-bold">
          {getCurrencySymbol(selectedCurrency)}
          {convertPrice(calculateTotalPrice())} {selectedCurrency}
        </span>
      </div>
    </div>

    <div className="space-y-6">
      {currentItinerary?.days?.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={24} className="text-orange-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start building your itinerary</h3>
          <p className="text-gray-500 mb-6">Add your first day to begin planning this trip</p>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center mx-auto"
            onClick={addNewDay}
          >
            <Plus size={16} className="mr-2" />
            Add First Day
          </button>
        </div>
      ) : (
        currentItinerary?.days?.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-orange-50 p-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-orange-600 text-white flex items-center justify-center mr-3">
                  Day {day?.day || dayIndex + 1}
                </div>
                <div>
                  <h3 className="font-medium">{day?.date || "No Date Provided"}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    {day?.location || "No Location"}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => openDayEditor(dayIndex)}>
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-500 hover:text-red-700" onClick={() => removeDay(dayIndex)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {day?.activities?.length > 0 ? (
                day?.activities?.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-20 text-center">
                      <div className="text-sm font-medium text-gray-700">{activity?.time || "No Time"}</div>
                      <div className="mt-1 p-1 rounded bg-orange-100 text-orange-700 inline-flex">
                        {getIconForType(activity?.type || "default")}
                      </div>
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{activity?.title || "No Title"}</div>

                        <div className="flex items-center">
                          <div className="mr-3 text-gray-700 font-medium">
                            {activity?.price > 0 ? (
                              <span>{getCurrencySymbol(selectedCurrency)}{convertPrice(activity?.price)}</span>
                            ) : (
                              <span className="text-green-600">Included</span>
                            )}
                          </div>
                          <button className="p-1 text-orange-500 mr-1" onClick={() => openActivityEditor(dayIndex, activity)}>
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-500" onClick={() => removeActivity(dayIndex, activity?.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mt-1">
                        {activity?.description || "No description available"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  No activities planned for this day
                </div>
              )}

              <button
                className="w-full p-2 border border-dashed border-orange-300 rounded text-orange-600 text-sm flex items-center justify-center"
                onClick={() => openActivityEditor(dayIndex)}
              >
                <Plus size={16} className="mr-1" />
                Add Activity
              </button>
            </div>
          </div>
        ))
      )}

      {currentItinerary?.days?.length > 0 && (
        <button className="w-full p-3 border border-dashed border-orange-300 rounded-lg text-orange-600 flex items-center justify-center" onClick={addNewDay}>
          <Plus size={16} className="mr-2" />
          Add Day
        </button>
      )}
    </div>
  </div>
</div>

      </div>
      
      {/* Modal for editing activity */}
      {editingActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingActivity.isNew ? 'Add New Activity' : 'Edit Activity'}</h3>
              <button className="text-gray-500" onClick={() => setEditingActivity(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editingActivity.activity.time}
                    onChange={(e) => setEditingActivity({
                      ...editingActivity,
                      activity: {...editingActivity.activity, time: e.target.value}
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editingActivity.activity.type}
                    onChange={(e) => setEditingActivity({
                      ...editingActivity,
                      activity: {...editingActivity.activity, type: e.target.value, icon: e.target.value}
                    })}
                  >
                    <option value="hotel">Accommodation</option>
                    <option value="transfer">Transfer</option>
                    <option value="activity">Activity</option>
                    <option value="meal">Meal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editingActivity.activity.title}
                  onChange={(e) => setEditingActivity({
                    ...editingActivity,
                    activity: {...editingActivity.activity, title: e.target.value}
                  })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  value={editingActivity.activity.description}
                  onChange={(e) => setEditingActivity({
                    ...editingActivity,
                    activity: {...editingActivity.activity, description: e.target.value}
                  })}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ({selectedCurrency})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="number"
                    className="w-full pl-10 p-2 border border-gray-300 rounded"
                    value={editingActivity.activity.price}
                    onChange={(e) => setEditingActivity({
                      ...editingActivity,
                      activity: {...editingActivity.activity, price: parseFloat(e.target.value) || 0}
                    })}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={() => setEditingActivity(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
                onClick={saveActivity}
                disabled={!editingActivity.activity.title.trim()}
              >
                <Save size={16} className="mr-1" />
                {editingActivity.isNew ? 'Add Activity' : 'Update Activity'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for editing client details */}
      {editingClientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Edit Itinerary Details</h3>
              <button className="text-gray-500" onClick={() => setEditingClientDetails(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentItinerary.destination}
                  onChange={(e) => setCurrentItinerary({
                    ...currentItinerary,
                    destination: e.target.value
                  })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Dates</label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentItinerary.travelDates}
                  onChange={(e) => setCurrentItinerary({
                    ...currentItinerary,
                    travelDates: e.target.value
                  })}
                  placeholder="E.g., Jan 15-22, 2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                <input 
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentItinerary.numberOfTravelers}
                  onChange={(e) => setCurrentItinerary({
                    ...currentItinerary,
                    numberOfTravelers: parseInt(e.target.value) || 1
                  })}
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget ({currentItinerary.currency})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="number"
                    className="w-full pl-10 p-2 border border-gray-300 rounded"
                    value={currentItinerary.budget}
                    onChange={(e) => setCurrentItinerary({
                      ...currentItinerary,
                      budget: parseFloat(e.target.value) || 0
                    })}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentItinerary.currency}
                  onChange={(e) => setCurrentItinerary({
                    ...currentItinerary,
                    currency: e.target.value
                  })}
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={() => setEditingClientDetails(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-orange-600 text-white rounded flex items-center"
                onClick={saveClientDetails}
              >
                <Save size={16} className="mr-1" />
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  export default ItineraryBuilder;
