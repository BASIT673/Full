
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { User, Calendar, Package, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Package, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Bookmark,
  MessageSquare,
  Shield,
  RefreshCw
} from 'lucide-react';
import AuthModal from './auth/AuthModal'
const Profile = () => {
  const { user: authUser, token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // First check if we're still loading auth state
    if (authLoading) {
      return; // Wait until auth is loaded
    }
    
    // Then check if we're authenticated
    if (!isAuthenticated) {
      console.error("🚨 Not authenticated! Redirecting to login.");
      navigate('/login');
      // {openAuthModal}
      return;
    }
    
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage directly
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error("🚨 No token found! Redirecting to login.");
          navigate('/login');
          return;
        }
 
        // Fetch user data
        const userRes = await axios.get("https://backend-1-7zwm.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        console.log("🔥 User API Response:", userRes.data);
        setUser(userRes.data.user);
 
        // Fetch bookings
        const bookingsRes = await axios.get(`https://backend-1-7zwm.onrender.com/api/user/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
 
        console.log("✅ Bookings Response:", bookingsRes.data);
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("🚨 Error fetching profile data:", err.response?.data || err);
        setError("Failed to load profile data. Please try again later.");
        
        // Check if the error is due to authentication
        if (err.response?.status === 401) {
          console.error("🔒 Authentication error, redirecting to login");
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
 
    fetchProfileData();
  }, [isAuthenticated, authLoading, navigate]);
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
        
  //       if (!token) {
  //         console.error("🚨 No token found! Redirecting to login.");
  //         navigate('/login');
  //         return;
  //       }
  
  //       // Fetch user data using context user ID if available
  //       const userRes = await axios.get("https://backend-1-7zwm.onrender.com/api/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
        
  //       console.log("🔥 User API Response:", userRes.data);
  //       setUser(userRes.data.user);
  
  //       // Fetch bookings
  //       const bookingsRes = await axios.get(`https://backend-1-7zwm.onrender.com/api/user/my-bookings`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  
  //       console.log("✅ Bookings Response:", bookingsRes.data);
  //       setBookings(bookingsRes.data.bookings || []);
  //     } catch (err) {
  //       console.error("🚨 Error fetching profile data:", err.response?.data || err);
  //       setError("Failed to load profile data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchProfileData();
  // }, [token, navigate]);

  // Use auth context user as fallback if API request is still loading
  const userData = user || authUser;

  // Get first letter of name for avatar
  const getInitial = () => {
    if (!userData?.username) return '?';
    return userData.username.charAt(0).toUpperCase();
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
          <div className="w-16 h-16 border-4 border-t-orange-500 border-b-orange-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
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
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
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
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg mb-8 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white text-orange-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
                {getInitial()}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData?.username || 'User'}</h1>
              <p className="text-orange-100 mt-1">{userData?.email || 'email@example.com'}</p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-orange-700 bg-opacity-40 px-3 py-1 rounded-full text-sm">Member since {formatDate(userData?.createdAt)}</span>
                <span className="bg-orange-700 bg-opacity-40 px-3 py-1 rounded-full text-sm">{bookings.length} Bookings</span>
              </div>
            </div>
            <div className="md:ml-auto flex-shrink-0 mt-4 md:mt-0">
              <button className="bg-white text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8 overflow-x-auto">
          <div className="flex border-b min-w-max">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'wishlist'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Wishlist
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'support'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Support
            </button>
          </div>
        </div>

        {/* Profile Information */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-500" />
                  Personal Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-800 font-medium">{userData?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-gray-800 font-medium">{userData?.email || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                      <p className="text-gray-800 font-medium">{formatDate(userData?.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                      <p className="text-gray-800 font-medium">
                        <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full">
                          {userData?.role || 'User'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 mt-8 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center">
                  <Package className="w-5 h-5 mr-2 text-orange-500" />
                  Booking Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-green-600 font-medium">Completed</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {bookings.filter(b => b.status === 'successful').length}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <h3 className="text-yellow-600 font-medium">Pending</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {bookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 transition-transform hover:scale-105">
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
              
              {bookings.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6 mt-8 transition-shadow hover:shadow-md">
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
                    Payment History
                  </h2>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={`payment-${booking._id}`} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-800">{booking.packageDetails?.name || "Package Booking"}</p>
                            <p className="text-sm text-gray-500">{formatDate(booking.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{((booking.amount || 0) / 100).toLocaleString()}</p>
                          <p className={`text-xs px-2 py-1 rounded-full 
                            ${booking.status === 'successful' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Unknown"}
                          </p>
                        </div>
                      </div>
                    ))}
                    {bookings.length > 3 && (
                      <button 
                        onClick={() => setActiveTab('bookings')}
                        className="w-full mt-2 text-orange-600 hover:text-orange-700 text-sm font-medium py-2"
                      >
                        View all payment history →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Activity
                </h2>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No booking activity yet</p>
                    <button className="mt-4 text-orange-600 hover:text-orange-700 font-medium">
                      Explore Packages
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={`activity-${booking._id}`} className="border-l-4 border-orange-500 pl-4 py-2 hover:bg-orange-50 transition-colors">
                        <p className="font-medium text-gray-800">{booking.packageDetails?.name || "Package Booking"}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(booking.createdAt || new Date())}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 mt-8 text-white">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 mr-2" />
                  <h2 className="text-xl font-semibold">Need Help?</h2>
                </div>
                <p className="mb-6">Our customer support team is here to assist you with your bookings.</p>
                <button 
                  onClick={() => setActiveTab('support')} 
                  className="w-full bg-white text-orange-600 font-medium py-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Contact Support
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 mt-8 border border-orange-100 transition-shadow hover:shadow-md">
                <h2 className="font-semibold mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                  Security Tips
                </h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Keep your account details confidential</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sign out when using shared devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Regularly update your password</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                <h2 className="text-xl font-semibold">All Bookings</h2>
              </div>
              <div className="flex items-center gap-2">
                <select className="text-sm border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Time</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>Last Year</option>
                </select>
                <select className="text-sm border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Status</option>
                  <option>Successful</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
            
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No Bookings Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  You haven't made any bookings yet. Explore our packages and start your adventure!
                </p>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
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
                      <tr key={booking._id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded bg-orange-100 flex items-center justify-center text-orange-600">
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
                          <div className="flex space-x-2">
                            <button className="text-orange-600 hover:text-orange-800 font-medium">View</button>
                            {booking.status === 'successful' && (
                              <button className="text-green-600 hover:text-green-800 font-medium">Invoice</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {bookings.length > 0 && (
              <div className="p-4 flex justify-between items-center border-t">
                <p className="text-sm text-gray-500">Showing {bookings.length} bookings</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded text-sm bg-gray-50 text-gray-500">Previous</button>
                  <button className="px-3 py-1 border rounded text-sm bg-orange-600 text-white">1</button>
                  <button className="px-3 py-1 border rounded text-sm bg-gray-50 text-gray-500">Next</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md">
            <div className="px-6 py-4 border-b flex items-center">
              <Bookmark className="w-5 h-5 mr-2 text-orange-500" />
              <h2 className="text-xl font-semibold">My Wishlist</h2>
            </div>
            
            <div className="text-center py-16">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Your Wishlist is Empty</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Save your favorite packages to your wishlist for easy access later.
              </p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                Explore Packages
              </button>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md">
            <div className="px-6 py-4 border-b flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-orange-500" />
              <h2 className="text-xl font-semibold">Customer Support</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                        <option>Select a topic</option>
                        <option>Booking Issue</option>
                        <option>Payment Problem</option>
                        <option>Account Question</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        rows="5" 
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Describe your issue in detail..."
                      ></textarea>
                    </div>
                    <button className="w-full py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                      Submit Request
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium mb-2">How do I cancel a booking?</h4>
                      <p className="text-sm text-gray-600">You can cancel a booking from your bookings tab. Cancellation policies vary depending on the package.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium mb-2">When will I receive my refund?</h4>
                      <p className="text-sm text-gray-600">Refunds typically process within 5-7 business days, depending on your payment method and bank.</p>
                    </div>
                 
                    <div className="border rounded-lg p-4 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium mb-2">How do I update my profile information?</h4>
                      <p className="text-sm text-gray-600">You can edit your profile by clicking the "Edit Profile" button at the top of your profile page.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium mb-2">How can I contact customer support?</h4>
                      <p className="text-sm text-gray-600">You can reach our support team through this form or email us at support@example.com.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-orange-50 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Need urgent assistance?</h4>
                      <p className="text-sm text-gray-600 mb-2">For immediate help, contact our customer support hotline.</p>
                      <p className="font-medium text-orange-600">+91 9541515012 </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;