'use client';

import React from 'react';
import { useForm } from '@/hooks/useForm';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import motoristasService from '@/services/motoristasService';
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
}

const FormularioCadastroMotorista: React.FC<FormularioCadastroMotoristaProps> = ({
  motoristaId,
  onSucesso,
  editar = false,
}) => {
  const { sucesso, erro } = useNotification();

  const dadosIniciais: MotoristaFormData = {
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    numeroDocumento: '',
    cartaConducao: '',
    dataInicio: '',
    status: 'offline',
    disponibilidade: 'Ativo'
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: dadosIniciais,
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
        if (editar && motoristaId) {
          await motoristasService.atualizar(motoristaId, dados);
          sucesso('Motorista atualizado com sucesso');
        } else {
          await motoristasService.criar(dados);
          sucesso('Motorista criado com sucesso');
        }
        onSucesso?.();
      } catch (erroCapturado: any) {
        erro(erroCapturado.message || 'Erro ao salvar motorista');
      }
    },
  });

  return (
    <form onSubmit={enviar} className="space-y-6">
      {/* Nome */}
      <Input
        label="Nome Completo"
        value={valores.nome}
        onChange={(e) => mudar('nome', e.target.value)}
        erro={erros.nome}
        required
        placeholder="João Silva"
      />

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

      {/* Data de Nascimento */}
      <Input
        label="Data de Nascimento"
        type="date"
        value={valores.dataNascimento}
        onChange={(e) => mudar('dataNascimento', e.target.value)}
        erro={erros.dataNascimento}
        required
      />

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

      {/* Data de Início */}
      <Input
        label="Data de Início"
        type="date"
        value={valores.dataInicio}
        onChange={(e) => mudar('dataInicio', e.target.value)}
        erro={erros.dataInicio}
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

      {/* Botões */}
      <div className="flex gap-4 pt-6">
        <Button
          type="submit"
          variant="primary"
          isLoading={enviando}
        >
          {editar ? 'Atualizar' : 'Criar'} Motorista
        </Button>
      </div>
    </form>
  );
};

export default FormularioCadastroMotorista;