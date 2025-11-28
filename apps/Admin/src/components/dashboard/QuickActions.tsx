import React from 'react';
import { UserPlus, Map, FileText } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    title: 'Novo Motorista',
    icon: UserPlus,
    href: '/motoristas/novo',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Nova Viagem',
    icon: Map,
    href: '/viagens/nova',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Relatórios',
    icon: FileText,
    href: '/relatorios',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Novo Cliente',
    icon: UserPlus,
    href: '/clientes/novo',
    color: 'bg-orange-50 text-orange-600',
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">Ações Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link 
            key={index} 
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
          >
            <div className={`p-3 rounded-full ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
