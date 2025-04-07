import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ImageUpload from '../components/ImageUpload';
import userPlaceholder from '../assets/logo.png';
import WalletConnect from '../crypto/WalletConnect';
import SubscriptionCheck from '../crypto/SubscriptionCheck';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [availablePhotos] = useState<number>(50);
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem('userPhoto'));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem('userPhoto', base64);
        setUserPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };
  
 
  return (
    <div style={styles.pageContainer}>
      <div style={styles.leftSidebar}>
       <img
            src={userPhoto || userPlaceholder}
            alt="Логотип пользователя"
            style={styles.logo}
          />
          <p style={{ fontWeight: 'bold', marginTop: 10 }}>👤 Логотип пользователя</p>

          <label htmlFor="photoUpload" style={styles.uploadLabel}>
            📤 Загрузить фото
          </label>
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => {
              localStorage.removeItem('userPhoto');
              setUserPhoto(null);
            }}
            style={{ ...styles.button, backgroundColor: '#e57777', marginTop: 4 }}
          >
            🗑 Удалить фото
          </button>
        <p style={{ marginTop: 20 }}><strong>🖼 Доступно загрузок:</strong> {availablePhotos} изображений</p>

        <div style={styles.buttonColumn}>
          <button onClick={() => navigate('/login')} style={styles.button}>🔐 Войти</button>
          <button onClick={() => window.location.href = 'https://your-register-site.com'} style={styles.button}>📝 Зарегистрироваться</button>
        </div>

        {/* Отзывы: только кнопка и смайлики */}
        <div style={styles.feedbackBox}>
        <h4>🗣 Отзывы</h4>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <button disabled>👍</button>
          <button disabled>😐</button>
          <button disabled>👎</button>
        </div>
        <button
          onClick={() => navigate('/feedbacks')}
          style={{ ...styles.button, backgroundColor: '#3f51b5' }}
        >
          📄 Перейти к отзывам
        </button>

          <button
            onClick={() => navigate('/users')}
            style={{ ...styles.button, backgroundColor: '#3f51b5', marginTop: 10 }}
          >
            👥 Посетители
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <h2 style={{ marginTop: 30 }}>📷 Распознавание текста с изображения</h2>

        <WalletConnect onConnect={() => setWalletConnected(true)} />
        {walletConnected && (
          <SubscriptionCheck
            subscribed={subscriptionActive}
            onSubscribe={() => setSubscriptionActive(true)}
          />
        )}

        {walletConnected && subscriptionActive && <ImageUpload />}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    padding: 40,
    fontFamily: 'Segoe UI, sans-serif',
  },
  leftSidebar: {
    width: 260,
    marginRight: 40,
    textAlign: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    margin: '0 auto',
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
  usersBox: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    fontSize: 13,
    textAlign: 'left',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #999',
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: 8,
  },
};

export default HomePage;
