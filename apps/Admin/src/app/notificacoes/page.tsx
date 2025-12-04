/** @format */

"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import {
  Bell,
  Mail,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  LucideIcon,
} from "lucide-react";

// Tipos para as notificações
interface Notification {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  status: "enviado" | "aberto" | "falhou" | "agendado";
  recipient: string;
}

interface NotificationCardProps {
  notification: Notification;
  onResend: () => void;
}

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: string;
  className?: string;
}

interface StatusConfig {
  [key: string]: {
    bg: string;
    icon: LucideIcon;
  };
}

interface TypeConfig {
  [key: string]: {
    icon: string;
    color: string;
  };
}

// Componente de Card de Notificação
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onResend,
}) => {
  const [showNotificationMenu, setShowNotificationMenu] = useState<
    number | null
  >(null);
  const { type, description, time, status, recipient } = notification;
  const statusConfig: StatusConfig = {
    enviado: { bg: "bg-blue-100 text-blue-800", icon: Send },
    aberto: { bg: "bg-green-100 text-green-800", icon: CheckCircle },
    falhou: { bg: "bg-red-100 text-red-800", icon: AlertCircle },
    agendado: { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
  };

  const typeConfig: TypeConfig = {
    "Bem-vindo": { icon: "👋", color: "bg-indigo-100 text-indigo-600" },
    "Confirmação de Viagem": { icon: "🚗", color: "bg-teal-100 text-teal-600" },
    "Pagamento Realizado": { icon: "💳", color: "bg-green-100 text-green-600" },
    Lembrete: { icon: "⏰", color: "bg-amber-100 text-amber-600" },
    Promoção: { icon: "🎁", color: "bg-pink-100 text-pink-600" },
  };

  const StatusIcon = statusConfig[status]?.icon || Send;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${typeConfig[type]?.color || "bg-gray-100"}`}>
              <span className="text-xl">{typeConfig[type]?.icon || ""}</span>
            </span>
            <div>
              <h4 className="font-semibold text-gray-900">{type}</h4>
              <p className="text-sm text-gray-500">{recipient}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status]?.bg || "bg-gray-100 text-gray-800"}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {new Date(time).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onResend}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Reenviar notificação">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationMenu(
                  showNotificationMenu === notification.id
                    ? null
                    : notification.id
                );
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Estatísticas
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  className = "",
}) => (
  <div
    className={`bg-white p-5 rounded-xl border border-gray-100 shadow-sm ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div
        className={`p-3 rounded-lg ${className.includes("bg-") ? "bg-white/20" : "bg-blue-50"}`}></div>
    </div>
    {change && (
      <p
        className={`text-xs mt-2 ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
        {change} em relação ao mês passado
      </p>
    )}
  </div>
);

interface NotificationTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  type: string;
  lastUpdated: string;
}

const NotificacoesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("notificacoes");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [] = useState<NotificationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewNotificationModal, setShowNewNotificationModal] =
    useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationMenu, setShowNotificationMenu] = useState<
    number | null
  >(null);
  const [notificationType, setNotificationType] = useState("email");
  const [notificationRecipient, setNotificationRecipient] = useState("");
  const [notificationSubject, setNotificationSubject] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dados de exemplo
  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "Bem-vindo",
          title: "Bem-vindo ao Witransfer!",
          description:
            "Obrigado por se juntar à nossa plataforma. Seu cadastro foi realizado com sucesso!",
          time: "2024-12-25T10:30:00-03:00",
          status: "enviado",
          recipient: "novo_cliente@example.com",
        },
        {
          id: 2,
          type: "Confirmação de Viagem",
          title: "Sua viagem foi confirmada",
          description:
            "Sua viagem para o aeroporto foi confirmada para amanhã às 09:00.",
          time: "2024-12-24T15:45:00-03:00",
          status: "aberto",
          recipient: "cliente@example.com",
        },
        {
          id: 3,
          type: "Pagamento Realizado",
          title: "Pagamento confirmado",
          description:
            "Seu pagamento de AOA 15.000 foi processado com sucesso.",
          time: "2024-12-24T12:00:00-03:00",
          status: "enviado",
          recipient: "motorista@example.com",
        },
        {
          id: 4,
          type: "Lembrete",
          title: "Sua viagem está próxima",
          description:
            "Lembrete: Sua viagem está agendada para amanhã às 14:30.",
          time: "2024-12-23T18:20:00-03:00",
          status: "aberto",
          recipient: "cliente2@example.com",
        },
        {
          id: 5,
          type: "Promoção",
          title: "Desconto especial para você!",
          description:
            "Ganhe 20% de desconto na sua próxima viagem com o código BEMVINDO20.",
          time: "2024-12-22T09:15:00-03:00",
          status: "falhou",
          recipient: "usuario@example.com",
        },
        {
          id: 6,
          type: "Confirmação de Viagem",
          title: "Viagem agendada com sucesso",
          description:
            "Sua viagem para o centro da cidade foi agendada para sexta-feira às 16:00.",
          time: "2024-12-21T11:30:00-03:00",
          status: "agendado",
          recipient: "cliente3@example.com",
        },
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "todos" || notification.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total de Notificações",
      value: "1,248",
      change: "+12%",
      icon: Bell,
      className: "bg-blue-50 text-blue-600",
    },
    {
      title: "Taxa de Abertura",
      value: "78%",
      change: "+5%",
      icon: Mail,
      className: "bg-green-50 text-green-600",
    },
    {
      title: "Taxa de Clique",
      value: "34%",
      change: "+8%",
      icon: CheckCircle,
      className: "bg-purple-50 text-purple-600",
    },
    {
      title: "Falhas no Envio",
      value: "12",
      change: "-2%",
      icon: AlertCircle,
      className: "bg-red-50 text-red-600",
    },
  ];

  const handleResend = async (id: number) => {
    try {
      setIsSending(true);
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar o status da notificação
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, status: "enviado" as const } : notif
        )
      );

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao reenviar notificação:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleNewNotification = () => {
    setShowNewNotificationModal(true);
    setNotificationSubject("");
    setNotificationMessage("");
    setNotificationRecipient("");
    setScheduledDate("");
    setScheduledTime("");
  };

  const handleSendNotification = async () => {
    if (
      !notificationRecipient ||
      !notificationSubject ||
      !notificationMessage
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSending(true);
      // Simular envio de notificação
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Adicionar nova notificação à lista
      const newNotification: Notification = {
        id: notifications.length + 1,
        type: "Mensagem",
        title: notificationSubject,
        description: notificationMessage,
        time:
          scheduledDate && scheduledTime
            ? `${scheduledDate}T${scheduledTime}:00-03:00`
            : new Date().toISOString(),
        status: scheduledDate && scheduledTime ? "agendado" : "enviado",
        recipient: notificationRecipient,
      };

      setNotifications([newNotification, ...notifications]);
      setShowNewNotificationModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      alert("Ocorreu um erro ao enviar a notificação. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteNotification = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta notificação?")) {
      setNotifications(notifications.filter((notif) => notif.id !== id));
    }
    setShowNotificationMenu(null);
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowNotificationMenu(null);
  };

  return (
    <MainLayout titulo="Notificações">
      <div className="space-y-6">
        {/* Cabeçalho com abas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={() => setActiveTab("notificacoes")}
              className={`flex-1 py-4 px-6 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "notificacoes"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}>
              <Bell className="w-4 h-4" />
              Notificações
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`flex-1 py-4 px-6 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "templates"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}>
              <FileText className="w-4 h-4" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab("configuracoes")}
              className={`flex-1 py-4 px-6 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "configuracoes"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}>
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </div>
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "notificacoes" && (
          <>
            {/* Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  className={stat.className}
                />
              ))}
            </div>

            {/* Filtros e busca */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Buscar notificações..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <select
                      className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="todos">Todos os status</option>
                      <option value="enviado">Enviado</option>
                      <option value="aberto">Aberto</option>
                      <option value="falhou">Falhou</option>
                      <option value="agendado">Agendado</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros {showFilters ? "▲" : "▼"}
                  </button>
                  <button
                    onClick={handleNewNotification}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Notificação
                  </button>
                </div>
              </div>

              {/* Filtros expandidos */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Filtros Avançados
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Notificação
                      </label>
                      <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        onChange={(e) => setNotificationType(e.target.value)}
                        value={notificationType}>
                        <option value="email">E-mail</option>
                        <option value="sms">SMS</option>
                        <option value="push">Notificação Push</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Período
                      </label>
                      <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Últimos 90 dias</option>
                        <option>Personalizado</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm">
                        Aplicar Filtros
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal de Nova Notificação */}
            {showNewNotificationModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Nova Notificação
                      </h3>
                      <button
                        onClick={() => setShowNewNotificationModal(false)}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Fechar</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Destinatário *
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="email@exemplo.com"
                          value={notificationRecipient}
                          onChange={(e) =>
                            setNotificationRecipient(e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assunto *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Assunto da notificação"
                          value={notificationSubject}
                          onChange={(e) =>
                            setNotificationSubject(e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mensagem *
                        </label>
                        <textarea
                          rows={4}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Digite sua mensagem..."
                          value={notificationMessage}
                          onChange={(e) =>
                            setNotificationMessage(e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Agendamento
                          </label>
                          <input
                            type="date"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hora
                          </label>
                          <input
                            type="time"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            disabled={!scheduledDate}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewNotificationModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSendNotification}
                        disabled={isSending}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSending ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </>
                        ) : scheduledDate ? (
                          "Agendar Envio"
                        ) : (
                          "Enviar Agora"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notificação de sucesso */}
            {showSuccess && (
              <div className="fixed top-4 right-4 z-50">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">
                    Notificação enviada com sucesso!
                  </span>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <span className="sr-only">Fechar</span>
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Lista de notificações */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div key={notification.id} className="relative">
                      <NotificationCard
                        notification={notification}
                        onResend={() => handleResend(notification.id)}
                      />

                      {/* Menu de opções */}
                      {showNotificationMenu === notification.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(notification)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Ver Detalhes
                            </button>
                            <button
                              onClick={() => handleResend(notification.id)}
                              disabled={isSending}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                              {isSending ? "Enviando..." : "Reenviar"}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteNotification(notification.id)
                              }
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                              Excluir
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Nenhuma notificação encontrada
                    </h3>
                    <p className="text-gray-500">
                      Tente ajustar seus filtros de busca
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "templates" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Templates de Notificação
                </h2>
                <p className="text-sm text-gray-500">
                  Gerencie os modelos de notificação do sistema
                </p>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Novo Template
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  id: 1,
                  name: "Bem-vindo",
                  description: "E-mail de boas-vindas para novos usuários",
                  type: "E-mail",
                  lastUpdated: "2 dias atrás",
                  status: "Ativo",
                },
                {
                  id: 2,
                  name: "Confirmação de Viagem",
                  description: "Confirmação de agendamento de viagem",
                  type: "E-mail & Push",
                  lastUpdated: "1 semana atrás",
                  status: "Ativo",
                },
                {
                  id: 3,
                  name: "Lembrete de Viagem",
                  description: "Lembrete 24h antes da viagem agendada",
                  type: "E-mail & SMS",
                  lastUpdated: "3 dias atrás",
                  status: "Ativo",
                },
                {
                  id: 4,
                  name: "Pagamento Aprovado",
                  description: "Notificação de pagamento bem-sucedido",
                  type: "E-mail",
                  lastUpdated: "1 mês atrás",
                  status: "Ativo",
                },
                {
                  id: 5,
                  name: "Promoção Especial",
                  description: "Ofertas e descontos especiais",
                  type: "E-mail & Push",
                  lastUpdated: "2 semanas atrás",
                  status: "Inativo",
                },
                {
                  id: 6,
                  name: "Atualização de Conta",
                  description: "Alterações nas configurações da conta",
                  type: "E-mail",
                  lastUpdated: "5 dias atrás",
                  status: "Ativo",
                },
              ].map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {template.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{template.type}</span>
                    <span>Atualizado {template.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Editar
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Visualizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "configuracoes" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Configurações de Notificação
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">
                  Preferências de Notificação
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações por E-mail
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receber notificações por e-mail
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações Push
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receber notificações no navegador
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações por SMS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receber notificações por mensagem de texto
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">
                  Preferências de E-mail
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        E-mail do Remetente
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Endereço de e-mail que será exibido como remetente
                      </p>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="contato@witransfer.com"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        Nome do Remetente
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Nome que será exibido como remetente
                      </p>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="Witransfer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button>Salvar Configurações</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificacoesPage;
