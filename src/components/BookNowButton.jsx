// src/components/BookNowButton.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Make sure your .env file in the React app includes REACT_APP_RAZORPAY_KEY_ID
const BookNowButton = ({ destination, amount, user, paymentMethod = 'razorpay', onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (paymentMethod === 'razorpay') {
        // Create a Razorpay order on the backend
        const orderResponse = await axios.post('http://localhost:5000/api/payment/razorpay/order', {
          amount,
          receipt: `receipt_${new Date().getTime()}`,
          destination,
          userId: user._id
        });

        const { order, bookingId } = orderResponse.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // set this in your React .env file
          amount: order.amount,
          currency: order.currency,
          name: destination.title,
          description: 'Booking Payment',
          order_id: order.id,
          handler: async function (response) {
            // Verify payment on the backend
            const verifyResponse = await axios.post('http://localhost:5000/api/payment/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId
            });
            if (verifyResponse.data.success) {
              alert('Payment Successful!');
              if (onSuccess) onSuccess();
            } else {
              alert('Payment verification failed.');
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#3399cc"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (paymentMethod === 'googleupi') {
        // Create a simulated Google UPI payment order on the backend
        const upiResponse = await axios.post('http://localhost:5000/api/payment/googleupi/create', {
          amount,
          destination,
          userId: user._id
        });

        const { paymentLink, bookingId } = upiResponse.data;
        // For a UPI payment, you might open the payment link in a new tab or display a QR code
        window.open(paymentLink, '_blank');
        alert('Please complete the payment via your UPI app and then confirm.');
        // Optionally, implement a mechanism to confirm the payment afterward.
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-4"
    >
      {loading ? 'Processing...' : 'Book Now'}
    </button>
  );
};

export default BookNowButton;
