import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommentsBlock from './CommentsBlock';
import CommentForm from './CommentForm';

const Feedbacks: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [service, setService] = useState<'ScanText' | 'StatApp' | 'MathAI' | ''>('');

  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;
  const userPhoto = localStorage.getItem('userPhoto');
  const hasSubscription = localStorage.getItem('subscription') === 'true';

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        login={login}
        hasSubscription={hasSubscription}
        userPhoto={userPhoto}
      />
      <div style={styles.page}>
        <h2>🗣 Отзывы пользователей</h2>

        <div style={{ marginBottom: 20 }}>
          <label>🔎 Фильтр по сервису:&nbsp;</label>
          <select value={service} onChange={(e) => setService(e.target.value as any)} style={styles.select}>
            <option value="">Все</option>
            <option value="ScanText">🖼 ScanText</option>
            <option value="StatApp">📊 StatApp</option>
            <option value="MathAI">🧠 MathAI</option>
          </select>
        </div>

        {/* Передаём выбранный сервис в блок отзывов */}
        <CommentsBlock selectedService={service} />

        <button onClick={() => setShowForm((prev) => !prev)} style={styles.button}>
          ✍️ Оставить отзыв
        </button>
        {showForm && <CommentForm />}
      </div>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: 30,
    fontFamily: 'Segoe UI, sans-serif',
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
  select: {
    padding: '6px 12px',
    fontSize: '14px',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
};

export default Feedbacks;
