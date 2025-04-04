import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DiscoverPackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        setLoading(true);
        const response =
         await axios.get(`http://localhost:5000/api/packages/${id}`);
         
      console.log('Package Datails:', response.data)
        setPackageData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch package details');
        setLoading(false);
      }
    };

    fetchPackageDetail();
  }, [id]);

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  
  if (!packageData) return <div className="text-center p-4">Package not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link to="/packages" className="text-blue-500 hover:underline mr-4">
          &larr; Back to Packages
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{packageData.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        {packageData.images && packageData.images.length > 0 ? (
          <div className="w-full h-96 bg-gray-100">
            <img 
              src={packageData.images[0]} 
              alt={packageData.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No images available</span>
          </div>
        )}

        {/* Package Details */}
        <div className="p-6">
          <div className="flex flex-wrap justify-between mb-6">
            <div className="w-full md:w-2/3 pr-4">
              <h2 className="text-xl font-semibold mb-2">{packageData.name}</h2>
              <p className="text-gray-600 mb-1">{packageData.location}</p>
              <p className="text-gray-600 mb-4">{packageData.duration}</p>
              <p className="text-gray-700">{packageData.description}</p>
            </div>
            
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-1">Price:</p>
                {packageData.discountedPrice ? (
                  <>
                    <p className="text-gray-500 line-through">${packageData.originalPrice}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-2">${packageData.discountedPrice}</p>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-blue-600 mb-2">${packageData.originalPrice}</p>
                )}
                
                {packageData.offerTitle && (
                  <div className="bg-yellow-100 text-yellow-800 p-3 rounded mt-3">
                    <p className="font-semibold">{packageData.offerTitle}</p>
                    {packageData.offerDescription && <p className="text-sm mt-1">{packageData.offerDescription}</p>}
                    {packageData.offerExpiry && (
                      <p className="text-xs mt-2">
                        Offer valid until: {new Date(packageData.offerExpiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Highlights */}
          {packageData.highlights && packageData.highlights.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {packageData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          {packageData.itinerary && packageData.itinerary.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Itinerary</h3>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold">Day {day.day}: {day.title}</h4>
                    <p className="text-gray-700 mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {packageData.inclusions && packageData.inclusions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Inclusions</h3>
                <ul className="space-y-2">
                  {packageData.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {packageData.exclusions && packageData.exclusions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Exclusions</h3>
                <ul className="space-y-2">
                  {packageData.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Edit/Delete Options */}
          <div className="mt-10 pt-6 border-t flex justify-end space-x-4">
            <Link 
              to={`/packages/edit/${packageData._id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Edit Package
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiscoverPackageDetails