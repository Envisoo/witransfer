/** @format */

"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useFetch } from "@/hooks/useFetch";
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

const Viagens = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<StatusViagem | "">("");

  const { dados, carregando, erro } = useFetch<ViagemResponse>(
    `/viagens?pagina=${pagina}&limite=10${busca ? `&busca=${busca}` : ""}${status ? `&status=${status}` : ""}`,
    { autoFetch: true }
  );

  return (
    <MainLayout titulo="Gestão de Viagens">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Viagens</h1>
        <p className="text-gray-600">
          Monitorar e gerenciar viagens do sistema
        </p>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar viagem..."
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
            setStatus(e.target.value as StatusViagem | "");
            setPagina(1);
          }}
          className="form-input">
          <option value="">Todos os Status</option>
          <option value="solicitada">Solicitada</option>
          <option value="aceita">Aceita</option>
          <option value="emcaminho">Em Caminho</option>
          <option value="emprogresss">Em Progresso</option>
          <option value="concluida">Concluída</option>
          <option value="cancelada">Cancelada</option>
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
          <p>Nenhuma viagem encontrada</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Motorista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Origem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Destino
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Distância
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.data.map((viagem) => (
                  <tr
                    key={viagem.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {viagem.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viagem.clienteNome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viagem.motoristaNome || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viagem.origem.endereco || "Origem"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {viagem.destino.endereco || "Destino"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatarDistancia(viagem.distancia)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatarMoeda(viagem.preco)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={viagem.status as any}>
                        {viagem.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatarData(viagem.dataPartida)}
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

export default Viagens;
