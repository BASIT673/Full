

// import React, { useState, useEffect } from 'react';
// import { Loader } from 'lucide-react';

// const AdminTourManager = () => {
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [tourToDelete, setTourToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     location: '',
//     description: '',
//     price: '',
//     duration: '',
//     groupSize: '',
//     image: '',
//     highlights: '',
//     included: '',
//     category: ''
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [currentTourId, setCurrentTourId] = useState(null);

//   const token = localStorage.getItem('token');
//   const API_URL = 'http://localhost:5000/api';
//   const SERVER_URL = 'http://localhost:5000';

//   const categories = [
//     "Food Destinations",
//      'Ancient Destinations',
//     'Adventure',
//     'Cultural',
//     'Beach',
//     'Mountain',
//     'City',
//     'Wildlife',
//     'Historical',
//     'Religious'
//   ];

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/tours`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch tours');
//       }

//       const data = await response.json();
//       setTours(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       image: e.target.files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const formDataObj = new FormData();

//       const processedData = {
//         ...formData,
//         price: parseFloat(formData.price),
//         groupSize: parseInt(formData.groupSize),
//         highlights: formData.highlights.split(',').map(item => item.trim()).filter(item => item),
//         included: formData.included.split(',').map(item => item.trim()).filter(item => item)
//       };

//       // Handle image upload
//       if (!editMode || (editMode && formData.image instanceof File)) {
//         formDataObj.append('image', formData.image);
//       }

//       // Append other fields
//       Object.keys(processedData).forEach(key => {
//         if (key !== 'image') {
//           if (Array.isArray(processedData[key])) {
//             processedData[key].forEach((item, index) => {
//               formDataObj.append(`${key}`, item);
//             });
//           } else {
//             formDataObj.append(key, processedData[key]);
//           }
//         }
//       });

//       const url = editMode 
//         ? `${API_URL}/tours/${currentTourId}`
//         : `${API_URL}/tours`;

//       const method = editMode ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataObj
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save tour');
//       }

//       // Reset form and refresh data
//       resetForm();
//       fetchTours();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (tour) => {
//     setFormData({
//       title: tour.title,
//       location: tour.location,
//       description: tour.description,
//       price: tour.price.toString(),
//       duration: tour.duration,
//       groupSize: tour.groupSize.toString(),
//       image: '',
//       highlights: tour.highlights.join(', '),
//       included: tour.included.join(', '),
//       category: tour.category
//     });
//     setEditMode(true);
//     setCurrentTourId(tour._id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/tours/${tourToDelete._id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete tour');
//       }

//       setTours(tours.filter(tour => tour._id !== tourToDelete._id));
//       setShowDeleteConfirm(false);
//       setTourToDelete(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       location: '',
//       description: '',
//       price: '',
//       duration: '',
//       groupSize: '',
//       image: '',
//       highlights: '',
//       included: '',
//       category: ''
//     });
//     setEditMode(false);
//     setCurrentTourId(null);
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-2xl font-bold mb-6">
//           {editMode ? 'Edit Tour' : 'Create New Tour'}
//         </h2>

//         {error && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Tour Title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
            
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />

//             <input
//               type="text"
//               name="duration"
//               placeholder="Duration (e.g., '3 days')"
//               value={formData.duration}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />

//             <input
//               type="number"
//               name="groupSize"
//               placeholder="Maximum Group Size"
//               value={formData.groupSize}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />

//             <input
//               type="file"
//               name="image"
//               onChange={handleFileChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               accept="image/*"
//             />
//           </div>

//           <textarea
//             name="description"
//             placeholder="Tour Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <textarea
//               name="highlights"
//               placeholder="Highlights (comma separated)"
//               value={formData.highlights}
//               onChange={handleChange}
//               className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//             <textarea
//               name="included"
//               placeholder="What's Included (comma separated)"
//               value={formData.included}
//               onChange={handleChange}
//               className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <Loader className="w-4 h-4 mr-2 animate-spin" />
//                   {editMode ? 'Updating...' : 'Creating...'}
//                 </span>
//               ) : (
//                 editMode ? 'Update Tour' : 'Create Tour'
//               )}
//             </button>

//             {editMode && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {tours.map(tour => (
//           <div key={tour._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="w-full h-48 overflow-hidden">
//               {tour.image ? (
//                 <img
//                   // src={`${SERVER_URL}/uploads/${tour.image}`}
//                   src={tour.image}
//                   alt={tour.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     // e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
//                     e.target.src = '../images/Hero.jpg';

//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-400">No Image Available</span>
//                 </div>
//               )}
//             </div>

//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
//               <p className="text-gray-600 mb-1">{tour.location}</p>
//               <p className="text-gray-600 mb-1">Price: ${tour.price}</p>
//               <p className="text-gray-600 mb-1">Duration: {tour.duration}</p>
//               <p className="text-gray-600 mb-2">Category: {tour.category}</p>
//               <p className="text-gray-700 mb-4 line-clamp-3">{tour.description}</p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(tour)}
//                   className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setTourToDelete(tour);
//                     setShowDeleteConfirm(true);
//                   }}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{tourToDelete?.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTourManager;
import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Search, Edit, Trash2, X, Eye, Upload, Image as ImageIcon } from 'lucide-react';

const initialFormState = {
  title: '',
  location: '',
  description: '',
  price: '',
  duration: '',
  groupSize: '',
  image: '',
  rating: 0,
  highlights: [''],
  included: [''],
  excluded: ['']
};

// Image Upload Component
// const ImageUpload = ({ currentImage, onImageUpload, disabled }) => {
//   const [uploading, setUploading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(currentImage);
//   const [uploadError, setUploadError] = useState(null);

//   const handleUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     setUploadError(null);

//     if (!file.type.startsWith('image/')) {
//       setUploadError('Please upload an image file');
//       setUploading(false);
//       return;
//     }

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewUrl(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Mock upload (replace with actual API call)
//     setTimeout(() => {
//       const mockUrl = URL.createObjectURL(file);
//       onImageUpload(mockUrl);
//       setUploading(false);
//     }, 1000);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//         {previewUrl ? (
//           <div className="relative">
//             <img
//               src={previewUrl}
//               alt="Tour preview"
//               className="w-full h-48 object-cover rounded-lg"
//             />
//             {!disabled && (
//               <button
//                 onClick={() => document.getElementById('imageInput').click()}
//                 className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg"
//               >
//                 <Edit className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         ) : (
//           <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
//             <ImageIcon className="w-12 h-12 text-gray-400" />
//             <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
//           </label>
//         )}
//         <input
//           id="imageInput"
//           type="file"
//           accept="image/*"
//           onChange={handleUpload}
//           disabled={disabled || uploading}
//           className="hidden"
//         />
//       </div>
//       {uploading && (
//         <div className="flex items-center justify-center">
//           <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
//           <span className="ml-2 text-sm text-gray-600">Uploading...</span>
//         </div>
//       )}
//       {uploadError && (
//         <p className="text-red-500 text-sm">{uploadError}</p>
//       )}
//     </div>
//   );
// };
const ImageUpload = ({ currentImage, onImageUpload, disabled }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [uploadError, setUploadError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      setUploading(false);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Mock upload (replace with actual API call)
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      onImageUpload(mockUrl);
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Tour preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            {!disabled && (
              <button
                onClick={() => document.getElementById('imageInput').click()} // Fix: Trigger file input
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <label
            htmlFor="imageInput" // Fix: Link label to file input
            className="flex flex-col items-center justify-center h-48 cursor-pointer"
          >
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
          </label>
        )}
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={disabled || uploading}
          className="hidden"
        />
      </div>
      {uploading && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">Uploading...</span>
        </div>
      )}
      {uploadError && (
        <p className="text-red-500 text-sm">{uploadError}</p>
      )}
    </div>
  );
};
// Tour Card Component
const TourCard = ({ tour, onEdit, onDelete, onView }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <img
        src={tour.image || '/api/placeholder/800/500'}
        alt={tour.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-lg font-semibold text-white">{tour.title}</h3>
        <p className="text-white/90 text-sm mt-1">{tour.location}</p>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>${tour.price}</span>
        <span>{tour.duration}</span>
        <span>Max {tour.groupSize} people</span>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onView}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Eye className="w-5 h-5" />
        </button>
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// Main Tour Management Component
const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  // const fetchTours = async () => {
  //   setLoading(true);
  //   try {
  //     // Mock API call (replace with actual API call)
  //     const mockTours = [
  //       {
  //         id: 1,
  //         title: 'Tour 1',
  //         location: 'Location 1',
  //         description: 'Description 1',
  //         price: 100,
  //         duration: '2 days',
  //         groupSize: 10,
  //         image: 'https://via.placeholder.com/800x500',
  //         rating: 4.5,
  //         highlights: ['Highlight 1', 'Highlight 2'],
  //         included: ['Included 1', 'Included 2'],
  //         excluded: ['Excluded 1', 'Excluded 2']
  //       },
  //       // Add more mock tours as needed
  //     ];
  //     setTours(mockTours);
  //   } catch (err) {
  //     setError('Failed to fetch tours');
  //   }
  //   setLoading(false);
  // };
  const fetchTours = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'GET', // Assuming your API uses GET for fetching data
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required (e.g., authorization tokens)
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
  
      const data = await response.json(); // Parse the JSON response
      setTours(data); // Update the tours state with the fetched data
    } catch (err) {
      setError('Failed to fetch tours');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        // Mock API call (replace with actual API call)
        setTours(tours.filter(tour => tour.id !== id));
      } catch (err) {
        setError('Failed to delete tour');
      }
    }
  };

  const filteredTours = tours.filter(tour => 
    tour.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tour Management</h1>
          <button
            onClick={() => {
              setSelectedTour(null);
              setViewMode('create');
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Tour
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tour List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                onEdit={() => {
                  setSelectedTour(tour);
                  setViewMode('edit');
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDelete(tour.id)}
                onView={() => {
                  setSelectedTour(tour);
                  setViewMode('view');
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <TourModal
            tour={selectedTour}
            mode={viewMode}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTour(null);
            }}
            onSave={async (tourData) => {
              try {
                if (viewMode === 'create') {
                  // Mock API call (replace with actual API call)
                  const newTour = { ...tourData, id: Date.now() };
                  setTours([...tours, newTour]);
                } else if (viewMode === 'edit') {
                  // Mock API call (replace with actual API call)
                  const updatedTour = { ...tourData };
                  setTours(tours.map(t => t.id === updatedTour.id ? updatedTour : t));
                }
                setIsModalOpen(false);
                setSelectedTour(null);
              } catch (err) {
                setError('Failed to save tour');
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

// Tour Modal Component
const TourModal = ({ tour, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (tour && (mode === 'edit' || mode === 'view')) {
      setFormData(tour);
    } else {
      setFormData(initialFormState);
    }
  }, [tour, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'create' ? 'Add New Tour' : 
               mode === 'edit' ? 'Edit Tour' : 'View Tour'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(formData);
            }}
            className="space-y-6"
          >
            {/* Image Upload */}
            <ImageUpload
              currentImage={formData.image}
              onImageUpload={handleImageUpload}
              disabled={mode === 'view'}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Group Size</label>
                <input
                  type="number"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  disabled={mode === 'view'}
                  min="0"
                  max="5"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={mode === 'view'}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Highlights Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
              {formData.highlights.map((highlight, index) => (
                <div key={`highlight-${index}`} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'highlights')}
                    disabled={mode === 'view'}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {mode !== 'view' && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'highlights')}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {mode !== 'view' && (
                <button
                  type="button"
                  onClick={() => addArrayItem('highlights')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Highlight
                </button>
              )}
            </div>

            {/* Included Items Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Included Items</label>
              {formData.included.map((item, index) => (
                <div key={`included-${index}`} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'included')}
                    disabled={mode === 'view'}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {mode !== 'view' && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'included')}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {mode !== 'view' && (
                <button
                  type="button"
                  onClick={() => addArrayItem('included')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Included Item
                </button>
              )}
            </div>

            {/* Excluded Items Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excluded Items</label>
              {formData.excluded.map((item, index) => (
                <div key={`excluded-${index}`} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'excluded')}
                    disabled={mode === 'view'}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {mode !== 'view' && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'excluded')}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {mode !== 'view' && (
                <button
                  type="button"
                  onClick={() => addArrayItem('excluded')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Excluded Item
                </button>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              {mode !== 'view' && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {mode === 'create' ? 'Create Tour' : 'Save Changes'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
