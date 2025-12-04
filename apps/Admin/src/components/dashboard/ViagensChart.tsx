/** @format */

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Seg", viagens: 120, receita: 3600 },
  { name: "Ter", viagens: 150, receita: 4500 },
  { name: "Qua", viagens: 180, receita: 5400 },
  { name: "Qui", viagens: 210, receita: 6300 },
  { name: "Sex", viagens: 240, receita: 7200 },
  { name: "Sáb", viagens: 300, receita: 9000 },
  { name: "Dom", viagens: 350, receita: 10500 },
];

const ViagensChart: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Desempenho Semanal
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
            Semana
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            Mês
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViagens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "receita") {
                  return [
                    new Intl.NumberFormat("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                      minimumFractionDigits: 0,
                    }).format(value),
                    "Receita",
                  ];
                }
                return [value, name === "viagens" ? "Viagens" : ""];
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                if (value === "viagens") return "Viagens";
                if (value === "receita") return "Receita";
                return value;
              }}
            />
            <Area
              type="monotone"
              dataKey="viagens"
              stroke="#0d9488"
              fillOpacity={1}
              fill="url(#colorViagens)"
              strokeWidth={2}
              activeDot={{
                r: 4,
                stroke: "#0d9488",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="receita"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorReceita)"
              strokeWidth={2}
              activeDot={{
                r: 4,
                stroke: "#6366f1",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViagensChart;
