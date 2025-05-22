import React, { useState } from "react";
import "./MerchantRegister.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const MerchantRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    license: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Registration logic
    console.log("Merchant Registered:", formData);
    navigate("/merchant-login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Merchant Registration</h2>
        <p>Create an account to publish and track your deals.</p>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="merchant@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>NZ Driving License (optional)</label>
          <input
            type="text"
            name="license"
            placeholder="e.g., 1234567 or 1234567-01"
            value={formData.license}
            onChange={handleChange}
          />

          {error && <div className="error">{error}</div>}

          <button type="submit">Register</button>
        </form>

        <div className="login-links">
          <a href="/merchant-login">Back to Login</a>
        </div>
      </div>

      <div className="login-image">
        <img src={logo} alt="Deal Hub Logo" className="dealhub-logo" />
      </div>
    </div>
  );
};

export default MerchantRegister;
