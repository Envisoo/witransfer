/** @format */

import React from "react";
import {
  Users,
  Car,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  Percent,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${color.replace("bg-", "text-")}`} />
      </div>
    </div>
    {change && (
      <div className="mt-2 flex items-center text-xs">
        {trend === "up" && (
          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
        )}
        {trend === "down" && (
          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
        )}
        <span
          className={`font-medium ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"}`}>
          {change}
        </span>
        <span className="text-gray-400 ml-1">vs mês anterior</span>
      </div>
    )}
  </div>
);

interface MetricCardsProps {
  data: {
    totalClientes: number;
    motoristasOnline: number;
    viagensHoje: number;
    faturamentoHoje: number;
    lucroHoje: number;
    crescimentoHoje: number; // percentual de crescimento vs dia anterior
    alertasCriticos: number; // contagem de alertas importantes
  };
}

const MetricCards: React.FC<MetricCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      <MetricCard
        title="Total Clientes"
        value={data.totalClientes}
        change="+12%"
        trend="up"
        icon={Users}
        color="bg-blue-500 text-blue-600"
      />
      <MetricCard
        title="Motoristas Online"
        value={data.motoristasOnline}
        change="87 de 120"
        trend="neutral"
        icon={Car}
        color="bg-green-500 text-green-600"
      />
      <MetricCard
        title="Viagens Hoje"
        value={data.viagensHoje}
        change="+8%"
        trend="up"
        icon={Clock}
        color="bg-purple-500 text-purple-600"
      />
      <MetricCard
        title="Faturamento"
        value={`${data.faturamentoHoje.toLocaleString()} Kz`}
        change="+5%"
        trend="up"
        icon={DollarSign}
        color="bg-orange-500 text-orange-600"
      />
      <MetricCard
        title="Lucro Líquido"
        value={`${data.lucroHoje.toLocaleString()} Kz`}
        change="+3%"
        trend="up"
        icon={Wallet}
        color="bg-teal-500 text-teal-600"
      />
      <MetricCard
        title="Crescimento Hoje"
        value={`${data.crescimentoHoje.toFixed(1)}%`}
        change="vs dia anterior"
        trend={data.crescimentoHoje >= 0 ? "up" : "down"}
        icon={Percent}
        color={
          data.crescimentoHoje >= 0
            ? "bg-emerald-500 text-emerald-600"
            : "bg-red-500 text-red-600"
        }
      />
      <MetricCard
        title="Alertas Críticos"
        value={data.alertasCriticos}
        change={data.alertasCriticos > 0 ? "Atenção necessária" : "Sem alertas"}
        trend={data.alertasCriticos > 0 ? "down" : "neutral"}
        icon={AlertTriangle}
        color={
          data.alertasCriticos > 0
            ? "bg-red-500 text-red-600"
            : "bg-gray-500 text-gray-600"
        }
      />
    </div>
  );
};

export default MetricCards;
