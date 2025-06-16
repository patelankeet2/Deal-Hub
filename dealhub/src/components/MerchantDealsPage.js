import React, { useEffect, useState } from 'react';
import './MerchantDealsPage.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MerchantDealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        setFilteredDeals(list);
      } catch (error) {
        console.error('Error fetching merchant deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [merchantEmail]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = deals.filter(deal =>
      deal.title.toLowerCase().includes(term) ||
      deal.category.toLowerCase().includes(term)
    );
    setFilteredDeals(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/edit-deal/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete deal with ID: ${id}`);
    // TODO: Implement Firestore deletion
  };

  return (
    <div className="merchant-deals-page">
      <h2>📦 My Deals Overview</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search deals by title or category..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {loading ? (
        <p className="loading">Loading deals...</p>
      ) : filteredDeals.length === 0 ? (
        <p className="no-deals">No deals match your search.</p>
      ) : (
        <div className="table-wrapper">
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
              {filteredDeals.map((deal) => (
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
                    <button onClick={() => handleEdit(deal.id)} title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(deal.id)} className="delete" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MerchantDealsPage;
