
import React, { useState } from "react";
import "./MerchantLogin.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const MerchantLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic
    navigate("/merchant-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Merchant Login</h2>
        <p>Manage your deals and track your performance.</p>
        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="merchant@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          <a href="/merchant-register">Register as a Merchant</a>
          <a href="/merchant-forgot-password">Forgot Password?</a>
        </div>
      </div>

      <div className="login-image">
        <img src={logo} alt="Deal Hub Logo" className="dealhub-logo" />
      </div>
    </div>
  );
};

export default MerchantLogin;
