import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Eye, X, Save, ChevronDown, ChevronUp } from 'lucide-react';

const DiscoverPackageCRUD = () => {
  // State management
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('list'); // list, create, edit, view
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    location: '',
    description: '',
    duration: '',
    originalPrice: 0,
    discountedPrice: 0,
    offerTitle: '',
    offerDescription: '',
    offerExpiry: null,
    highlights: [],
    inclusions: [],
    exclusions: [],
    itinerary: [],
    isActive: true
  });
  const [expandedSections, setExpandedSections] = useState({
    highlights: true,
    inclusions: true,
    exclusions: true,
    itinerary: true
  });
  const [tempField, setTempField] = useState('');
  const [tempItinerary, setTempItinerary] = useState({ day: 1, title: '', description: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // API URL - replace with your actual backend URL
  const API_URL = 'http://localhost:5000/api/packages';

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (result.success) {
        setPackages(result.data);
      } else {
        setError(result.error || 'Failed to fetch packages');
      }
    } catch (err) {
      setError('Server connection error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single package
  const fetchPackageById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setSelectedPackage(result.data);
        return result.data;
      } else {
        setError(result.error || 'Failed to fetch package details');
        return null;
      }
    } catch (err) {
      setError('Server connection error');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create package
  const createPackage = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification('Package created successfully!', 'success');
        resetForm();
        setActiveView('list');
        fetchPackages();
      } else {
        setError(result.error || 'Failed to create package');
        showNotification('Failed to create package', 'error');
      }
    } catch (err) {
      setError('Server connection error');
      showNotification('Server connection error', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update package
  const updatePackage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${selectedPackage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification('Package updated successfully!', 'success');
        resetForm();
        setActiveView('list');
        fetchPackages();
      } else {
        setError(result.error || 'Failed to update package');
        showNotification('Failed to update package', 'error');
      }
    } catch (err) {
      setError('Server connection error');
      showNotification('Server connection error', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete package
  const deletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification('Package deleted successfully!', 'success');
        fetchPackages();
      } else {
        setError(result.error || 'Failed to delete package');
        showNotification('Failed to delete package', 'error');
      }
    } catch (err) {
      setError('Server connection error');
      showNotification('Server connection error', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      shortName: '',
      location: '',
      description: '',
      duration: '',
      originalPrice: 0,
      discountedPrice: 0,
      offerTitle: '',
      offerDescription: '',
      offerExpiry: null,
      highlights: [],
      inclusions: [],
      exclusions: [],
      itinerary: [],
      isActive: true
    });
    setSelectedPackage(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeView === 'create') {
      createPackage();
    } else if (activeView === 'edit') {
      updatePackage();
    }
  };

  // View details
  const handleView = async (id) => {
    const packageData = await fetchPackageById(id);
    if (packageData) {
      setActiveView('view');
    }
  };

  // Setup edit mode
  const handleEdit = async (id) => {
    const packageData = await fetchPackageById(id);
    if (packageData) {
      setFormData({
        name: packageData.name || '',
        shortName: packageData.shortName || '',
        location: packageData.location || '',
        description: packageData.description || '',
        duration: packageData.duration || '',
        originalPrice: packageData.originalPrice || 0,
        discountedPrice: packageData.discountedPrice || 0,
        offerTitle: packageData.offerTitle || '',
        offerDescription: packageData.offerDescription || '',
        offerExpiry: packageData.offerExpiry ? new Date(packageData.offerExpiry).toISOString().split('T')[0] : null,
        highlights: packageData.highlights || [],
        inclusions: packageData.inclusions || [],
        exclusions: packageData.exclusions || [],
        itinerary: packageData.itinerary || [],
        isActive: packageData.isActive !== undefined ? packageData.isActive : true
      });
      setActiveView('edit');
    }
  };

  // Add item to array fields (highlights, inclusions, exclusions)
  const addItem = (field) => {
    if (!tempField.trim()) return;
    
    setFormData({
      ...formData,
      [field]: [...formData[field], tempField]
    });
    setTempField('');
  };

  // Remove item from array fields
  const removeItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  // Add itinerary item
  const addItineraryItem = () => {
    if (!tempItinerary.title.trim() || !tempItinerary.description.trim()) return;
    
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, {...tempItinerary}]
    });
    setTempItinerary({ day: formData.itinerary.length + 1, title: '', description: '' });
  };

  // Remove itinerary item
  const removeItineraryItem = (index) => {
    // Remove the item and reorder days
    const updatedItinerary = formData.itinerary
      .filter((_, i) => i !== index)
      .map((item, i) => ({...item, day: i + 1}));
    
    setFormData({
      ...formData,
      itinerary: updatedItinerary
    });
  };

  // Handle itinerary input change
  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setTempItinerary({
      ...tempItinerary,
      [name]: name === 'day' ? parseInt(value) : value
    });
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Format price with currency
  const formatPrice = (price) => {
    return price ? `$${price.toLocaleString()}` : 'N/A';
  };

  // Calculate savings
  const calculateSavings = (original, discounted) => {
    if (!original || !discounted || original <= discounted) return null;
    const savings = original - discounted;
    const percentage = Math.round((savings / original) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Discover Packages Management</h1>
        <p className="text-gray-600">Create and manage travel packages</p>
      </header>

      {/* Main Content */}
      <main>
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          {activeView !== 'list' ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => {
                resetForm();
                setActiveView('list');
              }}
            >
              <X size={16} /> Back to List
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                resetForm();
                setActiveView('create');
              }}
            >
              <PlusCircle size={16} /> Add New Package
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && !loading && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No packages found. Create your first package!
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => {
                    const savings = calculateSavings(pkg.originalPrice, pkg.discountedPrice);
                    
                    return (
                      <tr key={pkg._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                          <div className="text-sm text-gray-500">{pkg.shortName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pkg.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pkg.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {pkg.discountedPrice ? (
                            <div>
                              <span className="text-sm font-medium text-gray-900">{formatPrice(pkg.discountedPrice)}</span>
                              {savings && (
                                <div>
                                  <span className="text-xs text-gray-500 line-through mr-1">{formatPrice(pkg.originalPrice)}</span>
                                  <span className="text-xs text-green-600">Save {savings.percentage}%</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-900">{formatPrice(pkg.originalPrice)}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {pkg.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleView(pkg._id)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(pkg._id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit package"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => deletePackage(pkg._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete package"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Create/Edit Form */}
        {(activeView === 'create' || activeView === 'edit') && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              {activeView === 'create' ? 'Create New Package' : 'Edit Package'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Name
                  </label>
                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 7 days / 6 nights"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price *
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              
              {/* Offer Details */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Offer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Title
                    </label>
                    <input
                      type="text"
                      name="offerTitle"
                      value={formData.offerTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Expiry Date
                    </label>
                    <input
                      type="date"
                      name="offerExpiry"
                      value={formData.offerExpiry || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Description
                    </label>
                    <textarea
                      name="offerDescription"
                      value={formData.offerDescription}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Highlights Section */}
              <div className="mb-8 border border-gray-200 rounded-md p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleSection('highlights')}
                >
                  <h3 className="text-lg font-medium text-gray-800">Highlights</h3>
                  {expandedSections.highlights ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                
                {expandedSections.highlights && (
                  <div className="mt-4">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={tempField}
                        onChange={(e) => setTempField(e.target.value)}
                        placeholder="Add a highlight"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => addItem('highlights')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    <ul className="space-y-2">
                      {formData.highlights.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('highlights', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    {formData.highlights.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No highlights added yet</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Inclusions Section */}
              <div className="mb-8 border border-gray-200 rounded-md p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleSection('inclusions')}
                >
                  <h3 className="text-lg font-medium text-gray-800">Inclusions</h3>
                  {expandedSections.inclusions ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                
                {expandedSections.inclusions && (
                  <div className="mt-4">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={tempField}
                        onChange={(e) => setTempField(e.target.value)}
                        placeholder="Add an inclusion"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => addItem('inclusions')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    <ul className="space-y-2">
                      {formData.inclusions.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('inclusions', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    {formData.inclusions.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No inclusions added yet</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Exclusions Section */}
              <div className="mb-8 border border-gray-200 rounded-md p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleSection('exclusions')}
                >
                  <h3 className="text-lg font-medium text-gray-800">Exclusions</h3>
                  {expandedSections.exclusions ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                
                {expandedSections.exclusions && (
                  <div className="mt-4">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={tempField}
                        onChange={(e) => setTempField(e.target.value)}
                        placeholder="Add an exclusion"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => addItem('exclusions')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    <ul className="space-y-2">
                      {formData.exclusions.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeItem('exclusions', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    {formData.exclusions.length === 0 && (
                     <p className="text-sm text-gray-500 italic">No exclusions added yet</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Itinerary Section */}
              <div className="mb-8 border border-gray-200 rounded-md p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleSection('itinerary')}
                >
                  <h3 className="text-lg font-medium text-gray-800">Itinerary</h3>
                  {expandedSections.itinerary ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                
                {expandedSections.itinerary && (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                        <input
                          type="number"
                          name="day"
                          value={tempItinerary.day}
                          onChange={handleItineraryChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={tempItinerary.title}
                          onChange={handleItineraryChange}
                          placeholder="Day activity title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="description"
                            value={tempItinerary.description}
                            onChange={handleItineraryChange}
                            placeholder="Day activity details"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={addItineraryItem}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {formData.itinerary.map((item, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-3 rounded">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
                            {item.day}
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-md font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItineraryItem(index)}
                            className="text-red-500 hover:text-red-700 ml-3"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {formData.itinerary.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No itinerary items added yet</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Status */}
              <div className="mb-8">
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
                    Package is active and visible to users
                  </label>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveView('list');
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {activeView === 'create' ? 'Create Package' : 'Update Package'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* View Details */}
        {activeView === 'view' && selectedPackage && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with package image */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
              <h2 className="text-2xl font-bold">{selectedPackage.name}</h2>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center text-sm">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedPackage.location}
                </div>
                <div className="flex items-center text-sm">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedPackage.duration}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Package</h3>
                <p className="text-gray-600">{selectedPackage.description}</p>
              </div>
              
              {/* Pricing & Offer */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Pricing</h3>
                    {selectedPackage.discountedPrice ? (
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(selectedPackage.discountedPrice)}</span>
                        <span className="ml-2 line-through text-gray-500">{formatPrice(selectedPackage.originalPrice)}</span>
                        {selectedPackage.originalPrice > selectedPackage.discountedPrice && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                            Save {Math.round(((selectedPackage.originalPrice - selectedPackage.discountedPrice) / selectedPackage.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(selectedPackage.originalPrice)}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedPackage.offerTitle && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 md:mt-0 w-full md:w-auto">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">{selectedPackage.offerTitle}</h3>
                          {selectedPackage.offerDescription && (
                            <p className="text-sm text-yellow-700 mt-1">{selectedPackage.offerDescription}</p>
                          )}
                          {selectedPackage.offerExpiry && (
                            <p className="text-xs text-yellow-700 mt-1">Valid until: {formatDate(selectedPackage.offerExpiry)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Highlights */}
              {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPackage.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Itinerary */}
              {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Itinerary</h3>
                  <div className="space-y-6">
                    {selectedPackage.itinerary.sort((a, b) => a.day - b.day).map((day, index) => (
                      <div key={index} className="relative pl-8 md:pl-0">
                        <div className="md:flex">
                          <div className="md:flex-shrink-0 md:w-24">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold md:mx-auto">
                              {day.day}
                            </div>
                            {/* Connector line */}
                            {index < selectedPackage.itinerary.length - 1 && (
                              <div className="hidden md:block w-px h-full bg-blue-200 absolute top-10 bottom-0 left-5"></div>
                            )}
                          </div>
                          <div className="md:ml-4 mt-3 md:mt-0">
                            <h4 className="text-md font-medium text-gray-900">{day.title}</h4>
                            <p className="mt-1 text-sm text-gray-600">{day.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Inclusions */}
                {selectedPackage.inclusions && selectedPackage.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Inclusions</h3>
                    <ul className="space-y-2">
                      {selectedPackage.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Exclusions */}
                {selectedPackage.exclusions && selectedPackage.exclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Exclusions</h3>
                    <ul className="space-y-2">
                      {selectedPackage.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Package Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <span>Status: </span>
                    <span className={`font-medium ${selectedPackage.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                      {selectedPackage.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div>
                    <span>Created: </span>
                    <span className="font-medium">{formatDate(selectedPackage.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(selectedPackage._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit size={16} className="mr-2" /> Edit Package
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DiscoverPackageCRUD;