// // components/TravelPackageForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLoadScript } from '@react-google-maps/api';

// const TravelPackageForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     destination: '',
//     hotel: '',
//     price: '',
//     description: '',
//     duration: '',
//     itinerary: [{ day: 1, activity: '' }]
//   });

//   const [suggestions, setSuggestions] = useState({
//     places: [],
//     hotels: []
//   });

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
//     libraries: ['places']
//   });

//   const handlePlaceSearch = async (input) => {
//     if (!input) return;

//     const service = new window.google.maps.places.AutocompleteService();
//     service.getPlacePredictions(
//       {
//         input,
//         types: ['(cities)']
//       },
//       (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setSuggestions(prev => ({...prev, places: predictions}));
//         }
//       }
//     );
//   };

//   const handleHotelSearch = async (place) => {
//     const service = new window.google.maps.places.PlacesService(
//       document.createElement('div')
//     );
    
//     service.nearbySearch(
//       {
//         location: place.geometry.location,
//         radius: '5000',
//         type: ['lodging']
//       },
//       (results, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setSuggestions(prev => ({...prev, hotels: results}));
//         }
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/packages', formData);
//       console.log('Package created:', response.data);
//       // Add success notification here
//     } catch (error) {
//       console.error('Error creating package:', error);
//       // Add error notification here
//     }
//   };

//   const addItineraryDay = () => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }]
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">Create Travel Package</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Package Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Destination</label>
//             <input
//               type="text"
//               value={formData.destination}
//               onChange={(e) => {
//                 setFormData(prev => ({...prev, destination: e.target.value}));
//                 handlePlaceSearch(e.target.value);
//               }}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//             {suggestions.places.length > 0 && (
//               <ul className="mt-2 border rounded-md shadow-sm">
//                 {suggestions.places.map((place) => (
//                   <li
//                     key={place.place_id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setFormData(prev => ({...prev, destination: place.description}));
//                       handleHotelSearch(place);
//                       setSuggestions(prev => ({...prev, places: []}));
//                     }}
//                   >
//                     {place.description}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Hotel</label>
//             <input
//               type="text"
//               value={formData.hotel}
//               onChange={(e) => setFormData(prev => ({...prev, hotel: e.target.value}))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//             {suggestions.hotels.length > 0 && (
//               <ul className="mt-2 border rounded-md shadow-sm">
//                 {suggestions.hotels.map((hotel) => (
//                   <li
//                     key={hotel.place_id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setFormData(prev => ({...prev, hotel: hotel.name}));
//                       setSuggestions(prev => ({...prev, hotels: []}));
//                     }}
//                   >
//                     {hotel.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input
//               type="number"
//               value={formData.price}
//               onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
//             <input
//               type="number"
//               value={formData.duration}
//               onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
//               rows={4}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Itinerary</label>
//             {formData.itinerary.map((day, index) => (
//               <div key={index} className="flex gap-4 mb-2">
//                 <div className="w-20">
//                   <label className="block text-xs text-gray-500">Day</label>
//                   <input
//                     type="number"
//                     value={day.day}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-xs text-gray-500">Activity</label>
//                   <input
//                     type="text"
//                     value={day.activity}
//                     onChange={(e) => {
//                       const newItinerary = [...formData.itinerary];
//                       newItinerary[index].activity = e.target.value;
//                       setFormData(prev => ({...prev, itinerary: newItinerary}));
//                     }}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addItineraryDay}
//               className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
//             >
//               + Add Day
//             </button>
//           </div>
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Create Package
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TravelPackageForm;




// components/TravelPackageForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLoadScript } from '@react-google-maps/api';

const TravelPackageForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    hotel: '',
    price: '',
    description: '',
    duration: '',
    itinerary: [{ day: 1, activity: '' }]
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({
    places: [],
    hotels: []
  });

  const autoCompleteRef = useRef(null);
  const hotelSearchRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
    libraries: ['places']
  });

  useEffect(() => {
    if (isLoaded) {
      // Initialize the autocomplete service
      autoCompleteRef.current = new window.google.maps.places.AutocompleteService();
      hotelSearchRef.current = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );
    }
  }, [isLoaded]);

  const handlePlaceSearch = async (input) => {
    if (!input || !autoCompleteRef.current) return;

    try {
      autoCompleteRef.current.getPlacePredictions(
        {
          input,
          types: ['(cities)']
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(prev => ({...prev, places: predictions}));
          }
        }
      );
    } catch (error) {
      console.error('Place search error:', error);
      setError('Error searching for places');
    }
  };

  const handleHotelSearch = async (place) => {
    if (!hotelSearchRef.current) return;

    // First, get the place details to get the location coordinates
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        
        const request = {
          location: location,
          radius: '5000',
          type: ['lodging']
        };

        hotelSearchRef.current.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setSuggestions(prev => ({...prev, hotels: results}));
          } else {
            console.error('Hotel search error:', status);
            setError('Error searching for hotels');
          }
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.title || !formData.destination || !formData.hotel || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      const response = await axios.post('http://localhost:5000/api/packages', formData);
      setSuccess('Package created successfully!');
      // Reset form
      setFormData({
        title: '',
        destination: '',
        hotel: '',
        price: '',
        description: '',
        duration: '',
        itinerary: [{ day: 1, activity: '' }]
      });
    } catch (error) {
      setError(error.message || 'Error creating package');
    } finally {
      setLoading(false);
    }
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }]
    }));
  };

  if (loadError) return <div className="text-red-500">Error loading Google Maps</div>;
  if (!isLoaded) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-3xl font-extrabold text-white">Create Travel Package</h2>
          <p className="mt-2 text-blue-100">Customize your perfect travel experience</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter package title"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => {
                  setFormData(prev => ({...prev, destination: e.target.value}));
                  handlePlaceSearch(e.target.value);
                }}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search for a destination"
              />
              {suggestions.places.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
                  {suggestions.places.map((place) => (
                    <li
                      key={place.place_id}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
                      onClick={() => {
                        setFormData(prev => ({...prev, destination: place.description}));
                        handleHotelSearch(place.description);
                        setSuggestions(prev => ({...prev, places: []}));
                      }}
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Hotel</label>
              <input
                type="text"
                value={formData.hotel}
                onChange={(e) => {
                  setFormData(prev => ({...prev, hotel: e.target.value}));
                  if (formData.destination) {
                    handleHotelSearch(formData.destination);
                  }
                }}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search for a hotel"
              />
              {suggestions.hotels.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
                  {suggestions.hotels.map((hotel) => (
                    <li
                      key={hotel.place_id}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
                      onClick={() => {
                        setFormData(prev => ({...prev, hotel: hotel.name}));
                        setSuggestions(prev => ({...prev, hotels: []}));
                      }}
                    >
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-gray-500">{hotel.vicinity}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                  className="block w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Number of days"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              rows={4}
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Describe the package..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Itinerary</label>
              <button
                type="button"
                onClick={addItineraryDay}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                + Add Day
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-20">
                    <label className="block text-xs text-gray-500">Day</label>
                    <input
                      type="number"
                      value={day.day}
                      disabled
                      className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500">Activity</label>
                    <input
                      type="text"
                      value={day.activity}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].activity = e.target.value;
                        setFormData(prev => ({...prev, itinerary: newItinerary}));
                      }}
                      className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the activity for this day"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Package...' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelPackageForm;// components/TravelPackageForm.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useLoadScript } from '@react-google-maps/api';

// const TravelPackageForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     destination: '',
//     hotel: '',
//     price: '',
//     description: '',
//     duration: '',
//     itinerary: [{ day: 1, activity: '' }]
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState({
//     places: [],
//     hotels: []
//   });

//   const autoCompleteRef = useRef(null);
//   const hotelSearchRef = useRef(null);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
//     libraries: ['places']
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       // Initialize the autocomplete service
//       autoCompleteRef.current = new window.google.maps.places.AutocompleteService();
//       hotelSearchRef.current = new window.google.maps.places.PlacesService(
//         document.createElement('div')
//       );
//     }
//   }, [isLoaded]);

//   const handlePlaceSearch = async (input) => {
//     if (!input || !autoCompleteRef.current) return;

//     try {
//       autoCompleteRef.current.getPlacePredictions(
//         {
//           input,
//           types: ['(cities)']
//         },
//         (predictions, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
//             setSuggestions(prev => ({...prev, places: predictions}));
//           }
//         }
//       );
//     } catch (error) {
//       console.error('Place search error:', error);
//       setError('Error searching for places');
//     }
//   };

//   const handleHotelSearch = async (place) => {
//     if (!hotelSearchRef.current) return;

//     // First, get the place details to get the location coordinates
//     const geocoder = new window.google.maps.Geocoder();
    
//     geocoder.geocode({ address: place }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const location = results[0].geometry.location;
        
//         const request = {
//           location: location,
//           radius: '5000',
//           type: ['lodging']
//         };

//         hotelSearchRef.current.nearbySearch(request, (results, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
//             setSuggestions(prev => ({...prev, hotels: results}));
//           } else {
//             console.error('Hotel search error:', status);
//             setError('Error searching for hotels');
//           }
//         });
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Validate form data
//       if (!formData.title || !formData.destination || !formData.hotel || !formData.price) {
//         throw new Error('Please fill in all required fields');
//       }

//       const response = await axios.post('http://localhost:5000/api/packages', formData);
//       setSuccess('Package created successfully!');
//       // Reset form
//       setFormData({
//         title: '',
//         destination: '',
//         hotel: '',
//         price: '',
//         description: '',
//         duration: '',
//         itinerary: [{ day: 1, activity: '' }]
//       });
//     } catch (error) {
//       setError(error.message || 'Error creating package');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addItineraryDay = () => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }]
//     }));
//   };

//   if (loadError) return <div className="text-red-500">Error loading Google Maps</div>;
//   if (!isLoaded) return <div className="text-gray-500">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//           <h2 className="text-3xl font-extrabold text-white">Create Travel Package</h2>
//           <p className="mt-2 text-blue-100">Customize your perfect travel experience</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}
          
//           {success && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
//               <p className="text-green-700">{success}</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Package Title</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter package title"
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Destination</label>
//               <input
//                 type="text"
//                 value={formData.destination}
//                 onChange={(e) => {
//                   setFormData(prev => ({...prev, destination: e.target.value}));
//                   handlePlaceSearch(e.target.value);
//                 }}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Search for a destination"
//               />
//               {suggestions.places.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.places.map((place) => (
//                     <li
//                       key={place.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => {
//                         setFormData(prev => ({...prev, destination: place.description}));
//                         setSuggestions(prev => ({...prev, places: []}));
//                         handleHotelSearch(place.description); // Trigger hotel search here
//                       }}
//                     >
//                       {place.description}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Hotel</label>
//               <input
//                 type="text"
//                 value={formData.hotel}
//                 onChange={(e) => setFormData(prev => ({...prev, hotel: e.target.value}))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Search for a hotel"
//               />
//               {suggestions.hotels.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.hotels.map((hotel) => (
//                     <li
//                       key={hotel.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => {
//                         setFormData(prev => ({...prev, hotel: hotel.name}));
//                         setSuggestions(prev => ({...prev, hotels: []}));
//                       }}
//                     >
//                       <div className="font-medium">{hotel.name}</div>
//                       <div className="text-sm text-gray-500">{hotel.vicinity}</div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Price</label>
//               <div className="mt-1 relative rounded-xl shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <span className="text-gray-500">$</span>
//                 </div>
//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
//                   className="block w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
//               <input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Number of days"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
//               rows={4}
//               className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               placeholder="Describe the package..."
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <label className="block text-sm font-medium text-gray-700">Itinerary</label>
//               <button
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               >
//                 + Add Day
//               </button>
//             </div>
            
//             <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
//               {formData.itinerary.map((day, index) => (
//                 <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="w-20">
//                     <label className="block text-xs text-gray-500">Day</label>
//                     <input
//                       type="number"
//                       value={day.day}
//                       disabled
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-xs text-gray-500">Activity</label>
//                     <input
//                       type="text"
//                       value={day.activity}
//                       onChange={(e) => {
//                         const newItinerary = [...formData.itinerary];
//                         newItinerary[index].activity = e.target.value;
//                         setFormData(prev => ({...prev, itinerary: newItinerary}));
//                       }}
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Describe the activity for this day"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="pt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                 loading ? 'opacity-75 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Creating Package...' : 'Create Package'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TravelPackageForm;








// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useLoadScript } from '@react-google-maps/api';

// const TravelPackageForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     destination: '',
//     hotel: '',
//     price: '',
//     description: '',
//     duration: '',
//     itinerary: [{ day: 1, activity: '' }]
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState({
//     places: [],
//     hotels: []
//   });

//   const selectedPlaceRef = useRef(null);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
//     libraries: ['places']
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       const placesDiv = document.createElement('div');
//       hotelSearchRef.current = new window.google.maps.places.PlacesService(placesDiv);
//     }
//   }, [isLoaded]);

//   const handlePlaceSearch = async (input) => {
//     if (!input || !isLoaded) return;

//     const service = new window.google.maps.places.AutocompleteService();
//     service.getPlacePredictions(
//       {
//         input,
//         types: ['(cities)']
//       },
//       (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
//           setSuggestions(prev => ({...prev, places: predictions}));
//         }
//       }
//     );
//   };

//   const getPlaceDetails = (placeId) => {
//     return new Promise((resolve, reject) => {
//       const service = new window.google.maps.places.PlacesService(document.createElement('div'));
//       service.getDetails(
//         {
//           placeId: placeId,
//           fields: ['geometry']
//         },
//         (result, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             resolve(result);
//           } else {
//             reject(status);
//           }
//         }
//       );
//     });
//   };

//   const handleHotelSearch = async (input) => {
//     if (!input || !isLoaded || !selectedPlaceRef.current) {
//       console.log("Can't search for hotels without a selected destination");
//       return;
//     }

//     const location = selectedPlaceRef.current;
//     const service = new window.google.maps.places.PlacesService(document.createElement('div'));

//     const request = {
//       input: input,
//       location: location,
//       radius: 5000,
//       type: ['lodging']
//     };

//     service.textSearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
//         setSuggestions(prev => ({...prev, hotels: results}));
//       } else {
//         console.error('Hotel search failed:', status);
//         setError('Failed to search for hotels');
//       }
//     });
//   };

//   const handlePlaceSelection = async (place) => {
//     try {
//       const placeDetails = await getPlaceDetails(place.place_id);
//       selectedPlaceRef.current = placeDetails.geometry.location;
//       setFormData(prev => ({...prev, destination: place.description}));
//       setSuggestions(prev => ({...prev, places: []}));
//     } catch (error) {
//       console.error('Error getting place details:', error);
//       setError('Failed to get location details');
//     }
//   };
//   const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');
    
//         try {
//           // Validate form data
//           if (!formData.title || !formData.destination || !formData.hotel || !formData.price) {
//             throw new Error('Please fill in all required fields');
//           }
    
//           const response = await axios.post('http://localhost:5000/api/packages', formData);
//           setSuccess('Package created successfully!');
//           // Reset form
//           setFormData({
//             title: '',
//             destination: '',
//             hotel: '',
//             price: '',
//             description: '',
//             duration: '',
//             itinerary: [{ day: 1, activity: '' }]
//           });
//         } catch (error) {
//           setError(error.message || 'Error creating package');
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       const addItineraryDay = () => {
//         setFormData(prev => ({
//           ...prev,
//           itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }]
//         }));
//       };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//           <h2 className="text-3xl font-extrabold text-white">Create Travel Package</h2>
//           <p className="mt-2 text-blue-100">Customize your perfect travel experience</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}
          
//           {success && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
//               <p className="text-green-700">{success}</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Package Title</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter package title"
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Destination</label>
//               <input
//                 type="text"
//                 value={formData.destination}
//                 onChange={(e) => {
//                   setFormData(prev => ({...prev, destination: e.target.value}));
//                   handlePlaceSearch(e.target.value);
//                 }}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Search for a destination"
//               />
//               {suggestions.places.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.places.map((place) => (
//                     <li
//                       key={place.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => handlePlaceSelection(place)}
//                     >
//                       {place.description}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Hotel</label>
//               <input
//                 type="text"
//                 value={formData.hotel}
//                 onChange={(e) => {
//                   setFormData(prev => ({...prev, hotel: e.target.value}));
//                   if (selectedPlaceRef.current) {
//                     handleHotelSearch(e.target.value);
//                   }
//                 }}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder={selectedPlaceRef.current ? "Search for hotels..." : "Select a destination first"}
//                 disabled={!selectedPlaceRef.current}
//               />
//               {suggestions.hotels.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.hotels.map((hotel) => (
//                     <li
//                       key={hotel.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => {
//                         setFormData(prev => ({...prev, hotel: hotel.name}));
//                         setSuggestions(prev => ({...prev, hotels: []}));
//                       }}
//                     >
//                       <div className="font-medium">{hotel.name}</div>
//                       <div className="text-sm text-gray-500">{hotel.formatted_address}</div>
//                       {hotel.rating && (
//                         <div className="text-sm text-yellow-500">
//                           Rating: {hotel.rating} ⭐
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Price</label>
//               <div className="mt-1 relative rounded-xl shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <span className="text-gray-500">$</span>
//                 </div>
//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
//                   className="block w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
//               <input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Number of days"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
//               rows={4}
//               className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               placeholder="Describe the package..."
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <label className="block text-sm font-medium text-gray-700">Itinerary</label>
//               <button
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               >
//                 + Add Day
//               </button>
//             </div>
            
//             <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
//               {formData.itinerary.map((day, index) => (
//                 <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="w-20">
//                     <label className="block text-xs text-gray-500">Day</label>
//                     <input
//                       type="number"
//                       value={day.day}
//                       disabled
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-xs text-gray-500">Activity</label>
//                     <input
//                       type="text"
//                       value={day.activity}
//                       onChange={(e) => {
//                         const newItinerary = [...formData.itinerary];
//                         newItinerary[index].activity = e.target.value;
//                         setFormData(prev => ({...prev, itinerary: newItinerary}));
//                       }}
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Describe the activity for this day"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="pt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                 loading ? 'opacity-75 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Creating Package...' : 'Create Package'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TravelPackageForm;




// Frontend Structure
// src/components/TravelPackageForm.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useLoadScript } from '@react-google-maps/api';

// const libraries = ['places'];

// const TravelPackageForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     destination: '',
//     hotel: '',
//     price: '',
//     description: '',
//     duration: '',
//     itinerary: [{ day: 1, activity: '' }]
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState({
//     places: [],
//     hotels: []
//   });

//   const selectedPlaceRef = useRef(null);
//   const placesServiceRef = useRef(null);

// //   const { isLoaded, loadError } = useLoadScript({
// //     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
// //     libraries
// //   });

// //   useEffect(() => {
// //     if (isLoaded && window.google) {
// //       placesServiceRef.current = new window.google.maps.places.PlacesService(
// //         document.createElement('div')
// //       );
// //     }
// //   }, [isLoaded]);

// //   const handlePlaceSearch = (input) => {
// //     if (!input || !isLoaded) return;

// //     const service = new window.google.maps.places.AutocompleteService();
// //     service.getPlacePredictions(
// //       {
// //         input,
// //         types: ['(cities)']
// //       },
// //       (predictions, status) => {
// //         if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
// //           setSuggestions(prev => ({ ...prev, places: predictions }));
// //         }
// //       }
// //     );
// //   };

// //   const getPlaceDetails = (placeId) => {
// //     return new Promise((resolve, reject) => {
// //       if (!placesServiceRef.current) {
// //         reject('Places service not initialized');
// //         return;
// //       }

// //       placesServiceRef.current.getDetails(
// //         {
// //           placeId: placeId,
// //           fields: ['geometry', 'formatted_address']
// //         },
// //         (result, status) => {
// //           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
// //             resolve(result);
// //           } else {
// //             reject(status);
// //           }
// //         }
// //       );
// //     });
// //   };

// //   const handlePlaceSelection = async (place) => {
// //     try {
// //       const placeDetails = await getPlaceDetails(place.place_id);
// //       selectedPlaceRef.current = placeDetails.geometry.location;
// //       setFormData(prev => ({ ...prev, destination: place.description }));
// //       setSuggestions(prev => ({ ...prev, places: [] }));
// //     } catch (error) {
// //       console.error('Error getting place details:', error);
// //       setError('Failed to get location details');
// //     }
// //   };

// //   const handleHotelSearch = (input) => {
// //     if (!input || !isLoaded || !selectedPlaceRef.current) return;

// //     const request = {
// //       query: `${input} hotel near ${formData.destination}`,
// //       location: selectedPlaceRef.current,
// //       radius: '5000',
// //       type: ['lodging']
// //     };

// //     placesServiceRef.current.textSearch(request, (results, status) => {
// //       if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
// //         setSuggestions(prev => ({ ...prev, hotels: results }));
// //       }
// //     });
// //   };

// const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
//     libraries
//   });

//   useEffect(() => {
//     if (isLoaded && window.google) {
//       placesServiceRef.current = new window.google.maps.places.PlacesService(
//         document.createElement('div')
//       );
//     }
//   }, [isLoaded]);

//   // Define the bounds for Jammu & Kashmir and Ladakh
//   const JKL_BOUNDS = {
//     north: 35.6745,
//     south: 32.17,
//     west: 73.50,
//     east: 80.50
//   };

//   // Search for places (restricted to J&K and Ladakh)
//   const handlePlaceSearch = (input) => {
//     if (!input || !isLoaded) return;

//     const service = new window.google.maps.places.AutocompleteService();
//     service.getPlacePredictions(
//       {
//         input,
//         types: ['(cities)'],
//         locationBias: JKL_BOUNDS // Restrict search to J&K and Ladakh
//       },
//       (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
//           setSuggestions(prev => ({ ...prev, places: predictions }));
//         }
//       }
//     );
//   };

//   // Get Place Details
//   const getPlaceDetails = (placeId) => {
//     return new Promise((resolve, reject) => {
//       if (!placesServiceRef.current) {
//         reject('Places service not initialized');
//         return;
//       }

//       placesServiceRef.current.getDetails(
//         {
//           placeId: placeId,
//           fields: ['geometry', 'formatted_address']
//         },
//         (result, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             resolve(result);
//           } else {
//             reject(status);
//           }
//         }
//       );
//     });
//   };

//   // Handle Place Selection
//   const handlePlaceSelection = async (place) => {
//     try {
//       const placeDetails = await getPlaceDetails(place.place_id);
//       selectedPlaceRef.current = placeDetails.geometry.location;
//       setFormData(prev => ({ ...prev, destination: place.description }));
//       setSuggestions(prev => ({ ...prev, places: [] }));
//     } catch (error) {
//       console.error('Error getting place details:', error);
//       setError('Failed to get location details');
//     }
//   };

//   // Search for Hotels (restricted to J&K and Ladakh)
//   const handleHotelSearch = (input) => {
//     if (!input || !isLoaded || !selectedPlaceRef.current) return;

//     const request = {
//       query: `${input} hotel`,
//       location: selectedPlaceRef.current,
//       radius: 10000, // 10km search radius
//       type: ['lodging'],
//       region: 'IN' // Restrict search to India
//     };

//     placesServiceRef.current.textSearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
//         // Filter results to make sure they are within J&K and Ladakh
//         const filteredResults = results.filter((hotel) => {
//           if (hotel.geometry && hotel.geometry.location) {
//             const { lat, lng } = hotel.geometry.location;
//             return (
//               lat >= JKL_BOUNDS.south &&
//               lat <= JKL_BOUNDS.north &&
//               lng >= JKL_BOUNDS.west &&
//               lng <= JKL_BOUNDS.east
//             );
//           }
//           return false;
//         });

//         setSuggestions(prev => ({ ...prev, hotels: filteredResults }));
//       }
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       if (!formData.title || !formData.destination || !formData.hotel || !formData.price) {
//         throw new Error('Please fill in all required fields');
//       }

//       const response = await axios.post('http://localhost:5000/api/packages', formData);
//       setSuccess('Package created successfully!');
//       setFormData({
//         title: '',
//         destination: '',
//         hotel: '',
//         price: '',
//         description: '',
//         duration: '',
//         itinerary: [{ day: 1, activity: '' }]
//       });
//       selectedPlaceRef.current = null;
//     } catch (error) {
//       setError(error.message || 'Error creating package');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addItineraryDay = () => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, activity: '' }]
//     }));
//   };

//   if (loadError) return <div className="text-red-500">Error loading Google Maps</div>;
//   if (!isLoaded) return <div className="text-gray-500">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//           <h2 className="text-3xl font-extrabold text-white">Create Travel Package</h2>
//           <p className="mt-2 text-blue-100">Customize your perfect travel experience</p>
//         </div>

//         <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
//               <p className="text-green-700">{success}</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Package Title</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter package title"
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Destination</label>
//               <input
//                 type="text"
//                 value={formData.destination}
//                 onChange={(e) => {
//                   setFormData(prev => ({ ...prev, destination: e.target.value }));
//                   handlePlaceSearch(e.target.value);
//                 }}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Search for a destination"
//               />
//               {suggestions.places.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.places.map((place) => (
//                     <li
//                       key={place.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => handlePlaceSelection(place)}
//                     >
//                       {place.description}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Hotel</label>
//               <input
//                 type="text"
//                 value={formData.hotel}
//                 onChange={(e) => {
//                   setFormData(prev => ({ ...prev, hotel: e.target.value }));
//                   handleHotelSearch(e.target.value);
//                 }}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder={selectedPlaceRef.current ? "Search for hotels..." : "Select a destination first"}
//                 disabled={!selectedPlaceRef.current}
//               />
//               {suggestions.hotels.length > 0 && (
//                 <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
//                   {suggestions.hotels.map((hotel) => (
//                     <li
//                       key={hotel.place_id}
//                       className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, hotel: hotel.name }));
//                         setSuggestions(prev => ({ ...prev, hotels: [] }));
//                       }}
//                     >
//                       <div className="font-medium">{hotel.name}</div>
//                       <div className="text-sm text-gray-500">{hotel.formatted_address}</div>
//                       {hotel.rating && (
//                         <div className="text-sm text-yellow-500">
//                           Rating: {hotel.rating} ⭐
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Price</label>
//               <div className="mt-1 relative rounded-xl shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <span className="text-gray-500">$</span>
//                 </div>
//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
//                   className="block w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
//               <input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
//                 className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Number of days"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//               rows={4}
//               className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               placeholder="Describe the package..."
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <label className="block text-sm font-medium text-gray-700">Itinerary</label>
//               <button
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               >
//                 + Add Day
//               </button>
//             </div>

//             <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
//               {formData.itinerary.map((day, index) => (
//                 <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
//                   <div className="w-20">
//                     <label className="block text-xs text-gray-500">Day</label>
//                     <input
//                       type="number"
//                       value={day.day}
//                       disabled
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-xs text-gray-500">Activity</label>
//                     <input
//                       type="text"
//                       value={day.activity}
//                       onChange={(e) => {
//                         const newItinerary = [...formData.itinerary];
//                         newItinerary[index].activity = e.target.value;
//                         setFormData(prev => ({ ...prev, itinerary: newItinerary }));
//                       }}
//                       className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Describe the activity for this day"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="pt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                 loading ? 'opacity-75 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Creating Package...' : 'Create Package'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TravelPackageForm;