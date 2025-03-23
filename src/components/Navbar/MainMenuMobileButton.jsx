 import {Menu} from "lucide-react"
  const MainMenuMobileButton = ({ onClick }) => {
    return (
      <div className="md:hidden z-10">
        <button onClick={onClick} className="text-white hover:text-gray-300">
          <Menu size={24} />
        </button>
      </div>
    );
  };
  export   default MainMenuMobileButton