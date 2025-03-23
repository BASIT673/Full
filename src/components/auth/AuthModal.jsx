// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';
import Login from './Login';
// import 
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex mb-6 border-b">
          <button 
            className={`py-3 px-6 font-medium text-base ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`py-3 px-6 font-medium text-base ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          <Login onClose={onClose} />
        ) : (
          <Signup onClose={onClose} switchToLogin={() => setActiveTab('login')} />
        )}
      </div>
    </div>
  );
};
export default AuthModal