import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Me</h2>
          <p>
            Steven McSorley is a dedicated creative professional with a passion
            for innovative projects. With a diverse skill set in design and
            technology, Steven enjoys bringing unique ideas to life. His work
            reflects a blend of creativity and practicality, aiming to inspire
            and engage audiences.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Me</h2>
          <a
            href="https://www.linkedin.com/in/steven-mcsorley-08336453/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/stevenmcsorley"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="footer-section newsletter">
          <h2>Newsletter</h2>
          <form>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Steven McSorley. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
