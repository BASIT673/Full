// import React from 'react';
import AdminCarManager from './AdminCar';
// import AdminDestinations from './AdminDestinations';
// import AdminDestinations from './AdminDestinatons';
import DestinationManager from "./AdminDestinatons"
import AdminSearch from './AdminSearch';
import BlogPostManager from './BlogPostManager';
// import TourManagement from './TourManagement';
// import TourManager from './AdminTours';
// import SaleD from "./SalesDashboard"
import SalesDashboard from './SalesDashboard';

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, Admin! Here you can perform CRUD operations.</p>
     
      
//     </div>
//   );
// };

// export default AdminDashboard;
// const AdminDashboard = () => {
//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
//       <p className="text-lg mb-6 text-center text-gray-700">
//         Welcome, Admin! Here you can perform CRUD operations.
//       </p>

     

//       {/* You can add more sections as needed */}
// <AdminDestinations/>
// <AdminSearch/>
// <AdminTour/>
// <AdminCarManager/>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState } from 'react';
// import { Settings, Map, Search, Car, Users, ChevronDown, Bell } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const AdminDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('overview');
//   const [notifications, setNotifications] = useState(3);
  
//   const stats = [
//     { title: 'Total Destinations', value: '124', change: '+12%' },
//     { title: 'Active Tours', value: '45', change: '+5%' },
//     { title: 'Total Bookings', value: '1,234', change: '+23%' },
//     { title: 'Available Cars', value: '67', change: '-2%' }
//   ];

//   const renderActiveComponent = () => {
//     switch(activeComponent) {
//       case 'destinations':
//         return <AdminDestinations />;
//       case 'search':
//         return <AdminSearch />;
//       case 'tours':
//         return <AdminTour />;
//       case 'cars':
//         return <AdminCarManager />;
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, index) => (
//               <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
//                 <CardContent className="p-6">
//                   <p className="text-gray-600 text-sm">{stat.title}</p>
//                   <p className="text-3xl font-bold mt-2">{stat.value}</p>
//                   <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
//                     {stat.change} from last month
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-200">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <button className="relative" onClick={() => setNotifications(0)}>
//                 <Bell className="h-6 w-6 text-gray-600" />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications}
//                   </span>
//                 )}
//               </button>
//               <div className="flex items-center space-x-2">
//                 <img
//                   className="h-8 w-8 rounded-full"
//                   src="/api/placeholder/32/32"
//                   alt="Admin"
//                 />
//                 <span className="text-gray-700">Admin</span>
//                 <ChevronDown className="h-4 w-4 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <button
//             onClick={() => setActiveComponent('destinations')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'destinations'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Map className="h-6 w-6 mb-2" />
//             <span>Destinations</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('search')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'search'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Search className="h-6 w-6 mb-2" />
//             <span>Search</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('tours')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'tours'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Users className="h-6 w-6 mb-2" />
//             <span>Tours</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('cars')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'cars'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Car className="h-6 w-6 mb-2" />
//             <span>Cars</span>
//           </button>
//         </div>

//         {/* Alert for new features or important notifications */}
//         <Alert className="mb-8">
//           <AlertDescription>
//             Welcome to the new dashboard! We've added new features to help you manage your travel business more efficiently.
//           </AlertDescription>
//         </Alert>

//         {/* Active Component */}
//         <div className="bg-white rounded-lg shadow p-6">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import  { useState } from 'react';
// import { Settings, Map, Search, Car, Users, ChevronDown, Bell } from 'lucide-react';
// import AdminTourManager from './AdminSearch';
import TourManager from './AdminTours';
import TourManagement from './TourManagement';
import BlogManager from './BlogManagers';

// const AdminDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('overview');
//   const [notifications, setNotifications] = useState(3);
  
//   const stats = [
//     { title: 'Total Destinations', value: '124', change: '+12%' },
//     { title: 'Active Tours', value: '45', change: '+5%' },
//     { title: 'Total Bookings', value: '1,234', change: '+23%' },
//     { title: 'Available Cars', value: '67', change: '-2%' }
//   ];

//   const renderActiveComponent = () => {
//     switch(activeComponent) {
//       case 'destinations':
//         return <DestinationManager />;
//       case 'search':
//         return <AdminSearch />;
//       case 'tours':
//         return <TourManager />;
//       case 'cars':
//         return <AdminCarManager />;
       
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="hover:shadow-lg transition-shadow duration-300 p-6 bg-white rounded-lg">
//                 <p className="text-gray-600 text-sm">{stat.title}</p>
//                 <p className="text-3xl font-bold mt-2">{stat.value}</p>
//                 <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
//                   {stat.change} from last month
//                 </p>
//               </div>
//             ))}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-200">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <button className="relative" onClick={() => setNotifications(0)}>
//                 <Bell className="h-6 w-6 text-gray-600" />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications}
//                   </span>
//                 )}
//               </button>
//               <div className="flex items-center space-x-2">
//                 <img
//                   className="h-8 w-8 rounded-full"
//                   src="/api/placeholder/32/32"
//                   alt="Admin"
//                 />
//                 <span className="text-gray-700">Admin</span>
//                 <ChevronDown className="h-4 w-4 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <button
//             onClick={() => setActiveComponent('destinations')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'destinations'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Map className="h-6 w-6 mb-2" />
//             <span>Destinations</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('search')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'search'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Search className="h-6 w-6 mb-2" />
//             <span>Search</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('tours')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'tours'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Users className="h-6 w-6 mb-2" />
//             <span>Tours</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('cars')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'cars'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Car className="h-6 w-6 mb-2" />
//             <span>Cars</span>
//           </button>

          
//           <button
//             onClick={() => setActiveComponent('cars')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'cars'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Car className="h-6 w-6 mb-2" />
//             <span>BlogPost</span>
//           </button>
//         </div>

//         {/* Active Component */}
//         <div className="bg-white rounded-lg shadow p-6">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// const AdminDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('overview');
//   const [notifications, setNotifications] = useState(3);
  
//   const stats = [
//     { title: 'Total Destinations', value: '124', change: '+12%' },
//     { title: 'Active Tours', value: '45', change: '+5%' },
//     { title: 'Total Bookings', value: '1,234', change: '+23%' },
//     { title: 'Available Cars', value: '67', change: '-2%' }
//   ];

//   const renderActiveComponent = () => {
//     switch(activeComponent) {
//       case 'destinations':
//         return <DestinationManager />;
        
//       case 'search':
//         return <AdminSearch />;
//       case 'tours':
//         return <TourManager />;
//       case 'cars':
//         return <AdminCarManager />;
//       case 'blogPost':
//         return <BlogPostManager />;
//       case 'blog':
//         return <BlogManager />;
//       case 'budgetOptimizer':
//         return <TourManagement />;
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="hover:shadow-lg transition-shadow duration-300 p-6 bg-white rounded-lg">
//                 <p className="text-gray-600 text-sm">{stat.title}</p>
//                 <p className="text-3xl font-bold mt-2">{stat.value}</p>
//                 <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
//                   {stat.change} from last month
//                 </p>
//               </div>
//             ))}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-200">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <button className="relative" onClick={() => setNotifications(0)}>
//                 <Bell className="h-6 w-6 text-gray-600" />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications}
//                   </span>
//                 )}
//               </button>
//               <div className="flex items-center space-x-2">
//                 <img
//                   className="h-8 w-8 rounded-full"
//                   src="/api/placeholder/32/32"
//                   alt="Admin"
//                 />
//                 <span className="text-gray-700">Admin</span>
//                 <ChevronDown className="h-4 w-4 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <button
//             onClick={() => setActiveComponent('destinations')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'destinations'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Map className="h-6 w-6 mb-2" />
//             <span>Destinations</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('search')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'search'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Search className="h-6 w-6 mb-2" />
//             <span>Search</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('tours')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'tours'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Users className="h-6 w-6 mb-2" />
//             <span>Tours</span>
//           </button>
//           <button
//             onClick={() => setActiveComponent('cars')}
//             className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
//               activeComponent === 'cars'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-blue-50'
//             }`}
//           >
//             <Car className="h-6 w-6 mb-2" />
//             <span>Cars</span>
//           </button>
//           <button onClick={() => setActiveComponent('blogPost')}>BlogPost</button>
//           <button onClick={() => setActiveComponent('blog')}>Blog</button>
//           <button onClick={() => setActiveComponent('budgetOptimizer')}>Budget Optimizer</button>
//         </div>

//         {/* Active Component */}
//         <div className="bg-white rounded-lg shadow p-6">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState } from 'react';
import { Bell, ChevronDown, Map, Search, Users, Car, BarChart, FileText, DollarSign, Settings, Home, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  
  const stats = [
    { title: 'Total Destinations', value: '124', change: '+12%', icon: <Map className="h-8 w-8 text-indigo-400" /> },
    { title: 'Active Tours', value: '45', change: '+5%', icon: <Users className="h-8 w-8 text-emerald-400" /> },
    { title: 'Total Bookings', value: '1,234', change: '+23%', icon: <BarChart className="h-8 w-8 text-blue-400" /> },
    { title: 'Available Cars', value: '67', change: '-2%', icon: <Car className="h-8 w-8 text-orange-400" /> }
  ];

  const renderActiveComponent = () => {
    switch(activeComponent) {
      case 'destinations':
        return <DestinationManager />;
      case 'search':
        return <AdminSearch />;
      case 'tours':
        return <TourManager />;
      case 'cars':
        return <AdminCarManager />;
      case 'blogPost':
        return <BlogPostManager />;
      case 'blog':
        return <BlogManager />;
      case 'budgetOptimizer':
        return <TourManagement />;
      case 'sales':
        return <SalesDashboard />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="hover:shadow-xl transition-all duration-300 p-6 bg-white rounded-xl border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
                    <p className={`text-sm mt-2 font-medium ${stat.change.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="px-6 py-5 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Travel Admin</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveComponent('overview')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'overview' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Home className="h-5 w-5 mr-3" />
              <span>Overview</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('destinations')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'destinations' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Map className="h-5 w-5 mr-3" />
              <span>Destinations</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('tours')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'tours' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Users className="h-5 w-5 mr-3" />
              <span>Trending Tours</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('cars')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'cars' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Car className="h-5 w-5 mr-3" />
              <span>Cars</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('blog')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'blog' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <FileText className="h-5 w-5 mr-3" />
              <span>Blog</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('blogPost')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'blogPost' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <FileText className="h-5 w-5 mr-3" />
              <span>Blog Posts</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('budgetOptimizer')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'budgetOptimizer' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Settings className="h-5 w-5 mr-3" />
              <span>Featured Tourr</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('sales')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'sales' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <DollarSign className="h-5 w-5 mr-3" />
              <span>Sales Dashboard</span>
            </button>
            
            <button 
              onClick={() => setActiveComponent('search')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeComponent === 'search' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}>
              <Search className="h-5 w-5 mr-3" />
              <span>Search</span>
            </button>
          </nav>
        </div>
        
        <div className="px-6 py-4 border-t border-indigo-700">
          <button className="flex items-center text-indigo-200 hover:text-white">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
              </h1>
              <p className="text-sm text-gray-500">Welcome back, Admin</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-6 w-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* Active Component */}
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

// Sample SalesDashboard component
const SalesDashboardd= () => {
  const salesData = [
    { month: 'Jan', revenue: 42500, target: 40000 },
    { month: 'Feb', revenue: 47800, target: 42000 },
    { month: 'Mar', revenue: 51200, target: 45000 },
    { month: 'Apr', revenue: 49600, target: 48000 },
  ];

  const topProducts = [
    { name: 'Paris Weekend', sales: 124, revenue: 24800 },
    { name: 'Tokyo Express', sales: 98, revenue: 29400 },
    { name: 'New York City Tour', sales: 87, revenue: 21750 },
    { name: 'Bali Retreat', sales: 76, revenue: 30400 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium opacity-80">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$189,240</p>
          <div className="flex items-center mt-2">
            <span className="text-green-300 font-medium">+12.5%</span>
            <span className="text-sm ml-2 opacity-80">vs last quarter</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium opacity-80">New Customers</h3>
          <p className="text-3xl font-bold mt-2">584</p>
          <div className="flex items-center mt-2">
            <span className="text-green-300 font-medium">+8.2%</span>
            <span className="text-sm ml-2 opacity-80">vs last quarter</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium opacity-80">Conversion Rate</h3>
          <p className="text-3xl font-bold mt-2">8.7%</p>
          <div className="flex items-center mt-2">
            <span className="text-green-300 font-medium">+1.2%</span>
            <span className="text-sm ml-2 opacity-80">vs last quarter</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Performance</h3>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>This Quarter</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end space-x-6 mb-4">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex justify-center mb-2">
                  <div 
                    className="w-full bg-indigo-600 rounded-t-lg" 
                    style={{ 
                      height: `${(item.revenue / 60000) * 180}px`,
                    }}
                  ></div>
                  <div 
                    className="absolute border-t-2 border-dashed border-red-400 w-full"
                    style={{ 
                      bottom: `${(item.target / 60000) * 180}px`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">{item.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-0 border-t-2 border-dashed border-red-400 mr-2"></div>
              <span className="text-sm text-gray-600">Target</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Top Selling Tours</h3>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-4 font-medium">Tour Name</th>
                <th className="pb-4 font-medium">Sales</th>
                <th className="pb-4 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-4">
                    <div className="font-medium text-gray-800">{product.name}</div>
                  </td>
                  <td className="py-4 text-gray-600">{product.sales}</td>
                  <td className="py-4 text-gray-600">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
          <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium">Export</button>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-gray-200">
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Product</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="font-medium text-gray-800">Customer {index + 1}</div>
                  </div>
                </td>
                <td className="py-4 text-gray-600">
                  {["Paris Weekend", "Tokyo Express", "Bali Retreat", "New York City Tour", "London Explorer"][index]}
                </td>
                <td className="py-4 text-gray-600">
                  {["Feb 12, 2025", "Feb 10, 2025", "Feb 8, 2025", "Feb 5, 2025", "Feb 1, 2025"][index]}
                </td>
                <td className="py-4 text-gray-600">
                  ${[240, 350, 480, 290, 320][index]}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-green-100 text-green-800"][index]
                  }`}>
                    {["Completed", "Processing", "Completed", "Pending", "Completed"][index]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// These are placeholder components - replace with your actual components
// const DestinationManager = () => <div>Destination Management Component</div>;
// const AdminSearch = () => <div>Admin Search Component</div>;
// const TourManager = () => <div>Tour Manager Component</div>;
// const AdminCarManager = () => <div>Car Manager Component</div>;
// const BlogPostManager = () => <div>Blog Post Manager Component</div>;
// const BlogManager = () => <div>Blog Manager Component</div>;
// const TourManagement = () => <div>Tour Management Component</div>;

export default AdminDashboard;