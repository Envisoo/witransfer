/** @format */

"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const RelatoriosPage = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes");

  const relatorios = [
    {
      id: "viagens",
      titulo: "Relatório de Viagens",
      descricao:
        "Análise completa de viagens realizadas por motorista, cliente e período",
      icon: FileText,
      cor: "from-blue-500 to-blue-600",
      corBadge: "bg-blue-100 text-blue-700",
      total: "1,247",
      label: "viagens este mês",
    },
    {
      id: "faturamento",
      titulo: "Relatório de Faturamento",
      descricao: "Receita, pagamentos e lucro por período e motorista",
      icon: DollarSign,
      cor: "from-green-500 to-green-600",
      corBadge: "bg-green-100 text-green-700",
      total: "AOA 2.8M",
      label: "faturamento total",
    },
    {
      id: "desempenho",
      titulo: "Relatório de Desempenho",
      descricao:
        "Ranking de motoristas, clientes frequentes e taxa de cancelamento",
      icon: TrendingUp,
      cor: "from-purple-500 to-purple-600",
      corBadge: "bg-purple-100 text-purple-700",
      total: "4.8",
      label: "avaliação média",
    },
  ];

  const relatoriosRecentes = [
    {
      nome: "Relatório de Viagens - Novembro 2024",
      data: "30/11/2024",
      tipo: "Viagens",
      tamanho: "2.4 MB",
      visualizacoes: 24,
    },
    {
      nome: "Relatório de Faturamento - Novembro 2024",
      data: "30/11/2024",
      tipo: "Faturamento",
      tamanho: "1.8 MB",
      visualizacoes: 18,
    },
    {
      nome: "Relatório de Desempenho - Outubro 2024",
      data: "31/10/2024",
      tipo: "Desempenho",
      tamanho: "3.1 MB",
      visualizacoes: 32,
    },
    {
      nome: "Relatório de Viagens - Outubro 2024",
      data: "31/10/2024",
      tipo: "Viagens",
      tamanho: "2.2 MB",
      visualizacoes: 15,
    },
  ];

  // Dados para o gráfico de distribuição
  const distribuicaoData = [
    { name: "Viagens Completadas", value: 1147, color: "#14b8a6" },
    { name: "Canceladas", value: 78, color: "#ef4444" },
    { name: "Em Andamento", value: 22, color: "#f59e0b" },
  ];

  const resumoMensal = [
    { mes: "Jul", total: 982 },
    { mes: "Ago", total: 1056 },
    { mes: "Set", total: 1134 },
    { mes: "Out", total: 1201 },
    { mes: "Nov", total: 1247 },
    { mes: "Dez", total: 856 }, // Parcial
  ];

  return (
    <MainLayout titulo="Relatórios">
      {/* Filtro de Período Global */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="text-teal-600" size={20} />
            Período de Análise
          </h3>
          <div className="flex gap-2">
            {["semana", "mes", "trimestre", "ano"].map((periodo) => (
              <button
                key={periodo}
                onClick={() => setPeriodoSelecionado(periodo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  periodoSelecionado === periodo
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Resumo Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
            <p className="text-sm text-teal-700 font-medium mb-1">
              Total de Relatórios
            </p>
            <p className="text-3xl font-bold text-teal-900">126</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium mb-1">
              Visualizações
            </p>
            <p className="text-3xl font-bold text-blue-900">1,847</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-purple-700 font-medium mb-1">
              Downloads
            </p>
            <p className="text-3xl font-bold text-purple-900">432</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
            <p className="text-sm text-amber-700 font-medium mb-1">
              Último Gerado
            </p>
            <p className="text-lg font-bold text-amber-900">Há 2 horas</p>
          </div>
        </div>
      </div>

      {/* Cards de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {relatorios.map((relatorio) => {
          const Icon = relatorio.icon;
          return (
            <Link
              key={relatorio.id}
              href={`/relatorios/${relatorio.id}`}
              className="group">
              <div
                className={`bg-gradient-to-br ${relatorio.cor} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer`}>
                <div className="flex items-start justify-between mb-4">
                  <Icon size={40} className="opacity-90" />
                  <BarChart3 className="opacity-60" size={24} />
                </div>

                <h3 className="text-xl font-bold mb-2">{relatorio.titulo}</h3>

                <p className="text-sm opacity-90 mb-4 line-clamp-2">
                  {relatorio.descricao}
                </p>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                  <p className="text-2xl font-bold">{relatorio.total}</p>
                  <p className="text-xs opacity-90">{relatorio.label}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Download PDF iniciado");
                    }}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-3 text-sm font-medium transition-all flex items-center justify-center gap-1">
                    <Download size={16} />
                    PDF
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Download Excel iniciado");
                    }}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-3 text-sm font-medium transition-all flex items-center justify-center gap-1">
                    <Download size={16} />
                    Excel
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Gráfico de Distribuição */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distribuição de Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="text-teal-600" size={20} />
            Distribuição de Viagens
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distribuicaoData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value">
                {distribuicaoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução Mensal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={20} />
            Evolução Mensal
          </h3>
          <div className="space-y-3">
            {resumoMensal.map((item) => {
              const maxValue = Math.max(...resumoMensal.map((r) => r.total));
              const percentage = (item.total / maxValue) * 100;
              return (
                <div key={item.mes}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {item.mes}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Relatórios Recentes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="text-teal-600" size={20} />
            Relatórios Gerados Recentemente
          </h3>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Nome do Relatório
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tipo
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Data
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tamanho
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Visualizações
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {relatoriosRecentes.map((rel, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="text-gray-400" size={18} />
                      <span className="font-medium text-gray-900 text-sm">
                        {rel.nome}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        rel.tipo === "Viagens"
                          ? "bg-blue-100 text-blue-700"
                          : rel.tipo === "Faturamento"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                      }`}>
                      {rel.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {rel.data}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {rel.tamanho}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Eye size={14} />
                      {rel.visualizacoes}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                        Visualizar
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default RelatoriosPage;
