import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/landing');
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
            placeholder="enter your email" 
            value={formData.email} 
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="password" 
            placeholder="enter your password" 
            value={formData.password} 
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Sign In</button>
        </form>
        <p><a href="#">Forgot Password?</a></p>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
        <p>Switch to <a href="/merchant-login">Merchant Login Page</a></p>
      </div>
    </div>
  );
}

export default Login;
