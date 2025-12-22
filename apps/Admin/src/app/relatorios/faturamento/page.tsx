/** @format */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, DollarSign, TrendingUp, Wallet, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { formatarMoeda } from '@/lib/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Dados estáticos
const dadosRelatorio = {
  receita: 2847500,
  pagamentos: 2315000,
  taxas: 142375,
  despesas: 95200,
  lucroLiquido: 294925,
  porMotorista: [
    { motoristaNome: 'João Santos', receita: 312000, comissao: 249600, lucro: 62400 },
    { motoristaNome: 'Ana Oliveira', receita: 284000, comissao: 227200, lucro: 56800 },
    { motoristaNome: 'Carlos Silva', receita: 276000, comissao: 220800, lucro: 55200 },
    { motoristaNome: 'Maria Costa', receita: 258000, comissao: 206400, lucro: 51600 },
    { motoristaNome: 'Pedro Alves', receita: 250000, comissao: 200000, lucro: 50000 },
    { motoristaNome: 'Sofia Martins', receita: 236000, comissao: 188800, lucro: 47200 },
    { motoristaNome: 'Rui Pereira', receita: 230000, comissao: 184000, lucro: 46000 },
    { motoristaNome: 'Isabel Rocha', receita: 218000, comissao: 174400, lucro: 43600 },
  ],
  evolucaoMensal: [
    { mes: 'Jul', receita: 2420000, lucro: 242000 },
    { mes: 'Ago', receita: 2580000, lucro: 258000 },
    { mes: 'Set', receita: 2690000, lucro: 269000 },
    { mes: 'Out', receita: 2760000, lucro: 276000 },
    { mes: 'Nov', receita: 2847500, lucro: 284750 },
  ],
};

const RelatorioFaturamento = () => {
  const [dataInicio, setDataInicio] = useState('2024-11-01');
  const [dataFim, setDataFim] = useState('2024-11-30');

  const exportarPDF = () => {
    alert('Exportação para PDF iniciada! (Funcionalidade de demonstração)');
  };

  const exportarExcel = () => {
    alert('Exportação para Excel iniciada! (Funcionalidade de demonstração)');
  };

  return (
    <MainLayout titulo="Relatório de Faturamento">
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Relatório de Faturamento</h1>
        <p className="text-sm text-gray-500">Análise completa de receitas, pagamentos e lucros por período</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="text-blue-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Receita Total</h3>
          <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.receita)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Wallet className="text-indigo-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Pagamentos</h3>
          <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.pagamentos)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Taxas</h3>
          <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.taxas)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <DollarSign className="text-red-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Despesas</h3>
          <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.despesas)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-xl">
              <TrendingUp className="text-teal-600" size={20} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Lucro Líquido</h3>
          <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.lucroLiquido)}</p>
          <p className="text-xs text-gray-400 mt-1">
            Margem: {((dadosRelatorio.lucroLiquido / dadosRelatorio.receita) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Evolução Mensal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Evolução Mensal</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Detalhes</button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosRelatorio.evolucaoMensal}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => formatarMoeda(value as number)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorReceita)"
                  name="Receita"
                />
                <Area 
                  type="monotone" 
                  dataKey="lucro" 
                  stroke="#14b8a6" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorLucro)"
                  name="Lucro"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Motoristas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top 5 por Receita</h3>
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
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => formatarMoeda(value as number)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="receita" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Receita" />
                <Bar dataKey="lucro" fill="#14b8a6" radius={[8, 8, 0, 0]} name="Lucro" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Faturamento por Motorista</h3>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Receita</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Comissão</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lucro</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Margem</th>
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
                    <span className="font-medium text-gray-600">{formatarMoeda(motorista.receita)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{formatarMoeda(motorista.comissao)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{formatarMoeda(motorista.lucro)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                      {((motorista.lucro / motorista.receita) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Geral */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Receita</p>
              <p className="text-xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.receita)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Comissões</p>
              <p className="text-xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.pagamentos)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Lucro</p>
              <p className="text-xl font-bold text-gray-900">{formatarMoeda(dadosRelatorio.lucroLiquido)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Margem Média</p>
              <p className="text-xl font-bold text-gray-900">
                {((dadosRelatorio.lucroLiquido / dadosRelatorio.receita) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
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

export default RelatorioFaturamento;
