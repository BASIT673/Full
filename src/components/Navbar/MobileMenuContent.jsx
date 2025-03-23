 import  MobileContactInfo  from "./MobileContactInfo";
 import MobileAuthButtons  from "./MobileAuthButtons";
 import  MobileNavLinks  from "./MobileNavLinks ";
 import  MobileSocialLinks  from "./MobileSocialLinks";
  const MobileMenuContent = () => {
    return (
      <div className="flex flex-col px-6 py-4">
        <MobileContactInfo />
        <MobileNavLinks />
        <MobileAuthButtons />
        <MobileSocialLinks />
      </div>
    );
  };
  export  default MobileMenuContent