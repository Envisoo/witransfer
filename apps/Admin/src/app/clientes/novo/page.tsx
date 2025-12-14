/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Shield } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import FormularioCliente from "@/components/clientes/FormularioCliente";
import Link from "next/link";

const NovoCliente = () => {
  const router = useRouter();

  return (
    <MainLayout titulo="Novo Cliente">
      {/* Breadcrumb & Back Button */}
      <div className="mb-6">
        <Link
          href="/clientes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors group mb-4">
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Voltar para Clientes</span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/clientes"
            className="hover:text-teal-600 transition-colors">
            Clientes
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Novo Cliente</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Comunicação</p>
                <p className="text-sm font-semibold text-gray-900">
                  Email obrigatório
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Contato</p>
                <p className="text-sm font-semibold text-gray-900">9 dígitos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Shield size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-semibold text-gray-900">
                  Ativo por padrão
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Form Sections */}
          <div className="p-6">
            <FormularioCliente
              onSucesso={() => {
                router.push("/clientes");
              }}
            />
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="bg-blue-100 p-2 rounded-lg h-fit">
              <Shield size={18} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Informação de Privacidade
              </h4>
              <p className="text-sm text-blue-700">
                Todos os dados dos clientes são armazenados de forma segura e
                criptografada. Apenas usuários autorizados têm acesso a estas
                informações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NovoCliente;
