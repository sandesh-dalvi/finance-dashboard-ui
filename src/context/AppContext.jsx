import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { transactions as initialTransactions } from "../data/transactions";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    search: "",
  });

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx)),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        filters,
        setFilters,
        addTransaction,
        editTransaction,
        deleteTransaction,
        summary,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
