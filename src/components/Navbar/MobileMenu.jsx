import React from 'react';
import {  X } from 'lucide-react';
import MobileMenuContent  from './MobileMenuContent';

  const MobileMenu = ({ isOpen, onClose }) => {
    return isOpen ? (
      <div className="fixed inset-0 bg-white bg-opacity-0 z-50">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <MobileMenuContent />
      </div>
    ) : null;
  };
  export default MobileMenu