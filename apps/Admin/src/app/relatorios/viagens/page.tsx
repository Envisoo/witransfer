/** @format */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar, MapPin, Clock, Star, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Dados estáticos
const dadosRelatorio = {
  total: 1247,
  distanciaTotal: 18543,
  tempoMedio: 35,
  porMotorista: [
    { motoristaNome: 'João Santos', numeroViagens: 156, avaliacaoMedia: 4.8, distanciaTotal: 2340 },
    { motoristaNome: 'Ana Oliveira', numeroViagens: 142, avaliacaoMedia: 4.9, distanciaTotal: 2180 },
    { motoristaNome: 'Carlos Silva', numeroViagens: 138, avaliacaoMedia: 4.7, distanciaTotal: 2020 },
    { motoristaNome: 'Maria Costa', numeroViagens: 129, avaliacaoMedia: 4.6, distanciaTotal: 1950 },
    { motoristaNome: 'Pedro Alves', numeroViagens: 125, avaliacaoMedia: 4.8, distanciaTotal: 1890 },
    { motoristaNome: 'Sofia Martins', numeroViagens: 118, avaliacaoMedia: 4.9, distanciaTotal: 1780 },
    { motoristaNome: 'Rui Pereira', numeroViagens: 115, avaliacaoMedia: 4.7, distanciaTotal: 1720 },
    { motoristaNome: 'Isabel Rocha', numeroViagens: 109, avaliacaoMedia: 4.8, distanciaTotal: 1650 },
  ],
  porDia: [
    { dia: '27/11', viagens: 42, distancia: 620 },
    { dia: '28/11', viagens: 48, distancia: 710 },
    { dia: '29/11', viagens: 45, distancia: 665 },
    { dia: '30/11', viagens: 51, distancia: 745 },
    { dia: '01/12', viagens: 44, distancia: 650 },
    { dia: '02/12', viagens: 47, distancia: 695 },
    { dia: '03/12', viagens: 40, distancia: 590 },
  ],
};

const RelatorioViagens = () => {
  const [dataInicio, setDataInicio] = useState('2024-11-01');
  const [dataFim, setDataFim] = useState('2024-12-03');

  const exportarPDF = () => {
    alert('Exportação para PDF iniciada! (Funcionalidade de demonstração)');
  };

  const exportarExcel = () => {
    alert('Exportação para Excel iniciada! (Funcionalidade de demonstração)');
  };

  return (
    <MainLayout titulo="Relatório de Viagens">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/relatorios"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar para Relatórios
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Relatório de Viagens</h1>
        <p className="text-sm text-gray-500">Análise completa de viagens realizadas por motorista e período</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Período de Análise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Atualizar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Calendar className="text-blue-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total de Viagens</h3>
          <p className="text-3xl font-bold text-gray-900">{dadosRelatorio.total.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">No período selecionado</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <MapPin className="text-indigo-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Distância Total</h3>
          <p className="text-3xl font-bold text-gray-900">{dadosRelatorio.distanciaTotal.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">Quilômetros percorridos</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Clock className="text-purple-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Tempo Médio</h3>
          <p className="text-3xl font-bold text-gray-900">{dadosRelatorio.tempoMedio}</p>
          <p className="text-xs text-gray-400 mt-2">Minutos por viagem</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-xl">
              <TrendingUp className="text-teal-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Motoristas Ativos</h3>
          <p className="text-3xl font-bold text-gray-900">{dadosRelatorio.porMotorista.length}</p>
          <p className="text-xs text-gray-400 mt-2">Neste período</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Evolução Diária */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Evolução Diária</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Detalhes</button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosRelatorio.porDia}>
                <defs>
                  <linearGradient id="colorViagens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="dia" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="viagens" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViagens)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Motoristas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top 5 Motoristas</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Todos</button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosRelatorio.porMotorista.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="motoristaNome" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="numeroViagens" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Desempenho por Motorista</h3>
          <Link href="/motoristas" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            Ver Motoristas
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Motorista</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Viagens</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Distância</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dadosRelatorio.porMotorista.map((motorista, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="font-bold text-blue-600 text-sm">{idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{motorista.motoristaNome}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{motorista.numeroViagens}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{motorista.distanciaTotal.toLocaleString()} km</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-400 fill-amber-400" size={14} />
                      <span className="font-semibold text-gray-900 text-sm">{motorista.avaliacaoMedia.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botões de Exportação */}
      <div className="flex gap-3">
        <button 
          onClick={exportarPDF}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Download size={16} />
          Exportar PDF
        </button>
        <button 
          onClick={exportarExcel}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Download size={16} />
          Exportar Excel
        </button>
      </div>
    </MainLayout>
  );
};

export default RelatorioViagens;
