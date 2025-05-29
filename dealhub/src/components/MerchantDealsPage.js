// src/components/MerchantDealsPage.js

import React, { useEffect, useState } from 'react';
import './MerchantDealsPage.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MerchantDealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const merchantEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('createdBy', '==', merchantEmail));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDeals(list);
      } catch (error) {
        console.error('Error fetching merchant deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [merchantEmail]);

  const handleEdit = (id) => {
    alert(`Edit deal with ID: ${id}`);
    // Implement actual edit navigation or modal
  };

  const handleDelete = (id) => {
    alert(`Delete deal with ID: ${id}`);
    // Add deletion logic here
  };

  return (
    <div className="merchant-deals-page">
      <h2>All My Deals</h2>

      {loading ? (
        <p>Loading deals...</p>
      ) : deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        <table className="merchant-deals-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Discount (%)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.title}</td>
                <td>{deal.category}</td>
                <td>{deal.price}</td>
                <td>{deal.discount}</td>
                <td>
                  <span className={`status ${deal.approved ? 'approved' : 'pending'}`}>
                    {deal.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(deal.id)}><FaEdit /></button>
                  <button onClick={() => handleDelete(deal.id)} className="delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MerchantDealsPage;
