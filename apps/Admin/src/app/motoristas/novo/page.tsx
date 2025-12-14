/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Car, Shield, FileText } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import FormularioCadastroMotorista from "@/components/motoristas/FormularioCadastroMotorista";
import Link from "next/link";

const NovoMotorista = () => {
  const router = useRouter();

  return (
    <MainLayout titulo="Novo Motorista">
      {/* Breadcrumb & Back Button */}
      <div className="mb-6">
        <Link
          href="/motoristas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors group mb-4">
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Voltar para Motoristas</span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/motoristas"
            className="hover:text-teal-600 transition-colors">
            Motoristas
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Novo Motorista</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Comunicação</p>
                <p className="text-sm font-semibold text-gray-900">Email</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Phone size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Contato</p>
                <p className="text-sm font-semibold text-gray-900">9 dígitos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-2 rounded-lg">
                <FileText size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Documentos</p>
                <p className="text-sm font-semibold text-gray-900">
                  BI e Carta
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Car size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-semibold text-gray-900">Offline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <FormularioCadastroMotorista
              onSucesso={() => {
                router.push("/motoristas");
              }}
            />
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="bg-amber-100 p-2 rounded-lg h-fit">
              <Shield size={18} className="text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-900 mb-1">
                Documentação Obrigatória
              </h4>
              <p className="text-sm text-amber-700">
                É necessário fornecer documento de identidade válido (BI ou
                Passaporte) e carta de condução para completar o cadastro do
                motorista.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NovoMotorista;
