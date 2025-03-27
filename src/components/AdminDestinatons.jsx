


// import { useState, useEffect } from 'react';
// import { PlusCircle, Edit, Trash2, Upload, X, Map, Utensils, Building, Landmark,  Mountain, Camera,  Hotel } from 'lucide-react';

// const DestinationManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   const iconOptions = [
//     { value: 'map', label: 'Map', icon: Map },
//     { value: 'utensils', label: 'Restaurant', icon: Utensils },
//     { value: 'building', label: 'Building', icon: Building },
//     { value: 'landmark', label: 'Landmark', icon: Landmark },
//     // { value: 'beach', label: 'Beach', icon: Beach },
//     { value: 'mountain', label: 'Mountain', icon: Mountain },
//     { value: 'camera', label: 'Tourist Spot', icon: Camera },
//     // { value: 'museum', label: 'Museum', icon: Museum },
//     { value: 'hotel', label: 'Hotel', icon: Hotel },
//   ];
  
//   const initialFormState = {
//     title: '',
//     description: '',
//     icon: 'map',
//     details: [''],
//     image: '',
//     tourDetails: {
//       duration: '',
//       price: '',
//       bestTime: '',
//       inclusions: ['']
//     }
//   };
  
//   const [formData, setFormData] = useState(initialFormState);

//   // ... (keep existing fetchCategories, useEffect, showAlert, handleImageUpload)
// const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/destinations');
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       showAlert('Error fetching destinations', 'error');
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
//   };

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('http://localhost:5000/api/upload', {
//         method: 'POST',
//         body: formData
//       });
//       // setPreviewUrl(fullImageUrl); // Update preview
//       // alert('Image uploaded successfully!');
//       const data = await response.json();
//       return data.imageUrl;
//     } catch (error) {
//       showAlert('Error uploading image', 'error');
//       return null;
//     }
//   };

//   const handleDetailsChange = (index, value) => {
//     const newDetails = [...formData.details];
//     newDetails[index] = value;
//     setFormData({ ...formData, details: newDetails });
//   };

//   const handleInclusionsChange = (index, value) => {
//     const newInclusions = [...formData.tourDetails.inclusions];
//     newInclusions[index] = value;
//     setFormData({
//       ...formData,
//       tourDetails: {
//         ...formData.tourDetails,
//         inclusions: newInclusions
//       }
//     });
//   };

//   const addDetail = () => {
//     setFormData({
//       ...formData,
//       details: [...formData.details, '']
//     });
//   };

//   const addInclusion = () => {
//     setFormData({
//       ...formData,
//       tourDetails: {
//         ...formData.tourDetails,
//         inclusions: [...formData.tourDetails.inclusions, '']
//       }
//     });
//   };

//   const removeDetail = (index) => {
//     const newDetails = formData.details.filter((_, i) => i !== index);
//     setFormData({ ...formData, details: newDetails });
//   };

//   const removeInclusion = (index) => {
//     const newInclusions = formData.tourDetails.inclusions.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       tourDetails: {
//         ...formData.tourDetails,
//         inclusions: newInclusions
//       }
//     });
//   };

//   // ... (keep existing handleSubmit, handleDelete, resetForm, CustomAlert)
//  const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       let imageUrl = formData.image;
//       if (imageFile) {
//         imageUrl = await handleImageUpload(imageFile);
//         if (!imageUrl) return;
//       }

//       const submitData = {
//         ...formData,
//         image: imageUrl
//       };

//       const url = isEditing 
//         ? `http://localhost:5000/api/destinations/${selectedCategory}/items/${selectedItem._id}`
//         // : `http://localhost:5000/api//${selectedCategory}/items`;
//         : `http://localhost:5000/api/destinations/${selectedCategory}/items`;
      
//       const response = await fetch(url, {
//         method: isEditing ? 'PATCH' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(submitData)
//       });

//       if (response.ok) {
//         showAlert(`Destination ${isEditing ? 'updated' : 'added'} successfully`, 'success');
//         fetchCategories();
//         resetForm();
//       }
//     } catch (error) {
//       showAlert('Error saving destination', 'error');
//     }
//   };
//   // const fullImageUrl = `fullImageUrl${item.image}`;

//   // Delete destination
//   const handleDelete = async (categoryTitle, itemId) => {
//     if (!window.confirm('Are you sure you want to delete this destination?')) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/destinations/${categoryTitle}/items/${itemId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         showAlert('Destination deleted successfully', 'success');
//         fetchCategories();
//       }
//     } catch (error) {
//       showAlert('Error deleting destination', 'error');
//     }
//   };

//   const resetForm = () => {
//     setFormData(initialFormState);
//     setIsEditing(false);
//     setSelectedItem(null);
//     setImageFile(null);
//   };

//   // Custom Alert Component
//   const CustomAlert = ({ message, type }) => {
//     const alertStyles = {
//       success: 'bg-green-50 text-green-800',
//       error: 'bg-red-50 text-red-800',
//     };

//     return (
//       <div className={`p-4 mb-4 rounded ${alertStyles[type]}`}>
//         {message}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {alert.show && <CustomAlert message={alert.message} type={alert.type} />}

//       {/* Category Selection */}
//       <div className="mb-6">
//         <select
//           className="w-full p-2 border rounded"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">Select Category</option>
//           <option value="Top Destinations">Top Destinations</option>
//           <option value="Food Destinations">Food Destinations</option>
//           <option value="Ancient Destinations">Ancient Destinations</option>
//         </select>
//       </div>

//       {/* Destination Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Title"
//             className="p-2 border rounded"
//             value={formData.title}
//             onChange={(e) => setFormData({...formData, title: e.target.value})}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             className="p-2 border rounded"
//             value={formData.description}
//             onChange={(e) => setFormData({...formData, description: e.target.value})}
//           />
//         </div>

//         {/* Icon Selection */}
//         <div className="form-group">
//           <label className="block mb-2">Select Icon</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={formData.icon}
//             onChange={(e) => setFormData({...formData, icon: e.target.value})}
//           >
//             {iconOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Details Section */}
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <h3 className="font-semibold">Details</h3>
//             <button
//               type="button"
//               onClick={addDetail}
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <PlusCircle className="w-5 h-5" />
//             </button>
//           </div>
//           {formData.details.map((detail, index) => (
//             <div key={index} className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder={`Detail ${index + 1}`}
//                 className="flex-1 p-2 border rounded"
//                 value={detail}
//                 onChange={(e) => handleDetailsChange(index, e.target.value)}
//               />
//               {formData.details.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeDetail(index)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Image Upload */}
//         <div className="border-2 border-dashed p-4 rounded">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="hidden"
//             id="imageUpload"
//           />
//           <label 
//             htmlFor="imageUpload"
//             className="flex items-center justify-center space-x-2 cursor-pointer"
//           >
//             <Upload className="w-6 h-6" />
//             <span>{imageFile ? imageFile.name : 'Upload Image'}</span>
//           </label>
//         </div>

//         {/* Tour Details */}
//         <div className="space-y-2">
//           <h3 className="font-semibold">Tour Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Duration"
//               className="p-2 border rounded"
//               value={formData.tourDetails.duration}
//               onChange={(e) => setFormData({
//                 ...formData,
//                 tourDetails: {...formData.tourDetails, duration: e.target.value}
//               })}
//             />
//             <input
//               type="text"
//               placeholder="Price"
//               className="p-2 border rounded"
//               value={formData.tourDetails.price}
//               onChange={(e) => setFormData({
//                 ...formData,
//                 tourDetails: {...formData.tourDetails, price: e.target.value}
//               })}
//             />
//             <input
//               type="text"
//               placeholder="Best Time"
//               className="p-2 border rounded"
//               value={formData.tourDetails.bestTime}
//               onChange={(e) => setFormData({
//                 ...formData,
//                 tourDetails: {...formData.tourDetails, bestTime: e.target.value}
//               })}
//             />
//           </div>

//           {/* Inclusions */}
//           <div className="space-y-2 mt-4">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold">Inclusions</h4>
//               <button
//                 type="button"
//                 onClick={addInclusion}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 <PlusCircle className="w-5 h-5" />
//               </button>
//             </div>
//             {formData.tourDetails.inclusions.map((inclusion, index) => (
//               <div key={index} className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder={`Inclusion ${index + 1}`}
//                   className="flex-1 p-2 border rounded"
//                   value={inclusion}
//                   onChange={(e) => handleInclusionsChange(index, e.target.value)}
//                 />
//                 {formData.tourDetails.inclusions.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeInclusion(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-4 py-2 bg-gray-200 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             disabled={!selectedCategory}
//           >
//             {isEditing ? 'Update Destination' : 'Add Destination'}
//           </button>
//         </div>
//       </form>

//       {/* Keep existing Destinations List section */}
//       <div className="mt-8 space-y-4">
//         {categories.map(category => (
//           <div key={category._id} className="border rounded p-4">
//             <h2 className="text-xl font-bold mb-4">{category.title}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {category.items.map(item => (
//                 <div key={item._id} className="border rounded p-4">
//                   <img 
//                     src={`http://localhost:5000${item.image}` }
//                     alt={item.title} 
//                     onError={(e) => { console.error("Image failed to load", e); }}
//                     className="w-full h-48 object-cover mb-2 rounded"
//                     // {console.log("Image URL:", item.image)}
//                   />
//                   <h3 className="font-semibold">{item.title}</h3>
//                   <p className="text-sm text-gray-600">{item.description}</p>
//                   <div className="mt-2 flex justify-end space-x-2">
//                     <button
//                       onClick={() => {
//                         setIsEditing(true);
//                         setSelectedItem(item);
//                         setFormData(item);
//                         setSelectedCategory(category.title);
//                       }}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(category.title, item._id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DestinationManager;

import { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Upload, X, Map, Utensils, Building, Landmark, Mountain, Camera, Hotel, Star, Calendar } from 'lucide-react';

const DestinationManager = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const iconOptions = [
    { value: 'map', label: 'Map', icon: Map },
    { value: 'utensils', label: 'Restaurant', icon: Utensils },
    { value: 'building', label: 'Building', icon: Building },
    { value: 'landmark', label: 'Landmark', icon: Landmark },
    { value: 'mountain', label: 'Mountain', icon: Mountain },
    { value: 'camera', label: 'Tourist Spot', icon: Camera },
    { value: 'hotel', label: 'Hotel', icon: Hotel },
  ];
  
  const initialFormState = {
    title: '',
    description: '',
    icon: 'map',
    details: [''],
    image: '',
    tourDetails: {
      duration: '',
      price: '',
      originalPrice: '',
      location:"",
      discount: '',
      bestTime: '',
      inclusions: [''],
      notIncluded: ['']
    },
    rating: 0,
    reviews: 0,
    itinerary: [
      {
        day: '1',
        title: '',
        activities: [''],
        meals: ['']
      }
    ]
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/destinations');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      showAlert('Error fetching destinations', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      showAlert('Error uploading image', 'error');
      return null;
    }
  };

  const handleDetailsChange = (index, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const handleInclusionsChange = (index, value) => {
    const newInclusions = [...(formData.tourDetails?.inclusions || [''])];
    newInclusions[index] = value;
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        inclusions: newInclusions
      }
    });
  };

  const handleNotIncludedChange = (index, value) => {
    const newNotIncluded = [...(formData.tourDetails?.notIncluded || [''])];
    newNotIncluded[index] = value;
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        notIncluded: newNotIncluded
      }
    });
  };

  // Itinerary Handlers
  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[index]) {
      newItinerary[index] = { day: '', title: '', activities: [''], meals: [''] };
    }
    newItinerary[index] = {
      ...newItinerary[index],
      [field]: value
    };
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleItineraryActivityChange = (dayIndex, activityIndex, value) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) {
      newItinerary[dayIndex] = { day: '', title: '', activities: [''], meals: [''] };
    }
    
    const newActivities = [...(newItinerary[dayIndex].activities || [''])];
    newActivities[activityIndex] = value;
    
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      activities: newActivities
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleItineraryMealChange = (dayIndex, mealIndex, value) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) {
      newItinerary[dayIndex] = { day: '', title: '', activities: [''], meals: [''] };
    }
    
    const newMeals = [...(newItinerary[dayIndex].meals || [''])];
    newMeals[mealIndex] = value;
    
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      meals: newMeals
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const addItineraryDay = () => {
    const currentItinerary = [...(formData.itinerary || [])];
    const nextDay = (currentItinerary.length + 1).toString();
    
    setFormData({
      ...formData,
      itinerary: [
        ...currentItinerary,
        { day: nextDay, title: '', activities: [''], meals: [''] }
      ]
    });
  };

  const removeItineraryDay = (index) => {
    const newItinerary = (formData.itinerary || []).filter((_, i) => i !== index);
    // Renumber days after removal
    newItinerary.forEach((day, i) => {
      day.day = (i + 1).toString();
    });
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const addItineraryActivity = (dayIndex) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) return;
    
    const newActivities = [...(newItinerary[dayIndex].activities || []), ''];
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      activities: newActivities
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const removeItineraryActivity = (dayIndex, activityIndex) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) return;
    
    const newActivities = (newItinerary[dayIndex].activities || []).filter((_, i) => i !== activityIndex);
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      activities: newActivities.length ? newActivities : ['']
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const addItineraryMeal = (dayIndex) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) return;
    
    const newMeals = [...(newItinerary[dayIndex].meals || []), ''];
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      meals: newMeals
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const removeItineraryMeal = (dayIndex, mealIndex) => {
    const newItinerary = [...(formData.itinerary || [])];
    if (!newItinerary[dayIndex]) return;
    
    const newMeals = (newItinerary[dayIndex].meals || []).filter((_, i) => i !== mealIndex);
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      meals: newMeals.length ? newMeals : ['']
    };
    
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const addDetail = () => {
    setFormData({
      ...formData,
      details: [...(formData.details || []), '']
    });
  };

  const addInclusion = () => {
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        inclusions: [...(formData.tourDetails?.inclusions || []), '']
      }
    });
  };

  const addNotIncluded = () => {
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        notIncluded: [...(formData.tourDetails?.notIncluded || []), '']
      }
    });
  };

  const removeDetail = (index) => {
    const newDetails = (formData.details || []).filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails.length ? newDetails : [''] });
  };

  const removeInclusion = (index) => {
    const newInclusions = (formData.tourDetails?.inclusions || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        inclusions: newInclusions.length ? newInclusions : ['']
      }
    });
  };

  const removeNotIncluded = (index) => {
    const newNotIncluded = (formData.tourDetails?.notIncluded || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tourDetails: {
        ...(formData.tourDetails || {}),
        notIncluded: newNotIncluded.length ? newNotIncluded : ['']
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
        if (!imageUrl) return;
      }

      const submitData = {
        ...formData,
        image: imageUrl
      };

      const url = isEditing 
        ? `https://backend-1-7zwm.onrender.com/api/destinations/${selectedCategory}/items/${selectedItem._id}`
        : `https://backend-1-7zwm.onrender.com/api/destinations/${selectedCategory}/items`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        showAlert(`Destination ${isEditing ? 'updated' : 'added'} successfully`, 'success');
        fetchCategories();
        resetForm();
      }
    } catch (error) {
      showAlert('Error saving destination', 'error');
    }
  };

  // Delete destination
  const handleDelete = async (categoryTitle, itemId) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;

    try {
      const response = await fetch(`https://backend-1-7zwm.onrender.com/api/destinations/${categoryTitle}/items/${itemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showAlert('Destination deleted successfully', 'success');
        fetchCategories();
      }
    } catch (error) {
      showAlert('Error deleting destination', 'error');
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setSelectedItem(null);
    setImageFile(null);
  };

  // Custom Alert Component
  const CustomAlert = ({ message, type }) => {
    const alertStyles = {
      success: 'bg-green-50 text-green-800',
      error: 'bg-red-50 text-red-800',
    };

    return (
      <div className={`p-4 mb-4 rounded ${alertStyles[type]}`}>
        {message}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {alert.show && <CustomAlert message={alert.message} type={alert.type} />}

      {/* Category Selection */}
      <div className="mb-6">
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Top Destinations">Top Destinations</option>
          <option value="Food Destinations">Food Destinations</option>
          <option value="Ancient Destinations">Ancient Destinations</option>
        </select>
      </div>

      {/* Destination Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={formData.title || ''}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded"
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        {/* Rating Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Rating (0.0 - 5.0)</label>
            <input
              type="number"
              step="0"
              min="0.1"
              max="5.0"
              className="p-2 border rounded w-full"
              value={formData.rating || 0}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div>
            <label className="block mb-2">Number of Reviews</label>
            <input
              type="number"
              min="0"
              className="p-2 border rounded w-full"
              value={formData.reviews || 0}
              onChange={(e) => setFormData({...formData, reviews: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        {/* Icon Selection */}
        <div className="form-group">
          <label className="block mb-2">Select Icon</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.icon || 'map'}
            onChange={(e) => setFormData({...formData, icon: e.target.value})}
          >
            {iconOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Details Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Details</h3>
            <button
              type="button"
              onClick={addDetail}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          {(formData.details || ['']).map((detail, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`Detail ${index + 1}`}
                className="flex-1 p-2 border rounded"
                value={detail || ''}
                onChange={(e) => handleDetailsChange(index, e.target.value)}
              />
              {(formData.details || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed p-4 rounded">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
            id="imageUpload"
          />
          <label 
            htmlFor="imageUpload"
            className="flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Upload className="w-6 h-6" />
            <span>{imageFile ? imageFile.name : (formData.image ? 'Change Image' : 'Upload Image')}</span>
          </label>
          {formData.image && !imageFile && (
            <div className="mt-2 text-center text-sm text-gray-500">
              Current image: {formData.image.split('/').pop()}
            </div>
          )}
        </div>

        {/* Tour Details */}
        <div className="space-y-2">
          <h3 className="font-semibold">Tour Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Duration"
              className="p-2 border rounded"
              value={formData.tourDetails?.duration || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), duration: e.target.value}
              })}
            />
             <input
              type="text"
              placeholder="location"
              className="p-2 border rounded"
              value={formData.tourDetails?.location || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), location: e.target.value}
              })}
            />
            <input
              type="text"
              placeholder="Current Price"
              className="p-2 border rounded"
              value={formData.tourDetails?.price || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), price: e.target.value}
              })}
            />
            <input
              type="text"
              placeholder="Original Price"
              className="p-2 border rounded"
              value={formData.tourDetails?.originalPrice || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), originalPrice: e.target.value}
              })}
            />
            <input
              type="text"
              placeholder="Discount (%)"
              className="p-2 border rounded"
              value={formData.tourDetails?.discount || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), discount: e.target.value}
              })}
            />
            <input
              type="text"
              placeholder="Best Time"
              className="p-2 border rounded"
              value={formData.tourDetails?.bestTime || ''}
              onChange={(e) => setFormData({
                ...formData,
                tourDetails: {...(formData.tourDetails || {}), bestTime: e.target.value}
              })}
            />
          </div>

          {/* Inclusions */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Inclusions</h4>
              <button
                type="button"
                onClick={addInclusion}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            {(formData.tourDetails?.inclusions || ['']).map((inclusion, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Inclusion ${index + 1}`}
                  className="flex-1 p-2 border rounded"
                  value={inclusion || ''}
                  onChange={(e) => handleInclusionsChange(index, e.target.value)}
                />
                {(formData.tourDetails?.inclusions || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Not Included */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Not Included</h4>
              <button
                type="button"
                onClick={addNotIncluded}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            {(formData.tourDetails?.notIncluded || ['']).map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Not Included ${index + 1}`}
                  className="flex-1 p-2 border rounded"
                  value={item || ''}
                  onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                />
                {(formData.tourDetails?.notIncluded || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNotIncluded(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="space-y-4 border p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Itinerary</h3>
            <button
              type="button"
              onClick={addItineraryDay}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          
          {(formData.itinerary || []).map((day, dayIndex) => (
            <div key={dayIndex} className="border rounded p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <h4 className="font-medium">Day {day.day || dayIndex + 1}</h4>
                </div>
                {(formData.itinerary || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(dayIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Day Number"
                  className="p-2 border rounded"
                  value={day.day || ''}
                  onChange={(e) => handleItineraryChange(dayIndex, 'day', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Day Title"
                  className="p-2 border rounded"
                  value={day.title || ''}
                  onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
                />
              </div>
              
              {/* Activities */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium">Activities</h5>
                  <button
                    type="button"
                    onClick={() => addItineraryActivity(dayIndex)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
                
                {(day.activities || ['']).map((activity, actIndex) => (
                  <div key={actIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Activity ${actIndex + 1}`}
                      className="flex-1 p-2 border rounded"
                      value={activity || ''}
                      onChange={(e) => handleItineraryActivityChange(dayIndex, actIndex, e.target.value)}
                    />
                    {(day.activities || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItineraryActivity(dayIndex, actIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Meals */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium">Meals</h5>
                  <button
                    type="button"
                    onClick={() => addItineraryMeal(dayIndex)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
                
                {(day.meals || ['']).map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Meal ${mealIndex + 1}`}
                      className="flex-1 p-2 border rounded"
                      value={meal || ''}
                      onChange={(e) => handleItineraryMealChange(dayIndex, mealIndex, e.target.value)}
                    />
                    {(day.meals || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItineraryMeal(dayIndex, mealIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={!selectedCategory}
          >
            {isEditing ? 'Update Destination' : 'Add Destination'}
          </button>
        </div>
      </form>

      {/* Destinations List */}
      <div className="mt-8 space-y-4">
        {categories.map(category => (
          <div key={category._id} className="border rounded p-4">
            <h2 className="text-xl font-bold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map(item => (
                <div key={item._id} className="border rounded p-4">
                  <img 
                    src={`https://backend-1-7zwm.onrender.com${item.image}` }
                    alt={item.title} 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found"; }}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-600">{item.description || 'No description'}</p>
                  
                  {/* Display Rating */}
                  {(item.rating > 0 || item.reviewCount > 0) && (
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{(item.rating || 0).toFixed(1)}</span>
                      </div>
                      {item.reviewCount > 0 && (
                        <span className="ml-1 text-sm text-gray-500">({item.reviewCount})</span>
                      )}
                    </div>
                  )}
                  
                  {/* Display Price Info */}
                  {item.tourDetails?.price && (
                    <div className="mt-1">
                      <span className="font-bold">${item.tourDetails.price}</span>
                      {item.tourDetails?.originalPrice && (
                        <span className="text-gray-500 line-through ml-2">
                          ${item.tourDetails.originalPrice}
                        </span>
                      )}
                      {item.tourDetails?.discount && (
                        <span className="text-green-600 ml-2">
                          {item.tourDetails.discount}% off
                        </span>
                      )}
                    </div>
                  )}
                  
                                  <div className="mt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...item,
                          tourDetails: item.tourDetails || {
                            duration: '',
                            price: '',
                            originalPrice: '',
                            discount: '',
                            bestTime: '',
                            inclusions: [''],
                            notIncluded: ['']
                          },
                          itinerary: item.itinerary || [
                            {
                              day: '1',
                              title: '',
                              activities: [''],
                              meals: ['']
                            }
                          ]
                        });
                        setIsEditing(true);
                        setSelectedItem(item);
                        setSelectedCategory(category.title);
                      }}
                      className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.title, item._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationManager;