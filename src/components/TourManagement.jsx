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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('https://backend-1-7zwm.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const uploadedImagePath = response.data.imageUrl; // "/uploads/1739887359913.jpeg"
      const fullImageUrl = `https://backend-1-7zwm.onrender.com${uploadedImagePath}`; // Full URL
  
      console.log('Full image URL:', fullImageUrl);
  
      setFormData((prev) => ({
        ...prev,
        image: fullImageUrl, // Save the full URL
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
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