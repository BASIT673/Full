// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash, Plus, X } from 'lucide-react';

// const AdminCar = () => {
//   const [cars, setCars] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: null,
//     features: [
//       { icon: 'Car', text: '' },
//       { icon: 'Fuel', text: '' },
//       { icon: 'Users', text: '' },
//       { icon: 'Car', text: '' }
//     ]
//   });

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/cars');
//       const data = await response.json();
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => 
//         i === index ? { ...feature, text: value } : feature
//       )
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       image: e.target.files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('price', formData.price);
//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }
//     formData.features.forEach((feature, index) => {
//       formDataToSend.append(`features[${index}][icon]`, feature.icon);
//       formDataToSend.append(`features[${index}][text]`, feature.text);
//     });

//     try {
//       const url = selectedCar 
//         ? `http://localhost:5000/api/cars/${selectedCar_id}`
//         : 'http://localhost:5000/api/cars';
//       const method = selectedCar ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: formDataToSend
//       });

//       if (response.ok) {
//         fetchCars();
//         setIsModalOpen(false);
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Error saving car:', error);
//     }
//   };

//   const handleDelete = async (_id) => {
//     if (window.confirm('Are you sure you want to delete this car?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${_id}`, {
//           method: 'DELETE'
//         });

//         if (response.ok) {
//           fetchCars();
//         }
//       } catch (error) {
//         console.error('Error deleting car:', error);
//       }
//     }
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setFormData({
//       name: car.name,
//       price: car.price,
//       image: null,
//       features: car.features
//     });
//     setIsModalOpen(true);
//   };

//   const resetForm = () => {
//     setSelectedCar(null);
//     setFormData({
//       name: '',
//       price: '',
//       image: null,
//       features: [
//         { icon: 'Car', text: '' },
//         { icon: 'Fuel', text: '' },
//         { icon: 'Users', text: '' },
//         { icon: 'Car', text: '' }
//       ]
//     });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Car Management</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//         >
//           <Plus size={20} />
//           Add New Car
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map(car => (
//           <div key={car.id} className="border rounded-lg p-4 shadow-sm">
//             {/* <img
//               src={car.image}
//               alt={car.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             /> */}
//             <img
//     src={`http://localhost:5000/uploads/cars${car.image}`}  // Add the prefix to the image URL
//     alt={car.name}
//     className="w-full h-48 object-cover rounded-lg mb-4"
//   />
//             <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//             <p className="text-gray-600 mb-4">${car.price}</p>
//             <div className="space-y-2">
//               {car.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                   {feature.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => handleEdit(car)}
//                 className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//               >
//                 <Pencil size={20} />
//               </button>
//               <button
//                 onClick={() => handleDelete(car.id)}
//                 className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//               >
//                 <Trash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 {selectedCar ? 'Edit Car' : 'Add New Car'}
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="w-full border rounded-lg p-2"
//                   accept="image/*"
//                   required={!selectedCar}
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Features</label>
//                 {formData.features.map((feature, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={feature.text}
//                     onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     className="w-full border rounded-lg p-2 mb-2"
//                     placeholder={`Feature ${index + 1}`}
//                     required
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   {selectedCar ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCar;





// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash, Plus, X, } from 'lucide-react';

// const AdminCar = () => {
//   const [cars, setCars] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: null,
//     features: [
//       { icon: 'Car', text: '' },
//       { icon: 'Fuel', text: '' },
//       { icon: 'Users', text: '' },
//       { icon: 'Car', text: '' }
//     ]
//   });
//   const [previewUrl, setPreviewUrl] = useState('');

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/cars');
//       const data = await response.json();
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => 
//         i === index ? { ...feature, text: value } : feature
//       )
//     }));
//   };

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setFormData(prev => ({
//   //       ...prev,
//   //       image: file
//   //     }));
//   //     // Create preview URL
//   //     const url = URL.createObjectURL(file);
//   //     setPreviewUrl(url);
//   //   }
//   // };
//   const handleImageChange = async (file) => {
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('price', formData.price);
//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }
//     formData.features.forEach((feature, index) => {
//       formDataToSend.append(`features[${index}][icon]`, feature.icon);
//       formDataToSend.append(`features[${index}][text]`, feature.text);
//     });

//     try {
//       const url = selectedCar 
//         ? `http://localhost:5000/api/cars/${selectedCar.id}`
//         : 'http://localhost:5000/api/cars';
//       const method = selectedCar ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: formDataToSend
//       });

//       if (response.ok) {
//         fetchCars();
//         setIsModalOpen(false);
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Error saving car:', error);
//     }
//   };

//   const handleDelete = async (_id) => {
//     if (window.confirm('Are you sure you want to delete this car?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${_id}`, {
//           method: 'DELETE'
//         });

//         if (response.ok) {
//           fetchCars();
//         }
//       } catch (error) {
//         console.error('Error deleting car:', error);
//       }
//     }
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setFormData({
//       name: car.name,
//       price: car.price,
//       image: null,
//       features: car.features
//     });
//     setPreviewUrl(car.image);
//     setIsModalOpen(true);
//   };

//   const resetForm = () => {
//     setSelectedCar(null);
//     setFormData({
//       name: '',
//       price: '',
//       image: null,
//       features: [
//         { icon: 'Car', text: '' },
//         { icon: 'Fuel', text: '' },
//         { icon: 'Users', text: '' },
//         { icon: 'Car', text: '' }
//       ]
//     });
//     setPreviewUrl('');
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Car Management</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//         >
//           <Plus size={20} />
//           Add New Car
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map(car => (
//           <div key={car.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//             <div className="relative h-48 mb-4">
//               <img
//                 // src={car.image}
//                 src={`http://localhost:5000/uploads/cars/${car.image}`} 
//                 alt={car.name}
//                 className="w-full h-full object-cover rounded-lg"
//                 onError={(e) => {
//                 //   e.target.src = '/images/Hero.jpg'; // Fallback image
//                 }}
//               />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//             <p className="text-gray-600 mb-4">${car.price}</p>
//             <div className="space-y-2">
//               {car.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                   {feature.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => handleEdit(car)}
//                 className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//               >
//                 <Pencil size={20} />
//               </button>
//               <button
//                 onClick={() => handleDelete(car.id)}
//                 className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               >
//                 <Trash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 {selectedCar ? 'Edit Car' : 'Add New Car'}
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="w-full border rounded-lg p-2"
//                   accept="image/*"
//                   required={!selectedCar}
//                 />
//                 {previewUrl && (
//                   <div className="mt-2 relative h-48">
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Features</label>
//                 {formData.features.map((feature, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={feature.text}
//                     onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder={`Feature ${index + 1}`}
//                     required
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   {selectedCar ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCar;






// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash, Plus, X } from 'lucide-react';

// const AdminCar = () => {
//   const [cars, setCars] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: '', // Store the image URL here
//     features: [
//       { icon: 'Car', text: '' },
//       { icon: 'Fuel', text: '' },
//       { icon: 'Users', text: '' },
//       { icon: 'Car', text: '' }
//     ]
//   });
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/cars');
//       const data = await response.json();
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) =>
//         i === index ? { ...feature, text: value } : feature
//       )
//     }));
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please upload an image file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setIsUploading(true);

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
//         setPreviewUrl(fullImageUrl); // Update preview
//         alert('Image uploaded successfully!');
//       } else {
//         alert(data.error || 'Failed to upload image');
//       }
//     } catch (error) {
//       alert('Something went wrong. Try again!');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const carData = {
//       name: formData.name,
//       price: formData.price,
//       image: formData.image, // Use the uploaded image URL
//       features: formData.features,
//     };

//     try {
//       const url = selectedCar
//         ? `http://localhost:5000/api/cars/${selectedCar.id}`
//         : 'http://localhost:5000/api/cars';
//       const method = selectedCar ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(carData),
//       });

//       if (response.ok) {
//         fetchCars();
//         setIsModalOpen(false);
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Error saving car:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this car?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           fetchCars();
//         }
//       } catch (error) {
//         console.error('Error deleting car:', error);
//       }
//     }
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setFormData({
//       name: car.name,
//       price: car.price,
//       image: car.image,
//       features: car.features,
//     });
//     setPreviewUrl(car.image); // Set preview to existing image URL
//     setIsModalOpen(true);
//   };

//   const resetForm = () => {
//     setSelectedCar(null);
//     setFormData({
//       name: '',
//       price: '',
//       image: '',
//       features: [
//         { icon: 'Car', text: '' },
//         { icon: 'Fuel', text: '' },
//         { icon: 'Users', text: '' },
//         { icon: 'Car', text: '' }
//       ]
//     });
//     setPreviewUrl('');
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Car Management</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//         >
//           <Plus size={20} />
//           Add New Car
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div key={car.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//             <div className="relative h-48 mb-4">
//               <img
//                 src={car.image}
//                 alt={car.name}
//                 className="w-full h-full object-cover rounded-lg"
//                 onError={(e) => {
//                   e.target.src = '/images/fallback.jpg'; // Fallback image
//                 }}
//               />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//             <p className="text-gray-600 mb-4">${car.price}</p>
//             <div className="space-y-2">
//               {car.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                   {feature.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => handleEdit(car)}
//                 className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//               >
//                 <Pencil size={20} />
//               </button>
//               <button
//                 onClick={() => handleDelete(car.id)}
//                 className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               >
//                 <Trash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 {selectedCar ? 'Edit Car' : 'Add New Car'}
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="w-full border rounded-lg p-2"
//                   accept="image/*"
//                   required={!selectedCar}
//                 />
//                 {previewUrl && (
//                   <div className="mt-2 relative h-48">
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 )}
//                 {isUploading && <p className="text-sm text-gray-500">Uploading image...</p>}
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Features</label>
//                 {formData.features.map((feature, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={feature.text}
//                     onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder={`Feature ${index + 1}`}
//                     required
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   {selectedCar ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCar;


// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash, Plus, X, Car, Fuel, Users } from 'lucide-react';

// const AdminCar = () => {
//   const [cars, setCars] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: '', // Store the image URL here
//     features: [
//       { icon: <Car size={16} />, text: '' },
//       { icon: <Fuel size={16} />, text: '' },
//       { icon: <Users size={16} />, text: '' },
//       { icon: <Car size={16} />, text: '' }
//     ]
//   });
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/cars');
//       const data = await response.json();
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) =>
//         i === index ? { ...feature, text: value } : feature
//       )
//     }));
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please upload an image file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setIsUploading(true);

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
//         setPreviewUrl(fullImageUrl); // Update preview
//         alert('Image uploaded successfully!');
//       } else {
//         alert(data.error || 'Failed to upload image');
//       }
//     } catch (error) {
//       alert('Something went wrong. Try again!');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const carData = {
//   //     name: formData.name,
//   //     price: formData.price,
//   //     image: formData.image, // Use the uploaded image URL
//   //     features: formData.features,
//   //   };

//   //   try {
//   //     const url = selectedCar
//   //       ? `http://localhost:5000/api/cars/${selectedCar.id}`
//   //       : 'http://localhost:5000/api/cars';
//   //     const method = selectedCar ? 'PUT' : 'POST';

//   //     const response = await fetch(url, {
//   //       method,
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(carData),
//   //     });

//   //     if (response.ok) {
//   //       fetchCars();
//   //       setIsModalOpen(false);
//   //       resetForm();
//   //     } else {
//   //       const errorData = await response.json();
//   //       console.error('Error saving car:', errorData);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving car:', error);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.image) {
//       alert('Please upload an image before submitting.');
//       return;
//     }
  
//     const carData = {
//       name: formData.name,
//       price: formData.price,
//       image: formData.image, // Ensure the image is included
//       features: formData.features,
//     };
  
//     try {
//       const url = selectedCar
//         ? `http://localhost:5000/api/cars/${selectedCar.id}`
//         : 'http://localhost:5000/api/cars';
//       const method = selectedCar ? 'PUT' : 'POST';
  
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(carData),
//       });
  
//       if (response.ok) {
//         fetchCars();
//         setIsModalOpen(false);
//         resetForm();
//       } else {
//         const errorData = await response.json();
//         console.error('Error saving car:', errorData);
//       }
//     } catch (error) {
//       console.error('Error saving car:', error);
//     }
//   };
  
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this car?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           fetchCars();
//         } else {
//           const errorData = await response.json();
//           console.error('Error deleting car:', errorData);
//         }
//       } catch (error) {
//         console.error('Error deleting car:', error);
//       }
//     }
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setFormData({
//       name: car.name,
//       price: car.price,
//       image: car.image,
//       features: car.features,
//     });
//     setPreviewUrl(car.image); // Set preview to existing image URL
//     setIsModalOpen(true);
//   };

//   const resetForm = () => {
//     setSelectedCar(null);
//     setFormData({
//       name: '',
//       price: '',
//       image: '',
//       features: [
//         { icon: <Car size={16} />, text: '' },
//         { icon: <Fuel size={16} />, text: '' },
//         { icon: <Users size={16} />, text: '' },
//         { icon: <Car size={16} />, text: '' }
//       ]
//     });
//     setPreviewUrl('');
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Car Management</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//         >
//           <Plus size={20} />
//           Add New Car
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div key={car.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//             <div className="relative h-48 mb-4">
//               <img
//                 // src={car.image}
//                 src={`http://localhost:5000${car.image}` }
//                 alt={car.name}
//                 className="w-full h-full object-cover rounded-lg"
//                 // onError={(e) => {
//                 //   e.target.src = '/images/fallback.jpg'; // Fallback image
//                 // }}
//               />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
//             <p className="text-gray-600 mb-4">${car.price}</p>
//             <div className="space-y-2">
//               {car.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                   {feature.icon}
//                   {feature.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => handleEdit(car)}
//                 className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//               >
//                 <Pencil size={20} />
//               </button>
//               <button
//                 onClick={() => handleDelete(car.id)}
//                 className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               >
//                 <Trash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 {selectedCar ? 'Edit Car' : 'Add New Car'}
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="w-full border rounded-lg p-2"
//                   accept="image/*"
//                   required={!selectedCar}
//                 />
//                 {previewUrl && (
//                   <div className="mt-2 relative h-48">
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 )}
//                 {isUploading && <p className="text-sm text-gray-500">Uploading image...</p>}
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Features</label>
//                 {formData.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     {feature.icon}
//                     <input
//                       type="text"
//                       value={feature.text}
//                       onChange={(e) => handleFeatureChange(index, e.target.value)}
//                       className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder={`Feature ${index + 1}`}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   {selectedCar ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCar;


// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash, Plus, X, Car, Fuel, Users } from 'lucide-react';

// const API_URL = 'http://localhost:5000/api/cars';
// const UPLOAD_URL = 'http://localhost:5000/api/upload';

// const featureIcons = [Car, Fuel, Users, Car];

// const AdminCar = () => {
//   const [cars, setCars] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: '',
//     features: ['', '', '', ''], // Only text values, icons handled separately
//   });

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // const fetchCars = async () => {
//   //   try {
//   //     const response = await fetch(API_URL);
//   //     const data = await response.json();
//   //     setCars(data);
//   //   } catch (error) {
//   //     console.error('Error fetching cars:', error);
//   //   }
//   // };
//   const fetchCars = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/cars');
//       if (!response.ok) throw new Error('Failed to fetch cars');
      
//       const data = await response.json();
//       console.log('Fetched Cars:', data); // Check what is being returned
      
//       if (!Array.isArray(data)) {
//         throw new Error('API did not return an array');
//       }
      
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFeatureChange = (index, value) => {
//     setFormData((prev) => {
//       const updatedFeatures = [...prev.features];
//       updatedFeatures[index] = value;
//       return { ...prev, features: updatedFeatures };
//     });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
//       alert('Please upload an image file smaller than 5MB.');
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const uploadData = new FormData();
//       uploadData.append('image', file);

//       const response = await fetch(UPLOAD_URL, { method: 'POST', body: uploadData });
//       const data = await response.json();

//       if (response.ok) {
//         const fullImageUrl = `http://localhost:5000${data.imageUrl}`;
//         setFormData((prev) => ({ ...prev, image: fullImageUrl }));
//         setPreviewUrl(fullImageUrl);
//       } else {
//         alert(data.error || 'Failed to upload image');
//       }
//     } catch (error) {
//       alert('Error uploading image');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) return alert('Please upload an image.');

//     const carData = { ...formData };

//     try {
//       const response = await fetch(selectedCar ? `${API_URL}/${selectedCar.id}` : API_URL, {
//         method: selectedCar ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(carData),
//       });

//       if (response.ok) {
//         fetchCars();
//         closeModal();
//       } else {
//         const errorData = await response.json();
//         console.error('Error saving car:', errorData);
//       }
//     } catch (error) {
//       console.error('Error saving car:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;
//     try {
//       const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//       if (response.ok) fetchCars();
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setFormData({ ...car });
//     setPreviewUrl(car.image);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCar(null);
//     setFormData({ name: '', price: '', image: '', features: ['', '', '', ''] });
//     setPreviewUrl('');
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Car Management</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//         >
//           <Plus size={20} />
//           Add New Car
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {cars.map((car) => (
//           <div key={car._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md">
//             <img src={`http://localhost:5000/${car.image}`} alt={car.name} className="w-full h-48 object-cover rounded-lg" />
//             <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
//             <p className="text-gray-600 mb-2">${car.price}</p>
//             <div className="space-y-2">
//               {car.features.map((feature) => (
//                 <div key={feature._id} className="flex items-center gap-2 text-sm text-gray-600">
//                   {featureIcons[feature.icon] ? featureIcons[feature.icon]() : "🔧"} {feature.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={() => handleEdit(car)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
//                 <Pencil size={20} />
//               </button>
//               <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
//                 <Trash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">{selectedCar ? "Edit Car" : "Add New Car"}</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Car Name" className="w-full p-2 border rounded-lg" required />
//               <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="w-full p-2 border rounded-lg" required />

//               <input type="file" onChange={handleImageChange} accept="image/*" className="w-full p-2 border rounded-lg" />
//               {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />}

//               {formData.features.map((feature, index) => (
//                 <input key={index} type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder={`Feature ${index + 1}`} className="w-full p-2 border rounded-lg" />
//               ))}

//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 {selectedCar ? "Update" : "Create"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
        
//     </div>
//   );
// };

// export default AdminCar;


import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus, X, Car, Fuel, Users } from 'lucide-react';

const API_URL = 'https://backend-1-7zwm.onrender.com/api/cars';
const UPLOAD_URL = 'https://backend-1-7zwm.onrender.com/api/upload';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://iflxdosmdigszvxtqani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHhkb3NtZGlnc3p2eHRxYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDAxMTAsImV4cCI6MjA1OTMxNjExMH0.OYvVZO6IeQpKuaxDENp8wHDpJj8ELObRn0VhK6wbF4Q";
const featureIcons = [Car, Fuel, Users, Car];

const AdminCar = () => {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    features: [{ icon: 0, text: '' }, { icon: 1, text: '' }, { icon: 2, text: '' }, { icon: 3, text: '' }], // Updated structure
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/cars');
      if (!response.ok) throw new Error('Failed to fetch cars');
      
      const data = await response.json();
      console.log('Fetched Cars:', data); // Check what is being returned
      
      if (!Array.isArray(data)) {
        throw new Error('API did not return an array');
      }
      
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index][field] = value;
      return { ...prev, features: updatedFeatures };
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      alert('Please upload an image file smaller than 5MB.');
      return;
    }
    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      const response = await fetch(UPLOAD_URL, { method: 'POST', body: uploadData });
      const data = await response.json();
      if (response.ok) {
        // Get filename from backend response
        const fileName = data.imageUrl.split('/').pop();
        
        // Get direct URL from Supabase
        const { data: directData, error } = await supabase.storage
          .from('uploads')
          // .createSignedUrl(fileName, 60 * 60);
          .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year expiry
          
        let imageUrl;
        if (directData?.signedUrl) {
          imageUrl = directData.signedUrl;
        } else {
          imageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`;
        }
        
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        setPreviewUrl(imageUrl);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  }
  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
  //     alert('Please upload an image file smaller than 5MB.');
  //     return;
  //   }

  //   setIsUploading(true);
  //   try {
  //     const uploadData = new FormData();
  //     uploadData.append('image', file);

  //     const response = await fetch(UPLOAD_URL, { method: 'POST', body: uploadData });
  //     const data = await response.json();

  //     if (response.ok) {
  //       const fullImageUrl = `https://backend-1-7zwm.onrender.com${data.imageUrl}`;
  //       setFormData((prev) => ({ ...prev, image: fullImageUrl }));
  //       setPreviewUrl(fullImageUrl);
  //     } else {
  //       alert(data.error || 'Failed to upload image');
  //     }
  //   } catch (error) {
  //     alert('Error uploading image');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };
  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      const response = await fetch(`${API_URL}/${carId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchCars();
      } else {
        const errorData = await response.json();
        console.error('Error deleting car:', errorData);
        alert('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('An error occurred while deleting the car');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert('Please upload an image.');
  
    const carData = { ...formData };
  
    try {
      // Use the car's _id for both update and create
      const url = selectedCar ? `${API_URL}/${selectedCar._id}` : API_URL;
      const method = selectedCar ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });
  
      if (response.ok) {
        fetchCars();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Error saving car:', errorData);
        alert('Failed to save car');
      }
    } catch (error) {
      console.error('Error saving car:', error);
      alert('An error occurred while saving the car');
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.image) return alert('Please upload an image.');

  //   const carData = { ...formData };

  //   try {
  //     const response = await fetch(selectedCar ? `${API_URL}/${selectedCar.id}` : API_URL, {
  //       method: selectedCar ? 'PUT' : 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(carData),
  //     });

  //     if (response.ok) {
  //       fetchCars();
  //       closeModal();
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Error saving car:', errorData);
  //     }
  //   } catch (error) {
  //     console.error('Error saving car:', error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this car?')) return;
  //   try {
  //     const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  //     if (response.ok) fetchCars();
  //   } catch (error) {
  //     console.error('Error deleting car:', error);
  //   }
  // };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({ ...car });
    setPreviewUrl(car.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setFormData({ name: '', price: '', image: '', features: [{ icon: 0, text: '' }, { icon: 1, text: '' }, { icon: 2, text: '' }, { icon: 3, text: '' }] });
    setPreviewUrl('');
  };
  // console.log(car.image)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          Add New Car
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
            <p className="text-gray-600 mb-2">${car.price}</p>
            <div className="space-y-2">
              {car.features.map((feature, index) => (
                // <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                //   {featureIcons[feature.icon] ? featureIcons[feature.icon]() : "🔧"} {feature.text}
                // </div>
                <div key={feature._id} className="flex items-center gap-2 text-sm text-gray-600">
  {featureIcons[feature.icon] ? React.createElement(featureIcons[feature.icon]) : "🔧"} 
  {feature.text}
</div>

              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleEdit(car)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                <Pencil size={20} />
              </button>
              <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedCar ? "Edit Car" : "Add New Car"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Car Name" className="w-full p-2 border rounded-lg" required />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="w-full p-2 border rounded-lg" required />

              <input type="file" onChange={handleImageChange} accept="image/*" className="w-full p-2 border rounded-lg" />
              {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />}

              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', parseInt(e.target.value))}
                    className="p-2 border rounded-lg"
                  >
                    {featureIcons.map((_, iconIndex) => (
                      <option key={iconIndex} value={iconIndex}>Icon {iconIndex + 1}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={feature.text}
                    onChange={(e) => handleFeatureChange(index, 'text', e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                {selectedCar ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCar;