import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import WalletConnect from '../crypto/WalletConnect';
import SubscriptionCheck from '../crypto/SubscriptionCheck';
import PreviewCarousel from '../components/PreviewCarousel';
import userPlaceholder from '../assets/logo.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem('userPhoto'));
  const [walletConnected, setWalletConnected] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [uploadCount, setUploadCount] = useState(() => {
    const saved = localStorage.getItem('uploadCount');
    return saved ? parseInt(saved) : 0;
  });
  const availablePhotos = 50;

  const loggedUser = localStorage.getItem('loggedInUser');
  const isLoggedIn = !!loggedUser;
  const username = loggedUser || '';

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

  const isUploadAvailable = subscriptionActive || uploadCount < 3;
  const handleUploadSuccess = () => {
    setUploadCount((prev) => {
      const updated = prev + 1;
      localStorage.setItem('uploadCount', updated.toString());
      return updated;
    });
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} hasSubscription={subscriptionActive} />
      <main style={styles.pageContainer}>
       
       
      {!isLoggedIn && (
        <div style={{ marginTop: 20, width: '100%' }}>
          <h2 style={{ textAlign: 'center' }}>Как работает ScanText?</h2>

          <div style={styles.infoBox}>
          <h3 style={{ color: '#333' }}>👀 Главное различие для пользователей</h3>
          <div style={styles.userTypes}>
            <div style={styles.userType}>
              <h4>🔸 Незарегистрированный пользователь:</h4>
              <ul>
                <li>Может просматривать, как работает сервис</li>
                <li>После входа вы увидите количество загрузок, доступных на текущую дату</li>
                <li>
                  Получите большую квоту сканирований, зарегистрировавшись, и
                  <strong style={{ color: '#3f51b5', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                    {' '}неограниченное количество сканирований, оформив подписку
                  </strong>
                </li>
              </ul>
            </div>

            <div style={styles.userType}>
              <h4>🔹 Зарегистрированный пользователь:</h4>
              <ul>
                <li>Загружает изображение</li>
                <li>Получает текст</li>
                <li>Можно 3 раза бесплатно распознать текст</li>
                <li>
                  После трёх раз — появляется предложение
                  <button
                    style={styles.linkBtn}
                    onClick={() => navigate('/pricing')}
                  >
                    Оформить Plus
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
            <PreviewCarousel />
          </div>
        )}
        {isLoggedIn && (
          <>
            <div style={styles.leftSidebar}>
              <img
                src={userPhoto || userPlaceholder}
                alt="Логотип пользователя"
                style={styles.logo}
              />
              <p style={{ fontWeight: 'bold', marginTop: 10 }}>👤 Логотип пользователя</p>
              <label htmlFor="photoUpload" style={styles.uploadLabel}>📤 Загрузить фото</label>
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
                <button onClick={() => navigate('/register')} style={styles.button}>📝 Зарегистрироваться</button>
              </div>
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
                >📄 Перейти к отзывам</button>
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

              {walletConnected && isUploadAvailable && (
                <ImageUpload onSuccess={handleUploadSuccess} />
              )}

              {walletConnected && !subscriptionActive && uploadCount >= 3 && (
                <div style={styles.notice}>
                  <p>💡 Вы использовали 3 бесплатные попытки.</p>
                  <p>
                    Пожалуйста, <strong>оформите подписку</strong> для продолжения.
                  </p>
                  <button
                    onClick={() => navigate('/pricing')}
                    style={styles.plusBtn}
                  >
                    ⭐ Оплатить подписку
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 40,
    fontFamily: 'Segoe UI, sans-serif',
  },
  leftSidebar: {
    width: 260,
    marginRight: 40,
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#eef2f7',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  userTypes: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  userType: {
    flex: 1,
    minWidth: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    border: '1px solid #ddd',
  },
  logo: {
    width: 140,
    height: 140,
    margin: '0 auto',
    borderRadius: '50%',
    border: '2px solid #ccc',
    objectFit: 'cover',
  },
  uploadLabel: {
    cursor: 'pointer',
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 8,
    display: 'inline-block',
    marginTop: 10,
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
    marginLeft: 6,
    fontSize: 'inherit',
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
  notice: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderRadius: 10,
    border: '1px solid #ffeeba',
  },
};

export default HomePage;
