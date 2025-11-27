'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FormularioCliente from '@/components/clientes/FormularioCliente';

const NovoCliente = () => {
  const router = useRouter();

  return (
    <MainLayout titulo="Novo Cliente">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Cliente</h2>
          
          <FormularioCliente
            onSucesso={() => {
              router.push('/clientes');
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NovoCliente;