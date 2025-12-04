'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const ContatoSuporte = () => {
  const { sucesso, erro } = useNotification();
  const [salvando, setSalvando] = useState(false);
  const [dados, setDados] = useState({
    telefone: '+244 923 456 789',
    email: 'suporte@witransfer.com',
    horario: '08:00 - 18:00',
    mensagem: '',
  });

  const handleChange = (campo: string, valor: any) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      // Simular chamada ao backend
      await new Promise(r => setTimeout(r, 1000));
      sucesso('Informações de suporte atualizadas');
    } catch (e: any) {
      erro(e.message ?? 'Erro ao salvar contato');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Contato de Suporte">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={e => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            <Input label="Telefone" value={dados.telefone} onChange={e => handleChange('telefone', e.target.value)} required />
            <Input label="E‑mail" type="email" value={dados.email} onChange={e => handleChange('email', e.target.value)} required />
            <Input label="Horário de Atendimento" value={dados.horario} onChange={e => handleChange('horario', e.target.value)} required />
            <div className="flex flex-col">
              <label className="form-label mb-1 font-medium text-gray-700">Mensagem de Boas‑vindas</label>
              <textarea
                value={dados.mensagem}
                onChange={e => handleChange('mensagem', e.target.value)}
                rows={4}
                className="form-input resize-none"
                placeholder="Texto que aparecerá na página de contato do cliente"
              />
            </div>
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" isLoading={salvando}>Salvar</Button>
              <Button variant="outline" onClick={() => setDados({ telefone: '', email: '', horario: '', mensagem: '' })}>Limpar</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContatoSuporte;
