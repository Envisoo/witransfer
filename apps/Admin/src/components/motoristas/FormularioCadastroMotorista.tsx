'use client';

import React from 'react';
import { useForm } from '@/hooks/useForm';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { MotoristaFormData } from '@/types/motorista';
import {
  validarEmail,
  validarTelefone,
  validarData,
  validarDocumentoAngola,
  validarCartaConducao,
} from '@/lib/validators';

interface FormularioCadastroMotoristaProps {
  motoristaId?: string;
  onSucesso?: () => void;
  editar?: boolean;
  dadosIniciais?: MotoristaFormData;
}

const FormularioCadastroMotorista: React.FC<FormularioCadastroMotoristaProps> = ({
  motoristaId,
  onSucesso,
  editar = false,
  dadosIniciais: dadosRecebidos,
}) => {
  const { sucesso, erro } = useNotification();

  const dadosPadrao: MotoristaFormData = {
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    numeroDocumento: '',
    cartaConducao: '',
    dataInicio: '',
    status: 'offline',
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: dadosRecebidos || dadosPadrao,
    onSubmit: async (dados) => {
      // Validações
      if (!dados.nome || dados.nome.length < 3) {
        definirErro('nome', 'Nome deve ter pelo menos 3 caracteres');
        return;
      }

      if (!validarEmail(dados.email)) {
        definirErro('email', 'E-mail inválido');
        return;
      }

      if (!validarTelefone(dados.telefone)) {
        definirErro('telefone', 'Telefone deve conter 9 dígitos');
        return;
      }

      if (!validarData(dados.dataNascimento)) {
        definirErro('dataNascimento', 'Data inválida');
        return;
      }

      if (!validarDocumentoAngola(dados.numeroDocumento)) {
        definirErro('numeroDocumento', 'Documento inválido');
        return;
      }

      if (!validarCartaConducao(dados.cartaConducao)) {
        definirErro('cartaConducao', 'Carta de condução inválida');
        return;
      }

      if (!validarData(dados.dataInicio)) {
        definirErro('dataInicio', 'Data de início inválida');
        return;
      }

      try {
        // Simulação de chamada API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (editar && motoristaId) {
          console.log('Atualizando motorista:', { id: motoristaId, ...dados });
          sucesso('Motorista atualizado com sucesso (Simulação)');
        } else {
          console.log('Criando motorista:', dados);
          sucesso('Motorista criado com sucesso (Simulação)');
        }
        onSucesso?.();
      } catch (erroCapturado: any) {
        erro(erroCapturado.message || 'Erro ao salvar motorista');
      }
    },
  });

  return (
    <form onSubmit={enviar} className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="md:col-span-2">
            <Input
              label="Nome Completo"
              value={valores.nome}
              onChange={(e) => mudar('nome', e.target.value)}
              erro={erros.nome}
              required
              placeholder="João Silva"
            />
          </div>

          {/* Data de Nascimento */}
          <Input
            label="Data de Nascimento"
            type="date"
            value={valores.dataNascimento}
            onChange={(e) => mudar('dataNascimento', e.target.value)}
            erro={erros.dataNascimento}
            required
          />

          {/* Status */}
          <Select
            label="Status"
            value={valores.status}
            onChange={(e) => mudar('status', e.target.value)}
            opcoes={[
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
              { value: 'suspenso', label: 'Suspenso' },
            ]}
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Informações de Contato</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* E-mail */}
          <Input
            label="E-mail"
            type="email"
            value={valores.email}
            onChange={(e) => mudar('email', e.target.value)}
            erro={erros.email}
            required
            placeholder="joao@email.com"
          />

          {/* Telefone */}
          <Input
            label="Telefone"
            value={valores.telefone}
            onChange={(e) => mudar('telefone', e.target.value)}
            erro={erros.telefone}
            required
            placeholder="923456789"
            ajuda="Apenas números, 9 dígitos"
          />
        </div>
      </div>

      {/* Documentation Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-orange-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Documentação</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documento */}
          <Input
            label="Número do Documento"
            value={valores.numeroDocumento}
            onChange={(e) => mudar('numeroDocumento', e.target.value)}
            erro={erros.numeroDocumento}
            required
            placeholder="BI ou Passaporte"
          />

          {/* Carta de Condução */}
          <Input
            label="Número da Carta de Condução"
            value={valores.cartaConducao}
            onChange={(e) => mudar('cartaConducao', e.target.value)}
            erro={erros.cartaConducao}
            required
            placeholder="Número da carta"
          />
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Informações Profissionais</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data de Início */}
          <Input
            label="Data de Início"
            type="date"
            value={valores.dataInicio}
            onChange={(e) => mudar('dataInicio', e.target.value)}
            erro={erros.dataInicio}
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Button 
          type="button" 
          variant="secondary"
          onClick={() => window.history.back()}
          className="px-6">
          Cancelar
        </Button>
        
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={enviando}
          className="px-8">
          {editar ? 'Atualizar Motorista' : 'Criar Motorista'}
        </Button>
      </div>
    </form>
  );
};

export default FormularioCadastroMotorista;