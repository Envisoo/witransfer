/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Eye, Search, Ban, CheckCircle } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { Motorista, StatusMotorista } from "@/types/motorista";
import { formatarTelefone, formatarMoeda } from "@/lib/formatters";
import { mockMotoristas } from "@/data/mockMotoristas";

const Motoristas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusMotorista | "">("");
  const [motoristas, setMotoristas] = useState<Motorista[]>(mockMotoristas);
  const [motoristasFiltrados, setMotoristasFiltrados] =
    useState<Motorista[]>(mockMotoristas);
  const [detalhesAberto, setDetalhesAberto] = useState<string | null>(null);

  const toggleDetalhes = (id: string) => {
    setDetalhesAberto(detalhesAberto === id ? null : id);
  };
  const notif = useNotification();
  const itensPorPagina = 10;

  useEffect(() => {
    let resultado = motoristas;

    if (busca) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(
        (m) =>
          m.nome.toLowerCase().includes(termo) ||
          m.email.toLowerCase().includes(termo) ||
          m.telefone.includes(termo)
      );
    }

    if (statusFiltro) {
      resultado = resultado.filter((m) => m.status === statusFiltro);
    }

    setMotoristasFiltrados(resultado);
    setPagina(1);
  }, [busca, statusFiltro, motoristas]);

  const totalPaginas = Math.ceil(motoristasFiltrados.length / itensPorPagina);
  const dadosPagina = motoristasFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Motoristas</h1>
          <p className="text-gray-600">
            Gerenciar cadastro e dados dos motoristas
          </p>
        </div>
        <Link href="/motoristas/novo" className="w-full md:w-auto">
          <Button className="flex items-center justify-center gap-2 w-full md:w-auto">
            <Plus size={20} />
            Novo Motorista
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              icone={<Search size={20} className="text-gray-400" />}
              className="w-full"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={statusFiltro}
              onChange={(e) =>
                setStatusFiltro(e.target.value as StatusMotorista | "")
              }
              className="form-input w-full h-[42px]">
              <option value="">Todos os Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="suspenso">Suspenso</option>
              <option value="disponivel">Disponível</option>
              <option value="ocupado">Ocupado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      {motoristasFiltrados.length === 0 ? (
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dadosPagina.map((motorista) => (
                    <React.Fragment key={motorista.id}>
                      <tr className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {motorista.id.substring(0, 6)}...
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
                              {motorista.nome.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {motorista.nome}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {motorista.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatarTelefone(motorista.telefone)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={motorista.status as any}>
                            {motorista.status}
                          </Badge>
                        </td>
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
                          <td colSpan={6} className="px-4 py-4">
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
                paginaAtual={pagina}
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
