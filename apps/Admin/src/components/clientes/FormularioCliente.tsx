/** @format */

"use client";

import React from "react";
import { useForm } from "@/hooks/useForm";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import clientesService from "@/services/clientesService";
import { ClienteFormData } from "@/types/cliente";
import { validarEmail, validarTelefone, validarData } from "@/lib/validators";

interface FormularioClienteProps {
  clienteId?: string;
  onSucesso?: () => void;
  editar?: boolean;
}

const FormularioCliente: React.FC<FormularioClienteProps> = ({
  clienteId,
  onSucesso,
  editar = false,
}) => {
  const { sucesso, erro } = useNotification();

  const dadosIniciais: ClienteFormData = {
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: "",
    status: "ativo",
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: dadosIniciais,
    onSubmit: async (dados) => {
      // Validações
      if (!dados.nome || dados.nome.length < 3) {
        definirErro("nome", "Nome deve ter pelo menos 3 caracteres");
        return;
      }

      if (!validarEmail(dados.email)) {
        definirErro("email", "E-mail inválido");
        return;
      }

      if (!validarTelefone(dados.telefone)) {
        definirErro("telefone", "Telefone deve conter 9 dígitos");
        return;
      }

      if (dados.dataNascimento && !validarData(dados.dataNascimento)) {
        definirErro("dataNascimento", "Data inválida");
        return;
      }

      try {
        if (editar && clienteId) {
          await clientesService.atualizar(clienteId, dados);
          sucesso("Cliente atualizado com sucesso");
        } else {
          await clientesService.criar(dados);
          sucesso("Cliente criado com sucesso");
        }
        onSucesso?.();
      } catch (e: any) {
        erro(e.message || "Erro ao salvar cliente");
      }
    },
  });

  return (
    <form onSubmit={enviar} className="space-y-6">
      {/* Nome */}
      <Input
        label="Nome Completo"
        value={valores.nome}
        onChange={(e) => mudar("nome", e.target.value)}
        erro={erros.nome}
        required
        placeholder="João Silva"
      />

      {/* E-mail */}
      <Input
        label="E-mail"
        type="email"
        value={valores.email}
        onChange={(e) => mudar("email", e.target.value)}
        erro={erros.email}
        required
        placeholder="joao@email.com"
      />

      {/* Telefone */}
      <Input
        label="Telefone"
        value={valores.telefone}
        onChange={(e) => mudar("telefone", e.target.value)}
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
        onChange={(e) => mudar("dataNascimento", e.target.value)}
        erro={erros.dataNascimento}
      />

      {/* Endereço */}
      <Input
        label="Endereço"
        value={valores.endereco}
        onChange={(e) => mudar("endereco", e.target.value)}
        placeholder="Luanda, Angola"
      />

      {/* Status */}
      <Select
        label="Status"
        value={valores.status}
        onChange={(e) => mudar("status", e.target.value)}
        opcoes={[
          { value: "ativo", label: "Ativo" },
          { value: "inativo", label: "Inativo" },
          { value: "suspenso", label: "Suspenso" },
        ]}
      />

      {/* Botões */}
      <div className="flex gap-4 pt-6">
        <Button type="submit" variant="primary" isLoading={enviando}>
          {editar ? "Atualizar" : "Criar"} Cliente
        </Button>
      </div>
    </form>
  );
};

export default FormularioCliente;
