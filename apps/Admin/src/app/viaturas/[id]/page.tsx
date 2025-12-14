/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Car,
  Calendar,
  Users,
  AlertTriangle,
  Gauge,
  Fuel,
  FileText,
  Wrench,
  Camera,
  Activity,
  Shield,
  Plus
} from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Badge from "@/components/common/Badge";
import { Viatura } from "@/types/viatura";
import { mockViaturas } from "@/data/mockViaturas";

// Dados mockados extendidos para demonstração
const extendedMockData = {
  manutencao: [
    { id: 1, data: '2023-11-15', tipo: 'Troca de Óleo', quilometragem: 45000, oficina: 'AutoMecânica Silva', custo: 35000, proxima: '2024-05-15', kmAlvo: 55000 },
    { id: 2, data: '2023-08-10', tipo: 'Revisão Geral', quilometragem: 40000, oficina: 'AutoMecânica Silva', custo: 120000, proxima: '2024-02-10', kmAlvo: 50000 },
    { id: 3, data: '2023-05-20', tipo: 'Troca de Pneus', quilometragem: 38000, oficina: 'Pneus & Cia', custo: 200000, proxima: '', kmAlvo: 0 },
  ],
  documentos: {
    seguro: { companhia: 'Global Seguros', apolice: '12345/23', validade: '2024-12-31', status: 'valido' },
    inspecao: { data: '2023-10-01', validade: '2024-10-01', status: 'valido' },
    livreto: { status: 'regular' },
    multas: [{ id: 1, data: '2023-09-15', valor: 5000, motivo: 'Estacionamento proibido', status: 'pendente' }]
  },
  estado: {
    geral: 'BOM',
    notas: 'Veículo em bom estado de conservação, pequenos riscos no para-choque traseiro.',
    danos: [
      { local: 'Para-choque traseiro', tipo: 'Arranhão', severidade: 'Baixa' },
      { local: 'Porta motorista', tipo: 'Pequeno amassado', severidade: 'Baixa' }
    ]
  },
  consumo: {
    mediaUrbana: '8.5 km/l',
    mediaEstrada: '12.0 km/l',
    ultimoAbastecimento: { data: '2023-12-10', litros: 45, tipo: 'Gasolina' }
  }
};

const DetalheViatura = () => {
  const router = useRouter();
  const params = useParams();
  const viaturaId = params.id as string;

  const [carregando, setCarregando] = useState(true);
  const [viatura, setViatura] = useState<Viatura | null>(null);
  const [activeTab, setActiveTab] = useState<'geral' | 'manutencao' | 'documentos' | 'fotos'>('geral');

  useEffect(() => {
    const timer = setTimeout(() => {
      const v = mockViaturas.find((v) => v.id === viaturaId);
      if (v) setViatura(v);
      setCarregando(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [viaturaId]);

  if (carregando) return <MainLayout titulo="Carregando..."><LoadingSpinner /></MainLayout>;
  if (!viatura) return <MainLayout titulo="Erro"><p>Viatura não encontrada</p></MainLayout>;

  return (
    <MainLayout titulo={`Detalhes da Viatura`}>
      {/* Header com Navegação */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
             onClick={() => router.push('/viaturas')}
             className="flex items-center text-sm text-gray-500 hover:text-teal-600 mb-2 transition-colors">
             <ArrowLeft size={16} className="mr-1" /> Voltar para Viaturas
          </button>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold text-gray-900">{viatura.ano} {viatura.marca} {viatura.modelo}</h1>
             <Badge variant={viatura.status === 'ativa' ? 'success' : viatura.status === 'manutencao' ? 'warning' : 'destructive'}>
                {viatura.status.toUpperCase()}
             </Badge>
          </div>
          <p className="text-gray-500 text-sm mt-1">{viatura.matricula} • {viatura.cor} • {viatura.categoria}</p>
        </div>

        <div className="flex gap-2">
           <Button variant="outline" className="flex items-center gap-2">
              <Edit size={16} /> Editar
           </Button>
           <Button variant="primary" className="flex items-center gap-2">
              <Calendar size={16} /> Agendar Manutenção
           </Button>
        </div>
      </div>

      {/* Navegação Interna (Tabs) */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'geral', label: 'Visão Geral', icon: Car },
            { id: 'manutencao', label: 'Manutenção & Estado', icon: Wrench },
            { id: 'documentos', label: 'Documentação', icon: FileText },
            { id: 'fotos', label: 'Galeria', icon: Camera },
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
             {/* Card Principal: Foto e Status */}
             <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-100 h-64 w-full flex items-center justify-center relative">
                   <Car size={64} className="text-gray-300" />
                   <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {viatura.kilometragem.toLocaleString()} km
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="text-lg font-bold text-gray-900 mb-4">Especificações Principais</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                         <p className="text-xs text-gray-500 mb-1">Combustível</p>
                         <div className="flex items-center gap-2 font-semibold">
                            <Fuel size={14} className="text-teal-600" />
                            {viatura.tipoCombustivel || 'Gasolina'}
                         </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                         <p className="text-xs text-gray-500 mb-1">Transmissão</p>
                         <div className="flex items-center gap-2 font-semibold">
                            <Gauge size={14} className="text-purple-600" />
                            {viatura.transmissao || 'Manual'}
                         </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                         <p className="text-xs text-gray-500 mb-1">Tração</p>
                         <div className="flex items-center gap-2 font-semibold">
                            <Activity size={14} className="text-blue-600" />
                            4x2
                         </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                         <p className="text-xs text-gray-500 mb-1">Lugares</p>
                         <div className="flex items-center gap-2 font-semibold">
                            <Users size={14} className="text-orange-600" />
                            {viatura.lugares || 5}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Card Lateral: Motorista e Localização */}
             <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Motorista Responsável</h3>
                   {viatura.motoristaid ? (
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">
                            {viatura.motoristanome?.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-gray-900">{viatura.motoristanome}</p>
                            <p className="text-xs text-gray-500">ID: #{viatura.motoristaid}</p>
                         </div>
                      </div>
                   ) : (
                      <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                         <p className="text-sm text-gray-500">Nenhum motorista alocado</p>
                         <button className="text-xs text-teal-600 font-medium mt-1 hover:underline">Atribuir Motorista</button>
                      </div>
                   )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Desempenho Rápido</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Consumo Médio</span>
                            <span className="font-medium">{extendedMockData.consumo.mediaUrbana}</span>
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Saúde Motor</span>
                            <span className="font-medium text-green-600">98%</span>
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Informações Detalhadas (Geral) */}
             <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Detalhes Técnicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div>
                      <p className="text-sm text-gray-500">Número de Chassi (VIN)</p>
                      <p className="font-medium text-gray-900 mt-1">{viatura.numeroChassi || 'N/A'}</p>
                   </div>
                   <div>
                      <p className="text-sm text-gray-500">Número do Motor</p>
                      <p className="font-medium text-gray-900 mt-1">{viatura.numeroMotor || 'N/A'}</p>
                   </div>
                   <div>
                      <p className="text-sm text-gray-500">Potência</p>
                      <p className="font-medium text-gray-900 mt-1">{viatura.potencia ? `${viatura.potencia} cv` : 'N/A'}</p>
                   </div>
                   <div>
                      <p className="text-sm text-gray-500">Cilindrada</p>
                      <p className="font-medium text-gray-900 mt-1">{viatura.cilindrada ? `${viatura.cilindrada} cc` : 'N/A'}</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ABA: MANUTENÇÃO */}
        {activeTab === 'manutencao' && (
           <div className="space-y-6">
              {/* Histórico */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Histórico de Manutenção</h3>
                    <Button size="sm" variant="outline"><Plus size={16} className="mr-2"/> Adicionar Registro</Button>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                          <tr>
                             <th className="px-4 py-3">Data</th>
                             <th className="px-4 py-3">Serviço</th>
                             <th className="px-4 py-3">Oficina</th>
                             <th className="px-4 py-3">KM</th>
                             <th className="px-4 py-3">Custo</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {extendedMockData.manutencao.map(repo => (
                             <tr key={repo.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{new Date(repo.data).toLocaleDateString()}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{repo.tipo}</td>
                                <td className="px-4 py-3">{repo.oficina}</td>
                                <td className="px-4 py-3">{repo.quilometragem.toLocaleString()} km</td>
                                <td className="px-4 py-3 text-teal-600 font-medium">{repo.custo.toLocaleString()} Kz</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Estado Geral */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Próxima Manutenção</h3>
                    <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-4">
                       <AlertTriangle className="text-yellow-600" size={24} />
                       <div>
                          <p className="font-bold text-yellow-900">Troca de Óleo Prevista</p>
                          <p className="text-sm text-yellow-700">Em 1.500 km ou até 15/05/2024</p>
                       </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li className="flex justify-between">
                          <span>Revisão Geral:</span>
                          <span className="font-medium">10.000 km restantes</span>
                       </li>
                       <li className="flex justify-between">
                          <span>Troca de Pneus:</span>
                          <span className="font-medium text-green-600">Recente</span>
                       </li>
                    </ul>
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Relatório de Estado</h3>
                    <div className="mb-4">
                       <p className="text-sm text-gray-500 mb-1">Condição Geral</p>
                       <p className="font-semibold text-lg text-green-600">{extendedMockData.estado.geral}</p>
                    </div>
                    <div>
                       <p className="text-sm font-medium text-gray-900 mb-2">Avarias / Danos Registrados:</p>
                       <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          {extendedMockData.estado.danos.map((dano, i) => (
                             <li key={i}>{dano.tipo} em {dano.local} <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{dano.severidade}</span></li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* ABA: DOCUMENTOS */}
        {activeTab === 'documentos' && (
           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Seguro */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-2">
                          <Shield className="text-blue-600" />
                          <h3 className="font-bold text-gray-900">Seguro Automóvel</h3>
                       </div>
                       <Badge variant="success">Válido</Badge>
                    </div>
                    <div className="space-y-3">
                       <div>
                          <p className="text-xs text-gray-500">Companhia</p>
                          <p className="font-medium">{extendedMockData.documentos.seguro.companhia}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500">Apólice</p>
                          <p className="font-medium">{extendedMockData.documentos.seguro.apolice}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500">Validade</p>
                          <p className="font-medium">{new Date(extendedMockData.documentos.seguro.validade).toLocaleDateString()}</p>
                       </div>
                    </div>
                 </div>

                 {/* Inspeção */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-2">
                          <FileText className="text-purple-600" />
                          <h3 className="font-bold text-gray-900">Inspeção Obrigatória</h3>
                       </div>
                       <Badge variant="success">Regular</Badge>
                    </div>
                    <div className="space-y-3">
                       <div>
                          <p className="text-xs text-gray-500">Última Inspeção</p>
                          <p className="font-medium">{new Date(extendedMockData.documentos.inspecao.data).toLocaleDateString()}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500">Válido até</p>
                          <p className="font-medium">{new Date(extendedMockData.documentos.inspecao.validade).toLocaleDateString()}</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Multas / Pendências */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                 <h3 className="font-bold text-gray-900 mb-4">Pendências e Multas</h3>
                 {extendedMockData.documentos.multas.length > 0 ? (
                    <div className="space-y-3">
                       {extendedMockData.documentos.multas.map(multa => (
                          <div key={multa.id} className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                             <div>
                                <p className="font-medium text-red-900">{multa.motivo}</p>
                                <p className="text-xs text-red-700">{new Date(multa.data).toLocaleDateString()}</p>
                             </div>
                             <div className="text-right">
                                <p className="font-bold text-red-700">{multa.valor.toLocaleString()} Kz</p>
                                <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">{multa.status}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <p className="text-gray-500">Nada consta.</p>
                 )}
              </div>
           </div>
        )}

        {/* ABA: FOTOS */}
        {activeTab === 'fotos' && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Galeria do Veículo</h3>
              
              <div className="mb-8">
                 <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase">Externas</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                       <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer transition-opacity">
                          <Car className="text-gray-300" size={32} />
                       </div>
                    ))}
                 </div>
              </div>

              <div className="mb-8">
                 <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase">Internas</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer transition-opacity">
                          <Car className="text-gray-300" size={32} />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

      </div>
    </MainLayout>
  );
};

export default DetalheViatura;
