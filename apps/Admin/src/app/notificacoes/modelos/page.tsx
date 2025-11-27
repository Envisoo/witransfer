'use client';

import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const ModelosEmail = () => {
  const templates = [
    {
      id: 1,
      nome: 'Bem-vindo',
      tipo: 'boas_vindas',
      assunto: 'Bem-vindo ao TaxiGest',
      uso: 245,
    },
    {
      id: 2,
      nome: 'Confirmação de Viagem',
      tipo: 'confirmacao_viagem',
      assunto: 'Sua viagem foi confirmada',
      uso: 1200,
    },
    {
      id: 3,
      nome: 'Lembrete de Viagem',
      tipo: 'lembrete_viagem',
      assunto: 'Lembrete: sua viagem amanhã',
      uso: 856,
    },
    {
      id: 4,
      nome: 'Avaliação',
      tipo: 'avaliacao',
      assunto: 'Como foi sua experiência?',
      uso: 342,
    },
    {
      id: 5,
      nome: 'Recuperação de Senha',
      tipo: 'recuperacao_senha',
      assunto: 'Recupere sua senha',
      uso: 45,
    },
    {
      id: 6,
      nome: 'Pagamento Realizado',
      tipo: 'pagamento_realizado',
      assunto: 'Pagamento confirmado',
      uso: 780,
    },
  ];

  return (
    <MainLayout titulo="Templates de E-mail">
      <div className="mb-6">
        <Link href="/notificacoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Notificações
        </Link>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <Input
          placeholder="Buscar template..."
          type="search"
        />
      </div>

      {/* Grid de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">{template.nome}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.assunto}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {template.uso} usos
              </span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" fullWidth>
                Editar
              </Button>
              <Button variant="outline" size="sm" fullWidth className="text-blue-600">
                Testar
              </Button>
            </div>
          </div>
        ))}

        {/* Botão Novo Template */}
        <div className="card p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Plus size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Novo Template</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ModelosEmail;