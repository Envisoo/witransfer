/** @format */

"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const RelatoriosPage = () => {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mesAtual, setMesAtual] = useState(new Date());
  const [atualizandoDados, setAtualizandoDados] = useState(false);

  // Formatar data selecionada
  const formatarDataCompleta = (data: Date) => {
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    return {
      diaSemana: dias[data.getDay()],
      dia: data.getDate(),
      mes: meses[data.getMonth()],
      ano: data.getFullYear()
    };
  };

  const dataFormatada = formatarDataCompleta(dataSelecionada);

  // Dados do calendário
  const getDiasNoMes = (data: Date) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    
    const dias = [];
    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null);
    }
    // Dias do mês
    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(new Date(ano, mes, dia));
    }
    return dias;
  };

  const mesAnterior = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1));
  };

  const mesSeguinte = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1));
  };

  const selecionarData = (data: Date) => {
    setAtualizandoDados(true);
    setTimeout(() => {
      setDataSelecionada(data);
      setMostrarCalendario(false);
      setTimeout(() => setAtualizandoDados(false), 100);
    }, 150);
  };

  // Função para gerar dados baseados na data (seed)
  const gerarDadosPorData = (data: Date) => {
    const seed = data.getDate() + data.getMonth() * 31 + data.getFullYear() * 365;
    
    // Gerador pseudo-aleatório com seed
    const random = (min: number, max: number, offset: number =  0) => {
      const x = Math.sin(seed + offset) * 10000;
      return Math.floor(min + (x - Math.floor(x)) * (max - min));
    };

    const totalViagens = random(800, 1400, 1);
    const completadas = Math.floor(totalViagens * random(85, 95, 2) / 100);
    const canceladas = Math.floor(totalViagens * random(3, 8, 3) / 100);
    const emAndamento = totalViagens - completadas - canceladas;

    const faturamento = random(1800000, 3200000, 4);
    const avaliacao = (random(42, 50, 5) / 10).toFixed(1);
    const variacaoViagens = random(-5, 20, 6);
    const variacaoFaturamento = random(-3, 15, 7);
    const variacaoAvaliacao = random(-2, 5, 8);

    return {
      totalViagens,
      completadas,
      canceladas,
      emAndamento,
      faturamento,
      avaliacao,
      variacaoViagens,
      variacaoFaturamento,
      variacaoAvaliacao,
      viagensPorHora: [
        { hora: "00h", viagens: random(5, 20, 10) },
        { hora: "04h", viagens: random(3, 15, 11) },
        { hora: "08h", viagens: random(30, 60, 12) },
        { hora: "12h", viagens: random(50, 80, 13) },
        { hora: "16h", viagens: random(40, 70, 14) },
        { hora: "20h", viagens: random(25, 50, 15) },
      ],
      topMotoristas: Array.from({ length: 5 }, (_, i) => ({
        nome: ["Pedro Costa", "Lucas Pereira", "Ana Oliveira", "Carlos Silva", "Maria Santos"][i],
        viagens: random(25, 50, 20 + i) - i * 3,
        receita: random(100000, 200000, 30 + i) - i * 10000,
      })),
    };
  };

  const dadosDoDia = gerarDadosPorData(dataSelecionada);

  // Dados dinâmicos baseados na data selecionada
  const relatorios = [
    {
      id: "viagens",
      titulo: "Viagens",
      icon: FileText,
      total: dadosDoDia.totalViagens.toLocaleString(),
      label: "viagens",
      variacao: `${dadosDoDia.variacaoViagens >= 0 ? '+' : ''}${dadosDoDia.variacaoViagens.toFixed(1)}%`,
      positivo: dadosDoDia.variacaoViagens >= 0,
    },
    {
      id: "faturamento",
      titulo: "Faturamento",
      icon: DollarSign,
      total: `AOA ${(dadosDoDia.faturamento / 1000000).toFixed(1)}M`,
      label: "receita total",
      variacao: `${dadosDoDia.variacaoFaturamento >= 0 ? '+' : ''}${dadosDoDia.variacaoFaturamento.toFixed(1)}%`,
      positivo: dadosDoDia.variacaoFaturamento >= 0,
    },
    {
      id: "desempenho",
      titulo: "Avaliação Média",
      icon: TrendingUp,
      total: dadosDoDia.avaliacao,
      label: "de 5.0",
      variacao: `${dadosDoDia.variacaoAvaliacao >= 0 ? '+' : ''}${dadosDoDia.variacaoAvaliacao.toFixed(1)}%`,
      positivo: dadosDoDia.variacaoAvaliacao >= 0,
    },
  ];

  // Dados para gráficos
  const distribuicaoData = [
    { name: "Completadas", value: dadosDoDia.completadas, color: "#3b82f6" },
    { name: "Canceladas", value: dadosDoDia.canceladas, color: "#ef4444" },
    { name: "Em Andamento", value: dadosDoDia.emAndamento, color: "#f59e0b" },
  ];

  const viagensPorHora = dadosDoDia.viagensPorHora;

  const topMotoristas = dadosDoDia.topMotoristas;

  return (
    <MainLayout titulo="Relatórios">
      {/* Cabeçalho com Filtro de Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Relatório do dia {dataFormatada.dia} de {dataFormatada.mes} de {dataFormatada.ano}
            </h2>
            <p className="text-sm text-gray-500">{dataFormatada.diaSemana}</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setMostrarCalendario(!mostrarCalendario)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Calendar size={20} />
              <span className="font-medium">Selecionar Data</span>
            </button>

            {/* Calendário Dropdown */}
            {mostrarCalendario && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-80">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={mesAnterior}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h3 className="font-semibold text-gray-900">
                    {formatarDataCompleta(mesAtual).mes} {mesAtual.getFullYear()}
                  </h3>
                  <button
                    onClick={mesSeguinte}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
                    <div key={dia} className="text-center text-xs font-semibold text-gray-500 py-2">
                      {dia}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDiasNoMes(mesAtual).map((dia, index) => {
                    if (!dia) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const isSelected =
                      dia.getDate() === dataSelecionada.getDate() &&
                      dia.getMonth() === dataSelecionada.getMonth() &&
                      dia.getFullYear() === dataSelecionada.getFullYear();

                    const isToday =
                      dia.getDate() === new Date().getDate() &&
                      dia.getMonth() === new Date().getMonth() &&
                      dia.getFullYear() === new Date().getFullYear();

                    return (
                      <button
                        key={index}
                        onClick={() => selecionarData(dia)}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : isToday
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {dia.getDate()}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setMostrarCalendario(false)}
                  className="w-full mt-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cards de Estatísticas Resumidas */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 transition-opacity duration-300 ${atualizandoDados ? 'opacity-50' : 'opacity-100'}`}>
          {relatorios.map((rel) => {
            const Icon = rel.icon;
            return (
              <div
                key={rel.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon size={20} className="text-gray-600" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      rel.positivo
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {rel.variacao}
                  </span>
                </div>
                <h3 className="text-sm text-gray-500 font-medium mb-1">{rel.titulo}</h3>
                <p className="text-2xl font-bold text-gray-900">{rel.total}</p>
                <p className="text-xs text-gray-400 mt-1">{rel.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráficos */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-opacity duration-300 ${atualizandoDados ? 'opacity-50' : 'opacity-100'}`}>
        {/* Distribuição de Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Distribuição de Viagens</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              Ver Detalhes
            </button>
          </div>
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
                dataKey="value"
              >
                {distribuicaoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {distribuicaoData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
                <p className="font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Viagens por Hora */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Viagens por Hora</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              Exportar
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={viagensPorHora}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="hora"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="viagens" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Motoristas */}
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-opacity duration-300 ${atualizandoDados ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Top Motoristas do Dia</h3>
          <Link
            href="/motoristas"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Ver Todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Motorista
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Viagens
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Receita
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topMotoristas.map((motorista, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="font-bold text-blue-600 text-sm">{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{motorista.nome}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{motorista.viagens}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      }).format(motorista.receita)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Ver Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Links para Relatórios Detalhados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/relatorios/viagens"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <FileText className="text-blue-600" size={24} />
            </div>
            <BarChart3 className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Relatório Completo de Viagens</h3>
          <p className="text-sm text-gray-500 mb-4">
            Análise detalhada de todas as viagens realizadas
          </p>
          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            Ver Relatório
            <Download size={16} />
          </div>
        </Link>

        <Link
          href="/relatorios/faturamento"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <BarChart3 className="text-gray-300 group-hover:text-green-600 transition-colors" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Relatório de Faturamento</h3>
          <p className="text-sm text-gray-500 mb-4">
            Receitas, pagamentos e análise financeira
          </p>
          <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
            Ver Relatório
            <Download size={16} />
          </div>
        </Link>

        <Link
          href="/relatorios/desempenho"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <BarChart3 className="text-gray-300 group-hover:text-purple-600 transition-colors" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Relatório de Desempenho</h3>
          <p className="text-sm text-gray-500 mb-4">
            Rankings, avaliações e métricas de qualidade
          </p>
          <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
            Ver Relatório
            <Download size={16} />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default RelatoriosPage;
