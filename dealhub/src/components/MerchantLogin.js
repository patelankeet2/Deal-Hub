import React, { useState } from "react";
import "./MerchantLogin.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ Add this line

const MerchantLogin = () => {
  const navigate = useNavigate();
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseError, setLicenseError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const licensePattern = /^\d{7}(-\d{2})?$/;

    if (!licensePattern.test(licenseNumber)) {
      setLicenseError("Invalid NZ license number format.");
      return;
    }

    setLicenseError("");
    navigate("/merchant-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Merchant Login</h2>
        <p>Manage your deals and track your performance.</p>
        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input type="email" placeholder="merchant@example.com" required />

          <label>Password</label>
          <input type="password" placeholder="Enter password" required />

          <label>Driving License Number</label>
          <input
            type="text"
            placeholder="e.g., 1234567 or 1234567-01"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
          {licenseError && <div className="error">{licenseError}</div>}
          <small>Your license number is required to verify merchant status.</small>

          <div className="secure-note">🔒 Secure connection</div>

          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          <a href="#">Switch to Customer/Admin Login</a>
          <a href="#">Forgot Password?</a>
        </div>
      </div>

      {/* ✅ Replace the camera icon with the logo image */}
      <div className="login-image">
        <img src={logo} alt="Deal Hub Logo" className="dealhub-logo" />
      </div>
    </div>
  );
};

export default MerchantLogin;
