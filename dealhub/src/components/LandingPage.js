import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
 
const LandingPage = () => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('topDeal', '==', true));
        const snapshot = await getDocs(q);
        const result = [];
 
        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          let imageUrl = '';
 
          // Prefer direct imageUrl if it exists
          if (data.imageUrl) {
            imageUrl = data.imageUrl;
          } else if (data.imagePath) {
            try {
              imageUrl = await getDownloadURL(ref(storage, data.imagePath));
            } catch (err) {
              console.warn('⚠️ Could not fetch image from storage:', err.message);
            }
          }
 
          result.push({
            id: docSnap.id,
            ...data,
            imageUrl,
          });
        }
 
        setDeals(result);
      } catch (error) {
        console.error('❌ Error fetching deals:', error.message);
      }
    };
 
    fetchDeals();
  }, []);
 
  const filteredDeals = deals.filter((deal) =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Top Deals Right Now</h1>
          <p>Browse the hottest discounts on DealHub</p>
        </div>
      </section>
 
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search deals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
 
      {/* Trending Deals */}
      <section className="trending-deals">
        <h2>🔥 Trending Deals</h2>
        <div className="deals-grid">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <div className="deal-card" key={deal.id}>
                <img src={deal.imageUrl} alt={deal.title} />
                <h4>{deal.title}</h4>
                <p className="price">
                  <span className="old-price">${deal.price}</span>{' '}
                  <span className="new-price">
                    ${Math.floor(deal.price * (1 - deal.discount / 100))}
                  </span>
                </p>
                <button onClick={() => navigate(`/deal/${deal.id}`)}>
                  View Deal
                </button>
              </div>
            ))
          ) : (
            <p>No deals match your search.</p>
          )}
        </div>
      </section>
 
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DealHub. All rights reserved.</p>
      </footer>
    </div>
  );
};
 
export default LandingPage;