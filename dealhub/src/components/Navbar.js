import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import './Navbar.css';

const Navbar = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>DealHub</div>
      <div className="nav-links">

        {/* Unauthenticated visitor */}
        {!user && (
          <>
            <Link to="/landing">Home</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* Customer */}
        {user && role === 'customer' && (
          <>
            <Link to="/landing">Home</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {/* Merchant */}
        {user && role === 'merchant' && (
          <>
            <Link to="/merchant-dashboard">Dashboard</Link>
            <Link to="/create-deal">Create Deal</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/merchant-deals">My Deals</Link>
            <Link to="/admin-manage-category">Manage Category</Link>
            <Link to="/merchant-customers">Customers</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {/* Admin */}
        {user && role === 'admin' && (
          <>
            <Link to="/admin-dashboard">Dashboard</Link>
            <Link to="/admin-manage-users">Manage Users</Link>
            <Link to="/admin-manage-deals">Manage Deals</Link>
            <Link to="/admin-earnings">Earnings</Link>
            <Link to="/admin-profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
