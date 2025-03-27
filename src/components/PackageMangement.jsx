// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Constants for API endpoints
// const API_BASE_URL = 'http://localhost:5000/api/features'; // Adjust based on your backend configuration

// const PackageManagement = () => {
//   // State management for packages and features
//   const [packages, setPackages] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     features: [],
//     itinerary: [],
//     totalSpots: 0,
//     spotsLeft: 0,
//     bookingDeadline: null
//   });
//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     content: []
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);

//   // Fetch packages and features on component mount
//   useEffect(() => {
//     fetchPackages();
//     fetchFeatures();
//   }, []);

//   // Fetch Packages
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages);
//     } catch (err) {
//       setError('Failed to fetch packages');
//       console.error(err);
//     }
//   };

//   // Fetch Features
//   const fetchFeatures = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/features`);
//       setFeatures(response.data);
//     } catch (err) {
//       setError('Failed to fetch features');
//       console.error(err);
//     }
//   };

//   // Create Package
//   const createPackage = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/packages`, currentPackage);
//       setPackages([...packages, response.data]);
//       resetForm();
//     } catch (err) {
//       setError('Failed to create package');
//       console.error(err);
//     }
//   };

//   // Create Feature
//   const createFeature = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/features`, currentFeature);
//       setFeatures([...features, response.data]);
//       resetForm();
//     } catch (err) {
//       setError('Failed to create feature');
//       console.error(err);
//     }
//   };

//   // Update Package
//   const updatePackage = async (id) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/packages/${id}`, currentPackage);
//       setPackages(packages.map(pkg => pkg._id === id ? response.data : pkg));
//       resetForm();
//     } catch (err) {
//       setError('Failed to update package');
//       console.error(err);
//     }
//   };

//   // Update Feature
//   const updateFeature = async (id) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/features/${id}`, currentFeature);
//       setFeatures(features.map(feature => feature._id === id ? response.data : feature));
//       resetForm();
//     } catch (err) {
//       setError('Failed to update feature');
//       console.error(err);
//     }
//   };

//   // Delete Package
//   const deletePackage = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/packages/${id}`);
//       setPackages(packages.filter(pkg => pkg._id !== id));
//     } catch (err) {
//       setError('Failed to delete package');
//       console.error(err);
//     }
//   };

//   // Delete Feature
//   const deleteFeature = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/features/${id}`);
//       setFeatures(features.filter(feature => feature._id !== id));
//     } catch (err) {
//       setError('Failed to delete feature');
//       console.error(err);
//     }
//   };

//   // Reset form to initial state
//   const resetForm = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       features: [],
//       itinerary: [],
//       totalSpots: 0,
//       spotsLeft: 0,
//       bookingDeadline: null
//     });
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       content: []
//     });
//     setIsEditing(false);
//   };

//   // Edit Package
//   const editPackage = (pkg) => {
//     setCurrentPackage(pkg);
//     setIsEditing(true);
//     setActiveTab('packages');
//   };

//   // Edit Feature
//   const editFeature = (feature) => {
//     setCurrentFeature(feature);
//     setIsEditing(true);
//     setActiveTab('features');
//   };

//   // Render Package Form
//   const renderPackageForm = () => (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="text-xl mb-4">{isEditing ? 'Edit Package' : 'Create Package'}</h2>
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         isEditing ? updatePackage(currentPackage._id) : createPackage();
//       }}>
//         <input
//           type="text"
//           placeholder="Package Name"
//           value={currentPackage.name}
//           onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//           required
//         />
//         <select
//           value={currentPackage.category}
//           onChange={(e) => setCurrentPackage({...currentPackage, category: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Last Minute Deals">Last Minute Deals</option>
//           <option value="Guided Tours">Guided Tours</option>
//           <option value="Group Discounts">Group Discounts</option>
//           <option value="Seasonal Specials">Seasonal Specials</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Total Spots"
//           value={currentPackage.totalSpots}
//           onChange={(e) => setCurrentPackage({...currentPackage, totalSpots: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           {isEditing ? 'Update Package' : 'Create Package'}
//         </button>
//       </form>
//     </div>
//   );

//   // Render Feature Form
//   const renderFeatureForm = () => (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="text-xl mb-4">{isEditing ? 'Edit Feature' : 'Create Feature'}</h2>
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         isEditing ? updateFeature(currentFeature._id) : createFeature();
//       }}>
//         <input
//           type="text"
//           placeholder="Feature Title"
//           value={currentFeature.title}
//           onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Feature Subtitle"
//           value={currentFeature.subtitle}
//           onChange={(e) => setCurrentFeature({...currentFeature, subtitle: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Icon"
//           value={currentFeature.icon}
//           onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <button 
//           type="submit" 
//           className="w-full bg-green-500 text-white p-2 rounded"
//         >
//           {isEditing ? 'Update Feature' : 'Create Feature'}
//         </button>
//       </form>
//     </div>
//   );

//   // Render Packages List
//   const renderPackagesList = () => (
//     <div className="grid gap-4">
//       {packages.map(pkg => (
//         <div key={pkg._id} className="border p-4 rounded flex justify-between items-center">
//           <div>
//             <h3 className="font-bold">{pkg.name}</h3>
//             <p>{pkg.category}</p>
//             <p>Total Spots: {pkg.totalSpots}</p>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => editPackage(pkg)}
//               className="bg-yellow-500 text-white p-2 rounded"
//             >
//               Edit
//             </button>
//             <button 
//               onClick={() => deletePackage(pkg._id)}
//               className="bg-red-500 text-white p-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   // Render Features List
//   const renderFeaturesList = () => (
//     <div className="grid gap-4">
//       {features.map(feature => (
//         <div key={feature._id} className="border p-4 rounded flex justify-between items-center">
//           <div>
//             <h3 className="font-bold">{feature.title}</h3>
//             <p>{feature.subtitle}</p>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => editFeature(feature)}
//               className="bg-yellow-500 text-white p-2 rounded"
//             >
//               Edit
//             </button>
//             <button 
//               onClick={() => deleteFeature(feature._id)}
//               className="bg-red-500 text-white p-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex mb-4">
//         <button 
//           onClick={() => setActiveTab('packages')}
//           className={`mr-2 p-2 rounded ${activeTab === 'packages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Packages
//         </button>
//         <button 
//           onClick={() => setActiveTab('features')}
//           className={`p-2 rounded ${activeTab === 'features' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//         >
//           Features
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           {activeTab === 'packages' ? renderPackagesList() : renderFeaturesList()}
//         </div>
//         <div>
//           {activeTab === 'packages' ? renderPackageForm() : renderFeatureForm()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const PackageManagement = () => {
//   // Updated state to match the more comprehensive schema
//   const [packages, setPackages] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     features: [],
//     itinerary: [],
//     totalSpots: null,
//     spotsLeft: null,
//     bookingDeadline: null,
//     bestSeason: '',
//     recommendedFor: []
//   });

//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: '',
//     iconBgClass: '',
//     hoverClass: '',
//     content: []
//   });

//   const [currentPackageContent, setCurrentPackageContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: '',
//     popular: false
//   });

//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState('details');

//   // Fetch data (keeping previous implementation)
//   useEffect(() => {
//     fetchPackages();
//     fetchFeatures();
//   }, []);

//   // CRUD Methods (similar to previous implementation, but updated to match new schema)
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages);
//     } catch (err) {
//       setError('Failed to fetch packages');
//       console.error(err);
//     }
//   };

//   const fetchFeatures = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/features`);
//       setFeatures(response.data);
//     } catch (err) {
//       setError('Failed to fetch features');
//       console.error(err);
//     }
//   };

//   // Comprehensive Package Creation/Update
//   const createOrUpdatePackage = async () => {
//     try {
//       const packageData = {
//         ...currentPackage,
//         features: currentPackage.features.map(feature => ({
//           ...feature,
//           content: [currentPackageContent] // Adding package content to feature
//         })),
//         itinerary: currentPackage.itinerary.length ? currentPackage.itinerary : [currentItineraryDay]
//       };

//       const method = isEditing ? 'put' : 'post';
//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const response = await axios[method](url, packageData);
      
//       // Update packages state
//       setPackages(prevPackages => 
//         isEditing
//           ? prevPackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//           : [...prevPackages, response.data]
//       );

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       setError('Failed to save package');
//       console.error(err);
//     }
//   };

//   // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       features: [],
//       itinerary: [],
//       totalSpots: null,
//       spotsLeft: null,
//       bookingDeadline: null,
//       bestSeason: '',
//       recommendedFor: []
//     });

//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });

//     setCurrentPackageContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: '',
//       popular: false
//     });

//     setCurrentItineraryDay({
//       day: 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });

//     setIsEditing(false);
//   };

//   // Render Package Details Form
//   const renderPackageDetailsForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package ID"
//         value={currentPackage.packageId}
//         onChange={(e) => setCurrentPackage({...currentPackage, packageId: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Package Name"
//         value={currentPackage.name}
//         onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
//         className="w-full p-2 border rounded"
//         required
//       />
//       <select
//         value={currentPackage.category}
//         onChange={(e) => setCurrentPackage({...currentPackage, category: e.target.value})}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select Category</option>
//         <option value="Last Minute Deals">Last Minute Deals</option>
//         <option value="Guided Tours">Guided Tours</option>
//         <option value="Group Discounts">Group Discounts</option>
//         <option value="Seasonal Specials">Seasonal Specials</option>
//       </select>
//       <select
//         value={currentPackage.difficulty}
//         onChange={(e) => setCurrentPackage({...currentPackage, difficulty: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="Easy">Easy</option>
//         <option value="Moderate">Moderate</option>
//         <option value="Challenging">Challenging</option>
//       </select>
//       <input
//         type="number"
//         placeholder="Total Spots"
//         value={currentPackage.totalSpots || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, totalSpots: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="date"
//         placeholder="Booking Deadline"
//         value={currentPackage.bookingDeadline || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, bookingDeadline: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );

//   // Render Package Content Form
//   const renderPackageContentForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package Content Name"
//         value={currentPackageContent.name}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, name: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={currentPackageContent.description}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, description: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Original Price"
//         value={currentPackageContent.originalPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, originalPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Discounted Price"
//         value={currentPackageContent.discountedPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, discountedPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );

//   // Render Itinerary Form
//   const renderItineraryForm = () => (
//     <div className="space-y-4">
//       <input
//         type="number"
//         placeholder="Day Number"
//         value={currentItineraryDay.day}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, day: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Day Title"
//         value={currentItineraryDay.title}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         placeholder="Day Description"
//         value={currentItineraryDay.description}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, description: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );

//   // Main Render Method
//   return (
//     <div className="container mx-auto p-4">
//       {/* Tabs and Sub-Tabs */}
//       <div className="flex mb-4">
//         <button 
//           onClick={() => setActiveTab('packages')}
//           className={`mr-2 p-2 rounded ${activeTab === 'packages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Packages
//         </button>
//         <button 
//           onClick={() => setActiveTab('features')}
//           className={`p-2 rounded ${activeTab === 'features' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//         >
//           Features
//         </button>
//       </div>

//       {activeTab === 'packages' && (
//         <div className="flex mb-4">
//           <button 
//             onClick={() => setActiveSubTab('details')}
//             className={`mr-2 p-2 rounded ${activeSubTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package Details
//           </button>
//           <button 
//             onClick={() => setActiveSubTab('content')}
//             className={`mr-2 p-2 rounded ${activeSubTab === 'content' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package Content
//           </button>
//           <button 
//             onClick={() => setActiveSubTab('itinerary')}
//             className={`p-2 rounded ${activeSubTab === 'itinerary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Itinerary
//           </button>
//         </div>
//       )}

//       {/* Form Rendering Based on Active Sub-Tab */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           {activeTab === 'packages' && activeSubTab === 'details' && renderPackageDetailsForm()}
//           {activeTab === 'packages' && activeSubTab === 'content' && renderPackageContentForm()}
//           {activeTab === 'packages' && activeSubTab === 'itinerary' && renderItineraryForm()}
//         </div>
//         <div>
//           <button 
//             onClick={createOrUpdatePackage}
//             className="w-full bg-green-500 text-white p-2 rounded mb-4"
//           >
//             {isEditing ? 'Update Package' : 'Create Package'}
//           </button>
//           {/* Package List would go here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const PackageManagement = () => {
//   const [packages, setPackages] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     features: [],
//     itinerary: [],
//     totalSpots: null,
//     spotsLeft: null,
//     bookingDeadline: null,
//     bestSeason: '',
//     recommendedFor: []
//   });

//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: '',
//     iconBgClass: '',
//     hoverClass: '',
//     content: []
//   });

//   const [currentPackageContent, setCurrentPackageContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: '',
//     popular: false
//   });

//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState('details');

//   // Fetch data 
//   useEffect(() => {
//     fetchPackages();
//     fetchFeatures();
//   }, []);

//   // Fetch Packages
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages);
//     } catch (err) {
//       setError('Failed to fetch packages');
//       console.error(err);
//     }
//   };

//   // Fetch Features
//   const fetchFeatures = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/features`);
//       setFeatures(response.data);
//     } catch (err) {
//       setError('Failed to fetch features');
//       console.error(err);
//     }
//   };

//   // Add Feature to Package
//   const addFeatureToPackage = () => {
//     if (currentFeature.id && currentFeature.title) {
//       const newFeature = {
//         ...currentFeature,
//         content: [currentPackageContent]
//       };

//       setCurrentPackage(prev => ({
//         ...prev,
//         features: [...prev.features, newFeature]
//       }));

//       // Reset feature and package content forms
//       setCurrentFeature({
//         id: '',
//         title: '',
//         subtitle: '',
//         icon: '',
//         bgClass: '',
//         iconBgClass: '',
//         hoverClass: '',
//         content: []
//       });

//       setCurrentPackageContent({
//         name: '',
//         slug: '',
//         description: '',
//         originalPrice: '',
//         discountedPrice: '',
//         duration: '',
//         validDates: '',
//         includes: [],
//         excludes: [],
//         discount: '',
//         remaining: '',
//         accommodation: '',
//         rating: '',
//         timeSlots: [],
//         meetingPoint: '',
//         season: '',
//         status: '',
//         popular: false
//       });
//     } else {
//       alert('Please fill in feature details');
//     }
//   };

//   // Add Itinerary Day
//   const addItineraryDay = () => {
//     if (currentItineraryDay.title && currentItineraryDay.description) {
//       setCurrentPackage(prev => ({
//         ...prev,
//         itinerary: [...prev.itinerary, currentItineraryDay]
//       }));

//       // Reset itinerary day form
//       setCurrentItineraryDay({
//         day: currentItineraryDay.day + 1,
//         title: '',
//         description: '',
//         activities: [],
//         meals: {
//           breakfast: '',
//           lunch: '',
//           dinner: ''
//         },
//         accommodation: ''
//       });
//     } else {
//       alert('Please fill in day title and description');
//     }
//   };

//   // Comprehensive Package Creation/Update
//   const createOrUpdatePackage = async () => {
//     try {
//       const packageData = { ...currentPackage };

//       const method = isEditing ? 'put' : 'post';
//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const response = await axios[method](url, packageData);
      
//       // Update packages state
//     //   setPackages(prevPackages => 
//     //     isEditing
//     //       ? prevPackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//     //       : [...prevPackages, response.data]
//     //   );
//     setPackages(prevPackages => {
//         prevPackages = Array.isArray(prevPackages) ? prevPackages : [];
      
//         return isEditing
//           ? prevPackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//           : [...prevPackages, response.data];
//       });
      

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       setError('Failed to save package');
//       console.error(err);
//     }
//   };

//   // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       features: [],
//       itinerary: [],
//       totalSpots: null,
//       spotsLeft: null,
//       bookingDeadline: null,
//       bestSeason: '',
//       recommendedFor: []
//     });

//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });

//     setCurrentPackageContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: '',
//       popular: false
//     });

//     setCurrentItineraryDay({
//       day: 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });

//     setIsEditing(false);
//   };

//   // Render Package Details Form
//   const renderPackageDetailsForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package ID"
//         value={currentPackage.packageId}
//         onChange={(e) => setCurrentPackage({...currentPackage, packageId: e.target.value})}
//         className="w-full p-2 border rounded"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Package Name"
//         value={currentPackage.name}
//         onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
//         className="w-full p-2 border rounded"
//         required
//       />
//       <select
//         value={currentPackage.category}
//         onChange={(e) => setCurrentPackage({...currentPackage, category: e.target.value})}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select Category</option>
//         <option value="Last Minute Deals">Last Minute Deals</option>
//         <option value="Guided Tours">Guided Tours</option>
//         <option value="Group Discounts">Group Discounts</option>
//         <option value="Seasonal Specials">Seasonal Specials</option>
//       </select>
//       <select
//         value={currentPackage.difficulty}
//         onChange={(e) => setCurrentPackage({...currentPackage, difficulty: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="Easy">Easy</option>
//         <option value="Moderate">Moderate</option>
//         <option value="Challenging">Challenging</option>
//       </select>
//       <input
//         type="number"
//         placeholder="Total Spots"
//         value={currentPackage.totalSpots || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, totalSpots: parseInt(e.target.value)})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="date"
//         placeholder="Booking Deadline"
//         value={currentPackage.bookingDeadline || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, bookingDeadline: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Best Season"
//         value={currentPackage.bestSeason}
//         onChange={(e) => setCurrentPackage({...currentPackage, bestSeason: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <div>
//         <label className="block mb-2">Recommended For</label>
//         <input
//           type="text"
//           placeholder="Add Recommended Group"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && e.target.value.trim()) {
//               setCurrentPackage(prev => ({
//                 ...prev,
//                 recommendedFor: [...prev.recommendedFor, e.target.value.trim()]
//               }));
//               e.target.value = '';
//             }
//           }}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <div className="flex flex-wrap gap-2">
//           {currentPackage.recommendedFor.map((group, index) => (
//             <span 
//               key={index} 
//               className="bg-blue-100 px-2 py-1 rounded flex items-center"
//             >
//               {group}
//               <button 
//                 onClick={() => setCurrentPackage(prev => ({
//                   ...prev,
//                   recommendedFor: prev.recommendedFor.filter((_, i) => i !== index)
//                 }))}
//                 className="ml-2 text-red-500"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Render Feature Form
//   const renderFeatureForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Feature ID"
//         value={currentFeature.id}
//         onChange={(e) => setCurrentFeature({...currentFeature, id: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Title"
//         value={currentFeature.title}
//         onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Subtitle"
//         value={currentFeature.subtitle}
//         onChange={(e) => setCurrentFeature({...currentFeature, subtitle: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Icon"
//         value={currentFeature.icon}
//         onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <button 
//         onClick={addFeatureToPackage}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Add Feature
//       </button>
//     </div>
//   );

//   // Render Package Content Form
//   const renderPackageContentForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package Content Name"
//         value={currentPackageContent.name}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, name: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={currentPackageContent.description}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, description: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Original Price"
//         value={currentPackageContent.originalPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, originalPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Discounted Price"
//         value={currentPackageContent.discountedPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, discountedPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Duration"
//         value={currentPackageContent.duration}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, duration: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Valid Dates"
//         value={currentPackageContent.validDates}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, validDates: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );

//   // Render Itinerary Form
//   const renderItineraryForm = () => (
//     <div className="space-y-4">
//       <input
//         type="number"
//         placeholder="Day Number"
//         value={currentItineraryDay.day}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, day: parseInt(e.target.value)})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Day Title"
//         value={currentItineraryDay.title}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         placeholder="Day Description"
//         value={currentItineraryDay.description}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, description: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <div>
//         <label className="block mb-2">Activities</label>
//         <input
//           type="text"
//           placeholder="Add Activity"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && e.target.value.trim()) {
//               setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 activities: [...prev.activities, e.target.value.trim()]
//               }));
//               e.target.value = '';
//             }
//           }}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <div className="flex flex-wrap gap-2">
//           {currentItineraryDay.activities.map((activity, index) => (
//             <span 
//               key={index} 
//               className="bg-blue-100 px-2 py-1 rounded flex items-center"
//             >
//               {activity}
//               <button 
//                 onClick={() => setCurrentItineraryDay(prev => ({
//                   ...prev,
//                   activities: prev.activities.filter((_, i) => i !== index)
//                 }))}
//                 className="ml-2 text-red-500"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-2">
//         <input
//           type="text"
//           placeholder="Breakfast"
//           value={currentItineraryDay.meals.breakfast}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, breakfast: e.target.value}
//           }))}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Lunch"
//           value={currentItineraryDay.meals.lunch}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, lunch: e.target.value}
//           }))}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Dinner"
//           value={currentItineraryDay.meals.dinner}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, dinner: e.target.value}
//           }))}
//           className="p-2 border rounded"
//         />
//       </div>
//       <input
//         type="text"
//         placeholder="Accommodation"
//         value={currentItineraryDay.accommodation}
//         onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, accommodation: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <button 
//         onClick={addItineraryDay}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Add Itinerary Day
//       </button>
//     </div>
//   );

//   // Main Render Method
//   return (
//     <div className="container mx-auto p-4">
//       {/* Tabs and Sub-Tabs */}
//       <div className="flex mb-4">
//         <button 
//           onClick={() => setActiveTab('packages')}
//           className={`mr-2 p-2 rounded ${activeTab === 'packages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Packages
//         </button>
//         <button 
//           onClick={() => setActiveTab('features')}
//           className={`p-2 rounded ${activeTab === 'features' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//         >
//           Features
//         </button>
//       </div>

//       {activeTab === 'packages' && (
//         <div className="flex mb-4">
//           <button 
//             onClick={() => setActiveSubTab('details')}
//             className={`mr-2 p-2 rounded ${activeSubTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package Details
//           </button>
//           <button 
//             onClick={() => setActiveSubTab('feature')}
//             className={`mr-2 p-2 rounded ${activeSubTab === 'feature' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Features
//           </button>
//           <button 
//             onClick={() => setActiveSubTab('content')}
//             className={`mr-2 p-2 rounded ${activeSubTab === 'content' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package Content
//           </button>
//           <button 
//             onClick={() => setActiveSubTab('itinerary')}
//             className={`p-2 rounded ${activeSubTab === 'itinerary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Itinerary
//           </button>
//         </div>
//       )}

//       {/* Form Rendering Based on Active Sub-Tab */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           {activeTab === 'packages' && activeSubTab === 'details' && renderPackageDetailsForm()}
//           {activeTab === 'packages' && activeSubTab === 'feature' && renderFeatureForm()}
//           {activeTab === 'packages' && activeSubTab === 'content' && renderPackageContentForm()}
//           {activeTab === 'packages' && activeSubTab === 'itinerary' && renderItineraryForm()}
//         </div>
//         <div>
//           <div className="mb-4">
//             <h3 className="text-lg font-bold mb-2">Current Package Features</h3>
//             {currentPackage.features.map((feature, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                 <p><strong>Title:</strong> {feature.title}</p>
//                 <p><strong>Subtitle:</strong> {feature.subtitle}</p>
//                 <button 
//                   onClick={() => {
//                     setCurrentPackage(prev => ({
//                       ...prev,
//                       features: prev.features.filter((_, i) => i !== index)
//                     }));
//                   }}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-bold mb-2">Current Itinerary</h3>
//             {currentPackage.itinerary.map((day, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                 <p><strong>Day {day.day}:</strong> {day.title}</p>
//                 <p>{day.description}</p>
//                 <button 
//                   onClick={() => {
//                     setCurrentPackage(prev => ({
//                       ...prev,
//                       itinerary: prev.itinerary.filter((_, i) => i !== index)
//                     }));
//                   }}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button 
//             onClick={createOrUpdatePackage}
//             className="w-full bg-green-500 text-white p-2 rounded mb-4"
//           >
//             {isEditing ? 'Update Package' : 'Create Package'}
//           </button>
//           {/* Error handling */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as LucideIcons from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const PackageManagement = () => {
//   // State for packages and features
//   const [packages, setPackages] = useState([]);
//   const [features, setFeatures] = useState([]);

//   // Current package state with more comprehensive initialization
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     features: [],
//     itinerary: [],
//     totalSpots: null,
//     spotsLeft: null,
//     bookingDeadline: null,
//     bestSeason: '',
//     recommendedFor: []
//   });

//   // Current feature state with more comprehensive initialization
//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: '',
//     iconBgClass: '',
//     hoverClass: '',
//     content: []
//   });

//   // Current package content state with more comprehensive initialization
//   const [currentPackageContent, setCurrentPackageContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: '',
//     popular: false
//   });

//   // Current itinerary day state with more comprehensive initialization
//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   // UI and form states
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState('details');

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // Fetch Packages
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages || []);
//     } catch (err) {
//       setError('Failed to fetch packages');
//       console.error(err);
//     }
//   };

//   // Add Feature to Package with more robust handling
//   const addFeatureToPackage = () => {
//     if (currentFeature.id && currentFeature.title) {
//       const newFeature = {
//         ...currentFeature,
//         content: [currentPackageContent]
//       };

//       setCurrentPackage(prev => ({
//         ...prev,
//         features: [...(prev.features || []), newFeature]
//       }));

//       // Reset feature and package content forms
//       resetFeatureAndContentForms();
//     } else {
//       alert('Please fill in feature details');
//     }
//   };

//   // Add Itinerary Day with more robust handling
//   const addItineraryDay = () => {
//     if (currentItineraryDay.title && currentItineraryDay.description) {
//       setCurrentPackage(prev => ({
//         ...prev,
//         itinerary: [...(prev.itinerary || []), currentItineraryDay]
//       }));

//       // Reset itinerary day form
//       resetItineraryDayForm();
//     } else {
//       alert('Please fill in day title and description');
//     }
//   };

//   // Reset feature and package content forms
//   const resetFeatureAndContentForms = () => {
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });

//     setCurrentPackageContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: '',
//       popular: false
//     });
//   };

//   // Reset itinerary day form
//   const resetItineraryDayForm = () => {
//     setCurrentItineraryDay({
//       day: currentItineraryDay.day + 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//   };

//   // Comprehensive Package Creation/Update
//   const createOrUpdatePackage = async () => {
//     try {
//       const packageData = { 
//         ...currentPackage,
//         features: currentPackage.features || [],
//         itinerary: currentPackage.itinerary || []
//       };

//       const method = isEditing ? 'put' : 'post';
//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const response = await axios[method](url, packageData);
      
//       // Update packages state with robust handling
//       setPackages(prevPackages => {
//         const safePackages = Array.isArray(prevPackages) ? prevPackages : [];
//         return isEditing
//           ? safePackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//           : [...safePackages, response.data];
//       });

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       setError('Failed to save package');
//       console.error(err);
//     }
//   };

//   // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       features: [],
//       itinerary: [],
//       totalSpots: null,
//       spotsLeft: null,
//       bookingDeadline: null,
//       bestSeason: '',
//       recommendedFor: []
//     });

//     resetFeatureAndContentForms();
//     resetItineraryDayForm();
//     setIsEditing(false);
//   };

//   // Render Feature Icon Dropdown
//   const renderFeatureIconDropdown = () => {
//     const iconNames = Object.keys(LucideIcons)
//       .filter(name => name !== 'default' && name !== 'Icon');

//     return (
//       <select
//         value={currentFeature.icon}
//         onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Icon</option>
//         {iconNames.map(iconName => (
//           <option key={iconName} value={iconName}>
//             {iconName}
//           </option>
//         ))}
//       </select>
//     );
//   };

//   // Render Feature Form with Icon Dropdown
//   const renderFeatureForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Feature ID"
//         value={currentFeature.id}
//         onChange={(e) => setCurrentFeature({...currentFeature, id: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Title"
//         value={currentFeature.title}
//         onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Subtitle"
//         value={currentFeature.subtitle}
//         onChange={(e) => setCurrentFeature({...currentFeature, subtitle: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       {renderFeatureIconDropdown()}
//       <button 
//         onClick={addFeatureToPackage}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Add Feature
//       </button>
//     </div>
//   );

 
//   const renderPackageContentForm = () => (
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Package Content Name"
//             value={currentPackageContent.name}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, name: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Description"
//             value={currentPackageContent.description}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, description: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Original Price"
//             value={currentPackageContent.originalPrice}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, originalPrice: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Discounted Price"
//             value={currentPackageContent.discountedPrice}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, discountedPrice: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Duration"
//             value={currentPackageContent.duration}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, duration: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Valid Dates"
//             value={currentPackageContent.validDates}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, validDates: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       );
    
//       // Render Itinerary Form
//       const renderItineraryForm = () => (
//         <div className="space-y-4">
//           <input
//             type="number"
//             placeholder="Day Number"
//             value={currentItineraryDay.day}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, day: parseInt(e.target.value)})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Day Title"
//             value={currentItineraryDay.title}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, title: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Day Description"
//             value={currentItineraryDay.description}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, description: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <div>
//             <label className="block mb-2">Activities</label>
//             <input
//               type="text"
//               placeholder="Add Activity"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && e.target.value.trim()) {
//                   setCurrentItineraryDay(prev => ({
//                     ...prev,
//                     activities: [...prev.activities, e.target.value.trim()]
//                   }));
//                   e.target.value = '';
//                 }
//               }}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <div className="flex flex-wrap gap-2">
//               {currentItineraryDay.activities.map((activity, index) => (
//                 <span 
//                   key={index} 
//                   className="bg-blue-100 px-2 py-1 rounded flex items-center"
//                 >
//                   {activity}
//                   <button 
//                     onClick={() => setCurrentItineraryDay(prev => ({
//                       ...prev,
//                       activities: prev.activities.filter((_, i) => i !== index)
//                     }))}
//                     className="ml-2 text-red-500"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-2">
//             <input
//               type="text"
//               placeholder="Breakfast"
//               value={currentItineraryDay.meals.breakfast}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, breakfast: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Lunch"
//               value={currentItineraryDay.meals.lunch}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, lunch: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Dinner"
//               value={currentItineraryDay.meals.dinner}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, dinner: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//           </div>
//           <input
//             type="text"
//             placeholder="Accommodation"
//             value={currentItineraryDay.accommodation}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, accommodation: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <button 
//             onClick={addItineraryDay}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Add Itinerary Day
//           </button>
//         </div>
//       );
    
//   return (
//     <div className="container mx-auto p-4">
//       {/* Existing tabs and rendering logic remains the same */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           {activeTab === 'packages' && activeSubTab === 'details' && (
//             <div className="space-y-4">
          
//               {renderPackageDetailsForm()}
//             </div>
//           )}
//           {activeTab === 'packages' && activeSubTab === 'feature' && renderFeatureForm()}
//           {activeTab === 'packages' && activeSubTab === 'content' && renderPackageContentForm()}
//           {activeTab === 'packages' && activeSubTab === 'itinerary' && renderItineraryForm()}
//         </div>
//         <div>
//           {/* Existing package features and itinerary display */}
//           <div className="mb-4">
//             <h3 className="text-lg font-bold mb-2">Current Package Features</h3>
//             {(currentPackage.features || []).map((feature, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                 <p><strong>Title:</strong> {feature.title}</p>
//                 <p><strong>Subtitle:</strong> {feature.subtitle}</p>
//                 <button 
//                   onClick={() => {
//                     setCurrentPackage(prev => ({
//                       ...prev,
//                       features: (prev.features || []).filter((_, i) => i !== index)
//                     }));
//                   }}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-bold mb-2">Current Itinerary</h3>
//             {(currentPackage.itinerary || []).map((day, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                 <p><strong>Day {day.day}:</strong> {day.title}</p>
//                 <p>{day.description}</p>
//                 <button 
//                   onClick={() => {
//                     setCurrentPackage(prev => ({
//                       ...prev,
//                       itinerary: (prev.itinerary || []).filter((_, i) => i !== index)
//                     }));
//                   }}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button 
//             onClick={createOrUpdatePackage}
//             className="w-full bg-green-500 text-white p-2 rounded mb-4"
//           >
//             {isEditing ? 'Update Package' : 'Create Package'}
//           </button>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as LucideIcons from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const PackageManagement = () => {
//   // State for packages and features
//   const [packages, setPackages] = useState([]);
//   const [features, setFeatures] = useState([]);

//   // Current package state with more comprehensive initialization
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     features: [],
//     itinerary: [],
//     totalSpots: null,
//     spotsLeft: null,
//     bookingDeadline: null,
//     bestSeason: '',
//     recommendedFor: []
//   });

//   // Previous states (features, package content, itinerary day) remain the same

//   // UI and form states
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState('details');

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchPackages();
//   }, []);
// // Current feature state with more comprehensive initialization
//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: '',
//     iconBgClass: '',
//     hoverClass: '',
//     content: []
//   });

// //   // Current package content state with more comprehensive initialization
//   const [currentPackageContent, setCurrentPackageContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: '',
//     popular: false
//   });

// //   // Current itinerary day state with more comprehensive initialization
//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

// //   // UI and form states
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [activeTab, setActiveTab] = useState('packages');
// //   const [error, setError] = useState(null);
// //   const [activeSubTab, setActiveSubTab] = useState('details');

// //   // Fetch data on component mount
//   useEffect(() => {
//     fetchPackages();
//   }, []);



//   const addFeatureToPackage = () => {
//     if (currentFeature.id && currentFeature.title) {
//       const newFeature = {
//         ...currentFeature,
//         content: [currentPackageContent]
//       };

//       setCurrentPackage(prev => ({
//         ...prev,
//         features: [...(prev.features || []), newFeature]
//       }));

//       // Reset feature and package content forms
//       resetFeatureAndContentForms();
//     } else {
//       alert('Please fill in feature details');
//     }
//   };

//   // Add Itinerary Day with more robust handling
//   const addItineraryDay = () => {
//     if (currentItineraryDay.title && currentItineraryDay.description) {
//       setCurrentPackage(prev => ({
//         ...prev,
//         itinerary: [...(prev.itinerary || []), currentItineraryDay]
//       }));

//       // Reset itinerary day form
//       resetItineraryDayForm();
//     } else {
//       alert('Please fill in day title and description');
//     }
//   };

//   // Reset feature and package content forms
//   const resetFeatureAndContentForms = () => {
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });

//     setCurrentPackageContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: '',
//       popular: false
//     });
//   };

// //   // Reset itinerary day form
//   const resetItineraryDayForm = () => {
//     setCurrentItineraryDay({
//       day: currentItineraryDay.day + 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//   };

//   // Comprehensive Package Creation/Update
//   const createOrUpdatePackage = async () => {
//     try {
//       const packageData = { 
//         ...currentPackage,
//         features: currentPackage.features || [],
//         itinerary: currentPackage.itinerary || []
//       };

//       const method = isEditing ? 'put' : 'post';
//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const response = await axios[method](url, packageData);
      
//       // Update packages state with robust handling
//       setPackages(prevPackages => {
//         const safePackages = Array.isArray(prevPackages) ? prevPackages : [];
//         return isEditing
//           ? safePackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//           : [...safePackages, response.data];
//       });

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       setError('Failed to save package');
//       console.error(err);
//     }
//   };

//   // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       features: [],
//       itinerary: [],
//       totalSpots: null,
//       spotsLeft: null,
//       bookingDeadline: null,
//       bestSeason: '',
//       recommendedFor: []
//     });

//     resetFeatureAndContentForms();
//     resetItineraryDayForm();
//     setIsEditing(false);
//   };

// //   // Render Feature Icon Dropdown
//   const renderFeatureIconDropdown = () => {
//     const iconNames = Object.keys(LucideIcons)
//       .filter(name => name !== 'default' && name !== 'Icon');

//     return (
//       <select
//         value={currentFeature.icon}
//         onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Icon</option>
//         {iconNames.map(iconName => (
//           <option key={iconName} value={iconName}>
//             {iconName}
//           </option>
//         ))}
//       </select>
//     );
//   };

//   // Render Feature Form with Icon Dropdown
//   const renderFeatureForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Feature ID"
//         value={currentFeature.id}
//         onChange={(e) => setCurrentFeature({...currentFeature, id: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Title"
//         value={currentFeature.title}
//         onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Subtitle"
//         value={currentFeature.subtitle}
//         onChange={(e) => setCurrentFeature({...currentFeature, subtitle: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       {renderFeatureIconDropdown()}
//       <button 
//         onClick={addFeatureToPackage}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Add Feature
//       </button>
//     </div>
//   );

 
//   const renderPackageContentForm = () => (
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Package Content Name"
//             value={currentPackageContent.name}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, name: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Description"
//             value={currentPackageContent.description}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, description: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Original Price"
//             value={currentPackageContent.originalPrice}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, originalPrice: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Discounted Price"
//             value={currentPackageContent.discountedPrice}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, discountedPrice: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Duration"
//             value={currentPackageContent.duration}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, duration: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Valid Dates"
//             value={currentPackageContent.validDates}
//             onChange={(e) => setCurrentPackageContent({...currentPackageContent, validDates: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       );
    
//       // Render Itinerary Form
//       const renderItineraryForm = () => (
//         <div className="space-y-4">
//           <input
//             type="number"
//             placeholder="Day Number"
//             value={currentItineraryDay.day}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, day: parseInt(e.target.value)})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Day Title"
//             value={currentItineraryDay.title}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, title: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Day Description"
//             value={currentItineraryDay.description}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, description: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <div>
//             <label className="block mb-2">Activities</label>
//             <input
//               type="text"
//               placeholder="Add Activity"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && e.target.value.trim()) {
//                   setCurrentItineraryDay(prev => ({
//                     ...prev,
//                     activities: [...prev.activities, e.target.value.trim()]
//                   }));
//                   e.target.value = '';
//                 }
//               }}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <div className="flex flex-wrap gap-2">
//               {currentItineraryDay.activities.map((activity, index) => (
//                 <span 
//                   key={index} 
//                   className="bg-blue-100 px-2 py-1 rounded flex items-center"
//                 >
//                   {activity}
//                   <button 
//                     onClick={() => setCurrentItineraryDay(prev => ({
//                       ...prev,
//                       activities: prev.activities.filter((_, i) => i !== index)
//                     }))}
//                     className="ml-2 text-red-500"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-2">
//             <input
//               type="text"
//               placeholder="Breakfast"
//               value={currentItineraryDay.meals.breakfast}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, breakfast: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Lunch"
//               value={currentItineraryDay.meals.lunch}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, lunch: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Dinner"
//               value={currentItineraryDay.meals.dinner}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, dinner: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//           </div>
//           <input
//             type="text"
//             placeholder="Accommodation"
//             value={currentItineraryDay.accommodation}
//             // onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, accommodation: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <button 
//             onClick={addItineraryDay}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Add Itinerary Day
//           </button>
//         </div>
//       );
//   // Fetch Packages
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages || []);
//     } catch (err) {
//       setError('Failed to fetch packages');
//       console.error(err);
//     }
//   };

//   // Delete Package
//   const deletePackage = async (packageId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/packages/${packageId}`);
//       setPackages(prevPackages => prevPackages.filter(pkg => pkg._id !== packageId));
//     } catch (err) {
//       setError('Failed to delete package');
//       console.error(err);
//     }
//   };

//   // Edit Package
//   const editPackage = (pkg) => {
//     setCurrentPackage(pkg);
//     setIsEditing(true);
//     setActiveTab('packages');
//     setActiveSubTab('details');
//   };

//   // Render Package Details Form
//   const renderPackageDetailsForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package Name"
//         value={currentPackage.name}
//         onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <select
//         value={currentPackage.category}
//         onChange={(e) => setCurrentPackage({...currentPackage, category: e.target.value})}
//         className="w-full p-2 border rounded"
//       >


//         <option value="">Select Category</option>
//         <option value="">Last Minute Deals</option>
//         <option value="">Group Discounts</option>
//         <option value="">Group Discounts</option>
//         <option value="">Seasonal Specials</option>
//       </select>
//       <select
//         value={currentPackage.difficulty}
//         onChange={(e) => setCurrentPackage({...currentPackage, difficulty: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="Easy">Easy</option>
//         <option value="Moderate">Moderate</option>
//         <option value="Challenging">Challenging</option>
//       </select>
//       <input
//         type="number"
//         placeholder="Total Spots"
//         value={currentPackage.totalSpots || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, totalSpots: parseInt(e.target.value)})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Best Season"
//         value={currentPackage.bestSeason}
//         onChange={(e) => setCurrentPackage({...currentPackage, bestSeason: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Recommended For (comma-separated)"
//         value={currentPackage.recommendedFor.join(', ')}
//         onChange={(e) => setCurrentPackage({
//           ...currentPackage, 
//           recommendedFor: e.target.value.split(',').map(item => item.trim())
//         })}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="date"
//         placeholder="Booking Deadline"
//         value={currentPackage.bookingDeadline || ''}
//         onChange={(e) => setCurrentPackage({...currentPackage, bookingDeadline: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );

//   // Render Package List
//   const renderPackageList = () => (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
//       {packages.map((pkg) => (
//         <div 
//           key={pkg._id} 
//           className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
//         >
//           <div>
//             <h3 className="text-lg font-semibold">{pkg.name}</h3>
//             <p className="text-gray-600">{pkg.category} | {pkg.difficulty}</p>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => editPackage(pkg)}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               Edit
//             </button>
//             <button 
//               onClick={() => deletePackage(pkg._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   // Rest of the component remains the same as in the previous implementation
//   // (all previous methods like createOrUpdatePackage, addFeatureToPackage, etc.)

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4">
//         <div className="flex space-x-4 mb-4">
//           <button 
//             onClick={() => {
//               setActiveTab('packages');
//               setActiveSubTab('details');
//             }}
//             className={`px-4 py-2 rounded ${activeTab === 'packages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Create/Edit Package
//           </button>
//           <button 
//             onClick={() => {
//               setActiveTab('packageList');
//               resetForms();
//             }}
//             className={`px-4 py-2 rounded ${activeTab === 'packageList' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package List
//           </button>
//         </div>

//         {activeTab === 'packages' && (
//           <div className="flex space-x-4 mb-4">
//             <button 
//               onClick={() => setActiveSubTab('details')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'details' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Package Details
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('feature')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'feature' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Add Feature
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('content')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'content' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Package Content
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('itinerary')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'itinerary' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Itinerary
//             </button>
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 gap-4">
//           {activeTab === 'packages' && (
//             <div>
//               {activeSubTab === 'details' && renderPackageDetailsForm()}
//               {activeSubTab === 'feature' && renderFeatureForm()}
//               {activeSubTab === 'content' && renderPackageContentForm()}
//               {activeSubTab === 'itinerary' && renderItineraryForm()}
//             </div>
//           )}

//           <div>
//             {activeTab === 'packages' && (
//               <>
//                 <div className="mb-4">
//                   <h3 className="text-lg font-bold mb-2">Current Package Features</h3>
//                   {(currentPackage.features || []).map((feature, index) => (
//                     <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                       <p><strong>Title:</strong> {feature.title}</p>
//                       <p><strong>Subtitle:</strong> {feature.subtitle}</p>
//                       <button 
//                         onClick={() => {
//                           setCurrentPackage(prev => ({
//                             ...prev,
//                             features: (prev.features || []).filter((_, i) => i !== index)
//                           }));
//                         }}
//                         className="text-red-500 mt-2"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <h3 className="text-lg font-bold mb-2">Current Itinerary</h3>
//                   {(currentPackage.itinerary || []).map((day, index) => (
//                     <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                       <p><strong>Day {day.day}:</strong> {day.title}</p>
//                       <p>{day.description}</p>
//                       <button 
//                         onClick={() => {
//                           setCurrentPackage(prev => ({
//                             ...prev,
//                             itinerary: (prev.itinerary || []).filter((_, i) => i !== index)
//                           }));
//                         }}
//                         className="text-red-500 mt-2"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <button 
//                   onClick={createOrUpdatePackage}
//                   className="w-full bg-green-500 text-white p-2 rounded mb-4"
//                 >
//                   {isEditing ? 'Update Package' : 'Create Package'}
//                 </button>
//               </>
//             )}

//             {activeTab === 'packageList' && renderPackageList()}

//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                 <span className="block sm:inline">{error}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as LucideIcons from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const PackageManagement = () => {
//   // Updated initial state to match the example package structure
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     bestSeason: '',
//     recommendedFor: [],
//     totalSpots: null,
//     spotsLeft: null,
//     features: [],
//     itinerary: []
//   });

//   // Updated feature state
//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     content: []
//   });

//   // Updated package content state
//   const [currentPackageContent, setCurrentPackageContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     timeSlots: [],
//     popular: false
//   });

//   // Updated itinerary day state
//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   // Existing state for UI and other management
//   const [packages, setPackages] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('packages');
//   const [error, setError] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState('details');

//   // Fetch packages on component mount
//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // Add Feature to Package (with more robust handling)
//   const addFeatureToPackage = () => {
//     if (currentFeature.id && currentFeature.title) {
//       const newFeature = {
//         ...currentFeature,
//         content: currentPackageContent ? [currentPackageContent] : []
//       };

//       setCurrentPackage(prev => ({
//         ...prev,
//         features: [...(prev.features || []), newFeature]
//       }));

//       // Reset forms
//       resetFeatureAndContentForms();
//     } else {
//       alert('Please fill in feature details');
//     }
//   };

//   // Add Itinerary Day
//   const addItineraryDay = () => {
//     if (currentItineraryDay.title && currentItineraryDay.description) {
//       setCurrentPackage(prev => ({
//         ...prev,
//         itinerary: [...(prev.itinerary || []), currentItineraryDay]
//       }));

//       // Reset itinerary day form
//       resetItineraryDayForm();
//     } else {
//       alert('Please fill in day title and description');
//     }
//   };

//   // Reset feature and package content forms
//   const resetFeatureAndContentForms = () => {
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       content: []
//     });

//     setCurrentPackageContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       timeSlots: [],
//       popular: false
//     });
//   };

//   // Reset itinerary day form
//   const resetItineraryDayForm = () => {
//     setCurrentItineraryDay({
//       day: currentItineraryDay.day + 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//   };

//   // Create or Update Package
//   const createOrUpdatePackage = async () => {
//     try {
//       const packageData = { 
//         ...currentPackage,
//         // Ensure spots left is calculated or set
//         spotsLeft: currentPackage.spotsLeft || currentPackage.totalSpots,
//         features: currentPackage.features || [],
//         itinerary: currentPackage.itinerary || []
//       };

//       const method = isEditing ? 'put' : 'post';
//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const response = await axios[method](url, packageData);
      
//       // Update packages state
//       setPackages(prevPackages => {
//         const safePackages = Array.isArray(prevPackages) ? prevPackages : [];
//         return isEditing
//           ? safePackages.map(pkg => pkg._id === response.data._id ? response.data : pkg)
//           : [...safePackages, response.data];
//       });

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       setError('Failed to save package');
//       console.error(err);
//     }
//   };

//   // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: null,
//       spotsLeft: null,
//       features: [],
//       itinerary: []
//     });

//     resetFeatureAndContentForms();
//     resetItineraryDayForm();
//     setIsEditing(false);
//   };

//   // Render Feature Form (with fields matching the example)
//   const renderFeatureForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Feature ID"
//         value={currentFeature.id}
//         onChange={(e) => setCurrentFeature({...currentFeature, id: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Title"
//         value={currentFeature.title}
//         onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Feature Subtitle"
//         value={currentFeature.subtitle}
//         onChange={(e) => setCurrentFeature({...currentFeature, subtitle: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <select
//         value={currentFeature.icon}
//         onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Icon</option>
//         {Object.keys(LucideIcons)
//           .filter(name => name !== 'default' && name !== 'Icon')
//           .map(iconName => (
//             <option key={iconName} value={iconName}>
//               {iconName}
//             </option>
//           ))
//         }
//       </select>
//       <button 
//         onClick={addFeatureToPackage}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Add Feature
//       </button>
//     </div>
//   );



// const renderPackageDetailsForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Package ID"
//         value={currentPackage.packageId}
//         onChange={(e) =>
//           setCurrentPackage({ ...currentPackage, packageId: e.target.value })
//         }
//         className="w-full p-2 border rounded"
//       />
  
//       <input
//         type="text"
//         placeholder="Package Name"
//         value={currentPackage.name}
//         onChange={(e) =>
//           setCurrentPackage({ ...currentPackage, name: e.target.value })
//         }
//         className="w-full p-2 border rounded"
//       />
  
//       <select
//         value={currentPackage.category}
//         onChange={(e) =>
//           setCurrentPackage({ ...currentPackage, category: e.target.value })
//         }
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Category</option>
//         <option value="Last Minute Deals">Last Minute Deals</option>
//         <option value="Guided Tours">Guided Tours</option>
//         <option value="Group Discounts">Group Discounts</option>
//         <option value="Seasonal Specials">Seasonal Specials</option>
//       </select>
  
//       <select
//         value={currentPackage.difficulty}
//         onChange={(e) =>
//           setCurrentPackage({ ...currentPackage, difficulty: e.target.value })
//         }
//         className="w-full p-2 border rounded"
//       >
//         <option value="Easy">Easy</option>
//         <option value="Moderate">Moderate</option>
//         <option value="Challenging">Challenging</option>
//       </select>
  
//       <input
//         type="text"
//         placeholder="Best Season"
//         value={currentPackage.bestSeason}
//         onChange={(e) =>
//           setCurrentPackage({ ...currentPackage, bestSeason: e.target.value })
//         }
//         className="w-full p-2 border rounded"
//       />
  
    
//   <input
//   type="text"
//   placeholder="Recommended For (comma-separated)"
//   value={(currentPackage.recommendedFor || []).join(', ')}
//   onChange={(e) =>
//     setCurrentPackage({
//       ...currentPackage,
//       recommendedFor: e.target.value
//         .split(',')
//         .map((item) => item.trim()),
//     })
//   }
//   className="w-full p-2 border rounded"
// />

//       <input
//         type="number"
//         placeholder="Total Spots"
//         value={currentPackage.totalSpots || ''}
//         onChange={(e) =>
//           setCurrentPackage({
//             ...currentPackage,
//             totalSpots: parseInt(e.target.value),
//             spotsLeft: parseInt(e.target.value),
//           })
//         }
//         className="w-full p-2 border rounded"
//       />
//     </div>
//   );
   
//   // Render Package Content Form (updated to match example)
//   const renderPackageContentForm = () => (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Content Name"
//         value={currentPackageContent.name}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, name: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Slug"
//         value={currentPackageContent.slug}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, slug: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={currentPackageContent.description}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, description: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Original Price"
//         value={currentPackageContent.originalPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, originalPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Discounted Price"
//         value={currentPackageContent.discountedPrice}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, discountedPrice: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Duration"
//         value={currentPackageContent.duration}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, duration: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         placeholder="Valid Dates"
//         value={currentPackageContent.validDates}
//         onChange={(e) => setCurrentPackageContent({...currentPackageContent, validDates: e.target.value})}
//         className="w-full p-2 border rounded"
//       />
//       <div className="flex items-center">
//         <label className="mr-2">Popular:</label>
//         <input
//           type="checkbox"
//           checked={currentPackageContent.popular}
//           onChange={(e) => setCurrentPackageContent({...currentPackageContent, popular: e.target.checked})}
//           className="p-2 border rounded"
//         />
//       </div>
//     </div>
//   );

//   // Rest of the component remains similar to the previous implementation
//   // (including renderItineraryForm, fetchPackages, deletePackage, etc.)
//  // Render Itinerary Form
//       const renderItineraryForm = () => (
//         <div className="space-y-4">
//           <input
//             type="number"
//             placeholder="Day Number"
//             value={currentItineraryDay.day}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, day: parseInt(e.target.value)})}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Day Title"
//             value={currentItineraryDay.title}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, title: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Day Description"
//             value={currentItineraryDay.description}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, description: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <div>
//             <label className="block mb-2">Activities</label>
//             <input
//               type="text"
//               placeholder="Add Activity"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && e.target.value.trim()) {
//                   setCurrentItineraryDay(prev => ({
//                     ...prev,
//                     activities: [...prev.activities, e.target.value.trim()]
//                   }));
//                   e.target.value = '';
//                 }
//               }}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <div className="flex flex-wrap gap-2">
//               {currentItineraryDay.activities.map((activity, index) => (
//                 <span 
//                   key={index} 
//                   className="bg-blue-100 px-2 py-1 rounded flex items-center"
//                 >
//                   {activity}
//                   <button 
//                     onClick={() => setCurrentItineraryDay(prev => ({
//                       ...prev,
//                       activities: prev.activities.filter((_, i) => i !== index)
//                     }))}
//                     className="ml-2 text-red-500"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-2">
//             <input
//               type="text"
//               placeholder="Breakfast"
//               value={currentItineraryDay.meals.breakfast}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, breakfast: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Lunch"
//               value={currentItineraryDay.meals.lunch}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, lunch: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Dinner"
//               value={currentItineraryDay.meals.dinner}
//               onChange={(e) => setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 meals: {...prev.meals, dinner: e.target.value}
//               }))}
//               className="p-2 border rounded"
//             />
//           </div>
//           <input
//             type="text"
//             placeholder="Accommodation"
//             value={currentItineraryDay.accommodation}
//             onChange={(e) => setCurrentItineraryDay({...currentItineraryDay, accommodation: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//           <button 
//             onClick={addItineraryDay}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Add Itinerary Day
//           </button>
//         </div>
//       );
//       const fetchPackages = async () => {
//             try {
//               const response = await axios.get(`${API_BASE_URL}/packages`);
//               setPackages(response.data.packages || []);
//             } catch (err) {
//               setError('Failed to fetch packages');
//               console.error(err);
//             }
//           };
        
//           // Delete Package
//           const deletePackage = async (packageId) => {
//             try {
//               await axios.delete(`${API_BASE_URL}/packages/${packageId}`);
//               setPackages(prevPackages => prevPackages.filter(pkg => pkg._id !== packageId));
//             } catch (err) {
//               setError('Failed to delete package');
//               console.error(err);
//             }
//           };
        
//           // Edit Package
//           const editPackage = (pkg) => {
//             setCurrentPackage(pkg);
//             setIsEditing(true);
//             setActiveTab('packages');
//             setActiveSubTab('details');
//           };
        
//           // Render Package Details Form
//         //   const renderPackageDetailsForm = () => (
//         //     <div className="space-y-4">
//         //       <input
//         //         type="text"
//         //         placeholder="Package Name"
//         //         value={currentPackage.name}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
//         //         className="w-full p-2 border rounded"
//         //       />
//         //       <select
//         //         value={currentPackage.category}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, category: e.target.value})}
//         //         className="w-full p-2 border rounded"
//         //       >
        
        
//         //         <option value="">Select Category</option>
//         //         <option value="">Last Minute Deals</option>
//         //         <option value="">Group Discounts</option>
//         //         <option value="">Group Discounts</option>
//         //         <option value="">Seasonal Specials</option>
//         //       </select>
//         //       <select
//         //         value={currentPackage.difficulty}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, difficulty: e.target.value})}
//         //         className="w-full p-2 border rounded"
//         //       >
//         //         <option value="Easy">Easy</option>
//         //         <option value="Moderate">Moderate</option>
//         //         <option value="Challenging">Challenging</option>
//         //       </select>
//         //       <input
//         //         type="number"
//         //         placeholder="Total Spots"
//         //         value={currentPackage.totalSpots || ''}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, totalSpots: parseInt(e.target.value)})}
//         //         className="w-full p-2 border rounded"
//         //       />
//         //       <input
//         //         type="text"
//         //         placeholder="Best Season"
//         //         value={currentPackage.bestSeason}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, bestSeason: e.target.value})}
//         //         className="w-full p-2 border rounded"
//         //       />
//         //       <input
//         //         type="text"
//         //         placeholder="Recommended For (comma-separated)"
//         //         value={currentPackage.recommendedFor.join(', ')}
//         //         onChange={(e) => setCurrentPackage({
//         //           ...currentPackage, 
//         //           recommendedFor: e.target.value.split(',').map(item => item.trim())
//         //         })}
//         //         className="w-full p-2 border rounded"
//         //       />
//         //       <input
//         //         type="date"
//         //         placeholder="Booking Deadline"
//         //         value={currentPackage.bookingDeadline || ''}
//         //         onChange={(e) => setCurrentPackage({...currentPackage, bookingDeadline: e.target.value})}
//         //         className="w-full p-2 border rounded"
//         //       />
//         //     </div>
//         //   );
        
//           // Render Package List
//           const renderPackageList = () => (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
//               {packages.map((pkg) => (
//                 <div 
//                   key={pkg._id} 
//                   className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
//                 >
//                   <div>
//                     <h3 className="text-lg font-semibold">{pkg.name}</h3>
//                     <p className="text-gray-600">{pkg.category} | {pkg.difficulty}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => editPackage(pkg)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => deletePackage(pkg._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );


//   // The return statement and render methods would remain mostly the same
// //   return (
// //     <div className="container mx-auto p-4">
// //       {/* Existing UI with tabs and forms */}
// //       {/* ... (previous implementation) ... */}
// //     </div>
// //   );



//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4">
//         <div className="flex space-x-4 mb-4">
//           <button 
//             onClick={() => {
//               setActiveTab('packages');
//               setActiveSubTab('details');
//             }}
//             className={`px-4 py-2 rounded ${activeTab === 'packages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Create/Edit Package
//           </button>
//           <button 
//             onClick={() => {
//               setActiveTab('packageList');
//               resetForms();
//             }}
//             className={`px-4 py-2 rounded ${activeTab === 'packageList' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package List
//           </button>
//         </div>

//         {activeTab === 'packages' && (
//           <div className="flex space-x-4 mb-4">
//             <button 
//               onClick={() => setActiveSubTab('details')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'details' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Package Details
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('feature')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'feature' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Add Feature
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('content')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'content' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Package Content
//             </button>
//             <button 
//               onClick={() => setActiveSubTab('itinerary')}
//               className={`px-4 py-2 rounded ${activeSubTab === 'itinerary' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             >
//               Itinerary
//             </button>
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 gap-4">
//           {activeTab === 'packages' && (
//             <div>
//               {activeSubTab === 'details' && renderPackageDetailsForm()}
//               {activeSubTab === 'feature' && renderFeatureForm()}
//               {activeSubTab === 'content' && renderPackageContentForm()}
//               {activeSubTab === 'itinerary' && renderItineraryForm()}
//             </div>
//           )}

//           <div>
//             {activeTab === 'packages' && (
//               <>
//                 <div className="mb-4">
//                   <h3 className="text-lg font-bold mb-2">Current Package Features</h3>
//                   {(currentPackage.features || []).map((feature, index) => (
//                     <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                       <p><strong>Title:</strong> {feature.title}</p>
//                       <p><strong>Subtitle:</strong> {feature.subtitle}</p>
//                       <button 
//                         onClick={() => {
//                           setCurrentPackage(prev => ({
//                             ...prev,
//                             features: (prev.features || []).filter((_, i) => i !== index)
//                           }));
//                         }}
//                         className="text-red-500 mt-2"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <h3 className="text-lg font-bold mb-2">Current Itinerary</h3>
//                   {(currentPackage.itinerary || []).map((day, index) => (
//                     <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//                       <p><strong>Day {day.day}:</strong> {day.title}</p>
//                       <p>{day.description}</p>
//                       <button 
//                         onClick={() => {
//                           setCurrentPackage(prev => ({
//                             ...prev,
//                             itinerary: (prev.itinerary || []).filter((_, i) => i !== index)
//                           }));
//                         }}
//                         className="text-red-500 mt-2"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <button 
//                   onClick={createOrUpdatePackage}
//                   className="w-full bg-green-500 text-white p-2 rounded mb-4"
//                 >
//                   {isEditing ? 'Update Package' : 'Create Package'}
//                 </button>
//               </>
//             )}

//             {activeTab === 'packageList' && renderPackageList()}

//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                 <span className="block sm:inline">{error}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import * as LucideIcons from 'lucide-react';

// const PackageManagement = () => {
//   const [packages, setPackages] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     packageId: '',
//     name: '',
//     category: 'Guided Tours',
//     difficulty: 'Moderate',
//     bestSeason: '',
//     recommendedFor: [],
//     totalSpots: null,
//     spotsLeft: null,
//     features: [],
//     itinerary: []
//   });

//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: 'bg-blue-500',
//     iconBgClass: 'bg-yellow-300',
//     hoverClass: 'hover:bg-blue-700',
//     content: []
//   });

//   const [currentFeatureContent, setCurrentFeatureContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: 'Available',
//     popular: false
//   });

//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('details');
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const API_BASE_URL =  'http://localhost:5000/api';

//   const fetchPackages = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/packages`);
//       setPackages(response.data.packages || []);
//     } catch (err) {
//       console.error('Failed to fetch packages:', err);
//       setError('Unable to load packages. Please try again later.');
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages();
//   }, [fetchPackages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!currentPackage.name || !currentPackage.category) {
//       setError('Package name and category are required.');
//       return;
//     }

//     try {
//       const packageData = {
//         ...currentPackage,
//         spotsLeft: currentPackage.spotsLeft || currentPackage.totalSpots,
//         features: currentPackage.features || [],
//         itinerary: currentPackage.itinerary || []
//       };

//       const url = isEditing 
//         ? `${API_BASE_URL}/packages/${currentPackage._id}` 
//         : `${API_BASE_URL}/packages`;

//       const method = isEditing ? 'put' : 'post';
      
//       const response = await axios[method](url, packageData);
      
//       setPackages(prevPackages => {
//         if (isEditing) {
//           return prevPackages.map(pkg => 
//             pkg._id === response.data.package._id ? response.data.package : pkg
//           );
//         }
//         return [...prevPackages, response.data.package];
//       });

//       resetForm();
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError(err.response?.data?.message || 'Failed to save package');
//     }
//   };

//   const addFeature = () => {
//     if (!currentFeature.title) {
//       setError('Feature title is required');
//       return;
//     }

//     const newFeature = {
//       ...currentFeature,
//       content: currentFeatureContent ? [currentFeatureContent] : [],
//       id: `FT${Math.random().toString(36).substr(2, 3).toUpperCase()}`
//     };

//     setCurrentPackage(prev => ({
//       ...prev,
//       features: [...(prev.features || []), newFeature]
//     }));

//     // Reset feature forms
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: 'bg-blue-500',
//       iconBgClass: 'bg-yellow-300',
//       hoverClass: 'hover:bg-blue-700',
//       content: []
//     });
//     setCurrentFeatureContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: 'Available',
//       popular: false
//     });
//   };

//   const addItineraryDay = () => {
//     if (!currentItineraryDay.title) {
//       setError('Day title is required');
//       return;
//     }

//     setCurrentPackage(prev => ({
//       ...prev,
//       itinerary: [...(prev.itinerary || []), {
//         ...currentItineraryDay,
//         day: (prev.itinerary?.length || 0) + 1
//       }]
//     }));

//     // Reset itinerary day form
//     setCurrentItineraryDay({
//       day: (currentPackage.itinerary?.length || 0) + 2,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//   };

//   const deletePackage = async (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/packages/${packageId}`);
//         setPackages(prevPackages => 
//           prevPackages.filter(pkg => pkg._id !== packageId)
//         );
//       } catch (err) {
//         console.error('Delete package error:', err);
//         setError('Failed to delete package');
//       }
//     }
//   };

//   const resetForm = () => {
//     setCurrentPackage({
//       packageId: '',
//       name: '',
//       category: 'Guided Tours',
//       difficulty: 'Moderate',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: null,
//       spotsLeft: null,
//       features: [],
//       itinerary: []
//     });
//     setIsEditing(false);
//     setError(null);
//   };

//   const renderPackageForm = () => (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Package ID"
//           value={currentPackage.packageId}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             packageId: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Package Name"
//           value={currentPackage.name}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             name: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <select
//           value={currentPackage.category}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             category: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//           required
//         >
//           <option value="Guided Tours">Guided Tours</option>
//           <option value="Last Minute Deals">Last Minute Deals</option>
//           <option value="Group Discounts">Group Discounts</option>
//           <option value="Seasonal Specials">Seasonal Specials</option>
//         </select>
//         <select
//           value={currentPackage.difficulty}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             difficulty: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         >
//           <option value="Easy">Easy</option>
//           <option value="Moderate">Moderate</option>
//           <option value="Challenging">Challenging</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Best Season"
//           value={currentPackage.bestSeason}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             bestSeason: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Recommended For (comma-separated)"
//           value={(currentPackage.recommendedFor || []).join(', ')}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage,
//             recommendedFor: e.target.value
//               .split(',')
//               .map((item) => item.trim())
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="number"
//           placeholder="Total Spots"
//           value={currentPackage.totalSpots || ''}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             totalSpots: parseInt(e.target.value),
//             spotsLeft: parseInt(e.target.value)
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Spots Left"
//           value={currentPackage.spotsLeft || ''}
//           onChange={(e) => setCurrentPackage({
//             ...currentPackage, 
//             spotsLeft: parseInt(e.target.value)
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       <div className="flex justify-between">
//         <button 
//           type="submit" 
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           {isEditing ? 'Update Package' : 'Create Package'}
//         </button>
//         <button 
//           type="button" 
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(false);
//           }}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );

//   const renderFeatureForm = () => (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Feature Title"
//           value={currentFeature.title}
//           onChange={(e) => setCurrentFeature({
//             ...currentFeature, 
//             title: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Feature Subtitle"
//           value={currentFeature.subtitle}
//           onChange={(e) => setCurrentFeature({
//             ...currentFeature, 
//             subtitle: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Icon"
//           value={currentFeature.icon}
//           onChange={(e) => setCurrentFeature({
//             ...currentFeature, 
//             icon: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Background Class"
//           value={currentFeature.bgClass}
//           onChange={(e) => setCurrentFeature({
//             ...currentFeature, 
//             bgClass: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Content Name"
//           value={currentFeatureContent.name}
//           onChange={(e) => setCurrentFeatureContent({
//             ...currentFeatureContent, 
//             name: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Slug"
//           value={currentFeatureContent.slug}
//           onChange={(e) => setCurrentFeatureContent({
//             ...currentFeatureContent, 
//             slug: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <textarea
//         placeholder="Description"
//         value={currentFeatureContent.description}
//         onChange={(e) => setCurrentFeatureContent({
//           ...currentFeatureContent, 
//           description: e.target.value
//         })}
//         className="w-full p-2 border rounded"
//       />

//       <div className="grid grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="Original Price"
//           value={currentFeatureContent.originalPrice}
//           onChange={(e) => setCurrentFeatureContent({
//             ...currentFeatureContent, 
//             originalPrice: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Discounted Price"
//           value={currentFeatureContent.discountedPrice}
//           onChange={(e) => setCurrentFeatureContent({
//             ...currentFeatureContent, 
//             discountedPrice: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Duration"
//           value={currentFeatureContent.duration}
//           onChange={(e) => setCurrentFeatureContent({
//             ...currentFeatureContent, 
//             duration: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <button 
//         type="button"
//         onClick={addFeature}
//         className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//       >
//         Add Feature
//       </button>
//     </div>
//   );

//   const renderItineraryForm = () => (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Day Title"
//           value={currentItineraryDay.title}
//           onChange={(e) => setCurrentItineraryDay({
//             ...currentItineraryDay, 
//             title: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Accommodation"
//           value={currentItineraryDay.accommodation}
//           onChange={(e) => setCurrentItineraryDay({
//             ...currentItineraryDay, 
//             accommodation: e.target.value
//           })}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <textarea
//         placeholder="Day Description"
//         value={currentItineraryDay.description}
//         onChange={(e) => setCurrentItineraryDay({
//           ...currentItineraryDay, 
//           description: e.target.value
//         })}
//         className="w-full p-2 border rounded"
//       />

//       <div>
//         <label className="block mb-2">Activities</label>
//         <input
//           type="text"
//           placeholder="Add Activity"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && e.target.value.trim()) {
//               setCurrentItineraryDay(prev => ({
//                 ...prev,
//                 activities: [...prev.activities, e.target.value.trim()]
//               }));
//               e.target.value = '';
//             }
//           }}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <div className="flex flex-wrap gap-2">
//           {currentItineraryDay.activities.map((activity, index) => (
//             <span 
//               key={index} 
//               className="bg-blue-100 px-2 py-1 rounded flex items-center"
//             >
//               {activity}
//               <button 
//                 onClick={() => setCurrentItineraryDay(prev => ({
//                   ...prev,
//                   activities: prev.activities.filter((_, i) => i !== index)
//                 }))}
//                 className="ml-2 text-red-500"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="Breakfast"
//           value={currentItineraryDay.meals.breakfast}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, breakfast: e.target.value}
//           }))}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Lunch"
//           value={currentItineraryDay.meals.lunch}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, lunch: e.target.value}
//           }))}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Dinner"
//           value={currentItineraryDay.meals.dinner}
//           onChange={(e) => setCurrentItineraryDay(prev => ({
//             ...prev,
//             meals: {...prev.meals, dinner: e.target.value}
//           }))}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <button 
//         type="button"
//         onClick={addItineraryDay}
//         className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//       >
//         Add Itinerary Day
//       </button>
//     </div>
//   );

//   const renderPackageList = () => (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Package List</h2>
//         <button 
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add New Package
//         </button>
//       </div>
//       {packages.length === 0 ? (
//         <p className="text-gray-500 text-center">No packages available</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {packages.map((pkg) => (
//             <div 
//               key={pkg._id} 
//               className="border rounded p-4 shadow-md hover:shadow-lg transition-shadow"
//             >
//               <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
//               <p className="text-gray-600 mb-2">
//                 {pkg.category} | {pkg.difficulty}
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Spots Left: {pkg.spotsLeft || 0}/{pkg.totalSpots || 0}
//               </p>
//               <div className="flex justify-between">
//                 <button 
//                   onClick={() => {
//                     setCurrentPackage(pkg);
//                     setIsEditing(true);
//                     setIsModalOpen(true);
//                   }}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => deletePackage(pkg._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <div className="mb-4">
//         <div className="flex space-x-4 mb-4">
//           <button 
//             onClick={() => setActiveTab('details')}
//             className={`px-4 py-2 rounded ${activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package Details
//           </button>
//           <button 
//             onClick={() => setActiveTab('feature')}
//             className={`px-4 py-2 rounded ${activeTab === 'feature' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Features
//           </button>
//           <button 
//             onClick={() => setActiveTab('itinerary')}
//             className={`px-4 py-2 rounded ${activeTab === 'itinerary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Itinerary
//           </button>
//           <button 
//             onClick={() => setActiveTab('list')}
//             className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Package List
//           </button>
//         </div>

//         {activeTab === 'details' && renderPackageForm()}
//         {activeTab === 'feature' && renderFeatureForm()}
//         {activeTab === 'itinerary' && renderItineraryForm()}
//         {activeTab === 'list' && renderPackageList()}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-4">
//               {isEditing ? 'Edit Package' : 'Create New Package'}
//             </h2>
//             {renderPackageForm()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PackageManagement;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const PackageManagement = () => {
//   const [packages, setPackages] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     description: '',
//     bestSeason: '',
//     recommendedFor: [],
//     totalSpots: null,
//     features: [],
//     itinerary: []
//   });

//   const [feature, setFeature] = useState({
//     title: '',
//     description: '',
//     price: '',
//     duration: ''
//   });

//   const [itineraryDay, setItineraryDay] = useState({
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     }
//   });

//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingPackageId, setEditingPackageId] = useState(null);

//   const CATEGORIES = [
//     'Guided Tours',
//     'Adventure Trips',
//     'Cultural Experiences',
//     'Wildlife Safaris',
//     'Group Tours',
//     'Family Vacations',
//     'Solo Traveler Packages',
//     'Luxury Retreats'
//   ];

//   const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

//   const fetchPackages = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/packages');
//       setPackages(response.data.packages || []);
//     } catch (err) {
//       setError('Failed to load packages. Please try again.');
//       console.error('Fetch packages error:', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages();
//   }, [fetchPackages]);

//   const resetForms = () => {
//     setCurrentPackage({
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       description: '',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: null,
//       features: [],
//       itinerary: []
//     });
//     setFeature({
//       title: '',
//       description: '',
//       price: '',
//       duration: ''
//     });
//     setItineraryDay({
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       }
//     });
//     setIsEditing(false);
//     setEditingPackageId(null);
//   };

//   const addFeature = () => {
//     if (!feature.title) {
//       setError('Feature title is required');
//       return;
//     }

//     setCurrentPackage(prev => ({
//       ...prev,
//       features: [...(prev.features || []), {
//         ...feature,
//         id: `F-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
//       }]
//     }));

//     // Reset feature form
//     setFeature({
//       title: '',
//       description: '',
//       price: '',
//       duration: ''
//     });
//   };

//   const addItineraryDay = () => {
//     if (!itineraryDay.title) {
//       setError('Itinerary day title is required');
//       return;
//     }

//     setCurrentPackage(prev => ({
//       ...prev,
//       itinerary: [...(prev.itinerary || []), {
//         ...itineraryDay,
//         day: (prev.itinerary?.length || 0) + 1
//       }]
//     }));

//     // Reset itinerary day form
//     setItineraryDay({
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!currentPackage.name) {
//       setError('Package name is required');
//       return;
//     }
//     if (!currentPackage.category) {
//       setError('Package category is required');
//       return;
//     }

//     try {
//       const packageData = {
//         ...currentPackage,
//         spotsLeft: currentPackage.totalSpots
//       };

//       const url = isEditing 
//         ? `http://localhost:5000/api/packages/${editingPackageId}` 
//         : 'http://localhost:5000/api/packages';

//       const method = isEditing ? 'put' : 'post';
      
//       const response = await axios[method](url, packageData);
      
//       // Update packages list
//       setPackages(prev => {
//         if (isEditing) {
//           return prev.map(pkg => 
//             pkg._id === editingPackageId ? response.data.package : pkg
//           );
//         }
//         return [...prev, response.data.package];
//       });

//       // Reset forms and close editing mode
//       resetForms();
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError(err.response?.data?.message || 'Failed to save package');
//     }
//   };

//   const deletePackage = async (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/packages/${packageId}`);
//         setPackages(prev => prev.filter(pkg => pkg._id !== packageId));
//       } catch (err) {
//         console.error('Delete package error:', err);
//         setError('Failed to delete package');
//       }
//     }
//   };

//   const startEditPackage = (pkg) => {
//     setCurrentPackage({
//       name: pkg.name,
//       category: pkg.category,
//       difficulty: pkg.difficulty || 'Moderate',
//       description: pkg.description || '',
//       bestSeason: pkg.bestSeason || '',
//       recommendedFor: pkg.recommendedFor || [],
//       totalSpots: pkg.totalSpots,
//       features: pkg.features || [],
//       itinerary: pkg.itinerary || []
//     });
//     setIsEditing(true);
//     setEditingPackageId(pkg._id);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Package Creation/Editing Form */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">
//             {isEditing ? 'Edit Package' : 'Create New Package'}
//           </h2>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Basic Package Information */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Package Name"
//                 value={currentPackage.name}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   name: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <select
//                 value={currentPackage.category}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   category: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {CATEGORIES.map(category => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <select
//                 value={currentPackage.difficulty}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   difficulty: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//               >
//                 {DIFFICULTIES.map(diff => (
//                   <option key={diff} value={diff}>{diff}</option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 placeholder="Best Season"
//                 value={currentPackage.bestSeason}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   bestSeason: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <textarea
//               placeholder="Package Description"
//               value={currentPackage.description}
//               onChange={(e) => setCurrentPackage(prev => ({
//                 ...prev, 
//                 description: e.target.value
//               }))}
//               className="w-full p-2 border rounded"
//               rows="3"
//             />

//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Recommended For (comma-separated)"
//                 value={currentPackage.recommendedFor.join(', ')}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev,
//                   recommendedFor: e.target.value
//                     .split(',')
//                     .map(item => item.trim())
//                     .filter(item => item)
//                 }))}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Spots"
//                 value={currentPackage.totalSpots || ''}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   totalSpots: e.target.value ? parseInt(e.target.value) : null
//                 }))}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Features Section */}
//             <div className="border-t pt-4">
//               <h3 className="font-semibold mb-2">Features</h3>
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Feature Title"
//                   value={feature.title}
//                   onChange={(e) => setFeature(prev => ({
//                     ...prev, 
//                     title: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Price"
//                   value={feature.price}
//                   onChange={(e) => setFeature(prev => ({
//                     ...prev, 
//                     price: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <textarea
//                 placeholder="Feature Description"
//                 value={feature.description}
//                 onChange={(e) => setFeature(prev => ({
//                   ...prev, 
//                   description: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded mb-2"
//                 rows="2"
//               />
//               <button 
//                 type="button"
//                 onClick={addFeature}
//                 className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//               >
//                 Add Feature
//               </button>

//               {/* Display Added Features */}
//               {currentPackage.features.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-medium mb-2">Current Features:</h4>
//                   {currentPackage.features.map((f, index) => (
//                     <div 
//                       key={f.id || index} 
//                       className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
//                     >
//                       <div>
//                         <strong>{f.title}</strong>
//                         <p className="text-sm text-gray-600">{f.description}</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setCurrentPackage(prev => ({
//                           ...prev,
//                           features: prev.features.filter((_, i) => i !== index)
//                         }))}
//                         className="text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Itinerary Section */}
//             <div className="border-t pt-4">
//               <h3 className="font-semibold mb-2">Itinerary</h3>
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Day Title"
//                   value={itineraryDay.title}
//                   onChange={(e) => setItineraryDay(prev => ({
//                     ...prev, 
//                     title: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Accommodation"
//                   value={itineraryDay.accommodation}
//                   onChange={(e) => setItineraryDay(prev => ({
//                     ...prev, 
//                     accommodation: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <textarea
//                 placeholder="Day Description"
//                 value={itineraryDay.description}
//                 onChange={(e) => setItineraryDay(prev => ({
//                   ...prev, 
//                   description: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded mb-2"
//                 rows="2"
//               />
//               <button 
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//               >
//                 Add Itinerary Day
//               </button>

//               {/* Display Added Itinerary Days */}
//               {currentPackage.itinerary.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-medium mb-2">Current Itinerary:</h4>
//                   {currentPackage.itinerary.map((day, index) => (
//                     <div 
//                       key={index} 
//                       className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
//                     >
//                       <div>
//                         <strong>Day {index + 1}: {day.title}</strong>
//                         <p className="text-sm text-gray-600">{day.description}</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setCurrentPackage(prev => ({
//                           ...prev,
//                           itinerary: prev.itinerary.filter((_, i) => i !== index)
//                         }))}
//                         className="text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             {/* Submit Buttons */}
//             <div className="flex space-x-4">
//               <button 
//                 type="submit" 
//                 className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//               >
//                 {isEditing ? 'Update Package' : 'Create Package'}
//               </button>
//               <button 
//                 type="button"
//                 onClick={resetForms}
//                 className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Package List by Category */}
//         <div>
//   <h2 className="text-2xl font-bold mb-6">Existing Packages</h2>

//   {Object.entries(
//     packages.reduce((acc, pkg) => {
//       const category = pkg.category || 'Uncategorized';
//       if (!acc[category]) acc[category] = [];
//       acc[category].push(pkg);
//       return acc;
//     }, {})
//   )
//     .sort(([a], [b]) => a.localeCompare(b))
//     .map(([category, categoryPackages]) => (
//       <div key={category} className="mb-6">
//         <h3 className="text-xl font-semibold mb-4">{category}</h3>
//         <div className="space-y-4">
//           {categoryPackages.map((pkg) => (
//             <div 
//               key={pkg._id} 
//               className="border rounded p-4 flex justify-between items-center"
//             >
//               <div>
//                 <h4 className="font-medium">{pkg.name}</h4>
//                 <p className="text-sm text-gray-600">
//                   {pkg.difficulty} | Spots: {pkg.totalSpots || 'N/A'}
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => startEditPackage(pkg)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deletePackage(pkg._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
// </div>
//         {/* <div>
//           <h2 className="text-2xl font-bold mb-6">Existing Packages</h2>
//           {Object.groupBy(packages, pkg => pkg.category || 'Uncategorized')
//             .entries()
//             .sort((a, b) => a[0].localeCompare(b[0]))
//             .map(([category, categoryPackages]) => (
//               <div key={category} className="mb-6">
//                 <h3 className="text-xl font-semibold mb-4">{category}</h3>
//                 <div className="space-y-4">
//                   {categoryPackages.map((pkg) => (
//                     <div 
//                       key={pkg._id} 
//                       className="border rounded p-4 flex justify-between items-center"
//                     >
//                       <div>
//                         <h4 className="font-medium">{pkg.name}</h4>
//                         <p className="text-sm text-gray-600">
//                           {pkg.difficulty} | Spots: {pkg.totalSpots || 'N/A'}
//                         </p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => startEditPackage(pkg)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deletePackage(pkg._id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const PackageManagement = () => {
//   const [packages, setPackages] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState({
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     bestSeason: '',
//     recommendedFor: [],
//     totalSpots: 0,
//     features: [],
//     itinerary: []
//   });

//   // State for nested form fields
//   const [currentFeature, setCurrentFeature] = useState({
//     id: '',
//     title: '',
//     subtitle: '',
//     icon: '',
//     bgClass: '',
//     iconBgClass: '',
//     hoverClass: '',
//     content: []
//   });

//   const [currentFeatureContent, setCurrentFeatureContent] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountedPrice: '',
//     duration: '',
//     validDates: '',
//     includes: [],
//     excludes: [],
//     discount: '',
//     remaining: '',
//     accommodation: '',
//     rating: '',
//     timeSlots: [],
//     meetingPoint: '',
//     season: '',
//     status: 'Available',
//     popular: false
//   });

//   const [currentItineraryDay, setCurrentItineraryDay] = useState({
//     day: 1,
//     title: '',
//     description: '',
//     activities: [],
//     meals: {
//       breakfast: '',
//       lunch: '',
//       dinner: ''
//     },
//     accommodation: ''
//   });

//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingPackageId, setEditingPackageId] = useState(null);

//   // Predefined lists
//   const CATEGORIES = [
//     'Guided Tours', 'Adventure Trips', 'Cultural Experiences', 
//     'Wildlife Safaris', 'Group Tours', 'Family Vacations', 
//     'Solo Traveler Packages', 'Luxury Retreats'
//   ];

//   const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
//   const STATUSES = ['Available', 'Sold Out', 'Coming Soon'];
//   const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

//   // Fetch packages
//   const fetchPackages = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/packages');
//       setPackages(response.data.packages || []);
//     } catch (err) {
//       setError('Failed to load packages. Please try again.');
//       console.error('Fetch packages error:', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages();
//   }, [fetchPackages]);

//   // Reset forms
//   const resetForms = () => {
//     setCurrentPackage({
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: 0,
//       features: [],
//       itinerary: []
//     });
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });
//     setCurrentFeatureContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: 'Available',
//       popular: false
//     });
//     setCurrentItineraryDay({
//       day: 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//     setIsEditing(false);
//     setEditingPackageId(null);
//   };

//   // Add feature content
//   const addFeatureContent = () => {
//     if (!currentFeatureContent.name) {
//       setError('Feature content name is required');
//       return;
//     }

//     const newFeatureContent = {
//       ...currentFeatureContent,
//       _id: `FC-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
//     };

//     setCurrentFeature(prev => ({
//       ...prev,
//       content: [...prev.content, newFeatureContent]
//     }));

//     // Reset feature content form
//     setCurrentFeatureContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       discount: '',
//       remaining: '',
//       accommodation: '',
//       rating: '',
//       timeSlots: [],
//       meetingPoint: '',
//       season: '',
//       status: 'Available',
//       popular: false
//     });
//   };

//   // Add feature
//   const addFeature = () => {
//     if (!currentFeature.title) {
//       setError('Feature title is required');
//       return;
//     }

//     const newFeature = {
//       ...currentFeature,
//       id: `F-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//       _id: `F-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
//     };

//     setCurrentPackage(prev => ({
//       ...prev,
//       features: [...(prev.features || []), newFeature]
//     }));

//     // Reset feature form
//     setCurrentFeature({
//       id: '',
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });
//   };

//   // Add itinerary day
//   const addItineraryDay = () => {
//     if (!currentItineraryDay.title) {
//       setError('Itinerary day title is required');
//       return;
//     }

//     const newItineraryDay = {
//       ...currentItineraryDay,
//       day: (currentPackage.itinerary?.length || 0) + 1,
//       _id: `ID-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
//     };

//     setCurrentPackage(prev => ({
//       ...prev,
//       itinerary: [...(prev.itinerary || []), newItineraryDay]
//     }));

//     // Reset itinerary day form
//     setCurrentItineraryDay({
//       day: newItineraryDay.day + 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//   };

//   // Handle package submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!currentPackage.name) {
//       setError('Package name is required');
//       return;
//     }
//     if (!currentPackage.category) {
//       setError('Package category is required');
//       return;
//     }

//     try {
//       const packageData = {
//         ...currentPackage,
//         spotsLeft: currentPackage.totalSpots,
//         packageId: `PKG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
//       };

//       const url = isEditing 
//         ? `http://localhost:5000/api/packages/${editingPackageId}` 
//         : 'http://localhost:5000/api/packages';

//       const method = isEditing ? 'put' : 'post';
      
//       const response = await axios[method](url, packageData);
      
//       // Update packages list
//       setPackages(prev => {
//         if (isEditing) {
//           return prev.map(pkg => 
//             pkg._id === editingPackageId ? response.data.package : pkg
//           );
//         }
//         return [...prev, response.data.package];
//       });

//       // Reset forms and close editing mode
//       resetForms();
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError(err.response?.data?.message || 'Failed to save package');
//     }
//   };

//   // Delete package
//   const deletePackage = async (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/packages/${packageId}`);
//         setPackages(prev => prev.filter(pkg => pkg._id !== packageId));
//       } catch (err) {
//         console.error('Delete package error:', err);
//         setError('Failed to delete package');
//       }
//     }
//   };

//   // Start editing a package
//   const startEditPackage = (pkg) => {
//     setCurrentPackage({ ...pkg });
//     setIsEditing(true);
//     setEditingPackageId(pkg._id || null);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Package Creation/Editing Form */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">
//             {isEditing ? 'Edit Package' : 'Create New Package'}
//           </h2>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Basic Package Information */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Package Name"
//                 value={currentPackage.name}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   name: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <select
//                 value={currentPackage.category}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   category: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {CATEGORIES.map(category => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Additional Package Details */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <select
//                 value={currentPackage.difficulty}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   difficulty: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//               >
//                 {DIFFICULTIES.map(diff => (
//                   <option key={diff} value={diff}>{diff}</option>
//                 ))}
//               </select>
//               <select
//                 value={currentPackage.bestSeason}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   bestSeason: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select Best Season</option>
//                 {SEASONS.map(season => (
//                   <option key={season} value={season}>{season}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Recommended For and Total Spots */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Recommended For (comma-separated)"
//                 value={currentPackage.recommendedFor.join(', ')}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev,
//                   recommendedFor: e.target.value
//                     .split(',')
//                     .map(item => item.trim())
//                     .filter(item => item)
//                 }))}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Spots"
//                 value={currentPackage.totalSpots}
//                 onChange={(e) => setCurrentPackage(prev => ({
//                   ...prev, 
//                   totalSpots: parseInt(e.target.value) || 0
//                 }))}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Features Section */}
//             <div className="border-t pt-4">
//               <h3 className="font-semibold mb-2">Features</h3>
              
//               {/* Feature Main Details */}
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Feature Title"
//                   value={currentFeature.title}
//                   onChange={(e) => setCurrentFeature(prev => ({
//                     ...prev, 
//                     title: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Feature Subtitle"
//                   value={currentFeature.subtitle}
//                   onChange={(e) => setCurrentFeature(prev => ({
//                     ...prev, 
//                     subtitle: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Feature Content Details */}
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Content Name"
//                   value={currentFeatureContent.name}
//                   onChange={(e) => setCurrentFeatureContent(prev => ({
//                     ...prev, 
//                     name: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <select
//                   value={currentFeatureContent.status}
//                   onChange={(e) => setCurrentFeatureContent(prev => ({
//                     ...prev, 
//                     status: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 >
//                   {STATUSES.map(status => (
//                     <option key={status} value={status}>{status}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* More Feature Content Fields */}
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Original Price"
//                   value={currentFeatureContent.originalPrice}
//                   onChange={(e) => setCurrentFeatureContent(prev => ({
//                     ...prev, 
//                     originalPrice: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Discounted Price"
//                   value={currentFeatureContent.discountedPrice}
//                   onChange={(e) => setCurrentFeatureContent(prev => ({
//                     ...prev, 
//                     discountedPrice: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Add Feature Content Button */}
//               <button 
//                 type="button"
//                 onClick={addFeatureContent}
//                 className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
//               >
//                 Add Feature Content
//               </button>

//               {/* Add Feature Button */}
//               <button 
//                 type="button"
//                 onClick={addFeature}
//                 className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//               >
//                 Add Feature
//               </button>

//               {/* Display Added Features */}
//               {currentPackage.features.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-medium mb-2">Current Features:</h4>
//                   {currentPackage.features.map((f, index) => (
//                     <div 
//                       key={f.id || index} 
//                       className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
//                     >
//                       <div>
//                         <strong>{f.title}</strong>
//                         <p className="text-sm text-gray-600">{f.subtitle}</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setCurrentPackage(prev => ({
//                           ...prev,
//                           features: prev.features.filter((_, i) => i !== index)
//                         }))}
//                         className="text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Itinerary Section */}
//             <div className="border-t pt-4">
//               <h3 className="font-semibold mb-2">Itinerary</h3>
              
//               {/* Itinerary Day Details */}
//               <div className="grid md:grid-cols-2 gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Day Title"
//                   value={currentItineraryDay.title}
//                   onChange={(e) => setCurrentItineraryDay(prev => ({
//                     ...prev, 
//                     title: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Accommodation"
//                   value={currentItineraryDay.accommodation}
//                   onChange={(e) => setCurrentItineraryDay(prev => ({
//                     ...prev, 
//                     accommodation: e.target.value
//                   }))}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <textarea
//                 placeholder="Day Description"
//                 value={currentItineraryDay.description}
//                 onChange={(e) => setCurrentItineraryDay(prev => ({
//                   ...prev, 
//                   description: e.target.value
//                 }))}
//                 className="w-full p-2 border rounded mb-2"
//                 rows={2}
//               />

//               {/* Add Itinerary Day Button */}
//               <button 
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//               >
//                 Add Itinerary Day
//               </button>

//               {/* Display Added Itinerary Days */}
//               {currentPackage.itinerary.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-medium mb-2">Current Itinerary:</h4>
//                   {currentPackage.itinerary.map((day, index) => (
//                     <div 
//                       key={day._id || index} 
//                       className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
//                     >
//                       <div>
//                         <strong>Day {day.day}: {day.title}</strong>
//                         <p className="text-sm text-gray-600">{day.description}</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setCurrentPackage(prev => ({
//                           ...prev,
//                           itinerary: prev.itinerary.filter((_, i) => i !== index)
//                         }))}
//                         className="text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             {/* Submit Buttons */}
//             <div className="flex space-x-4">
//               <button 
//                 type="submit" 
//                 className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//               >
//                 {isEditing ? 'Update Package' : 'Create Package'}
//               </button>
//               <button 
//                 type="button"
//                 onClick={resetForms}
//                 className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Package List */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Existing Packages</h2>
//           {Object.entries(
//             packages.reduce((acc, pkg) => {
//               const category = pkg.category || 'Uncategorized';
//               if (!acc[category]) acc[category] = [];
//               acc[category].push(pkg);
//               return acc;
//             }, {})
//           )
//             .sort(([a], [b]) => a.localeCompare(b))
//             .map(([category, categoryPackages]) => (
//               <div key={category} className="mb-6">
//                 <h3 className="text-xl font-semibold mb-4">{category}</h3>
//                 <div className="space-y-4">
//                   {categoryPackages.map((pkg) => (
//                     <div 
//                       key={pkg._id} 
//                       className="border rounded p-4 flex justify-between items-center"
//                     >
//                       <div>
//                         <h4 className="font-medium">{pkg.name}</h4>
//                         <p className="text-sm text-gray-600">
//                           {pkg.difficulty} | Spots: {pkg.totalSpots || 'N/A'}
//                         </p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => startEditPackage(pkg)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deletePackage(pkg._id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;

//  ['Last Minute Deals', 'Guided Tours', 'Group Discounts', 'Seasonal Specials'],

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    category: '',
    features: [],
    itinerary: [],
    difficulty: 'Easy',
    bestSeason: '',
    recommendedFor: [],
    totalSpots: 0,
    spotsLeft: 0,
    bookingDeadline: ''
  });

  // Feature and Feature Content State
  const [currentFeature, setCurrentFeature] = useState({
    title: '',
    subtitle: '',
    icon: '',
    bgClass: '',
    iconBgClass: '',
    hoverClass: '',
    content: []
  });

  const [currentFeatureContent, setCurrentFeatureContent] = useState({
    name: '',
    slug: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    duration: '',
    validDates: '',
    includes: [],
    excludes: [],
    timeSlots: [],
    popular: false
  });

  const [currentItineraryDay, setCurrentItineraryDay] = useState({
    day: 1,
    title: '',
    description: '',
    activities: [],
    meals: {
      breakfast: '',
      lunch: '',
      dinner: ''
    },
    accommodation: ''
  });

  // Predefined lists
  const CATEGORIES = [
    'Last Minute Deals', 'Seasonal Specials', 'Guided Tours', 
    'Group Discounts'
  ];

  const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
  const SEASONS = ['Summer', 'Winter', 'Spring', 'Autumn'];

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch packages
//   const fetchPackages = useCallback(async () => {
//     try {
//       // In a real scenario, this would be an API call
//       // For now, we'll use the provided JSON
//       const sampleData = {
//         packages: [
//           {
//             name: 'Kashmir Last Minute Getaway',
//             category: 'Last Minute Deals',
//             features: [
//               {
//                 title: 'Quick Getaway Discounts',
//                 subtitle: 'Special deals for last-minute travelers',
//                 icon: 'last_minute_icon.png',
//                 bgClass: 'bg-red-500',
//                 iconBgClass: 'bg-red-700',
//                 hoverClass: 'hover:bg-red-600',
//                 content: [
//                   {
//                     name: 'Srinagar Express Tour',
//                     slug: 'srinagar-express-tour',
//                     description: 'A fast-paced Kashmir experience covering Srinagar\'s main attractions.',
//                     originalPrice: '1000 USD',
//                     discountedPrice: '750 USD',
//                     duration: '4 Days / 3 Nights',
//                     validDates: '2025-08-01 to 2025-08-15',
//                     includes: ['Accommodation', 'Local Transport', 'Guided Tours'],
//                     excludes: ['Airfare', 'Personal Expenses'],
//                     timeSlots: ['10:00 AM', '03:00 PM'],
//                     popular: true
//                   }
//                 ]
//               }
//             ],
//             itinerary: [
//               {
//                 meals: {
//                   breakfast: 'Included',
//                   lunch: 'On Your Own',
//                   dinner: 'Included'
//                 },
//                 day: 1,
//                 title: 'Arrival in Srinagar',
//                 description: 'Check-in and an evening Shikara ride on Dal Lake.',
//                 activities: ['Shikara Ride'],
//                 accommodation: 'Luxury Houseboat'
//               }
//             ],
//             difficulty: 'Easy',
//             bestSeason: 'Summer',
//             recommendedFor: ['Couples', 'Solo Travelers'],
//             totalSpots: 25,
//             spotsLeft: 5,
//             bookingDeadline: '2025-07-28T00:00:00.000Z'
//           },
//           {
//             name: 'Kashmir Winter Wonderland',
//             category: 'Seasonal Special',
//             features: [
//               {
//                 title: 'Winter Exclusive',
//                 subtitle: 'Enjoy the magic of Kashmir\'s winter season',
//                 icon: 'winter_icon.png',
//                 bgClass: 'bg-cyan-500',
//                 iconBgClass: 'bg-cyan-700',
//                 hoverClass: 'hover:bg-cyan-600',
//                 content: [
//                   {
//                     name: 'Gulmarg Ski Adventure',
//                     slug: 'gulmarg-ski-adventure',
//                     description: 'Experience the thrill of skiing in the snow-covered mountains of Gulmarg.',
//                     originalPrice: '1800 USD',
//                     discountedPrice: '1500 USD',
//                     duration: '5 Days / 4 Nights',
//                     validDates: '2025-12-01 to 2026-01-31',
//                     includes: ['Accommodation', 'Meals', 'Ski Equipment'],
//                     excludes: ['Airfare', 'Personal Expenses'],
//                     timeSlots: ['08:00 AM', '12:00 PM'],
//                     popular: true
//                   }
//                 ]
//               }
//             ],
//             itinerary: [
//               {
//                 meals: {
//                   breakfast: 'Included',
//                   lunch: 'On Your Own',
//                   dinner: 'Included'
//                 },
//                 day: 1,
//                 title: 'Arrival in Srinagar',
//                 description: 'Check-in and orientation for the upcoming ski adventure.',
//                 activities: ['Orientation', 'Welcome Dinner'],
//                 accommodation: 'Mountain Resort'
//               }
//             ],
//             difficulty: 'Challenging',
//             bestSeason: 'Winter',
//             recommendedFor: ['Adventure Seekers', 'Winter Lovers'],
//             totalSpots: 15,
//             spotsLeft: 8,
//             bookingDeadline: '2025-11-20T00:00:00.000Z'
//           }
//         ]
//       };
      
//       setPackages(sampleData.packages);
//     } catch (err) {
//       setError('Failed to load packages');
//       console.error(err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages();
//   }, [fetchPackages]);
// const fetchPackages = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/packages');
//       if (response.data && response.data.packages) {
//         setPackages(response.data.packages);
//       } else {
//         setError('No packages found in response');
//       }
//     } catch (err) {
//       setError('Failed to load packages. Please try again.');
//       console.error('Fetch packages error:', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages();
//   }, [fetchPackages]);

const [isSubmitting, setIsSubmitting] = useState(false);

// Enhanced fetchPackages with debugging
const fetchPackages = useCallback(async () => {
  console.log('Fetching packages from API...');
  try {
    const response = await axios.get('http://localhost:5000/api/packages');
    console.log('API Response:', response.data);
    
    if (response.data?.packages) {
      setPackages(response.data.packages);
      console.log('Packages set in state:', response.data.packages.length);
    } else {
      console.error('Unexpected API response format');
      setError('Invalid response format from server');
    }
  } catch (err) {
    console.error('API Error:', err);
    setError(`Failed to load packages: ${err.message}`);
  }
}, []);

useEffect(() => {
  fetchPackages();
}, [fetchPackages]);

// Enhanced handleSubmit with proper state management
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Submitting package:', currentPackage);
  
  if (!currentPackage.name || !currentPackage.category) {
    setError('Name and category are required');
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    const url = isEditing 
      ? `http://localhost:5000/api/packages/${editingPackageId}`
      : 'http://localhost:5000/api/packages';
    
    const method = isEditing ? 'put' : 'post';
    
    const response = await axios[method](url, currentPackage);
    console.log('Submission response:', response.data);

    if (response.data?.success) {
      // Update state based on operation
      if (isEditing) {
        setPackages(prev => prev.map(pkg => 
          pkg._id === editingPackageId ? response.data.package : pkg
        ));
      } else {
        setPackages(prev => [...prev, response.data.package]);
      }
      
      // Proper reset
      resetForms();
      console.log('Form should be reset now');
    } else {
      throw new Error(response.data?.message || 'Operation failed');
    }
  } catch (err) {
    console.error('Submission error:', err);
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

// Enhanced resetForms
const resetForms = useCallback(() => {
  console.log('Resetting all forms...');
  setCurrentPackage({
    name: '',
    category: '',
    features: [],
    itinerary: [],
    difficulty: 'Easy',
    bestSeason: '',
    recommendedFor: [],
    totalSpots: 0,
    spotsLeft: 0,
    bookingDeadline: ''
  });
  setCurrentFeature({
    title: '',
    subtitle: '',
    icon: '',
    bgClass: '',
    iconBgClass: '',
    hoverClass: '',
    content: []
  });
  setCurrentFeatureContent({
    name: '',
    slug: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    duration: '',
    validDates: '',
    includes: [],
    excludes: [],
    timeSlots: [],
    popular: false
  });
  setCurrentItineraryDay({
    day: 1,
    title: '',
    description: '',
    activities: [],
    meals: {
      breakfast: '',
      lunch: '',
      dinner: ''
    },
    accommodation: ''
  });
  setIsEditing(false);
  setEditingPackageId(null);
  setError(null);
  console.log('Forms should be reset now');
}, []);

// Enhanced deletePackage
const deletePackage = async (id) => {
  if (!window.confirm('Are you sure?')) return;
  
  try {
    console.log('Deleting package:', id);
    const response = await axios.delete(`http://localhost:5000/api/packages/${id}`);
    
    if (response.data?.success) {
      setPackages(prev => prev.filter(pkg => pkg._id !== id));
      console.log('Package deleted from state');
    } else {
      throw new Error(response.data?.message || 'Delete failed');
    }
  } catch (err) {
    console.error('Delete error:', err);
    setError(err.message);
  }
};

// Debugging component
const DebugPanel = () => (
  <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    background: 'white',
    padding: '10px',
    border: '1px solid #ccc',
    zIndex: 1000
  }}>
    <h3>Debug Info</h3>
    <p>Packages in state: {packages.length}</p>
    <p>Current mode: {isEditing ? `Editing ${editingPackageId}` : 'Creating'}</p>
    <p>Last error: {error || 'None'}</p>
    <button onClick={() => console.log('Current state:', {
      packages,
      currentPackage,
      isEditing,
      editingPackageId
    })}>
      Log State
    </button>
  </div>
);
  // Group packages by category
  const packagesByCategory = CATEGORIES.map(category => ({
    category,
    packages: packages.filter(pkg => pkg.category === category)
  }));
  // Reset all forms
//   const resetForms = () => {
//     setCurrentPackage({
//       name: '',
//       category: '',
//       features: [],
//       itinerary: [],
//       difficulty: 'Easy',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: 0,
//       spotsLeft: 0,
//       bookingDeadline: ''
//     });
//     setCurrentFeature({
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });
//     setCurrentFeatureContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       timeSlots: [],
//       popular: false
//     });
//     setCurrentItineraryDay({
//       day: 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//     setIsEditing(false);
//     setEditingPackageId(null);
//   };
// const resetForms = () => {
//     setCurrentPackage({
//       name: '',
//       category: '',
//       features: [],
//       itinerary: [],
//       difficulty: 'Easy',
//       bestSeason: '',
//       recommendedFor: [],
//       totalSpots: 0,
//       spotsLeft: 0,
//       bookingDeadline: ''
//     });
//     setCurrentFeature({
//       title: '',
//       subtitle: '',
//       icon: '',
//       bgClass: '',
//       iconBgClass: '',
//       hoverClass: '',
//       content: []
//     });
//     setCurrentFeatureContent({
//       name: '',
//       slug: '',
//       description: '',
//       originalPrice: '',
//       discountedPrice: '',
//       duration: '',
//       validDates: '',
//       includes: [],
//       excludes: [],
//       timeSlots: [],
//       popular: false
//     });
//     setCurrentItineraryDay({
//       day: 1,
//       title: '',
//       description: '',
//       activities: [],
//       meals: {
//         breakfast: '',
//         lunch: '',
//         dinner: ''
//       },
//       accommodation: ''
//     });
//     setIsEditing(false);
//     setEditingPackageId(null);
//     setError(null); // Also reset any errors
//   };
  // Add feature content
  const addFeatureContent = () => {
    if (!currentFeatureContent.name) {
      setError('Feature content name is required');
      return;
    }

    setCurrentFeature(prev => ({
      ...prev,
      content: [...(prev.content || []), currentFeatureContent]
    }));

    // Reset feature content form
    setCurrentFeatureContent({
      name: '',
      slug: '',
      description: '',
      originalPrice: '',
      discountedPrice: '',
      duration: '',
      validDates: '',
      includes: [],
      excludes: [],
      timeSlots: [],
      popular: false
    });
  };

  // Add feature
  const addFeature = () => {
    if (!currentFeature.title) {
      setError('Feature title is required');
      return;
    }

    setCurrentPackage(prev => ({
      ...prev,
      features: [...(prev.features || []), currentFeature]
    }));

    // Reset feature form
    setCurrentFeature({
      title: '',
      subtitle: '',
      icon: '',
      bgClass: '',
      iconBgClass: '',
      hoverClass: '',
      content: []
    });
  };

  // Add itinerary day
  const addItineraryDay = () => {
    if (!currentItineraryDay.title) {
      setError('Itinerary day title is required');
      return;
    }

    const newItineraryDay = {
      ...currentItineraryDay,
      day: (currentPackage.itinerary?.length || 0) + 1
    };

    setCurrentPackage(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), newItineraryDay]
    }));

    // Reset itinerary day form
    setCurrentItineraryDay({
      day: newItineraryDay.day + 1,
      title: '',
      description: '',
      activities: [],
      meals: {
        breakfast: '',
        lunch: '',
        dinner: ''
      },
      accommodation: ''
    });
  };

  // Handle package submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!currentPackage.name) {
//       setError('Package name is required');
//       return;
//     }
//     if (!currentPackage.category) {
//       setError('Package category is required');
//       return;
//     }

//     try {
//       // In a real scenario, this would be an API call
//       // For this example, we'll just update the local state
//       if (isEditing) {
//         setPackages(prev => 
//           prev.map(pkg => 
//             pkg._id === editingPackageId ? { ...currentPackage, _id: editingPackageId } : pkg
//           )
//         );
//       } else {
//         setPackages(prev => [...prev, { ...currentPackage, _id: `PKG-${Math.random().toString(36).substr(2, 5).toUpperCase()}` }]);
//       }

//       // Reset forms
//       resetForms();
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError('Failed to save package');
//     }
//   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!currentPackage.name) {
//       setError('Package name is required');
//       return;
//     }
//     if (!currentPackage.category) {
//       setError('Package category is required');
//       return;
//     }
  
//     try {
//       let response;
//       if (isEditing) {
//         response = await axios.put(
//           `http://localhost:5000/api/packages/${editingPackageId}`,
//           currentPackage
//         );
//       } else {
//         response = await axios.post(
//           'http://localhost:5000/api/packages',
//           currentPackage
//         );
//       }
  
//       // Only update state after successful API response
//       if (response.data && response.data.success) {
//         fetchPackages(); // Refresh the list from the database
//         resetForms();
//       } else {
//         setError(response.data.message || 'Failed to save package');
//       }
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError(err.response?.data?.message || 'Failed to save package');
//     }
//   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation (keep your existing validation)
//    // Validation
//     if (!currentPackage.name) {
//       setError('Package name is required');
//       return;
//     }
//     if (!currentPackage.category) {
//       setError('Package category is required');
//       return;
//     }
//     try {
//       let response;
//       if (isEditing) {
//         response = await axios.put(
//           `http://localhost:5000/api/packages/${editingPackageId}`,
//           currentPackage
//         );
//       } else {
//         response = await axios.post(
//           'http://localhost:5000/api/packages',
//           currentPackage
//         );
//       }
  
//       if (response.data && response.data.success) {
//         // Update local state immediately with the response data
//         if (isEditing) {
//           setPackages(prev => 
//             prev.map(pkg => 
//               pkg._id === editingPackageId ? response.data.package : pkg
//             )
//           );
//         } else {
//           setPackages(prev => [...prev, response.data.package]);
//         }
//         resetForms(); // This should now work properly (see fix #3 below)
//       } else {
//         setError(response.data.message || 'Failed to save package');
//       }
//     } catch (err) {
//       console.error('Package submission error:', err);
//       setError(err.response?.data?.message || 'Failed to save package');
//     }
//   };
  // Delete package
//   const deletePackage = (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       setPackages(prev => prev.filter(pkg => pkg._id !== packageId));
//     }
//   };
// const deletePackage = async (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:5000/api/packages/${packageId}`
//         );
//         if (response.data.success) {
//           fetchPackages(); // Refresh the list
//         } else {
//           setError('Failed to delete package');
//         }
//       } catch (err) {
//         setError('Failed to delete package');
//         console.error('Delete error:', err);
//       }
//     }
//   };
// const deletePackage = async (packageId) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:5000/api/packages/${packageId}`
//         );
//         if (response.data.success) {
//           // Update local state immediately
//           setPackages(prev => prev.filter(pkg => pkg._id !== packageId));
//         } else {
//           setError('Failed to delete package');
//         }
//       } catch (err) {
//         setError('Failed to delete package');
//         console.error('Delete error:', err);
//       }
//     }
//   };
  // Start editing a package
  const startEditPackage = (pkg) => {
    setCurrentPackage({ ...pkg });
    setIsEditing(true);
    setEditingPackageId(pkg._id);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Package Creation/Editing Form */}
        <DebugPanel />
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Package' : 'Create New Package'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Package Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Package Name"
                value={currentPackage.name}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev, 
                  name: e.target.value
                }))}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={currentPackage.category}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev, 
                  category: e.target.value
                }))}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Package Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={currentPackage.difficulty}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev, 
                  difficulty: e.target.value
                }))}
                className="w-full p-2 border rounded"
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              <select
                value={currentPackage.bestSeason}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev, 
                  bestSeason: e.target.value
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Best Season</option>
                {SEASONS.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Recommended For and Total Spots */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Recommended For (comma-separated)"
                value={currentPackage.recommendedFor.join(', ')}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev,
                  recommendedFor: e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item)
                }))}
                className="w-full p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Total Spots"
                  value={currentPackage.totalSpots}
                  onChange={(e) => setCurrentPackage(prev => ({
                    ...prev, 
                    totalSpots: parseInt(e.target.value) || 0
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Spots Left"
                  value={currentPackage.spotsLeft}
                  onChange={(e) => setCurrentPackage(prev => ({
                    ...prev, 
                    spotsLeft: parseInt(e.target.value) || 0
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Booking Deadline */}
            <div>
              <input
                type="datetime-local"
                placeholder="Booking Deadline"
                value={currentPackage.bookingDeadline 
                  ? new Date(currentPackage.bookingDeadline).toISOString().slice(0, 16) 
                  : ''}
                onChange={(e) => setCurrentPackage(prev => ({
                  ...prev, 
                  bookingDeadline: new Date(e.target.value).toISOString()
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Features Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Features</h3>
              
              {/* Feature Main Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Feature Title"
                  value={currentFeature.title}
                  onChange={(e) => setCurrentFeature(prev => ({
                    ...prev, 
                    title: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Feature Subtitle"
                  value={currentFeature.subtitle}
                  onChange={(e) => setCurrentFeature(prev => ({
                    ...prev, 
                    subtitle: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* More Feature Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Icon"
                  value={currentFeature.icon}
                  onChange={(e) => setCurrentFeature(prev => ({
                    ...prev, 
                    icon: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Bg Class"
                    value={currentFeature.bgClass}
                    onChange={(e) => setCurrentFeature(prev => ({
                      ...prev, 
                      bgClass: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Icon Bg Class"
                    value={currentFeature.iconBgClass}
                    onChange={(e) => setCurrentFeature(prev => ({
                      ...prev, 
                      iconBgClass: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Hover Class"
                    value={currentFeature.hoverClass}
                    onChange={(e) => setCurrentFeature(prev => ({
                      ...prev, 
                      hoverClass: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Feature Content Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Content Name"
                  value={currentFeatureContent.name}
                  onChange={(e) => setCurrentFeatureContent(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Slug"
                  value={currentFeatureContent.slug}
                  onChange={(e) => setCurrentFeatureContent(prev => ({
                    ...prev, 
                    slug: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* More Feature Content Fields */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <textarea
                  placeholder="Description"
                  value={currentFeatureContent.description}
                  onChange={(e) => setCurrentFeatureContent(prev => ({
                    ...prev, 
                    description: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Original Price"
                    value={currentFeatureContent.originalPrice}
                    onChange={(e) => setCurrentFeatureContent(prev => ({
                      ...prev, 
                      originalPrice: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Discounted Price"
                    value={currentFeatureContent.discountedPrice}
                    onChange={(e) => setCurrentFeatureContent(prev => ({
                      ...prev, 
                      discountedPrice: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Duration and Valid Dates */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Duration"
                  value={currentFeatureContent.duration}
                  onChange={(e) => setCurrentFeatureContent(prev => ({
                    ...prev, 
                    duration: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Valid Dates"
                  value={currentFeatureContent.validDates}
                  onChange={(e) => setCurrentFeatureContent(prev => ({
                    ...prev, 
                    validDates: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Includes and Excludes */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block mb-1">Includes:</label>
                  <input
                    type="text"
                    placeholder="Add Include (press Enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (e.target.value.trim()) {
                          setCurrentFeatureContent(prev => ({
                            ...prev,
                            includes: [...(prev.includes || []), e.target.value.trim()]
                          }));
                          e.target.value = '';
                        }
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentFeatureContent.includes?.map((inc, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 px-2 py-1 rounded flex items-center"
                      >
                        {inc}
                        <button
                          type="button"
                          onClick={() => setCurrentFeatureContent(prev => ({
                            ...prev,
                            includes: prev.includes.filter((_, i) => i !== index)
                          }))}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Excludes:</label>
                  <input
                    type="text"
                    placeholder="Add Exclude (press Enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (e.target.value.trim()) {
                          setCurrentFeatureContent(prev => ({
                            ...prev,
                            excludes: [...(prev.excludes || []), e.target.value.trim()]
                          }));
                          e.target.value = '';
                        }
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentFeatureContent.excludes?.map((exc, index) => (
                      <span 
                        key={index} 
                        className="bg-red-100 px-2 py-1 rounded flex items-center"
                      >
                        {exc}
                        <button
                          type="button"
                          onClick={() => setCurrentFeatureContent(prev => ({
                            ...prev,
                            excludes: prev.excludes.filter((_, i) => i !== index)
                          }))}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots and Popular Toggle */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block mb-1">Time Slots:</label>
                  <input
                    type="text"
                    placeholder="Add Time Slot (press Enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (e.target.value.trim()) {
                          setCurrentFeatureContent(prev => ({
                            ...prev,
                            timeSlots: [...(prev.timeSlots || []), e.target.value.trim()]
                          }));
                          e.target.value = '';
                        }
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentFeatureContent.timeSlots?.map((slot, index) => (
                      <span 
                        key={index} 
                        className="bg-green-100 px-2 py-1 rounded flex items-center"
                      >
                        {slot}
                        <button
                          type="button"
                          onClick={() => setCurrentFeatureContent(prev => ({
                            ...prev,
                            timeSlots: prev.timeSlots.filter((_, i) => i !== index)
                          }))}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={currentFeatureContent.popular}
                    onChange={(e) => setCurrentFeatureContent(prev => ({
                      ...prev,
                      popular: e.target.checked
                    }))}
                    className="h-4 w-4"
                  />
                  <label htmlFor="popular">Popular Package</label>
                </div>
              </div>

              {/* Add Feature Content Button */}
              <button 
                type="button"
                onClick={addFeatureContent}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
              >
                Add Feature Content
              </button>

              {/* Add Feature Button */}
              <button 
                type="button"
                onClick={addFeature}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Feature
              </button>

              {/* Display Added Features */}
              {currentPackage.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Current Features:</h4>
                  {currentPackage.features.map((f, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
                    >
                      <div>
                        <strong>{f.title}</strong>
                        <p className="text-sm text-gray-600">{f.subtitle}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentPackage(prev => ({
                          ...prev,
                          features: prev.features.filter((_, i) => i !== index)
                        }))}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Itinerary Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Itinerary</h3>
              
              {/* Itinerary Day Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Day Title"
                  value={currentItineraryDay.title}
                  onChange={(e) => setCurrentItineraryDay(prev => ({
                    ...prev, 
                    title: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Accommodation"
                  value={currentItineraryDay.accommodation}
                  onChange={(e) => setCurrentItineraryDay(prev => ({
                    ...prev, 
                    accommodation: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <textarea
                placeholder="Day Description"
                value={currentItineraryDay.description}
                onChange={(e) => setCurrentItineraryDay(prev => ({
                  ...prev, 
                  description: e.target.value
                }))}
                className="w-full p-2 border rounded mb-2"
                rows={2}
              />

              {/* Meals */}
              <div className="grid md:grid-cols-3 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Breakfast"
                  value={currentItineraryDay.meals.breakfast}
                  onChange={(e) => setCurrentItineraryDay(prev => ({
                    ...prev, 
                    meals: {
                      ...prev.meals,
                      breakfast: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Lunch"
                  value={currentItineraryDay.meals.lunch}
                  onChange={(e) => setCurrentItineraryDay(prev => ({
                    ...prev, 
                    meals: {
                      ...prev.meals,
                      lunch: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Dinner"
                  value={currentItineraryDay.meals.dinner}
                  onChange={(e) => setCurrentItineraryDay(prev => ({
                    ...prev, 
                    meals: {
                      ...prev.meals,
                      dinner: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Activities */}
              <div>
                <label className="block mb-1">Activities:</label>
                <input
                  type="text"
                  placeholder="Add Activity (press Enter)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    //   if (e.target.value.trim
                    if (e.target.value.trim()) {
                        setCurrentItineraryDay(prev => ({
                          ...prev,
                          activities: [...(prev.activities || []), e.target.value.trim()]
                        }));
                        e.target.value = '';
                      }
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentItineraryDay.activities?.map((activity, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-100 px-2 py-1 rounded flex items-center"
                    >
                      {activity}
                      <button
                        type="button"
                        onClick={() => setCurrentItineraryDay(prev => ({
                          ...prev,
                          activities: prev.activities.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
    
              {/* Add Itinerary Day Button */}
              <button 
                type="button"
                onClick={addItineraryDay}
                className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 mt-4"
              >
                Add Itinerary Day
              </button>
    
              {/* Display Added Itinerary Days */}
              {currentPackage.itinerary.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Current Itinerary:</h4>
                  {currentPackage.itinerary.map((day, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 p-3 rounded mb-2"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <strong>Day {day.day}: {day.title}</strong>
                        <button
                          type="button"
                          onClick={() => setCurrentPackage(prev => ({
                            ...prev,
                            itinerary: prev.itinerary.filter((_, i) => i !== index)
                          }))}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm mb-1">{day.description}</p>
                      <div className="text-xs text-gray-600">
                        <p>Meals: Breakfast: {day.meals.breakfast || '-'}, 
                          Lunch: {day.meals.lunch || '-'}, 
                          Dinner: {day.meals.dinner || '-'}</p>
                        <p>Accommodation: {day.accommodation || '-'}</p>
                        {day.activities.length > 0 && (
                          <p>Activities: {day.activities.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
    
            {/* Submit and Cancel Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                {isEditing ? 'Update Package' : 'Create Package'}
              </button>
              <button
                type="button"
                onClick={resetForms}
                className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
    
            {/* Error Display */}
            {error && (
              <div className="text-red-500 mt-2">
                {error}
              </div>
            )}
          </form>
        </div>
    
        {/* Package List */}
        {/* <div>
          <h2 className="text-2xl font-bold mb-6">Package List</h2>
          <div className="space-y-4">
            {packages.length === 0 ? (
              <p>No packages available</p>
            ) : (
              packages.map(pkg => (
                <div key={pkg._id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">{pkg.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditPackage(pkg)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePackage(pkg._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Difficulty: {pkg.difficulty}</p>
                    <p>Best Season: {pkg.bestSeason}</p>
                    <p>Spots: {pkg.spotsLeft}/{pkg.totalSpots}</p>
                    <p>Features: {pkg.features?.length || 0}</p>
                    <p>Itinerary Days: {pkg.itinerary?.length || 0}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div> */}


{/* </div>
    </div>
      );
    };
    
    export default PackageManagement; */}


     {/* Updated Package List */}
     <div>
          <h2 className="text-2xl font-bold mb-6">Package List</h2>
          
          {packagesByCategory.map(({ category, packages: categoryPackages }) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                {category} ({categoryPackages.length})
              </h3>
              
              {categoryPackages.length === 0 ? (
                <p className="text-gray-500">No packages in this category</p>
              ) : (
                <div className="space-y-4">
                  {categoryPackages.map(pkg => (
                    <div key={pkg._id} className="border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{pkg.name}</h3>
                          <p className="text-sm text-gray-600">
                            Difficulty: {pkg.difficulty} | Best Season: {pkg.bestSeason}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditPackage(pkg)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePackage(pkg._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <p>Spots: {pkg.spotsLeft}/{pkg.totalSpots}</p>
                        <p>Features: {pkg.features?.length || 0}</p>
                        <p>Itinerary Days: {pkg.itinerary?.length || 0}</p>
                        {pkg.bookingDeadline && (
                          <p>Deadline: {new Date(pkg.bookingDeadline).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Show uncategorized packages if any */}
          {packages.some(pkg => !CATEGORIES.includes(pkg.category)) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                Uncategorized Packages
              </h3>
              <div className="space-y-4">
                {packages
                  .filter(pkg => !CATEGORIES.includes(pkg.category))
                  .map(pkg => (
                    <div key={pkg._id} className="border rounded-lg p-4 shadow-sm">
                      {/* Same package item structure as above */}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;