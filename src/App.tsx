import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks'; // ✅ добавлен импорт
import ImageUpload from './components/ImageUpload';
import WalletConnect from './crypto/WalletConnect';
import SubscriptionCheck from './crypto/SubscriptionCheck';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
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
          path="/admin"
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
                <WalletConnect onConnect={() => setWalletConnected(true)} />
                {walletConnected && (
                  <SubscriptionCheck
                    subscribed={subscriptionActive}
                    onSubscribe={() => setSubscriptionActive(true)}
                  />
                )}
                {walletConnected && subscriptionActive && <ImageUpload />}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/users" element={<UsersPage />} />
        {/* ✅ новый маршрут для страницы отзывов */}
        <Route path="/feedbacks" element={<Feedbacks />} />
      </Routes>
    </Router>
  );
}

export default App;
