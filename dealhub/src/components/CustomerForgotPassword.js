import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reusing same styles as customer login/register
import logo from "../assets/logo.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
 
const CustomerForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err) {
      console.error("Reset Error:", err.message);
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to send reset link. Try again.");
      }
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="DealHub" className="logo" />
        <h2>Reset Your Password</h2>
        <p>Enter your customer account email address to receive password reset instructions.</p>
 
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <div className="confirmation">
            ✅ A password reset link has been sent to <strong>{email}</strong>.
          </div>
        )}
 
        <p><a href="/login">Back to Login</a></p>
      </div>
    </div>
  );
};
 
export default CustomerForgotPassword;