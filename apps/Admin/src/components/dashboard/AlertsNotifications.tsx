import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Motorista João Silva está offline há mais de 2 horas durante o turno.',
    time: 'Há 15 min',
  },
  {
    id: 2,
    type: 'success',
    message: 'Pagamento de 50.000 Kz recebido de Empresa XYZ.',
    time: 'Há 30 min',
  },
  {
    id: 3,
    type: 'info',
    message: 'Nova versão do aplicativo de motorista disponível.',
    time: 'Há 2 horas',
  },
  {
    id: 4,
    type: 'error',
    message: 'Falha na conexão com o gateway de pagamento.',
    time: 'Há 3 horas',
  },
];

const AlertsNotifications = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-teal-600" />
          Alertas e Notificações
        </h3>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length} novos
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors flex gap-3 items-start">
            <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 
              ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                alert.type === 'success' ? 'bg-green-100 text-green-600' :
                alert.type === 'error' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'}`}>
              {alert.type === 'warning' && <AlertTriangle size={14} />}
              {alert.type === 'success' && <CheckCircle size={14} />}
              {alert.type === 'error' && <AlertTriangle size={14} />}
              {alert.type === 'info' && <Info size={14} />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-snug">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
        <button className="text-xs font-medium text-teal-600 hover:text-teal-700">
          Ver todas as notificações
        </button>
      </div>
    </div>
  );
};

export default AlertsNotifications;
