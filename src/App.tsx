import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import DeviceRiver from "./views/DeviceRiver"; // Adjust the import path as needed
import Header from "./components/Header";
import About from "./views/About";
import Projects from "./views/Projects";
import Contact from "./views/Contact";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";

function App() {
  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live-iot-data-streaming" element={<DeviceRiver />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
