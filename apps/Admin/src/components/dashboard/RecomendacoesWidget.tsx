import React from 'react';
import { Lightbulb, Send, Phone, Ban, Gift, AlertCircle } from 'lucide-react';

interface Recomendacao {
  id: string;
  prioridade: 'alta' | 'media' | 'baixa';
  icone: React.ElementType;
  acao: string;
  descricao: string;
  impacto: string;
}

const recomendacoes: Recomendacao[] = [
  {
    id: '1',
    prioridade: 'alta',
    icone: Send,
    acao: 'Enviar Promoção',
    descricao: 'Enviar desconto de 20% para 12 clientes inativos',
    impacto: 'Potencial recuperação de 8-10 clientes',
  },
  {
    id: '2',
    prioridade: 'alta',
    icone: Phone,
    acao: 'Contatar Motorista',
    descricao: 'Chamar João Silva para conversa (3 reclamações)',
    impacto: 'Prevenir deterioração do serviço',
  },
  {
    id: '3',
    prioridade: 'media',
    icone: AlertCircle,
    acao: 'Revisar Política',
    descricao: 'Revisar categoria Van (rentabilidade baixa)',
    impacto: 'Potencial aumento de 15% na margem',
  },
  {
    id: '4',
    prioridade: 'alta',
    icone: Ban,
    acao: 'Bloquear Cliente',
    descricao: 'Suspender Maria Costa (4 suspeitas de fraude)',
    impacto: 'Prevenir perdas estimadas em 50.000 Kz',
  },
  {
    id: '5',
    prioridade: 'baixa',
    icone: Gift,
    acao: 'Programa VIP',
    descricao: 'Convidar 8 clientes para programa de fidelidade',
    impacto: 'Aumento de retenção em 30%',
  },
];

const RecomendacoesWidget = () => {
  const prioridadeColors = {
    alta: 'border-l-4 border-red-500 bg-red-50/50',
    media: 'border-l-4 border-yellow-500 bg-yellow-50/50',
    baixa: 'border-l-4 border-blue-500 bg-blue-50/50',
  };

  const prioridadeBadge = {
    alta: 'bg-red-100 text-red-700',
    media: 'bg-yellow-100 text-yellow-700',
    baixa: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={20} className="text-amber-600" />
        <h3 className="text-lg font-bold text-gray-900">O que fazer agora?</h3>
        <span className="ml-auto px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
          {recomendacoes.length} ações
        </span>
      </div>

      <div className="space-y-3">
        {recomendacoes.map((rec) => {
          const Icon = rec.icone;
          return (
            <div
              key={rec.id}
              className={`p-4 rounded-lg ${prioridadeColors[rec.prioridade]} hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <Icon size={18} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900">{rec.acao}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${prioridadeBadge[rec.prioridade]}`}>
                      {rec.prioridade === 'alta' ? 'Urgente' : rec.prioridade === 'media' ? 'Normal' : 'Baixa'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">{rec.descricao}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 italic">💡 {rec.impacto}</p>
                    <button className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline">
                      Executar →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecomendacoesWidget;
