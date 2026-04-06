import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import SectionHeader from "../components/SectionHeader";
import { formatINR } from "../utils/formatters";

import { CATEGORY_COLORS } from "../data/transactions";

// Tooltip
const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 border text-sm bg-surface border-border">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill || p.color }}>
          {p.name}: {formatINR(p.value)}
        </p>
      ))}
    </div>
  );
};

const AnalyticsCharts = ({ categoryData, monthlyData }) => {
  return (
    <>
      {/* Monthly Comparison Bar Chart */}
      <div className="rounded-2xl border p-5 bg-surface border-border shadow-md">
        <SectionHeader
          title="Monthly Comparison"
          subtitle="Income vs expenses per month"
        />

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#0d9488"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-2xl border p-5 bg-surface border-border">
        <SectionHeader
          title="Spending Breakdown"
          subtitle="Total spent per category"
        />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e1e2e"
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar
              dataKey="value"
              name="Spent"
              radius={[0, 4, 4, 0]}
              maxBarSize={20}
            >
              {categoryData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || "#8888aa"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AnalyticsCharts;
