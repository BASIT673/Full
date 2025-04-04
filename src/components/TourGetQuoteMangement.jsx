import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

// Icons
import { 
  Search, 
  Trash2, 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  MessageSquare,
  AlertCircle,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw
} from 'lucide-react';

const TourQueriesManagementGetQuote = () => {
  // State
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Colors
  const colors = {
    primary: '#FF7A00', // Orange primary
    secondary: '#FFB37A', // Light orange
    darkPrimary: '#E56A00', // Dark orange for hover
    background: '#FFF9F2', // Very light orange background
    text: '#333333',
    lightText: '#666666',
    success: '#10B981', // Green
    error: '#EF4444', // Red
    warning: '#F59E0B', // Amber
    white: '#FFFFFF'
  };

  // Fetch queries
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tour-queries');
      setQueries(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch queries. Please try again.');
      console.error('Error fetching queries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchQueries();
  }, []);

  // Handle delete query
  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      try {
        await axios.delete(`http://localhost:5000/api/tour-queries/${id}`);
        setQueries(queries.filter(query => query._id !== id));
        setConfirmDelete(null);
        setSelectedQuery(null);
        showNotification('Query deleted successfully', 'success');
      } catch (err) {
        showNotification('Failed to delete query', 'error');
        console.error('Error deleting query:', err);
      }
    } else {
      setConfirmDelete(id);
      // Auto-reset after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, editForm);
      
      // Update the queries state
      const updatedQueries = queries.map(q => 
        q._id === selectedQuery._id ? response.data.data : q
      );
      
      setQueries(updatedQueries);
      setSelectedQuery(response.data.data);
      setIsEditing(false);
      showNotification('Query updated successfully', 'success');
    } catch (err) {
      showNotification('Failed to update query', 'error');
      console.error('Error updating query:', err);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort queries
  const sortedQueries = React.useMemo(() => {
    let sortableQueries = [...queries];
    if (sortConfig.key) {
      sortableQueries.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableQueries;
  }, [queries, sortConfig]);

  // Filter and search queries
  const filteredQueries = sortedQueries.filter(query => {
    const matchesSearch = 
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.phone?.includes(searchTerm);
    
    return matchesSearch;
  });

  // Pagination
  const indexOfLastQuery = currentPage * itemsPerPage;
  const indexOfFirstQuery = indexOfLastQuery - itemsPerPage;
  const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery);
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

  // Select query for details
  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setEditForm(query);
    setIsEditing(false);
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  // RENDER COMPONENTS
  
  // Notification component
  const Notification = () => (
    notification.show && (
      <div 
        className="fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center gap-2"
        style={{ 
          backgroundColor: notification.type === 'success' ? colors.success : colors.error,
          color: colors.white
        }}
      >
        {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
        <span>{notification.message}</span>
      </div>
    )
  );

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
        style={{ borderColor: colors.primary }}
      ></div>
    </div>
  );

  // Error message
  const ErrorMessage = () => (
    <div 
      className="rounded-md p-4 mt-4 text-center"
      style={{ backgroundColor: '#FEE2E2', color: colors.error }}
    >
      <AlertCircle className="mx-auto mb-2" size={24} />
      <p>{error}</p>
      <button 
        className="mt-3 px-4 py-2 rounded-md text-white"
        style={{ backgroundColor: colors.primary }}
        onClick={fetchQueries}
      >
        <RefreshCw size={16} className="inline mr-2" /> Try Again
      </button>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center p-8 rounded-md" style={{ backgroundColor: colors.background }}>
      <MessageSquare size={40} className="mx-auto mb-2" style={{ color: colors.primary }} />
      <h3 className="text-lg font-semibold mb-2">No Queries Found</h3>
      <p style={{ color: colors.lightText }}>
        {searchTerm ? 'No queries match your search criteria.' : 'No tour queries have been submitted yet.'}
      </p>
    </div>
  );

  // Query details panel
  const QueryDetailsPanel = () => (
    <div 
      className="bg-white rounded-md shadow-md p-6 h-full"
      style={{ borderLeft: `4px solid ${colors.primary}` }}
    >
      {!selectedQuery ? (
        <div className="h-full flex flex-col justify-center items-center text-center">
          <MessageSquare size={48} style={{ color: colors.secondary }} className="mb-3" />
          <h3 className="text-xl font-semibold mb-2">No Query Selected</h3>
          <p style={{ color: colors.lightText }}>Select a query from the list to view details</p>
        </div>
      ) : isEditing ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Edit Query</h3>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsEditing(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={editForm.name || ''} 
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                value={editForm.email || ''} 
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                Phone
              </label>
              <input 
                type="text" 
                name="phone" 
                value={editForm.phone || ''} 
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                  Travel Date
                </label>
                <input 
                  type="text" 
                  name="travelDate" 
                  value={editForm.travelDate || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                  Total Travelers
                </label>
                <input 
                  type="text" 
                  name="totalTravelers" 
                  value={editForm.totalTravelers || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
                Message
              </label>
              <textarea 
                name="message" 
                value={editForm.message || ''} 
                onChange={handleFormChange}
                rows={5}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Query Details</h3>
            <div className="flex gap-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsEditing(true)}
                title="Edit query"
              >
                <Edit size={18} style={{ color: colors.primary }} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => handleDelete(selectedQuery._id)}
                title="Delete query"
              >
                {confirmDelete === selectedQuery._id ? (
                  <Check size={18} style={{ color: colors.error }} />
                ) : (
                  <Trash2 size={18} style={{ color: colors.error }} />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.background }}
              >
                <MessageSquare size={20} style={{ color: colors.primary }} />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{selectedQuery.name || 'Anonymous'}</h4>
                <p className="text-sm" style={{ color: colors.lightText }}>
                  Submitted on {formatDate(selectedQuery.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: colors.primary }} />
                <a 
                  href={`mailto:${selectedQuery.email}`} 
                  className="hover:underline"
                  style={{ color: colors.primary }}
                >
                  {selectedQuery.email || 'No email provided'}
                </a>
              </div>
              
              {selectedQuery.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} style={{ color: colors.primary }} />
                  <a 
                    href={`tel:${selectedQuery.phone}`}
                    className="hover:underline"
                  >
                    {selectedQuery.phone}
                  </a>
                </div>
              )}
              
              {selectedQuery.travelDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} style={{ color: colors.primary }} />
                  <span>{selectedQuery.travelDate}</span>
                </div>
              )}
              
              {(selectedQuery.adults || selectedQuery.children || selectedQuery.infants || selectedQuery.totalTravelers) && (
                <div className="flex items-center gap-2">
                  <Users size={16} style={{ color: colors.primary }} />
                  <span>
                    {selectedQuery.totalTravelers ? (
                      `${selectedQuery.totalTravelers} travelers`
                    ) : (
                      <>
                        {selectedQuery.adults && `${selectedQuery.adults} adults`}
                        {selectedQuery.children && `, ${selectedQuery.children} children`}
                        {selectedQuery.infants && `, ${selectedQuery.infants} infants`}
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Message</h5>
              <div 
                className="p-4 rounded-md whitespace-pre-wrap"
                style={{ backgroundColor: colors.background }}
              >
                {selectedQuery.message || 'No message provided'}
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                className="w-full py-3 text-white font-medium rounded-md flex justify-center items-center gap-2"
                style={{ backgroundColor: colors.primary }}
                onClick={() => window.location.href = `mailto:${selectedQuery.email}`}
              >
                <Mail size={18} />
                Reply to Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{ backgroundColor: '#F8F9FA' }}
    >
      <Notification />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
          Tour Queries Management
        </h1>
        <p style={{ color: colors.lightText }}>
          Manage and respond to customer tour inquiries
        </p>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queries list */}
        <div className="lg:col-span-2 bg-white rounded-md shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border"
                style={{ borderColor: '#E5E7EB' }}
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                style={{ color: colors.lightText }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchQueries}
                className="p-2 rounded-md border flex items-center gap-1"
                title="Refresh queries"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Queries list */}
          <div className="overflow-x-auto">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage />
            ) : currentQueries.length === 0 ? (
              <EmptyState />
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
                      style={{ color: colors.lightText }}
                      onClick={() => requestSort('name')}
                    >
                      Name
                      {sortConfig.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
                      style={{ color: colors.lightText }}
                      onClick={() => requestSort('email')}
                    >
                      Email
                      {sortConfig.key === 'email' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
                      style={{ color: colors.lightText }}
                      onClick={() => requestSort('createdAt')}
                    >
                      Date
                      {sortConfig.key === 'createdAt' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider" style={{ color: colors.lightText }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentQueries.map((query) => (
                    <tr 
                      key={query._id} 
                      onClick={() => handleSelectQuery(query)}
                      className="hover:bg-gray-50 cursor-pointer"
                      style={
                        selectedQuery && selectedQuery._id === query._id 
                          ? { backgroundColor: colors.background } 
                          : {}
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{query.name || 'Anonymous'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>{query.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: colors.lightText }}>
                          {formatDate(query.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(true);
                              setSelectedQuery(query);
                              setEditForm(query);
                            }}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Edit query"
                          >
                            <Edit size={16} style={{ color: colors.primary }} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(query._id);
                            }}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Delete query"
                          >
                            {confirmDelete === query._id ? (
                              <Check size={16} style={{ color: colors.error }} />
                            ) : (
                              <Trash2 size={16} style={{ color: colors.error }} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          {!loading && !error && filteredQueries.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md text-sm"
                  style={{ 
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md text-sm text-white"
                  style={{ 
                    backgroundColor: colors.primary,
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm" style={{ color: colors.lightText }}>
                    Showing <span className="font-medium">{indexOfFirstQuery + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastQuery, filteredQueries.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredQueries.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"
                      style={{ 
                        opacity: currentPage === 1 ? 0.5 : 1,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        style={{ 
                          backgroundColor: currentPage === page ? colors.primary : 'white',
                          color: currentPage === page ? 'white' : undefined,
                          borderColor: 'rgb(229, 231, 235)'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"
                      style={{ 
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Query details panel */}
        <div className="lg:col-span-1">
          <QueryDetailsPanel />
        </div>
      </div>
    </div>
  );
};

export default TourQueriesManagementGetQuote;