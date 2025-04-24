import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';

const UserInfoBlock: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Выберите подходящий вам план</h2>
      <p style={styles.subtitle}>
        Оставайтесь продуктивными. Оцифруйте свои знания с помощью лучшего OCR-движка.
      </p>

      <div style={styles.table}>
        <div style={styles.rowHeader}>
          <div style={styles.cell}></div>
          <div style={styles.cell}>Базовый<br /><strong>₴0</strong></div>
          <div style={styles.cell}>Плюс<br /><strong>₴200/мес.</strong></div>
          <div style={styles.cell}>Премиум<br /><strong>₴400/мес.</strong></div>
        </div>

        {[
          ['Количество сканирований', '3 попытки', '100 попыток', 'Неограниченно'],
          ['ИИ (ChatGPT)', '3 запроса / день', 'неограниченно', 'неограниченно'],
          ['Точность текста', 'Хорошая (Tesseract)', 'Максимальная (Google Vision)', 'Максимальная (Google Vision)'],
          ['Скорость', 'Быстрая', 'Очень быстрая', 'Мгновенная'],
          ['Без рекламы', '-', '✓', '✓'],
          ['Мультистраничные документы', '-', '✓', '✓'],
          ['Массовая обработка', '-', '-', '✓'],
          ['Поддержка', 'Обычная', 'Приоритет', 'Прямая'],
        ].map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <div key={colIndex} style={styles.cell}>{cell}</div>
            ))}
          </div>
        ))}

        <div style={styles.rowFooter}>
          <div style={styles.cell}></div>

          <div style={styles.cell}>
            <button style={styles.freeBtn} onClick={() => navigate('/')}>Попробовать бесплатно</button>
          </div>

          <div style={styles.cell}>
            <CardPaymentButton amount={200} reference="sub-plus" />
            <div style={styles.paymentNote}>Подписка: <strong>Plus 200 грн</strong></div>
          </div>

          <div style={styles.cell}>
            <CardPaymentButton amount={400} reference="sub-premium" />
            <div style={styles.paymentNote}>Подписка: <strong>Premium 400 грн</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f4f7fa',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 8,
    overflow: 'hidden',
    maxWidth: 1000,
    margin: '0 auto',
  },
  row: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  rowHeader: {
    display: 'flex',
    backgroundColor: '#e0e7ef',
    fontWeight: 'bold',
    padding: '12px 0',
  },
  rowFooter: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  cell: {
    flex: 1,
    padding: '12px',
    borderRight: '1px solid #ccc',
    fontSize: 14,
  },
  blueBtn: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  freeBtn: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  paymentNote: {
    marginTop: 8,
    fontSize: 13,
    color: '#555',
  },
};

export default UserInfoBlock;
