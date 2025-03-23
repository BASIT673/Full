import React, { useState, useEffect } from 'react';

const AnimatedHeading = () => {
  const [text, setText] = useState('');
  const fullText = '🔥 Trending Tours';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Start pulse animation on cursor after typing
      const pulseInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 600);
      return () => clearInterval(pulseInterval);
    }
  }, [text]);

  return (
    <div className="relative inline-block">
      <h1 className="text-xl font-bold text-blue-900 relative">
        <span className="relative">
          {text}
          <span 
            className={`absolute -right-[2px] top-0 text-blue-600 transition-opacity duration-200 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          >
            |
          </span>
        </span>
      </h1>
      <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 animate-expandLine"></div>
    </div>
  );
};

export default AnimatedHeading;

// Add this to your global CSS or style block
const styles = `
@keyframes expandLine {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

.animate-expandLine {
  animation: expandLine 0.8s ease-out forwards;
  animation-delay: 1.5s;
}
`;