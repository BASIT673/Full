import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DiscoverPackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/packages');
      setPackages(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch packages');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`http://localhost:5000/api/packages/${id}`);
        setPackages(packages.filter(pkg => pkg._id !== id));
      } catch (err) {
        setError('Failed to delete package');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Travel Packages</h1>
        <Link to="/packages/new" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Add New Package
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="text-center p-8 text-gray-500">No packages found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="border rounded-lg overflow-hidden shadow-lg">
              {pkg.images && pkg.images.length > 0 ? (
                <img 
                  src={pkg.images[0]} 
                  alt={pkg.name} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                    <p className="text-gray-600 mb-1">{pkg.location}</p>
                    <p className="text-gray-600 mb-3">{pkg.duration}</p>
                  </div>
                  
                  <div className="text-right">
                    {pkg.discountedPrice ? (
                      <>
                        <p className="text-gray-500 line-through">${pkg.originalPrice}</p>
                        <p className="text-xl font-bold text-blue-600">${pkg.discountedPrice}</p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-blue-600">${pkg.originalPrice}</p>
                    )}
                  </div>
                </div>
                
                {pkg.offerTitle && (
                  <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-3 mt-2">
                    <p className="font-semibold">{pkg.offerTitle}</p>
                    {pkg.offerDescription && <p className="text-sm">{pkg.offerDescription}</p>}
                  </div>
                )}
                
                <div className="flex justify-between mt-4">
                  <Link to={`/packages/${pkg._id}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                  <div className="space-x-2">
                  <Link to={`/edit/${pkg._id}`} className="text-gray-500 hover:text-blue-500">
  Edit
</Link>
 
                   {/* <Link to={`http://localhost:5000/packages/edit/${pkg._id}`} className="text-gray-500 hover:text-blue-500">
  View Details
</Link> 

                    <Link to={`
      http://localhost:5000/packages/edit/${pkg._id}`} className="text-gray-500 hover:text-blue-500">
                      Edit
                    </Link>  */}
                    <button 
                      onClick={() => handleDelete(pkg._id)} 
                      className="text-gray-500 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DiscoverPackageList