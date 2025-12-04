/** @format */

"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Users,
  Car,
  MapPin,
  DollarSign,
  Wallet,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import dynamic from "next/dynamic";

// Componentes dinâmicos
const ViagensChart = dynamic(
  () => import("@/components/dashboard/ViagensChart"),
  {
    loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />,
  }
);

const ReceitaChart = dynamic(
  () => import("../../components/dashboard/ReceitaChart"),
  {
    loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />,
  }
);

interface Alerta {
  id: number;
  tipo: "erro" | "aviso" | "info";
  titulo: string;
  descricao: string;
  data: string;
  lido: boolean;
}

const Dashboard = () => {
  // Estado para busca
  const [searchQuery, setSearchQuery] = useState("");

  // Dados das métricas
  const metrics = {
    totalClientes: {
      valor: 1240,
      variacao: 5.2,
      icon: Users,
      cor: "bg-blue-100 text-blue-600",
      textoVariacao: "vs mês passado",
    },
    motoristasOnline: {
      valor: 87,
      total: 120,
      variacao: 2.3,
      icon: Car,
      cor: "bg-green-100 text-green-600",
      textoVariacao: "vs ontem",
    },
    viagensHoje: {
      valor: 243,
      meta: 300,
      variacao: -1.5,
      icon: MapPin,
      cor: "bg-purple-100 text-purple-600",
      textoVariacao: "vs ontem",
    },
    faturamentoDia: {
      valor: 729000,
      variacao: 4.6,
      icon: DollarSign,
      cor: "bg-yellow-100 text-yellow-600",
      textoVariacao: "vs ontem",
    },
    lucroDia: {
      valor: 218700,
      variacao: 8.7,
      icon: Wallet,
      cor: "bg-teal-100 text-teal-600",
      textoVariacao: "vs ontem",
    },
    taxaConclusao: {
      valor: 94,
      variacao: 2.1,
      icon: CheckCircle,
      cor: "bg-indigo-100 text-indigo-600",
      textoVariacao: "vs semana passada",
    },
  };

  // Dados dos motoristas
  const topMotoristas = [
    {
      id: 1,
      nome: "Miguel Costa",
      avaliacao: 4.9,
      viagens: 142,
      veiculo: "Toyota Corolla",
      status: "online",
      ultimaViagem: "25 min atrás",
    },
    {
      id: 2,
      nome: "Ana Pereira",
      avaliacao: 4.8,
      viagens: 138,
      veiculo: "Hyundai Tucson",
      status: "em_viagem",
      ultimaViagem: "Em andamento",
    },
    {
      id: 3,
      nome: "Pedro Fernandes",
      avaliacao: 4.7,
      viagens: 125,
      veiculo: "Kia Sorento",
      status: "online",
      ultimaViagem: "25 min atrás",
    },
  ];

  // Alertas e notificações
  const alertas: Alerta[] = [
    {
      id: 1,
      tipo: "erro",
      titulo: "Falha no processamento de pagamento",
      descricao: "3 transações com falha nas últimas 2 horas",
      data: "Há 30 minutos",
      lido: false,
    },
    {
      id: 2,
      tipo: "aviso",
      titulo: "Manutenção programada",
      descricao: "Atualização do sistema programada para hoje às 2h",
      data: "Hoje",
      lido: true,
    },
    {
      id: 3,
      tipo: "info",
      titulo: "Novo motorista aprovado",
      descricao: "Carlos Silva foi aprovado e está disponível para viagens",
      data: "Ontem",
      lido: true,
    },
  ];

  // Função para formatar números
  const formatarNumero = (num: number) => {
    return new Intl.NumberFormat("pt-AO").format(num);
  };

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "em_viagem":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  // Função para obter o ícone do tipo de alerta
  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case "erro":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "aviso":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Buscar por motorista, cliente..."
              />
            </div>

            <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap transition-colors">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Seção de Métricas Principais */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card de Clientes */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Total de Clientes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatarNumero(metrics.totalClientes.valor)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.totalClientes.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.totalClientes.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.totalClientes.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.totalClientes.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Motoristas Online */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <Car className="h-4 w-4 mr-2 text-green-500" />
                    Motoristas Online
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {metrics.motoristasOnline.valor}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      / {metrics.motoristasOnline.total}
                    </span>
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.motoristasOnline.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.motoristasOnline.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.motoristasOnline.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.motoristasOnline.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Viagens Hoje */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                      Viagens Hoje
                    </p>
                    {metrics.viagensHoje.meta && (
                      <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        Meta: {metrics.viagensHoje.meta}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatarNumero(metrics.viagensHoje.valor)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.viagensHoje.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.viagensHoje.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.viagensHoje.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.viagensHoje.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Faturamento do Dia */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                    Faturamento do Dia
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatarMoeda(metrics.faturamentoDia.valor)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.faturamentoDia.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.faturamentoDia.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.faturamentoDia.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.faturamentoDia.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Lucro do Dia */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-teal-500" />
                    Lucro do Dia
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatarMoeda(metrics.lucroDia.valor)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.lucroDia.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.lucroDia.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.lucroDia.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.lucroDia.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Taxa de Conclusão */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-indigo-500" />
                    Taxa de Conclusão
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {metrics.taxaConclusao.valor}%
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${metrics.taxaConclusao.variacao >= 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full"}`}>
                      {metrics.taxaConclusao.variacao >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(metrics.taxaConclusao.variacao)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {metrics.taxaConclusao.textoVariacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Gráficos e Análises */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Viagens por Hora */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="h-80">
                <ViagensChart />
              </div>
            </div>

            {/* Gráfico de Receita */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Receita
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Análise de faturamento
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Receita
                  </button>
                  <button className="px-3 py-1 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100">
                    Lucro
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ReceitaChart />
              </div>
            </div>
          </div>

          {/* Atividades Recentes e Alertas */}
          <div className="space-y-6">
            {/* Card de Alertas */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Alertas e Notificações
                </h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                  Ver todos
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {alertas.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alerta.tipo === "erro"
                        ? "border-red-500 bg-red-50"
                        : alerta.tipo === "aviso"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-blue-500 bg-blue-50"
                    }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {getAlertaIcon(alerta.tipo)}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {alerta.titulo}
                        </h4>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {alerta.descricao}
                        </p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {alerta.data}
                        </div>
                      </div>
                      {!alerta.lido && (
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Novo
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Motoristas */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Motoristas
                </h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                  Ver ranking
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {topMotoristas.map((motorista) => (
                  <div
                    key={motorista.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                          {motorista.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(motorista.status)}`}></span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {motorista.nome}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{motorista.veiculo}</span>
                          <span className="mx-1">•</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-0.5" />
                            {motorista.avaliacao.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {motorista.viagens} viagens
                      </p>
                      <div className="flex items-center justify-end text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {motorista.ultimaViagem}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas e Análises */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
              Ver relatório completo
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Card de Desempenho Mensal */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Desempenho do Mês
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Progresso em relação às metas
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Dez/2025
                  </span>
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  /* Atualizado para português */
                  {
                    label: "Meta de Viagens",
                    valor: "1.250",
                    progresso: 75,
                    cor: "bg-blue-500",
                    icone: <MapPin className="h-4 w-4 text-blue-500" />,
                    texto: "Em dia com a meta",
                  },
                  {
                    label: "Faturamento",
                    valor: formatarMoeda(2150000),
                    progresso: 62,
                    cor: "bg-green-500",
                    icone: <DollarSign className="h-4 w-4 text-green-500" />,
                    texto: "Abaixo da meta",
                  },
                  {
                    label: "Novos Clientes",
                    valor: "48",
                    progresso: 80,
                    cor: "bg-purple-500",
                    icone: <Users className="h-4 w-4 text-purple-500" />,
                    texto: "Acima da média",
                  },
                  {
                    label: "Avaliação Média",
                    valor: "4,8",
                    progresso: 96,
                    cor: "bg-yellow-500",
                    icone: <Star className="h-4 w-4 text-yellow-500" />,
                    texto: "Excelente",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-1 rounded-md ${item.cor.replace("bg-", "bg-").replace("500", "100")}`}>
                          {item.icone}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.valor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{item.texto}</span>
                      <span>{item.progresso}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full ${item.cor}`}
                        style={{ width: `${item.progresso}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card de Estatísticas de Viagem */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Estatísticas de Viagem
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Análise de desempenho
                  </p>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Viagens Concluídas
                      </p>
                      <p className="text-2xl font-bold text-blue-900 mt-1">
                        1,248
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          ↑ 12.5%
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          vs mês passado
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                      Média Diária
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">42</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-green-600">
                        ↑ 5.2%
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                      Tempo Médio
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      18 min
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-red-600">
                        ↓ 1.8%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Taxa de Cancelamento
                    </p>
                    <p className="text-sm font-semibold text-gray-900">4.2%</p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: "4.2%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Meta: &lt;5% (dentro da meta)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
