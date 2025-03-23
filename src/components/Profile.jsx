
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:5000/api/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         alert(err.response.data.error);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (!user) {
//     return <div className="text-center py-4">Loading...</div>; // Display a loading message
//   }


//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="mb-4">
//           <p className="font-semibold">Username:</p>
//           <p>{user.username}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">Email:</p>
//           <p>{user.email}</p>
//         </div>
//         {/* Add more profile information here */}
//       </div>
//     </div>
//   );
// };

// export default Profile;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           alert('You need to log in first!');
//           return;
//         }

//         // Fetch user details
//         const userRes = await axios.get(`http://localhost:5000/api/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUser(userRes.data);

//         // Fetch user bookings
//         // const bookingsRes = await axios.get(`http://localhost:5000/api/user/my-bookings`, {
//         //   headers: { Authorization: `Bearer ${token}` },
//         // });
//         const bookingsRes = await axios.get(`http://localhost:5000/api/user/my-bookings`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//         setBookings(bookingsRes.data.bookings);
//       } catch (err) {
//         console.error('Error fetching profile data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
      
//       {/* User Info */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-2xl font-semibold mb-4">User Details</h2>
//         <div className="mb-2">
//           <p className="font-semibold">Username:</p>
//           <p>{user?.username || 'N/A'}</p>
//         </div>
//         <div className="mb-2">
//           <p className="font-semibold">Email:</p>
//           <p>{user?.email || 'N/A'}</p>
//         </div>
//       </div>

//       {/* User Bookings */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
//         {bookings.length === 0 ? (
//           <p className="text-gray-500">You have no bookings yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {bookings.map((booking) => (
//               <li key={booking._id} className="border-b pb-4">
//                 <p><span className="font-semibold">Package:</span> {booking.packageDetails.name}</p>
//                 <p><span className="font-semibold">Amount:</span> ₹{booking.amount / 100}</p>
//                 <p><span className="font-semibold">Status:</span> 
//                   <span className={`ml-2 px-2 py-1 rounded text-white ${
//                     booking.status === 'successful' ? 'bg-green-500' :
//                     booking.status === 'pending' ? 'bg-yellow-500' :
//                     'bg-red-500'
//                   }`}>
//                     {booking.status}
//                   </span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
// //   const fetchBookings = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         console.error("🚨 No token found! Please log in.");
// //         return;
// //       }

// //       const res = await axios.get("http://localhost:5000/api/user/my-bookings", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setBookings(res.data.bookings || []); // ✅ Ensure it's always an array
// //     } catch (err) {
// //       console.error("🚨 Fetch error:", err.response?.data || err);
// //       setBookings([]); // ✅ Avoid undefined state on failure
// //     }
// //   };

// //   fetchBookings();
// // }, []);

// // useEffect(() => {
// //   const fetchProfileData = async () => {
// //     try {
// //       setLoading(true); // Ensure loading starts
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         console.error("🚨 No token found! Redirecting to login.");
// //         setLoading(false);
// //         return;
// //       }

// //       // Fetch user data
// //       const userRes = await axios.get(`http://localhost:5000/api/auth/me`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("🔥 User API Response:", userRes.data); // Debug API response
// //       setUser(userRes.data);

// //       // Fetch bookings data
// //       const bookingsRes = await axios.get("http://localhost:5000/api/user/my-bookings", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("✅ API Response:", bookingsRes.data);
// //       setBookings(bookingsRes.data.bookings || []);
// //     } catch (err) {
// //       console.error("🚨 Error fetching profile data:", err.response?.data || err);
// //       setBookings([]); 
// //     } finally {
// //       setLoading(false); // Ensure loading stops
// //     }
// //   };

// //   fetchProfileData();
// // }, []);

// useEffect(() => {
//   const fetchProfileData = async () => {
//     try {
//       setLoading(true); // Ensure loading starts
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("🚨 No token found! Redirecting to login.");
//         setLoading(false);
//         return;
//       }

//       // Fetch user data
//       const userRes = await axios.get(`http://localhost:5000/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("🔥 User API Response:", userRes.data); // Debug API response
//       setUser(userRes.data);

//       // Fetch bookings data
//       const bookingsRes = await axios.get("http://localhost:5000/api/user/my-bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ API Response:", bookingsRes.data);
//       setBookings(bookingsRes.data.bookings || []);
//     } catch (err) {
//       console.error("🚨 Error fetching profile data:", err.response?.data || err);
//       setBookings([]); 
//     } finally {
//       setLoading(false); // Ensure loading stops
//     }
//   };

//   fetchProfileData();
// }, []);

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-4 text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
      
//       {/* User Info */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-2xl font-semibold mb-4">User Details</h2>
//         <div className="mb-2">
//           <p className="font-semibold">Username:</p>
//           <p>{user?.username || 'N/A'}</p>
//         </div>
//         <div className="mb-2">
//           <p className="font-semibold">Email:</p>
//           <p>{user?.email || 'N/A'}</p>
//         </div>
//       </div>

//       {/* User Bookings */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
//         {bookings.length === 0 ? (
//           <p className="text-gray-500">You have no bookings yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {bookings.map((booking) => (
//               <li key={booking._id} className="border-b pb-4">
//                 <p><span className="font-semibold">Package:</span> {booking.packageDetails?.name || "Unknown"}</p>
//                 <p><span className="font-semibold">Amount:</span> ₹{(booking.amount / 100) || "N/A"}</p>
//                 <p><span className="font-semibold">Status:</span> 
//                   <span className={`ml-2 px-2 py-1 rounded text-white ${
//                     booking.status === 'successful' ? 'bg-green-500' :
//                     booking.status === 'pending' ? 'bg-yellow-500' :
//                     'bg-red-500'
//                   }`}>
//                     {booking.status || "Unknown"}
//                   </span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Calendar, Package, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log("📌 Token from localStorage:", token);
  
        if (!token) {
          console.error("🚨 No token found! Redirecting to login.");
          setLoading(false);
          return;
        }
  
        // Fetch user data
        const userRes = await axios.get("https://backend-1-7zwm.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("🔥 User API Response:", userRes.data);
        setUser(userRes.data.user);
        // setUser(userRes.data)
        console.log("🔥 User API Response:", userRes.data);
        setUser(userRes.data.user);
  
        // Use user ID to fetch bookings
        const bookingsRes = await axios.get(`https://backend-1-7zwm.onrender.com/api/user/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("✅ Bookings Response:", bookingsRes.data);
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("🚨 Error fetching profile data:", err.response?.data || err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, []);
  
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
  //       const token = localStorage.getItem("token");
  //       // const token = localStorage.getItem("token");
  //       console.log("📌 Token from localStorage:", token);
        
  //       if (!token) {
  //         console.error("🚨 No token found! Redirecting to login.");
  //         setLoading(false);
  //         return;
  //       }

  //       // Fetch user data
  //       const userRes = await axios.get(`http://localhost:5000/api/auth/me`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       console.log("🔥 User API Response:", userRes.data);
  //       setUser(userRes.data);

       
  //       const bookingsRes = await axios.get("http://localhost:5000/api/user/my-bookings", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log("📌 Requesting bookings for user ID:", req.user.id);
  //       const bookings = await bookings.find({ user: req.user.id });
  //       console.log("🔍 Bookings Found:", bookings);
        
  //       console.log("✅ API Response:", bookingsRes.data);
  //       setBookings(bookingsRes.data.bookings || []);
  //     } catch (err) {
  //       console.error("🚨 Error fetching profile data:", err.response?.data || err);
  //       setError("Failed to load profile data. Please try again later.");
  //       setBookings([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, []);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
  //       const token = localStorage.getItem("token");
  //       console.log("📌 Token from localStorage:", token);

  //       if (!token) {
  //         console.error("🚨 No token found! Redirecting to login.");
  //         setLoading(false);
  //         return;
  //       }

  //       // Fetch user data
  //       const userRes = await axios.get("http://localhost:5000/api/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       console.log("🔥 User API Response:", userRes.data);
  //       setUser(userRes.data);

  //     } catch (err) {
  //       console.error("🚨 Error fetching profile data:", err.response?.data || err);
  //       setError("Failed to load profile data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, []);

  // Get first letter of name for avatar
  const getInitial = () => {
    if (!user?.username) return '?';
    return user.username.charAt(0).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'successful':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Profile</h2>
          <p className="text-center text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-8 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white text-blue-700 rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
                {getInitial()}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user?.username || 'User'}</h1>
              <p className="text-blue-100 mt-1">{user?.email || 'email@example.com'}</p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-blue-800 bg-opacity-40 px-3 py-1 rounded-full text-sm">Member since {formatDate(user?.createdAt)}</span>
                <span className="bg-blue-800 bg-opacity-40 px-3 py-1 rounded-full text-sm">{bookings.length} Bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </button>
          </div>
        </div>

        {/* Profile Information */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Personal Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-800 font-medium">{user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-gray-800 font-medium">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                      <p className="text-gray-800 font-medium">{formatDate(user?.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                      <p className="text-gray-800 font-medium">
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                          {user?.role || 'User'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 mt-8">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Booking Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
                      <h3 className="text-indigo-600 font-medium">Completed</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {bookings.filter(b => b.status === 'successful').length}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <h3 className="text-yellow-600 font-medium">Pending</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {bookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      <h3 className="text-red-600 font-medium">Failed</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {bookings.filter(b => b.status !== 'successful' && b.status !== 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Recent Activity</h2>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No booking activity yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking._id} className="border-l-4 border-blue-500 pl-4 py-1">
                        <p className="font-medium text-gray-800">{booking.packageDetails?.name || "Package Booking"}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(booking.createdAt || new Date())}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow p-6 mt-8 text-white">
                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                <p className="mb-6">Our customer support team is here to assist you with your bookings.</p>
                <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">All Bookings</h2>
            </div>
            
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No Bookings Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  You haven't made any bookings yet. Explore our packages and start your adventure!
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Browse Packages
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                              <Package className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-800">{booking.packageDetails?.name || "Unknown Package"}</div>
                              <div className="text-sm text-gray-500">ID: {booking._id?.substring(0, 8) || "N/A"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(booking.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-medium">₹{((booking.amount || 0) / 100).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === 'successful' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Unknown"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;