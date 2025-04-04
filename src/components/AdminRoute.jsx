import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { AdminAuthContext } from './AdminAuthContext';
import { AdminAuthContext } from './AdminAuthProvider';
import AdminDashboard from './AdminDashboard';

const AdminRoute = () => {
  const { adminAuth } = useContext(AdminAuthContext);
  
  if (adminAuth.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to admin login
  if (!adminAuth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If authenticated, render the child routes
  return <AdminDashboard/>;
};

export default AdminRoute;