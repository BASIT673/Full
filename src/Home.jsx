import ExpediaHeader from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FinalTours1 from "./components/FinalTours1";
import KashmirDestinations2 from "./KashmirDestinations2";
import RentCARS from "./RentCARS";
import BlogSection from "./BlogSection"
import Footer from "./components/Footer";
import ToursGrid1 from "./components/TourGrid1";
import TravelBlogPost from "./TravelBlogPost";
import ErrorBoundary from "./components/ErrorBoundary";
// import ToursGrid from "./components/TourGrid1";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import PremiumCertificate from "./intership";
import MacroflipInternshipCertificate from "./intership";
import TrekkingSection from "./components/TrekingSection";
import TourQueryForm from "./components/querfrom";
import DiscoveryPanel from "./components/Discovery";
import TravelSelector from "./TravelSelector";
import TourResults from "./TourResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualCategoryCarousel from "./components/VisualCategoryCarousel;";

import { useState } from "react";
import FeatureCards from "./components/FeaturedCards";
import TravelPagesRouter from "./components/TravelFooter";
import BestKashmir from "./BestKashmir";
import TourQueryFormKashmir from "./components/QuerFomrKashmir";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import KashmirHeader from "./components/Navbar";
import AgentProfile from "./components/AgentProfile";
import ItineraryBuilder from "./components/Itenary";
import TripPlanner from "./components/TripPlanner";
const Home = () => {
  const [category, setCategory] = useState('trending');
  const [view, setView] = useState("home");
  const[currentSelection,setCurrentSelection]=useState()
 
  const featuredDestinations = [
    { id: 1, name: "Srinagar", location: "Kashmir", imageUrl: "/images/srinagar.jpg" },
    { id: 2, name: "Gulmarg", location: "Kashmir", imageUrl: "/images/gulmarg.jpg" },
    { id: 3, name: "Pahalgam", location: "Kashmir", imageUrl: "/images/pahalgam.jpg" },
  ];

  const trendingDestinations = [
    { id: 4, name: "Sonmarg", location: "Kashmir" },
    { id: 5, name: "Leh", location: "Ladakh" },
    { id: 6, name: "Dal Lake", location: "Srinagar" },
  ];

  const highlights = [
    {
      id: 1,
      name: 'Kashmir Valley',
      location: 'Jammu & Kashmir',
      imageUrl: '/images/kashmir.jpg',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Gulmarg',
      location: 'Jammu & Kashmir',
      imageUrl: '/images/gulmarg.jpg',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Pahalgam',
      location: 'Jammu & Kashmir',
      imageUrl: '/images/pahalgam.jpg',
      isFavorite: true,
    },
  ];

  const popular = [
    { id: 1, name: 'Adventure Tours' },
    { id: 2, name: 'Luxury Escapes' },
    { id: 3, name: 'Family Trips' },
  ];
    return (
      <>
        {/* <ExpediaHeader /> */}
        <KashmirHeader/>
        <HeroSection/>
        {/* <AgentProfile/> */}
    
          <FeatureCards/>
          {/* <TourQueryFormKashmir/> */}
        {/* <TravelSelector
        currentView={view}
        setView={setView}
        featured={featuredDestinations}
        trending={trendingDestinations} */}

     {/* <BestKashmir/> */}

      {/* /> */}
        <ToursGrid1/>
        <FinalTours1/>
        <KashmirDestinations2/>
        {/* <TrekkingSection/> */}
        {/* <TourQueryForm/> */}
        
    {/* <ItineraryBuilder/> */}
    <TripPlanner/>

        {/* <PremiumCertificate/> */}
        {/* <MacroflipInternshipCertificate/> */}

        {/* <ToursGrid/> */}
        <RentCARS />
        {/* <BlogSection/> */}
        {/* <HeroSection /> */}
        {/* <TravelBlogPost/> */}
        <ErrorBoundary>
  {/* <BlogSection /> */}

</ErrorBoundary>
<TestimonialsCarousel/>

        <Footer />
      </>
    );
  };
  
  export default Home;
  