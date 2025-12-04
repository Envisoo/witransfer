'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const ServicosAdicionais = () => {
  const { sucesso, erro } = useNotification();
  const [salvando, setSalvando] = useState(false);
  const [servicos, setServicos] = useState([
    { nome: 'Wi‑Fi a bordo', preco: '2.00', ativo: true },
    { nome: 'Assistência 24h', preco: '5.00', ativo: false },
  ]);

  const handleChange = (index: number, campo: string, valor: any) => {
    const novas = [...servicos];
    // @ts-ignore
    novas[index][campo] = valor;
    setServicos(novas);
  };

  const handleAdd = () => setServicos([...servicos, { nome: '', preco: '', ativo: false }]);
  const handleRemove = (index: number) => setServicos(servicos.filter((_, i) => i !== index));

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      sucesso('Serviços atualizados com sucesso');
    } catch (e: any) {
      erro(e.message ?? 'Erro ao salvar serviços');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Serviços Adicionais">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={e => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            {servicos.map((s, i) => (
              <div key={i} className="grid grid-cols-1 gap-4 border-b pb-4 mb-4">
                <Input label="Nome do Serviço" value={s.nome} onChange={e => handleChange(i, 'nome', e.target.value)} required />
                <Input label="Preço (R$)" value={s.preco} onChange={e => handleChange(i, 'preco', e.target.value)} required />
                <div className="flex items-center">
                  <label className="mr-2 font-medium text-gray-700">Ativo</label>
                  <input
                    type="checkbox"
                    checked={s.ativo}
                    onChange={e => handleChange(i, 'ativo', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <Button variant="danger" onClick={() => handleRemove(i)} className="w-full">Remover</Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAdd}>Adicionar Serviço</Button>
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" isLoading={salvando}>Salvar Serviços</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicosAdicionais;
