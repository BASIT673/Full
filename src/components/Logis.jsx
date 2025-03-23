
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/login`, formData);
//       alert(res.data.message);
//       localStorage.setItem('token', res.data.token);

//       if (res.data.isAdmin) {
//         navigate('/admin-dashboard');
//       } else {
//         navigate('/profile');
//       }
//     } catch (err) {
//       alert(err.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-4">
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={formData.email} 
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-6">
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={formData.password} 
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button 
//         type="submit" 
//         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;


// Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/login`, formData);
//       alert(res.data.message);
//       login(res.data.token, res.data.user); // Update authentication state

//       if (res.data.isAdmin) {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/profile");
//       }
//     } catch (err) {
//       alert(err.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-6">
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`http://localhost:5000/api/auth/login`, formData);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token); // ✅ Store token
      console.log("✅ Token saved:", res.data.token);

      login(res.data.token, res.data.user); // Update authentication state

      alert(res.data.message);
      
      if (res.data.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/profile");
      }
    } else {
      throw new Error("No token received from server.");
    }
  } catch (err) {
    console.error("🚨 Login error:", err.response?.data || err);
    alert(err.response?.data?.error || "Login failed");
  }
}
return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </form>
    );
  };
   export default Login;