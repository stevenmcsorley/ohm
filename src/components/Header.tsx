import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (label: string) => {
    ReactGA.event({
      category: "Navigation",
      action: "Click",
      label: label,
    });
    setIsOpen(false); // Close the menu on link click
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Steven McSorley <span className="text-pink-500">&#8730;</span>
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:static bg-gray-900 w-full md:w-auto top-16 left-0 md:flex md:items-center md:space-x-6`}
        >
          <Link
            to="/"
            onClick={() => handleNavClick("Home")}
            className="block md:inline-block px-4 py-2 md:p-0 hover:text-pink-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => handleNavClick("About")}
            className="block md:inline-block px-4 py-2 md:p-0 hover:text-pink-500 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/projects"
            onClick={() => handleNavClick("Projects")}
            className="block md:inline-block px-4 py-2 md:p-0 hover:text-pink-500 transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            onClick={() => handleNavClick("Contact")}
            className="block md:inline-block px-4 py-2 md:p-0 hover:text-pink-500 transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
