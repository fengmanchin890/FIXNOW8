import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import BookingFlow from './pages/BookingFlow';
import TrackingPage from './pages/TrackingPage';
import FeatureDemo from './pages/FeatureDemo';
import FeatureTest from './pages/FeatureTest';
import ArtisanAuth from './pages/ArtisanAuth';
import UserAuth from './pages/UserAuth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/auth" element={<UserAuth />} />
          <Route path="/artisan" element={<ArtisanDashboard />} />
          <Route path="/artisan/auth" element={<ArtisanAuth />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route path="/track/:orderId" element={<TrackingPage />} />
          <Route path="/demo" element={<FeatureDemo />} />
          <Route path="/test" element={<FeatureTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;