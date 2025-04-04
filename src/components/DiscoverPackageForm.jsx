import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DiscoverPackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    location: '',
    description: '',
    duration: '',
    originalPrice: '',
    discountedPrice: '',
    offerTitle: '',
    offerDescription: '',
    offerExpiry: '',
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    // images: [''],
    isActive: true
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchPackageData();
    }
  }, [id]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/api/packages/${id}`);
      const packageData = response.data.data;
      
      // Format date for input field
      let formattedData = {...packageData};
      if (formattedData.offerExpiry) {
        const date = new Date(formattedData.offerExpiry);
        formattedData.offerExpiry = date.toISOString().split('T')[0];
      }
      
      // Ensure arrays have at least one entry for the form
      ['highlights', 'inclusions', 'exclusions', ].forEach(field => {
        if (!formattedData[field] || formattedData[field].length === 0) {
          formattedData[field] = [''];
        }
      });
      
      if (!formattedData.itinerary || formattedData.itinerary.length === 0) {
        formattedData.itinerary = [{ day: 1, title: '', description: '' }];
      }
      
      setFormData(formattedData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch package data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index] = {
      ...updatedItinerary[index],
      [field]: field === 'day' ? parseInt(value, 10) : value
    };
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const updatedArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: updatedArray });
    }
  };

  const addItineraryDay = () => {
    const newDay = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: newDay, title: '', description: '' }]
    });
  };

  const removeItineraryDay = (index) => {
    if (formData.itinerary.length > 1) {
      const updatedItinerary = formData.itinerary.filter((_, i) => i !== index);
      // Reindex days
      const reindexedItinerary = updatedItinerary.map((item, i) => ({
        ...item,
        day: i + 1
      }));
      setFormData({ ...formData, itinerary: reindexedItinerary });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format data for submission
    const submitData = {...formData};
    
    // Filter out empty entries from arrays
    ['highlights', 'inclusions', 'exclusions', ].forEach(field => {
      submitData[field] = submitData[field].filter(item => item.trim() !== '');
    });
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/api/packages/${id}`, submitData);
      } else {
        await axios.post('http://localhost:5000/api/api/packages', submitData);
      }
      
      setLoading(false);
      navigate('http://localhost:5000/api/packages');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} package`);
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit' : 'Create'} Travel Package</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Package Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 5 Days / 4 Nights"
                required
              />
            </div>
          </div>
          
          {/* Pricing & Status */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Original Price *</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>
            
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label className="ml-2 block text-gray-700">Package Active</label>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        
        {/* Offer Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Offer Details (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Offer Title</label>
              <input
                type="text"
                name="offerTitle"
                value={formData.offerTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Offer Expiry Date</label>
              <input
                type="date"
                name="offerExpiry"
                value={formData.offerExpiry}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Offer Description</label>
              <textarea
                name="offerDescription"
                value={formData.offerDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Highlights */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Highlights</h3>
          {formData.highlights.map((highlight, index) => (
            <div key={`highlight-${index}`} className="flex mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                className="flex-grow p-2 border rounded mr-2"
                placeholder="Add a highlight"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('highlights', index)}
                className="px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('highlights')}
            className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded hover:bg-blue-200"
          >
            + Add Highlight
          </button>
        </div>
        
        {/* Inclusions & Exclusions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Inclusions</h3>
            {formData.inclusions.map((item, index) => (
              <div key={`inclusion-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                  className="flex-grow p-2 border rounded mr-2"
                  placeholder="Add an inclusion"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('inclusions', index)}
                  className="px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('inclusions')}
              className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded hover:bg-blue-200"
            >
              + Add Inclusion
            </button>
          </div>
          
          {/* Exclusions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Exclusions</h3>
            {formData.exclusions.map((item, index) => (
              <div key={`exclusion-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                  className="flex-grow p-2 border rounded mr-2"
                  placeholder="Add an exclusion"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('exclusions', index)}
                  className="px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('exclusions')}
              className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded hover:bg-blue-200"
            >
              + Add Exclusion
            </button>
          </div>
        </div>
        
        {/* Itinerary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Itinerary</h3>
          {formData.itinerary.map((day, index) => (
            <div key={`day-${index}`} className="border-l-2 border-blue-500 pl-4 mb-4">
              <div className="flex items-center mb-2">
                <h4 className="font-semibold">Day {day.day}</h4>
                <button
                  type="button"
                  onClick={() => removeItineraryDay(index)}
                  className="ml-auto px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200"
                >
                  Remove Day
                </button>
              </div>
              
              <div className="mb-2">
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Day Title"
                />
              </div>
              
              <div>
                <textarea
                  value={day.description}
                  onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Day Description"
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded hover:bg-blue-200"
          >
            + Add Day
          </button>
        </div>
        
        {/* Images */}
        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Images</h3>
          <p className="text-sm text-gray-500 mb-2">Enter URLs for package images</p>
          {formData.images.map((url, index) => (
            <div key={`image-${index}`} className="flex mb-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleArrayChange('images', index, e.target.value)}
                className="flex-grow p-2 border rounded mr-2"
                placeholder="Image URL"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('images', index)}
                className="px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('images')}
            className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded hover:bg-blue-200"
          >
            + Add Image
          </button>
        </div> */}
        
        {/* Submit Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/packages')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Package' : 'Create Package')}
            </button>
        </div>
      </form>
    </div>
  );
}
export default  DiscoverPackageForm