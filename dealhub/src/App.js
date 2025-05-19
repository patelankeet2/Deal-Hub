import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import MerchantLogin from './components/MerchantLogin';
import MerchantDashboard from './components/MerchantDashboard';
import CreateDeal from './components/CreateDeal';
import AnalyticsPage from './components/AnalyticsPage';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/merchant-login" element={<MerchantLogin />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard/>} /> 
        <Route path="/create-deal" element={<CreateDeal />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
