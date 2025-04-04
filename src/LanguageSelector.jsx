import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import LanguageSelector from './setupI18n';
import SetupI18n from "../setupI18n"
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  // Available languages
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];
  
  // Get current language, defaulting to English
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'English'
  );
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle language change
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    
    // Update i18n language
    i18n.changeLanguage(language);
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // Set HTML lang attribute for accessibility
    document.documentElement.setAttribute('lang', 
      language === 'English' ? 'en' : 
      language === 'Spanish' ? 'es' : 
      language === 'French' ? 'fr' : 
      language === 'German' ? 'de' : 
      language === 'Japanese' ? 'ja' : 'en'
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={16} className="mr-2" />
        <span>{currentLanguage}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language}
                className={`block px-4 py-2 text-sm text-left w-full hover:bg-orange-50 focus:outline-none focus:bg-orange-50 transition-colors duration-150 ${
                  language === currentLanguage ? 'text-orange-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => changeLanguage(language)}
                role="menuitem"
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;