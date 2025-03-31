import React from 'react';

const AdminPanel: React.FC = () => {
  const payments = [
    {
      id: 1,
      username: 'Алла Павлова',
      phone: '+380971112233',
      wallet: '0xAbCd1234EfGh5678',
      date: '2025-03-28 15:20',
    },
    {
      id: 2,
      username: 'Анна Бородина',
      phone: '+380931234567',
      wallet: '0x9Fb1234AcDf0987',
      date: '2025-03-29 10:45',
    },
  ];

  return (
    <div style={styles.container}>
      
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Кошелек</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.username}</td>
              <td>{payment.phone}</td>
              <td>{payment.wallet}</td>
              <td>{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 30,
      fontFamily: 'Segoe UI, sans-serif',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 20,
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#1976d2',
      color: '#fff',
      padding: 12,
      border: '1px solid #ddd',
    },
    td: {
      padding: 12,
      border: '1px solid #ddd',
      textAlign: 'center',
    },
  };

export default AdminPanel;
