'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useNotification } from '@/hooks/useNotification';

const DadosEmpresa = () => {
  const { sucesso, erro: notificarErro } = useNotification();
  const [salvando, setSalvando] = useState(false);

  const [dados, setDados] = useState({
    nomeEmpresa: 'TaxiGest Angola',
    cnpj: '12.345.678/0001-90',
    email: 'contato@taxigest.ao',
    telefone: '923456789',
    website: 'www.taxigest.ao',
    endereco: 'Luanda, Angola',
    cidade: 'Luanda',
    pais: 'Angola',
    descricao: 'Sistema de gestão de táxis e transportes em Angola',
    logo: null as File | null,
    nif: '123456789',
  });

  const handleMudar = (campo: string, valor: any) => {
    setDados((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleSalvar = async () => {
    try {
      setSalvando(true);
      // TODO: Salvar dados no servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sucesso('Dados da empresa atualizados com sucesso');
    } catch (erro: any) {
      notificarErro(erro.message || 'Erro ao salvar dados');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <MainLayout titulo="Dados da Empresa">
      <div className="mb-6">
        <Link href="/configuracoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Configurações
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            {/* Nome da Empresa */}
            <Input
              label="Nome da Empresa"
              value={dados.nomeEmpresa}
              onChange={(e) => handleMudar('nomeEmpresa', e.target.value)}
              required
            />

            {/* CNPJ */}
            <Input
              label="CNPJ"
              value={dados.cnpj}
              onChange={(e) => handleMudar('cnpj', e.target.value)}
              placeholder="12.345.678/0001-90"
            />

            {/* NIF */}
            <Input
              label="NIF"
              value={dados.nif}
              onChange={(e) => handleMudar('nif', e.target.value)}
            />

            {/* Email */}
            <Input
              label="E-mail"
              type="email"
              value={dados.email}
              onChange={(e) => handleMudar('email', e.target.value)}
              required
            />

            {/* Telefone */}
            <Input
              label="Telefone"
              value={dados.telefone}
              onChange={(e) => handleMudar('telefone', e.target.value)}
              required
            />

            {/* Website */}
            <Input
              label="Website"
              value={dados.website}
              onChange={(e) => handleMudar('website', e.target.value)}
              placeholder="www.taxigest.ao"
            />

            {/* Endereço */}
            <Input
              label="Endereço"
              value={dados.endereco}
              onChange={(e) => handleMudar('endereco', e.target.value)}
              required
            />

            {/* Cidade */}
            <Input
              label="Cidade"
              value={dados.cidade}
              onChange={(e) => handleMudar('cidade', e.target.value)}
              required
            />

            {/* País */}
            <Input
              label="País"
              value={dados.pais}
              onChange={(e) => handleMudar('pais', e.target.value)}
              required
            />

            {/* Descrição */}
            <div>
              <label className="form-label">Descrição</label>
              <textarea
                value={dados.descricao}
                onChange={(e) => handleMudar('descricao', e.target.value)}
                className="form-input"
                rows={4}
                placeholder="Descrição da sua empresa..."
              />
            </div>

            {/* Logo */}
            <div>
              <label className="form-label">Logo da Empresa</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMudar('logo', e.target.files?.[0])}
                className="form-input"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                variant="primary"
                isLoading={salvando}
              >
                Salvar Dados
              </Button>
              <Button variant="outline">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default DadosEmpresa;