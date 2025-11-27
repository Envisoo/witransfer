'use client';

import React from 'react';
import {
  Building2,
  CreditCard,
  MapPin,
  Truck,
  ShoppingBag,
  Phone,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';

const Configuracoes = () => {
  const modulos = [
    {
      id: 'empresa',
      titulo: 'Dados da Empresa',
      descricao: 'Informações gerais e contato',
      icone: Building2,
      cor: 'blue',
    },
    {
      id: 'tarifas',
      titulo: 'Configuração de Tarifas',
      descricao: 'Tarifas base, preços por km e minuto',
      icone: CreditCard,
      cor: 'green',
    },
    {
      id: 'zonas',
      titulo: 'Zonas de Serviço',
      descricao: 'Áreas de cobertura do serviço',
      icone: MapPin,
      cor: 'purple',
    },
    {
      id: 'viaturas',
      titulo: 'Categorias de Viaturas',
      descricao: 'Tipos e características de veículos',
      icone: Truck,
      cor: 'orange',
    },
    {
      id: 'servicos',
      titulo: 'Serviços Adicionais',
      descricao: 'Serviços extras disponíveis',
      icone: ShoppingBag,
      cor: 'pink',
    },
    {
      id: 'suporte',
      titulo: 'Contato de Suporte',
      descricao: 'Informações de suporte ao cliente',
      icone: Phone,
      cor: 'red',
    },
  ];

  const corClasses = {
    blue: 'bg-blue-50 border-l-4 border-blue-500',
    green: 'bg-green-50 border-l-4 border-green-500',
    purple: 'bg-purple-50 border-l-4 border-purple-500',
    orange: 'bg-orange-50 border-l-4 border-orange-500',
    pink: 'bg-pink-50 border-l-4 border-pink-500',
    red: 'bg-red-50 border-l-4 border-red-500',
  };

  return (
    <MainLayout titulo="Configurações">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600">Personalize os parâmetros do TaxiGest</p>
      </div>

      {/* Alerta */}
      <div className="card p-4 mb-6 bg-blue-50 border-l-4 border-blue-500 flex gap-3">
        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
        <div>
          <p className="font-semibold text-blue-800">Dica</p>
          <p className="text-sm text-blue-700">
            Qualquer alteração nas configurações será aplicada imediatamente a todos os usuários do sistema.
          </p>
        </div>
      </div>

      {/* Grid de Configurações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((modulo) => {
          const Icon = modulo.icone;
          return (
            <Link
              key={modulo.id}
              href={`/configuracoes/${modulo.id}`}
              className={`card p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                corClasses[modulo.cor as keyof typeof corClasses]
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Icon className="text-gray-600" size={24} />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{modulo.titulo}</h3>

              <p className="text-sm text-gray-600 mb-4">{modulo.descricao}</p>

              <div className="flex items-center text-teal-600 font-medium text-sm">
                Acessar →
              </div>
            </Link>
          );
        })}
      </div>

      {/* Informações Gerais */}
      <div className="card p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Informações do Sistema</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Versão</p>
            <p className="text-lg font-semibold text-gray-900">1.0.0</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Ambiente</p>
            <p className="text-lg font-semibold text-gray-900">Produção</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Data de Instalação</p>
            <p className="text-lg font-semibold text-gray-900">01/12/2024</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Última Atualização</p>
            <p className="text-lg font-semibold text-gray-900">25/12/2024</p>
          </div>
        </div>
      </div>

      {/* Ações de Sistema */}
      <div className="card p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações do Sistema</h3>

        <div className="space-y-3">
          <Button variant="outline" fullWidth className="justify-start">
            📊 Fazer Backup
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            🔄 Limpar Cache
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            🗑️ Limpar Logs
          </Button>
          <Button variant="danger" fullWidth className="justify-start">
            ⚠️ Restaurar Padrões
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Configuracoes;