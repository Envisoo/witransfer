import React from 'react';
import { X, Phone, Mail, MapPin, Calendar, Star, Clock, CreditCard, TrendingUp, Trophy, Award, FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Cliente } from '@/types/cliente';
import { ClientAdvanced } from '@/types/clienteAvancado';
import { formatarData, formatarTelefone } from '@/lib/formatters';
import Badge from '@/components/common/Badge';

interface AdvancedClientDrawerProps {
  cliente: Cliente | null;
  clienteAvancado: ClientAdvanced | null;
  onClose: () => void;
  onEdit: (cliente: Cliente) => void;
}

const AdvancedClientDrawer: React.FC<AdvancedClientDrawerProps> = ({ 
  cliente, 
  clienteAvancado,
  onClose, 
  onEdit 
}) => {
  if (!cliente || !clienteAvancado) return null;

  const { score, segmento, fidelidade, padroes } = clienteAvancado;

  const nivelCores = {
    bronze: 'bg-orange-100 text-orange-700 border-orange-200',
    prata: 'bg-gray-100 text-gray-700 border-gray-300',
    ouro: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    platina: 'bg-purple-100 text-purple-700 border-purple-300',
  };

  const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-2xl pointer-events-auto bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-blue-50">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Perfil do Cliente</h2>
              <p className="text-sm text-gray-500 mt-0.5">Análise completa e histórico</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors text-gray-500">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 px-6 py-8">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-teal-600 shadow-lg">
                  {cliente.nome.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{cliente.nome}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${segmento.tipo === 'vip' ? 'bg-yellow-400 text-yellow-900' : segmento.tipo === 'risco' ? 'bg-red-400 text-red-900' : 'bg-white/20 text-white'}`}>
                      {segmento.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-3">
                    <Star size={16} className="fill-yellow-300 text-yellow-300" />
                    <span className="font-semibold">{cliente.avaliacaoMedia.toFixed(1)}</span>
                    <span className="text-white/70">•</span>
                    <span>{cliente.numeroViagens} viagens</span>
                  </div>
                  <Badge variant={cliente.status as any}>{cliente.status}</Badge>
                </div>
              </div>

              {/* Loyalty Level */}
              <div className={`mt-6 p-4 rounded-xl border-2 ${nivelCores[fidelidade.nivel]}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy size={20} />
                    <span className="font-bold uppercase text-sm">Nível {fidelidade.nivel}</span>
                  </div>
                  <span className="text-lg font-bold">{fidelidade.pontos.toLocaleString()} pts</span>
                </div>
                {fidelidade.pontosParaProximo > 0 && (
                  <>
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-current"
                        style={{ width: `${Math.min(100, ((fidelidade.pontos % 10000) / (fidelidade.pontosParaProximo + (fidelidade.pontos % 10000))) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs opacity-80">
                      Faltam {fidelidade.pontosParaProximo.toLocaleString()} pts para {fidelidade.proximoNivel}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Score Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-teal-600" />
                  Score do Cliente
                </h4>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <ScoreBar label="Satisfação" value={score.satisfacao} color="bg-green-500" />
                  <ScoreBar label="Valor" value={score.valor} color="bg-blue-500" />
                  <ScoreBar label="Engajamento" value={score.engajamento} color="bg-purple-500" />
                  <ScoreBar label="Risco de Churn" value={score.risco} color="bg-red-500" />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Informações de Contato</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{cliente.email}</span>
                    {clienteAvancado.emailVerificado && <CheckCircle size={14} className="text-green-500 ml-auto" />}
                  </div>
                  <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{formatarTelefone(cliente.telefone)}</span>
                    {clienteAvancado.telefoneVerificado && <CheckCircle size={14} className="text-green-500 ml-auto" />}
                  </div>
                  <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{cliente.endereco || 'Não informado'}</span>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Estatísticas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Clock size={14} />
                      <span className="text-xs font-medium">Frequência</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{padroes.frequenciaMedia.toFixed(1)}/mês</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <CreditCard size={14} />
                      <span className="text-xs font-medium">Gasto Médio</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{padroes.gastoMedio.toLocaleString()} Kz</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <Calendar size={14} />
                      <span className="text-xs font-medium">Última Viagem</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900">Há {padroes.diasSemViagem} dias</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <Award size={14} />
                      <span className="text-xs font-medium">Crédito</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{clienteAvancado.saldoCredito.toLocaleString()} Kz</p>
                  </div>
                </div>
              </div>

              {/* Patterns */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Padrões de Uso</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Horário Preferido:</span>
                    <span className="font-semibold text-gray-900">{padroes.horarioPreferido}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Categoria Preferida:</span>
                    <span className="font-semibold text-gray-900">{padroes.categoriaVeiculoPreferida}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Trajeto Favorito:</span>
                    <span className="font-semibold text-gray-900">{padroes.trajetoFavorito}</span>
                  </div>
                </div>
              </div>

              {/* Loyalty Benefits */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Benefícios Ativos</h4>
                <div className="space-y-2">
                  {fidelidade.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-teal-50 text-teal-700 rounded">
                      <CheckCircle size={14} />
                      <span>{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={16} className="text-teal-600" />
                  Status de Verificação
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded flex items-center gap-2 ${clienteAvancado.documentosVerificados ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                    {clienteAvancado.documentosVerificados ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>Documentos</span>
                  </div>
                  <div className={`p-2 rounded flex items-center gap-2 ${clienteAvancado.emailVerificado ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                    {clienteAvancado.emailVerificado ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>Email</span>
                  </div>
                  <div className={`p-2 rounded flex items-center gap-2 ${clienteAvancado.telefoneVerificado ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                    {clienteAvancado.telefoneVerificado ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>Telefone</span>
                  </div>
                  <div className="p-2 rounded flex items-center gap-2 bg-blue-50 text-blue-700">
                    <CreditCard size={14} />
                    <span>{clienteAvancado.metodosPagamento} Métodos</span>
                  </div>
                </div>
              </div>

              {/* Support Tickets */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-teal-600" />
                  Suporte
                </h4>
                <div className="flex gap-3">
                  <div className="flex-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-700">{clienteAvancado.ticketsAbertos}</p>
                    <p className="text-xs text-yellow-600 mt-1">Abertos</p>
                  </div>
                  <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{clienteAvancado.ticketsResolvidos}</p>
                    <p className="text-xs text-green-600 mt-1">Resolvidos</p>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              {clienteAvancado.notas.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Notas Internas</h4>
                  <div className="space-y-2">
                    {clienteAvancado.notas.map((nota) => (
                      <div 
                        key={nota.id} 
                        className={`p-3 rounded-lg border text-sm ${
                          nota.tipo === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                          nota.tipo === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                          nota.tipo === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                          'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-xs">{nota.autor}</span>
                          <span className="text-xs opacity-70">{formatarData(nota.data)}</span>
                        </div>
                        <p className="text-sm">{nota.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
            <button 
              onClick={() => onEdit(cliente)}
              className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Editar Cliente
            </button>
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Ver Histórico Completo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvancedClientDrawer;
