import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PaymentsTableProps {
  login: string;
}

interface Payment {
  id: number;
  amount: number;
  status: string;
  timestamp: string;
  transaction_id?: string;
  currency: string;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ login }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      console.log('📡 Загружаем инфо о пользователе...');
      const userRes = await axios.get(`http://localhost:8000/user/user_info/${login}`);
      console.log('✅ Пользователь найден:', userRes.data);
  
      const userId = userRes.data.id;
      console.log('🆔 User ID:', userId);
  
      console.log('📡 Запрашиваем платежи для user_id:', userId);
      const paymentsRes = await axios.get(`http://localhost:8000/payment/payments/by-user?user_id=${userId}`);
      console.log('✅ Платежи получены:', paymentsRes.data);
  
      setPayments(paymentsRes.data);
    } catch (err) {
      console.error('❌ Ошибка загрузки платежей:', err);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    if (login) {
      fetchPayments();
    }
  }, [login]);
  
  useEffect(() => {
    const handleFocus = () => {
      console.log('🔄 Окно в фокусе, подгружаем оплаты через axios');
      fetchPayments(); // снова аксиосом грузим
    };
  
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  

  return (
    <div style={{ margin: 60 }}>
      <h3>💰 История оплат</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
          <thead>
            <tr>
              <th style={styles.th}>Дата</th>
              <th style={styles.th}>Сумма</th>
              <th style={styles.th}>Статус</th>
              <th style={styles.th}>Transaction ID</th>
            </tr>
          </thead>
          {loading ? (
            <tr>
              <td style={styles.td} colSpan={4}>🔄 Загрузка...</td>
            </tr>
          ) : payments.length === 0 ? (
            <tr>
              <td style={styles.td} colSpan={4}>Нет оплат</td>
            </tr>
          ) : (
            payments.map(payment => (
              <tr key={payment.id}>
                <td style={styles.td}>{new Date(payment.timestamp).toLocaleString()}</td>
                <td style={styles.td}>{payment.amount/100} {payment.currency}</td>
                <td style={styles.td}>{payment.status}</td>
                <td style={styles.td}>{payment.transaction_id || '-'}</td>
              </tr>
            ))
          )}
        </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  th: {
    textAlign: 'left',
    padding: '8px 12px',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
  },
};

export default PaymentsTable;
