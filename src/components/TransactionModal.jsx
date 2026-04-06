import { useState } from "react";
import { useApp } from "../context/AppContext";

const initialFormState = {
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

const TransactionModal = ({ existing, onClose }) => {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(
    existing
      ? { ...existing, amount: String(existing.amount) }
      : initialFormState,
  );
  const [error, setError] = useState("");

  return <div></div>;
};

export default TransactionModal;
