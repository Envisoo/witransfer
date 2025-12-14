/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, Check, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { StatusViatura } from "@/types/viatura";
import { mockViaturas } from "@/data/mockViaturas";

const Viaturas = () => {
  const router = useRouter();
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusViatura | "">("");

  // Filter viaturas based on search and status
  const viaturasFiltradas = mockViaturas.filter((viatura) => {
    const matchesSearch =
      viatura.matricula.toLowerCase().includes(busca.toLowerCase()) ||
      viatura.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      viatura.motoristanome?.toLowerCase().includes(busca.toLowerCase());

    const matchesStatus = statusFiltro ? viatura.status === statusFiltro : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(viaturasFiltradas.length / itensPorPagina);
  const dadosPagina = viaturasFiltradas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta viatura?")) {
      // In a real app, you would delete from the API here
      console.log("Deleting viatura with id:", id);
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'ativa': return 'success';
      case 'inativa': return 'destructive';
      case 'manutencao': return 'warning';
      case 'inspecao': return 'info';
      default: return 'default';
    }
  };

  return (
    <MainLayout titulo="Gestão de Viaturas">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => router.push('/viaturas/novo')}
          className="flex items-center gap-2">
          <Plus size={20} />
          Nova Viatura
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Buscar viatura..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
            value={busca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
        </div>

        <select
          value={statusFiltro}
          onChange={(e) => {
            setStatusFiltro(e.target.value as StatusViatura | "");
            setPagina(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="">Todas</option>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
          <option value="manutencao">Manutenção</option>
          <option value="inspecao">Inspeção</option>
        </select>
      </div>

      {/* Tabela de Viaturas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matrícula
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modelo/Marca
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motorista
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lugares
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ar-condicionado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dadosPagina.map((viatura) => (
                <tr key={viatura.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {viatura.matricula}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {viatura.modelo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {viatura.marca} - {viatura.cor}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.motoristanome || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.lugares} lugares
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.arCondicionado ? (
                      <span className="inline-flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" /> Sim
                      </span>
                    ) : (
                      <span className="text-gray-500">Não</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getBadgeVariant(viatura.status) as any}>
                      {viatura.status.charAt(0).toUpperCase() + viatura.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/viaturas/${viatura.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Ver detalhes">
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => router.push(`/viaturas/${viatura.id}`)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                        title="Editar">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(viatura.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {dadosPagina.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-gray-500">
                    Nenhuma viatura encontrada com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {viaturasFiltradas.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200">
            <Paginacao
              paginaAtual={pagina}
              totalPaginas={totalPaginas}
              onMudarPagina={setPagina}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Viaturas;
