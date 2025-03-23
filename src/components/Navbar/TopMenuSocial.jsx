import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Phone, Globe } from 'lucide-react';

 export const TopMenuSocial = () => {
    return (
      <div className="flex space-x-3 ml-4">
        <a href="#" className="hover:text-gray-300"><Facebook size={16} /></a>
        <a href="#" className="hover:text-gray-300"><Twitter size={16} /></a>
        <a href="#" className="hover:text-gray-300"><Instagram size={16} /></a>
      </div>
    );
  };
  export default TopMenuSocial;