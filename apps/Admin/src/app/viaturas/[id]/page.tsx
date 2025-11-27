'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Gauge } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useFetch } from '@/hooks/useFetch';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import FormularioCadastroViatura from '@/components/viaturas/FormularioCadastroViatura';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Badge from '@/components/common/Badge';
import viaturasService from '@/services/viaturasService';
import { Viatura } from '@/types/viatura';
import { formatarData } from '@/lib/formatters';

const DetalheViatura = () => {
  const router = useRouter();
  const params = useParams();
  const viaturaId = params.id as string;
  const { sucesso, erro: notificarErro } = useNotification();
  const [editando, setEditando] = useState(false);

  const { dados, carregando, erro, refetch } = useFetch<Viatura>(
    `/viaturas/${viaturaId}`,
    { autoFetch: true }
  );

  const handleDeleteViatura = async () => {
    if (window.confirm('Tem certeza que deseja deletar esta viatura?')) {
      try {
        await viaturasService.deletar(viaturaId);
        sucesso('Viatura deletada com sucesso');
        router.push('/viaturas');
      } catch (erro: any) {
        notificarErro(erro.message || 'Erro ao deletar viatura');
      }
    }
  };

  return (
    <MainLayout titulo="Detalhes da Viatura">
      <div className="mb-6">
        <Link href="/viaturas" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Viaturas
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
                    <h1 className="text-3xl font-bold text-gray-900">{dados.marca} {dados.modelo}</h1>
                    <p className="text-gray-600 mt-1">{dados.matricula}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditando(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit size={18} />
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDeleteViatura}
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Deletar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={dados.status as any}>{dados.status}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: dados.cor }}></div>
                    <span className="text-gray-600">{dados.cor}</span>
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Dados Técnicos */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Dados Técnicos</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Ano</p>
                      <p className="font-medium text-gray-900">{dados.ano}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Número de Lugares</p>
                      <p className="font-medium text-gray-900">{dados.lugares}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ar Condicionado</p>
                      <p className="font-medium text-gray-900">{dados.arCondicionado ? 'Sim' : 'Não'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Categoria</p>
                      <p className="font-medium text-gray-900 capitalize">{dados.categoria}</p>
                    </div>
                  </div>
                </div>

                {/* Manutenção */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gauge className="text-orange-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Manutenção</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Kilometragem</p>
                      <p className="text-2xl font-bold text-gray-900">{dados.kilometragem.toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Última Inspeção</p>
                      <p className="font-medium text-gray-900">{formatarData(dados.dataUltimaInspecao)}</p>
                    </div>
                  </div>
                </div>

                {/* Motorista */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Motorista Responsável</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Nome</p>
                      <p className="font-medium text-gray-900">{dados.motoristanome || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Estatísticas</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Viagens Realizadas</p>
                      <p className="text-2xl font-bold text-gray-900">{dados.numeroViagens}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Viatura</h2>
              <FormularioCadastroViatura
                viaturaId={viaturaId}
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

export default DetalheViatura;