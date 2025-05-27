import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const [merchant, setMerchant] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+64 21 123 4567',
    company: 'Johnson Retail Ltd.',
    licenseNumber: 'NZDL-9384-1122',
    authorized: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(merchant);

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setMerchant(edited);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <>
      {/* Dashboard-style Top Navbar */}
      <header className="navbar">
        <div className="logo">DealHub</div>
        <nav className="nav-links">
          <a href="/merchant-dashboard" className={window.location.pathname === "/merchant-dashboard" ? "active" : ""}>Dashboard</a>
          <a href="/create-deal" className={window.location.pathname === "/create-deal" ? "active" : ""}>Add-Deals</a>
          <a href="/analytics" className={window.location.pathname === "/analytics" ? "active" : ""}>Analytics</a>
          <a href="/settings" className={window.location.pathname === "/settings" ? "active" : ""}>Settings</a>
        </nav>
        <div className="search-profile">
          <input type="text" placeholder="Search..." />
          <div className="profile-circle">A</div>
        </div>
      </header>

      <div className="settings-container">
        <h2>Merchant Settings</h2>
        <div className="settings-card">
          <div className="setting-row">
            <label>Name:</label>
            {isEditing ? (
              <input name="name" value={edited.name} onChange={handleChange} />
            ) : (
              <span>{merchant.name}</span>
            )}
          </div>

          <div className="setting-row">
            <label>Email:</label>
            {isEditing ? (
              <input name="email" value={edited.email} onChange={handleChange} />
            ) : (
              <span>{merchant.email}</span>
            )}
          </div>

          <div className="setting-row">
            <label>Phone:</label>
            {isEditing ? (
              <input name="phone" value={edited.phone} onChange={handleChange} />
            ) : (
              <span>{merchant.phone}</span>
            )}
          </div>

          <div className="setting-row">
            <label>Company:</label>
            {isEditing ? (
              <input name="company" value={edited.company} onChange={handleChange} />
            ) : (
              <span>{merchant.company}</span>
            )}
          </div>

          <div className="setting-row">
            <label>NZ Driving License:</label>
            <span>{merchant.licenseNumber}</span>
          </div>

          <div className="setting-row">
            <label>Authorized by Admin:</label>
            <span className={merchant.authorized ? "authorized" : "unauthorized"}>
              {merchant.authorized ? "Authorized ✅" : "Pending ❌"}
            </span>
          </div>

          <div className="setting-actions">
            {isEditing ? (
              <>
                <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="save" onClick={handleUpdate}>Save</button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 DealHub Inc. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Settings;
