import React from 'react';
import './LandingPage.css';
import logo from '../assets/logo.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1>Unlock Massive Savings Today.</h1>
          <p>Start exploring the best deals now!</p>
          <button className="cta-button">Browse Deals</button>
        </div>
      </section>

      {/* Trending Deals */}
      <section className="section trending-deals">
        <h2>Trending Deals</h2>
        <div className="deals-grid">
          {[...Array(6)].map((_, i) => (
            <div className="deal-card" key={i}>
              <div className="image-placeholder"></div>
              <h3>Deal Title {i + 1}</h3>
              <p>$99.99</p>
              <button>View Deal</button>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Categories */}
      <section className="section categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {[...Array(6)].map((_, i) => (
            <div className="category-card" key={i}>
              <div className="image-placeholder"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo">
        <div className="promo-content">
          <h3>🔥 Pro Laptop - Limited Time Offer</h3>
          <p>High-performance laptop now only</p>
          <h2>$799.00</h2>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <h2>Why Choose DealHub?</h2>
        <div className="features">
          <div>
            <h4>Handpicked Deals</h4>
            <p>Only the best and verified offers.</p>
          </div>
          <div>
            <h4>Trusted Sellers</h4>
            <p>We work with reliable merchants.</p>
          </div>
          <div>
            <h4>Secure Payments</h4>
            <p>Safe and secure transactions.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h3>Don’t Miss Out on the Best Deals!</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <img src={logo} alt="DealHub Logo" />
          <p>© 2025 DealHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
