import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import TransactionModal from "../components/TransactionModal";
import { formatINR } from "../utils/formatters";

import { useApp } from "../context/AppContext";
import { Plus, Search } from "lucide-react";
import { CATEGORIES } from "../data/transactions";

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
        t.description.toLowerCase().include(filters.search.toLowerCase()),
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

  return (
    <section className=" p-4 md:px-6 space-y-6 max-w-6xl">
      <PageHeader
        title={"Transactions"}
        desc={`${filtered.length} transaction${filtered.length !== 1 ? "s" : ""} found`}
      />

      {role === "admin" && (
        <button className=" flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 cursor-pointer shadow-sm shrink-0 bg-neutral text-surface">
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
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* category filter */}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
          className=" px-3 py-2 rounded-xl text-sm outline-none bg-primary/10 border border-border text-neutral-dark"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Footer summary */}
      {filtered.length > 0 && (
        <div className="px-5 py-3 border-t flex flex-wrap gap-4 text-sm border-border text-secondary">
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
            <span className=" text-secondary">
              {formatINR(
                filtered
                  .filter((t) => t.type === "expense")
                  .reduce((s, t) => s + t.amount, 0),
              )}
            </span>
          </span>
        </div>
      )}

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
