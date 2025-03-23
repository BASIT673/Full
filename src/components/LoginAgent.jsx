// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "./AuthContext"
// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     workEmail: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await fetch('http://localhost:5000/api/api/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(formData)
//   //     });

//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       localStorage.setItem('token', data.token);
//   //       navigate('/profile');
//   //     } else {
//   //       setError(data.error);
//   //     }
//   //   } catch (err) {
//   //     setError('Something went wrong. Please try again.');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', formData);
      
//       // Use the context login function instead of directly setting localStorage
//       login(response.data.token, response.data.agent);
      
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
//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Travel Agent Login</h2>
//       {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2">Work Email</label>
//           <input
//             type="email"
//             name="workEmail"
//             value={formData.workEmail}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Don't have an account?{' '}
//         <span
//           onClick={() => navigate('/signup')}
//           className="text-blue-500 cursor-pointer hover:underline"
//         >
//           Sign Up
//         </span>
//       </p>
//     </div>
//   );
// };
// export default LoginForm;





import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    workEmail: '',
    password: ''
  });
  const [error, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.workEmail || !formData.password) {
      setMessage('Please fill in all fields');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail)) {
      setMessage('Please enter a valid email address');
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
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      // Use the context login function instead of directly setting localStorage
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Travel Agent Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        
        {error && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${error.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-5">
              <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                autoComplete="email"
                required
                value={formData.workEmail}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <span onClick={() => navigate('/forgot-password')} className="font-medium text-orange-600 hover:text-orange-500 cursor-pointer">
                Forgot your password?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 ease-in-out"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="font-medium text-orange-600 hover:text-orange-500 cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;