import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

import initializeAnalytics from "./analytics";
import usePageTracking from "./hooks/usePageTracking";

const AppRoutes = () => {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/live-iot-data-streaming" element={<DeviceRiver />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
