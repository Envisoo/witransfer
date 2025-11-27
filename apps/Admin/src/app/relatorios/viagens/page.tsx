/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFetch } from "@/hooks/useFetch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RelatorioViagens = () => {
  const [dataInicio, setDataInicio] = useState("2024-01-01");
  const [dataFim, setDataFim] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { dados, carregando, erro } = useFetch(
    `/relatorios/viagens?dataInicio=${dataInicio}&dataFim=${dataFim}`,
    { autoFetch: true }
  );

  const motoristasData =
    dados?.porMotorista?.slice(0, 5).map((m: any) => ({
      name: m.motoristaNome,
      viagens: m.numeroViagens,
      avaliacao: m.avaliacaoMedia,
    })) || [];

  return (
    <MainLayout titulo="Relatório de Viagens">
      <div className="mb-6">
        <Link
          href="/relatorios"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
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
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-1">Total de Viagens</p>
              <p className="text-3xl font-bold text-gray-900">{dados.total}</p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-1">Distância Total</p>
              <p className="text-3xl font-bold text-gray-900">
                {dados.distanciaTotal.toFixed(0)} km
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-1">Tempo Médio</p>
              <p className="text-3xl font-bold text-gray-900">
                {dados.tempoMedio} min
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-1">Período</p>
              <p className="text-lg font-semibold text-gray-900">
                {dataInicio} a {dataFim}
              </p>
            </div>
          </div>

          {/* Gráficos */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top 5 Motoristas
            </h3>
            {motoristasData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={motoristasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="viagens" fill="#06b6d4" name="Viagens" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-600">
                Sem dados para este período
              </p>
            )}
          </div>

          {/* Tabela Motoristas */}
          <div className="card overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Desempenho por Motorista
              </h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Motorista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Viagens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Avaliação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.porMotorista?.map((motorista: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {motorista.motoristaNome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {motorista.numeroViagens}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {motorista.avaliacaoMedia?.toFixed(1)} ⭐
                    </td>
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

export default RelatorioViagens;
