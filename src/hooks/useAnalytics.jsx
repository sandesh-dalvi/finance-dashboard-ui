import { useMemo } from "react";
import { MONTHS } from "../utils/helpers";

export function useAnalytics(transactions) {
  return useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    // Spending by category
    const byCat = {};
    expenses.forEach(({ category, amount }) => {
      byCat[category] = (byCat[category] || 0) + amount;
    });
    const categoryData = Object.entries(byCat)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const topCategory = categoryData[0] || null;

    // Monthly comparison
    const byMonth = {};
    transactions.forEach(({ date, amount, type }) => {
      const d = new Date(date);
      const key = `${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
      if (!byMonth[key]) byMonth[key] = { name: key, income: 0, expense: 0 };
      byMonth[key][type] += amount;
    });
    const monthlyData = Object.values(byMonth).map((m) => ({
      ...m,
      net: m.income - m.expense,
    }));

    // Savings rate (last month)
    const lastMonth = monthlyData[monthlyData.length - 1];
    const savingsRate =
      lastMonth && lastMonth.income > 0
        ? Math.round(
            ((lastMonth.income - lastMonth.expense) / lastMonth.income) * 100,
          )
        : 0;

    // Avg monthly spend
    const avgMonthlySpend = monthlyData.length
      ? Math.round(
          monthlyData.reduce((s, m) => s + m.expense, 0) / monthlyData.length,
        )
      : 0;

    // Month with highest expense
    const worstMonth =
      [...monthlyData].sort((a, b) => b.expense - a.expense)[0] || null;

    // Best month (highest net)
    const bestMonth = [...monthlyData].sort((a, b) => b.net - a.net)[0] || null;

    return {
      categoryData,
      topCategory,
      monthlyData,
      savingsRate,
      avgMonthlySpend,
      worstMonth,
      bestMonth,
    };
  }, [transactions]);
}
