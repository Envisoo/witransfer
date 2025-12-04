/** @format */

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "Jan", desempenho: 65, meta: 70 },
  { name: "Fev", desempenho: 72, meta: 70 },
  { name: "Mar", desempenho: 75, meta: 75 },
  { name: "Abr", desempenho: 78, meta: 75 },
  { name: "Mai", desempenho: 82, meta: 80 },
  { name: "Jun", desempenho: 85, meta: 80 },
  { name: "Jul", desempenho: 88, meta: 85 },
  { name: "Ago", desempenho: 90, meta: 85 },
  { name: "Set", desempenho: 88, meta: 85 },
  { name: "Out", desempenho: 92, meta: 90 },
  { name: "Nov", desempenho: 94, meta: 90 },
  { name: "Dez", desempenho: 96, meta: 95 },
];

const DesempenhoChart: React.FC = () => {
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            domain={[60, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            formatter={(value: number, name: string) => {
              return [
                `${value}%`,
                name === "desempenho" ? "Desempenho" : "Meta",
              ];
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              if (value === "desempenho") return "Desempenho";
              if (value === "meta") return "Meta";
              return value;
            }}
          />
          <ReferenceLine y={85} stroke="#f59e0b" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="meta"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#f59e0b",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="desempenho"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{
              r: 4,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#fff",
            }}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DesempenhoChart;
