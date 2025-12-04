/** @format */

import React from "react";
import { Clock, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "success",
    title: "Viagem concluída",
    description: "Viagem #1234 foi concluída com sucesso",
    time: "Há 5 minutos",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "Atraso na rota",
    description: "Motorista João atrasado na rota #1234",
    time: "Há 15 minutos",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "error",
    title: "Pagamento pendente",
    description: "Cliente Maria tem 2 pagamentos pendentes",
    time: "Há 1 hora",
    icon: XCircle,
  },
  {
    id: 4,
    type: "info",
    title: "Manutenção agendada",
    description: "Viatura ABC-1234 agendada para manutenção amanhã",
    time: "Há 2 horas",
    icon: Info,
  },
  {
    id: 5,
    type: "success",
    title: "Novo motorista",
    description: "Carlos Silva adicionado à frota",
    time: "Há 1 dia",
    icon: CheckCircle,
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-600";
    case "warning":
      return "bg-yellow-100 text-yellow-600";
    case "error":
      return "bg-red-100 text-red-600";
    case "info":
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const AtividadesRecentes: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Atividades Recentes
        </h3>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
          Ver tudo
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const typeStyles = getTypeStyles(activity.type);

          return (
            <div
              key={activity.id}
              className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div
                className={`flex-shrink-0 p-2 rounded-lg ${typeStyles} mr-3`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <div className="flex items-center text-xs text-gray-400 ml-2">
                <Clock className="w-3 h-3 mr-1" />
                <span>{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AtividadesRecentes;
