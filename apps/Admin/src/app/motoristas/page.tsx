/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Edit, Eye, Trash2, Search } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useFetch } from "@/hooks/useFetch";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import motoristasService from "@/services/motoristasService";
import { MotoristaResponse, StatusMotorista } from "@/types/motorista";
import { formatarTelefone, formatarMoeda } from "@/lib/formatters";

const Motoristas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusMotorista | "">("");
  const notif = useNotification();

  const { dados, carregando, erro, refetch } = useFetch<MotoristaResponse>(
    `/motoristas?pagina=${pagina}&limite=10${busca ? `&busca=${busca}` : ""}${status ? `&status=${status}` : ""}`,
    { autoFetch: true }
  );

  const handleDeleteMotorista = async (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este motorista?")) {
      try {
        await motoristasService.deletar(id);
        notif.sucesso("Motorista deletado com sucesso");
        refetch();
      } catch (erro: any) {
        notif.erro(erro.message || "Erro ao deletar motorista");
      }
    }
  };

  return (
    <MainLayout titulo="Gestão de Motoristas">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Motoristas</h1>
          <p className="text-gray-600">Gerenciar motoristas do sistema</p>
        </div>
        <Link href="/motoristas/novo">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Novo Motorista
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar motorista..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
          icone={<Search size={18} />}
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as StatusMotorista | "");
            setPagina(1);
          }}
          className="form-input">
          <option value="">Todos os Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="suspenso">Suspenso</option>
        </select>
      </div>

      {/* Tabela */}
      {carregando ? (
        <LoadingSpinner />
      ) : erro ? (
        <div className="card p-6 text-center text-red-600">
          <p>{erro}</p>
        </div>
      ) : !dados || dados.data.length === 0 ? (
        <div className="card p-6 text-center text-gray-600">
          <p>Nenhum motorista encontrado</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Viatura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Viagens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Avaliação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Ganho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.data.map((motorista) => (
                  <tr
                    key={motorista.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {motorista.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatarTelefone(motorista.telefone)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {motorista.viaturaModelo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {motorista.numeroViagens}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {motorista.avaliacao.toFixed(1)} ⭐
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatarMoeda(motorista.ganhoTotal)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={motorista.status as any}>
                        {motorista.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-center space-x-2">
                      <Link
                        href={`/motoristas/${motorista.id}`}
                        className="text-blue-600 hover:text-blue-700">
                        <Eye size={18} className="inline" />
                      </Link>
                      <Link
                        href={`/motoristas/${motorista.id}`}
                        className="text-yellow-600 hover:text-yellow-700">
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDeleteMotorista(motorista.id)}
                        className="text-red-600 hover:text-red-700">
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {dados.totalPaginas > 1 && (
            <Paginacao
              paginaAtual={pagina}
              totalPaginas={dados.totalPaginas}
              onMudarPagina={setPagina}
              carregando={carregando}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Motoristas;
