import { useEffect } from 'react';
import axios from 'axios';

const PaymentSuccess: React.FC = () => {
  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      axios.post('http://localhost:8000/payment/confirm-latest-payment', { user_id: +userId })
        .then(() => console.log('✅ Платёж подтвержден'))
        .catch((err) => console.error('Ошибка подтверждения платежа:', err));
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>✅ Спасибо за оплату!</h1>
      <p>Подписка активирована!</p>
    </div>
  );
};

export default PaymentSuccess;
