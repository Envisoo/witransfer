/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFetch } from "@/hooks/useFetch";
import { formatarMoeda } from "@/lib/formatters";

const Relatoriofaturamento = () => {
  const [dataInicio, setDataInicio] = useState("2024-01-01");
  const [dataFim, setDataFim] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { dados, carregando, erro } = useFetch(
    `/relatorios/faturamento?dataInicio=${dataInicio}&dataFim=${dataFim}`,
    { autoFetch: true }
  );

  return (
    <MainLayout titulo="Relatório de Faturamento">
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
            <div className="card p-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">
                {formatarMoeda(dados.receita)}
              </p>
            </div>
            <div className="card p-6 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">Pagamentos</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatarMoeda(dados.pagamentos)}
              </p>
            </div>
            <div className="card p-6 border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 mb-1">Taxas</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatarMoeda(dados.taxas)}
              </p>
            </div>
            <div className="card p-6 border-l-4 border-red-500">
              <p className="text-sm text-gray-600 mb-1">Lucro Líquido</p>
              <p className="text-2xl font-bold text-red-600">
                {formatarMoeda(dados.lucroLiquido)}
              </p>
            </div>
          </div>

          {/* Tabela Motoristas */}
          <div className="card overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Faturamento por Motorista
              </h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Motorista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Receita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Comissão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Lucro
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
                      {formatarMoeda(motorista.receita)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatarMoeda(motorista.comissao)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                      {formatarMoeda(motorista.lucro)}
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

export default Relatoriofaturamento;
