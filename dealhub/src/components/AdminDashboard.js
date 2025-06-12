import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
 
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMerchants: 0,
    totalDeals: 0,
    approvedDeals: 0,
    totalEarnings: 0
  });
  const [earningsData, setEarningsData] = useState([]);
 
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
        const earningsList = [];
 
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
            const commission = parseFloat((netPrice * 0.05).toFixed(2));
            totalEarnings += commission;
 
            earningsList.push({
              title: deal.title.length > 20 ? deal.title.slice(0, 17) + '...' : deal.title,
              commission,
            });
          }
        });
 
        // Sort & take top 10 earning deals (optional but improves clarity)
        const topEarnings = earningsList
          .sort((a, b) => b.commission - a.commission)
          .slice(0, 15);
 
        setStats({
          totalUsers,
          totalMerchants,
          totalDeals,
          approvedDeals,
          totalEarnings,
        });
 
        setEarningsData(topEarnings);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
 
    fetchStats();
  }, []);
 
  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">
        <h2>📊 Admin Dashboard Overview</h2>
 
        <div className="admin-grid">
          <div className="admin-card"><p>Total Users</p><h3>{stats.totalUsers}</h3></div>
          <div className="admin-card"><p>Total Merchants</p><h3>{stats.totalMerchants}</h3></div>
          <div className="admin-card"><p>Total Deals</p><h3>{stats.totalDeals}</h3></div>
          <div className="admin-card"><p>Approved Deals</p><h3>{stats.approvedDeals}</h3></div>
          <div className="admin-card highlight">
            <p>Total Earnings (5%)</p>
            <h3>${stats.totalEarnings.toFixed(2)}</h3>
          </div>
        </div>
 
        <div className="chart-section">
          <h3>Earnings by Approved Deal</h3>
          {earningsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="title"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={90}
                  tick={{ fontSize: 11 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commission" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No approved deals to show.</p>
          )}
        </div>
      </div>
 
      <footer className="footer">
        © {new Date().getFullYear()} DealHub Admin Panel
      </footer>
    </div>
  );
};
 
export default AdminDashboard;