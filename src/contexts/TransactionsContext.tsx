import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { api } from '../services/api';

import { TransactionData, NewTransactionInputType } from '../types/transaction';

interface TransactionsContextData {
  transactions: TransactionData[];
  setTransactions: Dispatch<SetStateAction<TransactionData[]>>;
  createTransaction: (transaction: NewTransactionInputType) => Promise<void>;
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export const TransactionsContextProvider = ({
  children,
}: TransactionsContextProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    api.get('/transactions').then(response => {
      setTransactions(response.data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: NewTransactionInputType) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context)
    throw new Error(
      'useTransactionsContext must be used within a TransactionsContextProvider'
    );

  return context;
}
