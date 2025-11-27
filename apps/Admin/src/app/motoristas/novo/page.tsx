'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FormularioCadastroMotorista from '@/components/motoristas/FormularioCadastroMotorista';

const NovoMotorista = () => {
  const router = useRouter();

  return (
    <MainLayout titulo="Novo Motorista">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Motorista</h2>
          
          <FormularioCadastroMotorista
            onSucesso={() => {
              router.push('/motoristas');
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NovoMotorista;