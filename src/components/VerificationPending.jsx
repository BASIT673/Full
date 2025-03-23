import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const VerificationPending = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get email from location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
    
    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [location]);

  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Email address is missing. Please go back to login page.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      await axios.post('http://localhost:5000/api/resend-verification', { workEmail: email });
      setMessage('Verification email sent successfully! Please check your inbox.');
      setLoading(false);
      
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
      
      // Start countdown again
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Failed to resend verification email');
      } else {
        setMessage('Failed to resend verification email. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification email to
        </p>
        <p className="text-center text-md font-medium text-blue-600">
          {email || 'your email address'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="animate-pulse bg-blue-100 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                Please check your email inbox and click on the verification link to activate your account.
              </p>
            </div>
            
            <p className="text-gray-600 mb-4">
              If you haven't received the email, please check your spam folder or click the button below to resend the verification email.
            </p>
            
            {message && (
              <div className={`mb-4 p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            
            <button
              onClick={handleResendVerification}
              disabled={loading || !canResend}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${canResend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : !canResend ? (
                `Resend Email (${countdown}s)`
              ) : (
                'Resend Verification Email'
              )}
            </button>
            
            <div className="mt-6">
              <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;