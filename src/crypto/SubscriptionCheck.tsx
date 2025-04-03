import React from 'react';

interface Props {
  subscribed: boolean;
  onSubscribe: () => void;
}

const SubscriptionCheck: React.FC<Props> = ({ subscribed, onSubscribe }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <p>
        📦 Подписка: {subscribed ? (
          <span style={{ color: 'green' }}>Активна ✅</span>
        ) : (
          <span style={{ color: 'red' }}>Неактивна ❌</span>
        )}
      </p>
      {!subscribed && (
        <button
          onClick={onSubscribe}
          style={{
            marginTop: 10,
            backgroundColor: '#ff9800',
            padding: '10px 20px',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          💳 Оплатить подписку
        </button>
      )}
    </div>
  );
};

export default SubscriptionCheck;
