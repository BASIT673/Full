// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', formData);
//       console.log('User data:', response.data.user);
//       console.log('Token:', response.data.token);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       onClose();
//       navigate('/Profile');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//           {error}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
        
//         <div className="mb-6">
//           <div className="flex justify-between mb-2">
//             <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
//               Password
//             </label>
//             <a href="#" className="text-blue-600 text-sm hover:underline">
//               Forgot Password?
//             </a>
//           </div>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             id="password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter your password"
//           />
//         </div>
        
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
      
//       <div className="mt-6">
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Or login with</span>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-3 mt-4">
//           <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//             <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#1877F2"/>
//               <path d="M14.4995 12.75H13.1245V18H10.7495V12.75H9.74945V10.75H10.7495V9.49501C10.7495 7.95001 11.3745 7.00001 13.2245 7.00001H14.9745V9.00001H13.9495C13.1995 9.00001 13.1245 9.31501 13.1245 9.87501V10.75H14.9995L14.4995 12.75Z" fill="white"/>
//             </svg>
//             <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
//           </button>
//           <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//             <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#EA4335"/>
//               <path d="M12 5.75C14.1875 5.75 15.9375 6.6125 17.0625 7.6875L19.1875 5.5625C17.5 3.9375 14.9375 3 12 3C7.5 3 3.7125 5.8125 2.3875 9.625L5.425 11.875C6.15 8.3125 8.8 5.75 12 5.75Z" fill="white"/>
//               <path d="M5.75 12C5.75 11.25 5.875 10.5 6.125 9.8125L3.0875 7.5625C2.3875 8.8125 2 10.35 2 12C2 13.6125 2.375 15.125 3.0375 16.375L6.0625 14.125C5.875 13.4375 5.75 12.75 5.75 12Z" fill="white"/>
//               <path d="M12 18.25C8.8 18.25 6.15 15.6875 5.425 12.125L2.3875 14.375C3.7125 18.1875 7.5 21 12 21C14.9375 21 17.5 20.0625 19.1875 18.4375L16.0625 16.1875C15.0625 17.4375 13.5625 18.25 12 18.25Z" fill="white"/>
//               <path d="M21 12C21 11.25 20.9375 10.5 20.75 9.8125H12V13.3125H17.0625C16.6875 14.5625 15.9375 15.5 15.0625 16.1875L18.1875 18.4375C20.0625 16.625 21 14.5 21 12Z" fill="white"/>
//             </svg>
//             <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { AuthContext } from '../AuthContext'; 

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/login', formData);
  //     localStorage.setItem('token', response.data.token);
  //     localStorage.setItem('user', JSON.stringify(response.data.user));
  //     onClose();
  //     navigate('/Profile');
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    
    // Instead of directly setting localStorage, use the context's login function
    login(response.data.token, response.data.user);
    
    onClose();
    navigate('/Profile');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">Welcome Back!</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 sm:mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1 sm:mb-2">
            <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-orange-500 text-xs sm:text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 sm:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 mt-4 sm:mt-6"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 sm:mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          {/* <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-white text-gray-500">Or login with</span>
          </div> */}
        </div>
        
        {/* <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4">
          <button className="flex items-center justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#1877F2"/>
              <path d="M14.4995 12.75H13.1245V18H10.7495V12.75H9.74945V10.75H10.7495V9.49501C10.7495 7.95001 11.3745 7.00001 13.2245 7.00001H14.9745V9.00001H13.9495C13.1995 9.00001 13.1245 9.31501 13.1245 9.87501V10.75H14.9995L14.4995 12.75Z" fill="white"/>
            </svg>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-gray-700">Facebook</span>
          </button>
          <button className="flex items-center justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#EA4335"/>
              <path d="M12 5.75C14.1875 5.75 15.9375 6.6125 17.0625 7.6875L19.1875 5.5625C17.5 3.9375 14.9375 3 12 3C7.5 3 3.7125 5.8125 2.3875 9.625L5.425 11.875C6.15 8.3125 8.8 5.75 12 5.75Z" fill="white"/>
              <path d="M5.75 12C5.75 11.25 5.875 10.5 6.125 9.8125L3.0875 7.5625C2.3875 8.8125 2 10.35 2 12C2 13.6125 2.375 15.125 3.0375 16.375L6.0625 14.125C5.875 13.4375 5.75 12.75 5.75 12Z" fill="white"/>
              <path d="M12 18.25C8.8 18.25 6.15 15.6875 5.425 12.125L2.3875 14.375C3.7125 18.1875 7.5 21 12 21C14.9375 21 17.5 20.0625 19.1875 18.4375L16.0625 16.1875C15.0625 17.4375 13.5625 18.25 12 18.25Z" fill="white"/>
              <path d="M21 12C21 11.25 20.9375 10.5 20.75 9.8125H12V13.3125H17.0625C16.6875 14.5625 15.9375 15.5 15.0625 16.1875L18.1875 18.4375C20.0625 16.625 21 14.5 21 12Z" fill="white"/>
            </svg>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-gray-700">Google</span>
          </button>
        </div> */}
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
    </div>
  );
};

export default Login;


// Adjust the path

