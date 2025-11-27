'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Badge from '@/components/common/Badge';
import { useFetch } from '@/hooks/useFetch';

const RelatorioDesempenho = () => {
  const [dataInicio, setDataInicio] = useState('2024-01-01');
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);

  const { dados, carregando, erro } = useFetch(
    `/relatorios/desempenho?dataInicio=${dataInicio}&dataFim=${dataFim}`,
    { autoFetch: true }
  );

  return (
    <MainLayout titulo="Relatório de Desempenho">
      <div className="mb-6">
        <Link href="/relatorios" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Relatórios
        </Link>
      </div>

      {/* Filtros */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
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
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {carregando ? (
        <LoadingSpinner />
      ) : erro ? (
        <div className="card p-6 text-center text-red-600">
          <p>{erro}</p>
        </div>
      ) : dados ? (
        <>
          {/* Indicadores Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card p-6 bg-red-50 border-l-4 border-red-500">
              <p className="text-sm text-red-600 mb-1">Taxa de Cancelamento</p>
              <p className="text-3xl font-bold text-red-700">{(dados.taxaCancelamento * 100).toFixed(1)}%</p>
            </div>
            <div className="card p-6 bg-green-50 border-l-4 border-green-500">
              <p className="text-sm text-green-600 mb-1">Satisfação Geral</p>
              <p className="text-3xl font-bold text-green-700">{(dados.satisfacao * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Top Motoristas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Mais Viagens */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">Motoristas com Mais Viagens</h3>
              </div>
              <div className="space-y-3">
                {dados.motoristas?.maisViagens?.slice(0, 5).map((m: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {idx === 0 && <Trophy className="text-yellow-500" size={20} />}
                      {idx === 1 && <Trophy className="text-gray-400" size={20} />}
                      {idx === 2 && <Trophy className="text-orange-600" size={20} />}
                      <span className="font-medium text-gray-900">{m.motoristaNome}</span>
                    </div>
                    <Badge>{m.numeroViagens} viagens</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Melhor Avaliados */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-600" size={20} />
                <h3 className="font-semibold text-gray-900">Motoristas Melhor Avaliados</h3>
              </div>
              <div className="space-y-3">
                {dados.motoristas?.melhorAvaliados?.slice(0, 5).map((m: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{m.motoristaNome}</span>
                    <Badge>{m.avaliacao.toFixed(1)} ⭐</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clientes Frequentes */}
          <div className="card p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Clientes Mais Frequentes</h3>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Viagens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.clientes?.maisFrequentes?.slice(0, 10).map((cliente: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cliente.clienteNome}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cliente.numeroViagens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Exportar */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} />
              Exportar PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} />
              Exportar Excel
            </Button>
          </div>
        </>
      ) : null}
    </MainLayout>
  );
};

export default RelatorioDesempenho;