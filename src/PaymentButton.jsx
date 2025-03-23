// src/components/PaymentButton.jsx
import React from 'react';
import axios from 'axios';

const PaymentButton = ({ amount, packageDetails }) => {
  // Function to load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to initiate payment
  const initiatePayment = async () => {
    try {
      // Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK');
        return;
      }

      // Create order on backend
      const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
        amount,
        packageDetails
      });

      const { order } = orderResponse.data;

      // Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Travel Company",
        description: packageDetails.description,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment with backend
            const verifyResponse = await axios.post('http://localhost:5000/api/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              alert('Payment successful!');
              // Add your success logic here (e.g., redirect to success page)
            }
          } catch (error) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: packageDetails.customerName || '',
          email: packageDetails.customerEmail || '',
          contact: packageDetails.customerPhone || ''
        },
        theme: {
          color: '#3399cc'
        }
      };

      // Create Razorpay instance and open payment modal
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed');
    }
  };

  return (
    <button
      onClick={initiatePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;