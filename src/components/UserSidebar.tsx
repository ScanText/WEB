import React from 'react';
import { useNavigate } from 'react-router-dom';
import userPlaceholder from '../assets/logo.png';

interface UserSidebarProps {
  userPhoto: string | null;
  setUserPhoto: (value: string | null) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ userPhoto, setUserPhoto }) => {
  const navigate = useNavigate();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem('userPhoto', base64);
        setUserPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoToPricing = () => {
    console.log('➡️ Начало оплаты: переход на страницу выбора тарифа');
    navigate('/pricing');
  };
  return (
    <div style={styles.sidebar}>
      <img
        src={userPhoto || userPlaceholder}
        alt="User"
        style={styles.avatar}
      />
      <p style={{ fontWeight: 'bold', marginTop: 10 }}>👤 Логотип пользователя</p>

      <label htmlFor="photoUpload" style={styles.actionBtn}>📤 Загрузить</label>
      <input
        id="photoUpload"
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => {
          localStorage.removeItem('userPhoto');
          setUserPhoto(null);
        }}
        style={styles.actionBtn}
      >
        🗑 Удалить
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
        <button
          //onClick={() => navigate('/pricing')}
          onClick={handleGoToPricing}
          style={{
            backgroundColor: '#f97316', // 🟧 оранжевая
            color: '#fff',
            padding: '10px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          💳 Оплатить подписку
        </button>

        <button
          onClick={() => navigate('/payments')}
          style={{
            backgroundColor: '#60a5fa', // 🔵 спокойный синий
            color: '#fff',
            padding: '10px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🧾 История платежей
        </button>

        <button
          onClick={() => navigate('/feedbacks')}
          style={{
            backgroundColor: '#a78bfa', // 🟣 пастельный фиолетовый
            color: '#fff',
            padding: '10px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          💬 Отзывы
        </button>

        <button
          onClick={() => navigate('/change-password')}
          style={{
            backgroundColor: '#c084fc', // светло-фиолетовый
            color: '#fff',
            padding: '10px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🔑 Изменить пароль
        </button>
        <button
          onClick={() => navigate('/user/history')}
          style={{
            backgroundColor: '#225250', // светло-фиолетовый
            color: '#fff',
            padding: '10px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🔑 История сканирований
        </button>
      </div>     
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: 260,
    marginRight: 40,
    textAlign: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ccc',
  },
  actionBtn: {
    backgroundColor: '#5c6bc0',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    width: 140,
    marginTop: 8,
  },
  feedbackBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'left',
  },
  feedbackBtn: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
  },
};

export default UserSidebar;