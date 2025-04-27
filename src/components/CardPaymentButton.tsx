/*import React, { useState } from 'react';
import axios from 'axios';

interface CardPaymentButtonProps {
  amount: number;
  subscriptionId: number;
  reference: string;
  login: string;
}

const CardPaymentButton: React.FC<CardPaymentButtonProps> = ({ amount, subscriptionId, reference, login }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const token = 'uTxwJZS40IeHwlzBmz2FkAh-i5UvDx9Lcpe2hQlfTssI';

    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('Вы не авторизованы!');
      setLoading(false);
      return;
    }

    try {
      console.log('🚀 Старт оплаты. Логин:', login, '| ID юзера:', userId, '| Тариф:', subscriptionId, '| Сумма:', amount);

      // 1. Создание счёта в Monobank
      const response = await axios.post('https://api.monobank.ua/api/merchant/invoice/create', {
        amount,
        ccy: 980,
        //  redirectUrl: `http://localhost:3000/payment-success?orderId=${reference}`, 👉 ТУТ поменяй на твой реальный фронт
         redirectUrl: `https://6b10-185-137-217-11.ngrok-free.app/payment-success?orderId=${reference}`, // 
        
        callbackUrl: 'https://example.com/fake-callback', // Можешь поставить любой
        merchantPaymInfo: {
          reference,
          destination: `Оплата подписки: ${reference}`,
        }
      }, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        }
      });

      const invoiceUrl = response.data.pageUrl;
      console.log('✅ Счёт создан. Ссылка:', invoiceUrl);

      // 2. Регистрируем платёж в своей системе
      await axios.post('http://localhost:8000/payment/pay', {   // 👉 ТУТ API адресс свой!
        user_id: +userId,
        subscription_id: subscriptionId,
        amount,
        method: 'monobank',
        transaction_id: reference,
      });
      console.log('📝 Платёж зарегистрирован в базе.');

      // 3. Открываем оплату
      if (invoiceUrl) {
        window.open(invoiceUrl, '_blank');
      } else {
        alert('Не удалось получить ссылку для оплаты.');
        console.error('Ошибка создания ссылки.');
      }

    } catch (err) {
      console.error('❌ Ошибка создания платежа:', err);
      alert('Ошибка при оплате. Проверьте консоль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ backgroundColor: '#facc15', padding: '10px 20px', borderRadius: 8 }}
      >
        {loading ? 'Создание счёта...' : '💳 Оплатить'}
      </button>
    </div>
  );
};

export default CardPaymentButton;

*/
import React, { useState } from 'react';
import axios from 'axios';

interface CardPaymentButtonProps {
  amount: number;
  subscriptionId: number;
}

const CardPaymentButton: React.FC<CardPaymentButtonProps> = ({ amount, subscriptionId }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('Не авторизован');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('http://localhost:8000/payment/create-payment', {
        user_id: +userId,
        subscription_id: subscriptionId,
        amount
      });

      const invoiceUrl = res.data.invoice_url;
      console.log('✅ Открываем Monobank ссылку:', invoiceUrl);

      if (invoiceUrl) {
        window.open(invoiceUrl, '_blank');
      } else {
        alert('Ошибка создания счёта в Monobank');
      }

    } catch (err) {
      console.error('Ошибка создания оплаты:', err);
      alert('Ошибка создания оплаты');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ backgroundColor: '#facc15', padding: '10px 20px', borderRadius: 8 }}
      >
        {loading ? 'Создание счёта...' : '💳 Оплатить'}
      </button>
    </div>
  );
};

export default CardPaymentButton;
