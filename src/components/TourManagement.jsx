// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TourManagement = () => {
//   const [tours, setTours] = useState([]);
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [images, setImages] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     duration: '',
//     groupSize: '',
//     location: '',
//     description: '',
//     rating: 4.5,
//     reviews: 0,
//     price: '',
//     image:"",
//     highlights: [''],
//     itinerary: [''],
//     included: [''],
//     notIncluded: [''],
//   });

//   // Fetch all tours
//   const fetchTours = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/Grid');
//       console.log('API response:', response.data)
//       setTours(response.data.data.tours);
//     } catch (error) {
//       console.error('Error fetching tours:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   // Handle image upload
//   // const handleImageUpload = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   files.forEach(file => {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setImages(prev => [...prev, reader.result]);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   });
//   // };
//   // 
//   // Handle form input changes
//   const handleChange = (e, index, field) => {
//     const { name, value } = e.target;
    
//     if (['highlights', 'itinerary', 'included', 'notIncluded'].includes(field)) {
//       const newArray = [...formData[field]];
//       newArray[index] = value;
//       setFormData(prev => ({ ...prev, [field]: newArray }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // Add new item to array fields
//   const handleAddItem = (field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   // Remove item from array fields
//   const handleRemoveItem = (index, field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing && selectedTour) {
//         await axios.patch(`http://localhost:5000/api/Grid/${selectedTour._id}`, formData);
//       } else {
//         await axios.post('http://localhost:5000/api/Grid', formData);
//       }
//       fetchTours();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving tour:', error);
//     }
//   };
 
  

//   // Delete tour
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/Grid/${id}`);
//       fetchTours();
//     } catch (error) {
//       console.error('Error deleting tour:', error);
//     }
//   };

//   // Edit tour
//   const handleEdit = (tour) => {
//     setSelectedTour(tour);
//     setFormData(tour);
//     setIsEditing(true);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       title: '',
//       duration: '',
//       groupSize: '',
//       location: '',
//       description: '',
//       rating: 4.5,
//       image:"",
//       reviews: 0,
//       price: '',
//       highlights: [''],
//       itinerary: [''],
//       included: [''],
//       notIncluded: [''],
//     });
//     setSelectedTour(null);
//     setIsEditing(false);
//     setImages([]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         {isEditing ? 'Edit Tour' : 'Create New Tour'}
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Basic Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={(e) => handleChange(e)}
//             placeholder="Tour Title"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="duration"
//             value={formData.duration}
//             onChange={(e) => handleChange(e)}
//             placeholder="Duration (days)"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="groupSize"
//             value={formData.groupSize}
//             onChange={(e) => handleChange(e)}
//             placeholder="Group Size"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={(e) => handleChange(e)}
//             placeholder="Location"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={(e) => handleChange(e)}
//             placeholder="Price"
//             className="border p-2 rounded"
//             required
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={(e) => handleChange(e)}
//             placeholder="Description"
//             className="border p-2 rounded"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="space-y-2">
//           <label className="block">Tour Images</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border p-2 rounded"
//           />
//           <div className="flex flex-wrap gap-2">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Preview ${index}`}
//                 className="w-24 h-24 object-cover rounded"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Arrays */}
//         {['highlights', 'itinerary', 'included', 'notIncluded'].map((field) => (
//           <div key={field} className="space-y-2">
//             <label className="block capitalize">{field}</label>
//             {formData[field].map((item, index) => (
//               <div key={index} className="flex gap-2">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) => handleChange(e, index, field)}
//                   placeholder={`Add ${field} item`}
//                   className="border p-2 rounded flex-1"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveItem(index, field)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddItem(field)}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add {field}
//             </button>
//           </div>
//         ))}

//         {/* Submit Buttons */}
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-6 py-2 rounded"
//           >
//             {isEditing ? 'Update Tour' : 'Create Tour'}
//           </button>
//           {isEditing && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="bg-gray-500 text-white px-6 py-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Tours List */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Existing Tours</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {tours.map((tour) => (
//             <div key={tour._id} className="border p-4 rounded">
//               <h3 className="font-bold">{tour.title}</h3>
//               <p>{tour.location}</p>
//               <p>${tour.price}</p>
//               <div className="flex gap-2 mt-2">
//                 <button
//                   onClick={() => handleEdit(tour)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(tour._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';


// const supabaseUrl = 'https://your-project-id.supabase.co';
// const supabaseKey = 'your-anon-key';
// Add these imports to your frontend file
// import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (placed outside your component)
// const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDAxMTAsImV4cCI6MjA1OTMxNjExMH0.OYvVZO6IeQpKuaxDENp8wHDpJj8ELObRn0VhK6wbF4Q"; // Use the anon key, not service role key


// Modified upload function

// const supabaseClient = createClient(supabaseUrl, supabaseKey);

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    groupSize: '',
    location: '',
    description: '',
    rating: '',
    reviews: '',
    collection:"",
    originalPrice:"",
    discount:"",
    price: '',
    image: '', // Single image URL (or use an array for multiple images)
    highlights: [''],
    itinerary: [''],
    included: [''],
    notIncluded: [''],
  });
//   const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzc0MDExMCwiZXhwIjoyMDU5MzE2MTEwfQ.PvGyU3V6XwaCrsnxQ0RsInGcv6FdCY_UJDokeCobo5Y"; 
  // Fetch all tours
  // const fetchTours = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/Grid');
  //     console.log('API response:', response.data);
  //     setTours(response.data.data.tours);
  //   } catch (error) {
  //     console.error('Error fetching tours:', error);
  //   }
  // };
  const fetchTours = async () => {
    try {
      const response = await axios.get('https://backend-1-7zwm.onrender.com/api/Grid');
      // Verify the actual response structure
      setTours(response.data.data?.tours || response.data);
    } catch (error) {
      console.error('Fetch error:', error.response?.data);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  // Handle image upload
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0]; // For single image upload
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('image', file); // Ensure the field name matches your API

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     // Update the formData with the uploaded image URL
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: response.data.imageUrl, // Assuming the API returns the image URL
  //     }));
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const uploadFormData = new FormData();
  //   uploadFormData.append('image', file);

  //   try {
  //     const uploadResponse = await axios.post(
  //       'http://localhost:5000/api/upload',
  //       uploadFormData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     // Check the actual response structure from your API
  //     const imageUrl = uploadResponse.data.imageUrl || uploadResponse.data.url;
      
  //     setFormData(prev => ({
  //       ...prev,
  //       image: imageUrl
  //     }));
  //   } catch (error) {
  //     console.error('Image upload failed:', error.response?.data);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     console.log('Uploaded image URL:', response.data.imageUrl);
  
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: `http://localhost:5000/upload/${response.data.imageUrl}`, // Ensure full path
  //     }));
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     const uploadedImagePath = response.data.imageUrl; // "/uploads/1739887359913.jpeg"
  //     const fullImageUrl = `https://backend-1-7zwm.onrender.com${uploadedImagePath}`; // Full URL
  
  //     console.log('Full image URL:', fullImageUrl);
  
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: fullImageUrl, // Save the full URL
  //     }));
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   console.log('Selected file:', {
  //     name: file.name,
  //     type: file.type,
  //     size: file.size
  //   });
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     console.log('Sending upload request to backend...');
  //     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     console.log('Full response from backend:', response.data);
  
  //     // Use the Supabase URL if available, otherwise fall back to the old method
  //     const imageUrl = response.data.supabaseUrl || 
  //                     `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  
  //     console.log('Final image URL being used:', imageUrl);
  
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: imageUrl,
  //     }));
      
  //     // Test if the image URL is accessible
  //     try {
  //       const imgResponse = await fetch(imageUrl, { method: 'HEAD' });
  //       console.log('Image URL accessibility test:', {
  //         status: imgResponse.status,
  //         ok: imgResponse.ok,
  //         headers: Object.fromEntries([...imgResponse.headers])
  //       });
  //     } catch (imgError) {
  //       console.error('Error testing image URL:', imgError);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     console.error('Error details:', error.response?.data || error.message);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   console.log('Selected file:', {
  //     name: file.name,
  //     type: file.type,
  //     size: file.size
  //   });
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     console.log('Sending upload request to backend...');
  //     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     console.log('Full response from backend:', response.data);
  
  //     // Prioritize the Supabase URL if it's available
  //     const imageUrl = response.data.supabaseUrl || 
  //                     `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  
  //     console.log('Final image URL being used:', imageUrl);
  
  //     // Test if the image URL is valid by preloading it
  //     const img = new Image();
  //     img.onload = () => {
  //       console.log('Image loaded successfully');
  //       // Only update state if image loads successfully
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: imageUrl,
  //       }));
  //     };
  //     img.onerror = () => {
  //       console.error('Error loading image from URL:', imageUrl);
  //       // Fallback to the original URL method if Supabase URL fails
  //       const fallbackUrl = `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  //       console.log('Falling back to original URL:', fallbackUrl);
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: fallbackUrl,
  //       }));
  //     };
  //     img.src = imageUrl;
  
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     console.error('Error details:', error.response?.data || error.message);
  //   }
  // };

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
    
  //   try {
  //     // Generate a unique filename
  //     const filename = `${Date.now()}_${file.name}`;
      
  //     // Upload directly to Supabase
  //     const { data, error } = await supabaseClient
  //       .storage
  //       .from('uploads')
  //       .upload(filename, file);
      
  //     if (error) throw error;
      
  //     // Get the public URL
  //     const { data: urlData } = supabaseClient
  //       .storage
  //       .from('uploads')
  //       .getPublicUrl(filename);
      
  //     const imageUrl = urlData.publicUrl;
      
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: imageUrl,
  //     }));
      
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   console.log('Selected file:', {
  //     name: file.name,
  //     type: file.type,
  //     size: file.size
  //   });
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     console.log('Sending upload request to backend...');
  //     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     console.log('Full response from backend:', response.data);
  
  //     // Check if Supabase URL exists and is valid
  //     if (response.data.supabaseUrl) {
  //       console.log('Testing Supabase URL:', response.data.supabaseUrl);
        
  //       // Test if the image URL is valid by preloading it
  //       try {
  //         // Use fetch instead of Image for better error handling
  //         const imageResponse = await fetch(response.data.supabaseUrl, { method: 'HEAD' });
          
  //         if (imageResponse.ok) {
  //           console.log('Supabase URL is valid');
  //           setFormData((prev) => ({
  //             ...prev,
  //             image: response.data.supabaseUrl,
  //           }));
  //         } else {
  //           throw new Error(`HTTP error: ${imageResponse.status}`);
  //         }
  //       } catch (imgError) {
  //         console.error('Error validating Supabase URL:', imgError);
  //         // Fallback to the original URL method
  //         const fallbackUrl = `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  //         console.log('Falling back to original URL:', fallbackUrl);
  //         setFormData((prev) => ({
  //           ...prev,
  //           image: fallbackUrl,
  //         }));
  //       }
  //     } else {
  //       // Use the fallback URL if no Supabase URL is provided
  //       const fallbackUrl = `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  //       console.log('No Supabase URL provided, using fallback:', fallbackUrl);
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: fallbackUrl,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     console.error('Error details:', error.response?.data || error.message);
  //   }
  // }

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   console.log('Selected file:', {
  //     name: file.name,
  //     type: file.type,
  //     size: file.size
  //   });
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   try {
  //     console.log('Sending upload request to backend...');
  //     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     console.log('Full response from backend:', response.data);
  
  //     // Try URLs in preferred order: signed URL, public URL, local URL
  //     const urls = [
  //       response.data.supabaseSignedUrl,
  //       response.data.supabaseUrl,
  //       `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`
  //     ].filter(Boolean); // Remove any null/undefined values
      
  //     console.log('Available URLs to try:', urls);
      
  //     // Function to test a URL
  //     const testImageUrl = async (url) => {
  //       try {
  //         console.log(`Testing URL: ${url}`);
  //         const result = await fetch(url, { method: 'HEAD' });
  //         return result.ok;
  //       } catch (error) {
  //         console.error(`Error testing URL ${url}:`, error);
  //         return false;
  //       }
  //     };
      
  //     // Try each URL until one works
  //     for (const url of urls) {
  //       if (await testImageUrl(url)) {
  //         console.log(`URL verified working: ${url}`);
  //         setFormData((prev) => ({
  //           ...prev,
  //           image: url,
  //         }));
  //         return;
  //       }
  //     }
      
  //     // If all URLs fail, use the last fallback
  //     console.warn('All image URLs failed validation, using local fallback');
  //     const fallbackUrl = `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`;
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: fallbackUrl,
  //     }));
      
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     console.error('Error details:', error.response?.data || error.message);
  //   }
  // }

  // Add these imports to your frontend file


// Modified upload function
// const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   console.log('Selected file:', {
//     name: file.name,
//     type: file.type,
//     size: file.size
//   });

//   try {
//     // Option 1: Keep using your backend
//     const formData = new FormData();
//     formData.append('image', file);
    
//     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
    
//     console.log('Backend response:', response.data);
    
//     // Get direct URL from Supabase using the filename from the response
//     const fileName = response.data.imageUrl.split('/').pop();
    
//     // Try to get a direct download URL from Supabase (frontend client)
//     const { data: directData } = await supabase.storage
//       .from('uploads')
//       .createSignedUrl(fileName, 60 * 60); // 1 hour expiry
      
//     if (directData?.signedUrl) {
//       console.log('Got direct signed URL:', directData.signedUrl);
//       setFormData((prev) => ({
//         ...prev,
//         image: directData.signedUrl,
//       }));
//       return;
//     }
    
//     // Fallback to backend URL if direct access fails
//     setFormData((prev) => ({
//       ...prev,
//       image: `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`,
//     }));
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     console.error('Error details:', error.response?.data || error.message);
//   }
// }

// const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   console.log('Selected file:', {
//     name: file.name,
//     type: file.type,
//     size: file.size
//   });

//   try {
//     // Option 1: Keep using your backend
//     const formData = new FormData();
//     formData.append('image', file);
    
//     const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
    
//     console.log('Backend response:', response.data);
    
//     // Get direct URL from Supabase using the filename from the response
//     const fileName = response.data.imageUrl.split('/').pop();
    
//     // Try to get a direct download URL from Supabase (frontend client)
//     const { data: directData } = await supabase.storage
//       .from('uploads')
//       .createSignedUrl(fileName, 60 * 60); // 1 hour expiry
      
//     if (directData?.signedUrl) {
//       console.log('Got direct signed URL:', directData.signedUrl);
//       setFormData((prev) => ({
//         ...prev,
//         image: directData.signedUrl,
//       }));
//       return;
//     }
    
//     // Fallback to backend URL if direct access fails
//     setFormData((prev) => ({
//       ...prev,
//       image: `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`,
//     }));
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     console.error('Error details:', error.response?.data || error.message);
//   }
// }

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  console.log('Selected file:', {
    name: file.name,
    type: file.type,
    size: file.size
  });

  try {
    // Option 1: Keep using your backend
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    console.log('Backend response:', response.data);
    
    // Get direct URL from Supabase using the filename from the response
    const fileName = response.data.imageUrl.split('/').pop();
    
    // Try to get a direct download URL from Supabase (frontend client)
    // Changed from 1 hour to 1 year (365 days)
    const { data: directData } = await supabase.storage
      .from('uploads')
      .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year expiry
      
    if (directData?.signedUrl) {
      console.log('Got direct signed URL:', directData.signedUrl);
      setFormData((prev) => ({
        ...prev,
        image: directData.signedUrl,
      }));
      return;
    }
    
    // Fallback to backend URL if direct access fails
    setFormData((prev) => ({
      ...prev,
      image: `https://backend-1-7zwm.onrender.com${response.data.imageUrl}`,
    }));
  } catch (error) {
    console.error('Error uploading image:', error);
    console.error('Error details:', error.response?.data || error.message);
  }
}
  // Modified handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        // Ensure numerical fields are numbers
        price: Number(formData.price),
        // duration: Number(formData.duration),
        groupSize: Number(formData.groupSize),
        rating:Number(formData.rating),
        reviews:Number(formData.reviews),
        originalPrice:Number(formData.originalPrice),
        discount:Number(formData.discount)
      };

      if (isEditing && selectedTour) {
        await axios.patch(
          `https://backend-1-7zwm.onrender.com/api/Grid/${selectedTour._id}`,
          payload
        );
      } else {
        await axios.post(
          'https://backend-1-7zwm.onrender.com/api/Grid',
          payload
        );
      }
      
      fetchTours();
      resetForm();
    } catch (error) {
      console.error('Save failed:', {
        error: error.response?.data,
        requestPayload: formData
      });
    }
  };

  // Handle form input changes
  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (['highlights', 'itinerary', 'included', 'notIncluded'].includes(field)) {
      const newArray = [...formData[field]];
      newArray[index] = value;
      setFormData((prev) => ({ ...prev, [field]: newArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new item to array fields
  const handleAddItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove item from array fields
  const handleRemoveItem = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  

  // Delete tour
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-1-7zwm.onrender.com/api/Grid/${id}`);
      fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  // Edit tour
  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setFormData(tour);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      duration: '',
      groupSize: '',
      location: '',
      description: '',
      collection:"",
      rating: '',
      reviews: '',
      originalPrice:"",
      discount:"",
      price: '',
      image: '', // Reset image field
      highlights: [''],
      itinerary: [''],
      included: [''],
      notIncluded: [''],
    });
    setSelectedTour(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Tour' : 'Create New Tour'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            placeholder="Tour Title"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={(e) => handleChange(e)}
            placeholder="Duration (days)"
            className="border p-2 rounded"
            required
          />
         


          <input
            type="number"
            name="groupSize"
            value={formData.groupSize}
            onChange={(e) => handleChange(e)}
            placeholder="Group Size"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={(e) => handleChange(e)}
            placeholder="Location"
            className="border p-2 rounded"
            required
          />
            <input
            type="text"
            name="collection"
            value={formData.collection}
            onChange={(e) => handleChange(e)}
            placeholder="collection"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e)}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
           <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={(e) => handleChange(e)}
            placeholder="originalPrice"
            className="border p-2 rounded"
            required
          />
           <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={(e) => handleChange(e)}
            placeholder="rating"
            className="border p-2 rounded"
            required
          />
           <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={(e) => handleChange(e)}
            placeholder="reviews"
            className="border p-2 rounded"
            required
          />
           <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={(e) => handleChange(e)}
            placeholder="discount"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block">Tour Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded"
            />
          )}
        </div>

        {/* Dynamic Arrays */}
        {['highlights', 'itinerary', 'included', 'notIncluded'].map((field) => (
          <div key={field} className="space-y-2">
            <label className="block capitalize">{field}</label>
            {formData[field].map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(e, index, field)}
                  placeholder={`Add ${field} item`}
                  className="border p-2 rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index, field)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem(field)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add {field}
            </button>
          </div>
        ))}

        {/* Submit Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            {isEditing ? 'Update Tour' : 'Create Tour'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Tours List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Existing Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div key={tour._id} className="border p-4 rounded">
              <h3 className="font-bold">{tour.title}</h3>
              <p>{tour.location}</p>
              <p>${tour.price}</p>
              {tour.image && (
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourManagement;