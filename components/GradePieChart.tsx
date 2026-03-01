"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

type GradeData = {
  grade: string;
  count: number;
};

type Props = {
  data: GradeData[];
  type: "boulder" | "sport";
};

// Color palette (add more if needed)
const COLORS = [
  "#e5e7eb", // 1 very light gray
  "#d1d5db",
  "#9ca3af",
  "#6b7280",
  "#4b5563",
  "#374151",

  "#c7d2fe", // subtle indigo
  "#a5b4fc",
  "#818cf8",
  "#6366f1",

  "#bbf7d0", // soft green
  "#86efac",
  "#4ade80",
  "#22c55e",

  "#fde68a", // soft amber
  "#fbbf24",
  "#f59e0b",

  "#ef4444", // hardest grades
];

export default function GradePieChart({ data, type }: Props) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Add percentage + color directly into the data
  const chartData = data.map((item, index) => ({
    name: `${type === "boulder" ? "V" : ""}${item.grade}`,
    value: item.count,
    percent: total ? item.count / total : 0,
    fill: COLORS[index % COLORS.length],
  }));

  // Handle empty state
  if (total === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center text-muted-foreground">
        No climb data
      </div>
    );
  }

  return (
    <div className="w-full h-80 mt-8">
      <h1 className="text-lg font-semibold mb-4 text-center">
        {type === "boulder" ? "Boulder" : "Sport"} Grade Distribution
      </h1>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            label={({ name, payload }) =>
              `${name} ${(payload.percent * 100).toFixed(0)}%`
            }
            isAnimationActive
          />
          <Tooltip
            labelClassName="mt-8"
            formatter={(value) => `${value} climbs`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
