/** @format */

"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Bell, Settings,  Users, Send, X,
  Search, Plus, Target, BarChart3,
  Eye, Edit, Trash2, Copy, FileText, 
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "email" | "sms" | "push" | "inapp";
  status: "sent" | "scheduled" | "draft" | "failed";
  recipients: number;
  opened: number;
  clicked: number;
  createdAt: Date;
  scheduledFor?: Date;
  campaign?: string;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
  lastUsed: Date;
  timesUsed: number;
}

const NotificacoesPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [, setShowTemplateModal] = useState(false);
  const [, setShowCampaignModal] = useState(false);
  const [, setSelectedNotification] = useState<Notification | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formType, setFormType] = useState<"email" | "sms" | "push" | "inapp">("email");
  const [formRecipients, setFormRecipients] = useState("");
  const [formScheduleDate, setFormScheduleDate] = useState("");
  const [formScheduleTime, setFormScheduleTime] = useState("");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1", title: "Bem-vindo ao WiTransfer", message: "Obrigado por se registrar! Comece sua primeira viagem hoje.",
      type: "email", status: "sent", recipients: 1250, opened: 980, clicked: 450,
      createdAt: new Date(2024, 11, 15), campaign: "Onboarding"
    },
    {
      id: "2", title: "Confirmação de Viagem", message: "Sua viagem foi confirmada para amanhã às 09:00",
      type: "push", status: "sent", recipients: 450, opened: 420, clicked: 380,
      createdAt: new Date(2024, 11, 16),
    },
    {
      id: "3", title: "Promoção Especial", message: "20% de desconto na sua próxima viagem!",
      type: "email", status: "scheduled", recipients: 5000, opened: 0, clicked: 0,
      createdAt: new Date(2024, 11, 14), scheduledFor: new Date(2024, 11, 20), campaign: "Marketing"
    },
  ]);

  const [templates] = useState<Template[]>([
    { id: "1", name: "Bem-vindo", subject: "Bem-vindo ao WiTransfer!", content: "Olá {nome}, obrigado por se juntar...", type: "email", lastUsed: new Date(), timesUsed: 156 },
    { id: "2", name: "Confirmação", subject: "Viagem Confirmada", content: "Sua viagem foi confirmada para {data}...", type: "push", lastUsed: new Date(), timesUsed: 892 },
    { id: "3", name: "Lembrete", subject: "Não esqueça!", content: "Sua viagem está próxima...", type: "sms", lastUsed: new Date(), timesUsed: 234 },
  ]);

  const stats = [
    { label: "Total Enviado", value: "12,458", change: "+12.3%", positive: true, icon: Send, color: "blue" },
    { label: "Taxa de Abertura", value: "68.4%", change: "+5.2%", positive: true, icon: Eye, color: "green" },
    { label: "Taxa de Clique", value: "24.1%", change: "+3.8%", positive: true, icon: Target, color: "purple" },
    { label: "Falhas", value: "142", change: "-8.5%", positive: true, icon: X, color: "red" },
  ];

  const weeklyData = [
    { day: "Seg", sent: 1200, opened: 820, clicked: 290 },
    { day: "Ter", sent: 1450, opened: 990, clicked: 350 },
    { day: "Qua", sent: 1100, opened: 750, clicked: 260 },
    { day: "Qui", sent: 1680, opened: 1150, clicked: 410 },
    { day: "Sex", sent: 1890, opened: 1290, clicked: 465 },
    { day: "Sáb", sent: 980, opened: 670, clicked: 240 },
    { day: "Dom", sent: 750, opened: 510, clicked: 185 },
  ];

  const channelData = [
    { name: "Email", value: 5420, color: "#3b82f6" },
    { name: "SMS", value: 2840, color: "#10b981" },
    { name: "Push", value: 3120, color: "#8b5cf6" },
    { name: "In-App", value: 1078, color: "#f59e0b" },
  ];

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || notif.type === filterType;
    const matchesStatus = filterStatus === "all" || notif.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateNotification = () => {
    if (!formTitle || !formMessage || !formRecipients) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const newNotif: Notification = {
      id: Date.now().toString(),
      title: formTitle,
      message: formMessage,
      type: formType,
      status: formScheduleDate ? "scheduled" : "sent",
      recipients: parseInt(formRecipients),
      opened: 0,
      clicked: 0,
      createdAt: new Date(),
      scheduledFor: formScheduleDate ? new Date(formScheduleDate + "T" + formScheduleTime) : undefined,
    };

    setNotifications([newNotif, ...notifications]);
    setShowNewModal(false);
    resetForm();
  };


  const handleDeleteNotification = (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const handleDuplicateNotification = (notif: Notification) => {
    const duplicate: Notification = {
      ...notif,
      id: Date.now().toString(),
      title: notif.title + " (Cópia)",
      status: "draft",
      createdAt: new Date(),
    };
    setNotifications([duplicate, ...notifications]);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormMessage("");
    setFormRecipients("");
    setFormScheduleDate("");
    setFormScheduleTime("");
  };

  return (
    <MainLayout titulo="Notificações">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {[
            { id: "overview", label: "Visão Geral", icon: BarChart3 },
            { id: "notifications", label: "Notificações", icon: Bell },
            { id: "campaigns", label: "Campanhas", icon: Target },
            { id: "templates", label: "Templates", icon: FileText },
            { id: "settings", label: "Configurações", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-medium text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 bg-${stat.color}-50 rounded-xl`}>
                      <Icon className={`text-${stat.color}-600`} size={20} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Semanal</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                    <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Distribuição por Canal</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={channelData} cx="50%" cy="50%" labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90} dataKey="value">
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bus car notificações..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <select className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                  value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="all">Todos os tipos</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push</option>
                </select>
                <button onClick={() => setShowNewModal(true)}
                  className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium flex items-center gap-2">
                  <Plus size={18} />
                  Nova Notificação
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredNotifications.map((notif) => (
              <div key={notif.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{notif.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${notif.status === "sent" ? "bg-green-100 text-green-700" :
                          notif.status === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                        }`}>
                        {notif.status === "sent" ? "Enviado" : notif.status === "scheduled" ? "Agendado" : "Rascunho"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{notif.message}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{notif.recipients.toLocaleString()}</span>
                      </div>
                      {notif.status === "sent" && (
                        <>
                          <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{((notif.opened / notif.recipients) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target size={16} />
                            <span>{((notif.clicked / notif.recipients) * 100).toFixed(1)}%</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedNotification(notif)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => handleDuplicateNotification(notif)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                      <Copy size={18} />
                    </button>
                    <button onClick={() => handleDeleteNotification(notif.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Campanhas Ativas</h3>
              <button onClick={() => setShowCampaignModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium flex items-center gap-2">
                <Plus size={18} />
                Nova Campanha
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Onboarding", "Marketing", "Retenção"].map((campaign, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900 mb-2">{campaign}</h4>
                  <p className="text-sm text-gray-500 mb-4">Campanha automática de {campaign.toLowerCase()}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{(i + 1) * 234} enviados</span>
                    <button className="text-blue-600 hover:underline">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Templates</h3>
              <button onClick={() => setShowTemplateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium flex items-center gap-2">
                <Plus size={18} />
                Novo Template
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                      <p className="text-sm text-gray-500">{template.content.substring(0, 100)}...</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span>Usado {template.timesUsed}x</span>
                        <span>Última vez: {template.lastUsed.toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Configurações de Notificação</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provedor de Email (SMTP)</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="smtp.exemplo.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key SMS</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="Sua API key" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Push Notifications</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="Firebase/OneSignal key" />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Salvar Configurações
            </button>
          </div>
        </div>
      )}

      {/* Modal Nova Notificação */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Nova Notificação</h3>
              <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="Título da notificação" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                <textarea value={formMessage} onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg" rows={4} placeholder="Conteúdo da mensagem" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                  <select value={formType} onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push</option>
                    <option value="inapp">In-App</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destinatários *</label>
                  <input type="number" value={formRecipients} onChange={(e) => setFormRecipients(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="Número de destinatários" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agendar Data</label>
                  <input type="date" value={formScheduleDate} onChange={(e) => setFormScheduleDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                  <input type="time" value={formScheduleTime} onChange={(e) => setFormScheduleTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={handleCreateNotification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {formScheduleDate ? "Agendar" : "Enviar Agora"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default NotificacoesPage;
