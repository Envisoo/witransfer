/** @format */

import React from "react";
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    message:
      "Motorista João Silva está offline há mais de 2 horas durante o turno.",
    suggestion: "Verificar status ou contatar motorista.",
    actionLabel: "Ver Motorista",
    time: "Há 15 min",
  },
  {
    id: 2,
    type: "error",
    message: "Falha na conexão com o gateway de pagamento.",
    suggestion: "Verificar logs do sistema e contatar suporte.",
    actionLabel: "Ver Logs",
    time: "Há 3 horas",
  },
  {
    id: 3,
    type: "info",
    message: "Manutenção programada do sistema para hoje à noite.",
    suggestion: "Notificar todos os usuários.",
    actionLabel: "Enviar Aviso",
    time: "Há 5 horas",
  },
  {
    id: 4,
    type: "warning",
    message: "3 Veículos com manutenção atrasada.",
    suggestion: "Agendar manutenção preventiva.",
    actionLabel: "Ver Veículos",
    time: "Há 1 dia",
  },
];

const AlertsNotifications = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[350px] flex flex-col">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-teal-600" />
          Alertas e Notificações
        </h3>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length} novos
        </span>
      </div>
      <div className="divide-y divide-gray-50 flex-1 overflow-y-auto max-h-[400px]">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 hover:bg-gray-50 transition-colors flex gap-3 items-start">
            <div
              className={`mt-1 p-1.5 rounded-full flex-shrink-0 
              ${
                alert.type === "warning"
                  ? "bg-yellow-100 text-yellow-600"
                  : alert.type === "success"
                    ? "bg-green-100 text-green-600"
                    : alert.type === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
              }`}>
              {alert.type === "warning" && <AlertTriangle size={14} />}
              {alert.type === "success" && <CheckCircle size={14} />}
              {alert.type === "error" && <AlertTriangle size={14} />}
              {alert.type === "info" && <Info size={14} />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium leading-snug">
                {alert.message}
              </p>
              {alert.suggestion && (
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold">Sugestão:</span>{" "}
                  {alert.suggestion}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">{alert.time}</p>
                {alert.actionLabel && (
                  <button className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline">
                    {alert.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-gray-50 text-center border-t border-gray-100 flex-shrink-0">
        <button className="text-xs font-medium text-teal-600 hover:text-teal-700">
          Ver todas as notificações
        </button>
      </div>
    </div>
  );
};

export default AlertsNotifications;
