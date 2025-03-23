
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/register`, formData);
//       alert(res.data.message);
//       // Optionally redirect or clear the form after successful registration
//       setFormData({ username: '', email: '', password: '' }); // Clear the form
//     } catch (err) {
//       alert(err.response.data.error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required // Add required attribute
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required // Add required attribute
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required // Add required attribute
//             minLength="6" // Example: Minimum 6 characters
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// Register.js
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// const Register = () => {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/register`, formData);
//       alert(res.data.message);
//       login(res.data.token, res.data.user); // Update authentication state
//       navigate("/profile"); // Redirect to profile page
//     } catch (err) {
//       alert(err.response.data.error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             minLength="6"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     gstNumber: '',
//     workEmail: '',
//     password: '',
//     confirmPassword: '',
//     address: '',
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: '',
//     phoneNumber: '',
//     licenseNumber: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Company name validation
//     if (!formData.companyName.trim()) {
//       newErrors.companyName = 'Company name is required';
//     }
    
//     // GST number validation
//     if (!formData.gstNumber.trim()) {
//       newErrors.gstNumber = 'GST number is required';
//     } else if (!/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(formData.gstNumber)) {
//       newErrors.gstNumber = 'Invalid GST number format';
//     }
    
//     // Email validation
//     if (!formData.workEmail.trim()) {
//       newErrors.workEmail = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.workEmail)) {
//       newErrors.workEmail = 'Invalid email format';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
    
//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     // Address validation
//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }
    
//     // Street validation
//     if (!formData.street.trim()) {
//       newErrors.street = 'Street is required';
//     }
    
//     // City validation
//     if (!formData.city.trim()) {
//       newErrors.city = 'City is required';
//     }
    
//     // State validation
//     if (!formData.state.trim()) {
//       newErrors.state = 'State is required';
//     }
    
//     // Country validation
//     if (!formData.country.trim()) {
//       newErrors.country = 'Country is required';
//     }
    
//     // Pincode validation
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = 'Pincode is required';
//     }
    
//     // Phone number validation
//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Phone number must be 10 digits';
//     }
    
//     // License number validation
//     if (!formData.licenseNumber.trim()) {
//       newErrors.licenseNumber = 'License number is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const { confirmPassword, ...dataToSubmit } = formData;
//       const response = await axios.post('http://localhost:5000/api/register', dataToSubmit);
      
//       setMessage(response.data.message);
//       setLoading(false);
      
//       // Redirect to verification page
//       setTimeout(() => {
//         navigate('/verification-pending', { state: { email: formData.workEmail } });
//       }, 2000);
//     } catch (error) {
//       setLoading(false);
//       if (error.response && error.response.data) {
//         setMessage(error.response.data.message || 'Registration failed');
//       } else {
//         setMessage('Registration failed. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
//         <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-lg sm:p-10">
//           <div className="max-w-md mx-auto">
//             <div className="flex items-center space-x-5">
//               <div className="h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <div className="block pl-2 font-semibold text-xl text-gray-700">
//                 <h2 className="leading-relaxed">Agent Registration</h2>
//                 <p className="text-sm text-gray-500 font-normal">Create your agent account</p>
//               </div>
//             </div>
            
//             {message && (
//               <div className={`mt-4 p-4 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {message}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Company Information */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Company Name</label>
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.companyName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">GST Number</label>
//                     <input
//                       type="text"
//                       name="gstNumber"
//                       value={formData.gstNumber}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.gstNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.gstNumber && <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Work Email</label>
//                     <input
//                       type="email"
//                       name="workEmail"
//                       value={formData.workEmail}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.workEmail ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.workEmail && <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">License Number</label>
//                     <input
//                       type="text"
//                       name="licenseNumber"
//                       value={formData.licenseNumber}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.licenseNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
//                   </div>
                  
//                   {/* Password */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                   </div>
                  
//                   {/* Contact Information */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                     <input
//                       type="text"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
//                   </div>
                  
//                   {/* Address */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Street</label>
//                     <input
//                       type="text"
//                       name="street"
//                       value={formData.street}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.street ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">City</label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">State</label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Country</label>
//                     <input
//                       type="text"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border ${errors.pincode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="pt-6 flex items-center justify-between">
//                 <p className="text-sm text-gray-600">
//                   Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
//                 </p>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
//                 >
//                   {loading && (
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   )}
//                   Register
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    workEmail: '',
    password: '',
    confirmPassword: '',
    address: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: '',
    licenseNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Company Information validation
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      
      if (!formData.gstNumber.trim()) {
        newErrors.gstNumber = 'GST number is required';
      } else if (!/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(formData.gstNumber)) {
        newErrors.gstNumber = 'Invalid GST number format';
      }
      
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = 'License number is required';
      }
      
      if (!formData.workEmail.trim()) {
        newErrors.workEmail = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.workEmail)) {
        newErrors.workEmail = 'Invalid email format';
      }
      
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be 10 digits';
      }
    } else if (step === 2) {
      // Address validation
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      
      if (!formData.street.trim()) {
        newErrors.street = 'Street is required';
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      
      if (!formData.state.trim()) {
        newErrors.state = 'State is required';
      }
      
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required';
      }
      
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      }
    } else if (step === 3) {
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const validateForm = () => {
    const step1Valid = validateStep(1);
    if (!step1Valid) {
      setCurrentStep(1);
      return false;
    }
    
    const step2Valid = validateStep(2);
    if (!step2Valid) {
      setCurrentStep(2);
      return false;
    }
    
    const step3Valid = validateStep(3);
    if (!step3Valid) {
      setCurrentStep(3);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      const response = await axios.post('https://backend-1-7zwm.onrender.com/api/register', dataToSubmit);
      
      setMessage(response.data.message);
      setLoading(false);
      
      // Redirect to verification page
      setTimeout(() => {
        navigate('/verification-pending', { state: { email: formData.workEmail } });
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Registration failed');
      } else {
        setMessage('Registration failed. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className={`text-sm ${currentStep >= 1 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Company Info</span>
          <span className={`text-sm ${currentStep >= 2 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Address</span>
          <span className={`text-sm ${currentStep >= 3 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Security</span>
        </div>
        <div className="overflow-hidden h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Company Information</h3>
          <p className="text-sm text-gray-500 mb-4">Please provide your company details to get started.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            className={`w-full px-4 py-3 rounded-lg border ${errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="e.g. 22AAAAA0000A1Z5"
            className={`w-full px-4 py-3 rounded-lg border ${errors.gstNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.gstNumber && <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="company@example.com"
            className={`w-full px-4 py-3 rounded-lg border ${errors.workEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.workEmail && <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit phone number"
            className={`w-full px-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="Enter your business license number"
            className={`w-full px-4 py-3 rounded-lg border ${errors.licenseNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Address Details</h3>
          <p className="text-sm text-gray-500 mb-4">Please provide your complete business address.</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Building number and street name"
            className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Apartment, suite, unit, etc."
            className={`w-full px-4 py-3 rounded-lg border ${errors.street ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city name"
            className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state name"
            className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode/ZIP Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter postal code"
            className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country name"
            className={`w-full px-4 py-3 rounded-lg border ${errors.country ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
          />
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Security Details</h3>
          <p className="text-sm text-gray-500 mb-4">Create a secure password for your account.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
            >
              {passwordVisible ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          <p className="mt-2 text-xs text-gray-500">Password must be at least 8 characters long</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
            >
              {confirmPasswordVisible ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
        
        <div className="mt-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">Your password should be different from the ones you use on other websites.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderStepButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 flex items-center"
          >
            Continue
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Complete Registration
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
            <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Agent Registration</h1>
          <p className="mt-2 text-lg text-gray-600">Create your agent account to get started</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('successful') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                <div className="flex">
                  <svg className={`h-5 w-5 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'} mr-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {message.includes('successful') ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}
            
            {renderProgressBar()}
            
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              {renderStepButtons()}
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Already have an account? 
                <Link to="/login" className="ml-1 text-orange-600 hover:text-orange-700 font-medium">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;