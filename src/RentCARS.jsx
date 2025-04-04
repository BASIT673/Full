import { Heart, Share2, HeartIcon,Loader, ScaleIcon,ChevronLeft,ChevronRight,Pause,Clock,Play,ChevronDown,Filter, X,Info,  MapPin, Globe, Check } from 'lucide-react';
import axios from 'axios';
import React from 'react';
// Import icons from lucide-react
import {
  Fuel,
  Car,
  Cpu,
  Wifi,
  Radio,
  Gauge,
  Users,
  Umbrella,
  Calendar,
  Cog,
  Navigation,
  Music,
  Thermometer,
  LockKeyhole,
  Droplet,
  Wind,
  BatteryFull,
  ShieldCheck,
  Headphones,
  Snowflake,
  Armchair,
  Camera,
  ParkingCircle,
  AlertTriangle,
  Smartphone,
  Monitor,
  Key,
  Luggage,
  Bluetooth,
  Star,
  SunSnow
} from "lucide-react";

// Feature icons mapping
const featureIcons = {
  // Engine/Performance
  "engine": Gauge,
  "fuel": Fuel,
  "electric": BatteryFull,
  "hybrid": Droplet,
  "auto": Cog,
  "manual": Cpu,
  "awd": Car,
  "speed": Gauge,
  "performance": Gauge,
  "hp": Gauge,
  
  // Interior
  // "seats": Users,
  "leather": Armchair,
  "heated": Thermometer,
  "air": Wind,
  "climate": SunSnow,
  "ac": Snowflake,
  
  // Tech
  "bluetooth": Bluetooth,
  "wifi": Wifi,
  "infotainment": Monitor,
  "audio": Music,
  "premium-audio": Headphones,
  "navigation": Navigation,
  "gps": Navigation,
  "touchscreen": Smartphone,
  "usb": Smartphone,
  "radio": Radio,
  "camera": Camera,
  "backup-camera": Camera,
  
  // Safety
  "safety": ShieldCheck,
  "parking": ParkingCircle,
  "cruise": Gauge,
  "airbag": AlertTriangle,
  "security": LockKeyhole,
  "alarm": AlertTriangle,
  
  // Convenience
  "remote": Key,
  "roof": Umbrella,
  "sunroof": Star,
  "luggage": Luggage,
  "space": Luggage,
  "rental": Calendar,
  
  // Default
  "default": Cog
};

// export default featureIcons;
import { useState,useReducer,useCallback,useRef,useMemo,useEffect } from "react";
const RentCARS = () => {
  // State declarations
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAllCarsPage, setIsAllCarsPage] = useState(false);
  const autoplayInterval = 5000;
  const handleGetQuote = () => {
    // console.log("Get quote for:", destination.title);
    
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
             <h2>Get Your Exclusive Quote for  || 'This Experience'}</h2>
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
  const handleGetQuote1 = (car) => {
    console.log("Get quote for car:", );
    
    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('quote-modal-container');
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'quote-modal-container';
      document.body.appendChild(modalContainer);
    }
    
    // Create and populate the modal content with marketing elements
    modalContainer.innerHTML = `
      <div class="quote-modal-overlay">
        <div class="quote-modal">
          <div class="quote-modal-header">
            <h2>Get Your Exclusive Quote for ${car.title || 'This Vehicle'}</h2>
            <button class="quote-close-btn">&times;</button>
          </div>
          
          <div class="quote-banner">
            <div class="quote-banner-content">
              <div class="quote-banner-icon">🔑</div>
              <div class="quote-banner-text">
                <strong>Limited Time Offer!</strong> Book within 24 hours and receive a 10% early bird discount!
              </div>
            </div>
          </div>
          
          <div class="quote-modal-body">
            <div class="quote-intro">
              <p>Join thousands of satisfied travelers who have chosen our premium car rental services. Our fleet specialists are ready to ensure you get the perfect vehicle for your journey.</p>
              <div class="quote-benefits">
                <div class="benefit-item"><span class="benefit-icon">✓</span> No Hidden Fees</div>
                <div class="benefit-item"><span class="benefit-icon">✓</span> Free Cancellation</div>
                <div class="benefit-item"><span class="benefit-icon">✓</span> 24/7 Roadside Assistance</div>
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
                  <label for="quote-pickup-date">Pickup Date*</label>
                  <input type="date" id="quote-pickup-date" required />
                </div>
                <div class="form-group">
                  <label for="quote-return-date">Return Date*</label>
                  <input type="date" id="quote-return-date" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="quote-pickup-location">Pickup Location*</label>
                  <select id="quote-pickup-location" required>
                    <option value="">Select Location</option>
                    <option value="airport">Airport Terminal</option>
                    <option value="downtown">Downtown Office</option>
                    <option value="hotel">Hotel Delivery</option>
                    <option value="custom">Custom Location</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="quote-driver-age">Driver's Age*</label>
                  <select id="quote-driver-age" required>
                    <option value="">Select Age</option>
                    <option value="18-21">18-21</option>
                    <option value="22-25">22-25</option>
                    <option value="26+">26+</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="quote-message">Special Requirements</label>
                <textarea id="quote-message" placeholder="Child seat, GPS, additional driver, etc."></textarea>
              </div>
              
              <div class="quote-promo">
                <div class="promo-icon">⏱️</div>
                <p>High demand period! <strong>5 other travelers</strong> are looking at this vehicle right now.</p>
              </div>
              
              <div class="form-checkbox">
                <input type="checkbox" id="quote-insurance" checked />
                <label for="quote-insurance">Add comprehensive insurance coverage (+$25/day)</label>
              </div>
              
              <div class="form-checkbox">
                <input type="checkbox" id="quote-newsletter" checked />
                <label for="quote-newsletter">Send me exclusive deals and offers (5% off your next rental!)</label>
              </div>
              
              <button type="submit" class="quote-submit-btn">
                <span class="btn-text">Get My Personalized Quote</span>
                <span class="btn-icon">→</span>
              </button>
            </form>
            
            <div class="quote-trust">
              <p>Trusted by over 500K+ travelers across our global locations</p>
              <div class="trust-icons">
                <div class="trust-icon">⭐⭐⭐⭐⭐</div>
                <div class="trust-text">4.8/5 from 8,000+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
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
    
    /* Add other necessary styles for form elements */
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
        pickupDate: document.getElementById('quote-pickup-date').value,
        returnDate: document.getElementById('quote-return-date').value,
        pickupLocation: document.getElementById('quote-pickup-location').value,
        driverAge: document.getElementById('quote-driver-age').value,
        message: document.getElementById('quote-message').value,
        insuranceCoverage: document.getElementById('quote-insurance').checked,
        newsletterSubscription: document.getElementById('quote-newsletter').checked,
        carId: car.id || '',
        carModel: car.title || '',
        requestTimestamp: new Date().toISOString(),
        source: window.location.href,
        utm: getUTMParams() // Function to get UTM parameters if available
      };
      
      console.log("Car quote form submitted:", formData);
      
      // Show loading state
      const submitBtn = document.querySelector('.quote-submit-btn');
      submitBtn.innerHTML = '<span>Processing...</span>';
      submitBtn.disabled = true;
      
      // Simulate API call to submit quote request
      setTimeout(() => {
        // Replace form with success message
        document.querySelector('.quote-modal-body').innerHTML = `
          <div class="quote-success">
            <div class="quote-success-icon">✓</div>
            <h3>Your Car Quote Request is Confirmed!</h3>
            <p>Thank you, ${formData.name}! Our team will prepare your personalized quote for the ${car.title || 'vehicle'} and contact you within 12 hours at ${formData.email}.</p>
            <p>Don't forget - book within 24 hours to claim your exclusive 10% early bird discount!</p>
            <button class="quote-close-success-btn">Close</button>
          </div>
        `;
        
        // Add event listener to new close button
        document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
          modalContainer.remove();
        });
        
        // Actually send the form data to server
        // sendCarQuoteRequestToServer(formData);
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
  // Memoized filtered cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesType = selectedCarTypes.length === 0 || 
                        (car.type && selectedCarTypes.includes(car.type));
      return matchesSearch && matchesPrice && matchesType;
    });
  }, [searchTerm, cars, priceRange, selectedCarTypes]);

  // Memoized visible cars for carousel
  const visibleCars = useMemo(() => {
    if (isAllCarsPage) return filteredCars;
    if (isMobile) return filteredCars.slice(currentIndex, currentIndex + 1);
    return [
      filteredCars[currentIndex % filteredCars.length],
      filteredCars[(currentIndex + 1) % filteredCars.length],
      filteredCars[(currentIndex + 2) % filteredCars.length]
    ].filter(Boolean);
  }, [currentIndex, filteredCars, isMobile, isAllCarsPage]);

  // Memoized car types
  const carTypes = useMemo(() => 
    [...new Set(cars.filter(car => car.type).map(car => car.type))],
    [cars]
  );
  const handleCarSelect = useCallback((car) => {
    setSelectedCar(car);
    setShowRentalForm(true);
  }, []);
  // Memoized car selection handler
  // const handleCarSelect = useCallback((car) => {
  //   setSelectedCar(car);
  //   setShowRentalForm(true);
  // }, []);

  // Memoized navigation handlers
  const handleNextCar = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % filteredCars.length);
  }, [filteredCars.length]);

  const handlePreviousCar = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? filteredCars.length - 1 : prev - 1));
  }, [filteredCars.length]);
// Fix for the fetchCars useCallback


; // Properly include handleNextCar
  // Fetch cars
  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://backend-1-7zwm.onrender.com/api/cars');
      if (response.data) setCars(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // // Initialize component
  useEffect(() => {
    fetchCars();
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [fetchCars]);

  // // Autoplay management
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      
      autoplayIntervalRef.current = setInterval(() => {
        if (!isAutoplayPaused && filteredCars.length > 0) {
          handleNextCar();
        }
      }, autoplayInterval);
    };

    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isAutoplayPaused, filteredCars.length, handleNextCar]);
  const handleRentCar = async (car) => {
      if (!car) {
        alert("❌ Invalid car selected. Please try again.");
        return;
      }
    
      // Open the query form modal
      setShowRentalForm(true);
      setSelectedCar(car);
    };
    
    // Component for the Rental Query Form
    const RentalQueryForm = React.memo(({ car, onSubmit, onClose }) => {
      const [formData, setFormData] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        pickupLocation: "",
        dropoffLocation: "",
        driverName: "",
        phoneNumber: "",
        email: "",
        additionalRequirements: "",
      });
      
      const [isLoading, setIsLoading] = useState(false);
      const [totalPrice, setTotalPrice] = useState(car.price);
      
      // Calculate number of days between dates
      const calculateDays = (start, end) => {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
      };
      
      // Calculate total price based on number of rental days
      const calculatePrice = (startDate, endDate) => {
        const days = calculateDays(startDate, endDate);
        return car.price * days;
      };
      
      useEffect(() => {
        // Update price whenever dates change
        const newPrice = calculatePrice(formData.startDate, formData.endDate);
        setTotalPrice(newPrice);
      }, [formData.startDate, formData.endDate]);
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
      
      // Handle date changes
      const handleDateChange = (name, date) => {
        setFormData(prev => ({ ...prev, [name]: date }));
      };
      const handleGetQuote = (car) => {
        console.log("Get quote for car:", car.title);
        
        // Create modal container if it doesn't exist
        let modalContainer = document.getElementById('quote-modal-container');
        if (!modalContainer) {
          modalContainer = document.createElement('div');
          modalContainer.id = 'quote-modal-container';
          document.body.appendChild(modalContainer);
        }
        
        // Create and populate the modal content with marketing elements
        modalContainer.innerHTML = `
          <div class="quote-modal-overlay">
            <div class="quote-modal">
              <div class="quote-modal-header">
                <h2>Get Your Exclusive Quote for ${car.title || 'This Vehicle'}</h2>
                <button class="quote-close-btn">&times;</button>
              </div>
              
              <div class="quote-banner">
                <div class="quote-banner-content">
                  <div class="quote-banner-icon">🔑</div>
                  <div class="quote-banner-text">
                    <strong>Limited Time Offer!</strong> Book within 24 hours and receive a 10% early bird discount!
                  </div>
                </div>
              </div>
              
              <div class="quote-modal-body">
                <div class="quote-intro">
                  <p>Join thousands of satisfied travelers who have chosen our premium car rental services. Our fleet specialists are ready to ensure you get the perfect vehicle for your journey.</p>
                  <div class="quote-benefits">
                    <div class="benefit-item"><span class="benefit-icon">✓</span> No Hidden Fees</div>
                    <div class="benefit-item"><span class="benefit-icon">✓</span> Free Cancellation</div>
                    <div class="benefit-item"><span class="benefit-icon">✓</span> 24/7 Roadside Assistance</div>
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
                      <label for="quote-pickup-date">Pickup Date*</label>
                      <input type="date" id="quote-pickup-date" required />
                    </div>
                    <div class="form-group">
                      <label for="quote-return-date">Return Date*</label>
                      <input type="date" id="quote-return-date" required />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="quote-pickup-location">Pickup Location*</label>
                      <select id="quote-pickup-location" required>
                        <option value="">Select Location</option>
                        <option value="airport">Airport Terminal</option>
                        <option value="downtown">Downtown Office</option>
                        <option value="hotel">Hotel Delivery</option>
                        <option value="custom">Custom Location</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="quote-driver-age">Driver's Age*</label>
                      <select id="quote-driver-age" required>
                        <option value="">Select Age</option>
                        <option value="18-21">18-21</option>
                        <option value="22-25">22-25</option>
                        <option value="26+">26+</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="quote-message">Special Requirements</label>
                    <textarea id="quote-message" placeholder="Child seat, GPS, additional driver, etc."></textarea>
                  </div>
                  
                  <div class="quote-promo">
                    <div class="promo-icon">⏱️</div>
                    <p>High demand period! <strong>5 other travelers</strong> are looking at this vehicle right now.</p>
                  </div>
                  
                  <div class="form-checkbox">
                    <input type="checkbox" id="quote-insurance" checked />
                    <label for="quote-insurance">Add comprehensive insurance coverage (+$25/day)</label>
                  </div>
                  
                  <div class="form-checkbox">
                    <input type="checkbox" id="quote-newsletter" checked />
                    <label for="quote-newsletter">Send me exclusive deals and offers (5% off your next rental!)</label>
                  </div>
                  
                  <button type="submit" class="quote-submit-btn">
                    <span class="btn-text">Get My Personalized Quote</span>
                    <span class="btn-icon">→</span>
                  </button>
                </form>
                
                <div class="quote-trust">
                  <p>Trusted by over 500K+ travelers across our global locations</p>
                  <div class="trust-icons">
                    <div class="trust-icon">⭐⭐⭐⭐⭐</div>
                    <div class="trust-text">4.8/5 from 8,000+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
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
            pickupDate: document.getElementById('quote-pickup-date').value,
            returnDate: document.getElementById('quote-return-date').value,
            pickupLocation: document.getElementById('quote-pickup-location').value,
            driverAge: document.getElementById('quote-driver-age').value,
            message: document.getElementById('quote-message').value,
            insuranceCoverage: document.getElementById('quote-insurance').checked,
            newsletterSubscription: document.getElementById('quote-newsletter').checked,
            carId: car.id || '',
            carModel: car.title || '',
            requestTimestamp: new Date().toISOString(),
            source: window.location.href,
            utm: getUTMParams() // Function to get UTM parameters if available
          };
          
          console.log("Car quote form submitted:", formData);
          
          // Show loading state
          const submitBtn = document.querySelector('.quote-submit-btn');
          submitBtn.innerHTML = '<span>Processing...</span>';
          submitBtn.disabled = true;
          
          // Simulate API call to submit quote request
          setTimeout(() => {
            // Replace form with success message
            document.querySelector('.quote-modal-body').innerHTML = `
              <div class="quote-success">
                <div class="quote-success-icon">✓</div>
                <h3>Your Car Quote Request is Confirmed!</h3>
                <p>Thank you, ${formData.name}! Our team will prepare your personalized quote for the ${car.title || 'vehicle'} and contact you within 12 hours at ${formData.email}.</p>
                <p>Don't forget - book within 24 hours to claim your exclusive 10% early bird discount!</p>
                <button class="quote-close-success-btn">Close</button>
              </div>
            `;
            
            // Add event listener to new close button
            document.querySelector('.quote-close-success-btn').addEventListener('click', () => {
              modalContainer.remove();
            });
            
            // Actually send the form data to server
            // sendCarQuoteRequestToServer(formData);
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
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
          // Fetch user data if available
          const token = localStorage.getItem("token");
          let userData = null;
          
          if (token) {
            try {
              console.log("🟢 Fetching user details...");
              const userRes = await axios.get("https://backend-1-7zwm.onrender.com/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
              });
              userData = userRes.data;
              console.log("✅ User Data Retrieved:", userData);
              
              // Pre-fill email if user is logged in and form email is empty
              if (userData?.email && !formData.email) {
                setFormData(prev => ({ ...prev, email: userData.email }));
              }
            } catch (error) {
              console.error("🚨 Error fetching user data:", error);
            }
          }
          
          // Use form email or fall back to user email or ask for email
          let userEmail = formData.email?.trim() || userData?.email?.trim() || "";
          if (!userEmail) {
            console.warn("⚠️ No email found! Asking user...");
            userEmail = prompt("Please enter your email for booking confirmation:");
            if (!userEmail) {
              alert("❌ Email is required for car rental.");
              setIsLoading(false);
              return;
            }
            setFormData(prev => ({ ...prev, email: userEmail }));
          }
          
          // Create rental details
          const rentalDetails = {
            id: `car-${Date.now()}`,
            name: car.name,
            description: `Rent ${car.name} for your trip from ${formData.startDate.toLocaleDateString()} to ${formData.endDate.toLocaleDateString()}`,
            days: calculateDays(formData.startDate, formData.endDate),
            pickupLocation: formData.pickupLocation,
            dropoffLocation: formData.dropoffLocation,
            totalPrice,
            customerInfo: {
              name: formData.driverName || userData?.username || "Guest",
              phone: formData.phoneNumber,
              email: userEmail,
              additionalRequirements: formData.additionalRequirements
            }
          };
          
          console.log("✅ Rental Details:", rentalDetails);
          
          // Close the form and proceed to payment
          onClose();
          onSubmit(rentalDetails);
        } catch (error) {
          console.error("🚨 Form submission error:", error);
          alert("❌ Form submission failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
    
      // Complete JSX structure
      return (
        <div className="rental-form-overlay">
          <div className="rental-form-container">
            {/* Form Header */}
            <div className="rental-form-header" style={{ backgroundColor: "#FF7A00", color: "white" }}>
              <h2>Rent {car.name}</h2>
              <button className="close-button" onClick={onClose} aria-label="Close form">×</button>
            </div>
    
            {/* Main Form Content */}
            <form onSubmit={handleSubmit} className="rental-form">
              {/* Date Selection Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Pick-up Date</label>
                  <input
                    id="startDate"
                    type="date"
                    value={formData.startDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">Return Date</label>
                  <input
                    id="endDate"
                    type="date"
                    value={formData.endDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
                    required
                    min={formData.startDate.toISOString().split('T')[0]}
                  />
                </div>
              </div>
    
              {/* Location Details Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pickupLocation">Pick-up Location</label>
                  <input
                    id="pickupLocation"
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pick-up location"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dropoffLocation">Drop-off Location</label>
                  <input
                    id="dropoffLocation"
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder="Enter drop-off location"
                    required
                  />
                </div>
              </div>
    
              {/* Driver Information Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="driverName">Full Name</label>
                  <input
                    id="driverName"
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="Enter driver's full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                  />
                </div>
              </div>
    
              {/* Email and Additional Info */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email for confirmation"
                    required
                  />
                </div>
              </div>
    
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="additionalRequirements">Additional Requirements</label>
                  <textarea
                    id="additionalRequirements"
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    placeholder="Any special requests or requirements?"
                    rows="3"
                  />
                </div>
              </div>
    
              {/* Price Summary Section */}
              <div className="rental-summary">
                <h3>Rental Summary</h3>
                <div className="summary-item">
                  <span>Vehicle:</span>
                  <strong>{car.name}</strong>
                </div>
                <div className="summary-item">
                  <span>Duration:</span>
                  <strong>{calculateDays(formData.startDate, formData.endDate)} days</strong>
                </div>
                <div className="summary-item">
                  <span>Daily Rate:</span>
                  <strong>₹{car.price}/day</strong>
                </div>
                <div className="summary-total">
                  <span>Total Price:</span>
                  <strong>₹{totalPrice}</strong>
                </div>
              </div>
    
              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="cancel-button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  style={{ backgroundColor: "#FF7A00" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </form>
          </div>
          <style jsx>{rentalFormStyles}</style>
        </div>
      );
    });
    
    // Payment processing function
    const processRentalPayment = async (rentalDetails) => {
      try {
        // Fetch the user token
        const token = localStorage.getItem("token");
        console.log("🔵 Token Retrieved:", token);
        
        const userEmail = rentalDetails.customerInfo.email;
        console.log("✅ Final User Email:", userEmail);
        
        // Payment Process
        const loadRazorpay = () => {
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => {
              console.error("❌ Razorpay SDK failed to load");
              resolve(false);
            };
            document.body.appendChild(script);
          });
        };
        
        const res = await loadRazorpay();
        if (!res) {
          alert("❌ Razorpay SDK failed to load");
          return;
        }
    
        const amountInPaise = String(rentalDetails.totalPrice).replace(",", "");
    
        const payload = {
          amount: amountInPaise,
          rentalDetails,
          email: userEmail,
          name: rentalDetails.customerInfo.name,
        };
    
        console.log("✅ Request Payload:", payload);
    
        const orderResponse = await fetch("https://backend-1-7zwm.onrender.com/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          amount: rentalDetails.totalPrice * 100,
          currency: "INR",
          name: "Kashmir Travels",
          description: rentalDetails.description,
          order_id: order.id,
          handler: async function (response) {
            try {
              console.log("🟢 Payment Successful! Sending verification request...");
              const verifyResponse = await fetch("https://backend-1-7zwm.onrender.com/api/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  customerDetails: {
                    name: rentalDetails.customerInfo.name,
                    email: userEmail,
                    phone: rentalDetails.customerInfo.phone,
                    pickupLocation: rentalDetails.pickupLocation,
                    dropoffLocation: rentalDetails.dropoffLocation,
                    rentalDays: rentalDetails.days,
                    startDate: rentalDetails.startDate,
                    endDate: rentalDetails.endDate
                  },
                }),
              });
    
              console.log("✅ Sent Token in API Call:", token);
    
              const data = await verifyResponse.json();
              if (data.success) {
                alert("🎉 Car rental successful! Confirmation sent to your email.");
              } else {
                alert("❌ Payment verification failed");
              }
            } catch (error) {
              console.error("🚨 Payment verification error:", error);
              alert("❌ Payment verification failed");
            }
          },
          prefill: {
            name: rentalDetails.customerInfo.name,
            email: userEmail,
            contact: rentalDetails.customerInfo.phone
          },
          theme: { color: "#FF7A00" },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("🚨 Payment error:", error);
        alert("❌ Payment initiation failed");
      }
    };
    
    
     const rentalFormStyles =`
      .rental-form-overlay{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      overflow-y: auto; /* Ensure scroll if content overflows */
    }
    
    .rental-form-container {
      width: 100%;
      max-width: 800px;
      max-height: 90vh; /* Limit max height for better fit */
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .rental-form-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0; /* Prevent header from shrinking */
    }
    
    .rental-form-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    
    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      color: white;
      cursor: pointer;
    }
    
    .rental-form {
      padding: 20px;
      overflow-y: auto; /* Enable scrolling for form content */
      flex-grow: 1; /* Allow the form to expand */
    }
    
    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }
    
    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .form-group.full-width {
      flex: 0 0 100%;
      max-width: 100%;
    }
    
    .form-group label {
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #FF7A00;
      box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.1);
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    .rental-summary {
      margin: 20px 0;
      border: 1px solid #eee;
      background-color: #FFF3E0;
      padding: 15px;
      border-radius: 5px;
    }
    
    .rental-summary h3 {
      margin-top: 0;
      color: #FF7A00;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    
    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .summary-total {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eee;
      font-size: 18px;
      color: #FF7A00;
    }
    
    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 20px;
      flex-shrink: 0; /* Prevent actions from shrinking */
    }
    
    .cancel-button,
    .submit-button {
      padding: 12px 25px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .cancel-button {
      background-color: #f0f0f0;
      color: #333;
    }
    
    .cancel-button:hover {
      background-color: #e0e0e0;
    }
    
    .submit-button {
      color: white;
    }
    
    .submit-button:hover {
      background-color: #FF6500;
      transform: translateY(-1px);
    }
    
    .spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    @media (max-width: 768px) {
      .rental-form-container {
        width: 95%;
        margin: 10px;
      }
    
      .form-row {
        flex-direction: column;
        gap: 15px;
      }
    
      .form-group {
        width: 100%;
      }
    
      .form-actions {
        flex-direction: column-reverse;
      }
    
      .cancel-button,
      .submit-button {
        width: 100%;
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      .rental-form-header h2 {
        font-size: 18px;
      }
    
      .form-group input,
      .form-group textarea {
        font-size: 13px;
      }
    }`
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextCar();
      if (e.key === 'ArrowLeft') handlePreviousCar();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCar, handlePreviousCar]);

  // Reset index when filtered cars change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredCars]);

  const toggleFilter = useCallback(() => {
    setFilterOpen(prev => !prev);
  }, []);

  const handleCarTypeToggle = useCallback((type) => {
    setSelectedCarTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplayPaused(prev => !prev);
  }, []);

  const LoadingState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Loading cars...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchCars}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center p-8">
      <p className="text-gray-500 text-lg">No cars found matching your search.</p>
      <div className="mt-4 flex flex-col items-center gap-2">
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear search term
          </button>
        )}
        {selectedCarTypes.length > 0 && (
          <button
            onClick={() => setSelectedCarTypes([])}
            className="text-orange-500 hover:text-orange-600"
          >
            Clear car type filters
          </button>
        )}
        {(priceRange[0] > 0 || priceRange[1] < 500) && (
          <button
            onClick={() => setPriceRange([0, 500])}
            className="text-orange-500 hover:text-orange-600"
          >
            Reset price range
          </button>
        )}
      </div>
    </div>
  );
  const CarCard =   React.memo(({ car, isSlider = false }) => {
        const [isLiked, setIsLiked] = useState(false);
        const [showDetails, setShowDetails] = useState(false);
    
        return (
          <div className={`bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl overflow-hidden ${
            isSlider ? 'max-w-lg mx-auto' : ''
          } border border-orange-100 hover:border-orange-200 transition-all duration-300`}>
            <div className="relative group">
              <img 
                src={car.image}
                // src={`https://backend-1-7zwm.onrender.com${car.image}}`}
                alt={car.name} 
                className={`w-full object-cover ${isSlider ? 'h-72' : 'h-56'}`}
              />
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                {car.type || "Sedan"}
              </div>
    
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full backdrop-blur-sm ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
    
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                ${car.price}/day
              </div>
    
              {car.location && (
                <div className="absolute bottom-4 right-4 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {car.location}
                </div>
              )}
            </div>
    
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className={`${
                    isSlider ? 'text-2xl' : 'text-xl'
                  } font-bold text-gray-800`}>
                    {car.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 text-sm text-gray-600">
                        {car.rating || "4.8"} 
                        <span className="text-gray-400 ml-1">
                          ({car.reviewCount || "24"} reviews)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  <ChevronDown 
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      showDetails ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
    
              {showDetails && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {car.features && car.features.map((feature) => (
                      <div 
                        key={feature._id}
                        className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3"
                      >
                        <span className="text-orange-500">
                          {featureIcons[feature.icon] 
                            ? React.createElement(featureIcons[feature.icon], { className: 'w-4 h-4' }) 
                            :       <Car className="w-5 h-5" />
                          }
                        </span>
                        <span className="truncate">{feature.text}</span>
                      </div>
                    ))}
                  </div>
    
                  <div className="flex items-center justify-start space-x-2 text-sm text-gray-500 mb-6">
                    <Info className="w-4 h-4" />
                    <span>Available for immediate rental</span>
                  </div>
                </div>
              )}
        <div className="grid grid-cols-2 gap-3 mb-4 w-full">
                        {/* <button 
                            // onClick={handleRentNow}
                            className=" w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3 flex items-center justify-center hover:bg-orange-600 transition"
                        >
                            <ShieldCheck className="mr-2 w-5 h-5" /> Rent Now
                        </button> */}
                        {/* <CarInquiryButton/> */}
                        {/* <button 
                            // onClick={handleBookLater}
                            className="border border-orange-500 text-orange-500 rounded-xl py-3 flex items-center justify-center hover:bg-orange-50 transition"
                        >
                            <Calendar className="mr-2 w-5 h-5" />Inquire Now
                        </button> */}
                    </div>
              {/* <button
                onClick={() => handleRentCar(car)}
         
                className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
                  shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-orange-600
                  ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
                `}
              >
                Rent Now
              </button> */}
              <div className="flex flex-col space-y-2">
                {/* Primary action */}
{/* Primary action */}
<button
  // onClick={() => handleGetQuote(car)}
  onClick={() => handleRentCar(car)}
  // onClick={handleRentCar}
  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-lg
    shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-px
    py-3 text-base font-medium flex items-center justify-center gap-2"
>
  <span>Rent Now</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
</button>

<button
// onClick={handleGetQuote1}
// onClick={handleRentCar}
  onClick={() => handleGetQuote1(car)}
  className={`w-full border border-orange-500 text-orange-500 bg-white rounded-lg
    shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md
    ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'} font-medium mt-3 flex items-center justify-center gap-2`}
>
  <span>Get Quote</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
</button>
  {/* Primary action */}
  {/* <button
    onClick={() => handleGetQuote(car)}
    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
      shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-orange-600
      py-3 text-base"
  >
    Rent Now
  </button>
  <button */}
    {/* onClick={() =>  handleGetQuote1(car)}
    className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium
      shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-orange-600
      ${isSlider ? 'py-3.5 text-lg' : 'py-3 text-base'}
    `}
  >
    Get Quote
  </button> */}
  {/* Secondary action */}
  {/* <button
    // onClick={() => handleViewDetails(car)}
    className="w-full bg-white border border-orange-300 text-orange-500 rounded-xl font-medium
      hover:bg-orange-50 py-3 text-base"
  >
    View Details
  </button> */}
  
  {/* Optional tertiary actions */}
  
</div>
            </div>
          </div>
        );
  });
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (filteredCars.length === 0) return <EmptyState />;
  console.log("Cars mounted")
  return (
      <div id='rental-services' className="container mx-auto p-4 w-full max-w-7xl">
        {/* Rental Query Form */}
        {showRentalForm && selectedCar && (
          <RentalQueryForm 
            car={selectedCar} 
            onSubmit={processRentalPayment} 
            onClose={() => setShowRentalForm(false)} 
          />
        )}
    
        {/* Header and View All Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {isAllCarsPage ? 'All Cars' : 'Premium Car Rentals'}
            </h2>
            {filteredCars.length > (isMobile ? 1 : 3) && (
           
              <button
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
                         hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
              // onClick={toggleShowAllTours}
              // onClick={() => setIsAllDestinationsPage(!isAllDestinationsPage)}
              onClick={() => setIsAllCarsPage(!isAllCarsPage)}
            >
              {isAllCarsPage  ? "Show Less" : "View All"} <span className="arrow-icon text-lg">→</span>
            </button>
            )}
          </div>
    
          {/* Search and Filter */}
          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-2/3">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                onClick={toggleFilter}
                className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters {filterOpen ? '▲' : '▼'}
              </button>
            </div>
    
            {/* Filters Panel */}
            {filterOpen && (
              <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full accent-orange-500"
                      />
                      <span>${priceRange[0]}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-orange-500"
                      />
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Car Types */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Car Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {carTypes.map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCarTypes.includes(type)}
                            onChange={() => handleCarTypeToggle(type)}
                            className="rounded text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    
        {/* Cars Display */}
        {isAllCarsPage ? (
          // Grid view for all cars
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <div key={car._id || index}>
                <CarCard 
                  car={car} 
                  onClick={() => {
                    setSelectedCar(car);
                    setShowRentalForm(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          // Carousel view
          <>
            {/* Desktop View */}
            {!isMobile && (
              <div className="relative w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {visibleCars.map((car, index) => (
                    <div key={car._id || index}>
                      <CarCard 
                        car={car} 
                        onClick={() => {
                          setSelectedCar(car);
                          setShowRentalForm(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
    
                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
                  <button
                    onClick={handlePreviousCar}
                    className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
                    aria-label="Previous Car"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
                  </button>
                  <button
                    onClick={handleNextCar}
                    className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
                    aria-label="Next Car"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
                  </button>
                </div>
              </div>
            )}
    
            {/* Mobile View */}
            {isMobile && filteredCars.length > 0 && (
              <div 
                className="relative"
                onMouseEnter={() => setIsAutoplayPaused(true)}
                onMouseLeave={() => setIsAutoplayPaused(false)}
              >
                <div>
                  <CarCard 
                    car={filteredCars[currentIndex]} 
                    isSlider 
                    onClick={() => {
                      setSelectedCar(filteredCars[currentIndex]);
                      setShowRentalForm(true);
                    }}
                  />
                </div>
                
                {/* Mobile Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
                  <button
                    onClick={handlePreviousCar}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Previous Car"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextCar}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Next Car"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
    
                {/* Autoplay Toggle */}
                <button
                  onClick={toggleAutoplay}
                  className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
                >
                  {isAutoplayPaused ? (
                    <Play className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Pause className="w-4 h-4 text-gray-700" />
                  )}
                </button>
              </div>
            )}
    
            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {filteredCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`
                    transition-all duration-300 
                    ${index === currentIndex 
                      ? 'bg-orange-500 w-6 rounded-full' 
                      : 'bg-gray-300 w-2 rounded-full'}
                    h-2
                  `}
                  aria-label={`Go to car ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
    };
    
    export default RentCARS;
//   return (
//     <div id='cars' className="container mx-auto p-4 w-full max-w-7xl">
//       {showRentalForm && selectedCar && (
//         <MemoizedRentalForm
//           key={`rental-form-${selectedCar._id}`}
//           car={selectedCar}
//           onSubmit={processRentalPayment}
//           onClose={() => setShowRentalForm(false)}
//         />
//       )}

//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isAllCarsPage ? 'All Cars' : 'Premium Car Rentals'}
//           </h2>
//           {filteredCars.length > (isMobile ? 1 : 3) && (
//             <button
//               className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg shadow-md
//                          hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center gap-2"
//               onClick={() => setIsAllCarsPage(!isAllCarsPage)}
//             >
//               {isAllCarsPage ? "Show Less" : "View All"} 
//               <span className="arrow-icon text-lg">→</span>
//             </button>
//           )}
//         </div>

//         <div className="mt-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative w-full md:w-2/3">
//               <input
//                 type="text"
//                 placeholder="Search cars..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//             <button 
//               onClick={toggleFilter}
//               className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters {filterOpen ? '▲' : '▼'}
//             </button>
//           </div>

//           {filterOpen && (
//             <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-md">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
//                   <div className="flex items-center gap-4">
//                     <input 
//                       type="range" 
//                       min="0" 
//                       max="500" 
//                       value={priceRange[0]} 
//                       onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
//                       className="w-full accent-orange-500"
//                     />
//                     <span>${priceRange[0]}</span>
//                   </div>
//                   <div className="flex items-center gap-4 mt-2">
//                     <input 
//                       type="range" 
//                       min="0" 
//                       max="500" 
//                       value={priceRange[1]} 
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full accent-orange-500"
//                     />
//                     <span>${priceRange[1]}</span>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="font-medium text-gray-700 mb-2">Car Type</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {carTypes.map((type) => (
//                       <label key={type} className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={selectedCarTypes.includes(type)}
//                           onChange={() => handleCarTypeToggle(type)}
//                           className="rounded text-orange-500 focus:ring-orange-500"
//                         />
//                         <span className="text-gray-700">{type}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {isAllCarsPage ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//           {filteredCars.map((car) => (
//             <div key={car._id}>
//               <CarCard 
//                 car={car} 
//                 onClick={() => handleCarSelect(car)}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           {!isMobile && (
//             <div className="relative w-full">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {visibleCars.map((car) => (
//                   <div key={car._id}>
//                     <CarCard 
//                       car={car} 
//                       onClick={() => handleCarSelect(car)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 pointer-events-none">
//                 <button
//                   onClick={handlePreviousCar}
//                   className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//                   aria-label="Previous Car"
//                 >
//                   <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//                 </button>
//                 <button
//                   onClick={handleNextCar}
//                   className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all group pointer-events-auto"
//                   aria-label="Next Car"
//                 >
//                   <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
//                 </button>
//               </div>
//             </div>
//           )}

//           {isMobile && filteredCars.length > 0 && (
//             <div 
//               className="relative"
//               onMouseEnter={() => setIsAutoplayPaused(true)}
//               onMouseLeave={() => setIsAutoplayPaused(false)}
//             >
//               <div>
//                 <CarCard 
//                   car={filteredCars[currentIndex]} 
//                   isSlider 
//                   onClick={() => handleCarSelect(filteredCars[currentIndex])}
//                 />
//               </div>
              
//               <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4">
//                 <button
//                   onClick={handlePreviousCar}
//                   className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//                   aria-label="Previous Car"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-gray-700" />
//                 </button>
//                 <button
//                   onClick={handleNextCar}
//                   className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//                   aria-label="Next Car"
//                 >
//                   <ChevronRight className="w-5 h-5 text-gray-700" />
//                 </button>
//               </div>

//               <button
//                 onClick={toggleAutoplay}
//                 className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
//                 aria-label={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
//               >
//                 {isAutoplayPaused ? (
//                   <Play className="w-4 h-4 text-gray-700" />
//                 ) : (
//                   <Pause className="w-4 h-4 text-gray-700" />
//                 )}
//               </button>
//             </div>
//           )}

//           <div className="flex justify-center mt-6 space-x-2">
//             {filteredCars.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`
//                   transition-all duration-300 
//                   ${index === currentIndex 
//                     ? 'bg-orange-500 w-6 rounded-full' 
//                     : 'bg-gray-300 w-2 rounded-full'}
//                   h-2
//                 `}
//                 aria-label={`Go to car ${index + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default React.memo(RentCARS);