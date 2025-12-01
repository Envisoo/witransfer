/** @format */

"use client";

import React from "react";
import { useForm } from "@/hooks/useForm";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import viaturasService from "@/services/viaturasService";
import { ViaturaFormData } from "@/types/viatura";

interface FormularioCadastroViaturaProps {
  viaturaId?: string;
  onSucesso?: () => void;
  onCancel?: () => void;
  editar?: boolean;
}

const FormularioCadastroViatura: React.FC<FormularioCadastroViaturaProps> = ({
  viaturaId,
  onSucesso,
  onCancel,
  editar = false,
}) => {
  const { sucesso, erro } = useNotification();

  const dadosIniciais: ViaturaFormData = {
    matricula: "",
    modelo: "",
    marca: "",
    cor: "#000000",
    ano: new Date().getFullYear(),
    lugares: 4,
    arCondicionado: false,
    status: "ativa",
    dataUltimaInspecao: "",
    categoria: "economica",
    kilometragem: 0,
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: dadosIniciais,
    onSubmit: async (dados) => {
      // Validações
      if (!dados.matricula) {
        definirErro("matricula", "Matrícula é obrigatória");
        return;
      }

      if (!dados.modelo) {
        definirErro("modelo", "Modelo é obrigatório");
        return;
      }

      if (!dados.marca) {
        definirErro("marca", "Marca é obrigatória");
        return;
      }

      try {
        if (editar && viaturaId) {
          await viaturasService.atualizar(viaturaId, dados);
          sucesso("Viatura atualizada com sucesso");
        } else {
          await viaturasService.criar(dados);
          sucesso("Viatura criada com sucesso");
        }
        onSucesso?.();
      } catch (error: any) {
        erro(error.message || "Erro ao salvar viatura");
      }
    },
  });

  return (
    <form onSubmit={enviar} className="space-y-6">
      {/* Matrícula */}
      <Input
        label="Matrícula"
        value={valores.matricula}
        onChange={(e) => mudar("matricula", e.target.value)}
        erro={erros.matricula}
        required
        placeholder="ABC-12-CD-123"
        ajuda="Formato: ABC-12-CD-123"
      />

      {/* Marca */}
      <Input
        label="Marca"
        value={valores.marca}
        onChange={(e) => mudar("marca", e.target.value)}
        erro={erros.marca}
        required
        placeholder="Toyota"
      />

      {/* Modelo */}
      <Input
        label="Modelo"
        value={valores.modelo}
        onChange={(e) => mudar("modelo", e.target.value)}
        erro={erros.modelo}
        required
        placeholder="Corolla"
      />

      {/* Cor */}
      <div>
        <label className="form-label">Cor</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={valores.cor}
            onChange={(e) => mudar("cor", e.target.value)}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={valores.cor}
            onChange={(e) => mudar("cor", e.target.value)}
            className="form-input flex-1"
          />
        </div>
      </div>

      {/* Ano */}
      <Input
        label="Ano"
        type="number"
        min="2000"
        max={new Date().getFullYear() + 1}
        value={valores.ano}
        onChange={(e) => mudar("ano", parseInt(e.target.value))}
        required
      />

      {/* Lugares */}
      <Input
        label="Número de Lugares"
        type="number"
        min="1"
        max="9"
        value={valores.lugares}
        onChange={(e) => mudar("lugares", parseInt(e.target.value))}
        required
      />

      {/* Ar Condicionado */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="arCondicionado"
          checked={valores.arCondicionado}
          onChange={(e) => mudar("arCondicionado", e.target.checked)}
          className="w-4 h-4"
        />
        <label
          htmlFor="arCondicionado"
          className="text-sm font-medium text-gray-700">
          Possui Ar Condicionado
        </label>
      </div>

      {/* Categoria */}
      <Select
        label="Categoria"
        value={valores.categoria}
        onChange={(e) => mudar("categoria", e.target.value)}
        opcoes={[
          { value: "economica", label: "Econômica" },
          { value: "conforto", label: "Conforto" },
          { value: "premium", label: "Premium" },
          { value: "van", label: "Van" },
        ]}
      />

      {/* Data Última Inspeção */}
      <Input
        label="Data Última Inspeção"
        type="date"
        value={valores.dataUltimaInspecao}
        onChange={(e) => mudar("dataUltimaInspecao", e.target.value)}
        required
      />

      {/* Kilometragem */}
      <Input
        label="Kilometragem"
        type="number"
        min="0"
        value={valores.kilometragem}
        onChange={(e) => mudar("kilometragem", parseInt(e.target.value))}
      />

      {/* Status */}
      <Select
        label="Status"
        value={valores.status}
        onChange={(e) => mudar("status", e.target.value)}
        opcoes={[
          { value: "ativa", label: "Ativa" },
          { value: "inativa", label: "Inativa" },
          { value: "manutencao", label: "Manutenção" },
          { value: "inspecao", label: "Inspeção" },
        ]}
      />

      {/* Botões */}
      <div className="flex gap-4 pt-6">
        <Button type="submit" variant="primary" isLoading={enviando}>
          {editar ? "Atualizar" : "Criar"} Viatura
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={enviando}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormularioCadastroViatura;
