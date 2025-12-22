'use client';

import React, { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import motoristasService from '@/services/motoristasService';
import { MotoristaFormData, Motorista } from '@/types/motorista';
import {
  validarEmail,
  validarTelefone,
  validarData,
  validarDocumentoAngola,
  validarCartaConducao,
} from '@/lib/validators';
import { 
  User, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Upload,
  X,
  CheckCircle
} from 'lucide-react';

interface FormularioCadastroMotoristaProps {
  motoristaId?: string;
  onSucesso?: () => void;
  editar?: boolean;
  dadosIniciais?: Partial<Motorista>;
}

const FormularioCadastroMotorista: React.FC<FormularioCadastroMotoristaProps> = ({
  motoristaId,
  onSucesso,
  editar = false,
  dadosIniciais,
}) => {
  const { sucesso, erro } = useNotification();
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('');

  const formDataInicial: MotoristaFormData = {
    // A) Dados Pessoais
    nome: dadosIniciais?.nome || '',
    nomeApelido: dadosIniciais?.nomeApelido || '',
    dataNascimento: dadosIniciais?.dataNascimento || '',
    sexo: dadosIniciais?.sexo || undefined,
    nacionalidade: dadosIniciais?.nacionalidade || '',
    nif: dadosIniciais?.nif || '',
    numeroDocumento: dadosIniciais?.numeroDocumento || '',
    endereco: dadosIniciais?.endereco || '',
    cidade: dadosIniciais?.cidade || '',
    provincia: dadosIniciais?.provincia || '',
    telefone: dadosIniciais?.telefone || '',
    telefoneAlternativo: dadosIniciais?.telefoneAlternativo || '',
    email: dadosIniciais?.email || '',
    
    // B) Documentação
    cartaConducao: dadosIniciais?.cartaConducao || '',
    dataEmissaoCarta: dadosIniciais?.dataEmissaoCarta || '',
    dataValidadeCarta: dadosIniciais?.dataValidadeCarta || '',
    cartaProfissional: dadosIniciais?.cartaProfissional || false,
    
    // C) Informações Profissionais
    experienciaAnos: dadosIniciais?.experienciaAnos || undefined,
    idiomasFalados: dadosIniciais?.idiomasFalados || [],
    disponibilidade: dadosIniciais?.disponibilidade || 'Ativo',
    dataInicio: dadosIniciais?.dataInicio || '',
    turno: dadosIniciais?.turno || '',
    viaturaId: dadosIniciais?.viaturaId || '',
    status: dadosIniciais?.status || 'offline',
    
    // G) Observações
    notasInternas: dadosIniciais?.notasInternas || '',
    comportamento: dadosIniciais?.comportamento || '',
    recomendacoes: dadosIniciais?.recomendacoes || '',
    restricoesMedicas: dadosIniciais?.restricoesMedicas || '',
  };

  const { valores, erros, enviando, mudar, definirErro, enviar } = useForm({
    valorInicial: formDataInicial,
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

  const adicionarIdioma = () => {
    if (idiomaSelecionado && !valores.idiomasFalados?.includes(idiomaSelecionado)) {
      mudar('idiomasFalados', [...(valores.idiomasFalados || []), idiomaSelecionado]);
      setIdiomaSelecionado('');
    }
  };

  const removerIdioma = (idioma: string) => {
    mudar('idiomasFalados', valores.idiomasFalados?.filter(i => i !== idioma) || []);
  };

  return (
    <form onSubmit={enviar} className="space-y-8">
      {/* A) DADOS PESSOAIS */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <User size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">A) Dados Pessoais</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo *"
            value={valores.nome}
            onChange={(e) => mudar('nome', e.target.value)}
            erro={erros.nome}
            required
            placeholder="João Manuel da Silva"
          />

          <Input
            label="Nome Curto / Apelido"
            value={valores.nomeApelido || ''}
            onChange={(e) => mudar('nomeApelido', e.target.value)}
            placeholder="João"
          />

          <Input
            label="Data de Nascimento *"
            type="date"
            value={valores.dataNascimento}
            onChange={(e) => mudar('dataNascimento', e.target.value)}
            erro={erros.dataNascimento}
            required
          />

          <Select
            label="Sexo"
            value={valores.sexo || ''}
            onChange={(e) => mudar('sexo', e.target.value)}
            opcoes={[
              { value: '', label: 'Selecione' },
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Feminino', label: 'Feminino' },
              { value: 'Outro', label: 'Outro' },
            ]}
          />

          <Input
            label="Nacionalidade"
            value={valores.nacionalidade || ''}
            onChange={(e) => mudar('nacionalidade', e.target.value)}
            placeholder="Angolana"
          />

          <Input
            label="NIF"
            value={valores.nif || ''}
            onChange={(e) => mudar('nif', e.target.value)}
            placeholder="000000000"
          />

          <Input
            label="Número do Documento (BI) *"
            value={valores.numeroDocumento}
            onChange={(e) => mudar('numeroDocumento', e.target.value)}
            erro={erros.numeroDocumento}
            required
            placeholder="000000000LA000"
          />

          <Input
            label="Endereço"
            value={valores.endereco || ''}
            onChange={(e) => mudar('endereco', e.target.value)}
            placeholder="Rua, Bairro"
          />

          <Input
            label="Cidade"
            value={valores.cidade || ''}
            onChange={(e) => mudar('cidade', e.target.value)}
            placeholder="Luanda"
          />

          <Input
            label="Província"
            value={valores.provincia || ''}
            onChange={(e) => mudar('provincia', e.target.value)}
            placeholder="Luanda"
          />

          <Input
            label="Telefone Principal *"
            value={valores.telefone}
            onChange={(e) => mudar('telefone', e.target.value)}
            erro={erros.telefone}
            required
            placeholder="923456789"
            ajuda="9 dígitos"
          />

          <Input
            label="Telefone Alternativo"
            value={valores.telefoneAlternativo || ''}
            onChange={(e) => mudar('telefoneAlternativo', e.target.value)}
            placeholder="923456789"
          />

          <Input
            label="Email *"
            type="email"
            value={valores.email}
            onChange={(e) => mudar('email', e.target.value)}
            erro={erros.email}
            required
            placeholder="motorista@exemplo.com"
          />
        </div>

        {/* Upload Foto */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto do Motorista
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-600">
              Clique para fazer upload ou arraste a foto
            </p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      {/* B) DOCUMENTAÇÃO DO MOTORISTA */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-600 p-2 rounded-lg">
            <FileText size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">B) Documentação do Motorista</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Número da Carta de Condução *"
            value={valores.cartaConducao}
            onChange={(e) => mudar('cartaConducao', e.target.value)}
            erro={erros.cartaConducao}
            required
            placeholder="000000000"
          />

          <Input
            label="Data de Emissão da Carta"
            type="date"
            value={valores.dataEmissaoCarta || ''}
            onChange={(e) => mudar('dataEmissaoCarta', e.target.value)}
          />

          <Input
            label="Data de Validade da Carta"
            type="date"
            value={valores.dataValidadeCarta || ''}
            onChange={(e) => mudar('dataValidadeCarta', e.target.value)}
          />

          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="cartaProfissional"
              checked={valores.cartaProfissional || false}
              onChange={(e) => mudar('cartaProfissional', e.target.checked)}
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="cartaProfissional" className="text-sm font-medium text-gray-700">
              Possui Carta Profissional
            </label>
          </div>
        </div>

        {/* Upload de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto do BI
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-1" size={24} />
              <p className="text-xs text-gray-600">Upload BI</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto da Carta
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-1" size={24} />
              <p className="text-xs text-gray-600">Upload Carta</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registo Criminal (opcional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-1" size={24} />
              <p className="text-xs text-gray-600">Upload Documento</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atestado Médico (opcional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-1" size={24} />
              <p className="text-xs text-gray-600">Upload Atestado</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>
        </div>
      </div>

      {/* C) INFORMAÇÕES PROFISSIONAIS */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-600 p-2 rounded-lg">
            <Briefcase size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">C) Informações Profissionais</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Experiência (anos de condução)"
            type="number"
            value={valores.experienciaAnos?.toString() || ''}
            onChange={(e) => mudar('experienciaAnos', parseInt(e.target.value) || 0)}
            placeholder="5"
            min="0"
          />

          <Input
            label="Data de Início *"
            type="date"
            value={valores.dataInicio}
            onChange={(e) => mudar('dataInicio', e.target.value)}
            erro={erros.dataInicio}
            required
          />

          <Select
            label="Disponibilidade *"
            value={valores.disponibilidade}
            onChange={(e) => mudar('disponibilidade', e.target.value)}
            opcoes={[
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' },
              { value: 'Férias', label: 'Férias' },
            ]}
          />

          <Select
            label="Status *"
            value={valores.status}
            onChange={(e) => mudar('status', e.target.value)}
            opcoes={[
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
              { value: 'disponivel', label: 'Disponível' },
              { value: 'ocupado', label: 'Ocupado' },
              { value: 'suspenso', label: 'Suspenso' },
            ]}
          />

          <Input
            label="Turno"
            value={valores.turno || ''}
            onChange={(e) => mudar('turno', e.target.value)}
            placeholder="Manhã, Tarde, Noite"
          />
        </div>

        {/* Idiomas Falados */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Idiomas Falados
          </label>
          <div className="flex gap-2 mb-3">
            <select
              value={idiomaSelecionado}
              onChange={(e) => setIdiomaSelecionado(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione um idioma</option>
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Francês">Francês</option>
              <option value="Espanhol">Espanhol</option>
              <option value="Kimbundu">Kimbundu</option>
              <option value="Umbundu">Umbundu</option>
              <option value="Kikongo">Kikongo</option>
            </select>
            <Button
              type="button"
              onClick={adicionarIdioma}
              variant="outline"
              className="px-6"
            >
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {valores.idiomasFalados?.map((idioma) => (
              <div
                key={idioma}
                className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{idioma}</span>
                <button
                  type="button"
                  onClick={() => removerIdioma(idioma)}
                  className="hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* G) OBSERVAÇÕES */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-600 p-2 rounded-lg">
            <MessageSquare size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">G) Observações</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas Internas
            </label>
            <textarea
              value={valores.notasInternas || ''}
              onChange={(e) => mudar('notasInternas', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Informações internas sobre o motorista..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comportamento
            </label>
            <textarea
              value={valores.comportamento || ''}
              onChange={(e) => mudar('comportamento', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Observações sobre o comportamento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recomendações
            </label>
            <textarea
              value={valores.recomendacoes || ''}
              onChange={(e) => mudar('recomendacoes', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Recomendações e sugestões..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restrições Médicas
            </label>
            <textarea
              value={valores.restricoesMedicas || ''}
              onChange={(e) => mudar('restricoesMedicas', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Restrições médicas, se houver..."
            />
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={enviando}
          className="flex items-center justify-center gap-2 flex-1"
        >
          <CheckCircle size={18} />
          {editar ? 'Atualizar' : 'Criar'} Motorista
        </Button>
      </div>
    </form>
  );
};

export default FormularioCadastroMotorista;
