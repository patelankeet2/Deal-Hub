
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MerchantForgotPassword.css";
import logo from "../assets/logo.png";

const MerchantForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate password reset request
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Your Password</h2>
        <p>Enter your email address to receive password reset instructions.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="merchant@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Send Reset Link</button>
          </form>
        ) : (
          <div className="confirmation">
            A password reset link has been sent to your email.
          </div>
        )}

        <div className="login-links">
          <a href="/merchant-login">Back to Login</a>
          <a href="/merchant-register">Register as a Merchant</a>
        </div>
      </div>

      <div className="login-image">
        <img src={logo} alt="Deal Hub Logo" className="dealhub-logo" />
      </div>
    </div>
  );
};

export default MerchantForgotPassword;
