import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UploadItem {
  id: number;
  filename: string;
  file_url: string;
  recognized_text?: string;
  uploaded_at: string;
}

const ScanHistory: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const login = localStorage.getItem('loggedInUser') || '';

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/upload/uploads/by-user?login=${login}`);
        setUploads(res.data);
      } catch (err) {
        console.error('❌ Ошибка получения истории:', err);
      } finally {
        setLoading(false);
      }
    };

    if (login) fetchUploads();
  }, [login]);

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
              <th style={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((item, index) => (
              <tr key={item.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.filename}</td>
                <td style={styles.td}>{new Date(item.uploaded_at).toLocaleString()}</td>
                <td style={styles.td}>
                  <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 120, overflowY: 'auto' }}>
                    {item.recognized_text || '—'}
                  </pre>
                </td>
                <td style={styles.td}>
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={styles.link}>🖼 Открыть</a>
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
    padding: '10px',
    borderBottom: '2px solid #ccc',
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
    fontSize: 14,
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
    fontSize: 14,
  },
};

export default ScanHistory;
