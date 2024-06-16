import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import Header from "./components/Header";
import About from "./views/About";
import Projects from "./views/Projects";
import Contact from "./views/Contact";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";

import initializeAnalytics from "./analytics";
import usePageTracking from "./hooks/usePageTracking";

import BlogPost from "./components/BlogPost";

const AppRoutes = () => {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
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
