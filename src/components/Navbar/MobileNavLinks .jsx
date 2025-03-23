  const MobileNavLinks = () => {
    const links = ['Home', 'Packages', 'Deals', 'About', 'Contact'];
    return (
      <nav className="flex flex-col space-y-6 text-white mb-8">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="font-semibold text-lg hover:text-gray-300 transition duration-200"
          >
            {link}
          </a>
        ))}
      </nav>
    );
  };
  export default MobileNavLinks