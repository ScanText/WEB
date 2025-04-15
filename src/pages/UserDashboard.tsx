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
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(localStorage.getItem('userPhoto'));
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  const login = localStorage.getItem('loggedInUser') || '';
  const isLoggedIn = !!login;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8000/user_info/${login}`)
      .then((res) => {
        setUser(res.data);
        setHasSubscription(res.data.subscription_status);
      })
      .catch((err) => console.error('Ошибка загрузки пользователя:', err));

    axios.get(`http://localhost:8000/check_subscription?user_id=${login}`)
      .then((res) => {
        if (res.data.active) {
          localStorage.setItem('subscription', 'true');
          setHasSubscription(true);
        }
      })
      .catch((err) => console.error('Ошибка проверки подписки:', err));
  }, [login, isLoggedIn, navigate]);

  return (
    <>
      <div style={styles.container}>
        <UserSidebar
          userPhoto={userPhoto}
          setUserPhoto={setUserPhoto}
        />
  
          <h2>👤 Личный кабинет</h2>
          {user ? (
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td><strong>ID:</strong></td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td><strong>Логин:</strong></td>
                  <td>{user.login}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td><strong>Регистрация:</strong></td>
                  <td>{new Date(user.registration_date).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Роль:</strong></td>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Загрузка данных...</p>
          )}

          <div style={styles.subscriptionBox}>
            <p>
              💳 Подписка: {hasSubscription ? (
                <span style={{ color: 'green' }}>Активна ✅</span>
              ) : (
                <span style={{ color: 'red' }}>Неактивна ❌</span>
              )}
            </p>
            <div style={{ marginTop: 30, textAlign: 'center' }}>
              <CardPaymentButton />
            </div>
          </div>
          <div style={styles.mainContent}>
          {user && <PaymentsTable login={user.login} />}
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 40,
    fontFamily: 'Segoe UI, sans-serif',
  },
  mainContent: {
    flex: 1,
    maxWidth: 640,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 30,
  },
  subscriptionBox: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
  },
};

export default UserDashboard;