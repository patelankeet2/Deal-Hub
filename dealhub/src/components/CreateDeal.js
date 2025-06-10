import React, { useState, useEffect } from 'react';
import './CreateDeal.css';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const CreateDeal = () => {
  const navigate = useNavigate();

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
  const [categories, setCategories] = useState([]);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'categories'));
        const cats = snapshot.docs.map(doc => doc.data().name);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        alert('Please login first.');
        navigate('/merchant-login');
        return;
      }

      // Fetch merchant name from users collection
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      const merchantName = userData?.name || 'Unknown Merchant';

      const dealData = {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        discount: parseInt(form.discount),
        category: form.category,
        startDate: form.startDate,
        endDate: form.endDate,
        imageUrl: form.imageUrl,
        topDeal: false,
        approved: false,
        createdAt: serverTimestamp(),
        createdBy: user.email,
        createdByName: merchantName,
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
      <header className="navbar"></header>

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
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
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
