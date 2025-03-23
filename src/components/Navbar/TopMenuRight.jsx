 import { TopMenuAuth } from "./TopMenuAuth";
 import { LanguageSelector } from "./LanguageSelector";
 import {Phone} from "lucide-react"
 export const TopMenuRight = () => {
    return (
      <div className="flex items-center space-x-4">
        <a href="tel:+919541515012" className="flex items-center hover:text-gray-300">
          <Phone size={16} className="mr-2" />
          <span>+91 9541515012</span>
        </a>
        <span>|</span>
        <LanguageSelector />
        <span>|</span>
        <TopMenuAuth />
      </div>
    );
  };
  export default TopMenuRight