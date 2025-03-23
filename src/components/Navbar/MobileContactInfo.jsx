import {Phone ,Globe,Mail} from "lucide-react"
  const MobileContactInfo = () => {
    return (
      <div className="border-b border-white/20 pb-6 mb-6">
        <div className="flex flex-col space-y-4">
          <a href="tel:+919541515012" className="flex items-center text-white hover:text-gray-300">
            <Phone size={18} className="mr-3" />
            <span>+91 9541515012</span>
          </a>
          <div className="flex items-center text-white hover:text-gray-300">
            <Globe size={18} className="mr-3" />
            <span>English</span>
          </div>
          <a href="mailto:Basityaqoob36@gmail.com" className="flex items-center text-white hover:text-gray-300">
            <Mail size={18} className="mr-3" />
            <span>Basityaqoob36@gmail.com</span>
          </a>
        </div>
      </div>
    );
  };
  export default MobileContactInfo