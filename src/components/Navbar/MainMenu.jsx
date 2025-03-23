import React from 'react';
// import { Menu } from 'lucide-react';
import { MainMenuLogo } from './MainMenuLogo';
import { MainMenuNav } from './MainMenuNav';
import { MainMenuMobileButton } from './MainMenuMobileButton';
 export const MainMenu = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <MainMenuLogo />
          <MainMenuNav />
          <MainMenuMobileButton />
        </div>
      </div>
    );
  };
  
  export default MainMenu;