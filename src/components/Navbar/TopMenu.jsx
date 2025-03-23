import React from 'react';
// import { Mail, Facebook, Twitter, Instagram, Phone, Globe } from 'lucide-react';
import  TopMenuRight  from './TopMenuRight';
import  TopMenuLeft  from './TopMenuRight';

 const TopMenu = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <TopMenuLeft />
          <TopMenuRight />
        </div>
      </div>
    </div>
  );
};
export default  TopMenu