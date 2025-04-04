// import React, { useState,useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from "./AuthContext";
// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     workEmail: '',
//     password: ''
//   });
// const { login } = useContext(AuthContext);
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
    
//     // Email validation
//     if (!formData.workEmail.trim()) {
//       newErrors.workEmail = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.workEmail)) {
//       newErrors.workEmail = 'Invalid email format';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
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
//       const response = await axios.post('https://backend-1-7zwm.onrender.com/api/login', formData);
      
//       // Save token to local storage
//     //   localStorage.setItem('token', response.data.token);
//     //   localStorage.setItem('agentInfo', JSON.stringify(response.data.agent));
//     login(response.data.token, response.data.agent);
//       setMessage('Login successful. Redirecting...');
//       setLoading(false);
      
//       // Redirect to dashboard
//       setTimeout(() => {
//         navigate('/Agent-Profile');
//       }, 1000);
//     } catch (error) {
//       setLoading(false);
      
//       if (error.response && error.response.data) {
//         if (error.response.status === 401 && error.response.data.message.includes('verify your email')) {
//           setMessage(error.response.data.message);
//           // Add option to resend verification email
//           setTimeout(() => {
//             navigate('/verification-pending', { state: { email: formData.workEmail } });
//           }, 2000);
//         } else {
//           setMessage(error.response.data.message || 'Login failed');
//         }
//       } else {
//         setMessage('Login failed. Please try again later.');
//       }
//     }
//   };

//   const handleResendVerification = async () => {
//     try {
//       await axios.post('/api/agents/resend-verification', { workEmail: formData.workEmail });
//       setMessage('Verification email sent successfully. Please check your inbox.');
//     } catch (error) {
//       setMessage('Failed to resend verification email. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Agent Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{' '}
//           <Link to="/register" className="font-medium text-red-600 hover:text-blue-500">
//             register your account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {message && (
//             <div className={`mb-4 p-4 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//               {message}
//               {message.includes('verify your email') && (
//                 <button
//                   onClick={handleResendVerification}
//                   className="ml-2 underline text-blue-600 hover:text-blue-700"
//                 >
//                   Resend verification email
//                 </button>
//               )}
//             </div>
//           )}
         
 
//   <form className="space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                   <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700">
//                     Work Email
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="workEmail"
//                       name="workEmail"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       value={formData.workEmail}
//                       onChange={handleChange}
//                       className={`appearance-none block w-full px-3 py-2 border ${errors.workEmail ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.workEmail && (
//                       <p className="mt-2 text-sm text-red-600">{errors.workEmail}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="current-password"
//                       required
//                       value={formData.password}
//                       onChange={handleChange}
//                       className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     />
//                     {errors.password && (
//                       <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="text-sm">
//                     <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
//                       Forgot your password?
//                     </Link>
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-500' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
//                   >
//                     {loading ? 'Logging in...' : 'Sign in'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
//     }
// export default Login;



import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from "./";
import { AuthContext } from './agentauth/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workEmail: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('https://backend-1-7zwm.onrender.com/api/login', formData);
      
      // Use the login function from AuthContext
      login(response.data.token, response.data.agent);
      
      setMessage('Login successful. Redirecting...');
      setLoading(false);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/Agent-Profile');
      }, 1000);
    } catch (error) {
      setLoading(false);
      
      if (error.response && error.response.data) {
        if (error.response.status === 401 && error.response.data.message.includes('verify your email')) {
          setMessage(error.response.data.message);
          // Add option to resend verification email
          setTimeout(() => {
            navigate('/verification-pending', { state: { email: formData.workEmail } });
          }, 2000);
        } else {
          setMessage(error.response.data.message || 'Login failed');
        }
      } else {
        setMessage('Login failed. Please try again later.');
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await axios.post('https://backend-1-7zwm.onrender.com/api/agents/resend-verification', { workEmail: formData.workEmail });
      setMessage('Verification email sent successfully. Please check your inbox.');
    } catch (error) {
      setMessage('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Agent Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-red-600 hover:text-blue-500">
            register your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className={`mb-4 p-4 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
              {message.includes('verify your email') && (
                <button
                  onClick={handleResendVerification}
                  className="ml-2 underline text-blue-600 hover:text-blue-700"
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}
         
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <div className="mt-1">
                <input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.workEmail}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.workEmail ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.workEmail && (
                  <p className="mt-2 text-sm text-red-600">{errors.workEmail}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-500' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;