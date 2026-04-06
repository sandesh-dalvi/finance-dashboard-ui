import { TrendingUp, TrendingDown, AlertCircle, Award } from "lucide-react";

import { useApp } from "../context/AppContext";
import { useAnalytics } from "../hooks/useAnalytics";

import StatsCard from "../components/StatsCard";

import SectionHeader from "../components/SectionHeader";

import { formatINR } from "../utils/formatters";
import AnalyticsCharts from "../components/AnalyticsCharts";

export default function Analytics() {
  const { transactions } = useApp();
  const {
    categoryData,
    topCategory,
    monthlyData,
    savingsRate,
    avgMonthlySpend,
    worstMonth,
    bestMonth,
  } = useAnalytics(transactions);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 p-4 px-6">
        <p className="text-lg font-semibold">No data yet</p>
        <p className="text-sm text-secondary">
          Add transactions to see insights
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 px-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-sm mt-1 text-secondary">
          Patterns and observations from your data
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Award}
          color="neutral"
          title="Top Spending Category"
          value={topCategory?.name || "—"}
          sub={topCategory ? formatINR(topCategory.value) + " total spent" : ""}
        />
        <StatsCard
          icon={TrendingDown}
          color="neutral"
          title="Avg Monthly Spend"
          value={formatINR(avgMonthlySpend)}
          sub="Across all months"
        />
        <StatsCard
          icon={AlertCircle}
          color="error"
          title="Highest Spend Month"
          value={worstMonth?.name || "—"}
          sub={worstMonth ? formatINR(worstMonth.expense) + " in expenses" : ""}
        />
        <StatsCard
          icon={TrendingUp}
          color="primary"
          title="Savings Rate"
          value={`${savingsRate}%`}
          sub={`Last month: ${bestMonth?.name || "—"}`}
        />
      </div>

      <AnalyticsCharts categoryData={categoryData} monthlyData={monthlyData} />

      {/* Observations list */}
      <div className="rounded-2xl border p-5 space-y-3 bg-surface border-border">
        <SectionHeader title="Key Observations" />
        <ul className="space-y-2.5">
          {topCategory && (
            <ObsItem color="bg-error">
              Your biggest expense category is{" "}
              <strong>{topCategory.name}</strong> at{" "}
              {formatINR(topCategory.value)} total.
            </ObsItem>
          )}
          {worstMonth && (
            <ObsItem color="bg-neutral">
              <strong>{worstMonth.name}</strong> was your highest-spend month
              with {formatINR(worstMonth.expense)} in expenses.
            </ObsItem>
          )}
          {bestMonth && (
            <ObsItem color="bg-neutral">
              <strong>{bestMonth.name}</strong> had the best net savings of{" "}
              {formatINR(bestMonth.net)}.
            </ObsItem>
          )}
          <ObsItem color="bg-warning">
            Your average monthly spend is {formatINR(avgMonthlySpend)}. Savings
            rate last month was <strong>{savingsRate}%</strong>.
          </ObsItem>
        </ul>
      </div>
    </div>
  );
}

function ObsItem({ color, children }) {
  return (
    <li className="flex items-start gap-3 text-sm text-primary">
      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${color}`} />
      <span style={{ lineHeight: "1.6" }}>{children}</span>
    </li>
  );
}
