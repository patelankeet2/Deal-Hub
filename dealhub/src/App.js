import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import MerchantLogin from './components/MerchantLogin';
// admin pages
import AdminManageDeals from './components/AdminManageDeals';
import AdminEarnings from './components/AdminEarnings';
import AdminProfile from './components/AdminProfile';
import AdminDashboard from './components/AdminDashboard';
import AdminManageUsers from './components/AdminManageUsers';
// merchant page
import MerchantDashboard from './components/MerchantDashboard';
import CreateDeal from './components/CreateDeal';
import AnalyticsPage from './components/AnalyticsPage';
import Settings from './components/Settings';
import MerchantRegister from './components/MerchantRegister';
import MerchantForgotPassword from './components/MerchantForgotPassword';
import DealsPage from './components/DealsPage';
import DealDetailsPage from './components/DealDetailsPage';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import FeedbackPage from './components/FeedbackPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import CustomerProfilePage from './components/CustomerProfilePage.JS';
import MerchantDealsPage from './components/MerchantDealsPage';
import MerchantCustomersPage from './components/MerchantCustomersPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/deal/:dealId" element={<DealDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/orders" element={<OrderTrackingPage />} />
        <Route path="/profile" element={<CustomerProfilePage />} />
 
        <Route path="/merchant-login" element={<MerchantLogin />} />

        <Route path="/admin-manage-deals" element={<AdminManageDeals />} />
        <Route path="/admin-earnings" element={<AdminEarnings />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-users" element={<AdminManageUsers />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard/>} /> 
        <Route path="/create-deal" element={<CreateDeal />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/merchant-register" element={<MerchantRegister />} />
        <Route path="/merchant-forgot-password" element={<MerchantForgotPassword />} />
        <Route path="/merchant-deals" element={<MerchantDealsPage />} />
        <Route path="/merchant-customers" element={<MerchantCustomersPage />} />

      </Routes>
    </Router>
  );
}

export default App;
