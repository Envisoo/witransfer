/** @format */

"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useFetch } from "@/hooks/useFetch";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import FormularioCliente from "@/components/clientes/FormularioCliente";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Badge from "@/components/common/Badge";
import clientesService from "@/services/clientesService";
import { Cliente } from "@/types/cliente";
import { formatarData, formatarTelefone } from "@/lib/formatters";

const DetalheCliente = () => {
  const router = useRouter();
  const params = useParams();
  const clienteId = params.id as string;
  const { sucesso, erro: notificarErro } = useNotification();
  const [editando, setEditando] = useState(false);

  const { dados, carregando, erro, refetch } = useFetch<Cliente>(
    `/clientes/${clienteId}`,
    { autoFetch: true }
  );

  const handleDeleteCliente = async () => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      try {
        await clientesService.deletar(clienteId);
        sucesso("Cliente deletado com sucesso");
        router.push("/clientes");
      } catch (erro: any) {
        notificarErro(erro.message || "Erro ao deletar cliente");
      }
    }
  };

  return (
    <MainLayout titulo="Detalhes do Cliente">
      <div className="mb-6">
        <Link
          href="/clientes"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Clientes
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
          {!editando ? (
            <>
              {/* Cabeçalho */}
              <div className="card p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {dados.nome}
                    </h1>
                    <p className="text-gray-600 mt-1">{dados.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditando(true)}
                      className="flex items-center gap-2">
                      <Edit size={18} />
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDeleteCliente}
                      className="flex items-center gap-2">
                      <Trash2 size={18} />
                      Deletar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={dados.status as any}>{dados.status}</Badge>
                  <span className="text-sm text-gray-600">
                    {dados.avaliacaoMedia.toFixed(1)} ⭐
                  </span>
                </div>
              </div>

              {/* Informações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Contacto */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="font-medium text-gray-900">
                        {formatarTelefone(dados.telefone)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">E-mail</p>
                      <p className="font-medium text-gray-900">{dados.email}</p>
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Dados Pessoais
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Data Nascimento</p>
                      <p className="font-medium text-gray-900">
                        {dados.dataNascimento
                          ? formatarData(dados.dataNascimento)
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Endereço</p>
                      <p className="font-medium text-gray-900">
                        {dados.endereco || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Atividades */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Atividades
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        Viagens Realizadas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dados.numeroViagens}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Datas */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Datas</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Data Cadastro</p>
                      <p className="font-medium text-gray-900">
                        {formatarData(dados.dataCadastro)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Última Atualização
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatarData(dados.ultimaAtualizacao)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Editar Cliente
              </h2>
              <FormularioCliente
                clienteId={clienteId}
                editar
                onSucesso={() => {
                  setEditando(false);
                  refetch();
                }}
              />
            </div>
          )}
        </div>
      ) : null}
    </MainLayout>
  );
};

export default DetalheCliente;
