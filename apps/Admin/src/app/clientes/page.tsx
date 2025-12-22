/** @format */

"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Ban,
  Download,
  Filter,
  CheckSquare,
  User,
  Users,
  UserCheck,
  UserPlus,
  Star,
  Phone,
  Mail,
  MapPin,
  X,
  LayoutGrid,
  List,
 
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { Cliente, StatusCliente } from "@/types/cliente";
import { formatarData, formatarTelefone } from "@/lib/formatters";

const Clientes = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusCliente | "">("");
  const [minNota, setMinNota] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortKey, setSortKey] = useState<keyof Cliente>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // COMEÇA EM LISTA
  const [cols, setCols] = useState({
    email: true,
    telefone: true,
    viagens: true,
    status: true,
    dataCadastro: true,
  });
  const { sucesso } = useNotification();

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "Ana Pereira",
      email: "ana@email.com",
      telefone: "924111222",
      dataNascimento: "1988-11-22",
      endereco: "Maianga, Luanda",
      status: "ativo",
      dataCadastro: "2023-11-05",
      numeroViagens: 34,
      avaliacaoMedia: 4.3,
      ultimaAtualizacao: new Date().toISOString(),
    },
    {
      id: "2",
      nome: "Carlos Silva",
      email: "carlos@email.com",
      telefone: "923456789",
      dataNascimento: "1990-03-10",
      endereco: "Talatona, Luanda",
      status: "ativo",
      dataCadastro: "2024-01-12",
      numeroViagens: 56,
      avaliacaoMedia: 4.6,
      ultimaAtualizacao: new Date().toISOString(),
    },
    {
      id: "3",
      nome: "João Neto",
      email: "joao@email.com",
      telefone: "922222333",
      dataNascimento: "1995-07-08",
      endereco: "Benfica, Luanda",
      status: "inativo",
      dataCadastro: "2023-08-19",
      numeroViagens: 12,
      avaliacaoMedia: 3.9,
      ultimaAtualizacao: new Date().toISOString(),
    },
    {
      id: "4",
      nome: "Maria Costa",
      email: "maria@email.com",
      telefone: "926666777",
      dataNascimento: "1992-04-15",
      endereco: "Samba, Luanda",
      status: "suspenso",
      dataCadastro: "2024-02-21",
      numeroViagens: 22,
      avaliacaoMedia: 4.1,
      ultimaAtualizacao: new Date().toISOString(),
    },
    {
      id: "5",
      nome: "Pedro Santos",
      email: "pedro@email.com",
      telefone: "933444555",
      dataNascimento: "1985-01-30",
      endereco: "Kilamba, Luanda",
      status: "ativo",
      dataCadastro: "2024-03-10",
      numeroViagens: 8,
      avaliacaoMedia: 4.8,
      ultimaAtualizacao: new Date().toISOString(),
    },
  ]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return clientes.filter((c) => {
      const matchBusca =
        !termo ||
        c.nome.toLowerCase().includes(termo) ||
        c.email?.toLowerCase().includes(termo) ||
        c.telefone.includes(termo);
      const matchStatus = !status || c.status === status;
      const matchNota = (c.avaliacaoMedia ?? 0) >= (minNota || 0);
      return matchBusca && matchStatus && matchNota;
    });
  }, [clientes, busca, status, minNota]);

  const ordenados = useMemo(() => {
    const arr = [...filtrados];
    arr.sort((a, b) => {
      const av: any = a[sortKey];
      const bv: any = b[sortKey];
      let comp = 0;
      if (sortKey === "dataCadastro") {
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
    total: clientes.length,
    ativos: clientes.filter(c => c.status === 'ativo').length,
    novos: clientes.filter(c => {
      const cadastro = new Date(c.dataCadastro);
      const mesAtual = new Date();
      return cadastro.getMonth() === mesAtual.getMonth() && 
             cadastro.getFullYear() === mesAtual.getFullYear();
    }).length,
    suspensos: clientes.filter(c => c.status === 'suspenso').length,
  };

  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / pageSize));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const itensPagina = ordenados.slice(
    (paginaAtual - 1) * pageSize,
    paginaAtual * pageSize
  );

  const handleDeleteCliente = (id: string) => {
    if (window.confirm("Tem certeza que deseja eliminar este cliente?")) {
      setClientes((lista) => lista.filter((c) => c.id !== id));
      sucesso("Cliente eliminado com sucesso");
    }
  };

  const handleSuspenderCliente = (id: string) => {
    setClientes((lista) =>
      lista.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "suspenso" ? "ativo" : "suspenso" }
          : c
      )
    );
    sucesso("Status atualizado");
  };

  return (
    <MainLayout titulo="Gestão de Clientes">
      {/* Statistics Cards - AZUL UNIFORME */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Users size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-blue-100 text-sm">Clientes</p>
            </div>
          </div>
          <p className="text-blue-100">Total de Clientes</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <UserCheck size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.ativos}</p>
              <p className="text-blue-100 text-sm">Ativos</p>
            </div>
          </div>
          <p className="text-blue-100">Clientes Ativos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <UserPlus size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.novos}</p>
              <p className="text-blue-100 text-sm">Este Mês</p>
            </div>
          </div>
          <p className="text-blue-100">Novos Clientes</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Ban size={24} />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.suspensos}</p>
              <p className="text-blue-100 text-sm">Suspensos</p>
            </div>
          </div>
          <p className="text-blue-100">Clientes Suspensos</p>
        </div>
      </div>

      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Base de Clientes</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie todos os clientes cadastrados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const headers = ["id", "nome", "email", "telefone", "status", "dataCadastro", "numeroViagens", "avaliacaoMedia"];
                const rows = ordenados.map((c) => headers.map((h) => (c as any)[h] ?? "").join(","));
                const csv = [headers.join(","), ...rows].join("\n");
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "clientes.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={18} />
              Exportar CSV
            </button>
            <Link href="/clientes/novo">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0">
                <Plus size={20} />
                Novo Cliente
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="pl-4 pr-10 py-2.5 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500 w-full text-sm"
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
                setStatus(e.target.value as StatusCliente | "");
                setPagina(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white cursor-pointer h-[42px]">
              <option value="">Todos Status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
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
              onChange={(e) => setSortKey(e.target.value as keyof Cliente)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[42px]">
              <option value="nome">Ordenar: Nome</option>
              <option value="dataCadastro">Ordenar: Cadastro</option>
              <option value="numeroViagens">Ordenar: Viagens</option>
              <option value="avaliacaoMedia">Ordenar: Avaliação</option>
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
                    checked={cols.viagens}
                    onChange={(e) => setCols({ ...cols, viagens: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Viagens
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
                    checked={cols.dataCadastro}
                    onChange={(e) => setCols({ ...cols, dataCadastro: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Cadastro
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
        <>
          {itensPagina.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-600 flex flex-col items-center justify-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-lg font-medium">Nenhum cliente encontrado</p>
              <p className="text-sm">Tente ajustar seus filtros ou adicione um novo cliente.</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full whitespace-nowrap">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Cliente
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
                        {cols.viagens && (
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Viagens
                          </th>
                        )}
                        {cols.status && (
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                        )}
                        {cols.dataCadastro && (
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Data Cadastro
                          </th>
                        )}
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {itensPagina.map((cliente) => (
                        <tr
                          key={cliente.id}
                          className="hover:bg-blue-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white border-2 border-white shadow-sm">
                                {cliente.nome.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {cliente.nome}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <span>{cliente.avaliacaoMedia.toFixed(1)}</span>
                                  <span className="text-yellow-400">★</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          {cols.email && (
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {cliente.email}
                            </td>
                          )}
                          {cols.telefone && (
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {formatarTelefone(cliente.telefone)}
                            </td>
                          )}
                          {cols.viagens && (
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {cliente.numeroViagens}
                              </span>
                            </td>
                          )}
                          {cols.status && (
                            <td className="px-6 py-4 text-center">
                              <Badge variant={cliente.status as any}>
                                {cliente.status}
                              </Badge>
                            </td>
                          )}
                          {cols.dataCadastro && (
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {formatarData(cliente.dataCadastro)}
                            </td>
                          )}
                          <td className="px-6 py-4 text-sm text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`/clientes/${cliente.id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Ver Detalhes">
                                <Eye size={18} />
                              </Link>
                              <Link
                                href={`/clientes/${cliente.id}?editar=true`}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Editar">
                                <Edit size={18} />
                              </Link>

                              <button
                                onClick={() => handleSuspenderCliente(cliente.id)}
                                className={`p-2 rounded-lg transition-colors ${cliente.status === "suspenso" ? "text-green-600 hover:bg-green-50" : "text-orange-600 hover:bg-orange-50"}`}
                                title={
                                  cliente.status === "suspenso"
                                    ? "Reativar"
                                    : "Suspender"
                                }>
                                {cliente.status === "suspenso" ? (
                                  <CheckSquare size={18} />
                                ) : (
                                  <Ban size={18} />
                                )}
                              </button>

                              <button
                                onClick={() => handleDeleteCliente(cliente.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir">
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

              {totalPaginas > 1 && (
                <div className="flex justify-center">
                  <Paginacao
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    onMudarPagina={setPagina}
                    carregando={false}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {itensPagina.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                    <User size={32} className="text-blue-600" />
                  </div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <Badge variant={cliente.status as any} className="shadow-lg">
                    {cliente.status.charAt(0).toUpperCase() + cliente.status.slice(1)}
                  </Badge>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900 text-sm">{cliente.avaliacaoMedia.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-5 pt-14">
                <h3 className="font-bold text-lg text-gray-900 text-center mb-4">
                  {cliente.nome}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Phone size={14} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700">{formatarTelefone(cliente.telefone)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Mail size={14} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700 truncate">{cliente.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <MapPin size={14} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700">{cliente.endereco}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Viagens</p>
                    <p className="text-xl font-bold text-gray-900">{cliente.numeroViagens}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Cadastro</p>
                    <p className="text-sm font-bold text-gray-900">{formatarData(cliente.dataCadastro)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    Ver Perfil
                  </Link>
                  <button
                    onClick={() => handleSuspenderCliente(cliente.id)}
                    className={`p-2.5 rounded-lg transition-colors ${
                      cliente.status === 'suspenso'
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-orange-600 hover:bg-orange-50'
                    }`}
                    title={cliente.status === 'suspenso' ? 'Reativar' : 'Suspender'}
                  >
                    {cliente.status === 'suspenso' ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Ban size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {itensPagina.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <User size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Nenhum cliente encontrado</p>
              <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Clientes;
