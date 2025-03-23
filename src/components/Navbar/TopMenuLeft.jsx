 import { TopMenuSocial } from "./TopMenuSocial";
 import {Mail} from "lucide-react"
 export const TopMenuLeft = () => {
    return (
      <div className="flex items-center space-x-4">
        <a href="mailto:Basityaqoob36@gmail.com" className="flex items-center hover:text-gray-300">
          <Mail size={16} className="mr-2" />
          <span>Basityaqoob36@gmail.com</span>
        </a>
        <TopMenuSocial />
      </div>
    );
  };
  export  default TopMenuLeft