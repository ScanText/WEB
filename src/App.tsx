import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import SubscriptionCheck from './crypto/SubscriptionCheck';
import WalletConnect from './crypto/WalletConnect';

function App() {
  const [walletConnected, setWalletConnected] = useState(true); // заглушка, потом будет useWallet
  const [subscriptionActive, setSubscriptionActive] = useState(false); // заглушка

  return (
    <div className="App">
      <h2>📷 Распознавание текста с изображения</h2>

      {/* Подключение кошелька */}
      <WalletConnect onConnect={() => setWalletConnected(true)} />

      {/* Подписка */}
      {walletConnected && (
      <SubscriptionCheck
        subscribed={subscriptionActive}
        onSubscribe={() => setSubscriptionActive(true)}
      />
    )}

      {/* Загрузка изображения — только если подписка активна */}
      {walletConnected && subscriptionActive && <ImageUpload />}
    </div>
  );
}

export default App;
