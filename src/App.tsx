import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import CardPaymentButton from './components/CardPaymentButton';
// import ManualPayment from './components/ManualPayment';
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
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('loggedInUser'));
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
              onLogin={() => {
                setIsAdmin(true);
                localStorage.setItem('loggedInUser', 'true');
              }}
            />
          }
        />

        <Route
          path="/login"
          element={
            isAdmin ? (
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
        <Route path="/manual-payment" element={<CardPaymentButton />} />
        {/* <Route path="/manual-payment" element={<ManualPayment />} /> */}
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
