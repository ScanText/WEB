import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        isLoggedIn={!!localStorage.getItem('loggedInUser')}
        login={localStorage.getItem('loggedInUser') || ''}
        hasSubscription={localStorage.getItem('subscription') === 'true'}
        userPhoto={localStorage.getItem('userPhoto')}
      />
      <div style={styles.container}>
        <h2 style={styles.header}>📣 Почему ScanText?</h2>
        <p style={styles.intro}>
          ScanText — это удобный, быстрый и интеллектуальный онлайн-сервис для распознавания текста с изображений.
        </p>

        <div style={styles.featuresGrid}>
          <div style={styles.featureBox}>
            <span style={styles.icon}>⚡</span>
            <h4>Быстрый результат</h4>
            <p>Моментальное распознавание текста на современных серверах.</p>
          </div>

          <div style={styles.featureBox}>
            <span style={styles.icon}>🌍</span>
            <h4>Доступ отовсюду</h4>
            <p>Работает в браузере без установки. Поддержка мобильных устройств.</p>
          </div>

          <div style={styles.featureBox}>
            <span style={styles.icon}>🔐</span>
            <h4>Приватность</h4>
            <p>Безопасная передача данных и удаление изображений после обработки.</p>
          </div>

          <div style={styles.featureBox}>
            <span style={styles.icon}>📦</span>
            <h4>Безлимит для подписчиков</h4>
            <p>3 бесплатные загрузки, а затем — неограниченное количество при активной подписке.</p>
          </div>

          <div style={styles.featureBox}>
            <span style={styles.icon}>🧠</span>
            <h4>Технологии</h4>
            <p>Используем современные AI-инструменты и OCR движки для максимальной точности.</p>
          </div>
        </div>

        <div style={styles.ctaBox}>
          <button style={styles.ctaButton} onClick={() => navigate('/')}>🏠 На главную</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px 20px',
    maxWidth: 960,
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  intro: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 30,
    marginBottom: 50,
  },
  featureBox: {
    background: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
    display: 'block',
  },
  ctaBox: {
    marginTop: 20,
  },
  ctaButton: {
    backgroundColor: '#5c6bc0',
    color: '#fff',
    fontSize: 16,
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default AboutPage;