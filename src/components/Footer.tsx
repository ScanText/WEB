import React from 'react';
import qr from '../assets/qr-code.png';

const Footer: React.FC = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('https://scantext.z36.web.core.windows.net/');
    alert('Ссылка скопирована!');
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copy}>© 2025 ScanText</p>

        <div style={styles.downloadBlock}>
          {/* Блок загрузки десктопа */}
          <div style={styles.desktopBlock}>
            <h4>💻 Скачайте на компьютер</h4>
            <div style={styles.platforms}>
              <a href="https://example.com/windows" target="_blank" rel="noreferrer" style={styles.link}>
                🪟 Windows
              </a>
              <a href="https://example.com/macos" target="_blank" rel="noreferrer" style={styles.link}>
                🍏 macOS
              </a>
            </div>
          </div>

          {/* Блок с QR */}
          <div style={styles.qrBlock}>
            <h4>📱 Отсканируйте QR-код</h4>
            <img
              src={qr}
              alt="QR-код мобильного приложения"
              style={{ width: 120, height: 120, borderRadius: 8 }}
            />
            <p style={styles.note}>Откройте на телефоне</p>
            <button onClick={handleCopy} style={styles.copyBtn}>📋 Скопировать ссылку</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    marginTop: 60,
    padding: '40px 20px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: 14,
  },
  container: {
    maxWidth: 1000,
    margin: '0 auto',
    textAlign: 'center',
  },
  copy: {
    marginBottom: 20,
  },
  downloadBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 60,
    marginTop: 20,
  },
  desktopBlock: {
    textAlign: 'center',
  },
  qrBlock: {
    textAlign: 'center',
  },
  platforms: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 15,
  },
  note: {
    marginTop: 8,
    fontSize: 13,
    color: '#666',
  },
  copyBtn: {
    marginTop: 10,
    padding: '6px 12px',
    fontSize: 14,
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default Footer;
