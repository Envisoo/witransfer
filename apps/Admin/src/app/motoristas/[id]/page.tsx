/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  User,
  FileText,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Car,
  DollarSign,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Shield,
  Activity,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  Plus,
  Users
} from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/common/Button';
import FormularioCadastroMotorista from '@/components/motoristas/FormularioCadastroMotorista';
import Badge from '@/components/common/Badge';
import { Motorista } from '@/types/motorista';
import { formatarData, formatarTelefone, formatarMoeda } from '@/lib/formatters';
import { mockMotoristas } from '@/data/mockMotoristas';

const DetalheMotorista = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const motoristaId = params.id as string;
  const { sucesso } = useNotification();
  const [editando, setEditando] = useState(false);
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [activeTab, setActiveTab] = useState<'geral' | 'performance' | 'seguranca' | 'observacoes'>('geral');

  useEffect(() => {
    const encontrado = mockMotoristas.find((m) => m.id === motoristaId);
    if (encontrado) {
      setMotorista(encontrado);
    }
  }, [motoristaId]);

  useEffect(() => {
    if (searchParams.get("editar") === "true") {
      setEditando(true);
    }
  }, [searchParams]);

  const handleDeleteMotorista = () => {
    if (window.confirm("Tem certeza que deseja deletar este motorista?")) {
      sucesso("Motorista deletado com sucesso (Simulação)");
      router.push("/motoristas");
    }
  };

  if (!motorista) {
    return (
      <MainLayout titulo="Detalhes do Motorista">
        <div className="card p-6 text-center text-gray-600">
          <p>Motorista não encontrado</p>
          <Link href="/motoristas">
            <Button variant="outline" className="mt-4">
              Voltar para Lista
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Calcular idade
  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  // Verificar documentos a vencer (30 dias)
  const verificarDocumentoVencendo = (dataValidade?: string) => {
    if (!dataValidade) return false;
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diasRestantes = Math.floor((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diasRestantes <= 30 && diasRestantes >= 0;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'online':
      case 'disponivel':
        return 'success';
      case 'ocupado':
        return 'warning';
      case 'offline':
        return 'default';
      case 'suspenso':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout titulo="Detalhes do Motorista">
      {!editando ? (
        <>
          {/* Header com Navegação */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <button 
                onClick={() => router.push('/motoristas')}
                className="flex items-center text-sm text-gray-500 hover:text-teal-600 mb-2 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Voltar para Motoristas
              </button>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {motorista.nome}
                  {motorista.nomeApelido && (
                    <span className="text-lg ml-2 text-gray-500 font-normal">
                      "{motorista.nomeApelido}"
                    </span>
                  )}
                </h1>
                <Badge variant={getStatusBadgeVariant(motorista.status)}>
                  {motorista.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                ID: #{motorista.id} • {calcularIdade(motorista.dataNascimento)} anos • {motorista.disponibilidade}
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setEditando(true)}
                className="flex items-center gap-2"
              >
                <Edit size={16} /> Editar
              </Button>
              <Button 
                variant="danger"
                onClick={handleDeleteMotorista}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} /> Deletar
              </Button>
            </div>
          </div>

          {/* Alertas de Documentos a Vencer */}
          {verificarDocumentoVencendo(motorista.dataValidadeCarta) && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-amber-600" size={24} />
                <div>
                  <h4 className="font-semibold text-amber-900">⚠️ Documentos a vencer</h4>
                  <p className="text-sm text-amber-700">
                    A carta de condução vence em breve. Solicite renovação.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navegação Interna (Tabs) */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'geral', label: 'Visão Geral', icon: User },
                { id: 'performance', label: 'Performance & Financeiro', icon: TrendingUp },
                { id: 'seguranca', label: 'Segurança & Avaliação', icon: Shield },
                { id: 'observacoes', label: 'Observações', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Conteúdo das Abas */}
          <div className="space-y-6">
            
            {/* ABA: VISÃO GERAL */}
            {activeTab === 'geral' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card Principal: Foto e Dados Pessoais */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-600 h-32 w-full flex items-center justify-center relative">
                    <div className="absolute -bottom-12 left-6">
                      {motorista.fotoPerfil ? (
                        <img 
                          src={motorista.fotoPerfil} 
                          alt={motorista.nome}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                          <User size={40} className="text-teal-600" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold">{motorista.pontuacao.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-16">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Dados Pessoais e Contato</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone size={18} className="text-teal-600" />
                        <div>
                          <p className="text-xs text-gray-500">Telefone Principal</p>
                          <p className="font-medium text-gray-900">{formatarTelefone(motorista.telefone)}</p>
                        </div>
                      </div>
                      
                      {motorista.telefoneAlternativo && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Tel. Alternativo</p>
                            <p className="font-medium text-gray-900">{formatarTelefone(motorista.telefoneAlternativo)}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={18} className="text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">E-mail</p>
                          <p className="font-medium text-gray-900 text-sm">{motorista.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={18} className="text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-500">Data de Nascimento</p>
                          <p className="font-medium text-gray-900">{formatarData(motorista.dataNascimento)}</p>
                        </div>
                      </div>
                      
                      {motorista.sexo && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User size={18} className="text-pink-600" />
                          <div>
                            <p className="text-xs text-gray-500">Sexo</p>
                            <p className="font-medium text-gray-900">{motorista.sexo}</p>
                          </div>
                        </div>
                      )}
                      
                      {motorista.nacionalidade && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin size={18} className="text-red-600" />
                          <div>
                            <p className="text-xs text-gray-500">Nacionalidade</p>
                            <p className="font-medium text-gray-900">{motorista.nacionalidade}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {motorista.endereco && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700 mb-1">Endereço Completo</p>
                        <p className="font-medium text-blue-900">
                          {motorista.endereco}
                          {motorista.cidade && `, ${motorista.cidade}`}
                          {motorista.provincia && ` - ${motorista.provincia}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Lateral: Informações Profissionais */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Informações Profissionais</h3>
                    <div className="space-y-3 text-sm">
                      {motorista.experienciaAnos && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Experiência</span>
                          <span className="font-semibold text-gray-900">{motorista.experienciaAnos} anos</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Data de Início</span>
                        <span className="font-semibold text-gray-900">{formatarData(motorista.dataInicio)}</span>
                      </div>
                      {motorista.turno && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Turno</span>
                          <span className="font-semibold text-gray-900">{motorista.turno}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Disponibilidade</span>
                        <Badge variant={motorista.disponibilidade === 'Ativo' ? 'success' : 'default'}>
                          {motorista.disponibilidade}
                        </Badge>
                      </div>
                    </div>

                    {motorista.idiomasFalados && motorista.idiomasFalados.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500 mb-2">Idiomas Falados</p>
                        <div className="flex flex-wrap gap-1">
                          {motorista.idiomasFalados.map((idioma) => (
                            <span
                              key={idioma}
                              className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {idioma}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {motorista.viaturaId && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Viatura Atual</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <Car size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{motorista.viaturaModelo}</p>
                          <p className="text-xs text-gray-500">ID: #{motorista.viaturaId}</p>
                        </div>
                      </div>
                      <Link href={`/viaturas/${motorista.viaturaId}`}>
                        <Button variant="outline" className="w-full text-sm">
                          Ver Detalhes da Viatura
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Documentação Completa */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Documentação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">NIF</p>
                      <p className="font-medium text-gray-900 mt-1">{motorista.nif || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">BI / Documento</p>
                      <p className="font-medium text-gray-900 mt-1">{motorista.numeroDocumento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Carta de Condução</p>
                      <p className="font-medium text-gray-900 mt-1">{motorista.cartaConducao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Validade da Carta</p>
                      <p className={`font-medium mt-1 ${
                        verificarDocumentoVencendo(motorista.dataValidadeCarta) 
                          ? 'text-amber-600' 
                          : 'text-gray-900'
                      }`}>
                        {motorista.dataValidadeCarta ? formatarData(motorista.dataValidadeCarta) : 'N/A'}
                        {verificarDocumentoVencendo(motorista.dataValidadeCarta) && (
                          <span className="ml-2 text-xs">⚠️</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2">
                    {motorista.cartaProfissional ? (
                      <>
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="text-green-700 font-medium text-sm">Possui Carta Profissional</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-gray-400" />
                        <span className="text-gray-600 text-sm">Sem Carta Profissional</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ABA: PERFORMANCE & FINANCEIRO */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-bold text-gray-900">Performance do Motorista</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Viagens Realizadas</p>
                        <p className="text-4xl font-bold text-gray-900">{motorista.numeroViagens}</p>
                      </div>
                      
                      {motorista.kmConduzidos && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Km Conduzidos</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {motorista.kmConduzidos.toLocaleString()} km
                          </p>
                        </div>
                      )}
                      
                      {motorista.consumoMedio && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-sm text-gray-600">Consumo Médio</span>
                          <span className="font-semibold text-gray-900">{motorista.consumoMedio} L/100km</span>
                        </div>
                      )}
                      
                      {motorista.pontualidade !== undefined && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Pontualidade</span>
                            <span className="font-semibold text-green-600">{motorista.pontualidade}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full transition-all"
                              style={{ width: `${motorista.pontualidade}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {motorista.reclamacoes !== undefined && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-sm text-gray-600">Reclamações</span>
                          <span className={`font-semibold text-lg ${
                            motorista.reclamacoes === 0 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {motorista.reclamacoes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financeiro */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <DollarSign className="text-emerald-600" size={24} />
                      <h3 className="text-lg font-bold text-gray-900">Informações Financeiras</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6">
                        <p className="text-sm text-gray-600 mb-2">Ganho Total Acumulado</p>
                        <p className="text-4xl font-bold text-emerald-600">
                          {formatarMoeda(motorista.ganhoTotal)}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Ganho do Mês Atual</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {formatarMoeda(motorista.ganhoMes)}
                        </p>
                      </div>
                      
                      {motorista.comissoes !== undefined && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-sm text-gray-600">Comissões</span>
                          <span className="font-semibold text-gray-900">
                            {formatarMoeda(motorista.comissoes)}
                          </span>
                        </div>
                      )}
                      
                      {motorista.descontos !== undefined && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Descontos (multas/danos)</span>
                          <span className="font-semibold text-red-600">
                            -{formatarMoeda(motorista.descontos)}
                          </span>
                        </div>
                      )}
                      
                      {motorista.pagamentosRealizados !== undefined && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-sm text-gray-600">Pagamentos Realizados</span>
                          <span className="font-semibold text-gray-900">
                            {motorista.pagamentosRealizados}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: SEGURANÇA & AVALIAÇÃO */}
            {activeTab === 'seguranca' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="text-red-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Segurança e Avaliação</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center bg-yellow-50 rounded-lg p-6 border border-yellow-100">
                      <Star className="text-yellow-500 fill-yellow-500 mx-auto mb-2" size={32} />
                      <p className="text-sm text-gray-600 mb-1">Pontuação</p>
                      <p className="text-3xl font-bold text-gray-900">{motorista.pontuacao.toFixed(1)} ⭐</p>
                    </div>
                    
                    <div className="text-center bg-blue-50 rounded-lg p-6 border border-blue-100">
                      <Activity className="text-blue-500 mx-auto mb-2" size={32} />
                      <p className="text-sm text-gray-600 mb-1">Avaliação Geral</p>
                      <p className="text-3xl font-bold text-gray-900">{motorista.avaliacao.toFixed(1)}/5</p>
                    </div>
                    
                    <div className="text-center bg-amber-50 rounded-lg p-6 border border-amber-100">
                      <AlertTriangle className="text-amber-500 mx-auto mb-2" size={32} />
                      <p className="text-sm text-gray-600 mb-1">Advertências</p>
                      <p className={`text-3xl font-bold ${
                        motorista.numeroAdvertencias === 0 ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {motorista.numeroAdvertencias || 0}
                      </p>
                    </div>
                  </div>

                  {/* Histórico de Acidentes */}
                  {motorista.historicoAcidentes && motorista.historicoAcidentes.length > 0 ? (
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} className="text-red-600" />
                        Histórico de Acidentes
                      </h4>
                      <div className="space-y-3">
                        {motorista.historicoAcidentes.map((acidente) => (
                          <div key={acidente.id} className="bg-red-50 rounded-lg p-4 border border-red-100">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-gray-900">{formatarData(acidente.data)}</p>
                                <p className="text-sm text-gray-600">{acidente.veiculo}</p>
                              </div>
                              <Badge variant={
                                acidente.gravidade === 'Grave' ? 'error' :
                                acidente.gravidade === 'Moderado' ? 'warning' : 'default'
                              }>
                                {acidente.gravidade}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700">{acidente.descricao}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-green-50 rounded-lg border border-green-100 mb-6">
                      <CheckCircle className="mx-auto text-green-600 mb-2" size={48} />
                      <p className="font-semibold text-green-900">Sem Acidentes Registados</p>
                      <p className="text-sm text-green-700">Excelente histórico de segurança</p>
                    </div>
                  )}

                  {/* Infrações de Trânsito */}
                  {motorista.infracoesTransito && motorista.infracoesTransito.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText size={18} className="text-orange-600" />
                        Infrações de Trânsito
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                              <th className="px-4 py-3 text-left">Data</th>
                              <th className="px-4 py-3 text-left">Tipo</th>
                              <th className="px-4 py-3 text-left">Descrição</th>
                              <th className="px-4 py-3 text-right">Multa</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {motorista.infracoesTransito.map((infracao) => (
                              <tr key={infracao.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{formatarData(infracao.data)}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{infracao.tipo}</td>
                                <td className="px-4 py-3 text-gray-600">{infracao.descricao}</td>
                                <td className="px-4 py-3 text-right font-semibold text-red-600">
                                  {formatarMoeda(infracao.multa)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ABA: OBSERVAÇÕES */}
            {activeTab === 'observacoes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="text-purple-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Observações e Notas</h3>
                  </div>

                  <div className="space-y-6">
                    {motorista.notasInternas && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <FileText size={16} />
                          Notas Internas
                        </h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <p className="text-gray-700">{motorista.notasInternas}</p>
                        </div>
                      </div>
                    )}

                    {motorista.comportamento && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Users size={16} />
                          Comportamento
                        </h4>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="text-gray-700">{motorista.comportamento}</p>
                        </div>
                      </div>
                    )}

                    {motorista.recomendacoes && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Award size={16} />
                          Recomendações
                        </h4>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                          <p className="text-gray-700">{motorista.recomendacoes}</p>
                        </div>
                      </div>
                    )}

                    {motorista.restricoesMedicas && (
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Restrições Médicas
                        </h4>
                        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                          <p className="text-red-800 font-medium">{motorista.restricoesMedicas}</p>
                        </div>
                      </div>
                    )}

                    {!motorista.notasInternas && !motorista.comportamento && 
                     !motorista.recomendacoes && !motorista.restricoesMedicas && (
                      <div className="text-center py-12 text-gray-400">
                        <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                        <p>Nenhuma observação registada</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Editar Motorista
          </h2>
          <FormularioCadastroMotorista
            motoristaId={motoristaId}
            editar
            dadosIniciais={motorista}
            onSucesso={() => {
              setEditando(false);
            }}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default DetalheMotorista;