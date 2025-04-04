// src/components/admin/PackageForm.jsx
import React, { useState, useEffect } from 'react';

const PackageForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    package: '',
    location: '',
    regularRate: '',
    agentRate: '',
    validUntil: '',
    discount: '',
    isNew: false,
    duration: '',
    itinerary: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.package.trim()) newErrors.package = 'Package name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.itinerary.trim()) newErrors.itinerary = 'Itinerary is required';
    
    if (!formData.regularRate) {
      newErrors.regularRate = 'Regular rate is required';
    } else if (isNaN(formData.regularRate) || Number(formData.regularRate) <= 0) {
      newErrors.regularRate = 'Regular rate must be a positive number';
    }
    
    if (!formData.agentRate) {
      newErrors.agentRate = 'Agent rate is required';
    } else if (isNaN(formData.agentRate) || Number(formData.agentRate) <= 0) {
      newErrors.agentRate = 'Agent rate must be a positive number';
    }
    
    if (!formData.discount) {
      newErrors.discount = 'Discount is required';
    } else if (isNaN(formData.discount) || Number(formData.discount) < 0 || Number(formData.discount) > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Convert numeric fields to numbers
      const processedData = {
        ...formData,
        regularRate: Number(formData.regularRate),
        agentRate: Number(formData.agentRate),
        discount: Number(formData.discount)
      };
      
      onSubmit(processedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">{isEditing ? 'Edit Package' : 'Add New Package'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.package ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter package name"
          />
          {errors.package && <p className="mt-1 text-sm text-red-600">{errors.package}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter location"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Regular Rate (₹)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="regularRate"
            value={formData.regularRate}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.regularRate ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter regular rate"
          />
          {errors.regularRate && <p className="mt-1 text-sm text-red-600">{errors.regularRate}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agent Rate (₹)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="agentRate"
            value={formData.agentRate}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.agentRate ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter agent rate"
          />
          {errors.agentRate && <p className="mt-1 text-sm text-red-600">{errors.agentRate}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valid Until
          </label>
          <input
            type="text"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 30 Apr 2025 or Ongoing"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (%)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.discount ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter discount percentage"
            min="0"
            max="100"
          />
          {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g., 3 Days / 2 Nights"
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>
        
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Mark as New Package
          </label>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Itinerary<span className="text-red-500">*</span>
        </label>
        <textarea
          name="itinerary"
          value={formData.itinerary}
          onChange={handleChange}
          rows="6"
          className={`w-full rounded-md border ${
            errors.itinerary ? 'border-red-500' : 'border-gray-300'
          } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter itinerary details (use line breaks for days)"
        ></textarea>
        {errors.itinerary && <p className="mt-1 text-sm text-red-600">{errors.itinerary}</p>}
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEditing ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  );
};

export default PackageForm;