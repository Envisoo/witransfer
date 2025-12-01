import React from 'react';
import { TrendingUp, AlertTriangle, Users, Car, DollarSign, Star, Zap } from 'lucide-react';

interface Insight {
  id: string;
  tipo: 'success' | 'warning' | 'info' | 'danger';
  icone: React.ElementType;
  titulo: string;
  descricao: string;
  valor?: string;
  variacao?: number;
}

const insights: Insight[] = [
  {
    id: '1',
    tipo: 'success',
    icone: TrendingUp,
    titulo: 'Viagens VIP em Alta',
    descricao: 'Categoria VIP aumentou 23% esta semana',
    valor: '+23%',
    variacao: 23,
  },
  {
    id: '2',
    tipo: 'warning',
    icone: AlertTriangle,
    titulo: 'Clientes em Risco',
    descricao: '5 clientes não realizam viagens há mais de 30 dias',
    valor: '5',
  },
  {
    id: '3',
    tipo: 'danger',
    icone: Users,
    titulo: 'Atenção Necessária',
    descricao: 'Motorista João Silva tem 3 reclamações recentes',
  },
  {
    id: '4',
    tipo: 'info',
    icone: Car,
    titulo: 'Baixa Ocupação',
    descricao: 'Categoria Van com ocupação abaixo de 60%',
    valor: '58%',
  },
  {
    id: '5',
    tipo: 'success',
    icone: DollarSign,
    titulo: 'Receita Acima do Previsto',
    descricao: 'Faturamento 12% acima da previsão hoje',
    valor: '+12%',
    variacao: 12,
  },
  {
    id: '6',
    tipo: 'info',
    icone: Star,
    titulo: 'Satisfação em Alta',
    descricao: 'Avaliação média subiu para 4.7 estrelas',
    valor: '4.7★',
  },
];

const InsightsWidget = () => {
  const tipoStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
  };

  const iconStyles = {
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100',
    danger: 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Insights Inteligentes</h3>
        </div>
        <span className="text-xs text-gray-500">Gerado por IA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight) => {
          const Icon = insight.icone;
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border-2 ${tipoStyles[insight.tipo]} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${iconStyles[insight.tipo]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{insight.titulo}</h4>
                    {insight.valor && (
                      <span className="text-lg font-bold">{insight.valor}</span>
                    )}
                  </div>
                  <p className="text-xs opacity-90">{insight.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsWidget;
