// Enhanced Plan My Trip button with engaging interactive elements (no bounce)
import React from "react";

const EnhancedPlanTripButton = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);
    const [isGlowing, setIsGlowing] = React.useState(false);
    
    React.useEffect(() => {
      // Subtle attention-grabbing glow effect every few seconds
      const glowInterval = setInterval(() => {
        setIsGlowing(true);
        setTimeout(() => setIsGlowing(false), 1500);
      }, 7000);
      
      return () => clearInterval(glowInterval);
    }, []);
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    
    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
      
      // Your existing modal opening logic
      openModal();
    };
    
    return (
      <div className="relative">
        {/* Animated glow effect that appears periodically */}
        <div className={`absolute -inset-2 bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 rounded-full opacity-0 blur-lg transition-opacity duration-1000 ${isHovered || isGlowing ? 'opacity-70' : ''}`}></div>
        
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            group relative inline-flex items-center justify-center
            overflow-hidden rounded-full 
            bg-gradient-to-br from-orange-500 to-orange-600 
            p-0.5 font-medium text-white hover:text-white 
            shadow-md hover:shadow-lg active:shadow-sm 
            transition-all duration-300 ease-out
            ${isHovered ? 'scale-105' : ''}
            ${isClicked ? 'scale-95' : ''}
            ${isGlowing ? 'ring-2 ring-orange-300' : ''}
            z-10
          `}
          aria-label="Plan your trip to Kashmir"
        >
          {/* Background span with gradient */}
          <span className={`
            relative flex items-center gap-2 rounded-full 
            bg-gradient-to-br from-orange-500 to-orange-600 
            px-4 py-[0.5rem] sm:px-6 sm:py-3 
            text-[clamp(0.75rem,2vw,1rem)] 
            transition-all duration-300 ease-out 
            group-hover:bg-opacity-0
          `}>
            {/* Clock icon with rotation effect */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`
                h-[clamp(1rem,4vw,1.25rem)] w-[clamp(1rem,4vw,1.25rem)]
                transition-transform duration-500 ease-in-out
                ${isHovered ? 'rotate-12 scale-110' : ''}
              `}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
                className={isHovered ? 'animate-pulse' : ''}
              />
            </svg>
            
            {/* Button text */}
            <span className={`font-bold transition-all duration-300 ease-out ${isHovered ? 'tracking-wider' : ''}`}>
              Plan My Trip
            </span>
            
            {/* Arrow that appears on hover */}
            <svg 
              className={`w-0 h-5 transition-all duration-300 ease-out ${isHovered ? 'w-5 ml-1 opacity-100' : 'opacity-0'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
          
          {/* Shine effect that moves across button */}
          <div 
            className={`absolute top-0 -left-full h-full w-2/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform skew-x-12 transition-all duration-700 ${isHovered ? 'left-full' : ''}`}
          ></div>
          
          {/* Click ripple effect */}
          {isClicked && (
            <span className="absolute inset-0 rounded-full bg-white opacity-30" style={{
              animation: 'ripple 0.7s linear forwards',
            }} />
          )}
        </button>
        
        {/* Subtle hint text that appears on hover */}
        <div 
          className={`absolute -bottom-8 left-0 right-0 text-center text-xs text-orange-800 font-medium transition-all duration-500 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-1'}`}
        >
          Create your perfect Kashmir adventure
        </div>
        
        <style jsx>{`
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default EnhancedPlanTripButton;