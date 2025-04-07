import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminLoginButton = () => {
  const [showButton, setShowButton] = useState(false);
  
  // Secret key combination to reveal the button (Ctrl+Shift+A)
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowButton(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowButton(false);
        }, 5000);
      }
    };
    
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);
  
  // Hidden in footer with no obvious styling
  if (!showButton) {
    return null;
  }
  
  return (
    <div className="admin-access">
      <Link 
        to="/admin/login" 
        className="admin-link"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        Admin Login
      </Link>
    </div>
  );
};

export default AdminLoginButton;