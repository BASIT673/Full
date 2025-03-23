 export const MobileAuthButtons = () => {
    return (
      <div className="flex flex-col space-y-4 mb-8">
        <button className="w-full py-2 text-white border border-white rounded hover:bg-white/10 transition duration-200">
          Sign Up
        </button>
        <button className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition duration-200">
          Register
        </button>
      </div>
    );
  };
  
  export default MobileAuthButtons