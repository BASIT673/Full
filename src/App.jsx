
// import React  from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HeroSection from "./components/HeroSection";
// import ExpediaHeader from "./components/Navbar";

// import Footer from "./components/Footer";

// import RentCARS from "./RentCARS";
// import BlogSection from "./BlogSection";

// import FinalTours1 from "./components/FinalTours1";
// import KashmirDestinations2 from "./KashmirDestinations2";
// // import AdminPanel from "./AdminPanel";


// const App = () => {


//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* <Router> */}
//         {/* <ExpediaHeader />

        
  

//         <HeroSection/>
    

        
//           <Routes>
            
//           </Routes>
         
//           <FinalTours1/>
          
       
//         <KashmirDestinations2/>
    
//         <RentCARS/>
//         <BlogSection/>
        
// <Footer/>

//        <Router>
//       <Routes>
//       <Route path="/" element={<RentCARS />} />
//       <Route path="/" element={KashmirDestinations2}/>
//         <Route path="/register" element={<Register />} />
         
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />}/> {/* Add AdminDashboard route */}
//       {/* </Routes>

      
    
//     </div>
//   );
// };

// export default App; */}


// {/* // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; */}
// // import Login from "./components/Login";
// // import Register from "./components/Register";
// // import Profile from "./components/Profile";
// // import Login from "./Login";
// // import Register from "./components/Register";
// // import Profile from "./components/Profile";
// // const App = () => {
// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       <Router>

// //         <ExpediaHeader />
// //         <HeroSection />
// //         <Login/>
        
      
        
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="/" element={<Login />} />
      
// //         <FinalTours1 />
// //         <KashmirDestinations2 />
// //         <RentCARS />
// //         <BlogSection />
// //         <Footer />
// //       </Router>
// //     </div>
// //   );
// // };

// // export default App;

// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure you're using the correct imports

// // const App = () => {
// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       <Router>
// //         <ExpediaHeader />
// //         <HeroSection />
// //         <Login />
// //         {/* <Login/> */}
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/profile" element={<Profile />} />
// //           <Route path="/" element={<Login />} />
// //         </Routes>
        
// //         <FinalTours1 />
// //         <KashmirDestinations2 />
// //         <RentCARS />
// //         <BlogSection />
// //         <Footer />
// //       </Router>
// //     </div>
// //   );
// // };
// // export default App;
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // import Login from "./components/Login";
// // // import Register from "./components/Register";
// // // import Profile from "./components/Profile";
// // // import { Provider } from 'react-redux';

// // // import { store } from "./store";

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/profile" element={<Profile />} />
// // //         <Route path="/" element={<Login />} />
// // //       </Routes>
// // //     </Router>
 
// //   //     <Provider store={store}>
// //   //       <BrowserRouter>
// //   //         {/* Your routes */}
// //   //       </BrowserRouter>
// //   //     </Provider>
// //   //   );   );
// // // }

// // // function App() {
// // //   return (
// // //     <Provider store={store}>
// // //       <BrowserRouter>
// // //         {/* Your routes */}
// // //       </BrowserRouter>
// // //     </Provider>
// // //   );
// // // export default App;








// // import Login from "./Login";
// // import Register from "./Register";
// // import Profile from "./Profile";

// //  function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Route for the Login page */}
// //         <Route path="/login" element={<Login />} />

// //         {/* Route for the Register page */}
// //         <Route path="/register" element={<Register />} />

// //         {/* Route for the Profile page */}
// //         <Route path="/profile" element={<Profile />} />

// //         {/* Default route (redirects to Login) */}
// //         <Route path="/" element={<Login />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from "./components/Logis";
import Register from "./components/Register"
import Profile from "./components/Profile"
import AdminDashboard from "./components/AdminDashboard";
import RentCARS from "./RentCARS";
import KashmirDestinations2
 from "./KashmirDestinations2";
 import HeroSection from "./components/HeroSection";
 import Footer from "./components/Footer";
 import FinalTours1 from "./components/FinalTours1";
//  import KashmirDestinations2 from "./KashmirDestinations2";
import ExpediaHeader from "./components/Navbar"
import Home from "./Home";
import EmailVerification from './components/EmailVerifcation';
import VerificationPending from './components/VerificationPending';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Home />} />
  

      
    
//         <Route path="/register" element={<Register />} />
        
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
//       </Routes>
//     </Router>
//   );
// };
import Login from './components/Login';
import SignupForm from "./components/SignupAgent";
// import LoginForm from "./components/LoginAgent";
import ProfileAgent from "./components/ProfileAgent";
import VerifyEmail from './components/VerifyEmail';
// import Protected from "./components/Protected"
import ProtectedRoute from "./components/Protected";
//  {/* <TourQueryForm/> */}
import TourQueryForm from './components/querfrom';
import VisualCategoryCarousel from './components/VisualCategoryCarousel;';
// import { AuthContext } from "./AuthContext";
// import { AuthProvider } from "./components/AuthContext";
import AuthProvider from "./components/AuthContext";

// import AuthModal from "./components/auth"
import AuthModal from "./components/auth/AuthModal"
// import useState from react;
import { useState, useEffect } from 'react';
import AgentProfileDashboard from './components/AgentProfile';
import TourQueryFormKashmir from './components/QuerFomrKashmir';
import TourQueryFormSeasonal from './components/QueryFormGroup';
import TourQueryFormGroup from './components/QueryFormGroup';
const App = () => {
  const featuredDestinations = [
    { id: 1, name: "Srinagar", location: "Kashmir", imageUrl: "/images/srinagar.jpg" },
    { id: 2, name: "Gulmarg", location: "Kashmir", imageUrl: "/images/gulmarg.jpg" },
    { id: 3, name: "Pahalgam", location: "Kashmir", imageUrl: "/images/pahalgam.jpg" },
  ];
  const [authModalOpen, setAuthModalOpen] = useState(false);
  return (
//     <AuthProvider>
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Fixed here */}
//           <Route path="/login" element={<Login />} 
//           //  <Route path="/signup" element={<SignupForm />} 
//           //  <Route path="/login" element={<LoginForm />} 
//           // <Route path="/register" element={<Register />} 
      


//                {/* <Route path="/login" element={<Login />} /> */}
//                <Route path="/query-form" element={<TourQueryForm />} />
//                <Route path="/profile" element={<Profile />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//           // In your React Router setup
// <Route path="/verify-email" element={<VerifyEmail />} /> {/* Updated for fallback routing */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//     </AuthProvider>
<AuthProvider>
<BrowserRouter>
  <div className="min-h-screen bg-gray-100">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email/:token" element={<EmailVerification/>} />
      <Route path="/verification-pending" element={<VerificationPending />} />
      <Route path="/Agent-Profile" element={<AgentProfileDashboard />} />
      <Route path="/TrekkingAdventures" element={<TourQueryForm />} />
      <Route path="/PopularDestinations" element={<TourQueryFormKashmir />} />
      <Route path="/SeasonalExperiences" element={<TourQueryFormSeasonal />} />
      <Route path="/PopularGroupDestinations" element={<TourQueryFormGroup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* <Route path="*" element={<Navigate to="/Profile" />} /> */}
    </Routes>
  </div>
</BrowserRouter>
</AuthProvider>
  );
};

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
          
//         <Route path="/" element={<Home />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />}

//           <Route path="/signup" element={<SignupForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute>
//                 <ProfileAgent />
//               </ProtectedRoute>
//             } 
//           />
//           <Route path="/" element={<Navigate to="/login" />} />

//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };


export default App;  