/** @format */

"use client";

import React, { useState } from "react";
import { Search, Settings2, Download, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import MetricCards from "@/components/dashboard/MetricCards";
import QuickActions from "@/components/dashboard/QuickActions";
import AlertsNotifications from "@/components/dashboard/AlertsNotifications";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import dynamic from "next/dynamic";

const DriverMap = dynamic(() => import("@/components/dashboard/DriverMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
      Carregando mapa...
    </div>
  ),
});

const Dashboard = () => {
  const [dados] = useState({
    totalClientes: 1240,
    motoristasOnline: 87,
    viagensHoje: 243,
    faturamentoHoje: 7290,
    lucroHoje: 2187,
    crescimentoHoje: 4.6,
    alertasCriticos: 3,
  });

  const viagensData = [
    { hora: "08h", viagens: 5 },
    { hora: "09h", viagens: 8 },
    { hora: "10h", viagens: 12 },
    { hora: "11h", viagens: 15 },
    { hora: "12h", viagens: 22 },
    { hora: "13h", viagens: 18 },
    { hora: "14h", viagens: 25 },
    { hora: "15h", viagens: 20 },
    { hora: "16h", viagens: 28 },
    { hora: "17h", viagens: 32 },
    { hora: "18h", viagens: 30 },
    { hora: "19h", viagens: 28 },
  ];

  const motoristasStatus = [
    { nome: "Ativos", valor: 87 },
    { nome: "Inativos", valor: 33 },
  ];

  const clientesTipo = [
    { nome: "Novos", valor: 28 },
    { nome: "Recorrentes", valor: 72 },
  ];

  const CORES = ["#10b981", "#e5e7eb", "#3b82f6", "#f59e0b"]; // emerald, gray, blue, amber

  const receitaData = [
    { hora: "08h", receita: 150 },
    { hora: "09h", receita: 240 },
    { hora: "10h", receita: 360 },
    { hora: "11h", receita: 450 },
    { hora: "12h", receita: 660 },
    { hora: "13h", receita: 540 },
    { hora: "14h", receita: 750 },
    { hora: "15h", receita: 600 },
    { hora: "16h", receita: 840 },
    { hora: "17h", receita: 960 },
    { hora: "18h", receita: 900 },
    { hora: "19h", receita: 840 },
  ];

  const topDrivers = [
    { nome: "Carlos Silva", viagens: 42, ganho: 56000 },
    { nome: "Ana Pereira", viagens: 38, ganho: 51500 },
    { nome: "João Neto", viagens: 35, ganho: 49700 },
    { nome: "Maria Costa", viagens: 32, ganho: 45200 },
    { nome: "Pedro Santos", viagens: 30, ganho: 42000 },
  ];

  const recentTrips = [
    {
      id: "V-1023",
      cliente: "M. Santos",
      origem: "Talatona",
      destino: "Ingombota",
      valor: 2500,
      hora: "10:35",
      status: "Concluído",
    },
    {
      id: "V-1022",
      cliente: "A. Lima",
      origem: "Samba",
      destino: "Maianga",
      valor: 1800,
      hora: "10:20",
      status: "Em andamento",
    },
    {
      id: "V-1021",
      cliente: "J. Lopes",
      origem: "Zango",
      destino: "Mutamba",
      valor: 3200,
      hora: "10:10",
      status: "Cancelado",
    },
    {
      id: "V-1020",
      cliente: "R. Mendes",
      origem: "Benfica",
      destino: "Kilamba",
      valor: 4500,
      hora: "09:55",
      status: "Concluído",
    },
  ];

  return (
    <MainLayout titulo="Visão Geral">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-64 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings2 size={16} />
            <span className="hidden sm:inline">Filtros</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
            <Download size={16} />
            <span className="hidden sm:inline">Exportar Relatório</span>
          </button>
        </div>
      </div>

      <MetricCards data={dados} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Main Chart */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                Fluxo de Viagens
              </h3>
              <select className="text-sm border-gray-200 rounded-md text-gray-500 focus:ring-teal-500 focus:border-teal-500">
                <option>Hoje</option>
                <option>Esta Semana</option>
                <option>Este Mês</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={viagensData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="hora"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "#f3f4f6" }}
                />
                <Bar
                  dataKey="viagens"
                  fill="#0d9488"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Motoristas Ativos vs Inativos
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={motoristasStatus}
                      dataKey="valor"
                      nameKey="nome"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}>
                      {motoristasStatus.map((_, idx) => (
                        <Cell key={idx} fill={CORES[idx % CORES.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Clientes Novos vs Recorrentes
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientesTipo}
                      dataKey="valor"
                      nameKey="nome"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}>
                      {clientesTipo.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CORES[(idx + 2) % CORES.length]}
                        />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Alerts & Notifications */}

          {/* Revenue Chart (Mini) */}
          <div className="bg-white p-5 rounded-0 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Receita</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={receitaData}>
                  <XAxis dataKey="hora" hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Hoje</span>
              <span className="font-bold text-gray-900 text-lg">7.290 Kz</span>
            </div>
          </div>

          {/* Mini Map */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Mapa de Motoristas Ativos
            </h3>
            <div className="h-48 relative z-0 rounded-lg overflow-hidden">
              <DriverMap />
            </div>
          </div>

          <AlertsNotifications />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Trips Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Viagens Recentes
            </h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              Ver Todas
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Rota</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTrips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {trip.id}
                    </td>
                    <td className="px-5 py-3 text-gray-700">{trip.cliente}</td>
                    <td className="px-5 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        {trip.origem}{" "}
                        <span className="text-gray-400 mx-1">→</span>{" "}
                        {trip.destino}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === "Concluído"
                            ? "bg-green-100 text-green-700"
                            : trip.status === "Em andamento"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-900">
                      {trip.valor.toLocaleString()} Kz
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Top Motoristas
          </h3>
          <div className="space-y-4">
            {topDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    {driver.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {driver.nome}
                    </p>
                    <p className="text-xs text-gray-500">
                      {driver.viagens} viagens
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-teal-600">
                  {driver.ganho.toLocaleString()} Kz
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-teal-600 font-medium hover:bg-teal-50 rounded-lg transition-colors">
            Ver Ranking Completo
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
