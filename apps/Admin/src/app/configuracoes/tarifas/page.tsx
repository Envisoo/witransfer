'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const ConfigTarifas = () => {
  const { sucesso, erro } = useNotification();
  const [salvando, setSalvando] = useState(false);
  const [tarifas, setTarifas] = useState({
    tarifaBase: '1.00',
    precoPorKm: '0.50',
    precoPorMinuto: '0.20',
    tarifaNoite: '1.50',
    tarifaFimDeSemana: '1.30',
  });

  const handleChange = (campo: string, valor: string) => {
    setTarifas(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      // Simular chamada ao backend
      await new Promise(r => setTimeout(r, 1000));
      sucesso('Tarifas atualizadas com sucesso');
    } catch (e: any) {
      erro(e.message ?? 'Erro ao salvar tarifas');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Configuração de Tarifas">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={e => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            <Input label="Tarifa Base (R$/km)" value={tarifas.tarifaBase} onChange={e => handleChange('tarifaBase', e.target.value)} required />
            <Input label="Preço por Km" value={tarifas.precoPorKm} onChange={e => handleChange('precoPorKm', e.target.value)} required />
            <Input label="Preço por Minuto" value={tarifas.precoPorMinuto} onChange={e => handleChange('precoPorMinuto', e.target.value)} required />
            <Input label="Tarifa Noturna" value={tarifas.tarifaNoite} onChange={e => handleChange('tarifaNoite', e.target.value)} />
            <Input label="Tarifa de Fim de Semana" value={tarifas.tarifaFimDeSemana} onChange={e => handleChange('tarifaFimDeSemana', e.target.value)} />
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" isLoading={salvando}>Salvar Tarifas</Button>
              <Button variant="outline" onClick={() => setTarifas({ tarifaBase: '', precoPorKm: '', precoPorMinuto: '', tarifaNoite: '', tarifaFimDeSemana: '' })}>Limpar</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfigTarifas;
