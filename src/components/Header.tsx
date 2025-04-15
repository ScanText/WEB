import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/header.png';

interface HeaderProps {
  isLoggedIn: boolean;
  login: string;
  hasSubscription: boolean;
  userPhoto?: string | null;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  login,
  hasSubscription,
  userPhoto,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const displayName = login === 'true' || login === 'false' ? 'Пользователь' : login;

  return (
    <header style={{ ...styles.header, backgroundImage: `url(${background})` }}>
      <div style={styles.logo} onClick={() => navigate('/')}>ScanText</div>
      <div style={styles.promoTextBox}>
        <h1 style={styles.promoTitle}>Безлимитный онлайн-сервис скан-текста</h1>
        <p style={styles.promoSubtitle}>Сканируйте изображение — извлекайте текст за секунды </p>
      </div>
      <nav style={styles.nav}>
        <button onClick={() => navigate('/about')} style={styles.navBtn}>📊 О нас</button>
        {!isLoggedIn ? (
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>👤 Войти</button>
        ) : (
          <div style={styles.userBlock}>
            <img
              src={userPhoto || require('../assets/user-gray.png')}
              alt="User"
              style={{ ...styles.avatar, filter: userPhoto ? 'none' : 'grayscale(100%)' }}
            />
            <span style={styles.username}>{displayName}</span>
            <span>{hasSubscription ? '✅' : '❌'}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Выйти</button>
            {isLoggedIn && (
              <button
                onClick={() => navigate('/change-password')}
                style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', marginLeft: 10 }}
              >
                🔁 Сменить пароль
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '10px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    minHeight: 160,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: '#888',
  },
  promoTextBox: {
    marginTop: 12,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#555',
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  navBtn: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: 16,
    cursor: 'pointer',
  },
  loginBtn: {
    backgroundColor: '#a7896c',
    padding: '8px 14px',
    color: '#eee',
    borderRadius: 6,
    border: 'none',
    fontSize: 14,
  },
  logoutBtn: {
    marginLeft: 10,
    backgroundColor: '#a7896c',
    color: '#eee',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
  },
  userBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#c7b299',
    padding: '6px 12px',
    borderRadius: 8,
    color: '#444',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: '#444',
    fontWeight: 500,
  },
};

export default Header;
