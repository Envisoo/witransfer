import React from 'react';
import { Users, UserCheck, UserPlus, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <div className="flex items-center mt-2 text-sm">
        <span className="text-green-600 font-medium flex items-center">
          <TrendingUp size={14} className="mr-1" />
          {change}
        </span>
        <span className="text-gray-400 ml-1">vs mês anterior</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

const ClientStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total de Clientes"
        value="1,240"
        change="+12%"
        icon={Users}
        color="bg-blue-500 text-blue-600"
      />
      <StatCard
        title="Clientes Ativos"
        value="892"
        change="+5%"
        icon={UserCheck}
        color="bg-green-500 text-green-600"
      />
      <StatCard
        title="Novos este Mês"
        value="145"
        change="+18%"
        icon={UserPlus}
        color="bg-purple-500 text-purple-600"
      />
    </div>
  );
};

export default ClientStats;
