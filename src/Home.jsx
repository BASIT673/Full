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
import TourQueriesManagement from "./components/TourQueriesManagement";
import TourQueriesManagementGetQuote from "./components/TourGetQuoteMangement";
const Home = () => {
  const [category, setCategory] = useState('trending');
  const [view, setView] = useState("home");
  const[currentSelection,setCurrentSelection]=useState()
  const [activeTab, setActiveTab] = useState('special-rates');
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
        {/* <BookingManager/> */}
        {/* <PromoCodeManager/> */}
        {/* <TourQueriesManagement/> */}
        {/* <AgentAdmin/> */}
        <FeatureCards1/>
        {/* <SpecialRatesSection/>
        <SpecialRatesSection 
        activeTab="special-rates" 
        setActiveTab={() => {}} 
      /> */}
        {/* <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'special-rates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('special-rates')}
              >
                Special Rates
              </button> */}
        {/* <AgentProfile/> */}
    {/* <PackageManagement/> */}
          {/* <FeatureCards/> */}
          {/* {/* <FeatureCards1/> */}
           
          {/* <TourQueryFormKashmir/> */}
        {/* <TravelSelector
        currentView={view}
        setView={setView}
        featured={featuredDestinations}
        trending={trendingDestinations} */}

     {/* <BestKashmir/> */}
     {/* <DiscoverPackageCRUD/> */}
{/* <DiscoverPackages/> */}
      {/* /> */}
      {/* <TourQueriesManagementGetQuote/> */}
      <FeaturedTours/>
        {/* <ToursGrid1/> */}
        <FinalTours1/>
        {/* <KashmirDestinations2/> */}
        <DestinationGallery/>
        {/* <TrekkingSection/> */}
        {/* <TourQueryForm/> */}
        
    {/* <ItineraryBuilder/> */}
    {/* <TripPlanner/> */}

        {/* <PremiumCertificate/> */}
        {/* <MacroflipInternshipCertificate/> */}

        {/* <ToursGrid/> */}
        <RentCARS />
        <BlogSection/>

        {/* <HeroSection /> */}
        {/* <TravelBlogPost/> */}
        <ErrorBoundary>
  {/* <BlogSection /> */}
{/* <TravelPackageCRUD/> */}
</ErrorBoundary>
<TestimonialsCarousel/>

        <Footer />
      </>
    );
  };
  
  export default Home;
  