import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import TransactionModal from "../components/TransactionModal";
import { formatINR } from "../utils/formatters";

import { useApp } from "../context/AppContext";
import { ArrowDown, ArrowUp, ArrowUpDown, Plus, Search } from "lucide-react";
import { CATEGORIES } from "../data/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TransactionRow from "../components/TransactionRow";

const SORT_FIELDS = ["date", "amount", "description"];

const Transactions = () => {
  const { transactions, role, filters, setFilters } = useApp();

  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let list = [...transactions];

    if (filters.type !== "all") {
      list = list.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      list = list.filter((t) => t.category === filters.category);
    }

    if (filters.search) {
      list = list.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    list.sort(
      (a, b) => {
        let av = a[sortField],
          bv = b[sortField];

        if (sortField === "date") {
          av = new Date(av);
          bv = new Date(bv);
        }

        if (sortField === "amount") {
          av = Number(av);
          bv = Number(bv);
        }

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
      },
      [transactions, filters, sortField, sortDir],
    );

    return list;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return (
        <ArrowUpDown size={12} style={{ color: "var(--text-secondary)" }} />
      );
    return sortDir === "asc" ? (
      <ArrowUp size={12} style={{ color: "var(--accent)" }} />
    ) : (
      <ArrowDown size={12} style={{ color: "var(--accent)" }} />
    );
  };

  const tableHeads = [
    { field: "date", label: "Date" },
    { field: "description", label: "Description" },
    { field: "category", label: "Category" },
    { field: "amount", label: "Amount" },
  ];

  return (
    <section className=" p-4 md:px-6 space-y-6 max-w-6xl">
      <PageHeader
        title={"Transactions"}
        desc={`${filtered.length} transaction${filtered.length !== 1 ? "s" : ""} found`}
      />

      {role === "admin" && (
        <button
          className=" flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 cursor-pointer shadow-sm shrink-0 bg-neutral text-surface"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <Plus size={16} /> Add Transaction
        </button>
      )}

      {/* Filters */}
      <div className=" rounded-2xl border border-border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface">
        {/* search */}
        <div className=" relative sm:col-span-1">
          <Search className=" absolute left-3 top-3 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            className=" w-full pl-9 pr-3 py-2 rounded-xl text-sm outline-none font-semibold bg-primary/10 border border-border text-neutral-dark"
          />
        </div>

        {/* type filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          className=" px-3 py-2 rounded-xl text-sm outline-none font-semibold bg-primary/10 border border-border text-neutral-dark"
        >
          <option className=" text-primary font-semibold" value="all">
            All Types
          </option>
          <option className=" text-primary font-semibold" value="income">
            Income
          </option>
          <option className=" text-primary font-semibold" value="expense">
            Expense
          </option>
        </select>

        {/* category filter */}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
          className=" px-3 py-2 rounded-xl text-sm outline-none font-semibold bg-primary/10 border border-border text-neutral-dark"
        >
          <option className=" text-primary font-semibold" value="all">
            All Categories
          </option>
          {CATEGORIES.map((category) => (
            <option
              className=" text-primary font-semibold"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <TableContainer sx={{ background: "transparent" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderColor: "var(--color-border)" }}>
                {tableHeads.map(({ field, label }) => (
                  <TableCell
                    key={field}
                    onClick={() =>
                      SORT_FIELDS.includes(field) && handleSort(field)
                    }
                    sx={{
                      color: "var(--color-secondary)",
                      borderColor: "var(--color-border)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      cursor: SORT_FIELDS.includes(field)
                        ? "pointer"
                        : "default",
                      userSelect: "none",
                      py: 1.5,
                      "&:hover": SORT_FIELDS.includes(field)
                        ? { color: "var(--color-primary)" }
                        : {},
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      {label}
                      {SORT_FIELDS.includes(field) && (
                        <SortIcon field={field} />
                      )}
                    </span>
                  </TableCell>
                ))}
                {role === "admin" && (
                  <TableCell
                    sx={{
                      color: "var(--color-secondary)",
                      borderColor: "var(--color-border)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={role === "admin" ? 5 : 4}
                    sx={{
                      borderColor: "var(--border)",
                      textAlign: "center",
                      py: 8,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      No transactions found
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        marginTop: 4,
                      }}
                    >
                      Try adjusting your filters
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((tx) => (
                  <TransactionRow
                    key={tx.id}
                    tx={tx}
                    onEdit={() => {
                      setEditTarget(tx);
                      setModalOpen(true);
                    }}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Footer summary */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t flex flex-wrap gap-4 text-sm border-border text-secondary font-bold">
            <span>
              Income:{" "}
              <span className=" text-primary">
                {formatINR(
                  filtered
                    .filter((t) => t.type === "income")
                    .reduce((s, t) => s + t.amount, 0),
                )}
              </span>
            </span>
            <span>
              Expenses:{" "}
              <span className=" text-secondary ">
                {formatINR(
                  filtered
                    .filter((t) => t.type === "expense")
                    .reduce((s, t) => s + t.amount, 0),
                )}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <TransactionModal
          existing={editTarget}
          onClose={() => {
            setModalOpen(false);
            setEditTarget(null);
          }}
        />
      )}
    </section>
  );
};

export default Transactions;
