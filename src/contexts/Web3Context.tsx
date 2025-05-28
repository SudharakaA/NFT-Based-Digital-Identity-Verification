
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  balance: string;
  chainId: number | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState<number | null>(null);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          await getBalance(accounts[0]);
          await getChainId();
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const getBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const getChainId = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(parseInt(chainId, 16));
    } catch (error) {
      console.error('Error getting chain ID:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this feature');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        await getBalance(accounts[0]);
        await getChainId();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance('0');
    setChainId(null);
  };

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          getBalance(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId, 16));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        balance,
        chainId
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
