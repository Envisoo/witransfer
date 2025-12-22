/** @format */

"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Edit, 
  Eye, 
  
  Ban, 
  CheckCircle,
  User,
  TrendingUp,
  AlertTriangle,
 
  Star,
  Phone,
  Mail,
  Car,
  X,

  Users,
  LayoutGrid,
  List,
  Filter
} from "lucide-react";
import Link from "next/link";

import MainLayout from "@/components/layout/MainLayout";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { Motorista, StatusMotorista } from "@/types/motorista";
import { mockMotoristas } from "@/data/mockMotoristas";
import { formatarTelefone, formatarMoeda } from "@/lib/formatters";

const Motoristas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusMotorista | "">("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // COMEÇA EM LISTA
  const [minNota, setMinNota] = useState<number>(0);
  const [sortKey, setSortKey] = useState<keyof Motorista>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState<number>(10);
  const [cols, setCols] = useState({
    email: true,
    telefone: true,
    viatura: true,
    status: true,
  });
  const [motoristas, setMotoristas] = useState<Motorista[]>(mockMotoristas);
  const notif = useNotification();

  // Filter motoristas
  const filtrados = React.useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return motoristas.filter((m) => {
      const matchBusca =
        !termo ||
        m.nome.toLowerCase().includes(termo) ||
        m.email.toLowerCase().includes(termo) ||
        m.telefone.includes(termo);
      const matchStatus = !status || m.status === status;
      const matchNota = (m.avaliacao ?? 0) >= (minNota || 0);
      
      return matchBusca && matchStatus && matchNota;
    });
  }, [motoristas, busca, status, minNota]);

  // Sort
  const ordenados = React.useMemo(() => {
    const arr = [...filtrados];
    arr.sort((a, b) => {
      const av: any = a[sortKey];
      const bv: any = b[sortKey];
      let comp = 0;
      if (sortKey === "dataInicio") {
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

  // Statistics
  const stats = {
    total: motoristas.length,
    online: motoristas.filter(m => m.status === 'online').length,
    disponivel: motoristas.filter(m => m.status === 'disponivel').length,
    suspensos: motoristas.filter(m => m.status === 'suspenso').length,
  };

  // Pagination
  const itensPorPagina = pageSize;
  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / itensPorPagina));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const dadosPagina = ordenados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleSuspendMotorista = (
    id: string,
    currentStatus: StatusMotorista
  ) => {
    const novoStatus = currentStatus === "suspenso" ? "offline" : "suspenso";
    const acao = currentStatus === "suspenso" ? "reativado" : "suspenso";

    if (
      window.confirm(
        `Tem certeza que deseja ${acao === "suspenso" ? "suspender" : "reativar"} este motorista?`
      )
    ) {
      setMotoristas((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: novoStatus } : m))
      );
      notif.sucesso(`Motorista ${acao} com sucesso`);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'online':
      case 'disponivel':
        return 'success';
      case 'ocupado':
        return 'warning';
      case 'offline':
        return 'default';
      case 'suspenso':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout titulo="Gestão de Motoristas">
      {/* Statistics Cards - AZUL UNIFORME */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Users size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-blue-100 text-sm">Motoristas</p>
            </div>
          </div>
          <p className="text-blue-100">Total da Equipe</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.online}</p>
              <p className="text-blue-100 text-sm">Em Serviço</p>
            </div>
          </div>
          <p className="text-blue-100">Motoristas Online</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.disponivel}</p>
              <p className="text-blue-100 text-sm">Prontos</p>
            </div>
          </div>
          <p className="text-blue-100">Disponíveis</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.suspensos}</p>
              <p className="text-blue-100 text-sm">Suspensos</p>
            </div>
          </div>
          <p className="text-blue-100">Motoristas Suspensos</p>
        </div>
      </div>

      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Equipe de Motoristas</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie todos os condutores da sua frota</p>
          </div>
          <Link href="/motoristas/novo">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <Plus size={20} />
              Novo Motorista
            </Button>
          </Link>
        </div>

        {/* Filters Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              className="pl-4 pr-10 py-2.5 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500 w-full text-sm"
              value={busca}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as StatusMotorista | "");
                setPagina(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white cursor-pointer h-[42px]">
              <option value="">Todos os Status</option>
              <option value="online">Online</option>
              <option value="disponivel">Disponível</option>
              <option value="ocupado">Ocupado</option>
              <option value="offline">Offline</option>
              <option value="suspenso">Suspenso</option>
            </select>
          </div>

          {/* Min Rating */}
          <div className="md:col-span-2">
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minNota}
              onChange={(e) => {
                setMinNota(parseFloat(e.target.value || "0"));
                setPagina(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]"
              placeholder="Avaliação ≥"
            />
          </div>

          {/* Data campos vazios por agora */}
          <div className="md:col-span-2">
            <input
              type="date"
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]"
              placeholder="Data início"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="date"
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
              onChange={(e) => setSortKey(e.target.value as keyof Motorista)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value="nome">Ordenar: Nome</option>
              <option value="dataInicio">Ordenar: Data Início</option>
              <option value="avaliacao">Ordenar: Avaliação</option>
              <option value="ganhoTotal">Ordenar: Ganho Total</option>
              <option value="status">Ordenar: Status</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div className="md:col-span-2">
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as any)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
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
                    checked={cols.email}
                    onChange={(e) => setCols({ ...cols, email: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.telefone}
                    onChange={(e) => setCols({ ...cols, telefone: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Telefone
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.viatura}
                    onChange={(e) => setCols({ ...cols, viatura: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Viatura
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Motorista
                  </th>
                  {cols.email && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  {cols.telefone && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Telefone
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Performance
                  </th>
                  {cols.viatura && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Viatura
                    </th>
                  )}
                  {cols.status && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dadosPagina.map((motorista) => (
                  <tr key={motorista.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {motorista.fotoPerfil ? (
                            <img 
                              src={motorista.fotoPerfil} 
                              alt={motorista.nome}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                              {motorista.nome.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{motorista.nome}</p>
                          {motorista.nomeApelido && (
                            <p className="text-xs text-gray-500">"{motorista.nomeApelido}"</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {cols.email && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{motorista.email}</span>
                      </td>
                    )}
                    {cols.telefone && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{formatarTelefone(motorista.telefone)}</span>
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                          <TrendingUp size={12} />
                          {motorista.numeroViagens} viagens
                        </span>
                        <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium">
                          <Star size={12} className="fill-yellow-500" />
                          {motorista.pontuacao.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    {cols.viatura && (
                      <td className="px-6 py-4">
                        {motorista.viaturaModelo ? (
                          <div className="flex items-center gap-2">
                            <Car size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{motorista.viaturaModelo}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Não alocado</span>
                        )}
                      </td>
                    )}
                    {cols.status && (
                      <td className="px-6 py-4">
                        <Badge variant={getStatusBadgeVariant(motorista.status) as any}>
                          {motorista.status.charAt(0).toUpperCase() + motorista.status.slice(1)}
                        </Badge>
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/motoristas/${motorista.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver perfil"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/motoristas/editar/${motorista.id}`}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleSuspendMotorista(motorista.id, motorista.status)}
                          className={`p-2 rounded-lg transition-colors ${
                            motorista.status === 'suspenso'
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-orange-600 hover:bg-orange-50'
                          }`}
                          title={motorista.status === 'suspenso' ? 'Reativar' : 'Suspender'}
                        >
                          {motorista.status === 'suspenso' ? (
                            <CheckCircle size={18} />
                          ) : (
                            <Ban size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {dadosPagina.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-16 text-center">
                      <User size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">Nenhum motorista encontrado</p>
                      <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros de busca</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {dadosPagina.map((motorista) => (
            <div
              key={motorista.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  {motorista.fotoPerfil ? (
                    <img 
                      src={motorista.fotoPerfil} 
                      alt={motorista.nome}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <User size={32} className="text-blue-600" />
                    </div>
                  )}
                </div>
                
                <div className="absolute top-3 right-3">
                  <Badge variant={getStatusBadgeVariant(motorista.status) as any} className="shadow-lg">
                    {motorista.status.charAt(0).toUpperCase() + motorista.status.slice(1)}
                  </Badge>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900 text-sm">{motorista.pontuacao.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-5 pt-14">
                <h3 className="font-bold text-lg text-gray-900 text-center mb-1">
                  {motorista.nome}
                </h3>
                {motorista.nomeApelido && (
                  <p className="text-sm text-gray-500 text-center mb-4">
                    "{motorista.nomeApelido}"
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Phone size={14} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700">{formatarTelefone(motorista.telefone)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Mail size={14} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700 truncate">{motorista.email}</span>
                  </div>

                  {motorista.viaturaModelo && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-blue-50 p-1.5 rounded-lg">
                        <Car size={14} className="text-blue-600" />
                      </div>
                      <span className="text-gray-700">{motorista.viaturaModelo}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Viagens</p>
                    <p className="text-xl font-bold text-gray-900">{motorista.numeroViagens}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Ganho Total</p>
                    <p className="text-sm font-bold text-gray-900">{formatarMoeda(motorista.ganhoTotal)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/motoristas/${motorista.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    Ver Perfil
                  </Link>
                  <button
                    onClick={() => handleSuspendMotorista(motorista.id, motorista.status)}
                    className={`p-2.5 rounded-lg transition-colors ${
                      motorista.status === 'suspenso'
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-orange-600 hover:bg-orange-50'
                    }`}
                    title={motorista.status === 'suspenso' ? 'Reativar' : 'Suspender'}
                  >
                    {motorista.status === 'suspenso' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <Ban size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {dadosPagina.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <User size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Nenhum motorista encontrado</p>
              <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {ordenados.length > 0 && totalPaginas > 1 && (
        <div className="flex justify-center">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
            carregando={false}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Motoristas;
