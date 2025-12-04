'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, Car, MapPin, Clock, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
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
    { motoristaNome: 'Lucas Ferreira', numeroViagens: 102, avaliacaoMedia: 4.6, distanciaTotal: 1540 },
    { motoristaNome: 'Beatriz Lima', numeroViagens: 98, avaliacaoMedia: 4.9, distanciaTotal: 1480 },
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

  const motoristasData = dadosRelatorio.porMotorista.slice(0, 5).map((m) => ({
    name: m.motoristaNome,
    viagens: m.numeroViagens,
    avaliacao: m.avaliacaoMedia,
  }));

  const exportarPDF = () => {
    alert('Exportação para PDF iniciada! (Funcionalidade de demonstração)');
  };

  const exportarExcel = () => {
    alert('Exportação para Excel iniciada! (Funcionalidade de demonstração)');
  };

  return (
    <MainLayout titulo="Relatório de Viagens">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatório de Viagens</h1>
        <p className="text-gray-600">Análise completa de viagens realizadas por motorista e período</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Car size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Total de Viagens</p>
          <p className="text-4xl font-bold">{dadosRelatorio.total.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">No período</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <MapPin size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Distância Total</p>
          <p className="text-4xl font-bold">{dadosRelatorio.distanciaTotal.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">Quilômetros percorridos</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Tempo Médio</p>
          <p className="text-4xl font-bold">{dadosRelatorio.tempoMedio}</p>
          <p className="text-xs opacity-75 mt-2">Minutos por viagem</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Motoristas Ativos</p>
          <p className="text-4xl font-bold">{dadosRelatorio.porMotorista.length}</p>
          <p className="text-xs opacity-75 mt-2">Neste período</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top 5 Motoristas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={20} />
            Top 5 Motoristas por Viagens
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={motoristasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Bar dataKey="viagens" fill="#14b8a6" name="Viagens" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução Diária */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Car className="text-teal-600" size={20} />
            Evolução Diária de Viagens
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosRelatorio.porDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="viagens" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Viagens"
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="text-teal-600" size={20} />
            Desempenho Detalhado por Motorista
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Posição</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Motorista</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nº Viagens</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Distância (km)</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Avaliação</th>
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
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{motorista.numeroViagens}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{motorista.distanciaTotal.toLocaleString()} km</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500" size={16} />
                      <span className="text-sm font-semibold text-gray-900">{motorista.avaliacaoMedia.toFixed(1)}</span>
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

export default RelatorioViagens;
