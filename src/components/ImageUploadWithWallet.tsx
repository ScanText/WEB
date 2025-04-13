import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/1.jpg';
import { useWallet } from '../crypto/useWallet';


const MAX_ATTEMPTS = 3;

const ImageUploadWithWallet: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const { walletAddress, connect } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser') || 'guest';
    const previousUser = localStorage.getItem('previousUser');

    if (previousUser && previousUser !== user) {
      localStorage.setItem('uploadCount', '0');
      localStorage.setItem('subscription', 'false');
    }

    localStorage.setItem('previousUser', user);
    setUploadCount(parseInt(localStorage.getItem('uploadCount') || '0'));
    setSubscribed(localStorage.getItem('subscription') === 'true');
  }, []);

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('wallet', walletAddress);
    }
  }, [walletAddress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setText('');
      setError('');
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    if (!subscribed && uploadCount >= MAX_ATTEMPTS) {
      setError('💡 Вы использовали 3 бесплатные попытки.\nПожалуйста, оформите подписку для продолжения.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://fastapitext.fly.dev/extract-text',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data?.text) {
        setText(response.data.text);
        setError('');

        if (!subscribed) {
          const newCount = uploadCount + 1;
          setUploadCount(newCount);
          localStorage.setItem('uploadCount', String(newCount));
        }
      } else {
        setText('');
        setError('Нет текста в ответе сервера.');
      }
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
      setText('');
      setError('Ошибка при распознавании текста.');
    }
  };

  const handleResetAttempts = () => {
    localStorage.setItem('uploadCount', '0');
    setUploadCount(0);
  };

  const handleSubscribe = () => {
    navigate('/pricing');
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 40,
      maxWidth: 600,
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
      position: 'relative',
    },
    image: {
      width: '100%',
      maxHeight: 350,
      objectFit: 'contain',
      borderRadius: 12,
      marginBottom: 16,
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 30,
    },
    commonButton: {
      fontSize: '15px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold',
      width: 180,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    },
    uploadButton: {
      backgroundColor: '#5c6bc0',
      color: '#fff',
    },
    sendButton: {
      backgroundColor: '#42a5f5',
      color: '#fff',
    },
    result: {
      marginTop: 40,
      textAlign: 'left',
    },
    text: {
      background: '#f9f9f9',
      padding: 16,
      borderRadius: 8,
      fontSize: '16px',
      whiteSpace: 'pre-wrap',
    },
    error: {
      color: 'red',
      fontSize: '16px',
      marginTop: 15,
    },
    subscribeBtn: {
      marginTop: 10,
      backgroundColor: '#ff9800',
      padding: '10px 20px',
      border: 'none',
      borderRadius: 8,
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    walletBtn: {
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: 30,
    },
    linkBtn: {
      position: 'absolute',
      top: -20,
      right: 0,
      background: 'transparent',
      border: 'none',
      color: '#4caf50',
      fontSize: 14,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.linkBtn} onClick={() => navigate('/user')}>
        🔑 Мой кабинет
      </button>

      <img src={imagePreview || illustration} alt="Предпросмотр" style={styles.image} />

      <div style={styles.buttonRow}>
        <label htmlFor="file-upload" style={{ ...styles.commonButton, ...styles.uploadButton }}>Выбрать изображение</label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

        {file && <button onClick={handleUpload} style={{ ...styles.commonButton, ...styles.sendButton }}>📤 Отправить</button>}
      </div>

      <div style={styles.result}>
        {text && (<><h3>📝 Распознанный текст:</h3><pre style={styles.text}>{text}</pre></>)}
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <p style={{ marginTop: 20 }}>
        📦 Подписка: {subscribed ? (<span style={{ color: 'green' }}>Активна ✅</span>) : (<span style={{ color: 'red' }}>Неактивна ❌</span>)}
      </p>
      {!subscribed && (
        <button onClick={handleSubscribe} style={styles.subscribeBtn}>💳 Оплатить подписку</button>
      )}

      {!subscribed && uploadCount >= MAX_ATTEMPTS && (
        <button onClick={handleResetAttempts} style={{ marginTop: 20, fontSize: 14, border: 'none', color: '#42a5f5', background: 'transparent', cursor: 'pointer' }}>
          🔄 Я оплатил — сбросить попытки
        </button>
      )}

      <button onClick={connect} style={styles.walletBtn}>
        {walletAddress ? '🔗 Кошелек подключен' : '🔗 Подключить кошелек'}
      </button>
      {walletAddress && <p style={{ marginBottom: 20 }}>Адрес: {walletAddress}</p>}
    </div>
  );
};

export default ImageUploadWithWallet;