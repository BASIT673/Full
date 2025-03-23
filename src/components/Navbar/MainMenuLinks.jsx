export const MainMenuLinks = () => {
    const links = ['Home', 'Packages', 'Deals', 'About', 'Contact'];
    return (
      <>
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-white font-semibold text-lg hover:text-gray-300 transition duration-200"
          >
            {link}
          </a>
        ))}
      </>
    );
  };
  export default MainMenuLinks