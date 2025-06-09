import React, { useEffect, useState } from 'react';
import './MerchantDealsPage.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MerchantDealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [merchantEmail, setMerchantEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMerchantEmail(user.email);
      } else {
        setMerchantEmail(null);
        setDeals([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!merchantEmail) return;

    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('createdBy', '==', merchantEmail));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
          const data = doc.data();
          const price = Number(data.price) || 0;
          const discount = Number(data.discount) || 0;
          const discountedPrice = price * (1 - discount / 100);
          const finalProfit = discountedPrice - discountedPrice * 0.05;

          return {
            id: doc.id,
            ...data,
            finalProfit: discountedPrice > 0 ? finalProfit.toFixed(2) : '0.00'
          };
        });
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
    navigate(`/edit-deal/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete deal with ID: ${id}`);
    // TODO: Implement Firestore deletion
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
              <th>Final Profit ($)</th>
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
                <td>${deal.finalProfit}</td>
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
