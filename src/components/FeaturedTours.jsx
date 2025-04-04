


import React, { useState, useMemo ,useEffect} from 'react';
import { motion } from 'framer-motion';
import ToursCarousel from './Tourca';
import axios from 'axios';
import { 
  MapPin, Calendar, Users, DollarSign, Star, X, Clock, 
  Globe, Coffee, Hotel, SortAsc, SortDesc, Filter, Share2,
  Heart, Camera, Map, CalendarCheck, Check,ChevronDown, AlignJustify, Award, Triangle 
} from 'lucide-react';





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
const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
  // Create modal container
  // Alternative version with delayed auto-focus
  
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

  // const modalOverlay = document.createElement('div');
  // modalOverlay.className = 'query-form-overlay';
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
      
      /* CSS for Promo Code */
      .promo-container {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }
      .promo-input {
        flex-grow: 1;
      }
      .promo-button {
        background: #FF6B00;
        color: white;
        border: none;
        padding: 0 15px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .promo-button:hover {
        background: #FF8800;
      }
      .promo-button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .promo-status {
        margin-top: 8px;
        font-size: 0.85rem;
      }
      .promo-success {
        color: #10b981;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .promo-error {
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .discount-row {
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
        margin-bottom: 8px;
        font-weight: 500;
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
            
            <!-- Promo code discount row (initially hidden) -->
            <div id="promoDiscountRow" class="discount-row" style="color: #10b981; display: none;">
              <span style="font-size: 0.85rem;">Promo Discount: <span id="promoCodeDisplay"></span></span>
              <span>-₹<span id="discountAmountDisplay">0</span></span>
            </div>
          </div>
        </div>
        
        <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
          <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
        </div>
        
        <!-- Promo Code Section -->
        <div style="margin-top: 20px; padding: 12px; background: #f9f9f9; border-radius: 8px; border: 1px dashed #ddd;">
          <label for="promoCode" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Have a Promo Code?</label>
          <div class="promo-container">
            <input type="text" id="promoCode" placeholder="Enter code" class="form-input promo-input" style="padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
            <button id="applyPromoBtn" class="promo-button">Apply</button>
          </div>
          <div id="promoStatus" class="promo-status"></div>
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

  // State variables for price calculation and promo code
  let promoCodeData = null;
  let baseSubtotal = 0;

  // Enhanced price calculation function with animations
  const updateTotalPrice1 = () => {
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
    
    // Calculate subtotal before any discounts
    baseSubtotal = adultsPrice + childrenPrice;
    
    // Calculate final price after discounts (if promo code applied)
    let finalPrice = baseSubtotal;
    let discountAmount = 0;
    
    if (promoCodeData) {
      // Calculate discount based on promo code
      discountAmount = Math.min(
        (baseSubtotal * promoCodeData.discount) / 100, 
        promoCodeData.maxDiscount || Number.MAX_SAFE_INTEGER
      );
      
      // Update the discount display
      document.getElementById('promoDiscountRow').style.display = 'flex';
      document.getElementById('promoCodeDisplay').textContent = promoCodeData.code;
      document.getElementById('discountAmountDisplay').textContent = discountAmount.toLocaleString();
      
      // Apply discount
      finalPrice = baseSubtotal - discountAmount;
    } else {
      // Hide discount row if no promo code
      document.getElementById('promoDiscountRow').style.display = 'none';
    }
    
    // Apply animation by removing and re-adding the class
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    totalPriceElement.classList.remove('price-animation');
    
    // Trigger reflow to restart animation
    void totalPriceElement.offsetWidth;
    
    totalPriceElement.textContent = '₹' + finalPrice.toLocaleString();
    totalPriceElement.classList.add('price-animation');
    
    // Store the calculated prices to use in the booking process
    window.calculatedSubtotal = baseSubtotal;
    window.calculatedDiscount = discountAmount;
    window.calculatedTotalPrice = finalPrice;
    
    // If a promo code is applied, revalidate it with the new package price
    if (promoCodeData) {
      validatePromoCode(document.getElementById('promoCode').value, baseSubtotal, true);
    }
  };
// Add debounce function to prevent continuous requests
// const debounce = (func, delay) => {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(this, args), delay);
//   };
// };
// Add debounce function to prevent continuous requests
const debounce = (func, delay) => {
let timeoutId;
return function(...args) {
clearTimeout(timeoutId);
timeoutId = setTimeout(() => func.apply(this, args), delay);
};
};

// Improved promo code validation with better error handling
const validatePromoCode = async (code, packagePrice, isRevalidation = false) => {
if (!code) {
// Clear the promo data if code is empty
promoCodeData = null;
updateTotalPrice(true); // Pass true to avoid revalidation loop
document.getElementById('promoStatus').innerHTML = '';
return;
}

const promoStatusElement = document.getElementById('promoStatus');
const applyButton = document.getElementById('applyPromoBtn');

if (!isRevalidation) {
// Only show loading state for initial validation, not revalidations
applyButton.disabled = true;
promoStatusElement.innerHTML = `
  <div style="display: flex; align-items: center; gap: 6px; color: #666;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10"></path>
    </svg>
    <span>Validating code...</span>
  </div>
`;
}

try {
// Ensure URL is correctly formatted and uses relative path
const apiUrl = `http://localhost:5000/api/promos/validate/${encodeURIComponent(code)}?packagePrice=${packagePrice}`;

// Create headers object
const headers = {
  'Content-Type': 'application/json'
};

// Only add token if it exists and is valid
if (token && typeof token === 'string' && token.trim() !== '') {
  headers['Authorization'] = `Bearer ${token}`;
}

const response = await fetch(apiUrl, {
  method: 'GET',
  headers: headers
});
const result = await response.json(); // Parse JSON response first

if (!response.ok) { 
  // Instead of throwing an error, handle the error message from the response
  throw new Error(result.error || `HTTP error! status: ${response.status}`);
}

// Check if response is OK (status 200-299)
// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`);
// }

// const result = await response.json();

// If is a revalidation check, only update the promo data, don't show messages
if (isRevalidation) {
  if (result.success) {
    promoCodeData = result.data;
    updateTotalPrice(true); // Pass true to avoid revalidation loop
  } else {
    // If revalidation fails (promo no longer valid), remove the promo
    promoCodeData = null;
    document.getElementById('promoCode').value = '';
    updateTotalPrice(true); // Pass true to avoid revalidation loop
  }
  return;
}

applyButton.disabled = false;

if (result.success) {
  promoCodeData = result.data;
  promoStatusElement.innerHTML = `
    <div class="promo-success">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Promo code applied! ${result.data.description || ''}</span>
    </div>
  `;
  updateTotalPrice(true); // Pass true to avoid revalidation loop
} else {
  promoCodeData = null;
  promoStatusElement.innerHTML = `
    <div class="promo-error">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${result.message || 'Invalid promo code'}</span>
    </div>
  `;
  updateTotalPrice(true); // Pass true to avoid revalidation loop
}
} catch (error) {
console.error('Error validating promo code:', error);
applyButton.disabled = false;
promoCodeData = null;
promoStatusElement.innerHTML = `
  <div class="promo-error">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span>${error.message || 'Error validating promo code. Please try again.'}</span>
  </div>
`;
updateTotalPrice(true); // Pass true to avoid revalidation loop
}
};

// Fixed price calculation function that avoids revalidation loops
const updateTotalPrice = (skipRevalidation = false) => {
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

// Calculate subtotal before any discounts
baseSubtotal = adultsPrice + childrenPrice;

// Calculate final price after discounts (if promo code applied)
let finalPrice = baseSubtotal;
let discountAmount = 0;

if (promoCodeData) {
// Calculate discount based on promo code
discountAmount = Math.min(
  (baseSubtotal * promoCodeData.discount) / 100, 
  promoCodeData.maxDiscount || Number.MAX_SAFE_INTEGER
);

// Update the discount display
document.getElementById('promoDiscountRow').style.display = 'flex';
document.getElementById('promoCodeDisplay').textContent = promoCodeData.code;
document.getElementById('discountAmountDisplay').textContent = discountAmount.toLocaleString();

// Apply discount
finalPrice = baseSubtotal - discountAmount;
} else {
// Hide discount row if no promo code
document.getElementById('promoDiscountRow').style.display = 'none';
}

// Apply animation by removing and re-adding the class
const totalPriceElement = document.getElementById('totalPriceDisplay');
totalPriceElement.classList.remove('price-animation');

// Trigger reflow to restart animation
void totalPriceElement.offsetWidth;

totalPriceElement.textContent = '₹' + finalPrice.toLocaleString();
totalPriceElement.classList.add('price-animation');

// Store the calculated prices to use in the booking process
window.calculatedSubtotal = baseSubtotal;
window.calculatedDiscount = discountAmount;
window.calculatedTotalPrice = finalPrice;

// Avoid the circular dependency by checking skipRevalidation flag
if (promoCodeData && !skipRevalidation) {
validatePromoCode(document.getElementById('promoCode').value, baseSubtotal, true);
}
};

// Add CSS for better responsiveness
const styleTag = document.createElement('style');
styleTag.textContent = `
/* Enhanced responsiveness for promo code section */
@media (max-width: 576px) {
.promo-container {
  flex-direction: column;
}
.promo-button {
  margin-top: 8px;
  width: 100%;
  padding: 10px;
}
.form-input.promo-input {
  width: 100%;
}
}
`;
document.head.appendChild(styleTag);

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
// Create a debounced version of validatePromoCode
const debouncedValidatePromoCode = debounce((code, packagePrice) => {
validatePromoCode(code, packagePrice);
}, 500); // 500ms delay

// Set up event listeners

// Promo code input with debounce
const promoCodeInput = document.getElementById('promoCode');
if (promoCodeInput) {
promoCodeInput.addEventListener('input', (e) => {
  const code = e.target.value.trim();
  if (code) {
    debouncedValidatePromoCode(code, baseSubtotal);
  } else {
    // Clear promo data immediately if field is empty
    promoCodeData = null;
    document.getElementById('promoStatus').innerHTML = '';
    updateTotalPrice(true); // Pass true to avoid revalidation loop
  }
});
}

// Apply button click
const applyPromoBtn = document.getElementById('applyPromoBtn');
if (applyPromoBtn) {
applyPromoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const promoCode = document.getElementById('promoCode').value.trim();
  if (!promoCode) return;
  
  validatePromoCode(promoCode, baseSubtotal);
});
}

// Price change listeners
const queryAdults = document.getElementById('queryAdults');
const queryChildren = document.getElementById('queryChildren');

if (queryAdults) queryAdults.addEventListener('change', () => updateTotalPrice());
if (queryChildren) queryChildren.addEventListener('change', () => updateTotalPrice());

// Initialize price calculation
updateTotalPrice();
});


  // Event listeners for price updates
  document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
  document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
  // Promo code application
  document.getElementById('applyPromoBtn').addEventListener('click', (e) => {
    e.preventDefault();
  
    const promoCode = document.getElementById('promoCode').value.trim();
    if (!promoCode) return;
    
    validatePromoCode(promoCode, baseSubtotal);
  });
  
  // Form submission handler
  // document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
  //   e.preventDefault();
    
  //   const form = e.target;
  //   const submitButton = document.getElementById('proceedBtn');
  //   const loadingMessage = document.getElementById('loadingMessage');
    
  //   // Show loading state
  //   submitButton.style.display = 'none';
  //   loadingMessage.style.display = 'block';
    
  //   // Collect form data
  //   const formData = {
  //     tourId: selectedTour._id,
  //     tourTitle: selectedTour.title,
  //     name: document.getElementById('queryName').value,
  //     email: document.getElementById('queryEmail').value,
  //     phone: document.getElementById('queryPhone').value,
  //     travelDate: document.getElementById('queryTravelDate').value,
  //     adults: parseInt(document.getElementById('queryAdults').value),
  //     children: parseInt(document.getElementById('queryChildren').value),
  //     infants: parseInt(document.getElementById('queryInfants').value),
  //     message: document.getElementById('queryMessage').value,
  //     subtotal: window.calculatedSubtotal,
  //     discount: window.calculatedDiscount,
  //     totalPrice: window.calculatedTotalPrice,
  //     promoCode: promoCodeData ? promoCodeData.code : null,
  //     termsAgreed: document.getElementById('queryTerms').checked
  //   };
    
  //   try {
  //     const response = await fetch('http://localhost:5000/api/tour-queries', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  //       },
  //       body: JSON.stringify(formData)
  //     });
      
  //     const result = await response.json();

  //     if (response.ok) {
  //       // Redirect to payment page or show success message
        
  //       // window.location.href = `/booking/payment/${result.bookingId}`;
  //     } else {
  //       // Show error message
  //       loadingMessage.style.display = 'none';
  //       submitButton.style.display = 'block';
        
  //       alert(result.message || 'Failed to create booking. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Booking error:', error);
  //     loadingMessage.style.display = 'none';
  //     submitButton.style.display = 'block';
      
  //     alert('An error occurred. Please check your connection and try again.');
  //   }
  // });
  // Form submission handler
document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
e.preventDefault();

const form = e.target;
const submitButton = document.getElementById('proceedBtn');
const loadingMessage = document.getElementById('loadingMessage');

// Show loading state
submitButton.style.display = 'none';
loadingMessage.style.display = 'block';

// Collect form data
const formData = {
tourId: selectedTour._id,
tourTitle: selectedTour.title,
name: document.getElementById('queryName').value,
email: document.getElementById('queryEmail').value,
phone: document.getElementById('queryPhone').value,
travelDate: document.getElementById('queryTravelDate').value,
adults: parseInt(document.getElementById('queryAdults').value),
children: parseInt(document.getElementById('queryChildren').value),
infants: parseInt(document.getElementById('queryInfants').value),
message: document.getElementById('queryMessage').value,
subtotal: window.calculatedSubtotal,
discount: window.calculatedDiscount,
totalPrice: window.calculatedTotalPrice,
promoCode: promoCodeData ? promoCodeData.code : null,
termsAgreed: document.getElementById('queryTerms').checked
};

try {
// First, save the tour query
const response = await fetch('http://localhost:5000/api/tour-queries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  },
  body: JSON.stringify(formData)
});

const result = await response.json();

if (response.ok) {
  console.log("query saved")
  // If query was saved successfully, proceed with payment
  proceedWithPayment(
    selectedTour, 
    {
      ...userData,
      email: formData.email, // Use the email from the form
      username: formData.name, // Use the name from the form
      phone: formData.phone // Use the phone from the form
    },
    token,
    window.calculatedTotalPrice
  );
} else {
  // Show error message
  loadingMessage.style.display = 'none';
  submitButton.style.display = 'block';
  alert(result.message || 'Failed to create booking. Please try again.');
}
} catch (error) {
console.error('Booking error:', error);
loadingMessage.style.display = 'none';
submitButton.style.display = 'block';
alert('An error occurred. Please check your connection and try again.');
} finally {
// Always hide loading state when done (payment window will handle its own loading)
loadingMessage.style.display = 'none';
submitButton.style.display = 'block';
}
});
  // Set minimum date for travel date (today or later)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('queryTravelDate').min = today;
  
  // Initialize price calculation
  updateTotalPrice();
  
  // Focus on first input field when modal opens
  // setTimeout(() => {
  //   const firstInput = document.getElementById('queryName');
  //   if (firstInput) firstInput.focus();
  // }, 100);
};
// const showQueryForm = (selectedTour, userData, token, isLoggedIn) => {
//     // Create modal container
   
//     const modalOverlay = document.createElement('div');
//     modalOverlay.className = 'query-form-overlay';
//     modalOverlay.style.cssText = `
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background-color: rgba(0, 0, 0, 0.5);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       z-index: 1000;
//       backdrop-filter: blur(3px);
//       -webkit-backdrop-filter: blur(3px);
//     `;
  
//     // Create modal content with responsive design
//     const modalContent = document.createElement('div');
//     modalContent.className = 'query-form-content';
//     modalContent.style.cssText = `
//       background-color: white;
//       border-radius: 12px;
//       padding: 30px;
//       width: 92%;
//       max-width: 700px;
//       max-height: 90vh;
//       overflow-y: auto;
//       box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
//     `;
  
//     // Pre-fill form data if user is logged in
//     const name = userData?.username || '';
//     const email = userData?.email || '';
//     const phone = userData?.phone || '';
  
//     // Form with marketing text and responsive design
//     modalContent.innerHTML = `
//       <style>
//         /* Custom Styles */
//         .query-form-content {
//           scrollbar-width: thin;
//           scrollbar-color: #ddd #f5f5f5;
//         }
//         .query-form-content::-webkit-scrollbar {
//           width: 6px;
//         }
//         .query-form-content::-webkit-scrollbar-track {
//           background: #f5f5f5;
//           border-radius: 10px;
//         }
//         .query-form-content::-webkit-scrollbar-thumb {
//           background: #ddd;
//           border-radius: 10px;
//         }
        
//         /* Animation for price */
//         @keyframes pricePulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
//         .price-animation {
//           animation: pricePulse 2s ease-in-out;
//         }
        
//         /* Focus states */
//         .form-input:focus {
//           border-color: #FF6B00 !important;
//           box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1) !important;
//           outline: none !important;
//         }
        
//         /* Hover states */
//         .submit-btn:hover {
//           transform: translateY(-2px) !important;
//           box-shadow: 0 4px 8px rgba(255, 107, 0, 0.4) !important;
//         }
        
//         /* Responsive CSS */
//         @media (min-width: 768px) {
//           .form-grid {
//             grid-template-columns: 1fr 1fr 1fr !important;
//           }
//           .title-text {
//             font-size: 1.7rem !important;
//           }
//           .subtitle-text {
//             font-size: 1rem !important;
//           }
//           .price-summary {
//             display: grid !important;
//             grid-template-columns: 1fr 1fr !important;
//             gap: 15px !important;
//           }
//           .price-total {
//             font-size: 1.5rem !important;
//           }
//           .form-label {
//             font-size: 0.9rem !important;
//           }
//           .form-input {
//             padding: 12px !important;
//             font-size: 1rem !important;
//           }
//         }
        
//         /* Promo code styles */
//         .promo-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 15px;
//         }
//         .promo-input {
//           flex: 1;
//         }
//         .promo-button {
//           background: #FF6B00;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           padding: 10px 15px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: all 0.2s;
//         }
//         .promo-button:hover {
//           background: #FF8800;
//           transform: translateY(-1px);
//         }
//         .promo-message {
//           font-size: 0.85rem;
//           margin-top: 5px;
//           display: none;
//         }
//         .promo-success {
//           color: #52c41a;
//         }
//         .promo-error {
//           color: #ff4d4f;
//         }
//         .discount-row {
//           display: flex;
//           justify-content: space-between;
//           padding-left: 15px;
//           margin-bottom: 8px;
//           color: #52c41a;
//           font-weight: 500;
//         }
//       </style>
  
//       <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
//         <div>
//           <h2 class="title-text" style="margin: 0 0 5px 0; color: #333; font-size: 1.5rem; font-weight: 600;">Book Your Experience</h2>
//           <p class="subtitle-text" style="margin: 0; color: #FF6B00; font-size: 0.9rem; font-weight: 500;">${selectedTour.title}</p>
//         </div>
//         <button id="closeQueryForm" style="background: none; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: all 0.2s;">
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </button>
//       </div>
      
//       <!-- Price Summary Box - Enhanced and More Detailed -->
//       <div class="price-summary-container" style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
//         <div style="background: linear-gradient(135deg, #FF6B00, #FF9800); padding: 15px; color: white;">
//           <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Price Summary</h3>
//           <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Transparent pricing with no hidden fees</p>
//         </div>
        
//         <div style="background: #fff; padding: 20px; border: 1px solid #f0f0f0; border-top: none;">
//           <div class="price-summary" style="display: block; margin-bottom: 15px;">
//             <div style="margin-bottom: 12px;">
//               <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                 <span style="font-size: 0.9rem; color: #555;">Base Price (per adult)</span>
//                 <span style="font-weight: 500; color: #333;">₹${selectedTour.price}</span>
//               </div>
//               <div id="adultPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//                 <span style="font-size: 0.85rem; color: #666;">Adults: <span id="adultCountDisplay">1</span></span>
//                 <span style="font-weight: 500; color: #333;">₹<span id="adultPriceDisplay">${selectedTour.price}</span></span>
//               </div>
//               <div id="childPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//                 <span style="font-size: 0.85rem; color: #666;">Children: <span id="childCountDisplay">0</span> (50% off)</span>
//                 <span style="font-weight: 500; color: #333;">₹<span id="childPriceDisplay">0</span></span>
//               </div>
//             </div>
            
//             <div>
//               <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                 <span style="font-size: 0.9rem; color: #555;">Additional</span>
//                 <span style="font-weight: 500; color: #333;">₹0</span>
//               </div>
//               <div style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//                 <span style="font-size: 0.85rem; color: #666;">Taxes & Fees</span>
//                 <span style="font-weight: 500; color: #333;">Included</span>
//               </div>
              
//               <!-- Promo Code Section -->
//               <div class="promo-row">
//                 <input type="text" id="promoCode" placeholder="Enter promo code" class="form-input promo-input" style="padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//                 <button id="applyPromo" class="promo-button">Apply</button>
//               </div>
//               <div id="promoMessage" class="promo-message">
//                 <!-- Will be populated dynamically -->
//               </div>
              
//               <!-- Discount Row (hidden by default) -->
//               <div id="discountRow" class="discount-row" style="display: none;">
//                 <span style="font-size: 0.85rem;">Discount: <span id="discountPercentage">0</span>%</span>
//                 <span>-₹<span id="discountAmount">0</span></span>
//               </div>
//             </div>
//           </div>
          
//           <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
          
//           <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
//             <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
//             <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
//           </div>
          
//           <div style="margin-top: 12px; padding: 8px 12px; background: #FFF9F5; border-radius: 6px; border-left: 3px solid #FF6B00;">
//             <p style="margin: 0; font-size: 0.8rem; color: #333;">
//               <span style="color: #FF6B00; font-weight: 600;">✓</span> Best price guarantee
//               <span style="color: #FF6B00; font-weight: 600; margin-left: 10px;">✓</span> Free cancellation up to 24 hours before
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 16px;">
//         <div class="full-span" style="grid-column: span 2;">
//           <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Personal Information</h3>
//         </div>
        
//         <div class="full-span" style="grid-column: span 2;">
//           <label for="queryName" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Full Name*</label>
//           <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Email Address*</label>
//           <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Phone Number*</label>
//           <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//         </div>
        
//         <div class="full-span" style="grid-column: span 2; margin-top: 10px;">
//           <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Travel Details</h3>
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Travel Date*</label>
//           <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Adults (13+ yrs)*</label>
//           <select id="queryAdults" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//             <option value="1">1 Adult</option>
//             <option value="2">2 Adults</option>
//             <option value="3">3 Adults</option>
//             <option value="4">4 Adults</option>
//             <option value="5">5 Adults</option>
//             <option value="6">6 Adults</option>
//             <option value="7">7 Adults</option>
//             <option value="8">8 Adults</option>
//           </select>
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Children (5-12 yrs)</label>
//           <select id="queryChildren" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//             <option value="0">0 Children</option>
//             <option value="1">1 Child</option>
//             <option value="2">2 Children</option>
//             <option value="3">3 Children</option>
//             <option value="4">4 Children</option>
//             <option value="5">5 Children</option>
//           </select>
//         </div>
        
//         <div style="grid-column: span 1;">
//           <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Infants (0-4 yrs)</label>
//           <select id="queryInfants" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//             <option value="0">0 Infants</option>
//             <option value="1">1 Infant</option>
//             <option value="2">2 Infants</option>
//             <option value="3">3 Infants</option>
//           </select>
//         </div>
        
//         <div class="full-span" style="grid-column: span 2;">
//           <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Special Requirements or Questions</label>
//           <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; resize: none;" placeholder="Dietary requirements, accessibility needs, or any questions..."></textarea>
//         </div>
        
//         <div class="full-span" style="grid-column: span 2; margin: 8px 0 12px;">
//           <label style="display: flex; align-items: flex-start; cursor: pointer;">
//             <input type="checkbox" id="queryTerms" required style="margin-right: 10px; margin-top: 3px; min-width: 16px; height: 16px; accent-color: #FF6B00;">
//             <span style="font-size: 0.85rem; color: #555;">I agree to receive updates via email and WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none; font-weight: 500;">Terms & Conditions</a>*</span>
//           </label>
//         </div>
        
//         <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 10px;">
//           <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 12px 0; width: 70%; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 3px 6px rgba(255, 107, 0, 0.3); transition: all 0.3s ease;">
//             Continue to Secure Checkout
//           </button>
          
//           <!-- Loading state message -->
//           <div id="loadingMessage" style="display: none; margin-top: 15px;">
//             <div style="display: flex; align-items: center; justify-content: center;">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
//                 <style>
//                   @keyframes rotate {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                   }
//                 </style>
//                 <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
//                 <path d="M12 2a10 10 0 0 1 10 10"></path>
//               </svg>
//               <span style="margin-left: 10px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">Processing your booking...</span>
//             </div>
//           </div>
//         </div>
        
//         <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 16px;">
//           <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
//             <div style="display: flex; align-items: center; gap: 6px;">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//               </svg>
//               <span style="font-size: 0.8rem; color: #555;">Secure Payment</span>
//             </div>
            
//             <div style="display: flex; align-items: center; gap: 6px;">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//               </svg>
//               <span style="font-size: 0.8rem; color: #555;">100% Safe</span>
//             </div>
            
//             <div style="display: flex; align-items: center; gap: 6px;">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
//               </svg>
//               <span style="font-size: 0.8rem; color: #555;">24/7 Support</span>
//             </div>
//           </div>
//         </div>
//       </form>
//     `;
  
//     // Append modal to body
//     modalOverlay.appendChild(modalContent);
//     document.body.appendChild(modalOverlay);
  
//     // Close modal functionality with improved animation
//     document.getElementById('closeQueryForm').addEventListener('click', () => {
//       modalOverlay.style.opacity = '0';
//       modalContent.style.transform = 'scale(0.9)';
//       modalContent.style.transition = 'transform 0.2s ease';
//       modalOverlay.style.transition = 'opacity 0.2s ease';
      
//       setTimeout(() => {
//         document.body.removeChild(modalOverlay);
//       }, 200);
//     });
  
//     // Store applied promo information
//     let appliedPromo = {
//       code: null,
//       discount: 0,
//       maxDiscount: 0
//     };
  
//     // Enhanced price calculation function with animations and promo support
//     const updateTotalPrice = () => {
//       const basePrice = selectedTour.price;
//       const adults = parseInt(document.getElementById('queryAdults').value || 1);
//       const children = parseInt(document.getElementById('queryChildren').value || 0);
      
//       // Update display counts
//       document.getElementById('adultCountDisplay').textContent = adults;
//       document.getElementById('childCountDisplay').textContent = children;
      
//       // Adults pay full price, children pay half price
//       const childrenPrice = basePrice * 0.5 * children;
//       const adultsPrice = basePrice * adults;
      
//       // Calculate subtotal before discount
//       const subtotal = adultsPrice + childrenPrice;
      
//       // Update price displays with formatting
//       document.getElementById('adultPriceDisplay').textContent = (adultsPrice).toLocaleString();
//       document.getElementById('childPriceDisplay').textContent = (childrenPrice).toLocaleString();
      
//       // Apply promo discount if available
//       let discountAmount = 0;
      
//       if (appliedPromo.code) {
//         discountAmount = (subtotal * (appliedPromo.discount / 100));
        
//         // Check if discount exceeds maximum allowed discount
//         if (appliedPromo.maxDiscount && discountAmount > appliedPromo.maxDiscount) {
//           discountAmount = appliedPromo.maxDiscount;
//         }
        
//         // Show discount row
//         document.getElementById('discountRow').style.display = 'flex';
//         document.getElementById('discountPercentage').textContent = appliedPromo.discount;
//         document.getElementById('discountAmount').textContent = discountAmount.toLocaleString();
//       }
      
//       const totalPrice = subtotal - discountAmount;
      
//       // Apply animation by removing and re-adding the class
//       const totalPriceElement = document.getElementById('totalPriceDisplay');
//       totalPriceElement.classList.remove('price-animation');
      
//       // Trigger reflow to restart animation
//       void totalPriceElement.offsetWidth;
      
//       totalPriceElement.textContent = '₹' + totalPrice.toLocaleString();
//       totalPriceElement.classList.add('price-animation');
      
//       // Store the calculated price to use in the booking process
//       window.calculatedTotalPrice = totalPrice;
//       window.appliedPromoCode = appliedPromo.code;
//       window.discountAmount = discountAmount;
//     };
  
//     // Add event listeners for price updates
//     document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//     document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
    
//     // Initialize price calculation
//     updateTotalPrice();
  
//     // Set minimum date for travel date to tomorrow
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
//     document.getElementById('queryTravelDate').setAttribute('min', tomorrowFormatted);
  
//     // Promo code validation function
//     document.getElementById('applyPromo').addEventListener('click', async () => {
//       const promoCode = document.getElementById('promoCode').value.trim();
//       const promoMessageEl = document.getElementById('promoMessage');
      
//       if (!promoCode) {
//         promoMessageEl.textContent = "Please enter a promo code";
//         promoMessageEl.className = "promo-message promo-error";
//         promoMessageEl.style.display = "block";
//         return;
//       }
      
//       // Disable button during API call
//       const applyButton = document.getElementById('applyPromo');
//       applyButton.disabled = true;
//       applyButton.textContent = "Checking...";
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/promos/validate/${promoCode.trim()}?packagePrice=${window.calculatedTotalPrice || selectedTour.price}`
//         );
      
//         console.log("API Response:", response.data); // Debug
      
//         if (response.data.success) {
//           const promo = response.data.data;
          
//           appliedPromo = {
//             code: promo.code,
//             discount: promo.discount
//           };
      
//           promoMessageEl.textContent = `${promo.discount}% discount applied!`;
//           promoMessageEl.className = "promo-message promo-success";
          
//           updateTotalPrice();
//           document.getElementById('promoCode').disabled = true;
//           applyButton.textContent = "Applied ✓";
//           applyButton.style.background = "#52c41a";
//         } else {
//           promoMessageEl.textContent = response.data.message || "Invalid promo code";
//           promoMessageEl.className = "promo-message promo-error";
//           appliedPromo = { code: null, discount: 0 };
//         }
//       } catch (error) {
//         // console.error('API Error:', error);
//         promoMessageEl.textContent = "Error validating code";
//       }
//     //   try {
//         const response = await axios.get(
//             `http://localhost:5000/api/promos/validate/${promoCode.trim()}?packagePrice=${window.calculatedTotalPrice || selectedTour.price}`
//           );
//         // const response = await axios.get(
//         //     `http://localhost:5000/api/promos/validate/${encodeURIComponent(promoCode.trim())}?packagePrice=${window.calculatedTotalPrice || selectedTour.price}`
//         //   );
//         // const response = await axios.get(
//         //     `http://localhost:5000/api/promos/validate/${encodeURIComponent(promoCode)}?packagePrice=${window.calculatedTotalPrice || selectedTour.price}`
//         //   );
//         // Call API to validate promo code
//         // const response = await axios.get(`http://localhost:5000/api/promos${encodeURIComponent(promoCode)}&packagePrice=${window.calculatedTotalPrice || selectedTour.price}`);
//         // const response = await axios.get(
//         //     `http://localhost:5000/api/promos/validate/${encodeURIComponent(promoCode)}?packagePrice=${window.calculatedTotalPrice || selectedTour.price}`
//         //   );
//         console.log("Raw Promo Code:", promoCode); // Check for extra spaces/undefined
// const trimmedCode = promoCode.trim(); // Remove whitespace
// console.log("Trimmed Promo Code:", trimmedCode); // Should not be empty
//         if (response.data.valid) {
//           // Success - valid promo code
//           const promoData = response.data.promo;
          
//           // Store promo data for price calculations
//           appliedPromo = {
//             code: promoData.code,
//             discount: promoData.discount,
//             maxDiscount: promoData.maxDiscount
//           };
          
//           // Display success message
//           promoMessageEl.textContent = `${promoData.discount}% off applied successfully!`;
//           promoMessageEl.className = "promo-message promo-success";
//           promoMessageEl.style.display = "block";
          
//           // Update total price with the discount
//           updateTotalPrice();
          
//           // Disable the promo input field
//           document.getElementById('promoCode').disabled = true;
//           applyButton.textContent = "Applied ✓";
//           applyButton.style.background = "#52c41a";
          
//         } else {
//           // Invalid promo
//           promoMessageEl.textContent = response.data.message || "Invalid promo code";
//           promoMessageEl.className = "promo-message promo-error";
//           promoMessageEl.style.display = "block";
          
//           // Reset any applied promo
//           appliedPromo = {
//             // code: null,
//             // discount:
//             code: null,
//           discount: 0
//         };
        
//         // Hide discount row
//         document.getElementById('discountRow').style.display = 'none';
        
//         applyButton.textContent = "Apply";
//         applyButton.disabled = false;
//       }
//     // } catch (error) {
//     //   console.error('Error validating promo code:', error);
//     //   promoMessageEl.textContent = "Error validating code. Please try again.";
//     //   promoMessageEl.className = "promo-message promo-error";
//     //   promoMessageEl.style.display = "block";
      
//     //   applyButton.textContent = "Apply";
//     //   applyButton.disabled = false;
//     // }
//   });

//   // Form submission handler
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading state
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.textContent = "Processing...";
//     loadingMessage.style.display = "block";
    
//     // Gather form data
//     const formData = {
//       tourId: selectedTour.id,
//       tourName: selectedTour.title,
//       name: document.getElementById('queryName').value,
//       email: document.getElementById('queryEmail').value,
//       phone: document.getElementById('queryPhone').value,
//       travelDate: document.getElementById('queryTravelDate').value,
//       adults: parseInt(document.getElementById('queryAdults').value),
//       children: parseInt(document.getElementById('queryChildren').value),
//       infants: parseInt(document.getElementById('queryInfants').value),
//       message: document.getElementById('queryMessage').value,
//       totalPrice: window.calculatedTotalPrice,
//       promoCode: window.appliedPromoCode,
//       discountAmount: window.discountAmount
//     };
    
//     try {
//       // Send booking request to API
//       const response = await axios.post('/api/booking/create', formData, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.data.success) {
//         // Redirect to payment page or show success message
//         window.location.href = `/payment/${response.data.bookingId}`;
//       } else {
//         // Show error message
//         alert('Error: ' + (response.data.message || 'Failed to create booking. Please try again.'));
//         proceedBtn.disabled = false;
//         proceedBtn.textContent = "Continue to Secure Checkout";
//         loadingMessage.style.display = "none";
//       }
//     } catch (error) {
//       console.error('Booking error:', error);
//       alert('Error: ' + (error.response?.data?.message || 'Something went wrong. Please try again.'));
//       proceedBtn.disabled = false;
//       proceedBtn.textContent = "Continue to Secure Checkout";
//       loadingMessage.style.display = "none";
//     }
//   });

//   // Close modal if clicking outside the content
//   modalOverlay.addEventListener('click', (e) => {
//     if (e.target === modalOverlay) {
//       modalOverlay.style.opacity = '0';
//       modalContent.style.transform = 'scale(0.9)';
//       modalContent.style.transition = 'transform 0.2s ease';
//       modalOverlay.style.transition = 'opacity 0.2s ease';
      
//       setTimeout(() => {
//         document.body.removeChild(modalOverlay);
//       }, 200);
//     }
//   });
  
//   // Animation for modal entry
//   modalOverlay.style.opacity = '0';
//   modalContent.style.transform = 'scale(0.9)';
//   modalContent.style.transition = 'transform 0.3s ease';
//   modalOverlay.style.transition = 'opacity 0.3s ease';
  
//   setTimeout(() => {
//     modalOverlay.style.opacity = '1';
//     modalContent.style.transform = 'scale(1)';
//   }, 10);
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
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//     backdrop-filter: blur(3px);
//     -webkit-backdrop-filter: blur(3px);
//   `;

//   // Create modal content with responsive design
//   const modalContent = document.createElement('div');
//   modalContent.className = 'query-form-content';
//   modalContent.style.cssText = `
//     background-color: white;
//     border-radius: 12px;
//     padding: 30px;
//     width: 92%;
//     max-width: 700px;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
//   `;

//   // Pre-fill form data if user is logged in
//   const name = userData?.username || '';
//   const email = userData?.email || '';
//   const phone = userData?.phone || '';

//   // Form with marketing text and responsive design
//   modalContent.innerHTML = `
//     <style>
//       /* Custom Styles */
//       .query-form-content {
//         scrollbar-width: thin;
//         scrollbar-color: #ddd #f5f5f5;
//       }
//       .query-form-content::-webkit-scrollbar {
//         width: 6px;
//       }
//       .query-form-content::-webkit-scrollbar-track {
//         background: #f5f5f5;
//         border-radius: 10px;
//       }
//       .query-form-content::-webkit-scrollbar-thumb {
//         background: #ddd;
//         border-radius: 10px;
//       }
      
//       /* Animation for price */
//       @keyframes pricePulse {
//         0% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//         100% { transform: scale(1); }
//       }
//       .price-animation {
//         animation: pricePulse 2s ease-in-out;
//       }
      
//       /* Focus states */
//       .form-input:focus {
//         border-color: #FF6B00 !important;
//         box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1) !important;
//         outline: none !important;
//       }
      
//       /* Hover states */
//       .submit-btn:hover {
//         transform: translateY(-2px) !important;
//         box-shadow: 0 4px 8px rgba(255, 107, 0, 0.4) !important;
//       }
      
//       /* Responsive CSS */
//       @media (min-width: 768px) {
//         .form-grid {
//           grid-template-columns: 1fr 1fr 1fr !important;
//         }
//         .title-text {
//           font-size: 1.7rem !important;
//         }
//         .subtitle-text {
//           font-size: 1rem !important;
//         }
//         .price-summary {
//           display: grid !important;
//           grid-template-columns: 1fr 1fr !important;
//           gap: 15px !important;
//         }
//         .price-total {
//           font-size: 1.5rem !important;
//         }
//         .form-label {
//           font-size: 0.9rem !important;
//         }
//         .form-input {
//           padding: 12px !important;
//           font-size: 1rem !important;
//         }
//       }
//     </style>

//     <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
//       <div>
//         <h2 class="title-text" style="margin: 0 0 5px 0; color: #333; font-size: 1.5rem; font-weight: 600;">Book Your Experience</h2>
//         <p class="subtitle-text" style="margin: 0; color: #FF6B00; font-size: 0.9rem; font-weight: 500;">${selectedTour.title}</p>
//       </div>
//       <button id="closeQueryForm" style="background: none; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: all 0.2s;">
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//           <line x1="18" y1="6" x2="6" y2="18"></line>
//           <line x1="6" y1="6" x2="18" y2="18"></line>
//         </svg>
//       </button>
//     </div>
    
//     <!-- Price Summary Box - Enhanced and More Detailed -->
//     <div class="price-summary-container" style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
//       <div style="background: linear-gradient(135deg, #FF6B00, #FF9800); padding: 15px; color: white;">
//         <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Price Summary</h3>
//         <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Transparent pricing with no hidden fees</p>
//       </div>
      
//       <div style="background: #fff; padding: 20px; border: 1px solid #f0f0f0; border-top: none;">
//         <div class="price-summary" style="display: block; margin-bottom: 15px;">
//           <div style="margin-bottom: 12px;">
//             <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//               <span style="font-size: 0.9rem; color: #555;">Base Price (per adult)</span>
//               <span style="font-weight: 500; color: #333;">₹${selectedTour.price}</span>
//             </div>
//             <div id="adultPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//               <span style="font-size: 0.85rem; color: #666;">Adults: <span id="adultCountDisplay">1</span></span>
//               <span style="font-weight: 500; color: #333;">₹<span id="adultPriceDisplay">${selectedTour.price}</span></span>
//             </div>
//             <div id="childPriceRow" style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//               <span style="font-size: 0.85rem; color: #666;">Children: <span id="childCountDisplay">0</span> (50% off)</span>
//               <span style="font-weight: 500; color: #333;">₹<span id="childPriceDisplay">0</span></span>
//             </div>
//           </div>
          
//           <div>
//             <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//               <span style="font-size: 0.9rem; color: #555;">Additional</span>
//               <span style="font-weight: 500; color: #333;">₹0</span>
//             </div>
//             <div style="display: flex; justify-content: space-between; padding-left: 15px; margin-bottom: 8px;">
//               <span style="font-size: 0.85rem; color: #666;">Taxes & Fees</span>
//               <span style="font-weight: 500; color: #333;">Included</span>
//             </div>
//           </div>
//         </div>
        
//         <div style="height: 1px; background: #f0f0f0; margin: 10px 0;"></div>
        
//         <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
//           <span style="font-size: 1rem; font-weight: 600; color: #333;">Total Amount</span>
//           <span id="totalPriceDisplay" class="price-total price-animation" style="color: #FF6B00; font-weight: 700; font-size: 1.4rem;">₹${selectedTour.price}</span>
//         </div>
        
//         <div style="margin-top: 12px; padding: 8px 12px; background: #FFF9F5; border-radius: 6px; border-left: 3px solid #FF6B00;">
//           <p style="margin: 0; font-size: 0.8rem; color: #333;">
//             <span style="color: #FF6B00; font-weight: 600;">✓</span> Best price guarantee
//             <span style="color: #FF6B00; font-weight: 600; margin-left: 10px;">✓</span> Free cancellation up to 24 hours before
//           </p>
//         </div>
//       </div>
//     </div>
    
//     <form id="tourQueryForm" class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 16px;">
//       <div class="full-span" style="grid-column: span 2;">
//         <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Personal Information</h3>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryName" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Full Name*</label>
//         <input type="text" id="queryName" required value="${name}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryEmail" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Email Address*</label>
//         <input type="email" id="queryEmail" required value="${email}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryPhone" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Phone Number*</label>
//         <input type="tel" id="queryPhone" required value="${phone}" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; margin-top: 10px;">
//         <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.1rem; font-weight: 600; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">Travel Details</h3>
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryTravelDate" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Travel Date*</label>
//         <input type="date" id="queryTravelDate" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease;">
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryAdults" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Adults (13+ yrs)*</label>
//         <select id="queryAdults" required class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//           <option value="1">1 Adult</option>
//           <option value="2">2 Adults</option>
//           <option value="3">3 Adults</option>
//           <option value="4">4 Adults</option>
//           <option value="5">5 Adults</option>
//           <option value="6">6 Adults</option>
//           <option value="7">7 Adults</option>
//           <option value="8">8 Adults</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryChildren" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Children (5-12 yrs)</label>
//         <select id="queryChildren" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//           <option value="0">0 Children</option>
//           <option value="1">1 Child</option>
//           <option value="2">2 Children</option>
//           <option value="3">3 Children</option>
//           <option value="4">4 Children</option>
//           <option value="5">5 Children</option>
//         </select>
//       </div>
      
//       <div style="grid-column: span 1;">
//         <label for="queryInfants" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Infants (0-4 yrs)</label>
//         <select id="queryInfants" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center; -webkit-appearance: none; -moz-appearance: none; appearance: none;">
//           <option value="0">0 Infants</option>
//           <option value="1">1 Infant</option>
//           <option value="2">2 Infants</option>
//           <option value="3">3 Infants</option>
//         </select>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2;">
//         <label for="queryMessage" class="form-label" style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; color: #444;">Special Requirements or Questions</label>
//         <textarea id="queryMessage" rows="2" class="form-input" style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s ease; resize: none;" placeholder="Dietary requirements, accessibility needs, or any questions..."></textarea>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; margin: 8px 0 12px;">
//         <label style="display: flex; align-items: flex-start; cursor: pointer;">
//           <input type="checkbox" id="queryTerms" required style="margin-right: 10px; margin-top: 3px; min-width: 16px; height: 16px; accent-color: #FF6B00;">
//           <span style="font-size: 0.85rem; color: #555;">I agree to receive updates via email and WhatsApp and accept the <a href="/terms" style="color: #FF6B00; text-decoration: none; font-weight: 500;">Terms & Conditions</a>*</span>
//         </label>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 10px;">
//         <button type="submit" id="proceedBtn" class="submit-btn" style="background: linear-gradient(to right, #FF6B00, #FF9800); color: white; border: none; padding: 12px 0; width: 70%; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 3px 6px rgba(255, 107, 0, 0.3); transition: all 0.3s ease;">
//           Continue to Secure Checkout
//         </button>
        
//         <!-- Loading state message -->
//         <div id="loadingMessage" style="display: none; margin-top: 15px;">
//           <div style="display: flex; align-items: center; justify-content: center;">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: rotate 1s linear infinite;">
//               <style>
//                 @keyframes rotate {
//                   0% { transform: rotate(0deg); }
//                   100% { transform: rotate(360deg); }
//                 }
//               </style>
//               <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
//               <path d="M12 2a10 10 0 0 1 10 10"></path>
//             </svg>
//             <span style="margin-left: 10px; font-size: 0.9rem; color: #FF6B00; font-weight: 500;">Processing your booking...</span>
//           </div>
//         </div>
//       </div>
      
//       <div class="full-span" style="grid-column: span 2; text-align: center; margin-top: 16px;">
//         <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
//           <div style="display: flex; align-items: center; gap: 6px;">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//               <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//             </svg>
//             <span style="font-size: 0.8rem; color: #555;">Secure Payment</span>
//           </div>
          
//           <div style="display: flex; align-items: center; gap: 6px;">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//             </svg>
//             <span style="font-size: 0.8rem; color: #555;">100% Safe</span>
//           </div>
          
//           <div style="display: flex; align-items: center; gap: 6px;">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
//             </svg>
//             <span style="font-size: 0.8rem; color: #555;">24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </form>
//   `;

//   // Append modal to body
//   modalOverlay.appendChild(modalContent);
//   document.body.appendChild(modalOverlay);

//   // Close modal functionality with improved animation
//   document.getElementById('closeQueryForm').addEventListener('click', () => {
//     modalOverlay.style.opacity = '0';
//     modalContent.style.transform = 'scale(0.9)';
//     modalContent.style.transition = 'transform 0.2s ease';
//     modalOverlay.style.transition = 'opacity 0.2s ease';
    
//     setTimeout(() => {
//       document.body.removeChild(modalOverlay);
//     }, 200);
//   });

//   // Enhanced price calculation function with animations
//   const updateTotalPrice = () => {
//     const basePrice = selectedTour.price;
//     const adults = parseInt(document.getElementById('queryAdults').value || 1);
//     const children = parseInt(document.getElementById('queryChildren').value || 0);
    
//     // Update display counts
//     document.getElementById('adultCountDisplay').textContent = adults;
//     document.getElementById('childCountDisplay').textContent = children;
    
//     // Adults pay full price, children pay half price
//     const childrenPrice = basePrice * 0.5 * children;
//     const adultsPrice = basePrice * adults;
    
//     // Update price displays with formatting
//     document.getElementById('adultPriceDisplay').textContent = (adultsPrice).toLocaleString();
//     document.getElementById('childPriceDisplay').textContent = (childrenPrice).toLocaleString();
    
//     const totalPrice = adultsPrice + childrenPrice;
    
//     // Apply animation by removing and re-adding the class
//     const totalPriceElement = document.getElementById('totalPriceDisplay');
//     totalPriceElement.classList.remove('price-animation');
    
//     // Trigger reflow to restart animation
//     void totalPriceElement.offsetWidth;
    
//     totalPriceElement.textContent = '₹' + totalPrice.toLocaleString();
//     totalPriceElement.classList.add('price-animation');
    
//     // Store the calculated price to use in the booking process
//     window.calculatedTotalPrice = totalPrice;
//   };

//   // Add event listeners for price updates
//   document.getElementById('queryAdults').addEventListener('change', updateTotalPrice);
//   document.getElementById('queryChildren').addEventListener('change', updateTotalPrice);
  
//   // Initialize price calculation
//   updateTotalPrice();

//   // Set minimum date for travel date to tomorrow
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
//   document.getElementById('queryTravelDate').setAttribute('min', tomorrowFormatted);

//   // Form submission handler with improved UX feedback
//   document.getElementById('tourQueryForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     // Show loading state
//     const proceedBtn = document.getElementById('proceedBtn');
//     const loadingMessage = document.getElementById('loadingMessage');
//     proceedBtn.disabled = true;
//     proceedBtn.style.opacity = '0.7';
//     proceedBtn.style.transform = 'none';
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

//     // Enhanced form validation with field-specific feedback
//     let isValid = true;
//     let errorFields = [];
    
//     // Basic form validation
//     if (!formData.name) {
//       isValid = false;
//       errorFields.push('Full Name');
//       document.getElementById('queryName').style.borderColor = '#ff4d4f';
//     }
    
//     if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       isValid = false;
//       errorFields.push('Email Address');
//       document.getElementById('queryEmail').style.borderColor = '#ff4d4f';
//     }
    
//     if (!formData.phone) {
//       isValid = false;
//       errorFields.push('Phone Number');
//       document.getElementById('queryPhone').style.borderColor = '#ff4d4f';
//     }
    
//     if (!formData.travelDate) {
//       isValid = false;
//       errorFields.push('Travel Date');
//       document.getElementById('queryTravelDate').style.borderColor = '#ff4d4f';
//     }
    
//     if (!formData.termsAccepted) {
//       isValid = false;
//       errorFields.push('Terms & Conditions');
//       document.getElementById('queryTerms').parentNode.style.color = '#ff4d4f';
//     }
    
//     if (!isValid) {
//       // Alert with specific fields that need attention
//       alert(`Please fill in all required fields: ${errorFields.join(', ')}`);
      
//       // Reset button state
//       proceedBtn.disabled = false;
//       proceedBtn.style.opacity = '1';
//       proceedBtn.textContent = 'Continue to Secure Checkout';
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
//         // Continue with the booking process even if the query saving fails
//       }

//       // 2. Send to WhatsApp in the background
//       sendWhatsAppInBackground(formData);
      
//       // Create/update userData object with form data
//       const updatedUserData = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       };
      
//       // Add a slightly longer delay for better UX
//       setTimeout(() => {
//         // Close the modal with animation
//         modalOverlay.style.opacity = '0';
//         modalContent.style.transform = 'scale(0.9)';
//         modalContent.style.transition = 'transform 0.3s ease';
//         modalOverlay.style.transition = 'opacity 0.3s ease';
        
//         setTimeout(() => {
//           document.body.removeChild(modalOverlay);
          
//           // Proceed with payment - using either existing userData (if logged in) or form data
//           proceedWithPayment(selectedTour, isLoggedIn ? userData : updatedUserData, token, formData.calculatedPrice);
//         }, 300);
//       }, 1800);
      
//     } catch (error) {
//       console.error('🚨 Error processing query:', error);
      
//       // Show error message with retry option
//       loadingMessage.innerHTML = `
//         <div style="display: flex; align-items: center; justify-content: center; color: #ff4d4f; margin-top: 10px;">
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <circle cx="12" cy="12" r="10"></circle>
//             <line x1="12" y1="8" x2="12" y2="12"></line>
//             <line x1="12" y1="16" x2="12.01" y2="16"></line>
//           </svg>
//           // <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
// <span style="margin-left: 8px; font-size: 0.9rem;">Something went wrong. Please try again.</span>
//     </div>
//   `;
  
//   // Reset button state
//   proceedBtn.disabled = false;
//   proceedBtn.style.opacity = '1';
//   proceedBtn.textContent = 'Continue to Secure Checkout';
// }
// });

// // Function to send WhatsApp notification in the background
// const sendWhatsAppInBackground = (formData) => {
// try {
//   // Format the WhatsApp message
//   const message = `*New Booking Request*\n\n*Tour:* ${formData.tourTitle}\n*Date:* ${formData.travelDate}\n*Guests:* ${formData.adults} Adults, ${formData.children} Children, ${formData.infants} Infants\n*Total:* ₹${formData.calculatedPrice}\n\n*From:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\n*Message:* ${formData.message || 'None'}`;
  
//   // Send to WhatsApp API
//   const adminNumber = '+919876543210'; // Replace with actual admin number
//   const encodedMessage = encodeURIComponent(message);
//   const whatsappLink = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`;
  
//   // Use fetch with no-cors mode to avoid CORS issues
//   fetch(whatsappLink, { mode: 'no-cors' })
//     .then(() => console.log('✅ WhatsApp notification sent'))
//     .catch(error => console.error('⚠️ WhatsApp notification error:', error));
  
// } catch (error) {
//   console.error('❌ Error sending WhatsApp notification:', error);
//   // Fail silently - this should not interrupt the booking process
// }
// };
// };
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

const TourModal = ({ tour, isOpen, onClose, selectedTour, handleBookNow,  }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!tour || !isOpen) return null;
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
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row overflow-hidden">
          {/* Image Section - Further reduced height on mobile */}
          <div className="md:w-2/5 relative h-40 md:h-auto">
            <img
              src={tour.image || "http://localhost:5000/uploads/placeholder.jpg"}
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

          {/* Content Section - With scrollable area and fixed buttons */}
          <div className="md:w-3/5 flex flex-col overflow-hidden">
            {/* Scrollable Content Area */}
            <div className="p-4 overflow-y-auto flex-grow pb-20">
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

                {/* Tab Content */}
                <div className="mt-3">
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
            </div>

            {/* Fixed Buttons at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100 shadow-md">
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleBookNow1(tour)}
                  className="w-1/2 rounded-lg bg-orange-500 py-2 font-medium text-white transition-colors hover:bg-orange-600"
                >
                  Book Now
                </button>
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
    </div>
  );
};


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


const FeaturedTours = () => {
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
    <div id="featured-tours" className="container px-4 mt-10 mx-auto">
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

export default FeaturedTours;