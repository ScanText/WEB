import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import SubscriptionCheck from './crypto/SubscriptionCheck';
import WalletConnect from './crypto/WalletConnect';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  return (
    <div className="App">
      {/* 🔐 Авторизация */}
      {!isAdmin ? (
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      ) : (
        <>
          <h2>Админпанель</h2>

          {/* 📄 Кнопка показать/скрыть платежи */}
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
              cursor: 'pointer'
            }}
          >
            📄 История платежей
          </button>

          {showPayments && <AdminPanel />}

          {/* 💳 Кошелек */}
          <WalletConnect onConnect={() => setWalletConnected(true)} />

          {/* 🔔 Подписка */}
          {walletConnected && (
            <SubscriptionCheck
              subscribed={subscriptionActive}
              onSubscribe={() => setSubscriptionActive(true)}
            />
          )}

          {/* 📤 Загрузка изображения */}
          {walletConnected && subscriptionActive && <ImageUpload />}
        </>
      )}
    </div>
  );
}

export default App;
