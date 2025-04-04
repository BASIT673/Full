// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';

// // Icons
// import { 
//   Search, 
//   Trash2, 
//   Edit, 
//   Mail, 
//   Phone, 
//   Calendar, 
//   Users, 
//   MessageSquare,
//   AlertCircle,
//   Check,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   RefreshCw
// } from 'lucide-react';

// const TourQueriesManagement = () => {
//   // State
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});

//   // Colors
//   const colors = {
//     primary: '#FF7A00', // Orange primary
//     secondary: '#FFB37A', // Light orange
//     darkPrimary: '#E56A00', // Dark orange for hover
//     background: '#FFF9F2', // Very light orange background
//     text: '#333333',
//     lightText: '#666666',
//     success: '#10B981', // Green
//     error: '#EF4444', // Red
//     warning: '#F59E0B', // Amber
//     white: '#FFFFFF'
//   };

//   // Fetch queries
//   const fetchQueries = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/tour-queries');
//       setQueries(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch queries. Please try again.');
//       console.error('Error fetching queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   // Handle delete query
//   const handleDelete = async (id) => {
//     if (confirmDelete === id) {
//       try {
//         await axios.delete(`http://localhost:5000/api/tour-queries/${id}`);
//         setQueries(queries.filter(query => query._id !== id));
//         setConfirmDelete(null);
//         setSelectedQuery(null);
//         showNotification('Query deleted successfully', 'success');
//       } catch (err) {
//         showNotification('Failed to delete query', 'error');
//         console.error('Error deleting query:', err);
//       }
//     } else {
//       setConfirmDelete(id);
//       // Auto-reset after 3 seconds
//       setTimeout(() => setConfirmDelete(null), 3000);
//     }
//   };

//   // Handle edit submit
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, editForm);
      
//       // Update the queries state
//       const updatedQueries = queries.map(q => 
//         q._id === selectedQuery._id ? response.data.data : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQuery(response.data.data);
//       setIsEditing(false);
//       showNotification('Query updated successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to update query', 'error');
//       console.error('Error updating query:', err);
//     }
//   };

//   // Show notification
//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
//   };

//   // Handle sort
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Sort queries
//   const sortedQueries = React.useMemo(() => {
//     let sortableQueries = [...queries];
//     if (sortConfig.key) {
//       sortableQueries.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableQueries;
//   }, [queries, sortConfig]);

//   // Filter and search queries
//   const filteredQueries = sortedQueries.filter(query => {
//     const matchesSearch = 
//       query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       query.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       query.phone?.includes(searchTerm);
    
//     return matchesSearch;
//   });

//   // Pagination
//   const indexOfLastQuery = currentPage * itemsPerPage;
//   const indexOfFirstQuery = indexOfLastQuery - itemsPerPage;
//   const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery);
//   const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

//   // Select query for details
//   const handleSelectQuery = (query) => {
//     setSelectedQuery(query);
//     setEditForm(query);
//     setIsEditing(false);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     try {
//       return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   // Handle form input change
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({
//       ...editForm,
//       [name]: value
//     });
//   };

//   // RENDER COMPONENTS
  
//   // Notification component
//   const Notification = () => (
//     notification.show && (
//       <div 
//         className="fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center gap-2"
//         style={{ 
//           backgroundColor: notification.type === 'success' ? colors.success : colors.error,
//           color: colors.white
//         }}
//       >
//         {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
//         <span>{notification.message}</span>
//       </div>
//     )
//   );

//   // Loading spinner
//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center h-64">
//       <div 
//         className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
//         style={{ borderColor: colors.primary }}
//       ></div>
//     </div>
//   );

//   // Error message
//   const ErrorMessage = () => (
//     <div 
//       className="rounded-md p-4 mt-4 text-center"
//       style={{ backgroundColor: '#FEE2E2', color: colors.error }}
//     >
//       <AlertCircle className="mx-auto mb-2" size={24} />
//       <p>{error}</p>
//       <button 
//         className="mt-3 px-4 py-2 rounded-md text-white"
//         style={{ backgroundColor: colors.primary }}
//         onClick={fetchQueries}
//       >
//         <RefreshCw size={16} className="inline mr-2" /> Try Again
//       </button>
//     </div>
//   );

//   // Empty state
//   const EmptyState = () => (
//     <div className="text-center p-8 rounded-md" style={{ backgroundColor: colors.background }}>
//       <MessageSquare size={40} className="mx-auto mb-2" style={{ color: colors.primary }} />
//       <h3 className="text-lg font-semibold mb-2">No Queries Found</h3>
//       <p style={{ color: colors.lightText }}>
//         {searchTerm ? 'No queries match your search criteria.' : 'No tour queries have been submitted yet.'}
//       </p>
//     </div>
//   );

//   // Query details panel
//   const QueryDetailsPanel = () => (
//     <div 
//       className="bg-white rounded-md shadow-md p-6 h-full"
//       style={{ borderLeft: `4px solid ${colors.primary}` }}
//     >
//       {!selectedQuery ? (
//         <div className="h-full flex flex-col justify-center items-center text-center">
//           <MessageSquare size={48} style={{ color: colors.secondary }} className="mb-3" />
//           <h3 className="text-xl font-semibold mb-2">No Query Selected</h3>
//           <p style={{ color: colors.lightText }}>Select a query from the list to view details</p>
//         </div>
//       ) : isEditing ? (
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold">Edit Query</h3>
//             <button 
//               className="p-2 rounded-full hover:bg-gray-100"
//               onClick={() => setIsEditing(false)}
//             >
//               <X size={20} />
//             </button>
//           </div>
          
//           <form onSubmit={handleEditSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                 Name
//               </label>
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={editForm.name || ''} 
//                 onChange={handleFormChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                 Email
//               </label>
//               <input 
//                 type="email" 
//                 name="email" 
//                 value={editForm.email || ''} 
//                 onChange={handleFormChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                 Phone
//               </label>
//               <input 
//                 type="text" 
//                 name="phone" 
//                 value={editForm.phone || ''} 
//                 onChange={handleFormChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                   Travel Date
//                 </label>
//                 <input 
//                   type="text" 
//                   name="travelDate" 
//                   value={editForm.travelDate || ''} 
//                   onChange={handleFormChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                   Total Travelers
//                 </label>
//                 <input 
//                   type="text" 
//                   name="totalTravelers" 
//                   value={editForm.totalTravelers || ''} 
//                   onChange={handleFormChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                 Message
//               </label>
//               <textarea 
//                 name="message" 
//                 value={editForm.message || ''} 
//                 onChange={handleFormChange}
//                 rows={5}
//                 className="w-full p-2 border rounded-md"
//               ></textarea>
//             </div>
            
//             <div className="flex justify-end gap-2 pt-2">
//               <button 
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="px-4 py-2 rounded-md border"
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="submit"
//                 className="px-4 py-2 rounded-md text-white"
//                 style={{ backgroundColor: colors.primary }}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold">Query Details</h3>
//             <div className="flex gap-2">
//               <button 
//                 className="p-2 rounded-full hover:bg-gray-100"
//                 onClick={() => setIsEditing(true)}
//                 title="Edit query"
//               >
//                 <Edit size={18} style={{ color: colors.primary }} />
//               </button>
//               <button 
//                 className="p-2 rounded-full hover:bg-gray-100"
//                 onClick={() => handleDelete(selectedQuery._id)}
//                 title="Delete query"
//               >
//                 {confirmDelete === selectedQuery._id ? (
//                   <Check size={18} style={{ color: colors.error }} />
//                 ) : (
//                   <Trash2 size={18} style={{ color: colors.error }} />
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <div className="space-y-6">
//             <div className="flex items-start gap-4">
//               <div 
//                 className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: colors.background }}
//               >
//                 <MessageSquare size={20} style={{ color: colors.primary }} />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-lg">{selectedQuery.name || 'Anonymous'}</h4>
//                 <p className="text-sm" style={{ color: colors.lightText }}>
//                   Submitted on {formatDate(selectedQuery.createdAt)}
//                 </p>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Mail size={16} style={{ color: colors.primary }} />
//                 <a 
//                   href={`mailto:${selectedQuery.email}`} 
//                   className="hover:underline"
//                   style={{ color: colors.primary }}
//                 >
//                   {selectedQuery.email || 'No email provided'}
//                 </a>
//               </div>
              
//               {selectedQuery.phone && (
//                 <div className="flex items-center gap-2">
//                   <Phone size={16} style={{ color: colors.primary }} />
//                   <a 
//                     href={`tel:${selectedQuery.phone}`}
//                     className="hover:underline"
//                   >
//                     {selectedQuery.phone}
//                   </a>
//                 </div>
//               )}
              
//               {selectedQuery.travelDate && (
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} style={{ color: colors.primary }} />
//                   <span>{selectedQuery.travelDate}</span>
//                 </div>
//               )}
              
//               {(selectedQuery.adults || selectedQuery.children || selectedQuery.infants || selectedQuery.totalTravelers) && (
//                 <div className="flex items-center gap-2">
//                   <Users size={16} style={{ color: colors.primary }} />
//                   <span>
//                     {selectedQuery.totalTravelers ? (
//                       `${selectedQuery.totalTravelers} travelers`
//                     ) : (
//                       <>
//                         {selectedQuery.adults && `${selectedQuery.adults} adults`}
//                         {selectedQuery.children && `, ${selectedQuery.children} children`}
//                         {selectedQuery.infants && `, ${selectedQuery.infants} infants`}
//                       </>
//                     )}
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             <div>
//               <h5 className="font-medium mb-2">Message</h5>
//               <div 
//                 className="p-4 rounded-md whitespace-pre-wrap"
//                 style={{ backgroundColor: colors.background }}
//               >
//                 {selectedQuery.message || 'No message provided'}
//               </div>
//             </div>
            
//             <div className="pt-4">
//               <button 
//                 className="w-full py-3 text-white font-medium rounded-md flex justify-center items-center gap-2"
//                 style={{ backgroundColor: colors.primary }}
//                 onClick={() => window.location.href = `mailto:${selectedQuery.email}`}
//               >
//                 <Mail size={18} />
//                 Reply to Query
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div 
//       className="min-h-screen p-4 md:p-6"
//       style={{ backgroundColor: '#F8F9FA' }}
//     >
//       <Notification />
      
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
//           Tour Queries Management
//         </h1>
//         <p style={{ color: colors.lightText }}>
//           Manage and respond to customer tour inquiries
//         </p>
//       </div>
      
//       {/* Main content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Queries list */}
//         <div className="lg:col-span-2 bg-white rounded-md shadow-sm overflow-hidden">
//           {/* Toolbar */}
//           <div className="p-4 border-b flex flex-col sm:flex-row gap-3 justify-between">
//             <div className="relative w-full sm:max-w-xs">
//               <input
//                 type="text"
//                 placeholder="Search queries..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-md border"
//                 style={{ borderColor: '#E5E7EB' }}
//               />
//               <Search 
//                 size={18} 
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2" 
//                 style={{ color: colors.lightText }}
//               />
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={fetchQueries}
//                 className="p-2 rounded-md border flex items-center gap-1"
//                 title="Refresh queries"
//               >
//                 <RefreshCw size={16} />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//             </div>
//           </div>
          
//           {/* Queries list */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <LoadingSpinner />
//             ) : error ? (
//               <ErrorMessage />
//             ) : currentQueries.length === 0 ? (
//               <EmptyState />
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
//                       style={{ color: colors.lightText }}
//                       onClick={() => requestSort('name')}
//                     >
//                       Name
//                       {sortConfig.key === 'name' && (
//                         <span className="ml-1">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
//                       style={{ color: colors.lightText }}
//                       onClick={() => requestSort('email')}
//                     >
//                       Email
//                       {sortConfig.key === 'email' && (
//                         <span className="ml-1">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium tracking-wider cursor-pointer"
//                       style={{ color: colors.lightText }}
//                       onClick={() => requestSort('createdAt')}
//                     >
//                       Date
//                       {sortConfig.key === 'createdAt' && (
//                         <span className="ml-1">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium tracking-wider" style={{ color: colors.lightText }}>
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentQueries.map((query) => (
//                     <tr 
//                       key={query._id} 
//                       onClick={() => handleSelectQuery(query)}
//                       className="hover:bg-gray-50 cursor-pointer"
//                       style={
//                         selectedQuery && selectedQuery._id === query._id 
//                           ? { backgroundColor: colors.background } 
//                           : {}
//                       }
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{query.name || 'Anonymous'}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>{query.email || 'N/A'}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm" style={{ color: colors.lightText }}>
//                           {formatDate(query.createdAt)}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right">
//                         <div className="flex justify-end gap-2">
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setIsEditing(true);
//                               setSelectedQuery(query);
//                               setEditForm(query);
//                             }}
//                             className="p-1 rounded-full hover:bg-gray-100"
//                             title="Edit query"
//                           >
//                             <Edit size={16} style={{ color: colors.primary }} />
//                           </button>
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(query._id);
//                             }}
//                             className="p-1 rounded-full hover:bg-gray-100"
//                             title="Delete query"
//                           >
//                             {confirmDelete === query._id ? (
//                               <Check size={16} style={{ color: colors.error }} />
//                             ) : (
//                               <Trash2 size={16} style={{ color: colors.error }} />
//                             )}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
          
//           {/* Pagination */}
//           {!loading && !error && filteredQueries.length > 0 && (
//             <div className="px-4 py-3 flex items-center justify-between border-t">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 border rounded-md text-sm"
//                   style={{ 
//                     opacity: currentPage === 1 ? 0.5 : 1,
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 border rounded-md text-sm text-white"
//                   style={{ 
//                     backgroundColor: colors.primary,
//                     opacity: currentPage === totalPages ? 0.5 : 1,
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm" style={{ color: colors.lightText }}>
//                     Showing <span className="font-medium">{indexOfFirstQuery + 1}</span> to{' '}
//                     <span className="font-medium">
//                       {Math.min(indexOfLastQuery, filteredQueries.length)}
//                     </span>{' '}
//                     of <span className="font-medium">{filteredQueries.length}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"
//                       style={{ 
//                         opacity: currentPage === 1 ? 0.5 : 1,
//                         cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
//                       }}
//                     >
//                       <ChevronLeft size={18} />
//                     </button>
                    
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                         style={{ 
//                           backgroundColor: currentPage === page ? colors.primary : 'white',
//                           color: currentPage === page ? 'white' : undefined,
//                           borderColor: 'rgb(229, 231, 235)'
//                         }}
//                       >
//                         {page}
//                       </button>
//                     ))}
                    
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"
//                       style={{ 
//                         opacity: currentPage === totalPages ? 0.5 : 1,
//                         cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
//                       }}
//                     >
//                       <ChevronRight size={18} />
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Query details panel */}
//         <div className="lg:col-span-1">
//           <QueryDetailsPanel />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourQueriesManagement;




// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';

// // Icons
// import { 
//     InboxIcon,
//   Search, 
//   Trash2, 
//   Edit, 
//   Mail, 
//   Phone, 
//   Calendar, 
//   Users, 
//   MessageSquare,
//   AlertCircle,
//   Check,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   RefreshCw,
//   Download,
//   FileText,
//   Star,
//   Clock,
//   ArrowUpDown,
//   Eye,
//   MoreHorizontal,
//   Bell,
//   Send,
//   CheckCircle,
//   XCircle,
//   Tag,
//   Info,
//   CheckSquare
// } from 'lucide-react';

// const TourQueriesManagement = () => {
//   // State
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
//   const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [priorityFilter, setPriorityFilter] = useState('all');
//   const [showBulkActions, setShowBulkActions] = useState(false);
//   const [selectedQueries, setSelectedQueries] = useState([]);
//   const [isAddingNote, setIsAddingNote] = useState(false);
//   const [newNote, setNewNote] = useState('');
//   const [showStats, setShowStats] = useState(true);
//   const [isSendingEmail, setIsSendingEmail] = useState(false);
//   const [emailForm, setEmailForm] = useState({ subject: '', message: '' });
//   const [exportFormat, setExportFormat] = useState('csv');
//   const [showExportOptions, setShowExportOptions] = useState(false);
//   const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'kanban'

//   // Theme colors - Professional elegant theme
//   const colors = {
//     primary: '#2563EB', // Deep blue primary
//     secondary: '#DBEAFE', // Light blue
//     darkPrimary: '#1E40AF', // Dark blue for hover
//     background: '#F8FAFC', // Very light blue-gray background
//     text: '#1E293B',
//     lightText: '#64748B',
//     success: '#10B981', // Green
//     error: '#EF4444', // Red
//     warning: '#F59E0B', // Amber
//     white: '#FFFFFF',
//     border: '#E2E8F0',
//     highlight: '#EFF6FF',
//     priorityHigh: '#FEE2E2',
//     priorityMedium: '#FEF3C7',
//     priorityLow: '#ECFDF5',
//     gray: '#F1F5F9'
//   };

//   // Priority options
//   const priorityOptions = ['High', 'Medium', 'Low'];
  
//   // Status options
//   const statusOptions = ['New', 'In Progress', 'Responded', 'Completed', 'Archived'];

//   // Fetch queries
//   const fetchQueries = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/tour-queries');
      
//       // Transform data to add priority and status if they don't exist
//       const transformedData = response.data.data.map(query => ({
//         ...query,
//         priority: query.priority || 'Medium',
//         status: query.status || 'New',
//         notes: query.notes || [],
//         assignedTo: query.assignedTo || null,
//         lastUpdated: query.updatedAt || query.createdAt
//       }));
      
//       setQueries(transformedData);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch queries. Please try again.');
//       console.error('Error fetching queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchQueries();
//   }, []);

//   // Handle delete query
//   const handleDelete = async (id) => {
//     if (confirmDelete === id) {
//       try {
//         await axios.delete(`/api/tour-queries/${id}`);
//         setQueries(queries.filter(query => query._id !== id));
//         setConfirmDelete(null);
//         setSelectedQuery(null);
//         showNotification('Query deleted successfully', 'success');
//       } catch (err) {
//         showNotification('Failed to delete query', 'error');
//         console.error('Error deleting query:', err);
//       }
//     } else {
//       setConfirmDelete(id);
//       // Auto-reset after 3 seconds
//       setTimeout(() => setConfirmDelete(null), 3000);
//     }
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(selectedQueries.map(id => axios.delete(`/api/tour-queries/${id}`)));
//       setQueries(queries.filter(query => !selectedQueries.includes(query._id)));
//       setSelectedQueries([]);
//       setShowBulkActions(false);
//       showNotification(`Successfully deleted ${selectedQueries.length} queries`, 'success');
//     } catch (err) {
//       showNotification('Failed to delete some queries', 'error');
//       console.error('Error bulk deleting queries:', err);
//     }
//   };
//   const BulkActions = () => (
//     selectedQueries.length > 0 && (
//       <div className="bulk-actions-bar">
//         <span>{selectedQueries.length} selected</span>
//         <button onClick={handleBulkDelete}>Delete</button>
//         <select onChange={(e) => handleBulkStatusChange(e.target.value)}>
//           {statusOptions.map(status => (
//             <option key={status} value={status}>{status}</option>
//           ))}
//         </select>
//       </div>
//     )
//   );
//   // Handle edit submit
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`/api/tour-queries/${selectedQuery._id}`, editForm);
      
//       // Update the queries state
//       const updatedQueries = queries.map(q => 
//         q._id === selectedQuery._id ? response.data.data : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQuery(response.data.data);
//       setIsEditing(false);
//       showNotification('Query updated successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to update query', 'error');
//       console.error('Error updating query:', err);
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await axios.patch(`/api/tour-queries/${id}`, { status });
//       const updatedQueries = queries.map(q => 
//         q._id === id ? { ...q, status } : q
//       );
//       setQueries(updatedQueries);
      
//       if (selectedQuery && selectedQuery._id === id) {
//         setSelectedQuery({ ...selectedQuery, status });
//       }
      
//       showNotification(`Status updated to "${status}"`, 'success');
//     } catch (err) {
//       showNotification('Failed to update status', 'error');
//       console.error('Error updating status:', err);
//     }
//   };

//   // Handle priority change
//   const handlePriorityChange = async (id, priority) => {
//     try {
//       const response = await axios.patch(`/api/tour-queries/${id}`, { priority });
//       const updatedQueries = queries.map(q => 
//         q._id === id ? { ...q, priority } : q
//       );
//       setQueries(updatedQueries);
      
//       if (selectedQuery && selectedQuery._id === id) {
//         setSelectedQuery({ ...selectedQuery, priority });
//       }
      
//       showNotification(`Priority set to "${priority}"`, 'success');
//     } catch (err) {
//       showNotification('Failed to update priority', 'error');
//       console.error('Error updating priority:', err);
//     }
//   };

//   // Handle bulk status change
//   const handleBulkStatusChange = async (status) => {
//     try {
//       await Promise.all(selectedQueries.map(id => 
//         axios.patch(`/api/tour-queries/${id}`, { status })
//       ));
      
//       const updatedQueries = queries.map(q => 
//         selectedQueries.includes(q._id) ? { ...q, status } : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQueries([]);
//       setShowBulkActions(false);
//       showNotification(`Status updated for ${selectedQueries.length} queries`, 'success');
//     } catch (err) {
//       showNotification('Failed to update status for some queries', 'error');
//       console.error('Error bulk updating status:', err);
//     }
//   };

//   // Add note to query
//   const handleAddNote = async () => {
//     if (!newNote.trim()) return;
    
//     try {
//       const note = {
//         text: newNote,
//         createdAt: new Date().toISOString(),
//         createdBy: 'Admin' // In a real app, get the current user
//       };
      
//       const updatedNotes = [...(selectedQuery.notes || []), note];
      
//       const response = await axios.patch(`/api/tour-queries/${selectedQuery._id}`, {
//         notes: updatedNotes
//       });
      
//       const updatedQueries = queries.map(q => 
//         q._id === selectedQuery._id ? { ...q, notes: updatedNotes } : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQuery({ ...selectedQuery, notes: updatedNotes });
//       setNewNote('');
//       setIsAddingNote(false);
//       showNotification('Note added successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to add note', 'error');
//       console.error('Error adding note:', err);
//     }
//   };

//   // Send email response
//   const handleSendEmail = async (e) => {
//     e.preventDefault();
    
//     try {
//       // In a real app, this would connect to your email service
//       await axios.post('/api/send-email', {
//         to: selectedQuery.email,
//         subject: emailForm.subject,
//         message: emailForm.message,
//         queryId: selectedQuery._id
//       });
      
//       // Update query status to "Responded"
//       const updatedQuery = { ...selectedQuery, status: 'Responded' };
      
//       await axios.patch(`/api/tour-queries/${selectedQuery._id}`, {
//         status: 'Responded'
//       });
      
//       const updatedQueries = queries.map(q => 
//         q._id === selectedQuery._id ? updatedQuery : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQuery(updatedQuery);
//       setIsSendingEmail(false);
//       setEmailForm({ subject: '', message: '' });
//       showNotification('Email sent successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to send email', 'error');
//       console.error('Error sending email:', err);
//     }
//   };

//   // Export data
//   const handleExport = () => {
//     // In a real app, you would implement proper export functionality
//     const selectedData = selectedQueries.length > 0 
//       ? queries.filter(q => selectedQueries.includes(q._id))
//       : queries;
    
//     // This is a simplified example - in a real app you'd use proper export libraries
//     // For CSV example
//     if (exportFormat === 'csv') {
//       const headers = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Created At'];
//       const csvContent = [
//         headers.join(','),
//         ...selectedData.map(q => [
//           q.name || 'Anonymous',
//           q.email || '',
//           q.phone || '',
//           (q.message || '').replace(/,/g, ' ').replace(/\n/g, ' '),
//           q.status || 'New',
//           new Date(q.createdAt).toLocaleDateString()
//         ].join(','))
//       ].join('\n');
      
//       const blob = new Blob([csvContent], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `tour-queries-${new Date().toISOString().split('T')[0]}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
    
//     setShowExportOptions(false);
//     showNotification(`Exported ${selectedData.length} queries as ${exportFormat.toUpperCase()}`, 'success');
//   };

//   // Assign to staff
//   const handleAssign = async (id, staffEmail) => {
//     try {
//       await axios.patch(`/api/tour-queries/${id}`, { assignedTo: staffEmail });
      
//       const updatedQueries = queries.map(q => 
//         q._id === id ? { ...q, assignedTo: staffEmail } : q
//       );
      
//       setQueries(updatedQueries);
      
//       if (selectedQuery && selectedQuery._id === id) {
//         setSelectedQuery({ ...selectedQuery, assignedTo: staffEmail });
//       }
      
//       showNotification(`Query assigned to ${staffEmail}`, 'success');
//     } catch (err) {
//       showNotification('Failed to assign query', 'error');
//       console.error('Error assigning query:', err);
//     }
//   };

//   // Show notification
//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
//   };

//   // Handle sort
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Toggle query selection
//   const toggleQuerySelection = (id) => {
//     setSelectedQueries(prev => {
//       if (prev.includes(id)) {
//         return prev.filter(qId => qId !== id);
//       } else {
//         return [...prev, id];
//       }
//     });
//   };

//   // Toggle all queries selection
//   const toggleAllSelection = () => {
//     if (selectedQueries.length === filteredQueries.length) {
//       setSelectedQueries([]);
//     } else {
//       setSelectedQueries(filteredQueries.map(q => q._id));
//     }
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setDateFilter({ start: '', end: '' });
//     setStatusFilter('all');
//     setPriorityFilter('all');
//     setIsFiltersOpen(false);
//   };

//   // Sort queries
//   const sortedQueries = useMemo(() => {
//     let sortableQueries = [...queries];
//     if (sortConfig.key) {
//       sortableQueries.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableQueries;
//   }, [queries, sortConfig]);

//   // Filter and search queries
//   const filteredQueries = useMemo(() => {
//     return sortedQueries.filter(query => {
//       // Search term filter
//       const matchesSearch = 
//         (query.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//         (query.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//         (query.message?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//         (query.phone || '').includes(searchTerm);
      
//       // Date filter
//       const createdDate = new Date(query.createdAt);
//       const matchesDateStart = dateFilter.start 
//         ? createdDate >= new Date(dateFilter.start) 
//         : true;
//       const matchesDateEnd = dateFilter.end 
//         ? createdDate <= new Date(dateFilter.end) 
//         : true;
      
//       // Status filter
//       const matchesStatus = statusFilter === 'all' || query.status === statusFilter;
      
//       // Priority filter
//       const matchesPriority = priorityFilter === 'all' || query.priority === priorityFilter;
      
//       return matchesSearch && matchesDateStart && matchesDateEnd && matchesStatus && matchesPriority;
//     });
//   }, [sortedQueries, searchTerm, dateFilter, statusFilter, priorityFilter]);

//   // Stats calculation
//   const stats = useMemo(() => {
//     const total = queries.length;
//     const pending = queries.filter(q => q.status === 'New').length;
//     const responded = queries.filter(q => q.status === 'Responded').length;
//     const completed = queries.filter(q => q.status === 'Completed').length;
//     const highPriority = queries.filter(q => q.priority === 'High').length;
    
//     return { total, pending, responded, completed, highPriority };
//   }, [queries]);

//   // Pagination
//   const indexOfLastQuery = currentPage * itemsPerPage;
//   const indexOfFirstQuery = indexOfLastQuery - itemsPerPage;
//   const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery);
//   const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

//   // Select query for details
//   const handleSelectQuery = (query) => {
//     setSelectedQuery(query);
//     setEditForm(query);
//     setIsEditing(false);
//     setIsSendingEmail(false);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     try {
//       return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   // Calculate days since creation
//   const getDaysSinceCreation = (dateString) => {
//     try {
//       const createdDate = new Date(dateString);
//       const currentDate = new Date();
//       const diffTime = Math.abs(currentDate - createdDate);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return diffDays;
//     } catch (error) {
//       return '?';
//     }
//   };

//   // Get priority color
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High':
//         return colors.priorityHigh;
//       case 'Medium':
//         return colors.priorityMedium;
//       case 'Low':
//         return colors.priorityLow;
//       default:
//         return colors.priorityMedium;
//     }
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'New':
//         return '#3B82F6'; // Blue
//       case 'In Progress':
//         return '#8B5CF6'; // Purple
//       case 'Responded':
//         return '#F59E0B'; // Amber
//       case 'Completed':
//         return '#10B981'; // Green
//       case 'Archived':
//         return '#6B7280'; // Gray
//       default:
//         return '#3B82F6'; // Blue (default)
//     }
//   };

//   // Handle form input change
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({
//       ...editForm,
//       [name]: value
//     });
//   };

//   // RENDER COMPONENTS
  
//   // Notification component
//   const Notification = () => (
//     notification.show && (
//       <div 
//         className="fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 animate-fade-in"
//         style={{ 
//           backgroundColor: notification.type === 'success' ? colors.success : colors.error,
//           color: colors.white
//         }}
//       >
//         {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
//         <span>{notification.message}</span>
//       </div>
//     )
//   );

//   // Loading spinner
//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center h-64">
//       <div 
//         className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
//         style={{ borderColor: colors.primary }}
//       ></div>
//     </div>
//   );

//   // Error message
//   const ErrorMessage = () => (
//     <div 
//       className="rounded-md p-4 mt-4 text-center"
//       style={{ backgroundColor: '#FEE2E2', color: colors.error }}
//     >
//       <AlertCircle className="mx-auto mb-2" size={24} />
//       <p>{error}</p>
//       <button 
//         className="mt-3 px-4 py-2 rounded-md text-white transition-colors"
//         style={{ backgroundColor: colors.primary }}
//         onClick={fetchQueries}
//       >
//         <RefreshCw size={16} className="inline mr-2" /> Try Again
//       </button>
//     </div>
//   );

//   // Empty state
//   const EmptyState = () => (
//     <div className="text-center p-8 rounded-md" style={{ backgroundColor: colors.background }}>
//       <MessageSquare size={40} className="mx-auto mb-2" style={{ color: colors.primary }} />
//       <h3 className="text-lg font-semibold mb-2">No Queries Found</h3>
//       <p style={{ color: colors.lightText }}>
//         {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter.start || dateFilter.end
//           ? 'No queries match your search criteria.'
//           : 'No tour queries have been submitted yet.'}
//       </p>
//       {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter.start || dateFilter.end) && (
//         <button
//           className="mt-4 px-4 py-2 text-sm rounded-md transition-colors"
//           style={{ 
//             backgroundColor: colors.white,
//             color: colors.primary,
//             border: `1px solid ${colors.primary}`
//           }}
//           onClick={resetFilters}
//         >
//           Clear Filters
//         </button>
//       )}
//     </div>
//   );

//   // Stats Cards
//   const StatsCards = () => (
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//       <div 
//         className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
//         style={{ borderTop: `3px solid ${colors.primary}` }}
//       >
//         <div style={{ color: colors.lightText }} className="text-sm">Total Queries</div>
//         <div className="text-2xl font-bold mt-2">{stats.total}</div>
//       </div>
      
//       <div 
//         className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
//         style={{ borderTop: `3px solid #3B82F6` }}
//       >
//         <div style={{ color: colors.lightText }} className="text-sm">New</div>
//         <div className="text-2xl font-bold mt-2">{stats.pending}</div>
//       </div>
      
//       <div 
//         className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
//         style={{ borderTop: `3px solid #F59E0B` }}
//       >
//         <div style={{ color: colors.lightText }} className="text-sm">Responded</div>
//         <div className="text-2xl font-bold mt-2">{stats.responded}</div>
//       </div>
      
//       <div 
//         className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
//         style={{ borderTop: `3px solid #10B981` }}
//       >
//         <div style={{ color: colors.lightText }} className="text-sm">Completed</div>
//         <div className="text-2xl font-bold mt-2">{stats.completed}</div>
//       </div>
      
//       <div 
//         className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
//         style={{ borderTop: `3px solid #EF4444` }}
//       >
//         <div style={{ color: colors.lightText }} className="text-sm">High Priority</div>
//         <div className="text-2xl font-bold mt-2">{stats.highPriority}</div>
//       </div>
//     </div>
//   );

//   // Filter Panel
//   const FilterPanel = () => (
//     <div 
//       className={`bg-white rounded-md shadow-sm p-4 mb-6 transition-all duration-300 ${isFiltersOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 hidden'}`}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//             Date Range
//           </label>
//           <div className="flex gap-2">
//             <input 
//               type="date" 
//               value={dateFilter.start}
//               onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
//               className="w-full p-2 border rounded-md text-sm"
//               style={{ borderColor: colors.border }}
//             />
//             <span className="flex items-center">to</span>
//             <input 
//               type="date"
//               value={dateFilter.end}
//               onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
//               className="w-full p-2 border rounded-md text-sm"
//               style={{ borderColor: colors.border }}
//             />
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//             Status
//           </label>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full p-2 border rounded-md text-sm"
//             style={{ borderColor: colors.border }}
//           >
//             <option value="all">All Statuses</option>
//             {statusOptions.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//             Priority
//           </label>
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             className="w-full p-2 border rounded-md text-sm"
//             style={{ borderColor: colors.border }}
//           >
//             <option value="all">All Priorities</option>
//             {priorityOptions.map(priority => (
//               <option key={priority} value={priority}>{priority}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className="flex items-end gap-2">
//           <button
//             className="flex-1 px-4 py-2 rounded-md text-white transition-colors text-sm"
//             style={{ backgroundColor: colors.primary }}
//             onClick={() => {
//               // Apply filters logic (already happening in filteredQueries)
//               setIsFiltersOpen(false);
//             }}
//           >
//             Apply Filters
//           </button>
//           <button
//             className="px-4 py-2 rounded-md border transition-colors text-sm"
//             style={{ borderColor: colors.border }}
//             onClick={resetFilters}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Bulk Actions Bar
//   const BulkActionsBar = () => (
//     selectedQueries.length > 0 && (
//       <div 
//         className="bg-white rounded-md shadow-sm p-3 mb-6 flex justify-between items-center"
//         style={{ borderLeft: `4px solid ${colors.primary}` }}
//       >
//         <div className="flex items-center gap-2">
//           <CheckCircle size={16} style={{ color: colors.primary }} />
//           <span>{selectedQueries.length} queries selected</span>
//         </div>
//         <div className="flex gap-2">
//           <div className="relative">
//             <button
//               className="px-3 py-1.5 text-sm rounded-md border transition-colors"
//               onClick={() => setShowBulkActions(!showBulkActions)}
//             >
//               Actions <ChevronLeft size={14} className="inline ml-1" style={{ transform: showBulkActions ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
//             </button>
            
//             {showBulkActions && (
//               <div 
//                 className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-48 py-1 border"
//                 style={{ borderColor: colors.border }}
//               >
//                 <button 
//                   className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                   onClick={() => handleBulkStatusChange('Responded')}
//                 >
//                   Mark as Responded
//                 </button>
//                 <button 
//                   className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                   onClick={() => handleBulkStatusChange('Completed')}
//                 >
//                   Mark as Completed
//                 </button>
//                 <button 
//                   className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                   onClick={() => handleBulkStatusChange('Archived')}
//                 >
//                   Archive Selected
//                 </button>
//                 <hr className="my-1" style={{ borderColor: colors.border }} />
//                 <button 
//                   className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                   onClick={() => setShowExportOptions(true)}
//                 >
//                   Export Selected
//                 </button>
//                 <hr className="my-1" style={{ borderColor: colors.border }} />
//                 <button 
//                   className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-500"
//                   onClick={handleBulkDelete}
//                 >
//                   Delete Selected
//                 </button>
//               </div>
//             )}
//           </div>
          
//           <button
//             className="px-3 py-1.5 text-sm rounded-md transition-colors text-red-500 border border-red-200 hover:bg-red-50"
//             onClick={() => {
//               setSelectedQueries([]);
//               setShowBulkActions(false);
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     )
//   );

//   // Export Options Modal
//   const ExportOptionsModal = () => (
//     showExportOptions && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//           <h3 className="text-lg font-semibold mb-4">Export Queries</h3>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//               Export Format
//             </label>
//             <div className="flex gap-3">
//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="exportFormat" 
//                   value="csv" 
//                   checked={exportFormat === 'csv'}
//                   onChange={() => setExportFormat('csv')}
//                   className="mr-2"
//                 />
//                 CSV
//               </label>
//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="exportFormat" 
//                   value="excel" 
//                   checked={exportFormat === 'excel'}
//                   onChange={() => setExportFormat('excel')}
//                   className="mr-2"
//                 />
//                 Excel
//               </label>
//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="exportFormat" 
//                   value="pdf" 
//                   checked={exportFormat === 'pdf'}
//                   onChange={() => setExportFormat('pdf')}
//                   className="mr-2"
//                 />
//                 PDF
//               </label>
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               className="px-4 py-2 rounded-md border text-sm"
//               style={{ borderColor: colors.border }}
//               onClick={() => setShowExportOptions(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-md text-white text-sm"
//               style={{ backgroundColor: colors.primary }}
//               onClick={handleExport}
//             >
//               <Download size={16} className="inline mr-2" />
//               Export {selectedQueries.length > 0 ? `(${selectedQueries.length})` : 'All'}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );

//   // Queries table
//   const QueriesTable = () => (
//     <div className="bg-white rounded-md shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr style={{ backgroundColor: colors.gray }}>
//               <th className="p-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   checked={selectedQueries.length === currentQueries.length && currentQueries.length > 0}
//                   onChange={toggleAllSelection}
//                   className="rounded"
//                 />
//               </th>
//               <th 
//                 className="p-3 text-left text-sm font-medium cursor-pointer"
//                 onClick={() => requestSort('createdAt')}
//               >
//                 <div className="flex items-center">
//                   Date
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th 
//                 className="p-3 text-left text-sm font-medium cursor-pointer"
//                 onClick={() => requestSort('name')}
//               >
//                 <div className="flex items-center">
//                   Name
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="p-3 text-left text-sm font-medium">Contact</th>
//               <th className="p-3 text-left text-sm font-medium">Message</th>
//               <th 
//                 className="p-3 text-left text-sm font-medium cursor-pointer"
//                 onClick={() => requestSort('status')}
//               >
//                 <div className="flex items-center">
//                   Status
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th 
//                 className="p-3 text-left text-sm font-medium cursor-pointer"
//                 onClick={() => requestSort('priority')}
//               >
//                 <div className="flex items-center">
//                   Priority
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="p-3 text-left text-sm font-medium w-20">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentQueries.map(query => (
//               <tr 
//                 key={query._id} 
//                 onClick={() => handleSelectQuery(query)}
//                 className="cursor-pointer hover:bg-gray-50 border-t"
//                 style={{ borderColor: colors.border }}
//               >
//                 <td className="p-3" onClick={(e) => e.stopPropagation()}>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedQueries.includes(query._id)}
//                     onChange={() => toggleQuerySelection(query._id)}
//                     className="rounded"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <div className="text-sm">{formatDate(query.createdAt)}</div>
//                   <div className="text-xs" style={{ color: colors.lightText }}>
//                     {getDaysSinceCreation(query.createdAt)} days ago
//                   </div>
//                 </td>
//                 <td className="p-3">
//                   <div className="font-medium text-sm">{query.name || 'Anonymous'}</div>
//                   {query.tourType && (
//                     <div className="text-xs" style={{ color: colors.lightText }}>
//                       {query.tourType}
//                     </div>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <div className="text-sm flex items-center">
//                     <Mail size={14} className="mr-1" style={{ color: colors.lightText }} />
//                     {query.email || 'N/A'}
//                   </div>
//                   {query.phone && (
//                     <div className="text-sm flex items-center mt-1">
//                       <Phone size={14} className="mr-1" style={{ color: colors.lightText }} />
//                       {query.phone}
//                     </div>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <div className="text-sm line-clamp-2">
//                     {query.message || 'No message provided'}
//                   </div>
//                 </td>
//                 <td className="p-3">
//                   <span 
//                     className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
//                     style={{ 
//                       backgroundColor: `${getStatusColor(query.status)}20`,
//                       color: getStatusColor(query.status)
//                     }}
//                   >
//                     {query.status || 'New'}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <span 
//                     className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
//                     style={{ 
//                       backgroundColor: getPriorityColor(query.priority),
//                       color: query.priority === 'High' ? '#B91C1C' : 
//                              query.priority === 'Medium' ? '#B45309' : '#065F46'
//                     }}
//                   >
//                     {query.priority || 'Medium'}
//                   </span>
//                 </td>
//                 <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
//                   <div className="flex space-x-2 justify-end">
//                     <button
//                       className="p-1 rounded-md hover:bg-gray-100"
//                       onClick={() => handleSelectQuery(query)}
//                       title="View Details"
//                     >
//                       <Eye size={18} style={{ color: colors.primary }} />
//                     </button>
//                     <button
//                       className="p-1 rounded-md hover:bg-gray-100"
//                       onClick={() => handleDelete(query._id)}
//                       title={confirmDelete === query._id ? "Confirm Delete" : "Delete"}
//                     >
//                       <Trash2 
//                         size={18} 
//                         style={{ 
//                           color: confirmDelete === query._id ? colors.error : colors.lightText 
//                         }} 
//                       />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Pagination */}
//       {filteredQueries.length > 0 && (
//         <div 
//           className="flex justify-between items-center p-4 border-t"
//           style={{ borderColor: colors.border }}
//         >
//           <div style={{ color: colors.lightText }}>
//             Showing {indexOfFirstQuery + 1} to {Math.min(indexOfLastQuery, filteredQueries.length)} of {filteredQueries.length} queries
//           </div>
//           <div className="flex gap-2">
//             <button
//               className="p-1 rounded-md disabled:opacity-50"
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft size={20} style={{ color: currentPage === 1 ? colors.lightText : colors.primary }} />
//             </button>
            
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//               // Logic for showing pagination numbers (current page, +/- 2)
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
              
//               return (
//                 <button
//                   key={pageNum}
//                   className="w-8 h-8 rounded-md flex items-center justify-center text-sm"
//                   style={{
//                     backgroundColor: currentPage === pageNum ? colors.primary : 'transparent',
//                     color: currentPage === pageNum ? colors.white : colors.text
//                   }}
//                   onClick={() => setCurrentPage(pageNum)}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
            
//             <button
//               className="p-1 rounded-md disabled:opacity-50"
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages || totalPages === 0}
//             >
//               <ChevronRight size={20} style={{ color: currentPage === totalPages ? colors.lightText : colors.primary }} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Query Detail Panel
//   const QueryDetailPanel = () => (
//     selectedQuery && (
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 overflow-hidden"
//         onClick={() => setSelectedQuery(null)}
//       >
//         <div 
//           className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-xl transition-all duration-300 transform"
//           onClick={e => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: colors.border }}>
//             <h2 className="text-xl font-semibold">Query Details</h2>
//             <div className="flex items-center gap-3">
//               {!isEditing && (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-100"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   <Edit size={18} style={{ color: colors.primary }} />
//                 </button>
//               )}
//               <button
//                 className="p-2 rounded-md hover:bg-gray-100"
//                 onClick={() => setSelectedQuery(null)}
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>
          
//           {/* Content */}
//           <div className="p-6">
//             {/* Edit Form */}
//             {isEditing ? (
//               <form onSubmit={handleEditSubmit}>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name || ''}
//                       onChange={handleFormChange}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email || ''}
//                       onChange={handleFormChange}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Phone</label>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={editForm.phone || ''}
//                       onChange={handleFormChange}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Message</label>
//                     <textarea
//                       name="message"
//                       value={editForm.message || ''}
//                       onChange={handleFormChange}
//                       rows={4}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Status</label>
//                       <select
//                         name="status"
//                         value={editForm.status || 'New'}
//                         onChange={handleFormChange}
//                         className="w-full p-2 border rounded-md"
//                         style={{ borderColor: colors.border }}
//                       >
//                         {statusOptions.map(status => (
//                           <option key={status} value={status}>{status}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Priority</label>
//                       <select
//                         name="priority"
//                         value={editForm.priority || 'Medium'}
//                         onChange={handleFormChange}
//                         className="w-full p-2 border rounded-md"
//                         style={{ borderColor: colors.border }}
//                       >
//                         {priorityOptions.map(priority => (
//                           <option key={priority} value={priority}>{priority}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end gap-3 pt-4">
//                     <button
//                       type="button"
//                       className="px-4 py-2 rounded-md border text-sm"
//                       style={{ borderColor: colors.border }}
//                       onClick={() => setIsEditing(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 rounded-md text-white text-sm"
//                       style={{ backgroundColor: colors.primary }}
//                     >
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 {/* Status and Priority */}
//                 <div className="flex flex-wrap justify-between items-center mb-6">
//                   <div>
//                     <span className="text-sm font-medium" style={{ color: colors.lightText }}>Status</span>
//                     <div className="mt-1">
//                       <div className="relative inline-block">
//                         <button
//                           className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
//                           style={{ 
//                             backgroundColor: `${getStatusColor(selectedQuery.status)}20`,
//                             color: getStatusColor(selectedQuery.status)
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setIsStatusMenuOpen(prev => !prev);
//                           }}
//                         >
//                           {selectedQuery.status || 'New'}
//                           <ChevronLeft size={16} className="ml-1" style={{ transform: 'rotate(90deg)' }} />
//                         </button>
                        
//                         {isStatusMenuOpen && (
//                           <div 
//                             className="absolute left-0 mt-1 bg-white rounded-md shadow-lg z-10 w-40 py-1 border"
//                             style={{ borderColor: colors.border }}
//                           >
//                             {statusOptions.map(status => (
//                               <button
//                                 key={status}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleStatusChange(selectedQuery._id, status);
//                                   setIsStatusMenuOpen(false);
//                                 }}
//                               >
//                                 {selectedQuery.status === status && (
//                                   <Check size={16} className="mr-2" style={{ color: colors.primary }} />
//                                 )}
//                                 <span className={selectedQuery.status !== status ? 'ml-6' : ''}>
//                                   {status}
//                                 </span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <span className="text-sm font-medium" style={{ color: colors.lightText }}>Priority</span>
//                     <div className="mt-1">
//                       <div className="relative inline-block">
//                         <button
//                           className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
//                           style={{ 
//                             backgroundColor: getPriorityColor(selectedQuery.priority),
//                             color: selectedQuery.priority === 'High' ? '#B91C1C' : 
//                                    selectedQuery.priority === 'Medium' ? '#B45309' : '#065F46'
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setIsPriorityMenuOpen(prev => !prev);
//                           }}
//                         >
//                           {selectedQuery.priority || 'Medium'}
//                           <ChevronLeft size={16} className="ml-1" style={{ transform: 'rotate(90deg)' }} />
//                         </button>
                        
//                         {isPriorityMenuOpen && (
//                           <div 
//                             className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-40 py-1 border"
//                             style={{ borderColor: colors.border }}
//                           >
//                             {priorityOptions.map(priority => (
//                               <button
//                                 key={priority}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handlePriorityChange(selectedQuery._id, priority);
//                                   setIsPriorityMenuOpen(false);
//                                 }}
//                               >
//                                 {selectedQuery.priority === priority && (
//                                   <Check size={16} className="mr-2" style={{ color: colors.primary }} />
//                                 )}
//                                 <span className={selectedQuery.priority !== priority ? 'ml-6' : ''}>
//                                   {priority}
//                                 </span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Customer Details */}
//                 <div 
//                   className="bg-gray-50 p-4 rounded-md mb-6"
//                   style={{ backgroundColor: colors.background }}
//                 >
//                   <h3 className="font-medium mb-3">Customer Information</h3>
                  
//                   <div className="space-y-3">
//                     <div className="flex items-start">
//                       <Users className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
//                       <div>
//                         <div className="font-medium">{selectedQuery.name || 'Anonymous'}</div>
//                         <div style={{ color: colors.lightText }}>
//                           {selectedQuery.tourType || 'No tour type specified'}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start">
//                       <Mail className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
//                       <div>
//                         <div>{selectedQuery.email || 'No email provided'}</div>
//                         {selectedQuery.email && (
//                           <button
//                             className="text-sm mt-1"
//                             style={{ color: colors.primary }}
//                             onClick={() => setIsSendingEmail(true)}
//                           >
//                             Send Email Response
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     {selectedQuery.phone && (
//                       <div className="flex items-start">
//                         <Phone className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
//                         <div>{selectedQuery.phone}</div>
//                       </div>
//                     )}
                    
//                     <div className="flex items-start">
//                       <Calendar className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
//                       <div>
//                         <div>Created: {formatDate(selectedQuery.createdAt)}</div>
//                         <div style={{ color: colors.lightText }}>
//                           Last Updated: {formatDate(selectedQuery.lastUpdated)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Query Message */}
//                 <div className="mb-6">
//                   <h3 className="font-medium mb-3">Query Message</h3>
//                   <div 
//                     className="p-4 rounded-md border"
//                     style={{ borderColor: colors.border }}
//                   >
//                     <p style={{ whiteSpace: 'pre-line' }}>
//                       {selectedQuery.message || 'No message provided'}
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Email Response Form */}
//                 {isSendingEmail && (
//                   <form onSubmit={handleSendEmail} className="mb-6">
//                     <h3 className="font-medium mb-3">Send Email Response</h3>
                    
//                     <div className="space-y-4 p-4 rounded-md border" style={{ borderColor: colors.border }}>
//                       <div>
//                         <label className="block text-sm font-medium mb-1">Subject</label>
//                         <input
//                           type="text"
//                           value={emailForm.subject}
//                           onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
//                           className="w-full p-2 border rounded-md"
//                           style={{ borderColor: colors.border }}
//                           placeholder="RE: Your Tour Inquiry"
//                           required
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium mb-1">Message</label>
//                         <textarea
//                           value={emailForm.message}
//                           onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
//                           rows={6}
//                           className="w-full p-2 border rounded-md"
//                           style={{ borderColor: colors.border }}
//                           placeholder="Thank you for your inquiry..."
//                           required
//                         />
//                       </div>
                      
//                       <div className="flex justify-end gap-3 pt-2">
//                         <button
//                           type="button"
//                           className="px-4 py-2 rounded-md border text-sm"
//                           style={{ borderColor: colors.border }}
//                           onClick={() => setIsSendingEmail(false)}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="submit"
//                           className="px-4 py-2 rounded-md text-white text-sm flex items-center"
//                           style={{ backgroundColor: colors.primary }}
//                         >
//                           <Send size={16} className="mr-2" />
//                           Send Email
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 )}
                
//                 {/* Notes Section */}
//                 <div className="mb-6">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="font-medium">Notes & Updates</h3>
//                     <button
//                       className="text-sm px-2 py-1 rounded-md"
//                       style={{ color: colors.primary }}
//                       onClick={() => setIsAddingNote(true)}
//                     >
//                       + Add Note
//                     </button>
//                   </div>
                  
//                   {isAddingNote && (
//                     <div className="mb-4 p-4 rounded-md border" style={{ borderColor: colors.border }}>
//                       <textarea
//                         value={newNote}
//                         onChange={(e) => setNewNote(e.target.value)}
//                         rows={3}
//                         className="w-full p-2 border rounded-md mb-3"
//                         style={{ borderColor: colors.border }}
//                         placeholder="Enter your note here..."
//                       />
                      
//                       <div className="flex justify-end gap-2">
//                         <button
//                           className="px-3 py-1 rounded-md border text-sm"
//                           style={{ borderColor: colors.border }}
//                           onClick={() => {
//                             setIsAddingNote(false);
//                             setNewNote('');
//                           }}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           className="px-3 py-1 rounded-md text-white text-sm"
//                           style={{ backgroundColor: colors.primary }}
//                           onClick={handleAddNote}
//                         >
//                           Save Note
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-3">
//                     {selectedQuery.notes && selectedQuery.notes.length > 0 ? (
//                       selectedQuery.notes.map((note, index) => (
//                         <div 
//                           key={index} 
//                           className="p-3 rounded-md"
//                           style={{ backgroundColor: colors.background }}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div style={{ color: colors.lightText }} className="text-sm">
//                               {note.createdBy} • {formatDate(note.createdAt)}
//                             </div>
//                           </div>
//                           <p className="mt-2 text-sm">{note.text}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-center py-6" style={{ color: colors.lightText }}>
//                         <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
//                         <p>No notes added yet</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Action Buttons */}
//                 <div className="flex justify-between border-t pt-6 mt-6" style={{ borderColor: colors.border }}>
//                   <button
//                     className="px-4 py-2 rounded-md text-white text-sm bg-red-600 hover:bg-red-700 transition-colors"
//                     onClick={() => handleDelete(selectedQuery._id)}
//                   >
//                     {confirmDelete === selectedQuery._id ? 'Confirm Delete' : 'Delete Query'}
//                   </button>
                  
//                   <div className="flex gap-3">
//                     <button
//                       className="px-4 py-2 rounded-md border text-sm"
//                       style={{ borderColor: colors.border }}
//                       onClick={() => setSelectedQuery(null)}
//                     >
//                       Close
//                     </button>
                    
//                     {selectedQuery.status !== 'Completed' && (
//                       <button
//                         className="px-4 py-2 rounded-md text-white text-sm"
//                         style={{ backgroundColor: colors.success }}
//                         onClick={() => handleStatusChange(selectedQuery._id, 'Completed')}
//                       >
//                         Mark as Completed
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );

//   // Main Render
//   return (
//     <div className="min-h-screen p-6" style={{ backgroundColor: colors.background }}>
//       {/* Notification */}
//       <Notification />
      
//       {/* Export Options Modal */}
//       <ExportOptionsModal />
      
//       {/* Query Detail Panel */}
//       <QueryDetailPanel />
      
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Tour Inquiries Management</h1>
        
//         <div className="flex gap-3">
//           <button
//             className="flex items-center px-4 py-2 rounded-md text-sm border transition-colors"
//             style={{ borderColor: colors.border }}
//             onClick={() => setShowStats(!showStats)}
//           >
//             {showStats ? 'Hide Stats' : 'Show Stats'}
//           </button>
          
//           <button
//             className="flex items-center px-4 py-2 rounded-md text-sm border transition-colors"
//             style={{ borderColor: colors.border }}
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//           >
//             <Filter size={16} className="mr-2" />
//             Filters
//           </button>
          
//           <button
//             className="flex items-center px-4 py-2 rounded-md text-sm text-white"
//             style={{ backgroundColor: colors.primary }}
//             onClick={() => setShowExportOptions(true)}
//             >
//               <Download size={16} className="mr-2" />
//               Export
//             </button>
//             </div>
//             </div>
            
//             {/* Stats Cards */}
//             {showStats && (
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white p-4 rounded-md shadow-sm">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="text-sm" style={{ color: colors.lightText }}>Total Inquiries</div>
//                       <div className="text-2xl font-bold mt-1">{queries.length}</div>
//                     </div>
//                     <div 
//                       className="p-2 rounded-md"
//                       style={{ backgroundColor: `${colors.primary}20` }}
//                     >
//                       <MessageSquare size={20} style={{ color: colors.primary }} />
//                     </div>
//                   </div>
//                   <div className="text-sm mt-2" style={{ color: colors.lightText }}>
//                     {/* {getPercentageChange(queries.length, previousStats.totalQueries)}% from last period */}
//                   </div>
//                 </div>
                
//                 <div className="bg-white p-4 rounded-md shadow-sm">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="text-sm" style={{ color: colors.lightText }}>New</div>
//                       {/* <div className="text-2xl font-bold mt-1">{getStatusCount('New')}</div> */}
//                     </div>
//                     <div 
//                       className="p-2 rounded-md"
//                       style={{ backgroundColor: `${getStatusColor('New')}20` }}
//                     >
//                       <AlertCircle size={20} style={{ color: getStatusColor('New') }} />
//                     </div>
//                   </div>
//                   <div className="text-sm mt-2" style={{ color: colors.lightText }}>
//                     {/* {getStatusCount('New')} requiring attention */}
//                   </div>
//                 </div>
                
//                 <div className="bg-white p-4 rounded-md shadow-sm">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="text-sm" style={{ color: colors.lightText }}>In Progress</div>
//                       {/* <div className="text-2xl font-bold mt-1">{getStatusCount('In Progress')}</div> */}
//                     </div>
//                     <div 
//                       className="p-2 rounded-md"
//                       style={{ backgroundColor: `${getStatusColor('In Progress')}20` }}
//                     >
//                       <Clock size={20} style={{ color: getStatusColor('In Progress') }} />
//                     </div>
//                   </div>
//                   <div className="text-sm mt-2" style={{ color: colors.lightText }}>
//                     {/* {getStatusCount('In Progress')} being processed */}
//                   </div>
//                 </div>
                
//                 <div className="bg-white p-4 rounded-md shadow-sm">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="text-sm" style={{ color: colors.lightText }}>Completed</div>
//                       {/* <div className="text-2xl font-bold mt-1">{getStatusCount('Completed')}</div> */}
//                     </div>
//                     <div 
//                       className="p-2 rounded-md"
//                       style={{ backgroundColor: `${colors.success}20` }}
//                     >
//                       <CheckSquare size={20} style={{ color: colors.success }} />
//                     </div>
//                   </div>
//                   <div className="text-sm mt-2" style={{ color: colors.lightText }}>
//                     {/* {Math.round((getStatusCount('Completed') / queries.length) * 100) || 0}% completion rate */}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Filters */}
//             {isFiltersOpen && (
//               <div className="bg-white p-4 rounded-md shadow-sm mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                       Status
//                     </label>
//                     <select
//                     //   value={filters.status}
//                     //   onChange={(e) => handleFilterChange('status', e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     >
//                       <option value="">All Status</option>
//                       {statusOptions.map(status => (
//                         <option key={status} value={status}>{status}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                       Priority
//                     </label>
//                     <select
//                       value={filters.priority}
//                       onChange={(e) => handleFilterChange('priority', e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     >
//                       <option value="">All Priorities</option>
//                       {priorityOptions.map(priority => (
//                         <option key={priority} value={priority}>{priority}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
//                       Date Range
//                     </label>
//                     <select
//                       value={filters.dateRange}
//                       onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       style={{ borderColor: colors.border }}
//                     >
//                       <option value="">All Time</option>
//                       <option value="today">Today</option>
//                       <option value="thisWeek">This Week</option>
//                       <option value="thisMonth">This Month</option>
//                       <option value="lastMonth">Last Month</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end mt-4">
//                   <button
//                     className="px-4 py-2 text-sm"
//                     style={{ color: colors.primary }}
//                     onClick={resetFilters}
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Search */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="relative flex-grow">
//                 <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.lightText }} />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, or message..."
//                 //   value={searchQuery}
//                 //   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border rounded-md"
//                   style={{ borderColor: colors.border }}
//                 />
//               </div>
              
//               <div className="flex gap-3">
//                 <select
//                 //   value={resultsPerPage}
//                   onChange={(e) => setResultsPerPage(Number(e.target.value))}
//                   className="p-2 border rounded-md"
//                   style={{ borderColor: colors.border }}
//                 >
//                   <option value={10}>10 per page</option>
//                   <option value={25}>25 per page</option>
//                   <option value={50}>50 per page</option>
//                   <option value={100}>100 per page</option>
//                 </select>
//               </div>
//             </div>
            
//             {/* Bulk Actions */}
//             <BulkActions />
//             <BulkActionsBar/>
//             {/* Queries Table */}
//             {currentQueries.length > 0 ? (
//               <QueriesTable />
//             ) : (
//               <div className="bg-white p-8 rounded-md shadow-sm text-center">
//                 <InboxIcon size={48} className="mx-auto mb-4 opacity-50" />
//                 <h3 className="text-lg font-medium mb-2">No inquiries found</h3>
//                 <p style={{ color: colors.lightText }}>
//                   {queries.length > 0 
//                     ? "Try adjusting your filters or search terms"
//                     : "Your inquiry inbox is empty"
//                   }
//                 </p>
//               </div>
//             )}
//             </div>
//             );
//             };
            
//             export default TourQueriesManagement;




import React, { useState, useEffect, useMemo,useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

// Icons
import { 
    InboxIcon,
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
  RefreshCw,
  Download,
  FileText,
  Star,
  Clock,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Bell,
  Send,
  CheckCircle,
  XCircle,
  Tag,
  Info,
  CheckSquare,
  DollarSign,
  Gift 
} from 'lucide-react';

const TourQueriesManagement = () => {
  // State
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showStats, setShowStats] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: '', message: '' });
  const [exportFormat, setExportFormat] = useState('csv');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isPriorityMenuOpen, setIsPriorityMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    dateRange: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [previousStats, setPreviousStats] = useState({
    totalQueries: 0
  });

  // Theme colors - Orange theme
  const colors = {
    primary: '#F97316', // Orange primary
    secondary: '#FED7AA', // Light orange
    darkPrimary: '#C2410C', // Dark orange for hover
    background: '#FFF7ED', // Very light orange background
    text: '#1E293B',
    lightText: '#64748B',
    success: '#10B981', // Green
    error: '#EF4444', // Red
    warning: '#F59E0B', // Amber
    white: '#FFFFFF',
    border: '#E2E8F0',
    highlight: '#FFEDD5',
    priorityHigh: '#FEE2E2',
    priorityMedium: '#FEF3C7',
    priorityLow: '#ECFDF5',
    gray: '#F1F5F9'
  };

  // Priority options
  const priorityOptions = ['High', 'Medium', 'Low'];
  
  // Status options
  const statusOptions = ['New', 'In Progress', 'Responded', 'Completed', 'Archived'];

  // Fetch queries
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tour-queries');
      setSelectedQuery(response.data.data);
      console.log("📡 Query Data:", response.data);
      // Transform data to add priority and status if they don't exist
      const transformedData = response.data.data.map(query => ({
        ...query,
        priority: query.priority || 'Medium',
        status: query.status || 'New',
        notes: query.notes || [],
        assignedTo: query.assignedTo || null,
        lastUpdated: query.updatedAt || query.createdAt
      }));
      
      setQueries(transformedData);
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
  
const noteInputRef = useRef(null);
// const [newNote, setNewNote] = useState("");
const noteRef = useRef("");
const handleNoteChange = (e) => {
    noteRef.current = e.target.value;
  };
//   const noteInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { selectionStart, selectionEnd } = e.target; // Capture cursor position
//     setNewNote(e.target.value);
    
//     setTimeout(() => {
//       if (noteInputRef.current) {
//         noteInputRef.current.setSelectionRange(selectionStart, selectionEnd);
//       }
//     }, 0);
//   };
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

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedQueries.map(id => axios.delete(`http://localhost:5000/api/tour-queries/${id}`)));
      setQueries(queries.filter(query => !selectedQueries.includes(query._id)));
      setSelectedQueries([]);
      setShowBulkActions(false);
      showNotification(`Successfully deleted ${selectedQueries.length} queries`, 'success');
    } catch (err) {
      showNotification('Failed to delete some queries', 'error');
      console.error('Error bulk deleting queries:', err);
    }
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, editForm);
      
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

  // Handle status change
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/tour-queries/${id}`, { status });
      const updatedQueries = queries.map(q => 
        q._id === id ? { ...q, status } : q
      );
      setQueries(updatedQueries);
      
      if (selectedQuery && selectedQuery._id === id) {
        setSelectedQuery({ ...selectedQuery, status });
      }
      
      showNotification(`Status updated to "${status}"`, 'success');
    } catch (err) {
      showNotification('Failed to update status', 'error');
      console.error('Error updating status:', err);
    }
  };
  const handlePriorityChange = async (id, priority) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/tour-queries/${id}`, { priority });

        if (response.data.success) {
            // Merge only the priority update while keeping other fields intact
            const updatedQueries = queries.map(q => 
                q._id === id ? { ...q, priority } : q
            );
            setQueries(updatedQueries);

            if (selectedQuery && selectedQuery._id === id) {
                setSelectedQuery({ ...selectedQuery, priority });
            }

            showNotification(`Priority set to "${priority}"`, 'success');
        } else {
            throw new Error('Failed to update on server');
        }
    } catch (err) {
        showNotification('Failed to update priority', 'error');
        console.error('Error updating priority:', err);
    }
};


  // Handle priority change
//   const handlePriorityChange = async (id, priority) => {
//     try {
//       const response = await axios.patch(`http://localhost:5000/api/tour-queries/${id}`, { priority });
//       const updatedQueries = queries.map(q => 
//         q._id === id ? { ...q, priority } : q
//       );
//       setQueries(updatedQueries);
      
//       if (selectedQuery && selectedQuery._id === id) {
//         setSelectedQuery({ ...selectedQuery, priority });
//       }
      
//       showNotification(`Priority set to "${priority}"`, 'success');
//     } catch (err) {
//       showNotification('Failed to update priority', 'error');
//       console.error('Error updating priority:', err);
//     }
//   };

  // Handle bulk status change
  const handleBulkStatusChange = async (status) => {
    try {
      await Promise.all(selectedQueries.map(id => 
        axios.patch(`http://localhost:5000/api/tour-queries/${id}`, { status })
      ));
      
      const updatedQueries = queries.map(q => 
        selectedQueries.includes(q._id) ? { ...q, status } : q
      );
      
      setQueries(updatedQueries);
      setSelectedQueries([]);
      setShowBulkActions(false);
      showNotification(`Status updated for ${selectedQueries.length} queries`, 'success');
    } catch (err) {
      showNotification('Failed to update status for some queries', 'error');
      console.error('Error bulk updating status:', err);
    }
  };

  // Add note to quer
  // y
  const handleAddNote = async () => {
    console.log("🚀 Save Note button clicked");
  
    // if (!newNote.trim()) return; // Prevent saving empty notes
  
    // 🛑 Check if selectedQuery is valid before proceeding
    if (!selectedQuery || !selectedQuery._id) {
      console.error("❌ Error: selectedQuery or selectedQuery._id is undefined");
      return;
    }
  
    const newNoteObj = {
      text: newNote,
      createdBy: "Admin", // Replace with the actual user
      createdAt: new Date().toISOString(),
    };
  
    try {
      const updatedNotes = selectedQuery.notes && Array.isArray(selectedQuery.notes)
        ? [...selectedQuery.notes, newNoteObj]
        : [newNoteObj];
  
      console.log("🧐 Selected Query ID:", selectedQuery._id);
      console.log("📝 Updated Notes:", updatedNotes);
      console.log("📌 New Note Before Saving:", newNote);

      const response = await fetch(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }),
      });
  
      if (!response.ok) throw new Error("Failed to update notes");
  
      setSelectedQuery((prev) => ({
        ...prev,
        notes: updatedNotes,
      }));
  
      setNewNote(""); // Clear input
      setIsAddingNote(false); // Hide input box
    } catch (error) {
      console.error("❌ Error saving note:", error);
    }
  };
  
//   const handleAddNote = async () => {
//     console.log("🚀 Save Note button clicked");
  
//     // if (!newNote.trim()) return; // Prevent saving empty notes
  
//     const newNoteObj = {
//       text: newNote,
//       createdBy: "Admin", // Replace with the actual user
//       createdAt: new Date().toISOString(),
//     };
  
//     try {
//       // Ensure notes exist
//       const updatedNotes = selectedQuery.notes && Array.isArray(selectedQuery.notes)
//         ? [...selectedQuery.notes, newNoteObj]
//         : [newNoteObj];
  
//       const response = await fetch(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ notes: updatedNotes }),
//       });
  
//       if (!response.ok) throw new Error("Failed to update notes");
  
//       setSelectedQuery((prev) => ({
//         ...prev,
//         notes: updatedNotes, // Update state correctly
//       }));
  
//       setNewNote(""); // Clear input
//       setIsAddingNote(false); // Hide input box
//     } catch (error) {
//       console.error("❌ Error saving note:", error);
//     }
//   };
  
//   const handleAddNote = async () => {
//     console.log("🚀 Save Note button clicked");
//     // if (!newNote.trim()) return; // Prevent empty notes
  
//     const newNoteObj = {
//       text: newNote,
//       createdBy: "Admin", // Change based on logged-in user
//       createdAt: new Date().toISOString(),
//     };
  
//     try {
//       // Send the updated notes to the backend
//       const response = await fetch(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           notes: [...selectedQuery.notes, newNoteObj], // Append new note
//         }),
//       });
  
//       if (!response.ok) throw new Error("Failed to update notes");
  
//       // Update local state
//       setSelectedQuery((prev) => ({
//         ...prev,
//         notes: [...prev.notes, newNoteObj],
//       }));
  
//       setNewNote(""); // Clear input
//       setIsAddingNote(false); // Hide input box
//     } catch (error) {
//       console.error("❌ Error saving note:", error);
//     }
//   };
  
//   const handleAddNote = async () => {
//     if (!newNote.trim()) return;
    
//     try {
//       const note = {
//         text: newNote,
//         createdAt: new Date().toISOString(),
//         createdBy: 'Admin' // In a real app, get the current user
//       };
      
//       const updatedNotes = [...(selectedQuery.notes || []), note];
      
//       const response = await axios.patch(`http://localhost:5000/api/tour-queries/${selectedQuery._id}`, {
//         notes: updatedNotes
//       });
      
//       const updatedQueries = queries.map(q => 
//         q._id === selectedQuery._id ? { ...q, notes: updatedNotes } : q
//       );
      
//       setQueries(updatedQueries);
//       setSelectedQuery({ ...selectedQuery, notes: updatedNotes });
//       setNewNote('');
//       setIsAddingNote(false);
//       showNotification('Note added successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to add note', 'error');
//       console.error('Error adding note:', err);
//     }
//   };

  // Send email response
  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, this would connect to your email service
      await axios.post('/api/send-email', {
        to: selectedQuery.email,
        subject: emailForm.subject,
        message: emailForm.message,
        queryId: selectedQuery._id
      });
      
      // Update query status to "Responded"
      const updatedQuery = { ...selectedQuery, status: 'Responded' };
      
      await axios.patch(`/api/tour-queries/${selectedQuery._id}`, {
        status: 'Responded'
      });
      
      const updatedQueries = queries.map(q => 
        q._id === selectedQuery._id ? updatedQuery : q
      );
      
      setQueries(updatedQueries);
      setSelectedQuery(updatedQuery);
      setIsSendingEmail(false);
      setEmailForm({ subject: '', message: '' });
      showNotification('Email sent successfully', 'success');
    } catch (err) {
      showNotification('Failed to send email', 'error');
      console.error('Error sending email:', err);
    }
  };

  // Export data
  const handleExport = () => {
    // In a real app, you would implement proper export functionality
    const selectedData = selectedQueries.length > 0 
      ? queries.filter(q => selectedQueries.includes(q._id))
      : queries;
    
    // This is a simplified example - in a real app you'd use proper export libraries
    // For CSV example
    if (exportFormat === 'csv') {
      const headers = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...selectedData.map(q => [
          q.name || 'Anonymous',
          q.email || '',
          q.phone || '',
          (q.message || '').replace(/,/g, ' ').replace(/\n/g, ' '),
          q.status || 'New',
          new Date(q.createdAt).toLocaleDateString()
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tour-queries-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    
    setShowExportOptions(false);
    showNotification(`Exported ${selectedData.length} queries as ${exportFormat.toUpperCase()}`, 'success');
  };

  // Assign to staff
  const handleAssign = async (id, staffEmail) => {
    try {
      await axios.patch(`/api/tour-queries/${id}`, { assignedTo: staffEmail });
      
      const updatedQueries = queries.map(q => 
        q._id === id ? { ...q, assignedTo: staffEmail } : q
      );
      
      setQueries(updatedQueries);
      
      if (selectedQuery && selectedQuery._id === id) {
        setSelectedQuery({ ...selectedQuery, assignedTo: staffEmail });
      }
      
      showNotification(`Query assigned to ${staffEmail}`, 'success');
    } catch (err) {
      showNotification('Failed to assign query', 'error');
      console.error('Error assigning query:', err);
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

  // Toggle query selection
  const toggleQuerySelection = (id) => {
    setSelectedQueries(prev => {
      if (prev.includes(id)) {
        return prev.filter(qId => qId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Toggle all queries selection
  const toggleAllSelection = () => {
    if (selectedQueries.length === filteredQueries.length) {
      setSelectedQueries([]);
    } else {
      setSelectedQueries(filteredQueries.map(q => q._id));
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter({ start: '', end: '' });
    setStatusFilter('all');
    setPriorityFilter('all');
    setIsFiltersOpen(false);
    setFilters({
      status: '',
      priority: '',
      dateRange: ''
    });
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Calculate percentage change
  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Get count of queries by status
  const getStatusCount = (status) => {
    return queries.filter(q => q.status === status).length;
  };

  // Sort queries
  const sortedQueries = useMemo(() => {
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
  const filteredQueries = useMemo(() => {
    return sortedQueries.filter(query => {
      // Search term filter
      const matchesSearch = 
        (query.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (query.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (query.message?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (query.phone || '').includes(searchTerm);
      
      // Date filter
      const createdDate = new Date(query.createdAt);
      const matchesDateStart = dateFilter.start 
        ? createdDate >= new Date(dateFilter.start) 
        : true;
      const matchesDateEnd = dateFilter.end 
        ? createdDate <= new Date(dateFilter.end) 
        : true;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || query.status === statusFilter;
      
      // Priority filter
      const matchesPriority = priorityFilter === 'all' || query.priority === priorityFilter;
      
      return matchesSearch && matchesDateStart && matchesDateEnd && matchesStatus && matchesPriority;
    });
  }, [sortedQueries, searchTerm, dateFilter, statusFilter, priorityFilter]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = queries.length;
    const pending = queries.filter(q => q.status === 'New').length;
    const responded = queries.filter(q => q.status === 'Responded').length;
    const completed = queries.filter(q => q.status === 'Completed').length;
    const highPriority = queries.filter(q => q.priority === 'High').length;
    
    return { total, pending, responded, completed, highPriority };
  }, [queries]);

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
    setIsSendingEmail(false);
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Calculate days since creation
  const getDaysSinceCreation = (dateString) => {
    try {
      const createdDate = new Date(dateString);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (error) {
      return '?';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return colors.priorityHigh;
      case 'Medium':
        return colors.priorityMedium;
      case 'Low':
        return colors.priorityLow;
      default:
        return colors.priorityMedium;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return colors.primary; // Orange
      case 'In Progress':
        return '#8B5CF6'; // Purple
      case 'Responded':
        return '#F59E0B'; // Amber
      case 'Completed':
        return '#10B981'; // Green
      case 'Archived':
        return '#6B7280'; // Gray
      default:
        return colors.primary; // Orange (default)
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
        className="fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 animate-fade-in"
        style={{ 
          backgroundColor: notification.type === 'success' ? colors.success : colors.error,
          color: colors.white
        }}
      >
        {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
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
        className="mt-3 px-4 py-2 rounded-md text-white transition-colors"
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
        {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter.start || dateFilter.end
          ? 'No queries match your search criteria.'
          : 'No tour queries have been submitted yet.'}
      </p>
      {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter.start || dateFilter.end) && (
        <button
          className="mt-4 px-4 py-2 text-sm rounded-md transition-colors"
          style={{ 
            backgroundColor: colors.white,
            color: colors.primary,
            border: `1px solid ${colors.primary}`
          }}
          onClick={resetFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  // Stats Cards
  const StatsCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div 
        className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
        style={{ borderTop: `3px solid ${colors.primary}` }}
      >
        <div style={{ color: colors.lightText }} className="text-sm">Total Queries</div>
        <div className="text-2xl font-bold mt-2">{stats.total}</div>
        <div className="text-sm mt-2" style={{ color: colors.lightText }}>
          {getPercentageChange(stats.total, previousStats.totalQueries)}% from last period
        </div>
      </div>
      
      <div 
        className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
        style={{ borderTop: `3px solid ${getStatusColor('New')}` }}
      >
        <div style={{ color: colors.lightText }} className="text-sm">New</div>
        <div className="text-2xl font-bold mt-2">{getStatusCount('New')}</div>
        <div className="text-sm mt-2" style={{ color: colors.lightText }}>
          {getStatusCount('New')} requiring attention
        </div>
      </div>
      
      <div 
        className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
        style={{ borderTop: `3px solid ${getStatusColor('In Progress')}` }}
      >
        <div style={{ color: colors.lightText }} className="text-sm">In Progress</div>
        <div className="text-2xl font-bold mt-2">{getStatusCount('In Progress')}</div>
        <div className="text-sm mt-2" style={{ color: colors.lightText }}>
          {getStatusCount('In Progress')} being processed
        </div>
      </div>
      
      <div 
        className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
        style={{ borderTop: `3px solid ${getStatusColor('Completed')}` }}
      >
        <div style={{ color: colors.lightText }} className="text-sm">Completed</div>
        <div className="text-2xl font-bold mt-2">{getStatusCount('Completed')}</div>
        <div className="text-sm mt-2" style={{ color: colors.lightText }}>
          {Math.round((getStatusCount('Completed') / queries.length) * 100) || 0}% completion rate
        </div>
      </div>
      
      <div 
        className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between"
        style={{ borderTop: `3px solid ${colors.error}` }}
      >
        <div style={{ color: colors.lightText }} className="text-sm">High Priority</div>
        <div className="text-2xl font-bold mt-2">{stats.highPriority}</div>
        <div className="text-sm mt-2" style={{ color: colors.lightText }}>
          Urgent attention needed
        </div>
      </div>
    </div>
  );

  // Filter Panel
  const FilterPanel = () => (
    <div 
      className={`bg-white rounded-md shadow-sm p-4 mb-6 transition-all duration-300 ${isFiltersOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 hidden'}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Date Range
          </label>
          <div className="flex gap-2">
            <input 
              type="date" 
              value={dateFilter.start}
              onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
              className="w-full p-2 border rounded-md text-sm"
              style={{ borderColor: colors.border }}
            />
            <span className="flex items-center">to</span>
            <input 
              type="date"
              value={dateFilter.end}
              onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
              className="w-full p-2 border rounded-md text-sm"
              style={{ borderColor: colors.border }}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            style={{ borderColor: colors.border }}
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            style={{ borderColor: colors.border }}
          >
            <option value="">All Priorities</option>
            {priorityOptions.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end gap-2">
          <button
            className="flex-1 px-4 py-2 rounded-md text-white transition-colors text-sm"
            style={{ backgroundColor: colors.primary }}
            onClick={() => {
              // Apply filters logic (already happening in filteredQueries)
              setIsFiltersOpen(false);
            }}
          >
            Apply Filters
          </button>
          <button
            className="px-4 py-2 rounded-md border transition-colors text-sm"
            style={{ borderColor: colors.border }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );

  // Bulk Actions Bar
  const BulkActionsBar = () => (
    selectedQueries.length > 0 && (
      <div 
        className="bg-white rounded-md shadow-sm p-3 mb-6 flex justify-between items-center"
        style={{ borderLeft: `4px solid ${colors.primary}` }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle size={16} style={{ color: colors.primary }} />
          <span>{selectedQueries.length} queries selected</span>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              className="px-3 py-1.5 text-sm rounded-md border transition-colors"
              onClick={() => setShowBulkActions(!showBulkActions)}
            >
              Actions <ChevronLeft size={14} className="inline ml-1" style={{ transform: showBulkActions ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
            </button>
            
            {showBulkActions && (
              <div 
                className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-48 py-1 border"
                style={{ borderColor: colors.border }}
              >
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => handleBulkStatusChange('Responded')}
                >
                  Mark as Responded
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => handleBulkStatusChange('Completed')}
                >
                  Mark as Completed
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => handleBulkStatusChange('Archived')}
                >
                  Archive Selected
                </button>
                <hr className="my-1" style={{ borderColor: colors.border }} />
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setShowExportOptions(true)}
                >
                  Export Selected
                </button>
                <hr className="my-1" style={{ borderColor: colors.border }} />
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-500"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
          
          <button
            className="px-3 py-1.5 text-sm rounded-md transition-colors text-red-500 border border-red-200 hover:bg-red-50"
            onClick={() => {
              setSelectedQueries([]);
              setShowBulkActions(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );

  // Export Options Modal
  const ExportOptionsModal = () => (
    showExportOptions && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Export Queries</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
              Export Format
            </label>
            <div className="flex gap-3">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="csv" 
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                  className="mr-2"
                />
                CSV
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="excel" 
                  checked={exportFormat === 'excel'}
                  onChange={() => setExportFormat('excel')}
                  className="mr-2"
                />
                Excel
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="pdf" 
                  checked={exportFormat === 'pdf'}
                  onChange={() => setExportFormat('pdf')}
                  className="mr-2"
                />
                PDF
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 rounded-md border text-sm"
              style={{ borderColor: colors.border }}
              onClick={() => setShowExportOptions(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md text-white text-sm"
              style={{ backgroundColor: colors.primary }}
              onClick={handleExport}
            >
              <Download size={16} className="inline mr-2" />
              Export {selectedQueries.length > 0 ? `(${selectedQueries.length})` : 'All'}
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Queries table
  const QueriesTable = () => (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: colors.gray }}>
              <th className="p-3 text-left w-10">
                <input 
                  type="checkbox" 
                  checked={selectedQueries.length === currentQueries.length && currentQueries.length > 0}
                  onChange={toggleAllSelection}
                  className="rounded"
                />
              </th>
              <th 
                className="p-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                <div className="flex items-center">
                  Date
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th 
                className="p-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Name
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium">Contact</th>
              <th className="p-3 text-left text-sm font-medium">Message</th>
              <th 
                className="p-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center">
                  Status
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th 
                className="p-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => requestSort('priority')}
              >
                <div className="flex items-center">
                  Priority
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQueries.map(query => (
              <tr 
                key={query._id} 
                onClick={() => handleSelectQuery(query)}
                className="cursor-pointer hover:bg-gray-50 border-t"
                style={{ borderColor: colors.border }}
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selectedQueries.includes(query._id)}
                    onChange={() => toggleQuerySelection(query._id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3">
                  <div className="text-sm">{formatDate(query.createdAt)}</div>
                  <div className="text-xs" style={{ color: colors.lightText }}>
                    {getDaysSinceCreation(query.createdAt)} days ago
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-medium text-sm">{query.name || 'Anonymous'}</div>
                  {query.tourType && (
                    <div className="text-xs" style={{ color: colors.lightText }}>
                      {query.tourTitle}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm flex items-center">
                    <Mail size={14} className="mr-1" style={{ color: colors.lightText }} />
                    {query.email || 'N/A'}
                  </div>
                  {query.phone && (
                    <div className="text-sm flex items-center mt-1">
                      <Phone size={14} className="mr-1" style={{ color: colors.lightText }} />
                      {query.phone}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm line-clamp-2">
                    {query.message || 'No message provided'}
                  </div>
                </td>
                <td className="p-3">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(query.status)}20`,
                      color: getStatusColor(query.status)
                    }}
                  >
                    {query.status || 'New'}
                  </span>
                </td>
                <td className="p-3">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: getPriorityColor(query.priority),
                      color: query.priority === 'High' ? '#B91C1C' : 
                             query.priority === 'Medium' ? '#B45309' : '#065F46'
                    }}
                  >
                    {query.priority || 'Medium'}
                  </span>
                </td>
                <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={() => handleSelectQuery(query)}
                      title="View Details"
                    >
                      <Eye size={18} style={{ color: colors.primary }} />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={() => handleDelete(query._id)}
                      title={confirmDelete === query._id ? "Confirm Delete" : "Delete"}
                    >
                      <Trash2 
                        size={18} 
                        style={{ 
                          color: confirmDelete === query._id ? colors.error : colors.lightText 
                        }} 
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {filteredQueries.length > 0 && (
        <div 
          className="flex justify-between items-center p-4 border-t"
          style={{ borderColor: colors.border }}
        >
          <div style={{ color: colors.lightText }}>
            Showing {indexOfFirstQuery + 1} to {Math.min(indexOfLastQuery, filteredQueries.length)} of {filteredQueries.length} queries
          </div>
          <div className="flex gap-2">
            <button
              className="p-1 rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} style={{ color: currentPage === 1 ? colors.lightText : colors.primary }} />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Logic for showing pagination numbers (current page, +/- 2)
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: currentPage === pageNum ? colors.primary : 'transparent',
                    color: currentPage === pageNum ? colors.white : colors.text
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              className="p-1 rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight size={20} style={{ color: currentPage === totalPages ? colors.lightText : colors.primary }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Query Detail Panel
  const QueryDetailPanel = () => (
    selectedQuery && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 overflow-hidden"
        onClick={() => setSelectedQuery(null)}
      >
        <div 
          className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-xl transition-all duration-300 transform"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: colors.border }}>
            <h2 className="text-xl font-semibold">Query Details</h2>
            <div className="flex items-center gap-3">
              {!isEditing && (
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={18} style={{ color: colors.primary }} />
                </button>
              )}
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => setSelectedQuery(null)}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Edit Form */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name || ''}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded-md"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email || ''}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded-md"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone || ''}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded-md"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      name="message"
                      value={editForm.message || ''}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full p-2 border rounded-md"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select
                        name="status"
                        value={editForm.status || 'New'}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded-md"
                        style={{ borderColor: colors.border }}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Priority</label>
                      <select
                        name="priority"
                        value={editForm.priority || 'Medium'}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded-md"
                        style={{ borderColor: colors.border }}
                      >
                        {priorityOptions.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md border text-sm"
                      style={{ borderColor: colors.border }}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md text-white text-sm"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                {/* Status and Priority */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <div>
                    <span className="text-sm font-medium" style={{ color: colors.lightText }}>Status</span>
                    <div className="mt-1">
                      <div className="relative inline-block">
                        <button
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                          style={{ 
                            backgroundColor: `${getStatusColor(selectedQuery.status)}20`,
                            color: getStatusColor(selectedQuery.status)
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsStatusMenuOpen(prev => !prev);
                          }}
                        >
                          {selectedQuery.status || 'New'}
                          <ChevronLeft size={16} className="ml-1" style={{ transform: 'rotate(90deg)' }} />
                        </button>
                        
                        {isStatusMenuOpen && (
                          <div 
                            className="absolute left-0 mt-1 bg-white rounded-md shadow-lg z-10 w-40 py-1 border"
                            style={{ borderColor: colors.border }}
                          >
                            {statusOptions.map(status => (
                              <button
                                key={status}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(selectedQuery._id, status);
                                  setIsStatusMenuOpen(false);
                                }}
                              >
                                {selectedQuery.status === status && (
                                  <Check size={16} className="mr-2" style={{ color: colors.primary }} />
                                )}
                                <span className={selectedQuery.status !== status ? 'ml-6' : ''}>
                                  {status}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium" style={{ color: colors.lightText }}>Priority</span>
                    <div className="mt-1">
                      <div className="relative inline-block">
                        <button
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                          style={{ 
                            backgroundColor: getPriorityColor(selectedQuery.priority),
                            color: selectedQuery.priority === 'High' ? '#B91C1C' : 
                                   selectedQuery.priority === 'Medium' ? '#B45309' : '#065F46'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPriorityMenuOpen(prev => !prev);
                          }}
                        >
                          {selectedQuery.priority || 'Medium'}
                          <ChevronLeft size={16} className="ml-1" style={{ transform: 'rotate(90deg)' }} />
                        </button>
                        
                        {isPriorityMenuOpen && (
                          <div 
                            className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-40 py-1 border"
                            style={{ borderColor: colors.border }}
                          >
                            {priorityOptions.map(priority => (
                              <button
                                key={priority}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePriorityChange(selectedQuery._id, priority);
                                  setIsPriorityMenuOpen(false);
                                }}
                              >
                                {selectedQuery.priority === priority && (
                                  <Check size={16} className="mr-2" style={{ color: colors.primary }} />
                                )}
                                <span className={selectedQuery.priority !== priority ? 'ml-6' : ''}>
                                  {priority}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customer Details */}
                <div 
  className="bg-gray-50 p-4 rounded-md mb-6"
  style={{ backgroundColor: colors.background }}
>
  <h3 className="font-medium mb-3">Customer Information</h3>
  
  <div className="space-y-3">
    {/* Name & Tour Title */}
    <div className="flex items-start">
      <Users className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div className="font-medium">{selectedQuery.name || 'Anonymous'}</div>
        <div style={{ color: colors.lightText }}>
          {selectedQuery.tourTitle || 'No tour specified'}
        </div>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-start">
      <Mail className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div>{selectedQuery.email || 'No email provided'}</div>
        {selectedQuery.email && (
          <button
            className="text-sm mt-1"
            style={{ color: colors.primary }}
            onClick={() => setIsSendingEmail(true)}
          >
            Send Email Response
          </button>
        )}
      </div>
    </div>

    {/* Phone */}
    {selectedQuery.phone && (
      <div className="flex items-start">
        <Phone className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
        <div>{selectedQuery.phone}</div>
      </div>
    )}

    {/* Travel Date */}
    {selectedQuery.travelDate && (
      <div className="flex items-start">
        <Calendar className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
        <div>Travel Date: {formatDate(selectedQuery.travelDate)}</div>
      </div>
    )}

    {/* Travelers Count */}
    <div className="flex items-start">
      <Users className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div><strong>Adults:</strong> {selectedQuery.adults || 0}</div>
        <div><strong>Children:</strong> {selectedQuery.children || 0}</div>
        <div><strong>Infants:</strong> {selectedQuery.infants || 0}</div>
        <div><strong>Total Travelers:</strong> {selectedQuery.totalTravelers || 'Not specified'}</div>
      </div>
    </div>

    {/* Priority & Status */}
    <div className="flex items-start">
      <Tag className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div><strong>Priority:</strong> {selectedQuery.priority || 'Normal'}</div>
        <div><strong>Status:</strong> {selectedQuery.status || 'New'}</div>
      </div>
    </div>

    {/* Message */}
    {selectedQuery.message && (
      <div className="flex items-start">
        <MessageSquare className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
        <div>
          <strong>Message:</strong>
          <p style={{ color: colors.lightText }}>{selectedQuery.message}</p>
        </div>
      </div>
    )}

    {/* Promo Code */}
    {selectedQuery.promoCode && (
      <div className="flex items-start">
        <Gift className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
        <div><strong>Promo Code:</strong> {selectedQuery.promoCode}</div>
      </div>
    )}

    {/* Payment Summary */}
    <div className="flex items-start">
      <DollarSign className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div><strong>Subtotal:</strong> ${selectedQuery.subtotal || 0}</div>
        <div><strong>Discount:</strong> ${selectedQuery.discount || 0}</div>
        <div><strong>Total Price:</strong> ${selectedQuery.totalPrice || 0}</div>
      </div>
    </div>

    {/* Created & Last Updated */}
    <div className="flex items-start">
      <Calendar className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
      <div>
        <div>Created: {formatDate(selectedQuery.createdAt)}</div>
        <div style={{ color: colors.lightText }}>
          Last Updated: {formatDate(selectedQuery.lastUpdated)}
        </div>
      </div>
    </div>
  </div>
</div>

                {/* <div 
                  className="bg-gray-50 p-4 rounded-md mb-6"
                  style={{ backgroundColor: colors.background }}
                >
                  <h3 className="font-medium mb-3">Customer Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Users className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
                      <div>
                        <div className="font-medium">{selectedQuery.name || 'Anonymous'}</div>
                        <div style={{ color: colors.lightText }}>
                          {selectedQuery.
tourTitle
 || 'No tour type specified'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
                      <div>
                        <div>{selectedQuery.email || 'No email provided'}</div>
                        {selectedQuery.email && (
                          <button
                            className="text-sm mt-1"
                            style={{ color: colors.primary }}
                            onClick={() => setIsSendingEmail(true)}
                          >
                            Send Email Response
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {selectedQuery.phone && (
                      <div className="flex items-start">
                        <Phone className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
                        <div>{selectedQuery.phone}</div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Calendar className="mr-3 mt-1" size={18} style={{ color: colors.primary }} />
                      <div>
                        <div>Created: {formatDate(selectedQuery.createdAt)}</div>
                        <div style={{ color: colors.lightText }}>
                          Last Updated: {formatDate(selectedQuery.lastUpdated)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                
                {/* Query Message */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Query Message</h3>
                  <div 
                    className="p-4 rounded-md border"
                    style={{ borderColor: colors.border }}
                  >
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {selectedQuery.message || 'No message provided'}
                    </p>
                  </div>
                </div>
                
                {/* Email Response Form */}
                {isSendingEmail && (
                  <form onSubmit={handleSendEmail} className="mb-6">
                    <h3 className="font-medium mb-3">Send Email Response</h3>
                    
                    <div className="space-y-4 p-4 rounded-md border" style={{ borderColor: colors.border }}>
                      <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                          type="text"
                          value={emailForm.subject}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full p-2 border rounded-md"
                          style={{ borderColor: colors.border }}
                          placeholder="RE: Your Tour Inquiry"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                          value={emailForm.message}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          className="w-full p-2 border rounded-md"
                          style={{ borderColor: colors.border }}
                          placeholder="Thank you for your inquiry..."
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          className="px-4 py-2 rounded-md border text-sm"
                          style={{ borderColor: colors.border }}
                          onClick={() => setIsSendingEmail(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-md text-white text-sm flex items-center"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Send size={16} className="mr-2" />
                          Send Email
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                
                {/* Notes Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Notes & Updates</h3>
                    <button
                      className="text-sm px-2 py-1 rounded-md"
                      style={{ color: colors.primary }}
                      onClick={() => setIsAddingNote(true)}
                    >
                      + Add Note
                    </button>
                  </div>
                  
                  {isAddingNote && (
                    <div className="mb-4 p-4 rounded-md border" style={{ borderColor: colors.border }}>
                      {/* <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded-md mb-3"
                        style={{ borderColor: colors.border }}
                        placeholder="Enter your note here..."
                      /> */}
                  {/* <textarea
  defaultValue={noteRef.current} // Use ref to avoid unnecessary state updates
  onInput={handleNoteChange} // Use onInput instead of onChange
  rows={3}
  className="w-full p-2 border rounded-md mb-3"
  style={{ borderColor: colors.border }}
  placeholder="Enter your note here..."
/> */}

<textarea
  value={newNote}
  onChange={(e) => {
    console.log("⌨ Updating Note:", e.target.value); // Debugging log
    setNewNote(e.target.value);
  }}
  rows={3}
  className="w-full p-2 border rounded-md mb-3"
  style={{ borderColor: colors.border }}
  placeholder="Enter your note here..."
/>


                      
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 rounded-md border text-sm"
                          style={{ borderColor: colors.border }}
                          onClick={() => {
                            setIsAddingNote(false);
                            setNewNote('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 rounded-md text-white text-sm"
                          style={{ backgroundColor: colors.primary }}
                          onClick={handleAddNote}
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {selectedQuery.notes && selectedQuery.notes.length > 0 ? (
                      selectedQuery.notes.map((note, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-md"
                          style={{ backgroundColor: colors.background }}
                        >
                          <div className="flex justify-between items-start">
                            <div style={{ color: colors.lightText }} className="text-sm">
                              {note.createdBy} • {formatDate(note.createdAt)}
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{note.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6" style={{ color: colors.lightText }}>
                        <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                        <p>No notes added yet</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between border-t pt-6 mt-6" style={{ borderColor: colors.border }}>
                  <button
                    className="px-4 py-2 rounded-md text-white text-sm bg-red-600 hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(selectedQuery._id)}
                  >
                    {confirmDelete === selectedQuery._id ? 'Confirm Delete' : 'Delete Query'}
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 rounded-md border text-sm"
                      style={{ borderColor: colors.border }}
                      onClick={() => setSelectedQuery(null)}
                    >
                      Close
                    </button>
                    
                    {selectedQuery.status !== 'Completed' && (
                      <button
                        className="px-4 py-2 rounded-md text-white text-sm"
                        style={{ backgroundColor: colors.success }}
                        onClick={() => handleStatusChange(selectedQuery._id, 'Completed')}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );

  // Main Render
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.background }}>
      {/* Notification */}
      <Notification />
      
      {/* Export Options Modal */}
      <ExportOptionsModal />
      
      {/* Query Detail Panel */}
      <QueryDetailPanel />
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tour Inquiries Management</h1>
        
        <div className="flex gap-3">
          <button
            className="flex items-center px-4 py-2 rounded-md text-sm border transition-colors"
            style={{ borderColor: colors.border }}
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
          
          <button
            className="flex items-center px-4 py-2 rounded-md text-sm border transition-colors"
            style={{ borderColor: colors.border }}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          
          <button
            className="flex items-center px-4 py-2 rounded-md text-sm text-white"
            style={{ backgroundColor: colors.primary }}
            onClick={() => setShowExportOptions(true)}
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      {showStats && <StatsCards />}
      
      {/* Filter Panel */}
      <FilterPanel />
      
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.lightText }} />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            style={{ borderColor: colors.border }}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={resultsPerPage}
            onChange={(e) => setResultsPerPage(Number(e.target.value))}
            className="p-2 border rounded-md"
            style={{ borderColor: colors.border }}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>
      
      {/* Bulk Actions */}
      <BulkActionsBar />
      
      {/* Queries Table */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : currentQueries.length > 0 ? (
        <QueriesTable />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default TourQueriesManagement;