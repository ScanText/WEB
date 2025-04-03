import React, { useEffect } from 'react';
import { useWallet } from './useWallet';

const WalletConnect: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
  const { walletAddress, connect } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('wallet', walletAddress);
      onConnect(); 
    }
  }, [walletAddress, onConnect]);

  return (
    <div>
      <button onClick={connect} style={styles.button}>
        🔗 {walletAddress ? 'Кошелек подключен' : 'Подключить кошелек'}
      </button>
      {walletAddress && (
        <p style={{ marginTop: 10 }}>Адрес: {walletAddress}</p>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default WalletConnect;
