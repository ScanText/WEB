import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PaymentsTableProps {
  login: string;
}

interface Payment {
  id: number;
  amount: number;
  method: string;
  status: string;
  created_at: string;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ login }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/payments?user_id=${login}`)
      .then(res => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки платежей:', err);
        setLoading(false);
      });
  }, [login]);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>💰 История оплат</h3>
      {loading ? (
        <p>Загрузка...</p>
      ) : payments.length === 0 ? (
        <p>Оплаты отсутствуют.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
          <thead>
            <tr>
              <th style={styles.th}>Дата</th>
              <th style={styles.th}>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td style={styles.td}>{new Date(payment.created_at).toLocaleString()}</td>
                <td style={styles.td}>{payment.amount} ₴</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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