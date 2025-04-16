import React, { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

interface CardPaymentButtonProps {
  amount?: number;
  reference?: string;
}

const CardPaymentButton: React.FC<CardPaymentButtonProps> = ({
  amount = 5,
  reference = `order-${Date.now()}`
}) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    const token = 'uTxwJZS40IeHwlzBmz2FkAh-i5UvDx9Lcpe2hQlfTssI';

    const body = {
      amount,
      ccy: 980, // гривна
      redirectUrl: 'https://your-site.com/success',
      merchantPaymInfo: {
        reference,
        destination: 'Оплата подписки через ScanText',
      }
    };

    try {
      const response = await axios.post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        body,
        {
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
        }
      );

      const invoiceUrl = response.data.pageUrl;

      // Отправка письма
      await sendReceipt(reference, amount);

      if (invoiceUrl) {
        window.open(invoiceUrl, '_blank');
      } else {
        alert('Не удалось получить ссылку для оплаты');
        console.error('Ответ Monobank:', response.data);
      }
    } catch (error: any) {
      console.error('Ошибка при создании платежа:', error);
      alert('Ошибка при создании платежа. Проверь консоль.');
    } finally {
      setLoading(false);
    }
  };

  const sendReceipt = async (orderId: string, amount: number) => {
    try {
      await emailjs.send(
        'service_kakfifs',
        'template_1p2p9jj',
        {
          to_email: 'edmondik2@gmail.com',
          order_id: orderId,
          price: amount,
        },
        '4cv9_5LTsfunNwIdS'
      );
    } catch (err) {
      console.error('Ошибка отправки письма:', err);
    }
  };

  return (
    <button
      className="pay-button"
      onClick={handlePay}
      disabled={loading}
      style={{ backgroundColor: '#facc15', color: '#000' }}
    >
      {loading ? 'Создание счёта...' : '💳 Оплатить по карте'}
    </button>
  );
};

export default CardPaymentButton;
