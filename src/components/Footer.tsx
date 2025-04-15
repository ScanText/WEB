import React from 'react';
// import qr from '../assets/qr-code.png';
// import footerBackground from '../assets/footer.png';

const Footer: React.FC = () => {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText('https://scantext.z36.web.core.windows.net/');
  //   alert('Ссылка скопирована!');
  // };

  return (
    <footer style={styles.footer}>
      {/* <div style={styles.container}> */}
      <p style={{ margin: 0 }}>© 2025 ScanText</p>

        {/* 
        <div style={styles.downloadBlock}>
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
        */}
      {/* </div> */}
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    padding: '20px 0',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 'auto', // 🟢 важный момент: "прижать" футер вниз
  },

  // container: {
  //   maxWidth: '1000px',
  //   margin: '0 auto',
  // },
  // copy: {
  //   marginBottom: 0,
  // },
  // downloadBlock: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   gap: 60,
  // },
  // desktopBlock: {
  //   textAlign: 'center',
  // },
  // qrBlock: {
  //   textAlign: 'center',
  // },
  // platforms: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: 10,
  //   marginTop: 10,
  // },
  // link: {
  //   color: '#fff',
  //   textDecoration: 'none',
  //   fontWeight: 'bold',
  //   fontSize: 15,
  // },
  // note: {
  //   marginTop: 8,
  //   fontSize: 13,
  //   color: '#ddd',
  // },
  // copyBtn: {
  //   marginTop: 10,
  //   padding: '6px 12px',
  //   fontSize: 14,
  //   backgroundColor: '#4caf50',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: 6,
  //   cursor: 'pointer',
  // },
};

export default Footer;
