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
import viaturasService from "@/services/viaturasService";
import { ViaturaResponse, StatusViatura } from "@/types/viatura";
import { formatarData } from "@/lib/formatters";

const Viaturas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusViatura | "">("");
  const notif = useNotification();

  const { dados, carregando, erro, refetch } = useFetch<ViaturaResponse>(
    `/viaturas?pagina=${pagina}&limite=10${busca ? `&busca=${busca}` : ""}${status ? `&status=${status}` : ""}`,
    { autoFetch: true }
  );

  const handleDeleteViatura = async (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar esta viatura?")) {
      try {
        await viaturasService.deletar(id);
        notif.sucesso("Viatura deletada com sucesso");
        refetch();
      } catch (erro: any) {
        notif.erro(erro.message || "Erro ao deletar viatura");
      }
    }
  };

  return (
    <MainLayout titulo="Gestão de Viaturas">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Viaturas</h1>
          <p className="text-gray-600">Gerenciar frota de viaturas</p>
        </div>
        <Link href="/viaturas/novo">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Nova Viatura
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar viatura..."
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
            setStatus(e.target.value as StatusViatura | "");
            setPagina(1);
          }}
          className="form-input">
          <option value="">Todos os Status</option>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
          <option value="manutencao">Manutenção</option>
          <option value="inspecao">Inspeção</option>
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
          <p>Nenhuma viatura encontrada</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Matrícula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Modelo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Cor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Motorista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Lugares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    A/C
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Inspeção
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.data.map((viatura) => (
                  <tr
                    key={viatura.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {viatura.matricula}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viatura.modelo}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: viatura.cor }}></div>
                        {viatura.cor}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viatura.motoristanome || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viatura.lugares}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viatura.arCondicionado ? "✓" : "✗"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={viatura.status as any}>
                        {viatura.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatarData(viatura.dataUltimaInspecao)}
                    </td>
                    <td className="px-6 py-4 text-sm text-center space-x-2">
                      <Link
                        href={`/viaturas/${viatura.id}`}
                        className="text-blue-600 hover:text-blue-700">
                        <Eye size={18} className="inline" />
                      </Link>
                      <Link
                        href={`/viaturas/${viatura.id}`}
                        className="text-yellow-600 hover:text-yellow-700">
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDeleteViatura(viatura.id)}
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

export default Viaturas;
