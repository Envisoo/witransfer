/** @format */

"use client";

import React from "react";
import { useForm } from "@/hooks/useForm";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { ViaturaFormData } from "@/types/viatura";
import { 
  Car, 
  Settings, 
  Activity, 
  FileText, 
  Camera, 
  Plus, 
  Upload,
  CheckCircle
} from "lucide-react";

interface FormularioCadastroViaturaProps {
  viaturaId?: string;
  onSucesso?: () => void;
  editar?: boolean;
  dadosIniciais?: ViaturaFormData;
}

const FormularioCadastroViatura: React.FC<FormularioCadastroViaturaProps> = ({
  viaturaId,
  onSucesso,
  editar = false,
  dadosIniciais: dadosRecebidos,
}) => {
  const { sucesso, erro } = useNotification();

  const dadosPadrao: ViaturaFormData = {
    // A) Dados Básicos
    marca: "",
    modelo: "",
    ano: new Date().getFullYear(),
    cor: "",
    categoria: "economica",
    matricula: "",
    status: "ativa",
    
    // B) Informações Técnicas
    numeroChassi: "",
    numeroMotor: "",
    tipoCombustivel: "gasolina",
    transmissao: "manual",
    
    // C) Estado e Condições
    quilometragemAtual: 0,
    kilometragem: 0, // mantendo compatibilidade
    estadoGeral: "novo",
    nivelConservacao: "otimo",
    dataUltimaRevisao: "",
    dataProximaRevisao: "",
    
    // D) Documentação
    seguroCompanhia: "",
    seguroNumeroApolice: "",
    seguroValidade: "",
    inspecaoDataUltima: "",
    inspecaoValidade: "",
    
    // Extras
    lugares: 5,
    arCondicionado: true,
    possuiABS: false,
    possuiAirbags: false,
    
    // placeholders
    dataUltimaInspecao: "",
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: dadosRecebidos || dadosPadrao,
    onSubmit: async (dados) => {
      // Validações básicas
      if (!dados.marca) { definirErro("marca", "Marca é obrigatória"); return; }
      if (!dados.modelo) { definirErro("modelo", "Modelo é obrigatório"); return; }
      if (!dados.matricula) { definirErro("matricula", "Matrícula é obrigatória"); return; }
      
      try {
        // Simulação de delay de API
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        if (editar && viaturaId) {
          console.log("Atualizando viatura:", { id: viaturaId, ...dados });
          sucesso("Viatura atualizada com sucesso!");
        } else {
          console.log("Criando viatura:", dados);
          sucesso("Viatura cadastrada com sucesso!");
        }
        onSucesso?.();
      } catch (e: any) {
        erro(e.message || "Erro ao salvar viatura");
      }
    },
  });

  // Utilitário para upload de arquivo simulado
  const FileUpload = ({ label, id }: { label: string; id: string }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group">
      <input type="file" id={id} className="hidden" />
      <div className="flex flex-col items-center gap-2">
        <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
          <Upload size={24} className="text-gray-400 group-hover:text-blue-500" />
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{label}</span>
        <span className="text-xs text-gray-400">Clique para selecionar</span>
      </div>
    </div>
  );

  return (
    <form onSubmit={enviar} className="space-y-6">
      
      {/* A) Dados Básicos do Veículo */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Car size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">A) Dados Básicos do Veículo</h3>
            <p className="text-xs text-gray-500">Informações principais de identificação</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Marca"
            value={valores.marca}
            onChange={(e) => mudar("marca", e.target.value)}
            erro={erros.marca}
            placeholder="Ex: Toyota"
            required
          />
          <Input
            label="Modelo"
            value={valores.modelo}
            onChange={(e) => mudar("modelo", e.target.value)}
            erro={erros.modelo}
            placeholder="Ex: Corolla"
            required
          />
          <Input
            label="Ano de Fabrico"
            type="number"
            value={valores.ano}
            onChange={(e) => mudar("ano", parseInt(e.target.value))}
            erro={erros.ano}
            required
          />
          <Input
            label="Cor"
            value={valores.cor}
            onChange={(e) => mudar("cor", e.target.value)}
            placeholder="Ex: Prata"
          />
          <Select
            label="Categoria"
            value={valores.categoria}
            onChange={(e) => mudar("categoria", e.target.value)}
            opcoes={[
              { value: "economica", label: "Econômica" },
              { value: "conforto", label: "Conforto" },
              { value: "premium", label: "Premium" },
              { value: "van", label: "Van/Minivan" },
            ]}
          />
          <Select
            label="Status Inicial"
            value={valores.status}
            onChange={(e) => mudar("status", e.target.value)}
            opcoes={[
              { value: "ativa", label: "Ativa" },
              { value: "manutencao", label: "Em Manutenção" },
              { value: "inativa", label: "Inativa" },
            ]}
          />
        </div>
      </div>

      {/* B) Informações Técnicas */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-gray-200 p-2 rounded-lg">
            <Settings size={20} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">B) Informações Técnicas</h3>
            <p className="text-xs text-gray-500">Especificações técnicas e registro</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Número de Chassi (VIN)"
            value={valores.numeroChassi}
            onChange={(e) => mudar("numeroChassi", e.target.value)}
            placeholder="XYZ123456789"
          />
          <Input
            label="Número do Motor"
            value={valores.numeroMotor}
            onChange={(e) => mudar("numeroMotor", e.target.value)}
            placeholder="MOT12345"
          />
          <Input
            label="Matrícula"
            value={valores.matricula}
            onChange={(e) => mudar("matricula", e.target.value)}
            erro={erros.matricula}
            placeholder="LD-00-00-AA"
            required
          />
          <Select
            label="Tipo de Combustível"
            value={valores.tipoCombustivel}
            onChange={(e) => mudar("tipoCombustivel", e.target.value)}
            opcoes={[
              { value: "gasolina", label: "Gasolina" },
              { value: "gasoleo", label: "Gasóleo (Diesel)" },
              { value: "gpl", label: "GPL" },
              { value: "hibrido", label: "Híbrido" },
              { value: "eletrico", label: "Elétrico" },
            ]}
          />
          <Select
            label="Transmissão"
            value={valores.transmissao}
            onChange={(e) => mudar("transmissao", e.target.value)}
            opcoes={[
              { value: "manual", label: "Manual" },
              { value: "automatica", label: "Automática" },
            ]}
          />
        </div>
      </div>

      {/* C) Estado e Condições */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Activity size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">C) Estado e Condições</h3>
            <p className="text-xs text-gray-500">Histórico e estado atual de conservação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Quilometragem Atual (km)"
            type="number"
            value={valores.quilometragemAtual}
            onChange={(e) => mudar("quilometragemAtual", parseInt(e.target.value))}
          />
          <Select
            label="Estado Geral"
            value={valores.estadoGeral}
            onChange={(e) => mudar("estadoGeral", e.target.value)}
            opcoes={[
              { value: "novo", label: "Novo" },
              { value: "semi-novo", label: "Semi-novo" },
              { value: "usado", label: "Usado" },
            ]}
          />
          <Select
            label="Nível de Conservação"
            value={valores.nivelConservacao}
            onChange={(e) => mudar("nivelConservacao", e.target.value)}
            opcoes={[
              { value: "otimo", label: "Ótimo" },
              { value: "bom", label: "Bom" },
              { value: "razoavel", label: "Razoável" },
              { value: "mau", label: "Mau" },
            ]}
          />
          <Input
            label="Última Revisão"
            type="date"
            value={valores.dataUltimaRevisao}
            onChange={(e) => mudar("dataUltimaRevisao", e.target.value)}
          />
          <Input
            label="Próxima Revisão Prevista"
            type="date"
            value={valores.dataProximaRevisao}
            onChange={(e) => mudar("dataProximaRevisao", e.target.value)}
          />
        </div>
      </div>

      {/* D) Documentação */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <FileText size={20} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">D) Documentação</h3>
            <p className="text-xs text-gray-500">Documentos legais, seguro e inspeções</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
             <label className="block text-sm font-medium text-gray-700 mb-2">Documento do Carro / Livreto (Upload)</label>
             <FileUpload label="Carregar Livreto (PDF/Foto)" id="file-livreto" />
          </div>
        </div>

        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Seguro do Automóvel</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            label="Companhia de Seguro"
            value={valores.seguroCompanhia}
            onChange={(e) => mudar("seguroCompanhia", e.target.value)}
          />
          <Input
            label="Número da Apólice"
            value={valores.seguroNumeroApolice}
            onChange={(e) => mudar("seguroNumeroApolice", e.target.value)}
          />
          <Input
            label="Validade do Seguro"
            type="date"
            value={valores.seguroValidade}
            onChange={(e) => mudar("seguroValidade", e.target.value)}
          />
        </div>

        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Inspeção Periódica</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input
            label="Data da Última Inspeção"
            type="date"
            value={valores.inspecaoDataUltima}
            onChange={(e) => mudar("inspecaoDataUltima", e.target.value)}
          />
           <Input
            label="Validade da Inspeção"
            type="date"
            value={valores.inspecaoValidade}
            onChange={(e) => mudar("inspecaoValidade", e.target.value)}
          />
        </div>
      </div>

      {/* E) Fotos */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Camera size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">E) Fotos</h3>
            <p className="text-xs text-gray-500">Galeria de imagens do veículo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fotos Externas</label>
              <FileUpload label="Frente, Traseira, Laterais" id="fotos-externas" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fotos Internas</label>
              <FileUpload label="Painel, Bancos, Bagageira" id="fotos-internas" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto do Motor</label>
              <FileUpload label="Motor" id="foto-motor" />
           </div>
        </div>
      </div>

      {/* F) Extras */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-teal-100 p-2 rounded-lg">
            <Plus size={20} className="text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">F) Extras & Equipamentos</h3>
            <p className="text-xs text-gray-500">Opcionais e itens de segurança</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-teal-500 transition-colors">
            <input 
              type="checkbox" 
              checked={valores.arCondicionado}
              onChange={(e) => mudar("arCondicionado", e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Ar Condicionado</span>
          </label>
          
          <label className="flex items-center p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-teal-500 transition-colors">
            <input 
              type="checkbox" 
              checked={valores.possuiABS}
              onChange={(e) => mudar("possuiABS", e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Freios ABS</span>
          </label>

          <label className="flex items-center p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-teal-500 transition-colors">
            <input 
              type="checkbox" 
              checked={valores.possuiAirbags}
              onChange={(e) => mudar("possuiAirbags", e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Airbags</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
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
          className="px-8 flex items-center gap-2">
          <CheckCircle size={18} />
          {editar ? 'Salvar Alterações' : 'Cadastrar Viatura'}
        </Button>
      </div>
    </form>
  );
};

export default FormularioCadastroViatura;
