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
  reference?: string;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ login }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/admin/payments/by-user?login=${login}`)
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
              <th style={styles.th}>Статус</th>
              <th style={styles.th}>Reference</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td style={styles.td}>{new Date(payment.timestamp).toLocaleString()}</td>
                <td style={styles.td}>{payment.amount} ₴</td>
                <td style={styles.td}>{payment.status}</td>
                <td style={styles.td}>{payment.reference || '-'}</td>
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
