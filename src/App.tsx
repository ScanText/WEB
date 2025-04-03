import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ImageUpload from './components/ImageUpload';
import WalletConnect from './crypto/WalletConnect';
import SubscriptionCheck from './crypto/SubscriptionCheck';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem('loggedInUser') // Проверка, вошел ли ранее
  );
  const [showPayments, setShowPayments] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 🌐 Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Страница входа */}
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

        {/* 🛠 Админпанель */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <div className="App">
                <h2>👩‍💼 Вход в аккаунт</h2>

                <button
                  onClick={() => setShowPayments(!showPayments)}
                  style={{
                    marginBottom: 20,
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
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
      </Routes>
    </Router>
  );
}

export default App;
