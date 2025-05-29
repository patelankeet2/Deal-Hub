
import React, { useEffect, useState } from 'react';
import './MerchantCustomersPage.css';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const MerchantCustomersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const merchantEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('merchantId', '==', merchantEmail),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => doc.data());
        setOrders(list);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [merchantEmail]);

  return (
    <div className="merchant-customers-page">
      <h2>Customers Who Purchased Your Deals</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No customer purchases found yet.</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Deal Title</th>
              <th>Paid ($)</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.dealTitle}</td>
                <td>${order.pricePaid}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MerchantCustomersPage;
