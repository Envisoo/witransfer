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
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-teal-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              onChange={(e) => mudar("nome", e.target.value)}
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
            onChange={(e) => mudar("dataNascimento", e.target.value)}
            erro={erros.dataNascimento}
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
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Endereço */}
          <div className="md:col-span-2">
            <Input
              label="Endereço"
              value={valores.endereco}
              onChange={(e) => mudar("endereco", e.target.value)}
              placeholder="Luanda, Angola"
            />
          </div>
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
          {editar ? "Atualizar Cliente" : "Criar Cliente"}
        </Button>
      </div>
    </form>
  );
};

export default FormularioCliente;
