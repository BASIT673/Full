import React, { useState, useEffect } from 'react';
import TripPlanner from './TripPlanner';
const handleBookNow = async (selectedTour, tour) => {
  const title = selectedTour.title || selectedTour.tourTitle;
  const price = selectedTour.price || selectedTour.tourPrice;
  console.log("✅ Final Title:", title);
  console.log("✅ Final Price:", price);
  
  // if (!selectedTour || !selectedTour.title || !selectedTour.price) {
  //   alert("❌ Invalid tour selected. Please select a valid tour.");
  //   return;
  // }

  const token = localStorage.getItem('token');
  let userData = null;
  let isLoggedIn = false;

  // ✅ Fetch user details if logged in
  if (token) {
    try {
      console.log("🟢 Fetching user details...");
      const userRes = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      userData = userRes.data;
      isLoggedIn = true;
      console.log("✅ User Data Retrieved:", userData);
    } catch (error) {
      console.error('🚨 Error fetching user data:', error);
    }
  }

  // Show query form for BOTH logged-in and guest users
  showQueryForm(selectedTour, userData, token, isLoggedIn);
};

// Function to show the query form modal
const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
  // Create modal container
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'query-form-overlay';
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  // Create modal content - compact design
  const modalContent = document.createElement('div');
  modalContent.className = 'query-form-content';
  modalContent.style.cssText = `
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    width: 90%;
    max-width: 450px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `;

  // Pre-fill form data if user is logged in
  const name = userData?.username || '';
  const email = userData?.email || '';
  const phone = userData?.phone || '';

  // Form with marketing text and compact design
  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <h2 style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
      <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
    </div>
    
    <div style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
      <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
        <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
      </p>
    </div>
    
    <!-- Price Display Box - Moved to the top -->
    <div style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
      <p style="margin: 0; font-size: 0.9rem; color: #333;">
        <span style="font-weight: 600;">Total Price:</span> 
        <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
        <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
          Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
        </span>
      </p>
    </div>
    
    <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
      <div style="grid-column: span 2;">
        <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
        <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
      </div>
      
      <div style="grid-column: span 2;">
        <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
        <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
      </div>
      
      <div style="grid-column: span 2;">
        <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
        <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
      </div>
      
      <div>
        <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
        <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
      </div>
      
      <div>
        <label for="queryAdults" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
        <select id="queryAdults" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      
      <div>
        <label for="queryChildren" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
        <select id="queryChildren" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      
      <div>
        <label for="queryInfants" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
        <select id="queryInfants" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      
      <div style="grid-column: span 2;">
        <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
        <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
      </div>
      
      <div style="grid-column: span 2; margin: 5px 0 10px;">
        <label style="display: flex; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
          <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
        </label>
      </div>
      
      <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
        <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
          Send Query & Continue to Booking
        </button>
        <!-- Loading state message -->
        <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
          Taking you to checkout page...
        </p>
      </div>
      
      <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
        <p style="font-size: 0.75rem; color: #888; margin: 0;">
          <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
        </p>
      </div>
    </form>
  `;

  // Append modal to body
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Close modal functionality
  document.getElementById('closeQueryForm').addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
  });

  // Price calculation function
  const updateTotalPrice = () => {
    const basePrice = selectedTour.price;
    const adults = parseInt(document.getElementById('queryAdults').value || 1);
    const children = parseInt(document.getElementById('queryChildren').value || 0);
    
    // Adults pay full price, children pay half price
    const childrenPrice = basePrice * 0.5 * children;
    const adultsPrice = basePrice * adults;
    
    const totalPrice = adultsPrice + childrenPrice;
    
    document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
    
    // Store the calculated price to use in the booking process
    window.calculatedTotalPrice = totalPrice;
    
    console.log("Price Updated:", totalPrice);
  };

  // Important: Add event listeners AFTER the modal is added to the DOM
  document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
  document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
  // Initialize price calculation
  updateTotalPrice();

  // Form submission handler
  document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading message
    const proceedBtn = document.getElementById('proceedBtn');
    const loadingMessage = document.getElementById('loadingMessage');
    proceedBtn.disabled = true;
    proceedBtn.style.opacity = '0.7';
    proceedBtn.textContent = 'Processing...';
    loadingMessage.style.display = 'block';
    
    // Get values from form
    const adults = document.getElementById('queryAdults').value;
    const children = document.getElementById('queryChildren').value;
    const infants = document.getElementById('queryInfants').value;
    
    // Make sure to get the most up-to-date calculated price
    updateTotalPrice();
    
    const formData = {
      name: document.getElementById('queryName').value,
      email: document.getElementById('queryEmail').value,
      phone: document.getElementById('queryPhone').value,
      travelDate: document.getElementById('queryTravelDate').value,
      adults: adults,
      children: children,
      infants: infants,
      totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
      message: document.getElementById('queryMessage').value,
      tourTitle: selectedTour.title,
      tourPrice: selectedTour.price,
      calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
      termsAccepted: document.getElementById('queryTerms').checked
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
      alert('Please fill in all required fields');
      // Reset button state
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = '1';
      proceedBtn.textContent = 'Send Query & Continue to Booking';
      loadingMessage.style.display = 'none';
      return;
    }

    try {
      // 1. Send to backend API
      try {
        await axios.post('http://localhost:5000/api/tour-queries', formData);
        console.log('✅ Query saved to database');
      } catch (error) {
        console.error('❌ Error saving query:', error);
      }

      // 2. Send to WhatsApp in the background
      sendWhatsAppInBackground(formData);
      
      // Create/update userData object with form data
      const updatedUserData = {
        username: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      
      // Short delay to show the "taking you to checkout" message
      setTimeout(() => {
        // Close the modal
        document.body.removeChild(modalOverlay);
        
        // Proceed with payment - using either existing userData (if logged in) or form data
        // Pass the calculated total price to the payment function
        proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
      }, 1500);
      
    } catch (error) {
      console.error('🚨 Error processing query:', error);
      alert('Failed to submit query. Please try again.');
      
      // Reset button state
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = '1';
      proceedBtn.textContent = 'Send Query & Continue to Booking';
      loadingMessage.style.display = 'none';
    }
  });
};

// Function to send WhatsApp message in the background
const sendWhatsAppInBackground = (formData) => {
  // Format message for WhatsApp
  const message = `
*New Tour Query*
------------------
*Tour:* ${formData.tourTitle}
*Base Price:* ₹${formData.tourPrice}
*Total Price:* ₹${formData.calculatedPrice}

*Customer Details*
------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Travel Date:* ${formData.travelDate}

*Booking Details*
------------------
*Adults:* ${formData.adults}
*Children (5-12):* ${formData.children}
*Infants (0-4):* ${formData.infants}
*Total Travelers:* ${formData.totalTravelers}

*Message:* ${formData.message || 'N/A'}
------------------
Sent on: ${new Date().toLocaleString()}
  `.trim();

  // Use your backend API to send WhatsApp message
  try {
    // Option 1: Send via your own backend API
    axios.post('http://localhost:5000/api/send-whatsapp', {
      phone: "9541515012",
      message: message
    }).then(() => {
      console.log('✅ WhatsApp notification sent successfully');
    }).catch(error => {
      console.error('❌ Error sending WhatsApp notification:', error);
      // Fallback option - try alternate WhatsApp sending method
      sendViaWhatsAppAPI(message);
    });
  } catch (error) {
    console.error('❌ Error sending WhatsApp notification:', error);
  }
};

// Fallback method to send WhatsApp message via third-party service if direct API fails
const sendViaWhatsAppAPI = (message) => {
  // You could use a third-party service API here as a backup
  // This is a placeholder - implement according to your preferred service
  console.log('Using fallback WhatsApp service');
  
  // Example using a hypothetical third-party API - replace with your actual implementation
  try {
    fetch('https://api.whatsapp-service.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: 'your-api-key',
        phone: '9541515012',
        message: message
      })
    });
  } catch (error) {
    console.error('❌ Fallback WhatsApp service also failed:', error);
  }
};

// Function to proceed with payment (existing payment flow with price adjustment)
const proceedWithPayment = async (selectedTour, userData, token, calculatedPrice) => {
  const userEmail = userData?.email?.trim();
  
  if (!userEmail) {
    alert("❌ Email is required for booking.");
    return;
  }

  console.log("✅ Final User Email:", userEmail);
  console.log("✅ Calculated Price:", calculatedPrice);

  const packageDetails = {
    id: `tour-${Date.now()}`,
    name: selectedTour.title,
    description: `Tour package for ${selectedTour.title}`,
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("❌ Razorpay SDK failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    try {
      const res = await loadRazorpay();
      if (!res) {
        alert('❌ Razorpay SDK failed to load');
        return;
      }

      // Use the calculated price instead of the base tour price
      const finalAmount = calculatedPrice || selectedTour.price;

      const payload = {
        amount: finalAmount,
        packageDetails,
        email: userEmail,
        name: userData?.username || 'Guest',
        phone: userData?.phone || '',
      };

      console.log("Request Payload:", payload);

      console.log("🟢 Sending Create Order API Call...");
      const orderResponse = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(payload),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.error("❌ Create Order API failed:", errorData);
        alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
        return;
      }

      const { order } = await orderResponse.json();

      if (!order || !order.id) {
        console.error("❌ Invalid order response:", order);
        alert("Order creation failed. Please try again.");
        return;
      }

      console.log("✅ Order Created Successfully:", order);

      const options = {
        key: "rzp_live_VQS2zWKwCIE5ON",
        amount: finalAmount * 100, // Use the calculated price
        currency: 'INR',
        name: "Your Travel Company",
        description: packageDetails.description,
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log("🟢 Payment Successful! Sending verification request...");
            const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: { 
                  name: userData?.username || 'Guest', 
                  email: userEmail,
                  phone: userData?.phone || ''
                }
              }),
            });

            const data = await verifyResponse.json();
            if (data.success) {
              alert('🎉 Booking successful!');
            } else {
              alert('❌ Payment verification failed');
            }
          } catch (error) {
            console.error("🚨 Payment verification error:", error);
            alert('❌ Payment verification failed');
          }
        },
        prefill: {
          name: userData?.username || 'Guest',
          email: userEmail,
          contact: userData?.phone || ''
        },
        theme: { color: '#FF6B00' }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('🚨 Payment error:', error);
      alert('❌ Payment initiation failed');
    }
  };

  initiatePayment();
};
// const TestimonialsCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const testimonials = [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       location: "Dal Lake Houseboat Stay",
//       image: "./images/Hero.jpg",
//       rating: 5,
//       text: "Our Kashmir experience was magical! Staying on a traditional houseboat on Dal Lake was like stepping into a dream. The snow-capped mountains reflecting in the calm waters, the fragrant Mughal gardens, and the warm hospitality of the locals made this trip unforgettable.",
//       trip: "7-day Kashmir Paradise Tour"
//     },
//     {
//       id: 2,
//       name: "Rahul Mehta",
//       location: "Gulmarg Skiing Adventure",
//       image: "./images/Hero.jpg",
//       rating: 5,
//       text: "Skiing in Gulmarg exceeded all expectations! The powder snow was perfect, and the Himalayan views were breathtaking. Our guide knew exactly where to take us for the best slopes and helped arrange everything from equipment to the gondola passes. Can't wait to return next winter!",
//       trip: "5-day Gulmarg Winter Expedition"
//     },
//     {
//       id: 3,
//       name: "Aisha Khan",
//       location: "Pahalgam Valley Trek",
//       image: "./images/Hero.jpg",
//       rating: 5,
//       text: "The Pahalgam Valley trek took us through pine forests, meadows and alongside crystal-clear rivers. Our guide shared fascinating stories about Kashmir's history and culture. The traditional Wazwan dinner was an incredible culinary experience I'll never forget.",
//       trip: "10-day Kashmir Valley Explorer"
//     },
//     {
//       id: 4,
//       name: "Michael Anderson",
//       location: "Srinagar Cultural Tour",
//       image: "./images/Hero.jpg",
//       rating: 5,
//       text: "Srinagar's old city was a photographer's paradise! From the ancient Jamia Masjid to the intricate woodwork of the heritage houses. Shopping for authentic Kashmiri handicrafts at the local markets was a highlight. The team arranged perfect photo opportunities at every location.",
//       trip: "6-day Srinagar Heritage Experience"
//     },
//     {
//       id: 5,
//       name: "Sophia Williams",
//       location: "Sonmarg Alpine Meadows",
//       image: "./images/Hero.jpg",
//       rating: 5,
//       text: "Sonmarg's meadows were carpeted with wildflowers when we visited. Our horseback ride to Thajiwas Glacier offered spectacular views of the snow-capped peaks. The luxury camping arranged by the team provided the perfect balance of adventure and comfort in Kashmir's paradise.",
//       trip: "8-day Kashmir Meadows & Mountains Tour"
//     }
//   ];

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => 
//         prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   // Handle manual navigation
//   const goToTestimonial = (index) => {
//     setActiveIndex(index);
//   };

//   // Render stars based on rating
//   const renderStars = (rating) => {
//     return Array(5).fill(0).map((_, i) => (
//       <svg 
//         key={i} 
//         xmlns="http://www.w3.org/2000/svg" 
//         viewBox="0 0 24 24" 
//         fill={i < rating ? "currentColor" : "none"}
//         stroke={i < rating ? "none" : "currentColor"}
//         className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//       </svg>
//     ));
//   };

//   return (
//     <section id="kashmir-testimonials" className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50 relative overflow-hidden">
//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
//         <svg className="absolute top-0 right-0 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//           <path fill="#046865" d="M41.3,-69.8C53.4,-64.5,63.1,-53.1,70.4,-40C77.8,-26.9,82.8,-13.5,81.2,-0.9C79.6,11.6,71.5,23.3,62.6,33.3C53.8,43.3,44.2,51.7,33.2,57.7C22.2,63.7,11.1,67.4,-1.2,69.3C-13.5,71.1,-27,71.1,-39.9,66.9C-52.8,62.7,-65.1,54.2,-70.4,42.5C-75.8,30.8,-74.1,15.4,-72.9,0.7C-71.7,-14,-71,-28.1,-65.2,-40.3C-59.3,-52.6,-48.3,-63.1,-35.7,-68.1C-23.1,-73.2,-9,-72.7,3.3,-78.1C15.5,-83.5,31.1,-94.8,41.3,-69.8Z" transform="translate(100 100)" />
//         </svg>
//         <svg className="absolute bottom-0 left-0 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//           <path fill="#046865" d="M37.5,-63.2C48.9,-57.3,58.7,-47.3,66.7,-35.3C74.6,-23.3,80.8,-9.3,79.3,3.9C77.9,17,68.8,29.4,59.3,40.7C49.9,52,40.1,62.2,28.2,67.5C16.3,72.8,2.4,73.2,-12.5,71.6C-27.4,70,-43.4,66.4,-54.1,56.9C-64.7,47.4,-70.1,32,-73.8,16.3C-77.6,0.6,-79.7,-15.5,-74.4,-28.4C-69.1,-41.2,-56.4,-50.9,-43.2,-56.2C-30,-61.5,-16.3,-62.3,-1.9,-59.5C12.6,-56.7,26.1,-69.1,37.5,-63.2Z" transform="translate(100 100)" />
//         </svg>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         {/* SEO-optimized heading structure */}
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-teal-800">
//           Enchanting Kashmir Travel Experiences
//         </h2>
//         <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
//           Discover why travelers call Kashmir "Paradise on Earth" with our award-winning Dal Lake houseboats, Gulmarg ski packages, and Pahalgam valley treks.
//         </p>

//         {/* Testimonial carousel */}
//         <div className="relative max-w-5xl mx-auto">
//           <div className="overflow-hidden rounded-2xl shadow-2xl">
//             {testimonials.map((testimonial, index) => (
//               <div 
//                 key={testimonial.id}
//                 className={`transition-opacity duration-500 ${
//                   index === activeIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
//                 }`}
//               >
//                 <div className="p-8 md:p-12 flex flex-col md:flex-row items-center bg-white backdrop-blur-sm bg-opacity-90 border border-teal-100">
//                   {/* Left: Image and personal info */}
//                   <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
//                     <div className="relative">
//                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
//                         <img 
//                           src={testimonial.image} 
//                           alt={`${testimonial.name} - Happy traveler in ${testimonial.location}, Kashmir`}
//                           className="w-20 h-20 rounded-full object-cover border-4 border-white"
//                         />
//                       </div>
//                       <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1.5 shadow-lg">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.56.23-1.583.658-3.112.958a.75.75 0 01-.917-.917c.3-1.528.728-2.551.958-3.111A6.985 6.985 0 013 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </div>
//                     <h3 className="mt-4 font-bold text-lg text-center text-teal-800">{testimonial.name}</h3>
//                     <p className="text-amber-600 font-medium text-sm text-center">{testimonial.location}</p>
//                     <div className="flex mt-2">
//                       {renderStars(testimonial.rating)}
//                     </div>
//                     <div className="mt-3 px-4 py-1.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
//                       {testimonial.trip}
//                     </div>
//                   </div>
                  
//                   {/* Right: Testimonial text */}
//                   <div className="md:w-2/3 md:pl-8">
//                     <div className="relative">
//                       <div className="absolute -top-6 -left-6">
//                         <svg className="h-12 w-12 text-teal-100" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-700 text-lg italic leading-relaxed mt-6">
//                         {testimonial.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Custom navigation arrows */}
//           <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:translate-x-0">
//             <button
//               onClick={() => goToTestimonial(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
//               className="w-10 h-10 rounded-full bg-white shadow-lg text-teal-600 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
//               aria-label="Previous testimonial"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 md:translate-x-0">
//             <button
//               onClick={() => goToTestimonial(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)}
//               className="w-10 h-10 rounded-full bg-white shadow-lg text-teal-600 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
//               aria-label="Next testimonial"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
          
//           {/* Navigation indicators */}
//           <div className="flex justify-center mt-8">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToTestimonial(index)}
//                 className={`w-3 h-3 mx-2 rounded-full focus:outline-none transition-all duration-300 ${
//                   index === activeIndex 
//                     ? "bg-teal-600 w-8" 
//                     : "bg-gray-300 hover:bg-teal-400"
//                 }`}
//                 aria-label={`View testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
        
//         {/* SEO-optimized call to action */}
//         <div className="mt-12 text-center">
//           <h3 className="text-2xl font-semibold mb-4 text-teal-800">Experience Kashmir's Paradise</h3>
//           <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
//             Join thousands of travelers who have discovered the beauty of Dal Lake houseboats, Gulmarg skiing, and Pahalgam treks with our premium guided tours.
//           </p>
//           <button 
//             className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-teal-200"
//             aria-label="Explore our popular Kashmir tour packages"
//           >
//             Discover Kashmir Packages
//             {/* Plan Your Trip with us */}
//           </button>
//         </div>
        
//         {/* Trust badges */}
//         <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//             <div className="ml-3">
//               <p className="text-sm font-bold text-gray-700">Verified Reviews</p>
//               <p className="text-xs text-gray-500">4.9/5 from 2,500+ travelers</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//             </svg>
//             <div className="ml-3">
//               <p className="text-sm font-bold text-gray-700">Safe Travel</p>
//               <p className="text-xs text-gray-500">Secure bookings & local guides</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//               <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0114 8.5c0-.818-.332-1.559-.87-2.095L11.81 5.084A3 3 0 0110.189 4H3z" />
//               <path d="M14 8.5a1 1 0 00-1-1h-1.05a2.5 2.5 0 01-4.9 0H4a1 1 0 00-1 1v5a1 1 0 001 1h8a1 1 0 001-1v-5zM3 6a1 1 0 011-1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 011 1v1H4V6z" />
//             </svg>
//             <div className="ml-3">
//               <p className="text-sm font-bold text-gray-700">Exclusive Transfers</p>
//               <p className="text-xs text-gray-500">Comfortable transportation</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Structured data for SEO (hidden) */}
//         <div className="hidden" itemScope itemType="https://schema.org/Product">
//           <meta itemProp="name" content="Premium Kashmir Tour Packages - Dal Lake, Gulmarg & Pahalgam" />
//           <meta itemProp="description" content="Experience the paradise of Kashmir with our luxury houseboats on Dal Lake, skiing adventures in Gulmarg, and trekking expeditions in Pahalgam Valley. Book award-winning tours with expert local guides." />
//           <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
//             <meta itemProp="ratingValue" content="4.9" />
//             <meta itemProp="reviewCount" content="2547" />
//           </div>
//           <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
//             <meta itemProp="name" content="Kashmir Paradise Tours" />
//           </div>
//           <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
//             <meta itemProp="lowPrice" content="14999" />
//             <meta itemProp="highPrice" content="89999" />
//             <meta itemProp="priceCurrency" content="INR" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsCarousel;




const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Dal Lake Houseboat Stay",
      image: "./images/Hero.jpg",
      rating: 5,
      text: "Our Kashmir experience was magical! Staying on a traditional houseboat on Dal Lake was like stepping into a dream. The snow-capped mountains reflecting in the calm waters, the fragrant Mughal gardens, and the warm hospitality of the locals made this trip unforgettable.",
      trip: "7-day Kashmir Paradise Tour"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Gulmarg Skiing Adventure",
      image: "./images/Hero.jpg",
      rating: 5,
      text: "Skiing in Gulmarg exceeded all expectations! The powder snow was perfect, and the Himalayan views were breathtaking. Our guide knew exactly where to take us for the best slopes and helped arrange everything from equipment to the gondola passes. Can't wait to return next winter!",
      trip: "5-day Gulmarg Winter Expedition"
    },
    {
      id: 3,
      name: "Aisha Khan",
      location: "Pahalgam Valley Trek",
      image: "./images/Hero.jpg",
      rating: 5,
      text: "The Pahalgam Valley trek took us through pine forests, meadows and alongside crystal-clear rivers. Our guide shared fascinating stories about Kashmir's history and culture. The traditional Wazwan dinner was an incredible culinary experience I'll never forget.",
      trip: "10-day Kashmir Valley Explorer"
    },
    {
      id: 4,
      name: "Michael Anderson",
      location: "Srinagar Cultural Tour",
      image: "./images/Hero.jpg",
      rating: 5,
      text: "Srinagar's old city was a photographer's paradise! From the ancient Jamia Masjid to the intricate woodwork of the heritage houses. Shopping for authentic Kashmiri handicrafts at the local markets was a highlight. The team arranged perfect photo opportunities at every location.",
      trip: "6-day Srinagar Heritage Experience"
    },
    {
      id: 5,
      name: "Sophia Williams",
      location: "Sonmarg Alpine Meadows",
      image: "./images/Hero.jpg",
      rating: 5,
      text: "Sonmarg's meadows were carpeted with wildflowers when we visited. Our horseback ride to Thajiwas Glacier offered spectacular views of the snow-capped peaks. The luxury camping arranged by the team provided the perfect balance of adventure and comfort in Kashmir's paradise.",
      trip: "8-day Kashmir Meadows & Mountains Tour"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle manual navigation
  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={i < rating ? "currentColor" : "none"}
        stroke={i < rating ? "none" : "currentColor"}
        className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ));
  };

  // Handle package discovery button click
  // const handleDiscoverPackages = () => {
  //   // Redirect to packages page
  //   window.location.href = "/packages";
  //   // Alternatively, you can use React Router if it's set up in your project
  //   // navigate('/packages');
  // };
  // const handleDiscoverPackages = () => {
  //   // Create popup element
  //   const popup = document.createElement('div');
  //   popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
  //   // Create popup content
  //   popup.innerHTML = `
  //     <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
  //       <div class="flex justify-between items-center mb-4">
  //         <h3 class="text-xl font-bold text-gray-900">Exclusive Kashmir Offers</h3>
  //         <button id="closePopup" class="text-gray-500 hover:text-gray-700">
  //           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  //           </svg>
  //         </button>
  //       </div>
        
  //       <div class="space-y-4">
  //         <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
  //           <p class="font-bold text-amber-800">Limited Time Offer!</p>
  //           <p class="text-amber-700">Save 20% on all Kashmir packages when you book this week.</p>
  //         </div>
          
  //         <div class="border-t border-b py-3">
  //           <div class="flex justify-between">
  //             <p class="font-medium">Srinagar Explorer</p>
  //             <p><span class="line-through text-gray-500">₹15,999</span> <span class="font-bold text-orange-600">₹12,799</span></p>
  //           </div>
  //           <div class="flex justify-between">
  //             <p class="font-medium">Gulmarg Adventure</p>
  //             <p><span class="line-through text-gray-500">₹18,499</span> <span class="font-bold text-orange-600">₹14,799</span></p>
  //           </div>
  //           <div class="flex justify-between">
  //             <p class="font-medium">Complete Kashmir</p>
  //             <p><span class="line-through text-gray-500">₹24,999</span> <span class="font-bold text-orange-600">₹19,999</span></p>
  //           </div>
  //         </div>
          
  //         <button class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
  //           Book Now & Save
  //         </button>
  //       </div>
  //     </div>
  //   `;
    
  //   // Add popup to body
  //   document.body.appendChild(popup);
    
  //   // Add close functionality
  //   document.getElementById('closePopup').addEventListener('click', () => {
  //     popup.classList.add('opacity-0');
  //     setTimeout(() => {
  //       document.body.removeChild(popup);
  //     }, 300);
  //   });
    
  //   // Close when clicking outside
  //   popup.addEventListener('click', (e) => {
  //     if (e.target === popup) {
  //       popup.classList.add('opacity-0');
  //       setTimeout(() => {
  //         document.body.removeChild(popup);
  //       }, 300);
  //     }
  //   });
  // };
  const handleDiscoverPackages1 = () => {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
    
    // Create popup content
    popup.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-900">Exclusive Kashmir Offers</h3>
          <button id="closePopup" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p class="font-bold text-amber-800">Limited Time Offer!</p>
            <p class="text-amber-700">Save 20% on all Kashmir packages when you book this week.</p>
          </div>
          
          <div class="border-t border-b py-3">
            <div class="flex justify-between">
              <p class="font-medium">Srinagar Explorer</p>
              <p><span class="line-through text-gray-500">₹15,999</span> <span class="font-bold text-orange-600">₹12,799</span></p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Gulmarg Adventure</p>
              <p><span class="line-through text-gray-500">₹18,499</span> <span class="font-bold text-orange-600">₹14,799</span></p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Complete Kashmir</p>
              <p><span class="line-through text-gray-500">₹24,999</span> <span class="font-bold text-orange-600">₹19,999</span></p>
            </div>
          </div>
          
          <button id="bookNowBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            Book Now & Save
          </button>
          
          <div class="mt-2 text-center">
            <p class="text-sm text-gray-500">Offer valid until March 21, 2025</p>
            <p class="text-xs text-gray-400 mt-1">Terms and conditions apply</p>
          </div>
        </div>
      </div>
    `;
    
    // Add popup to body
    document.body.appendChild(popup);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      popup.classList.add('opacity-100');
      const popupContent = popup.querySelector('div');
      popupContent.classList.remove('scale-95');
      popupContent.classList.add('scale-100');
    }, 10);
    
    // Add close functionality
    document.getElementById('closePopup').addEventListener('click', () => {
      closePopup(popup);
    });
    
    // Close when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
    
    // Book Now button functionality
    // document.getElementById('bookNowBtn').addEventListener('click', () => {
    //   // Close current popup
    //   closePopup(popup);
      
    //   // Show booking form or redirect to booking page
    //   setTimeout(() => {
    //     // You can replace this with redirect or another popup
    //     alert('Redirecting to booking page...');
    //     // window.location.href = '/booking?promo=KASHMIR2025';
    //   }, 300);
    // });
    // Handler for the Book Now & Save button
document.getElementById('bookNowBtn').addEventListener('click', () => {
  // Create booking form popup
  const bookingForm = document.createElement('div');
  bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
  
  // Create form content with advanced design
  bookingForm.innerHTML = `
    <div class="bg-white rounded-xl p-0 max-w-lg w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden">
      <!-- Header with gradient background -->
      <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative">
        <h3 class="text-2xl font-bold">Book Your Kashmir Adventure</h3>
        <p class="mt-1 opacity-90">Exclusive 20% off for limited time</p>
        <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Decorative elements -->
        <div class="absolute -bottom-6 left-0 w-full flex justify-between px-8">
          <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Form content -->
      <div class="p-6 pt-10">
        <form id="kashmirBookingForm" class="space-y-4">
          <!-- Package selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
            <div class="grid grid-cols-3 gap-3">
              <div class="package-option">
                <input type="radio" id="package1" name="package" value="srinagar" class="hidden peer" checked>
                <label for="package1" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                  <span class="block font-medium">Srinagar</span>
                  <span class="block text-orange-600 font-bold mt-1">₹12,799</span>
                </label>
              </div>
              <div class="package-option">
                <input type="radio" id="package2" name="package" value="gulmarg" class="hidden peer">
                <label for="package2" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                  <span class="block font-medium">Gulmarg</span>
                  <span class="block text-orange-600 font-bold mt-1">₹14,799</span>
                </label>
              </div>
              <div class="package-option">
                <input type="radio" id="package3" name="package" value="complete" class="hidden peer">
                <label for="package3" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                  <span class="block font-medium">Complete</span>
                  <span class="block text-orange-600 font-bold mt-1">₹19,999</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Two columns layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Personal information -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
              <div class="flex">
                <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200">-</button>
                <input type="number" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
                <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">+</button>
              </div>
            </div>
          </div>
          
          <!-- Date selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
            <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
          </div>
          
          <!-- Special requests -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-24 resize-none"></textarea>
          </div>
          
          <!-- Promo code -->
          <div class="flex items-center space-x-2">
            <input type="text" placeholder="Promo Code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <button type="button" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
          </div>
          
          <!-- Submit button -->
          <div class="pt-2">
            <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
              <span>Secure Your Booking</span>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <!-- Terms and conditions -->
          <div class="text-center text-sm text-gray-500">
            <p>By booking, you agree to our <a href="#" class="text-orange-600 hover:underline">Terms & Conditions</a></p>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Add form to body
  document.body.appendChild(bookingForm);
  
  // Trigger animation
  setTimeout(() => {
    bookingForm.classList.add('opacity-100');
    const formContent = bookingForm.querySelector('div');
    formContent.classList.remove('scale-95');
    formContent.classList.add('scale-100');
  }, 10);
  
  // Add close functionality
  document.getElementById('closeBookingForm').addEventListener('click', () => {
    closeBookingForm(bookingForm);
  });
  
  // Close when clicking outside
  bookingForm.addEventListener('click', (e) => {
    if (e.target === bookingForm) {
      closeBookingForm(bookingForm);
    }
  });
  
  // Helper function to close booking form with animation
  function closeBookingForm(formElement) {
    const formContent = formElement.querySelector('div');
    formElement.classList.remove('opacity-100');
    formElement.classList.add('opacity-0');
    formContent.classList.remove('scale-100');
    formContent.classList.add('scale-95');
    
    setTimeout(() => {
      document.body.removeChild(formElement);
    }, 300);
  }
  
  // Handle travelers count
  document.getElementById('decreaseTravelers').addEventListener('click', () => {
    const travelersInput = document.getElementById('travelers');
    if (parseInt(travelersInput.value) > 1) {
      travelersInput.value = parseInt(travelersInput.value) - 1;
    }
  });
  
  document.getElementById('increaseTravelers').addEventListener('click', () => {
    const travelersInput = document.getElementById('travelers');
    if (parseInt(travelersInput.value) < 10) {
      travelersInput.value = parseInt(travelersInput.value) + 1;
    }
  });
  
  // Form submission
  document.getElementById('kashmirBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = document.getElementById('submitBooking');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `;
    
    // Simulate form processing
    setTimeout(() => {
      // Close the form
      closeBookingForm(bookingForm);
      
      // Show success message
      setTimeout(() => {
        showSuccessMessage();
      }, 300);
    }, 1500);
  });
  
  // Function to show success message
  function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
    
    successMessage.innerHTML = `
      <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold mt-4">Booking Successful!</h3>
        <p class="mt-2 text-gray-600">Your Kashmir adventure is confirmed. We've sent the details to your email.</p>
        <p class="mt-1 text-gray-600">Booking reference: <span class="font-medium">KASH-${Math.random().toString(36).substr(2, 6).toUpperCase()}</span></p>
        <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
          Continue
        </button>
      </div>
    `;
    
    document.body.appendChild(successMessage);
    setTimeout(() => {
      successMessage.classList.add('opacity-100');
      const messageContent = successMessage.querySelector('div');
      messageContent.classList.remove('scale-95');
      messageContent.classList.add('scale-100');
    }, 10);
    
    // Close success message when the continue button is clicked
    document.getElementById('closeSuccess').addEventListener('click', () => {
      successMessage.classList.remove('opacity-100');
      successMessage.classList.add('opacity-0');
      const messageContent = successMessage.querySelector('div');
      messageContent.classList.remove('scale-100');
      messageContent.classList.add('scale-95');
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    });
    
    // Close when clicking outside
    successMessage.addEventListener('click', (e) => {
      if (e.target === successMessage) {
        successMessage.classList.remove('opacity-100');
        successMessage.classList.add('opacity-0');
        const messageContent = successMessage.querySelector('div');
        messageContent.classList.remove('scale-100');
        messageContent.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 300);
      }
    });
  }
  
  // Add ESC key to close form
  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      closeBookingForm(bookingForm);
      document.removeEventListener('keydown', handleEscKey);
    }
  };
  
  document.addEventListener('keydown', handleEscKey);
});
    
    // setTimeout(() => {
    //   successMessage.classList.add('opacity-100');
    //   const messageContent = successMessage.querySelector('div');
    //   messageContent.classList.remove('scale-95');
    //   // messageContent.classList.add('scale
    
    // }
  //   setTimeout(() => {
  //     successMessage.classList.add('opacity-100');
  //     const messageContent = successMessage.querySelector('div');
  //     messageContent.classList.remove('scale-95');
  //     messageContent.classList.add('scale-100'); // Fixed the missing class addition
  //   }, 300);}
  // }    }
    // Helper function to close popup with animation
    function closePopup(popupElement) {
      const popupContent = popupElement.querySelector('div');
      popupElement.classList.remove('opacity-100');
      popupElement.classList.add('opacity-0');
      popupContent.classList.remove('scale-100');
      popupContent.classList.add('scale-95');
      
      setTimeout(() => {
        document.body.removeChild(popupElement);
      }, 300);
    }
    
    // Add ESC key to close popup
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closePopup(popup);
        document.removeEventListener('keydown', handleEscKey);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
  };
  const handleDiscoverPackages = () => {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
    
    // Create popup content
    popup.innerHTML = `
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 my-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Exclusive Kashmir Offers</h3>
          <button id="closePopup" class="text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3 sm:space-y-4">
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p class="font-bold text-amber-800">Limited Time Offer!</p>
            <p class="text-amber-700">Save 20% on all Kashmir packages when you book this week.</p>
          </div>
          
          <div class="border-t border-b py-3">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">Srinagar Explorer</p>
                <p class="text-xs text-gray-500">5 days, 4 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹15,999</span> <span class="font-bold text-orange-600">₹12,799</span></p>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div>
                <p class="font-medium">Gulmarg Adventure</p>
                <p class="text-xs text-gray-500">7 days, 6 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹18,499</span> <span class="font-bold text-orange-600">₹14,799</span></p>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div>
                <p class="font-medium">Complete Kashmir</p>
                <p class="text-xs text-gray-500">10 days, 9 nights</p>
              </div>
              <p><span class="line-through text-gray-500">₹24,999</span> <span class="font-bold text-orange-600">₹19,999</span></p>
            </div>
          </div>
          
          <button id="bookNowBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            Book Now & Save
          </button>
          
          <div class="mt-2 text-center">
            <p class="text-sm text-gray-500">Offer valid until March 21, 2025</p>
            <p class="text-xs text-gray-400 mt-1">Terms and conditions apply</p>
          </div>
        </div>
      </div>
    `;
    
    // Add popup to body
    document.body.appendChild(popup);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      popup.classList.add('opacity-100');
      const popupContent = popup.querySelector('div');
      popupContent.classList.remove('scale-95');
      popupContent.classList.add('scale-100');
    }, 10);
    
    // Add close functionality
    document.getElementById('closePopup').addEventListener('click', () => {
      closePopup(popup);
    });
    
    // Close when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
    
    // Book Now button functionality
    document.getElementById('bookNowBtn').addEventListener('click', () => {
      // Close current popup
      closePopup(popup);
      
      // Create booking form popup
      setTimeout(() => {
        showBookingForm();
      }, 300);
    });
    
    // Helper function to close popup with animation
    function closePopup(popupElement) {
      const popupContent = popupElement.querySelector('div');
      popupElement.classList.remove('opacity-100');
      popupElement.classList.add('opacity-0');
      popupContent.classList.remove('scale-100');
      popupContent.classList.add('scale-95');
      
      setTimeout(() => {
        document.body.removeChild(popupElement);
      }, 300);
    }
    
    // Function to show booking form
    function showBookingForm() {
      // Create booking form popup
      const bookingForm = document.createElement('div');
      bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
      // Package details for dynamic population and pricing
      const packages = {
        'srinagar': { 
          name: 'Srinagar Explorer', 
          price: 15999, 
          discountedPrice: 12799, 
          duration: '5 days, 4 nights' 
        },
        'gulmarg': { 
          name: 'Gulmarg Adventure', 
          price: 18499, 
          discountedPrice: 14799, 
          duration: '7 days, 6 nights' 
        },
        'complete': { 
          name: 'Complete Kashmir', 
          price: 24999, 
          discountedPrice: 19999, 
          duration: '10 days, 9 nights' 
        }
      };
      
      // Valid promo codes with discount percentages
      const promoCodes = {
        'KASHMIR2025': 10,
        'SPRING25': 15,
        'FAMILY20': 20
      };
      
      // Create form content with advanced design
      bookingForm.innerHTML = `
        <div class="bg-white rounded-xl p-0  max-w-lg w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
          <!-- Header with gradient background -->
          <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-6 text-white relative">
            <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
            <p class="mt-1 opacity-90">Exclusive 20% off for limited time</p>
            <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <!-- Decorative elements -->
            <div class="absolute -bottom-6 left-0 w-full flex justify-between px-8">
              <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Form content -->
          <div class="p-4 sm:p-6 pt-8 sm:pt-10 max-h-[calc(100vh-200px)] overflow-y-auto">
            <form id="kashmirBookingForm" class="space-y-4">
              <!-- Package selection -->
              <div class="mb-4 sm:mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="package-option">
                    <input type="radio" id="package1" name="package" value="srinagar" class="hidden peer" checked>
                    <label for="package1" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Srinagar</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="srinagar-price">12,799</span></span>
                      <span class="block text-xs text-gray-500 mt-1">5 days, 4 nights</span>
                    </label>
                  </div>
                  <div class="package-option">
                    <input type="radio" id="package2" name="package" value="gulmarg" class="hidden peer">
                    <label for="package2" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Gulmarg</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="gulmarg-price">14,799</span></span>
                      <span class="block text-xs text-gray-500 mt-1">7 days, 6 nights</span>
                    </label>
                  </div>
                  <div class="package-option">
                    <input type="radio" id="package3" name="package" value="complete" class="hidden peer">
                    <label for="package3" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
                      <span class="block font-medium">Complete</span>
                      <span class="block text-orange-600 font-bold mt-1">₹<span id="complete-price">19,999</span></span>
                      <span class="block text-xs text-gray-500 mt-1">10 days, 9 nights</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Order summary -->
              <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 class="font-medium mb-2">Order Summary</h4>
                <div class="flex justify-between text-sm mb-1">
                  <span>Package: <span id="selectedPackageName">Srinagar Explorer</span></span>
                  <span id="packageBasePrice">₹15,999</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Duration:</span>
                  <span id="packageDuration">5 days, 4 nights</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Special offer discount (20%):</span>
                  <span class="text-green-600">-₹<span id="specialDiscount">3,200</span></span>
                </div>
                <div id="promoDiscountRow" class="flex justify-between text-sm mb-1 hidden">
                  <span>Promo code discount: <span id="promoCodeLabel"></span></span>
                  <span class="text-green-600">-₹<span id="promoDiscount">0</span></span>
                </div>
                <div class="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>₹<span id="totalPrice">12,799</span></span>
                </div>
              </div>
              
              <!-- Two columns layout -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Personal information -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                  <div class="flex">
                    <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200">-</button>
                    <input type="number" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
                    <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">+</button>
                  </div>
                </div>
              </div>
              
              <!-- Date selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
              </div>
              
              <!-- Special requests -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
              </div>
              
              <!-- Promo code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <div class="flex items-center space-x-2">
                  <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
                </div>
                <div id="promoMessage" class="mt-1 text-sm hidden"></div>
              </div>
              
              <!-- Submit button -->
              <div class="pt-2">
                <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  <span>Secure Your Booking</span>
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Terms and conditions -->
              <div class="text-center text-sm text-gray-500">
                <p>By booking, you agree to our <a href="#" class="text-orange-600 hover:underline">Terms & Conditions</a></p>
              </div>
            </form>
          </div>
        </div>
      `;
      
      // Add form to body
      document.body.appendChild(bookingForm);
      
      // Trigger animation
      setTimeout(() => {
        bookingForm.classList.add('opacity-100');
        const formContent = bookingForm.querySelector('div');
        formContent.classList.remove('scale-95');
        formContent.classList.add('scale-100');
      }, 10);
      
      // Tracking variables for promo code 
      let currentPackage = 'srinagar';
      let currentPromoCode = null;
      let promoDiscountPercent = 0;
      
      // Initial order summary setup
      updateOrderSummary();
      
      // Function to update the order summary
      function updateOrderSummary() {
        const packageData = packages[currentPackage];
        const basePrice = packageData.price;
        const specialDiscountAmount = Math.round(basePrice * 0.2); // 20% off
        let promoDiscountAmount = 0;
        
        // Calculate promo discount if applicable
        if (promoDiscountPercent > 0) {
          promoDiscountAmount = Math.round((basePrice - specialDiscountAmount) * (promoDiscountPercent / 100));
          document.getElementById('promoDiscountRow').classList.remove('hidden');
          document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
          document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
        } else {
          document.getElementById('promoDiscountRow').classList.add('hidden');
        }
        
        // Calculate total price
        const totalPrice = basePrice - specialDiscountAmount - promoDiscountAmount;
        
        // Update display
        document.getElementById('selectedPackageName').textContent = packageData.name;
        document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
        document.getElementById('packageDuration').textContent = packageData.duration;
        document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
        document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
        
        // Update package price display
        document.getElementById('srinagar-price').textContent = packages.srinagar.discountedPrice.toLocaleString();
        document.getElementById('gulmarg-price').textContent = packages.gulmarg.discountedPrice.toLocaleString();
        document.getElementById('complete-price').textContent = packages.complete.discountedPrice.toLocaleString();
      }
      
      // Listen for package selection changes
      document.querySelectorAll('input[name="package"]').forEach(radio => {
        radio.addEventListener('change', function() {
          currentPackage = this.value;
          updateOrderSummary();
        });
      });
      
      // Handle promo code application
      document.getElementById('applyPromo').addEventListener('click', function() {
        const promoInput = document.getElementById('promoCode');
        const enteredCode = promoInput.value.trim().toUpperCase();
        const messageDiv = document.getElementById('promoMessage');
        
        // Reset message styling
        messageDiv.className = 'mt-1 text-sm';
        
        if (!enteredCode) {
          messageDiv.textContent = 'Please enter a promo code.';
          messageDiv.classList.add('text-orange-600');
          messageDiv.classList.remove('hidden');
          return;
        }
        
        if (promoCodes[enteredCode]) {
          // Valid promo code
          promoDiscountPercent = promoCodes[enteredCode];
          currentPromoCode = enteredCode;
          
          messageDiv.textContent = `Success! ${promoDiscountPercent}% additional discount applied.`;
          messageDiv.classList.add('text-green-600');
          messageDiv.classList.remove('hidden');
          
          updateOrderSummary();
        } else {
          // Invalid promo code
          promoDiscountPercent = 0;
          currentPromoCode = null;
          
          messageDiv.textContent = 'Invalid promo code. Please try again.';
          messageDiv.classList.add('text-red-600');
          messageDiv.classList.remove('hidden');
          
          document.getElementById('promoDiscountRow').classList.add('hidden');
          updateOrderSummary();
        }
      });
      
      // Add close functionality
      document.getElementById('closeBookingForm').addEventListener('click', () => {
        closeBookingForm(bookingForm);
      });
      
      // Close when clicking outside
      bookingForm.addEventListener('click', (e) => {
        if (e.target === bookingForm) {
          closeBookingForm(bookingForm);
        }
      });
      
      // Handle travelers count
      document.getElementById('decreaseTravelers').addEventListener('click', () => {
        const travelersInput = document.getElementById('travelers');
        if (parseInt(travelersInput.value) > 1) {
          travelersInput.value = parseInt(travelersInput.value) - 1;
        }
      });
      
      document.getElementById('increaseTravelers').addEventListener('click', () => {
        const travelersInput = document.getElementById('travelers');
        if (parseInt(travelersInput.value) < 10) {
          travelersInput.value = parseInt(travelersInput.value) + 1;
        }
      });
      
      // Form submission
      document.getElementById('kashmirBookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = document.getElementById('submitBooking');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        `;
        
        // Simulate form processing
        setTimeout(() => {
          // Close the form
          closeBookingForm(bookingForm);
          
          // Show success message
          setTimeout(() => {
            showSuccessMessage(currentPackage, currentPromoCode);
          }, 300);
        }, 1500);
      });
      
      // Helper function to close booking form with animation
      function closeBookingForm(formElement) {
        const formContent = formElement.querySelector('div');
        formElement.classList.remove('opacity-100');
        formElement.classList.add('opacity-0');
        formContent.classList.remove('scale-100');
        formContent.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(formElement);
        }, 300);
      }
      
      // Add ESC key to close form
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeBookingForm(bookingForm);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Function to show success message
    function showSuccessMessage(packageType, promoCode) {
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
      // Get package data
      const packageData = {
        'srinagar': { name: 'Srinagar Explorer', duration: '5 days, 4 nights' },
        'gulmarg': { name: 'Gulmarg Adventure', duration: '7 days, 6 nights' },
        'complete': { name: 'Complete Kashmir', duration: '10 days, 9 nights' }
      }[packageType || 'srinagar'];
      
      // Generate a random booking reference
      const bookingRef = 'KASH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      // Create promo text if applicable
      const promoText = promoCode ? `<p class="mt-1 text-gray-600">Promo code applied: <span class="font-medium">${promoCode}</span></p>` : '';
      
      successMessage.innerHTML = `
        <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 text-center">
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mt-4">Booking Successful!</h3>
          <p class="mt-2 text-gray-600">Your ${packageData.name} (${packageData.duration}) is confirmed. We've sent the details to your email.</p>
          <p class="mt-1 text-gray-600">Booking reference: <span class="font-medium">${bookingRef}</span></p>
          ${promoText}
          <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
            Continue
          </button>
        </div>
      `;
      
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.classList.add('opacity-100');
        const messageContent = successMessage.querySelector('div');
        messageContent.classList.remove('scale-95');
        messageContent.classList.add('scale-100');
      }, 10);
      
      // Close success message when the continue button is clicked
      document.getElementById('closeSuccess').addEventListener('click', () => {
        successMessage.classList.remove('opacity-100');
        successMessage.classList.add('opacity-0');
        const messageContent = successMessage.querySelector('div');
        messageContent.classList.remove('scale-100');
        messageContent.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 300);
      });
      
      // Close when clicking outside
      successMessage.addEventListener('click', (e) => {
        if (e.target === successMessage) {
          successMessage.classList.remove('opacity-100');
          successMessage.classList.add('opacity-0');
          const messageContent = successMessage.querySelector('div');
          messageContent.classList.remove('scale-100');
          messageContent.classList.add('scale-95');
          
          setTimeout(() => {
            document.body.removeChild(successMessage);
          }, 300);
        }
      });
      
      // Add ESC key to close success message
      // const handleEscKey = (e) => {
      //   if (e.key === 'Escape') {
      //     successMessage.classList.remove('opacity-100');
      //     successMessage.classList.add('opacity-0');
      //     const messageContent = successMessage.querySelector('div');
      //     messageContent.classList.remove('scale
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeBookingForm(bookingForm);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }};
  return (
    <section id="kashmir-testimonials" className="py-16 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg className="absolute top-0 right-0 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f97316" d="M41.3,-69.8C53.4,-64.5,63.1,-53.1,70.4,-40C77.8,-26.9,82.8,-13.5,81.2,-0.9C79.6,11.6,71.5,23.3,62.6,33.3C53.8,43.3,44.2,51.7,33.2,57.7C22.2,63.7,11.1,67.4,-1.2,69.3C-13.5,71.1,-27,71.1,-39.9,66.9C-52.8,62.7,-65.1,54.2,-70.4,42.5C-75.8,30.8,-74.1,15.4,-72.9,0.7C-71.7,-14,-71,-28.1,-65.2,-40.3C-59.3,-52.6,-48.3,-63.1,-35.7,-68.1C-23.1,-73.2,-9,-72.7,3.3,-78.1C15.5,-83.5,31.1,-94.8,41.3,-69.8Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f97316" d="M37.5,-63.2C48.9,-57.3,58.7,-47.3,66.7,-35.3C74.6,-23.3,80.8,-9.3,79.3,3.9C77.9,17,68.8,29.4,59.3,40.7C49.9,52,40.1,62.2,28.2,67.5C16.3,72.8,2.4,73.2,-12.5,71.6C-27.4,70,-43.4,66.4,-54.1,56.9C-64.7,47.4,-70.1,32,-73.8,16.3C-77.6,0.6,-79.7,-15.5,-74.4,-28.4C-69.1,-41.2,-56.4,-50.9,-43.2,-56.2C-30,-61.5,-16.3,-62.3,-1.9,-59.5C12.6,-56.7,26.1,-69.1,37.5,-63.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* SEO-optimized heading structure */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-orange-800">
          Enchanting Kashmir Travel Experiences
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover why travelers call Kashmir "Paradise on Earth" with our award-winning Dal Lake houseboats, Gulmarg ski packages, and Pahalgam valley treks.
        </p>

        {/* Testimonial carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              >
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-center bg-white backdrop-blur-sm bg-opacity-90 border border-orange-100">
                  {/* Left: Image and personal info */}
                  <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.name} - Happy traveler in ${testimonial.location}, Kashmir`}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1.5 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.56.23-1.583.658-3.112.958a.75.75 0 01-.917-.917c.3-1.528.728-2.551.958-3.111A6.985 6.985 0 013 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-center text-orange-800">{testimonial.name}</h3>
                    <p className="text-amber-600 font-medium text-sm text-center">{testimonial.location}</p>
                    <div className="flex mt-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="mt-3 px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      {testimonial.trip}
                    </div>
                  </div>
                  
                  {/* Right: Testimonial text */}
                  <div className="md:w-2/3 md:pl-8">
                    <div className="relative">
                      <div className="absolute -top-6 -left-6">
                        <svg className="h-12 w-12 text-orange-100" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg italic leading-relaxed mt-6">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom navigation arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:translate-x-0">
            <button
              onClick={() => goToTestimonial(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
              className="w-10 h-10 rounded-full bg-white shadow-lg text-orange-600 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 md:translate-x-0">
            <button
              onClick={() => goToTestimonial(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)}
              className="w-10 h-10 rounded-full bg-white shadow-lg text-orange-600 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Navigation indicators */}
<div className="flex justify-center mt-8">
  {testimonials.map((_, index) => (
    <button
      key={index}
      onClick={() => goToTestimonial(index)}
      className={`w-3 h-3 mx-2 rounded-full focus:outline-none transition-all duration-300 ${
        index === activeIndex 
          ? "bg-orange-600 w-8" 
          : "bg-gray-300 hover:bg-orange-400"
      }`}
      aria-label={`View testimonial ${index + 1}`}
    />
  ))}
</div>
</div>

{/* SEO-optimized call to action */}
<div className="mt-12 text-center">
  <h3 className="text-2xl font-semibold mb-4 text-orange-800">Experience Kashmir's Paradise</h3>
  <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
    Join thousands of travelers who have discovered the beauty of Dal Lake houseboats, Gulmarg skiing, and Pahalgam treks with our premium guided tours.
  </p>
  <button 
    onClick={handleDiscoverPackages}
    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-orange-200"
    aria-label="Explore our popular Kashmir tour packages"
  >
    Discover Kashmir Packages
  </button>
  {/* <TripPlanner/> */}
</div>

<div className="mt-2  rounded-lg p-4 shadow-sm">
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="flex items-center mb-3 md:mb-0">
      <h3 className="text-base font-semibold text-gray-800 mr-4">Need inspiration?</h3>
     
<TripPlanner/>

    </div>
    </div>
    </div>
{/* Trust badges */}
<div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <div className="ml-3">
      <p className="text-sm font-bold text-gray-700">Verified Reviews</p>
      <p className="text-xs text-gray-500">4.9/5 from 2,500+ travelers</p>
    </div>
  </div>
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    <div className="ml-3">
      <p className="text-sm font-bold text-gray-700">Safe Travel</p>
      <p className="text-xs text-gray-500">Secure bookings & local guides</p>
    </div>
  </div>
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0114 8.5c0-.818-.332-1.559-.87-2.095L11.81 5.084A3 3 0 0110.189 4H3z" />
      <path d="M14 8.5a1 1 0 00-1-1h-1.05a2.5 2.5 0 01-4.9 0H4a1 1 0 00-1 1v5a1 1 0 001 1h8a1 1 0 001-1v-5zM3 6a1 1 0 011-1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 011 1v1H4V6z" />
    </svg>
    <div className="ml-3">
      <p className="text-sm font-bold text-gray-700">Exclusive Transfers</p>
      <p className="text-xs text-gray-500">Comfortable transportation</p>
    </div>
  </div>
</div>

{/* Structured data for SEO (hidden) */}
<div className="hidden" itemScope itemType="https://schema.org/Product">
  <meta itemProp="name" content="Premium Kashmir Tour Packages - Dal Lake, Gulmarg & Pahalgam" />
  <meta itemProp="description" content="Experience the paradise of Kashmir with our luxury houseboats on Dal Lake, skiing adventures in Gulmarg, and trekking expeditions in Pahalgam Valley. Book award-winning tours with expert local guides." />
  <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
    <meta itemProp="ratingValue" content="4.9" />
    <meta itemProp="reviewCount" content="2547" />
  </div>
  <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
    <meta itemProp="name" content="Kashmir Paradise Tours" />
  </div>
  <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
    <meta itemProp="lowPrice" content="14999" />
    <meta itemProp="highPrice" content="89999" />
    <meta itemProp="priceCurrency" content="INR" />
  </div>
</div>
</div>
</section>
);
};

export default TestimonialsCarousel;
