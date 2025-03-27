// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Plus, X, Upload, Save } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState('');
  
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     tripDuration: '',
// //     dateStart: '',
// //     dateEnd: '',
// //     highlights: [{ title: '', description: '', icon: '' }],
// //     activities: [''],
// //   });

// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await axios.get('/api/destinations');
// //       setDestinations(response.data);
// //     } catch (err) {
// //       setError('Failed to fetch destinations');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // const handleImageChange = (e) => {
// //   //   const file = e.target.files[0];
// //   //   if (file) {
// //   //     setSelectedImage(file);
// //   //     const reader = new FileReader();
// //   //     reader.onloadend = () => {
// //   //       setPreviewUrl(reader.result);
// //   //     };
// //   //     reader.readAsDataURL(file);
// //   //   }
// //   // }
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
  
// //     const formData = new FormData();
// //     formData.append('image', file);
  
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/upload', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });
  
// //       const uploadedImagePath = response.data.imageUrl; // "/uploads/1739887359913.jpeg"
// //       const fullImageUrl = `http://localhost:5000${uploadedImagePath}`; // Full URL
  
// //       console.log('Full image URL:', fullImageUrl);
  
// //       setFormData((prev) => ({
// //         ...prev,
// //         image: fullImageUrl, // Save the full URL
// //       }));
// //     } catch (error) {
// //       console.error('Error uploading image:', error);
// //     }
// //   };
  


// //   const handleInputChange = (e, index, field, subfield = null) => {
// //     const { name, value } = e.target;
    
// //     if (field === 'highlights') {
// //       const newHighlights = [...formData.highlights];
// //       newHighlights[index][subfield] = value;
// //       setFormData({ ...formData, highlights: newHighlights });
// //     } else if (field === 'activities') {
// //       const newActivities = [...formData.activities];
// //       newActivities[index] = value;
// //       setFormData({ ...formData, activities: newActivities });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const addField = (field) => {
// //     if (field === 'highlights') {
// //       setFormData({
// //         ...formData,
// //         highlights: [...formData.highlights, { title: '', description: '', icon: '' }]
// //       });
// //     } else if (field === 'activities') {
// //       setFormData({
// //         ...formData,
// //         activities: [...formData.activities, '']
// //       });
// //     }
// //   };

// //   const removeField = (index, field) => {
// //     if (field === 'highlights') {
// //       const newHighlights = formData.highlights.filter((_, i) => i !== index);
// //       setFormData({ ...formData, highlights: newHighlights });
// //     } else if (field === 'activities') {
// //       const newActivities = formData.activities.filter((_, i) => i !== index);
// //       setFormData({ ...formData, activities: newActivities });
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formPayload = {
// //         ...formData,
// //         featuredImage: {
// //           url: previewUrl,
// //           caption: formData.title
// //         }
// //       };

// //       if (isEditing) {
// //         await axios.patch(`/api/destinations/${formData._id}`, formPayload);
// //       } else {
// //         await axios.post('/api/destinations', formPayload);
// //       }

// //       fetchDestinations();
// //       resetForm();
// //     } catch (err) {
// //       setError('Failed to save destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     setFormData(destination);
// //     setPreviewUrl(destination.featuredImage.url);
// //     setIsEditing(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this destination?')) {
// //       try {
// //         await axios.delete(`/api/destinations/${id}`);
// //         fetchDestinations();
// //       } catch (err) {
// //         setError('Failed to delete destination');
// //       }
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       subtitle: '',
// //       location: '',
// //       tripDuration: '',
// //       dateStart: '',
// //       dateEnd: '',
// //       highlights: [{ title: '', description: '', icon: '' }],
// //       activities: [''],
// //     });
// //     setPreviewUrl('');
// //     setSelectedImage(null);
// //     setIsEditing(false);
// //   };

// //   if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block mb-2">Title</label>
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2">Subtitle</label>
// //               <input
// //                 type="text"
// //                 name="subtitle"
// //                 value={formData.subtitle}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2">Location</label>
// //               <input
// //                 type="text"
// //                 name="location"
// //                 value={formData.location}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2">Trip Duration (days)</label>
// //               <input
// //                 type="number"
// //                 name="tripDuration"
// //                 value={formData.tripDuration}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2">Start Date</label>
// //               <input
// //                 type="date"
// //                 name="dateStart"
// //                 value={formData.dateStart}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2">End Date</label>
// //               <input
// //                 type="date"
// //                 name="dateEnd"
// //                 value={formData.dateEnd}
// //                 onChange={(e) => handleInputChange(e)}
// //                 className="w-full border rounded p-2"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-4">
// //             <h3 className="text-xl font-semibold">Highlights</h3>
// //             {formData.highlights.map((highlight, index) => (
// //               <div key={index} className="border rounded p-4">
// //                 <div className="flex justify-between mb-2">
// //                   <h4 className="font-medium">Highlight {index + 1}</h4>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeField(index, 'highlights')}
// //                     className="text-red-500"
// //                   >
// //                     <X size={20} />
// //                   </button>
// //                 </div>
// //                 <div className="space-y-2">
// //                   <input
// //                     type="text"
// //                     placeholder="Title"
// //                     value={highlight.title}
// //                     onChange={(e) => handleInputChange(e, index, 'highlights', 'title')}
// //                     className="w-full border rounded p-2"
// //                   />
// //                   <textarea
// //                     placeholder="Description"
// //                     value={highlight.description}
// //                     onChange={(e) => handleInputChange(e, index, 'highlights', 'description')}
// //                     className="w-full border rounded p-2"
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Icon name"
// //                     value={highlight.icon}
// //                     onChange={(e) => handleInputChange(e, index, 'highlights', 'icon')}
// //                     className="w-full border rounded p-2"
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //             <button
// //               type="button"
// //               onClick={() => addField('highlights')}
// //               className="flex items-center text-blue-500"
// //             >
// //               <Plus size={20} className="mr-2" /> Add Highlight
// //             </button>
// //           </div>

// //           <div className="space-y-4">
// //             <h3 className="text-xl font-semibold">Activities</h3>
// //             {formData.activities.map((activity, index) => (
// //               <div key={index} className="flex items-center space-x-2">
// //                 <input
// //                   type="text"
// //                   value={activity}
// //                   onChange={(e) => handleInputChange(e, index, 'activities')}
// //                   className="flex-1 border rounded p-2"
// //                   placeholder="Activity description"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => removeField(index, 'activities')}
// //                   className="text-red-500"
// //                 >
// //                   <X size={20} />
// //                 </button>
// //               </div>
// //             ))}
// //             <button
// //               type="button"
// //               onClick={() => addField('activities')}
// //               className="flex items-center text-blue-500"
// //             >
// //               <Plus size={20} className="mr-2" /> Add Activity
// //             </button>
// //           </div>

// //           <div>
// //             <label className="block mb-2">Featured Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setSelectedImage(null);
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Update' : 'Save'}
// //             </button>
// //             {isEditing && (
// //               <button
// //                 type="button"
// //                 onClick={resetForm}
// //                 className="bg-gray-500 text-white px-6 py-2 rounded"
// //               >
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </motion.div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {destinations.map((destination) => (
// //           <motion.div
// //             key={destination._id}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="bg-white rounded-lg shadow-lg overflow-hidden"
// //           >
// //             <img
// //               src={destination.featuredImage.url}
// //               alt={destination.title}
// //               className="w-full h-48 object-cover"
// //             />
// //             <div className="p-4">
// //               <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
// //               <p className="text-gray-600 mb-4">{destination.subtitle}</p>
// //               <div className="flex justify-end space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="bg-blue-500 text-white p-2 rounded"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="bg-red-500 text-white p-2 rounded"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;


// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Plus, X, Upload, Save } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const [formData, setFormData] = useState({
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     tripDuration: '',
// //     dateStart: '',
// //     dateEnd: '',
// //     highlights: [{ title: '', description: '', icon: '' }],
// //     activities: [''],
// //     image: '',
// //   });

// //   useEffect(() => {
// //     const abortController = new AbortController();
    
// //     const fetchDestinations = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get('/api/destinations', {
// //           signal: abortController.signal
// //         });
// //         setDestinations(response.data);
// //         setError(null);
// //       } catch (err) {
// //         if (!abortController.signal.aborted) {
// //           setError('Failed to fetch destinations');
// //         }
// //       } finally {
// //         if (!abortController.signal.aborted) {
// //           setIsLoading(false);
// //         }
// //       }
// //     };

// //     fetchDestinations();
// //     return () => abortController.abort();
// //   }, []);

// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append('image', file);

// //     try {
// //       setError(null);
// //       const response = await axios.post('http://localhost:5000/api/upload', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       const fullImageUrl = `${response.data.imageUrl}`;
// //       setFormData(prev => ({ ...prev, image: fullImageUrl }));
// //       setPreviewUrl(fullImageUrl);
// //     } catch (error) {
// //       console.error('Image upload failed:', error);
// //       setError('Image upload failed. Please try again.');
// //     }
// //   };

// //   const handleInputChange = (e, index, field, subfield = null) => {
// //     const { name, value } = e.target;
    
// //     if (field === 'highlights') {
// //       const newHighlights = [...formData.highlights];
// //       newHighlights[index][subfield] = value;
// //       setFormData(prev => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities') {
// //       const newActivities = [...formData.activities];
// //       newActivities[index] = value;
// //       setFormData(prev => ({ ...prev, activities: newActivities }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const addField = (field) => {
// //     if (field === 'highlights') {
// //       setFormData(prev => ({
// //         ...prev,
// //         highlights: [...prev.highlights, { title: '', description: '', icon: '' }]
// //       }));
// //     } else if (field === 'activities') {
// //       setFormData(prev => ({
// //         ...prev,
// //         activities: [...prev.activities, '']
// //       }));
// //     }
// //   };

// //   const removeField = (index, field) => {
// //     if (field === 'highlights' && formData.highlights.length > 1) {
// //       const newHighlights = formData.highlights.filter((_, i) => i !== index);
// //       setFormData(prev => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities' && formData.activities.length > 1) {
// //       const newActivities = formData.activities.filter((_, i) => i !== index);
// //       setFormData(prev => ({ ...prev, activities: newActivities }));
// //     }
// //   };

// //   const validateForm = () => {
// //     if (!formData.title.trim()) return 'Title is required';
// //     if (!formData.image) return 'Image is required';
// //     if (formData.highlights.some(h => !h.title.trim())) return 'All highlights need titles';
// //     return null;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const validationError = validateForm();
// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     try {
// //       setError(null);
// //       const payload = {
// //         ...formData,
// //         featuredImage: {
// //           url: formData.image,
// //           caption: formData.title
// //         }
// //       };

// //       if (isEditing) {
// //         await axios.patch(`/api/destinations/${formData._id}`, payload);
// //       } else {
// //         await axios.post('/api/destinations', payload);
// //       }

// //       fetchDestinations();
// //       resetForm();
// //     } catch (err) {
// //       console.error('Save failed:', err);
// //       setError(err.response?.data?.message || 'Failed to save destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       image: destination.featuredImage?.url || '',
// //       highlights: destination.highlights?.length ? 
// //         destination.highlights : 
// //         [{ title: '', description: '', icon: '' }],
// //       activities: destination.activities?.length ? 
// //         destination.activities : 
// //         ['']
// //     });
// //     setPreviewUrl(destination.featuredImage?.url || '');
// //     setIsEditing(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this destination?')) return;
    
// //     try {
// //       await axios.delete(`/api/destinations/${id}`);
// //       setDestinations(prev => prev.filter(d => d._id !== id));
// //     } catch (err) {
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       subtitle: '',
// //       location: '',
// //       tripDuration: '',
// //       dateStart: '',
// //       dateEnd: '',
// //       highlights: [{ title: '', description: '', icon: '' }],
// //       activities: [''],
// //       image: '',
// //       _id: undefined
// //     });
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   if (isLoading) return (
// //     <div className="flex justify-center items-center h-screen">
// //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //     </div>
// //   );

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Form fields remain the same as before, but with improved validation */}
          
// //           {/* Image upload section */}
// //           <div>
// //             <label className="block mb-2">Featured Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData(prev => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit buttons */}
// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Update' : 'Save'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       {/* Destination grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {destinations.map((destination) => (
// //           <motion.div
// //             key={destination._id}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="bg-white rounded-lg shadow-lg overflow-hidden"
// //           >
// //             {destination.featuredImage?.url && (
// //               <img
// //                 src={destination.featuredImage.url}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover"
// //                 loading="lazy"
// //               />
// //             )}
// //             <div className="p-4">
// //               <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
// //               <p className="text-gray-600 mb-4">{destination.subtitle}</p>
// //               <div className="flex justify-end space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
// //                   aria-label="Edit"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
// //                   aria-label="Delete"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;

// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Plus, X, Upload, Save } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const [formData, setFormData] = useState({
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     tripDuration: '',
// //     dateStart: '',
// //     dateEnd: '',
// //     highlights: [{ title: '', description: '', icon: '' }],
// //     activities: [''],
// //     image: '',
// //   });

// //   // Fetch destinations on component mount
// //   useEffect(() => {
// //     const fetchDestinations = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get('/api/destinations');
// //         setDestinations(response.data);
// //         setError(null);
// //       } catch (err) {
// //         setError('Failed to fetch destinations');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchDestinations();
// //   }, []);

// //   // Handle image upload
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Validate file type and size
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file (JPEG, PNG, etc.).');
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //       setError('Image size must be less than 5MB.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('image', file);

// //     try {
// //       setError(null);
// //       const response = await axios.post('http://localhost:5000/api/upload', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       const fullImageUrl = response.data.imageUrl; // Ensure backend returns the full URL
// //       setFormData((prev) => ({ ...prev, image: fullImageUrl }));
// //       setPreviewUrl(fullImageUrl);
// //     } catch (error) {
// //       console.error('Image upload failed:', error);
// //       setError('Image upload failed. Please try again.');
// //     }
// //   };

// //   // Handle input changes for form fields
// //   const handleInputChange = (e, index, field, subfield = null) => {
// //     const { name, value } = e.target;

// //     if (field === 'highlights') {
// //       const newHighlights = [...formData.highlights];
// //       newHighlights[index][subfield] = value;
// //       setFormData((prev) => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities') {
// //       const newActivities = [...formData.activities];
// //       newActivities[index] = value;
// //       setFormData((prev) => ({ ...prev, activities: newActivities }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Add a new highlight or activity field
// //   const addField = (field) => {
// //     if (field === 'highlights') {
// //       setFormData((prev) => ({
// //         ...prev,
// //         highlights: [...prev.highlights, { title: '', description: '', icon: '' }],
// //       }));
// //     } else if (field === 'activities') {
// //       setFormData((prev) => ({
// //         ...prev,
// //         activities: [...prev.activities, ''],
// //       }));
// //     }
// //   };

// //   // Remove a highlight or activity field
// //   const removeField = (index, field) => {
// //     if (field === 'highlights' && formData.highlights.length > 1) {
// //       const newHighlights = formData.highlights.filter((_, i) => i !== index);
// //       setFormData((prev) => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities' && formData.activities.length > 1) {
// //       const newActivities = formData.activities.filter((_, i) => i !== index);
// //       setFormData((prev) => ({ ...prev, activities: newActivities }));
// //     }
// //   };

// //   // Validate form before submission
// //   const validateForm = () => {
// //     if (!formData.title.trim()) return 'Title is required';
// //     if (!formData.image) return 'Image is required';
// //     if (formData.highlights.some((h) => !h.title.trim())) return 'All highlights need titles';
// //     return null;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const validationError = validateForm();
// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     try {
// //       setError(null);
// //       const payload = {
// //         ...formData,
// //         featuredImage: {
// //           url: formData.image,
// //           caption: formData.title,
// //         },
// //       };

// //       if (isEditing) {
// //         await axios.patch(`/api/destinations/${formData._id}`, payload);
// //       } else {
// //         await axios.post('/api/destinations', payload);
// //       }

// //       fetchDestinations();
// //       resetForm();
// //     } catch (err) {
// //       console.error('Save failed:', err);
// //       setError(err.response?.data?.message || 'Failed to save destination');
// //     }
// //   };

// //   // Edit a destination
// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       image: destination.featuredImage?.url || '',
// //       highlights: destination.highlights?.length
// //         ? destination.highlights
// //         : [{ title: '', description: '', icon: '' }],
// //       activities: destination.activities?.length ? destination.activities : [''],
// //     });
// //     setPreviewUrl(destination.featuredImage?.url || '');
// //     setIsEditing(true);
// //   };

// //   // Delete a destination
// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this destination?')) return;

// //     try {
// //       await axios.delete(`/api/destinations/${id}`);
// //       setDestinations((prev) => prev.filter((d) => d._id !== id));
// //     } catch (err) {
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   // Reset form to initial state
// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       subtitle: '',
// //       location: '',
// //       tripDuration: '',
// //       dateStart: '',
// //       dateEnd: '',
// //       highlights: [{ title: '', description: '', icon: '' }],
// //       activities: [''],
// //       image: '',
// //       _id: undefined,
// //     });
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   // Loading state
// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Form fields and image upload section */}
// //           <div>
// //             <label className="block mb-2">Featured Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData((prev) => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit buttons */}
// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Update' : 'Save'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       {/* Destination grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {destinations.map((destination) => (
// //           <motion.div
// //             key={destination._id}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="bg-white rounded-lg shadow-lg overflow-hidden"
// //           >
// //             {destination.featuredImage?.url && (
// //               <img
// //                 src={destination.featuredImage.url}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover"
// //                 loading="lazy"
// //               />
// //             )}
// //             <div className="p-4">
// //               <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
// //               <p className="text-gray-600 mb-4">{destination.subtitle}</p>
// //               <div className="flex justify-end space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
// //                   aria-label="Edit"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
// //                   aria-label="Delete"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Plus, X, Upload, Save } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const [formData, setFormData] = useState({
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     tripDuration: '',
// //     dateStart: '',
// //     dateEnd: '',
// //     highlights: [{ title: '', description: '', icon: '' }],
// //     activities: [''],
// //     image: '',
// //   });

// //   // Fetch destinations on component mount
// //   useEffect(() => {
// //     const fetchDestinations = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get('/api/destinations');
// //         setDestinations(response.data);
// //         setError(null);
// //       } catch (err) {
// //         setError('Failed to fetch destinations');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchDestinations();
// //   }, []);

// //   // Handle image upload
// //   // const handleImageChange = async (e) => {
// //   //   const file = e.target.files[0];
// //   //   if (!file) return;

// //   //   // Validate file type and size
// //   //   if (!file.type.startsWith('image/')) {
// //   //     setError('Please upload a valid image file (JPEG, PNG, etc.).');
// //   //     return;
// //   //   }
// //   //   console.log('Selected file:', file);
// //   //   if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //   //     setError('Image size must be less than 5MB.');
// //   //     return;
// //   //   }

// //   //   const formData = new FormData();
// //   //   formData.append('image', file);

// //   //   try {
// //   //     setError(null);
// //   //     const response = await axios.post('/api/upload', formData, {
// //   //       headers: { 'Content-Type': 'multipart/form-data' },
// //   //     });

// //   //     const fullImageUrl = response.data.imageUrl; // Ensure backend returns the full URL
// //   //     setFormData((prev) => ({ ...prev, image: fullImageUrl }));
// //   //     setPreviewUrl(fullImageUrl);
// //   //   } catch (error) {
// //   //     console.error('Image upload failed:', error);
// //   //     setError('Image upload failed. Please try again.');
// //   //   }
// //   // };
// //   // const handleImageChange = async (e) => {
// //   //   const file = e.target.files[0];
// //   //   if (!file) {
// //   //     console.log('No file selected.');
// //   //     return;
// //   //   }
  
// //   //   // Log the file info for debugging
// //   //   console.log('Selected file:', file);
  
// //   //   // Validate file type and size
// //   //   if (!file.type.startsWith('image/')) {
// //   //     console.log('Invalid file type');
// //   //     setError('Please upload a valid image file (JPEG, PNG, etc.).');
// //   //     return;
// //   //   }
// //   //   if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //   //     console.log('File size is too large:', file.size);
// //   //     setError('Image size must be less than 5MB.');
// //   //     return;
// //   //   }
  
// //   //   const formData = new FormData();
// //   //   formData.append('image', file);
  
// //   //   console.log('FormData prepared for upload:', formData);
  
// //   //   try {
// //   //     setError(null);
// //   //     const response = await axios.post('http://localhost:5000/api/upload', formData, {
// //   //       headers: { 'Content-Type': 'multipart/form-data' },
// //   //     });
  
// //   //     // Log the response to check what the server returns
// //   //     console.log('Image upload response:', response);
  
// //   //     const fullImageUrl = response.data.imageUrl; // Ensure backend returns the full URL
// //   //     setFormData((prev) => ({ ...prev, image: fullImageUrl }));
// //   //     setPreviewUrl(fullImageUrl);
// //   //   } catch (error) {
// //   //     console.error('Image upload failed:', error);
// //   //     setError('Image upload failed. Please try again.');
// //   //   }
// //   // };
  
// // //   const handleImageChange = async (e) => {
// // //     console.log('File input changed:', e);
    
// // //     const file = e.target.files[0];
// // //     if (!file) {
// // //       console.log('No file selected');
// // //       return;
// // //     }
  
// // //     console.log('Selected file:', file);
  
// // //     if (!file.type.startsWith('image/')) {
// // //       setError('Please upload a valid image file (JPEG, PNG, etc.).');
// // //       console.log('Invalid file type:', file.type);
// // //       return;
// // //     }
  
// // //     if (file.size > 5 * 1024 * 1024) {
// // //       setError('Image size must be less than 5MB.');
// // //       console.log('File too large:', file.size);
// // //       return;
// // //     }
  
// // //     const formData = new FormData();
// // //     formData.append('image', file);
  
// // //     try {
// // //       setError(null);
// // //       console.log('Uploading image...');
      
// // //       const response = await axios.post('http://localhost:5000/api/upload', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });
  
// // //       console.log('Upload response:', response.data);
  
// // //       // const fullImageUrl = response.data.imageUrl;
// // //       // setFormData((prev) => ({ ...prev, image: fullImageUrl }));
// // //       // setPreviewUrl(fullImageUrl);
// // //       const fullImageUrl = `http://localhost:5000${response.data.imageUrl}`;
// // // console.log("Full image URL:", fullImageUrl);
// // // setPreviewUrl(fullImageUrl);
// // // setFormData((prev) => ({ ...prev, image: fullImageUrl }));

// // //     } catch (error) {
// // //       console.error('Image upload failed:', error);
// // //       setError('Image upload failed. Please try again.');
// // //     }
// // //   };
// // const handleImageChange = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) return;

// //   // Validate file type and size
// //   if (!file.type.startsWith('image/')) {
// //     setError('Please upload a valid image file (JPEG, PNG, etc.).');
// //     return;
// //   }
// //   if (file.size > 5 * 1024 * 1024) {
// //     setError('Image size must be less than 5MB.');
// //     return;
// //   }

// //   const formData = new FormData();
// //   formData.append('image', file);

// //   try {
// //     setError(null);
// //     const response = await axios.post('http://localhost:5000/api/upload', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     });

// //     const fullImageUrl = `http://localhost:5000${response.data.imageUrl}`;
// //     console.log("Full image URL:", fullImageUrl);

// //     setPreviewUrl(fullImageUrl);
// //     setFormData((prev) => ({ ...prev, image: fullImageUrl }));
// //   } catch (error) {
// //     console.error('Image upload failed:', error);
// //     setError('Image upload failed. Please try again.');
// //   }
// //   const baseURL = "http://localhost:5000"; // Your backend URL

// // const fullImageUrl = formData.image.startsWith("/uploads/")
// //   ? `${baseURL}${formData.image}`
// //   : formData.image;
// // };

// //   // Handle input changes for form fields
// //   const handleInputChange = (e, index, field, subfield = null) => {
// //     const { name, value } = e.target;

// //     if (field === 'highlights') {
// //       const newHighlights = [...formData.highlights];
// //       newHighlights[index][subfield] = value;
// //       setFormData((prev) => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities') {
// //       const newActivities = [...formData.activities];
// //       newActivities[index] = value;
// //       setFormData((prev) => ({ ...prev, activities: newActivities }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Add a new highlight or activity field
// //   const addField = (field) => {
// //     if (field === 'highlights') {
// //       setFormData((prev) => ({
// //         ...prev,
// //         highlights: [...prev.highlights, { title: '', description: '', icon: '' }],
// //       }));
// //     } else if (field === 'activities') {
// //       setFormData((prev) => ({
// //         ...prev,
// //         activities: [...prev.activities, ''],
// //       }));
// //     }
// //   };

// //   // Remove a highlight or activity field
// //   const removeField = (index, field) => {
// //     if (field === 'highlights' && formData.highlights.length > 1) {
// //       const newHighlights = formData.highlights.filter((_, i) => i !== index);
// //       setFormData((prev) => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities' && formData.activities.length > 1) {
// //       const newActivities = formData.activities.filter((_, i) => i !== index);
// //       setFormData((prev) => ({ ...prev, activities: newActivities }));
// //     }
// //   };

// //   // Validate form before submission
// //   const validateForm = () => {
// //     if (!formData.title.trim()) return 'Title is required';
// //     if (!formData.image) return 'Image is required';
// //     if (formData.highlights.some((h) => !h.title.trim())) return 'All highlights need titles';
// //     return null;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const validationError = validateForm();
// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     try {
// //       setError(null);
// //       const payload = {
// //         ...formData,
// //         featuredImage: {
// //           url: formData.image,
// //           caption: formData.title,
// //         },
// //       };

// //       if (isEditing) {
// //         await axios.patch(`/api/destinations/${formData._id}`, payload);
// //       } else {
// //         await axios.post('/api/destinations', payload);
// //       }

// //       fetchDestinations();
// //       resetForm();
// //     } catch (err) {
// //       console.error('Save failed:', err);
// //       setError(err.response?.data?.message || 'Failed to save destination');
// //     }
// //   };

// //   // Edit a destination
// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       image: destination.featuredImage?.url || '',
// //       highlights: destination.highlights?.length
// //         ? destination.highlights
// //         : [{ title: '', description: '', icon: '' }],
// //       activities: destination.activities?.length ? destination.activities : [''],
// //     });
// //     setPreviewUrl(destination.featuredImage?.url || '');
// //     setIsEditing(true);
// //   };

// //   // Delete a destination
// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this destination?')) return;

// //     try {
// //       await axios.delete(`/api/destinations/${id}`);
// //       setDestinations((prev) => prev.filter((d) => d._id !== id));
// //     } catch (err) {
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   // Reset form to initial state
// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       subtitle: '',
// //       location: '',
// //       tripDuration: '',
// //       dateStart: '',
// //       dateEnd: '',
// //       highlights: [{ title: '', description: '', icon: '' }],
// //       activities: [''],
// //       image: '',
// //       _id: undefined,
// //     });
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   // Loading state
// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Form fields and image upload section */}
// //           <div>
// //             <label className="block mb-2">Featured Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={fullImageUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData((prev) => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit buttons */}
// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Save Changes' : 'Save Destination'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       {/* List of destinations */}
// //       <div>
// //         <h3 className="text-xl font-semibold mb-4">Destinations List</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {destinations.map((destination) => (
// //             <motion.div
// //               key={destination._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-white p-6 rounded-lg shadow-lg"
// //             >
// //               <img
// //                 src={destination.featuredImage?.url || '/default-image.jpg'}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover rounded mb-4"
// //               />
// //               <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //               <p className="text-sm text-gray-600">{destination.location}</p>

// //               <div className="mt-4 flex space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="text-blue-500 hover:text-blue-600"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="text-red-500 hover:text-red-600"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Upload, Save, X } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');
// //   const baseURL = "http://localhost:5000"; // Base URL for the backend

// //   const [formData, setFormData] = useState({
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     tripDuration: '',
// //     dateStart: '',
// //     dateEnd: '',
// //     highlights: [{ title: '', description: '', icon: '' }],
// //     activities: [''],
// //     image: '',
// //   });

// //   // Fetch destinations on component mount
// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await axios.get(`${baseURL}/api/destinations`);
// //       const destinationsWithFullUrls = response.data.map(dest => ({
// //         ...dest,
// //         featuredImage: {
// //           ...dest.featuredImage,
// //           url: dest.featuredImage?.url?.startsWith('http') 
// //             ? dest.featuredImage.url 
// //             : `${baseURL}${dest.featuredImage?.url}`
// //         }
// //       }));
// //       setDestinations(destinationsWithFullUrls);
// //       setError(null);
// //     } catch (err) {
// //       setError('Failed to fetch destinations');
// //       console.error('Fetch error:', err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   // Handle image upload with proper URL handling
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file (JPEG, PNG, etc.).');
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image size must be less than 5MB.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('image', file);

// //     try {
// //       setError(null);
// //       const response = await axios.post(`${baseURL}/api/upload`, formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       const imageUrl = response.data.imageUrl;
// //       const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseURL}${imageUrl}`;
      
// //       setPreviewUrl(fullImageUrl);
// //       setFormData(prev => ({ ...prev, image: imageUrl })); // Store relative path
// //     } catch (error) {
// //       console.error('Image upload failed:', error);
// //       setError('Image upload failed. Please try again.');
// //     }
// //   };

// //   // Handle input changes for form fields
// //   const handleInputChange = (e, index, field, subfield = null) => {
// //     const { name, value } = e.target;

// //     if (field === 'highlights') {
// //       const newHighlights = [...formData.highlights];
// //       newHighlights[index][subfield] = value;
// //       setFormData(prev => ({ ...prev, highlights: newHighlights }));
// //     } else if (field === 'activities') {
// //       const newActivities = [...formData.activities];
// //       newActivities[index] = value;
// //       setFormData(prev => ({ ...prev, activities: newActivities }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Handle form submission with proper image URL handling
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const validationError = validateForm();
// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     try {
// //       setError(null);
// //       const payload = {
// //         ...formData,
// //         featuredImage: {
// //           url: formData.image,
// //           caption: formData.title,
// //         },
// //       };

// //       if (isEditing) {
// //         await axios.patch(`${baseURL}/api/destinations/${formData._id}`, payload);
// //       } else {
// //         await axios.post(`${baseURL}/api/destinations`, payload);
// //       }

// //       await fetchDestinations();
// //       resetForm();
// //     } catch (err) {
// //       console.error('Save failed:', err);
// //       setError(err.response?.data?.message || 'Failed to save destination');
// //     }
// //   };

// //   // Handle edit with proper image URL handling
// //   const handleEdit = (destination) => {
// //     const imageUrl = destination.featuredImage?.url || '';
// //     const relativeImageUrl = imageUrl.replace(baseURL, '');
    
// //     setFormData({
// //       ...destination,
// //       image: relativeImageUrl,
// //       highlights: destination.highlights?.length
// //         ? destination.highlights
// //         : [{ title: '', description: '', icon: '' }],
// //       activities: destination.activities?.length ? destination.activities : [''],
// //     });
// //     setPreviewUrl(imageUrl);
// //     setIsEditing(true);
// //   };

// //   // Delete destination
// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this destination?')) return;

// //     try {
// //       await axios.delete(`${baseURL}/api/destinations/${id}`);
// //       await fetchDestinations();
// //     } catch (err) {
// //       setError('Failed to delete destination');
// //       console.error('Delete error:', err);
// //     }
// //   };

// //   // Reset form
// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       subtitle: '',
// //       location: '',
// //       tripDuration: '',
// //       dateStart: '',
// //       dateEnd: '',
// //       highlights: [{ title: '', description: '', icon: '' }],
// //       activities: [''],
// //       image: '',
// //       _id: undefined,
// //     });
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   // Validate form
// //   const validateForm = () => {
// //     if (!formData.title.trim()) return 'Title is required';
// //     if (!formData.image) return 'Image is required';
// //     if (formData.highlights.some(h => !h.title.trim())) return 'All highlights need titles';
// //     return null;
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className="block mb-2">Featured Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData(prev => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Add your other form fields here */}

// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Save Changes' : 'Save Destination'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       <div>
// //         <h3 className="text-xl font-semibold mb-4">Destinations List</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {destinations.map((destination) => (
// //             <motion.div
// //               key={destination._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-white p-6 rounded-lg shadow-lg"
// //             >
// //               <img
// //                 src={destination.featuredImage?.url || '/default-image.jpg'}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover rounded mb-4"
// //               />
// //               <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //               <p className="text-sm text-gray-600">{destination.location}</p>

// //               <div className="mt-4 flex space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="text-blue-500 hover:text-blue-600"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="text-red-500 hover:text-red-600"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;
// // src/components/DestinationManager.jsx
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Upload, Save, X } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   // Initialize form data
// //   const initialFormData = {
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //   };

// //   const [formData, setFormData] = useState(initialFormData);

// //   // Configure axios instance with base URL and credentials
// //   const api = axios.create({
// //     baseURL: 'http://localhost:5000',
// //     withCredentials: true,
// //   });

// //   // Fetch destinations when component mounts
// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await api.get('/api/destinations');
// //       setDestinations(response.data);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Error fetching destinations:', err);
// //       setError('Failed to fetch destinations');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Validate file
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //       setError('Image must be less than 5MB');
// //       return;
// //     }

// //     const imageFormData = new FormData();
// //     imageFormData.append('image', file);

// //     try {
// //       const response = await api.post('/api/upload', imageFormData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       const imagePath = response.data.imageUrl;
// //       setFormData(prev => ({ ...prev, image: imagePath }));
// //       setPreviewUrl(`http://localhost:5000${imagePath}`);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Upload error:', err);
// //       setError('Failed to upload image');
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     try {
// //       if (isEditing) {
// //         await api.patch(`/api/destinations/${formData._id}`, formData);
// //       } else {
// //         await api.post('/api/destinations', formData);
// //       }
      
// //       await fetchDestinations();
// //       resetForm();
// //       setError(null);
// //     } catch (err) {
// //       console.error('Save error:', err);
// //       setError('Failed to save destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       image: destination.image || ''
// //     });
// //     setPreviewUrl(destination.image ? `http://localhost:5000${destination.image}` : '');
// //     setIsEditing(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this destination?')) return;

// //     try {
// //       await api.delete(`/api/destinations/${id}`);
// //       await fetchDestinations();
// //     } catch (err) {
// //       console.error('Delete error:', err);
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData(initialFormData);
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Title Input */}
// //           <div>
// //             <label className="block mb-2">Title</label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           {/* Location Input */}
// //           <div>
// //             <label className="block mb-2">Location</label>
// //             <input
// //               type="text"
// //               name="location"
// //               value={formData.location}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>

// //           {/* Category Input */}
// //           <div>
// //             <label className="block mb-2">Category</label>
// //             <input
// //               type="text"
// //               name="category"
// //               value={formData.category}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>

// //           {/* Description Input */}
// //           <div>
// //             <label className="block mb-2">Description</label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               rows="4"
// //             />
// //           </div>

// //           {/* Image Upload */}
// //           <div>
// //             <label className="block mb-2">Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData(prev => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit Buttons */}
// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
// //             >
// //               <Save size={20} className="mr-2" />
// //               {isEditing ? 'Update' : 'Save'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       {/* Destinations List */}
// //       <div>
// //         <h3 className="text-xl font-semibold mb-4">Destinations List</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {destinations.map((destination) => (
// //             <motion.div
// //               key={destination._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-white p-6 rounded-lg shadow-lg"
// //             >
// //               {destination.image && (
// //                 <img
// //                   src={`http://localhost:5000${destination.image}`}
// //                   alt={destination.title}
// //                   className="w-full h-48 object-cover rounded mb-4"
// //                 />
// //               )}
// //               <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //               <p className="text-sm text-gray-600 mb-2">{destination.location}</p>
// //               <p className="text-sm text-gray-500 mb-2">{destination.category}</p>
// //               <p className="text-sm mb-4">{destination.description}</p>

// //               <div className="flex space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(destination)}
// //                   className="text-blue-500 hover:text-blue-600"
// //                 >
// //                   <Edit size={20} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(destination._id)}
// //                   className="text-red-500 hover:text-red-600"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;

// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Upload, Save, X } from 'lucide-react';
// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const BACKEND_URL = 'http://localhost:5000'; // Base URL for the backend

// //   const initialFormData = {
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //   };

// //   const [formData, setFormData] = useState(initialFormData);

// //   // Configure axios instance
// //   const api = axios.create({
// //     baseURL: BACKEND_URL,
// //     withCredentials: true,
// //   });

// //   // Helper function to get full image URL
// //   const getFullImageUrl = (imagePath) => {
// //     if (!imagePath) return '';
// //     if (imagePath.startsWith('http')) return imagePath;
// //     return `${BACKEND_URL}${imagePath}`;
// //   };

// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await api.get('/api/destinations');
// //       const destinationsWithFullUrls = response.data.map(dest => ({
// //         ...dest,
// //         image: getFullImageUrl(dest.image)
// //       }));
// //       setDestinations(destinationsWithFullUrls);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Error fetching destinations:', err);
// //       setError('Failed to fetch destinations');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   // const handleImageChange = async (e) => {
// //   //   const file = e.target.files[0];
// //   //   if (!file) return;

// //   //   if (!file.type.startsWith('image/')) {
// //   //     setError('Please upload a valid image file');
// //   //     return;
// //   //   }

// //   //   if (file.size > 5 * 1024 * 1024) {
// //   //     setError('Image must be less than 5MB');
// //   //     return;
// //   //   }

// //   //   const imageFormData = new FormData();
// //   //   imageFormData.append('image', file);

// //   //   try {
// //   //     const response = await api.post('http://localhost:5000/api/upload', imageFormData, {
// //   //       headers: { 'Content-Type': 'multipart/form-data' },
// //   //     });

// //   //     const imagePath = response.data.imageUrl;
// //   //     setFormData(prev => ({ ...prev, image: imagePath }));
// //   //     // Set the preview URL with the full URL
// //   //     setPreviewUrl(getFullImageUrl(imagePath));
// //   //     setError(null);
// //   //   } catch (err) {
// //   //     console.error('Upload error:', err);
// //   //     setError('Failed to upload image');
// //   //   }
// //   // };
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
  
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file');
// //       return;
// //     }
  
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image must be less than 5MB');
// //       return;
// //     }
  
// //     const imageFormData = new FormData();
// //     imageFormData.append('image', file);
  
// //     try {
// //       const response = await api.post('http://localhost:5000/api/upload', imageFormData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });
  
// //       console.log('Upload response:', response.data);
// //       console.log('Image URL from response:', response.data.imageUrl);
      
// //       const imagePath = response.data.imageUrl;
// //       console.log('Full image URL being set:', getFullImageUrl(imagePath));
      
// //       setFormData(prev => ({ ...prev, image: imagePath }));
// //       setPreviewUrl(getFullImageUrl(imagePath));
      
// //       console.log('Preview URL after set:', previewUrl);
// //       console.log('Form data after set:', formData);
  
// //       setError(null);
// //     } catch (err) {
// //       console.error('Upload error:', err);
// //       setError('Failed to upload image');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (isEditing) {
// //         await api.put(`/api/destinations/${formData._id}`, formData);
// //       } else {
// //         await api.post('/api/destinations', formData);
// //       }
// //       resetForm();
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error saving destination:', err);
// //       setError('Failed to save destination');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await api.delete(`/api/destinations/${id}`);
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error deleting destination:', err);
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       // Keep the relative path for the backend
// //       image: destination.image.replace(BACKEND_URL, '')
// //     });
// //     // Keep the full URL for preview
// //     setPreviewUrl(destination.image);
// //     setIsEditing(true);
// //   };

// //   const resetForm = () => {
// //     setFormData(initialFormData);
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };


// // // const DestinationManager = () => {
// // //   const [destinations, setDestinations] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [previewUrl, setPreviewUrl] = useState('');

// // //   const BACKEND_URL = 'http://localhost:5000'; // Base URL for the backend

// // //   // Initialize form data
// // //   const initialFormData = {
// // //     title: '',
// // //     subtitle: '',
// // //     location: '',
// // //     description: '',
// // //     category: '',
// // //     image: '',
// // //   };

// // //   const [formData, setFormData] = useState(initialFormData);

// // //   // Configure axios instance
// // //   const api = axios.create({
// // //     baseURL: BACKEND_URL,
// // //     withCredentials: true,
// // //   });

// // //   // Helper function to get full image URL
// // //   const getFullImageUrl = (imagePath) => {
// // //     if (!imagePath) return '';
// // //     if (imagePath.startsWith('http')) return imagePath;
// // //     return `${BACKEND_URL}${imagePath}`;
// // //   };

// // //   const fetchDestinations = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       const response = await api.get('/api/destinations');
// // //       // Map through destinations and ensure image URLs are complete
// // //       const destinationsWithFullUrls = response.data.map(dest => ({
// // //         ...dest,
// // //         image: dest.image ? getFullImageUrl(dest.image) : ''
// // //       }));
// // //       setDestinations(destinationsWithFullUrls);
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error('Error fetching destinations:', err);
// // //       setError('Failed to fetch destinations');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchDestinations();
// // //   }, []);

// // //   const handleImageChange = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     if (!file.type.startsWith('image/')) {
// // //       setError('Please upload a valid image file');
// // //       return;
// // //     }

// // //     if (file.size > 5 * 1024 * 1024) {
// // //       setError('Image must be less than 5MB');
// // //       return;
// // //     }

// // //     const imageFormData = new FormData();
// // //     imageFormData.append('image', file);

// // //     try {
// // //       const response = await api.post('/api/upload', imageFormData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });

// // //       const imagePath = response.data.imageUrl;
// // //       setFormData(prev => ({ ...prev, image: imagePath }));
// // //       setPreviewUrl(getFullImageUrl(imagePath));
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error('Upload error:', err);
// // //       setError('Failed to upload image');
// // //     }
// // //   };

// // //   const handleEdit = (destination) => {
// // //     // Remove the base URL to store relative path
// // //     const relativePath = destination.image.replace(BACKEND_URL, '');
// // //     setFormData({
// // //       ...destination,
// // //       image: relativePath
// // //     });
// // //     setPreviewUrl(destination.image);
// // //     setIsEditing(true);
// // //   };

// // //   // The rest of your component code remains the same until the render section...
// // //   const resetForm = () => {
// // //         setFormData(initialFormData);
// // //         setPreviewUrl('');
// // //         setIsEditing(false);
// // //       };
    
// // //       if (isLoading) {
// // //         return (
// // //           <div className="flex justify-center items-center h-screen">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// // //           </div>
// // //         );
// // //       }
// //   return (

    
// //     <div className="container mx-auto p-4">
  
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //     >
// //       <h2 className="text-2xl font-bold mb-6">
// //         {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //       </h2>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //           {error}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {/* Title Input */}
// //         <div>
// //           <label className="block mb-2">Title</label>
// //           <input
// //             type="text"
// //             name="title"
// //             value={formData.title}
// //             onChange={handleInputChange}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //         </div>

// //         {/* Location Input */}
// //         <div>
// //           <label className="block mb-2">Location</label>
// //           <input
// //             type="text"
// //             name="location"
// //             value={formData.location}
// //             onChange={handleInputChange}
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         {/* Category Input */}
// //         <div>
// //           <label className="block mb-2">Category</label>
// //           <input
// //             type="text"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleInputChange}
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         {/* Description Input */}
// //         <div>
// //           <label className="block mb-2">Description</label>
// //           <textarea
// //             name="description"
// //             value={formData.description}
// //             onChange={handleInputChange}
// //             className="w-full p-2 border rounded"
// //             rows="4"
// //           />
// //         </div>

// //         {/* Image Upload */}
// //         <div>
// //           <label className="block mb-2">Image</label>
// //           <div className="flex items-center space-x-4">
// //             <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //               <Upload size={20} className="mr-2" />
// //               Choose Image
// //               <input
// //                 type="file"
// //                 onChange={handleImageChange}
// //                 className="hidden"
// //                 accept="image/*"
// //               />
// //             </label>
// //             {/* Preview section with fixed image URL */}
// //             {/* {previewUrl && (
// //               <div className="relative">
// //                 <img
// //                   src={previewUrl}
// //                   alt="Preview"
// //                   className="h-24 w-24 object-cover rounded"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     setPreviewUrl('');
// //                     setFormData(prev => ({ ...prev, image: '' }));
// //                   }}
// //                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                 >
// //                   <X size={16} />
// //                 </button>
// //               </div> */}
// //             {/* )} */}
// //             {/* Preview section */}
// // {previewUrl && (
// //   <div className="relative">
// //     <img
// //       src={previewUrl}
// //       alt="Preview"
// //       className="h-24 w-24 object-cover rounded"
// //     />
// //     <div className="text-xs text-gray-500 mt-1">
// //       Preview URL: {previewUrl}
// //     </div>
// //     <button
// //       type="button"
// //       onClick={() => {
// //         setPreviewUrl('');
// //         setFormData(prev => ({ ...prev, image: '' }));
// //       }}
// //       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //     >
// //       <X size={16} />
// //     </button>
// //   </div>
// // )}
// //           </div>
// //         </div>
// //       </form>
// //     </motion.div>

// //     {/* Destinations list with fixed image URLs */}
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {destinations.map((destination) => (
// //         <motion.div
// //           key={destination._id}
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-white p-6 rounded-lg shadow-lg"
// //         >
// //           {destination.image && (
// //             <img
// //               src={destination.image} // This now has the full URL
// //               alt={destination.title}
// //               className="w-full h-48 object-cover rounded mb-4"
// //             />
// //           )}
// //           <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //           <p className="text-sm text-gray-600 mb-2">{destination.location}</p>
// //           <p className="text-sm text-gray-500 mb-2">{destination.category}</p>
// //           <p className="text-sm mb-4">{destination.description}</p>

// //           <div className="flex space-x-2">
// //             <button
// //               onClick={() => handleEdit(destination)}
// //               className="text-blue-500 hover:text-blue-600"
// //             >
// //               <Edit size={20} />
// //             </button>
// //             <button
// //               onClick={() => handleDelete(destination._id)}
// //               className="text-red-500 hover:text-red-600"
// //             >
// //               <Trash2 size={20} />
// //             </button>
// //           </div>
// //         </motion.div>
// //       ))}
// //     </div>
// //   </div>
// //   );
// // };

// // export default DestinationManager;



// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Upload, X } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const BACKEND_URL = 'http://localhost:5000';

// //   const initialFormData = {
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //   };

// //   const [formData, setFormData] = useState(initialFormData);

// //   const api = axios.create({
// //     baseURL: BACKEND_URL,
// //     withCredentials: true,
// //   });

// //   // Modified getFullImageUrl to handle various URL formats
// //   const getFullImageUrl = (imagePath) => {
// //     if (!imagePath) return '';
// //     if (imagePath.startsWith('http')) return imagePath;
// //     if (imagePath.startsWith('/')) return `${BACKEND_URL}${imagePath}`;
// //     return `${BACKEND_URL}/${imagePath}`;
// //   };

// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await api.get('/api/destinations');
// //       const destinationsWithFullUrls = response.data.map(dest => ({
// //         ...dest,
// //         image: getFullImageUrl(dest.image)
// //       }));
// //       setDestinations(destinationsWithFullUrls);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Error fetching destinations:', err);
// //       setError('Failed to fetch destinations');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image must be less than 5MB');
// //       return;
// //     }

// //     const imageFormData = new FormData();
// //     imageFormData.append('image', file);

// //     try {
// //       const response = await api.post('/api/upload', imageFormData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       // Store the relative path in formData
// //       const relativePath = response.data.imageUrl;
// //       setFormData(prev => ({ ...prev, image: relativePath }));

// //       // Set the full URL for preview
// //       const fullImageUrl = getFullImageUrl(relativePath);
// //       setPreviewUrl(fullImageUrl);

// //       setError(null);
// //     } catch (err) {
// //       console.error('Upload error:', err);
// //       setError('Failed to upload image');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     try {
// //       if (isEditing) {
// //         await api.put(`/api/destinations/${formData._id}`, formData);
// //       } else {
// //         await api.post('/api/destinations', formData);
// //       }
// //       resetForm();
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error saving destination:', err);
// //       setError('Failed to save destination');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await api.delete(`/api/destinations/${id}`);
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error deleting destination:', err);
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     // For editing, we store the relative path but keep the full URL for preview
// //     const relativePath = destination.image.replace(BACKEND_URL, '');
// //     setFormData({
// //       ...destination,
// //       image: relativePath
// //     });
// //     setPreviewUrl(destination.image); // Keep the full URL for preview
// //     setIsEditing(true);
// //   };

// //   const resetForm = () => {
// //     setFormData(initialFormData);
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className="block mb-2">Title</label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Location</label>
// //             <input
// //               type="text"
// //               name="location"
// //               value={formData.location}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Category</label>
// //             <input
// //               type="text"
// //               name="category"
// //               value={formData.category}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Description</label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               rows="4"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
              
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <div className="text-xs text-gray-500 mt-1 break-all">
// //                     Image path: {formData.image}
// //                   </div>
// //                   <div className="text-xs text-gray-500 mt-1 break-all">
// //                     Preview URL: {previewUrl}
// //                   </div>
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData(prev => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-4">
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="px-4 py-2 border rounded"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-500 text-white rounded"
// //             >
// //               {isEditing ? 'Update' : 'Create'} Destination
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {destinations.map((destination) => (
// //           <motion.div
// //             key={destination._id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-white p-6 rounded-lg shadow-lg"
// //           >
// //             {destination.image && (
// //               <img
// //                 src={destination.image}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover rounded mb-4"
// //               />
// //             )}
// //             <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //             <p className="text-sm text-gray-600 mb-2">{destination.location}</p>
// //             <p className="text-sm text-gray-500 mb-2">{destination.category}</p>
// //             <p className="text-sm mb-4">{destination.description}</p>

// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => handleEdit(destination)}
// //                 className="text-blue-500 hover:text-blue-600"
// //               >
// //                 <Edit size={20} />
// //               </button>
// //               <button
// //                 onClick={() => handleDelete(destination._id)}
// //                 className="text-red-500 hover:text-red-600"
// //               >
// //                 <Trash2 size={20} />
// //               </button>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Trash2, Edit, Upload, X } from 'lucide-react';

// // const DestinationManager = () => {
// //   const [destinations, setDestinations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const BACKEND_URL = 'http://localhost:5000';

// //   const initialFormData = {
// //     title: '',
// //     subtitle: '',
// //     location: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //     icon: 'MapPin',
// //     details: []
// //   };

// //   const [formData, setFormData] = useState(initialFormData);

// //   const api = axios.create({
// //     baseURL: BACKEND_URL,
// //     withCredentials: true,
// //   });

// //   const getFullImageUrl = (imagePath) => {
// //     if (!imagePath) return '';
// //     if (imagePath.startsWith('http')) return imagePath;
// //     return `${BACKEND_URL}${imagePath}`;
// //   };

// //   const fetchDestinations = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await api.get('/api/destinations');
// //       const destinationsWithFullUrls = response.data.map(dest => ({
// //         ...dest,
// //         displayImage: getFullImageUrl(dest.image)
// //       }));
// //       setDestinations(destinationsWithFullUrls);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Error fetching destinations:', err);
// //       setError('Failed to fetch destinations');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDestinations();
// //   }, []);

// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload a valid image file');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image must be less than 5MB');
// //       return;
// //     }

// //     const imageFormData = new FormData();
// //     imageFormData.append('image', file);

// //     try {
// //       console.log('Uploading image...');
// //       const response = await api.post('/api/upload', imageFormData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       console.log('Upload response:', response.data);
// //       const imagePath = response.data.imageUrl;
      
// //       setFormData(prev => ({
// //         ...prev,
// //         image: imagePath
// //       }));

// //       const fullUrl = getFullImageUrl(imagePath);
// //       console.log('Setting preview URL:', fullUrl);
// //       setPreviewUrl(fullUrl);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Upload error:', err);
// //       setError('Failed to upload image');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const submitData = {
// //         ...formData,
// //         details: formData.details || []
// //       };

// //       if (isEditing) {
// //         await api.put(`/api/destinations/${formData._id}`, submitData);
// //       } else {
// //         await api.post('/api/destinations', submitData);
// //       }
// //       resetForm();
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error saving destination:', err);
// //       setError('Failed to save destination');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await api.delete(`/api/destinations/${id}`);
// //       fetchDestinations();
// //     } catch (err) {
// //       console.error('Error deleting destination:', err);
// //       setError('Failed to delete destination');
// //     }
// //   };

// //   const handleEdit = (destination) => {
// //     setFormData({
// //       ...destination,
// //       details: destination.details || []
// //     });
// //     setPreviewUrl(destination.displayImage);
// //     setIsEditing(true);
// //   };

// //   const resetForm = () => {
// //     setFormData(initialFormData);
// //     setPreviewUrl('');
// //     setIsEditing(false);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-lg shadow-lg p-6 mb-8"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">
// //           {isEditing ? 'Edit Destination' : 'Add New Destination'}
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className="block mb-2">Title</label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Category</label>
// //             <input
// //               type="text"
// //               name="category"
// //               value={formData.category}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Description</label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               className="w-full p-2 border rounded"
// //               rows="4"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Details (comma-separated)</label>
// //             <input
// //               type="text"
// //               name="details"
// //               value={formData.details.join(', ')}
// //               onChange={(e) => {
// //                 const detailsArray = e.target.value.split(',').map(item => item.trim());
// //                 setFormData(prev => ({ ...prev, details: detailsArray }));
// //               }}
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-2">Image</label>
// //             <div className="flex items-center space-x-4">
// //               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
// //                 <Upload size={20} className="mr-2" />
// //                 Choose Image
// //                 <input
// //                   type="file"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                   accept="image/*"
// //                 />
// //               </label>
              
// //               {previewUrl && (
// //                 <div className="relative">
// //                   <img
// //                     src={previewUrl}
// //                     alt="Preview"
// //                     className="h-24 w-24 object-cover rounded"
// //                   />
// //                   <div className="text-xs text-gray-500 mt-1">
// //                     Image path: {formData.image}
// //                   </div>
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setPreviewUrl('');
// //                       setFormData(prev => ({ ...prev, image: '' }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
// //                   >
// //                     <X size={16} />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-4">
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="px-4 py-2 border rounded"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-500 text-white rounded"
// //             >
// //               {isEditing ? 'Update' : 'Create'} Destination
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {destinations.map((destination) => (
// //           <motion.div
// //             key={destination._id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-white p-6 rounded-lg shadow-lg"
// //           >
// //             {destination.image && (
// //               <img
// //                 src={destination.displayImage}
// //                 alt={destination.title}
// //                 className="w-full h-48 object-cover rounded mb-4"
// //               />
// //             )}
// //             <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
// //             <p className="text-sm text-gray-600 mb-2">{destination.category}</p>
// //             <p className="text-sm mb-4">{destination.description}</p>
// //             {destination.details && destination.details.length > 0 && (
// //               <div className="mb-4">
// //                 <h5 className="text-sm font-semibold mb-2">Details:</h5>
// //                 <ul className="list-disc list-inside">
// //                   {destination.details.map((detail, index) => (
// //                     <li key={index} className="text-sm text-gray-600">{detail}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => handleEdit(destination)}
// //                 className="text-blue-500 hover:text-blue-600"
// //               >
// //                 <Edit size={20} />
// //               </button>
// //               <button
// //                 onClick={() => handleDelete(destination._id)}
// //                 className="text-red-500 hover:text-red-600"
// //               >
// //                 <Trash2 size={20} />
// //               </button>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DestinationManager;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { Trash2, Edit, Upload, X } from 'lucide-react';

// const DestinationManager = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');

//   const BACKEND_URL = 'http://localhost:5000';

//   const initialFormData = {
//     title: '',
//     subtitle: '',
//     location: '',
//     description: '',
//     category: '',
//     image: '',
//     icon: 'MapPin',
//     details: []
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const api = axios.create({
//     baseURL: BACKEND_URL,
//     withCredentials: true,
//   });

//   const fetchDestinations = async () => {
//     try {
//       const response = await api.get('/api/destinations');
//       const destinationsWithUrls = response.data.map(dest => ({
//         ...dest,
//         fullImageUrl: dest.image ? `${BACKEND_URL}${dest.image}` : ''
//       }));
//       setDestinations(destinationsWithUrls);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching destinations:', err);
//       setError('Failed to fetch destinations');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setError('Please upload a valid image file');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError('Image must be less than 5MB');
//       return;
//     }

//     const imageFormData = new FormData();
//     imageFormData.append('image', file);

//     try {
//       const response = await api.post('/api/upload', imageFormData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       console.log('Upload response:', response.data);
//       const imagePath = response.data.imageUrl;

//       setFormData(prev => ({
//         ...prev,
//         image: imagePath
//       }));

//       setPreviewUrl(`${BACKEND_URL}${imagePath}`);
//       setError(null);
//     } catch (err) {
//       console.error('Upload error:', err);
//       setError('Failed to upload image');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const submitData = {
//         ...formData,
//         details: formData.details || []
//       };

//       if (isEditing) {
//         await api.put(`/api/destinations/${formData._id}`, submitData);
//       } else {
//         await api.post('/api/destinations', submitData);
//       }
//       resetForm();
//       fetchDestinations();
//     } catch (err) {
//       console.error('Error saving destination:', err);
//       setError('Failed to save destination');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/api/destinations/${id}`);
//       fetchDestinations();
//     } catch (err) {
//       console.error('Error deleting destination:', err);
//       setError('Failed to delete destination');
//     }
//   };

//   const handleEdit = (destination) => {
//     setFormData({
//       ...destination,
//       details: destination.details || []
//     });
//     setPreviewUrl(destination.fullImageUrl);
//     setIsEditing(true);
//   };

//   const resetForm = () => {
//     setFormData(initialFormData);
//     setPreviewUrl('');
//     setIsEditing(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-lg shadow-lg p-6 mb-8"
//       >
//         <h2 className="text-2xl font-bold mb-6">
//           {isEditing ? 'Edit Destination' : 'Add New Destination'}
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               rows="4"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Details (comma-separated)</label>
//             <input
//               type="text"
//               name="details"
//               value={formData.details.join(', ')}
//               onChange={(e) => {
//                 const detailsArray = e.target.value.split(',').map(item => item.trim());
//                 setFormData(prev => ({ ...prev, details: detailsArray }));
//               }}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Image</label>
//             <div className="flex items-center space-x-4">
//               <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded flex items-center">
//                 <Upload size={20} className="mr-2" />
//                 Choose Image
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   accept="image/*"
//                 />
//               </label>
              
//               {previewUrl && (
//                 <div className="relative">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="h-24 w-24 object-cover rounded"
//                   />
//                   <div className="text-xs text-gray-500 mt-1">
//                     Image path: {formData.image}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Preview URL: {previewUrl}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPreviewUrl('');
//                       setFormData(prev => ({ ...prev, image: '' }));
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={resetForm}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               {isEditing ? 'Update' : 'Create'} Destination
//             </button>
//           </div>
//         </form>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {destinations.map((destination) => (
//           <motion.div
//             key={destination._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             {destination.image && (
//               <div>
//                 <img
//                   src={destination.fullImageUrl}
//                   alt={destination.title}
//                   className="w-full h-48 object-cover rounded mb-4"
//                 />
//                 {/* Debug info */}
//                 <div className="text-xs text-gray-500 mt-1">
//                   Stored path: {destination.image}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Full URL: {destination.fullImageUrl}
//                 </div>
//               </div>
//             )}
//             <h4 className="text-lg font-bold mb-2">{destination.title}</h4>
//             <p className="text-sm text-gray-600 mb-2">{destination.category}</p>
//             <p className="text-sm mb-4">{destination.description}</p>
//             {destination.details && destination.details.length > 0 && (
//               <div className="mb-4">
//                 <h5 className="text-sm font-semibold mb-2">Details:</h5>
//                 <ul className="list-disc list-inside">
//                   {destination.details.map((detail, index) => (
//                     <li key={index} className="text-sm text-gray-600">{detail}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="flex space-x-2">
//               <button
//                 onClick={() => handleEdit(destination)}
//                 className="text-blue-500 hover:text-blue-600"
//               >
//                 <Edit size={20} />
//               </button>
//               <button
//                 onClick={() => handleDelete(destination._id)}
//                 className="text-red-500 hover:text-red-600"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           </motion.div>
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
      discount: '',
      bestTime: '',
      inclusions: [''],
      notIncluded: ['']
    },
    rating: 0,
    reviewCount: 0,
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
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/upload', {
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
              step="0.1"
              min="0"
              max="5"
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
              value={formData.reviewCount || 0}
              onChange={(e) => setFormData({...formData, reviewCount: parseInt(e.target.value) || 0})}
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