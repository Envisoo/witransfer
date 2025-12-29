/** @format */

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  User, 
  Calendar, 
  Clock, 
  Car, 
  Navigation, 
  TrendingUp, 
  AlertTriangle,
  CreditCard,
  Ban
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { Viagem } from "@/types/viagem";
import {
  formatarData,
  formatarMoeda,
  formatarDistancia,
} from "@/lib/formatters";

const DetalheViagem = () => {
  const params = useParams();
  const viagemId = params.id as string;
  const [activeTab, setActiveTab] = useState<"geral" | "rota" | "financeiro">("geral");

  // Mock data
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
      status: "em_progresso",
      preco: 5000,
      taxaPlataforma: 500,
      comissaoMotorista: 4500,
      lucroLiquido: 500,
      tipoPagamento: "dinheiro",
      localizacaoAtual: { latitude: -8.825, longitude: 13.25 },
      avaliacao: 4.5,
      comentario: "Ótimo motorista, muito profissional!"
    },
    // ... (other mocks kept implicitly or simplified for this example)
  };

  // Fallback to the first mock if ID not found, just for demo stability
  const dados = mockViagens[viagemId] || mockViagens["v12345678"];
  const carregando = false;
  const erro = !dados ? "Viagem não encontrada" : null;


  const statusVariant = (status: string) => {
    switch (status) {
      case "concluida": return "success";
      case "em_progresso": 
      case "emcaminho": return "info";
      case "cancelada": return "destructive";
      case "solicitada": return "warning";
      default: return "default";
    }
  };

  if (erro) {
     return (
        <MainLayout titulo="Detalhes da Viagem">
           <div className="p-8 text-center bg-white rounded-xl shadow-sm">
              <p className="text-red-500 mb-4">{erro}</p>
              <Link href="/viagens">
                 <Button variant="outline">Voltar para Lista</Button>
              </Link>
           </div>
        </MainLayout>
     )
  }

  return (
    <MainLayout titulo="Detalhes da Viagem">
      {/* 1. Back Button */}
      <div className="mb-6">
        <Link
          href="/viagens"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
          <ArrowLeft size={20} />
          Voltar para Viagens
        </Link>
      </div>

      {carregando ? (
        <LoadingSpinner />
      ) : dados ? (
        <>
          {/* 2. Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
             <div>
                <div className="flex items-center gap-3">
                   <h1 className="text-2xl font-bold text-gray-900">
                      Viagem #{dados.id.slice(0, 8)}
                   </h1>
                   <Badge variant={statusVariant(dados.status) as any}>
                      {dados.status.toUpperCase()}
                   </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                   <span className="flex items-center gap-1">
                      <Calendar size={14} /> {formatarData(dados.dataPartida)}
                   </span>
                   {dados.duracao && (
                      <span className="flex items-center gap-1">
                         <Clock size={14} /> {dados.duracao} min
                      </span>
                   )}
                </div>
             </div>
             <div>
                <Link href={`/viagens`}> {/* Placeholder for real action */}
                   <Button variant="outline" className="flex items-center gap-2">
                      <Ban size={16} /> Cancelar Viagem
                   </Button>
                </Link>
             </div>
          </div>

          {/* 3. Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
               <button
                  onClick={() => setActiveTab("geral")}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                     activeTab === "geral" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
               >
                  <User size={18} /> Visão Geral
               </button>
               <button
                  onClick={() => setActiveTab("rota")}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                     activeTab === "rota" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
               >
                  <Navigation size={18} /> Rota e Mapa
               </button>
               <button
                  onClick={() => setActiveTab("financeiro")}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                     activeTab === "financeiro" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
               >
                  <DollarSign size={18} /> Financeiro
               </button>
            </nav>
          </div>

          {/* 4. Tab Content */}
          <div className="space-y-6">
             {/* GERAL */}
             {activeTab === "geral" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Envolvidos */}
                   <div className="space-y-6">
                      {/* Cliente */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
                         <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <User size={24} />
                         </div>
                         <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Cliente</h3>
                            <p className="text-lg font-bold text-gray-900">{dados.clienteNome}</p>
                            <Link href={`/clientes/${dados.clienteId}`} className="text-sm text-blue-600 hover:underline mt-1 block">
                               Ver Perfil
                            </Link>
                         </div>
                      </div>

                      {/* Motorista */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
                         <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                            <Car size={24} />
                         </div>
                         <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Motorista</h3>
                            {dados.motoristaNome ? (
                               <>
                                  <p className="text-lg font-bold text-gray-900">{dados.motoristaNome}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                        {dados.viaturaModelo}
                                     </span>
                                  </div>
                                  <Link href={`/motoristas/${dados.motoristaId}`} className="text-sm text-blue-600 hover:underline mt-2 block">
                                     Ver Perfil
                                  </Link>
                               </>
                            ) : (
                               <p className="text-gray-500 italic">Motorista não atribuído</p>
                            )}
                         </div>
                      </div>
                   </div>

                   {/* Resumo da Viagem */}
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Resumo da Solicitação</h3>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-gray-600 flex items-center gap-2"><CreditCard size={16} /> Pagamento</span>
                            <span className="font-medium capitalize">{dados.tipoPagamento}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-600 flex items-center gap-2"><Navigation size={16} /> Distância</span>
                            <span className="font-medium">{formatarDistancia(dados.distancia)}</span>
                         </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 flex items-center gap-2"><Clock size={16} /> Duração Estimada</span>
                            <span className="font-medium">{dados.duracao} min</span>
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-gray-900 font-bold">Valor Total</span>
                            <span className="text-xl font-bold text-green-600">{formatarMoeda(dados.preco)}</span>
                         </div>
                      </div>

                      {dados.status === "cancelada" && (
                         <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-red-800 font-semibold mb-1">
                               <AlertTriangle size={18} /> Motivo do Cancelamento
                            </div>
                            <p className="text-red-700 text-sm">{dados.motivoCancelamento || "Motivo não especificado"}</p>
                         </div>
                      )}
                   </div>
                </div>
             )}

             {/* ROTA */}
             {activeTab === "rota" && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-6">
                       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Pontos da Viagem</h3>
                          
                          <div className="relative pl-6 space-y-8 border-l-2 border-dashed border-gray-200 ml-3">
                             {/* Origem */}
                             <div className="relative">
                                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white shadow-sm" />
                                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Origem</p>
                                <p className="text-gray-900 font-medium">{dados.origem.endereco}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatarData(dados.dataPartida)}</p>
                             </div>

                             {/* Destino */}
                              <div className="relative">
                                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-red-500 ring-4 ring-white shadow-sm" />
                                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Destino</p>
                                <p className="text-gray-900 font-medium">{dados.destino.endereco}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                   {dados.dataChegada ? formatarData(dados.dataChegada) : "Em trânsito"}
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-2">
                       <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center border border-gray-200 text-gray-400">
                          {/* Placeholder for actual Map Component */}
                          <div className="text-center">
                             <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                             <p>Mapa da Rota</p>
                          </div>
                       </div>
                    </div>
                 </div>
             )}

             {/* FINANCEIRO */}
             {activeTab === "financeiro" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <TrendingUp size={24} />
                         </div>
                         <div>
                            <p className="text-sm text-gray-500">Taxa da Plataforma</p>
                            <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dados.taxaPlataforma)}</p>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <User size={24} />
                         </div>
                         <div>
                            <p className="text-sm text-gray-500">Ganho do Motorista</p>
                            <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dados.comissaoMotorista)}</p>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <DollarSign size={24} />
                         </div>
                         <div>
                            <p className="text-sm text-gray-500">Lucro Líquido</p>
                            <p className="text-2xl font-bold text-gray-900">{formatarMoeda(dados.lucroLiquido)}</p>
                         </div>
                      </div>
                   </div>

                   {/* Detalhe da Transação */}
                   <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Detalhes da Transação</h3>
                      <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-left">
                               <tr>
                                  <th className="px-4 py-3 font-medium text-gray-500">Descrição</th>
                                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                  <th className="px-4 py-3 font-medium text-gray-500 text-right">Valor</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                               <tr>
                                  <td className="px-4 py-3">Pagamento Viagem #{dados.id}</td>
                                  <td className="px-4 py-3"><Badge variant="success">Processado</Badge></td>
                                  <td className="px-4 py-3 text-right font-medium">{formatarMoeda(dados.preco)}</td>
                               </tr>
                               <tr>
                                  <td className="px-4 py-3 text-gray-500">Comissão da Plataforma</td>
                                  <td className="px-4 py-3"><Badge variant="default">Deducao</Badge></td>
                                  <td className="px-4 py-3 text-right text-red-500">-{formatarMoeda(dados.taxaPlataforma)}</td>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             )}
          </div>
        </>
      ) : null}
    </MainLayout>
  );
};

export default DetalheViagem;
