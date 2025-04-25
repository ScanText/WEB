import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';
import UserSidebar from '../components/UserSidebar';
import PaymentsTable from '../crypto/PaymentsTable';
import axios from 'axios';

interface User {
  id: number;
  login: string;
  email: string;
  registration_date: string;
  subscription_status: boolean;
  role: string;
  subscription_type: string;
  remaining_scans: number;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(localStorage.getItem('userPhoto'));
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8000/user/user_info/${login}`)
      .then((res) => {
        setUser(res.data);
        setHasSubscription(res.data.subscription_type !== 'none');
      })
      .catch((err) => console.error('Ошибка загрузки пользователя:', err))
      .finally(() => setLoading(false));
  }, [login, isLoggedIn, navigate]);

  return (
    <div style={styles.container}>
      <UserSidebar
        userPhoto={userPhoto}
        setUserPhoto={setUserPhoto}
      />

<div style={styles.rightColumn}>
      {user ? (
        <>
          <div style={styles.welcomeBox}>
            <h2>👤 Добро пожаловать, {user.login}!</h2>
          </div>

          <div style={styles.subscriptionBox}>
            <div style={styles.statLine}>
              <span style={styles.label}>📦 Тариф:</span>
              <span style={styles.value1}>{user.subscription_type}</span>
            </div>
            <div style={styles.statLine}>
              <span style={styles.label}>🔢 Осталось сканов:</span>
              <span style={styles.value2}>{user.remaining_scans}</span>
            </div>
            <div style={styles.statLine}>
              <span style={styles.label}>💳 Подписка:</span>
              <span style={hasSubscription ? styles.active : styles.inactive}>
                {hasSubscription ? 'Активна ✅' : 'Неактивна ❌'}
              </span>
            </div>

            <div style={{ marginTop: 30, textAlign: 'center' }}>
              <button
                onClick={() => navigate('/pricing')}
                style={{
                  backgroundColor: '#8919e6',
                  color: '#fff',
                  padding: '10px 16px',
                  fontSize: 14,
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                💳 Изменить тарифный план
              </button>
            </div>
          </div>

          <div style={styles.paymentHistoryBox}>
            <PaymentsTable login={user.login} />
          </div>
        </>
      ) : loading ? (
        <p>Загрузка данных пользователя...</p>
      ) : (
        <p style={{ color: 'red' }}>Не удалось загрузить данные пользователя.</p>
      )}
    </div>
    </div>
  );
};

export default UserDashboard;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    padding: 20,
    fontFamily: 'sans-serif',
    alignItems: 'flex-start',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 30,
  },
  welcomeBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: 10,
    fontSize: 22,
    fontWeight: 600,
   // border: '1px solid #ddd',
    color: '#222',
  },
  subscriptionBox: {
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  paymentHistoryBox: {
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  statLine: {
    padding: '8px 0',
    fontSize: 18,
    fontWeight: 500,
  },
  label: {
    marginRight: 8,
    color: '#333',
  },
  value1: {
    fontWeight: 600,
    color: 'green',
  },
  value2: {
    fontWeight: 600,
    color: 'blue',
  },
  active: {
    color: 'green',
    fontWeight: 600,
  },
  inactive: {
    color: 'red',
    fontWeight: 600,
  },
};
