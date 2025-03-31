import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'pavlova' && password === 'Qwerty123!') {
      setError('');
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Вход в админпанель</h2>
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 30,
    maxWidth: 400,
    margin: '0 auto',
    textAlign: 'center',
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

export default AdminLogin;