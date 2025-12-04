'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, DollarSign, TrendingUp, TrendingDown, Wallet, PieChartIcon } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import { formatarMoeda } from '@/lib/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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
    { mes: 'Jul', receita: 2420000, pagamentos: 1968000, lucro: 242000 },
    { mes: 'Ago', receita: 2580000, pagamentos: 2098000, lucro: 258000 },
    { mes: 'Set', receita: 2690000, pagamentos: 2187000, lucro: 269000 },
    { mes: 'Out', receita: 2760000, pagamentos: 2243000, lucro: 276000 },
    { mes: 'Nov', receita: 2847500, pagamentos: 2315000, lucro: 284750 },
  ],
};

const distribuicaoReceita = [
  { name: 'Pagamentos Motoristas', value: 2315000, color: '#3b82f6' },
  { name: 'Taxas', value: 142375, color: '#f59e0b' },
  { name: 'Despesas', value: 95200, color: '#ef4444' },
  { name: 'Lucro Líquido', value: 294925, color: '#14b8a6' },
];

const Relatoriofaturamento = () => {
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
      <div className="mb-6">
        <Link
          href="/relatorios"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Relatórios
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatório de Faturamento</h1>
        <p className="text-gray-600">Análise completa de receitas, pagamentos e lucros por período</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de Período</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Data Inicial</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Data Final</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button variant="primary" fullWidth>
              Atualizar Relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} className="opacity-80" />
            <TrendingUp size={20} className="opacity-60" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Receita Total</p>
          <p className="text-2xl font-bold">{formatarMoeda(dadosRelatorio.receita)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Wallet size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Pagamentos</p>
          <p className="text-2xl font-bold">{formatarMoeda(dadosRelatorio.pagamentos)}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Taxas</p>
          <p className="text-2xl font-bold">{formatarMoeda(dadosRelatorio.taxas)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Despesas</p>
          <p className="text-2xl font-bold">{formatarMoeda(dadosRelatorio.despesas)}</p>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Lucro Líquido</p>
          <p className="text-2xl font-bold">{formatarMoeda(dadosRelatorio.lucroLiquido)}</p>
          <p className="text-xs opacity-75 mt-2">
            Margem: {((dadosRelatorio.lucroLiquido / dadosRelatorio.receita) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Evolução Mensal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={20} />
            Evolução Mensal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosRelatorio.evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => formatarMoeda(value as number)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="receita" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Receita"
                dot={{ fill: '#10b981', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="lucro" 
                stroke="#14b8a6" 
                strokeWidth={3}
                name="Lucro"
                dot={{ fill: '#14b8a6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição de Receita */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <PieChartIcon className="text-teal-600" size={20} />
            Distribuição de Receita
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribuicaoReceita}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {distribuicaoReceita.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatarMoeda(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparativo por Motorista */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart className="text-teal-600" />
          Comparativo de Receita por Motorista
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dadosRelatorio.porMotorista}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="motoristaNome" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              formatter={(value) => formatarMoeda(value as number)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend />
            <Bar dataKey="receita" fill="#10b981" name="Receita" radius={[8, 8, 0, 0]} />
            <Bar dataKey="comissao" fill="#3b82f6" name="Comissão Motorista" radius={[8, 8, 0, 0]} />
            <Bar dataKey="lucro" fill="#14b8a6" name="Lucro" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="text-teal-600" size={20} />
            Faturamento Detalhado por Motorista
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Posição</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Motorista</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Receita</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Comissão</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Lucro</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Margem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dadosRelatorio.porMotorista.map((motorista, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                      idx === 1 ? 'bg-gray-200 text-gray-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">
                        {motorista.motoristaNome.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{motorista.motoristaNome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatarMoeda(motorista.receita)}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                    {formatarMoeda(motorista.comissao)}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-teal-600">
                    {formatarMoeda(motorista.lucro)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                      {((motorista.lucro / motorista.receita) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Geral */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Receita</p>
              <p className="text-xl font-bold text-green-600">{formatarMoeda(dadosRelatorio.receita)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Comissões</p>
              <p className="text-xl font-bold text-blue-600">{formatarMoeda(dadosRelatorio.pagamentos)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Lucro</p>
              <p className="text-xl font-bold text-teal-600">{formatarMoeda(dadosRelatorio.lucroLiquido)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Margem Média</p>
              <p className="text-xl font-bold text-purple-600">
                {((dadosRelatorio.lucroLiquido / dadosRelatorio.receita) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Exportação */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={exportarPDF}
        >
          <Download size={18} />
          Exportar PDF
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={exportarExcel}
        >
          <Download size={18} />
          Exportar Excel
        </Button>
      </div>
    </MainLayout>
  );
};

export default Relatoriofaturamento;
