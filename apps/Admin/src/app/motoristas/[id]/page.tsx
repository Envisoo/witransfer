'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useFetch } from '@/hooks/useFetch';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import FormularioCadastroMotorista from '@/components/motoristas/FormularioCadastroMotorista';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Badge from '@/components/common/Badge';
import motoristasService from '@/services/motoristasService';
import { Motorista } from '@/types/motorista';
import { formatarData, formatarTelefone, formatarMoeda } from '@/lib/formatters';

const DetalheMotorista = () => {
  const router = useRouter();
  const params = useParams();
  const motoristaId = params.id as string;
  const { sucesso, erro: mostrarErro } = useNotification();
  const [editando, setEditando] = useState(false);

  const { dados, carregando, erro, refetch } = useFetch<Motorista>(
    `/motoristas/${motoristaId}`,
    { autoFetch: true }
  );

  const handleDeleteMotorista = async () => {
    if (window.confirm('Tem certeza que deseja deletar este motorista?')) {
      try {
        await motoristasService.deletar(motoristaId);
        sucesso('Motorista deletado com sucesso');
        router.push('/motoristas');
      } catch (erro: any) {
        mostrarErro(erro.message || 'Erro ao deletar motorista');
      }
    }
  };

  return (
    <MainLayout titulo="Detalhes do Motorista">
      <div className="mb-6">
        <Link href="/motoristas" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Motoristas
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
                    <h1 className="text-3xl font-bold text-gray-900">{dados.nome}</h1>
                    <p className="text-gray-600 mt-1">{dados.email}</p>
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
                      onClick={handleDeleteMotorista}
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Deletar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={dados.status as any}>{dados.status}</Badge>
                  <span className="text-sm text-gray-600">{dados.avaliacao.toFixed(1)} ⭐</span>
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
                      <p className="font-medium text-gray-900">{formatarTelefone(dados.telefone)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">E-mail</p>
                      <p className="font-medium text-gray-900">{dados.email}</p>
                    </div>
                  </div>
                </div>

                {/* Documentos */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Documentos</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Número Documento</p>
                      <p className="font-medium text-gray-900">{dados.numeroDocumento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Carta de Condução</p>
                      <p className="font-medium text-gray-900">{dados.cartaConducao}</p>
                    </div>
                  </div>
                </div>

                {/* Desempenho */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-green-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Desempenho</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Viagens Realizadas</p>
                      <p className="text-2xl font-bold text-gray-900">{dados.numeroViagens}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ganho Total</p>
                      <p className="text-2xl font-bold text-green-600">{formatarMoeda(dados.ganhoTotal)}</p>
                    </div>
                  </div>
                </div>

                {/* Viatura */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Viatura</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Modelo</p>
                      <p className="font-medium text-gray-900">{dados.viaturaModelo || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data Início</p>
                      <p className="font-medium text-gray-900">{formatarData(dados.dataInicio)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Motorista</h2>
              <FormularioCadastroMotorista
                motoristaId={motoristaId}
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

export default DetalheMotorista;