import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useApp } from "../context/AppContext";
import { buildTrendData } from "../utils/helpers";
import SectionHeader from "./SectionHeader";
import { formatINR } from "../utils/formatters";
import { useMemo } from "react";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 border text-sm bg-surface border-border">
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {formatINR(p.value)}
        </p>
      ))}
    </div>
  );
};

const BalanceTrendChart = () => {
  const { transactions } = useApp();
  const trendData = useMemo(() => buildTrendData(transactions), [transactions]);

  return (
    <div className=" rounded-2xl p-5 border border-border bg-surface">
      <SectionHeader
        title={"Balance Trend"}
        subtitle={"Monthly income vs expense"}
      />

      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart data={trendData} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"name"} />
          <YAxis allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type={"monotone"}
            dataKey={"income"}
            stroke="#0d9488"
            fill="#2dd4bf"
          />
          <Area
            type={"monotone"}
            dataKey={"expenses"}
            stroke="#4f46e5"
            fill="#818cf8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
