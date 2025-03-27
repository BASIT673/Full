


import React, { useState, useMemo ,useEffect} from 'react';
import { motion } from 'framer-motion';
import ToursCarousel from './Tourca';
import axios from 'axios';
import { 
  MapPin, Calendar, Users, DollarSign, Star, X, Clock, 
  Globe, Coffee, Hotel, SortAsc, SortDesc, Filter, Share2,
  Heart, Camera, Map, CalendarCheck, Check,ChevronDown, AlignJustify, Award, Triangle 
} from 'lucide-react';



//   const title = selectedTour.title || selectedTour.tourTitle;
//   const price = selectedTour.price || selectedTour.tourPrice;
// console.log(tour)
//   console.log("✅ Final Title:", title);
//   console.log("✅ Final Price:", price);
//   console.log("🔍 Debugging: selectedTour = ", selectedTour)
//   console.log("➡ Title:", selectedTour?.title);
//   console.log("➡ Price:", selectedTour?.price);
//   console.log("➡ Title:", selectedTour?.description);
//   // console.log("➡ Price:", selectedTour?.price);
//   if (!selectedTour || !selectedTour.title || !selectedTour.price) {
//     alert("❌ Invalid tour selected. Please select a valid tour.");
//     return;
//   }

//   console.log("Selected Tour:", selectedTour); // Debugging

//   const token = localStorage.getItem('token'); 
//   console.log("🔵 Token Retrieved:", token);

//   let userData = null;

//   // ✅ Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data; 
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error('🚨 Error fetching user data:', error);
//     }
//   }

//   // 🛑 Ensure email exists, ask if missing
//   let userEmail = userData?.email?.trim() || '';

//   if (!userEmail) {
//     console.warn("⚠️ No email found! Asking user...");
//     userEmail = prompt("Please enter your email for booking confirmation:");
//     if (!userEmail) {
//       alert("❌ Email is required for booking.");
//       return;
//     }
//   }

//   console.log("✅ Final User Email:", userEmail);

//   const packageDetails = {
//     id: `tour-${Date.now()}`,
//     name: selectedTour.title,
//     description: `Tour package for ${selectedTour.title}`,
//   };

//   console.log("Package Details:", packageDetails); // Debugging

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }

//       const payload = {
//         amount: selectedTour.price,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//       };

//       console.log("Request Payload:", payload); // Debugging

//       console.log("🟢 Sending Create Order API Call...");
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json(); // Parse error response
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: selectedTour.price * 100,
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: { 
//                   name: userData?.username || 'Guest', 
//                   email: userEmail 
//                 }
//               }),
//             });

//             console.log("✅ Sent Token in API Call:", token);

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//         },
//         theme: { color: '#3399cc' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// };
// const handleBookNow = async (selectedTour, tour) => {
//   const title = selectedTour.title || selectedTour.tourTitle;
//   const price = selectedTour.price || selectedTour.tourPrice;
//   console.log("✅ Final Title:", title);
//   console.log("✅ Final Price:", price);
  
//   if (!selectedTour || !selectedTour.title || !selectedTour.price) {
//     alert("❌ Invalid tour selected. Please select a valid tour.");
//     return;
//   }

//   const token = localStorage.getItem('token');
//   let userData = null;
//   let isLoggedIn = false;

//   // ✅ Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data;
//       isLoggedIn = true;
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error('🚨 Error fetching user data:', error);
//     }
//   }

//   // Show query form for BOTH logged-in and guest users
//   showQueryForm(selectedTour, userData, token, isLoggedIn);
// };

// // Function to show the query form modal
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content - compact design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 450px;
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and compact design
//   modalContent.innerHTML = `
//     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
//       </p>
//     </div>
    
//     <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
//       <div style="grid-column: span 2;">
//         <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryTravelers" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travelers*</label>
//         <select id="queryTravelers" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="">Select</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6+">6+</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       travelers: document.getElementById('queryTravelers').value,
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.travelers || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp
//       sendToWhatsApp(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Close the modal
//       document.body.removeChild(modalOverlay);
      
//       // Proceed with payment - using either existing userData (if logged in) or form data
//       proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
//     }
//   });
// };

// // Function to send data to WhatsApp
// const sendToWhatsApp = (formData) => {
//   const phone = "9541515012";
  
//   // Format message for WhatsApp
//   const message = `
// *New Tour Query*
// ------------------
// *Tour:* ${formData.tourTitle}
// *Price:* ₹${formData.tourPrice}

// *Customer Details*
// ------------------
// *Name:* ${formData.name}
// *Email:* ${formData.email}
// *Phone:* ${formData.phone}
// *Travel Date:* ${formData.travelDate}
// *Travelers:* ${formData.travelers}

// *Message:* ${formData.message || 'N/A'}
// ------------------
// Sent on: ${new Date().toLocaleString()}
//   `.trim();

//   // Encode the message for URL
//   const encodedMessage = encodeURIComponent(message);
  
//   // Create WhatsApp URL
//   // const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
  
//   // Open WhatsApp in a new tab/window
//   // window.open(whatsappURL, '_blank');
// };

// // Function to proceed with payment (existing payment flow)
// const proceedWithPayment = async (selectedTour, userData, token) => {
//   const userEmail = userData?.email?.trim();
  
//   if (!userEmail) {
//     alert("❌ Email is required for booking.");
//     return;
//   }

//   console.log("✅ Final User Email:", userEmail);

//   const packageDetails = {
//     id: `tour-${Date.now()}`,
//     name: selectedTour.title,
//     description: `Tour package for ${selectedTour.title}`,
//   };

//   console.log("Package Details:", packageDetails);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }

//       const payload = {
//         amount: selectedTour.price,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//         phone: userData?.phone || '',
//       };

//       console.log("Request Payload:", payload);

//       console.log("🟢 Sending Create Order API Call...");
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: selectedTour.price * 100,
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: { 
//                   name: userData?.username || 'Guest', 
//                   email: userEmail,
//                   phone: userData?.phone || ''
//                 }
//               }),
//             });

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//           contact: userData?.phone || ''
//         },
//         theme: { color: '#FF6B00' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// };
// const handleBookNow = async (selectedTour, tour) => {
//   const title = selectedTour.title || selectedTour.tourTitle;
//   const price = selectedTour.price || selectedTour.tourPrice;
//   console.log("✅ Final Title:", title);
//   console.log("✅ Final Price:", price);
  
//   if (!selectedTour || !selectedTour.title || !selectedTour.price) {
//     alert("❌ Invalid tour selected. Please select a valid tour.");
//     return;
//   }

//   const token = localStorage.getItem('token');
//   let userData = null;
//   let isLoggedIn = false;

//   // ✅ Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data;
//       isLoggedIn = true;
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error('🚨 Error fetching user data:', error);
//     }
//   }

//   // Show query form for BOTH logged-in and guest users
//   showQueryForm(selectedTour, userData, token, isLoggedIn);
// };

// // Function to show the query form modal
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content - compact design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 450px;
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and compact design
//   modalContent.innerHTML = `
//     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
//       </p>
//     </div>
    
//     <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
//       <div style="grid-column: span 2;">
//         <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryAdults" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//         <select id="queryAdults" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;" onchange="updateTotalPrice()">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryChildren" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//         <select id="queryChildren" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;" onchange="updateTotalPrice()">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryInfants" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 2; margin-top: 8px; background-color: #F5F5F5; padding: 8px; border-radius: 4px; text-align: center;">
//         <p style="margin: 0; font-size: 0.9rem; color: #333;">
//           <span style="font-weight: 600;">Total Price:</span> 
//           <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.1rem;">₹${selectedTour.price}</span>
//           <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//             Children under 5 years travel free
//           </span>
//         </p>
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
    
//     <script>
//       function updateTotalPrice() {
//         const basePrice = ${selectedTour.price};
//         const adults = parseInt(document.getElementById('queryAdults').value || 1);
//         const children = parseInt(document.getElementById('queryChildren').value || 0);
        
//         // Adults pay full price, children may have discounted rate (adjust as needed)
//         // Here we're charging children half price as an example
//         const childrenPrice = basePrice * 0.5 * children;
//         const adultsPrice = basePrice * adults;
        
//         const totalPrice = adultsPrice + childrenPrice;
        
//         document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
        
//         // Store the calculated price to use in the booking process
//         window.calculatedTotalPrice = totalPrice;
//       }
      
//       // Initialize price calculation
//       updateTotalPrice();
//     </script>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Get values from form
//     const adults = document.getElementById('queryAdults').value;
//     const children = document.getElementById('queryChildren').value;
//     const infants = document.getElementById('queryInfants').value;
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: adults,
//       children: children,
//       infants: infants,
//       totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Close the modal
//       document.body.removeChild(modalOverlay);
      
//       // Proceed with payment - using either existing userData (if logged in) or form data
//       // Pass the calculated total price to the payment function
//       proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
//     }
//   });
// };

// // Function to send WhatsApp message in the background
// const sendWhatsAppInBackground = (formData) => {
//   // Format message for WhatsApp
//   const message = `
// *New Tour Query*
// ------------------
// *Tour:* ${formData.tourTitle}
// *Base Price:* ₹${formData.tourPrice}
// *Total Price:* ₹${formData.calculatedPrice}

// *Customer Details*
// ------------------
// *Name:* ${formData.name}
// *Email:* ${formData.email}
// *Phone:* ${formData.phone}
// *Travel Date:* ${formData.travelDate}

// *Booking Details*
// ------------------
// *Adults:* ${formData.adults}
// *Children (5-12):* ${formData.children}
// *Infants (0-4):* ${formData.infants}
// *Total Travelers:* ${formData.totalTravelers}

// *Message:* ${formData.message || 'N/A'}
// ------------------
// Sent on: ${new Date().toLocaleString()}
//   `.trim();

//   // Use your backend API to send WhatsApp message
//   try {
//     // Option 1: Send via your own backend API
//     axios.post('http://localhost:5000/api/send-whatsapp', {
//       phone: "9541515012",
//       message: message
//     }).then(() => {
//       console.log('✅ WhatsApp notification sent successfully');
//     }).catch(error => {
//       console.error('❌ Error sending WhatsApp notification:', error);
//       // Fallback option - try alternate WhatsApp sending method
//       sendViaWhatsAppAPI(message);
//     });
//   } catch (error) {
//     console.error('❌ Error sending WhatsApp notification:', error);
//   }
// };

// // Fallback method to send WhatsApp message via third-party service if direct API fails
// const sendViaWhatsAppAPI = (message) => {
//   // You could use a third-party service API here as a backup
//   // This is a placeholder - implement according to your preferred service
//   console.log('Using fallback WhatsApp service');
  
//   // Example using a hypothetical third-party API - replace with your actual implementation
//   try {
//     fetch('https://api.whatsapp-service.com/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         apiKey: 'your-api-key',
//         phone: '9541515012',
//         message: message
//       })
//     });
//   } catch (error) {
//     console.error('❌ Fallback WhatsApp service also failed:', error);
//   }
// };

// // Function to proceed with payment (existing payment flow with price adjustment)
// const proceedWithPayment = async (selectedTour, userData, token, calculatedPrice) => {
//   const userEmail = userData?.email?.trim();
  
//   if (!userEmail) {
//     alert("❌ Email is required for booking.");
//     return;
//   }

//   console.log("✅ Final User Email:", userEmail);
//   console.log("✅ Calculated Price:", calculatedPrice);

//   const packageDetails = {
//     id: `tour-${Date.now()}`,
//     name: selectedTour.title,
//     description: `Tour package for ${selectedTour.title}`,
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }

//       // Use the calculated price instead of the base tour price
//       const finalAmount = calculatedPrice || selectedTour.price;

//       const payload = {
//         amount: finalAmount,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//         phone: userData?.phone || '',
//       };

//       console.log("Request Payload:", payload);

//       console.log("🟢 Sending Create Order API Call...");
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: finalAmount * 100, // Use the calculated price
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: { 
//                   name: userData?.username || 'Guest', 
//                   email: userEmail,
//                   phone: userData?.phone || ''
//                 }
//               }),
//             });

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//           contact: userData?.phone || ''
//         },
//         theme: { color: '#FF6B00' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// };
// const handleBookNow = async (selectedTour, tour) => {
//   const title = selectedTour.title || selectedTour.tourTitle;
//   const price = selectedTour.price || selectedTour.tourPrice;
//   console.log("✅ Final Title:", title);
//   console.log("✅ Final Price:", price);
  
//   if (!selectedTour || !selectedTour.title || !selectedTour.price) {
//     alert("❌ Invalid tour selected. Please select a valid tour.");
//     return;
//   }

//   const token = localStorage.getItem('token');
//   let userData = null;
//   let isLoggedIn = false;

//   // ✅ Fetch user details if logged in
//   if (token) {
//     try {
//       console.log("🟢 Fetching user details...");
//       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       userData = userRes.data;
//       isLoggedIn = true;
//       console.log("✅ User Data Retrieved:", userData);
//     } catch (error) {
//       console.error('🚨 Error fetching user data:', error);
//     }
//   }

//   // Show query form for BOTH logged-in and guest users
//   showQueryForm(selectedTour, userData, token, isLoggedIn);
// };

// // Function to show the query form modal
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content - compact design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 450px;
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and compact design
//   modalContent.innerHTML = `
//     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
//       </p>
//     </div>
    
//     <!-- Price Display Box - Moved to the top -->
//     <div style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
//       <p style="margin: 0; font-size: 0.9rem; color: #333;">
//         <span style="font-weight: 600;">Total Price:</span> 
//         <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
//         <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//           Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
//         </span>
//       </p>
//     </div>
    
//     <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
//       <div style="grid-column: span 2;">
//         <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryAdults" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//         <select id="queryAdults" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryChildren" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//         <select id="queryChildren" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryInfants" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//         <!-- Loading state message -->
//         <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
//           Taking you to checkout page...
//         </p>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
    
//     <script>
//       // Price calculation function - fixed to properly calculate based on travelers
//       function updateTotalPrice() {
//         const basePrice = ${selectedTour.price};
//         const adults = parseInt(document.getElementById('queryAdults').value || 1);
//         const children = parseInt(document.getElementById('queryChildren').value || 0);
        
//         // Adults pay full price, children pay half price
//         const childrenPrice = basePrice * 0.5 * children;
//         const adultsPrice = basePrice * adults;
        
//         const totalPrice = adultsPrice + childrenPrice;
        
//         document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
        
//         // Store the calculated price to use in the booking process
//         window.calculatedTotalPrice = totalPrice;
//       }
      
//       // Add event listeners to update price when selections change
//       document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//       document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
      
//       // Initialize price calculation
//       updateTotalPrice();
//     </script>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading message
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.style.opacity = '0.7';
//     proceedBtn.textContent = 'Processing...';
//     loadingMessage.style.display = 'block';
    
//     // Get values from form
//     const adults = document.getElementById('queryAdults').value;
//     const children = document.getElementById('queryChildren').value;
//     const infants = document.getElementById('queryInfants').value;
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: adults,
//       children: children,
//       infants: infants,
//       totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Short delay to show the "taking you to checkout" message
//       setTimeout(() => {
//         // Close the modal
//         document.body.removeChild(modalOverlay);
        
//         // Proceed with payment - using either existing userData (if logged in) or form data
//         // Pass the calculated total price to the payment function
//         proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//       }, 1500);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
      
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//     }
//   });
// };

// // Function to send WhatsApp message in the background
// const sendWhatsAppInBackground = (formData) => {
//   // Format message for WhatsApp
//   const message = `
// *New Tour Query*
// ------------------
// *Tour:* ${formData.tourTitle}
// *Base Price:* ₹${formData.tourPrice}
// *Total Price:* ₹${formData.calculatedPrice}

// *Customer Details*
// ------------------
// *Name:* ${formData.name}
// *Email:* ${formData.email}
// *Phone:* ${formData.phone}
// *Travel Date:* ${formData.travelDate}

// *Booking Details*
// ------------------
// *Adults:* ${formData.adults}
// *Children (5-12):* ${formData.children}
// *Infants (0-4):* ${formData.infants}
// *Total Travelers:* ${formData.totalTravelers}

// *Message:* ${formData.message || 'N/A'}
// ------------------
// Sent on: ${new Date().toLocaleString()}
//   `.trim();

//   // Use your backend API to send WhatsApp message
//   try {
//     // Option 1: Send via your own backend API
//     axios.post('http://localhost:5000/api/send-whatsapp', {
//       phone: "9541515012",
//       message: message
//     }).then(() => {
//       console.log('✅ WhatsApp notification sent successfully');
//     }).catch(error => {
//       console.error('❌ Error sending WhatsApp notification:', error);
//       // Fallback option - try alternate WhatsApp sending method
//       sendViaWhatsAppAPI(message);
//     });
//   } catch (error) {
//     console.error('❌ Error sending WhatsApp notification:', error);
//   }
// };

// // Fallback method to send WhatsApp message via third-party service if direct API fails
// const sendViaWhatsAppAPI = (message) => {
//   // You could use a third-party service API here as a backup
//   // This is a placeholder - implement according to your preferred service
//   console.log('Using fallback WhatsApp service');
  
//   // Example using a hypothetical third-party API - replace with your actual implementation
//   try {
//     fetch('https://api.whatsapp-service.com/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         apiKey: 'your-api-key',
//         phone: '9541515012',
//         message: message
//       })
//     });
//   } catch (error) {
//     console.error('❌ Fallback WhatsApp service also failed:', error);
//   }
// };

// // Function to proceed with payment (existing payment flow with price adjustment)
// const proceedWithPayment = async (selectedTour, userData, token, calculatedPrice) => {
//   const userEmail = userData?.email?.trim();
  
//   if (!userEmail) {
//     alert("❌ Email is required for booking.");
//     return;
//   }

//   console.log("✅ Final User Email:", userEmail);
//   console.log("✅ Calculated Price:", calculatedPrice);

//   const packageDetails = {
//     id: `tour-${Date.now()}`,
//     name: selectedTour.title,
//     description: `Tour package for ${selectedTour.title}`,
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => {
//         console.error("❌ Razorpay SDK failed to load");
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     try {
//       const res = await loadRazorpay();
//       if (!res) {
//         alert('❌ Razorpay SDK failed to load');
//         return;
//       }

//       // Use the calculated price instead of the base tour price
//       const finalAmount = calculatedPrice || selectedTour.price;

//       const payload = {
//         amount: finalAmount,
//         packageDetails,
//         email: userEmail,
//         name: userData?.username || 'Guest',
//         phone: userData?.phone || '',
//       };

//       console.log("Request Payload:", payload);

//       console.log("🟢 Sending Create Order API Call...");
//       const orderResponse = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         console.error("❌ Create Order API failed:", errorData);
//         alert(`Order creation failed: ${errorData.error || "Unknown error"}`);
//         return;
//       }

//       const { order } = await orderResponse.json();

//       if (!order || !order.id) {
//         console.error("❌ Invalid order response:", order);
//         alert("Order creation failed. Please try again.");
//         return;
//       }

//       console.log("✅ Order Created Successfully:", order);

//       const options = {
//         key: "rzp_live_VQS2zWKwCIE5ON",
//         amount: finalAmount * 100, // Use the calculated price
//         currency: 'INR',
//         name: "Your Travel Company",
//         description: packageDetails.description,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             console.log("🟢 Payment Successful! Sending verification request...");
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 customerDetails: { 
//                   name: userData?.username || 'Guest', 
//                   email: userEmail,
//                   phone: userData?.phone || ''
//                 }
//               }),
//             });

//             const data = await verifyResponse.json();
//             if (data.success) {
//               alert('🎉 Booking successful!');
//             } else {
//               alert('❌ Payment verification failed');
//             }
//           } catch (error) {
//             console.error("🚨 Payment verification error:", error);
//             alert('❌ Payment verification failed');
//           }
//         },
//         prefill: {
//           name: userData?.username || 'Guest',
//           email: userEmail,
//           contact: userData?.phone || ''
//         },
//         theme: { color: '#FF6B00' }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('🚨 Payment error:', error);
//       alert('❌ Payment initiation failed');
//     }
//   };

//   initiatePayment();
// };
const handleGetQuote = (tour) => {
  console.log("Get quote for:", tour);
  
  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById('quote-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'quote-modal-container';
    document.body.appendChild(modalContainer);
  }
  // Show loading state

  // Create and populate the modal content with marketing elements
  modalContainer.innerHTML = `
    <div class="quote-modal-overlay">
      <div class="quote-modal">
        <div class="quote-modal-header">
          <h2>Get Your Exclusive Quote for ${tour.title || 'This Experience'}</h2>
          <button class="quote-close-btn">&times;</button>
        </div>
        
        <div class="quote-banner">
          <div class="quote-banner-content">
            <div class="quote-banner-icon">🎁</div>
            <div class="quote-banner-text">
              <strong>Limited Time Offer!</strong> Book within 48 hours and receive a 15% early bird discount!
            </div>
          </div>
        </div>
        
        <div class="quote-modal-body">
          <div class="quote-intro">
            <p>Join thousands of satisfied travelers who have experienced this journey of a lifetime. Our expert travel advisors are ready to craft your perfect adventure.</p>
            <div class="quote-benefits">
              <div class="benefit-item"><span class="benefit-icon">✓</span> Best Price Guarantee</div>
              <div class="benefit-item"><span class="benefit-icon">✓</span> Free Cancellation</div>
              <div class="benefit-item"><span class="benefit-icon">✓</span> 24/7 Support</div>
            </div>
          </div>
          
          <form id="quote-request-form">
            <div class="form-group">
              <label for="quote-name">Full Name*</label>
              <input type="text" id="quote-name" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <label for="quote-email">Email Address*</label>
              <input type="email" id="quote-email" placeholder="your@email.com" required />
            </div>
            <div class="form-group">
              <label for="quote-phone">Phone Number*</label>
              <input type="tel" id="quote-phone" placeholder="+1 (234) 567-8900" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="quote-travelers">Number of Travelers*</label>
                <select id="quote-travelers" required>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3-5">3-5</option>
                  <option value="6-10">6-10</option>
                  <option value="10+">10+</option>
                </select>
              </div>
              <div class="form-group">
                <label for="quote-date">Travel Date*</label>
                <input type="date" id="quote-date" required />
              </div>
            </div>
            <div class="form-group">
              <label for="quote-message">Special Requirements or Customizations</label>
              <textarea id="quote-message" placeholder="Tell us about any special requirements, preferences, or questions you have about this experience"></textarea>
            </div>
            
            <div class="quote-promo">
              <div class="promo-icon">🔥</div>
              <p>Act fast! <strong>7 other travelers</strong> are looking at this tour right now.</p>
            </div>
            
            <div class="form-checkbox">
              <input type="checkbox" id="quote-newsletter" checked />
              <label for="quote-newsletter">Send me exclusive deals and offers (10% off your first booking!)</label>
            </div>
            
            <button type="submit" class="quote-submit-btn">
              <span class="btn-text">Get My Personalized Quote</span>
              <span class="btn-icon">→</span>
            </button>
          </form>
          
          <div class="quote-trust">
            <p>Trusted by over 1M+ happy travelers worldwide</p>
            <div class="trust-icons">
              <div class="trust-icon">⭐⭐⭐⭐⭐</div>
              <div class="trust-text">4.9/5 from 10,000+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add styling for the enhanced modal
  const style = document.createElement('style');
  style.textContent = `
    .quote-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .quote-modal {
      background-color: white;
      border-radius: 10px;
      width: 95%;
      max-width: 650px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.4s ease;
    }
    
    .quote-modal-header {
      padding: 22px 25px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FF6B00;
      border-radius: 10px 10px 0 0;
    }
    
    .quote-modal-header h2 {
      margin: 0;
      color: white;
      font-size: 22px;
      font-weight: 700;
    }
    
    .quote-close-btn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: white;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .quote-close-btn:hover {
      opacity: 1;
    }
    
    .quote-banner {
      background: linear-gradient(90deg, #FFF3E0, #FFECB3);
      padding: 12px 25px;
      border-bottom: 1px solid #FFE0B2;
    }
    
    .quote-banner-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .quote-banner-icon {
      font-size: 24px;
    }
    
    .quote-banner-text {
      font-size: 15px;
      color: #E65100;
    }
    
    .quote-modal-body {
      padding: 25px;
    }
    
    .quote-intro {
      margin-bottom: 25px;
    }
    
    .quote-intro p {
      margin-top: 0;
      margin-bottom: 15px;
      color: #555;
      line-height: 1.5;
    }
    
    .quote-benefits {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .benefit-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
      margin-right: 15px;
    }
    
    .benefit-icon {
      color: #FF6B00;
      font-weight: bold;
      margin-right: 5px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-row {
      display: flex;
      gap: 20px;
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 15px;
    }
    
    input, select, textarea {
      width: 100%;
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 15px;
      transition: border-color 0.3s;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #FF6B00;
      box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
    }
    
    textarea {
      height: 110px;
      resize: vertical;
    }
    
    .quote-promo {
      background-color: #FFF8E1;
      border-radius: 6px;
      padding: 12px 15px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .promo-icon {
      font-size: 20px;
    }
    
    .quote-promo p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }
    
    .form-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .form-checkbox input {
      width: auto;
    }
    
    .form-checkbox label {
      margin-bottom: 0;
      font-weight: normal;
      font-size: 14px;
      cursor: pointer;
    }
    
    .quote-submit-btn {
      background-color: #FF6B00;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 16px 24px;
      font-size: 17px;
      font-weight: 700;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
    }
    
    .quote-submit-btn:hover {
      background-color: #E55F00;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(255, 107, 0, 0.4);
    }
    
    .btn-icon {
      font-size: 18px;
      transition: transform 0.3s;
    }
    
    .quote-submit-btn:hover .btn-icon {
      transform: translateX(5px);
    }
    
    .quote-trust {
      margin-top: 25px;
      text-align: center;
      padding-top: 15px;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 14px;
    }
    
    .quote-trust p {
      margin-bottom: 10px;
    }
    
    .trust-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    
    .quote-success {
      text-align: center;
      padding: 40px 25px;
      animation: fadeIn 0.5s ease;
    }
    
    .quote-success-icon {
      background-color: #FF6B00;
      color: white;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35px;
      margin: 0 auto 25px;
      box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
    }
    
    .quote-success h3 {
      color: #333;
      margin-bottom: 15px;
      font-size: 24px;
    }
    
    .quote-success p {
      color: #555;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    
    .quote-close-success-btn {
      background-color: #FF6B00;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 14px 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
    }
    
    .quote-close-success-btn:hover {
      background-color: #E55F00;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(255, 107, 0, 0.35);
    }
    
    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 15px;
      }
      
      .quote-banner-content {
        flex-direction: column;
        text-align: center;
        gap: 8px;
      }
      
      .quote-modal-header h2 {
        font-size: 18px;
      }
      
      .quote-benefits {
        flex-direction: column;
        gap: 10px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add event listeners
  document.querySelector('.quote-close-btn').addEventListener('click', () => {
    modalContainer.remove();
  });
  
  document.getElementById('quote-request-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('quote-name').value,
      email: document.getElementById('quote-email').value,
      phone: document.getElementById('quote-phone').value,
      travelers: document.getElementById('quote-travelers').value,
      travelDate: document.getElementById('quote-date').value,
      message: document.getElementById('quote-message').value,
      newsletterSubscription: document.getElementById('quote-newsletter').checked,
      tourId: tour.id || '',
      tourName: tour.name || '',
      requestTimestamp: new Date().toISOString(),
      source: window.location.href,
      utm: getUTMParams() // Function to get UTM parameters if available
    };
    
    console.log("Quote form submitted:", formData);
    
    // Show loading state
    // const submitBtn = document.querySelector('.quote-
   const  submitBtn = document.querySelector('.quote-submit-btn');
submitBtn.innerHTML = '<span>Processing...</span>';
submitBtn.disabled = true;

// Simulate API call to submit quote request
setTimeout(() => {
  // Replace form with success message
  document.querySelector('.quote-modal-body').innerHTML = `
    <div class="quote-success">
      <div class="quote-success-icon">✓</div>
      <h3>Your Quote Request is Confirmed!</h3>
      <p>Thank you, ${formData.name}! Our travel experts will prepare your personalized quote for ${tour.name || 'this experience'} and contact you within 24 hours at ${formData.email}.</p>
      <p>Don't forget - book within 48 hours to claim your exclusive 15% early bird discount!</p>
      <button class="quote-close-success-btn">Close</button>
    </div>
  `;
  
  // Add event listener to new close button
  document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
    modalContainer.remove();
  });
  
  // Actually send the form data to server
  // sendQuoteRequestToServer(formData);
}, 1500);
});

// Function to get UTM parameters if available
function getUTMParams() {
const params = {};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
  if (urlParams.has(param)) {
    params[param] = urlParams.get(param);
  }
});

return params;
}
};
const handleBookNow1 = async (selectedTour, tour) => {
  const title = selectedTour.title || selectedTour.tourTitle;
  const price = selectedTour.price || selectedTour.tourPrice;
  console.log("✅ Final Title:", title);
  console.log("✅ Final Price:", price);
  
  if (!selectedTour || !selectedTour.title || !selectedTour.price) {
    alert("❌ Invalid tour selected. Please select a valid tour.");
    return;
  }

  const token = localStorage.getItem('token');
  let userData = null;
  let isLoggedIn = false;

  // ✅ Fetch user details if logged in
  if (token) {
    try {
      console.log("🟢 Fetching user details...");
      const userRes = await axios.get('https://backend-1-7zwm.onrender.com/api/auth/me', {
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
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content - compact design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 450px;
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and compact design
//   modalContent.innerHTML = `
//     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
//       </p>
//     </div>
    
//     <!-- Price Display Box - Moved to the top -->
//     <div style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
//       <p style="margin: 0; font-size: 0.9rem; color: #333;">
//         <span style="font-weight: 600;">Total Price:</span> 
//         <span id="totalPriceDisplay" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
//         <span style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//           Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
//         </span>
//       </p>
//     </div>
    
//     <form id="tourQueryForm" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
//       <div style="grid-column: span 2;">
//         <label for="queryName" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryEmail" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryPhone" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryTravelDate" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div>
//         <label for="queryAdults" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//         <select id="queryAdults" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryChildren" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//         <select id="queryChildren" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
      
//       <div>
//         <label for="queryInfants" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 2;">
//         <label for="queryMessage" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//         <!-- Loading state message -->
//         <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
//           Taking you to checkout page...
//         </p>
//       </div>
      
//       <div style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Price calculation function
//   const updateTotalPrice = () => {
//     const basePrice = selectedTour.price;
//     const adults = parseInt(document.getElementById('queryAdults').value || 1);
//     const children = parseInt(document.getElementById('queryChildren').value || 0);
    
//     // Adults pay full price, children pay half price
//     const childrenPrice = basePrice * 0.5 * children;
//     const adultsPrice = basePrice * adults;
    
//     const totalPrice = adultsPrice + childrenPrice;
    
//     document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
    
//     // Store the calculated price to use in the booking process
//     window.calculatedTotalPrice = totalPrice;
    
//     console.log("Price Updated:", totalPrice);
//   };

//   // Important: Add event listeners AFTER the modal is added to the DOM
//   document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//   document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
//   // Initialize price calculation
//   updateTotalPrice();

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading message
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.style.opacity = '0.7';
//     proceedBtn.textContent = 'Processing...';
//     loadingMessage.style.display = 'block';
    
//     // Get values from form
//     const adults = document.getElementById('queryAdults').value;
//     const children = document.getElementById('queryChildren').value;
//     const infants = document.getElementById('queryInfants').value;
    
//     // Make sure to get the most up-to-date calculated price
//     updateTotalPrice();
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: adults,
//       children: children,
//       infants: infants,
//       totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Short delay to show the "taking you to checkout" message
//       setTimeout(() => {
//         // Close the modal
//         document.body.removeChild(modalOverlay);
        
//         // Proceed with payment - using either existing userData (if logged in) or form data
//         // Pass the calculated total price to the payment function
//         proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//       }, 1500);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
      
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//     }
//   });
// };
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//   // Create modal container
//   const modalOverlay = document.createElement('div');
//   modalOverlay.className = 'query-form-overlay';
//   modalOverlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   // Create modal content with responsive design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 8px;
//     padding: 25px;
//     width: 90%;
//     max-width: 650px; /* Increased for desktop */
//     max-height: 85vh;
//     overflow-y: auto;
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and responsive design
//   modalContent.innerHTML = `
//     <style>
//       /* Responsive CSS */
//       @media (min-width: 768px) {
//         .form-grid {
//           grid-template-columns: 1fr 1fr 1fr !important;
//         }
//         .modal-header {
//           margin-bottom: 15px !important;
//         }
//         .title-text {
//           font-size: 1.6rem !important;
//         }
//         .promo-box {
//           padding: 15px !important;
//           margin-bottom: 20px !important;
//         }
//         .promo-text {
//           font-size: 1rem !important;
//         }
//         .price-box {
//           margin-bottom: 20px !important;
//           padding: 15px !important;
//         }
//         .price-amount {
//           font-size: 1.4rem !important;
//         }
//         .price-details {
//           font-size: 0.85rem !important;
//         }
//         .form-input {
//           padding: 10px !important;
//           font-size: 1rem !important;
//         }
//         .form-label {
//           font-size: 0.9rem !important;
//           margin-bottom: 5px !important;
//         }
//         .submit-btn {
//           width: 60% !important;
//           padding: 12px 0 !important;
//         }
//         .full-span {
//           grid-column: span 3 !important;
//         }
//         .half-span {
//           grid-column: span 1 !important;
//         }
//       }
//     </style>

//     <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//       <h2 class="title-text" style="margin: 0; color: #FF6B00; font-size: 1.4rem; font-weight: 600;">Almost There! 🎯</h2>
//       <button id="closeQueryForm" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
//     </div>
    
//     <div class="promo-box" style="background: linear-gradient(to right, #FFF3E0, #FFE0B2); padding: 12px; border-radius: 6px; margin-bottom: 15px;">
//       <p class="promo-text" style="margin: 0; color: #E65100; font-weight: 500; font-size: 0.9rem;">
//         <span style="font-size: 1.1rem;">🏆</span> Just one step away from an unforgettable adventure at ${selectedTour.title}!
//       </p>
//     </div>
    
//     <!-- Price Display Box - Moved to the top -->
//     <div class="price-box" style="margin: 0 0 15px; background-color: #F5F5F5; padding: 12px; border-radius: 6px; text-align: center;">
//       <p style="margin: 0; font-size: 0.9rem; color: #333;">
//         <span style="font-weight: 600;">Total Price:</span> 
//         <span id="totalPriceDisplay" class="price-amount" style="color: #FF6B00; font-weight: 700; font-size: 1.2rem;">₹${selectedTour.price}</span>
//         <span class="price-details" style="font-size: 0.75rem; color: #666; display: block; margin-top: 3px;">
//           Base price: ₹${selectedTour.price} per adult | Children (5-12): 50% off | Under 5: Free
//         </span>
//       </p>
//     </div>
    
//     <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 12px;">
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryName" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="half-span">
//         <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//       </div>
      
//       <div class="half-span">
//         <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Adults*</label>
//         <select id="queryAdults" required class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//         </select>
//       </div>
      
//       <div class="half-span">
//         <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Children (5-12 yrs)</label>
//         <select id="queryChildren" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
      
//       <div class="half-span">
//         <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem;">
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 3px; font-weight: 500; font-size: 0.85rem; color: #555;">Special Requirements</label>
//         <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; resize: none;"></textarea>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; margin: 5px 0 10px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 8px; margin-top: 2px;">
//           <span style="font-size: 0.8rem; color: #666;">I agree to receive updates via WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 5px;">
//         <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 10px 0; width: 80%; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(255, 107, 0, 0.3); transition: all 0.3s;">
//           Send Query & Continue to Booking
//         </button>
//         <!-- Loading state message -->
//         <p id="loadingMessage" style="display: none; margin-top: 8px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">
//           Taking you to checkout page...
//         </p>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 8px;">
//         <p style="font-size: 0.75rem; color: #888; margin: 0;">
//           <span style="color: #FF6B00; font-weight: 600;">⚡ Limited Time Offer:</span> Book today for best prices!
//         </p>
//       </div>
//     </form>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     document.body.removeChild(modalOverlay);
//   });

//   // Price calculation function
//   const updateTotalPrice = () => {
//     const basePrice = selectedTour.price;
//     const adults = parseInt(document.getElementById('queryAdults').value || 1);
//     const children = parseInt(document.getElementById('queryChildren').value || 0);
    
//     // Adults pay full price, children pay half price
//     const childrenPrice = basePrice * 0.5 * children;
//     const adultsPrice = basePrice * adults;
    
//     const totalPrice = adultsPrice + childrenPrice;
    
//     document.getElementById('totalPriceDisplay').textContent = '₹' + totalPrice.toLocaleString();
    
//     // Store the calculated price to use in the booking process
//     window.calculatedTotalPrice = totalPrice;
    
//     console.log("Price Updated:", totalPrice);
//   };

//   // Important: Add event listeners AFTER the modal is added to the DOM
//   document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//   document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
//   // Initialize price calculation
//   updateTotalPrice();

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading message
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.style.opacity = '0.7';
//     proceedBtn.textContent = 'Processing...';
//     loadingMessage.style.display = 'block';
    
//     // Get values from form
//     const adults = document.getElementById('queryAdults').value;
//     const children = document.getElementById('queryChildren').value;
//     const infants = document.getElementById('queryInfants').value;
    
//     // Make sure to get the most up-to-date calculated price
//     updateTotalPrice();
    
//     const formData = {
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: adults,
//       children: children,
//       infants: infants,
//       totalTravelers: parseInt(adults) + parseInt(children) + parseInt(infants),
//       message: document.getElementById('queryMessage').value,
//       tourTitle: selectedTour.title,
//       tourPrice: selectedTour.price,
//       calculatedPrice: window.calculatedTotalPrice || selectedTour.price,
//       termsAccepted: document.getElementById('queryTerms').checked
//     };

//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || !formData.travelDate || !formData.termsAccepted) {
//       alert('Please fill in all required fields');
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//       return;
//     }

//     try {
//       // 1. Send to backend API
//       try {
//         await axios.post('http://localhost:5000/api/tour-queries', formData);
//         console.log('✅ Query saved to database');
//       } catch (error) {
//         console.error('❌ Error saving query:', error);
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Short delay to show the "taking you to checkout" message
//       setTimeout(() => {
//         // Close the modal
//         document.body.removeChild(modalOverlay);
        
//         // Proceed with payment - using either existing userData (if logged in) or form data
//         // Pass the calculated total price to the payment function
//         proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//       }, 1500);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
//       alert('Failed to submit query. Please try again.');
      
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Send Query & Continue to Booking';
//       loadingMessage.style.display = 'none';
//     }
//   });
// };
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  `;

  // Create modal content with responsive design
  const modalContent = document.createElement('div');
  modalContent.className = 'query-form-content';
  modalContent.style.cssText = `
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    width: 92%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  `;

  // Pre-fill form data if user is logged in
  const name = userData?.username || '';
  const email = userData?.email || '';
  const phone = userData?.phone || '';

  // Form with marketing text and responsive design
  modalContent.innerHTML = `
    <style>
      /* Custom Styles */
      .query-form-content {
        scrollbar-width: thin;
        scrollbar-color: #ddd #f5f5f5;
      }
      .query-form-content::-webkit-scrollbar {
        width: 6px;
      }
      .query-form-content::-webkit-scrollbar-track {
        background: #f5f5f5;
        border-radius: 10px;
      }
      .query-form-content::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 10px;
      }
      
      /* Animation for price */
      @keyframes pricePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      .price-animation {
        animation: pricePulse 2s ease-in-out;
      }
      
      /* Focus states */
      .form-input:focus {
        border-color: #FF6B00 !important;
        box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1) !important;
        outline: none !important;
      }
      
      /* Hover states */
      .submit-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 8px rgba(255, 107, 0, 0.4) !important;
      }
      
      /* Responsive CSS */
      @media (min-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr 1fr 1fr !important;
        }
        .title-text {
          font-size: 1.7rem !important;
        }
        .subtitle-text {
          font-size: 1rem !important;
        }
        .price-summary {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 15px !important;
        }
        .price-total {
          font-size: 1.5rem !important;
        }
        .form-label {
          font-size: 0.9rem !important;
        }
        .form-input {
          padding: 12px !important;
          font-size: 1rem !important;
        }
      }
    </style>

    <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
      <div>
        <h2 class="title-text" style="margin: 0 0 5px 0; color: #333; font-size: 1.5rem; font-weight: 600;">Book Your Experience</h2>
        <p class="subtitle-text" style="margin: 0; color: #FF6B00; font-size: 0.9rem; font-weight: 500;">${selectedTour.title}</p>
      </div>
      <button id="closeQueryForm" style="background: none; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: all 0.2s;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <!-- Price Summary Box - Enhanced and More Detailed -->
    <div class="price-summary-container" style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #FF6B00, #FF9800); padding: 15px; color: white;">
        <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Price Summary</h3>
        <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Transparent pricing with no hidden fees</p>
      </div>
      
      <div style="background: #fff; padding: 20px; border: 1px solid #f0f0f0; border-top: none;">
        <div class="price-summary" style="display: block; margin-bottom: 15px;">
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.9rem; color: #555;">Base Price (per adult)</span>
              <span style="font-weight: 500; color: #333;">₹${selectedTour.price}</span>
            </div>
            <div id="adultPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: #666;">Adults: <span id="adultCountDisplay">1</span></span>
              <span style="font-weight: 500; color: #333;">₹<span id="adultPriceDisplay">${selectedTour.price}</span></span>
            </div>
            <div id="childPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: #666;">Children: <span id="childCountDisplay">0</span> (50% off)</span>
              <span style="font-weight: 500; color: #333;">₹<span id="childPriceDisplay">0</span></span>
            </div>
          </div>
          
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.9rem; color: #555;">Additional</span>
              <span style="font-weight: 500; color: #333;">₹0</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: #666;">Taxes & Fees</span>
              <span style="font-weight: 500; color: #333;">Included</span>
            </div>
          </div>
        </div>
        
        <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
          <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
        </div>
        
        <div style="margin-top: 12px; padding: 8px 12px; background: #FFF9F5; border-radius: 6px; border-left: 3px solid #FF6B00;">
          <p style="margin: 0; font-size: 0.8rem; color: #333;">
            <span style="color: #FF6B00; font-weight: 600;">✓</span> Best price guarantee
            <span style="color: #FF6B00; font-weight: 600; margin-left: 10px;">✓</span> Free cancellation up to 24 hours before
          </p>
        </div>
      </div>
    </div>
    
    <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 16px;">
      <div class="full-span" style="grid-column: span 2;">
        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Personal Information</h3>
      </div>
      
      <div class="full-span" style="grid-column: span 2;">
        <label for="queryName" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Full Name*</label>
        <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Email Address*</label>
        <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Phone Number*</label>
        <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
      </div>
      
      <div class="full-span" style="grid-column: span 2; margin-top: 10px;">
        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Travel Details</h3>
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Travel Date*</label>
        <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Adults (13+ yrs)*</label>
        <select id="queryAdults" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          <option value="1">1 Adult</option>
          <option value="2">2 Adults</option>
          <option value="3">3 Adults</option>
          <option value="4">4 Adults</option>
          <option value="5">5 Adults</option>
          <option value="6">6 Adults</option>
          <option value="7">7 Adults</option>
          <option value="8">8 Adults</option>
        </select>
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Children (5-12 yrs)</label>
        <select id="queryChildren" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          <option value="0">0 Children</option>
          <option value="1">1 Child</option>
          <option value="2">2 Children</option>
          <option value="3">3 Children</option>
          <option value="4">4 Children</option>
          <option value="5">5 Children</option>
        </select>
      </div>
      
      <div style="grid-column: span 1;">
        <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Infants (0-4 yrs)</label>
        <select id="queryInfants" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
          <option value="0">0 Infants</option>
          <option value="1">1 Infant</option>
          <option value="2">2 Infants</option>
          <option value="3">3 Infants</option>
        </select>
      </div>
      
      <div class="full-span" style="grid-column: span 2;">
        <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Special Requirements or Questions</label>
        <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; resize: none;" placeholder="Dietary requirements, accessibility needs, or any questions..."></textarea>
      </div>
      
      <div class="full-span" style="grid-column: span 2; margin: 8px 0 12px;">
        <label style="display: flex; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" id="queryTerms" required style="margin-right: 10px; margin-top: 3px; min-width: 16px; height: 16px; accent-color: #FF6B00;">
          <span style="font-size: 0.85rem; color: #555;">I agree to receive updates via email and WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none; font-weight: 500;">Terms & Conditions</a>*</span>
        </label>
      </div>
      
      <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 10px;">
        <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 12px 0; width: 70%; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 3px 6px rgba(255, 107, 0, 0.3); transition: all 0.3s ease;">
          Continue to Secure Checkout
        </button>
        
        <!-- Loading state message -->
        <div id="loadingMessage" style="display: none; margin-top: 15px;">
          <div style="display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
              <style>
                @keyframes rotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              </style>
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            <span style="margin-left: 10px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">Processing your booking...</span>
          </div>
        </div>
      </div>
      
      <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 16px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span style="font-size: 0.8rem; color: #555;">Secure Payment</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span style="font-size: 0.8rem; color: #555;">100% Safe</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span style="font-size: 0.8rem; color: #555;">24/7 Support</span>
          </div>
        </div>
      </div>
    </form>
  `;

  // Append modal to body
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Close modal functionality with improved animation
  document.getElementById('closeQueryForm').addEventListener('click', () => {
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.transition = 'transform 0.2s ease';
    modalOverlay.style.transition = 'opacity 0.2s ease';
    
    setTimeout(() => {
      document.body.removeChild(modalOverlay);
    }, 200);
  });

  // Enhanced price calculation function with animations
  const updateTotalPrice = () => {
    const basePrice = selectedTour.price;
    const adults = parseInt(document.getElementById('queryAdults').value || 1);
    const children = parseInt(document.getElementById('queryChildren').value || 0);
    
    // Update display counts
    document.getElementById('adultCountDisplay').textContent = adults;
    document.getElementById('childCountDisplay').textContent = children;
    
    // Adults pay full price, children pay half price
    const childrenPrice = basePrice * 0.5 * children;
    const adultsPrice = basePrice * adults;
    
    // Update price displays with formatting
    document.getElementById('adultPriceDisplay').textContent = (adultsPrice).toLocaleString();
    document.getElementById('childPriceDisplay').textContent = (childrenPrice).toLocaleString();
    
    const totalPrice = adultsPrice + childrenPrice;
    
    // Apply animation by removing and re-adding the class
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    totalPriceElement.classList.remove('price-animation');
    
    // Trigger reflow to restart animation
    void totalPriceElement.offsetWidth;
    
    totalPriceElement.textContent = '₹' + totalPrice.toLocaleString();
    totalPriceElement.classList.add('price-animation');
    
    // Store the calculated price to use in the booking process
    window.calculatedTotalPrice = totalPrice;
  };

  // Add event listeners for price updates
  document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
  document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
  // Initialize price calculation
  updateTotalPrice();

  // Set minimum date for travel date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  document.getElementById('queryTravelDate').setAttribute('min', tomorrowFormatted);

  // Form submission handler with improved UX feedback
  document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const proceedBtn = document.getElementById('proceedBtn');
    const loadingMessage = document.getElementById('loadingMessage');
    proceedBtn.disabled = true;
    proceedBtn.style.opacity = '0.7';
    proceedBtn.style.transform = 'none';
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

    // Enhanced form validation with field-specific feedback
    let isValid = true;
    let errorFields = [];
    
    // Basic form validation
    if (!formData.name) {
      isValid = false;
      errorFields.push('Full Name');
      document.getElementById('queryName').style.borderColor = '#ff4d4f';
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      errorFields.push('Email Address');
      document.getElementById('queryEmail').style.borderColor = '#ff4d4f';
    }
    
    if (!formData.phone) {
      isValid = false;
      errorFields.push('Phone Number');
      document.getElementById('queryPhone').style.borderColor = '#ff4d4f';
    }
    
    if (!formData.travelDate) {
      isValid = false;
      errorFields.push('Travel Date');
      document.getElementById('queryTravelDate').style.borderColor = '#ff4d4f';
    }
    
    if (!formData.termsAccepted) {
      isValid = false;
      errorFields.push('Terms & Conditions');
      document.getElementById('queryTerms').parentNode.style.color = '#ff4d4f';
    }
    
    if (!isValid) {
      // Alert with specific fields that need attention
      alert(`Please fill in all required fields: ${errorFields.join(', ')}`);
      
      // Reset button state
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = '1';
      proceedBtn.textContent = 'Continue to Secure Checkout';
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
        // Continue with the booking process even if the query saving fails
      }

      // 2. Send to WhatsApp in the background
      sendWhatsAppInBackground(formData);
      
      // Create/update userData object with form data
      const updatedUserData = {
        username: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      
      // Add a slightly longer delay for better UX
      setTimeout(() => {
        // Close the modal with animation
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.transition = 'transform 0.3s ease';
        modalOverlay.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          document.body.removeChild(modalOverlay);
          
          // Proceed with payment - using either existing userData (if logged in) or form data
          proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
        }, 300);
      }, 1800);
      
    } catch (error) {
      console.error('🚨 Error processing query:', error);
      
      // Show error message with retry option
      loadingMessage.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; color: #ff4d4f; margin-top: 10px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          // <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
<span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
    </div>
  `;
  
  // Reset button state
  proceedBtn.disabled = false;
  proceedBtn.style.opacity = '1';
  proceedBtn.textContent = 'Continue to Secure Checkout';
}
});

// Function to send WhatsApp notification in the background
const sendWhatsAppInBackground = (formData) => {
try {
  // Format the WhatsApp message
  const message = `*New Booking Request*\n\n*Tour:* ${formData.tourTitle}\n*Date:* ${formData.travelDate}\n*Guests:* ${formData.adults} Adults, ${formData.children} Children, ${formData.infants} Infants\n*Total:* ₹${formData.calculatedPrice}\n\n*From:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\n*Message:* ${formData.message || 'None'}`;
  
  // Send to WhatsApp API
  const adminNumber = '+919876543210'; // Replace with actual admin number
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`;
  
  // Use fetch with no-cors mode to avoid CORS issues
  fetch(whatsappLink, { mode: 'no-cors' })
    .then(() => console.log('✅ WhatsApp notification sent'))
    .catch(error => console.error('⚠️ WhatsApp notification error:', error));
  
} catch (error) {
  console.error('❌ Error sending WhatsApp notification:', error);
  // Fail silently - this should not interrupt the booking process
}
};
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
      const orderResponse = await fetch('https://backend-1-7zwm.onrender.com/api/create-order', {
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
        name: "Kashmir Travels",
        description: packageDetails.description,
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log("🟢 Payment Successful! Sending verification request...");
            const verifyResponse = await fetch('https://backend-1-7zwm.onrender.com/api/verify-payment', {
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
              // alert('🎉 Booking successful!');
              showSuccessModal(selectedTour, calculatedPrice, userData);
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
const showSuccessModal = (selectedTour, totalPrice, userData) => {
  // Create modal container
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'success-modal-overlay';
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
    animation: fadeIn 0.3s ease-out;
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'success-modal-content';
  modalContent.style.cssText = `
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    animation: scaleIn 0.3s ease-out;
  `;

  // Add some CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
    .success-checkmark {
      animation: bounce 1s ease;
    }
  `;
  document.head.appendChild(style);

  // Format the success message
  modalContent.innerHTML = `
    <div class="success-checkmark" style="font-size: 4rem; color: #4CAF50; margin-bottom: 10px;">✓</div>
    <h2 style="margin: 0 0 15px; color: #333; font-size: 1.5rem;">Booking Successful!</h2>
    
    <div style="background-color: #F5F5F5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px; color: #3399cc; font-size: 1.2rem;">${selectedTour.title || destination.title}</h3>
      <p style="margin: 0; font-size: 0.9rem; color: #666;">
        <strong>Total Amount:</strong> ₹${totalPrice.toLocaleString()}
      </p>
    </div>
    
    <p style="margin: 0 0 15px; color: #555; font-size: 0.95rem;">
      A confirmation email has been sent to <strong>${userData?.email || 'your email'}</strong>.<br>
      You will also receive a WhatsApp update shortly.
    </p>
    
    <div style="background: linear-gradient(to right, #E3F2FD, #BBDEFB); padding: 12px; border-radius: 6px; margin-bottom: 20px; text-align: left;">
      <p style="margin: 0; color: #0D47A1; font-size: 0.9rem;">
        <strong>What's Next?</strong><br>
        Our team will contact you within 24 hours to confirm your booking details and answer any questions.
      </p>
    </div>
    
    <button id="closeSuccessModal" style="background: linear-gradient(to right, #3399cc, #64B5F6); color: white; border: none; padding: 10px 25px; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(51, 153, 204, 0.3); transition: all 0.3s;">
      Awesome!
    </button>
    
    <p style="margin: 15px 0 0; font-size: 0.8rem; color: #888;">
      Questions? Contact our support team at <a href="tel:+919541515012" style="color: #3399cc; text-decoration: none;">+91 9541515012</a>
    </p>
  `;

  // Append modal to body
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Close modal functionality
  document.getElementById('closeSuccessModal').addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    // Optional: Redirect to homepage or booking history page
    // window.location.href = '/my-bookings';
  });

  // Auto-close after 10 seconds
  setTimeout(() => {
    if (document.body.contains(modalOverlay)) {
      document.body.removeChild(modalOverlay);
    }
  }, 10000);
};
const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={` hidden rounded-full px-4 py-2 text-sm transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

const SortButton = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`  flex items-center  space-x-2 rounded-lg px-4 py-2 transition-all duration-300 ${
      active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);


const TourModal = ({ tour, isOpen, onClose, selectedTour, handleBookNow }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!tour || !isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image Section - Reduced height */}
          <div className="md:w-2/5 relative h-52 md:h-auto">
            <img
                src={`https://backend-1-7zwm.onrender.com${tour.image}`}
              // src={tour.image || "http://localhost:5000/uploads/placeholder.jpg"}
              alt={tour.title}
              className="h-full w-full object-cover md:rounded-l-lg"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-800 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 right-3 flex space-x-1.5">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="rounded-full bg-white/90 p-1.5 hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button className="rounded-full bg-white/90 p-1.5 hover:bg-white">
                <Share2 className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{tour.title}</h2>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-xs text-gray-500">({tour.reviews})</span>
              </div>
            </div>

            {/* Location and Price */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-1 h-4 w-4 text-orange-500" />
                <span>{tour.location}</span>
              </div>
              <div className="text-lg font-bold text-orange-500">
                ${tour.price}
                <span className="text-xs text-gray-500">/person</span>
              </div>
            </div>

            {/* Tour Details Row */}
            <div className="mt-3 flex space-x-4 text-xs text-gray-600 border-y border-gray-100 py-2">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
                {tour.duration} Days
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
                Max {tour.groupSize}
              </div>
              <div className="flex items-center">
                <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
                English
              </div>
            </div>

            {/* Simplified Tabs - Horizontal Pills */}
            <div className="mt-3">
              <div className="flex space-x-2 overflow-x-auto pb-1 text-sm">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-full whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-3 py-1 rounded-full whitespace-nowrap ${
                    activeTab === 'itinerary'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('included')}
                  className={`px-3 py-1 rounded-full whitespace-nowrap ${
                    activeTab === 'included'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  What's Included
                </button>
              </div>

              {/* Tab Content - Scrollable container */}
              <div className="mt-3 overflow-y-auto max-h-56">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{tour.description}</p>
                    
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-gray-800">Tour Highlights</h3>
                      <ul className="mt-1 space-y-1">
                        {tour.highlights?.map((highlight, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-600">
                            <span className="mr-1.5 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                              <Check className="h-2 w-2" />
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-3">
                    {tour.itinerary?.map((day, index) => (
                      <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                        <h3 className="text-sm font-semibold text-gray-800">Day {index + 1}</h3>
                        <p className="mt-1 text-xs text-gray-600">{day}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'included' && (
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Included</h3>
                      <ul className="mt-1 space-y-1">
                        {tour.included?.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-600">
                            <Check className="mr-1.5 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Not Included</h3>
                      <ul className="mt-1 space-y-1">
                        {tour.notIncluded?.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-600">
                            <X className="mr-1.5 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            {/* <div className="mt-4">
              <button 
                onClick={() => handleBookNow(tour)} 
                className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
              >
                Book Now
              </button>
            </div> */}
            <div className="mt-4 flex gap-x-4">
  {/* Book Now Button */}
  <button 
    onClick={() => handleBookNow1(tour)} 
    className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
  >
    Book Now
  </button>

  {/* Get Quote Button (Outlined) */}
  <button 
    onClick={() => handleGetQuote(tour)} 
    className="w-1/2 rounded-lg border border-orange-500 text-orange-500 py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white"
  >
    Get Quote
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

// const TourCard = ({ tour, onClick }) => (
//   <div 
//     onClick={onClick}
//     className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
//   >
//      <div className="relative h-64  overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//       <img
//         src={tour.image}
//         alt="Tour destination"
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//       />
     
  
// <div/> 


    

//       <div className="absolute bottom-4 left-4 right-4">
//         <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
//           Featured
//         </span>
//         <h3 className="mt-2 text-xl font-bold text-white">{tour.title}</h3>
//       </div>
//     </div>

//     <div className="p-4">
//       <div className="flex items-center space-x-4 text-sm text-gray-600">
//         <div className="flex items-center">
//         {/* <h3 className=" text-xl font-bold text-black">{tour.title}</h3> */}
//           <Calendar className="mr-1 h-4 w-4" />
//           {tour.duration} 
//         </div>
//         {/* <h3 className=" text-xl font-bold text-black">{tour.title}</h3> */}
//         {/* <div className="flex items-center">
//           <Users className="mr-1 h-4 w-4" />
//           {tour.groupSize} People
//         </div> */}
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-4 w-4" />
//           {tour.location}
//         </div>
//       </div>

//       <p className="mt-3 line-clamp-2 text-sm text-gray-600">
//         {tour.description}
//       </p>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex items-center space-x-1">
//           <Star className="h-5 w-5 fill-current text-yellow-400" />
//           <span className="font-semibold">{tour.rating}</span>
//           <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
//         </div>
//         <div className="flex items-center">
//           <DollarSign className="h-5 w-5 text-green-600" />
//           <span className="text-xl font-bold text-green-600">{tour.price}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// const TourCard = ({ tour, onClick }) => (
//   <div
//     onClick={onClick}
//     className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//   >
//     {/* Image Container with Gradient Overlay */}
//     <div className="relative h-60 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
//       <img
//         src={tour.image}
//         alt={tour.title}
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
      
//       {/* Badge and Title Overlay */}
//       <div className="absolute bottom-3 left-3 right-3 z-20">
//         <div className="flex items-center space-x-2">
//           <span className="inline-block rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
//             Featured
//           </span>
//           {tour.trending && (
//             <span className="inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
//               Trending
//             </span>
//           )}
//         </div>
//         <h3 className="mt-1 text-lg font-bold text-white drop-shadow-md">
//           {tour.title}
//         </h3>
//       </div>
//     </div>
    
//     {/* Content Section */}
//     <div className="p-4">
//       {/* Tour Details */}
//       <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
//         <div className="flex items-center">
//           <Calendar className="mr-1 h-4 w-4 text-orange-500" />
//           <span>{tour.duration}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-4 w-4 text-orange-500" />
//           <span>{tour.location}</span>
//         </div>
//         {tour.startingPoint && (
//           <div className="flex items-center text-xs">
//             <span className="font-medium">Starting Point:</span>
//             <span className="ml-1">{tour.startingPoint}</span>
//           </div>
//         )}
//       </div>
      
//       {/* Description */}
//       <p className="mt-3 line-clamp-2 text-sm text-gray-600">
//          {tour.title}
//        </p>
//       <p className="mt-3 line-clamp-2 text-sm text-gray-600">
//          {tour.description}
//        </p>
//       {/* Rating and Price Section */}
//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex items-center space-x-1">
//           <Star className="h-4 w-4 fill-current text-yellow-400" />
//           <span className="font-semibold">{tour.rating}</span>
//           <span className="text-xs text-gray-500">({tour.reviews})</span>
//         </div>
        
//         <div className="flex flex-col items-end">
//           {tour.originalPrice && (
//             <span className="text-xs text-gray-500 line-through">
//               ${tour.originalPrice}
//             </span>
            

//            )}
//           <div className="flex items-center">
//             <DollarSign className="h-4 w-4 text-orange-500" />
//             <span className="text-lg font-bold text-orange-500">
//               {tour.price}
//             </span>
//           </div>
//         </div>
//       </div>
      
//       {/* Book Now Button */}
//       <button className="mt-3 w-full rounded bg-orange-500 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600">
//         Book Now
//       </button>
//     </div>
//   </div>
// )

// const TourCard = ({ tour, onClick }) => (
//   <div
//     onClick={onClick}
//     className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//   >
//     {/* Image Container with Enhanced Gradient Overlay */}
//     <div className="relative h-64 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
//       <img
//         src={tour.image}
//         alt={tour.title}
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
      
//       {/* Marketing Banner */}
//       {tour.discount && (
//         <div className="absolute top-4 right-0 bg-red-500 text-white font-bold py-1 px-4 text-sm shadow-md z-20 before:absolute before:top-0 before:-left-3 before:border-t-8 before:border-r-8 before:border-t-transparent before:border-r-red-500">
//           Save {tour.discount}%
//         </div>
//       )}
      
//       {/* Limited Time Offer */}
//       {tour.limitedOffer && (
//         <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse z-20">
//           Limited Time
//         </div>
//       )}

//       {/* Badge and Title Overlay - Repositioned */}
//       <div className="absolute bottom-4 left-4 right-4 z-20">
//         <div className="flex items-center space-x-2">
//           <span className="inline-block rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
//             Featured
//           </span>
//           {tour.trending && (
//             <span className="inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
//               Trending
//             </span>
//           )}
//         </div>
//         <h3 className="mt-2 text-xl font-bold text-white drop-shadow-md tracking-wide">
//           {tour.title}
//         </h3>
//       </div>
//     </div>
    
//     {/* Content Section */}
//     <div className="p-5">
//       {/* Marketing Tagline */}
//       <div className="mb-3 border-l-4 border-orange-500 pl-2 italic text-gray-600 text-sm">
//         Experience the journey of a lifetime
//       </div>
      
//       {/* Tour Details - Refined Layout */}
//       <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
//         <div className="flex items-center">
//           <Calendar className="mr-1 h-4 w-4 text-orange-500" />
//           <span>{tour.duration}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-4 w-4 text-orange-500" />
//           <span>{tour.location}</span>
//         </div>
//         {tour.startingPoint && (
//           <div className="flex items-center text-xs col-span-2">
//             <span className="font-medium">Starting Point:</span>
//             <span className="ml-1">{tour.startingPoint}</span>
//           </div>
//         )}
//       </div>
      
//       {/* Description with better spacing */}
//       <p className="line-clamp-2 text-sm text-gray-600 mb-4">
//         {tour.description}
//       </p>
      
//       {/* Rating and Price Section - Improved alignment */}
//       <div className="flex items-center justify-between mt-auto">
//         <div className="flex items-center space-x-1">
//           <Star className="h-4 w-4 fill-current text-yellow-400" />
//           <span className="font-semibold">{tour.rating}</span>
//           <span className="text-xs text-gray-500">({tour.reviews} reviews)</span>
//         </div>
        
//         <div className="flex flex-col items-end">
//           {tour.originalPrice && (
//             <span className="text-xs text-gray-500 line-through">
//               ${tour.originalPrice}
//             </span>
//           )}
//           <div className="flex items-center">
//             <span className="text-lg font-bold text-orange-500">
//               ${tour.price}
//             </span>
//             <span className="text-xs text-gray-500 ml-1">per person</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Book Now Button - Enhanced */}
//       <button className="mt-4 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 shadow-md flex items-center justify-center">
//         <span>Book Now</span>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//       </button>
      
//       {/* Added trust indicators */}
//       <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//         </svg>
//         <span>Secure booking · Flexible cancellation</span>
//       </div>
//     </div>
//   </div>
// )
// const TourCard = ({ tour, onClick }) => (
//   <div
//     onClick={onClick}
//     className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//   >
//     {/* Image Container */}
//     <div className="relative h-56 overflow-hidden">
//       <img
//         src={tour.image}
//         alt={tour.title}
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
      
//       {/* Badges Overlay */}
//       <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
//         <span className="inline-block rounded-full bg-orange-500/90 px-2 py-1 text-xs font-bold text-white shadow-sm">
//           Featured
//         </span>
//         {tour.trending && (
//           <span className="inline-block rounded-full bg-blue-500/90 px-2 py-1 text-xs font-bold text-white shadow-sm">
//             Trending
//           </span>
//         )}
//       </div>
      
//       {/* Discount Tag */}
//       {tour.discount && (
//         <div className="absolute top-3 right-3 bg-white text-orange-600 font-bold py-1 px-3 text-xs rounded-full shadow-md z-20">
//           {tour.discount}% OFF
//         </div>
//       )}
//     </div>
    
//     {/* Content Section */}
//     <div className="p-4">
//       {/* Title - Outside Image */}
//       <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-orange-100 pb-2">
//         {tour.title}
//       </h3>
      
//       {/* Tour Details */}
//       <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
//         <div className="flex items-center">
//           <Calendar className="mr-1 h-4 w-4 text-orange-400" />
//           <span>{tour.duration}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-4 w-4 text-orange-400" />
//           <span>{tour.location}</span>
//         </div>
//         {tour.startingPoint && (
//           <div className="flex items-center text-xs w-full mt-1">
//             <span className="font-medium text-gray-700">Starting Point:</span>
//             <span className="ml-1 text-gray-600">{tour.startingPoint}</span>
//           </div>
//         )}
//       </div>
      
//       {/* Description */}
//       <p className="line-clamp-2 text-sm text-gray-600 mb-4">
//         {tour.description}
//       </p>
      
//       {/* Rating and Price Section - Improved formatting */}
//       <div className="flex items-center justify-between mt-auto">
//         <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
//           <Star className="h-4 w-4 fill-current text-yellow-400" />
//           <span className="font-semibold ml-1">{tour.rating}</span>
//           <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
//         </div>
        
//         <div className="flex items-end">
//           {tour.originalPrice && (
//             <div className="flex flex-col items-end mr-2">
//               <span className="text-xs text-gray-500">Was</span>
//               <span className="text-xs text-gray-500 line-through">
//                 ${tour.originalPrice}
//               </span>
//             </div>
//           )}
//           <div className="bg-gray-50 px-2 py-1 rounded-md">
//             <span className="text-base font-bold text-gray-800">
//               ${tour.price}
//             </span>
//           </div>
//         </div>
//       </div>
      
//       {/* View More Button */}
//       <button className="mt-4 w-full rounded-md border border-orange-300 bg-white py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 flex items-center justify-center">
//         <span>View More</span>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   </div>
// )
// import React from 'react';/
// import { Calendar, MapPin, Star, Users, Clock, Award, Heart } from 'lucide-react';
// const TourCard = ({ tour, onClick }) => (
//   <div
//     onClick={onClick}
//     className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//   >
//     {/* Image Container */}
//     <div className="relative h-56 overflow-hidden">
//       <img
//         src={tour.image}
//         alt={tour.title}
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
      
//       {/* Badges Overlay */}
//       <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
//         <span className="inline-block rounded-full bg-orange-500/90 px-2 py-1 text-xs font-bold text-white shadow-sm">
//           Featured
//         </span>
//         {tour.trending && (
//           <span className="inline-block rounded-full bg-blue-500/90 px-2 py-1 text-xs font-bold text-white shadow-sm">
//             Trending
//           </span>
//         )}
//       </div>
      
//       {/* Discount Tag */}
//       {tour.discount && (
//         <div className="absolute top-3 right-3 bg-white text-orange-600 font-bold py-1 px-3 text-xs rounded-full shadow-md z-20">
//           {tour.discount}% OFF
//         </div>
//       )}
//     </div>
    
//     {/* Content Section */}
//     <div className="p-4">
//       {/* Title - Outside Image */}
//       <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-orange-100 pb-2">
//         {tour.title}
//       </h3>
      
//       {/* Tour Details */}
//       <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
//         <div className="flex items-center">
//           <Calendar className="mr-1 h-4 w-4 text-orange-400" />
//           <span>{tour.duration}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="mr-1 h-4 w-4 text-orange-400" />
//           <span>{tour.location}</span>
//         </div>
//         {tour.startingPoint && (
//           <div className="flex items-center text-xs w-full mt-1">
//             <span className="font-medium text-gray-700">Starting Point:</span>
//             <span className="ml-1 text-gray-600">{tour.startingPoint}</span>
//           </div>
//         )}
//       </div>
      
//       {/* Description */}
//       <p className="line-clamp-2 text-sm text-gray-600 mb-4">
//         {tour.description}
//       </p>
      
//       {/* Rating and Price Section - Improved formatting */}
//       <div className="flex items-center justify-between mt-auto">
//         <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
//           <Star className="h-4 w-4 fill-current text-yellow-400" />
//           <span className="font-semibold ml-1">{tour.rating}</span>
//           <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
//         </div>
        
//         <div className="flex items-end">
//           {tour.originalPrice && (
//             <div className="flex flex-col items-end mr-2">
//               <span className="text-xs text-gray-500">Was</span>
//               <span className="text-xs text-gray-500 line-through">
//                 ${tour.originalPrice}
//               </span>
//             </div>
//           )}
//           <div className="bg-gray-50 px-2 py-1 rounded-md">
//             <span className="text-base font-bold text-gray-800">
//               ${tour.price}
//             </span>
//           </div>
//         </div>
//       </div>
      
//       {/* View More Button */}
//       <button className="mt-4 w-full rounded-md border border-orange-300 bg-white py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 flex items-center justify-center">
//         <span>View More</span>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   </div>
// )
// import React from 'react';
// import { Calendar, MapPin, Star } from 'lucide-react';

const TourCard = ({ tour, onClick }) => (
  <div
    // onClick={onClick}
    onClick={() => onClick(tour)}
    className="group relative h-[480px]  cursor-pointer min-w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    {/* Image Container */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={tour.image}
        // src={`https://backend-1-7zwm.onrender.com${tour.image}`}
        alt={tour.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-20 flex space-x-2">
        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          Featured
        </span>
        {tour.trending && (
          <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Trending
          </span>
        )}
      </div>
      
      {/* Discount Tag */}
      {tour.discount && (
        <div className="absolute top-3 right-3 bg-white py-1 px-3 text-xs font-bold text-orange-600 rounded-full shadow-sm">
          {tour.discount}% OFF
        </div>
      )}
      
      {/* Thrillophilia-style "Bestseller" tag */}
      {tour.bestseller && (
        <div className="absolute bottom-3 left-3 bg-green-500 py-1 px-2 text-xs font-medium text-white rounded">
          BESTSELLER
        </div>
      )}
    </div>
    
    {/* Content Section */}
    <div className="p-4">
      {/* Title - Reduced font */}
      <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">
        {tour.title}
      </h3>
      
      {/* Tour Details - Essential info only */}
      <div className="flex flex-wrap items-center gap-x-4 text-xs text-gray-600 mb-3">
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3 text-orange-500" />
          <span>{tour.duration}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-1 h-3 w-3 text-orange-500" />
          <span>{tour.location}</span>
        </div>
      </div>
      
      {/* Marketing Element - Thrillophilia-style highlights */}
      <div className="flex items-center justify-between py-2 mb-3 border-y border-gray-100">
        <div className="flex flex-wrap gap-x-3 text-xs">
          {/* Collection Badge - like Thrillophilia uses */}
          {/* {tour.collection && (
            <div className="flex items-center">
              <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
              <span className="text-gray-600">{tour.collection}</span>
            </div>
          )} */}
          {/* {tour.collection && (
  <div className="flex items-center">
    {tour.collection === "Premium" && (
      <svg className="h-3 w-3 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.26 5.82 22 7 14.14l-5-4.87 6.91-1.01z"></path>
      </svg> 
    )}

    {tour.collection === "Budget" && (
      <svg className="h-3 w-3 mr-1 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M19 5H5M19 12H5M19 19H5"></path>
      </svg>
    )}

    {tour.collection === "Luxury" && (
      <svg className="h-3 w-3 mr-1 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8L9 20l-5.5-5.5L5 12l4 4 10-10z"></path>
      </svg>
    )}

    {tour.collection === "Adventure" && (
      <svg className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 22h20L12 2z"></path>
      </svg>
    )}

    <span className="text-gray-600">{tour.collection}</span>
  </div>
)} */}
{/* 
{tour.collection && (
        <div className="flex items-center">
          {tour.collection === "Premium" && (
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
          )}
          
          {tour.collection === "Budget" && (
            <AlignJustify className="h-3 w-3 mr-1 text-green-500" />
          )}
          
          {tour.collection === "Luxury" && (
            <Award className="h-3 w-3 mr-1 text-purple-500" />
          )}
          
          {tour.collection === "Adventure" && (
            <Triangle className="h-3 w-3 mr-1 text-blue-500" />
          )}
          
          <span className="text-gray-600">{tour.collection}</span>
        </div>
      )}      */}
          {/* Instant Confirmation Badge */}
          <div className="flex items-center">
            <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">Instant Confirmation</span>
          </div>
          
          {/* Cancellation Badge - if applicable */}
          {tour.cancellation && (
            <div className="flex items-center">
              <svg className="h-3 w-3 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">{tour.cancellation}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom section with Rating and Price - Exact Thrillophilia style */}
      <div className="flex items-center justify-between">
        {/* Rating - Thrillophilia exact style */}
        <div className="flex items-center">
          <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
            <span>{tour.rating}</span>
            <Star className="h-3 w-3 ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
        </div>
        
        {/* Price - Exact Thrillophilia style */}
        <div className="flex flex-col items-end">
          {tour.originalPrice && (
            <div className="flex items-center">
              <span className="text-xs text-gray-500 line-through">₹{tour.originalPrice}</span>
              <span className="ml-1 text-xs font-medium text-green-600">
                {Math.round((tour.originalPrice - tour.price) / tour.originalPrice * 100)}% off
              </span>
            </div>
          )}
          <div className="flex items-baseline">
            <span className="text-xs text-gray-500">From </span>
            <span className="ml-1 text-lg font-semibold text-gray-800">₹{tour.price}</span>
            {/* <div className="text-xs text-gray-500">per person </div> */}
          </div>
        </div>
      </div>
      
      {/* View More Button */}
      <button 
     className="mt-3 w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 flex items-center justify-center">
        <span>View More</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
);

// export default TourCard;
// const TourCard = ({ tour, onClick }) => {
//   const saveToWishlist = (e) => {
//     e.stopPropagation();
//     // Add wishlist functionality here
//   };
  
//   return (
//     <div
//       onClick={onClick}
//       className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//     >
//       {/* Image Container with Enhanced Overlay */}
//       <div className="relative h-64 overflow-hidden">
//         <img
//           src={tour.image}
//           alt={tour.title}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
        
//         {/* Top Badges Section */}
//         <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
//           <span className="inline-flex items-center rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-sm">
//             <Award className="mr-1 h-3 w-3" />
//             Featured
//           </span>
//           {tour.trending && (
//             <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-sm">
//               <span className="mr-1">🔥</span>
//               Trending
//             </span>
//           )}
//         </div>
        
//         {/* Wishlist Button */}
//         <button 
//           onClick={saveToWishlist}
//           className="absolute top-3 right-3 z-20 rounded-full bg-white/90 p-2 text-gray-700 shadow-md transition-all hover:bg-white hover:text-rose-500"
//         >
//           <Heart className="h-4 w-4" />
//         </button>
        
//         {/* Discount Tag - Enhanced */}
//         {tour.discount && (
//           <div className="absolute top-12 right-0 z-20">
//             <div className="relative bg-rose-600 py-1 px-4 text-sm font-bold text-white shadow-md">
//               {tour.discount}% OFF
//               <div className="absolute -left-3 top-0 h-0 w-0 border-t-8 border-r-8 border-transparent border-r-rose-600"></div>
//             </div>
//           </div>
//         )}
        
//         {/* Limited Spots / Popular Tour Indicator */}
//         {tour.spotsLeft && tour.spotsLeft < 10 && (
//           <div className="absolute bottom-3 left-3 z-20 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-sm">
//             <Users className="mr-1 inline h-3 w-3" />
//             Only {tour.spotsLeft} spots left!
//           </div>
//         )}
        
//         {/* Tour Title Overlay */}
//         <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-white">
//           <h3 className="text-xl font-bold leading-tight text-white drop-shadow-md">
//             {tour.title}
//           </h3>
//         </div>
//       </div>
      
//       {/* Content Section - Redesigned */}
//       <div className="p-4">
//         {/* Tour Type Tags */}
//         {tour.tags && (
//           <div className="mb-3 flex flex-wrap gap-1">
//             {tour.tags.map((tag, index) => (
//               <span 
//                 key={index} 
//                 className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
        
//         {/* Tour Details - Enhanced with icons */}
//         <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
//           <div className="flex items-center">
//             <Calendar className="mr-1 h-4 w-4 text-orange-500" />
//             <span>{tour.duration}</span>
//           </div>
//           <div className="flex items-center">
//             <MapPin className="mr-1 h-4 w-4 text-orange-500" />
//             <span>{tour.location}</span>
//           </div>
//           {tour.groupSize && (
//             <div className="flex items-center">
//               <Users className="mr-1 h-4 w-4 text-orange-500" />
//               <span>Max {tour.groupSize} people</span>
//             </div>
//           )}
//           {tour.startTime && (
//             <div className="flex items-center">
//               <Clock className="mr-1 h-4 w-4 text-orange-500" />
//               <span>Starts: {tour.startTime}</span>
//             </div>
//           )}
//         </div>
        
//         {/* Starting point */}
//         {tour.startingPoint && (
//           <div className="mb-3 rounded-md bg-gray-50 p-2 text-xs">
//             <span className="font-medium text-gray-700">Starting Point: </span>
//             <span className="text-gray-600">{tour.startingPoint}</span>
//           </div>
//         )}
        
//         {/* USP Highlights */}
//         {tour.highlights && (
//           <div className="mb-3 text-xs text-gray-600">
//             <p className="font-medium text-gray-700 mb-1">Tour Highlights:</p>
//             <ul className="list-disc pl-4 space-y-0.5">
//               {tour.highlights.slice(0, 2).map((highlight, index) => (
//                 <li key={index}>{highlight}</li>
//               ))}
//             </ul>
//           </div>
//         )}
        
//         {/* Rating and Price Section - Improved layout */}
//         <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
//           <div className="flex items-center">
//             <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
//               <Star className="h-4 w-4 fill-current text-yellow-400" />
//               <span className="font-semibold ml-1 text-gray-800">{tour.rating}</span>
//               <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
//             </div>
//           </div>
          
//           <div className="flex items-end">
//             {tour.originalPrice && (
//               <div className="flex flex-col items-end mr-2">
//                 <span className="text-xs text-gray-500">Was</span>
//                 <span className="text-xs text-gray-500 line-through">
//                   ${tour.originalPrice}
//                 </span>
//               </div>
//             )}
//             <div className="bg-orange-50 px-3 py-1 rounded-md border border-orange-100">
//               <span className="text-base font-bold text-orange-600">
//                 ${tour.price}
//               </span>
//               <span className="text-xs text-gray-500 ml-1">per person</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Call to Action Button - Enhanced */}
//         <button className="mt-3 w-full rounded-md bg-orange-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 flex items-center justify-center shadow-sm group-hover:shadow-md">
//           <span>Book This Tour</span>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//           </svg>
//         </button>
        
//         {/* Additional Marketing Elements */}
//         {tour.promotion && (
//           <div className="mt-2 text-center text-xs font-medium text-orange-600">
//             {tour.promotion}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TourCard;

// const ToursGrid1 = () => {
 
 
//   const [filters, setFilters] = useState({
//     priceRange: 0,
//     duration: "all",
//     location: "all",
//   });
 

//   const [sortBy, setSortBy] = useState("recommended");
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tours, setTours] = useState([]); // State to store fetched tours
//   const [loading, setLoading] = useState(true); // State to handle loading state
//   const [error, setError] = useState(null); // State to handle errors
//   const [showFilterModal, setShowFilterModal] = useState(false);
// const [showSortModal, setShowSortModal] = useState(false);

  
// const [showAllTours, setShowAllTours] = useState(false);
// // const toursToShow = showAllTours ? filteredAndSortedTours : filteredAndSortedTours.slice(0, 6); // Show first 6 tours initially

//   useEffect(() => {
//     // Create a flag to prevent multiple state updates if the effect runs twice
//     let mounted = true;
    
//     const fetchTours = async () => {
//       setLoading(true);
//       setError(null);
    
//       try {
//         console.log("Fetching tours...");
//         const response = await fetch("http://localhost:5000/api/Grid");
    
//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.status}`);
//         }
    
//         const data = await response.json();
//         console.log("API response:", data);
    
//         // Only update state if component is still mounted
//         if (mounted) {
//           // Check the actual structure of your data
//           if (Array.isArray(data)) {
//             setTours(data);
//           } else if (data.data && Array.isArray(data.data.tours)) {
//             setTours(data.data.tours);
//           } else if (data.tours && Array.isArray(data.tours)) {
//             setTours(data.tours);
//           } else {
//             setTours([]);
//             console.error("Could not find tours array in response", data);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//         if (mounted) {
//           setError(error.message);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
    
//     };
    
//     fetchTours();
    
//     // Cleanup function to prevent state updates if component unmounts
//     return () => {
//       mounted = false;
//     };
//   }, []); // Empty dependency array
//   const locations = Array.isArray(tours)
//     ? [...new Set(tours.map((tour) => tour.location))]
//     : [];
   
  
//   // Function to handle viewing all tours

  
//   const durations = [
//     { label: "All", value: "all" },
//     { label: "1-3 Days", value: "short" },
//     { label: "4-7 Days", value: "medium" },
//     { label: "8+ Days", value: "long" },
//   ];

//   const sortOptions = [
//     { label: "Recommended", value: "recommended", icon: Star },
//     { label: "Price: Low to High", value: "price_asc", icon: SortAsc },
//     { label: "Price: High to Low", value: "price_desc", icon: SortDesc },
//     { label: "Duration", value: "duration", icon: Clock },
//     { label: "Rating", value: "rating", icon: Star },
//   ];

//   const filteredAndSortedTours = useMemo(() => {
//     let filtered = [...tours];

//     // Apply filters
//     if (filters.priceRange > 0) {
//       filtered = filtered.filter((tour) => tour.price <= filters.priceRange);
//     }

//     if (filters.duration !== "all") {
//       filtered = filtered.filter((tour) => {
//         switch (filters.duration) {
//           case "short":
//             return tour.duration <= 3;
//           case "medium":
//             return tour.duration > 3 && tour.duration <= 7;
//           case "long":
//             return tour.duration > 7;
//           default:
//             return true;
//         }
//       });
//     }
    


//     // Apply sorting
//     switch (sortBy) {
//       case "price_asc":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "price_desc":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "duration":
//         filtered.sort((a, b) => b.duration - a.duration);
//         break;
//       case "rating":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       default:
//         // 'recommended' sorting uses a combination of rating and reviews
//         filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
//     }

//     return filtered;
//   }, [tours, filters, sortBy]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading tours...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">Error: {error}</p>;
//   }
//   const toursToShow = showAllTours ? filteredAndSortedTours : filteredAndSortedTours.slice(0, 6); // Show first 6 tours initially

//   // console.log("Tours to show count:", toursToShow.length);
//   const toggleShowAllTours = () => {
//     console.log("Toggle button clicked, current state:", showAllTours);
//     setShowAllTours(prevState => !prevState);
//     console.log("State should be updated to:", !showAllTours);
//   };
//   return (
  

// <div className="container px-4 mt-10 mx-auto">
// <div className="mb-8 space-y-6 w-full">
//   {/* Trending Tours Header with View All Button */}
//   <div className="trending-tours-header flex justify-between items-center mb-6 ">
//     <div className="trending-tour-heading p-3">
//       <h1 className="text-2xl md:text-3xl font-bold text-blue-900 relative group overflow-hidden">
//         <span className="inline-block animate-slideIn">
//           Featured Tours
//         </span>
//         <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
//       </h1>
//       <button 
//             // onClick={() => setShowAllTours(!showAllTours)}
//             onClick={toggleShowAllTours}
//             className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors flex items-center"
//           >
//             {showAllTours ? "Show Less" : "View All"}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//             </svg>
//           </button>
     
//     </div>
  
//         </div>
     
//   </div>


//         {/* Filters */}
// {/* Filters */}
// <div className="space-y-4">

//   <div className="hidden md:block">
//     <div className="flex flex-wrap gap-4">
//       <div className="flex items-center">
//         <Filter className="mr-2 h-5 w-5 text-gray-500" />
//         <span className="mr-4 text-gray-600">Filters:</span>
//       </div>
      
//       {durations.map((duration) => (
//         <FilterButton
//           key={duration.value}
//           label={duration.label}
//           active={filters.duration === duration.value}
//           onClick={() =>
//             setFilters((prev) => ({ ...prev, duration: duration.value }))
//           }
//         />
//       ))}
     
//       <select
//         value={filters.location}
//         onChange={(e) =>
//           setFilters((prev) => ({ ...prev, location: e.target.value }))
//         }
//         className="rounded-lg border px-4 py-2 text-gray-600"
//       >
//         <option value="all">All Locations</option>
//         {locations.map((location) => (
//           <option key={location} value={location}>
//             {location}
//           </option>
//         ))}
//       </select>
//     </div>
 
//     <div className="mt-4 flex flex-wrap items-center gap-4">
//       <div className="flex items-center">
//         <SortAsc className="mr-2 h-5 w-5 text-gray-500" />
//         <span className="mr-4 text-gray-600">Sort by:</span>
//       </div>
//       {sortOptions.map((option) => (
//         <SortButton
//           key={option.value}
//           label={option.label}
//           icon={option.icon}
//           active={sortBy === option.value}
//           onClick={() => setSortBy(option.value)}
//         />
//       ))}
//     </div>
//   </div>


//   <div className="md:hidden">
//     <div className="flex gap-2">
    
//       <div className="relative flex-1">
//         <button
//           onClick={() => setShowFilterModal(!showFilterModal)}
//           className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
//         >
//           <div className="flex items-center">
//             <Filter className="mr-2 h-4 w-4 text-gray-500" />
//             <span>Filters</span>
//           </div>
//           <ChevronDown className="h-4 w-4 text-gray-500" />
//         </button>
//       </div>

      
//       <div className="relative flex-1">
//         <button
//           onClick={() => setShowSortModal(!showSortModal)}
//           className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
//         >
//           <div className="flex items-center">
//             <SortAsc className="mr-2 h-4 w-4 text-gray-500" />
//             <span>Sort by</span>
//           </div>
//           <ChevronDown className="h-4 w-4 text-gray-500" />
//         </button>
//       </div>
//     </div>

    
//     {(filters.duration !== 'all' || filters.location !== 'all') && (
//       <div className="mt-2 flex flex-wrap gap-2">
//         {filters.duration !== 'all' && (
//           <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
//             {durations.find(d => d.value === filters.duration)?.label}
//             <X
//               className="ml-1 h-3 w-3 cursor-pointer"
//               onClick={() => setFilters(prev => ({ ...prev, duration: 'all' }))}
//             />
//           </span>
//         )}
//         {filters.location !== 'all' && (
//           <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
//             {filters.location}
//             <X
//               className="ml-1 h-3 w-3 cursor-pointer"
//               onClick={() => setFilters(prev => ({ ...prev, location: 'all' }))}
//             />
//           </span>
//         )}
//       </div>
//     )}
//   </div>
// </div>


// {showFilterModal && (
//   <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
//     <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-lg font-medium">Filters</h3>
//         <X className="h-5 w-5 cursor-pointer" onClick={() => setShowFilterModal(false)} />
//       </div>
      
//       <div className="space-y-4">
//         <div>
//           <h4 className="mb-2 font-medium">Duration</h4>
//           <div className="flex flex-wrap gap-2">
//             {durations.map((duration) => (
//               <button
//                 key={duration.value}
//                 className={`rounded-lg border px-3 py-1 text-sm ${
//                   filters.duration === duration.value
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-300 text-gray-700'
//                 }`}
//                 onClick={() => {
//                   setFilters(prev => ({ ...prev, duration: duration.value }));
//                 }}
//               >
//                 {duration.label}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         <div>
//           <h4 className="mb-2 font-medium">Location</h4>
//           <select
//             value={filters.location}
//             onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
//             className="w-full rounded-lg border px-3 py-2 text-gray-700"
//           >
//             <option value="all">All Locations</option>
//             {locations.map((location) => (
//               <option key={location} value={location}>
//                 {location}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
      
//       <div className="mt-6 flex gap-2">
//         <button
//           onClick={() => {
//             setFilters({ duration: 'all', location: 'all' });
//           }}
//           className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700"
//         >
//           Reset
//         </button>
//         <button
//           onClick={() => setShowFilterModal(false)}
//           className="flex-1 rounded-lg bg-blue-600 py-2 text-white"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   </div>
// )}


// {showSortModal && (
//   <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
//     <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-lg font-medium">Sort by</h3>
//         <X className="h-5 w-5 cursor-pointer" onClick={() => setShowSortModal(false)} />
//       </div>
      
//       <div className="space-y-2">
//         {sortOptions.map((option) => (
//           <button
//             key={option.value}
//             className={`flex w-full items-center rounded-lg px-3 py-2 text-left ${
//               sortBy === option.value
//                 ? 'bg-blue-50 text-blue-700'
//                 : 'text-gray-700'
//             }`}
//             onClick={() => {
//               setSortBy(option.value);
//               setShowSortModal(false);
//             }}
//           >
//             {option.icon === 'star' && <Star className="mr-2 h-4 w-4" />}
//             {option.icon === 'dollar-sign' && <DollarSign className="mr-2 h-4 w-4" />}
//             {option.icon === 'clock' && <Clock className="mr-2 h-4 w-4" />}
//             {option.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// )} 


        
//  {/* <ToursCarousel
//           tours={toursToShow}
//           TourCard={({ tour }) => (
//             <TourCard
//               tour={tour}
//               onClick={() => {
//                 setSelectedTour(tour);
//                 setIsModalOpen(true);
//               }}
//             />
//           )}
//           autoplayInterval={6000}
//           visibleCards={3}
//           style={{ width: "100%", height: "auto" }}
//         />  */}
//           {!showAllTours ? (

//   <ToursCarousel
//     tours={filteredAndSortedTours}
//     TourCard={({ tour }) => (
//       <TourCard
//         tour={tour}
//         onClick={() => {
//           setSelectedTour(tour);
//           setIsModalOpen(true);
//         }}
//       />
//     )}
//     autoplayInterval={6000}
//     visibleCards={3}
//     style={{ width: "100%", height: "auto" }}
//   />
// ) : (  

//    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {filteredAndSortedTours.map((tour) => (
//       <TourCard
//         key={tour.id}
//         tour={tour}
//         onClick={() => {
//           setSelectedTour(tour);
//           setIsModalOpen(true);
//         }}
//       />
//     ))}
//   </div> */}
//  )}  
//  {/* <ToursCarousel
//   tours={filteredAndSortedTours}
//   TourCard={({ tour }) => (
//     <TourCard
//       tour={tour}
//       onClick={() => {
//         setSelectedTour(tour);
//         setIsModalOpen(true);
//       }}
//       // Add fixed width
//     />
//   )}
//   autoplayInterval={6000}
//   visibleCards={3}
//   style={{ width: "100%", height: "auto" }} 
// />   */}

// {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {toursToShow.map((tour) => (
//             <TourCard
//               key={tour.id}
//               tour={tour}
//               onClick={() => {
//                 setSelectedTour(tour);
//                 setIsModalOpen(true);
//               }}
//             />
//           ))}
//         </div> */}


//       {/* Tour Modal */}
//        {selectedTour && (
//         <TourModal
//           tour={selectedTour}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           handleBookNow={handleBookNow}
//           // tours={tours}
//         /> )}
    
       
//     </div>
//     // </div>
//   );
// // return (
// //   <div>
// //     {isAllToursPage ? (
// //       <AllToursPage
// //         tours={tours}
// //         onTourClick={handleTourClick}
// //         onBack={handleBackToHome}
// //       />
// //     ) : isDetailPage ? (
// //       <TourDetailModal
// //         tour={selectedTour}
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //       />
// //     ) : (
// //       <div className="container px-4 mt-10 mx-auto">
// //         <div className="mb-8 space-y-6 w-full">
// //           {/* Trending Tours Header with View All Button */}
// //           <div className="trending-tours-header flex justify-between items-center mb-6 ">
// //             <div className="trending-tour-heading p-3">
// //               <h1 className="text-2xl md:text-3xl font-bold text-blue-900 relative group overflow-hidden">
// //                 <span className="inline-block animate-slideIn">
// //                   Featured Tours
// //                 </span>
// //                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
// //               </h1>
// //             </div>
// //             <button
// //               className="view-all-button bg-blue-600 text-white px-5 py-2 rounded-md shadow-md
// //                          hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
// //               onClick={handleViewAllClick}
// //             >
// //               View All <span className="arrow-icon text-lg">→</span>
// //             </button>
// //           </div>

// //           {/* Filters */}
// //           <div className="space-y-4">
// //             <div className="hidden md:block">
// //               <div className="flex flex-wrap gap-4">
// //                 <div className="flex items-center">
// //                   <Filter className="mr-2 h-5 w-5 text-gray-500" />
// //                   <span className="mr-4 text-gray-600">Filters:</span>
// //                 </div>
                
// //                 {durations.map((duration) => (
// //                   <FilterButton
// //                     key={duration.value}
// //                     label={duration.label}
// //                     active={filters.duration === duration.value}
// //                     onClick={() =>
// //                       setFilters((prev) => ({ ...prev, duration: duration.value }))
// //                     }
// //                   />
// //                 ))}
               
// //                 <select
// //                   value={filters.location}
// //                   onChange={(e) =>
// //                     setFilters((prev) => ({ ...prev, location: e.target.value }))
// //                   }
// //                   className="rounded-lg border px-4 py-2 text-gray-600"
// //                 >
// //                   <option value="all">All Locations</option>
// //                   {locations.map((location) => (
// //                     <option key={location} value={location}>
// //                       {location}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
           
// //               <div className="mt-4 flex flex-wrap items-center gap-4">
// //                 <div className="flex items-center">
// //                   <SortAsc className="mr-2 h-5 w-5 text-gray-500" />
// //                   <span className="mr-4 text-gray-600">Sort by:</span>
// //                 </div>
// //                 {sortOptions.map((option) => (
// //                   <SortButton
// //                     key={option.value}
// //                     label={option.label}
// //                     icon={option.icon}
// //                     active={sortBy === option.value}
// //                     onClick={() => setSortBy(option.value)}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="md:hidden">
// //               <div className="flex gap-2">
// //                 <div className="relative flex-1">
// //                   <button
// //                     onClick={() => setShowFilterModal(!showFilterModal)}
// //                     className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
// //                   >
// //                     <div className="flex items-center">
// //                       <Filter className="mr-2 h-4 w-4 text-gray-500" />
// //                       <span>Filters</span>
// //                     </div>
// //                     <ChevronDown className="h-4 w-4 text-gray-500" />
// //                   </button>
// //                 </div>
                
// //                 <div className="relative flex-1">
// //                   <button
// //                     onClick={() => setShowSortModal(!showSortModal)}
// //                     className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
// //                   >
// //                     <div className="flex items-center">
// //                       <SortAsc className="mr-2 h-4 w-4 text-gray-500" />
// //                       <span>Sort by</span>
// //                     </div>
// //                     <ChevronDown className="h-4 w-4 text-gray-500" />
// //                   </button>
// //                 </div>
// //               </div>
              
// //               {(filters.duration !== 'all' || filters.location !== 'all') && (
// //                 <div className="mt-2 flex flex-wrap gap-2">
// //                   {filters.duration !== 'all' && (
// //                     <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
// //                       {durations.find(d => d.value === filters.duration)?.label}
// //                       <X
// //                         className="ml-1 h-3 w-3 cursor-pointer"
// //                         onClick={() => setFilters(prev => ({ ...prev, duration: 'all' }))}
// //                       />
// //                     </span>
// //                   )}
// //                   {filters.location !== 'all' && (
// //                     <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
// //                       {filters.location}
// //                       <X
// //                         className="ml-1 h-3 w-3 cursor-pointer"
// //                         onClick={() => setFilters(prev => ({ ...prev, location: 'all' }))}
// //                       />
// //                     </span>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {showFilterModal && (
// //             <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
// //               <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
// //                 <div className="mb-4 flex items-center justify-between">
// //                   <h3 className="text-lg font-medium">Filters</h3>
// //                   <X className="h-5 w-5 cursor-pointer" onClick={() => setShowFilterModal(false)} />
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <h4 className="mb-2 font-medium">Duration</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {durations.map((duration) => (
// //                         <button
// //                           key={duration.value}
// //                           className={`rounded-lg border px-3 py-1 text-sm ${
// //                             filters.duration === duration.value
// //                               ? 'border-blue-500 bg-blue-50 text-blue-700'
// //                               : 'border-gray-300 text-gray-700'
// //                           }`}
// //                           onClick={() => {
// //                             setFilters(prev => ({ ...prev, duration: duration.value }));
// //                           }}
// //                         >
// //                           {duration.label}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
                  
// //                   <div>
// //                     <h4 className="mb-2 font-medium">Location</h4>
// //                     <select
// //                       value={filters.location}
// //                       onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
// //                       className="w-full rounded-lg border px-3 py-2 text-gray-700"
// //                     >
// //                       <option value="all">All Locations</option>
// //                       {locations.map((location) => (
// //                         <option key={location} value={location}>
// //                           {location}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
                
// //                 <div className="mt-6 flex gap-2">
// //                   <button
// //                     onClick={() => {
// //                       setFilters({ duration: 'all', location: 'all' });
// //                     }}
// //                     className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700"
// //                   >
// //                     Reset
// //                   </button>
// //                   <button
// //                     onClick={() => setShowFilterModal(false)}
// //                     className="flex-1 rounded-lg bg-blue-600 py-2 text-white"
// //                   >
// //                     Apply
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {showSortModal && (
// //             <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
// //               <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
// //                 <div className="mb-4 flex items-center justify-between">
// //                   <h3 className="text-lg font-medium">Sort by</h3>
// //                   <X className="h-5 w-5 cursor-pointer" onClick={() => setShowSortModal(false)} />
// //                 </div>
                
// //                 <div className="space-y-2">
// //                   {sortOptions.map((option) => (
// //                     <button
// //                       key={option.value}
// //                       className={`flex w-full items-center rounded-lg px-3 py-2 text-left ${
// //                         sortBy === option.value
// //                           ? 'bg-blue-50 text-blue-700'
// //                           : 'text-gray-700'
// //                       }`}
// //                       onClick={() => {
// //                         setSortBy(option.value);
// //                         setShowSortModal(false);
// //                       }}
// //                     >
// //                       {option.icon === 'star' && <Star className="mr-2 h-4 w-4" />}
// //                       {option.icon === 'dollar-sign' && <DollarSign className="mr-2 h-4 w-4" />}
// //                       {option.icon === 'clock' && <Clock className="mr-2 h-4 w-4" />}
// //                       {option.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           <ToursCarousel
// //             tours={filteredAndSortedTours}
// //             TourCard={({ tour }) => (
// //               <TourCard
// //                 tour={tour}
// //                 onClick={() => {
// //                   setSelectedTour(tour);
// //                   setIsModalOpen(true);
// //                 }}
// //               />
// //             )}
// //             autoplayInterval={6000}
// //             visibleCards={3}
// //             style={{ width: "100%", height: "auto" }} 
// //           />

// //           {/* Tour Modal */}
// //           {selectedTour && (
// //             <TourModal
// //               tour={selectedTour}
// //               isOpen={isModalOpen}
// //               onClose={() => setIsModalOpen(false)}
// //               handleBookNow={handleBookNow}
// //             />
// //           )}
// //         </div>
// //       </div>
// //     )}
// //   </div>
// // );
// };

// export default ToursGrid1;
const ToursGrid1 = () => {
  const [filters, setFilters] = useState({
    priceRange: 0,
    duration: "all",
    location: "all",
  });
 
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tours, setTours] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showAllTours, setShowAllTours] = useState(false);
  useEffect(() => {
    let isMounted = true; // Track mount status
  
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
  
      try {
        console.log("Fetching tours...");
        const response = await fetch("https://backend-1-7zwm.onrender.com/api/Grid");
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  
        const data = await response.json();
        console.log("API response:", data);
  
        if (isMounted && Array.isArray(data)) {
          setTours(data);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
        if (isMounted) setError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchTours();
  
    return () => {
      isMounted = false; // Cleanup
    };
  }, []);
  
  // useEffect(() => {
  //   let mounted = true;
    
  //   const fetchTours = async () => {
  //     setLoading(true);
  //     setError(null);
    
  //     try {
  //       console.log("Fetching tours...");
  //        const response = await fetch(" https://backend-1-7zwm.onrender.com/api/Grid");
    
  //     const text = await response.text();
  //   console.log('Raw response:', text.substring(0, 500));
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch: ${response.status}`);
  //       }
    
  //       const data = await response.json();
  //       console.log("API response:", data);
    
  //       if (mounted) {
  //         if (Array.isArray(data)) {
  //           setTours(data);
  //         } else if (data.data && Array.isArray(data.data.tours)) {
  //           setTours(data.data.tours);
  //         } else if (data.tours && Array.isArray(data.tours)) {
  //           setTours(data.tours);
  //         } else {
  //           setTours([]);
  //           console.error("Could not find tours array in response", data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tours:", error);
  //       if (mounted) {
  //         setError(error.message);
  //       }
  //     } finally {
  //       if (mounted) {
  //         setLoading(false);
  //       }
  //     }
  //   };
    
  //   fetchTours();
    
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  const locations = Array.isArray(tours)
    ? [...new Set(tours.map((tour) => tour.location))]
    : [];
   
  const durations = [
    { label: "All", value: "all" },
    { label: "1-3 Days", value: "short" },
    { label: "4-7 Days", value: "medium" },
    { label: "8+ Days", value: "long" },
  ];

  const sortOptions = [
    { label: "Recommended", value: "recommended", icon: Star },
    { label: "Price: Low to High", value: "price_asc", icon: SortAsc },
    { label: "Price: High to Low", value: "price_desc", icon: SortDesc },
    { label: "Duration", value: "duration", icon: Clock },
    { label: "Rating", value: "rating", icon: Star },
  ];

  const filteredAndSortedTours = useMemo(() => {
    let filtered = [...tours];

    // Apply filters
    if (filters.priceRange > 0) {
      filtered = filtered.filter((tour) => tour.price <= filters.priceRange);
    }

    if (filters.duration !== "all") {
      filtered = filtered.filter((tour) => {
        switch (filters.duration) {
          case "short":
            return tour.duration <= 3;
          case "medium":
            return tour.duration > 3 && tour.duration <= 7;
          case "long":
            return tour.duration > 7;
          default:
            return true;
        }
      });
    }
    
    if (filters.location !== "all") {
      filtered = filtered.filter((tour) => tour.location === filters.location);
    }

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "duration":
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'recommended' sorting uses a combination of rating and reviews
        filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
    }

    return filtered;
  }, [tours, filters, sortBy]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tours...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const toursToShow = showAllTours ? filteredAndSortedTours : filteredAndSortedTours.slice(0, 6);

  const toggleShowAllTours = () => {
    console.log("Toggle button clicked, current state:", showAllTours);
    setShowAllTours(prevState => !prevState);
    console.log("State should be updated to:", !showAllTours);
  };

  // Placeholder for handleBookNow function that was missing
  const handleBookNow = (tourId) => {
    console.log("Book now for tour:", tourId);
    // Implement your booking logic here
  };

  return (
    <div id="tours" className="container px-4 mt-10 mx-auto">
      <div className="mb-8 space-y-6 w-full">
        {/* Trending Tours Header with View All Button */}
        <div className="trending-tours-header flex justify-between items-center mb-6 ">
          <div className="trending-tour-heading p-3">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 relative group overflow-hidden">
              <span className="inline-block animate-slideIn">
                Featured Tours
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            </h1>
          </div>
          <button
  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
             hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
  onClick={toggleShowAllTours}
>
  {showAllTours ? "Show Less" : "View All"} <span className="arrow-icon text-lg">→</span>
</button>
           {/* <button
  className="-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
             hover:from-orangebg-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
  onClick={toggleShowAllTours}
>
  {showAllTours ? "Show Less" : "View All"} <span className="arrow-icon text-lg">→</span>
</button>  */}

           {/* <button 
            onClick={toggleShowAllTours}
            className="px-4 py-2 text-sm font-mediumbg-gradient-to-r from-orange-500 to-amber-500 text orange-500 rounded-md hover:bg-blue-50 transition-colors flex items-center"
          >
            {showAllTours ? "Show Less" : "View All"}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>  */}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="hidden md:block">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="mr-2 h-5 w-5 text-gray-500" />
              <span className="mr-4 text-gray-600">Filters:</span>
            </div>
            
            {durations.map((duration) => (
              <FilterButton
                key={duration.value}
                label={duration.label}
                active={filters.duration === duration.value}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, duration: duration.value }))
                }
              />
            ))}
           
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              className="rounded-lg border px-4 py-2 text-gray-600"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
       
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <SortAsc className="mr-2 h-5 w-5 text-gray-500" />
              <span className="mr-4 text-gray-600">Sort by:</span>
            </div>
            {sortOptions.map((option) => (
              <SortButton
                key={option.value}
                label={option.label}
                icon={option.icon}
                active={sortBy === option.value}
                onClick={() => setSortBy(option.value)}
              />
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Filters</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          
            <div className="relative flex-1">
              <button
                onClick={() => setShowSortModal(!showSortModal)}
                className="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Sort by</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
      
          {(filters.duration !== 'all' || filters.location !== 'all') && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.duration !== 'all' && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  {durations.find(d => d.value === filters.duration)?.label}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, duration: 'all' }))}
                  />
                </span>
              )}
              {filters.location !== 'all' && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  {filters.location}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, location: 'all' }))}
                  />
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
          <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Filters</h3>
              <X className="h-5 w-5 cursor-pointer" onClick={() => setShowFilterModal(false)} />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Duration</h4>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.value}
                      className={`rounded-lg border px-3 py-1 text-sm ${
                        filters.duration === duration.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700'
                      }`}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, duration: duration.value }));
                      }}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-2 font-medium">Location</h4>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-gray-700"
                >
                  <option value="all">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => {
                  setFilters({ priceRange: 0, duration: 'all', location: 'all' });
                }}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {showSortModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 md:hidden">
          <div className="h-auto w-full animate-slide-up rounded-t-lg bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Sort by</h3>
              <X className="h-5 w-5 cursor-pointer" onClick={() => setShowSortModal(false)} />
            </div>
            
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left ${
                    sortBy === option.value
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortModal(false);
                  }}
                >
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Display tours based on showAllTours state */}
      {!showAllTours ? (
        <ToursCarousel
          tours={toursToShow}
          TourCard={({ tour }) => (
            <TourCard
              tour={tour}
              onClick={() => {
                setSelectedTour(tour);
                setIsModalOpen(true);
              }}
            />
          )}
          autoplayInterval={6000}
          visibleCards={3}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursToShow.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={() => {
                setSelectedTour(tour);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Tour Modal */}
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleBookNow={handleBookNow}
        />
      )}
    </div>
  );
};

export default ToursGrid1;