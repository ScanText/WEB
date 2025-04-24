import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ScanRecord {
  id: number;
  filename: string;
  uploaded_at: string;
  recognized_text?: string;
  file_url?: string;
  login?: string;
}

const ScanHistory: React.FC = () => {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState<string>('');

  useEffect(() => {
    const login = localStorage.getItem('loggedInUser') || 'guest';
    setUserLogin(login);
    axios.get(`http://localhost:8000/user/uploads/by-login?login=${login}`)
      .then(res => {
        const updated = res.data.map((item: ScanRecord) => ({
          ...item,
          file_url: item.file_url || `http://localhost:8000/uploads/${item.filename}`
        }));
        setHistory(updated);
      })
      .catch(err => console.error('Ошибка загрузки истории:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🕓 История сканирований</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Файл</th>
              <th style={styles.th}>Дата</th>
              <th style={styles.th}>Текст</th>
              <th style={styles.th}>Логин</th>
              <th style={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.filename}</td>
                <td style={styles.td}>{new Date(item.uploaded_at).toLocaleString()}</td>
                <td style={styles.td}>
                  <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 120, overflowY: 'auto' }}>{item.recognized_text || '—'}</pre>
                </td>
                <td style={styles.td}>{item.login || '—'}</td>
                <td style={styles.td}>
                  {item.file_url ? (
                    <>
                      <a href={item.file_url} download style={styles.actionLink}>📥 Скачать</a><br />
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={styles.actionLink}>🖼 Открыть</a>
                    </>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  th: {
    padding: '8px 12px',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
    fontSize: 14,
  },
  actionLink: {
    color: '#3f51b5',
    fontSize: 14,
    textDecoration: 'none',
    marginRight: 8,
  },
};

export default ScanHistory;