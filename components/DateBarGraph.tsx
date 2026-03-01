"use client";

import { Climb } from "@/app/types/types";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const chartConfig = {
  boulder: {
    label: "Boulder",
    color: "#2563eb",
  },
  sport: {
    label: "Sport",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

type DateBarGraphProps = {
  sends: Climb[];
};

export default function DateBarGraph({ sends }: DateBarGraphProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  const chartData = useMemo(() => {
    const monthlyData: Record<string, { boulder: number; sport: number }> = {};

    // Initialize all 12 months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    months.forEach((month) => {
      monthlyData[month] = { boulder: 0, sport: 0 };
    });

    // Aggregate sends by month and type
    sends.forEach((climb) => {
      const date = new Date(climb.created_at);
      const monthName = months[date.getMonth()];
      const year = date.getFullYear().toString();

      if (year !== selectedYear) {
        return;
      }

      if (climb.type === "boulder") {
        monthlyData[monthName].boulder += 1;
      } else if (climb.type === "sport") {
        monthlyData[monthName].sport += 1;
      }
    });

    // Convert to array format for recharts
    return months.map((month) => ({
      month,
      boulder: monthlyData[month].boulder,
      sport: monthlyData[month].sport,
    }));
  }, [sends, selectedYear]);

  return (
    <div className="flex flex-col items-center gap-2  w-full mt-16 ">
      <h1 className="text-lg font-semibold text-center">
        Climb Sends by Month
      </h1>
      <div className="">
        <Select onValueChange={(value) => setSelectedYear(value)}>
          <SelectTrigger size="sm" className="w-full max-w-48 ">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer
        config={chartConfig}
        className="min-h-32 w-full max-w-130 h-60 md:h-70"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            interval="preserveStartEnd"
            angle={-90}
            textAnchor="end"
            height={60}
          />
          <YAxis width={40} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="boulder" fill="var(--color-boulder)" radius={2} />
          <Bar dataKey="sport" fill="var(--color-sport)" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
