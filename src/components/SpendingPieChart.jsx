import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { buildCategoryData } from "../utils/helpers";
import SectionHeader from "./SectionHeader";
import { formatINR } from "../utils/formatters";
import { CATEGORY_COLORS } from "../data/transactions";
import { useMemo } from "react";

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 border text-sm bg-surface border-border">
      <p style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
      <p className="font-semibold">{formatINR(payload[0].value)}</p>
    </div>
  );
};

const SpendingPieChart = () => {
  const { transactions } = useApp();
  const categoryData = useMemo(
    () => buildCategoryData(transactions),
    [transactions],
  );

  return (
    <div className=" rounded-2xl p-5 border border-border bg-surface">
      <SectionHeader title={"Spending"} subtitle={"By Category"} />

      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {categoryData.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || "#8888aa"}
              />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(v) => (
              <span className=" text-secondary text-xs">{v}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingPieChart;
