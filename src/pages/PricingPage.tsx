import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoBlock from '../components/UserInfoBlock';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const subscribed = localStorage.getItem('subscription');
    const login = localStorage.getItem('loggedInUser');

    if (subscribed !== 'true' && login) {
      fetch('http://localhost:8000/payments/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login })
      })
        .then(() => {
          localStorage.setItem('subscription', 'true');
        })
        .catch((err) => console.error('Ошибка активации подписки:', err));
    }
  }, []);

  return (
    <>
      <main style={{ padding: 30 }}>
        <h2>💼 Страница тарифов</h2>
        <UserInfoBlock />
        <button
          onClick={() => navigate('/user')}
          style={{
            marginTop: 20,
            padding: '10px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: 6
          }}
        >
          🔙 Вернуться в кабинет
        </button>
      </main>
    </>
  );
};

export default PricingPage;
