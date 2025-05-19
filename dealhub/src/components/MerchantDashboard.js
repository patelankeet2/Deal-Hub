import React from 'react';
import './MerchantDashboard.css';
import {
  FaBell,
  FaChartBar,
  FaClipboardList,
  FaDollarSign,
  FaHandshake,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const MerchantDashboard = () => {
  const handleEdit = (dealName) => alert(`Edit ${dealName}`);
  const handleDelete = (dealName) => alert(`Delete ${dealName}`);

  const deals = [
    { name: "Acme Corp Partnership", value: "$15000.00", status: "Active", date: "10/26/2023" },
    { name: "Beta Solutions Consulting", value: "$8500.00", status: "Pending Approval", date: "11/1/2023" },
    { name: "Gamma Innovations Project", value: "$22000.00", status: "Closed Won", date: "9/15/2023" },
    { name: "Delta Services Renewal", value: "$5000.00", status: "Active", date: "10/5/2023" },
    { name: "Epsilon Systems Implementation", value: "$35000.00", status: "Closed Lost", date: "8/20/2023" },
    { name: "Zeta Analytics Integration", value: "$11000.00", status: "Active", date: "11/10/2023" },
    { name: "Theta Enterprises Upgrade", value: "$7000.00", status: "Pending Approval", date: "11/15/2023" },
    { name: "Iota Solutions Pilot", value: "$4000.00", status: "Active", date: "11/12/2023" },
    { name: "Kappa Corp Consulting", value: "$9000.00", status: "Closed Won", date: "10/30/2023" },
    { name: "Lambda Labs Partnership", value: "$18000.00", status: "Active", date: "11/25/2023" },
    { name: "Mu Technologies Service", value: "$6000.00", status: "Pending Approval", date: "11/28/2023" },
    { name: "Nu Systems Support", value: "$3000.00", status: "Active", date: "12/1/2023" },
  ];

  return (
    <div className="merchant-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>DealHub</h2>
        </div>
        <nav>
          <ul>
            <li className="active">My Deals</li>
            <li>Analytics</li>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </nav>
        <div className="user-info">
          <div className="avatar">A</div>
          <div className="username">Alex Johnson</div>
          <div className="settings">Settings</div>
        </div>
      </aside>

      <main className="dashboard-content">
        <div className="header">
          <h1>Merchant Dashboard</h1>
          <button className="create-btn" onClick={() => alert('Create New Deal')}>+ Create New Deal</button>
        </div>

        <div className="metrics">
          <div className="metric-card">
            <FaHandshake />
            <div>
              <h3>Deals Sold</h3>
              <p>189</p>
            </div>
          </div>
          <div className="metric-card">
            <FaDollarSign />
            <div>
              <h3>Total Earnings</h3>
              <p>$125,450</p>
            </div>
          </div>
          <div className="metric-card">
            <FaClipboardList />
            <div>
              <h3>Pending Approvals</h3>
              <p>5</p>
            </div>
          </div>
          <div className="metric-card">
            <FaChartBar />
            <div>
              <h3>Conversion Rate</h3>
              <p>18.5%</p>
            </div>
          </div>
        </div>

        <section className="notifications">
          <h2>Recent Notifications</h2>
          <ul>
            <li className="success">Deal "Acme Corp Partnership" updated successfully.</li>
            <li className="info">Weekly performance report ready for review.</li>
            <li className="error">Failed to sync data with external CRM.</li>
            <li className="success">New deal "Zeta Analytics Integration" created.</li>
          </ul>
        </section>

        <section className="current-deals">
          <h2>Current Deals</h2>
          <table>
            <thead>
              <tr>
                <th>Deal Name</th>
                <th>Value</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr key={index}>
                  <td>{deal.name}</td>
                  <td>{deal.value}</td>
                  <td>
                    <span className={`badge ${deal.status.toLowerCase().replace(' ', '-')}`}>
                      {deal.status}
                    </span>
                  </td>
                  <td>{deal.date}</td>
                  <td>
                    <button onClick={() => handleEdit(deal.name)}><FaEdit /></button>
                    <button onClick={() => handleDelete(deal.name)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="earnings-trend">
          <h2>Earnings Trend</h2>
          <img
            src="https://via.placeholder.com/600x300?text=Earnings+Trend+Chart"
            alt="Earnings Chart"
          />
        </section>

        <footer className="footer">© 2024 DealHub Co. All rights reserved.</footer>
      </main>
    </div>
  );
};

export default MerchantDashboard;
