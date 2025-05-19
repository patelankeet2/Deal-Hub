import React, { useState } from 'react';
import './CreateDeal.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateDeal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    startDate: '',
    endDate: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Deal Submitted:', form);
    alert('Deal submitted for approval!');
    navigate('/merchant-dashboard');
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="navbar">
        <div className="logo">DealHub</div>
        <nav className="nav-links">
          <a href="/merchant-dashboard" className={location.pathname === "/merchant-dashboard" ? "active" : ""}>Dashboard</a>
          <a href="/create-deal" className={location.pathname === "/create-deal" ? "active" : ""}>Add-Deals</a>
          <a href="/analytics">Analytics</a>
          <a href="/settings">Settings</a>
        </nav>
        <div className="search-profile">
          <input type="text" placeholder="Search deals, products..." />
          <div className="profile-circle">A</div>
        </div>
      </header>

      <div className="create-deal-container">
        <h2>Create New Deal</h2>
        <form className="deal-form" onSubmit={handleSubmit}>
          <div className="deal-details">
            <label>Deal Title</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g., 20% Off All Courses" />

            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the deal benefits..." />

            <label>Price / Discount</label>
            <input name="price" value={form.price} onChange={handleChange} required placeholder="$10 OFF or 20%" />

            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              <option value="courses">Courses</option>
              <option value="ebooks">E-books</option>
              <option value="services">Services</option>
            </select>
          </div>

          <div className="media-config">
            <label>Deal Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="preview-image" />}

            <div className="date-fields">
              <div>
                <label>Start Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
              </div>
              <div>
                <label>End Date</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/merchant-dashboard')}>Cancel</button>
            <button type="submit" className="save">Submit for Approval</button>
          </div>
        </form>
      </div>
      <footer className="footer">
        <p>© 2024 DealHub Inc. All rights reserved.</p>
      </footer>
    </>
  );
};

export default CreateDeal;
