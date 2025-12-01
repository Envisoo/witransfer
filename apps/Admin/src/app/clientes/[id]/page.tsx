'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { Cliente } from '@/types/cliente';
import { formatarData, formatarTelefone } from '@/lib/formatters';

const DetalheCliente = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const clienteId = params.id as string;
  const { sucesso } = useNotification();
  const [editando, setEditando] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  // Mock data - substituir por dados reais da API
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

  useEffect(() => {
    const encontrado = mockClientes.find((c) => c.id === clienteId);
    if (encontrado) {
      setCliente(encontrado);
    }
  }, [clienteId]);

  useEffect(() => {
    if (searchParams.get("editar") === "true") {
      setEditando(true);
    }
  }, [searchParams]);

  const handleDeleteCliente = () => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      sucesso("Cliente deletado com sucesso (Simulação)");
      router.push("/clientes");
    }
  };

  if (!cliente) {
    return (
      <MainLayout titulo="Detalhes do Cliente">
        <div className="card p-6 text-center text-gray-600">
          <p>Cliente não encontrado</p>
          <Link href="/clientes">
            <Button variant="outline" className="mt-4">
              Voltar para Lista
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

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

      <div className="max-w-4xl mx-auto">
        {!editando ? (
          <>
            {/* Cabeçalho */}
            <div className="card p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {cliente.nome}
                  </h1>
                  <p className="text-gray-600 mt-1">{cliente.email}</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setEditando(true)}
                    className="flex items-center justify-center gap-2 flex-1 md:flex-none">
                    <Edit size={18} />
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDeleteCliente}
                    className="flex items-center justify-center gap-2 flex-1 md:flex-none">
                    <Trash2 size={18} />
                    Deletar
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={cliente.status as any}>
                  {cliente.status}
                </Badge>
                <span className="text-sm text-gray-600">
                  {cliente.avaliacaoMedia.toFixed(1)} ⭐
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
                      {formatarTelefone(cliente.telefone)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">E-mail</p>
                    <p className="font-medium text-gray-900">
                      {cliente.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Data de Nascimento</p>
                    <p className="font-medium text-gray-900">
                      {cliente.dataNascimento ? formatarData(cliente.dataNascimento) : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Endereço</p>
                    <p className="font-medium text-gray-900">
                      {cliente.endereco || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Atividade */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Atividade</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Viagens Realizadas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {cliente.numeroViagens}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avaliação Média</p>
                    <p className="text-2xl font-bold text-green-600">
                      {cliente.avaliacaoMedia.toFixed(1)} ⭐
                    </p>
                  </div>
                </div>
              </div>

              {/* Cadastro */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Cadastro</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Data de Cadastro</p>
                    <p className="font-medium text-gray-900">
                      {cliente.dataCadastro ? formatarData(cliente.dataCadastro) : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Última Atualização</p>
                    <p className="font-medium text-gray-900">
                      {cliente.ultimaAtualizacao ? formatarData(cliente.ultimaAtualizacao) : "-"}
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
            <p className="text-gray-600">
              Funcionalidade de edição será implementada em breve.
            </p>
            <Button
              variant="outline"
              onClick={() => setEditando(false)}
              className="mt-4">
              Voltar
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetalheCliente;

