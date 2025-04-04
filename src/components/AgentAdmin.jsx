// src/components/admin/PackageAdmin.jsx
import React, { useState, useEffect } from 'react';
import PackageList from './AgentRateList';
import PackageForm from './AgentRateForm';
import PackageService from './AgentRateService';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications

const AgentAdmin = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await PackageService.getAllPackages();
      setPackages(data);
    } catch (error) {
      toast.error('Failed to fetch packages');
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedPackage(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await PackageService.deletePackage(id);
        toast.success('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        toast.error('Failed to delete package');
        console.error('Error deleting package:', error);
      }
    }
  };

  const handleFormSubmit = async (packageData) => {
    try {
      if (isEditing) {
        await PackageService.updatePackage(selectedPackage._id, packageData);
        toast.success('Package updated successfully');
      } else {
        await PackageService.createPackage(packageData);
        toast.success('Package created successfully');
      }
      
      setShowForm(false);
      fetchPackages();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update package' : 'Failed to create package');
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Agent Packages Management</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Add New Package
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <PackageForm 
            initialData={isEditing ? selectedPackage : null} 
            onSubmit={handleFormSubmit} 
            onCancel={handleCancel}
            isEditing={isEditing}
          />
        </div>
      ) : (
        <PackageList 
          packages={packages} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          loading={loading} 
        />
      )}
    </div>
  );
};

export default AgentAdmin;