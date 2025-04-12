import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
  hasSubscription: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, username, hasSubscription }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.reload(); // 👈 или navigate('/') если хочешь без перезагрузки
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate('/')}>🚀 ScanText</div>
      <nav style={styles.nav}>
        <button onClick={() => navigate('/feedbacks')}>📊 О нас</button>

        {!isLoggedIn ? (
          <button onClick={() => navigate('/login')}>👤 Войти</button>
        ) : (
          <div style={styles.userBlock}>
            <span style={hasSubscription ? styles.activeUser : styles.inactiveUser}>👤</span>
            <span>{username}</span>
            {hasSubscription && (
              <span title="Подписка активна">✅</span>
            )}
            <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Выйти</button>
          </div>
        )}
      </nav>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#282c34',
    color: 'white',
    fontSize: 18,
  },
  logo: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },
  userBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  activeUser: {
    color: 'limegreen',
  },
  inactiveUser: {
    color: 'gray',
  },
  logoutBtn: {
    background: '#ff6b6b',
    border: 'none',
    padding: '6px 10px',
    color: '#fff',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
};

export default Header;
