'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const ZonasServico = () => {
  const { sucesso, erro } = useNotification();
  const [salvando, setSalvando] = useState(false);
  const [zonas, setZonas] = useState([
    { nome: 'Centro', raio: '5' },
    { nome: 'Aeroporto', raio: '10' },
  ]);

  const handleChange = (index: number, campo: string, valor: string) => {
    const novas = [...zonas];
    // @ts-ignore
    novas[index][campo] = valor;
    setZonas(novas);
  };

  const handleAdd = () => setZonas([...zonas, { nome: '', raio: '' }]);
  const handleRemove = (index: number) => setZonas(zonas.filter((_, i) => i !== index));

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      sucesso('Zonas atualizadas com sucesso');
    } catch (e: any) {
      erro(e.message ?? 'Erro ao salvar zonas');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Zonas de Serviço">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={e => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            {zonas.map((z, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 items-end">
                <Input label="Nome da Zona" value={z.nome} onChange={e => handleChange(i, 'nome', e.target.value)} required />
                <Input label="Raio (km)" value={z.raio} onChange={e => handleChange(i, 'raio', e.target.value)} required />
                <Button variant="danger" onClick={() => handleRemove(i)} className="col-span-2">Remover</Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAdd}>Adicionar Zona</Button>
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" isLoading={salvando}>Salvar Zonas</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ZonasServico;
