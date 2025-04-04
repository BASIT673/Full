import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PromoCodeManager = () => {
  // State for all promo codes
  const [promos, setPromos] = useState([]);
  // State for the form (both create and update)
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount: 0,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    minPackagePrice: 0,
    maxDiscount: 0,
    isActive: true
  });
  // State for error and success messages
  const [message, setMessage] = useState({ type: '', text: '' });
  // State for tracking edit mode
  const [editMode, setEditMode] = useState(false);
  // State for tracking currently editing promo ID
  const [currentPromoId, setCurrentPromoId] = useState(null);
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  // State for confirmation modal
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all promo codes on component mount
  useEffect(() => {
    fetchPromos();
  }, []);

  // Function to fetch all promo codes
  const fetchPromos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/promos');
      if (response.data.success) {
        setPromos(response.data.data);
        console.log(response)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch promo codes' });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission for creating/updating promo codes
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editMode) {
        // Update existing promo
        response = await axios.put(`http://localhost:5000/api/promos/${currentPromoId}`, formData);
      } else {
        // Create new promo
        response = await axios.post('http://localhost:5000/api/promos', formData);
      }
      
      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: editMode ? 'Promo code updated successfully!' : 'Promo code created successfully!' 
        });
        // Reset form and state
        resetForm();
        // Refresh promo list
        fetchPromos();
        // Close modal if open
        setShowModal(false);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'An error occurred while saving the promo code' 
      });
    }
  };

  // Function to handle edit button click
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/promos/${id}`);
      if (response.data.success) {
        const promo = response.data.data;
        // Format dates for form inputs
        promo.validFrom = promo.validFrom ? new Date(promo.validFrom).toISOString().split('T')[0] : '';
        promo.validUntil = promo.validUntil ? new Date(promo.validUntil).toISOString().split('T')[0] : '';
        
        setFormData(promo);
        setEditMode(true);
        setCurrentPromoId(id);
        setShowModal(true);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load promo details' });
    }
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  // Function to handle actual deletion
  const handleDelete = async () => {
    if (!confirmDelete) return;
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/promos/${confirmDelete}`);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Promo code deleted successfully!' });
        // Refresh promo list
        fetchPromos();
        // Reset confirmation
        setConfirmDelete(null);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to delete the promo code' 
      });
    }
  };

  // Function to reset form and state
  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount: 0,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      minPackagePrice: 0,
      maxDiscount: 0,
      isActive: true
    });
    setEditMode(false);
    setCurrentPromoId(null);
  };

  // Function to open modal for new promo
  const openNewPromoModal = () => {
    resetForm();
    setShowModal(true);
  };

  // Handle validation message clearing
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Promo Code Management</h1>
      
      {/* Alert Messages */}
      {message.text && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      {/* Add New Button */}
      <div className="mb-6">
        <button 
          onClick={openNewPromoModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Add New Promo Code
        </button>
      </div>
      
      {/* Promo Codes Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {promos.length > 0 ? (
              promos.map((promo) => (
                <tr key={promo._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{promo.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.discount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {promo.validUntil ? new Date(promo.validUntil).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {promo.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(promo._id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteConfirm(promo._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No promo codes found. Create your first promo code!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editMode ? 'Edit Promo Code' : 'Create New Promo Code'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="SUMMER2025"
                  />
                </div>
                
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700 mb-1">
                    Valid From
                  </label>
                  <input
                    type="date"
                    id="validFrom"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    id="validUntil"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="minPackagePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Package Price
                  </label>
                  <input
                    type="number"
                    id="minPackagePrice"
                    name="minPackagePrice"
                    value={formData.minPackagePrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Discount Amount
                  </label>
                  <input
                    type="number"
                    id="maxDiscount"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Special discount for summer season"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editMode ? 'Update Promo' : 'Create Promo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this promo code? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeManager;