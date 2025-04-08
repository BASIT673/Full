import { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [selectedPlan, setSelectedPlan] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phoneNumber: '',
    email: '',
    interestedIn: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Send data to your API endpoint
      await axios.post('https://backend-1-7zwm.onrender.com/api/contact', formData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        businessName: '',
        phoneNumber: '',
        email: '',
        interestedIn: '',
        message: ''
      });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPlan(null);
    // Reset states when closing
    setSuccess(false);
    setError('');
  };

  return (
    <>
      {selectedPlan === 'contact' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center p-4 overflow-y-auto">
          {/* Container with max-height and proper scrolling */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto my-8 transition-all duration-300 transform max-h-[90vh] overflow-y-auto">
            {/* Animated header with gradient - sticky on scroll */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-lg z-10">
              <h3 className="font-bold text-2xl md:text-3xl">Get in Touch</h3>
              <p className="text-orange-100 text-sm md:text-base mt-1">We're excited to hear from you!</p>
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-white hover:text-orange-200 focus:outline-none transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            {/* Content area with proper padding and constrained height */}
            <div className="p-6 sm:p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] py-4">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900 text-center">Thanks for reaching out!</h3>
                  <p className="mt-3 text-base text-gray-500 text-center">
                    We've received your message and will get back to you shortly.
                  </p>
                  <div className="mt-8 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full rounded-md border border-transparent shadow-sm px-6 py-3 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm md:text-base">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="name">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="businessName">
                        Business Name
                      </label>
                      <input 
                        id="businessName"
                        name="businessName"
                        type="text" 
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <input 
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel" 
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
                        placeholder="Your contact number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="interestedIn">
                      Interested In <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="interestedIn"
                      name="interestedIn"
                      required
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="onetime">One-Time Purchase</option>
                      <option value="subscription">Monthly Subscription</option>
                      <option value="hybrid">Hybrid Model</option>
                      <option value="custom">Custom Solution</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="message">
                      Message (Optional)
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors min-h-[120px]"
                      placeholder="Tell us more about your requirements"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-center pt-4 space-y-4 md:space-y-0 md:space-x-6">
                    <button 
                      type="button" 
                      onClick={closeModal}
                      className="w-full md:w-auto text-gray-500 hover:text-gray-700 text-sm md:text-base focus:outline-none transition-colors px-6 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className={`w-full md:w-auto bg-orange-500 text-white px-6 py-2.5 rounded-md hover:bg-orange-600 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors min-w-[200px] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
//   return (
//     <>
//       {selectedPlan === 'contact' && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto">
//           {/* Increased max-width for desktop and added min-height for better proportions */}
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto my-8 transition-all duration-300 transform">
//             {/* Animated header with gradient */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-lg relative">
//               <h3 className="font-bold text-2xl md:text-3xl">Get in Touch</h3>
//               <p className="text-orange-100 text-sm md:text-base mt-1">We're excited to hear from you!</p>
//               <button 
//                 onClick={closeModal}
//                 className="absolute top-6 right-6 text-white hover:text-orange-200 focus:outline-none transition-colors"
//                 aria-label="Close"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
  
//             <div className="p-6 sm:p-8">
//               {success ? (
//                 <div className="text-center py-10">
//                   <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
//                     <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl md:text-2xl font-medium text-gray-900">Thanks for reaching out!</h3>
//                   <p className="mt-3 text-base text-gray-500">
//                     We've received your message and will get back to you shortly.
//                   </p>
//                   <div className="mt-8">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors min-w-[200px]"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                   {error && (
//                     <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm md:text-base">
//                       {error}
//                     </div>
//                   )}
                  
//                   {/* Form grid with adjusted gap for desktop */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="name">
//                         Your Name <span className="text-red-500">*</span>
//                       </label>
//                       <input 
//                         id="name"
//                         name="name"
//                         type="text" 
//                         required
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Enter your full name"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="businessName">
//                         Business Name
//                       </label>
//                       <input 
//                         id="businessName"
//                         name="businessName"
//                         type="text" 
//                         value={formData.businessName}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your company name"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
//                         Phone Number
//                       </label>
//                       <input 
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         type="tel" 
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your contact number"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="email">
//                         Email Address <span className="text-red-500">*</span>
//                       </label>
//                       <input 
//                         id="email"
//                         name="email"
//                         type="email" 
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your email address"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="interestedIn">
//                       Interested In <span className="text-red-500">*</span>
//                     </label>
//                     <select 
//                       id="interestedIn"
//                       name="interestedIn"
//                       required
//                       value={formData.interestedIn}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors bg-white"
//                     >
//                       <option value="">Select an option</option>
//                       <option value="onetime">One-Time Purchase</option>
//                       <option value="subscription">Monthly Subscription</option>
//                       <option value="hybrid">Hybrid Model</option>
//                       <option value="custom">Custom Solution</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm md:text-base font-medium text-gray-700 mb-2" htmlFor="message">
//                       Message (Optional)
//                     </label>
//                     <textarea 
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors"
//                       rows="4"
//                       placeholder="Tell us more about your requirements"
//                     ></textarea>
//                   </div>
                  
//                   {/* Enhanced button area for desktop */}
//                   <div className="flex flex-col md:flex-row justify-between items-center pt-4 space-y-4 md:space-y-0 md:space-x-6">
//                     <button 
//                       type="button" 
//                       onClick={closeModal}
//                       className="text-gray-500 hover:text-gray-700 text-sm md:text-base focus:outline-none transition-colors w-full md:w-auto md:px-6 py-2 md:py-2.5 rounded-md border border-gray-300 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       type="submit" 
//                       disabled={loading}
//                       className={`bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors w-full md:w-auto min-w-[200px] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     >
//                       {loading ? (
//                         <span className="flex items-center justify-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Submitting...
//                         </span>
//                       ) : 'Submit Request'}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
//   return (
//     <>
//       {selectedPlan === 'contact' && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto my-8 transition-all duration-300 transform">
//             {/* Animated header with gradient */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-t-lg relative">
//               <h3 className="font-bold text-xl md:text-2xl">Get in Touch</h3>
//               <p className="text-orange-100 text-sm mt-1">We're excited to hear from you!</p>
//               <button 
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-white hover:text-orange-200 focus:outline-none"
//                 aria-label="Close"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="p-5 sm:p-6">
//               {success ? (
//                 <div className="text-center py-8">
//                   <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
//                     <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">Thanks for reaching out!</h3>
//                   <p className="mt-2 text-sm text-gray-500">
//                     We've received your message and will get back to you shortly.
//                   </p>
//                   <div className="mt-6">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                   {error && (
//                     <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
//                       {error}
//                     </div>
//                   )}
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Your Name <span className="text-red-500">*</span></label>
//                       <input 
//                         id="name"
//                         name="name"
//                         type="text" 
//                         required
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Enter your full name"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="businessName">Business Name</label>
//                       <input 
//                         id="businessName"
//                         name="businessName"
//                         type="text" 
//                         value={formData.businessName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your company name"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
//                       <input 
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         type="tel" 
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your contact number"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address <span className="text-red-500">*</span></label>
//                       <input 
//                         id="email"
//                         name="email"
//                         type="email" 
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors" 
//                         placeholder="Your email address"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interestedIn">Interested In <span className="text-red-500">*</span></label>
//                     <select 
//                       id="interestedIn"
//                       name="interestedIn"
//                       required
//                       value={formData.interestedIn}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors bg-white"
//                     >
//                       <option value="">Select an option</option>
//                       <option value="onetime">One-Time Purchase</option>
//                       <option value="subscription">Monthly Subscription</option>
//                       <option value="hybrid">Hybrid Model</option>
//                       <option value="custom">Custom Solution</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message (Optional)</label>
//                     <textarea 
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-colors"
//                       rows="3"
//                       placeholder="Tell us more about your requirements"
//                     ></textarea>
//                   </div>
                  
//                   <div className="flex justify-between items-center pt-2">
//                     <button 
//                       type="button" 
//                       onClick={closeModal}
//                       className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       type="submit" 
//                       disabled={loading}
//                       className={`bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     >
//                       {loading ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Submitting...
//                         </span>
//                       ) : 'Submit Request'}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
};

export default ContactForm;