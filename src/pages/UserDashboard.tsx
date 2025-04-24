import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPaymentButton from '../components/CardPaymentButton';
import UserSidebar from '../components/UserSidebar';
import PaymentsTable from '../crypto/PaymentsTable';
import axios from 'axios';

interface User {
  id: number;
  login: string;
  email: string;
  registration_date: string;
  subscription_status: boolean;
  role: string;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(localStorage.getItem('userPhoto'));
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  const login = localStorage.getItem('loggedInUser') || '';
  //const userId = localStorage.getItem('user_id') || '';
  const isLoggedIn = !!login;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8000/user/user_info/${login}`) 
    
    //TODO

    // в API прописать в роуте user -> @router.get("/user_info/{login}", response_model=UserOut)
   /* def get_user_info(login: str, db: Session = Depends(get_db)):
        user = user_crud.get_user_by_login(db, login)
        if not user:
            raise HTTPException(status_code=404, detail="Пользователь не найден")
        return user*/

      .then((res) => {
        setUser(res.data);
        setHasSubscription(res.data.subscription_status);
      })
      .catch((err) => console.error('Ошибка загрузки пользователя:', err))
      .finally(() => setLoading(false));

  }, [login, isLoggedIn, navigate]);

  return (
    <>
      <div style={styles.container}>
        <UserSidebar
          userPhoto={userPhoto}
          setUserPhoto={setUserPhoto}
        />
  
  {user ? (
  <>
    <h2>👤 Добро пожаловать, {user.login}!</h2>
  </>
) : loading ? (
  <p>Загрузка данных пользователя...</p>
) : (
  <p style={{ color: 'red' }}>Не удалось загрузить данные пользователя.</p>
)}

        <div style={styles.subscriptionBox}>
          <p>
            💳 Подписка: {hasSubscription ? (
              <span style={{ color: 'green' }}>Активна ✅</span>
            ) : (
              <span style={{ color: 'red' }}>Неактивна ❌</span>
            )}
          </p>
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <CardPaymentButton />
          </div>
        </div>
        <div style={styles.mainContent}>
          {user && <PaymentsTable login={user.login} />}
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 40,
    fontFamily: 'Segoe UI, sans-serif',
  },
  mainContent: {
    flex: 1,
    maxWidth: 640,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 30,
  },
  subscriptionBox: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
  },
};

export default UserDashboard;
