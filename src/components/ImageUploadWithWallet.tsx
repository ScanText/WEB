import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/1.jpg';

const MAX_ATTEMPTS = 3;

const ImageUploadWithWallet: React.FC = () => {

  interface UploadItem {
    id: number;
    filename: string;
    file_url: string;
    recognized_text?: string;
    uploaded_at: string;
  }

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
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [login, setLogin] = useState(localStorage.getItem('loggedInUser') || '');
  const [subscriptionType, setSubscriptionType] = useState(localStorage.getItem('subscriptionType') || '');
  const [remainingScans, setRemainingScans] = useState<number | null>(
    localStorage.getItem('remainingScans') !== null
      ? Number(localStorage.getItem('remainingScans'))
      : null
  );
  const [recognizedText, setRecognizedText] = useState('');

  const fetchUserInfo = async () => {
    if (!login) return;
  
    try {
      const res = await axios.get(`http://localhost:8000/user/user_info/${login}`);
      const { subscription_type, remaining_scans } = res.data;
  
      setSubscriptionType(subscription_type);
      setRemainingScans(remaining_scans);
  
      localStorage.setItem('subscriptionType', subscription_type || 'none');
      localStorage.setItem('remainingScans', String(remaining_scans ?? 0));
  
      console.log('✅ Информация о пользователе обновлена:', subscription_type, remaining_scans);
    } catch (err) {
      console.error('❌ Ошибка загрузки информации о пользователе:', err);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setText('');
      setError('');
      setImagePreview(URL.createObjectURL(selected));
    }
  };
  const scanImage = async (upload_id: number) => {
    const formData = new FormData();
    formData.append('upload_id', upload_id.toString());

    try {
      const res = await axios.post('http://localhost:8000/upload/scan', formData);
      const { recognized_text, subscription_type, remaining_scans } = res.data;

      setRecognizedText(recognized_text);
      setSubscriptionType(subscription_type);
      setRemainingScans(remaining_scans);

      localStorage.setItem('subscriptionType', subscription_type);
      localStorage.setItem('remainingScans', String(remaining_scans));

      fetchUploads();
    } catch (err) {
      console.error('❌ Ошибка сканирования:', err);
    }
  };
  const fetchUploads = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/upload/uploads/by-user?login=${login}`);
      setUploads(res.data);
    } catch (err) {
      console.error('❌ Ошибка получения истории:', err);
    }
  };

  useEffect(() => {
    if (login) {
      fetchUploads();
      fetchUserInfo();
    }
  }, [login]);




  const uploadImage = async () => {
    if (!file || !login) {
      console.warn('⛔ Файл или логин отсутствует');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('login', login);

    try {
      const res = await axios.post('http://localhost:8000/upload/upload-image', formData);
      const { upload_id } = res.data;
      console.log('✅ Загружен файл:', upload_id);
      scanImage(upload_id);
    } catch (err) {
      console.error('❌ Ошибка загрузки:', err);
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

  

  return (
    <div style={styles.container}>
      <button style={styles.linkBtn} onClick={() => navigate('/user')}>
        🔑 Мой кабинет
      </button>
     

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
            <button onClick={uploadImage} style={{ ...styles.commonButton, ...styles.sendButton }}>📤 Сканировать</button>
           
            <button onClick={() => { setFile(null); setText(''); setError(''); setImagePreview(null); }} style={{ ...styles.commonButton, ...styles.clearButton }}>🧹 Очистить</button>
          </>
        )}
      </div>
      {/*
     <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginBottom: 20, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, width: '100%', maxWidth: 400 }}>
        <option value="eng">Английский</option>
        <option value="rus">Русский</option>
        <option value="ukr">Украинский</option>
        <option value="deu">Немецкий</option>
        <option value="ita">Итальянский</option>
        <option value="spa">Испанский</option>
      </select>
      */}
      {recognizedText && (
        <div>
          <h2>📑 Распознанный текст:</h2>
          <p>{recognizedText}</p>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
      <p style={{ marginTop: 20 }}>📦 Подписка: {subscriptionType || 'нет данных'}</p>
     

        <>
          <p>🧪 Осталось попыток: {remainingScans ?? 'неизвестно'}</p>
          <button onClick={handleSubscribe} style={styles.subscribeBtn}>💳 Оплатить подписку</button>
        </>
      
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

export default ImageUploadWithWallet;