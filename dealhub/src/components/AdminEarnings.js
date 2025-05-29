import React, { useEffect, useState } from 'react';
import './AdminEarnings.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const AdminEarnings = () => {
  const [deals, setDeals] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
 
  useEffect(() => {
    const fetchApprovedDeals = async () => {
      const q = query(collection(db, 'deals'), where('approved', '==', true));
      const snapshot = await getDocs(q);
 
      const fetchedDeals = [];
      let total = 0;
 
      snapshot.forEach(doc => {
        const data = doc.data();
        const netPrice = data.price * (1 - data.discount / 100);
        const commission = netPrice * 0.05;
 
        fetchedDeals.push({
          id: doc.id,
          title: data.title,
          merchant: data.createdBy || 'N/A',
          price: data.price,
          discount: data.discount,
          commission
        });
 
        total += commission;
      });
 
      setDeals(fetchedDeals);
      setTotalCommission(total);
    };
 
    fetchApprovedDeals();
  }, []);
 
  return (
    <div className="earnings-container">
      <h2>Admin Earnings</h2>
      <table className="earnings-table">
        <thead>
          <tr>
            <th>Deal Title</th>
            <th>Merchant</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>5% Commission</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.title}</td>
              <td>{deal.merchant}</td>
              <td>${deal.price.toFixed(2)}</td>
              <td>{deal.discount}%</td>
              <td>${deal.commission.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <div className="total-box">
        Total Commission Earned: <strong>${totalCommission.toFixed(2)}</strong>
      </div>
 
      <footer className="footer">
        <p>© 2025 DealHub Admin Panel</p>
      </footer>
    </div>
  );
};
 
export default AdminEarnings;