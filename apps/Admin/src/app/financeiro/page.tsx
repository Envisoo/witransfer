/** @format */
"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,

  Wallet,
  Download,

  AlertCircle,
  Filter,
  Search,
  FileText,
  CreditCard,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Calendar
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { formatarMoeda } from "@/lib/formatters";
import {
  
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
 
  ResponsiveContainer,
  
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";

// --- DADOS MOCKADOS E TIPOS ---

interface Transacao {
  id: string;
  data: string;
  descricao: string;
  categoria: string;
  tipo: "receita" | "despesa";
  valor: number;
  status: "concluido" | "pendente" | "processando" | "cancelado";
  metodo?: string;
}

const mockTransacoes: Transacao[] = [
  { id: "TRX-9821", data: "2024-06-25", descricao: "Pagamento Viagem #v123", categoria: "Viagem", tipo: "receita", valor: 5000, status: "concluido", metodo: "Cartão" },
  { id: "TRX-9822", data: "2024-06-25", descricao: "Manutenção Viatura #car1", categoria: "Manutenção", tipo: "despesa", valor: 15000, status: "concluido", metodo: "Transferência" },
  { id: "TRX-9823", data: "2024-06-25", descricao: "Pagamento Viagem #v124", categoria: "Viagem", tipo: "receita", valor: 3500, status: "concluido", metodo: "Dinheiro" },
  { id: "TRX-9824", data: "2024-06-24", descricao: "Comissão Motorista João", categoria: "Comissão", tipo: "despesa", valor: 4500, status: "pendente", metodo: "Carteira" },
  { id: "TRX-9825", data: "2024-06-24", descricao: "Pagamento Viagem #v125", categoria: "Viagem", tipo: "receita", valor: 8200, status: "processando", metodo: "Cartão" },
  { id: "TRX-9826", data: "2024-06-23", descricao: "Gasolina Frota", categoria: "Combustível", tipo: "despesa", valor: 25000, status: "concluido", metodo: "Corporativo" },
  { id: "TRX-9827", data: "2024-06-23", descricao: "Taxa Licença", categoria: "Taxas", tipo: "despesa", valor: 5000, status: "concluido", metodo: "Transferência" },
];

const dataFluxoCaixa = [
  { name: "Seg", entradas: 150000, saidas: 80000 },
  { name: "Ter", entradas: 230000, saidas: 120000 },
  { name: "Qua", entradas: 180000, saidas: 90000 },
  { name: "Qui", entradas: 320000, saidas: 150000 },
  { name: "Sex", entradas: 290000, saidas: 110000 },
  { name: "Sáb", entradas: 450000, saidas: 200000 },
  { name: "Dom", entradas: 380000, saidas: 130000 },
];

const dataComposicaoDespesas = [
  { name: "Comissões", value: 450000, color: "#3b82f6" },
  { name: "Manutenção", value: 120000, color: "#ef4444" },
  { name: "Combustível", value: 80000, color: "#f59e0b" },
  { name: "Taxas", value: 30000, color: "#8b5cf6" },
  { name: "Outros", value: 20000, color: "#6b7280" },
];

const dashboardData = {
  saldoTotal: 3450000,
  receitaMensal: 1250000,
  despesasMensal: 450000,
  pendenteRecebimento: 120000,
  pendentePagamento: 50000,
};

// --- COMPONENTES ---

const CardKPI = ({ title, value, subtext, icon: Icon, trend, trendValue, colorClass }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-4 opacity-10 ${colorClass}`}>
      <Icon size={64} />
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass} bg-current`}>
        <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
      {trend && (
        <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {trendValue}
        </span>
      )}
    </div>
    <div className="relative z-10">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  </div>
);

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState<"visao-geral" | "transacoes" | "relatorios">("visao-geral");

  return (
    <MainLayout titulo="Gestão Financeira">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visão Financeira</h1>
          <p className="text-gray-500 text-sm">Acompanhe a saúde financeira da sua operação em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
               <Calendar size={16} />
               <span>Este Mês</span>
               <ChevronDown size={14} />
             </button>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={16} /> Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: "visao-geral", label: "Visão Geral", icon: BarChartIcon },
            { id: "transacoes", label: "Transações", icon: FileText },
            { id: "relatorios", label: "Analíticos", icon: PieChartIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* CONTENT: VISÃO GERAL */}
      {activeTab === "visao-geral" && (
        <div className="animate-fade-in space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardKPI 
              title="Saldo Total" 
              value={formatarMoeda(dashboardData.saldoTotal)} 
              subtext="Disponível em conta"
              icon={Wallet}
              colorClass="text-blue-600"
            />
            <CardKPI 
              title="Receita Mensal" 
              value={formatarMoeda(dashboardData.receitaMensal)} 
              subtext="Vs. mês anterior"
              trend="up"
              trendValue="12.5%"
              icon={TrendingUp}
              colorClass="text-green-600"
            />
            <CardKPI 
              title="Despesas Mensal" 
              value={formatarMoeda(dashboardData.despesasMensal)} 
              subtext="Vs. mês anterior"
              trend="down"
              trendValue="2.1%"
              icon={TrendingDown}
              colorClass="text-red-600"
            />
            <CardKPI 
              title="A Receber" 
              value={formatarMoeda(dashboardData.pendenteRecebimento)} 
              subtext="Pendências de clientes"
              icon={AlertCircle}
              colorClass="text-amber-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fluxo de Caixa (Chart) */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-lg">Fluxo de Caixa Semanal</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Entradas
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span> Saídas
                  </span>
                </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataFluxoCaixa}>
                    <defs>
                      <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} tickFormatter={(val) => `${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      formatter={(val: number) => formatarMoeda(val)}
                    />
                    <Area type="monotone" dataKey="entradas" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEntradas)" name="Entradas" />
                    <Area type="monotone" dataKey="saidas" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorSaidas)" name="Saídas" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Composição de Despesas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Distribuição de Gastos</h3>
              <div className="h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataComposicaoDespesas}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataComposicaoDespesas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: number) => formatarMoeda(val)} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-gray-900">700k</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {dataComposicaoDespesas.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{((item.value / 700000) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: TRANSAÇÕES */}
      {activeTab === "transacoes" && (
        <div className="animate-fade-in bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header Filters */}
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="Buscar transações..." className="pl-10 bg-white" />
            </div>
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                 <Filter size={16} /> Filtros
               </button>
               <Button>Nova Transação</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">ID / Data</th>
                  <th className="px-6 py-4">Descrição</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Método</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockTransacoes.map((trx) => (
                  <tr key={trx.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-blue-600 mb-0.5">{trx.id}</div>
                      <div className="text-gray-500 text-xs">{new Date(trx.data).toLocaleDateString('pt-PT')}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {trx.descricao}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {trx.categoria}
                      </span>
                    </td>
                     <td className="px-6 py-4 text-gray-500">
                       <div className="flex items-center gap-1.5">
                         <CreditCard size={14} />
                         {trx.metodo}
                       </div>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${trx.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {trx.tipo === 'receita' ? '+' : '-'}{formatarMoeda(trx.valor)}
                    </td>
                    <td className="px-6 py-4 text-center">
                       <Badge variant={
                         trx.status === 'concluido' ? 'success' : 
                         trx.status === 'pendente' ? 'warning' : 'default'
                       }>
                         {trx.status}
                       </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md"><Download size={16} /></button>
                        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-md"><FileText size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 text-sm text-gray-500">
             <span>Mostrando 1-7 de 124 transações</span>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Anterior</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Próximo</button>
             </div>
          </div>
        </div>
      )}

      {/* CONTENT: RELATÓRIOS (Placeholder) */}
      {activeTab === "relatorios" && (
         <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
            <PieChartIcon size={64} className="text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Relatórios Avançados</h3>
            <p className="text-gray-500 max-w-md text-center mb-6">
              Em breve você poderá gerar relatórios detalhados de DRE, Balanço Patrimonial e projeções financeiras baseadas em IA.
            </p>
            <Button variant="outline">Ser notificado quando lançar</Button>
         </div>
      )}

    </MainLayout>
  );
};

export default Financeiro;
