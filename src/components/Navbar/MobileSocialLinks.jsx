
import { Facebook, Twitter, Instagram } from 'lucide-react'
  const MobileSocialLinks = () => {
    return (
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-white hover:text-gray-300">
          <Facebook size={24} />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <Twitter size={24} />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <Instagram size={24} />
        </a>
      </div>
    );
  };
  export default MobileSocialLinks