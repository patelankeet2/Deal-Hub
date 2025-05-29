import React, { useEffect, useState } from 'react';
import './OrderTrackingPage.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('userEmail'); // Assume userEmail stored after login
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), where('customerEmail', '==', userEmail));
        const snapshot = await getDocs(q);
        const orderData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchOrders();
  }, [userEmail]);
 
  return (
    <div className="tracking-page">
      <h2>Your Orders</h2>
 
      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>{order.dealTitle}</h4>
              <p><strong>Ordered:</strong> {order.date}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default OrderTrackingPage;