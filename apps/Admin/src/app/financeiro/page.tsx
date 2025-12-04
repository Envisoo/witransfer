/** @format */

"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { formatarMoeda } from "@/lib/formatters";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data - Dados estáticos
const dashboardData = {
  receita: 67000,
  pagamentos: 55000,
  taxas: 2000,
  despesas: 3500,
  lucroLiquido: 6500,
  percentualVariacao: 8.5,
};

const evoluacaoData = [
  { mes: "Jan", receita: 45000, pagamentos: 38000, lucro: 7000 },
  { mes: "Fev", receita: 52000, pagamentos: 43000, lucro: 9000 },
  { mes: "Mar", receita: 48000, pagamentos: 40000, lucro: 8000 },
  { mes: "Abr", receita: 61000, pagamentos: 50000, lucro: 11000 },
  { mes: "Mai", receita: 55000, pagamentos: 45000, lucro: 10000 },
  { mes: "Jun", receita: 67000, pagamentos: 55000, lucro: 12000 },
];

interface Pagamento {
  id: number;
  data: string;
  motorista: string;
  motoristaId: number;
  viagens: number;
  valor: number;
  status: "pago" | "pendente" | "processando";
}

const pagamentosMock: Pagamento[] = [
  {
    id: 1,
    data: "2024-06-25",
    motorista: "João Santos",
    motoristaId: 1,
    viagens: 45,
    valor: 12500,
    status: "pago",
  },
  {
    id: 2,
    data: "2024-06-24",
    motorista: "Ana Oliveira",
    motoristaId: 2,
    viagens: 38,
    valor: 10200,
    status: "pago",
  },
  {
    id: 3,
    data: "2024-06-23",
    motorista: "Carlos Silva",
    motoristaId: 3,
    viagens: 42,
    valor: 11800,
    status: "processando",
  },
  {
    id: 4,
    data: "2024-06-22",
    motorista: "Maria Costa",
    motoristaId: 4,
    viagens: 35,
    valor: 9500,
    status: "pendente",
  },
  {
    id: 5,
    data: "2024-06-21",
    motorista: "Pedro Alves",
    motoristaId: 5,
    viagens: 40,
    valor: 11000,
    status: "pago",
  },
  {
    id: 6,
    data: "2024-06-20",
    motorista: "Sofia Martins",
    motoristaId: 6,
    viagens: 33,
    valor: 8900,
    status: "pendente",
  },
  {
    id: 7,
    data: "2024-06-19",
    motorista: "Rui Pereira",
    motoristaId: 7,
    viagens: 47,
    valor: 13200,
    status: "pago",
  },
  {
    id: 8,
    data: "2024-06-18",
    motorista: "Isabel Rocha",
    motoristaId: 8,
    viagens: 36,
    valor: 9800,
    status: "processando",
  },
];

const Financeiro = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(pagamentosMock);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("mes");

  // Filtrar pagamentos
  const pagamentosFiltrados = pagamentos.filter((p) => {
    if (filtroStatus !== "todos" && p.status !== filtroStatus) return false;
    return true;
  });

  // Marcar como pago
  const marcarComoPago = (id: number) => {
    setPagamentos(
      pagamentos.map((p) =>
        p.id === id ? { ...p, status: "pago" as const } : p
      )
    );
  };

  // Gerar comprovante
  const gerarComprovante = (pagamento: Pagamento) => {
    // Simulação de geração de comprovante
    const comprovante = `
COMPROVANTE DE PAGAMENTO
------------------------
ID: ${pagamento.id}
Data: ${new Date(pagamento.data).toLocaleDateString("pt-PT")}
Motorista: ${pagamento.motorista}
Número de Viagens: ${pagamento.viagens}
Valor: ${formatarMoeda(pagamento.valor)}
Status: ${pagamento.status.toUpperCase()}
------------------------
Witransfer - Sistema de Gestão
    `;

    // Criar blob e fazer download
    const blob = new Blob([comprovante], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprovante_${pagamento.id}_${pagamento.motorista.replace(" ", "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="text-green-600" size={18} />;
      case "processando":
        return <Clock className="text-amber-600" size={18} />;
      case "pendente":
        return <AlertCircle className="text-red-600" size={18} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pago: "bg-green-100 text-green-700",
      processando: "bg-amber-100 text-amber-700",
      pendente: "bg-red-100 text-red-700",
    };

    const labels = {
      pago: "Pago",
      processando: "Processando",
      pendente: "Pendente",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {getStatusIcon(status)}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <MainLayout titulo="Controlo Financeiro">
      {/* Header */}

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Receita Total */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} className="opacity-80" />
            <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-medium">
              +{dashboardData.percentualVariacao}%
            </div>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Receita Total</p>
          <p className="text-3xl font-bold">
            {formatarMoeda(dashboardData.receita)}
          </p>
          <p className="text-xs opacity-75 mt-2">Este mês</p>
        </div>

        {/* Pagamentos */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <Wallet size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Pagamentos</p>
          <p className="text-3xl font-bold">
            {formatarMoeda(dashboardData.pagamentos)}
          </p>
          <p className="text-xs opacity-75 mt-2">Aos motoristas</p>
        </div>

        {/* Taxas */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Taxas</p>
          <p className="text-3xl font-bold">
            {formatarMoeda(dashboardData.taxas)}
          </p>
          <p className="text-xs opacity-75 mt-2">Impostos e taxas</p>
        </div>

        {/* Despesas */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Despesas</p>
          <p className="text-3xl font-bold">
            {formatarMoeda(dashboardData.despesas)}
          </p>
          <p className="text-xs opacity-75 mt-2">Operacionais</p>
        </div>

        {/* Lucro Líquido */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={32} className="opacity-80" />
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Lucro Líquido</p>
          <p className="text-3xl font-bold">
            {formatarMoeda(dashboardData.lucroLiquido)}
          </p>
          <p className="text-xs opacity-75 mt-2">
            Margem:{" "}
            {(
              (dashboardData.lucroLiquido / dashboardData.receita) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Gráficos de Evolução */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Evolução de Receita */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={20} />
            Evolução de Receita
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evoluacaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => formatarMoeda(value as number)}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="#14b8a6"
                strokeWidth={3}
                name="Receita"
                dot={{ fill: "#14b8a6", r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="lucro"
                stroke="#10b981"
                strokeWidth={3}
                name="Lucro"
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comparativo Mensal */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="text-blue-600" size={20} />
            Comparativo Mensal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evoluacaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => formatarMoeda(value as number)}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
              <Bar
                dataKey="receita"
                fill="#3b82f6"
                name="Receita"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="pagamentos"
                fill="#8b5cf6"
                name="Pagamentos"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="lucro"
                fill="#14b8a6"
                name="Lucro"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Relatório de Pagamentos */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Wallet className="text-teal-600" size={24} />
            Relatório de Pagamentos
          </h3>
          <div className="flex gap-3">
            {/* Filtro por Período */}
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="trimestre">Este Trimestre</option>
              <option value="ano">Este Ano</option>
            </select>

            {/* Filtro por Status */}
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="todos">Todos os Status</option>
              <option value="pago">Pago</option>
              <option value="processando">Processando</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
        </div>

        {/* Tabela de Pagamentos */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Data
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Motorista
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Viagens
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Valor
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pagamentosFiltrados.map((pagamento) => (
                <tr
                  key={pagamento.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600">
                    #{pagamento.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {new Date(pagamento.data).toLocaleDateString("pt-PT")}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
                        {pagamento.motorista.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {pagamento.motorista}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                    {pagamento.viagens}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                    {formatarMoeda(pagamento.valor)}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(pagamento.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {pagamento.status !== "pago" && (
                        <button
                          onClick={() => marcarComoPago(pagamento.id)}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                          <CheckCircle size={14} />
                          Marcar Pago
                        </button>
                      )}
                      <button
                        onClick={() => gerarComprovante(pagamento)}
                        className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1">
                        <Download size={14} />
                        Comprovante
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumo da Tabela */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total de Pagamentos</p>
              <p className="text-2xl font-bold text-gray-900">
                {pagamentosFiltrados.length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Pagos</p>
              <p className="text-2xl font-bold text-green-700">
                {pagamentosFiltrados.filter((p) => p.status === "pago").length}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Processando</p>
              <p className="text-2xl font-bold text-amber-700">
                {
                  pagamentosFiltrados.filter((p) => p.status === "processando")
                    .length
                }
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Pendentes</p>
              <p className="text-2xl font-bold text-red-700">
                {
                  pagamentosFiltrados.filter((p) => p.status === "pendente")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Financeiro;
