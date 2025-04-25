import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import worldMap from '../assets/map.png';
import { GoogleLogin } from '@react-oauth/google';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        login,
        password,
      });
  
      const { id: user_id, login: userLogin, role, subscription_type, remaining_scans } = response.data;
  
      localStorage.setItem('user_id', String(user_id));
      localStorage.setItem('loggedInUser', userLogin);
      localStorage.setItem('role', role || 'user');
      localStorage.setItem('subscriptionType', subscription_type || 'none');
      localStorage.setItem('remainingScans', String(remaining_scans ?? 0));
  
      onLogin(userLogin);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Неверный логин или пароль');
    }
  };
  

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
      const verifyRes = await fetch(verifyUrl);

      if (!verifyRes.ok) {
        throw new Error('Token verification failed');
      }

      const googleData = await verifyRes.json();
      const userEmail = googleData.email || 'guest@gmail.com';

      const prevUser = localStorage.getItem('loggedInUser');
      if (prevUser !== userEmail) {
        localStorage.setItem('uploadCount', '0');
        localStorage.setItem('subscription', 'false');
        localStorage.setItem('subscriptionType', 'free');
        localStorage.removeItem('selectedPlan');
      }

      localStorage.setItem('loggedInUser', userEmail);
      localStorage.setItem('user_id', '0');
      localStorage.setItem('role', 'user');
      localStorage.setItem('subscriptionType', 'free');
      localStorage.setItem('subscription', 'false');

      onLogin(userEmail); // исправлено: передаём email
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Google login error:', err);
      setError('Ошибка авторизации через Google');
    }
  };

  const handleGoogleError = () => {
    console.error('Ошибка входа через Google');
    setError('Не удалось авторизоваться через Google');
  };

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${worldMap})` }}>
      <div style={styles.container}>
        <div style={styles.welcomeBox}>
          <h2 style={styles.welcomeTitle}>Добро пожаловать :)</h2>
          <p style={styles.welcomeText}>
            После входа в систему у вас будет возможность трех бесплатных
            попыток распознавания текста с изображения
            и вы сможете подписаться на уведомления о новых функциях и скидках.
          </p>
        </div>

        <h2>🔐 Вход в аккаунт</h2>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Войти
        </button>
        <button
          onClick={() => navigate('/register')}
          style={{ ...styles.button, backgroundColor: '#5c6bc0', marginTop: 10 }}
        >
          Зарегистрироваться
        </button>

        <div style={{ marginTop: 20 }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    paddingTop: 60,
    paddingBottom: 60,
  },
  container: {
    padding: 30,
    maxWidth: 400,
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f4f7fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  welcomeBox: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
};

export default Login;
