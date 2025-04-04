import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const setupI18n = () => {
  // Only initialize once
  if (i18n.isInitialized) {
    return i18n;
  }

  const resources = {
    English: {
      translation: {
        // General
        welcome: "Welcome to our Travel Website",
        popular: "Popular Destinations",
        bookNow: "Book Now",
        allRightsReserved: "All rights reserved.",
        backToTop: "Back to top",
        
        // Newsletter
        newsletterTitle: "Get Travel Deals and Updates",
        newsletterSubtitle: "Subscribe to our newsletter for exclusive offers and travel inspiration.",
        
        // Footer sections
        exploreHeading: "Explore",
        infoHeading: "Information",
        supportHeading: "Support",
        
        // Add more translations as needed
        topDestinations: "Top Destinations",
        tourPackages: "Tour Packages",
        aboutUs: "About Us",
        contactUs: "Contact Us"
      }
    },
    Spanish: {
      translation: {
        // General
        welcome: "Bienvenido a nuestro sitio web de viajes",
        popular: "Destinos populares",
        bookNow: "Reservar ahora",
        allRightsReserved: "Todos los derechos reservados.",
        backToTop: "Volver arriba",
        
        // Newsletter
        newsletterTitle: "Obtenga ofertas y actualizaciones de viajes",
        newsletterSubtitle: "Suscríbase a nuestro boletín para ofertas exclusivas e inspiración para viajar.",
        
        // Footer sections
        exploreHeading: "Explorar",
        infoHeading: "Información",
        supportHeading: "Soporte",
        
        // Add more translations as needed
        topDestinations: "Destinos Principales",
        tourPackages: "Paquetes Turísticos",
        aboutUs: "Sobre Nosotros",
        contactUs: "Contáctenos"
      }
    },
    // Add other languages as needed
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: localStorage.getItem('preferredLanguage') || 'English',
      fallbackLng: 'English',
      interpolation: {
        escapeValue: false
      },
      debug: process.env.NODE_ENV === 'development'
    });

  return i18n;
};

export default setupI18n;