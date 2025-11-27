/** @format */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, DollarSign, User } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useFetch } from "@/hooks/useFetch";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import Badge from "@/components/common/Badge";
import { Viagem } from "@/types/viagem";
import {
  formatarData,
  formatarMoeda,
  formatarDistancia,
  formatarDuracao,
} from "@/lib/formatters";

const DetalheViagem = () => {
  const params = useParams();
  const viagemId = params.id as string;

  const { dados, carregando, erro } = useFetch<Viagem>(`/viagens/${viagemId}`, {
    autoFetch: true,
  });

  const calcularDuracao = (dataPartida: string, dataChegada?: string) => {
    if (!dataChegada) return "-";
    const partida = new Date(dataPartida);
    const chegada = new Date(dataChegada);
    const diff = Math.floor((chegada.getTime() - partida.getTime()) / 60000);
    return formatarDuracao(diff);
  };

  return (
    <MainLayout titulo="Detalhes da Viagem">
      <div className="mb-6">
        <Link
          href="/viagens"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Viagens
        </Link>
      </div>

      {carregando ? (
        <LoadingSpinner />
      ) : erro ? (
        <div className="card p-6 text-center text-red-600">
          <p>{erro}</p>
        </div>
      ) : dados ? (
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="card p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Viagem #{dados.id.slice(0, 8)}
                </h1>
                <p className="text-gray-600 mt-1">
                  {formatarData(dados.dataPartida)}
                </p>
              </div>
              <Badge variant={dados.status as any}>{dados.status}</Badge>
            </div>
          </div>

          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Cliente */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">Cliente</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium text-gray-900">
                    {dados.clienteNome}
                  </p>
                </div>
              </div>
            </div>

            {/* Motorista */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-green-600" size={20} />
                <h3 className="font-semibold text-gray-900">Motorista</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium text-gray-900">
                    {dados.motoristaNome || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Viatura</p>
                  <p className="font-medium text-gray-900">
                    {dados.viaturaModelo || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Origem */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-red-600" size={20} />
                <h3 className="font-semibold text-gray-900">Origem</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-medium text-gray-900">
                    {dados.origem.endereco ||
                      `${dados.origem.latitude.toFixed(3)}, ${dados.origem.longitude.toFixed(3)}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horário</p>
                  <p className="font-medium text-gray-900">
                    {formatarData(dados.dataPartida)}
                  </p>
                </div>
              </div>
            </div>

            {/* Destino */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-green-600" size={20} />
                <h3 className="font-semibold text-gray-900">Destino</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-medium text-gray-900">
                    {dados.destino.endereco ||
                      `${dados.destino.latitude.toFixed(3)}, ${dados.destino.longitude.toFixed(3)}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horário</p>
                  <p className="font-medium text-gray-900">
                    {dados.dataChegada ? formatarData(dados.dataChegada) : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Distância e Tempo */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-purple-600" size={20} />
                <h3 className="font-semibold text-gray-900">Trajeto</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Distância</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatarDistancia(dados.distancia)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duração</p>
                  <p className="font-medium text-gray-900">
                    {calcularDuracao(dados.dataPartida, dados.dataChegada)}
                  </p>
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-green-600" size={20} />
                <h3 className="font-semibold text-gray-900">Pagamento</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Preço</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatarMoeda(dados.preco)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {dados.tipoPagamento}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Financeiro */}
          <div className="card p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Detalhes Financeiros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Taxa Plataforma</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatarMoeda(dados.taxaPlataforma)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Comissão Motorista</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatarMoeda(dados.comissaoMotorista)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Lucro Líquido</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatarMoeda(dados.lucroLiquido)}
                </p>
              </div>
            </div>
          </div>

          {/* Avaliação */}
          {dados.avaliacao && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Avaliação</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nota</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dados.avaliacao} ⭐
                  </p>
                </div>
                {dados.comentario && (
                  <div>
                    <p className="text-sm text-gray-600">Comentário</p>
                    <p className="text-gray-900">{dados.comentario}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Motivo de Cancelamento */}
          {dados.status === "cancelada" && dados.motivoCancelamento && (
            <div className="card p-6 bg-red-50 border-l-4 border-red-600 mt-6">
              <h3 className="font-semibold text-red-800 mb-2">
                Motivo do Cancelamento
              </h3>
              <p className="text-red-700">{dados.motivoCancelamento}</p>
            </div>
          )}
        </div>
      ) : null}
    </MainLayout>
  );
};

export default DetalheViagem;
