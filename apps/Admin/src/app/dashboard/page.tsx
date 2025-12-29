/** @format */

"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Users, 
  Car, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  
  MapPin,
  MoreHorizontal
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  
} from "recharts";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import { formatarMoeda } from "@/lib/formatters";

// Mock Data for Charts
const dataRevenue = [
  { name: "Seg", valor: 150000, viagens: 12 },
  { name: "Ter", valor: 230000, viagens: 18 },
  { name: "Qua", valor: 180000, viagens: 15 },
  { name: "Qui", valor: 320000, viagens: 25 },
  { name: "Sex", valor: 290000, viagens: 22 },
  { name: "Sáb", valor: 450000, viagens: 40 },
  { name: "Dom", valor: 380000, viagens: 35 },
];

const recentTrips = [
  { id: "v123", cliente: "Maria Silva", destino: "Aeroporto 4 Fev", valor: 5000, status: "concluida", time: "Há 10 min" },
  { id: "v124", cliente: "João Pedro", destino: "Talatona", valor: 3500, status: "em_progresso", time: "Agora" },
  { id: "v125", cliente: "Ana Souza", destino: "Kilamba", valor: 8000, status: "solicitada", time: "Há 5 min" },
  { id: "v126", cliente: "Carlos Manuel", destino: "Mutamba", valor: 2000, status: "cancelada", time: "Há 1h" },
];

const topDrivers = [
  { name: "Pedro Costa", trips: 145, rating: 4.9, earnings: 850000 },
  { name: "Lucas Pereira", trips: 132, rating: 4.8, earnings: 720000 },
  { name: "Ana Oliveira", trips: 120, rating: 5.0, earnings: 690000 },
];

const Dashboard = () => {
  return (
    <MainLayout titulo="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo ao painel de controle do WiTransfer.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Receita Total */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12.5% <ArrowUpRight size={12} className="ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Receita Mensal</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{formatarMoeda(2450000)}</p>
          <p className="text-xs text-gray-400 mt-2">Comparado ao mês anterior</p>
        </div>

        {/* Card 2: Viagens Totais */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Car className="text-indigo-600" size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +8.2% <ArrowUpRight size={12} className="ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Viagens Totais</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
          <p className="text-xs text-gray-400 mt-2">Deste mês</p>
        </div>

        {/* Card 3: Clientes Ativos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Users className="text-purple-600" size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
              -2.1% <ArrowDownRight size={12} className="ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Novos Clientes</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">328</p>
          <p className="text-xs text-gray-400 mt-2">Nos últimos 30 dias</p>
        </div>

        {/* Card 4: Taxa de Crescimento */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-xl">
              <TrendingUp className="text-teal-600" size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +5.4% <ArrowUpRight size={12} className="ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Crescimento</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">24.5%</p>
          <p className="text-xs text-gray-400 mt-2">Média anual</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Receita Semanal</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Relatório</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataRevenue}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Top Motoristas</h3>
           <div className="space-y-6">
             {topDrivers.map((driver, index) => (
               <div key={index} className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                   {index + 1}
                 </div>
                 <div className="flex-1">
                   <h4 className="font-semibold text-gray-900 text-sm">{driver.name}</h4>
                   <p className="text-xs text-gray-500">{driver.trips} viagens • ⭐ {driver.rating}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-gray-900 text-sm">{formatarMoeda(driver.earnings)}</p>
                 </div>
               </div>
             ))}
           </div>
           <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
             Ver Todos os Motoristas
           </button>
        </div>
      </div>

      {/* Bottom Section: Recent Trips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Viagens Recentes</h3>
          <Link href="/viagens" className="text-sm text-blue-600 font-medium hover:underline">
            Ver Todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Destino</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Valor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Tempo</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <MapPin size={16} />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{trip.destino}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trip.cliente}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-sm">{formatarMoeda(trip.valor)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={trip.status as any}>{trip.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-gray-500">{trip.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
