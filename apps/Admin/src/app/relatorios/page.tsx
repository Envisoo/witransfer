'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';

const RelatoriosPage = () => {
  const relatorios = [
    {
      id: 'viagens',
      titulo: 'Relatório de Viagens',
      descricao: 'Análise completa de viagens realizadas por motorista, cliente e período',
      icone: '🚕',
      cor: 'blue',
    },
    {
      id: 'faturamento',
      titulo: 'Relatório de Faturamento',
      descricao: 'Receita, pagamentos e lucro por período e motorista',
      icone: '💰',
      cor: 'green',
    },
    {
      id: 'desempenho',
      titulo: 'Relatório de Desempenho',
      descricao: 'Ranking de motoristas, clientes frequentes e taxa de cancelamento',
      icone: '📊',
      cor: 'purple',
    },
  ];

  const corClasses = {
    blue: 'bg-blue-50 border-l-4 border-blue-500',
    green: 'bg-green-50 border-l-4 border-green-500',
    purple: 'bg-purple-50 border-l-4 border-purple-500',
  };

  return (
    <MainLayout titulo="Relatórios">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios Analíticos</h1>
        <p className="text-gray-600">Análise e insights do sistema</p>
      </div>

      {/* Seleção de Período */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecione o Período</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Data Inicial</label>
            <input type="date" className="form-input" />
          </div>
          <div>
            <label className="form-label">Data Final</label>
            <input type="date" className="form-input" />
          </div>
          <div className="flex items-end">
            <Button variant="primary" fullWidth>
              Gerar Relatórios
            </Button>
          </div>
        </div>
      </div>

      {/* Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatorios.map((relatorio) => (
          <Link
            key={relatorio.id}
            href={`/relatorios/${relatorio.id}`}
            className={`card p-6 hover:shadow-lg transition-shadow cursor-pointer ${
              corClasses[relatorio.cor as keyof typeof corClasses]
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{relatorio.icone}</span>
              <BarChart3 className="text-gray-400" size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {relatorio.titulo}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {relatorio.descricao}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-1"
              >
                <Download size={16} />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-1"
              >
                <Download size={16} />
                Excel
              </Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Relatórios Recentes */}
      <div className="card p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatórios Recentes</h3>

        <div className="space-y-2">
          {[
            { nome: 'Relatório de Viagens - Dezembro 2024', data: '25/12/2024', tipo: 'Viagens' },
            { nome: 'Relatório de Faturamento - Dezembro 2024', data: '24/12/2024', tipo: 'Faturamento' },
            { nome: 'Relatório de Desempenho - Novembro 2024', data: '30/11/2024', tipo: 'Desempenho' },
          ].map((rel, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{rel.nome}</p>
                <p className="text-xs text-gray-500">{rel.data}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Visualizar
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RelatoriosPage;