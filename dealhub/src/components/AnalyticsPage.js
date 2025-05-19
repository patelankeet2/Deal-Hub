import React from 'react';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  return (
    <div className="analytics-container">
      <header className="analytics-topbar">
        <div className="logo">DealHub</div>
        <nav className="nav-links">
          <a href="/merchant-dashboard">Dashboard</a>
          <a href="/create-deal">Add-Deals</a>
          <a href="/analytics" className="active">Analytics</a>
          <a href="/settings">Settings</a>
        </nav>
        <div className="actions">
          <button className="create-deal-btn">Create New Deal</button>
          <div className="profile-circle">A</div>
        </div>
      </header>

      <div className="analytics-layout">
        <aside className="analytics-sidebar">
          <h4>Filter & Control</h4>
          <div className="filter-group">
            <label>Date Range</label>
            <select>
              <option>Last 30 Days</option>
              <option>Last 60 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select>
              <option>All Categories</option>
              <option>Courses</option>
              <option>Software</option>
              <option>Fitness</option>
            </select>
          </div>
          <button className="apply-btn">Apply Filters</button>
        </aside>

        <main className="analytics-main">
          <h2>Deal Performance Page</h2>
          <div className="metrics-row">
            <div className="metric-card">
              <h4>Total Views</h4>
              <p>12,345</p>
              <span className="positive">↑ 15.1%</span>
            </div>
            <div className="metric-card">
              <h4>Total Purchases</h4>
              <p>1,120</p>
              <span className="positive">↑ 9.5%</span>
            </div>
            <div className="metric-card">
              <h4>Conversion Rate</h4>
              <p>9.07%</p>
              <span className="positive">↑ 0.2%</span>
            </div>
            <div className="metric-card">
              <h4>Average CTR</h4>
              <p>5.5%</p>
              <span className="negative">↓ 1.1%</span>
            </div>
          </div>

          <div className="charts">
            <div className="chart-card">📈 Views Trend (Chart Placeholder)</div>
            <div className="chart-card">📉 Purchases Trend (Chart Placeholder)</div>
          </div>

          <section className="performance-table">
            <h3>Individual Deal Performance</h3>
            <table>
              <thead>
                <tr>
                  <th>Deal Name</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Purchases</th>
                  <th>CTR</th>
                  <th>Dates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Holiday Sale 2023</td>
                  <td><span className="badge expired">Expired</span></td>
                  <td>5,500</td>
                  <td>500</td>
                  <td>9.09%</td>
                  <td>2023-12-01 – 2023-12-31</td>
                </tr>
                <tr>
                  <td>Spring Clearance</td>
                  <td><span className="badge active">Active</span></td>
                  <td>1,500</td>
                  <td>120</td>
                  <td>8.00%</td>
                  <td>2024-04-01 – 2024-04-30</td>
                </tr>
                <tr>
                  <td>Back to School</td>
                  <td><span className="badge draft">Draft</span></td>
                  <td>0</td>
                  <td>0</td>
                  <td>0.00%</td>
                  <td>2024-08-01 – 2024-08-31</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>© 2024 DealHub Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AnalyticsPage;
