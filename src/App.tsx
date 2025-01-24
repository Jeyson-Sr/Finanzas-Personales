import React from "react";
import { Moon, Sun, Download, Upload } from "lucide-react";
import { Toaster } from "sonner";
import { useFinanceStore } from "./store";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { Charts } from "./components/Charts";

function App() {
  const { darkMode, toggleDarkMode, exportData } = useFinanceStore();

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          useFinanceStore.getState().importData(text);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Gestión de Finanzas Personales
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleImport}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Importar datos"
              >
                <Upload size={24} />
              </button>
              <button
                onClick={exportData}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Exportar datos"
              >
                <Download size={24} />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>

          <BalanceDisplay />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <TransactionForm />
              <Charts />
            </div>
            <TransactionList />
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
}

export default App;
