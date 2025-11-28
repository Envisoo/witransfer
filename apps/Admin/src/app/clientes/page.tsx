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
  MoreVertical,
  CheckSquare,
  Square,
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
import ClientStats from "@/components/clientes/ClientStats";
import AdvancedClientDrawer from "@/components/clientes/AdvancedClientDrawer";
import { generateClientAdvancedData } from "@/lib/clienteMockData";
import { ClientAdvanced } from "@/types/clienteAvancado";

const Clientes = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusCliente | "">("");
  const [minNota, setMinNota] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortKey, setSortKey] = useState<keyof Cliente>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [cols, setCols] = useState({
    contato: true,
    viagens: true,
    status: true,
    dataCadastro: true,
  });
  const { sucesso } = useNotification();
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
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
      id: "2",
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
      const toDate = (s?: string) => (s ? new Date(s) : null);
      const cad = toDate(c.dataCadastro);
      const di = toDate(dataInicio);
      const df = toDate(dataFim);
      const matchData = !cad || ((!di || cad >= di) && (!df || cad <= df));
      return matchBusca && matchStatus && matchNota && matchData;
    });
  }, [clientes, busca, status, minNota, dataInicio, dataFim]);

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

  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / pageSize));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const itensPagina = ordenados.slice(
    (paginaAtual - 1) * pageSize,
    paginaAtual * pageSize
  );

  const [visualizando, setVisualizando] = useState<Cliente | null>(null);
  const [visualizandoAvancado, setVisualizandoAvancado] = useState<ClientAdvanced | null>(null);
  const [editando, setEditando] = useState<Cliente | null>(null);

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

  const handleSalvarEdicao = (dados: Partial<Cliente>) => {
    if (!editando) return;
    setClientes((lista) =>
      lista.map((c) =>
        c.id === editando.id
          ? ({
              ...c,
              ...dados,
              ultimaAtualizacao: new Date().toISOString(),
            } as Cliente)
          : c
      )
    );
    setEditando(null);
    sucesso("Cliente atualizado");
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === itensPagina.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(itensPagina.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((cId) => cId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  return (
    <MainLayout titulo="Gestão de Clientes">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">
            Gerencie sua base de clientes e visualize métricas
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const headers = [
                "id",
                "nome",
                "email",
                "telefone",
                "status",
                "dataCadastro",
                "numeroViagens",
                "avaliacaoMedia",
              ];
              const rows = ordenados.map((c) =>
                headers.map((h) => (c as any)[h] ?? "").join(",")
              );
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
            <Button className="flex items-center gap-2 shadow-lg shadow-teal-500/20">
              <Plus size={20} />
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <ClientStats />

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as StatusCliente | "");
                  setPagina(1);
                }}
                className="pl-9 pr-8 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white appearance-none cursor-pointer">
                <option value="">Todos Status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="suspenso">Suspenso</option>
              </select>
            </div>
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
              className="w-28 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Nota ≥"
              title="Nota mínima"
            />
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => {
                setDataInicio(e.target.value);
                setPagina(1);
              }}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              title="Data início"
            />
            <input
              type="date"
              value={dataFim}
              onChange={(e) => {
                setDataFim(e.target.value);
                setPagina(1);
              }}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              title="Data fim"
            />
            <select
              value={sortKey as string}
              onChange={(e) => setSortKey(e.target.value as keyof Cliente)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option value="nome">Ordenar: Nome</option>
              <option value="dataCadastro">Ordenar: Cadastro</option>
              <option value="numeroViagens">Ordenar: Viagens</option>
              <option value="avaliacaoMedia">Ordenar: Avaliação</option>
              <option value="status">Ordenar: Status</option>
            </select>
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPagina(1);
              }}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option value={10}>10 por página</option>
              <option value={25}>25 por página</option>
              <option value={50}>50 por página</option>
            </select>
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                Colunas
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover:block z-10">
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={cols.contato}
                    onChange={(e) =>
                      setCols({ ...cols, contato: e.target.checked })
                    }
                  />{" "}
                  Contato
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={cols.viagens}
                    onChange={(e) =>
                      setCols({ ...cols, viagens: e.target.checked })
                    }
                  />{" "}
                  Viagens
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={cols.status}
                    onChange={(e) =>
                      setCols({ ...cols, status: e.target.checked })
                    }
                  />{" "}
                  Status
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={cols.dataCadastro}
                    onChange={(e) =>
                      setCols({ ...cols, dataCadastro: e.target.checked })
                    }
                  />{" "}
                  Cadastro
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar (Visible when items selected) */}
        {selectedClients.length > 0 && (
          <div className="bg-teal-50 px-6 py-3 flex items-center justify-between border-b border-teal-100">
            <span className="text-sm font-medium text-teal-800">
              {selectedClients.length} clientes selecionados
            </span>
            <div className="flex gap-3">
              <button className="text-xs font-medium text-red-600 hover:text-red-700 bg-white px-3 py-1.5 rounded border border-red-200 hover:bg-red-50 transition-colors">
                Excluir Selecionados
              </button>
              <button className="text-xs font-medium text-gray-600 hover:text-gray-700 bg-white px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
                Exportar Selecionados
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4 w-10">
                  <button
                    onClick={toggleSelectAll}
                    className="text-gray-400 hover:text-teal-600">
                    {selectedClients.length === itensPagina.length &&
                    itensPagina.length > 0 ? (
                      <CheckSquare size={18} className="text-teal-600" />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4">Cliente</th>
                {cols.contato && <th className="px-6 py-4">Contato</th>}
                {cols.viagens && (
                  <th className="px-6 py-4 text-center">Viagens</th>
                )}
                {cols.status && (
                  <th className="px-6 py-4 text-center">Status</th>
                )}
                {cols.dataCadastro && (
                  <th className="px-6 py-4">Data Cadastro</th>
                )}
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {itensPagina.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-medium text-gray-500">
                        Nenhum cliente encontrado
                      </p>
                      <p className="text-sm">
                        Tente ajustar seus filtros ou adicione um novo cliente.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                itensPagina.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className={`group transition-colors hover:bg-gray-50 ${selectedClients.includes(cliente.id) ? "bg-teal-50/30" : ""}`}>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleSelect(cliente.id)}
                        className="text-gray-400 hover:text-teal-600">
                        {selectedClients.includes(cliente.id) ? (
                          <CheckSquare size={18} className="text-teal-600" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 border-2 border-white shadow-sm group-hover:border-teal-100 transition-colors">
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
                    {cols.contato && (
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-sm">
                          <span className="text-gray-900">{cliente.email}</span>
                          <span className="text-gray-500 text-xs">
                            {formatarTelefone(cliente.telefone)}
                          </span>
                        </div>
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setVisualizando(cliente);
                            setVisualizandoAvancado(generateClientAdvancedData(cliente));
                          }}
                          className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Ver Detalhes">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditando(cliente)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar">
                          <Edit size={18} />
                        </button>
                        <div className="relative group/more">
                          <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={18} />
                          </button>
                          {/* Dropdown Menu (Simple implementation) */}
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover/more:block z-10">
                            <button
                              onClick={() => handleSuspenderCliente(cliente.id)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Ban size={14} />
                              {cliente.status === "suspenso"
                                ? "Reativar"
                                : "Suspender"}
                            </button>
                            <button
                              onClick={() => handleDeleteCliente(cliente.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <Trash2 size={14} />
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="border-t border-gray-100 p-4 bg-gray-50/50">
          {totalPaginas > 1 && (
            <Paginacao
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onMudarPagina={setPagina}
              carregando={false}
            />
          )}
        </div>
      </div>

      {/* Advanced Drawer Visualizar */}
      <AdvancedClientDrawer
        cliente={visualizando}
        clienteAvancado={visualizandoAvancado}
        onClose={() => {
          setVisualizando(null);
          setVisualizandoAvancado(null);
        }}
        onEdit={(c) => {
          setEditando(c);
          setVisualizando(null);
          setVisualizandoAvancado(null);
        }}
      />

      {/* Modal Editar (Mantido simples por enquanto, pode ser melhorado depois) */}
      {editando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Editar Cliente
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);
                handleSalvarEdicao({
                  nome: String(fd.get("nome") || ""),
                  email: String(fd.get("email") || ""),
                  telefone: String(fd.get("telefone") || ""),
                  dataNascimento: String(fd.get("dataNascimento") || ""),
                  endereco: String(fd.get("endereco") || ""),
                  status: String(
                    fd.get("status") || editando.status
                  ) as StatusCliente,
                });
              }}
              className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <Input
                    name="nome"
                    defaultValue={editando.nome}
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <Input
                    name="email"
                    defaultValue={editando.email}
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <Input
                    name="telefone"
                    defaultValue={editando.telefone}
                    placeholder="Telefone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Nascimento
                  </label>
                  <Input
                    name="dataNascimento"
                    defaultValue={editando.dataNascimento}
                    placeholder="Data de Nascimento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editando.status}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="suspenso">Suspenso</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <Input
                    name="endereco"
                    defaultValue={editando.endereco}
                    placeholder="Endereço"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setEditando(null)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Clientes;
