/** @format */

import React from "react";
import {
  Users,
  Car,
  Clock,
  DollarSign,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  description,
}) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-100",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-100",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-100",
    },
  };

  const colorKey = color.split("-")[1].split("-")[0];
  const colors = colorMap[colorKey as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`p-5 rounded-2xl ${colors.bg} ${colors.border} border`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change && trend && trend !== "neutral" && (
        <div className="mt-3 flex items-center">
          <div
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              trend === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {trend === "up" ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            )}
            {change}
          </div>
          <span className="text-xs text-gray-500 ml-2">vs. ontem</span>
        </div>
      )}
    </div>
  );
};

interface MetricCardsProps {
  data: {
    totalClientes: number;
    motoristasOnline: number;
    viagensHoje: number;
    faturamentoHoje: number;
    lucroHoje: number;
    crescimentoHoje: number;
    alertasCriticos: number;
    timeRange: string;
  };
}

const MetricCards: React.FC<MetricCardsProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: "Total de Clientes",
      value: data.totalClientes,
      change: "+5.2%",
      trend: "up" as const,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      description: "Clientes ativos no sistema",
    },
    {
      title: "Motoristas Online",
      value: data.motoristasOnline,
      change: "+12.5%",
      trend: "up" as const,
      icon: Car,
      color: "bg-green-100 text-green-600",
      description: "Ativos agora",
    },
    {
      title: "Viagens Hoje",
      value: data.viagensHoje,
      change: "-2.3%",
      trend: "down" as const,
      icon: Clock,
      color: "bg-purple-100 text-purple-600",
      description: "Viagens realizadas hoje",
    },
    {
      title: "Faturamento",
      value: formatCurrency(data.faturamentoHoje),
      change: `+${data.crescimentoHoje}%`,
      trend: data.crescimentoHoje >= 0 ? ("up" as const) : ("down" as const),
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      description: "Faturamento do dia",
    },
    {
      title: "Lucro Líquido",
      value: formatCurrency(data.lucroHoje),
      change: "+8.7%",
      trend: "up" as const,
      icon: Wallet,
      color: "bg-teal-100 text-teal-600",
      description: "Após descontos e taxas",
    },
    {
      title: "Alertas",
      value: data.alertasCriticos,
      change: data.alertasCriticos > 0 ? `+${data.alertasCriticos}` : "0",
      trend: data.alertasCriticos > 0 ? ("up" as const) : ("neutral" as const),
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      description: "Necessitam atenção",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <MetricCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          trend={card.trend}
          icon={card.icon}
          color={card.color}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default MetricCards;
