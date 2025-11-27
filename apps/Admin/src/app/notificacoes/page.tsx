/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";

const NotificacoesPage = () => {
  const tabs = ["Notificações", "Templates", "Configurações"];
  const [abaAtiva, setAbaAtiva] = useState("Notificações");

  const notificacoes = [
    {
      id: 1,
      tipo: "Bem-vindo",
      destinatario: "novo_cliente@example.com",
      status: "enviado",
      data: "2024-12-25 10:30",
    },
    {
      id: 2,
      tipo: "Confirmação de Viagem",
      destinatario: "cliente@example.com",
      status: "aberto",
      data: "2024-12-24 15:45",
    },
    {
      id: 3,
      tipo: "Pagamento Realizado",
      destinatario: "motorista@example.com",
      status: "enviado",
      data: "2024-12-24 12:00",
    },
  ];

  return (
    <MainLayout titulo="Gestão de Notificações">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestão de Notificações
        </h1>
        <p className="text-gray-600">
          Gerencie templates e configurações de e-mails
        </p>
      </div>

      {/* Abas */}
      <div className="card mb-6 border-b">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setAbaAtiva(tab)}
              className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                abaAtiva === tab
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Abas */}
      {abaAtiva === "Notificações" && (
        <div>
          {/* Filtros */}
          <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Filtrar por Tipo</label>
              <select className="form-input">
                <option>Todos os tipos</option>
                <option>Bem-vindo</option>
                <option>Confirmação de Viagem</option>
                <option>Lembrete</option>
                <option>Pagamento</option>
              </select>
            </div>
            <div>
              <label className="form-label">Filtrar por Status</label>
              <select className="form-input">
                <option>Todos os status</option>
                <option>Enviado</option>
                <option>Aberto</option>
                <option>Clicado</option>
                <option>Falhou</option>
              </select>
            </div>
          </div>

          {/* Tabela de Notificações */}
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Destinatário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Data
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notificacoes.map((notif) => (
                  <tr
                    key={notif.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {notif.tipo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {notif.destinatario}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          notif.status === "enviado"
                            ? "bg-blue-100 text-blue-800"
                            : notif.status === "aberto"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                        {notif.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {notif.data}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Reenviar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {abaAtiva === "Templates" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Templates de E-mail
            </h3>
            <Link href="/notificacoes/modelos">
              <Button>Novo Template</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                nome: "Bem-vindo",
                descricao: "E-mail de boas-vindas para novos usuários",
                uso: 245,
              },
              {
                nome: "Confirmação de Viagem",
                descricao: "Confirmação e detalhes da viagem",
                uso: 1200,
              },
              {
                nome: "Lembrete de Viagem",
                descricao: "Lembrete 24h antes da viagem",
                uso: 856,
              },
              {
                nome: "Pagamento Realizado",
                descricao: "Confirmação de pagamento",
                uso: 342,
              },
            ].map((template, idx) => (
              <div key={idx} className="card p-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {template.nome}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {template.descricao}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{template.uso} usos</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600">
                      Testar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {abaAtiva === "Configurações" && (
        <div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Configurações de Notificações
            </h3>

            <div className="space-y-4">
              {[
                { nome: "Bem-vindo", habilitado: true },
                { nome: "Confirmação de Viagem", habilitado: true },
                { nome: "Lembrete de Viagem", habilitado: true },
                { nome: "Avaliação", habilitado: false },
                { nome: "Recuperação de Senha", habilitado: true },
                { nome: "Pagamento Realizado", habilitado: true },
              ].map((config, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{config.nome}</p>
                    <p className="text-xs text-gray-500">
                      Enviar automaticamente quando aplicável
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.habilitado}
                      className="w-4 h-4"
                      readOnly
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t flex gap-3">
              <Button variant="primary">Salvar Configurações</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default NotificacoesPage;
