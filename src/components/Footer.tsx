const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-col justify-start">
          <div className="mb-6 md:mb-0">
            <ul className="flex flex-wrap space-x-2 md:space-x-4">
              <li>
                <h2 className="text-md font-bold">Links</h2>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li className="hidden md:inline">|</li>
              <li>
                <a
                  href="/projects"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  Projects
                </a>
              </li>
              <li className="hidden md:inline">|</li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li className="hidden md:inline">|</li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="hidden md:inline">|</li>
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-wrap space-x-2 md:space-x-4 mt-2">
              <li>
                <h2 className="text-md font-bold">Follow Me</h2>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/steven-mcsorley-08336453/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li className="hidden md:inline">|</li>
              <li>
                <a
                  href="https://github.com/stevenmcsorley"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Steven McSorley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
