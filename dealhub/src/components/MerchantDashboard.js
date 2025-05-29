
import React, { useEffect, useState } from 'react';
import './MerchantDashboard.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const merchantEmail = localStorage.getItem('userEmail');
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    earnings: 0
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('createdBy', '==', merchantEmail));
        const snapshot = await getDocs(q);
        const dealsData = [];
        let approved = 0, pending = 0, earnings = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          const status = data.approved ? 'Approved' : 'Pending';
          const earning = data.approved ? (data.price * (1 - data.discount / 100)) : 0;

          dealsData.push({
            id: doc.id,
            title: data.title,
            price: data.price,
            category: data.category,
            status,
            earning
          });

          if (data.approved) {
            approved++;
            earnings += earning;
          } else {
            pending++;
          }
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

  const handleEdit = (title) => alert(`Edit ${title}`);
  const handleDelete = (title) => alert(`Delete ${title}`);

  return (
    <div className="merchant-container">
      <main className="merchant-main">
        <h2 className="page-title">Merchant Dashboard</h2>

        <div className="merchant-stats">
          <div className="stat-card">
            <p>Total Deals</p>
            <h3>{summary.total}</h3>
            <span>All submitted deals</span>
          </div>
          <div className="stat-card">
            <p>Approved Deals</p>
            <h3>{summary.approved}</h3>
            <span>Visible to customers</span>
          </div>
          <div className="stat-card">
            <p>Pending Approvals</p>
            <h3>{summary.pending}</h3>
            <span>Awaiting admin approval</span>
          </div>
          <div className="stat-card">
            <p>Total Earnings</p>
            <h3>${summary.earnings.toFixed(2)}</h3>
            <span>From approved deals</span>
          </div>
        </div>

        <div className="action-bar">
          <button className="create-deal" onClick={() => navigate('/create-deal')}>+ Create New Deal</button>
          <input className="search-input" placeholder="Search deals..." />
        </div>

        {loading ? (
          <p>Loading deals...</p>
        ) : (
          <table className="deals-table">
            <thead>
              <tr>
                <th>Deal Title</th>
                <th>Price ($)</th>
                <th>Category</th>
                <th>Status</th>
                <th>Earning ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td>{deal.title}</td>
                  <td>{deal.price}</td>
                  <td>{deal.category}</td>
                  <td>
                    <span className={`status ${deal.status.toLowerCase()}`}>{deal.status}</span>
                  </td>
                  <td>{deal.earning.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEdit(deal.title)}><FaEdit /></button>
                    <button onClick={() => handleDelete(deal.title)} className="delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 DealHub Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MerchantDashboard;
