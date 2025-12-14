/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Edit, Eye, Search, Ban, CheckCircle, Filter } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { Motorista, StatusMotorista } from "@/types/motorista";
import DriverStats from "@/components/motoristas/DriverStats";
import { mockMotoristas } from "@/data/mockMotoristas";
import { formatarTelefone, formatarMoeda } from "@/lib/formatters";

const Motoristas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusMotorista | "">("");
  const [minNota, setMinNota] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortKey, setSortKey] = useState<keyof Motorista>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [cols, setCols] = useState({
    email: true,
    telefone: true,
    status: true,
    avaliacao: true,
  });

  const [motoristas, setMotoristas] = useState<Motorista[]>(mockMotoristas);
  const [detalhesAberto, setDetalhesAberto] = useState<string | null>(null);

  const toggleDetalhes = (id: string) => {
    setDetalhesAberto(detalhesAberto === id ? null : id);
  };
  const notif = useNotification();

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
      const toDate = (s?: string) => (s ? new Date(s) : null);
      const dataInicioMotorista = toDate(m.dataInicio);
      const di = toDate(dataInicio);
      const df = toDate(dataFim);
      const matchData = !dataInicioMotorista || ((!di || dataInicioMotorista >= di) && (!df || dataInicioMotorista <= df));
      
      return matchBusca && matchStatus && matchNota && matchData;
    });
  }, [motoristas, busca, status, minNota, dataInicio, dataFim]);

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

  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / pageSize));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const dadosPagina = ordenados.slice(
    (paginaAtual - 1) * pageSize,
    paginaAtual * pageSize
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

  return (
    <MainLayout titulo="Gestão de Motoristas">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
         <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/motoristas/novo" className="w-full sm:w-auto">
              <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <Plus size={20} />
                Novo Motorista
              </Button>
            </Link>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6">
        <DriverStats />
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4">
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as StatusMotorista | "");
                setPagina(1);
              }}
              className="form-input w-full h-[42px]">
              <option value="">Todos Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="suspenso">Suspenso</option>
              <option value="disponivel">Disponível</option>
              <option value="ocupado">Ocupado</option>
            </select>
          </div>

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
              className="form-input w-full h-[42px]"
              placeholder="Avaliação ≥"
              title="Avaliação mínima"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => {
                setDataInicio(e.target.value);
                setPagina(1);
              }}
              className="form-input w-full h-[42px]"
              title="Data início"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="date"
              value={dataFim}
              onChange={(e) => {
                setDataFim(e.target.value);
                setPagina(1);
              }}
              className="form-input w-full h-[42px]"
              title="Data fim"
            />
          </div>
        </div>

        {/* Advanced Filters Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-4 pt-4 border-t border-gray-100">
          <div className="md:col-span-3">
            <select
              value={sortKey as string}
              onChange={(e) => setSortKey(e.target.value as keyof Motorista)}
              className="form-input w-full h-[42px]">
              <option value="nome">Ordenar: Nome</option>
              <option value="dataInicio">Ordenar: Data Início</option>
              <option value="avaliacao">Ordenar: Avaliação</option>
              <option value="ganhoTotal">Ordenar: Ganho Total</option>
              <option value="status">Ordenar: Status</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as any)}
              className="form-input w-full h-[42px]">
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className="md:col-span-2">
             <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPagina(1);
              }}
              className="form-input w-full h-[42px]">
              <option value={10}>10 por página</option>
              <option value={25}>25 por página</option>
              <option value={50}>50 por página</option>
            </select>
          </div>

          <div className="md:col-span-5 flex justify-end">
            <div className="relative group inline-block">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-[42px]">
                <Filter size={18} />
                Colunas
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover:block z-10">
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.email}
                    onChange={(e) =>
                      setCols({ ...cols, email: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.telefone}
                    onChange={(e) =>
                      setCols({ ...cols, telefone: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  Telefone
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.status}
                    onChange={(e) =>
                      setCols({ ...cols, status: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  Status
                </label>
                <label className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cols.avaliacao}
                    onChange={(e) =>
                      setCols({ ...cols, avaliacao: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  Avaliação
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Tabela */}
      {dadosPagina.length === 0 ? (
        <div className="card p-8 text-center text-gray-600 flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <p className="text-lg font-medium">Nenhum motorista encontrado</p>
          <p className="text-sm">Tente ajustar seus filtros de busca</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    {cols.email && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    )}
                    {cols.telefone && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    )}
                     {cols.status && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                     )}
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dadosPagina.map((motorista) => (
                    <React.Fragment key={motorista.id}>
                      <tr className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 text-sm text-gray-500">
                          #{motorista.id.substring(0, 6)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
                              {motorista.nome.charAt(0)}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">
                                {motorista.nome}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{motorista.avaliacao.toFixed(1)}</span>
                                <span className="text-yellow-400">★</span>
                              </div>
                            </div>
                          </div>
                        </td>
                         {cols.email && (
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {motorista.email}
                        </td>
                         )}
                         {cols.telefone && (
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatarTelefone(motorista.telefone)}
                        </td>
                         )}
                         {cols.status && (
                        <td className="px-4 py-3">
                          <Badge variant={motorista.status as any}>
                            {motorista.status}
                          </Badge>
                        </td>
                         )}
                        <td className="px-4 py-3 text-sm text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => toggleDetalhes(motorista.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium"
                              title="Ver detalhes">
                              {detalhesAberto === motorista.id
                                ? "Ocultar"
                                : "Ver detalhes"}
                            </button>
                            <Link
                              href={`/motoristas/editar/${motorista.id}`}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                              title="Editar">
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() =>
                                handleSuspendMotorista(
                                  motorista.id,
                                  motorista.status
                                )
                              }
                              className={`p-2 rounded-full transition-colors ${
                                motorista.status === "suspenso"
                                  ? "text-green-600 hover:bg-green-50"
                                  : "text-orange-600 hover:bg-orange-50"
                              }`}
                              title={
                                motorista.status === "suspenso"
                                  ? "Reativar"
                                  : "Suspender"
                              }>
                              {motorista.status === "suspenso" ? (
                                <CheckCircle size={18} />
                              ) : (
                                <Ban size={18} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {detalhesAberto === motorista.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={cols.status ? 7 : 6} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Viatura
                                </h4>
                                <p className="text-sm text-gray-900">
                                  {motorista.viaturaModelo || (
                                    <span className="text-gray-400">
                                      Não informado
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Viagens
                                </h4>
                                <p className="text-sm font-medium text-gray-900">
                                  {motorista.numeroViagens}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Avaliação
                                </h4>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    {motorista.avaliacao.toFixed(1)}
                                  </span>
                                  <span className="text-yellow-400">★</span>
                                  <span className="text-xs text-gray-500 ml-1">
                                    (média)
                                  </span>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Ganho Total
                                </h4>
                                <p className="text-sm font-medium text-teal-600">
                                  {formatarMoeda(motorista.ganhoTotal)}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Ganho do Mês
                                </h4>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatarMoeda(motorista.ganhoMes)}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Data de Início
                                </h4>
                                <p className="text-sm text-gray-900">
                                  {new Date(
                                    motorista.dataInicio
                                  ).toLocaleDateString("pt-AO")}
                                </p>
                              </div>
                              <div className="md:col-span-2">
                                <Link
                                  href={`/motoristas/${motorista.id}`}
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                                  <Eye size={16} className="mr-1" />
                                  Ver perfil completo
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPaginas > 1 && (
            <div className="mt-6">
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
    </MainLayout>
  );
};

export default Motoristas;
