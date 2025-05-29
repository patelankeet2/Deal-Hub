import React, { useState } from 'react';
import './CreateDeal.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const CreateDeal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dealData = {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        discount: parseInt(form.discount),
        category: form.category,
        startDate: form.startDate,
        endDate: form.endDate,
        imageUrl: form.imageUrl,
        topDeal: true,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'deals'), dealData);
      alert('✅ Deal submitted successfully!');
      navigate('/merchant-dashboard');
    } catch (error) {
      console.error('❌ Submission error:', error.message);
      alert('Error submitting deal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">DealHub</div>
        <nav className="nav-links">
          <a href="/merchant-dashboard" className={location.pathname === "/merchant-dashboard" ? "active" : ""}>Dashboard</a>
          <a href="/create-deal" className={location.pathname === "/create-deal" ? "active" : ""}>Add-Deals</a>
          <a href="/analytics">Analytics</a>
          <a href="/settings">Settings</a>
        </nav>
        <div className="search-profile">
          <input type="text" placeholder="Search deals..." />
          <div className="profile-circle">M</div>
        </div>
      </header>

      <div className="create-deal-container">
        <h2>Create New Deal</h2>
        <form className="deal-form" onSubmit={handleSubmit}>
          <label>Deal Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />

          <label>Price ($)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />

          <label>Discount (%)</label>
          <input name="discount" type="number" value={form.discount} onChange={handleChange} required />

          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
          </select>

          <label>Start Date</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />

          <label>End Date</label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />

          <label>Image URL</label>
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }}
            />
          )}

          <div className="form-actions">
            <button type="submit" className="save" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Deal'}
            </button>
          </div>
        </form>
      </div>

      <footer className="footer">
        <p>© 2025 DealHub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default CreateDeal;
