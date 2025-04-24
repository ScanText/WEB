import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoBlock from '../components/UserInfoBlock';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('loggedInUser');
    if (!login) {
      navigate('/login');
    }
  }, [navigate]);

  const handleActivateSubscription = async () => {
    const login = localStorage.getItem('loggedInUser');
    try {
      const response = await fetch('http://localhost:8000/payments/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login })
      });
      if (response.ok) {
        localStorage.setItem('subscription', 'true');
        alert('✅ Подписка успешно активирована');
      } else {
        alert('❌ Не удалось активировать подписку');
      }
    } catch (err) {
      console.error('Ошибка активации подписки:', err);
      alert('⚠️ Ошибка сервера при активации подписки');
    }
  };

  return (
    <>
      <main style={{ padding: 30 }}>
        <h2>💼 Страница тарифов</h2>
        <UserInfoBlock />

        <button
          onClick={handleActivateSubscription}
          style={{
            marginTop: 16,
            padding: '10px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            marginRight: 10
          }}
        >
          💳 Активировать подписку вручную
        </button>

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
