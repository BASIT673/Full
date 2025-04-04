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
// import React, { useState } from 'react';
// import { Bell, ChevronDown, Map, Search, Users, Car, BarChart, FileText, DollarSign, Settings, Home, LogOut } from 'lucide-react';
// import React, { useState, useEffect } from 'react';
// import { 
//   Home, Map, Users, BarChart, Car, FileText, Settings, 
//   DollarSign, Search, LogOut, Bell, ChevronDown, Menu, X,
//   Calendar, Tag, MessageSquare, UserPlus, Package, Compass, Briefcase
// } from 'lucide-react';
import BookingManager from './BookingManger';
import PromoCodeManager from './PromodCodeManger';
import TourQueriesManagement from './TourQueriesManagement';
import AgentAdmin from './AgentAdmin';
import TravelPackageCRUD from './TravelPackageCRUD';
import PackageManagement from './PackageMangement';
import DiscoverPackageCRUD from './DiscoverPackageCRUD';


import React, { useState } from 'react';
import { 
  Home, Map, Users, BarChart, Car, FileText, Settings, 
  DollarSign, Search, LogOut, Bell, ChevronDown, Menu, X,
  Calendar, Tag, MessageSquare, UserPlus, Package, Compass, Briefcase,
  ShoppingCart, PieChart, CreditCard, Headphones, User
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('overview');
  const [activeCategory, setActiveCategory] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation categories
  const navigationCategories = [
    {
      name: 'overview',
      label: 'Overview',
      icon: <Home className="h-5 w-5 mr-3" />,
      isCategory: false
    },
    {
      name: 'destinations',
      label: 'Destinations',
      icon: <Map className="h-5 w-5 mr-3" />,
      isCategory: false
    },
    {
      name: 'tourManagement',
      label: 'Tour Management',
      icon: <Users className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'tours', label: 'Trending Tours', icon: <Users className="h-5 w-5 mr-3" /> },
        { name: 'budgetOptimizer', label: 'Featured Tours', icon: <Settings className="h-5 w-5 mr-3" /> },
        { name: 'tourQueries', label: 'Tour Queries', icon: <MessageSquare className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'bookingManagement',
      label: 'Booking Management',
      icon: <Calendar className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5 mr-3" /> },
        { name: 'promoCodes', label: 'Promo Codes', icon: <Tag className="h-5 w-5 mr-3" /> },
        { name: 'cars', label: 'Cars', icon: <Car className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'packageManagementCategory',
      label: 'Package Management',
      icon: <Package className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'packageManagement', label: 'All Packages', icon: <Package className="h-5 w-5 mr-3" /> },
        { name: 'discoverPackage', label: 'Discover Packages', icon: <Compass className="h-5 w-5 mr-3" /> },
        { name: 'travelPackage', label: 'Travel Packages', icon: <Briefcase className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'agentManagement',
      label: 'Agent Management',
      icon: <UserPlus className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'agentAdmin', label: 'Agent Admin', icon: <UserPlus className="h-5 w-5 mr-3" /> },
        { name: 'agentPerformance', label: 'Performance', icon: <PieChart className="h-5 w-5 mr-3" /> },
        { name: 'agentCommission', label: 'Commissions', icon: <CreditCard className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'salesAnalytics',
      label: 'Sales & Analytics',
      icon: <DollarSign className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'sales', label: 'Sales Dashboard', icon: <DollarSign className="h-5 w-5 mr-3" /> },
        { name: 'revenue', label: 'Revenue', icon: <BarChart className="h-5 w-5 mr-3" /> },
        { name: 'customerData', label: 'Customer Data', icon: <User className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'contentManagement',
      label: 'Content Management',
      icon: <FileText className="h-5 w-5 mr-3" />,
      isCategory: true,
      items: [
        { name: 'blog', label: 'Blog', icon: <FileText className="h-5 w-5 mr-3" /> },
        { name: 'blogPost', label: 'Blog Posts', icon: <FileText className="h-5 w-5 mr-3" /> },
      ]
    },
    {
      name: 'search',
      label: 'Search',
      icon: <Search className="h-5 w-5 mr-3" />,
      isCategory: false
    },
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
      case 'bookings':
        return <BookingManager />;
      case 'promoCodes':
        return <PromoCodeManager />;
      case 'tourQueries':
        return <TourQueriesManagement />;
      case 'agentAdmin':
        return <AgentAdmin />;
      case 'packageManagement':
        return <PackageManagement />;
      case 'discoverPackage':
        return <DiscoverPackageCRUD />;
      case 'travelPackage':
        return <TravelPackageCRUD />;
      case 'revenue':
        // return <RevenueAnalytics />;
      case 'customerData':
        // return <CustomerDataAnalytics />;
      case 'agentPerformance':
        // return <AgentPerformanceMetrics />;
      case 'agentCommission':
        // return <AgentCommissionManager />;
      case 'overview':
      default:
        // return <DynamicDashboard />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory('');
    } else {
      setActiveCategory(categoryName);
    }
  };

  const handleItemClick = (itemName) => {
    setActiveComponent(itemName);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 z-30 bg-orange-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-orange-700 flex items-center justify-between">
          <h1 className="text-xl font-bold">Travel Admin</h1>
          <button 
            className="text-white"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navigationCategories.map((category) => (
              <div key={category.name}>
                {category.isCategory ? (
                  <div>
                    <button 
                      onClick={() => handleCategoryClick(category.name)}
                      className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all ${
                        activeCategory === category.name 
                          ? 'bg-orange-700 text-white' 
                          : 'text-orange-200 hover:bg-orange-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <span className="text-sm">{category.label}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transform transition-transform ${activeCategory === category.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeCategory === category.name && (
                      <div className="pl-4 mt-1 space-y-1">
                        {category.items.map((item) => (
                          <button 
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${
                              activeComponent === item.name 
                                ? 'bg-orange-600 text-white' 
                                : 'text-orange-200 hover:bg-orange-700'
                            }`}
                          >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleItemClick(category.name)}
                    className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${
                      activeComponent === category.name 
                        ? 'bg-orange-700 text-white' 
                        : 'text-orange-200 hover:bg-orange-700'
                    }`}
                  >
                    {category.icon}
                    <span className="text-sm">{category.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="px-6 py-4 border-t border-orange-700">
          <button className="flex items-center text-orange-200 hover:text-white">
            <LogOut className="h-5 w-5 mr-3" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button 
                className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1).replace(/([A-Z])/g, ' $1')}
                </h1>
                <p className="text-xs md:text-sm text-gray-500">Welcome back, Admin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="relative">
                <button 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-5 md:h-6 w-5 md:w-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 md:h-5 w-4 md:w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          {/* Active Component */}
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

// Placeholder components - These would be implemented separately
// const DestinationManager = () => <div>Destination Manager Component</div>;
// const AdminSearch = () => <div>Admin Search Component</div>;
// const TourManager = () => <div>Tour Manager Component</div>;
// const AdminCarManager = () => <div>Admin Car Manager Component</div>;
// const BlogPostManager = () => <div>Blog Post Manager Component</div>;
// const BlogManager = () => <div>Blog Manager Component</div>;
// const TourManagement = () => <div>Tour Management Component</div>;
// const SalesDashboard = () => <div>Sales Dashboard Component</div>;
// const BookingManager = () => <div>Booking Manager Component</div>;
// const PromoCodeManager = () => <div>Promo Code Manager Component</div>;
// const TourQueriesManagement = () => <div>Tour Queries Management Component</div>;
// const AgentAdmin = () => <div>Agent Admin Component</div>;
// const PackageManagement = () => <div>Package Management Component</div>;
// const DiscoverPackageCRUD = () => <div>Discover Package CRUD Component</div>;
// const TravelPackageCRUD = () => <div>Travel Package CRUD Component</div>;
// const RevenueAnalytics = () => <div>Revenue Analytics Component</div>;
// const CustomerDataAnalytics = () => <div>Customer Data Analytics Component</div>;
// const AgentPerformanceMetrics = () => <div>Agent Performance Metrics Component</div>;
// const AgentCommissionManager = () => <div>Agent Commission Manager Component</div>;
// const DynamicDashboard = () => <div>Dynamic Dashboard Component</div>;

export default AdminDashboard;
// const AdminDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('overview');
//   const [notifications, setNotifications] = useState(3);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   // Handle closing sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };
    
//     // Set initial state
//     handleResize();
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const stats = [
//     { title: 'Total Destinations', value: '124', change: '+12%', icon: <Map className="h-8 w-8 text-indigo-400" /> },
//     { title: 'Active Tours', value: '45', change: '+5%', icon: <Users className="h-8 w-8 text-emerald-400" /> },
//     { title: 'Total Bookings', value: '1,234', change: '+23%', icon: <BarChart className="h-8 w-8 text-blue-400" /> },
//     { title: 'Available Cars', value: '67', change: '-2%', icon: <Car className="h-8 w-8 text-orange-400" /> }
//   ];

//   const navigationItems = [
//     { name: 'overview', label: 'Overview', icon: <Home className="h-5 w-5 mr-3" /> },
//     { name: 'destinations', label: 'Destinations', icon: <Map className="h-5 w-5 mr-3" /> },
//     { name: 'tours', label: 'Trending Tours', icon: <Users className="h-5 w-5 mr-3" /> },
//     { name: 'cars', label: 'Cars', icon: <Car className="h-5 w-5 mr-3" /> },
//     { name: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5 mr-3" /> },
//     { name: 'promoCodes', label: 'Promo Codes', icon: <Tag className="h-5 w-5 mr-3" /> },
//     { name: 'tourQueries', label: 'Tour Queries', icon: <MessageSquare className="h-5 w-5 mr-3" /> },
//     { name: 'agentAdmin', label: 'Agent Admin', icon: <UserPlus className="h-5 w-5 mr-3" /> },
//     { name: 'packageManagement', label: 'Package Management', icon: <Package className="h-5 w-5 mr-3" /> },
//     { name: 'discoverPackage', label: 'Discover Packages', icon: <Compass className="h-5 w-5 mr-3" /> },
//     { name: 'travelPackage', label: 'Travel Packages', icon: <Briefcase className="h-5 w-5 mr-3" /> },
//     { name: 'blog', label: 'Blog', icon: <FileText className="h-5 w-5 mr-3" /> },
//     { name: 'blogPost', label: 'Blog Posts', icon: <FileText className="h-5 w-5 mr-3" /> },
//     { name: 'budgetOptimizer', label: 'Featured Tours', icon: <Settings className="h-5 w-5 mr-3" /> },
//     { name: 'sales', label: 'Sales Dashboard', icon: <DollarSign className="h-5 w-5 mr-3" /> },
//     { name: 'search', label: 'Search', icon: <Search className="h-5 w-5 mr-3" /> },
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
//       case 'sales':
//         return <SalesDashboard />;
//       case 'bookings':
//         return <BookingManager />;
//       case 'promoCodes':
//         return <PromoCodeManager />;
//       case 'tourQueries':
//         return <TourQueriesManagement />;
//       case 'agentAdmin':
//         return <AgentAdmin />;
//       case 'packageManagement':
//         return <PackageManagement />;
//       case 'discoverPackage':
//         return <DiscoverPackageCRUD />;
//       case 'travelPackage':
//         return <TravelPackageCRUD />;
//       default:
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="hover:shadow-xl transition-all duration-300 p-4 md:p-6 bg-white rounded-xl border border-gray-100">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-gray-600 text-xs md:text-sm font-medium">{stat.title}</p>
//                     <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2 text-gray-800">{stat.value}</p>
//                     <p className={`text-xs md:text-sm mt-1 md:mt-2 font-medium ${stat.change.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
//                       {stat.change} from last month
//                     </p>
//                   </div>
//                   <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
//                     {stat.icon}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div 
//         className={`fixed lg:static inset-y-0 left-0 w-64 z-30 bg-indigo-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         }`}
//       >
//         <div className="px-6 py-5 border-b border-indigo-700 flex items-center justify-between">
//           <h1 className="text-xl font-bold">Travel Admin</h1>
//           <button 
//             className="text-white lg:hidden"
//             onClick={toggleSidebar}
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>
        
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           <nav className="space-y-1">
//             {navigationItems.map((item) => (
//               <button 
//                 key={item.name}
//                 onClick={() => {
//                   setActiveComponent(item.name);
//                   if (window.innerWidth < 1024) {
//                     setSidebarOpen(false);
//                   }
//                 }}
//                 className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${
//                   activeComponent === item.name 
//                     ? 'bg-indigo-700 text-white' 
//                     : 'text-indigo-200 hover:bg-indigo-700'
//                 }`}
//               >
//                 {item.icon}
//                 <span className="text-sm">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>
        
//         <div className="px-6 py-4 border-t border-indigo-700">
//           <button className="flex items-center text-indigo-200 hover:text-white">
//             <LogOut className="h-5 w-5 mr-3" />
//             <span className="text-sm">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation */}
//         <header className="bg-white shadow-sm border-b border-gray-200">
//           <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
//             <div className="flex items-center">
//               <button 
//                 className="lg:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
//                 onClick={toggleSidebar}
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <div>
//                 <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//                   {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1).replace(/([A-Z])/g, ' $1')}
//                 </h1>
//                 <p className="text-xs md:text-sm text-gray-500">Welcome back, Admin</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3 md:space-x-6">
//               <div className="relative">
//                 <button 
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                   onClick={() => setNotifications(0)}
//                 >
//                   <Bell className="h-5 md:h-6 w-5 md:w-6" />
//                   {notifications > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 md:h-5 w-4 md:w-5 flex items-center justify-center">
//                       {notifications}
//                     </span>
//                   )}
//                 </button>
//               </div>
              
//               <div className="flex items-center space-x-2 md:space-x-3">
//                 <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
//                   A
//                 </div>
//                 <div className="hidden md:block">
//                   <p className="text-sm font-medium text-gray-700">Admin User</p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//                 <ChevronDown className="h-4 w-4 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
//           {/* Active Component */}
//           {renderActiveComponent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// Placeholder components - These would be implemented separately
// const DestinationManager = () => <div>Destination Manager Component</div>;
// const AdminSearch = () => <div>Admin Search Component</div>;
// const TourManager = () => <div>Tour Manager Component</div>;
// const AdminCarManager = () => <div>Admin Car Manager Component</div>;
// const BlogPostManager = () => <div>Blog Post Manager Component</div>;
// const BlogManager = () => <div>Blog Manager Component</div>;
// const TourManagement = () => <div>Tour Management Component</div>;
// const SalesDashboard = () => <div>Sales Dashboard Component</div>;
// const BookingManager = () => <div>Booking Manager Component</div>;
// const PromoCodeManager = () => <div>Promo Code Manager Component</div>;
// const TourQueriesManagement = () => <div>Tour Queries Management Component</div>;
// const AgentAdmin = () => <div>Agent Admin Component</div>;
// const PackageManagement = () => <div>Package Management Component</div>;
// const DiscoverPackageCRUD = () => <div>Discover Package CRUD Component</div>;
// const TravelPackageCRUD = () => <div>Travel Package CRUD Component</div>;

// export default AdminDashboard;
// const AdminDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('overview');
//   const [notifications, setNotifications] = useState(3);
  
//   const stats = [
//     { title: 'Total Destinations', value: '124', change: '+12%', icon: <Map className="h-8 w-8 text-indigo-400" /> },
//     { title: 'Active Tours', value: '45', change: '+5%', icon: <Users className="h-8 w-8 text-emerald-400" /> },
//     { title: 'Total Bookings', value: '1,234', change: '+23%', icon: <BarChart className="h-8 w-8 text-blue-400" /> },
//     { title: 'Available Cars', value: '67', change: '-2%', icon: <Car className="h-8 w-8 text-orange-400" /> }
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
//       case 'sales':
//         return <SalesDashboard />;
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="hover:shadow-xl transition-all duration-300 p-6 bg-white rounded-xl border border-gray-100">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
//                     <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
//                     <p className={`text-sm mt-2 font-medium ${stat.change.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
//                       {stat.change} from last month
//                     </p>
//                   </div>
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     {stat.icon}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-800 text-white flex flex-col">
//         <div className="px-6 py-5 border-b border-indigo-700">
//           <h1 className="text-xl font-bold">Travel Admin</h1>
//         </div>
        
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           <nav className="space-y-2">
//             <button 
//               onClick={() => setActiveComponent('overview')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'overview' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Home className="h-5 w-5 mr-3" />
//               <span>Overview</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('destinations')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'destinations' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Map className="h-5 w-5 mr-3" />
//               <span>Destinations</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('tours')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'tours' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Users className="h-5 w-5 mr-3" />
//               <span>Trending Tours</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('cars')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'cars' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Car className="h-5 w-5 mr-3" />
//               <span>Cars</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('blog')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'blog' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <FileText className="h-5 w-5 mr-3" />
//               <span>Blog</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('blogPost')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'blogPost' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <FileText className="h-5 w-5 mr-3" />
//               <span>Blog Posts</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('budgetOptimizer')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'budgetOptimizer' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Settings className="h-5 w-5 mr-3" />
//               <span>Featured Tourr</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('sales')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'sales' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <DollarSign className="h-5 w-5 mr-3" />
//               <span>Sales Dashboard</span>
//             </button>
            
//             <button 
//               onClick={() => setActiveComponent('search')}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
//                 activeComponent === 'search' 
//                   ? 'bg-indigo-700 text-white' 
//                   : 'text-indigo-200 hover:bg-indigo-700'
//               }`}>
//               <Search className="h-5 w-5 mr-3" />
//               <span>Search</span>
//             </button>
//           </nav>
//         </div>
        
//         <div className="px-6 py-4 border-t border-indigo-700">
//           <button className="flex items-center text-indigo-200 hover:text-white">
//             <LogOut className="h-5 w-5 mr-3" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation */}
//         <header className="bg-white shadow-sm border-b border-gray-200">
//           <div className="px-6 py-4 flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
//               </h1>
//               <p className="text-sm text-gray-500">Welcome back, Admin</p>
//             </div>
            
//             <div className="flex items-center space-x-6">
//               <div className="relative">
//                 <button 
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                   onClick={() => setNotifications(0)}
//                 >
//                   <Bell className="h-6 w-6" />
//                   {notifications > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {notifications}
//                     </span>
//                   )}
//                 </button>
//               </div>
              
//               <div className="flex items-center space-x-3">
//                 <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
//                   A
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Admin User</p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//                 <ChevronDown className="h-4 w-4 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
//           {/* Active Component */}
//           {renderActiveComponent()}
//         </main>
//       </div>
//     </div>
//   );
// };



// export default AdminDashboard;