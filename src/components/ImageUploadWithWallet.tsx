import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/1.jpg';

const MAX_ATTEMPTS = 3;

const ImageUploadWithWallet: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('eng');
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

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
    const uid = localStorage.getItem('user_id') || '';
    const login = localStorage.getItem('loggedInUser') || '';
    const plan = localStorage.getItem('subscriptionType') || 'free';

    const MAX_LIMITS: Record<string, number> = {
      free: 3,
      plus: 100,
      premium: Infinity,
    };

    if (!file || !uid || login === 'true' || login === 'false') {
      setError('Ошибка авторизации. Попробуйте войти снова.');
      return;
    }

    const limit = MAX_LIMITS[plan];
    if (uploadCount >= limit) {
      setError(`💡 Вы использовали все попытки по тарифу ${plan.toUpperCase()}. Пожалуйста, оформите подписку.`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('lang', lang);
    formData.append('user_id', uid);
    formData.append('login', login);

    try {
      const response = await axios.post('http://fastapitext-black-feather-5039.fly.dev', formData);
      if (response.data?.text) {
        setText(response.data.text);
        setError('');
        const newCount = uploadCount + 1;
        setUploadCount(newCount);
        localStorage.setItem('uploadCount', String(newCount));
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

  const handleUploadGpt = async () => {
    const uid = localStorage.getItem('user_id') || '';
    const login = localStorage.getItem('loggedInUser') || '';

    if (!file || !uid || login === 'true' || login === 'false') {
      setError('Ошибка авторизации. Попробуйте войти снова.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', uid);
    formData.append('login', login);

    try {
      const response = await axios.post('http://localhost:8000/gpt-ocr', formData);
      if (response.data?.text) {
        setText(response.data.text);
        setError('');

        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        const blob = new Blob(['\uFEFF' + response.data.text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const filename = `gpt_text_${timestamp}.txt`;

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();

        const plan = localStorage.getItem('subscriptionType') || 'free';
        const MAX_LIMITS: Record<string, number> = {
          free: 3,
          plus: 100,
          premium: Infinity,
        };

        const limit = MAX_LIMITS[plan];
        if (uploadCount < limit) {
          const newCount = uploadCount + 1;
          setUploadCount(newCount);
          localStorage.setItem('uploadCount', String(newCount));
        }
      } else {
        setText('');
        setError('Нет текста в ответе от GPT.');
      }
    } catch (err) {
      console.error('GPT-OCR ошибка:', err);
      setText('');
      setError('Ошибка при распознавании через GPT.');
    }
  };

  const handleResetAttempts = () => {
    localStorage.setItem('uploadCount', '0');
    setUploadCount(0);
  };

  const handleSubscribe = () => {
    localStorage.removeItem('selectedPlan');
    navigate('/pricing');
  };

  useEffect(() => {
    const id = localStorage.getItem('user_id') || '';
    const login = localStorage.getItem('loggedInUser') || '';
    setUserId(id);
    setUsername(login);

    const previousUser = localStorage.getItem('previousUser');

    if (previousUser && previousUser !== login) {
      localStorage.setItem('uploadCount', '0');
      localStorage.setItem('subscription', 'false');
      localStorage.removeItem('selectedPlan');
    }

    localStorage.setItem('previousUser', login);
    const rawCount = localStorage.getItem('uploadCount');
    const parsedCount = parseInt(rawCount || '0');
    setUploadCount(isNaN(parsedCount) ? 0 : parsedCount);
    setSubscribed(localStorage.getItem('subscription') === 'true');
  }, []);

  useEffect(() => {
    const checkSubscription = () => {
      const count = parseInt(localStorage.getItem('uploadCount') || '0');
      setUploadCount(isNaN(count) ? 0 : count);
      setSubscribed(localStorage.getItem('subscription') === 'true');
    };
    window.addEventListener('focus', checkSubscription);
    return () => window.removeEventListener('focus', checkSubscription);
  }, []);

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
      fontSize: 15,
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
    clearButton: {
      backgroundColor: '#757575',
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
    previewLinks: {
      marginBottom: 20,
    },
    link: {
      color: '#3f51b5',
      marginRight: 10,
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.linkBtn} onClick={() => navigate('/user')}>
        🔑 Мой кабинет
      </button>
      <p style={{ fontSize: 12, color: '#aaa' }}>ID: {userId}</p>
      <p style={{ fontSize: 12, color: '#aaa' }}>👤 Пользователь: {username}</p>

      <img src={imagePreview || illustration} alt="Предпросмотр" style={styles.image} />
      {imagePreview && (
        <div style={styles.previewLinks}>
          <a href={imagePreview} download="scan.jpg" style={styles.link}>📥 Скачать изображение</a>
          <a href={imagePreview} target="_blank" rel="noopener noreferrer" style={styles.link}>🖼 Открыть изображение</a>
        </div>
      )}
      <div style={styles.buttonRow}>
        <label htmlFor="file-upload" style={{ ...styles.commonButton, ...styles.uploadButton }}>Выбрать изображение</label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        {file && (
          <>
            <button onClick={handleUpload} style={{ ...styles.commonButton, ...styles.sendButton }}>📤 Tesseract OCR</button>
            <button onClick={handleUploadGpt} style={{ ...styles.commonButton, backgroundColor: '#8e24aa', color: '#fff' }}>🤖 GPT Распознать</button>
            <button onClick={() => { setFile(null); setText(''); setError(''); setImagePreview(null); }} style={{ ...styles.commonButton, ...styles.clearButton }}>🧹 Очистить</button>
          </>
        )}
      </div>
      <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginBottom: 20, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, width: '100%', maxWidth: 400 }}>
        <option value="eng">Английский</option>
        <option value="rus">Русский</option>
        <option value="ukr">Украинский</option>
        <option value="deu">Немецкий</option>
        <option value="ita">Итальянский</option>
        <option value="spa">Испанский</option>
      </select>
      {text && (
        <div style={styles.result}>
          <h3>📝 Распознанный текст:</h3>
          <pre style={styles.text}>{text}</pre>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
      <p style={{ marginTop: 20 }}>📦 Подписка:{' '}{subscribed ? (<span style={{ color: 'green' }}>Активна ✅</span>) : (<span style={{ color: 'red' }}>Неактивна ❌</span>)}</p>
      {!subscribed && (
        <>
          <p>🧪 Осталось попыток: <strong>{Math.max(0, MAX_ATTEMPTS - uploadCount)}</strong> из {MAX_ATTEMPTS}</p>
          <button onClick={handleSubscribe} style={styles.subscribeBtn}>💳 Оплатить подписку</button>
        </>
      )}
      {!subscribed && uploadCount >= MAX_ATTEMPTS && (
        <button onClick={handleResetAttempts} style={{ marginTop: 20, fontSize: 14, border: 'none', color: '#42a5f5', background: 'transparent', cursor: 'pointer' }}>
          🔄 Я оплатил — сбросить попытки
        </button>
      )}

      {text && (
        <div style={{ marginTop: 10 }}>
          {(() => {
            const blob = new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-');
            const filename = `text_${timestamp}.txt`;
            return (
              <>
                <a href={url} download={filename} style={{ marginRight: 12, textDecoration: 'none', color: '#3f51b5' }}>
                  📥 Скачать текст
                </a>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                  📝 Открыть в новой вкладке
                </a>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ImageUploadWithWallet;
