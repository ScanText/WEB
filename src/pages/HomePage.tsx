import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import positive from '../data/positive_reviews.json';
import neutral from '../data/neutral_reviews.json';
import negative from '../data/negative_reviews.json';
import userPlaceholder from '../assets/logo.png';
import WalletConnect from '../crypto/WalletConnect';
import SubscriptionCheck from '../crypto/SubscriptionCheck';

type FeedbackItem = {
  email: string;
  date: string;
  review: string;
  service: string;
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [availablePhotos] = useState<number>(50);
  const [category, setCategory] = useState<'positive' | 'neutral' | 'negative'>('positive');
  const userPhoto = localStorage.getItem('userPhoto');
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  const getFeedbackData = (): FeedbackItem[] => {
    switch (category) {
      case 'neutral':
        return neutral;
      case 'negative':
        return negative;
      default:
        return positive;
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* 📌 Левая колонка */}
      <div style={styles.leftSidebar}>
        <img
          src={userPhoto || userPlaceholder}
          alt="Логотип пользователя"
          style={styles.logo}
        />
        <p style={{ fontWeight: 'bold', marginTop: 10 }}>👤 Логотип пользователя</p>

        <p style={{ marginTop: 20 }}>
          <strong>🖼 Доступно загрузок:</strong> {availablePhotos} изображений
        </p>

        <div style={styles.buttonColumn}>
          <button onClick={() => navigate('/login')} style={styles.button}>🔐 Войти</button>
          <button onClick={() => window.location.href = 'https://your-register-url.com'} style={styles.button}>📝 Зарегистрироваться</button>
        </div>

        {/* 💬 Блок с отзывами */}
        <div style={styles.feedbackBox}>
          <h4>🗣 Отзывы</h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button onClick={() => setCategory('positive')}>👍</button>
            <button onClick={() => setCategory('neutral')}>😐</button>
            <button onClick={() => setCategory('negative')}>👎</button>
          </div>
          {getFeedbackData().map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <strong>{item.email.split('@')[0]}:</strong> {item.review}
            </div>
          ))}
        </div>
      </div>

      {/* 🧠 Правая часть */}
      <div style={styles.mainContent}>
        <h2 style={{ marginTop: 30 }}>📷 Распознавание текста с изображения</h2>

        {/* 🔗 Кошелек */}
        <WalletConnect onConnect={() => setWalletConnected(true)} />

        {/* 💳 Подписка */}
        {walletConnected && (
          <SubscriptionCheck
            subscribed={subscriptionActive}
            onSubscribe={() => setSubscriptionActive(true)}
          />
        )}

        {/* 📤 Загрузка изображений */}
        {walletConnected && subscriptionActive && (
          <ImageUpload />
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 40,
    fontFamily: 'Segoe UI, sans-serif',
  },
  leftSidebar: {
    width: 260,
    marginRight: 40,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: '2px solid #ccc',
    objectFit: 'cover',
  },
  buttonColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: '10px 18px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#5c6bc0',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
  },
  mainContent: {
    flex: 1,
    textAlign: 'center',
  },
  feedbackBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'left',
  },
};

export default HomePage;
