import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Register from './pages/Register';
import PricingPage from './pages/PricingPage';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks';
import ImageUploadWithWallet from './components/ImageUploadWithWallet';
import AboutPage from './pages/AboutPage';

function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('loggedInUser'));
  const [showPayments, setShowPayments] = useState(false);

  return (
    <Router>
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
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
      </Routes>
    </Router>
  );
}

export default App;
