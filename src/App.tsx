import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import DeviceRiver from "./views/DeviceRiver"; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/device-river" element={<DeviceRiver />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
