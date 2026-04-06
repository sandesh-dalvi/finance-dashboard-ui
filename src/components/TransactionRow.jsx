import { TableRow, TableCell, IconButton, Chip } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CATEGORY_COLORS } from "../data/transactions";
import { formatINR, formatDate } from "../utils/formatters";

export default function TransactionRow({ tx, onEdit }) {
  const { role, deleteTransaction } = useApp();

  return (
    <TableRow
      sx={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
        transition: "background 0.15s",
        "&:hover": { background: "var(--color-surface-hover)" },
        "&:hover .action-btns": { opacity: 1 },
      }}
    >
      <TableCell
        sx={{
          color: "var(--color-neutral)",
          fontSize: "0.8rem",
          borderColor: "var(--color-border)",
          fontWeight: 600,
          py: 1.5,
        }}
      >
        {formatDate(tx.date)}
      </TableCell>

      <TableCell
        sx={{
          color: "var(--color-primary)",
          fontSize: "0.875rem",
          fontWeight: 600,
          borderColor: "var(--color-border)",
          py: 1.5,
        }}
      >
        {tx.description}
      </TableCell>

      <TableCell sx={{ borderColor: "var(--color-border)", py: 1.5 }}>
        <Chip
          label={tx.category}
          size="small"
          sx={{
            background: `${CATEGORY_COLORS[tx.category] || "var(--color-primary)"}20`,
            color: CATEGORY_COLORS[tx.category] || "var(--color-primary)",
            fontWeight: 600,
            fontSize: "0.75rem",
            border: "none",
            height: 24,
          }}
        />
      </TableCell>

      <TableCell sx={{ borderColor: "var(--color-border)", py: 1.5 }}>
        <span
          style={{
            color:
              tx.type === "income"
                ? "var(--color-primary)"
                : "var(--color-error)",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          {tx.type === "income" ? "+" : "-"}
          {formatINR(tx.amount)}
        </span>
      </TableCell>

      {role === "admin" && (
        <TableCell
          align="right"
          sx={{ borderColor: "var(--color-border)", py: 1.5 }}
        >
          <div
            className="action-btns"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{
                color: "var(--color-warning)",
                "&:hover": {
                  background: "var(--color-warning)",
                  color: "var(--color-surface)",
                },
              }}
            >
              <Pencil size={14} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteTransaction(tx.id)}
              sx={{
                color: "var(--color-error)",
                "&:hover": {
                  background: "var(--color-error)",
                  color: "var(--color-surface)",
                },
              }}
            >
              <Trash2 size={14} />
            </IconButton>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
