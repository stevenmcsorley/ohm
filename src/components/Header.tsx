import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import "./Header.css";

const Header = () => {
  const handleNavClick = (label: string) => {
    ReactGA.event({
      category: "Navigation",
      action: "Click",
      label: label,
    });
  };

  return (
    <header>
      <div className="header_background">
        <h1 className="neonText">
          Steven McSorley <span className="square_root">&#8730;</span>
        </h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/" onClick={() => handleNavClick("Home")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => handleNavClick("About")}>
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => handleNavClick("Projects")}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => handleNavClick("Contact")}>
                Contact
              </Link>
            </li>
            {/* <li>
              <Link to="/privacy-policy" onClick={() => handleNavClick('Privacy Policy')}>Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" onClick={() => handleNavClick('Terms of Service')}>Terms of Service</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
