// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     gstNumber: '',
//     workEmail: '',
//     password: '',
//     address: '',
//     phoneNumber: '',
//     licenseNumber: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         navigate('/profile');
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Travel Agent Signup</h2>
//       {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">GST Number</label>
//           <input
//             type="text"
//             name="gstNumber"
//             value={formData.gstNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
//             title="Please enter a valid GST number"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Work Email</label>
//           <input
//             type="email"
//             name="workEmail"
//             value={formData.workEmail}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             minLength="8"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Address</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             pattern="\d{10}"
//             title="Please enter a valid 10-digit phone number"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">License Number</label>
//           <input
//             type="text"
//             name="licenseNumber"
//             value={formData.licenseNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account?{' '}
//         <span
//           onClick={() => navigate('/login')}
//           className="text-blue-500 cursor-pointer hover:underline"
//         >
//           Login
//         </span>
//       </p>
//     </div>
//   );
// };
// export default SignupForm



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useLoadScript } from '@react-google-maps/api';

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     gstNumber: '',
//     workEmail: '',
//     password: '',
//     address: '',
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: '',
//     phoneNumber: '',
//     licenseNumber: ''
//   });
//   const [error, setError] = useState('');
//   const [autocomplete, setAutocomplete] = useState(null);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
//     libraries: ['places']
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       initAutocomplete();
//     }
//   }, [isLoaded]);

//   const initAutocomplete = () => {
//     const autocompleteInstance = new window.google.maps.places.Autocomplete(
//       document.getElementById('address-input'),
//       {
//         componentRestrictions: { country: 'IN' }, // Default to India
//         fields: ['address_components', 'formatted_address']
//       }
//     );

//     autocompleteInstance.addListener('place_changed', () => {
//       const place = autocompleteInstance.getPlace();
//       if (place.address_components) {
//         let streetNumber = '';
//         let route = '';
//         let newFormData = { ...formData };

//         place.address_components.forEach(component => {
//           const type = component.types[0];
//           switch (type) {
//             case 'street_number':
//               streetNumber = component.long_name;
//               break;
//             case 'route':
//               route = component.long_name;
//               break;
//             case 'locality':
//               newFormData.city = component.long_name;
//               break;
//             case 'administrative_area_level_1':
//               newFormData.state = component.long_name;
//               break;
//             case 'country':
//               newFormData.country = component.long_name;
//               break;
//             case 'postal_code':
//               newFormData.pincode = component.long_name;
//               break;
//             default:
//               break;
//           }
//         });

//         newFormData.street = `${streetNumber} ${route}`.trim();
//         newFormData.address = place.formatted_address;
//         setFormData(newFormData);
//       }
//     });

//     setAutocomplete(autocompleteInstance);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePhoneChange = (value, country) => {
//     setFormData({ ...formData, phoneNumber: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         navigate('/profile');
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Travel Agent Signup</h2>
//       {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">GST Number</label>
//           <input
//             type="text"
//             name="gstNumber"
//             value={formData.gstNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
//             title="Please enter a valid GST number"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Work Email</label>
//           <input
//             type="email"
//             name="workEmail"
//             value={formData.workEmail}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             minLength="8"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Address</label>
//           <input
//             id="address-input"
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Start typing your address..."
//             required
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 mb-2">City</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">State</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Phone Number</label>
//           <PhoneInput
//             country={'in'}
//             value={formData.phoneNumber}
//             onChange={handlePhoneChange}
//             inputClass="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             containerClass="phone-input"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">License Number</label>
//           <input
//             type="text"
//             name="licenseNumber"
//             value={formData.licenseNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account?{' '}
//         <span
//           onClick={() => navigate('/login')}
//           className="text-blue-500 cursor-pointer hover:underline"
//         >
//           Login
//         </span>
//       </p>
//     </div>
//   );
// };

// export default SignupForm;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLoadScript } from '@react-google-maps/api';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    workEmail: '',
    password: '',
    address: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA3MVPPXv_zapNcPu6zSuLMVg7q7Pbtw-M',
    libraries: ['places']
  });

  useEffect(() => {
    if (isLoaded) {
      initAutocomplete();
    }
  }, [isLoaded]);

  const initAutocomplete = () => {
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      document.getElementById('address-input'),
      {
        componentRestrictions: { country: 'IN' }, // Default to India
        fields: ['address_components', 'formatted_address']
      }
    );

    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace();
      if (place.address_components) {
        let streetNumber = '';
        let route = '';
        let newFormData = { ...formData };

        // Keep existing values as defaults
        const existingData = {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode
        };

        place.address_components.forEach(component => {
          const type = component.types[0];
          switch (type) {
            case 'street_number':
              streetNumber = component.long_name;
              break;
            case 'route':
              route = component.long_name;
              break;
            case 'locality':
              newFormData.city = component.long_name || existingData.city;
              break;
            case 'administrative_area_level_1':
              newFormData.state = component.long_name || existingData.state;
              break;
            case 'country':
              newFormData.country = component.long_name || existingData.country;
              break;
            case 'postal_code':
              newFormData.pincode = component.long_name || existingData.pincode;
              break;
            default:
              break;
          }
        });

        // Only update street if we got new values
        if (streetNumber || route) {
          newFormData.street = `${streetNumber} ${route}`.trim();
        }
        
        newFormData.address = place.formatted_address;
        setFormData(newFormData);
      }
    });

    setAutocomplete(autocompleteInstance);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        navigate('/verify-email', { 
          state: { email: formData.workEmail } 
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Travel Agent Signup</h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
            title="Please enter a valid GST number"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Work Email</label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            minLength="8"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Address Search</label>
          <input
            id="address-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing to search address..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Type to search or fill in the details manually below
          </p>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Street Address</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter street address"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter state"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pincode"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <PhoneInput
            country={'in'}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            inputClass="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            containerClass="phone-input"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;