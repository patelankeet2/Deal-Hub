// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage'; // <<<<< Updated this line
import MerchantLogin from './components/MerchantLogin'; // You already have this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/merchant-login" element={<MerchantLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
