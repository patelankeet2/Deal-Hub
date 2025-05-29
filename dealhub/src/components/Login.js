import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
 
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    const { email, password } = formData;
 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
 
    if (!userDoc.exists()) {
      setError("User profile not found.");
      return;
    }
 
      const userData = userDoc.data();
      const role = userData?.role?.toLowerCase(); ;
 
      // Navigate based on role
      if (role === "customer") {
        navigate("/landing");
      } else if (role === "admin") {
        navigate("/admin-dashboard"); // replace with your admin route
      } else {
        setError("Unauthorized access.");
      }
 
    } catch (err) {
      console.error("Login Error:", err.code, err.message);
      setError("Login failed. Please check your credentials.");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="DealHub" className="logo" />
        <h2>Sign In to DealHub</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
        <p><a href="/forgot-password">Forgot Password?</a></p>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
        <p>Switch to <a href="/merchant-login">Merchant Login Page</a></p>
      </div>
    </div>
  );
}
 
export default Login;