// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';
import ImageUploadWithWallet from '../components/ImageUploadWithWallet';
import PreviewCarousel from '../components/PreviewCarousel';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // const [userPhoto, setUserPhoto] = useState(localStorage.getItem('userPhoto'));
  // const [subscriptionActive, setSubscriptionActive] = useState(false);

  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;

  // useEffect(() => {
  //   const isActive = localStorage.getItem('subscription') === 'true';
  //   setSubscriptionActive(isActive);

  //   const savedPhoto = localStorage.getItem('userPhoto');
  //   setUserPhoto(savedPhoto);
  // }, [login]);

  // useEffect(() => {
  //   const currentUser = localStorage.getItem('loggedInUser');
  //   const storedUser = localStorage.getItem('previousUser');

  //   if (storedUser && storedUser !== currentUser) {
  //     localStorage.setItem('subscription', 'false');
  //     localStorage.setItem('uploadCount', '0');
  //     setSubscriptionActive(false);
  //   }

  //   localStorage.setItem('previousUser', currentUser || '');
  //   const isActive = localStorage.getItem('subscription') === 'true';
  //   setSubscriptionActive(isActive);
  // }, []);

  return (
    <>
      <main style={styles.pageContainer}>
        {!isLoggedIn && (
          <div style={styles.accessSection}>
          {/* Левая часть — информация */}
          <div style={styles.infoBox}>
            <h3 style={{ color: '#333' }}>ScanText — доступ</h3>
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
                      {' '}неограниченный доступ с подпиской
                    </strong>
                  </li>
                </ul>
              </div>
        
              <div style={styles.userType}>
                <h4>🔹 Зарегистрированный пользователь:</h4>
                <ul>
                  <li>Загружает изображение</li>
                  <li>Получает преобразованный текст из изображения</li>
                  <li>3 бесплатных попытки</li>
                  <li>
                    Далее — 
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
        
          {/* Правая часть — карусель */}
          <div style={styles.carouselBox}>
            <PreviewCarousel />
          </div>
        </div>
        )} 
        {isLoggedIn && (
          <div style={styles.mainContent}>
            <h2 style={{ marginTop: 30 }}>📷 Распознавание текста с изображения</h2>
            <ImageUploadWithWallet />
          </div>
          
        )}
      </main>
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

  // Общая секция: блоки слева (инфо) и справа (гифка + карусель)
  accessSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
    flexWrap: 'wrap',
    marginTop: 30,
  },

  // Левая часть: два блока пользователя (незарегистр. и зарегистр.)
  infoBox: {
    flex: 1,
    minWidth: 280,
    padding: 20,
    backgroundColor: '#eef2f7',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  // Блок каждого типа пользователя
  userType: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    border: '1px solid #ddd',
  },

  // Кнопка-ссылка «Оформить Plus»
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

  // Правая часть: гифка и карусель
  rightSide: {
    flex: 1,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },

  // Обёртка над гифкой
  imageBox: {
    textAlign: 'center',
  },

  // Сама гифка
  animatedImage: {
    maxWidth: 320,
    width: '100%',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },

  // Обёртка под PreviewCarousel
  carouselBox: {
    maxWidth: 400,
    width: '100%',
  },

  // Центрированный контент после входа
  mainContent: {
    flex: 1,
    textAlign: 'center',
  },
};

export default HomePage;
