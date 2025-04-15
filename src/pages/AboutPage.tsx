import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommentsBlock from '../pages/CommentsBlock';
import CommentForm from '../pages/CommentForm';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [service, setService] = useState<'ScanText' | 'StatApp' | 'MathAI' | ''>('');
  
  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;
  
  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.header}>📢 Почему ScanText?</h2>
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
            <span style={styles.icon}>🧠</span>
            <h4>Технологии</h4>
            <p>Используем современные AI-инструменты и OCR движки для максимальной точности.</p>
          </div>
        </div>

        <div style={styles.reviewsBox}>
          <h3>🗣 Отзывы пользователей</h3>

          <div style={{ marginBottom: 15 }}>
            <label>🔎 Фильтр по сервису:&nbsp;</label>
            <select value={service} onChange={(e) => setService(e.target.value as any)} style={styles.select}>
              <option value="">Все</option>
              <option value="ScanText">🖼 ScanText</option>
              <option value="StatApp">📊 StatApp</option>
              <option value="MathAI">🧠 MathAI</option>
            </select>
          </div>

          <CommentsBlock selectedService={service} />

          <button
            onClick={() => {
              if (!isLoggedIn) navigate('/login');
              else setShowForm((prev) => !prev);
            }}
            style={styles.button}
          >
            ✍️ Оставить отзыв
          </button>

          {showForm && isLoggedIn && <CommentForm />}
        </div>

        <div style={styles.ctaBox}>
          <button style={styles.ctaButton} onClick={() => navigate('/')}>🏠 На главную</button>
        </div>
      </div>
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
  reviewsBox: {
    backgroundColor: '#f4f7fa',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    marginBottom: 30,
  },
  select: {
    padding: '6px 12px',
    fontSize: '14px',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 20,
    padding: '10px 16px',
    fontSize: '15px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  ctaBox: {
    marginTop: 20,
  },
  ctaButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    fontSize: 16,
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default AboutPage;