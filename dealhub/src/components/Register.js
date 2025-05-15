import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
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
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Register;
