// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = ({ onClose, switchToLogin }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     setFormData({
//       ...formData,
//       [e.target.name]: value,
//     });
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     if (!formData.agreeToTerms) {
//       setError('You must agree to the Terms and Conditions');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
//       setSuccess(true);
//       setTimeout(() => {
//         switchToLogin();
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//           {error}
//         </div>
//       )}
      
//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
//           Registration successful! Redirecting to login...
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="name"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             placeholder="Enter your full name"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-email">
//             Email
//           </label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="signup-email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-password">
//             Password
//           </label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="signup-password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Create a password"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="confirmPassword"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             placeholder="Confirm your password"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               name="agreeToTerms"
//               checked={formData.agreeToTerms}
//               onChange={handleChange}
//               required
//             />
//             <span className="ml-2 block text-sm text-gray-700">
//               I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
//             </span>
//           </label>
//         </div>
        
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
//           disabled={loading}
//         >
//           {loading ? 'Creating Account...' : 'Create Account'}
//         </button>
//       </form>
      
//       <div className="mt-6 text-center text-sm text-gray-600">
//         Already have an account?{' '}
//         <button 
//           onClick={switchToLogin}
//           className="text-blue-600 hover:underline font-medium"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Signup

import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms and Conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto ]">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">Create an Account</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-4 text-sm">
          Registration successful! Redirecting to login...
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 sm:mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 sm:mb-2" htmlFor="signup-email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="signup-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 sm:mb-2" htmlFor="signup-password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="signup-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 sm:mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        
        <div className="pt-1 sm:pt-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <span className="ml-2 block text-xs sm:text-sm text-gray-700">
              I agree to the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
            </span>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 sm:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 mt-4 sm:mt-6"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
        Already have an account?{' '}
        <button 
          onClick={switchToLogin}
          className="text-orange-500 hover:underline font-medium"
        >
          Login
        </button>
      </div>
      
    
     
     <div className="mt-4 md:hidden sm:mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-center font-bold text-gray-800 mb-4">Book With Confidence</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
          <div className="flex items-center mb-1">
            <span className="text-lg font-bold text-orange-500">4.5/5</span>
            <div className="flex ml-1">
              {[1, 2, 3, 4].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-600">Trip Advisor</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
          <div className="flex items-center mb-1">
            <span className="text-lg font-bold text-orange-500">4.0/5</span>
            <div className="flex ml-1">
              {[1, 2, 3, 4].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-600">Trust Pilot</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
          <div className="flex items-center mb-1">
            <span className="text-lg font-bold text-orange-500">4.4/5</span>
            <div className="flex ml-1">
              {[1, 2, 3, 4].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-600">Google</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
          <div className="flex items-center mb-1">
            <span className="text-lg font-bold text-orange-500">4.3/5</span>
            <div className="flex ml-1">
              {[1, 2, 3, 4].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-600">Booking.com</span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">Based on thousands of verified customer reviews</p>
      </div>
    </div>
   

    </div> 
  );
};

export default Signup ;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = ({ onClose, switchToLogin }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     setFormData({
//       ...formData,
//       [e.target.name]: value,
//     });
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     if (!formData.agreeToTerms) {
//       setError('You must agree to the Terms and Conditions');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
//       setSuccess(true);
//       setTimeout(() => {
//         switchToLogin();
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           Registration successful! Redirecting to login...
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
//               Full Name
//             </label>
//             <input
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               id="name"
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your full name"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-email">
//               Email
//             </label>
//             <input
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               id="signup-email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//             />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-password">
//               Password
//             </label>
//             <input
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               id="signup-password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Create a password"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               id="confirmPassword"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               placeholder="Confirm your password"
//             />
//           </div>
//         </div>
        
//         <div className="pt-2">
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
//               name="agreeToTerms"
//               checked={formData.agreeToTerms}
//               onChange={handleChange}
//               required
//             />
//             <span className="ml-2 block text-sm text-gray-700">
//               I agree to the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
//             </span>
//           </label>
//         </div>
        
//         <button
//           type="submit"
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 mt-6"
//           disabled={loading}
//         >
//           {loading ? 'Creating Account...' : 'Create Account'}
//         </button>
//       </form>
      
//       <div className="mt-6 text-center text-sm text-gray-600">
//         Already have an account?{' '}
//         <button 
//           onClick={switchToLogin}
//           className="text-orange-500 hover:underline font-medium"
//         >
//           Login
//         </button>
//       </div>
      
//       <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h3 className="text-center font-bold text-gray-800 mb-4">Book With Confidence</h3>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
//             <div className="flex items-center mb-1">
//               <span className="text-lg font-bold text-orange-500">4.5/5</span>
//               <div className="flex ml-1">
//                 {[1, 2, 3, 4].map(i => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//             </div>
//             <span className="text-xs text-gray-600">Trip Advisor</span>
//           </div>
          
//           <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
//             <div className="flex items-center mb-1">
//               <span className="text-lg font-bold text-orange-500">4.0/5</span>
//               <div className="flex ml-1">
//                 {[1, 2, 3, 4].map(i => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//             </div>
//             <span className="text-xs text-gray-600">Trust Pilot</span>
//           </div>
          
//           <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
//             <div className="flex items-center mb-1">
//               <span className="text-lg font-bold text-orange-500">4.4/5</span>
//               <div className="flex ml-1">
//                 {[1, 2, 3, 4].map(i => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//             </div>
//             <span className="text-xs text-gray-600">Google</span>
//           </div>
          
//           <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
//             <div className="flex items-center mb-1">
//               <span className="text-lg font-bold text-orange-500">4.3/5</span>
//               <div className="flex ml-1">
//                 {[1, 2, 3, 4].map(i => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//             </div>
//             <span className="text-xs text-gray-600">Booking.com</span>
//           </div>
//         </div>
        
//         <div className="mt-3 text-center">
//           <p className="text-xs text-gray-500">Based on thousands of verified customer reviews</p>
//         </div>
//       </div>
//     </div> 
//   );
// };

// export default Signup;