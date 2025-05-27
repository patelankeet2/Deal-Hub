import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
 
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    const { fullName, email, password, confirmPassword } = formData;
 
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role: "customer"  // Set default role
      });
 
      navigate('/login');
    } catch (err) {
      console.error("Firebase Error:", err.code, err.message);
 
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };
 
  return (
    <div className="register-container">
      <div className="register-card">
        <img src={logo} alt="DealHub" className="logo" />
        <h2>Create an account</h2>
        <p>Enter your details below to create your account.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}
 
export default Register;