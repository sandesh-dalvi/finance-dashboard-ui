import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import StatsCard from "../components/StatsCard";
import PageHeader from "../components/PageHeader";
import SectionHeader from "../components/SectionHeader";
import { useApp } from "../context/AppContext";

import { formatINR } from "../utils/formatters";

import BalanceTrendChart from "../components/BalanceTrendChart";
import SpendingPieChart from "../components/SpendingPieChart";

const Dashboard = () => {
  const { transactions, summary } = useApp();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section className="space-y-4 p-4 md:p-6 lg:px-8 max-w-6xl">
      <PageHeader
        title={"Dashboard"}
        desc={"Your financial overiew at a glance."}
      />

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {/* stats card */}
        <StatsCard
          label="Total Balance"
          value={formatINR(summary.balance)}
          icon={Wallet}
          color="primary"
          sub={"Income minus expenses"}
        />
        <StatsCard
          label="Total Income"
          value={formatINR(summary.income)}
          icon={TrendingUp}
          color="success"
          sub={"All time earnings"}
        />
        <StatsCard
          label="Total Expenses"
          value={formatINR(summary.expense)}
          icon={TrendingDown}
          color="error"
          sub={"All time spending"}
        />
      </div>

      {/* Charts */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className=" lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="">
          <SpendingPieChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className=" rounded-2xl border border-border overflow-hidden bg-surface p-2 md:p-4">
        <SectionHeader
          title={"Recent Transactions"}
          subtitle={"Last 5 transactions"}
        />
        {recentTransactions.length === 0 ? (
          <p className=" text-center py-12 text-sm text-secondary">
            No transactions yet
          </p>
        ) : (
          <div className=" divide-y divide-border">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 bg-neutral ${transaction.type === "income" ? " text-primary" : "  text-error"}`}
                  >
                    {transaction.category.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-secondary">
                      {transaction.category} ·{" "}
                      {new Date(transaction.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${transaction.type === "income" ? " text-primary" : " text-warning"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatINR(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
