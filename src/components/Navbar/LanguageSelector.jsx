import {Globe} from "lucide-react"
export const LanguageSelector = () => {
    return (
      <div className="flex items-center hover:text-gray-300 cursor-pointer">
        <Globe size={16} className="mr-2" />
        <span>English</span>
      </div>
    );
  };
  export default LanguageSelector