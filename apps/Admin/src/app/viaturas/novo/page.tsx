'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FormularioCadastroViatura from '@/components/viaturas/FormularioCadastroViatura';

const NovaViatura = () => {
  const router = useRouter();

  return (
    <MainLayout titulo="Nova Viatura">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Criar Nova Viatura</h2>
          
          <FormularioCadastroViatura
            onSucesso={() => {
              router.push('/viaturas');
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NovaViatura;