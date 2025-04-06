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
import FeatureCards1 from "./components/FeaturedDynmic";
import TravelPagesRouter from "./components/TravelFooter";
import BestKashmir from "./BestKashmir";
import TourQueryFormKashmir from "./components/QuerFomrKashmir";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import KashmirHeader from "./components/Navbar";
import AgentProfile from "./components/AgentProfile";
import ItineraryBuilder from "./components/Itenary";
import TripPlanner from "./components/TripPlanner";
import TravelPackageCRUD from "./components/TravelPackageCRUD";
import PackageManagement from "./components/PackageMangement";
import SpecialRatesSection from "./components/SpecialRateSection";
import AgentAdmin from "./components/AgentAdmin";
import DestinationGallery from "./components/DestinationGallery";
import FeaturedTours from "./components/FeaturedTours";
import DiscoverPackages from "./components/DiscoverPackageParent";
import DiscoverPackageCRUD from "./components/DiscoverPackageCRUD";
import PromoCodeManager from "./components/PromodCodeManger";
import BookingManager from "./components/BookingManger";
import WebsitePopup from "./components/WebsitePopup"
import TourQueriesManagement from "./components/TourQueriesManagement";
import TourQueriesManagementGetQuote from "./components/TourGetQuoteMangement";
import KashmirTravelSalesBanner from "./components/SalesBanner";
const Home = () => {
 
    return (
      <>
        
        <KashmirHeader/>
        <HeroSection/>
        <KashmirTravelSalesBanner/>
        <FeatureCards1/>
     

    
      <FeaturedTours/>
   
        <FinalTours1/>
      
        <DestinationGallery/>
       
        <RentCARS />
        <BlogSection/>

     
        <ErrorBoundary>
 
</ErrorBoundary>
<TestimonialsCarousel/>

        <Footer />
        {/* <WebsitePopup/> */}
      </>
    );
  };
  
  export default Home;
  