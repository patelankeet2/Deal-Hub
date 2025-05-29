import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
      <h2>Admin Dashboard</h2>
 
      <div className="admin-stats">
        <div className="stat-box">
          <p>Total Users</p>
          <h3>{stats.totalUsers}</h3>
        </div>
        <div className="stat-box">
          <p>Total Merchants</p>
          <h3>{stats.totalMerchants}</h3>
        </div>
        <div className="stat-box">
          <p>Total Deals</p>
          <h3>{stats.totalDeals}</h3>
        </div>
        <div className="stat-box">
          <p>Approved Deals</p>
          <h3>{stats.approvedDeals}</h3>
        </div>
        <div className="stat-box">
          <p>Total Earnings (5%)</p>
          <h3>${stats.totalEarnings.toFixed(2)}</h3>
        </div>
      </div>
 
      <footer className="footer">
        <p>© 2025 DealHub Admin Panel</p>
      </footer>
    </div>
  );
};
 
export default AdminDashboard;