import { useState } from 'react';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connect = () => {
    // Заглушка: здесь будет логика подключения
    setWalletAddress("0x1234...abcd");
  };

  return { walletAddress, connect };
};