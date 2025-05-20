// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Unlock Massive Savings Today</h1>
          <p>Shop Smart. Save Big. Stay Ahead.</p>
          <button>Browse Deals</button>
        </div>
      </section>

      {/* Trending Deals */}
      <section className="trending-deals">
        <h2>Trending Deals</h2>
        <div className="deals-grid">
          {[...Array(6)].map((_, i) => (
            <div className="deal-card" key={i}>
              <img src={`images/deal${i + 1}.jpg`} alt={`Deal ${i + 1}`} />
              <h4>Deal Title {i + 1}</h4>
              <p>$199.00</p>
              <button>View Deal</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {[...Array(6)].map((_, i) => (
            <div className="category-card" key={i}>
              <img src={`images/category${i + 1}.jpg`} alt={`Category ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <img src="images/laptop-promo.jpg" alt="Promo" />
          <div>
            <span className="badge">Limited Time</span>
            <h3>Pro Laptop – Limited Time Offer</h3>
            <p>Only available until stock runs out. Get yours today!</p>
            <h4>$799.00</h4>
            <button>Shop Now</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>Why Choose DealHub?</h2>
        <div className="features">
          <div className="feature">
            <h4>Handpicked Deals</h4>
            <p>Only the best, verified bargains from trusted sources.</p>
          </div>
          <div className="feature">
            <h4>Latest Offers</h4>
            <p>Stay updated with real-time price drops and flash sales.</p>
          </div>
          <div className="feature">
            <h4>Trusted by Thousands</h4>
            <p>Join our large community of smart shoppers.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Don't Miss Out on the Best Deals!</h2>
        <p>Sign up for our newsletter and get the latest offers in your inbox.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h3>DealHub</h3>
          <p>© 2025 DealHub. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
