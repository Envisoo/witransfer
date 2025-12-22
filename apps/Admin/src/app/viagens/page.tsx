/** @format */

"use client";

import React, { useState, useMemo } from "react";
import {
  Filter,
  MapPin,
  Calendar,
  User,
 
  Eye,
  
  Car,
  Search,
 
  LayoutGrid,
  List,
  CheckCircle,
  TrendingUp,
  Ban,
  Clock,
  
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { StatusViagem, Viagem } from "@/types/viagem";
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
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<keyof Viagem>("dataPartida");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [cols, setCols] = useState({
    cliente: true,
    motorista: true,
    rota: true,
    detalhes: true,
    status: true,
    acoes: true
  });

  // Modal states
  const [modalCancelarOpen, setModalCancelarOpen] = useState(false);
  const [viagemParaCancelar, setViagemParaCancelar] = useState<string | null>(null);

  const { sucesso, erro: notificarErro } = useNotification();

  // Mock Data
  const mockViagensList: Viagem[] = [
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
  ];

  // Filtering Logic
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return mockViagensList.filter((v) => {
      const matchBusca =
        !termo ||
        v.id.toLowerCase().includes(termo) ||
        v.clienteNome.toLowerCase().includes(termo) ||
        (v.motoristaNome && v.motoristaNome.toLowerCase().includes(termo));
      const matchStatus = !status || v.status === status;
      
      let matchData = true;
      if (dataInicio) {
        matchData = matchData && new Date(v.dataPartida) >= new Date(dataInicio);
      }
      if (dataFim) {
        matchData = matchData && new Date(v.dataPartida) <= new Date(dataFim);
      }

      return matchBusca && matchStatus && matchData;
    });
  }, [busca, status, dataInicio, dataFim]);

  // Sorting Logic
  const ordenados = useMemo(() => {
    const arr = [...filtrados];
    arr.sort((a, b) => {
      const av: any = a[sortKey];
      const bv: any = b[sortKey];
      let comp = 0;
      if (sortKey === "dataPartida") {
        comp = new Date(av).getTime() - new Date(bv).getTime();
      } else if (typeof av === "number" && typeof bv === "number") {
        comp = av - bv;
      } else {
        comp = String(av ?? "").localeCompare(String(bv ?? ""), "pt");
      }
      return sortDir === "asc" ? comp : -comp;
    });
    return arr;
  }, [filtrados, sortKey, sortDir]);

  // Pagination Logic
  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / pageSize));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const itensPagina = ordenados.slice(
    (paginaAtual - 1) * pageSize,
    paginaAtual * pageSize
  );

  const handleCancelarViagem = async () => {
    try {
      sucesso("Viagem cancelada com sucesso!");
      setModalCancelarOpen(false);
      setViagemParaCancelar(null);
      // In real app, update list
    } catch (err) {
      notificarErro("Erro ao cancelar viagem.");
    }
  };

  // Stats
  const stats = {
    total: mockViagensList.length,
    concluidas: mockViagensList.filter(v => v.status === 'concluida').length,
    emAndamento: mockViagensList.filter(v => ['emprogresss', 'emcaminho'].includes(v.status)).length,
    canceladas: mockViagensList.filter(v => v.status === 'cancelada').length,
  };

  return (
    <MainLayout titulo="Gestão de Viagens">


      {/* Statistics Cards - BLUE UNIFORM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Car size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-blue-100 text-sm">Total</p>
            </div>
          </div>
          <p className="text-blue-100">Viagens Registradas</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.concluidas}</p>
              <p className="text-blue-100 text-sm">Concluídas</p>
            </div>
          </div>
          <p className="text-blue-100">Viagens Finalizadas</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.emAndamento}</p>
              <p className="text-blue-100 text-sm">Em Andamento</p>
            </div>
          </div>
          <p className="text-blue-100">Viagens Ativas</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Ban size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.canceladas}</p>
              <p className="text-blue-100 text-sm">Canceladas</p>
            </div>
          </div>
          <p className="text-blue-100">Viagens Canceladas</p>
        </div>
      </div>

       {/* Header & Filters */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Histórico de Viagens</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie e monitore todas as viagens</p>
          </div>
        </div>

        {/* Filters Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Input
              placeholder="Buscar por ID, Cliente ou Motorista..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="pl-4 pr-10 py-2.5 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500 w-full text-sm"
            />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={16} />
             </div>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as StatusViagem | "");
                setPagina(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white cursor-pointer h-[42px]">
              <option value="">Todos Status</option>
              <option value="solicitada">Solicitada</option>
              <option value="aceita">Aceita</option>
              <option value="emcaminho">Em Caminho</option>
              <option value="emprogresss">Em Progresso</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-3">
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]"
              placeholder="Data início"
            />
          </div>

          <div className="md:col-span-3">
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]"
              placeholder="Data fim"
            />
          </div>
        </div>

        {/* Filters Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortKey as string}
              onChange={(e) => setSortKey(e.target.value as keyof Viagem)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value="dataPartida">Data: Mais Recentes</option>
              <option value="preco">Preço</option>
              <option value="distancia">Distância</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div className="md:col-span-2">
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as any)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>

          {/* Page Size */}
          <div className="md:col-span-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPagina(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value={10}>10 por página</option>
              <option value={25}>25 por página</option>
              <option value={50}>50 por página</option>
            </select>
          </div>

           {/* View Mode + Columns */}
           <div className="md:col-span-5 flex items-center justify-end gap-2">
            <div className="relative group inline-block">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-[42px]">
                <Filter size={18} />
                Colunas
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover:block z-10">
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.cliente}
                    onChange={(e) => setCols({ ...cols, cliente: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Cliente
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.motorista}
                    onChange={(e) => setCols({ ...cols, motorista: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Motorista
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.rota}
                    onChange={(e) => setCols({ ...cols, rota: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Rota
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.detalhes}
                    onChange={(e) => setCols({ ...cols, detalhes: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Detalhes
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.status}
                    onChange={(e) => setCols({ ...cols, status: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Status
                </label>
                 <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.acoes}
                    onChange={(e) => setCols({ ...cols, acoes: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Ações
                </label>
              </div>
            </div>

            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Lista"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Grade"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

       {/* List View */}
       {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
           {itensPagina.length === 0 ? (
             <div className="p-8 text-center text-gray-500">
               Nenhuma viagem encontrada.
             </div>
           ) : (
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID / Data
                    </th>
                    {cols.cliente && (
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                    )}
                    {cols.motorista && (
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Motorista</th>
                    )}
                    {cols.rota && (
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rota</th>
                    )}
                    {cols.detalhes && (
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalhes</th>
                    )}
                    {cols.status && (
                       <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    )}
                    {cols.acoes && (
                       <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {itensPagina.map((viagem) => (
                     <tr key={viagem.id} className="hover:bg-blue-50 transition-colors duration-150 group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-blue-600 font-medium tracking-wider">#{viagem.id.slice(0, 8)}</span>
                            <span className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                              <Clock size={12} />
                              {formatarData(viagem.dataPartida)}
                            </span>
                          </div>
                        </td>
                        {cols.cliente && (
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                  {viagem.clienteNome.charAt(0)}
                               </div>
                               <span className="text-sm font-medium text-gray-900">{viagem.clienteNome}</span>
                            </div>
                          </td>
                        )}
                        {cols.motorista && (
                          <td className="px-6 py-4">
                             {viagem.motoristaNome ? (
                                <div className="flex items-center gap-2">
                                   <Car size={16} className="text-gray-400" />
                                   <span className="text-sm text-gray-700">{viagem.motoristaNome}</span>
                                </div>
                             ) : (
                                <span className="text-sm text-gray-400 italic">Não atribuído</span>
                             )}
                          </td>
                        )}
                        {cols.rota && (
                           <td className="px-6 py-4">
                              <div className="flex flex-col gap-1 max-w-[200px]">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                  <span className="text-xs text-gray-600 truncate" title={viagem.origem.endereco}>
                                    {viagem.origem.endereco || "Origem"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                  <span className="text-xs text-gray-600 truncate" title={viagem.destino.endereco}>
                                    {viagem.destino.endereco || "Destino"}
                                  </span>
                                </div>
                              </div>
                           </td>
                        )}
                        {cols.detalhes && (
                           <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-gray-900">{formatarMoeda(viagem.preco)}</span>
                                <span className="text-xs text-gray-500">{formatarDistancia(viagem.distancia)}</span>
                              </div>
                           </td>
                        )}
                        {cols.status && (
                           <td className="px-6 py-4 text-center">
                              <Badge variant={viagem.status as any}>{viagem.status}</Badge>
                           </td>
                        )}
                        {cols.acoes && (
                           <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <Link
                                  href={`/viagens/${viagem.id}`}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Ver Detalhes">
                                  <Eye size={18} />
                                </Link>
                                
                                {viagem.status !== 'cancelada' && viagem.status !== 'concluida' && (
                                  <button 
                                    onClick={() => {
                                      setViagemParaCancelar(viagem.id);
                                      setModalCancelarOpen(true);
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                    title="Cancelar Viagem"
                                  >
                                    <Ban size={18} />
                                  </button>
                                )}
                              </div>
                           </td>
                        )}
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
           )}
        </div>
       )}

       {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {itensPagina.map((viagem) => (
             <div key={viagem.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <Badge variant={viagem.status as any}>{viagem.status}</Badge>
                         <span className="text-xs text-gray-500 font-mono">#{viagem.id.slice(0, 6)}</span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                         <Calendar size={12} /> {formatarData(viagem.dataPartida)}
                      </p>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{formatarMoeda(viagem.preco)}</p>
                      <p className="text-xs text-gray-500">{viagem.tipoPagamento}</p>
                   </div>
                </div>
                
                <div className="p-5 space-y-4">
                   {/* Rota Visualization */}
                   <div className="relative pl-4 space-y-4 border-l-2 border-dashed border-gray-200 ml-1">
                      <div className="relative">
                         <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white" />
                         <p className="text-xs text-gray-500 mb-0.5">Origem</p>
                         <p className="text-sm font-medium text-gray-900 truncate" title={viagem.origem.endereco}>
                            {viagem.origem.endereco || "N/A"}
                         </p>
                      </div>
                      <div className="relative">
                         <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-red-500 ring-4 ring-white" />
                         <p className="text-xs text-gray-500 mb-0.5">Destino</p>
                         <p className="text-sm font-medium text-gray-900 truncate" title={viagem.destino.endereco}>
                            {viagem.destino.endereco || "N/A"}
                         </p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                         </div>
                         <div>
                            <p className="text-xs text-gray-500">Cliente</p>
                            <p className="text-sm font-medium text-gray-900">{viagem.clienteNome}</p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <Link
                            href={`/viagens/${viagem.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                         >
                            <Eye size={18} />
                         </Link>
                      </div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}

       {/* Pagination */}
       {totalPaginas > 1 && (
        <div className="flex justify-center mt-6">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
            carregando={false}
          />
        </div>
      )}

      {/* Map Section - Moved to Bottom */}
      <div className="mt-8 bg-white rounded-xl h-[500px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="text-blue-600" />
              Monitoramento em Tempo Real
            </h2>
            <p className="text-sm text-gray-500 mt-1">Acompanhe a localização dos motoristas no mapa</p>
          </div>
        </div>
        <div className="p-0">
           <MapaTempoReal />
        </div>
      </div>

      {/* Modal Cancelamento */}
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
