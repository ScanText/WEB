import React from 'react';
import { useParams } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';

const PaymentPage: React.FC = () => {
  const { plan } = useParams();

  const planInfo = {
    plus: {
      title: 'Подписка Plus',
      amount: 200,
    },
    premium: {
      title: 'Подписка Premium',
      amount: 400,
    },
  };

  const current = planInfo[plan as 'plus' | 'premium'];

  if (!current) return <p>❌ Тариф не найден</p>;

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>{current.title}</h2>
      <p>Стоимость: {current.amount} грн</p>
     
    </div>
  );
};

export default PaymentPage;
