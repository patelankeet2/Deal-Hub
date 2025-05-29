import React, { useState } from 'react';
import './FeedbackPage.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const FeedbackPage = () => {
  const [form, setForm] = useState({
    name: '',
    comment: '',
    rating: '5',
  });
 
  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await addDoc(collection(db, 'feedback'), {
        ...form,
        createdAt: serverTimestamp(),
      });
 
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting feedback: ' + err.message);
    }
  };
 
  return (
    <div className="feedback-page">
      <h2>We value your feedback</h2>
 
      {submitted ? (
        <div className="thank-you">
          <p>✅ Thanks for your feedback!</p>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
 
          <label>Rating</label>
          <select name="rating" value={form.rating} onChange={handleChange} required>
            <option value="5">★★★★★ - Excellent</option>
            <option value="4">★★★★ - Good</option>
            <option value="3">★★★ - Average</option>
            <option value="2">★★ - Poor</option>
            <option value="1">★ - Bad</option>
          </select>
 
          <label>Comment</label>
          <textarea
            name="comment"
            placeholder="Write your review..."
            value={form.comment}
            onChange={handleChange}
            required
          />
 
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};
 
export default FeedbackPage;