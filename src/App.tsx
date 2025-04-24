import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import ScanHistory from './components/ScanHistory';
import CardPaymentButton from './components/CardPaymentButton';
import ChangePassword from './components/ChangePassword';
import Register from './pages/Register';
import PricingPage from './pages/PricingPage';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks';
import ImageUploadWithWallet from './components/ImageUploadWithWallet';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));
  const [showPayments, setShowPayments] = useState(false);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <Login
                onLogin={(_username: string) => {              
                  setIsLoggedIn(true);
                }}
              />
            }
          />

          <Route
            path="/upload"
            element={
              isLoggedIn ? (
                <div className="App">
                  <h2>👩‍💼 Вход в аккаунт</h2>
                  <button
                    onClick={() => setShowPayments(!showPayments)}
                    style={{ marginBottom: 20 }}
                  >
                    📄 История платежей
                  </button>
                  <ImageUploadWithWallet />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/user/history" element={<ScanHistory />} />
          <Route path="/manual-payment" element={<CardPaymentButton />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
