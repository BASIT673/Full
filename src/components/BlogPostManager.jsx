import React, { useState, useEffect } from 'react';
import { MoreVertical, Edit, Trash, Upload ,ImageIcon} from 'lucide-react';
// const compressImage = async (file, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;

//         // Calculate new dimensions
//         if (width > height) {
//           if (width > maxWidth) {
//             height = Math.round((height * maxWidth) / width);
//             width = maxWidth;
//           }
//         } else {
//           if (height > maxHeight) {
//             width = Math.round((width * maxHeight) / height);
//             height = maxHeight;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;

//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);

//         // Convert to base64 with compression
//         const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
//         resolve(compressedBase64);
//       };
//     };
//   });
// };
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDAxMTAsImV4cCI6MjA1OTMxNjExMH0.OYvVZO6IeQpKuaxDENp8wHDpJj8ELObRn0VhK6wbF4Q";
const BlogPostManager = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: '',
    author: '',
    readTime: '',
    category: ''
  });

  // Categories for dropdown
  const categories = ['Adventure', 'Travel', 'Food', 'Lifestyle', 'Technology', 'Health'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
const supabase = createClient(supabaseUrl, supabaseAnonKey);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       setFormData(prev => ({ ...prev, image: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // 
  const showAlert = (message, type) => {
    console.log(`${type}: ${message}`);
  };
  const handleImageChange = async (file) => {
    if (!file) return;
  
    // Validate file type
    if (!file.type.startsWith("image/")) {
      showAlert("Please upload an image file", "error");
      return;
    }
  
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert("Image size should be less than 5MB", "error");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch("https://backend-1-7zwm.onrender.com/api/upload", {
        method: "POST",
        body: formData,
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
        
        if (typeof setFormData === "function") {
          setFormData((prev) => ({ ...prev, image: imageUrl }));
        }
  
        if (typeof setImagePreview === "function") {
          setImagePreview(imageUrl);
        }
  
        showAlert("Image uploaded successfully!", "success");
      } else {
        showAlert(data.error || "Failed to upload image", "error");
      }
    } catch (error) {
      showAlert("Something went wrong. Try again!", "error");
    }
  };
  // const handleImageChange = async (file) => {
  //   if (!file) return;
  
  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     showAlert("Please upload an image file", "error");
  //     return;
  //   }
  
  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     showAlert("Image size should be less than 5MB", "error");
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);
  
  //     const response = await fetch("https://backend-1-7zwm.onrender.com/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       const fullImageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`; // Ensure the full URL is used
        
  //       if (typeof setFormData === "function") {
  //         setFormData((prev) => ({ ...prev, image: fullImageUrl }));
  //       }
  
  //       if (typeof setImagePreview === "function") {
  //         setImagePreview(fullImageUrl); // Update preview
  //       }
  
  //       showAlert("Image uploaded successfully!", "success");
  //     } else {
  //       showAlert(data.error || "Failed to upload image", "error");
  //     }
  //   } catch (error) {
  //     showAlert("Something went wrong. Try again!", "error");
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingPost ? 'PUT' : 'POST';
      const url = editingPost 
        ? `https://backend-1-7zwm.onrender.com/api/posts/${editingPost._id}`
        : 'https://backend-1-7zwm.onrender.com/api/posts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPosts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      readTime: post.readTime,
      category: post.category
    });
    setImagePreview(post.image);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://backend-1-7zwm.onrender.com/api/posts/${id}`, {
        method: 'DELETE',
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      image: '',
      author: '',
      readTime: '',
      category: ''
    });
    setEditingPost(null);
    setImagePreview('');
    setImageFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <textarea
              name="excerpt"
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="flex flex-col items-center justify-center">
          <label className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                {isUploading ? 'Compressing image...' : 'Click to upload image'}
              </span>
              <span className="text-xs text-gray-400">
                Max size: 5MB (Will be compressed if larger)
              </span>
            </div>
            <input
              // type="file"
              // className="hidden"
              // accept="image/*"
              // onChange={handleImageChange}
              // disabled={isUploading}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])} 
              disabled={isUploading}
            
            />
          </label>
        </div>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-48 mx-auto rounded"
            />
          </div>
        )}
      </div>

          {/* <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-sm text-gray-500">Click to upload image</span>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="readTime"
              placeholder="Read Time (e.g., 5 min read)"
              value={formData.readTime}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <select
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {editingPost ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-6 relative">
            <div className="absolute top-2 right-2">
              <div className="relative">
                <button className="p-1">
                  <MoreVertical className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    onClick={() => handleEdit(post)}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                  <span>{post.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostManager;



// import React, { useState, useEffect } from 'react';
// import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

// const BlogManager = () => {
//   const initialFormState = {
//     title: '',
//     description: '',
//     location: '',
//     date: '',
//     duration: '',
//     image: '',
//     imageCaption: '',
//     highlights: [{
//       title: '',
//       description: '',
//       icon: ''
//     }],
//     mainHeading: '',
//     mainContent: '',
//     activitiesTitle: 'Recommended Activities',
//     activities: [''],
//     likes: 0
//   };

//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');
//   const [formData, setFormData] = useState(initialFormState);

//   // Handle image upload with compression
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setFormData(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Add highlight field
//   const addHighlight = () => {
//     setFormData(prev => ({
//       ...prev,
//       highlights: [...prev.highlights, { title: '', description: '', icon: '' }]
//     }));
//   };

//   // Handle highlight change
//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index] = { ...newHighlights[index], [field]: value };
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   // Add activity
//   const addActivity = () => {
//     setFormData(prev => ({
//       ...prev,
//       activities: [...prev.activities, '']
//     }));
//   };

//   // Handle activity change
//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.activities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, activities: newActivities }));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Location</label>
//             <input
//               type="text"
//               value={formData.location}
//               onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Date</label>
//             <input
//               type="text"
//               value={formData.date}
//               onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
//               className="w-full border rounded p-2"
//               placeholder="e.g., August 10-17, 2024"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Duration</label>
//             <input
//               type="text"
//               value={formData.duration}
//               onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
//               className="w-full border rounded p-2"
//               placeholder="e.g., 7 Days Adventure"
//               required
//             />
//           </div>
//         </div>

//         {/* Highlights Section */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Highlights</h3>
//             <button
//               type="button"
//               onClick={addHighlight}
//               className="text-teal-600 hover:text-teal-700"
//             >
//               Add Highlight
//             </button>
//           </div>
//           {formData.highlights.map((highlight, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <input
//                 type="text"
//                 value={highlight.title}
//                 onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
//                 placeholder="Highlight Title"
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 type="text"
//                 value={highlight.description}
//                 onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
//                 placeholder="Description"
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 type="text"
//                 value={highlight.icon}
//                 onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
//                 placeholder="Icon"
//                 className="w-full border rounded p-2"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Activities Section */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Activities</h3>
//             <button
//               type="button"
//               onClick={addActivity}
//               className="text-teal-600 hover:text-teal-700"
//             >
//               Add Activity
//             </button>
//           </div>
//           {formData.activities.map((activity, index) => (
//             <input
//               key={index}
//               type="text"
//               value={activity}
//               onChange={(e) => handleActivityChange(index, e.target.value)}
//               placeholder="Activity"
//               className="w-full border rounded p-2"
//             />
//           ))}
//         </div>

//         {/* Main Content Section */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Main Heading</label>
//             <input
//               type="text"
//               value={formData.mainHeading}
//               onChange={(e) => setFormData(prev => ({ ...prev, mainHeading: e.target.value }))}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Main Content</label>
//             <textarea
//               value={formData.mainContent}
//               onChange={(e) => setFormData(prev => ({ ...prev, mainContent: e.target.value }))}
//               className="w-full border rounded p-2 h-32"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
//           >
//             {editingPost ? 'Update Post' : 'Create Post'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogManager;
// import React, { useState } from 'react';
// import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

// const BlogManager = () => {
//   const initialFormState = {
//     title: '',
//     description: '',
//     location: '',
//     date: '',
//     duration: '',
//     image: '',
//     imageCaption: '',
//     highlights: [{
//       title: '',
//       description: '',
//       icon: ''
//     }],
//     mainHeading: '',
//     mainContent: '',
//     activitiesTitle: 'Recommended Activities',
//     activities: [''],
//     likes: 0
//   };

//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');
//   const [formData, setFormData] = useState(initialFormState);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setFormData(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addHighlight = () => {
//     setFormData(prev => ({
//       ...prev,
//       highlights: [...prev.highlights, { title: '', description: '', icon: '' }]
//     }));
//   };

//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index] = { ...newHighlights[index], [field]: value };
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   const addActivity = () => {
//     setFormData(prev => ({
//       ...prev,
//       activities: [...prev.activities, '']
//     }));
//   };

//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.activities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, activities: newActivities }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingPost !== null) {
//       const updatedPosts = posts.map((post, index) =>
//         index === editingPost ? formData : post
//       );
//       setPosts(updatedPosts);
//       setEditingPost(null);
//     } else {
//       setPosts([...posts, formData]);
//     }

//     setFormData(initialFormState);
//     setImagePreview('');
//     setIsModalOpen(false);
//   };

//   const editPost = (index) => {
//     setFormData(posts[index]);
//     setEditingPost(index);
//     setIsModalOpen(true);
//   };

//   const deletePost = (index) => {
//     const updatedPosts = posts.filter((_, i) => i !== index);
//     setPosts(updatedPosts);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFormData(initialFormState);
//     setEditingPost(null);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <button
//         onClick={openModal}
//         className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 mb-4"
//       >
//         Create New Post
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Form fields go here */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Basic Information */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     required
//                   />
//                 </div>
//                 {/* Add other fields similarly */}
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
//                 >
//                   {editingPost ? 'Update Post' : 'Create Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {posts.map((post, index) => (
//           <div key={index} className="border p-4 rounded-lg">
//             <h2 className="text-xl font-bold">{post.title}</h2>
//             <p>{post.description}</p>
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => editPost(index)}
//                 className="text-teal-600 hover:text-teal-700"
//               >
//                 <Edit size={16} />
//               </button>
//               <button
//                 onClick={() => deletePost(index)}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogManager;
// import React, { useState } from 'react';
// import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

// const BlogPostManager = () => {
//   const initialFormState = {
//     title: '',
//     description: '',
//     location: '',
//     date: '',
//     duration: '',
//     image: '',
//     imageCaption: '',
//     highlights: [{
//       title: '',
//       description: '',
//       icon: ''
//     }],
//     mainHeading: '',
//     mainContent: '',
//     activitiesTitle: 'Recommended Activities',
//     activities: [''],
//     likes: 0
//   };

//   const [posts, setPosts] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');
//   const [formData, setFormData] = useState(initialFormState);

//   // Handle image upload
//   // const handleImageUpload = async (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setImagePreview(reader.result);
//   //       setFormData(prev => ({ ...prev, image: reader.result }));
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };
//   const handleImageUpload = async (file) => {
//     if (!file) return;
  
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
  
//     try {
//       const formData = new FormData();
//       formData.append('image', file);
  
//       const response = await fetch('http://localhost:5000/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         const fullImageUrl = `http://localhost:5000${data.imageUrl}`; // Ensure the full URL is used
//         setFormData((prev) => ({ ...prev, image: fullImageUrl }));
//         setImagePreview(fullImageUrl); // Update preview
//         showAlert('Image uploaded successfully!', 'success');
//       } else {
//         showAlert(data.error || 'Failed to upload image', 'error');
//       }
//     } catch (error) {
//       showAlert('Something went wrong. Try again!', 'error');
//     }
//   };

//   // Add a new highlight field
//   const addHighlight = () => {
//     setFormData(prev => ({
//       ...prev,
//       highlights: [...prev.highlights, { title: '', description: '', icon: '' }]
//     }));
//   };

//   // Handle changes in highlight fields
//   const handleHighlightChange = (index, field, value) => {
//     const newHighlights = [...formData.highlights];
//     newHighlights[index] = { ...newHighlights[index], [field]: value };
//     setFormData(prev => ({ ...prev, highlights: newHighlights }));
//   };

//   // Add a new activity field
//   const addActivity = () => {
//     setFormData(prev => ({
//       ...prev,
//       activities: [...prev.activities, '']
//     }));
//   };

//   // Handle changes in activity fields
//   const handleActivityChange = (index, value) => {
//     const newActivities = [...formData.activities];
//     newActivities[index] = value;
//     setFormData(prev => ({ ...prev, activities: newActivities }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingPost !== null) {
//       // Update existing post
//       const updatedPosts = posts.map((post, index) =>
//         index === editingPost ? formData : post
//       );
//       setPosts(updatedPosts);
//       setEditingPost(null);
//     } else {
//       // Add new post
//       setPosts([...posts, formData]);
//     }

//     // Reset form
//     setFormData(initialFormState);
//     setImagePreview('');
//     setIsModalOpen(false);
//   };

//   // Edit a post
//   const editPost = (index) => {
//     setFormData(posts[index]);
//     setEditingPost(index);
//     setIsModalOpen(true);
//   };

//   // Delete a post
//   const deletePost = (index) => {
//     const updatedPosts = posts.filter((_, i) => i !== index);
//     setPosts(updatedPosts);
//   };

//   // Open modal for creating/editing a post
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Close modal and reset form
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFormData(initialFormState);
//     setEditingPost(null);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <button
//         onClick={openModal}
//         className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 mb-4"
//       >
//         Create New Post
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Location</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Date</label>
//                   <input
//                     type="text"
//                     value={formData.date}
//                     onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     placeholder="e.g., August 10-17, 2024"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Duration</label>
//                   <input
//                     type="text"
//                     value={formData.duration}
//                     onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     placeholder="e.g., 7 Days Adventure"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="w-full border rounded p-2"
//                   />
//                   {imagePreview && (
//                     <div className="mt-2">
//                       <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Highlights Section */}
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-medium">Highlights</h3>
//                   <button
//                     type="button"
//                     onClick={addHighlight}
//                     className="text-teal-600 hover:text-teal-700"
//                   >
//                     Add Highlight
//                   </button>
//                 </div>
//                 {formData.highlights.map((highlight, index) => (
//                   <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <input
//                       type="text"
//                       value={highlight.title}
//                       onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
//                       placeholder="Highlight Title"
//                       className="w-full border rounded p-2"
//                     />
//                     <input
//                       type="text"
//                       value={highlight.description}
//                       onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
//                       placeholder="Description"
//                       className="w-full border rounded p-2"
//                     />
//                     <input
//                       type="text"
//                       value={highlight.icon}
//                       onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
//                       placeholder="Icon"
//                       className="w-full border rounded p-2"
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Activities Section */}
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-medium">Activities</h3>
//                   <button
//                     type="button"
//                     onClick={addActivity}
//                     className="text-teal-600 hover:text-teal-700"
//                   >
//                     Add Activity
//                   </button>
//                 </div>
//                 {formData.activities.map((activity, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={activity}
//                     onChange={(e) => handleActivityChange(index, e.target.value)}
//                     placeholder="Activity"
//                     className="w-full border rounded p-2"
//                   />
//                 ))}
//               </div>

//               {/* Main Content Section */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Main Heading</label>
//                   <input
//                     type="text"
//                     value={formData.mainHeading}
//                     onChange={(e) => setFormData(prev => ({ ...prev, mainHeading: e.target.value }))}
//                     className="w-full border rounded p-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Main Content</label>
//                   <textarea
//                     value={formData.mainContent}
//                     onChange={(e) => setFormData(prev => ({ ...prev, mainContent: e.target.value }))}
//                     className="w-full border rounded p-2 h-32"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
//                 >
//                   {editingPost ? 'Update Post' : 'Create Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Display Posts */}
//       <div className="space-y-4">
//         {posts.map((post, index) => (
//           <div key={index} className="border p-4 rounded-lg">
//             <h2 className="text-xl font-bold">{post.title}</h2>
//             <p>{post.description}</p>
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => editPost(index)}
//                 className="text-teal-600 hover:text-teal-700"
//               >
//                 <Edit size={16} />
//               </button>
//               <button
//                 onClick={() => deletePost(index)}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPostManager;