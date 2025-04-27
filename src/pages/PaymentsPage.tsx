import PaymentsTable from "../crypto/PaymentsTable";

const PaymentsPage: React.FC = () => {
  const login = localStorage.getItem('loggedInUser'); // ✅ Берём из локалки

  if (!login) {
    return <p>🔒 Вы не авторизованы</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🕓 История платежей</h2>
      <PaymentsTable login={login} />
    </div>
  );
};

export default PaymentsPage;
