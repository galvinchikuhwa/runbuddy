"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type WeeklyChartProps = {
  data: Array<{
    day: string;
    distance: number;
    fatigue: number;
  }>;
};

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="distanceFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="day"
            tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              color: "#ffffff",
            }}
            cursor={{ stroke: "rgba(34,197,94,0.35)", strokeWidth: 1 }}
          />
          <Area
            dataKey="distance"
            fill="url(#distanceFill)"
            name="Distance (km)"
            stroke="#22c55e"
            strokeWidth={2.5}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
