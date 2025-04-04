


// import { useState, useEffect } from 'react';

// const AdminTour = () => {
//   const initialFormState = {
//     title: '',
//     location: '',
//     duration: '',
//     price: '',
//     rating: 0,
//     reviews: 0,
//     image: '',
//     amenities: [],
//     description: '',
//     highlights: [''],
//     included: [''],
//     excluded: [''],
//     itinerary: [{
//       day: 'Day 1',
//       title: '',
//       activities: [''],
//       meals: ['']
//     }],
//     additionalInfo: {
//       bestTimeToVisit: '',
//       difficulty: '',
//       ageLimit: '',
//       startPoint: '',
//       endPoint: '',
//       languages: []
//     }
//   };

//   const [tours, setTours] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const fetchTours = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/trending');
//       const data = await response.json();
//       setTours(data);
//     } catch (error) {
//       showAlert('Error fetching tours', 'error');
//     }
//   };

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
//   };

//   const handleInputChange = (e, index, field, subfield) => {
//     const { name, value } = e.target;
    
//     if (field === 'additionalInfo') {
//       setFormData({
//         ...formData,
//         additionalInfo: {
//           ...formData.additionalInfo,
//           [name]: value
//         }
//       });
//     } else if (field && subfield) {
//       const newData = [...formData[field]];
//       if (Array.isArray(newData[index][subfield])) {
//         newData[index][subfield][0] = value;
//       } else {
//         newData[index][subfield] = value;
//       }
//       setFormData({ ...formData, [field]: newData });
//     } else if (field) {
//       const newData = [...formData[field]];
//       newData[index] = value;
//       setFormData({ ...formData, [field]: newData });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isEditing 
//         ? `http://localhost:5000/api/trending/${editId}`
//         : 'http://localhost:5000/api/trending';
      
//       const method = isEditing ? 'PATCH' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         showAlert(`Tour ${isEditing ? 'updated' : 'created'} successfully`, 'success');
//         fetchTours();
//         resetForm();
//       }
//     } catch (error) {
//       showAlert('Error saving tour', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this tour?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/trending/${id}`, {
//           method: 'DELETE'
//         });
//         if (response.ok) {
//           showAlert('Tour deleted successfully', 'success');
//           fetchTours();
//         }
//       } catch (error) {
//         showAlert('Error deleting tour', 'error');
//       }
//     }
//   };

//   const handleEdit = (tour) => {
//     setFormData(tour);
//     setIsEditing(true);
//     setEditId(tour._id);
//   };

//   const resetForm = () => {
//     setFormData(initialFormState);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   return (
//     <div className="container">
//       {alert.show && (
//         <div className={`alert ${alert.type}`}>
//           {alert.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="tour-form">
//         <h2>{isEditing ? 'Edit Tour' : 'Add New Tour'}</h2>
        
//         <div className="form-group">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Tour Title"
//             required
//           />
//         </div>

//         <div className="form-row">
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             placeholder="Location"
//             required
//           />
//           <input
//             type="text"
//             name="duration"
//             value={formData.duration}
//             onChange={handleInputChange}
//             placeholder="Duration"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             placeholder="Price"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Description"
//             required
//           />
//         </div>

//         {/* Highlights */}
//         <div className="form-array">
//           <h3>Highlights</h3>
//           {formData.highlights.map((highlight, index) => (
//             <div key={index} className="array-item">
//               <input
//                 type="text"
//                 value={highlight}
//                 onChange={(e) => handleInputChange(e, index, 'highlights')}
//                 placeholder="Add highlight"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   const newHighlights = [...formData.highlights, ''];
//                   setFormData({ ...formData, highlights: newHighlights });
//                 }}
//               >
//                 +
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Itinerary */}
//         <div className="form-array">
//           <h3>Itinerary</h3>
//           {formData.itinerary.map((day, index) => (
//             <div key={index} className="itinerary-day">
//               <input
//                 type="text"
//                 value={day.title}
//                 onChange={(e) => handleInputChange(e, index, 'itinerary', 'title')}
//                 placeholder="Day Title"
//               />
//               <div className="activities">
//                 {day.activities.map((activity, actIndex) => (
//                   <input
//                     key={actIndex}
//                     type="text"
//                     value={activity}
//                     onChange={(e) => {
//                       const newItinerary = [...formData.itinerary];
//                       newItinerary[index].activities[actIndex] = e.target.value;
//                       setFormData({ ...formData, itinerary: newItinerary });
//                     }}
//                     placeholder="Activity"
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newItinerary = [...formData.itinerary];
//                     newItinerary[index].activities.push('');
//                     setFormData({ ...formData, itinerary: newItinerary });
//                   }}
//                 >
//                   Add Activity
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               const newItinerary = [
//                 ...formData.itinerary,
//                 {
//                   day: `Day ${formData.itinerary.length + 1}`,
//                   title: '',
//                   activities: [''],
//                   meals: []
//                 }
//               ];
//               setFormData({ ...formData, itinerary: newItinerary });
//             }}
//           >
//             Add Day
//           </button>
//         </div>

//         <button type="submit" className="submit-btn">
//           {isEditing ? 'Update Tour' : 'Create Tour'}
//         </button>
//         {isEditing && (
//           <button type="button" onClick={resetForm} className="cancel-btn">
//             Cancel
//           </button>
//         )}
//       </form>

//       <div className="tours-list">
//         <h2>Tours</h2>
//         {tours.map(tour => (
//           <div key={tour._id} className="tour-card">
//             <h3>{tour.title}</h3>
//             <p>{tour.location} - {tour.duration}</p>
//             <p>Price: ${tour.price}</p>
//             <p>Rating: {tour.rating} ({tour.reviews} reviews)</p>
//             <div className="tour-actions">
//               <button onClick={() => handleEdit(tour)}>Edit</button>
//               <button onClick={() => handleDelete(tour._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .container {
//           padding: 20px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .alert {
//           padding: 10px;
//           margin-bottom: 20px;
//           border-radius: 4px;
//         }

//         .alert.success {
//           background-color: #d4edda;
//           color: #155724;
//         }

//         .alert.error {
//           background-color: #f8d7da;
//           color: #721c24;
//         }

//         .tour-form {
//           background: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .form-group {
//           margin-bottom: 15px;
//         }

//         .form-row {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//         }

//         input, textarea {
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           margin-bottom: 10px;
//         }

//         textarea {
//           min-height: 100px;
//         }

//         button {
//           padding: 8px 16px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .submit-btn {
//           background: #4CAF50;
//           color: white;
//           margin-right: 10px;
//         }

//         .cancel-btn {
//           background: #f44336;
//           color: white;
//         }

//         .tours-list {
//           margin-top: 40px;
//         }

//         .tour-card {
//           background: #fff;
//           padding: 15px;
//           margin-bottom: 15px;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .tour-actions {
//           display: flex;
//           gap: 10px;
//           margin-top: 10px;
//         }

//         .array-item {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 10px;
//         }

//         .itinerary-day {
//           border: 1px solid #ddd;
//           padding: 15px;
//           margin-bottom: 15px;
//           border-radius: 4px;
//         }

//         .activities {
//           margin-left: 20px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminTour;


// import { useState, useEffect } from 'react';

// const TourManager = () => {
//   const initialFormState = {
//     title: '',
//     location: '',
//     duration: '',
//     price: '',
//     rating: 0,
//     reviews: 0,
//     image: '',
//     amenities: [''],
//     description: '',
//     highlights: [''],
//     included: [''],
//     excluded: [''],
//     itinerary: [{
//       day: 'Day 1',
//       title: '',
//       activities: [''],
//       meals: ['']
//     }],
//     additionalInfo: {
//       bestTimeToVisit: '',
//       difficulty: '',
//       ageLimit: '',
//       startPoint: '',
//       endPoint: '',
//       languages: []
//     }
//   };

//   const [tours, setTours] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const fetchTours = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/tours');
//       const data = await response.json();
//       setTours(data);
//     } catch (error) {
//       showAlert('Error fetching tours', 'error');
//     }
//   };

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
//   };

//   const handleImageUpload = (file) => {
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         showAlert('Please upload an image file', 'error');
//         return;
//       }

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         showAlert('Image size should be less than 5MB', 'error');
//         return;
//       }

//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageUpload(e.dataTransfer.files[0]);
//     }
//   };

//   const handleInputChange = (e, index, field, subfield) => {
//     const { name, value } = e.target;
    
//     if (field === 'additionalInfo') {
//       setFormData({
//         ...formData,
//         additionalInfo: {
//           ...formData.additionalInfo,
//           [name]: value
//         }
//       });
//     } else if (name === 'languages') {
//       const languagesArray = value.split(',').map(lang => lang.trim());
//       setFormData({
//         ...formData,
//         additionalInfo: {
//           ...formData.additionalInfo,
//           languages: languagesArray
//         }
//       });
//     } else if (name === 'amenities') {
//       const amenitiesArray = value.split(',').map(amenity => amenity.trim());
//       setFormData({
//         ...formData,
//         amenities: amenitiesArray
//       });
//     } else if (field && subfield) {
//       const newData = [...formData[field]];
//       if (Array.isArray(newData[index][subfield])) {
//         newData[index][subfield][0] = value;
//       } else {
//         newData[index][subfield] = value;
//       }
//       setFormData({ ...formData, [field]: newData });
//     } else if (field) {
//       const newData = [...formData[field]];
//       newData[index] = value;
//       setFormData({ ...formData, [field]: newData });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleAddItem = (field, index, subfield) => {
//     if (subfield) {
//       const newData = [...formData[field]];
//       newData[index][subfield].push('');
//       setFormData({ ...formData, [field]: newData });
//     } else {
//       const newData = [...formData[field], ''];
//       setFormData({ ...formData, [field]: newData });
//     }
//   };

//   const handleRemoveItem = (field, index, subfield, subIndex) => {
//     if (subfield) {
//       const newData = [...formData[field]];
//       newData[index][subfield].splice(subIndex, 1);
//       setFormData({ ...formData, [field]: newData });
//     } else {
//       const newData = [...formData[field]];
//       newData.splice(index, 1);
//       setFormData({ ...formData, [field]: newData });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isEditing 
//         ? `http://localhost:3000/api/tours/${editId}`
//         : 'http://localhost:3000/api/tours';
      
//       const method = isEditing ? 'PATCH' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         showAlert(`Tour ${isEditing ? 'updated' : 'created'} successfully`, 'success');
//         fetchTours();
//         resetForm();
//       }
//     } catch (error) {
//       showAlert('Error saving tour', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this tour?')) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/tours/${id}`, {
//           method: 'DELETE'
//         });
//         if (response.ok) {
//           showAlert('Tour deleted successfully', 'success');
//           fetchTours();
//         }
//       } catch (error) {
//         showAlert('Error deleting tour', 'error');
//       }
//     }
//   };

//   const handleEdit = (tour) => {
//     setFormData(tour);
//     setIsEditing(true);
//     setEditId(tour._id);
//     if (tour.image) {
//       setImagePreview(tour.image);
//     }
//   };

//   const resetForm = () => {
//     setFormData(initialFormState);
//     setIsEditing(false);
//     setEditId(null);
//     setImagePreview(null);
//   };

//   return (
//     <div className="container">
//       {alert.show && (
//         <div className={`alert ${alert.type}`}>
//           {alert.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="tour-form">
//         <h2>{isEditing ? 'Edit Tour' : 'Add New Tour'}</h2>
        
//         {/* Basic Information */}
//         <div className="form-section">
//           <h3>Basic Information</h3>
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Duration</label>
//               <input
//                 type="text"
//                 name="duration"
//                 value={formData.duration}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleInputChange}
//                 min="0"
//                 max="5"
//                 step="0.1"
//               />
//             </div>
//             <div className="form-group">
//               <label>Reviews Count</label>
//               <input
//                 type="number"
//                 name="reviews"
//                 value={formData.reviews}
//                 onChange={handleInputChange}
//                 min="0"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Amenities (comma-separated)</label>
//             <input
//               type="text"
//               name="amenities"
//               value={formData.amenities.join(', ')}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div className="form-section">
//           <h3>Tour Image</h3>
//           <div 
//             className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e.target.files[0])}
//               className="file-input"
//             />
//             <p>Drag and drop an image here or click to select</p>
//             {imagePreview && (
//               <div className="image-preview">
//                 <img src={imagePreview} alt="Preview" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="form-section">
//           <h3>Additional Information</h3>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Best Time to Visit</label>
//               <input
//                 type="text"
//                 name="bestTimeToVisit"
//                 value={formData.additionalInfo.bestTimeToVisit}
//                 onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
//               />
//             </div>
//             <div className="form-group">
//               <label>Difficulty</label>
//               <input
//                 type="text"
//                 name="difficulty"
//                 value={formData.additionalInfo.difficulty}
//                 onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Age Limit</label>
//               <input
//                 type="text"
//                 name="ageLimit"
//                 value={formData.additionalInfo.ageLimit}
//                 onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
//               />
//             </div>
//             <div className="form-group">
//               <label>Start Point</label>
//               <input
//                 type="text"
//                 name="startPoint"
//                 value={formData.additionalInfo.startPoint}
//                 onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
//               />
//             </div>
//             <div className="form-group">
//               <label>End Point</label>
//               <input
//                 type="text"
//                 name="endPoint"
//                 value={formData.additionalInfo.endPoint}
//                 onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Languages (comma-separated)</label>
//             <input
//               type="text"
//               name="languages"
//               value={formData.additionalInfo.languages.join(', ')}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Arrays (Highlights, Included, Excluded) */}
//         {['highlights', 'included', 'excluded'].map((fieldName) => (
//           <div key={fieldName} className="form-section">
//             <h3>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</h3>
//             {formData[fieldName].map((item, index) => (
//               <div key={index} className="array-item">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) => handleInputChange(e, index, fieldName)}
//                   placeholder={`Add ${fieldName.slice(0, -1)}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveItem(fieldName, index)}
//                   className="remove-btn"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddItem(fieldName)}
//               className="add-btn"
//             >
//               Add {fieldName.slice(0, -1)}
//             </button>
//           </div>
//         ))}

//         {/* Itinerary */}
//         <div className="form-section">
//           <h3>Itinerary</h3>
//           {formData.itinerary.map((day, index) => (
//             <div key={index} className="itinerary-day">
//               <h4>Day {index + 1}</h4>
//               <div className="form-group">
//                 <label>Title</label>
//                 <input
//                   type="text"
//                   value={day.title}
//                   onChange={(e) => handleInputChange(e, index, 'itinerary', 'title')}
//                 />
//               </div>

//               <div className="activities-section">
//                 <label>Activities</label>
//                 {day.activities.map((activity, actIndex) => (
//                   <div key={actIndex} className="array-item">
//                     <input
//                       type="text"
//                       value={activity}
//                       onChange={(e) => {
//                         const newItinerary = [...formData.itinerary];
//                         newItinerary[index].activities[actIndex] = e.target.value;
//                         setFormData({ ...formData, itinerary: newItinerary });
//                       }}
//                     />
//                     <button>  )}
//       </form>
// <div className="tours-list">
//         <h2>Tours</h2>
//         {tours.map(tour => (
//           <div key={tour._id} className="tour-card">
//             <h3>{tour.title}</h3>
//             <p>{tour.location} - {tour.duration}</p>
//             <p>Price: ${tour.price}</p>
//             <p>Rating: {tour.rating} ({tour.reviews} reviews)</p>
//             <div className="tour-actions">
//               <button onClick={() => handleEdit(tour)}>Edit</button>
//               <button onClick={() => handleDelete(tour._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//         <style jsx>{`
//           /* Previous styles remain the same */

//           .form-section {
//             margin-bottom: 30px;
//             padding: 20px;
//             border: 1px solid #eee;
//             border-radius: 8px;
//           }

//           .image-upload {
//             margin: 20px 0;
//           }

//           .file-input {
//             margin-bottom: 10px;
//           }

//           .image-preview {
//             max-width: 300px;
//             margin-top: 10px;
//           }

//           .image-preview img {
//             width: 100%;
//             height: auto;
//             border-radius: 4px;
//           }
//  .container {
//           padding: 20px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .alert {
//           padding: 10px;
//           margin-bottom: 20px;
//           border-radius: 4px;
//         }

//         .alert.success {
//           background-color: #d4edda;
//           color: #155724;
//         }

//         .alert.error {
//           background-color: #f8d7da;
//           color: #721c24;
//         }

//         .tour-form {
//           background: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .form-group {
//           margin-bottom: 15px;
//         }

//         .form-row {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//         }

//         input, textarea {
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           margin-bottom: 10px;
//         }

//         textarea {
//           min-height: 100px;
//         }

//         button {
//           padding: 8px 16px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .submit-btn {
//           background: #4CAF50;
//           color: white;
//           margin-right: 10px;
//         }

//         .cancel-btn {
//           background: #f44336;
//           color: white;
//         }

//         .tours-list {
//           margin-top: 40px;
//         }

//         .tour-card {
//           background: #fff;
//           padding: 15px;
//           margin-bottom: 15px;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .tour-actions {
//           display: flex;
//           gap: 10px;
//           margin-top: 10px;
//         }

//         .array-item {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 10px;
//         }

//         .itinerary-day {
//           border: 1px solid #ddd;
//           padding: 15px;
//           margin-bottom: 15px;
//           border-radius: 4px;
//         }

//         .activities {
//           margin-left: 20px;
//         }

//           /* ... (rest of the previous styles remain the same) */
//  `}</style>
//     </div>
//   );
// };


        
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDAxMTAsImV4cCI6MjA1OTMxNjExMH0.OYvVZO6IeQpKuaxDENp8wHDpJj8ELObRn0VhK6wbF4Q"; // Use the anon key, not service role key
const TourManager = () => {
  const initialFormState = {
    title: '',
    location: '',
    duration: '',
    price: '',
    discount:"",
    originalPrice:"",
    rating: 0,
    reviews: 0,
    image: '',
    amenities: [''],
    description: '',
    highlights: [''],
    included: [''],
    excluded: [''],
    itinerary: [{
      day: 'Day 1',
      title: '',
      activities: [''],
      meals: ['']
    }],
    additionalInfo: {
      bestTimeToVisit: '',
      difficulty: '',
      ageLimit: '',
      startPoint: '',
      endPoint: '',
      languages: []
    }
  };

  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/trending');
      const data = await response.json();
      setTours(data);
    } catch (error) {
      showAlert('Error fetching tours', 'error');
    }
  };
const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };
  const handleImageUpload = async (file) => {
    if (!file) return;
  
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showAlert('Please upload an image file', 'error');
      return;
    }
  
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert('Image size should be less than 5MB', 'error');
      return;
    }
  
    try {
      // Option 1: Keep using your backend
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        showAlert(data.error || 'Failed to upload image', 'error');
        return;
      }
      
      console.log('Backend response:', data);
      
      // Get direct URL from Supabase using the filename from the response
      const fileName = data.imageUrl.split('/').pop();
      
      // Try to get a direct download URL from Supabase (frontend client)
      const { data: directData, error } = await supabase.storage
        .from('uploads')
        .createSignedUrl(fileName, 60 * 60); // 1 hour expiry
        
      if (directData?.signedUrl) {
        console.log('Got direct signed URL:', directData.signedUrl);
        setFormData((prev) => ({
          ...prev,
          image: directData.signedUrl,
        }));
        setImagePreview(directData.signedUrl); // Update preview
        showAlert('Image uploaded successfully!', 'success');
        return;
      }
      
      // Fallback to backend URL if direct access fails
      const fullImageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`;
      setFormData((prev) => ({
        ...prev,
        image: fullImageUrl,
      }));
      setImagePreview(fullImageUrl); // Update preview
      showAlert('Image uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showAlert('Something went wrong. Try again!', 'error');
    }
  };
  // const handleImageUpload = async (file) => {
  //   if (!file) return;
  
  //   // Validate file type
  //   if (!file.type.startsWith('image/')) {
  //     showAlert('Please upload an image file', 'error');
  //     return;
  //   }
  
  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     showAlert('Image size should be less than 5MB', 'error');
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);
  
  //     const response = await fetch('https://backend-1-7zwm.onrender.com/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       const fullImageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`; // Ensure the full URL is used
  //       setFormData((prev) => ({ ...prev, image: fullImageUrl }));
  //       setImagePreview(fullImageUrl); // Update preview
  //       showAlert('Image uploaded successfully!', 'success');
  //     } else {
  //       showAlert(data.error || 'Failed to upload image', 'error');
  //     }
  //   } catch (error) {
  //     showAlert('Something went wrong. Try again!', 'error');
  //   }
  // };
  
  // const handleImageUpload = async (file) => {
  //   if (!file) return;
  
  //   // Validate file type
  //   if (!file.type.startsWith('image/')) {
  //     showAlert('Please upload an image file', 'error');
  //     return;
  //   }
  
  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     showAlert('Image size should be less than 5MB', 'error');
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);
  
  //     const response = await fetch('http://localhost:5000/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       setFormData((prev) => ({ ...prev, image: data.imageUrl }));
  //       setImagePreview(data.imageUrl); // Update preview
  //       showAlert('Image uploaded successfully!', 'success');
  //     } else {
  //       showAlert(data.error || 'Failed to upload image', 'error');
  //     }
  //   } catch (error) {
  //     showAlert('Something went wrong. Try again!', 'error');
  //   }
  // };
  
  // const handleImageUpload = (file) => {
  //   if (file) {
  //     // Validate file type
  //     if (!file.type.startsWith('image/')) {
  //       showAlert('Please upload an image file', 'error');
  //       return;
  //     }

  //     // Validate file size (max 5MB)
  //     if (file.size > 5 * 1024 * 1024) {
  //       showAlert('Image size should be less than 5MB', 'error');
  //       return;
  //     }

  //     const previewUrl = URL.createObjectURL(file);
  //     setImagePreview(previewUrl);

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({ ...formData, image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  
   
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e, index, field, subfield) => {
    const { name, value } = e.target;
    
    if (field === 'additionalInfo') {
      setFormData({
        ...formData,
        additionalInfo: {
          ...formData.additionalInfo,
          [name]: value
        }
      });
    } else if (name === 'languages') {
      const languagesArray = value.split(',').map(lang => lang.trim());
      setFormData({
        ...formData,
        additionalInfo: {
          ...formData.additionalInfo,
          languages: languagesArray
        }
      });
    } else if (name === 'amenities') {
      const amenitiesArray = value.split(',').map(amenity => amenity.trim());
      setFormData({
        ...formData,
        amenities: amenitiesArray
      });
    } else if (field && subfield) {
      const newData = [...formData[field]];
      if (Array.isArray(newData[index][subfield])) {
        newData[index][subfield][0] = value;
      } else {
        newData[index][subfield] = value;
      }
      setFormData({ ...formData, [field]: newData });
    } else if (field) {
      const newData = [...formData[field]];
      newData[index] = value;
      setFormData({ ...formData, [field]: newData });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleAddItem = (field, index, subfield) => {
  //   if (subfield) {
  //     const newData = [...formData[field]];
  //     newData[index][subfield].push('');
  //     setFormData({ ...formData, [field]: newData });
  //   } else {
  //     const newData = [...formData[field], ''];
  //     setFormData({ ...formData, [field]: newData });
  //   }
  // };
  const handleAddItem = (field, index, subfield) => {
    setFormData((prevFormData) => {
      const newData = [...prevFormData[field]];
  
      if (subfield) {
        // Ensure the day exists
        if (!newData[index]) {
          newData[index] = { [subfield]: [] }; // Initialize the object
        }
  
        // Ensure the subfield exists and is an array
        if (!Array.isArray(newData[index][subfield])) {
          newData[index][subfield] = [];
        }
  
        newData[index][subfield].push('');
      } else {
        newData.push({ title: '', activities: [], meals: [] }); // Initialize new day object
      }
  
      return { ...prevFormData, [field]: newData };
    });
  };
  

  const handleRemoveItem = (field, index, subfield, subIndex) => {
    if (subfield) {
      const newData = [...formData[field]];
      newData[index][subfield].splice(subIndex, 1);
      setFormData({ ...formData, [field]: newData });
    } else {
      const newData = [...formData[field]];
      newData.splice(index, 1);
      setFormData({ ...formData, [field]: newData });
    }
  };

  const handleSubmit = async (e) => {
    console.log("Itinerary Data:", formData.itinerary);

    e.preventDefault();
    try {
      const url = isEditing 
        ? `https://backend-1-7zwm.onrender.com/api/trending/${editId}`
        : 'https://backend-1-7zwm.onrender.com/api/trending';
      
      const method = isEditing ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showAlert(`Tour ${isEditing ? 'updated' : 'created'} successfully`, 'success');
        fetchTours();
        resetForm();
      }
    } catch (error) {
      showAlert('Error saving tour', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        const response = await fetch(`https://backend-1-7zwm.onrender.com/api/trending/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          showAlert('Tour deleted successfully', 'success');
          fetchTours();
        }
      } catch (error) {
        showAlert('Error deleting tour', 'error');
      }
    }
  };

  const handleEdit = (tour) => {
    setFormData(tour);
    setIsEditing(true);
    setEditId(tour._id);
    if (tour.image) {
      setImagePreview(tour.image);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditId(null);
    setImagePreview(null);
  };

  return (
    <div className="container">
      {alert.show && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="tour-form">
        <h2>{isEditing ? 'Edit Tour' : 'Add New Tour'}</h2>
        
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>origianl price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Reviews Count</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities.join(', ')}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <h3>Tour Image</h3>
          <div 
            className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="file-input"
            />
            <p>Drag and drop an image here or click to select</p>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </div>
{/* <div className="form-section">
  <h3>Tour Image</h3>

  <div 
    className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
    onDragOver={(e) => e.preventDefault()} // Prevent default behavior
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDrop={(e) => {
      e.preventDefault(); // Prevent default behavior
      if (e.dataTransfer.files.length > 0) {
        handleImageUpload(e.dataTransfer.files[0]); // Handle dropped file
      }
    }}
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e.target.files[0])} // Handle selected file
      className="file-input"
      style={{ display: "none" }} // Hide default input UI
      id="file-upload"
    />
    <label htmlFor="file-upload" className="upload-label">
      Drag and drop an image here or <span>click to select</span>
    </label>
    
    {imagePreview && (
      <div className="image-preview">
        <img src={imagePreview} alt="Preview" />
      </div>
    )}
  </div>
</div> */}

        {/* Additional Information */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Best Time to Visit</label>
              <input
                type="text"
                name="bestTimeToVisit"
                value={formData.additionalInfo.bestTimeToVisit}
                onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
              />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <input
                type="text"
                name="difficulty"
                value={formData.additionalInfo.difficulty}
                onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age Limit</label>
              <input
                type="text"
                name="ageLimit"
                value={formData.additionalInfo.ageLimit}
                onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
              />
            </div>
            <div className="form-group">
              <label>Start Point</label>
              <input
                type="text"
                name="startPoint"
                value={formData.additionalInfo.startPoint}
                onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
              />
            </div>
            <div className="form-group">
              <label>End Point</label>
              <input
                type="text"
                name="endPoint"
                value={formData.additionalInfo.endPoint}
                onChange={(e) => handleInputChange(e, null, 'additionalInfo')}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Languages (comma-separated)</label>
            <input
              type="text"
              name="languages"
              value={formData.additionalInfo.languages.join(', ')}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Arrays (Highlights, Included, Excluded) */}
        {['highlights', 'included', 'excluded'].map((fieldName) => (
          <div key={fieldName} className="form-section">
            <h3>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</h3>
            {formData[fieldName].map((item, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleInputChange(e, index, fieldName)}
                  placeholder={`Add ${fieldName.slice(0, -1)}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(fieldName, index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem(fieldName)}
              className="add-btn"
            >
              Add {fieldName.slice(0, -1)}
            </button>
          </div>
        ))}

        {/* Itinerary */}
        {/* <div className="form-section">
          <h3>Itinerary</h3>
          {formData.itinerary.map((day, index) => (
            <div key={index} className="itinerary-day">
              <h4>Day {index + 1}</h4>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => handleInputChange(e, index, 'itinerary', 'title')}
                />
              </div>

              <div className="activities-section">
                <label>Activities</label>
                {day?.activities?.map((activity, actIndex) => (
                  <div key={actIndex} className="array-item">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].activities[actIndex] = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                    />
                  

                    <button
                      type="button"
                      onClick={() => handleRemoveItem('itinerary', index, 'activities', actIndex)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem('itinerary', index, 'activities')}
                  className="add-btn"
                >
                  Add Activity
                </button>
              </div>

              <div className="meals-section">
                <label>Meals</label>
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="array-item">
                    <input
                      type="text"
                      value={meal}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].meals[mealIndex] = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('itinerary', index, 'meals', mealIndex)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem('itinerary', index, 'meals')}
                  className="add-btn"
                >
                  Add Meal
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('itinerary')}
            className="add-btn"
          >
            Add Day
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update Tour' : 'Create Tour'}
          </button>
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form> */}
 <div className="form-section">
  <h3>Itinerary</h3>
  {formData.itinerary?.map((day, index) => (
    // console.log("Itinerary Data:", formData.itinerary);

    <div key={index} className="itinerary-day">
      {/* <h4>Day {index + 1}</h4> */}
    
      {/* <h4>{day.day || `Day ${index + 1}`}</h4>  */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={day?.title || ""}
          onChange={(e) => handleInputChange(e, index, 'itinerary', 'title')}
        />
      </div>  
       


      {/* Activities Section */}
      <div className="activities-section">
        <label>Activities</label>
        {day?.activities?.map((activity, actIndex) => (
          <div key={actIndex} className="array-item">
            <input
              type="text"
              value={activity || ""}
              onChange={(e) => {
                const newItinerary = [...formData.itinerary];

                // Ensure day exists
                if (!newItinerary[index]) {
                  newItinerary[index] = { activities: [], meals: [] };
                }

                // Ensure activities array exists
                if (!newItinerary[index].activities) {
                  newItinerary[index].activities = [];
                }

                newItinerary[index].activities[actIndex] = e.target.value;
                setFormData({ ...formData, itinerary: newItinerary });
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem('itinerary', index, 'activities', actIndex)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('itinerary', index, 'activities')}
          className="add-btn"
        >
          Add Activity
        </button>
      </div>

      {/* Meals Section */}
      <div className="meals-section">
        <label>Meals</label>
        {day?.meals?.map((meal, mealIndex) => (
          <div key={mealIndex} className="array-item">
            <input
              type="text"
              value={meal || ""}
              onChange={(e) => {
                const newItinerary = [...formData.itinerary];

                // Ensure day exists
                if (!newItinerary[index]) {
                  newItinerary[index] = { activities: [], meals: [] };
                }

                // Ensure meals array exists
                if (!newItinerary[index].meals) {
                  newItinerary[index].meals = [];
                }

                newItinerary[index].meals[mealIndex] = e.target.value;
                setFormData({ ...formData, itinerary: newItinerary });
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem('itinerary', index, 'meals', mealIndex)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('itinerary', index, 'meals')}
          className="add-btn"
        >
          Add Meal
        </button>
      </div>
    </div>
  ))}
  
  {/* Add Day Button */}
  <button
    type="button"
    onClick={() => handleAddItem('itinerary')}
    className="add-btn"
  >
    Add Day
  </button>
</div>

{/* Form Actions */}
<div className="form-actions">
  <button type="submit" className="submit-btn">
    {isEditing ? 'Update Tour' : 'Create Tour'}
  </button>
  <button type="button" onClick={resetForm} className="cancel-btn">
    Cancel
  </button>
</div>
</form>
      <div className="tours-list">
        <h2>Tours</h2>
        {tours.map(tour => (
          <div key={tour._id} className="tour-card">
            <h3>{tour.title}</h3>
            <p>{tour.location} - {tour.duration}</p>
            <p>Price: ${tour.price}</p>
            <p>Rating: {tour.rating} ({tour.reviews} reviews)</p>
            <div className="tour-actions">
              <button onClick={() => handleEdit(tour)}>Edit</button>
              <button onClick={() => handleDelete(tour._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .alert {
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .alert.success {
          background-color: #d4edda;
          color: #155724;
        }

        .alert.error {
          background-color: #f8d7da;
          color: #721c24;
        }

        .tour-form {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-row {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        input, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        textarea {
          min-height: 100px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn {
          background: #4CAF50;
          color: white;
          margin-right: 10px;
        }

        .cancel-btn {
          background: #f44336;
          color: white;
        }

        .tours-list {
          margin-top: 40px;
        }

        .tour-card {
          background: #fff;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .tour-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .array-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .itinerary-day {
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 4px;
        }

        .activities-section, .meals-section {
          margin-left: 20px;
        }

        .image-upload-area {
          border: 2px dashed #ddd;
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }

        .image-upload-area.drag-active {
          border-color: #4CAF50;
        }

        .image-preview {
          max-width: 300px;
          margin-top: 10px;
        }

        .image-preview img {
          width: 100%;
          height: auto;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default TourManager;