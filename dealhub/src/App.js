import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MerchantLogin from "./components/MerchantLogin";
import MerchantDashboard from "./components/MerchantDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MerchantLogin />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
