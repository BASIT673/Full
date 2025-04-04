import React, { useState, useEffect } from 'react';
import { Calendar, Map, Users,Mountain,Landmark, MessageSquare, ChevronRight, X,Clock } from 'lucide-react';
// import { Calendar, Map, Users,Mountain,Landmark, ChevronRight, X,Clock } from 'lucide-react';
// import { Calendar, Map, Users,Mountain,Landmark, ChevronRight, X,Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping of category icons
const CATEGORY_ICONS = {
  'Last Minute Deals': <Calendar className="w-5 h-5" />,
  'Guided Tours': <Map className="w-5 h-5" />,
  'Group Discounts': <Users className="w-5 h-5" />,
  'Seasonal Specials': <Calendar className="w-5 h-5" />
};

// Mapping of category colors
const CATEGORY_COLORS = {
  'Last Minute Deals': {
    bgClass: 'bg-blue-50',
    iconBgClass: 'bg-blue-500',
    hoverClass: 'hover:bg-blue-100'
  },
  'Guided Tours': {
    bgClass: 'bg-green-50',
    iconBgClass: 'bg-green-500',
    hoverClass: 'hover:bg-green-100'
  },
  'Group Discounts': {
    bgClass: 'bg-purple-50',
    iconBgClass: 'bg-purple-500',
    hoverClass: 'hover:bg-purple-100'
  },
  'Seasonal Specials': {
    bgClass: 'bg-orange-50',
    iconBgClass: 'bg-orange-500',
    hoverClass: 'hover:bg-orange-100'
  }
};

const FeatureCards1 = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Selected item state
  const [selectedItem, setSelectedItem] = useState(null);

  // Booking details state
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    totalPrice: 0,
    guideLang: 'english',
    groupName: '',
    specialRequests: '',
    childrenAges: [],
    infantAges: []
  });
  const calculateTaxesAndFees = () => {
    // Ensure selectedItem exists
    if (!selectedItem) return 0;

    // Use originalPrice and discountedPrice if adultPrice/childPrice are missing
    const adultPrice = selectedItem?.adultPrice 
        || selectedItem?.discountedPrice 
        || selectedItem?.originalPrice 
        || 0;

    const childPrice = selectedItem?.childPrice 
        || (selectedItem?.discountedPrice ? selectedItem.discountedPrice * 0.5 : 0) 
        || (selectedItem?.originalPrice ? selectedItem.originalPrice * 0.5 : 0) 
        || 0;

    // Ensure safe calculations by preventing NaN values
    const adultTotal = adultPrice * (bookingDetails?.adults || 0);
    const childTotal = childPrice * (bookingDetails?.children || 0);

    // Use a default tax rate if not provided
    const taxRate = selectedItem?.taxRate ?? 10;  // Default to 10%

    const taxes = (adultTotal + childTotal) * (taxRate / 100);

    console.log('Tax Calculation:', { adultTotal, childTotal, taxRate, taxes });

    return taxes;
};
const handleGetQuote = (item) => {
  console.log("Get quote for:", item);
  setSelectedItem(item);
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
          <h2>Get Your Exclusive Quote for ${item.title || 'This Experience'}</h2>
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
      // itemId: item.id || '',
      // item:item.name || '',
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
      <p>Thank you, ${formData.name}! Our travel experts will prepare your personalized quote for ${item.name || 'this experience'} and contact you within 24 hours at ${formData.email}.</p>
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
  // const calculateTaxesAndFees = () => {
  //   const adultPrice = selectedItem?.adultPrice || selectedItem?.price || 0;
  //   const childPrice = selectedItem?.childPrice || (selectedItem?.price * 0.5) || 0;
  //   const adultTotal = adultPrice * bookingDetails.adults;
  //   const childTotal = childPrice * bookingDetails.children;
  //   const taxRate = selectedItem?.taxRate || 10;
    
  //   return (adultTotal + childTotal) * (taxRate / 100);
  // };
  const updateBookingDetails = (field, value) => {
    const newDetails = { ...bookingDetails, [field]: value };
  
    console.log('Item used for pricing:', selectedItem);
  
    if (['adults', 'children', 'infants'].includes(field)) {
      // Use originalPrice and discountedPrice if adultPrice/childPrice are missing
      const adultPrice = selectedItem?.adultPrice 
        || selectedItem?.discountedPrice 
        || selectedItem?.originalPrice 
        || 0;
  
      const childPrice = selectedItem?.childPrice 
        || (selectedItem?.discountedPrice ? selectedItem.discountedPrice * 0.5 : 0) 
        || (selectedItem?.originalPrice ? selectedItem.originalPrice * 0.5 : 0) 
        || 0;
  
      console.log('Prices found:', { adultPrice, childPrice });
  
      const adultTotal = adultPrice * (newDetails.adults || 0);
      const childTotal = childPrice * (newDetails.children || 0);
      const taxesAndFees = calculateTaxesAndFees();
      newDetails.totalPrice = adultTotal + childTotal + taxesAndFees;
  
      console.log('Price calculation:', { adultTotal, childTotal, taxesAndFees, total: newDetails.totalPrice });
    }
  
    setBookingDetails(newDetails);
  };
  

// const updateBookingDetails = (field, value) => {
//   const newDetails = { ...bookingDetails, [field]: value };
  
//   console.log('Item used for pricing:', selectedItem);
  
//   // Recalculate total price whenever relevant fields change
//   if (['adults', 'children', 'infants'].includes(field)) {
//     // Use selectedItem for pricing
//     const adultPrice = selectedItem?.adultPrice || selectedItem?.price || 0;
//     const childPrice = selectedItem?.childPrice || (selectedItem?.price * 0.5) || 0;
    
//     console.log('Prices found:', { adultPrice, childPrice });
    
//     const adultTotal = adultPrice * newDetails.adults;
//     const childTotal = childPrice * newDetails.children;
//     const taxesAndFees = calculateTaxesAndFees();
//     newDetails.totalPrice = adultTotal + childTotal + taxesAndFees;
//     console.log('Price calculation:', { adultTotal, childTotal, taxesAndFees, total: newDetails.totalPrice });
//   }
  
//   setBookingDetails(newDetails);
// };
// const updateBookingDetails = (item,field, value) => {
//   const newDetails = { ...bookingDetails, [field]: value };
  

//   console.log('Item used for pricing:', selectedItem || item);
  
//   // Recalculate total price whenever relevant fields change
//   if (['adults', 'children', 'infants'].includes(field)) {
//     // Try different property names that might exist in your data
//     const adultPrice = selectedItem?.adultPrice || item?.adultPrice || item?.price || 0;
//     const childPrice = selectedItem?.childPrice || item?.childPrice || (item?.price * 0.5) || 0;
    
//     console.log('Prices found:', { adultPrice, childPrice });
    
//     const adultTotal = adultPrice * newDetails.adults;
//     const childTotal = childPrice * newDetails.children;
//     const taxesAndFees = calculateTaxesAndFees(adultTotal + childTotal);
//     newDetails.totalPrice = adultTotal + childTotal + taxesAndFees;
//     console.log('Price calculation:', { adultTotal, childTotal, taxesAndFees, total: newDetails.totalPrice });
//   }
  
//   setBookingDetails(newDetails);
// };

  const handlePayment = () => {
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setIsBookingModalOpen(false);
    }, 2000);
  };

  const parsePrice = (price) => {
    // Placeholder price parsing function
    return typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price || 0;
  };

  // const calculateTaxesAndFees = () => {
  //   // Placeholder taxes and fees calculation
  //   return Math.round(bookingDetails.totalPrice * 0.1);
  // };

  // const openBookingModal = (item) => {
  //   setSelectedItem(item);
  //   setIsBookingModalOpen(true);
  // };
  const openBookingModal = (item) => {
    setSelectedItem(item);
    
    // Initialize total price when opening modal
    const adultPrice = item?.adultPrice || item?.price || 0;
    const childPrice = item?.childPrice || (item?.price * 0.5) || 0;
    const adultTotal = adultPrice * bookingDetails.adults;
    const childTotal = childPrice * bookingDetails.children;
    const taxesAndFees = (adultTotal + childTotal) * ((item?.taxRate || 10) / 100);
    const totalPrice = adultTotal + childTotal + taxesAndFees;
    
    setBookingDetails(prev => ({
      ...prev,
      totalPrice: totalPrice
    }));
    
    setIsBookingModalOpen(true);
  };


// const transformPackagesToFeatures = (packageData) => {
  
//     return packageData.reduce((acc, pkg) => {
//       const category = pkg.category;
//       const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
//       // Get the first feature content
//       const featureContent = pkg.features?.[0]?.content?.[0] || {};
      
//       // Get ALL itinerary items
//       const fullItinerary = pkg.itinerary || [];
  
//       const transformedPackage = {
//         id: pkg._id,
//         packageId: pkg.packageId,
//         name: pkg.name,
//         category: pkg.category,
//         description: featureContent.description || pkg.description || 'Exciting adventure package',
//         originalPrice: featureContent.originalPrice || 'Contact for pricing',
//         discountedPrice: featureContent.discountedPrice || 'Contact for pricing',
//         duration: featureContent.duration || pkg.duration || 'Flexible',
//         validDates: featureContent.validDates || 'Year-round',
//         accommodation: featureContent.accommodation || 'Various options',
//         includes: featureContent.includes || ['Accommodation', 'Meals'],
//         excludes: featureContent.excludes || ['Airfare', 'Personal expenses'],
//         difficulty: pkg.difficulty || 'Moderate',
//         bestSeason: pkg.bestSeason || 'All year',
//         spotsLeft: pkg.spotsLeft || 0,
//         totalSpots: pkg.totalSpots || 0,
//         recommendedFor: pkg.recommendedFor || [],
//         bookingDeadline: pkg.bookingDeadline,
//         // Include COMPLETE itinerary array
//         fullItinerary: fullItinerary.map(item => ({
//           day: item.day,
//           title: item.title,
//           description: item.description,
//           activities: item.activities || [],
//           meals: item.meals || {
//             breakfast: 'Not included',
//             lunch: 'Not included',
//             dinner: 'Not included'
//           },
//           accommodation: item.accommodation
//         })),
//         // Keep first day as primary itinerary for quick reference
//         itinerary: fullItinerary[0] ? {
//           day: fullItinerary[0].day,
//           title: fullItinerary[0].title,
//           description: fullItinerary[0].description,
//           activities: fullItinerary[0].activities || [],
//           meals: fullItinerary[0].meals || {
//             breakfast: 'Not included',
//             lunch: 'Not included',
//             dinner: 'Not included'
//           },
//           accommodation: fullItinerary[0].accommodation
//         } : null
//       };
  
//       // Group by category
//       const existingCategory = acc.find(f => f.id === category.toLowerCase().replace(/\s+/g, '-'));
//       if (existingCategory) {
//         existingCategory.content.push(transformedPackage);
//       } else {
//         acc.push({
//           id: category.toLowerCase().replace(/\s+/g, '-'),
//           title: category,
//           subtitle: getCategorySubtitle(category),
//           icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
//           ...categoryColors,
//           content: [transformedPackage]
//         });
//       }
  
//       return acc;
//     }, []);
//   };

const getCategorySubtitle = (category) => {
    switch(category) {
      case 'Last Minute Deals':
        return 'Flash deals—book now!';
      case 'Guided Tours':
        return 'Expert-led adventures!';
      case 'Group Discounts':
        return 'Bigger groups, bigger savings!';
      case 'Seasonal Specials':
        return 'Limited-time seasonal offers!';
      default:
        return 'Unforgettable trips await!';
    }
  };
  
  const [features, setFeatures] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
  const [viewingAllOffers, setViewingAllOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://backend-1-7zwm.onrender.com/api/packagesoffers');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log("API Response:", responseData);
      
      // Extract the packages array from the response
      // The API returns packages in the 'packages' property
      const packagesArray = responseData.packages || [];
      
      // Set packages state with the array
      setPackages(packagesArray);
      
      // Pass only the packages array to the transform function
      const transformedFeatures = transformPackagesToFeatures(packagesArray);
      console.log("Transformed Features:", transformedFeatures);
      setFeatures(transformedFeatures);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  
  // Updated transform function to handle the actual data structure
  const transformPackagesToFeatures = (packageData) => {
    // Define these constants if they're not defined elsewhere
    // const CATEGORY_COLORS = {
    //   'Guided Tours': { bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    //   'Adventure': { bgColor: 'bg-green-100', textColor: 'text-green-700' },
    //   'Cultural': { bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    //   'Wildlife': { bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
    //   'Group Discounts': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
    //   'Last Minute Deals': { bgColor: 'bg-red-100', textColor: 'text-red-700' },
    //   'Seasonal Specials': { bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
    //   // Add more categories as needed
    // };
    
    // const CATEGORY_ICONS = {
    //   'Guided Tours': <Map className="w-5 h-5" />,
    //   'Adventure': <Mountain className="w-5 h-5" />,
    //   'Cultural': <Landmark className="w-5 h-5" />,
    //   'Wildlife': <Paw className="w-5 h-5" />,
    //   'Group Discounts': <Users className="w-5 h-5" />,
    //   'Last Minute Deals': <Clock className="w-5 h-5" />,
    //   'Seasonal Specials': <Calendar className="w-5 h-5" />,
    //   // Add more icons as needed
    // };
    
    const getCategorySubtitle = (category) => {
      const subtitles = {
        'Guided Tours': 'Explore with expert guides',
        'Adventure': 'Thrilling outdoor experiences',
        'Cultural': 'Immerse in local traditions',
        'Wildlife': 'Encounter amazing animals',
        'Group Discounts': 'Save more when you travel together',
        'Last Minute Deals': 'Great experiences at special prices',
        'Seasonal Specials': 'Perfect packages for the current season',
        // Add more subtitles as needed
      };
      return subtitles[category] || 'Discover amazing experiences';
    };
  
    // Log first package to understand the structure
    if (packageData.length > 0) {
      console.log("First package structure:", packageData[0]);
    }
  
    return packageData.reduce((acc, pkg) => {
      // Skip packages without a category
      if (!pkg.category) {
        return acc;
      }
      
      // Use the category from the package
      const category = pkg.category;
      const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
      // Extract feature content if available
      let featureContent = {};
      if (pkg.features && pkg.features.length > 0) {
        const firstFeature = pkg.features[0];
        // Check if content exists and has the expected structure
        if (firstFeature.content && Array.isArray(firstFeature.content) && firstFeature.content.length > 0) {
          featureContent = firstFeature.content[0];
        } else {
          // If content doesn't have the expected structure, use the feature itself
          featureContent = firstFeature;
        }
      }
      
      // Format pricing information
      let originalPrice = 'Contact for pricing';
      let discountedPrice = 'Contact for pricing';
      
      // Check for pricing in different locations based on API structure
      if (featureContent.originalPrice) {
        originalPrice = featureContent.originalPrice;
      } else if (featureContent.price) {
        originalPrice = featureContent.price;
      }
      
      if (featureContent.discountedPrice) {
        discountedPrice = featureContent.discountedPrice;
      }
      
      const transformedPackage = {
        id: pkg._id,
        packageId: pkg._id,
        name: pkg.name,
        category: category,
        description: pkg.description || featureContent.description || 'Exciting adventure package',
        originalPrice: originalPrice,
        discountedPrice: discountedPrice,
        duration: pkg.duration || featureContent.duration || 'Flexible',
        validDates: featureContent.validDates || 'Year-round',
        accommodation: featureContent.accommodation || 'Various options',
        includes: Array.isArray(featureContent.includes) ? featureContent.includes : [],
        excludes: Array.isArray(featureContent.excludes) ? featureContent.excludes : [],
        difficulty: pkg.difficulty || 'Moderate',
        bestSeason: pkg.bestSeason || 'All year',
        spotsLeft: pkg.spotsLeft || 0,
        totalSpots: pkg.totalSpots || 0,
        recommendedFor: Array.isArray(pkg.recommendedFor) ? pkg.recommendedFor : [],
        bookingDeadline: pkg.bookingDeadline,
        
        // Include COMPLETE itinerary array
        fullItinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.map(item => ({
          day: item.day,
          title: item.title,
          description: item.description,
          activities: Array.isArray(item.activities) ? item.activities : [],
          meals: item.meals || {
            breakfast: 'Not included',
            lunch: 'Not included',
            dinner: 'Not included'
          },
          accommodation: item.accommodation
        })) : [],
        
        // Keep first day as primary itinerary for quick reference
        itinerary: Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? {
          day: pkg.itinerary[0].day,
          title: pkg.itinerary[0].title,
          description: pkg.itinerary[0].description,
          activities: Array.isArray(pkg.itinerary[0].activities) ? pkg.itinerary[0].activities : [],
          meals: pkg.itinerary[0].meals || {
            breakfast: 'Not included',
            lunch: 'Not included',
            dinner: 'Not included'
          },
          accommodation: pkg.itinerary[0].accommodation
        } : null
      };
      
      // Group by category
      const categoryId = category.toLowerCase().replace(/\s+/g, '-');
      const existingCategory = acc.find(f => f.id === categoryId);
      
      if (existingCategory) {
        existingCategory.content.push(transformedPackage);
      } else {
        acc.push({
          id: categoryId,
          title: category,
          subtitle: getCategorySubtitle(category),
          icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
          ...categoryColors,
          content: [transformedPackage]
        });
      }
      
      return acc;
    }, []);
  };
  // const fetchPackages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:5000/api/packagesoffers');
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     const responseData = await response.json();
  //     console.log("API Response:", responseData);
      
  //     // Extract the packages array from the response
  //     // The API returns data in the 'data' property, not 'packages'
  //     const packagesArray = responseData.data || [];
      
  //     // Set packages state with the array
  //     setPackages(packagesArray);
      
  //     // Pass only the packages array to the transform function
  //     const transformedFeatures = transformPackagesToFeatures(packagesArray);
  //     console.log("Transformed Features:", transformedFeatures);
  //     setFeatures(transformedFeatures);
      
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Failed to fetch packages:", error);
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };
  
  // // Updated transform function to handle the actual data structure
  // const transformPackagesToFeatures = (packageData) => {
  //   // Define these constants if they're not defined elsewhere
  //   // const CATEGORY_COLORS = {
  //   //   'Guided Tours': { bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  //   //   'Adventure': { bgColor: 'bg-green-100', textColor: 'text-green-700' },
  //   //   'Cultural': { bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  //   //   'Wildlife': { bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  //   //   // Add more categories as needed
  //   // };
    
  //   // const CATEGORY_ICONS = {
  //   //   'Guided Tours': <Map className="w-5 h-5" />,
  //   //   'Adventure': <Mountain className="w-5 h-5" />,
  //   //   'Cultural': <Landmark className="w-5 h-5" />,
  //   //   'Wildlife':<Map className="w-5 h-5" />,
  //   //   // Add more icons as needed
  //   // };
    
  //   // const getCategorySubtitle = (category) => {
  //   //   const subtitles = {
  //   //     'Guided Tours': 'Explore with expert guides',
  //   //     'Adventure': 'Thrilling outdoor experiences',
  //   //     'Cultural': 'Immerse in local traditions',
  //   //     'Wildlife': 'Encounter amazing animals',
  //   //     // Add more subtitles as needed
  //   //   };
  //   //   return subtitles[category] || 'Discover amazing experiences';
  //   // };
  
  //   return packageData.reduce((acc, pkg) => {
  //     // If no category is specified, default to 'Guided Tours'
  //     const category = pkg.category || 'Guided Tours';
  //     const categoryColors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Guided Tours'];
      
  //     // In your actual data, it seems features might not exist or have a different structure
  //     // So we need to handle that case
  //     const featureContent = pkg.features?.[0]?.content?.[0] || {};
      
  //     // Based on your API response, these are the fields you actually have
  //     const transformedPackage = {
  //       id: pkg._id,
  //       packageId: pkg._id, // Using _id as packageId if packageId doesn't exist
  //       name: pkg.name,
  //       category: category,
  //       description: pkg.description || 'Exciting adventure package',
  //       originalPrice: pkg.originalPrice || featureContent.originalPrice || 'Contact for pricing',
  //       discountedPrice: pkg.discountedPrice || featureContent.discountedPrice || 'Contact for pricing',
  //       duration: pkg.duration || featureContent.duration || 'Flexible',
  //       validDates: featureContent.validDates || 'Year-round',
  //       accommodation: featureContent.accommodation || 'Various options',
  //       includes: pkg.inclusions || featureContent.includes || ['Accommodation', 'Meals'],
  //       excludes: pkg.exclusions || featureContent.excludes || ['Airfare', 'Personal expenses'],
  //       difficulty: pkg.difficulty || 'Moderate',
  //       bestSeason: pkg.bestSeason || 'All year',
  //       spotsLeft: pkg.spotsLeft || 0,
  //       totalSpots: pkg.totalSpots || 0,
  //       recommendedFor: pkg.recommendedFor || [],
  //       bookingDeadline: pkg.bookingDeadline,
        
  //       // Include COMPLETE itinerary array if it exists
  //       fullItinerary: (pkg.itinerary || []).map(item => ({
  //         day: item.day,
  //         title: item.title,
  //         description: item.description,
  //         activities: item.activities || [],
  //         meals: item.meals || {
  //           breakfast: 'Not included',
  //           lunch: 'Not included',
  //           dinner: 'Not included'
  //         },
  //         accommodation: item.accommodation
  //       })),
        
  //       // Keep first day as primary itinerary for quick reference
  //       itinerary: pkg.itinerary && pkg.itinerary[0] ? {
  //         day: pkg.itinerary[0].day,
  //         title: pkg.itinerary[0].title,
  //         description: pkg.itinerary[0].description,
  //         activities: pkg.itinerary[0].activities || [],
  //         meals: pkg.itinerary[0].meals || {
  //           breakfast: 'Not included',
  //           lunch: 'Not included',
  //           dinner: 'Not included'
  //         },
  //         accommodation: pkg.itinerary[0].accommodation
  //       } : null
  //     };
      
  //     // Group by category
  //     const categoryId = category.toLowerCase().replace(/\s+/g, '-');
  //     const existingCategory = acc.find(f => f.id === categoryId);
      
  //     if (existingCategory) {
  //       existingCategory.content.push(transformedPackage);
  //     } else {
  //       acc.push({
  //         id: categoryId,
  //         title: category,
  //         subtitle: getCategorySubtitle(category),
  //         icon: CATEGORY_ICONS[category] || <Map className="w-5 h-5" />,
  //         ...categoryColors,
  //         content: [transformedPackage]
  //       });
  //     }
      
  //     return acc;
  //   }, []);
  // };
  // const fetchPackages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:5000/api/packages');
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     const data = await response.json();
  //     console.log("API Response:", data);
      
  //     // Extract the packages array from the response
  //     const packagesArray = data.packages || [];
      
  //     // Set packages state with the array
  //     setPackages(packagesArray);
      
  //     // Pass only the packages array to the transform function
  //     const transformedFeatures = transformPackagesToFeatures(packagesArray);
  //     console.log("Transformed Features:", transformedFeatures);
  //     setFeatures(transformedFeatures);
      
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Failed to fetch packages:", error);
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };
  // const fetchPackages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:5000/api/packagesoffers');
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     const data = await response.json();
  //     console.log("API Response:", data);
  
  //     // Since `data` is an array, use it directly
  //     setPackages(data);
      
  //     // Transform packages to features
  //     const transformedFeatures = transformPackagesToFeatures(data);
  //     console.log("Transformed Features:", transformedFeatures);
  //     setFeatures(transformedFeatures);
      
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Failed to fetch packages:", error);
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    console.log("useEffect triggered! Fetching packages...");
    fetchPackages();
  }, []);
  


  const handleFeatureClick = (id) => {
    setActiveFeature(activeFeature === id ? null : id);
    setViewingAllOffers(false);
    setSelectedOffer(null);
  };

  const navigateToOffer = (featureId, item) => {
    setSelectedOffer({ featureId, item });
  };

  const viewAllOffers = (featureId) => {
    setViewingAllOffers(true);
    setSelectedOffer(null);
  };

  const goBack = () => {
    if (selectedOffer) {
      setSelectedOffer(null);
    } else if (viewingAllOffers) {
      setViewingAllOffers(false);
    } else {
      setActiveFeature(null);
    }
  };
  // Add this at the top of your component to inspect all possible variables

  const renderOfferDetails = () => {
    if (!selectedOffer) return null;
    const feature = features.find(f => f.id === selectedOffer.featureId);
    const item = selectedOffer.item;
  
    const calculateDiscount = (original, discounted) => {
      try {
        const orig = parseFloat(original.replace(/[^0-9.-]+/g, ''));
        const disc = parseFloat(discounted.replace(/[^0-9.-]+/g, ''));
        return Math.round(((orig - disc) / orig) * 100);
      } catch {
        return 0;
      }
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'Not specified';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
       


{/* Header Section - Enhanced with marketing tagline */}
<div className="flex justify-between items-center mb-4">
  <div>
    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
    <p className="text-sm text-orange-600 italic">Your next unforgettable adventure awaits</p>
  </div>
  <button onClick={goBack} className="p-1 rounded-full hover:bg-gray-100">
    <X className="w-5 h-5 text-gray-500" />
  </button>
</div>

{/* Category Info - Enhanced with persuasive text */}
<div className="mb-4">
  <div className={`${feature.iconBgClass} text-white p-2 rounded-full inline-block mb-2`}>
    {feature.icon}
  </div>
  <span className="ml-2 text-gray-700 font-medium">{feature.title}</span>
  <p className="text-sm text-gray-600 mt-1">Join the thousands who've experienced this top-rated {feature.title.toLowerCase()}</p>
</div>

{/* Description - Enhanced with emotional appeal */}
<div className="mb-4">
  <p className="text-gray-700">{item.description}</p>
  <p className="text-sm text-orange-600 font-medium mt-2">Create memories that last a lifetime with this exclusive adventure package</p>
</div>

{/* Price Section - Enhanced with urgency */}
<div className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
  <div className="flex items-baseline mb-2">
    <span className="text-gray-600 mr-2">Price:</span>
    {item.originalPrice && item.originalPrice !== 'Contact for pricing' && (
      <span className="text-gray-500 line-through text-sm mr-2">
        {item.originalPrice}
      </span>
    )}
    <span className="text-green-600 font-bold text-lg">
      {item.discountedPrice}
    </span>
    {item.originalPrice && item.discountedPrice && 
      item.originalPrice !== 'Contact for pricing' && (
      <span className="text-green-600 text-xs ml-2">
        Save {calculateDiscount(item.originalPrice, item.discountedPrice)}%
      </span>
    )}
  </div>
  <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
    {feature.id === 'guided-tours' ? 'Price per person' : 
      feature.id === 'group-discounts' ? 'Group pricing available' : 
      'Complete package price'}
  </div>
  <p className="text-orange-600 text-sm mt-2 font-medium">
    Limited-time offer! Book now to secure these exclusive rates
  </p>
</div>

{/* Package Details - Enhanced with benefit-focused headers */}
<div className="mb-4 p-4 rounded-lg bg-gray-50">
  <h4 className="font-semibold text-gray-800 mb-1">Adventure Details</h4>
  <p className="text-sm text-gray-600 mb-3">Everything you need to know about your perfect getaway</p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex justify-between">
      <span className="text-gray-600">Experience Duration:</span>
      <span className="text-gray-800 font-medium">{item.duration}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Available Dates:</span>
      <span className="text-gray-800 font-medium">{item.validDates}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Adventure Level:</span>
      <span className="text-gray-800 capitalize font-medium">{item.difficulty}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Prime Season:</span>
      <span className="text-gray-800 capitalize font-medium">{item.bestSeason}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Availability:</span>
      <span className={`font-medium ${item.spotsLeft < 5 ? 'text-orange-600' : 'text-gray-800'}`}>
        {item.spotsLeft} of {item.totalSpots} spots remaining
        {item.spotsLeft < 5 && ' - Almost sold out!'}
      </span>
    </div>
    {item.bookingDeadline && (
      <div className="flex justify-between">
        <span className="text-gray-600">Booking Deadline:</span>
        <span className="text-gray-800 font-medium">{formatDate(item.bookingDeadline)}</span>
      </div>
    )}
  </div>
</div>

{/* Itinerary Section - Enhanced with descriptive language */}
{item.fullItinerary?.length > 0 && (
  <div className="mb-4 p-4 rounded-lg bg-gray-50">
    <h4 className="font-semibold text-gray-800 mb-1">Your Day-by-Day Adventure</h4>
    <p className="text-sm text-gray-600 mb-3">Experience the perfect balance of exploration, relaxation, and unforgettable moments</p>
    
    <div className="space-y-6">
      {item.fullItinerary.map((day, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
          <h5 className="font-medium text-gray-700">
            Day {day.day}: {day.title}
          </h5>
          <p className="text-gray-600 mt-1">{day.description}</p>
          
          {day.activities?.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-600">Today's Highlights:</span>
              <ul className="list-disc list-inside pl-2 text-gray-600">
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="text-sm">{activity}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-green-50 p-2 rounded text-sm">
              <span className="font-medium">Breakfast:</span> {day.meals.breakfast}
            </div>
            <div className="bg-green-50 p-2 rounded text-sm">
              <span className="font-medium">Lunch:</span> {day.meals.lunch}
            </div>
            <div className="bg-green-50 p-2 rounded text-sm">
              <span className="font-medium">Dinner:</span> {day.meals.dinner}
            </div>
          </div>

          {day.accommodation && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-600">Tonight's Rest:</span>
              <p className="text-gray-600 text-sm">{day.accommodation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}

{/* Recommended For - Enhanced with personalization */}
{item.recommendedFor?.length > 0 && (
  <div className="mb-4">
    <h4 className="font-semibold text-gray-800 mb-1">Perfect For</h4>
    <p className="text-sm text-gray-600 mb-2">This adventure is specially curated for:</p>
    <div className="flex flex-wrap gap-2">
      {item.recommendedFor.map((group, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
          {group}
        </span>
      ))}
    </div>
  </div>
)}

{/* Inclusions & Exclusions - Enhanced with value proposition */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div>
    <h4 className="font-semibold text-gray-800 mb-1">What's Included</h4>
    <p className="text-sm text-gray-600 mb-2">Everything to ensure your adventure is hassle-free:</p>
    <ul className="list-disc list-inside text-gray-700">
      {item.includes.map((inclusion, idx) => (
        <li key={idx}>{inclusion}</li>
      ))}
    </ul>
  </div>
  <div>
    <h4 className="font-semibold text-gray-800 mb-1">What's Not Included</h4>
    <p className="text-sm text-gray-600 mb-2">Items you may want to prepare for:</p>
    <ul className="list-disc list-inside text-gray-700">
      {item.excludes.map((exclusion, idx) => (
        <li key={idx}>{exclusion}</li>
      ))}
    </ul>
  </div>
</div>

{/* Testimonial Section - New addition */}
<div className="mb-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
  <div className="flex items-center mb-2">
    <div className="flex text-orange-500">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
    <span className="ml-2 text-gray-700 font-medium">5.0 (43 reviews)</span>
  </div>
  <p className="italic text-gray-700">"This was absolutely the highlight of our trip! The guides were knowledgeable, the views were breathtaking, and every detail was perfectly planned. Worth every penny!"</p>
  <p className="text-right text-sm text-gray-600 mt-1">- Sarah T., traveled {item.bestSeason}</p>
</div>

{/* Action Buttons - Enhanced with clear CTAs and added Get Quote button */}
<div className="mt-6">
  <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-3">
    <button 
      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
      onClick={goBack}
    >
      <X className="w-4 h-4 mr-2" />
      Go Back
    </button>
    <button 
      className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
      onClick={() => handleGetQuote(item)}
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      Get Quote
    </button>
    <button 
      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
      onClick={() => openBookingModal(item)}
    >
      <Calendar className="w-4 h-4 mr-2" />
      Book Now
    </button>
  </div>
  <p className="text-center text-sm text-gray-500 mt-4">
    100% satisfaction guaranteed • Flexible cancellation policy • Secure payment
  </p>
</div>
          {isBookingModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="min-h-[200px] max-h-[90vh] w-full max-w-2xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full overflow-y-auto max-h-[calc(100vh-40px)]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Book {item?.name}</h3>
          <button 
            onClick={() => setIsBookingModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-4 mb-6 border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={bookingDetails.fullName}
                  onChange={(e) => updateBookingDetails('fullName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={bookingDetails.email}
                  onChange={(e) => updateBookingDetails('email', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={bookingDetails.mobileNumber}
                onChange={(e) => updateBookingDetails('mobileNumber', e.target.value)}
              />
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                min={new Date().toISOString().split('T')[0]}
                value={bookingDetails.startDate}
                onChange={(e) => updateBookingDetails('startDate', e.target.value)}
              />
            </div>
          </div>

          {/* Person Counts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults (13+ years)</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={bookingDetails.adults}
                onChange={(e) => updateBookingDetails('adults', parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children (5-12 years)</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={bookingDetails.children}
                onChange={(e) => updateBookingDetails('children', parseInt(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Infants (0-4 years)</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={bookingDetails.infants}
                onChange={(e) => updateBookingDetails('infants', parseInt(e.target.value))}
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Infant' : 'Infants'}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
  <h3 className="text-lg font-medium text-gray-900">Price Summary</h3>
  <div className="mt-2 space-y-2">
    {/* Adults Pricing */}
    <div className="flex justify-between">
      <span className="text-gray-600">
        Adults: {bookingDetails?.adults || 0} × ₹
        {(
          selectedItem?.adultPrice ||
          selectedItem?.discountedPrice ||
          selectedItem?.originalPrice ||
          0
        ).toLocaleString()}
      </span>
      <span className="font-medium">
        ₹
        {(
          (selectedItem?.adultPrice ||
            selectedItem?.discountedPrice ||
            selectedItem?.originalPrice ||
            0) * (bookingDetails?.adults || 0)
        ).toLocaleString()}
      </span>
    </div>

    {/* Children Pricing */}
    <div className="flex justify-between">
      <span className="text-gray-600">
        Children: {bookingDetails?.children || 0} × ₹
        {(
          selectedItem?.childPrice ||
          (selectedItem?.discountedPrice
            ? selectedItem.discountedPrice * 0.5
            : 0) ||
          (selectedItem?.originalPrice ? selectedItem.originalPrice * 0.5 : 0) ||
          0
        ).toLocaleString()}
      </span>
      <span className="font-medium">
        ₹
        {(
          (selectedItem?.childPrice ||
            (selectedItem?.discountedPrice
              ? selectedItem.discountedPrice * 0.5
              : 0) ||
            (selectedItem?.originalPrice ? selectedItem.originalPrice * 0.5 : 0) ||
            0) * (bookingDetails?.children || 0)
        ).toLocaleString()}
      </span>
    </div>

    {/* Taxes & Fees */}
    <div className="flex justify-between">
      <span className="text-gray-600">
        Taxes & Fees ({selectedItem?.taxRate ?? 10}%)
      </span>
      <span className="font-medium">
        ₹{calculateTaxesAndFees().toLocaleString()}
      </span>
    </div>

    {/* Total Price */}
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span className="text-orange-600">
          ₹{(bookingDetails?.totalPrice || 0).toLocaleString()}
        </span>
      </div>
    </div>
  </div>
</div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea 
              placeholder="Any special requests or requirements?"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
              value={bookingDetails.specialRequests}
              onChange={(e) => updateBookingDetails('specialRequests', e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              onClick={() => setIsBookingModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handlePayment}
              disabled={paymentProcessing || !bookingDetails.fullName || !bookingDetails.email || !bookingDetails.mobileNumber || !bookingDetails.startDate}
              className={`px-4 py-2 rounded-md text-white ${paymentProcessing || !bookingDetails.fullName || !bookingDetails.email || !bookingDetails.mobileNumber || !bookingDetails.startDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              {paymentProcessing ? 'Processing...' : `Pay ₹${bookingDetails.totalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  
)}
        
         {/* </div> */}
      </motion.div>
    );
  };
// }


 
  
  const renderAllOffers = () => {
    if (!viewingAllOffers) return null;
    
    const feature = features.find(f => f.id === activeFeature);
    if (!feature || !feature.content) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">All {feature.title}</h3>
          <button onClick={goBack} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feature.content.map((item, idx) => {
            // Get the first feature from the package (if exists)
            const packageFeatures = packages.find(pkg => pkg.name === item.name)?.features || [];
            const firstFeature = packageFeatures[0] || {};
            const featureContent = firstFeature.content?.[0] || {};
  
            return (
              <div 
                key={`${feature.id}-${idx}`}
                onClick={() => navigateToOffer(activeFeature, {
                  ...item,
                  ...featureContent, // Merge feature content with base item
                  featureId: feature.id
                })}
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 border border-gray-200"
              >
                <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                
                {/* Price section */}
                <div className="mt-2">
                  <div className="flex items-baseline">
                    {featureContent.originalPrice && (
                      <span className="text-gray-500 line-through text-xs mr-2">
                        {featureContent.originalPrice}
                      </span>
                    )}
                    <span className="text-green-600 font-medium">
                      {featureContent.discountedPrice || item.discountedPrice || 'Contact for pricing'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {activeFeature === 'guided-tours' ? 'Per person' : 
                     activeFeature === 'group-discounts' ? 'Group pricing' : 
                     'Per person'}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    {featureContent.duration || item.duration || 'Flexible'}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {featureContent.validDates || item.validDates || 'Year-round'}
                  </p>
                </div>
  
                {/* Description */}
                <div className="mt-2">
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {featureContent.description || item.description || 'Exciting adventure package'}
                  </p>
                </div>
                
                {/* View details button */}
                <div className="mt-3 flex justify-end">
                  <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };
  return (
    <div className="relative bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">✨ Discover the Paradise on Earth: Kashmir Awaits ✨</h2>
       
 
  <div/> 

        <div className="translate-y-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-10 md:px-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgClass} ${feature.hoverClass} px-6 py-4 rounded-lg cursor-pointer 
                transition duration-300 flex items-center group shadow-md
                ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`mr-4 ${feature.iconBgClass} text-white p-3 rounded`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
                <p className="text-gray-600 text-xs">{feature.subtitle}</p>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 
                  ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} 
              />
            </div>
          ))}
        </div>
  
        <AnimatePresence>
          {activeFeature && !viewingAllOffers && !selectedOffer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl p-4 border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateToOffer(activeFeature, item)}
                    className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 shadow-sm border-l-4 border-orange-500"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      {item.spotsLeft && item.totalSpots && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {item.spotsLeft}/{item.totalSpots} spots left
                        </span>
                      )}
                    </div>
                    
                    {/* Price and Duration Section */}
                    <div className="mb-2">
                      <div className="flex items-baseline">
                        {item.originalPrice && (
                          <span className="text-gray-500 line-through text-xs mr-2">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="text-orange-600 font-semibold text-sm">
                          {item.discountedPrice 
                            ? `$${item.discountedPrice}` 
                            : 'Custom Pricing'}
                        </span>
                        
                        {activeFeature === 'group-discounts' && (
                          <span className="ml-2 text-xs text-gray-600">
                            {item.category === "Group Discounts" ? "per person" : ""}
                          </span>
                        )}
                      </div>
                      
                      {/* Duration or Key Highlight */}
                      <div className="text-xs text-gray-600 mt-1 flex items-center">
                        {activeFeature === 'guided-tours' && (
                          <>
                            <Clock className="w-3 h-3 mr-2 text-orange-500" />
                            {item.duration || 'Flexible Duration'}
                          </>
                        )}
                        
                        {activeFeature === 'last-minute' && (
                          <>
                            <Zap className="w-3 h-3 mr-2 text-orange-500" />
                            {item.discount || "Special"} Deal • Limited Time
                          </>
                        )}
                        
                        {activeFeature === 'group-discounts' && (
                          <>
                            <Users className="w-3 h-3 mr-2 text-orange-500" />
                            Perfect for: {item.recommendedFor ? item.recommendedFor.join(', ') : 'Groups'}
                          </>
                        )}
                        
                        {activeFeature === 'seasonal-specials' && (
                          <>
                            <Calendar className="w-3 h-3 mr-2 text-orange-500" />
                            Best in {item.bestSeason || 'Season'} • {item.difficulty || 'All Levels'}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Marketing Text */}
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {item.category === "Group Discounts" 
                        ? "Experience unforgettable adventures with friends & family! Bigger groups enjoy better savings." 
                        : item.shortDescription || "Exciting adventure awaits! Book now for an unforgettable experience."}
                    </p>
                    
                    {/* Booking Deadline */}
                    {item.bookingDeadline && (
                      <div className="flex items-center text-xs text-red-600 mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        Book by: {new Date(item.bookingDeadline).toLocaleDateString()}
                      </div>
                    )}
                    
                    {/* Marketing Badges or Highlights */}
                    <div className="flex items-center justify-between">
                      <div className="space-x-1">
                        {item.popular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        {item.bestSeller && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Best Seller
                          </span>
                        )}
                        {item.difficulty === "Moderate" && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            Moderate
                          </span>
                        )}
                      </div>
                      
                      {/* Quick Action */}
                      <div className="text-orange-600 text-xs flex items-center font-medium">
                        View Details
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => viewAllOffers(activeFeature)}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center"
                >
                  View all offers
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}
  
          {/* Show all offers view */}
          {activeFeature && viewingAllOffers && renderAllOffers()}
  
          {/* Show selected offer details */}
          {activeFeature && selectedOffer && renderOfferDetails()}
        </AnimatePresence>
      </div>
    </div>
  );

// return (
//     <div className="relative bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Explore Our Offers</h2>
  
//         <div className="translate-y-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-10 md:px-12">
//           {features.map((feature) => (
//             <div
//               key={feature.id}
//               className={`${feature.bgClass} ${feature.hoverClass} px-6 py-4 rounded-lg cursor-pointer 
//                 transition duration-300 flex items-center group shadow-md
//                 ${activeFeature === feature.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
//               onClick={() => handleFeatureClick(feature.id)}
//             >
//               <div className={`mr-4 ${feature.iconBgClass} text-white p-3 rounded`}>
//                 {feature.icon}
//               </div>
//               <div>
//                 <h4 className="text-gray-800 text-sm font-semibold">{feature.title}</h4>
//                 <p className="text-gray-600 text-xs">{feature.subtitle}</p>
//               </div>
//               <ChevronRight
//                 className={`w-5 h-5 text-gray-500 ml-auto transition-transform duration-300 
//                   ${activeFeature === feature.id ? 'transform rotate-90' : 'transform group-hover:translate-x-1'}`} 
//               />
//             </div>
//           ))}
//         </div>
  
//         <AnimatePresence>
//           {activeFeature && !viewingAllOffers && !selectedOffer && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.2 }}
//               className="  bg-white rounded-lg shadow-xl p-4 border border-gray-200"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                  {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => navigateToOffer(activeFeature, item)}
//                     className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition duration-300"
//                   >
//                     <h4 className="font-medium text-gray-800">{item.name}</h4>
  
             
//                     {activeFeature === 'last-minute' && (
//                       <div className="mt-1">
//                         <span className="text-red-600 font-medium text-sm">{item.discount}</span>
//                         <p className="text-gray-500 text-xs mt-1">{item.remaining}</p>
//                       </div>
//                     )}
  
//                     {activeFeature === 'guided-tours' && (
//                       <div className="mt-1">
//                         <span className="text-gray-600 text-sm">{item.duration}</span>
//                         <p className="text-green-600 text-xs mt-1">★ {item.rating}</p>
//                       </div>
//                     )}
  
//                     {activeFeature === 'group-discounts' && (
//                       <div className="mt-1">
//                         <span className="text-purple-600 font-medium text-sm">{item.discount}</span>
//                         {item.popular && (
//                           <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Popular</span>
//                         )}
//                       </div>
//                     )}
  
//                     {activeFeature === 'seasonal-specials' && (
//                       <div className="mt-1">
//                         <span className="text-gray-600 text-sm">{item.season}</span>
//                         <p className="text-orange-600 text-xs mt-1">{item.status}</p>
//                       </div>
//                     )}
//                   </div>
//                 ))} 
//                 * {features.find(f => f.id === activeFeature)?.content.map((item, idx) => (
//   <div
//     key={idx}
//     onClick={() => navigateToOffer(activeFeature, item)}
//     className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 shadow-sm"
//   >
//     <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
    
//     {/* Price and Duration Section */}
//     <div className="mb-2">
//       <div className="flex items-baseline">
//         {item.originalPrice && (
//           <span className="text-gray-500 line-through text-xs mr-2">
//             ${item.originalPrice}
//           </span>
//         )}
//         <span className="text-green-600 font-semibold text-sm">
//           {item.discountedPrice 
//             ? `$${item.discountedPrice}` 
//             : 'Custom Pricing'}
//         </span>
//       </div>
      
//       {/* Duration or Key Highlight */}
//       <div className="text-xs text-gray-600 mt-1 flex items-center">
//         {activeFeature === 'guided-tours' && (
//           <>
//             <Clock className="w-3 h-3 mr-2 text-blue-500" />
//             {item.duration || 'Flexible Duration'}
//           </>
//         )}
        
//         {activeFeature === 'last-minute' && (
//           <>
//             <Zap className="w-3 h-3 mr-2 text-yellow-500" />
//             {item.discount} Off • Limited Time
//           </>
//         )}
        
//         {activeFeature === 'group-discounts' && (
//           <>
//             <Users className="w-3 h-3 mr-2 text-purple-500" />
//             Group Size: {item.groupSize || 'Flexible'}
//           </>
//         )}
        
//         {activeFeature === 'seasonal-specials' && (
//           <>
//             <Calendar className="w-3 h-3 mr-2 text-orange-500" />
//             {item.season} Special
//           </>
//         )}
//       </div>
//     </div> 
    
//      Short Description or Key Benefit 
//     <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//       {item.shortDescription || 'Exciting adventure awaits!'}
//     </p>
    
//     {/* Marketing Badges or Highlights */}
//     <div className="flex items-center justify-between">
//       <div className="space-x-1">
//         {item.popular && (
//           <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
//             Popular
//           </span>
//         )}
//         {item.bestSeller && (
//           <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
//             Best Seller
//           </span>
//         )}
//       </div>
      
//       {/* Quick Action */}
//       <div className="text-blue-600 text-xs flex items-center">
//         View Details
//         <ChevronRight className="w-3 h-3 ml-1" />
//       </div>
//     </div>
//   </div>
// ))} 
//               </div>
  
//               <div className="mt-4 flex justify-end">
//                 <button
//                   onClick={() => viewAllOffers(activeFeature)}
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//                 >
//                   View all offers
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </motion.div>
//           )}
  
//           {/* Show all offers view */}
//           {activeFeature && viewingAllOffers && renderAllOffers()}
  
//           {/* Show selected offer details */}
//           {activeFeature && selectedOffer && renderOfferDetails()}
//         </AnimatePresence> 
//       </div>
//     </div>
//   );
};

export default FeatureCards1;