'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useFetch } from '@/hooks/useFetch';
import { DashboardFinanceiro } from '@/types/financeiro';
import { formatarMoeda } from '@/lib/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Financeiro = () => {
  const { dados, carregando, erro } = useFetch<DashboardFinanceiro>(
    '/financeiro/dashboard',
    { autoFetch: true }
  );

  const evoluacaoData = [
    { mes: 'Jan', receita: 45000, pagamentos: 38000, lucro: 7000 },
    { mes: 'Fev', receita: 52000, pagamentos: 43000, lucro: 9000 },
    { mes: 'Mar', receita: 48000, pagamentos: 40000, lucro: 8000 },
    { mes: 'Abr', receita: 61000, pagamentos: 50000, lucro: 11000 },
    { mes: 'Mai', receita: 55000, pagamentos: 45000, lucro: 10000 },
    { mes: 'Jun', receita: 67000, pagamentos: 55000, lucro: 12000 },
  ];

  return (
    <MainLayout titulo="Controlo Financeiro">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Controlo Financeiro</h1>
        <p className="text-gray-600">Monitorar receitas e pagamentos</p>
      </div>

      {/* Cards de Resumo */}
      {carregando ? (
        <LoadingSpinner />
      ) : erro ? (
        <div className="card p-6 text-center text-red-600">
          <p>{erro}</p>
        </div>
      ) : dados ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Receita Total */}
            <div className="card p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">RECEITA TOTAL</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{formatarMoeda(dados.receita)}</p>
                  <p className="text-xs text-green-600 mt-2">Este mês</p>
                </div>
                <DollarSign className="text-green-500" size={40} />
              </div>
            </div>

            {/* Pagamentos */}
            <div className="card p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">PAGAMENTOS</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{formatarMoeda(dados.pagamentos)}</p>
                  <p className="text-xs text-blue-600 mt-2">Aos motoristas</p>
                </div>
                <Wallet className="text-blue-500" size={40} />
              </div>
            </div>

            {/* Taxas */}
            <div className="card p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">TAXAS</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{formatarMoeda(dados.taxas)}</p>
                  <p className="text-xs text-orange-600 mt-2">Despesas</p>
                </div>
                <TrendingDown className="text-orange-500" size={40} />
              </div>
            </div>

            {/* Lucro Líquido */}
            <div className="card p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">LUCRO LÍQUIDO</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{formatarMoeda(dados.lucroLiquido)}</p>
                  <p className="text-xs text-red-600 mt-2">Resultado</p>
                </div>
                <TrendingUp className="text-red-500" size={40} />
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Evolução de Receita */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução de Receita</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={evoluacaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatarMoeda(value as number)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Receita"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comparativo */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparativo Mensal</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={evoluacaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatarMoeda(value as number)} />
                  <Legend />
                  <Bar dataKey="receita" fill="#10b981" name="Receita" />
                  <Bar dataKey="pagamentos" fill="#3b82f6" name="Pagamentos" />
                  <Bar dataKey="lucro" fill="#ef4444" name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resumo Executivo */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo Executivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Variação Mês Anterior</p>
                <p className="text-2xl font-bold text-green-600">{dados.percentualVariacao > 0 ? '+' : ''}{dados.percentualVariacao.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Média por Transação</p>
                <p className="text-2xl font-bold text-blue-600">{formatarMoeda(dados.receita / 100)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Margem de Lucro</p>
                <p className="text-2xl font-bold text-purple-600">{((dados.lucroLiquido / dados.receita) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </MainLayout>
  );
};

export default Financeiro;