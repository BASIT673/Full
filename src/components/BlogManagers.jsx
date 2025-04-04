



// import { PlusCircle, Edit, Trash2 } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// const BlogPostManager = () => {
//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');

//   // Initial form state with only required fields
//   const initialFormData = {
//     title: '',
//     subtitle: '',
//     location: '',
//     dateRange: {
//       start: '',
//       end: ''
//     },
//     duration: '',
//     featuredImage: '',
//     imageCaption: '',
//     highlights: [{ title: '', description: '', icon: 'Mountain' }],
//     narrative: '',
//     recommendedActivities: ['']
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/blogsection');
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => { fetchPosts(); }, []);

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     try {
//       const uploadFormData = new FormData();
//       uploadFormData.append("image", file);

//       const response = await fetch("http://localhost:5000/api/upload", {
//         method: "POST",
//         body: uploadFormData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const fullImageUrl = `http://localhost:5000${data.imageUrl}`;
//         setFormData(prev => ({ ...prev, featuredImage: fullImageUrl }));
//         setImagePreview(fullImageUrl);
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle date range changes
//   const handleDateRangeChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       dateRange: { ...prev.dateRange, [field]: value }
//     }));
//   };

//   // Handle highlight changes
//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index][field] = value;
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   // Handle activity changes
//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.recommendedActivities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, recommendedActivities: newActivities }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate required fields
//       if (!formData.title || !formData.subtitle || !formData.location) {
//         alert('Please fill in all required fields');
//         return;
//       }

//       // Validate date range
//       if (!formData.dateRange?.start || !formData.dateRange?.end) {
//         alert('Please select a valid date range');
//         return;
//       }

//       const url = editingPost
//         ? `http://localhost:5000/api/blogsection/${editingPost._id}`
//         : 'http://localhost:5000/api/blogsection';

//       const method = editingPost ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         fetchPosts();
//         setIsModalOpen(false);
//         setEditingPost(null);
//         setFormData(initialFormData);
//       } else {
//         const errorData = await response.json();
//         console.error('Server Error:', errorData);
//       }
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog Post Manager</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add New Post
//         </button>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.map(post => (
//           <div key={post._id} className="border rounded-lg p-4 shadow-sm">
//             {post.featuredImage && (
//               <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover mb-4" />
//             )}
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-gray-600">{post.subtitle}</p>
//             <div className="flex gap-2 mt-4 justify-end">
//               <button
//                 onClick={() => {
//                   setEditingPost(post);
//                   setFormData({
//                     ...initialFormData,
//                     ...post,
//                     dateRange: post.dateRange || { start: '', end: '' }
//                   });
//                   setImagePreview(post.featuredImage);
//                   setIsModalOpen(true);
//                 }}
//                 className="text-blue-500 hover:bg-blue-50 p-2 rounded"
//               >
//                 <Edit className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={async () => {
//                   if (window.confirm('Delete this post?')) {
//                     await fetch(`http://localhost:5000/api/blogsection/${post._id}`, { method: 'DELETE' });
//                     fetchPosts();
//                   }
//                 }}
//                 className="text-red-500 hover:bg-red-50 p-2 rounded"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Form */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="block mb-1 font-medium">Title*</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Subtitle */}
//               <div>
//                 <label className="block mb-1 font-medium">Subtitle*</label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block mb-1 font-medium">Location*</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Date Range */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 font-medium">Start Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.start}
//                     onChange={e => handleDateRangeChange('start', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">End Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.end}
//                     onChange={e => handleDateRangeChange('end', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

// <div className="grid grid-cols-2 gap-4">
//   <div>
//     <label className="block mb-1 font-medium">Start Date*</label>
//     <input
//       type="date"
//       value={formData?.dateRange?.start || ""}
//       onChange={(e) => handleDateRangeChange("start", e.target.value)}
//       className="w-full p-2 border rounded"
//       required
//     />
//   </div>
//   <div>
//     <label className="block mb-1 font-medium">End Date*</label>
//     <input
//       type="date"
//       value={formData?.dateRange?.end || ""}
//       onChange={(e) => handleDateRangeChange("end", e.target.value)}
//       className="w-full p-2 border rounded"
//       required
//     />
//   </div>
// </div>

//               </div>

//               {/* Duration */}
//               <div>
//                 <label className="block mb-1 font-medium">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block mb-1 font-medium">Featured Image</label>
//                 <input
//                   type="file"
//                   onChange={e => handleImageUpload(e.target.files[0])}
//                   className="w-full p-2 border rounded"
//                 />
//                 {imagePreview && (
//                   <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
//                 )}
//               </div>

//               {/* Image Caption */}
//               <div>
//                 <label className="block mb-1 font-medium">Image Caption</label>
//                 <input
//                   type="text"
//                   name="imageCaption"
//                   value={formData.imageCaption}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Highlights */}
//               <div>
//                 <label className="block mb-1 font-medium">Highlights</label>
//                 {formData.highlights.map((highlight, index) => (
//                   <div key={index} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Title"
//                       value={highlight.title}
//                       onChange={e => handleHighlightChange(index, 'title', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       value={highlight.description}
//                       onChange={e => handleHighlightChange(index, 'description', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                   </div>
//                 ))}
//                 {/* <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({
//                     ...prev,
//                     highlights: [...prev.highlights, { title: '', description: '', icon: 'Mountain' }]
//                   })}
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Highlight
//                 </button> */}
//                 <button
//   type="button"
//   onClick={() =>
//     setFormData((prev) => ({
//       ...prev,
//       highlights: [
//         ...prev.highlights,
//         { title: '', description: '', icon: 'Mountain' }
//       ],
//     }))
//   }
// >
//   Add Highlight
// </button>

//               </div>

//               {/* Narrative */}
//               <div>
//                 <label className="block mb-1 font-medium">Narrative</label>
//                 <textarea
//                   value={formData.narrative}
//                   name="narrative"
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded h-32"
//                 />
//               </div>

//               {/* Recommended Activities */}
//               <div>
//                 <label className="block mb-1 font-medium">Recommended Activities</label>
//                 {formData.recommendedActivities.map((activity, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={activity}
//                     onChange={e => handleActivityChange(index, e.target.value)}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                 ))}
//                 {/* <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({
//                     ...prev,
//                     recommendedActivities: [...prev.recommendedActivities, '']
//                   })}
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Activity
//                 </button> */}
//                 <button
//   type="button"
//   onClick={() =>
//     setFormData((prev) => ({
//       ...prev,
//       recommendedActivities: [...prev.recommendedActivities, ''],
//     }))
//   }
//   className="text-blue-500 text-sm"
// >
//   + Add Activity
// </button>

//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setFormData(initialFormData);
//                   }}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   {editingPost ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPostManager;



// import { PlusCircle, Edit, Trash2 } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// const BlogPostManager = () => {
//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');

//   // Initial form state with all required fields
//   const initialFormData = {
//     title: '',
//     subtitle: '',
//     location: '',
//     dateRange: {
//       start: '',
//       end: ''
//     },
//     duration: '',
//     featuredImage: '',
//     imageCaption: '',
//     highlights: [{ title: '', description: '', icon: 'Mountain' }],
//     narrative: '',
//     recommendedActivities: ['']
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/blogsection');
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => { fetchPosts(); }, []);

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     try {
//       const uploadFormData = new FormData();
//       uploadFormData.append("image", file);

//       const response = await fetch("http://localhost:5000/api/upload", {
//         method: "POST",
//         body: uploadFormData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const fullImageUrl = `http://localhost:5000${data.imageUrl}`;
//         setFormData(prev => ({ ...prev, featuredImage: fullImageUrl }));
//         setImagePreview(fullImageUrl);
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle date range changes
//   const handleDateRangeChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       dateRange: { ...prev.dateRange, [field]: value }
//     }));
//   };

//   // Handle highlight changes
//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index][field] = value;
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   // Handle activity changes
//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.recommendedActivities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, recommendedActivities: newActivities }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate required fields
//       if (!formData.title || !formData.subtitle || !formData.location) {
//         alert('Please fill in all required fields');
//         return;
//       }

//       // Validate date range
//       if (!formData.dateRange?.start || !formData.dateRange?.end) {
//         alert('Please select a valid date range');
//         return;
//       }

//       const url = editingPost
//         ? `http://localhost:5000/api/blogsection/${editingPost._id}`
//         : 'http://localhost:5000/api/blogsection';

//       const method = editingPost ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         fetchPosts();
//         setIsModalOpen(false);
//         setEditingPost(null);
//         setFormData(initialFormData);
//       } else {
//         const errorData = await response.json();
//         console.error('Server Error:', errorData);
//       }
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog Post Manager</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add New Post
//         </button>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.map(post => (
//           <div key={post._id} className="border rounded-lg p-4 shadow-sm">
//             {post.featuredImage && (
//               <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover mb-4" />
//             )}
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-gray-600">{post.subtitle}</p>
//             <div className="flex gap-2 mt-4 justify-end">
//               <button
//                 onClick={() => {
//                   setEditingPost(post);
//                   setFormData({
//                     ...initialFormData,
//                     ...post,
//                     dateRange: post.dateRange || { start: '', end: '' }
//                   });
//                   setImagePreview(post.featuredImage);
//                   setIsModalOpen(true);
//                 }}
//                 className="text-blue-500 hover:bg-blue-50 p-2 rounded"
//               >
//                 <Edit className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={async () => {
//                   if (window.confirm('Delete this post?')) {
//                     await fetch(`http://localhost:5000/api/blogsection/${post._id}`, { method: 'DELETE' });
//                     fetchPosts();
//                   }
//                 }}
//                 className="text-red-500 hover:bg-red-50 p-2 rounded"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Form */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="block mb-1 font-medium">Title*</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Subtitle */}
//               <div>
//                 <label className="block mb-1 font-medium">Subtitle*</label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block mb-1 font-medium">Location*</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Date Range */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 font-medium">Start Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.start}
//                     onChange={e => handleDateRangeChange('start', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">End Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.end}
//                     onChange={e => handleDateRangeChange('end', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Duration */}
//               <div>
//                 <label className="block mb-1 font-medium">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block mb-1 font-medium">Featured Image</label>
//                 <input
//                   type="file"
//                   onChange={e => handleImageUpload(e.target.files[0])}
//                   className="w-full p-2 border rounded"
//                 />
//                 {imagePreview && (
//                   <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
//                 )}
//               </div>

//               {/* Image Caption */}
//               <div>
//                 <label className="block mb-1 font-medium">Image Caption</label>
//                 <input
//                   type="text"
//                   name="imageCaption"
//                   value={formData.imageCaption}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Highlights */}
//               <div>
//                 <label className="block mb-1 font-medium">Highlights</label>
//                 {formData.highlights.map((highlight, index) => (
//                   <div key={index} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Title"
//                       value={highlight.title}
//                       onChange={e => handleHighlightChange(index, 'title', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       value={highlight.description}
//                       onChange={e => handleHighlightChange(index, 'description', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       highlights: [
//                         ...prev.highlights,
//                         { title: '', description: '', icon: 'Mountain' }
//                       ],
//                     }))
//                   }
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Highlight
//                 </button>
//               </div>

//               {/* Narrative */}
//               <div>
//                 <label className="block mb-1 font-medium">Narrative</label>
//                 <textarea
//                   value={formData.narrative}
//                   name="narrative"
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded h-32"
//                 />
//               </div>

//               {/* Recommended Activities */}
//               <div>
//                 <label className="block mb-1 font-medium">Recommended Activities</label>
//                 {formData.recommendedActivities.map((activity, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={activity}
//                     onChange={e => handleActivityChange(index, e.target.value)}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       recommendedActivities: [...prev.recommendedActivities, ''],
//                     }))
//                   }
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Activity
//                 </button>
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setFormData(initialFormData);
//                   }}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   {editingPost ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPostManager;


// import { PlusCircle, Edit, Trash2 } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// const BlogPostManager = () => {
//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');

//   // Initial form state with all required fields
//   const initialFormData = {
//     title: '',
//     subtitle: '',
//     location: '',
//     dateRange: {
//       start: '',
//       end: ''
//     },
//     duration: '',
//     featuredImage: '',
//     imageCaption: '',
//     highlights: [{ title: '', description: '', icon: 'Mountain' }],
//     narrative: '',
//     recommendedActivities: ['']
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/blogsection');
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => { fetchPosts(); }, []);

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     try {
//       const uploadFormData = new FormData();
//       uploadFormData.append("image", file);

//       const response = await fetch("http://localhost:5000/api/upload", {
//         method: "POST",
//         body: uploadFormData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const fullImageUrl = `http://localhost:5000${data.imageUrl}`;
//         setFormData(prev => ({ ...prev, featuredImage: fullImageUrl }));
//         setImagePreview(fullImageUrl);
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle date range changes
//   const handleDateRangeChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       dateRange: { ...prev.dateRange, [field]: value }
//     }));
//   };

//   // Handle highlight changes
//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index][field] = value;
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   // Handle activity changes
//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.recommendedActivities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, recommendedActivities: newActivities }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate required fields
//       if (!formData.title || !formData.subtitle || !formData.location) {
//         alert('Please fill in all required fields');
//         return;
//       }

//       // Validate date range
//       if (!formData.dateRange?.start || !formData.dateRange?.end) {
//         alert('Please select a valid date range');
//         return;
//       }

//       const url = editingPost
//         ? `http://localhost:5000/api/blogsection/${editingPost._id}`
//         : 'http://localhost:5000/api/blogsection';

//       const method = editingPost ? 'PATCH' : 'POST';

//       // Log the form data being sent
//       console.log('Form Data Submitted:', formData);

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         fetchPosts();
//         setIsModalOpen(false);
//         setEditingPost(null);
//         setFormData(initialFormData);
//       } else {
//         const errorData = await response.json();
//         console.error('Server Error:', errorData);
//       }
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog Post Manager</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add New Post
//         </button>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.map(post => (
//           <div key={post._id} className="border rounded-lg p-4 shadow-sm">
//             {post.featuredImage && (
//               <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover mb-4" />
//             )}
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-gray-600">{post.subtitle}</p>
//             <div className="flex gap-2 mt-4 justify-end">
//               <button
//                 onClick={() => {
//                   setEditingPost(post);
//                   setFormData({
//                     ...initialFormData,
//                     ...post,
//                     dateRange: post.dateRange || { start: '', end: '' }
//                   });
//                   setImagePreview(post.featuredImage);
//                   setIsModalOpen(true);
//                 }}
//                 className="text-blue-500 hover:bg-blue-50 p-2 rounded"
//               >
//                 <Edit className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={async () => {
//                   if (window.confirm('Delete this post?')) {
//                     await fetch(`http://localhost:5000/api/blogsection/${post._id}`, { method: 'DELETE' });
//                     fetchPosts();
//                   }
//                 }}
//                 className="text-red-500 hover:bg-red-50 p-2 rounded"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Form */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="block mb-1 font-medium">Title*</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Subtitle */}
//               <div>
//                 <label className="block mb-1 font-medium">Subtitle*</label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block mb-1 font-medium">Location*</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               {/* Date Range */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 font-medium">Start Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.start}
//                     onChange={e => handleDateRangeChange('start', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">End Date*</label>
//                   <input
//                     type="date"
//                     value={formData.dateRange.end}
//                     onChange={e => handleDateRangeChange('end', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Duration */}
//               <div>
//                 <label className="block mb-1 font-medium">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block mb-1 font-medium">Featured Image</label>
//                 <input
//                   type="file"
//                   onChange={e => handleImageUpload(e.target.files[0])}
//                   className="w-full p-2 border rounded"
//                 />
//                 {imagePreview && (
//                   <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
//                 )}
//               </div>

//               {/* Image Caption */}
//               <div>
//                 <label className="block mb-1 font-medium">Image Caption</label>
//                 <input
//                   type="text"
//                   name="imageCaption"
//                   value={formData.imageCaption}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Highlights */}
//               <div>
//                 <label className="block mb-1 font-medium">Highlights</label>
//                 {formData.highlights.map((highlight, index) => (
//                   <div key={index} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Title"
//                       value={highlight.title}
//                       onChange={e => handleHighlightChange(index, 'title', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       value={highlight.description}
//                       onChange={e => handleHighlightChange(index, 'description', e.target.value)}
//                       className="flex-1 p-2 border rounded"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       highlights: [
//                         ...prev.highlights,
//                         { title: '', description: '', icon: 'Mountain' }
//                       ],
//                     }))
//                   }
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Highlight
//                 </button>
//               </div>

//               {/* Narrative */}
//               <div>
//                 <label className="block mb-1 font-medium">Narrative</label>
//                 <textarea
//                   value={formData.narrative}
//                   name="narrative"
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded h-32"
//                 />
//               </div>

//               {/* Recommended Activities */}
//               <div>
//                 <label className="block mb-1 font-medium">Recommended Activities</label>
//                 {formData.recommendedActivities.map((activity, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={activity}
//                     onChange={e => handleActivityChange(index, e.target.value)}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       recommendedActivities: [...prev.recommendedActivities, ''],
//                     }))
//                   }
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add Activity
//                 </button>
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setFormData(initialFormData);
//                   }}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   {editingPost ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPostManager;



import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDAxMTAsImV4cCI6MjA1OTMxNjExMH0.OYvVZO6IeQpKuaxDENp8wHDpJj8ELObRn0VhK6wbF4Q";
const BlogPostManager = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Initial form state with all required fields
  const initialFormData = {
    title: '',
    subtitle: '',
    location: '',
    dateRange: {
      start: '',
      end: ''
    },
    duration: '',
    featuredImage: '',
    imageCaption: '',
    highlights: [{ title: '', description: '', icon: 'Mountain' }],
    narrative: '',
    recommendedActivities: ['']
  };

  const [formData, setFormData] = useState(initialFormData);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/blogsection');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => { fetchPosts(); }, []);
const supabase = createClient(supabaseUrl, supabaseAnonKey);
  // Handle image upload
  // Function 4
const handleImageUpload = async (file) => {
  if (!file) return;
  try {
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
    const response = await fetch("https://backend-1-7zwm.onrender.com/api/upload", {
      method: "POST",
      body: uploadFormData,
    });
    const data = await response.json();
    if (response.ok) {
      // Get filename from backend response
      const fileName = data.imageUrl.split('/').pop();
      
      // Get direct URL from Supabase
      const { data: directData, error } = await supabase.storage
        .from('uploads')
        .createSignedUrl(fileName, 60 * 60);
        
      let imageUrl;
      if (directData?.signedUrl) {
        imageUrl = directData.signedUrl;
      } else {
        imageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`;
      }
      
      setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
      setImagePreview(imageUrl);
    }
  } catch (error) {
    console.error("Image upload failed:", error);
  }
};
  // const handleImageUpload = async (file) => {
  //   if (!file) return;

  //   try {
  //     const uploadFormData = new FormData();
  //     uploadFormData.append("image", file);

  //     const response = await fetch("https://backend-1-7zwm.onrender.com/api/upload", {
  //       method: "POST",
  //       body: uploadFormData,
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const fullImageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`;
  //       setFormData(prev => ({ ...prev, featuredImage: fullImageUrl }));
  //       setImagePreview(fullImageUrl);
  //     }
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //   }
  // };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle date range changes
  const handleDateRangeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }));
  };

  // Handle highlight changes
  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  // Handle activity changes
  const handleActivityChange = (index, value) => {
    const newActivities = [...formData.recommendedActivities];
    newActivities[index] = value;
    setFormData(prev => ({ ...prev, recommendedActivities: newActivities }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.title || !formData.subtitle || !formData.location) {
        alert('Please fill in all required fields');
        return;
      }

      // Validate date range
      if (!formData.dateRange?.start || !formData.dateRange?.end) {
        alert('Please select a valid date range');
        return;
      }

      const url = editingPost
        ? `https://backend-1-7zwm.onrender.com/api/blogsection/${editingPost._id}`
        : 'https://backend-1-7zwm.onrender.com/api/blogsection';

      const method = editingPost ? 'PATCH' : 'POST';

      // Prepare the data to send - ensure all fields are properly included
      const dataToSend = {
        title: formData.title,
        subtitle: formData.subtitle,
        location: formData.location,
        dateRange: formData.dateRange,
        duration: formData.duration,
        featuredImage: formData.featuredImage,
        imageCaption: formData.imageCaption,
        highlights: formData.highlights.filter(h => h.title || h.description),
        narrative: formData.narrative,
        recommendedActivities: formData.recommendedActivities.filter(activity => activity.trim() !== '')
      };

      // Log the form data being sent
      console.log('Form Data Submitted:', dataToSend);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        fetchPosts();
        setIsModalOpen(false);
        setEditingPost(null);
        setFormData(initialFormData);
        setImagePreview('');
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert(`Error: ${errorData.message || 'Failed to save post'}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert(`Error: ${error.message || 'Failed to save post'}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Post Manager</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setFormData(initialFormData);
            setImagePreview('');
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Post
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post._id} className="border rounded-lg p-4 shadow-sm">
            {post.featuredImage && (
              <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover mb-4" />
            )}
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.subtitle}</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button
                onClick={() => {
                  // Ensure all fields are properly copied from the post
                  setEditingPost(post);
                  setFormData({
                    title: post.title || '',
                    subtitle: post.subtitle || '',
                    location: post.location || '',
                    dateRange: post.dateRange || { start: '', end: '' },
                    duration: post.duration || '',
                    featuredImage: post.featuredImage || '',
                    imageCaption: post.imageCaption || '',
                    highlights: post.highlights && post.highlights.length 
                      ? post.highlights 
                      : [{ title: '', description: '', icon: 'Mountain' }],
                    narrative: post.narrative || '',
                    recommendedActivities: post.recommendedActivities && post.recommendedActivities.length 
                      ? post.recommendedActivities 
                      : ['']
                  });
                  setImagePreview(post.featuredImage || '');
                  setIsModalOpen(true);
                }}
                className="text-blue-500 hover:bg-blue-50 p-2 rounded"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this post?')) {
                    try {
                      const response = await fetch(`https://backend-1-7zwm.onrender.com/api/blogsection/${post._id}`, { method: 'DELETE' });
                      if (response.ok) {
                        fetchPosts();
                      } else {
                        alert('Failed to delete post');
                      }
                    } catch (error) {
                      console.error('Error deleting post:', error);
                      alert('Error deleting post');
                    }
                  }
                }}
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block mb-1 font-medium">Subtitle*</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Start Date*</label>
                  <input
                    type="date"
                    value={formData.dateRange.start}
                    onChange={e => handleDateRangeChange('start', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date*</label>
                  <input
                    type="date"
                    value={formData.dateRange.end}
                    onChange={e => handleDateRangeChange('end', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-1 font-medium">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-medium">Featured Image</label>
                <input
                  type="file"
                  onChange={e => handleImageUpload(e.target.files[0])}
                  className="w-full p-2 border rounded"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                )}
              </div>

              {/* Image Caption */}
              <div>
                <label className="block mb-1 font-medium">Image Caption</label>
                <input
                  type="text"
                  name="imageCaption"
                  value={formData.imageCaption}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block mb-1 font-medium">Highlights</label>
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Title"
                      value={highlight.title}
                      onChange={e => handleHighlightChange(index, 'title', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={highlight.description}
                      onChange={e => handleHighlightChange(index, 'description', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      highlights: [
                        ...prev.highlights,
                        { title: '', description: '', icon: 'Mountain' }
                      ],
                    }))
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              {/* Narrative */}
              <div>
                <label className="block mb-1 font-medium">Narrative</label>
                <textarea
                  name="narrative"
                  value={formData.narrative}
                  onChange={handleChange}
                  className="w-full p-2 border rounded h-32"
                />
              </div>

              {/* Recommended Activities */}
              <div>
                <label className="block mb-1 font-medium">Recommended Activities</label>
                {formData.recommendedActivities.map((activity, index) => (
                  <input
                    key={index}
                    type="text"
                    value={activity}
                    onChange={e => handleActivityChange(index, e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      recommendedActivities: [...prev.recommendedActivities, ''],
                    }))
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add Activity
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData(initialFormData);
                    setImagePreview('');
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {editingPost ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostManager;