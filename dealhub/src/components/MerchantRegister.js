import React, { useState } from "react";
import "./MerchantRegister.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const MerchantRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    license: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      // Register the merchant
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save merchant profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        license: formData.license || null,
        role: "merchant",
        authorized: false, // Admin will approve later
        createdAt: serverTimestamp()
      });

      alert("✅ Merchant registered! Please wait for admin approval.");
      navigate("/merchant-login");
    } catch (err) {
      console.error("Registration Error:", err.message);
      setError(err.message || "Failed to register.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Merchant Registration</h2>
        <p>Create an account to publish and track your deals.</p>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
