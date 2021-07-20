export type NewTransactionInputType = {
  title: string;
  amount: number;
  category: string;
  type: 'deposit' | 'withdraw';
};

export type TransactionData = {
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
};

// type OmitTypes = Omit<TransactionData, 'id' | 'createdAt'>
// type PickTypes = Pick<TransactionData, 'title' | 'amount' | 'type' | 'category'>
