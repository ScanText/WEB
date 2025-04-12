import React, { useEffect, useState } from 'react';
import preview1 from '../assets/preview1.png';
import preview2 from '../assets/preview2.png';
import preview3 from '../assets/preview3.png';

const slides = [
  {
    image: preview1,
    caption: '📋 Меню с блюдами и ценами — AI извлекает список',
  },
  {
    image: preview2,
    caption: '🧾 Фото чека — AI распознаёт сумму',
  },
  {
    image: preview3,
    caption: '🎓 Экзамен — Tesseract извлекает текст вопросов',
  },
];

const PreviewCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <img src={slides[index].image} alt={`preview-${index}`} style={styles.image} />
      <p style={styles.caption}>{slides[index].caption}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: 40,
  },
  image: {
    width: '100%',
    maxWidth: 700,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  caption: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
};

export default PreviewCarousel;
