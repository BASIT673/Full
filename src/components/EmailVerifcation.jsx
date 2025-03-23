import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Verifying your email...');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify-email/${token}`);
        setSuccess(true);
        setMessage(response.data.message || 'Email verified successfully!');
        
        // Start redirect countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } catch (error) {
        setSuccess(false);
        if (error.response && error.response.data) {
          setMessage(error.response.data.message || 'Verification failed');
        } else {
          setMessage('Verification failed. Please try again later.');
        }
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerifying(false);
      setSuccess(false);
      setMessage('Invalid verification token');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className={`h-16 w-16 ${success ? 'bg-green-500' : verifying ? 'bg-blue-600' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
            {verifying ? (
              <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : success ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {verifying ? 'Verifying Email' : success ? 'Email Verified' : 'Verification Failed'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className={`rounded-lg p-4 mb-4 ${
              verifying ? 'bg-blue-100 text-blue-800' : 
              success ? 'bg-green-100 text-green-800' : 
              'bg-red-100 text-red-800'
            }`}>
              <p>{message}</p>
              
              {success && (
                <p className="mt-2">
                  Redirecting to login in {countdown} seconds...
                </p>
              )}
            </div>
            
            <div className="mt-6 flex justify-center">
              {success ? (
                <Link 
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login Now
                </Link>
              ) : !verifying && (
                <Link 
                  to="/verification-pending"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try Again
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;