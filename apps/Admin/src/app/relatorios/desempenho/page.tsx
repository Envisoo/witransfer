/** @format */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, Star, Users, ChevronRight, Award } from 'lucide-react';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Dados estáticos
const dadosRelatorio = {
  taxaCancelamento: 0.062,
  satisfacao: 0.94,
  motoristas: {
    maisViagens: [
      { motoristaNome: 'João Santos', numeroViagens: 156, avaliacaoMedia: 4.8 },
      { motoristaNome: 'Ana Oliveira', numeroViagens: 142, avaliacaoMedia: 4.9 },
      { motoristaNome: 'Carlos Silva', numeroViagens: 138, avaliacaoMedia: 4.7 },
      { motoristaNome: 'Maria Costa', numeroViagens: 129, avaliacaoMedia: 4.6 },
      { motoristaNome: 'Pedro Alves', numeroViagens: 125, avaliacaoMedia: 4.8 },
    ],
    melhorAvaliados: [
      { motoristaNome: 'Ana Oliveira', avaliacao: 4.9, numeroViagens: 142 },
      { motoristaNome: 'João Santos', avaliacao: 4.8, numeroViagens: 156 },
      { motoristaNome: 'Pedro Alves', avaliacao: 4.8, numeroViagens: 125 },
      { motoristaNome: 'Carlos Silva', avaliacao: 4.7, numeroViagens: 138 },
      { motoristaNome: 'Maria Costa', avaliacao: 4.6, numeroViagens: 129 },
    ],
  },
  clientes: {
    maisFrequentes: [
      { clienteNome: 'Empresa ABC Lda', numeroViagens: 89 },
      { clienteNome: 'João Pedro Silva', numeroViagens: 67 },
      { clienteNome: 'Maria Santos', numeroViagens: 54 },
      { clienteNome: 'Tech Solutions', numeroViagens: 48 },
      { clienteNome: 'Carlos Mendes', numeroViagens: 42 },
      { clienteNome: 'Ana Costa', numeroViagens: 38 },
      { clienteNome: 'Transportes XYZ', numeroViagens: 35 },
      { clienteNome: 'Pedro Oliveira', numeroViagens: 32 },
      { clienteNome: 'Sofia Martins', numeroViagens: 29 },
      { clienteNome: 'Rui Pereira', numeroViagens: 26 },
    ],
  },
  metricas: {
    pontualidade: 92,
    atendimento: 95,
    veiculoLimpo: 88,
    seguranca: 96,
    comunicacao: 90,
  },
};

const metricasRadar = [
  { metrica: 'Pontualidade', valor: 92 },
  { metrica: 'Atendimento', valor: 95 },
  { metrica: 'Veículo', valor: 88 },
  { metrica: 'Segurança', valor: 96 },
  { metrica: 'Comunicação', valor: 90 },
];

const RelatorioDesempenho = () => {
  const [dataInicio, setDataInicio] = useState('2024-11-01');
  const [dataFim, setDataFim] = useState('2024-11-30');

  const exportarPDF = () => {
    alert('Exportação para PDF iniciada! (Funcionalidade de demonstração)');
  };

  const exportarExcel = () => {
    alert('Exportação para Excel iniciada! (Funcionalidade de demonstração)');
  };

  return (
    <MainLayout titulo="Relatório de Desempenho">
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Relatório de Desempenho</h1>
        <p className="text-sm text-gray-500">Rankings, avaliações e análise de performance</p>
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

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <Award className="text-red-600" size={24} />
            </div>
            <div className="bg-red-50 rounded-lg px-4 py-2">
              <p className="text-xs font-medium text-red-600">Meta: &lt; 10%</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-2">Taxa de Cancelamento</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">
            {(dadosRelatorio.taxaCancelamento * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400">
            {dadosRelatorio.taxaCancelamento < 0.1 ? '✓ Dentro da meta' : '⚠ Acima da meta'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <Award className="text-green-600" size={24} />
            </div>
            <div className="bg-green-50 rounded-lg px-4 py-2">
              <p className="text-xs font-medium text-green-600">Meta: &gt; 90%</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-2">Satisfação Geral</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">
            {(dadosRelatorio.satisfacao * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400">✓ Meta alcançada</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar de Métricas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Métricas de Qualidade</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Detalhes</button>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={metricasRadar}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metrica" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                <Radar 
                  name="Score" 
                  dataKey="valor" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2} 
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Motoristas - Viagens */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Motoristas</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver Todos</button>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosRelatorio.motoristas.maisViagens} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  dataKey="motoristaNome" 
                  type="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  width={100} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="numeroViagens" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Viagens" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Motoristas Melhor Avaliados */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-amber-400 fill-amber-400" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Motoristas Melhor Avaliados</h3>
          </div>
          <div className="space-y-3">
            {dadosRelatorio.motoristas.melhorAvaliados.map((m, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="font-bold text-blue-600 text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{m.motoristaNome}</p>
                    <p className="text-xs text-gray-500">{m.numeroViagens} viagens</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg">
                  <Star className="text-amber-400 fill-amber-400" size={14} />
                  <span className="font-bold text-amber-600 text-sm">{m.avaliacao.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo de Métricas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Resumo de Métricas</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(dadosRelatorio.metricas).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                  <span className="text-sm font-bold text-gray-900">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clientes Frequentes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Top 10 Clientes Mais Frequentes</h3>
          </div>
          <Link href="/clientes" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            Ver Clientes
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Nº Viagens</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Categoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dadosRelatorio.clientes.maisFrequentes.map((cliente, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="font-bold text-blue-600 text-sm">{idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{cliente.clienteNome}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{cliente.numeroViagens}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      cliente.numeroViagens > 50 ? 'bg-purple-50 text-purple-600' :
                      cliente.numeroViagens > 30 ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {cliente.numeroViagens > 50 ? 'VIP' : cliente.numeroViagens > 30 ? 'Frequente' : 'Regular'}
                    </span>
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

export default RelatorioDesempenho;