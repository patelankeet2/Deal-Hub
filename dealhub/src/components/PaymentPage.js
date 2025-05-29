import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';
 
const PaymentPage = () => {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [cart, setCart] = useState([]);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(localCart);
  }, []);
 
  const total = cart.reduce((sum, item) => {
    return sum + Math.floor(item.price * (1 - item.discount / 100));
  }, 0);
 
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in all fields");
      return;
    }
 
    setPaid(true);
    localStorage.removeItem('cart');
 
    setTimeout(() => {
      navigate('/feedback');
    }, 4000);
  };
 
  return (
    <div className="payment-page">
      <h2>Checkout</h2>
 
      {paid ? (
        <div className="qr-section">
          <p>Thank you for your purchase!</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=feedback&size=160x160" alt="QR for feedback" />
          <p>Scan to leave feedback!</p>
        </div>
      ) : (
        <>
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <p>{cart.length} item(s)</p>
          </div>
 
          <form onSubmit={handleSubmit} className="payment-form">
            <label>Name</label>
            <input type="text" name="name" value={customer.name} onChange={handleChange} required />
 
            <label>Phone</label>
            <input type="tel" name="phone" value={customer.phone} onChange={handleChange} required />
 
            <label>Address</label>
            <textarea name="address" value={customer.address} onChange={handleChange} required />
 
            <button type="submit">Pay Now</button>
          </form>
        </>
      )}
    </div>
  );
};
 
export default PaymentPage;