import React from 'react';
import './MerchantDashboard.css';
import {
  FaChartBar,
  FaClipboardList,
  FaDollarSign,
  FaHandshake,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const deals = [
    { name: "Limited Edition Gadget", value: "$299.99", category: "Electronics", status: "Approved" },
    { name: "Summer Collection Apparel", value: "$55.00", category: "Clothing", status: "Pending" },
    { name: "Digital Marketing Service Package", value: "$450.00", category: "Services", status: "Approved" },
    { name: "Organic Coffee Beans - 1kg", value: "$22.50", category: "Food & Beverage", status: "Approved" },
    { name: "Winter Tire Installation Coupon", value: "$75.00", category: "Automotive", status: "Pending" },
    { name: "Handcrafted Leather Wallet", value: "$89.00", category: "Accessories", status: "Approved" },
    { name: "Cloud Storage Subscription - 1 Year", value: "$120.00", category: "Software", status: "Approved" },
    { name: "Yoga Class Pass (10 Sessions)", value: "$150.00", category: "Fitness", status: "Approved" },
    { name: "Weekend Getaway Package", value: "$350.00", category: "Travel", status: "Pending" },
    { name: "Luxury Watch Sale", value: "$1200.00", category: "Accessories", status: "Approved" },
  ];

  const handleEdit = (name) => alert(`Edit ${name}`);
  const handleDelete = (name) => alert(`Delete ${name}`);

  return (
    <div className="merchant-container">
      <header className="merchant-navbar">
        <div className="merchant-logo">DealHub</div>
        <nav className="merchant-nav-links">
          <a href="/merchant-dashboard" className="active">Dashboard</a>
          <a href="/create-deal">Add-Deals</a>
          <a href="/analytics">Analytics</a>
          <a href="/settings">Settings</a>
        </nav>
        <div className="merchant-profile">
          <input placeholder="Search deals..." />
          <div className="profile-icon">A</div>
        </div>
      </header>

      <main className="merchant-main">
        <h2 className="page-title">Deal Dashboard</h2>

        <div className="merchant-stats">
          <div className="stat-card">
            <p>Total Deals</p>
            <h3>16</h3>
            <span>Number of deals managed</span>
          </div>
          <div className="stat-card">
            <p>Active Deals</p>
            <h3>11</h3>
            <span>Currently live or approved</span>
          </div>
          <div className="stat-card">
            <p>Pending Approvals</p>
            <h3>4</h3>
            <span>Awaiting review</span>
          </div>
        </div>

        <div className="action-bar">
        <button className="create-deal" onClick={() => navigate('/create-deal')}>+ Create New Deal</button>
          <input className="search-input" placeholder="Search deals..." />
        </div>

        <table className="deals-table">
          <thead>
            <tr>
              <th>Deal Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={index}>
                <td>{deal.name}</td>
                <td>{deal.value}</td>
                <td>{deal.category}</td>
                <td>
                  <span className={`status ${deal.status.toLowerCase()}`}>{deal.status}</span>
                </td>
                <td>
                  <button onClick={() => handleEdit(deal.name)}><FaEdit /></button>
                  <button onClick={() => handleDelete(deal.name)} className="delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="footer">
        <p>© 2024 DealHub Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MerchantDashboard;
