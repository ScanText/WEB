import React from 'react';

interface SubscriptionCheckProps {
  onSubscribe: () => void;
  subscribed: boolean;
}

const SubscriptionCheck: React.FC<SubscriptionCheckProps> = ({ onSubscribe, subscribed }) => {
  return (
    <div style={styles.container}>
      <h2>💳 Подписка</h2>
      {subscribed ? (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Подписка активна ✅</p>
      ) : (
        <>
          <p>Для доступа к функции OCR активируйте подписку.</p>
          <button style={styles.button} onClick={onSubscribe}>
            Оплатить подписку
          </button>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default SubscriptionCheck;
