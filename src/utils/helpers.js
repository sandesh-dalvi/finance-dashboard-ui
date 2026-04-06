export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function buildTrendData(transactions) {
  const map = {};
  transactions.forEach(({ date, amount, type }) => {
    const d = new Date(date);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    if (!map[key]) map[key] = { name: key, income: 0, expenses: 0 };
    if (type === "income") map[key].income += amount;
    else map[key].expenses += amount;
  });
  return Object.values(map).map((m) => ({
    ...m,
    balance: m.income - m.expenses,
  }));
}

export function buildCategoryData(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach(({ category, amount }) => {
      map[category] = (map[category] || 0) + amount;
    });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}
