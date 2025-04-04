import React, { useState, useEffect } from 'react';
import TripPlanner from './TripPlanner';
import EnhancedKashmirButton from './EnhancedKashmirButton';
import EnhancedPlanTripButton from './EnhancedPlanTripButton'
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

// const handleDiscoverPackages1 = async () => {
//   try {
//     // Show loading indicator
//     showLoadingIndicator();
    
//     // Fetch packages and promos data from API with proper error handling
//     const [packagesResponse, promosResponse] = await Promise.allSettled([
//       fetch('http://localhost:5000/api/packages'),
//       fetch('http://localhost:5000/api/promos')
//     ]);
    
//     // Check for fetch errors
//     if (packagesResponse.status !== 'fulfilled' || !packagesResponse.value.ok) {
//       throw new Error('Failed to fetch packages data');
//     }
    
//     // Parse packages data
//     const packagesData = await packagesResponse.value.json();
    
//     // Parse promos data if available
//     let promosData = { data: [] };
//     if (promosResponse.status === 'fulfilled' && promosResponse.value.ok) {
//       promosData = await promosResponse.value.json();
//       console.log('Promos loaded successfully:', promosData);
//     }
    
//     // Hide loading indicator
//     hideLoadingIndicator();
    
//     // Filter out packages without necessary data
//     const validPackages = packagesData.data.filter(pkg => 
//       pkg.name && pkg.originalPrice && pkg.discountedPrice && pkg.duration
//     );
    
//     // Only proceed if we have valid packages
//     if (validPackages.length === 0) {
//       console.error('No valid packages found');
//       showErrorMessage('No valid packages found. Please try again later.');
//       return;
//     }
    
//     // Show the initial discovery popup
//     showDiscoveryPopup(validPackages, promosData);
    
//   } catch (error) {
//     console.error('Error in handleDiscoverPackages:', error);
//     hideLoadingIndicator();
//     showErrorMessage('We couldn\'t load the travel packages. Please try again later.');
//   }
// };


// function showLoadingIndicator() {
//   const loadingOverlay = document.createElement('div');
//   loadingOverlay.id = 'loadingOverlay';
//   loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
//   loadingOverlay.innerHTML = `
//     <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center">
//       <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mr-3"></div>
//       <p class="text-gray-700 font-medium">Loading amazing travel experiences...</p>
//     </div>
//   `;
  
//   document.body.appendChild(loadingOverlay);
// }


// function hideLoadingIndicator() {
//   const loadingOverlay = document.getElementById('loadingOverlay');
//   if (loadingOverlay) {
//     document.body.removeChild(loadingOverlay);
//   }
// }


// function showErrorMessage(message) {
//   const errorPopup = document.createElement('div');
//   errorPopup.className = 'fixed top-6 right-6 bg-white rounded-lg p-4 shadow-xl z-50 animate-slide-in-right max-w-md';
//   errorPopup.innerHTML = `
//     <div class="flex items-start">
//       <div class="flex-shrink-0">
//         <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       </div>
//       <div class="ml-3">
//         <h3 class="text-sm font-medium text-gray-900">Error</h3>
//         <div class="mt-1 text-sm text-gray-500">${message}</div>
//       </div>
//       <button type="button" class="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500" id="closeErrorBtn">
//         <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
//         </svg>
//       </button>
//     </div>
//   `;
  
//   document.body.appendChild(errorPopup);
  
//   // Add styles for animation
//   const style = document.createElement('style');
//   style.textContent = `
//     @keyframes slide-in-right {
//       from { transform: translateX(100%); opacity: 0; }
//       to { transform: translateX(0); opacity: 1; }
//     }
//     .animate-slide-in-right {
//       animation: slide-in-right 0.3s ease-out forwards;
//     }
//   `;
//   document.head.appendChild(style);
  
//   // Close error message when clicking the close button
//   document.getElementById('closeErrorBtn').addEventListener('click', () => {
//     document.body.removeChild(errorPopup);
//   });
  
//   // Auto-close after 5 seconds
//   setTimeout(() => {
//     if (document.body.contains(errorPopup)) {
//       document.body.removeChild(errorPopup);
//     }
//   }, 5000);
// }


// function showDiscoveryPopup(packages, promosData) {
//   // Create popup element with modern design
//   const popup = document.createElement('div');
//   popup.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
  
//   // Get the top packages to display in the popup
//   const displayPackages = packages.slice(0, 3);
  
//   // Create popup content
//   let packageRowsHTML = '';
//   displayPackages.forEach(pkg => {
//     const originalPrice = pkg.originalPrice.toLocaleString();
//     const discountedPrice = pkg.discountedPrice.toLocaleString();
//     const shortName = pkg.shortName || pkg.name;
//     const discount = Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100);
    
//     packageRowsHTML += `
//       <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-orange-50 transition-colors rounded-lg">
//         <div class="flex items-center">
//           <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//             <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
//             </svg>
//           </div>
//           <div>
//             <p class="font-medium text-gray-800">${shortName}</p>
//             <p class="text-xs text-gray-500">${pkg.duration}</p>
//           </div>
//         </div>
//         <div class="text-right">
//           <p class="font-bold text-orange-600">₹${discountedPrice}</p>
//           <div class="flex items-center">
//             <span class="line-through text-xs text-gray-500 mr-1">₹${originalPrice}</span>
//             <span class="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-sm font-medium">-${discount}%</span>
//           </div>
//         </div>
//       </div>
//     `;
//   });
  
//   // Get offer details from the first valid package
//   const offerTitle = packages[0].offerTitle || 'Limited Time Kashmir Offer!';
//   const offerDescription = packages[0].offerDescription || 'Discover breathtaking views and experiences at exclusive prices when you book this week.';
  
//   // Calculate offer expiry date
//   const offerExpiry = packages[0].offerExpiry ? 
//     new Date(packages[0].offerExpiry).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : 
//     new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'});
  
//   // Create modern popup HTML with enhanced visual design
//   popup.innerHTML = `
//     <div class="bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 duration-300 my-auto overflow-hidden">
//       <!-- Header image -->
//       <div class="relative h-44 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
//         <img src="https://source.unsplash.com/featured/?kashmir,landscape" class="w-full h-full object-cover mix-blend-overlay" alt="Kashmir Landscape">
//         <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
//         <div class="absolute bottom-0 left-0 p-5 text-white">
//           <h3 class="text-2xl font-bold mb-1">Kashmir Wonders</h3>
//           <p class="text-sm opacity-90">Enchanting mountains, majestic lakes</p>
//         </div>
//         <button id="closePopup" class="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors">
//           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//           </svg>
//         </button>
//       </div>
      
//       <div class="p-5">
//         <!-- Offer alert -->
//         <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg mb-4">
//           <div class="flex">
//             <div class="flex-shrink-0">
//               <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//             </div>
//             <div class="ml-3">
//               <h3 class="font-bold text-amber-800">${offerTitle}</h3>
//               <p class="text-sm text-amber-700 mt-1">${offerDescription}</p>
//             </div>
//           </div>
//         </div>
        
//         <!-- Package list -->
//         <div class="mb-5">
//           <h4 class="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Featured Packages</h4>
//           <div class="space-y-2">
//             ${packageRowsHTML}
//           </div>
//         </div>
        
//         <!-- Action buttons -->
//         <div class="space-y-3">
//           <button id="bookNowBtn" class="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-amber-700 flex items-center justify-center">
//             <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//             </svg>
//             Book Now & Save
//           </button>
          
//           <button id="explorePackagesBtn" class="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gray-50">
//             Explore All Packages
//           </button>
//         </div>
        
//         <!-- Footer -->
//         <div class="mt-4 text-center">
//           <p class="text-sm text-gray-500">Limited offer valid until <span class="font-medium">${offerExpiry}</span></p>
//           <div class="flex items-center justify-center mt-3 space-x-3">
//             <div class="flex items-center text-amber-600">
//               <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <span class="text-xs font-medium">4.8 (142 reviews)</span>
//             </div>
//             <span class="text-gray-300">|</span>
//             <div class="flex items-center text-green-600">
//               <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//               <span class="text-xs font-medium">Verified Experience</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
  
//   // Add popup to body
//   document.body.appendChild(popup);
  
//   // Trigger animation after a small delay
//   setTimeout(() => {
//     popup.classList.add('opacity-100');
//     const popupContent = popup.querySelector('div');
//     popupContent.classList.remove('scale-95');
//     popupContent.classList.add('scale-100');
//   }, 10);
  
//   // Add close functionality
//   document.getElementById('closePopup').addEventListener('click', () => {
//     closePopup(popup);
//   });
  
//   // Close when clicking outside
//   popup.addEventListener('click', (e) => {
//     if (e.target === popup) {
//       closePopup(popup);
//     }
//   });
  
//   // Book Now button functionality
//   document.getElementById('bookNowBtn').addEventListener('click', () => {
//     // Close current popup
//     closePopup(popup);
    
//     // Create booking form popup
//     setTimeout(() => {
//       showBookingForm(packages, promosData);
//     }, 300);
//   });
  
//   // Explore All Packages button functionality
//   document.getElementById('explorePackagesBtn').addEventListener('click', () => {
//     // Close current popup
//     closePopup(popup);
    
//     // Scroll to packages section or redirect to packages page
//     // This can be customized based on your website structure
//     setTimeout(() => {
//       const packagesSection = document.getElementById('packages-section');
//       if (packagesSection) {
//         packagesSection.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         window.location.href = '/packages';
//       }
//     }, 300);
//   });
  
//   // Add ESC key to close popup
//   const handleEscKey = (e) => {
//     if (e.key === 'Escape') {
//       closePopup(popup);
//       document.removeEventListener('keydown', handleEscKey);
//     }
//   };
  
//   document.addEventListener('keydown', handleEscKey);
// }


// function closePopup(popupElement) {
//   const popupContent = popupElement.querySelector('div');
//   popupElement.classList.remove('opacity-100');
//   popupElement.classList.add('opacity-0');
//   popupContent.classList.remove('scale-100');
//   popupContent.classList.add('scale-95');
  
//   setTimeout(() => {
//     document.body.removeChild(popupElement);
//   }, 300);
// }

// function showBookingForm(packages, promosData) {
//   // Create booking form popup
//   const bookingForm = document.createElement('div');
//   bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-4';
  
//   // Convert packages array to mapping object for easier reference
//   const packageData = {};
//   packages.slice(0, 6).forEach((pkg, index) => {
//     const key = index === 0 ? 'package1' : index === 1 ? 'package2' : 'package3';
//     const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
//     packageData[key] = {
//       id: pkg._id,
//       name: pkg.name,
//       shortName: shortName,
//       price: pkg.originalPrice,
//       discountedPrice: pkg.discountedPrice,
//       duration: pkg.duration,
//       description: pkg.description || 'Experience the beauty of Kashmir with our exclusive package.',
//       highlights: pkg.highlights || [
//         'Professional guides throughout the journey',
//         'Comfortable accommodations in prime locations',
//         'All transfers in air-conditioned vehicles'
//       ],
//       inclusions: pkg.inclusions || [
//         'Hotel accommodations',
//         'Daily breakfast and dinner',
//         'All transfers and sightseeing',
//         'Professional English-speaking guide'
//       ],
//       exclusions: pkg.exclusions || [
//         'Airfare to/from Kashmir',
//         'Personal expenses',
//         'Optional activities',
//         'Travel insurance'
//       ],
//       itinerary: pkg.itinerary || [
//         { day: 'Day 1', title: 'Arrival in Srinagar', description: 'Airport pickup and transfer to your houseboat. Evening Shikara ride on Dal Lake.' },
//         { day: 'Day 2', title: 'Srinagar City Tour', description: 'Visit Mughal Gardens, Shankaracharya Temple, and local craft markets.' },
//         { day: 'Day 3', title: 'Departure', description: 'After breakfast, transfer to the airport for your flight back home.' }
//       ]
//     };
//   });
  
//   // Process promo codes
//   const promoCodes = processPromoCodes(promosData, packageData.package1.discountedPrice);
  
//   // Generate package radio buttons dynamically
//   let packageOptionsHTML = '';
//   Object.keys(packageData).forEach((key, index) => {
//     const pkg = packageData[key];
//     const discount = Math.round(((pkg.price - pkg.discountedPrice) / pkg.price) * 100);
    
//     packageOptionsHTML += `
//       <div class="package-option">
//         <input type="radio" id="${key}" name="package" value="${pkg.shortName}" class="hidden peer" ${index === 0 ? 'checked' : ''}>
//         <label for="${key}" class="block p-4 border border-gray-200 rounded-xl cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-gray-50 hover:border-gray-300">
//           <div class="flex justify-between items-center">
//             <span class="block font-medium text-gray-800">${pkg.shortName}</span>
//             <span class="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-sm font-medium">${discount}% OFF</span>
//           </div>
//           <div class="mt-1 flex items-baseline">
//             <span class="text-orange-600 font-bold text-lg">₹${pkg.discountedPrice.toLocaleString()}</span>
//             <span class="ml-1 line-through text-xs text-gray-500">₹${pkg.price.toLocaleString()}</span>
//           </div>
//           <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
//         </label>
//       </div>
//     `;
//   });
  
//   // Create tabs for package details
//   const packageDetailsTabsHTML = `
//     <div class="mt-4 border-b border-gray-200">
//       <nav class="flex space-x-6">
//         <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-orange-500 text-orange-600" data-tab="overview">
//           Overview
//         </button>
//         <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="itinerary">
//           Itinerary
//         </button>
//         <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="inclusions">
//           Inclusions
//         </button>
//       </nav>
//     </div>
//     <div id="tab-content" class="mt-4 max-h-52 overflow-y-auto pr-1 custom-scrollbar"></div>
//   `;
  
//   // Create form content with dynamic data
//   bookingForm.innerHTML = `
//     <div class="bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
//       <!-- Header with gradient background -->
//       <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white relative">
//         <div class="flex justify-between items-start">
//           <div>
//             <h3 class="text-2xl font-bold">Book Your Kashmir Adventure</h3>
//             <p class="mt-1 opacity-90 text-blue-100">Complete your booking in 3 simple steps</p>
//           </div>
//           <button id="closeBookingForm" class="bg-white/20 hover:bg-white/30 rounded-full p-1.5 text-white transition-colors">
//             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>
        
//         <!-- Steps indicator -->
//         <div class="flex items-center mt-6 space-x-2">
//           <div class="step-indicator active">
//             <span class="step-number">1</span>
//             <span class="step-label">Choose Package</span>
//           </div>
//           <div class="step-connector"></div>
//           <div class="step-indicator">
//             <span class="step-number">2</span>
//             <span class="step-label">Personal Details</span>
//           </div>
//           <div class="step-connector"></div>
//           <div class="step-indicator">
//             <span class="step-number">3</span>
//             <span class="step-label">Confirm Booking</span>
//           </div>
//         </div>
//       </div>
      
//       <!-- Form content -->
//       <div class="p-5 max-h-[calc(100vh-160px)] overflow-y-auto">
//         <form id="kashmirBookingForm" class="space-y-6">
//           <!-- Two column layout for desktop -->
//           <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <!-- Left column: Package details -->
//             <div>
//               <h4 class="text-lg font-medium text-gray-800 mb-3">Select Your Package</h4>
              
//               <!-- Package selection -->
//               <div class="space-y-3">
//                 ${packageOptionsHTML}
//               </div>
              
//               <!-- Package details section -->
//               <div class="bg-gray-50 p-4 rounded-xl mt-4">
//                 <h4 class="font-medium text-gray-800 mb-2" id="packageTitle">${packageData.package1.name}</h4>
//                 <p class="text-gray-600 text-sm mb-3" id="packageDescription">${packageData.package1.description}</p>
                
//                 ${packageDetailsTabsHTML}
//               </div>
//             </div>
            
//             <!-- Right column: Customer details and payment -->
//             <div>
//               <!-- Order summary -->
//               <div id="orderSummary" class="bg-gray-50 p-4 rounded-xl mb-4">
//                 <h4 class="font-medium text-gray-800 mb-3">Booking Summary</h4>
//                 <div class="space-y-2 text-sm">
//                   <div class="flex justify-between items-center pb-2 border-b border-gray-200">
//                     <span class="text-gray-600">Package:</span>
//                     <span class="font-medium text-gray-800" id="selectedPackageName">${packageData.package1.name}</span>
//                   </div>
//                   <div class="flex justify-between">
//                     <span class="text-gray-600">Base price:</span>
//                     <span class="text-gray-800" id="packageBasePrice">₹${packageData.package1.price.toLocaleString()}</span>
//                   </div>
//                   <div class="flex justify-between">
//                     <span class="text-gray-600">Duration:</span>
//                     <span class="text-gray-800" id="packageDuration">${packageData.package1.duration}</span>
//                   </div>
//                   <div class="flex justify-between text-green-600">
//                     <span>Special offer discount:</span>
//                     <span>-₹<span id="specialDiscount">${(packageData.package1.price - packageData.package1.discountedPrice).toLocaleString()}</span></span>
//                   </div>
//                   <div id="promoDiscountRow" class="flex justify-between text-green-600 hidden">
//                     <span>Promo code: <span id="promoCodeLabel" class="font-medium"></span></span>
//                     <span>-₹<span id="promoDiscount">0</span></span>
//                   </div>
//                   <div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 mt-2">
//                     <span>Total:</span>
//                     <span class="text-orange-600">₹<span id="totalPrice">${packageData.package1.discountedPrice.toLocaleString()}</span></span>
//                   </div>
//                 </div>
                
//                 <!-- Promo code -->
//                 <div class="mt-4">
//                   <div class="flex items-center space-x-2">
//                     <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
//                     <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-medium">Apply</button>
//                   </div>
//                   <div id="promoMessage" class="mt-1 text-xs hidden"></div>
//                 </div>
//               </div>
              
//               <!-- Customer details -->
//               <div class="space-y-4">
//                 <h4 class="text-lg font-medium text-gray-800 mb-1">Your Details</h4>
                
//                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input type="text" name="fullName" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm" required>
//                   </div>
//                   <div>
//                     <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input type="email" name="email" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm" required>
//                   </div>
//                 </div>
                
//                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                     <input type="tel" name="phone" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm" required>
//                   </div>
//                   <div>
//                     <label class="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
//                     <select name="travelers" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm bg-white" required>
//                       <option value="1">1 Person</option>
//                       <option value="2" selected>2 People</option>
//                       <option value="3">3 People</option>
//                       <option value="4">4 People</option>
//                       <option value="5">5 People</option>
//                       <option value="6+">6+ People</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date</label>
//                   <input type="date" name="travelDate" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm" required min="${new Date().toISOString().split('T')[0]}">
//                 </div>
                
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
//                   <textarea name="specialRequests" rows="2" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"></textarea>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <!-- Submit button -->
//           <div class="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
//             <div class="text-sm text-gray-600">
//               <div class="flex items-center">
//                 <svg class="w-4 h-4 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span>Secure booking, no obligations</span>
//               </div>
//             </div>
//             <button type="submit" class="py-3 px-8 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-amber-700">
//               Continue to Payment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   `;
  
//   // Add styles for steps indicator
//   const style = document.createElement('style');
//   style.textContent = `
//     .step-indicator {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       position: relative;
//       flex: 1;
//     }
    
//     .step-number {
//       width: 28px;
//       height: 28px;
//       border-radius: 50%;
//       background-color: rgba(255, 255, 255, 0.2);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-weight: bold;
//       font-size: 14px;
//       margin-bottom: 4px;
//     }
    
//     .step-indicator.active .step-number {
//       background-color: white;
//       color: #3b82f6;
//     }
    
//     .step-label {
//       font-size: 12px;
//       opacity: 0.8;
//     }
    
//     .step-indicator.active .step-label {
//       opacity: 1;
//       font-weight: 500;
//     }
    
//     .step-connector {
//       flex: 1;
//       height: 2px;
//       background-color: rgba(255, 255, 255, 0.2);
//       margin-top: -14px;
//     }
    
//     .custom-scrollbar::-webkit-scrollbar {
//       width: 6px;
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-track {
//       background: #f1f1f1;
//       border-radius: 10px;
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: #d1d5db;
//       border-radius: 10px;
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: #9ca3af;
//     }
//   `;
//   document.head.appendChild(style);
  
//   // Add popup to body
//   document.body.appendChild(bookingForm);
  
//   // Trigger animation after a small delay
//   setTimeout(() => {
//     bookingForm.classList.add('opacity-100');
//     const popupContent = bookingForm.querySelector('div');
//     popupContent.classList.remove('scale-95');
//     popupContent.classList.add('scale-100');
    
//     // Initial tab content
//     updateTabContent('overview', packageData.package1);
//   }, 10);
  
//   // Close button functionality
//   document.getElementById('closeBookingForm').addEventListener('click', () => {
//     closePopup(bookingForm);
//   });
  
//   // Close when clicking outside
//   bookingForm.addEventListener('click', (e) => {
//     if (e.target === bookingForm) {
//       closePopup(bookingForm);
//     }
//   });
  
//   // Handle tab switching
//   const tabButtons = document.querySelectorAll('.tab-button');
//   tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       // Remove active class from all tabs
//       tabButtons.forEach(btn => {
//         btn.classList.remove('border-orange-500', 'text-orange-600');
//         btn.classList.add('border-transparent', 'text-gray-500');
//       });
      
//       // Add active class to clicked tab
//       button.classList.add('border-orange-500', 'text-orange-600');
//       button.classList.remove('border-transparent', 'text-gray-500');
      
//       // Get the selected package
//       const selectedPackage = document.querySelector('input[name="package"]:checked').value;
//       let packageKey = 'package1';
      
//       Object.keys(packageData).forEach(key => {
//         if (packageData[key].shortName === selectedPackage) {
//           packageKey = key;
//         }
//       });
      
//       // Update tab content
//       updateTabContent(button.dataset.tab, packageData[packageKey]);
//     });
//   });
  
//   // Function to update tab content based on selection
//   function updateTabContent(tab, pkgData) {
//     const tabContent = document.getElementById('tab-content');
//     let contentHTML = '';
    
//     if (tab === 'overview') {
//       // Overview tab content
//       const highlights = pkgData.highlights;
      
//       contentHTML = `
//         <p class="text-gray-600 text-sm mb-3">${pkgData.description}</p>
//         <h5 class="font-medium text-gray-800 text-sm mb-2">Tour Highlights:</h5>
//         <ul class="space-y-1.5">
//           ${highlights.map(highlight => `
//             <li class="flex items-start">
//               <svg class="w-4 h-4 text-orange-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//               <span class="text-sm text-gray-600">${highlight}</span>
//             </li>
//           `).join('')}
//         </ul>
//       `;
//     } else if (tab === 'itinerary') {
//       // Itinerary tab content
//       const itinerary = pkgData.itinerary;
      
//       contentHTML = `
//         <div class="space-y-4">
//           ${itinerary.map(day => `
//             <div class="relative pl-6 border-l-2 border-orange-200">
//               <div class="absolute top-0 left-0 w-4 h-4 -ml-2 rounded-full bg-orange-500"></div>
//               <h5 class="font-medium text-gray-800 text-sm">${day.day}: ${day.title}</h5>
//               <p class="text-sm text-gray-600 mt-1">${day.description}</p>
//             </div>
//           `).join('')}
//         </div>
//       `;
//     } else if (tab === 'inclusions') {
//       // Inclusions tab content
//       const inclusions = pkgData.inclusions;
//       const exclusions = pkgData.exclusions;
      
//       contentHTML = `
//         <div>
//           <h5 class="font-medium text-gray-800 text-sm mb-2">Inclusions:</h5>
//           <ul class="space-y-1.5 mb-4">
//             ${inclusions.map(item => `
//               <li class="flex items-start">
//                 <svg class="w-4 h-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 <span class="text-sm text-gray-600">${item}</span>
//               </li>
//             `).join('')}
//           </ul>
          
//           <h5 class="font-medium text-gray-800 text-sm mb-2">Exclusions:</h5>
//           <ul class="space-y-1.5">
//             ${exclusions.map(item => `
//               <li class="flex items-start">
//                 <svg class="w-4 h-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 <span class="text-sm text-gray-600">${item}</span>
//               </li>
//             `).join('')}
//           </ul>
//         </div>
//       `;
//     }
    
//     tabContent.innerHTML = contentHTML;
//   }
  
//   // Handle package change
//   const packageRadios = document.querySelectorAll('input[name="package"]');
//   packageRadios.forEach(radio => {
//     radio.addEventListener('change', () => {
//       const selectedPackage = radio.value;
//       let selectedPackageKey = 'package1';
      
//       // Find the package key based on shortName
//       Object.keys(packageData).forEach(key => {
//         if (packageData[key].shortName === selectedPackage) {
//           selectedPackageKey = key;
//         }
//       });
      
//       // Update package details
//       document.getElementById('packageTitle').textContent = packageData[selectedPackageKey].name;
//       document.getElementById('packageDescription').textContent = packageData[selectedPackageKey].description;
      
//       // Update the active tab content
//       const activeTab = document.querySelector('.tab-button.border-orange-500').dataset.tab;
//       updateTabContent(activeTab, packageData[selectedPackageKey]);
      
//       // Update order summary
//       document.getElementById('selectedPackageName').textContent = packageData[selectedPackageKey].name;
//       document.getElementById('packageBasePrice').textContent = `₹${packageData[selectedPackageKey].price.toLocaleString()}`;
//       document.getElementById('packageDuration').textContent = packageData[selectedPackageKey].duration;
//       document.getElementById('specialDiscount').textContent = (packageData[selectedPackageKey].price - packageData[selectedPackageKey].discountedPrice).toLocaleString();
//       document.getElementById('totalPrice').textContent = packageData[selectedPackageKey].discountedPrice.toLocaleString();
      
//       // Reset promo code when package changes
//       resetPromoCode();
//     });
//   });
  
//   // Promo code functionality
//   function processPromoCodes(promosData, basePrice) {
//     let promos = {};
    
//     // Default promo if no valid promos data
//     if (!promosData || !promosData.data || promosData.data.length === 0) {
//       promos = {
//         'KASHMIR10': {
//           discount: 0.1,
//           maxDiscount: 2000,
//           message: 'KASHMIR10 applied: 10% off up to ₹2,000',
//           displayMessage: '10% off your booking',
//           type: 'percent'
//         },
//         'WELCOME500': {
//           discount: 500,
//           maxDiscount: 500,
//           message: 'WELCOME500 applied: Flat ₹500 off',
//           displayMessage: 'Flat ₹500 off your booking',
//           type: 'fixed'
//         }
//       };
//     } else {
//       // Process real promo data
//       promosData.data.forEach(promo => {
//         promos[promo.code] = {
//           discount: promo.discountType === 'percentage' ? promo.discountValue / 100 : promo.discountValue,
//           maxDiscount: promo.maxDiscount || basePrice,
//           message: `${promo.code} applied: ${promo.discountType === 'percentage' ? `${promo.discountValue}% off` : `Flat ₹${promo.discountValue} off`}${promo.maxDiscount ? ` up to ₹${promo.maxDiscount}` : ''}`,
//           displayMessage: promo.displayMessage || `${promo.discountType === 'percentage' ? `${promo.discountValue}% off` : `Flat ₹${promo.discountValue} off`} your booking`,
//           type: promo.discountType === 'percentage' ? 'percent' : 'fixed'
//         };
//       });
//     }
    
//     return promos;
//   }
  
//   // Apply promo code
//   document.getElementById('applyPromo').addEventListener('click', () => {
//     const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
//     const promoMessageElement = document.getElementById('promoMessage');
    
//     if (!promoCode) {
//       setPromoMessage('Please enter a promo code.', 'warning');
//       return;
//     }
    
//     // Check if promo code exists
//     if (promoCodes[promoCode]) {
//       const promo = promoCodes[promoCode];
      
//       // Get current package price
//       const selectedPackage = document.querySelector('input[name="package"]:checked').value;
//       let selectedPackageKey = 'package1';
      
//       Object.keys(packageData).forEach(key => {
//         if (packageData[key].shortName === selectedPackage) {
//           selectedPackageKey = key;
//         }
//       });
      
//       const currentPrice = packageData[selectedPackageKey].discountedPrice;
      
//       // Calculate discount
//       let discountAmount = 0;
//       if (promo.type === 'percent') {
//         discountAmount = Math.round(currentPrice * promo.discount);
        
//         // Apply max discount limit
//         if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
//           discountAmount = promo.maxDiscount;
//         }
//       } else {
//         discountAmount = promo.discount;
//       }
      
//       // Update UI
//       document.getElementById('promoDiscountRow').classList.remove('hidden');
//       document.getElementById('promoCodeLabel').textContent = promoCode;
//       document.getElementById('promoDiscount').textContent = discountAmount.toLocaleString();
//       document.getElementById('totalPrice').textContent = (currentPrice - discountAmount).toLocaleString();
      
//       // Set success message
//       setPromoMessage(promo.message, 'success');
//     } else {
//       setPromoMessage('Invalid promo code. Please try another.', 'error');
//       resetPromoCode();
//     }
//   });
  
//   // Set promo message with appropriate styling
//   function setPromoMessage(message, type) {
//     const promoMessageElement = document.getElementById('promoMessage');
//     promoMessageElement.classList.remove('hidden', 'text-green-600', 'text-red-600', 'text-amber-600');
    
//     if (type === 'success') {
//       promoMessageElement.classList.add('text-green-600');
//     } else if (type === 'error') {
//       promoMessageElement.classList.add('text-red-600');
//     } else {
//       promoMessageElement.classList.add('text-amber-600');
//     }
    
//     promoMessageElement.textContent = message;
//     promoMessageElement.classList.remove('hidden');
//   }
  
//   // Reset promo code
//   function resetPromoCode() {
//     document.getElementById('promoCode').value = '';
//     document.getElementById('promoDiscountRow').classList.add('hidden');
//     document.getElementById('promoMessage').classList.add('hidden');
    
//     // Reset total price to current package discounted price
//     const selectedPackage = document.querySelector('input[name="package"]:checked').value;
//     let selectedPackageKey = 'package1';
    
//     Object.keys(packageData).forEach(key => {
//       if (packageData[key].shortName === selectedPackage) {
//         selectedPackageKey = key;
//       }
//     });
    
//     document.getElementById('totalPrice').textContent = packageData[selectedPackageKey].discountedPrice.toLocaleString();
//   }
  
//   // Form submission
//   document.getElementById('kashmirBookingForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     // Collect form data
//     const formData = new FormData(this);
//     const bookingData = Object.fromEntries(formData.entries());
    
//     // Get selected package details
//     const selectedPackage = document.querySelector('input[name="package"]:checked').value;
//     let selectedPackageData = null;
//     let selectedPackageKey = '';
    
//     Object.keys(packageData).forEach(key => {
//       if (packageData[key].shortName === selectedPackage) {
//         selectedPackageData = packageData[key];
//         selectedPackageKey = key;
//       }
//     });
    
//     // Get total price
//     const totalPrice = parseFloat(document.getElementById('totalPrice').textContent.replace(/,/g, ''));
    
//     // Add package details to booking data
//     bookingData.packageId = selectedPackageData.id;
//     bookingData.packageName = selectedPackageData.name;
//     bookingData.packagePrice = selectedPackageData.price;
//     bookingData.totalPrice = totalPrice;
    
//     // Get promo code if applied
//     const promoCodeRow = document.getElementById('promoDiscountRow');
//     if (!promoCodeRow.classList.contains('hidden')) {
//       bookingData.promoCode = document.getElementById('promoCodeLabel').textContent;
//       bookingData.promoDiscount = parseFloat(document.getElementById('promoDiscount').textContent.replace(/,/g, ''));
//     }
    
//     // Save booking data to sessionStorage (for demo purposes)
//     sessionStorage.setItem('kashmirBookingData', JSON.stringify(bookingData));
    
//     // For demo purposes, simulate a redirect to payment page
//     alert('Redirecting to payment page...\n\nBooking details:\n' + JSON.stringify(bookingData, null, 2));
    
//     // Close the booking form
//     closePopup(bookingForm);
    
//     // For a real implementation, you would submit this data to your backend
//     // And then redirect to a payment processing page
//   });
  
//   // Add ESC key to close form
//   const handleEscKey = (e) => {
//     if (e.key === 'Escape') {
//       closePopup(bookingForm);
//       document.removeEventListener('keydown', handleEscKey);
//     }
//   };
  
//   document.addEventListener('keydown', handleEscKey);
// }
const handleDiscoverPackages1 = async () => {
  try {
    // Fetch packages and promos data from API
    const [packagesResponse, promosResponse] = await Promise.all([
      fetch('http://localhost:5000/api/packages'),
      fetch('http://localhost:5000/api/promos')
    ]);
  
    
    if (!packagesResponse.ok || !promosResponse.ok) {
      throw new Error('Failed to fetch data from API');
    }
    
    const packagesData = await packagesResponse.json();
    const promosData = await promosResponse.json();
    console.log('API Promos Data:', promosData);
    
    
    if (!packagesResponse.ok || !promosResponse.ok) {
      throw new Error('Failed to fetch data from API');
    }
    
   
    
    // Filter out packages without necessary data
    const validPackages = packagesData.data.filter(pkg => 
      pkg.name && pkg.originalPrice && pkg.discountedPrice && pkg.duration
    );
    
    // Only proceed if we have valid packages
    if (validPackages.length === 0) {
      console.error('No valid packages found');
      return;
    }
    
// Create popup element
const popup = document.createElement('div');
popup.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-8';

// Get the top packages to display in the popup
// const displayPackages = validPackages.slice(0, 3);
const displayPackages = validPackages;

// Create popup content with enhanced styling and marketing copy
let packageRowsHTML = '';
displayPackages.forEach(pkg => {
  const originalPrice = pkg.originalPrice.toLocaleString();
  const discountedPrice = pkg.discountedPrice.toLocaleString();
  const shortName = pkg.shortName || pkg.name;
  const savings = pkg.originalPrice - pkg.discountedPrice;
  const savingsPercent = Math.round((savings / pkg.originalPrice) * 100);
  // Elegant package row component with improved styling

  packageRowsHTML += `
    <div class="flex justify-between items-center py-3.5 border-b border-orange-100 last:border-b-0 hover:bg-orange-50 transition-colors duration-200 rounded-md px-2">
      <div class="flex-1">
        <p class="font-semibold text-gray-800">${shortName}</p>
        <p class="text-xs text-gray-600">${pkg.duration}</p>
        <span class="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Save ${savingsPercent}%</span>
      </div>
      <div class="text-right">
        <p class="line-through text-gray-400 text-sm">₹${originalPrice}</p>
        <p class="font-bold text-orange-600 text-lg">₹${discountedPrice}</p>
      </div>
    </div>
  `;
});

// Get offer details from the first valid package
const offerTitle = validPackages[0].offerTitle || 'Exclusive Kashmir Sale!';
const offerDescription = validPackages[0].offerDescription || 'Experience paradise on earth at unbeatable prices.';
const offerExpiry = validPackages[0].offerExpiry ? new Date(validPackages[0].offerExpiry).toLocaleDateString() : 'Limited time only';

popup.innerHTML = `
  <div class="bg-white rounded-xl p-5 sm:p-7 md:p-8 max-w-md md:max-w-3xl w-full mx-4 shadow-2xl transform transition-all duration-300 scale-95 my-auto relative overflow-hidden">
    <div class="absolute top-0 right-0 w-40 h-40 md:w-60 md:h-60 -mt-12 -mr-12 bg-gradient-to-bl from-orange-200 to-transparent rounded-full opacity-70"></div>
    <div class="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 -mb-10 -ml-10 bg-gradient-to-tr from-amber-200 to-transparent rounded-full opacity-70"></div>
    
    <div class="relative md:flex md:gap-6">
      <div class="md:w-3/5">
        <div class="flex justify-between items-start mb-5">
          <div>
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Experience Kashmir Magic</h3>
            <p class="text-sm md:text-base text-orange-600 font-medium">Limited-time exclusive offers</p>
          </div>
          <button id="closePopup" class="text-gray-500 hover:text-orange-600 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-5">
          <div class="p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white shadow-md">
            <div class="flex items-center">
              <div class="mr-3">
                <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="font-bold text-xl md:text-2xl">${offerTitle}</p>
                <p class="mt-1 text-white text-opacity-90">${offerDescription}</p>
              </div>
            </div>
            <p class="mt-2 text-sm md:text-base text-white text-opacity-90 font-medium">Book in the next 24 hours and get an additional 5% off!</p>
          </div>
          
          <div class="md:hidden">
            <div class="flex justify-between mb-2">
              <h4 class="font-bold text-gray-800">Featured Packages</h4>
              <span class="text-xs bg-orange-600 text-white px-2 py-1 rounded-full uppercase font-bold">Hot Deals</span>
            </div>
            <div class="divide-y divide-orange-100 bg-gray-50 rounded-lg p-3.5 shadow-inner">
              ${packageRowsHTML}
            </div>
          </div>
          
          <button id="bookNowBtn" class="w-full py-3.5 md:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.02]">
            <span class="flex items-center justify-center">
              <span class="md:text-lg">BOOK NOW & SAVE</span>
              <svg class="w-5 h-5 md:w-6 md:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </button>
          
          <div class="flex items-center justify-center space-x-3 text-center">
            <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-sm md:text-base font-medium text-gray-700">Offer expires <span class="text-orange-600">${offerExpiry}</span></p>
              <p class="text-xs md:text-sm text-gray-500 mt-0.5">Limited seats available at these prices</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Desktop Package Display -->
      <div class="hidden md:block md:w-2/5">
        <div class="mb-2">
          <h4 class="font-bold text-gray-800">Featured Packages</h4>
          <div class="flex items-center justify-between">
            <p class="text-xs text-gray-500">Best value offers</p>
            <span class="text-xs bg-orange-600 text-white px-2 py-1 rounded-full uppercase font-bold">Hot Deals</span>
          </div>
        </div>
        <div class="divide-y divide-orange-100 bg-gray-50 rounded-lg p-4 shadow-inner h-full max-h-96 overflow-y-auto">
          ${packageRowsHTML}
        </div>
      </div>
    </div>
    
    <div class="text-center text-xs md:text-sm text-gray-500 pt-3 mt-3 border-t border-gray-100">
      <p>Flexible cancellation • Trusted by 10,000+ travelers • 24/7 support</p>
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
        showBookingForm(validPackages, promosData);
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
    function showBookingForm(packages, promosData) {
      // Create booking form popup
      const bookingForm = document.createElement('div');
      bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
      // Convert packages array to mapping object for easier reference
      const packageData = {};
      packages.forEach((pkg, index) => {
        const key = `package${index + 1}`;
        // const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
        // const key = index === 0 ? 'package1' : index === 1 ? 'package2' : 'package3,package4';
        const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
        packageData[key] = {
          id: pkg._id,
          name: pkg.name,
          shortName: shortName.toLowerCase(),
          price: pkg.originalPrice,
          discountedPrice: pkg.discountedPrice,
          duration: pkg.duration,
          description: pkg.description,
          highlights: pkg.highlights || [],
          inclusions: pkg.inclusions || [],
          exclusions: pkg.exclusions || [],
          itinerary: pkg.itinerary || []
        };
      });
      
      const promoCodes = {};
const currentDate = new Date();

// const selectedPackageKey = Object.keys(packageData)[0]; 
const userPackagePrice = 950

console.log(userPackagePrice)
if (promosData?.data && Array.isArray(promosData.data)) {
  promosData.data.forEach(promo => {
    // Required fields check
    if (!promo?.code || !promo?.discount || promo?.isActive !== true) {
      return;
    }

    // Date validation - only check validFrom if it exists
    const validUntil = new Date(promo.validUntil);
    if (validUntil < currentDate) {
      return;
    }

    // Only check validFrom if provided
    if (promo.validFrom) {
      const validFrom = new Date(promo.validFrom);
      if (validFrom > currentDate) {
        return;
      }
    }

    // Package price check
    if (userPackagePrice < (promo.minPackagePrice )) {
      return;
    }

    // Max discount check (if applicable)
    if (promo.maxDiscount && promo.discount > promo.maxDiscount) {
      return;
    }

    // If all checks passed
    promoCodes[promo.code] = promo.discount;
  });
}

// Use API promos if any passed validation
if (Object.keys(promoCodes).length > 0) {
  console.log('Using API promo codes:', promoCodes);
} else {
  console.log('Using default promo codes');
  Object.assign(promoCodes, {
    'KASHMIR2025': 10,
    'SPRING25': 15,
    'FAMILY20': 20
  });
}
   
      // Generate package radio buttons dynamically
      let packageOptionsHTML = '';
      Object.keys(packageData).forEach((key, index) => {
        const pkg = packageData[key];
        packageOptionsHTML += `
          <div class="package-option">
            <input type="radio" id="${key}" name="package" value="${pkg.shortName}" class="hidden peer" ${index === 0 ? 'checked' : ''}>
            <label for="${key}" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
              <span class="block font-medium">${pkg.shortName}</span>
              <span class="block text-orange-600 font-bold mt-1">₹<span id="${pkg.shortName}-price">${pkg.discountedPrice.toLocaleString()}</span></span>
              <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
            </label>
          </div>
        `;
      });
      
      // Create tabs for package details
      const packageDetailsTabsHTML = `
        <div class="mt-4 border-b border-gray-200">
          <nav class="flex space-x-4">
            <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-orange-500 text-orange-600" data-tab="overview">
              Overview
            </button>
            <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="itinerary">
              Itinerary
            </button>
            <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="inclusions">
              Inclusions
            </button>
          </nav>
        </div>
        <div id="tab-content" class="mt-4"></div>
      `;
      
      // Create form content with dynamic data
     // Create form content with dynamic data
bookingForm.innerHTML = `
<div class="bg-white rounded-xl p-0 max-w-2xl w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
  <!-- Header with premium gradient background -->
  <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-5 sm:p-7 text-white relative">
    <div class="relative z-10">
      <div class="flex items-center">
        <svg class="w-7 h-7 mr-2 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"></path>
        </svg>
        <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
      </div>
      <p class="mt-2 opacity-90 flex items-center">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
        </svg>
        <span>Exclusive offers • Up to 30% off • Secure checkout</span>
      </p>
      <div class="mt-2 inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
          </svg>
          <span>Hurry! Prices increase in <span id="countdownTimer" class="font-bold">23:59:59</span></span>
        </span>
      </div>
    </div>
    
   
            <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
              
    
    <!-- Enhanced decorative elements -->
    <div class="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-yellow-400 to-transparent rounded-full opacity-30 transform translate-x-10 -translate-y-10"></div>
    <div class="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-red-500 to-transparent rounded-full opacity-20 transform -translate-x-10 translate-y-10"></div>
    
    <!-- Decorative wave divider -->
    <div class="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
      <svg class="relative block w-full h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  
  <!-- Premium badge -->
  <div class="absolute top-0 right-0 transform translate-x-4 -translate-y-4 z-10">
    <div class="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform -rotate-12">
      PREMIUM DEALS
    </div>
  </div>
  
  <!-- Form content -->
  <div class="p-5 sm:p-7 pt-8 sm:pt-10 max-h-[calc(100vh-220px)] overflow-y-auto">
    <!-- Trust badges -->
    <div class="flex justify-center space-x-4 mb-6 border-b border-gray-100 pb-4">
      <div class="flex items-center text-xs text-gray-600">
        <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        Secure Booking
      </div>
      <div class="flex items-center text-xs text-gray-600">
        <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
        </svg>
        Best Price
      </div>
      <div class="flex items-center text-xs text-gray-600">
        <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
        </svg>
        5★ Experiences
      </div>
    </div>
    
    <form id="kashmirBookingForm" class="space-y-5">
      <!-- Package selection with enhanced styling -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Your Dream Package</label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${packageOptionsHTML}
        </div>
      </div>
      
      <!-- Package details section with improved styling -->
      <div class="bg-orange-50 p-5 rounded-lg border border-orange-100 shadow-sm mb-5">
        <div class="flex items-center mb-3">
          <svg class="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path>
          </svg>
          <h4 class="font-bold text-lg text-gray-800" id="packageTitle">${packageData.package1.name}</h4>
        </div>
        <p class="text-gray-600 mb-3" id="packageDescription">${packageData.package1.description}</p>
        
        ${packageDetailsTabsHTML}
      </div>
      
      <!-- Order summary with improved design -->
      <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm mb-5">
        <h4 class="font-medium flex items-center mb-3 text-gray-800">
          <svg class="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
          </svg>
          Order Summary
        </h4>
        <div class="flex justify-between items-center text-sm mb-1">
          <span class="text-gray-700">Package: <span id="selectedPackageName" class="font-medium">${packageData.package1.name}</span></span>
          <span id="packageBasePrice" class="text-gray-700">₹${packageData.package1.price.toLocaleString()}</span>
        </div>
        <div class="flex justify-between items-center text-sm mb-1">
          <span class="text-gray-700">Duration:</span>
          <span id="packageDuration" class="text-gray-700">${packageData.package1.duration}</span>
        </div>
        <div class="flex justify-between items-center text-sm mb-1">
          <span class="text-gray-700 flex items-center">
            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            Special offer discount:
          </span>
          <span class="text-green-600 font-medium">-₹<span id="specialDiscount">${(packageData.package1.price - packageData.package1.discountedPrice).toLocaleString()}</span></span>
        </div>
        <div id="promoDiscountRow" class="justify-between items-center text-sm mb-1 hidden">
          <span class="text-gray-700 flex items-center">
            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
            </svg>
            Promo code discount: <span id="promoCodeLabel" class="font-medium"></span>
          </span>
          <span class="text-green-600 font-medium">-₹<span id="promoDiscount">0</span></span>
        </div>
        <div class="flex justify-between font-bold pt-2 border-t mt-2 text-lg">
          <span class="text-gray-800">Total:</span>
          <span class="text-orange-600">₹<span id="totalPrice">${packageData.package1.discountedPrice.toLocaleString()}</span></span>
        </div>
        
        <!-- Limited time banner -->
        <div class="mt-3 bg-amber-50 border border-amber-200 rounded-md p-2 flex items-center">
          <svg class="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-xs text-amber-800">Price includes all taxes and fees. Limited slots available at this price!</span>
        </div>
      </div>
      
      <!-- Two columns layout with improved design -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Personal information -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <input type="text" name="fullName" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input type="email" name="email" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <input type="tel" name="phone" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
          <div class="flex items-center">
            <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input type="number" name="travelers" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
            <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Date selection with icon -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <input type="date" name="travelDate" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <p class="mt-1 text-xs text-orange-600">
          <svg class="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          Tip: Book early to secure the best rates and availability!
        </p>
      </div>
      
      <!-- Special requests with improved styling -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
        <div class="relative">
          <textarea name="specialRequests" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
        </div>
      </div>
      
      <!-- Promo code with improved styling -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
        <div class="flex items-center space-x-2">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <input type="text" name="promoCode"" id="promoCode"" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter promo code">
            </div>
            <button type="button" id="applyPromo" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Apply
            </button>
          </div>
          <p id="promoMessage" class="mt-1 text-xs text-green-600 hidden">
            <svg class="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span id="promoMessageText"></span>
          </p>
        </div>
        
        <!-- Terms and conditions with checkbox -->
        <div class="mt-4">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="terms" name="terms" type="checkbox" class="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded" required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700">I agree to the Terms and Conditions</label>
              <p class="text-gray-500">By checking this box, you agree to our <a href="#" class="text-orange-600 hover:text-orange-500">Terms of Service</a> and <a href="#" class="text-orange-600 hover:text-orange-500">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
        
        <!-- Submit button with enhanced styling -->
        <div class="mt-6">
          <button type="submit" id="submitBooking" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all active:scale-95">
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Secure Your Booking Now
            </span>
          </button>
          <p class="mt-2 text-center text-sm text-gray-500">
            <span class="flex items-center justify-center">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Secure payment • No booking fees • Best price guarantee
            </span>
          </p>
        </div>
      </form>
      
      <!-- Customer reviews -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h4 class="font-bold text-gray-700 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          Customer Reviews
        </h4>
        <div class="flex items-center mb-4">
          <div class="flex text-amber-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <p class="ml-2 text-gray-700 font-medium">4.9 out of 5</p>
          <span class="ml-2 text-sm text-gray-500">(Based on 246 reviews)</span>
        </div>
        
        <div class="space-y-4">
          <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-3">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  RA
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-800">Rahul A.</p>
                <div class="flex text-amber-400 text-xs mb-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-600">The Premium package was worth every rupee! Our guide was knowledgeable and the accommodations were top-notch. Will definitely recommend to friends!</p>
                <p class="text-xs text-gray-500 mt-1">Traveled March 2025</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-3">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  SP
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-800">Sneha P.</p>
                <div class="flex text-amber-400 text-xs mb-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-600">Stunning landscapes and excellent service! The booking process was so easy, and the itinerary was perfect. Can't wait to return!</p>
                <p class="text-xs text-gray-500 mt-1">Traveled February 2025</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <a href="#" class="text-orange-600 hover:text-orange-500 text-sm font-medium inline-flex items-center">
            Read all 246 reviews
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
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
      let currentPackage = packageData.package1.shortName;
      let currentPromoCode = null;
      let promoDiscountPercent = 0;
      
      // Initial order summary setup
      updateOrderSummary();
      updatePackageDetails(packageData.package1);
      
      // Function to update the order summary
      function updateOrderSummary() {
        // Find the package data for the current selection
        const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
        
        if (!selectedPackageData) {
          console.error('Package not found:', currentPackage);
          return;
        }
        
        const basePrice = selectedPackageData.price;
        const specialDiscountAmount = basePrice - selectedPackageData.discountedPrice;
        let promoDiscountAmount = 0;
        
        // Calculate promo discount if applicable
        if (promoDiscountPercent > 0) {
          promoDiscountAmount = Math.round(selectedPackageData.discountedPrice * (promoDiscountPercent / 100));
          document.getElementById('promoDiscountRow').classList.remove('hidden');
          document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
          document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
        } else {
          document.getElementById('promoDiscountRow').classList.add('hidden');
        }
        
        // Calculate total price
        const totalPrice = selectedPackageData.discountedPrice - promoDiscountAmount;
        
        // Update display
        document.getElementById('selectedPackageName').textContent = selectedPackageData.name;
        document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
        document.getElementById('packageDuration').textContent = selectedPackageData.duration;
        document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
        document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
      }
      
      // Function to update package details when package selection changes
      function updatePackageDetails(pkg) {
        document.getElementById('packageTitle').textContent = pkg.name;
        document.getElementById('packageDescription').textContent = pkg.description;
        
        // Update the active tab content
        const activeTab = document.querySelector('.tab-button[data-tab].border-orange-500')?.dataset.tab || 'overview';
        showTabContent(activeTab, pkg);
      }
      
      // Function to show content for a specific tab
      function showTabContent(tabName, pkg) {
        const tabContent = document.getElementById('tab-content');
        
        switch(tabName) {
          case 'overview':
            // Generate highlights HTML
            const highlightsHTML = pkg.highlights.map(highlight => 
              `<li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ${highlight}
              </li>`
            ).join('');
            
            tabContent.innerHTML = `
              <div>
                <h5 class="font-medium mb-2">Trip Highlights</h5>
                <ul class="space-y-2">
                  ${highlightsHTML}
                </ul>
              </div>
            `;
            break;
            
          case 'itinerary':
            // Generate itinerary HTML
            const itineraryHTML = pkg.itinerary.map(day => `
              <div class="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                <div class="flex items-center">
                  <span class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-800 font-medium">
                    ${day.day}
                  </span>
                  <h5 class="ml-3 font-medium">${day.title}</h5>
                </div>
                <p class="mt-2 ml-11 text-gray-600">${day.description}</p>
              </div>
            `).join('');
            
            tabContent.innerHTML = `
              <div>
                <h5 class="font-medium mb-2">Detailed Itinerary</h5>
                <div class="space-y-2">
                  ${itineraryHTML}
                </div>
              </div>
            `;
            break;
            
          case 'inclusions':
            // Generate inclusions and exclusions HTML
            const inclusionsHTML = pkg.inclusions.map(item => 
              `<li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ${item}
              </li>`
            ).join('');
            
            const exclusionsHTML = pkg.exclusions.map(item => 
              `<li class="flex items-start">
                <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                ${item}
              </li>`
            ).join('');
            
            tabContent.innerHTML = `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 class="font-medium mb-2">What's Included</h5>
                  <ul class="space-y-2">
                    ${inclusionsHTML}
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium mb-2">What's Not Included</h5>
                  <ul class="space-y-2">
                    ${exclusionsHTML}
                  </ul>
                </div>
              </div>
            `;
            break;
        }
      }
      
      // Tab switching functionality
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
          // Update active tab styling
          document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('border-orange-500', 'text-orange-600');
            btn.classList.add('border-transparent', 'text-gray-500');
          });
          
          this.classList.remove('border-transparent', 'text-gray-500');
          this.classList.add('border-orange-500', 'text-orange-600');
          
          // Find the current package data
          const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
          
          if (selectedPackageData) {
            showTabContent(this.dataset.tab, selectedPackageData);
          }
        });
      });
      
      // Listen for package selection changes
      document.querySelectorAll('input[name="package"]').forEach(radio => {
        radio.addEventListener('change', function() {
          currentPackage = this.value;
          const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
          updateOrderSummary();
          updatePackageDetails(selectedPackageData);
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
      // Update the form submission handler in your showBookingForm function
document.getElementById('kashmirBookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  const submitButton = document.getElementById('submitBooking');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  `;
  
  try {
    // Get form values
    const form = e.target;
    const formData = new FormData(form);
    
    // Find the selected package data
    const selectedPackageData = Object.values(packageData).find(
      pkg => pkg.shortName === currentPackage
    );
    
    // Prepare booking data according to your schema
    const bookingData = {
      packageId: selectedPackageData.id,
      customerName: formData.get('fullName'), // Changed from 'name' to match your schema
      email: formData.get('email'),
      phone: formData.get('phone'),
      travelers: parseInt(formData.get('travelers')),
      travelDate: formData.get('travelDate'),
      specialRequests: formData.get('specialRequests'),
      promoCode: currentPromoCode,
      originalAmount: selectedPackageData.price,
      discountAmount: selectedPackageData.price - selectedPackageData.discountedPrice,
      finalAmount: parseInt(document.getElementById('totalPrice').textContent.replace(/,/g, '')),
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    // Send to API
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Close the form
    closeBookingForm(bookingForm);
    
    // Show success message
    showSuccessMessage(currentPackage, currentPromoCode, packageData, result);
    
  } catch (error) {
    console.error('Booking error:', error);
    
    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    errorMessage.textContent = 'Booking failed. Please try again.';
    
    document.body.appendChild(errorMessage);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 5000);
    
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
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
      
      // Add ESC key to close form
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeBookingForm(bookingForm);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }
    
   
    function showSuccessMessage(packageCode, promoCode, packageData) {
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
      // Find the package data for the selected package
      const selectedPackage = Object.values(packageData).find(pkg => pkg.shortName === packageCode);
      
      if (!selectedPackage) {
        console.error('Package not found for success message:', packageCode);
        return;
      }
      
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
          <p class="mt-2 text-gray-600">Your ${selectedPackage.name} (${selectedPackage.duration}) is confirmed. We've sent the details to your email.</p>
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
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          successMessage.classList.remove('opacity-100');
          successMessage.classList.add('opacity-0');
          const messageContent = successMessage.querySelector('div');
          messageContent.classList.remove('scale-100');
          messageContent.classList.add('scale-95');
          
          setTimeout(() => {
            document.body.removeChild(successMessage);
          }, 300);
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }
  } catch (error) {
    console.error('Error in handleDiscoverPackages:', error);
    // Show error message to user
    const errorPopup = document.createElement('div');
    errorPopup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    errorPopup.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-xl font-bold mt-4">Something Went Wrong</h3>
          <p class="mt-2 text-gray-600">We couldn't load the package information. Please try again later.</p>
          <button id="closeError" class="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            Close
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(errorPopup);
    document.getElementById('closeError').addEventListener('click', () => {
      document.body.removeChild(errorPopup);
    });
  }
};
    // Function to show success message
  //   function showSuccessMessage(packageCode, promoCode, packageData, bookingRef) {
  //     const successMessage = document.createElement('div');
  //     successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
  //     // Find the package data for the selected package
  //     const selectedPackage = Object.values(packageData).find(pkg => pkg.shortName === packageCode);
      
  //     successMessage.innerHTML = `
  //       <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95">
  //         <div class="text-center">
  //           <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
  //             <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  //             </svg>
  //           </div>
  //           <h3 class="mt-3 text-lg font-medium text-gray-900">Booking Confirmed!</h3>
  //           <div class="mt-4 bg-gray-50 p-4 rounded-lg">
  //             <p class="text-sm text-gray-600">Your reference number:</p>
  //             <p class="text-lg font-bold text-orange-600 mt-1">${bookingRef}</p>
  //           </div>
  //           <div class="mt-4 text-left">
  //             <p class="text-sm text-gray-600"><span class="font-medium">Package:</span> ${selectedPackage.name}</p>
  //             <p class="text-sm text-gray-600"><span class="font-medium">Duration:</span> ${selectedPackage.duration}</p>
  //             <p class="text-sm text-gray-600"><span class="font-medium">Total Price:</span> ₹${selectedPackage.discountedPrice.toLocaleString()}</p>
  //             ${promoCode ? `<p class="text-sm text-gray-600"><span class="font-medium">Promo Code Applied:</span> ${promoCode}</p>` : ''}
  //           </div>
  //           <div class="mt-6">
  //             <button id="closeSuccessMessage" type="button" class="w-full px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
  //               Done
  //             </button>
  //           </div>
  //           <div class="mt-4 text-center text-xs text-gray-500">
  //             <p>We've sent a confirmation to your email. Our travel expert will contact you shortly.</p>
  //           </div>
  //         </div>
  //       </div>
  //     `;
      
  //     // Add to body
  //     document.body.appendChild(successMessage);
      
  //     // Trigger animation
  //     setTimeout(() => {
  //       successMessage.classList.add('opacity-100');
  //       const messageContent = successMessage.querySelector('div');
  //       messageContent.classList.remove('scale-95');
  //       messageContent.classList.add('scale-100');
  //     }, 10);
      
  //     // Close functionality
  //     document.getElementById('closeSuccessMessage').addEventListener('click', () => {
  //       const messageContent = successMessage.querySelector('div');
  //       successMessage.classList.remove('opacity-100');
  //       successMessage.classList.add('opacity-0');
  //       messageContent.classList.remove('scale-100');
  //       messageContent.classList.add('scale-95');
        
  //       setTimeout(() => {
  //         document.body.removeChild(successMessage);
  //       }, 300);
  //     });
      
  //     // Close when clicking outside
  //     successMessage.addEventListener('click', (e) => {
  //       if (e.target === successMessage) {
  //         const messageContent = successMessage.querySelector('div');
  //         successMessage.classList.remove('opacity-100');
  //         successMessage.classList.add('opacity-0');
  //         messageContent.classList.remove('scale-100');
  //         messageContent.classList.add('scale-95');
          
  //         setTimeout(() => {
  //           document.body.removeChild(successMessage);
  //         }, 300);
  //       }
  //     });
      
  //     // Add ESC key to close message
  //     const handleEscKey = (e) => {
  //       if (e.key === 'Escape') {
  //         const messageContent = successMessage.querySelector('div');
  //         successMessage.classList.remove('opacity-100');
  //         successMessage.classList.add('opacity-0');
  //         messageContent.classList.remove('scale-100');
  //         messageContent.classList.add('scale-95');
          
  //         setTimeout(() => {
  //           document.body.removeChild(successMessage);
  //         }, 300);
  //         document.removeEventListener('keydown', handleEscKey);
  //       }
  //     };
      
  //     document.addEventListener('keydown', handleEscKey);
  //   }
  // }}

// const handleDiscoverPackages1 = async () => {
//   try {
//     // Fetch packages and promos data from API
//     const [packagesResponse, promosResponse] = await Promise.all([
//       fetch('http://localhost:5000/api/packages'),
//       fetch('http://localhost:5000/api/promos')
//     ]);
    
//     if (!packagesResponse.ok || !promosResponse.ok) {
//       throw new Error('Failed to fetch data from API');
//     }
    
//     const packagesData = await packagesResponse.json();
//     const promosData = await promosResponse.json();
    
//     // Filter out packages without necessary data
//     const validPackages = packagesData.data.filter(pkg => 
//       pkg.name && pkg.originalPrice && pkg.discountedPrice && pkg.duration
//     );
    
//     // Only proceed if we have valid packages
//     if (validPackages.length === 0) {
//       console.error('No valid packages found');
//       return;
//     }
    
//     // Create popup element
//     const popup = document.createElement('div');
//     popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
    
//     // Get the top 3 packages to display in the popup
//     const displayPackages = validPackages.slice(0, 3);
    
//     // Create popup content with dynamic package data
//     let packageRowsHTML = '';
//     displayPackages.forEach(pkg => {
//       const originalPrice = pkg.originalPrice.toLocaleString();
//       const discountedPrice = pkg.discountedPrice.toLocaleString();
//       const shortName = pkg.shortName || pkg.name;
      
//       packageRowsHTML += `
//         <div class="flex justify-between items-center mt-2">
//           <div>
//             <p class="font-medium">${shortName}</p>
//             <p class="text-xs text-gray-500">${pkg.duration}</p>
//           </div>
//           <p><span class="line-through text-gray-500">₹${originalPrice}</span> <span class="font-bold text-orange-600">₹${discountedPrice}</span></p>
//         </div>
//       `;
//     });
    
//     // Get offer details from the first valid package
//     const offerTitle = validPackages[0].offerTitle || 'Limited Time Offer!';
//     const offerDescription = validPackages[0].offerDescription || 'Save on Kashmir packages when you book this week.';
//     const offerExpiry = validPackages[0].offerExpiry ? new Date(validPackages[0].offerExpiry).toLocaleDateString() : 'Limited time only';
    
//     popup.innerHTML = `
//       <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 my-auto">
//         <div class="flex justify-between items-center mb-4">
//           <h3 class="text-lg sm:text-xl font-bold text-gray-900">Exclusive Kashmir Offers</h3>
//           <button id="closePopup" class="text-gray-500 hover:text-gray-700">
//             <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>
        
//         <div class="space-y-3 sm:space-y-4">
//           <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
//             <p class="font-bold text-amber-800">${offerTitle}</p>
//             <p class="text-amber-700">${offerDescription}</p>
//           </div>
          
//           <div class="border-t border-b py-3">
//             ${packageRowsHTML}
//           </div>
          
//           <button id="bookNowBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
//             Book Now & Save
//           </button>
          
//           <div class="mt-2 text-center">
//             <p class="text-sm text-gray-500">Offer valid until ${offerExpiry}</p>
//             <p class="text-xs text-gray-400 mt-1">Terms and conditions apply</p>
//           </div>
//         </div>
//       </div>
//     `;
    
//     // Add popup to body
//     document.body.appendChild(popup);
    
//     // Trigger animation after a small delay
//     setTimeout(() => {
//       popup.classList.add('opacity-100');
//       const popupContent = popup.querySelector('div');
//       popupContent.classList.remove('scale-95');
//       popupContent.classList.add('scale-100');
//     }, 10);
    
//     // Add close functionality
//     document.getElementById('closePopup').addEventListener('click', () => {
//       closePopup(popup);
//     });
    
//     // Close when clicking outside
//     popup.addEventListener('click', (e) => {
//       if (e.target === popup) {
//         closePopup(popup);
//       }
//     });
    
//     // Book Now button functionality
//     document.getElementById('bookNowBtn').addEventListener('click', () => {
//       // Close current popup
//       closePopup(popup);
      
//       // Create booking form popup
//       setTimeout(() => {
//         showBookingForm(validPackages, promosData);
//       }, 300);
//     });
    
//     // Helper function to close popup with animation
//     function closePopup(popupElement) {
//       const popupContent = popupElement.querySelector('div');
//       popupElement.classList.remove('opacity-100');
//       popupElement.classList.add('opacity-0');
//       popupContent.classList.remove('scale-100');
//       popupContent.classList.add('scale-95');
      
//       setTimeout(() => {
//         document.body.removeChild(popupElement);
//       }, 300);
//     }
//     function showBookingForm(packages, promosData) {
//       // Create booking form popup
//       const bookingForm = document.createElement('div');
//       bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
//       // Convert packages array to mapping object for easier reference
//       const packageData = {};
//       packages.slice(0, 3).forEach((pkg, index) => {
//         const key = index === 0 ? 'package1' : index === 1 ? 'package2' : 'package3';
//         const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
//         packageData[key] = {
//           id: pkg._id,
//           name: pkg.name,
//           shortName: shortName.toLowerCase(),
//           price: pkg.originalPrice,
//           discountedPrice: pkg.discountedPrice,
//           duration: pkg.duration,
//           description: pkg.description,
//           highlights: pkg.highlights || [],
//           inclusions: pkg.inclusions || [],
//           exclusions: pkg.exclusions || [],
//           itinerary: pkg.itinerary || []
//         };
//       });
      
//       // Convert promos array to mapping object for discount percentages
//       const promoCodes = {};
//       if (promosData && promosData.data) {
//         promosData.data.forEach(promo => {
//           if (promo.code && promo.discountPercentage) {
//             promoCodes[promo.code] = promo.discountPercentage;
//           }
//         });
//       }
      
//       // If no promos were found from API, use default promo codes
//       if (Object.keys(promoCodes).length === 0) {
//         Object.assign(promoCodes, {
//           'KASHMIR2025': 10,
//           'SPRING25': 15,
//           'FAMILY20': 20
//         });
//       }
      
//       // Generate package radio buttons dynamically
//       let packageOptionsHTML = '';
//       Object.keys(packageData).forEach((key, index) => {
//         const pkg = packageData[key];
//         packageOptionsHTML += `
//           <div class="package-option">
//             <input type="radio" id="${key}" name="package" value="${pkg.shortName}" class="hidden peer" ${index === 0 ? 'checked' : ''}>
//             <label for="${key}" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
//               <span class="block font-medium">${pkg.shortName}</span>
//               <span class="block text-orange-600 font-bold mt-1">₹<span id="${pkg.shortName}-price">${pkg.discountedPrice.toLocaleString()}</span></span>
//               <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
//             </label>
//           </div>
//         `;
//       });
      
//       // Create tabs for package details
//       const packageDetailsTabsHTML = `
//         <div class="mt-4 border-b border-gray-200">
//           <nav class="flex space-x-4">
//             <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-orange-500 text-orange-600" data-tab="overview">
//               Overview
//             </button>
//             <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="itinerary">
//               Itinerary
//             </button>
//             <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="inclusions">
//               Inclusions
//             </button>
//           </nav>
//         </div>
//         <div id="tab-content" class="mt-4"></div>
//       `;
      
//       // Create form content with dynamic data
//       bookingForm.innerHTML = `
//         <div class="bg-white rounded-xl p-0 max-w-2xl w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
//           <!-- Header with gradient background -->
//           <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-6 text-white relative">
//             <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
//             <p class="mt-1 opacity-90">Exclusive offers for limited time</p>
//             <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
//               <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
            
//             <!-- Decorative elements -->
//             <div class="absolute -bottom-6 left-0 w-full flex justify-between px-8">
//               <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
//                 <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                 </svg>
//               </div>
//               <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
//                 <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
          
//           <!-- Form content -->
//           <div class="p-4 sm:p-6 pt-8 sm:pt-10 max-h-[calc(100vh-200px)] overflow-y-auto">
//             <form id="kashmirBookingForm" class="space-y-4">
//               <!-- Package selection -->
//               <div class="mb-4 sm:mb-6">
//                 <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
//                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   ${packageOptionsHTML}
//                 </div>
//               </div>
              
//               <!-- Package details section -->
//               <div class="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h4 class="font-bold text-lg mb-2" id="packageTitle">${packageData.package1.name}</h4>
//                 <p class="text-gray-600 mb-3" id="packageDescription">${packageData.package1.description}</p>
                
//                 ${packageDetailsTabsHTML}
//               </div>
              
//               <!-- Order summary -->
//               <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h4 class="font-medium mb-2">Order Summary</h4>
//                 <div class="flex justify-between text-sm mb-1">
//                   <span>Package: <span id="selectedPackageName">${packageData.package1.name}</span></span>
//                   <span id="packageBasePrice">₹${packageData.package1.price.toLocaleString()}</span>
//                 </div>
//                 <div class="flex justify-between text-sm mb-1">
//                   <span>Duration:</span>
//                   <span id="packageDuration">${packageData.package1.duration}</span>
//                 </div>
//                 <div class="flex justify-between text-sm mb-1">
//                   <span>Special offer discount:</span>
//                   <span class="text-green-600">-₹<span id="specialDiscount">${(packageData.package1.price - packageData.package1.discountedPrice).toLocaleString()}</span></span>
//                 </div>
//                 <div id="promoDiscountRow" class="justify-between text-sm mb-1 hidden">
//                   <span>Promo code discount: <span id="promoCodeLabel"></span></span>
//                   <span class="text-green-600">-₹<span id="promoDiscount">0</span></span>
//                 </div>
//                 <div class="flex justify-between font-bold pt-2 border-t mt-2">
//                   <span>Total:</span>
//                   <span>₹<span id="totalPrice">${packageData.package1.discountedPrice.toLocaleString()}</span></span>
//                 </div>
//               </div>
              
//               <!-- Two columns layout -->
//               <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <!-- Personal information -->
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                   <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//                 <div>
//                   <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
//                   <div class="flex">
//                     <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200">-</button>
//                     <input type="number" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
//                     <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">+</button>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Date selection -->
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
//                 <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
//               </div>
              
//               <!-- Special requests -->
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
//                 <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
//               </div>
              
//               <!-- Promo code -->
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
//                 <div class="flex items-center space-x-2">
//                   <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
//                   <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
//                 </div>
//                 <div id="promoMessage" class="mt-1 text-sm hidden"></div>
//               </div>
              
//               <!-- Submit button -->
//               <div class="pt-2">
//                 <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
//                   <span>Secure Your Booking</span>
//                   <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
//                   </svg>
//                 </button>
//               </div>
              
//               <!-- Terms and conditions -->
//               <div class="text-center text-sm text-gray-500">
//                 <p>By booking, you agree to our <a href="#" class="text-orange-600 hover:underline">Terms & Conditions</a></p>
//               </div>
//             </form>
//           </div>
//         </div>
//       `;
      
//       // Add form to body
//       document.body.appendChild(bookingForm);
      
//       // Trigger animation
//       setTimeout(() => {
//         bookingForm.classList.add('opacity-100');
//         const formContent = bookingForm.querySelector('div');
//         formContent.classList.remove('scale-95');
//         formContent.classList.add('scale-100');
//       }, 10);
      
//       // Tracking variables for promo code 
//       let currentPackage = packageData.package1.shortName;
//       let currentPromoCode = null;
//       let promoDiscountPercent = 0;
      
//       // Initial order summary setup
//       updateOrderSummary();
//       updatePackageDetails(packageData.package1);
      
//       // Function to update the order summary
//       function updateOrderSummary() {
//         // Find the package data for the current selection
//         const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
        
//         if (!selectedPackageData) {
//           console.error('Package not found:', currentPackage);
//           return;
//         }
        
//         const basePrice = selectedPackageData.price;
//         const specialDiscountAmount = basePrice - selectedPackageData.discountedPrice;
//         let promoDiscountAmount = 0;
        
//         // Calculate promo discount if applicable
//         if (promoDiscountPercent > 0) {
//           promoDiscountAmount = Math.round(selectedPackageData.discountedPrice * (promoDiscountPercent / 100));
//           document.getElementById('promoDiscountRow').classList.remove('hidden');
//           document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
//           document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
//         } else {
//           document.getElementById('promoDiscountRow').classList.add('hidden');
//         }
        
//         // Calculate total price
//         const totalPrice = selectedPackageData.discountedPrice - promoDiscountAmount;
        
//         // Update display
//         document.getElementById('selectedPackageName').textContent = selectedPackageData.name;
//         document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
//         document.getElementById('packageDuration').textContent = selectedPackageData.duration;
//         document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
//         document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
//       }
      
//       // Function to update package details when package selection changes
//       function updatePackageDetails(pkg) {
//         document.getElementById('packageTitle').textContent = pkg.name;
//         document.getElementById('packageDescription').textContent = pkg.description;
        
//         // Update the active tab content
//         const activeTab = document.querySelector('.tab-button[data-tab].border-orange-500')?.dataset.tab || 'overview';
//         showTabContent(activeTab, pkg);
//       }
      
//       // Function to show content for a specific tab
//       function showTabContent(tabName, pkg) {
//         const tabContent = document.getElementById('tab-content');
        
//         switch(tabName) {
//           case 'overview':
//             // Generate highlights HTML
//             const highlightsHTML = pkg.highlights.map(highlight => 
//               `<li class="flex items-start">
//                 <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 ${highlight}
//               </li>`
//             ).join('');
            
//             tabContent.innerHTML = `
//               <div>
//                 <h5 class="font-medium mb-2">Trip Highlights</h5>
//                 <ul class="space-y-2">
//                   ${highlightsHTML}
//                 </ul>
//               </div>
//             `;
//             break;
            
//           case 'itinerary':
//             // Generate itinerary HTML
//             const itineraryHTML = pkg.itinerary.map(day => `
//               <div class="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
//                 <div class="flex items-center">
//                   <span class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-800 font-medium">
//                     ${day.day}
//                   </span>
//                   <h5 class="ml-3 font-medium">${day.title}</h5>
//                 </div>
//                 <p class="mt-2 ml-11 text-gray-600">${day.description}</p>
//               </div>
//             `).join('');
            
//             tabContent.innerHTML = `
//               <div>
//                 <h5 class="font-medium mb-2">Detailed Itinerary</h5>
//                 <div class="space-y-2">
//                   ${itineraryHTML}
//                 </div>
//               </div>
//             `;
//             break;
            
//           case 'inclusions':
//             // Generate inclusions and exclusions HTML
//             const inclusionsHTML = pkg.inclusions.map(item => 
//               `<li class="flex items-start">
//                 <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 ${item}
//               </li>`
//             ).join('');
            
//             const exclusionsHTML = pkg.exclusions.map(item => 
//               `<li class="flex items-start">
//                 <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 ${item}
//               </li>`
//             ).join('');
            
//             tabContent.innerHTML = `
//               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 class="font-medium mb-2">What's Included</h5>
//                   <ul class="space-y-2">
//                     ${inclusionsHTML}
//                   </ul>
//                 </div>
//                 <div>
//                   <h5 class="font-medium mb-2">What's Not Included</h5>
//                   <ul class="space-y-2">
//                     ${exclusionsHTML}
//                   </ul>
//                 </div>
//               </div>
//             `;
//             break;
//         }
//       }
      
//       // Tab switching functionality
//       document.querySelectorAll('.tab-button').forEach(button => {
//         button.addEventListener('click', function() {
//           // Update active tab styling
//           document.querySelectorAll('.tab-button').forEach(btn => {
//             btn.classList.remove('border-orange-500', 'text-orange-600');
//             btn.classList.add('border-transparent', 'text-gray-500');
//           });
          
//           this.classList.remove('border-transparent', 'text-gray-500');
//           this.classList.add('border-orange-500', 'text-orange-600');
          
//           // Find the current package data
//           const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
          
//           if (selectedPackageData) {
//             showTabContent(this.dataset.tab, selectedPackageData);
//           }
//         });
//       });
      
//       // Listen for package selection changes
//       document.querySelectorAll('input[name="package"]').forEach(radio => {
//         radio.addEventListener('change', function() {
//           currentPackage = this.value;
//           const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
//           updateOrderSummary();
//           updatePackageDetails(selectedPackageData);
//         });
//       });
      
//       // Rest of your existing event listeners and functions...
//       // (Keep all the existing code for promo code, travelers, form submission, etc.)
      
//       // Handle promo code application
//       document.getElementById('applyPromo').addEventListener('click', function() {
//         const promoInput = document.getElementById('promoCode');
//         const enteredCode = promoInput.value.trim().toUpperCase();
//         const messageDiv = document.getElementById('promoMessage');
        
//         // Reset message styling
//         messageDiv.className = 'mt-1 text-sm';
        
//         if (!enteredCode) {
//           messageDiv.textContent = 'Please enter a promo code.';
//           messageDiv.classList.add('text-orange-600');
//           messageDiv.classList.remove('hidden');
//           return;
//         }
        
//         if (promoCodes[enteredCode]) {
//           // Valid promo code
//           promoDiscountPercent = promoCodes[enteredCode];
//           currentPromoCode = enteredCode;
          
//           messageDiv.textContent = `Success! ${promoDiscountPercent}% additional discount applied.`;
//           messageDiv.classList.add('text-green-600');
//           messageDiv.classList.remove('hidden');
          
//           updateOrderSummary();
//         } else {
//           // Invalid promo code
//           promoDiscountPercent = 0;
//           currentPromoCode = null;
          
//           messageDiv.textContent = 'Invalid promo code. Please try again.';
//           messageDiv.classList.add('text-red-600');
//           messageDiv.classList.remove('hidden');
          
//           document.getElementById('promoDiscountRow').classList.add('hidden');
//           updateOrderSummary();
//         }
//       });
      
//       // Add close functionality
//       document.getElementById('closeBookingForm').addEventListener('click', () => {
//         closeBookingForm(bookingForm);
//       });
      
//       // Close when clicking outside
//       bookingForm.addEventListener('click', (e) => {
//         if (e.target === bookingForm) {
//           closeBookingForm(bookingForm);
//         }
//       });
      
//       // Handle travelers count
//       document.getElementById('decreaseTravelers').addEventListener('click', () => {
//         const travelersInput = document.getElementById('travelers');
//         if (parseInt(travelersInput.value) > 1) {
//           travelersInput.value = parseInt(travelersInput.value) - 1;
//         }
//       });
      
//       document.getElementById('increaseTravelers').addEventListener('click', () => {
//         const travelersInput = document.getElementById('travelers');
//         if (parseInt(travelersInput.value) < 10) {
//           travelersInput.value = parseInt(travelersInput.value) + 1;
//         }
//       });
      
//       // Form submission
//       document.getElementById('kashmirBookingForm').addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Show loading state
//         const submitButton = document.getElementById('submitBooking');
//         const originalText = submitButton.innerHTML;
//         submitButton.innerHTML = `
//           <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Processing...
//         `;
        
//         // Simulate form processing
//         setTimeout(() => {
//           // Close the form
//           closeBookingForm(bookingForm);
          
//           // Show success message
//           setTimeout(() => {
//             showSuccessMessage(currentPackage, currentPromoCode, packageData);
//           }, 300);
//         }, 1500);
//       });
      
//       // Helper function to close booking form with animation
//       function closeBookingForm(formElement) {
//         const formContent = formElement.querySelector('div');
//         formElement.classList.remove('opacity-100');
//         formElement.classList.add('opacity-0');
//         formContent.classList.remove('scale-100');
//         formContent.classList.add('scale-95');
        
//         setTimeout(() => {
//           document.body.removeChild(formElement);
//         }, 300);
//       }
      
//       // Add ESC key to close form
//       const handleEscKey = (e) => {
//         if (e.key === 'Escape') {
//           closeBookingForm(bookingForm);
//           document.removeEventListener('keydown', handleEscKey);
//         }
//       };
      
//       document.addEventListener('keydown', handleEscKey);
//     }
//     // Function to show booking form
//     // function showBookingForm(packages, promosData) {
//     //   // Create booking form popup
//     //   const bookingForm = document.createElement('div');
//     //   bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
//     //   // Convert packages array to mapping object for easier reference
//     //   const packageData = {};
//     //   packages.slice(0, 3).forEach((pkg, index) => {
//     //     const key = index === 0 ? 'package1' : index === 1 ? 'package2' : 'package3';
//     //     const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
//     //     packageData[key] = {
//     //       id: pkg._id,
//     //       name: pkg.name,
//     //       shortName: shortName.toLowerCase(),
//     //       price: pkg.originalPrice,
//     //       discountedPrice: pkg.discountedPrice,
//     //       duration: pkg.duration
//     //     };
//     //   });
      
//     //   // Convert promos array to mapping object for discount percentages
//     //   const promoCodes = {};
//     //   if (promosData && promosData.data) {
//     //     promosData.data.forEach(promo => {
//     //       if (promo.code && promo.discountPercentage) {
//     //         promoCodes[promo.code] = promo.discountPercentage;
//     //       }
//     //     });
//     //   }
      
//     //   // If no promos were found from API, use default promo codes
//     //   if (Object.keys(promoCodes).length === 0) {
//     //     Object.assign(promoCodes, {
//     //       'KASHMIR2025': 10,
//     //       'SPRING25': 15,
//     //       'FAMILY20': 20
//     //     });
//     //   }
      
//     //   // Generate package radio buttons dynamically
//     //   let packageOptionsHTML = '';
//     //   Object.keys(packageData).forEach((key, index) => {
//     //     const pkg = packageData[key];
//     //     packageOptionsHTML += `
//     //       <div class="package-option">
//     //         <input type="radio" id="${key}" name="package" value="${pkg.shortName}" class="hidden peer" ${index === 0 ? 'checked' : ''}>
//     //         <label for="${key}" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
//     //           <span class="block font-medium">${pkg.shortName}</span>
//     //           <span class="block text-orange-600 font-bold mt-1">₹<span id="${pkg.shortName}-price">${pkg.discountedPrice.toLocaleString()}</span></span>
//     //           <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
//     //         </label>
//     //       </div>
//     //     `;
//     //   });
      
//     //   // Create form content with dynamic data
//     //   bookingForm.innerHTML = `
//     //     <div class="bg-white rounded-xl p-0 max-w-lg w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
//     //       <!-- Header with gradient background -->
//     //       <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-6 text-white relative">
//     //         <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
//     //         <p class="mt-1 opacity-90">Exclusive offers for limited time</p>
//     //         <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
//     //           <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//     //           </svg>
//     //         </button>
            
//     //         <!-- Decorative elements -->
//     //         <div class="absolute -bottom-6 left-0 w-full flex justify-between px-8">
//     //           <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
//     //             <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//     //             </svg>
//     //           </div>
//     //           <div class="h-12 w-12 bg-white rounded-full transform -translate-y-6 flex items-center justify-center">
//     //             <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     //             </svg>
//     //           </div>
//     //         </div>
//     //       </div>
          
//     //       <!-- Form content -->
//     //       <div class="p-4 sm:p-6 pt-8 sm:pt-10 max-h-[calc(100vh-200px)] overflow-y-auto">
//     //         <form id="kashmirBookingForm" class="space-y-4">
//     //           <!-- Package selection -->
//     //           <div class="mb-4 sm:mb-6">
//     //             <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
//     //             <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
//     //               ${packageOptionsHTML}
//     //             </div>
//     //           </div>
              
//     //           <!-- Order summary -->
//     //           <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg mb-4">
//     //             <h4 class="font-medium mb-2">Order Summary</h4>
//     //             <div class="flex justify-between text-sm mb-1">
//     //               <span>Package: <span id="selectedPackageName">${packageData.package1.name}</span></span>
//     //               <span id="packageBasePrice">₹${packageData.package1.price.toLocaleString()}</span>
//     //             </div>
//     //             <div class="flex justify-between text-sm mb-1">
//     //               <span>Duration:</span>
//     //               <span id="packageDuration">${packageData.package1.duration}</span>
//     //             </div>
//     //             <div class="flex justify-between text-sm mb-1">
//     //               <span>Special offer discount:</span>
//     //               <span class="text-green-600">-₹<span id="specialDiscount">${(packageData.package1.price - packageData.package1.discountedPrice).toLocaleString()}</span></span>
//     //             </div>
//     //             <div id="promoDiscountRow" class="justify-between text-sm mb-1 hidden">
//     //               <span>Promo code discount: <span id="promoCodeLabel"></span></span>
//     //               <span class="text-green-600">-₹<span id="promoDiscount">0</span></span>
//     //             </div>
//     //             <div class="flex justify-between font-bold pt-2 border-t mt-2">
//     //               <span>Total:</span>
//     //               <span>₹<span id="totalPrice">${packageData.package1.discountedPrice.toLocaleString()}</span></span>
//     //             </div>
//     //           </div>
              
//     //           <!-- Two columns layout -->
//     //           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //             <!-- Personal information -->
//     //             <div>
//     //               <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//     //               <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//     //             </div>
//     //             <div>
//     //               <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
//     //               <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//     //             </div>
//     //             <div>
//     //               <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//     //               <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//     //             </div>
//     //             <div>
//     //               <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
//     //               <div class="flex">
//     //                 <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200">-</button>
//     //                 <input type="number" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
//     //                 <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">+</button>
//     //               </div>
//     //             </div>
//     //           </div>
              
//     //           <!-- Date selection -->
//     //           <div>
//     //             <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
//     //             <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
//     //           </div>
              
//     //           <!-- Special requests -->
//     //           <div>
//     //             <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
//     //             <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
//     //           </div>
              
//     //           <!-- Promo code -->
//     //           <div>
//     //             <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
//     //             <div class="flex items-center space-x-2">
//     //               <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
//     //               <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
//     //             </div>
//     //             <div id="promoMessage" class="mt-1 text-sm hidden"></div>
//     //           </div>
              
//     //           <!-- Submit button -->
//     //           <div class="pt-2">
//     //             <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
//     //               <span>Secure Your Booking</span>
//     //               <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
//     //               </svg>
//     //             </button>
//     //           </div>
              
//     //           <!-- Terms and conditions -->
//     //           <div class="text-center text-sm text-gray-500">
//     //             <p>By booking, you agree to our <a href="#" class="text-orange-600 hover:underline">Terms & Conditions</a></p>
//     //           </div>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   `;
      
//     //   // Add form to body
//     //   document.body.appendChild(bookingForm);
      
//     //   // Trigger animation
//     //   setTimeout(() => {
//     //     bookingForm.classList.add('opacity-100');
//     //     const formContent = bookingForm.querySelector('div');
//     //     formContent.classList.remove('scale-95');
//     //     formContent.classList.add('scale-100');
//     //   }, 10);
      
//     //   // Tracking variables for promo code 
//     //   let currentPackage = packageData.package1.shortName;
//     //   let currentPromoCode = null;
//     //   let promoDiscountPercent = 0;
      
//     //   // Initial order summary setup
//     //   updateOrderSummary();
      
//     //   // Function to update the order summary
//     //   function updateOrderSummary() {
//     //     // Find the package data for the current selection
//     //     const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
        
//     //     if (!selectedPackageData) {
//     //       console.error('Package not found:', currentPackage);
//     //       return;
//     //     }
        
//     //     const basePrice = selectedPackageData.price;
//     //     const specialDiscountAmount = basePrice - selectedPackageData.discountedPrice;
//     //     let promoDiscountAmount = 0;
        
//     //     // Calculate promo discount if applicable
//     //     if (promoDiscountPercent > 0) {
//     //       promoDiscountAmount = Math.round(selectedPackageData.discountedPrice * (promoDiscountPercent / 100));
//     //       document.getElementById('promoDiscountRow').classList.remove('hidden');
//     //       document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
//     //       document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
//     //     } else {
//     //       document.getElementById('promoDiscountRow').classList.add('hidden');
//     //     }
        
//     //     // Calculate total price
//     //     const totalPrice = selectedPackageData.discountedPrice - promoDiscountAmount;
        
//     //     // Update display
//     //     document.getElementById('selectedPackageName').textContent = selectedPackageData.name;
//     //     document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
//     //     document.getElementById('packageDuration').textContent = selectedPackageData.duration;
//     //     document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
//     //     document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
//     //   }
      
//     //   // Listen for package selection changes
//     //   document.querySelectorAll('input[name="package"]').forEach(radio => {
//     //     radio.addEventListener('change', function() {
//     //       currentPackage = this.value;
//     //       updateOrderSummary();
//     //     });
//     //   });
      
//     //   // Handle promo code application
//     //   document.getElementById('applyPromo').addEventListener('click', function() {
//     //     const promoInput = document.getElementById('promoCode');
//     //     const enteredCode = promoInput.value.trim().toUpperCase();
//     //     const messageDiv = document.getElementById('promoMessage');
        
//     //     // Reset message styling
//     //     messageDiv.className = 'mt-1 text-sm';
        
//     //     if (!enteredCode) {
//     //       messageDiv.textContent = 'Please enter a promo code.';
//     //       messageDiv.classList.add('text-orange-600');
//     //       messageDiv.classList.remove('hidden');
//     //       return;
//     //     }
        
//     //     if (promoCodes[enteredCode]) {
//     //       // Valid promo code
//     //       promoDiscountPercent = promoCodes[enteredCode];
//     //       currentPromoCode = enteredCode;
          
//     //       messageDiv.textContent = `Success! ${promoDiscountPercent}% additional discount applied.`;
//     //       messageDiv.classList.add('text-green-600');
//     //       messageDiv.classList.remove('hidden');
          
//     //       updateOrderSummary();
//     //     } else {
//     //       // Invalid promo code
//     //       promoDiscountPercent = 0;
//     //       currentPromoCode = null;
          
//     //       messageDiv.textContent = 'Invalid promo code. Please try again.';
//     //       messageDiv.classList.add('text-red-600');
//     //       messageDiv.classList.remove('hidden');
          
//     //       document.getElementById('promoDiscountRow').classList.add('hidden');
//     //       updateOrderSummary();
//     //     }
//     //   });
      
//     //   // Add close functionality
//     //   document.getElementById('closeBookingForm').addEventListener('click', () => {
//     //     closeBookingForm(bookingForm);
//     //   });
      
//     //   // Close when clicking outside
//     //   bookingForm.addEventListener('click', (e) => {
//     //     if (e.target === bookingForm) {
//     //       closeBookingForm(bookingForm);
//     //     }
//     //   });
      
//     //   // Handle travelers count
//     //   document.getElementById('decreaseTravelers').addEventListener('click', () => {
//     //     const travelersInput = document.getElementById('travelers');
//     //     if (parseInt(travelersInput.value) > 1) {
//     //       travelersInput.value = parseInt(travelersInput.value) - 1;
//     //     }
//     //   });
      
//     //   document.getElementById('increaseTravelers').addEventListener('click', () => {
//     //     const travelersInput = document.getElementById('travelers');
//     //     if (parseInt(travelersInput.value) < 10) {
//     //       travelersInput.value = parseInt(travelersInput.value) + 1;
//     //     }
//     //   });
      
//     //   // Form submission
//     //   document.getElementById('kashmirBookingForm').addEventListener('submit', (e) => {
//     //     e.preventDefault();
        
//     //     // Show loading state
//     //     const submitButton = document.getElementById('submitBooking');
//     //     const originalText = submitButton.innerHTML;
//     //     submitButton.innerHTML = `
//     //       <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//     //         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//     //         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//     //       </svg>
//     //       Processing...
//     //     `;
        
//     //     // Simulate form processing
//     //     setTimeout(() => {
//     //       // Close the form
//     //       closeBookingForm(bookingForm);
          
//     //       // Show success message
//     //       setTimeout(() => {
//     //         showSuccessMessage(currentPackage, currentPromoCode, packageData);
//     //       }, 300);
//     //     }, 1500);
//     //   });
      
//     //   // Helper function to close booking form with animation
//     //   function closeBookingForm(formElement) {
//     //     const formContent = formElement.querySelector('div');
//     //     formElement.classList.remove('opacity-100');
//     //     formElement.classList.add('opacity-0');
//     //     formContent.classList.remove('scale-100');
//     //     formContent.classList.add('scale-95');
        
//     //     setTimeout(() => {
//     //       document.body.removeChild(formElement);
//     //     }, 300);
//     //   }
      
//     //   // Add ESC key to close form
//     //   const handleEscKey = (e) => {
//     //     if (e.key === 'Escape') {
//     //       closeBookingForm(bookingForm);
//     //       document.removeEventListener('keydown', handleEscKey);
//     //     }
//     //   };
      
//     //   document.addEventListener('keydown', handleEscKey);
//     // }
    
//     // Function to show success message
//     function showSuccessMessage(packageCode, promoCode, packageData) {
//       const successMessage = document.createElement('div');
//       successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
//       // Find the package data for the selected package
//       const selectedPackage = Object.values(packageData).find(pkg => pkg.shortName === packageCode);
      
//       if (!selectedPackage) {
//         console.error('Package not found for success message:', packageCode);
//         return;
//       }
      
//       // Generate a random booking reference
//       const bookingRef = 'KASH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
//       // Create promo text if applicable
//       const promoText = promoCode ? `<p class="mt-1 text-gray-600">Promo code applied: <span class="font-medium">${promoCode}</span></p>` : '';
      
//       successMessage.innerHTML = `
//         <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 text-center">
//           <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
//             <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//             </svg>
//           </div>
//           <h3 class="text-xl sm:text-2xl font-bold mt-4">Booking Successful!</h3>
//           <p class="mt-2 text-gray-600">Your ${selectedPackage.name} (${selectedPackage.duration}) is confirmed. We've sent the details to your email.</p>
//           <p class="mt-1 text-gray-600">Booking reference: <span class="font-medium">${bookingRef}</span></p>
//           ${promoText}
//           <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
//             Continue
//           </button>
//         </div>
//       `;
      
//       document.body.appendChild(successMessage);
//       setTimeout(() => {
//         successMessage.classList.add('opacity-100');
//         const messageContent = successMessage.querySelector('div');
//         messageContent.classList.remove('scale-95');
//         messageContent.classList.add('scale-100');
//       }, 10);
      
//       // Close success message when the continue button is clicked
//       document.getElementById('closeSuccess').addEventListener('click', () => {
//         successMessage.classList.remove('opacity-100');
//         successMessage.classList.add('opacity-0');
//         const messageContent = successMessage.querySelector('div');
//         messageContent.classList.remove('scale-100');
//         messageContent.classList.add('scale-95');
        
//         setTimeout(() => {
//           document.body.removeChild(successMessage);
//         }, 300);
//       });
      
//       // Close when clicking outside
//       successMessage.addEventListener('click', (e) => {
//         if (e.target === successMessage) {
//           successMessage.classList.remove('opacity-100');
//           successMessage.classList.add('opacity-0');
//           const messageContent = successMessage.querySelector('div');
//           messageContent.classList.remove('scale-100');
//           messageContent.classList.add('scale-95');
          
//           setTimeout(() => {
//             document.body.removeChild(successMessage);
//           }, 300);
//         }
//       });
      
//       // Add ESC key to close success message
//       const handleEscKey = (e) => {
//         if (e.key === 'Escape') {
//           successMessage.classList.remove('opacity-100');
//           successMessage.classList.add('opacity-0');
//           const messageContent = successMessage.querySelector('div');
//           messageContent.classList.remove('scale-100');
//           messageContent.classList.add('scale-95');
          
//           setTimeout(() => {
//             document.body.removeChild(successMessage);
//           }, 300);
//           document.removeEventListener('keydown', handleEscKey);
//         }
//       };
      
//       document.addEventListener('keydown', handleEscKey);
//     }
//   } catch (error) {
//     console.error('Error in handleDiscoverPackages:', error);
//     // Show error message to user
//     const errorPopup = document.createElement('div');
//     errorPopup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
//     errorPopup.innerHTML = `
//       <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
//         <div class="text-center">
//           <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//           </svg>
//           <h3 class="text-xl font-bold mt-4">Something Went Wrong</h3>
//           <p class="mt-2 text-gray-600">We couldn't load the package information. Please try again later.</p>
//           <button id="closeError" class="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     `;
    
//     document.body.appendChild(errorPopup);
//     document.getElementById('closeError').addEventListener('click', () => {
//       document.body.removeChild(errorPopup);
//     });
//   }
// };
// Helper function for booking form (would need similar defensive programming)
// function showBookingForm(packages, promos) {
//   // Implement similar to your existing booking form with proper null checks
//   console.log('Showing booking form for:', packages, promos);
// }
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

const handleDiscoverPackages = async () => {
  try {
    // Show loading state while fetching data
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingOverlay.innerHTML = `
      <div class="bg-white rounded-lg p-6 flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-orange-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-700">Loading packages...</p>
      </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Fetch packages data from API
    const packagesResponse = await fetch('http://localhost:5000/api/packages');
    const packagesData = await packagesResponse.json();
    // const packagesData = await packagesResponse.json();
    console.log('Packages Data:', packagesData);
    const packages = Array.isArray(packagesData.data) ? packagesData.data : [];
console.log('Packages:', packages);
    // Fetch promo codes from API
    const promosResponse = await fetch('http://localhost:5000/api/promos');
    const promosData = await promosResponse.json();
    console.log('Pres Data:', promosData)
    // Remove loading overlay
    document.body.removeChild(loadingOverlay);

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
    
    // Generate package list HTML dynamically
    // const packagesListHTML = packagesData.map(pkg => `
    //   <div class="flex justify-between items-center mt-2">
    //     <div>
    //       <p class="font-medium">${pkg.name}</p>
    //       <p class="text-xs text-gray-500">${pkg.duration}</p>
    //     </div>
    //     <p>
    //       <span class="line-through text-gray-500">₹${pkg.originalPrice.toLocaleString()}</span> 
    //       <span class="font-bold text-orange-600">₹${pkg.discountedPrice.toLocaleString()}</span>
    //     </p>
    //   </div>
    // `).join('');
    const packagesListHTML = packagesData.data.map(pkg => `
      <div class="flex justify-between items-center mt-2">
        <div>
          <p class="font-medium">${pkg.name}</p>
          <p class="text-xs text-gray-500">${pkg.duration}</p>
        </div>
        <p>
           <span class="line-through text-gray-500">₹$</span> 
          <span class="font-bold text-orange-600"></span>
        </p>
      </div>
    `).join('');
    

    // Create popup content with dynamic data
    popup.innerHTML = `
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 my-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900"> Offers</h3>
          <button id="closePopup" class="text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3 sm:space-y-4">
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p class="font-bold text-amber-800">${packagesData[0].offerTitle}</p>
            <p class="text-amber-700">${packagesData[0].offerDescription}</p>
          </div>
          
          <div class="border-t border-b py-3">
            ${packagesListHTML}
          </div>
          
          <!-- Promo code teaser -->
          <div class="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p class="font-medium text-blue-800 mb-1">Available Promo Codes:</p>
            <div class="flex flex-wrap gap-2">
              ${promosData.slice(0, 3).map(promo => `
                <span class="text-xs bg-white border border-blue-300 text-blue-700 px-2 py-1 rounded">
                  ${promo.code} (${promo.discount}% off)
                </span>
              `).join('')}
            </div>
            <p class="text-xs text-blue-600 mt-2">Apply these at checkout for extra savings!</p>
          </div>
          
          <button id="bookNowBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            Book Now & Save
          </button>
          
          <div class="mt-2 text-center">
            <p class="text-sm text-gray-500">Offer valid until ${new Date(packagesData[0].offerExpiry).toLocaleDateString()}</p>
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
        showBookingForm(packagesData, promosData);
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
    function showBookingForm(packages, promoCodes) {
      // Create booking form popup
      const bookingForm = document.createElement('div');
      bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
      
      // Generate package options HTML
      const packageOptionsHTML = packages.map((pkg, index) => `
        <div class="package-option">
          <input type="radio" id="package${index+1}" name="package" value="${pkg.id}" 
                 class="hidden peer" ${index === 0 ? 'checked' : ''}>
          <label for="package${index+1}" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
            <span class="block font-medium">${pkg.shortName || pkg.name.split(' ')[0]}</span>
            <span class="block text-orange-600 font-bold mt-1">₹<span id="${pkg.id}-price">${pkg.discountedPrice.toLocaleString()}</span></span>
            <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
          </label>
        </div>
      `).join('');
      
      // Generate promo codes display
      const promoCodesHTML = promoCodes.map(promo => `
        <div class="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
          <div>
            <span class="font-medium">${promo.code}</span>
            <span class="text-xs text-gray-600 ml-2">${promo.description}</span>
          </div>
          <span class="text-sm font-bold text-green-600">${promo.discount}% off</span>
        </div>
      `).join('');
      
      // Create form content with dynamic data
      bookingForm.innerHTML = `
        <div class="bg-white rounded-xl p-0 max-w-lg w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
          <!-- Header with gradient background -->
          <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-6 text-white relative">
            <h3 class="text-xl sm:text-2xl font-bold">Book Your ${packages[0].location} Adventure</h3>
            <p class="mt-1 opacity-90">${packages[0].offerTitle}</p>
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
              <!-- Package selection - responsive grid -->
              <div class="mb-4 sm:mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                <div class="grid grid-cols-1 ${packages.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3">
                  ${packageOptionsHTML}
                </div>
              </div>
              
              <!-- Order summary -->
              <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 class="font-medium mb-2">Order Summary</h4>
                <div class="flex justify-between text-sm mb-1">
                  <span>Package: <span id="selectedPackageName">${packages[0].name}</span></span>
                  <span id="packageBasePrice">₹${packages[0].originalPrice.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Duration:</span>
                  <span id="packageDuration">${packages[0].duration}</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Special offer discount (${Math.round((1 - packages[0].discountedPrice/packages[0].originalPrice)*100)}%):</span>
                  <span class="text-green-600">-₹<span id="specialDiscount">${(packages[0].originalPrice - packages[0].discountedPrice).toLocaleString()}</span></span>
                </div>
                <div id="promoDiscountRow" class="justify-between text-sm mb-1 hidden">
                  <span>Promo code discount: <span id="promoCodeLabel"></span></span>
                  <span class="text-green-600">-₹<span id="promoDiscount">0</span></span>
                </div>
                <div class="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>₹<span id="totalPrice">${packages[0].discountedPrice.toLocaleString()}</span></span>
                </div>
              </div>
              
              <!-- Two columns layout for larger screens -->
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
              
              <!-- Promo code section with available codes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <div class="flex items-center space-x-2">
                  <input type="text" id="promoCode" placeholder="Enter promo code" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <button type="button" id="applyPromo" class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Apply</button>
                </div>
                <div id="promoMessage" class="mt-1 text-sm hidden"></div>
                
                <!-- Available promo codes -->
                <div class="mt-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">Available Promo Codes:</p>
                  <div class="space-y-2 max-h-40 overflow-y-auto p-1">
                    ${promoCodesHTML}
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Click on apply after entering code</p>
                </div>
              </div>
              
              <!-- Submit button -->
              <div class="pt-2">
                <button type="submit" id="submitBooking" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center">
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
      let currentPackage = packages[0].id;
      let currentPromoCode = null;
      let promoDiscountPercent = 0;
      
      // Create a map of packages for easy access
      const packagesMap = {};
      packages.forEach(pkg => {
        packagesMap[pkg.id] = pkg;
      });
      
      // Create a map of promo codes for validation
      const promoCodesMap = {};
      promoCodes.forEach(promo => {
        promoCodesMap[promo.code] = promo.discount;
      });
      
      // Initial order summary setup
      updateOrderSummary();
      
      // Function to update the order summary
      function updateOrderSummary() {
        const packageData = packagesMap[currentPackage];
        const basePrice = packageData.originalPrice;
        const specialDiscountAmount = basePrice - packageData.discountedPrice;
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
        
        // Update package price displays
        packages.forEach(pkg => {
          document.getElementById(`${pkg.id}-price`).textContent = pkg.discountedPrice.toLocaleString();
        });
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
        
        if (promoCodesMap[enteredCode]) {
          // Valid promo code
          promoDiscountPercent = promoCodesMap[enteredCode];
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
      document.getElementById('kashmirBookingForm').addEventListener('submit', async (e) => {
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
        
        try {
          // Collect form data
          const formData = {
            packageId: currentPackage,
            packageName: packagesMap[currentPackage].name,
            travelers: document.getElementById('travelers').value,
            promoCode: currentPromoCode,
            // Add other form fields here
          };
          
          // In a real app, you would send this to your backend API
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Close the form
          closeBookingForm(bookingForm);
          
          // Show success message
          setTimeout(() => {
            showSuccessMessage(packagesMap[currentPackage], currentPromoCode);
          }, 300);
          
        } catch (error) {
          console.error('Booking failed:', error);
          submitButton.innerHTML = originalText;
          alert('Booking failed. Please try again.');
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
    function showSuccessMessage(packageData, promoCode) {
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
      
      // Generate a random booking reference
      const bookingRef = packageData.location.substring(0, 3).toUpperCase() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
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
          <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02]">
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
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          successMessage.classList.remove('opacity-100');
          successMessage.classList.add('opacity-0');
          const messageContent = successMessage.querySelector('div');
          messageContent.classList.remove('scale-100');
          messageContent.classList.add('scale-95');
          
          setTimeout(() => {
            document.body.removeChild(successMessage);
            document.removeEventListener('keydown', handleEscKey);
          }, 300);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
    }
  } catch (error) {
    console.error('Error loading packages:', error);
    // Remove loading overlay if it exists
    const existingOverlay = document.querySelector('.fixed.inset-0.bg-black');
    if (existingOverlay) document.body.removeChild(existingOverlay);
    
    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    errorMessage.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Failed to Load Packages</h3>
        <p class="text-gray-700 mb-4">We couldn't load the package information. Please try again later.</p>
        <button id="closeError" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(errorMessage);
    
    document.getElementById('closeError').addEventListener('click', () => {
      document.body.removeChild(errorMessage);
    });
  }
};


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
  const handleDiscoverPackages12 = () => {
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
        
          duration: '5 days, 4 nights' ,
         
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
                <div id="promoDiscountRow" class="justify-between text-sm mb-1 hidden">
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
  < EnhancedKashmirButton/>
  {/* <button 
    onClick={handleDiscoverPackages1}
    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-orange-200"
    aria-label="Explore our popular Kashmir tour packages"
  >
    Discover Kashmir Packages
  </button> */}
 
</div>

<div className="mt-2  rounded-lg p-4 shadow-sm">
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="flex items-center mb-3 md:mb-0">
      {/* <h3 className="text-base font-semibold text-gray-800 mr-4">Need inspiration?</h3> */}
     
<TripPlanner/>
{/* <EnhancedPlanTripButton/> */}

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
