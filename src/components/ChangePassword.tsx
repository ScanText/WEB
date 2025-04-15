import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const login = localStorage.getItem('loggedInUser') || '';

  const handleChange = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/change-password', {
        login,
        old_password: oldPassword,
        new_password: newPassword
      });
      setMessage(response.data.message || 'Пароль обновлён');
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Ошибка при смене пароля');
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>🔑 Сменить пароль</h2>
      <input type="password" placeholder="Старый пароль" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      <input type="password" placeholder="Новый пароль" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleChange}>Обновить</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
