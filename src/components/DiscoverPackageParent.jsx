import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//  from './PackageList';
import DiscoverPackageList from './DiscoverPackageList';
import DiscoverPackageDetails from './DiscoverPackageDetails';


import DiscoverPackageForm from './DiscoverPackageForm';

const DiscoverPackages = () => {
  return (
    <>
      <DiscoverPackageList/>
    <DiscoverPackageForm />
    <DiscoverPackageDetails />
    <DiscoverPackageForm />
    </>
  
    // <Router>
    //   <Routes>
    //     <Route path="/packages" element={<  DiscoverPackageList/>} />
    //     <Route path="/packages/new" element={<DiscoverPackageForm />} />
    //     <Route path="/packages/:id" element={<DiscoverPackageDetails />} />
    //     <Route path="/packages/edit/:id" element={<  DiscoverPackageForm/>} />
    //   </Routes>
    // </Router>
  );
};

export default DiscoverPackages;