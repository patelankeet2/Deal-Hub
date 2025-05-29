import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
 
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);
 
  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };
 
  const handleRemove = (id) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    updateCart(filtered);
  };
 
  const handleClearCart = () => {
    updateCart([]);
  };
 
  const handleProceed = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate('/payment');
  };
 
  const total = cartItems.reduce((sum, item) => {
    const discounted = Math.floor(item.price * (1 - item.discount / 100));
    return sum + discounted;
  }, 0);
 
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt={item.title} />
                <div className="cart-details">
                  <h4>{item.title}</h4>
                  <p>Discounted: ${Math.floor(item.price * (1 - item.discount / 100))}</p>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <div className="cart-actions">
              <button className="clear" onClick={handleClearCart}>Clear Cart</button>
              <button className="pay" onClick={handleProceed}>Proceed to Payment</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
 
export default CartPage;