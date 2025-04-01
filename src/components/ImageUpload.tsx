import React, { useState } from 'react';
import axios from 'axios';
import illustration from '../assets/1.jpg';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setText('');
      setError('');
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        
        'https://fastapitext.fly.dev/extract-text',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      
      console.log("📦 Ответ от сервера:", response.data);

      if (response.data?.text) {
        setText(response.data.text);
        setError('');
      } else {
        setText('');
        setError('Нет текста в ответе сервера.');
      }
    } catch (err) {
      console.error("Ошибка при загрузке изображения:", err);
      setText('');
      setError('Ошибка при распознавании текста.');
    }
  };
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 40,
      maxWidth: 600,
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    image: {
      width: '100%',
      maxHeight: 350,
      objectFit: 'contain',
      borderRadius: 12,
      marginBottom: 30,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 20,
    },
    uploadButton: {
      backgroundColor: '#5c6bc0',
      color: '#fff',
      fontSize: '17px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold',
      width: 180,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    },
    sendButton: {
      backgroundColor: '#42a5f5',
      color: '#fff',
      fontSize: '17px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold',
      width: 180,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    },
    result: {
      marginTop: 40,
      textAlign: 'left',
    },
    text: {
      background: '#f9f9f9',
      padding: 16,
      borderRadius: 8,
      fontSize: '16px',
      whiteSpace: 'pre-wrap',
    },
    error: {
      color: 'red',
      fontSize: '16px',
      marginTop: 15,
    },
  };
  
  return (
    <div style={styles.container}>
   <h2 style={{ marginBottom: '20px' }}>📷 Распознавание текста с изображения</h2>
      <img
        src={imagePreview || illustration}
        alt="Предпросмотр"
        style={styles.image}
      />
  
      <div style={styles.buttonGroup}>
        <label htmlFor="file-upload" style={styles.uploadButton}>
          Выбрать изображение
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
  
        {file && (
          <button onClick={handleUpload} style={styles.sendButton}>
            📤 Отправить
          </button>
        )}
      </div>
  
      <div style={styles.result}>
        {text && (
          <>
            <h3>📝 Распознанный текст:</h3>
            <pre style={styles.text}>{text}</pre>
          </>
        )}
        {error && <p style={styles.error}>{error}</p>}
        </div>
    </div>
  );
};

export default ImageUpload;

