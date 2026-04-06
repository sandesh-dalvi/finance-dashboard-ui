import { useState } from "react";
import { useApp } from "../context/AppContext";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CATEGORIES } from "../data/transactions";

const initialFormState = {
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "var(--color-surfce-hover)",
    borderRadius: "10px",
    color: "var(--color-secondary)",
    fontSize: "0.875rem",
    "& fieldset": { borderColor: "var(--color-border)" },
    "&:hover fieldset": { borderColor: "var(--color-border-strong)" },
    "&.Mui-focused fieldset": { borderColor: "var(--color-neutral-light)" },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-secondary)",
    fontSize: "0.8rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--color-secondary)",
  },
  "& .MuiSelect-icon": { color: "var(--color-secondary)" },
};

const TransactionModal = ({ existing, onClose }) => {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(
    existing
      ? { ...existing, amount: String(existing.amount) }
      : initialFormState,
  );
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError("Enter a valid positive amount.");
    if (!form.date) return setError("Date is required.");
    setError("");
    const payload = { ...form, amount: Number(form.amount) };
    if (existing) editTransaction(existing.id, payload);
    else addTransaction(payload);
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={"xs"}
      fullWidth
      className=" bg-surface border border-border rounded-xl text-primary shadow-md"
    >
      <DialogTitle className=" text-xl font-semibold text-primary box-border border-border pb-2">
        {existing ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <DialogContent className=" pt-5 pb-1 flex flex-col gap-2">
        <ToggleButtonGroup
          value={form.type}
          exclusive
          onChange={(_, v) => v && set("type", v)}
          fullWidth
          sx={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: 0,
              color: "var(--color-secondary)",
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "0.875rem",
              py: 1.2,
              transition: "all 0.2s",
              "&.Mui-selected": {
                color: "var(--color-primary-dark)",
                background: "var(--color-primary-light)",
              },
              "&.Mui-selected:hover": {
                background: "var(--color-primary-light)",
              },
              "&:hover": { background: "var(--color-primary-light)" },
            },
          }}
        >
          <ToggleButton value="expense">Expense</ToggleButton>
          <ToggleButton value="income">Income</ToggleButton>
        </ToggleButtonGroup>

        {/* Description */}
        <TextField
          label="Description"
          placeholder="e.g. Grocery Shopping"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          fullWidth
          size="small"
          sx={inputSx}
        />

        {/* Amount + Date */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <TextField
            label="Amount (₹)"
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            inputProps={{ min: 0 }}
            size="small"
            sx={inputSx}
          />
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              ...inputSx,
              "& input::-webkit-calendar-picker-indicator": {
                filter: "invert(0.6)",
              },
            }}
          />
        </div>

        {/* Category */}
        <TextField
          label="Category"
          select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          fullWidth
          size="small"
          sx={inputSx}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "10px",
                  mt: 0.5,
                  "& .MuiMenuItem-root": {
                    fontSize: "0.875rem",
                    color: "var(--color-secondary-dark)",
                    "&:hover": { background: "var(--color-surface-hover)" },
                    "&.Mui-selected": {
                      background: "var(--color-neutral-light)",
                      color: "var(--neutral-light)",
                      "&:hover": { background: "var(--color-neutral-light)" },
                    },
                  },
                },
              },
            },
          }}
        >
          {CATEGORIES.filter((c) => c !== "Income").map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        {/* Error */}
        {error && <p className=" text-error text-xs -mt-2">{error}</p>}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1.5, gap: 1.5 }}>
        <Button
          fullWidth
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "var(--color-error)",
            color: "var(--color-error)",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              background: "var(--color-surface-hover)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: "var(--color-primary)",
            color: "var(--color-surface)",
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              background: "var(--color-primary-light)",
              opacity: 0.9,
              boxShadow: "none",
            },
          }}
        >
          {existing ? "Save Changes" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
