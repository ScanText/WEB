import React, { useState } from 'react';
import axios from 'axios';

const CommentForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [service, setService] = useState('ScanText');
  const [category, setCategory] = useState<'positive' | 'neutral' | 'negative'>('positive');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/comments/comments/', {
        email,
        review,
        service,
        category,
      });
      setMessage('✅ Комментарий успешно отправлен!');
      setEmail('');
      setReview('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Ошибка при отправке комментария');
    }
  };

  return (
    <div style={styles.container}>
      <h3>📝 Оставить отзыв</h3>

      <input
        type="email"
        placeholder="Ваш Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Ваш отзыв"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={styles.textarea}
      />

      <select value={service} onChange={(e) => setService(e.target.value)} style={styles.select}>
        <option value="ScanText">🖼 ScanText</option>
        <option value="StatApp">📊 StatApp</option>
        <option value="MathAI">🧠 MathAI</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value as any)} style={styles.select}>
        <option value="positive">😊 Положительный</option>
        <option value="neutral">😐 Нейтральный</option>
        <option value="negative">😡 Отрицательный</option>
      </select>

      <button onClick={handleSubmit} style={styles.button}>📨 Отправить</button>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    padding: 10,
    height: 80,
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
    resize: 'vertical',
  },
  select: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 14,
  },
  button: {
    padding: '10px 16px',
    fontSize: '15px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default CommentForm;
