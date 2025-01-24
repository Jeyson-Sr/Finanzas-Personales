import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useFinanceStore } from "../store";
import { TransactionType } from "../types";

const categories = {
  income: ["Salario", "Freelance", "Inversiones", "Otros"],
  expense: ["Comida", "Transporte", "Servicios", "Entretenimiento", "Otros"],
};

export function TransactionForm() {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories.income[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    addTransaction({
      type,
      amount: Number(amount),
      description,
      category,
      date: new Date().toISOString().split("T")[0],
    });

    setAmount("");z
    setDescription("");
    setCategory(categories[type][0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            setType("income");
            setCategory(categories.income[0]);
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Ingreso
        </button>
        <button
          type="button"
          onClick={() => {
            setType("expense");
            setCategory(categories.expense[0]);
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Gasto
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          min="0"
          step="0.01"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {categories[type].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        Agregar {type === "income" ? "Ingreso" : "Gasto"}
      </button>
    </form>
  );
}
