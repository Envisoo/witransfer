/** @format */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const data = [
  { name: "Seg", receita: 4500, lucro: 1350 },
  { name: "Ter", receita: 5000, lucro: 1500 },
  { name: "Qua", receita: 5200, lucro: 1560 },
  { name: "Qui", receita: 4800, lucro: 1440 },
  { name: "Sex", receita: 6000, lucro: 1800 },
  { name: "Sáb", receita: 7200, lucro: 2160 },
  { name: "Dom", receita: 8000, lucro: 2400 },
];

const COLORS = ["#6366f1", "#10b981"];

const ReceitaChart: React.FC = () => {
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
            tickFormatter={(value) =>
              new Intl.NumberFormat("pt-AO", {
                style: "currency",
                currency: "AOA",
                notation: "compact",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            formatter={(value: number, name: string) => {
              if (name === "receita" || name === "lucro") {
                return [
                  new Intl.NumberFormat("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                    minimumFractionDigits: 2,
                  }).format(value),
                  name === "receita" ? "Receita" : "Lucro",
                ];
              }
              return [value, name];
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              if (value === "receita") return "Receita";
              if (value === "lucro") return "Lucro";
              return value;
            }}
          />
          <Bar
            dataKey="receita"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.8}
            name="Receita">
            {data.map((_, index) => (
              <Cell key={`receita-cell-${index}`} fill={COLORS[0]} />
            ))}
          </Bar>
          <Bar
            dataKey="lucro"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.8}
            name="Lucro">
            {data.map((_, index) => (
              <Cell key={`lucro-cell-${index}`} fill={COLORS[1]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReceitaChart;
