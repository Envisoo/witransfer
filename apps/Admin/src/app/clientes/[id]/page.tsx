/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  History
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { Cliente } from "@/types/cliente";
import { formatarData, formatarTelefone } from "@/lib/formatters";

const DetalheCliente = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const clienteId = params.id as string;
  const { sucesso } = useNotification();

  const [editando, setEditando] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [activeTab, setActiveTab] = useState<"geral" | "atividade" | "historico">("geral");

  // ---------- Mock data (replace with API later) ----------
  const mockClientes: Cliente[] = [
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
  ];
  // -------------------------------------------------------

  useEffect(() => {
    const encontrado = mockClientes.find((c) => c.id === clienteId);
    if (encontrado) setCliente(encontrado);
  }, [clienteId]);

  useEffect(() => {
    if (searchParams.get("editar") === "true") setEditando(true);
  }, [searchParams]);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      sucesso("Cliente deletado (simulação).");
      router.push("/clientes");
    }
  };

  if (!cliente) {
    return (
      <MainLayout titulo="Detalhes do Cliente">
        <div className="p-8 text-center text-gray-600">
          <p className="text-lg">Cliente não encontrado.</p>
          <Link href="/clientes" className="mt-4 inline-block">
            <Button variant="outline">Voltar à lista</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case "ativo": return "success";
      case "inativo": return "destructive";
      case "suspenso": return "warning";
      default: return "default";
    }
  };

  return (
    <MainLayout titulo="Detalhes do Cliente">
      {/* 1. Botão de Voltar (Fora do Card) */}
      <div className="mb-6">
        <Link
          href="/clientes"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Clientes
        </Link>
      </div>

      {!editando ? (
        <>
          {/* 2. Cabeçalho Fixo (White Card) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {cliente.nome}
                </h1>
                <Badge variant={statusVariant(cliente.status) as any}>
                  {cliente.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                <Mail size={14} /> {cliente.email} • ID: #{cliente.id}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setEditando(true)}
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
              >
                <Edit size={16} /> Editar
              </Button>
              <Button 
                variant="danger"
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
              >
                <Trash2 size={16} /> Deletar
              </Button>
            </div>
          </div>

          {/* 3. Navegação (Tabs) */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'geral', label: 'Visão Geral', icon: User },
                { id: 'atividade', label: 'Atividade & Stats', icon: TrendingUp },
                { id: 'historico', label: 'Histórico', icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* 4. Conteúdo das Abas */}
          <div className="space-y-6">
            
            {/* ABA: VISÃO GERAL */}
            {activeTab === 'geral' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card Principal: Foto e Dados Pessoais */}
                 <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 w-full flex items-center justify-center relative">
                      <div className="absolute -bottom-12 left-6">
                        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600">
                          {cliente.nome.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold">{cliente.avaliacaoMedia.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-16">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Dados Pessoais e Contato</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Telefone</p>
                            <p className="font-medium text-gray-900">{formatarTelefone(cliente.telefone)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">E-mail</p>
                            <p className="font-medium text-gray-900 truncate">{cliente.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Data Nascimento</p>
                            <p className="font-medium text-gray-900">
                              {cliente.dataNascimento ? formatarData(cliente.dataNascimento) : "-"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Endereço</p>
                            <p className="font-medium text-gray-900 truncate">{cliente.endereco || "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* Card Lateral: Cadastro */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Informações de Conta</h3>
                    <div className="space-y-4">
                       <div>
                         <p className="text-xs text-gray-500 mb-1">Data de Cadastro</p>
                         <p className="font-medium text-gray-900 flex items-center gap-2">
                           <Calendar size={14} className="text-gray-400" />
                           {formatarData(cliente.dataCadastro)}
                         </p>
                       </div>
                       <div className="pt-4 border-t border-gray-100">
                         <p className="text-xs text-gray-500 mb-1">Última Atualização</p>
                         <p className="font-medium text-gray-900 text-sm">
                           {cliente.ultimaAtualizacao ? formatarData(cliente.ultimaAtualizacao) : "-"}
                         </p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* ABA: ATIVIDADE */}
            {activeTab === 'atividade' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-blue-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Estatísticas de Viagens</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-blue-50 rounded-lg p-5">
                       <p className="text-sm text-gray-600 mb-1">Total de Viagens</p>
                       <p className="text-4xl font-bold text-blue-700">{cliente.numeroViagens}</p>
                     </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="text-yellow-500" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Avaliação</h3>
                  </div>
                  
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{cliente.avaliacaoMedia.toFixed(1)}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={20} 
                          className={s <= Math.round(cliente.avaliacaoMedia) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">Média baseada em viagens recentes</p>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: HISTÓRICO */}
            {activeTab === 'historico' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                 <History className="mx-auto text-gray-300 mb-4" size={48} />
                 <h3 className="text-lg font-medium text-gray-900 mb-1">Histórico de Viagens</h3>
                 <p className="text-gray-500">O histórico detalhado de viagens será exibido aqui.</p>
              </div>
            )}

          </div>
        </>
      ) : (
        // MODO DE EDIÇÃO
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Edit className="text-blue-600" />
            Editar Cliente
          </h2>
          {/* Formulário simplificado */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                defaultValue={cliente.nome}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                defaultValue={cliente.email}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="text"
                defaultValue={cliente.telefone}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setEditando(false)}>
              Cancelar
            </Button>
            <Button onClick={() => { sucesso("Cliente atualizado com sucesso"); setEditando(false); }}>
              Salvar Alterações
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DetalheCliente;
