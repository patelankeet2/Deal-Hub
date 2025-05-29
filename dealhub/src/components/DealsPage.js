import React, { useEffect, useState } from 'react';
import './DealsPage.css';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
 
const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchDeals = async () => {
      const snapshot = await getDocs(collection(db, 'deals'));
      const fetchedDeals = [];
 
      for (const doc of snapshot.docs) {
        const data = doc.data();
        let imageUrl = '';
 
        if (data.imageUrl) {
          imageUrl = data.imageUrl;
        } else if (data.imagePath) {
          try {
            imageUrl = await getDownloadURL(ref(storage, data.imagePath));
          } catch (err) {
            console.warn('Storage image fetch failed:', err.message);
          }
        }
 
        fetchedDeals.push({ id: doc.id, ...data, imageUrl });
      }
 
      setDeals(fetchedDeals);
    };
 
    fetchDeals();
  }, []);
 
  const filtered = deals.filter((deal) => {
    const matchCategory = category === '' || deal.category === category;
    const matchSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });
 
  return (
    <div className="deals-page">
      <h2>All Deals</h2>
 
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search deals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
 
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
        </select>
      </div>
 
      <div className="deals-grid">
        {filtered.length > 0 ? (
          filtered.map((deal) => (
            <div className="deal-card" key={deal.id}>
              <img src={deal.imageUrl} alt={deal.title} />
              <h4>{deal.title}</h4>
              <p className="price">
                <span className="old-price">${deal.price}</span>{' '}
                <span className="new-price">
                  ${Math.floor(deal.price * (1 - deal.discount / 100))}
                </span>
              </p>
              <button onClick={() => navigate(`/deal/${deal.id}`)}>View Deal</button>
            </div>
          ))
        ) : (
          <p className="no-results">No matching deals found.</p>
        )}
      </div>
    </div>
  );
};
 
export default DealsPage;