'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const CategoriasViaturas = () => {
  const { sucesso, erro } = useNotification();
  const [salvando, setSalvando] = useState(false);
  const [categorias, setCategorias] = useState([
    { nome: 'Sedan', descricao: 'Carro padrão para a cidade' },
    { nome: 'SUV', descricao: 'Veículo maior para grupos' },
  ]);

  const handleChange = (index: number, campo: string, valor: string) => {
    const novas = [...categorias];
    // @ts-ignore
    novas[index][campo] = valor;
    setCategorias(novas);
  };

  const handleAdd = () => setCategorias([...categorias, { nome: '', descricao: '' }]);
  const handleRemove = (index: number) => setCategorias(categorias.filter((_, i) => i !== index));

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      sucesso('Categorias de viaturas atualizadas com sucesso');
    } catch (e: any) {
      erro(e.message ?? 'Erro ao salvar categorias');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Categorias de Viaturas">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={e => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            {categorias.map((c, i) => (
              <div key={i} className="grid grid-cols-1 gap-4">
                <Input label="Nome da Categoria" value={c.nome} onChange={e => handleChange(i, 'nome', e.target.value)} required />
                <Input label="Descrição" value={c.descricao} onChange={e => handleChange(i, 'descricao', e.target.value)} />
                <Button variant="danger" onClick={() => handleRemove(i)} className="w-full">Remover</Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAdd}>Adicionar Categoria</Button>
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" isLoading={salvando}>Salvar Categorias</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriasViaturas;
