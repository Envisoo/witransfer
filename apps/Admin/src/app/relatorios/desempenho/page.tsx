'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, Trophy, TrendingUp, Users, Star, AlertCircle, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatório de Desempenho</h1>
        <p className="text-gray-600">Rankings, avaliações e análise de performance</p>
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

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle size={40} className="opacity-80" />
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs font-medium opacity-90">Meta: &lt; 10%</p>
            </div>
          </div>
          <p className="text-lg font-medium opacity-90 mb-2">Taxa de Cancelamento</p>
          <p className="text-5xl font-bold mb-2">
            {(dadosRelatorio.taxaCancelamento * 100).toFixed(1)}%
          </p>
          <p className="text-sm opacity-75">
            {dadosRelatorio.taxaCancelamento < 0.1 ? '✓ Dentro da meta' : '⚠ Acima da meta'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle size={40} className="opacity-80" />
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs font-medium opacity-90">Meta: &gt; 90%</p>
            </div>
          </div>
          <p className="text-lg font-medium opacity-90 mb-2">Satisfação Geral</p>
          <p className="text-5xl font-bold mb-2">
            {(dadosRelatorio.satisfacao * 100).toFixed(1)}%
          </p>
          <p className="text-sm opacity-75">
            ✓ Meta alcançada
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar de Métricas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="text-teal-600" size={20} />
            Métricas de Qualidade
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={metricasRadar}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metrica" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar 
                name="Score" 
                dataKey="valor" 
                stroke="#14b8a6" 
                fill="#14b8a6" 
                fillOpacity={0.6} 
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Motoristas - Viagens */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={20} />
            Top 5 Motoristas - Viagens
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dadosRelatorio.motoristas.maisViagens} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="motoristaNome" type="category" stroke="#6b7280" width={100} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="numeroViagens" fill="#14b8a6" name="Viagens" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Motoristas com Mais Viagens */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Motoristas com Mais Viagens</h3>
          </div>
          <div className="space-y-4">
            {dadosRelatorio.motoristas.maisViagens.map((m, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                    idx === 1 ? 'bg-gray-200 text-gray-700' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {idx + 1}
                  </span>
                  {idx < 3 && <Trophy className={
                    idx === 0 ? 'text-yellow-500' :
                    idx === 1 ? 'text-gray-400' :
                    'text-orange-600'
                  } size={20} />}
                  <div>
                    <p className="font-semibold text-gray-900">{m.motoristaNome}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500" size={12} />
                      {m.avaliacaoMedia.toFixed(1)}
                    </p>
                  </div>
                </div>
                <Badge>{m.numeroViagens} viagens</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Motoristas Melhor Avaliados */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-amber-500 fill-amber-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Motoristas Melhor Avaliados</h3>
          </div>
          <div className="space-y-4">
            {dadosRelatorio.motoristas.melhorAvaliados.map((m, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                    idx === 1 ? 'bg-gray-200 text-gray-700' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{m.motoristaNome}</p>
                    <p className="text-xs text-gray-500">{m.numeroViagens} viagens</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg">
                  <Star className="text-amber-500 fill-amber-500" size={16} />
                  <span className="font-bold text-amber-700">{m.avaliacao.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clientes Frequentes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="text-teal-600" size={20} />
            Top 10 Clientes Mais Frequentes
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Posição</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nº Viagens</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Categoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dadosRelatorio.clientes.maisFrequentes.map((cliente, idx) => (
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
                        {cliente.clienteNome.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{cliente.clienteNome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cliente.numeroViagens}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      cliente.numeroViagens > 50 ? 'bg-purple-100 text-purple-700' :
                      cliente.numeroViagens > 30 ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
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

      {/* Resumo de Métricas */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Resumo de Métricas de Qualidade</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(dadosRelatorio.metricas).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 capitalize">{key}</p>
              <p className="text-3xl font-bold text-teal-600">{value}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
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

export default RelatorioDesempenho;