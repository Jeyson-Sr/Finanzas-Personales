import { create } from "zustand";
import { Transaction, FinanceState } from "./types";
import { toast } from "sonner";

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  darkMode: true,

  addTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
    toast.success("Transacción agregada exitosamente");

    // Check expense alert
    const { transactions } = get();
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (totalExpenses >= totalIncome * 0.8) {
      toast.error("¡Alerta! Los gastos superan el 80% de los ingresos");
    }
  },

  removeTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
    toast.success("Transacción eliminada exitosamente");
  },

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  exportData: () => {
    const { transactions } = get();
    const dataStr = JSON.stringify(transactions);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "finanzas.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Datos exportados exitosamente");
  },

  importData: (data) => {
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        set({ transactions: parsedData });
        toast.success("Datos importados exitosamente");
      }
    } catch (error) {
      toast.error("Error al importar datos");
    }
  },
}));
