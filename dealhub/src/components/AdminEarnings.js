import React, { useEffect, useState } from 'react';
import './AdminEarnings.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const AdminEarnings = () => {
  const [deals, setDeals] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
 
  useEffect(() => {
    const fetchApprovedDeals = async () => {
      const dealQuery = query(collection(db, 'deals'), where('approved', '==', true));
      const dealSnapshot = await getDocs(dealQuery);
 
      const userSnapshot = await getDocs(collection(db, 'users'));
      const emailToNameMap = {};
      userSnapshot.forEach(doc => {
        const user = doc.data();
        emailToNameMap[user.email] = user.name || 'Unnamed';
      });
 
      const fetchedDeals = [];
      let total = 0;
 
      dealSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        const netPrice = data.price * (1 - data.discount / 100);
        const commission = netPrice * 0.05;
        const merchantName = emailToNameMap[data.createdBy] || 'Unknown';
 
        fetchedDeals.push({
          id: docSnap.id,
          title: data.title,
          merchant: merchantName,
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
<h2>💼 Admin Earnings Overview</h2>
 
      <div className="table-wrapper">
<table className="earnings-table">
<thead>
<tr>
<th>Deal Title</th>
<th>Merchant Name</th>
<th>Original Price</th>
<th>Discount (%)</th>
<th>5% Commission</th>
</tr>
</thead>
<tbody>
            {deals.map((deal) => (
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
</div>
 
      <div className="total-box">
<span>Total Commission Earned:</span>
<strong>${totalCommission.toFixed(2)}</strong>
</div>
 
      <footer className="footer">
        © {new Date().getFullYear()} DealHub Admin Panel
</footer>
</div>
  );
};
 
export default AdminEarnings;