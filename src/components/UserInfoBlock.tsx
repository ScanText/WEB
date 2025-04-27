import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';
import axios from 'axios';


interface Subscription {
  id: number;
  name: string;
  price: number;
  scan_limit: number;
  duration_days: number;
  description?: string;
}

const UserInfoBlock: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const login = localStorage.getItem('loggedInUser');

  useEffect(() => {
    axios.get('http://localhost:8000/subscriptions/')
      .then((res) => {
        setSubscriptions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки подписок:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>🔄 Загрузка подписок...</p>;

  if (!login) {
    navigate('/login'); // Если юзер не залогинен — перенаправляем
    return null;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Выберите подходящий вам план</h2>
      <p style={styles.subtitle}>
        Оцифруруйте свои знания с помощью лучшего OCR-движка ✨
      </p>

      <div style={styles.table}>
        <div style={styles.rowHeader}>
          <div style={styles.cell}>Название</div>
          <div style={styles.cell}>Описание</div>
          <div style={styles.cell}>Кол-во сканов</div>
          <div style={styles.cell}>Цена</div>
          <div style={styles.cell}>Действия</div>
        </div>

        {subscriptions.map((sub) => (
          <div key={sub.id} style={styles.row}>
            <div style={styles.cell}>{sub.name}</div>
            <div style={styles.cell}>{sub.description || '-'}</div>
            <div style={styles.cell}>{sub.scan_limit === 9999 ? 'Безлимит' : sub.scan_limit}</div>
            <div style={styles.cell}><strong>{sub.price} ₴</strong></div>
            <div style={styles.cell}>
              {sub.price > 0 ? (
                <CardPaymentButton amount={sub.price * 100} subscriptionId={sub.id}/>
              ) : (
                <button style={styles.freeBtn} onClick={() => navigate('/')}>
                  Бесплатно
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f4f7fa',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: 1200,
    margin: '0 auto',
  },
  rowHeader: {
    display: 'flex',
    backgroundColor: '#e0e7ef',
    fontWeight: 'bold',
    padding: '12px 0',
  },
  row: {
    display: 'flex',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    padding: '12px',
    borderRight: '1px solid #ddd',
    fontSize: 14,
  },
  freeBtn: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default UserInfoBlock;
