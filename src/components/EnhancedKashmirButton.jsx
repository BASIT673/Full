// Enhanced button with interactive features
// import React, { useState, useEffect } from 'react';
import React from "react";

// Super engaging Kashmir button with advanced interactive features
const  EnhancedKashmirButton= () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);
    const [pulseState, setPulseState] = React.useState(0);
    
    // Reference for confetti effect
    const buttonRef = React.useRef(null);
    
    React.useEffect(() => {
      // Multi-stage attention-grabbing sequence
      const attentionSequence = setInterval(() => {
        // Cycle through different attention states
        setPulseState(prevState => (prevState + 1) % 4);
      }, 3000);
      
      return () => clearInterval(attentionSequence);
    }, []);
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    
    const handleClick1 = () => {
      // Visual feedback for click
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
      
      // Your existing popup logic
      console.log("Opening Kashmir packages popup");
      // openKashmirPopup(); // Uncomment and replace with your function
    };
    const handleClick  = async () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
                try {
                  // Fetch packages and promos data from API
                  const [packagesResponse, promosResponse] = await Promise.all([
                    fetch('https://backend-1-7zwm.onrender.com/api/packages'),
                    fetch('https://backend-1-7zwm.onrender.com/api/promos')
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
                       <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                             </svg>
                         
                    </div>
                  </div>
                  
                 
                          
                            
                  
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
    // Different animation styles based on pulse state
    const getPulseAnimation = () => {
      switch(pulseState) {
        case 0: return 'animate-pulse';
        case 1: return 'animate-bounce';
        case 2: return 'scale-105';
        case 3: default: return '';
      }
    };
    
    return (
      <div className="relative">
        {/* Animated background elements */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-amber-300 to-orange-300 rounded-xl opacity-0 blur-xl transition-opacity duration-1000 ${isHovered ? 'opacity-70' : ''}`}></div>
        
        {/* Floating indicators around button */}
        <div className={`absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded-full transition-all duration-300 ${pulseState === 1 ? 'animate-ping' : 'opacity-0'}`}></div>
        
        <button
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            relative
            px-6 py-3 sm:px-8 sm:py-4
            text-sm sm:text-base
            bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600
            bg-size-200
            text-white font-bold rounded-lg
            shadow-xl
            overflow-hidden
            transform
            transition-all duration-300
            ${isHovered ? 'bg-pos-100 scale-105 shadow-orange-300/50 shadow-2xl' : 'bg-pos-0'}
            ${isClicked ? 'scale-95' : ''}
            ${getPulseAnimation()}
            hover:shadow-2xl
            focus:outline-none focus:ring-4 focus:ring-orange-300
            z-10
          `}
          aria-label="Explore our popular Kashmir tour packages"
        >
          {/* Animated background pattern */}
          <div className={`absolute inset-0 opacity-20 ${isHovered ? 'animate-spin-slow' : ''}`} 
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px"
            }}
          ></div>
          
          {/* Shine effect */}
          <div 
            className={`absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transform skew-x-12 transition-all duration-700 ${isHovered ? 'left-full' : ''}`}
          ></div>
          
          {/* Button content with icon */}
          <div className="relative flex items-center justify-center gap-2">
            {/* Animated mountains icon */}
            <svg 
              className={`w-5 h-5 mr-1 transition-all duration-300 ${isHovered ? 'scale-125' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            
            <span className="block sm:hidden font-bold">Discover Kashmir Packages</span>
            <span className="hidden sm:block font-bold">Discover Kashmir Packages</span>
            
            {/* Animated arrow */}
            <svg 
              className={`w-5 h-5 transition-all duration-500 ${isHovered ? 'translate-x-2' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                className={`${isHovered ? 'animate-pulse' : ''}`}
              />
            </svg>
          </div>
          
          {/* Small ripple effect on click */}
          {isClicked && (
            <span className="absolute inset-0 animate-ripple rounded-lg bg-white opacity-30" />
          )}
        </button>
        
        {/* FOMO text */}
        <div 
          className={`absolute -bottom-6 left-0 right-0 text-center text-xs text-orange-800 font-medium transition-all duration-500 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}
        >
          Limited time offers available now!
        </div>
      </div>
    );
  };

  // Add these custom animations to your global CSS

  
  
  export default  EnhancedKashmirButton;

// const EnhancedKashmirButton = () => {
//     const [isHovered, setIsHovered] = React.useState(false);
//     const [isPulsing, setIsPulsing] = React.useState(true);
    
//     React.useEffect(() => {
//       // Auto-pulsing effect that runs every few seconds to draw attention
//       const pulseInterval = setInterval(() => {
//         setIsPulsing(true);
//         setTimeout(() => setIsPulsing(false), 1000);
//       }, 5000);
      
//       return () => clearInterval(pulseInterval);
//     }, []);
//     const handleDiscoverPackages = async () => {
//         try {
//           // Fetch packages and promos data from API
//           const [packagesResponse, promosResponse] = await Promise.all([
//             fetch('http://localhost:5000/api/packages'),
//             fetch('http://localhost:5000/api/promos')
//           ]);
        
          
//           if (!packagesResponse.ok || !promosResponse.ok) {
//             throw new Error('Failed to fetch data from API');
//           }
          
//           const packagesData = await packagesResponse.json();
//           const promosData = await promosResponse.json();
//           console.log('API Promos Data:', promosData);
          
          
//           if (!packagesResponse.ok || !promosResponse.ok) {
//             throw new Error('Failed to fetch data from API');
//           }
          
         
          
//           // Filter out packages without necessary data
//           const validPackages = packagesData.data.filter(pkg => 
//             pkg.name && pkg.originalPrice && pkg.discountedPrice && pkg.duration
//           );
          
//           // Only proceed if we have valid packages
//           if (validPackages.length === 0) {
//             console.error('No valid packages found');
//             return;
//           }
          
//       // Create popup element
//       const popup = document.createElement('div');
//       popup.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-8';
      
//       // Get the top packages to display in the popup
//       // const displayPackages = validPackages.slice(0, 3);
//       const displayPackages = validPackages;
      
//       // Create popup content with enhanced styling and marketing copy
//       let packageRowsHTML = '';
//       displayPackages.forEach(pkg => {
//         const originalPrice = pkg.originalPrice.toLocaleString();
//         const discountedPrice = pkg.discountedPrice.toLocaleString();
//         const shortName = pkg.shortName || pkg.name;
//         const savings = pkg.originalPrice - pkg.discountedPrice;
//         const savingsPercent = Math.round((savings / pkg.originalPrice) * 100);
//         // Elegant package row component with improved styling
      
//         packageRowsHTML += `
//           <div class="flex justify-between items-center py-3.5 border-b border-orange-100 last:border-b-0 hover:bg-orange-50 transition-colors duration-200 rounded-md px-2">
//             <div class="flex-1">
//               <p class="font-semibold text-gray-800">${shortName}</p>
//               <p class="text-xs text-gray-600">${pkg.duration}</p>
//               <span class="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Save ${savingsPercent}%</span>
//             </div>
//             <div class="text-right">
//               <p class="line-through text-gray-400 text-sm">₹${originalPrice}</p>
//               <p class="font-bold text-orange-600 text-lg">₹${discountedPrice}</p>
//             </div>
//           </div>
//         `;
//       });
      
//       // Get offer details from the first valid package
//       const offerTitle = validPackages[0].offerTitle || 'Exclusive Kashmir Sale!';
//       const offerDescription = validPackages[0].offerDescription || 'Experience paradise on earth at unbeatable prices.';
//       const offerExpiry = validPackages[0].offerExpiry ? new Date(validPackages[0].offerExpiry).toLocaleDateString() : 'Limited time only';
      
//       popup.innerHTML = `
//         <div class="bg-white rounded-xl p-5 sm:p-7 md:p-8 max-w-md md:max-w-3xl w-full mx-4 shadow-2xl transform transition-all duration-300 scale-95 my-auto relative overflow-hidden">
//           <div class="absolute top-0 right-0 w-40 h-40 md:w-60 md:h-60 -mt-12 -mr-12 bg-gradient-to-bl from-orange-200 to-transparent rounded-full opacity-70"></div>
//           <div class="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 -mb-10 -ml-10 bg-gradient-to-tr from-amber-200 to-transparent rounded-full opacity-70"></div>
          
//           <div class="relative md:flex md:gap-6">
//             <div class="md:w-3/5">
//               <div class="flex justify-between items-start mb-5">
//                 <div>
//                   <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Experience Kashmir Magic</h3>
//                   <p class="text-sm md:text-base text-orange-600 font-medium">Limited-time exclusive offers</p>
//                 </div>
//                 <button id="closePopup" class="text-gray-500 hover:text-orange-600 transition-colors duration-200">
//                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//               </div>
              
//               <div class="space-y-5">
//                 <div class="p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white shadow-md">
//                   <div class="flex items-center">
//                     <div class="mr-3">
//                       <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <p class="font-bold text-xl md:text-2xl">${offerTitle}</p>
//                       <p class="mt-1 text-white text-opacity-90">${offerDescription}</p>
//                     </div>
//                   </div>
//                   <p class="mt-2 text-sm md:text-base text-white text-opacity-90 font-medium">Book in the next 24 hours and get an additional 5% off!</p>
//                 </div>
                
//                 <div class="md:hidden">
//                   <div class="flex justify-between mb-2">
//                     <h4 class="font-bold text-gray-800">Featured Packages</h4>
//                     <span class="text-xs bg-orange-600 text-white px-2 py-1 rounded-full uppercase font-bold">Hot Deals</span>
//                   </div>
//                   <div class="divide-y divide-orange-100 bg-gray-50 rounded-lg p-3.5 shadow-inner">
//                     ${packageRowsHTML}
//                   </div>
//                 </div>
                
//                 <button id="bookNowBtn" class="w-full py-3.5 md:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.02]">
//                   <span class="flex items-center justify-center">
//                     <span class="md:text-lg">BOOK NOW & SAVE</span>
//                     <svg class="w-5 h-5 md:w-6 md:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
//                     </svg>
//                   </span>
//                 </button>
                
//                 <div class="flex items-center justify-center space-x-3 text-center">
//                   <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
//                   </svg>
//                   <div>
//                     <p class="text-sm md:text-base font-medium text-gray-700">Offer expires <span class="text-orange-600">${offerExpiry}</span></p>
//                     <p class="text-xs md:text-sm text-gray-500 mt-0.5">Limited seats available at these prices</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Desktop Package Display -->
//             <div class="hidden md:block md:w-2/5">
//               <div class="mb-2">
//                 <h4 class="font-bold text-gray-800">Featured Packages</h4>
//                 <div class="flex items-center justify-between">
//                   <p class="text-xs text-gray-500">Best value offers</p>
//                   <span class="text-xs bg-orange-600 text-white px-2 py-1 rounded-full uppercase font-bold">Hot Deals</span>
//                 </div>
//               </div>
//               <div class="divide-y divide-orange-100 bg-gray-50 rounded-lg p-4 shadow-inner h-full max-h-96 overflow-y-auto">
//                 ${packageRowsHTML}
//               </div>
//             </div>
//           </div>
          
//           <div class="text-center text-xs md:text-sm text-gray-500 pt-3 mt-3 border-t border-gray-100">
//             <p>Flexible cancellation • Trusted by 10,000+ travelers • 24/7 support</p>
//           </div>
//         </div>
//       `;
//           // Add popup to body
//           document.body.appendChild(popup);
          
//           // Trigger animation after a small delay
//           setTimeout(() => {
//             popup.classList.add('opacity-100');
//             const popupContent = popup.querySelector('div');
//             popupContent.classList.remove('scale-95');
//             popupContent.classList.add('scale-100');
//           }, 10);
          
//           // Add close functionality
//           document.getElementById('closePopup').addEventListener('click', () => {
//             closePopup(popup);
//           });
          
//           // Close when clicking outside
//           popup.addEventListener('click', (e) => {
//             if (e.target === popup) {
//               closePopup(popup);
//             }
//           });
          
//           // Book Now button functionality
//           document.getElementById('bookNowBtn').addEventListener('click', () => {
//             // Close current popup
//             closePopup(popup);
            
//             // Create booking form popup
//             setTimeout(() => {
//               showBookingForm(validPackages, promosData);
//             }, 300);
//           });
          
//           // Helper function to close popup with animation
//           function closePopup(popupElement) {
//             const popupContent = popupElement.querySelector('div');
//             popupElement.classList.remove('opacity-100');
//             popupElement.classList.add('opacity-0');
//             popupContent.classList.remove('scale-100');
//             popupContent.classList.add('scale-95');
            
//             setTimeout(() => {
//               document.body.removeChild(popupElement);
//             }, 300);
//           }
//           function showBookingForm(packages, promosData) {
//             // Create booking form popup
//             const bookingForm = document.createElement('div');
//             bookingForm.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 overflow-y-auto py-6';
            
//             // Convert packages array to mapping object for easier reference
//             const packageData = {};
//             packages.forEach((pkg, index) => {
//               const key = `package${index + 1}`;
//               // const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
//               // const key = index === 0 ? 'package1' : index === 1 ? 'package2' : 'package3,package4';
//               const shortName = pkg.shortName || pkg.name.split(' ')[1] || pkg.name;
//               packageData[key] = {
//                 id: pkg._id,
//                 name: pkg.name,
//                 shortName: shortName.toLowerCase(),
//                 price: pkg.originalPrice,
//                 discountedPrice: pkg.discountedPrice,
//                 duration: pkg.duration,
//                 description: pkg.description,
//                 highlights: pkg.highlights || [],
//                 inclusions: pkg.inclusions || [],
//                 exclusions: pkg.exclusions || [],
//                 itinerary: pkg.itinerary || []
//               };
//             });
            
//             const promoCodes = {};
//       const currentDate = new Date();
      
//       // const selectedPackageKey = Object.keys(packageData)[0]; 
//       const userPackagePrice = 950
      
//       console.log(userPackagePrice)
//       if (promosData?.data && Array.isArray(promosData.data)) {
//         promosData.data.forEach(promo => {
//           // Required fields check
//           if (!promo?.code || !promo?.discount || promo?.isActive !== true) {
//             return;
//           }
      
//           // Date validation - only check validFrom if it exists
//           const validUntil = new Date(promo.validUntil);
//           if (validUntil < currentDate) {
//             return;
//           }
      
//           // Only check validFrom if provided
//           if (promo.validFrom) {
//             const validFrom = new Date(promo.validFrom);
//             if (validFrom > currentDate) {
//               return;
//             }
//           }
      
//           // Package price check
//           if (userPackagePrice < (promo.minPackagePrice )) {
//             return;
//           }
      
//           // Max discount check (if applicable)
//           if (promo.maxDiscount && promo.discount > promo.maxDiscount) {
//             return;
//           }
      
//           // If all checks passed
//           promoCodes[promo.code] = promo.discount;
//         });
//       }
      
//       // Use API promos if any passed validation
//       if (Object.keys(promoCodes).length > 0) {
//         console.log('Using API promo codes:', promoCodes);
//       } else {
//         console.log('Using default promo codes');
//         Object.assign(promoCodes, {
//           'KASHMIR2025': 10,
//           'SPRING25': 15,
//           'FAMILY20': 20
//         });
//       }
         
//             // Generate package radio buttons dynamically
//             let packageOptionsHTML = '';
//             Object.keys(packageData).forEach((key, index) => {
//               const pkg = packageData[key];
//               packageOptionsHTML += `
//                 <div class="package-option">
//                   <input type="radio" id="${key}" name="package" value="${pkg.shortName}" class="hidden peer" ${index === 0 ? 'checked' : ''}>
//                   <label for="${key}" class="block p-3 border-2 border-gray-200 rounded-lg text-center cursor-pointer transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-orange-300">
//                     <span class="block font-medium">${pkg.shortName}</span>
//                     <span class="block text-orange-600 font-bold mt-1">₹<span id="${pkg.shortName}-price">${pkg.discountedPrice.toLocaleString()}</span></span>
//                     <span class="block text-xs text-gray-500 mt-1">${pkg.duration}</span>
//                   </label>
//                 </div>
//               `;
//             });
            
//             // Create tabs for package details
//             const packageDetailsTabsHTML = `
//               <div class="mt-4 border-b border-gray-200">
//                 <nav class="flex space-x-4">
//                   <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-orange-500 text-orange-600" data-tab="overview">
//                     Overview
//                   </button>
//                   <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="itinerary">
//                     Itinerary
//                   </button>
//                   <button type="button" class="tab-button py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="inclusions">
//                     Inclusions
//                   </button>
//                 </nav>
//               </div>
//               <div id="tab-content" class="mt-4"></div>
//             `;
            
//             // Create form content with dynamic data
//            // Create form content with dynamic data
//       bookingForm.innerHTML = `
//       <div class="bg-white rounded-xl p-0 max-w-2xl w-full mx-4 shadow-2xl transform transition-all scale-95 overflow-hidden my-auto">
//         <!-- Header with premium gradient background -->
//         <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-5 sm:p-7 text-white relative">
//           <div class="relative z-10">
//             <div class="flex items-center">
//               <svg class="w-7 h-7 mr-2 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"></path>
//               </svg>
//               <h3 class="text-xl sm:text-2xl font-bold">Book Your Kashmir Adventure</h3>
//             </div>
//             <p class="mt-2 opacity-90 flex items-center">
//               <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
//               </svg>
//               <span>Exclusive offers • Up to 30% off • Secure checkout</span>
//             </p>
//             <div class="mt-2 inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//               <span class="flex items-center">
//                 <svg class="w-4 h-4 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
//                 </svg>
//                 <span>Hurry! Prices increase in <span id="countdownTimer" class="font-bold">23:59:59</span></span>
//               </span>
//             </div>
//           </div>
          
         
//                   <button id="closeBookingForm" class="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors">
//                     <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                     </svg>
//                   </button>
                    
          
//           <!-- Enhanced decorative elements -->
//           <div class="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-yellow-400 to-transparent rounded-full opacity-30 transform translate-x-10 -translate-y-10"></div>
//           <div class="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-red-500 to-transparent rounded-full opacity-20 transform -translate-x-10 translate-y-10"></div>
          
//           <!-- Decorative wave divider -->
//           <div class="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
//             <svg class="relative block w-full h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//               <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
//               <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
//               <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
//             </svg>
//           </div>
//         </div>
        
//         <!-- Premium badge -->
//         <div class="absolute top-0 right-0 transform translate-x-4 -translate-y-4 z-10">
//           <div class="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform -rotate-12">
//             PREMIUM DEALS
//           </div>
//         </div>
        
//         <!-- Form content -->
//         <div class="p-5 sm:p-7 pt-8 sm:pt-10 max-h-[calc(100vh-220px)] overflow-y-auto">
//           <!-- Trust badges -->
//           <div class="flex justify-center space-x-4 mb-6 border-b border-gray-100 pb-4">
//             <div class="flex items-center text-xs text-gray-600">
//               <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
//               </svg>
//               Secure Booking
//             </div>
//             <div class="flex items-center text-xs text-gray-600">
//               <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
//               </svg>
//               Best Price
//             </div>
//             <div class="flex items-center text-xs text-gray-600">
//               <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
//               </svg>
//               5★ Experiences
//             </div>
//           </div>
          
//           <form id="kashmirBookingForm" class="space-y-5">
//             <!-- Package selection with enhanced styling -->
//             <div class="mb-5">
//               <label class="block text-sm font-medium text-gray-700 mb-2">Select Your Dream Package</label>
//               <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 ${packageOptionsHTML}
//               </div>
//             </div>
            
//             <!-- Package details section with improved styling -->
//             <div class="bg-orange-50 p-5 rounded-lg border border-orange-100 shadow-sm mb-5">
//               <div class="flex items-center mb-3">
//                 <svg class="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path>
//                 </svg>
//                 <h4 class="font-bold text-lg text-gray-800" id="packageTitle">${packageData.package1.name}</h4>
//               </div>
//               <p class="text-gray-600 mb-3" id="packageDescription">${packageData.package1.description}</p>
              
//               ${packageDetailsTabsHTML}
//             </div>
            
//             <!-- Order summary with improved design -->
//             <div id="orderSummary" class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm mb-5">
//               <h4 class="font-medium flex items-center mb-3 text-gray-800">
//                 <svg class="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
//                 </svg>
//                 Order Summary
//               </h4>
//               <div class="flex justify-between items-center text-sm mb-1">
//                 <span class="text-gray-700">Package: <span id="selectedPackageName" class="font-medium">${packageData.package1.name}</span></span>
//                 <span id="packageBasePrice" class="text-gray-700">₹${packageData.package1.price.toLocaleString()}</span>
//               </div>
//               <div class="flex justify-between items-center text-sm mb-1">
//                 <span class="text-gray-700">Duration:</span>
//                 <span id="packageDuration" class="text-gray-700">${packageData.package1.duration}</span>
//               </div>
//               <div class="flex justify-between items-center text-sm mb-1">
//                 <span class="text-gray-700 flex items-center">
//                   <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
//                   </svg>
//                   Special offer discount:
//                 </span>
//                 <span class="text-green-600 font-medium">-₹<span id="specialDiscount">${(packageData.package1.price - packageData.package1.discountedPrice).toLocaleString()}</span></span>
//               </div>
//               <div id="promoDiscountRow" class="justify-between items-center text-sm mb-1 hidden">
//                 <span class="text-gray-700 flex items-center">
//                   <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
//                   </svg>
//                   Promo code discount: <span id="promoCodeLabel" class="font-medium"></span>
//                 </span>
//                 <span class="text-green-600 font-medium">-₹<span id="promoDiscount">0</span></span>
//               </div>
//               <div class="flex justify-between font-bold pt-2 border-t mt-2 text-lg">
//                 <span class="text-gray-800">Total:</span>
//                 <span class="text-orange-600">₹<span id="totalPrice">${packageData.package1.discountedPrice.toLocaleString()}</span></span>
//               </div>
              
//               <!-- Limited time banner -->
//               <div class="mt-3 bg-amber-50 border border-amber-200 rounded-md p-2 flex items-center">
//                 <svg class="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
//                 </svg>
//                 <span class="text-xs text-amber-800">Price includes all taxes and fees. Limited slots available at this price!</span>
//               </div>
//             </div>
            
//             <!-- Two columns layout with improved design -->
//             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <!-- Personal information -->
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <div class="relative">
//                   <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                     </svg>
//                   </div>
//                   <input type="text" name="fullName" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//               </div>
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <div class="relative">
//                   <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                     </svg>
//                   </div>
//                   <input type="email" name="email" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//               </div>
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                 <div class="relative">
//                   <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//                     </svg>
//                   </div>
//                   <input type="tel" name="phone" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
//                 </div>
//               </div>
//               <div>
//                 <label class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
//                 <div class="flex items-center">
//                   <button type="button" id="decreaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200 flex items-center justify-center">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
//                     </svg>
//                   </button>
//                   <input type="number" name="travelers" id="travelers" min="1" max="10" value="2" class="w-16 px-3 py-2 border-y border-gray-300 text-center focus:outline-none" readonly>
//                   <button type="button" id="increaseTravelers" class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 flex items-center justify-center">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Date selection with icon -->
//             <div>
//               <label class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
//               <div class="relative">
//                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                   </svg>
//                 </div>
//                 <input type="date" name="travelDate" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="${new Date().toISOString().split('T')[0]}" required>
//               </div>
//               <p class="mt-1 text-xs text-orange-600">
//                 <svg class="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
//                 </svg>
//                 Tip: Book early to secure the best rates and availability!
//               </p>
//             </div>
            
//             <!-- Special requests with improved styling -->
//             <div>
//               <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
//               <div class="relative">
//                 <textarea name="specialRequests" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-20 sm:h-24 resize-none"></textarea>
//               </div>
//             </div>
            
//             <!-- Promo code with improved styling -->
//             <div>
//               <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
//               <div class="flex items-center space-x-2">
//                 <div class="relative flex-1">
//                   <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
//                     </svg>
//                   </div>
//                   <input type="text" name="promoCode"" id="promoCode"" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter promo code">
//                   </div>
//                   <button type="button" id="applyPromo" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
//                     Apply
//                   </button>
//                 </div>
//                 <p id="promoMessage" class="mt-1 text-xs text-green-600 hidden">
//                   <svg class="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
//                   </svg>
//                   <span id="promoMessageText"></span>
//                 </p>
//               </div>
              
//               <!-- Terms and conditions with checkbox -->
//               <div class="mt-4">
//                 <div class="flex items-start">
//                   <div class="flex items-center h-5">
//                     <input id="terms" name="terms" type="checkbox" class="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded" required>
//                   </div>
//                   <div class="ml-3 text-sm">
//                     <label for="terms" class="font-medium text-gray-700">I agree to the Terms and Conditions</label>
//                     <p class="text-gray-500">By checking this box, you agree to our <a href="#" class="text-orange-600 hover:text-orange-500">Terms of Service</a> and <a href="#" class="text-orange-600 hover:text-orange-500">Privacy Policy</a>.</p>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Submit button with enhanced styling -->
//               <div class="mt-6">
//                 <button type="submit" id="submitBooking" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all active:scale-95">
//                   <span class="flex items-center justify-center">
//                     <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                     Secure Your Booking Now
//                   </span>
//                 </button>
//                 <p class="mt-2 text-center text-sm text-gray-500">
//                   <span class="flex items-center justify-center">
//                     <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                     </svg>
//                     Secure payment • No booking fees • Best price guarantee
//                   </span>
//                 </p>
//               </div>
//             </form>
            
//             <!-- Customer reviews -->
//             <div class="mt-8 pt-6 border-t border-gray-200">
//               <h4 class="font-bold text-gray-700 mb-4 flex items-center">
//                 <svg class="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                 </svg>
//                 Customer Reviews
//               </h4>
//               <div class="flex items-center mb-4">
//                 <div class="flex text-amber-400">
//                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                 </div>
//                 <p class="ml-2 text-gray-700 font-medium">4.9 out of 5</p>
//                 <span class="ml-2 text-sm text-gray-500">(Based on 246 reviews)</span>
//               </div>
              
//               <div class="space-y-4">
//                 <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
//                   <div class="flex items-start">
//                     <div class="flex-shrink-0 mr-3">
//                       <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
//                         RA
//                       </div>
//                     </div>
//                     <div>
//                       <p class="font-medium text-gray-800">Rahul A.</p>
//                       <div class="flex text-amber-400 text-xs mb-1">
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                       </div>
//                       <p class="text-sm text-gray-600">The Premium package was worth every rupee! Our guide was knowledgeable and the accommodations were top-notch. Will definitely recommend to friends!</p>
//                       <p class="text-xs text-gray-500 mt-1">Traveled March 2025</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
//                   <div class="flex items-start">
//                     <div class="flex-shrink-0 mr-3">
//                       <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
//                         SP
//                       </div>
//                     </div>
//                     <div>
//                       <p class="font-medium text-gray-800">Sneha P.</p>
//                       <div class="flex text-amber-400 text-xs mb-1">
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                       </div>
//                       <p class="text-sm text-gray-600">Stunning landscapes and excellent service! The booking process was so easy, and the itinerary was perfect. Can't wait to return!</p>
//                       <p class="text-xs text-gray-500 mt-1">Traveled February 2025</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div class="mt-4 text-center">
//                 <a href="#" class="text-orange-600 hover:text-orange-500 text-sm font-medium inline-flex items-center">
//                   Read all 246 reviews
//                   <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
            
//             // Add form to body
//             document.body.appendChild(bookingForm);
            
//             // Trigger animation
//             setTimeout(() => {
//               bookingForm.classList.add('opacity-100');
//               const formContent = bookingForm.querySelector('div');
//               formContent.classList.remove('scale-95');
//               formContent.classList.add('scale-100');
//             }, 10);
            
//             // Tracking variables for promo code 
//             let currentPackage = packageData.package1.shortName;
//             let currentPromoCode = null;
//             let promoDiscountPercent = 0;
            
//             // Initial order summary setup
//             updateOrderSummary();
//             updatePackageDetails(packageData.package1);
            
//             // Function to update the order summary
//             function updateOrderSummary() {
//               // Find the package data for the current selection
//               const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
              
//               if (!selectedPackageData) {
//                 console.error('Package not found:', currentPackage);
//                 return;
//               }
              
//               const basePrice = selectedPackageData.price;
//               const specialDiscountAmount = basePrice - selectedPackageData.discountedPrice;
//               let promoDiscountAmount = 0;
              
//               // Calculate promo discount if applicable
//               if (promoDiscountPercent > 0) {
//                 promoDiscountAmount = Math.round(selectedPackageData.discountedPrice * (promoDiscountPercent / 100));
//                 document.getElementById('promoDiscountRow').classList.remove('hidden');
//                 document.getElementById('promoDiscount').textContent = promoDiscountAmount.toLocaleString();
//                 document.getElementById('promoCodeLabel').textContent = `(${promoDiscountPercent}%)`;
//               } else {
//                 document.getElementById('promoDiscountRow').classList.add('hidden');
//               }
              
//               // Calculate total price
//               const totalPrice = selectedPackageData.discountedPrice - promoDiscountAmount;
              
//               // Update display
//               document.getElementById('selectedPackageName').textContent = selectedPackageData.name;
//               document.getElementById('packageBasePrice').textContent = `₹${basePrice.toLocaleString()}`;
//               document.getElementById('packageDuration').textContent = selectedPackageData.duration;
//               document.getElementById('specialDiscount').textContent = specialDiscountAmount.toLocaleString();
//               document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
//             }
            
//             // Function to update package details when package selection changes
//             function updatePackageDetails(pkg) {
//               document.getElementById('packageTitle').textContent = pkg.name;
//               document.getElementById('packageDescription').textContent = pkg.description;
              
//               // Update the active tab content
//               const activeTab = document.querySelector('.tab-button[data-tab].border-orange-500')?.dataset.tab || 'overview';
//               showTabContent(activeTab, pkg);
//             }
            
//             // Function to show content for a specific tab
//             function showTabContent(tabName, pkg) {
//               const tabContent = document.getElementById('tab-content');
              
//               switch(tabName) {
//                 case 'overview':
//                   // Generate highlights HTML
//                   const highlightsHTML = pkg.highlights.map(highlight => 
//                     `<li class="flex items-start">
//                       <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                       ${highlight}
//                     </li>`
//                   ).join('');
                  
//                   tabContent.innerHTML = `
//                     <div>
//                       <h5 class="font-medium mb-2">Trip Highlights</h5>
//                       <ul class="space-y-2">
//                         ${highlightsHTML}
//                       </ul>
//                     </div>
//                   `;
//                   break;
                  
//                 case 'itinerary':
//                   // Generate itinerary HTML
//                   const itineraryHTML = pkg.itinerary.map(day => `
//                     <div class="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
//                       <div class="flex items-center">
//                         <span class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-800 font-medium">
//                           ${day.day}
//                         </span>
//                         <h5 class="ml-3 font-medium">${day.title}</h5>
//                       </div>
//                       <p class="mt-2 ml-11 text-gray-600">${day.description}</p>
//                     </div>
//                   `).join('');
                  
//                   tabContent.innerHTML = `
//                     <div>
//                       <h5 class="font-medium mb-2">Detailed Itinerary</h5>
//                       <div class="space-y-2">
//                         ${itineraryHTML}
//                       </div>
//                     </div>
//                   `;
//                   break;
                  
//                 case 'inclusions':
//                   // Generate inclusions and exclusions HTML
//                   const inclusionsHTML = pkg.inclusions.map(item => 
//                     `<li class="flex items-start">
//                       <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                       ${item}
//                     </li>`
//                   ).join('');
                  
//                   const exclusionsHTML = pkg.exclusions.map(item => 
//                     `<li class="flex items-start">
//                       <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                       </svg>
//                       ${item}
//                     </li>`
//                   ).join('');
                  
//                   tabContent.innerHTML = `
//                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h5 class="font-medium mb-2">What's Included</h5>
//                         <ul class="space-y-2">
//                           ${inclusionsHTML}
//                         </ul>
//                       </div>
//                       <div>
//                         <h5 class="font-medium mb-2">What's Not Included</h5>
//                         <ul class="space-y-2">
//                           ${exclusionsHTML}
//                         </ul>
//                       </div>
//                     </div>
//                   `;
//                   break;
//               }
//             }
            
//             // Tab switching functionality
//             document.querySelectorAll('.tab-button').forEach(button => {
//               button.addEventListener('click', function() {
//                 // Update active tab styling
//                 document.querySelectorAll('.tab-button').forEach(btn => {
//                   btn.classList.remove('border-orange-500', 'text-orange-600');
//                   btn.classList.add('border-transparent', 'text-gray-500');
//                 });
                
//                 this.classList.remove('border-transparent', 'text-gray-500');
//                 this.classList.add('border-orange-500', 'text-orange-600');
                
//                 // Find the current package data
//                 const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
                
//                 if (selectedPackageData) {
//                   showTabContent(this.dataset.tab, selectedPackageData);
//                 }
//               });
//             });
            
//             // Listen for package selection changes
//             document.querySelectorAll('input[name="package"]').forEach(radio => {
//               radio.addEventListener('change', function() {
//                 currentPackage = this.value;
//                 const selectedPackageData = Object.values(packageData).find(pkg => pkg.shortName === currentPackage);
//                 updateOrderSummary();
//                 updatePackageDetails(selectedPackageData);
//               });
//             });
            
//             // Handle promo code application
//             document.getElementById('applyPromo').addEventListener('click', function() {
//               const promoInput = document.getElementById('promoCode');
//               const enteredCode = promoInput.value.trim().toUpperCase();
//               const messageDiv = document.getElementById('promoMessage');
              
//               // Reset message styling
//               messageDiv.className = 'mt-1 text-sm';
              
//               if (!enteredCode) {
//                 messageDiv.textContent = 'Please enter a promo code.';
//                 messageDiv.classList.add('text-orange-600');
//                 messageDiv.classList.remove('hidden');
//                 return;
//               }
              
//               if (promoCodes[enteredCode]) {
//                 // Valid promo code
//                 promoDiscountPercent = promoCodes[enteredCode];
//                 currentPromoCode = enteredCode;
                
//                 messageDiv.textContent = `Success! ${promoDiscountPercent}% additional discount applied.`;
//                 messageDiv.classList.add('text-green-600');
//                 messageDiv.classList.remove('hidden');
                
//                 updateOrderSummary();
//               } else {
//                 // Invalid promo code
//                 promoDiscountPercent = 0;
//                 currentPromoCode = null;
                
//                 messageDiv.textContent = 'Invalid promo code. Please try again.';
//                 messageDiv.classList.add('text-red-600');
//                 messageDiv.classList.remove('hidden');
                
//                 document.getElementById('promoDiscountRow').classList.add('hidden');
//                 updateOrderSummary();
//               }
//             });
            
//             // Add close functionality
//             document.getElementById('closeBookingForm').addEventListener('click', () => {
//               closeBookingForm(bookingForm);
//             });
            
//             // Close when clicking outside
//             bookingForm.addEventListener('click', (e) => {
//               if (e.target === bookingForm) {
//                 closeBookingForm(bookingForm);
//               }
//             });
            
//             // Handle travelers count
//             document.getElementById('decreaseTravelers').addEventListener('click', () => {
//               const travelersInput = document.getElementById('travelers');
//               if (parseInt(travelersInput.value) > 1) {
//                 travelersInput.value = parseInt(travelersInput.value) - 1;
//               }
//             });
            
//             document.getElementById('increaseTravelers').addEventListener('click', () => {
//               const travelersInput = document.getElementById('travelers');
//               if (parseInt(travelersInput.value) < 10) {
//                 travelersInput.value = parseInt(travelersInput.value) + 1;
//               }
//             });
//             // Update the form submission handler in your showBookingForm function
//       document.getElementById('kashmirBookingForm').addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         // Show loading state
//         const submitButton = document.getElementById('submitBooking');
//         const originalText = submitButton.innerHTML;
//         submitButton.disabled = true;
//         submitButton.innerHTML = `
//           <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Processing...
//         `;
        
//         try {
//           // Get form values
//           const form = e.target;
//           const formData = new FormData(form);
          
//           // Find the selected package data
//           const selectedPackageData = Object.values(packageData).find(
//             pkg => pkg.shortName === currentPackage
//           );
          
//           // Prepare booking data according to your schema
//           const bookingData = {
//             packageId: selectedPackageData.id,
//             customerName: formData.get('fullName'), // Changed from 'name' to match your schema
//             email: formData.get('email'),
//             phone: formData.get('phone'),
//             travelers: parseInt(formData.get('travelers')),
//             travelDate: formData.get('travelDate'),
//             specialRequests: formData.get('specialRequests'),
//             promoCode: currentPromoCode,
//             originalAmount: selectedPackageData.price,
//             discountAmount: selectedPackageData.price - selectedPackageData.discountedPrice,
//             finalAmount: parseInt(document.getElementById('totalPrice').textContent.replace(/,/g, '')),
//             status: 'pending',
//             paymentStatus: 'pending'
//           };
          
//           // Send to API
//           const response = await fetch('http://localhost:5000/api/bookings', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(bookingData)
//           });
          
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
          
//           const result = await response.json();
          
//           // Close the form
//           closeBookingForm(bookingForm);
          
//           // Show success message
//           showSuccessMessage(currentPackage, currentPromoCode, packageData, result);
          
//         } catch (error) {
//           console.error('Booking error:', error);
          
//           // Show error message
//           const errorMessage = document.createElement('div');
//           errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
//           errorMessage.textContent = 'Booking failed. Please try again.';
          
//           document.body.appendChild(errorMessage);
          
//           // Remove error message after 5 seconds
//           setTimeout(() => {
//             document.body.removeChild(errorMessage);
//           }, 5000);
          
//         } finally {
//           // Reset button state
//           submitButton.disabled = false;
//           submitButton.innerHTML = originalText;
//         }
//       });
           
            
//             // Helper function to close booking form with animation
//             function closeBookingForm(formElement) {
//               const formContent = formElement.querySelector('div');
//               formElement.classList.remove('opacity-100');
//               formElement.classList.add('opacity-0');
//               formContent.classList.remove('scale-100');
//               formContent.classList.add('scale-95');
              
//               setTimeout(() => {
//                 document.body.removeChild(formElement);
//               }, 300);
//             }
            
//             // Add ESC key to close form
//             const handleEscKey = (e) => {
//               if (e.key === 'Escape') {
//                 closeBookingForm(bookingForm);
//                 document.removeEventListener('keydown', handleEscKey);
//               }
//             };
            
//             document.addEventListener('keydown', handleEscKey);
//           }
          
         
//           function showSuccessMessage(packageCode, promoCode, packageData) {
//             const successMessage = document.createElement('div');
//             successMessage.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
            
//             // Find the package data for the selected package
//             const selectedPackage = Object.values(packageData).find(pkg => pkg.shortName === packageCode);
            
//             if (!selectedPackage) {
//               console.error('Package not found for success message:', packageCode);
//               return;
//             }
            
//             // Generate a random booking reference
//             const bookingRef = 'KASH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            
//             // Create promo text if applicable
//             const promoText = promoCode ? `<p class="mt-1 text-gray-600">Promo code applied: <span class="font-medium">${promoCode}</span></p>` : '';
            
//             successMessage.innerHTML = `
//               <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-95 text-center">
//                 <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
//                   <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                 </div>
//                 <h3 class="text-xl sm:text-2xl font-bold mt-4">Booking Successful!</h3>
//                 <p class="mt-2 text-gray-600">Your ${selectedPackage.name} (${selectedPackage.duration}) is confirmed. We've sent the details to your email.</p>
//                 <p class="mt-1 text-gray-600">Booking reference: <span class="font-medium">${bookingRef}</span></p>
//                 ${promoText}
//                 <button id="closeSuccess" class="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
//                   Continue
//                 </button>
//               </div>
//             `;
            
//             document.body.appendChild(successMessage);
//             setTimeout(() => {
//               successMessage.classList.add('opacity-100');
//               const messageContent = successMessage.querySelector('div');
//               messageContent.classList.remove('scale-95');
//               messageContent.classList.add('scale-100');
//             }, 10);
            
//             // Close success message when the continue button is clicked
//             document.getElementById('closeSuccess').addEventListener('click', () => {
//               successMessage.classList.remove('opacity-100');
//               successMessage.classList.add('opacity-0');
//               const messageContent = successMessage.querySelector('div');
//               messageContent.classList.remove('scale-100');
//               messageContent.classList.add('scale-95');
              
//               setTimeout(() => {
//                 document.body.removeChild(successMessage);
//               }, 300);
//             });
            
//             // Close when clicking outside
//             successMessage.addEventListener('click', (e) => {
//               if (e.target === successMessage) {
//                 successMessage.classList.remove('opacity-100');
//                 successMessage.classList.add('opacity-0');
//                 const messageContent = successMessage.querySelector('div');
//                 messageContent.classList.remove('scale-100');
//                 messageContent.classList.add('scale-95');
                
//                 setTimeout(() => {
//                   document.body.removeChild(successMessage);
//                 }, 300);
//               }
//             });
            
//             // Add ESC key to close success message
//             const handleEscKey = (e) => {
//               if (e.key === 'Escape') {
//                 successMessage.classList.remove('opacity-100');
//                 successMessage.classList.add('opacity-0');
//                 const messageContent = successMessage.querySelector('div');
//                 messageContent.classList.remove('scale-100');
//                 messageContent.classList.add('scale-95');
                
//                 setTimeout(() => {
//                   document.body.removeChild(successMessage);
//                 }, 300);
//                 document.removeEventListener('keydown', handleEscKey);
//               }
//             };
            
//             document.addEventListener('keydown', handleEscKey);
//           }
//         } catch (error) {
//           console.error('Error in handleDiscoverPackages:', error);
//           // Show error message to user
//           const errorPopup = document.createElement('div');
//           errorPopup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
//           errorPopup.innerHTML = `
//             <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
//               <div class="text-center">
//                 <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//                 <h3 class="text-xl font-bold mt-4">Something Went Wrong</h3>
//                 <p class="mt-2 text-gray-600">We couldn't load the package information. Please try again later.</p>
//                 <button id="closeError" class="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
//                   Close
//                 </button>
//               </div>
//             </div>
//           `;
          
//           document.body.appendChild(errorPopup);
//           document.getElementById('closeError').addEventListener('click', () => {
//             document.body.removeChild(errorPopup);
//           });
//         }
//       }; 
//     // const handleDiscoverPackages = () => {
//     //   // Your existing popup logic
//     //   console.log("Opening Kashmir packages popup");
//     //   // openKashmirPopup(); // Uncomment and replace with your function
//     // };
    
//     return (
//       <button
//         onClick={handleDiscoverPackages}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={`
//           px-6 py-3 sm:px-8 sm:py-4 
//           text-sm sm:text-base 
//           bg-gradient-to-r from-orange-600 to-amber-600 
//           text-white font-bold rounded-lg
//           shadow-xl
//           relative
//           overflow-hidden
//           transform
//           transition-all duration-300
//           ${isHovered ? 'scale-105' : ''}
//           ${isPulsing ? 'animate-pulse' : ''}
//           hover:shadow-2xl
//           focus:outline-none focus:ring-4 focus:ring-orange-300
//           active:scale-95
//         `}
//         aria-label="Explore our popular Kashmir tour packages"
//       >
//         {/* Overlay effect when hovered */}
//         <span className={`
//           absolute inset-0 
//           bg-gradient-to-r from-amber-500 to-orange-500
//           transition-opacity duration-300
//           ${isHovered ? 'opacity-100' : 'opacity-0'}
//         `}></span>
        
//         {/* Button text */}
//         <span className="relative flex items-center justify-center gap-2">
//           <span className="block sm:hidden">Discover Kashmir Packages</span>
//           <span className="hidden sm:block">Discover Kashmir Packages</span>
          
//           {/* Animated arrow icon */}
//           <svg 
//             className={`w-4 h-4 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//           </svg>
//         </span>
        
//         {/* Subtle shine effect */}
//         <span className={`
//           absolute top-0 -left-full h-full w-1/3
//           bg-white opacity-30 transform rotate-12
//           transition-all duration-1000
//           ${isHovered ? 'left-full' : ''}
//         `}></span>
//       </button>
//     );
//   };
  
//   export default EnhancedKashmirButton;