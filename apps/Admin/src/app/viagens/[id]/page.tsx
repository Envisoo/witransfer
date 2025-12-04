/** @format */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, DollarSign, User } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
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

  // Mock data for static display
  const mockViagens: Record<string, Viagem> = {
    "v12345678": {
      id: "v12345678",
      clienteId: "c1",
      clienteNome: "Maria Silva",
      motoristaId: "m1",
      motoristaNome: "João Santos",
      viaturaId: "car1",
      viaturaModelo: "Toyota Corolla",
      origem: { latitude: -8.839988, longitude: 13.289437, endereco: "Rua Rainha Ginga, Luanda" },
      destino: { latitude: -8.814667, longitude: 13.230111, endereco: "Aeroporto 4 de Fevereiro" },
      dataPartida: new Date().toISOString(),
      dataChegada: new Date(Date.now() + 1800000).toISOString(),
      duracao: 30,
      distancia: 15.5,
      status: "emprogresss",
      preco: 5000,
      taxaPlataforma: 500,
      comissaoMotorista: 4500,
      lucroLiquido: 500,
      tipoPagamento: "dinheiro",
      localizacaoAtual: { latitude: -8.825, longitude: 13.25 },
      avaliacao: 4.5,
      comentario: "Ótimo motorista, muito profissional!"
    },
    "v87654321": {
      id: "v87654321",
      clienteId: "c2",
      clienteNome: "Pedro Costa",
      motoristaId: "m2",
      motoristaNome: "Ana Oliveira",
      viaturaId: "car2",
      viaturaModelo: "Hyundai i10",
      origem: { latitude: -8.85, longitude: 13.3, endereco: "Talatona, Luanda" },
      destino: { latitude: -8.9, longitude: 13.4, endereco: "Benfica, Luanda" },
      dataPartida: new Date(Date.now() - 7200000).toISOString(),
      dataChegada: new Date(Date.now() - 5400000).toISOString(),
      duracao: 30,
      distancia: 8.2,
      status: "concluida",
      preco: 2500,
      taxaPlataforma: 250,
      comissaoMotorista: 2250,
      lucroLiquido: 250,
      tipoPagamento: "cartao",
      avaliacao: 5,
      comentario: "Perfeito!"
    },
    "v11223344": {
      id: "v11223344",
      clienteId: "c3",
      clienteNome: "Carlos Ferreira",
      origem: { latitude: -8.82, longitude: 13.24, endereco: "Mutamba, Luanda" },
      destino: { latitude: -8.85, longitude: 13.35, endereco: "Kilamba Kiaxi" },
      dataPartida: new Date(Date.now() - 1800000).toISOString(),
      distancia: 12.0,
      status: "solicitada",
      preco: 4000,
      taxaPlataforma: 400,
      comissaoMotorista: 3600,
      lucroLiquido: 400,
      tipoPagamento: "carteira_digital"
    },
    "v55667788": {
      id: "v55667788",
      clienteId: "c4",
      clienteNome: "Sofia Martins",
      motoristaId: "m3",
      motoristaNome: "Lucas Pereira",
      viaturaId: "car3",
      viaturaModelo: "Kia Picanto",
      origem: { latitude: -8.81, longitude: 13.22, endereco: "Ilha do Cabo" },
      destino: { latitude: -8.83, longitude: 13.26, endereco: "Maianga" },
      dataPartida: new Date(Date.now() - 7200000).toISOString(),
      dataChegada: new Date(Date.now() - 6900000).toISOString(),
      duracao: 5,
      distancia: 5.5,
      status: "cancelada",
      preco: 2000,
      taxaPlataforma: 200,
      comissaoMotorista: 1800,
      lucroLiquido: 200,
      tipoPagamento: "dinheiro",
      motivoCancelamento: "Cliente não apareceu"
    }
  };

  const dados = mockViagens[viagemId] || null;
  const carregando = false;
  const erro = !dados ? "Viagem não encontrada" : null;

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
