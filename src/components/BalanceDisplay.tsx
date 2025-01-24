import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useFinanceStore } from "../store";

export function BalanceDisplay() {
  const transactions = useFinanceStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ingresos Totales
            </h3>
            <p className="text-2xl font-semibold text-green-500">
              {formatAmount(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <TrendingDown className="text-red-500" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Gastos Totales
            </h3>
            <p className="text-2xl font-semibold text-red-500">
              {formatAmount(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet className="text-blue-500" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Balance Total
            </h3>
            <p
              className={`text-2xl font-semibold ${
                balance >= 0 ? "text-blue-500" : "text-red-500"
              }`}
            >
              {formatAmount(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
