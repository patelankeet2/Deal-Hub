import React, { useEffect, useState } from 'react';
import './OrderTrackingPage.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { format } from 'date-fns';
 
const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
 
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
 
        const orderData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            createdAt: data.createdAt?.toDate ? format(data.createdAt.toDate(), 'dd MMM yyyy, hh:mm a') : 'N/A',
            total: data.totalAmount || 0,
            shipping: data.shipping || {},
            cart: data.cart || [],
            status: 'Paid',
          };
        });
 
        setOrders(orderData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchOrders();
  }, [user]);
 
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
              <h4>Order ID: <span>{order.id}</span></h4>
              <p><strong>Date:</strong> {order.createdAt}</p>
              <p><strong>Name:</strong> {order.shipping.name}</p>
              <p><strong>Email:</strong> {order.shipping.email}</p>
              <p><strong>Phone:</strong> {order.shipping.phone}</p>
              <p><strong>Address:</strong> {order.shipping.address}</p>
              <div className="order-items">
                <strong>Items:</strong>
                <ul>
                  {order.cart.map((item, idx) => (
                    <li key={idx}>
                      {item.title} — ${Math.floor(item.price * (1 - item.discount / 100))} ({item.discount}% off)
                    </li>
                  ))}
                </ul>
              </div>
              <p className="order-total"><strong>Total Paid:</strong> ${order.total}</p>
              <p className="order-status"><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    {/* Footer */}
    <footer className="footer">
      <p>© 2025 DealHub. All rights reserved.</p>
    </footer>
    </div>
  );
};
 
export default OrderTrackingPage;