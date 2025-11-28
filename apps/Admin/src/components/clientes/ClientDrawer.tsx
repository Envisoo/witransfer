import React from 'react';
import { X, Phone, Mail, MapPin, Calendar, Star, Clock, CreditCard } from 'lucide-react';
import { Cliente } from '@/types/cliente';
import { formatarData, formatarTelefone } from '@/lib/formatters';
import Badge from '@/components/common/Badge';

interface ClientDrawerProps {
  cliente: Cliente | null;
  onClose: () => void;
  onEdit: (cliente: Cliente) => void;
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({ cliente, onClose, onEdit }) => {
  if (!cliente) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Detalhes do Cliente</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-3xl font-bold text-teal-700 mb-4 border-4 border-white shadow-sm">
                {cliente.nome.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">{cliente.nome}</h3>
              <div className="mt-2">
                <Badge variant={cliente.status as any}>{cliente.status}</Badge>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Informações de Contato</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-gray-400" />
                    {cliente.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-gray-400" />
                    {formatarTelefone(cliente.telefone)}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-gray-400" />
                    {cliente.endereco || 'Endereço não informado'}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Estatísticas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Star size={16} />
                      <span className="text-xs font-medium">Avaliação</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{cliente.avaliacaoMedia.toFixed(1)}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <Clock size={16} />
                      <span className="text-xs font-medium">Viagens</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{cliente.numeroViagens}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <CreditCard size={16} />
                      <span className="text-xs font-medium">Gasto Total</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">245.000 Kz</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar size={16} />
                      <span className="text-xs font-medium">Desde</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{formatarData(cliente.dataCadastro)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Última Atividade</h4>
                <div className="border-l-2 border-gray-200 pl-4 py-1 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-white"></div>
                    <p className="text-sm font-medium text-gray-900">Viagem concluída</p>
                    <p className="text-xs text-gray-500">Hoje, 14:30 • Talatona → Maianga</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
                    <p className="text-sm font-medium text-gray-900">Login no App</p>
                    <p className="text-xs text-gray-500">Ontem, 09:15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
            <button 
              onClick={() => onEdit(cliente)}
              className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              Editar Cliente
            </button>
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Histórico Completo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientDrawer;
