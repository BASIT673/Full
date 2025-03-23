


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProfileAgent = () => {
//   const navigate = useNavigate();
//   const [agentData, setAgentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch('http://localhost:5000/api/api/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setAgentData(data);
//         } else {
//           // Optionally, you can get more info from response here
//           throw new Error('Failed to fetch profile');
//         }
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError(err.message || 'Failed to load profile data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Agent Profile</h2>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//       {agentData && (
//         <div className="space-y-4">
//           <div>
//             <h3 className="font-semibold text-gray-700">Company Name</h3>
//             <p>{agentData.companyName}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">GST Number</h3>
//             <p>{agentData.gstNumber}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">Work Email</h3>
//             <p>{agentData.workEmail}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">Address</h3>
//             <p>{agentData.address}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">Phone Number</h3>
//             <p>{agentData.phoneNumber}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">License Number</h3>
//             <p>{agentData.licenseNumber}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-700">Member Since</h3>
//             <p>{new Date(agentData.createdAt).toLocaleDateString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileAgent;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelPackageForm from './TravelPackage';
import PackagesList from './PackagesList';

const ProfileAgent = () => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAgentData(data);
          setEditedData(data);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Implement save functionality here
    setIsEditing(false);
    setAgentData(editedData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(agentData);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-red-800 text-xl font-semibold">Error</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-2xl shadow-md p-6 mb-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white font-bold">
                  {agentData?.companyName?.[0] || 'A'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{agentData?.companyName}</h1>
                <p className="text-gray-500">Travel Agent</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-md mb-1">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 focus:outline-none ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TravelPackageForm/>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 focus:outline-none ${
                activeTab === 'stats'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PackagesList/>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-md p-6">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Edit/Save Buttons */}
              <div className="flex justify-end space-x-4">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(agentData || {}).map(([key, value]) => (
                  key !== 'createdAt' && (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name={key}
                          value={editedData[key]}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800">{value}</p>
                      )}
                    </div>
                  )
                ))}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Member Since
                  </h3>
                  <p className="text-gray-800">
                    {new Date(agentData?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-blue-800 font-semibold mb-2">Total Bookings</h4>
                  <p className="text-3xl font-bold text-blue-600">247</p>
                  <p className="text-sm text-blue-500 mt-2">+12% from last month</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-green-800 font-semibold mb-2">Revenue</h4>
                  <p className="text-3xl font-bold text-green-600">$52,147</p>
                  <p className="text-sm text-green-500 mt-2">+8% from last month</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-purple-800 font-semibold mb-2">Client Rating</h4>
                  <p className="text-3xl font-bold text-purple-600">4.8/5</p>
                  <p className="text-sm text-purple-500 mt-2">Based on 180 reviews</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAgent;
