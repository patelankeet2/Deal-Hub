import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMerchants: 0,
    totalDeals: 0,
    approvedDeals: 0,
    totalEarnings: 0
  });
 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const dealsSnap = await getDocs(collection(db, 'deals'));
 
        let totalUsers = 0;
        let totalMerchants = 0;
        let totalDeals = 0;
        let approvedDeals = 0;
        let totalEarnings = 0;
 
        usersSnap.forEach(doc => {
          const data = doc.data();
          totalUsers++;
          if (data.role === 'merchant') totalMerchants++;
        });
 
        dealsSnap.forEach(doc => {
          const deal = doc.data();
          totalDeals++;
          if (deal.approved) {
            approvedDeals++;
            const netPrice = deal.price * (1 - deal.discount / 100);
            const adminCommission = netPrice * 0.05;
            totalEarnings += adminCommission;
          }
        });
 
        setStats({
          totalUsers,
          totalMerchants,
          totalDeals,
          approvedDeals,
          totalEarnings
        });
 
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };
 
    fetchStats();
  }, []);
 
  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">
        <h2>📊 Admin Dashboard Overview</h2>
 
        <div className="admin-grid">
          <div className="admin-card">
            <p>Total Users</p>
            <h3>{stats.totalUsers}</h3>
          </div>
          <div className="admin-card">
            <p>Total Merchants</p>
            <h3>{stats.totalMerchants}</h3>
          </div>
          <div className="admin-card">
            <p>Total Deals</p>
            <h3>{stats.totalDeals}</h3>
          </div>
          <div className="admin-card">
            <p>Approved Deals</p>
            <h3>{stats.approvedDeals}</h3>
          </div>
          <div className="admin-card highlight">
            <p>Total Earnings (5%)</p>
            <h3>${stats.totalEarnings.toFixed(2)}</h3>
          </div>
        </div>
      </div>
 
      <footer className="footer">
        © {new Date().getFullYear()} DealHub Admin Panel
      </footer>
    </div>
  );
};
 
export default AdminDashboard;