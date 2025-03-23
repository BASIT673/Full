import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
const TourQueryFormGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    guests: '2',
    budget: '',
    interests: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 11,
    minutes: 37,
    seconds: 45
  });
  const [animationIndex, setAnimationIndex] = useState(0);
  
  const adventureDestinations = [
   "Gulmarg Ski Adventure ", "Tulip Garden in Srinaga" , "Dal Lake Houseboat Stay" ,"Sonmarg Glacier Exploration ","Mughal Garden Tour "," Leh-Ladakh Expedition"
  ];

  // Adventure rotating text effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationIndex(prev => (prev + 1) % adventureDestinations.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [adventureDestinations.length]);
  
  // Countdown timer effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timerId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success response
      setStatus({
        submitted: true,
        success: true,
        message: '🎉 Amazing! Your adventure journey begins now! We\'ll contact you within 24 hours with your personalized itinerary.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travelDate: '',
        guests: '2',
        budget: '',
        interests: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
    navigate('/login');
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      text: "The Peru expedition was life-changing! Our guide knew all the hidden spots away from tourists. I'm already planning my next adventure with this team!",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Mark Thompson",
      location: "London, UK",
      text: "Safari in Tanzania exceeded all expectations. We saw the Big Five in just two days! The accommodations were luxurious yet authentic.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Akiko Tanaka",
      location: "Tokyo, Japan",
      text: "The Northern Lights tour was magical. Everything was perfectly arranged, from the heated glass igloos to the expert photography tips.",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ];
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
      {/* Hero Section with Parallax Effect */}
      <button 
        onClick={goBack} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ChevronLeft size={16} />
        <span>Back to Categories</span>
      </button>
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-2xl" style={{height: "300px"}}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          From Solo to Groups

          </h1>
          <div className="h-12 overflow-hidden relative mb-6">
            <div className="transition-transform duration-500 ease-in-out" style={{transform: `translateY(-${animationIndex * 3}rem)`}}>
              {adventureDestinations.map((destination, index) => (
                <p key={index} className="text-xl md:text-2xl font-bold text-orange-200 h-12 flex items-center justify-center">
                  {destination}
                </p>
              ))}
            </div>
          </div>
          <button 
            onClick={() => document.getElementById('form-section').scrollIntoView({behavior: 'smooth'})}
            className="bg-white text-orange-600 hover:bg-orange-100 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-xl"
          >
            Start Your Journey Now
          </button>
        </div>
      </div>
      
      {/* Limited Offer Countdown */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">🔥 FLASH SALE: 20% OFF – Perfect for Solo Travelers, Couples & Groups!</h2>
            <p className="text-white text-opacity-90">Book your Kashmir adventure within 48 hours—ideal for solo explorers, romantic getaways, or group expeditions—and enjoy 20% off + a FREE local experience package!</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className="bg-white text-orange-600 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">{countdown.days}</div>
              <span className="text-sm mt-1">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-orange-600 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">{countdown.hours}</div>
              <span className="text-sm mt-1">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-orange-600 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">{countdown.minutes}</div>
              <span className="text-sm mt-1">Mins</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-orange-600 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">{countdown.seconds}</div>
              <span className="text-sm mt-1">Secs</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area with Tabs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" id="form-section">
        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center font-bold ${activeTab === 'form' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
            onClick={() => setActiveTab('form')}
          >
            Book Your Adventure
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-bold ${activeTab === 'why' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
            onClick={() => setActiveTab('why')}
          >
            Why Choose Us
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-bold ${activeTab === 'stories' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
            onClick={() => setActiveTab('stories')}
          >
            Adventure Stories
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'form' && (
          <div className="p-6">
            {/* Status Messages */}
            {status.submitted && (
              <div className={`mb-6 p-6 rounded-lg text-center ${status.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                <div className="text-2xl mb-2">{status.success ? '🎉' : '😓'}</div>
                <p className="text-lg font-medium">{status.message}</p>
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">Customize Your Dream Adventure</h2>
            
            {/* Popular Destinations Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Adventures:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Srinagar – Dal Lake & Mughal Gardens', 'Gulmarg – Ski Resort & Adventure', 'Pahalgam – Valley & Trekking', 'Sonmarg – Mountain & Glacier Tours', 'Leh-Ladakh – High-Altitude Adventure', 'Kupwara – Hidden Kashmir'].map((dest, index) => (
                  <button 
                    key={index}
                    type="button"
                    onClick={() => setFormData({...formData, destination: dest})}
                    className={`p-3 rounded-lg text-center transition-all ${
                      formData.destination === dest 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Preferred Destination *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                      placeholder="Where do you want to go?"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Adventurers</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="1">Solo Traveler (1 Person)</option>
                      <option value="2">Couple/Pair (2 People)</option>
                      <option value="3-5">Family (3-5 People) (3-5 People)</option>
                      <option value="6-10">Medium Group (6-10 People)</option>
                      <option value="10+">Large Group (10+ People)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Adventure Budget</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Your Budget Range</option>
                      <option value="economy">Budget Explorer ($500-$1,000)</option>
                      <option value="standard">Standard Adventure ($1,000-$2,500)</option>
                      <option value="luxury">Premium Experience ($2,500-$5,000)</option>
                      <option value="premium">Luxury Kashmir Tour (Over $5,000)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Adventure Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Your Adventure Style</option>
                      <option value="hiking">Scenic Tours (Dal Lake, Mughal Gardens)</option>
                      <option value="wildlife">Adventure Sports (Skiing, Trekking)</option>
                      <option value="cultural">Cultural & Heritage Tour</option>
                      <option value="beach">Luxury Houseboat Stay</option>
                      <option value="food">Wildlife & Nature Exploration</option>
                      <option value="adventure">Custom Adventure</option>
                    </select>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Adventure Vision</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tell us about your dream adventure... What experiences are you looking for? Any special requests?"
                  ></textarea>
                </div>
              </div>
              
              {/* Adventure Level Slider */}
              <div className="mt-6 mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Adventure Intensity Level:</h3>
                <div className="flex items-center">
                  <span className="text-orange-800 mr-3">Relaxed</span>
                  <div className="flex-1 px-2">
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      defaultValue="3"
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                  <span className="text-orange-800 ml-3">Extreme</span>
                </div>
                {/* <div className="flex justify-between px-1 mt-1">
                  <span className="text-xs text-gray-500">Leisurely</span>
                  <span className="text-xs text-gray-500">Moderate</span>
                  <span className="text-xs text-gray-500">Active</span>
                  <span className="text-xs text-gray-500">Challenging</span>
                  <span className="text-xs text-gray-500">Extreme</span>
                </div> */}
                 <div className="flex justify-between px-1 mt-1">
  <span className="text-xs text-gray-500">Scenic</span>
  <span className="text-xs text-gray-500">Cultural</span>
  <span className="text-xs text-gray-500">Adventure</span>
  <span className="text-xs text-gray-500">Luxury</span>
  <span className="text-xs text-gray-500">Offbeat</span>
</div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out flex justify-center items-center transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Your Adventure...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🚀</span> 
                      START MY ADVENTURE JOURNEY
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-sm text-center text-gray-500">
                By submitting, you'll join our adventure community and receive exclusive offers. We respect your privacy.
              </div>
            </form>
          </div>
        )}
        {activeTab === 'why' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">Why Adventure With Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">Expert-Led Adventures</h3>
                <p className="text-gray-700">Our local guides, with over 10 years of experience, provide deep insights into Kashmir’s hidden gems—from snow-capped peaks to serene valleys—ensuring every journey is authentic and unforgettable.

</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">Tailored Kashmir Journeys</h3>
                <p className="text-gray-700">Every tour is crafted to match your pace, preferences, and dream experiences—whether you want a leisurely houseboat stay or a thrilling mountain trek.</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">Transparent Pricing</h3>
                <p className="text-gray-700">No hidden fees or surprises—our Kashmir packages cover everything you need for a seamless and enriching travel experience.</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-100 p-6 rounded-lg flex">
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Responsible Tourism</h3>
                  <p className="text-gray-700">We are committed to sustainable tourism—supporting local communities, preserving Kashmir’s natural beauty, and minimizing our environmental footprint.</p>
                </div>
              </div>
              
              <div className="bg-orange-100 p-6 rounded-lg flex">
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">24/7 Support</h3>
                  <p className="text-gray-700">From booking to return, our dedicated support team is available around the clock to assist with any questions or concerns during your Kashmir journey</p>
                </div>
              </div>
              
              <div className="bg-orange-100 p-6 rounded-lg flex">
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Premium Accommodations</h3>
                  <p className="text-gray-700">Enjoy a stay in handpicked accommodations—from luxury houseboats on Dal Lake to cozy mountain retreats—combining comfort with an authentic Kashmiri touch.</p>
                </div>
              </div>
              
              <div className="bg-orange-100 p-6 rounded-lg flex">
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Small Group Sizes</h3>
                  <p className="text-gray-700">We keep our groups small (max 15 people) to ensure personalized service, a close-knit experience, and a minimal ecological footprint.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
              <p className="mb-6">Let us create your perfect adventure journey tailored to your dreams.</p>
              <button 
                onClick={() => setActiveTab('form')}
                className="bg-white text-orange-600 hover:bg-orange-100 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
              >
                Plan My Adventure Now
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'stories' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">Adventure Stories From Our Explorers</h2>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-orange-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.location}</p>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700">{testimonial.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">📸</div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Instagram Photos</h3>
                <p className="text-gray-700 mb-4">Follow our adventurers and their amazing journeys through stunning photography.</p>
                <button className="text-orange-600 font-semibold hover:text-orange-800">@AdventureExplorers</button>
              </div>
              
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Adventure Blog</h3>
                <p className="text-gray-700 mb-4">Read detailed stories, tips, and insights from our global expeditions.</p>
                <button className="text-orange-600 font-semibold hover:text-orange-800">Visit Our Blog</button>
              </div>
              
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Adventure Videos</h3>
                <p className="text-gray-700 mb-4">Watch thrilling footage from our most exciting expeditions around the world.</p>
                <button className="text-orange-600 font-semibold hover:text-orange-800">Watch Now</button>
              </div>
            </div>
            
            <div className="mt-8 bg-orange-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Adventure Community</h3>
              <p className="mb-6">Subscribe to our newsletter for inspiring stories, exclusive offers, and adventure tips.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button className="bg-white text-orange-600 hover:bg-orange-100 font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Trust Badges */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center text-gray-700 mb-6">Trusted By Adventurers Worldwide</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-sm font-semibold text-gray-600">Best Adventure Tour</div>
            <div className="text-xs text-gray-500">Tourism Awards 2024</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-sm font-semibold text-gray-600">4.9/5 Rating</div>
            <div className="text-xs text-gray-500">From 2,000+ Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-sm font-semibold text-gray-600">Sustainable Tourism</div>
            <div className="text-xs text-gray-500">Certified Partner</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-sm font-semibold text-gray-600">100% Secure Booking</div>
            <div className="text-xs text-gray-500">SSL Protected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-sm font-semibold text-gray-600">15,000+ Happy Adventurers</div>
            <div className="text-xs text-gray-500">Since 2010</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>© 2025 Adventure Explorers. All rights reserved. Your journey to extraordinary experiences begins here.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-orange-600">Privacy Policy</a>
          <a href="#" className="hover:text-orange-600">Terms of Service</a>
          <a href="#" className="hover:text-orange-600">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default TourQueryFormGroup;