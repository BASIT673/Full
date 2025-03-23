 import  MainMenuLinks  from "./MainMenuLinks";
  const MainMenuNav = () => {
    return (
      <div className="hidden md:flex items-center justify-between w-full z-10">
        <nav className="flex space-x-8 ml-auto">
          <MainMenuLinks />
        </nav>
      </div>
    );
  };
  export default MainMenuNav