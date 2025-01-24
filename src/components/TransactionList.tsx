import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFinanceStore } from "../store";
import { Transaction } from "../types";

export function TransactionList() {
  const transactions = useFinanceStore((state) => state.transactions);
  const removeTransaction = useFinanceStore((state) => state.removeTransaction);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );

  const filteredAndSortedTransactions = [...transactions]
    .filter((t) => filterType === "all" || t.type === filterType)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="date">Ordenar por fecha</option>
          <option value="amount">Ordenar por monto</option>
        </select>

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "all" | "income" | "expense")
          }
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Todas</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredAndSortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <h3 className="font-medium dark:text-white">
                  {transaction.description}
                </h3>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {transaction.category} • {transaction.date}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`font-medium ${
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}{" "}
                {formatAmount(transaction.amount)}
              </span>
              <button
                onClick={() => removeTransaction(transaction.id)}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
