import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PackagesList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://backend-1-7zwm.onrender.com/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <div>Loading packages...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900">Travel Packages</h2>
        <div className="mt-6 space-y-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-blue-600">{pkg.title}</h3>
              <p className="text-gray-600">{pkg.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Destination: {pkg.destination}</p>
                <p className="text-sm text-gray-500">Hotel: {pkg.hotel}</p>
                <p className="text-sm text-gray-500">Price: ${pkg.price}</p>
                <p className="text-sm text-gray-500">Duration: {pkg.duration} days</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesList;