import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import worldMap from '../assets/map.png';

const Register: React.FC = () => {
  const [login, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await axios.post('http://localhost:8000/user/register/', {
        login,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Ошибка регистрации. Попробуйте другой логин или email.');
    }
  };

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${worldMap})` }}>
     
      <div style={styles.container}>
        <h2>📝 Регистрация</h2>
        <input
          ref={usernameInputRef}
          type="text"
          placeholder="Имя пользователя"
          value={login}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>Зарегистрироваться</button>
        <button onClick={() => navigate('/login')} style={{ ...styles.button, backgroundColor: '#5c6bc0', marginTop: 10 }}>
          Уже есть аккаунт? Войти
        </button>
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
};

export default Register;