import React, { useEffect, useState } from 'react';
import './MerchantDashboard.css';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const [merchantEmail, setMerchantEmail] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    earnings: 0
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setMerchantEmail(user.email);
      else navigate('/merchant-login');
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!merchantEmail) return;

    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('createdBy', '==', merchantEmail));
        const snapshot = await getDocs(q);
        const dealsData = [];
        let approved = 0, pending = 0, earnings = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          const isApproved = data.approved;
          const price = Number(data.price) || 0;
          const discount = Number(data.discount) || 0;

          const discountedPrice = price * (1 - discount / 100);
          const finalProfit = discountedPrice - discountedPrice * 0.05;

          if (isApproved) {
            approved++;
            earnings += finalProfit;
          } else {
            pending++;
          }

          dealsData.push({
            id: doc.id,
            title: data.title,
            price,
            discount,
            category: data.category,
            status: isApproved ? 'Approved' : 'Pending',
            earning: isApproved ? finalProfit : 0
          });
        });

        setDeals(dealsData);
        setSummary({
          total: dealsData.length,
          approved,
          pending,
          earnings
        });
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [merchantEmail]);

  const handleDelete = (title) => {
    alert(`Delete ${title}`); // Replace with actual delete logic
  };

  const filteredDeals = deals.filter((deal) =>
    deal.title.toLowerCase().includes(search.toLowerCase()) ||
    deal.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="merchant-container">
      <main className="merchant-main">
        <h2 className="page-title">Merchant Dashboard</h2>

        <div className="merchant-stats">
          <div className="stat-card">
            <p>Total Deals</p>
            <h3>{summary.total}</h3>
            <span>All submitted</span>
          </div>
          <div className="stat-card">
            <p>Approved</p>
            <h3>{summary.approved}</h3>
            <span>Approved by Admin</span>
          </div>
          <div className="stat-card">
            <p>Pending</p>
            <h3>{summary.pending}</h3>
            <span>Waiting approval</span>
          </div>
          <div className="stat-card">
            <p>Total Earnings</p>
            <h3>${summary.earnings.toFixed(2)}</h3>
            <span>After 5% fee</span>
          </div>
        </div>

        <div className="action-bar">
          <button className="create-deal-btn" onClick={() => navigate('/create-deal')}>+ Create Deal</button>
          <input
            className="search-input"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading deals...</p>
        ) : (
          <div className="table-wrapper">
            <table className="deals-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Earning</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td>{deal.title}</td>
                    <td>${deal.price}</td>
                    <td>{deal.discount}%</td>
                    <td>{deal.category}</td>
                    <td>
                      <span className={`status ${deal.status.toLowerCase()}`}>{deal.status}</span>
                    </td>
                    <td>${deal.earning.toFixed(2)}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-deal-btn"
                        onClick={() => navigate(`/edit-deal/${deal.id}`)}
                      >
                        ✏️ Edit Deal
                      </button>
                      <button
                        className="delete-deal-btn"
                        onClick={() => handleDelete(deal.title)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 DealHub Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MerchantDashboard;
