import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CommentsBlockProps {
  selectedService?: string;
}

type Comment = {
  id: number;
  email: string;
  review: string;
  service: string;
  category: 'positive' | 'neutral' | 'negative';
  date: string;
};

const CommentsBlock: React.FC<CommentsBlockProps> = ({ selectedService }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'positive' | 'neutral' | 'negative'>('positive');

  useEffect(() => {
    axios
      .get<Comment[]>(`http://localhost:8000/comments/comments/`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('❌ Ошибка загрузки комментариев:', err));
  }, []);

  const filtered = comments.filter(
    (comment) =>
      comment.category === filter &&
      (!selectedService || comment.service === selectedService)
  );

  return (
    <div style={styles.feedbackBox}>
      <h4>🗣 Отзывы</h4>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => setFilter('positive')}>👍</button>
        <button onClick={() => setFilter('neutral')}>😐</button>
        <button onClick={() => setFilter('negative')}>👎</button>
      </div>
      {filtered.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <strong>{item.email.split('@')[0]}:</strong> {item.review}
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  feedbackBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'left',
  },
};

export default CommentsBlock;
