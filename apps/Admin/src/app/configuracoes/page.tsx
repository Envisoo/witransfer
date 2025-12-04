/** @format */

"use client";

import React, { useState } from "react";
import {
  Building2,
  CreditCard,
  MapPin,
  Truck,
  ShoppingBag,
  Phone,
  AlertCircle,
  Database,
  Trash2,
  RefreshCw,
  RotateCcw,
  ChevronRight,
  HardDrive,
  Activity,
  Users,
  Car,
  Clock,
  Download,
  Server,
  Shield,
  CheckCircle,
  Loader,
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { useNotification } from "@/hooks/useNotification";

const Configuracoes = () => {
  const { sucesso, erro, aviso, info } = useNotification();
  const [loading, setLoading] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{
    action: string;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const modulos = [
    {
      id: "empresa",
      titulo: "Dados da Empresa",
      descricao: "Informações gerais e contato",
      icone: Building2,
      cor: "blue",
      badge: "Configurado",
    },
    {
      id: "tarifas",
      titulo: "Configuração de Tarifas",
      descricao: "Tarifas base, preços por km e minuto",
      icone: CreditCard,
      cor: "green",
      badge: "Ativo",
    },
    {
      id: "zonas",
      titulo: "Zonas de Serviço",
      descricao: "Áreas de cobertura do serviço",
      icone: MapPin,
      cor: "purple",
      badge: "12 Zonas",
    },
    {
      id: "viaturas",
      titulo: "Categorias de Viaturas",
      descricao: "Tipos e características de veículos",
      icone: Truck,
      cor: "orange",
      badge: "5 Categorias",
    },
    {
      id: "servicos",
      titulo: "Serviços Adicionais",
      descricao: "Serviços extras disponíveis",
      icone: ShoppingBag,
      cor: "pink",
      badge: "8 Serviços",
    },
    {
      id: "suporte",
      titulo: "Contato de Suporte",
      descricao: "Informações de suporte ao cliente",
      icone: Phone,
      cor: "red",
      badge: "24/7",
    },
  ];

  const corClasses = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500 hover:border-blue-600",
    green:
      "bg-gradient-to-br from-green-50 to-green-100/50 border-l-4 border-green-500 hover:border-green-600",
    purple:
      "bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-purple-500 hover:border-purple-600",
    orange:
      "bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-orange-500 hover:border-orange-600",
    pink: "bg-gradient-to-br from-pink-50 to-pink-100/50 border-l-4 border-pink-500 hover:border-pink-600",
    red: "bg-gradient-to-br from-red-50 to-red-100/50 border-l-4 border-red-500 hover:border-red-600",
  };

  const badgeColors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    pink: "bg-pink-100 text-pink-700",
    red: "bg-red-100 text-red-700",
  };

  // Estatísticas do sistema
  const systemStats = [
    {
      label: "Espaço em Disco",
      value: "45.2 GB",
      total: "100 GB",
      percentage: 45,
      icon: HardDrive,
      color: "blue",
    },
    {
      label: "Usuários Ativos",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "green",
    },
    {
      label: "Viagens Hoje",
      value: "89",
      change: "+5%",
      icon: Car,
      color: "purple",
    },
    {
      label: "Tempo de Atividade",
      value: "99.8%",
      status: "Ótimo",
      icon: Activity,
      color: "teal",
    },
  ];

  // Ações do sistema
  const systemActions = [
    {
      id: "backup",
      title: "Criar Backup",
      description: "Gerar backup completo do banco de dados",
      icon: Database,
      color: "blue",
      action: () => handleBackup(),
      stats: "Último: Hoje, 03:00",
    },
    {
      id: "export",
      title: "Exportar Dados",
      description: "Exportar relatórios e dados em Excel/PDF",
      icon: Download,
      color: "green",
      action: () => handleExport(),
      stats: "Disponível",
    },
    {
      id: "cache",
      title: "Limpar Cache",
      description: "Limpar cache do sistema para melhor desempenho",
      icon: RefreshCw,
      color: "purple",
      action: () => handleClearCache(),
      stats: "2.3 GB em cache",
    },
    {
      id: "logs",
      title: "Gerenciar Logs",
      description: "Visualizar e limpar logs de sistema",
      icon: Trash2,
      color: "orange",
      action: () => handleClearLogs(),
      stats: "1,245 entradas",
    },
    {
      id: "maintenance",
      title: "Modo Manutenção",
      description: "Ativar modo de manutenção do sistema",
      icon: Shield,
      color: "yellow",
      action: () => handleMaintenance(),
      stats: "Desativado",
    },
    {
      id: "restore",
      title: "Restaurar Padrões",
      description: "Restaurar configurações para valores padrão",
      icon: RotateCcw,
      color: "red",
      action: () => confirmRestore(),
      stats: "Ação irreversível",
    },
  ];

  const handleBackup = async () => {
    setLoading("backup");
    try {
      // Simular processo de backup
      await new Promise((resolve) => setTimeout(resolve, 2000));
      sucesso("Backup criado com sucesso!");
      info("O arquivo foi salvo em: /backups/backup-2024-12-03.sql");
    } catch (error) {
      erro("Erro ao criar backup");
    } finally {
      setLoading(null);
    }
  };

  const handleExport = async () => {
    setLoading("export");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sucesso("Dados exportados com sucesso!");
      info("Arquivo pronto para download");
    } catch (error) {
      erro("Erro ao exportar dados");
    } finally {
      setLoading(null);
    }
  };

  const handleClearCache = async () => {
    setLoading("cache");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      sucesso("Cache limpo com sucesso!");
      info("2.3 GB de espaço liberado");
    } catch (error) {
      erro("Erro ao limpar cache");
    } finally {
      setLoading(null);
    }
  };

  const handleClearLogs = async () => {
    setLoading("logs");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sucesso("Logs limpos com sucesso!");
      info("1,245 entradas removidas");
    } catch (error) {
      erro("Erro ao limpar logs");
    } finally {
      setLoading(null);
    }
  };

  const handleMaintenance = async () => {
    setLoading("maintenance");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      aviso("Modo de manutenção ativado");
      info("O sistema está temporariamente indisponível para usuários");
    } catch (error) {
      erro("Erro ao ativar modo de manutenção");
    } finally {
      setLoading(null);
    }
  };

  const confirmRestore = () => {
    setShowConfirmModal({
      action: "restore",
      title: "Restaurar Configurações Padrão",
      message:
        "Esta ação irá restaurar todas as configurações para os valores padrão. Todos os dados personalizados serão perdidos. Deseja continuar?",
      onConfirm: handleRestore,
    });
  };

  const handleRestore = async () => {
    setShowConfirmModal(null);
    setLoading("restore");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      sucesso("Configurações restauradas com sucesso!");
      aviso("Por favor, revise as configurações do sistema");
    } catch (error) {
      erro("Erro ao restaurar configurações");
    } finally {
      setLoading(null);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: {
      [key: string]: { bg: string; text: string; icon: string; border: string };
    } = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "text-blue-600",
        border: "border-blue-200",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "text-green-600",
        border: "border-green-200",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: "text-purple-600",
        border: "border-purple-200",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: "text-orange-600",
        border: "border-orange-200",
      },
      yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        icon: "text-yellow-600",
        border: "border-yellow-200",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: "text-red-600",
        border: "border-red-200",
      },
      teal: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        icon: "text-teal-600",
        border: "border-teal-200",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <MainLayout titulo="Configurações">
      {/* Estatísticas do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={stat.label}
              className="card p-5 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={colors.icon} size={20} />
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.total && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full`}
                        style={{
                          width: `${stat.percentage}%`,
                          backgroundColor:
                            stat.color === "blue"
                              ? "#2563eb"
                              : stat.color === "green"
                                ? "#16a34a"
                                : stat.color === "purple"
                                  ? "#9333ea"
                                  : "#0d9488",
                        }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      de {stat.total}
                    </p>
                  </div>
                )}
                {stat.status && (
                  <p className="text-xs text-gray-500 mt-1">{stat.status}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerta */}
      <div className="card p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 flex gap-3">
        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
        <div>
          <p className="font-semibold text-blue-900">Informação Importante</p>
          <p className="text-sm text-blue-700">
            Qualquer alteração nas configurações será aplicada imediatamente a
            todos os usuários do sistema.
          </p>
        </div>
      </div>

      {/* Grid de Configurações */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Módulos de Configuração
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modulos.map((modulo) => {
            const Icon = modulo.icone;
            return (
              <Link
                key={modulo.id}
                href={`/configuracoes/${modulo.id}`}
                className={`card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  corClasses[modulo.cor as keyof typeof corClasses]
                }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <Icon className="text-gray-700" size={28} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColors[modulo.cor as keyof typeof badgeColors]}`}>
                    {modulo.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {modulo.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{modulo.descricao}</p>

                <div className="flex items-center text-teal-600 font-semibold text-sm group">
                  <span>Acessar</span>
                  <ChevronRight
                    size={18}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ações do Sistema */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Ferramentas de Administração
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {systemActions.map((action) => {
            const Icon = action.icon;
            const colors = getColorClasses(action.color);
            const isLoading = loading === action.id;

            return (
              <div
                key={action.id}
                className={`card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border ${colors.border}`}
                onClick={!isLoading ? action.action : undefined}>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {isLoading ? (
                      <Loader
                        className={`${colors.icon} animate-spin`}
                        size={24}
                      />
                    ) : (
                      <Icon className={colors.icon} size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {action.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Informações do Sistema */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Server className="text-gray-600" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Informações do Sistema
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Versão</p>
            <p className="text-lg font-bold text-gray-900">1.0.0</p>
            <p className="text-xs text-gray-500 mt-1">Build: 20241203</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Ambiente</p>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <p className="text-lg font-bold text-gray-900">Produção</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Instalação</p>
            <p className="text-lg font-bold text-gray-900">01/12/2024</p>
            <p className="text-xs text-gray-500 mt-1">Há 2 dias</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Atualização</p>
            <p className="text-lg font-bold text-gray-900">03/12/2024</p>
            <p className="text-xs text-gray-500 mt-1">Hoje</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle
            className="text-green-600 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div>
            <p className="font-semibold text-green-900 text-sm">
              Sistema Operacional
            </p>
            <p className="text-sm text-green-700 mt-1">
              Todos os serviços estão funcionando normalmente. Última
              verificação: há 2 minutos.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {showConfirmModal.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">{showConfirmModal.message}</p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowConfirmModal(null)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={showConfirmModal.onConfirm}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Configuracoes;
