import React, { useEffect, useState } from 'react';
import './AdminManageDeals.css';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const AdminManageDeals = () => {
  const [deals, setDeals] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'deals'));
        const dealList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDeals(dealList);
      } catch (err) {
        console.error('Error fetching deals:', err);
      }
    };
 
    fetchDeals();
  }, [refresh]);
 
  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'deals', id), { approved: true });
    setRefresh(prev => !prev);
  };
 
  const handleReject = async (id) => {
    await updateDoc(doc(db, 'deals', id), { approved: false });
    setRefresh(prev => !prev);
  };
 
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'deals', id));
    setRefresh(prev => !prev);
  };
 
  return (
    <div className="manage-deals-container">
      <h2>Manage Deals</h2>
      <table className="deals-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Merchant</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.title}</td>
              <td>{deal.category}</td>
              <td>{deal.price}</td>
              <td>{deal.createdByName || deal.createdBy || 'N/A'}</td>
              <td>
                <span className={`status ${deal.approved ? 'approved' : 'pending'}`}>
                  {deal.approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td>
                <button className="approve" onClick={() => handleApprove(deal.id)}>Approve</button>
                <button className="reject" onClick={() => handleReject(deal.id)}>Reject</button>
                <button className="delete" onClick={() => handleDelete(deal.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <footer className="footer">
        <p>© 2025 DealHub Admin Panel</p>
      </footer>
    </div>
  );
};
 
export default AdminManageDeals;