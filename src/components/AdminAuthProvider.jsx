import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AdminAuthContext = createContext();

// Provider component
export const AdminAuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState({
    token: localStorage.getItem('adminToken'),
    isAuthenticated: false,
    admin: null,
    loading: true,
    error: null
  });

  // Check if admin is logged in on initial load
  useEffect(() => {
    const loadAdmin = async () => {
      if (localStorage.getItem('adminToken')) {
        // Set token to headers
        setAuthToken(localStorage.getItem('adminToken'));
        
        try {
          const res = await axios.get('http://localhost:5000/api/admin/verify');
          
          setAdminAuth({
            ...adminAuth,
            isAuthenticated: true,
            admin: res.data.admin,
            loading: false,
            error: null
          });
        } catch (err) {
          // Token verification failed
          localStorage.removeItem('adminToken');
          setAuthToken(null);
          
          setAdminAuth({
            ...adminAuth,
            token: null,
            isAuthenticated: false,
            admin: null,
            loading: false,
            error: 'Admin session expired. Please login again.'
          });
        }
      } else {
        setAdminAuth({
          ...adminAuth,
          loading: false
        });
      }
    };
    
    loadAdmin();
    // eslint-disable-next-line
  }, []);

  // Set auth token for axios headers
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Login admin
  const loginAdmin = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ email, password });
    
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', body, config);
      
      localStorage.setItem('adminToken', res.data.token);
      setAuthToken(res.data.token);
      
      setAdminAuth({
        ...adminAuth,
        token: res.data.token,
        isAuthenticated: true,
        admin: res.data.admin,
        loading: false,
        error: null
      });
      
      return true;
    } catch (err) {
      localStorage.removeItem('adminToken');
      setAuthToken(null);
      
      setAdminAuth({
        ...adminAuth,
        token: null,
        isAuthenticated: false,
        admin: null,
        loading: false,
        error: err.response?.data?.errors?.[0]?.msg || 'Admin login failed'
      });
      
      return false;
    }
  };

  // Logout admin
  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setAuthToken(null);
    
    setAdminAuth({
      ...adminAuth,
      token: null,
      isAuthenticated: false,
      admin: null,
      loading: false,
      error: null
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminAuth,
        setAdminAuth,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};