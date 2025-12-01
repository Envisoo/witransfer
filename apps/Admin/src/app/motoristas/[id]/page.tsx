'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import FormularioCadastroMotorista from '@/components/motoristas/FormularioCadastroMotorista';
import Badge from '@/components/common/Badge';
import { Motorista } from '@/types/motorista';
import { formatarData, formatarTelefone, formatarMoeda } from '@/lib/formatters';
import { mockMotoristas } from '@/data/mockMotoristas';

const DetalheMotorista = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const motoristaId = params.id as string;
  const { sucesso } = useNotification();
  const [editando, setEditando] = useState(false);
  const [motorista, setMotorista] = useState<Motorista | null>(null);

  useEffect(() => {
    const encontrado = mockMotoristas.find((m) => m.id === motoristaId);
    if (encontrado) {
      setMotorista(encontrado);
    }
  }, [motoristaId]);

  useEffect(() => {
    if (searchParams.get("editar") === "true") {
      setEditando(true);
    }
  }, [searchParams]);

  const handleDeleteMotorista = () => {
    if (window.confirm("Tem certeza que deseja deletar este motorista?")) {
      // Simulação de delete
      sucesso("Motorista deletado com sucesso (Simulação)");
      router.push("/motoristas");
    }
  };

  if (!motorista) {
    return (
      <MainLayout titulo="Detalhes do Motorista">
        <div className="card p-6 text-center text-gray-600">
          <p>Motorista não encontrado</p>
          <Link href="/motoristas">
            <Button variant="outline" className="mt-4">
              Voltar para Lista
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout titulo="Detalhes do Motorista">
      <div className="mb-6">
        <Link
          href="/motoristas"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Motoristas
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
                    {motorista.nome}
                  </h1>
                  <p className="text-gray-600 mt-1">{motorista.email}</p>
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
                    onClick={handleDeleteMotorista}
                    className="flex items-center justify-center gap-2 flex-1 md:flex-none">
                    <Trash2 size={18} />
                    Deletar
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={motorista.status as any}>
                  {motorista.status}
                </Badge>
                <span className="text-sm text-gray-600">
                  {motorista.avaliacao.toFixed(1)} ⭐
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
                      {formatarTelefone(motorista.telefone)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">E-mail</p>
                    <p className="font-medium text-gray-900">
                      {motorista.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Documentos</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Número Documento</p>
                    <p className="font-medium text-gray-900">
                      {motorista.numeroDocumento}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carta de Condução</p>
                    <p className="font-medium text-gray-900">
                      {motorista.cartaConducao}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {motorista.numeroViagens}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ganho Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatarMoeda(motorista.ganhoTotal)}
                    </p>
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
                    <p className="font-medium text-gray-900">
                      {motorista.viaturaModelo || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data Início</p>
                    <p className="font-medium text-gray-900">
                      {formatarData(motorista.dataInicio)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Editar Motorista
            </h2>
            <FormularioCadastroMotorista
              motoristaId={motoristaId}
              editar
              dadosIniciais={{
                nome: motorista.nome,
                email: motorista.email,
                telefone: motorista.telefone,
                dataNascimento: motorista.dataNascimento,
                numeroDocumento: motorista.numeroDocumento,
                cartaConducao: motorista.cartaConducao,
                dataInicio: motorista.dataInicio,
                status: motorista.status,
              }}
              onSucesso={() => {
                setEditando(false);
              }}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetalheMotorista;