import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import MerchantLogin from './components/MerchantLogin';
import AdminManageDeals from './components/AdminManageDeals';
import AdminEarnings from './components/AdminEarnings';
import AdminProfile from './components/AdminProfile';
import AdminDashboard from './components/AdminDashboard';
import AdminManageUsers from './components/AdminManageUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/merchant-login" element={<MerchantLogin />} />
        <Route path="/admin-manage-deals" element={<AdminManageDeals />} />
        <Route path="/admin-earnings" element={<AdminEarnings />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-users" element={<AdminManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
