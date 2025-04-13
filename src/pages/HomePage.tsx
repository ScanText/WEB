import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUploadWithWallet from '../components/ImageUploadWithWallet';
import PreviewCarousel from '../components/PreviewCarousel';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem('userPhoto'));
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;

  useEffect(() => {
    const isActive = localStorage.getItem('subscription') === 'true';
    setSubscriptionActive(isActive);

    const savedPhoto = localStorage.getItem('userPhoto');
    setUserPhoto(savedPhoto);
  }, [login]);

  useEffect(() => {
    const currentUser = localStorage.getItem('loggedInUser');
    const storedUser = localStorage.getItem('previousUser');

    if (storedUser && storedUser !== currentUser) {
      localStorage.setItem('subscription', 'false');
      localStorage.setItem('uploadCount', '0');
      setSubscriptionActive(false);
    }

    localStorage.setItem('previousUser', currentUser || '');
    const isActive = localStorage.getItem('subscription') === 'true';
    setSubscriptionActive(isActive);
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        login={login}
        hasSubscription={subscriptionActive}
        userPhoto={userPhoto}
      />
      <main style={styles.pageContainer}>
        {!isLoggedIn && (
          <div style={{ marginTop: 20, width: '100%' }}>
            <h2 style={{ textAlign: 'center' }}>👀Распознай меня</h2>
            <div style={styles.infoBox}>
              <h3 style={{ color: '#333' }}>Будьте на волне с ИИ</h3>
              <h4 style={{ color: '#333' }}>  </h4>
              <div style={styles.userTypes}>
                <div style={styles.userType}>
                  <h4>🔸 Незарегистрированный пользователь:</h4>
                  <ul>
                    <li>Может просматривать, как работает сервис</li>
                    <li>После входа вы увидите количество загрузок, доступных на текущую дату</li>
                    <li>
                      Получите большую квоту сканирований, зарегистрировавшись, и
                      <strong
                        style={{ color: '#3f51b5', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                      >
                        {' '}неограниченное количество сканирований, оформив подписку
                      </strong>
                    </li>
                  </ul>
                </div>

                <div style={styles.userType}>
                  <h4>🔹 Зарегистрированный пользователь:</h4>
                  <ul>
                    <li>Загружает изображение</li>
                    <li>Получает пребразованный текст из изображения</li>
                    <li>Есть возможность 3 раза бесплатно распознать текст</li>
                    <li>
                      В дальнейшем — предлагается 
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
          <div style={styles.mainContent}>
            <h2 style={{ marginTop: 30 }}>📷 Распознавание текста с изображения</h2>
            <ImageUploadWithWallet />
          </div>
          
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
  mainContent: {
    flex: 1,
    textAlign: 'center',
  },
};

export default HomePage;
