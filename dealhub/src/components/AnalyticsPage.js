import React, { useEffect, useState } from 'react';
import './AnalyticsPage.css';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState(null);
  const [merchantEmail, setMerchantEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMerchantEmail(user.email);
      } else {
        setMerchantEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!merchantEmail) return;

    const fetchDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), where('createdBy', '==', merchantEmail));
        const snapshot = await getDocs(q);
        const deals = snapshot.docs.map(doc => doc.data());

        const categoryCount = {};
        const dealLabels = [];
        const earningsData = [];
        let totalEarnings = 0;

        deals.forEach((deal) => {
          categoryCount[deal.category] = (categoryCount[deal.category] || 0) + 1;

          if (deal.approved) {
            const net = deal.price * (1 - deal.discount / 100);
            totalEarnings += net;
            dealLabels.push(deal.title);
            earningsData.push(net);
          }
        });

        setChartData({
          totalDeals: deals.length,
          totalEarnings,
          categoryBar: {
            labels: Object.keys(categoryCount),
            datasets: [
              {
                label: 'Deals per Category',
                data: Object.values(categoryCount),
                backgroundColor: '#6366f1'
              }
            ]
          },
          earningsLine: {
            labels: dealLabels,
            datasets: [
              {
                label: 'Earnings per Deal',
                data: earningsData,
                fill: false,
                borderColor: '#10b981',
                tension: 0.3
              }
            ]
          }
        });
      } catch (error) {
        console.error('Error loading analytics:', error);
      }
    };

    fetchDeals();
  }, [merchantEmail]);

  return (
    <div className="analytics-page">
      <h2>Deal Performance Analytics</h2>

      {!chartData ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Deals</h3>
              <p>{chartData.totalDeals}</p>
            </div>
            <div className="summary-card">
              <h3>Total Earnings</h3>
              <p>${chartData.totalEarnings.toFixed(2)}</p>
            </div>
          </div>

          <div className="chart-container">
            <h4>Deals by Category</h4>
            <Bar data={chartData.categoryBar} />
          </div>

          <div className="chart-container">
            <h4>Earnings per Deal</h4>
            <Line data={chartData.earningsLine} />
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
