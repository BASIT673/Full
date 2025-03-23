import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('Verifying your email...');
  const token = searchParams.get('token');
  const email = location.state?.email;

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/verify-email?token=${token}`);
        const data = await response.json();
        if (response.ok) {
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => navigate('/profile'), 3000);
        } else {
          setMessage(data.error || 'Verification failed. Please try again.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    };

    if (token) {
      verifyEmailToken();
    } else if (email) {
      setMessage(`A verification email has been sent to ${email}. Please check your inbox.`);
    } else {
      navigate('/signup');
    }
  }, [token, email, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">{message}</h2>
      {!token && (
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;