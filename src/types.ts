export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface FinanceState {
  transactions: Transaction[];
  darkMode: boolean;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  toggleDarkMode: () => void;
  exportData: () => void;
  importData: (data: string) => void;
}
