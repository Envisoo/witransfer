/** @format */

"use client";

import React, { useState } from "react";
import {  
  Filter, 
  MapPin, 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  Eye, 
  XCircle,
  Car
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ViagemResponse, StatusViagem } from "@/types/viagem";
import {
  formatarData,
  formatarMoeda,
  formatarDistancia,
} from "@/lib/formatters";
import MapaTempoReal from "@/components/viagens/MapaTempoReal";
import ModalCancelarViagem from "@/components/viagens/ModalCancelarViagem";
import Link from "next/link";
import { useNotification } from "@/hooks/useNotification";

const Viagens = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusViagem | "">("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [motoristaFiltro, setMotoristaFiltro] = useState("");
  const [filtrosAvancados, setFiltrosAvancados] = useState(false);
  
  // Modal states
  const [modalCancelarOpen, setModalCancelarOpen] = useState(false);
  const [viagemParaCancelar, setViagemParaCancelar] = useState<string | null>(null);

  const { sucesso, erro: notificarErro } = useNotification();

  // Mock Data for Static Display
  const mockViagens: ViagemResponse = {
    data: [
      {
        id: "v12345678",
        clienteId: "c1",
        clienteNome: "Maria Silva",
        motoristaId: "m1",
        motoristaNome: "João Santos",
        viaturaId: "car1",
        viaturaModelo: "Toyota Corolla",
        origem: { latitude: -8.839988, longitude: 13.289437, endereco: "Rua Rainha Ginga, Luanda" },
        destino: { latitude: -8.814667, longitude: 13.230111, endereco: "Aeroporto 4 de Fevereiro" },
        dataPartida: new Date().toISOString(),
        distancia: 15.5,
        status: "emprogresss",
        preco: 5000,
        taxaPlataforma: 500,
        comissaoMotorista: 4500,
        lucroLiquido: 500,
        tipoPagamento: "dinheiro",
        localizacaoAtual: { latitude: -8.825, longitude: 13.25 }
      },
      {
        id: "v87654321",
        clienteId: "c2",
        clienteNome: "Pedro Costa",
        motoristaId: "m2",
        motoristaNome: "Ana Oliveira",
        viaturaId: "car2",
        viaturaModelo: "Hyundai i10",
        origem: { latitude: -8.85, longitude: 13.3, endereco: "Talatona, Luanda" },
        destino: { latitude: -8.9, longitude: 13.4, endereco: "Benfica, Luanda" },
        dataPartida: new Date(Date.now() - 3600000).toISOString(),
        distancia: 8.2,
        status: "concluida",
        preco: 2500,
        taxaPlataforma: 250,
        comissaoMotorista: 2250,
        lucroLiquido: 250,
        tipoPagamento: "cartao"
      },
       {
        id: "v11223344",
        clienteId: "c3",
        clienteNome: "Carlos Ferreira",
        origem: { latitude: -8.82, longitude: 13.24, endereco: "Mutamba, Luanda" },
        destino: { latitude: -8.85, longitude: 13.35, endereco: "Kilamba Kiaxi" },
        dataPartida: new Date(Date.now() - 1800000).toISOString(),
        distancia: 12.0,
        status: "solicitada",
        preco: 4000,
        taxaPlataforma: 400,
        comissaoMotorista: 3600,
        lucroLiquido: 400,
        tipoPagamento: "carteira_digital"
      },
      {
        id: "v55667788",
        clienteId: "c4",
        clienteNome: "Sofia Martins",
        motoristaId: "m3",
        motoristaNome: "Lucas Pereira",
        viaturaId: "car3",
        viaturaModelo: "Kia Picanto",
        origem: { latitude: -8.81, longitude: 13.22, endereco: "Ilha do Cabo" },
        destino: { latitude: -8.83, longitude: 13.26, endereco: "Maianga" },
        dataPartida: new Date(Date.now() - 7200000).toISOString(),
        distancia: 5.5,
        status: "cancelada",
        preco: 2000,
        taxaPlataforma: 200,
        comissaoMotorista: 1800,
        lucroLiquido: 200,
        tipoPagamento: "dinheiro",
        motivoCancelamento: "Cliente não apareceu"
      }
    ],
    total: 4,
    pagina: 1,
    limite: 10,
    totalPaginas: 1
  };

  const dados = mockViagens;
  const carregando = false;
  const erro = null;
  const refetch = async () => { console.log("Refetching static data..."); };

  const handleCancelarViagem = async () => {
    try {
      sucesso("Viagem cancelada com sucesso!");
      setModalCancelarOpen(false);
      setViagemParaCancelar(null);
      refetch();
    } catch (err) {
      notificarErro("Erro ao cancelar viagem.");
    }
  };

  return (
    <MainLayout titulo="Gestão de Viagens">
      {/* Header */}
      <div className="mb-8">
        

        {/* Map Section - Always visible */}
        <div className="animate-fade-in">
          <MapaTempoReal />
        </div>

        {/* Filters Section */}
        <div className="card p-5 mb-6 animate-slide-in-up">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Buscar por ID, Cliente..."
                value={busca}
                onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
                
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value as StatusViagem | ""); setPagina(1); }}
                className="form-input h-[42px]"
              >
                <option value="">Todos os Status</option>
                <option value="solicitada">Solicitada</option>
                <option value="aceita">Aceita</option>
                <option value="emcaminho">Em Caminho</option>
                <option value="emprogresss">Em Progresso</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <button
              onClick={() => setFiltrosAvancados(!filtrosAvancados)}
              className={`h-[42px] px-4 rounded-lg border flex items-center gap-2 transition-colors ${
                filtrosAvancados 
                  ? 'bg-teal-50 border-teal-200 text-teal-700' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              Filtros Avançados
            </button>
          </div>

          {/* Advanced Filters */}
          {filtrosAvancados && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Data</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dataFiltro}
                    onChange={(e) => setDataFiltro(e.target.value)}
                    className="form-input pl-10"
                  />
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Motorista</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nome do motorista"
                    value={motoristaFiltro}
                    onChange={(e) => setMotoristaFiltro(e.target.value)}
                    className="form-input pl-10"
                  />
                  <User size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Section */}
        {carregando ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : erro ? (
          <div className="card p-8 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-full inline-flex mb-4">
              <XCircle size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar viagens</h3>
            <p className="text-gray-600">{erro}</p>
          </div>
        ) : !dados || dados.data.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="bg-gray-50 text-gray-400 p-4 rounded-full inline-flex mb-4">
              <MapPin size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma viagem encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou busque por outro termo.</p>
          </div>
        ) : (
          <>
            <div className="card overflow-hidden shadow-sm border-0 ring-1 ring-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Viagem</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente / Motorista</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rota</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Detalhes</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {dados.data.map((viagem) => (
                      <tr key={viagem.id} className="group hover:bg-teal-50/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-gray-500">#{viagem.id.slice(0, 8)}</span>
                            <span className="text-sm font-medium text-gray-900 mt-1">{formatarData(viagem.dataPartida)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-900 font-medium">{viagem.clienteNome}</span>
                            </div>
                            {viagem.motoristaNome && (
                              <div className="flex items-center gap-2">
                                <Car size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{viagem.motoristaNome}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2 max-w-[200px]">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                              <span className="text-xs text-gray-600 truncate" title={viagem.origem.endereco}>
                                {viagem.origem.endereco || "Origem não definida"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                              <span className="text-xs text-gray-600 truncate" title={viagem.destino.endereco}>
                                {viagem.destino.endereco || "Destino não definido"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-900">{formatarMoeda(viagem.preco)}</span>
                            <span className="text-xs text-gray-500">{formatarDistancia(viagem.distancia)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={viagem.status as any}>
                            {viagem.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/viagens/${viagem.id}`} className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Ver Detalhes">
                              <Eye size={18} />
                            </Link>
                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                              <Edit size={18} />
                            </button>
                            {viagem.status !== 'cancelada' && viagem.status !== 'concluida' && (
                              <button 
                                onClick={() => {
                                  setViagemParaCancelar(viagem.id);
                                  setModalCancelarOpen(true);
                                }}
                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Cancelar Viagem"
                              >
                                <XCircle size={18} />
                              </button>
                            )}
                            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {dados.totalPaginas > 1 && (
              <div className="mt-6">
                <Paginacao
                  paginaAtual={pagina}
                  totalPaginas={dados.totalPaginas}
                  onMudarPagina={setPagina}
                  carregando={carregando}
                />
              </div>
            )}
          </>
        )}
      </div>

      <ModalCancelarViagem 
        isOpen={modalCancelarOpen}
        onClose={() => setModalCancelarOpen(false)}
        onConfirm={handleCancelarViagem}
        viagemId={viagemParaCancelar || ''}
      />
    </MainLayout>
  );
};

export default Viagens;
