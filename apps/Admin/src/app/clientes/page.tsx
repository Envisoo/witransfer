'use client';

import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useFetch } from '@/hooks/useFetch';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Badge from '@/components/common/Badge';
import Paginacao from '@/components/common/Paginacao';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import clientesService from '@/services/clientesService';
import { ClienteResponse, StatusCliente } from '@/types/cliente';
import { formatarData, formatarTelefone } from '@/lib/formatters';

const Clientes = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<StatusCliente | ''>('');
  const { sucesso, erro: mostrarErro } = useNotification();
  
  const { dados, carregando, erro, refetch } = useFetch<ClienteResponse>(
    `/clientes?pagina=${pagina}&limite=10${busca ? `&busca=${busca}` : ''}${status ? `&status=${status}` : ''}`,
    { autoFetch: true }
  );

  const handleDeleteCliente = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await clientesService.deletar(id);
        sucesso('Cliente deletado com sucesso');
        refetch();
      } catch (erroCapturado: any) {
        mostrarErro(erroCapturado.message || 'Erro ao deletar cliente');
      }
    }
  };

  return (
    <MainLayout titulo="Gestão de Clientes">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerenciar clientes do sistema</p>
        </div>
        <Link href="/clientes/novo">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar cliente..."
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
            setStatus(e.target.value as StatusCliente | '');
            setPagina(1);
          }}
          className="form-input"
        >
          <option value="">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
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
          <p>Nenhum cliente encontrado</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Viagens</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Avaliação</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Data Cadastro</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.data.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cliente.nome}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatarTelefone(cliente.telefone)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cliente.numeroViagens}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cliente.avaliacaoMedia.toFixed(1)} ⭐</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={cliente.status as any}>{cliente.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatarData(cliente.dataCadastro)}</td>
                    <td className="px-6 py-4 text-sm text-center space-x-2">
                      <Link href={`/clientes/${cliente.id}`} className="text-blue-600 hover:text-blue-700">
                        <Eye size={18} className="inline" />
                      </Link>
                      <Link href={`/clientes/${cliente.id}`} className="text-yellow-600 hover:text-yellow-700">
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
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

export default Clientes;