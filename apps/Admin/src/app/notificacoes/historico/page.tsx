'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useFetch } from '@/hooks/useFetch';
import Input from '@/components/common/Input';
import Paginacao from '@/components/common/Paginacao';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Email {
  id: number;
  tipo: string;
  destinatario: string;
  assunto: string;
  status: string;
  dataPagamento: string;
  aberturas: number;
  cliques: number;
}

const HistoricoEmails = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');

  const { dados, carregando, erro } = useFetch(
    `/notificacoes/historico?pagina=${pagina}&limite=20${busca ? `&busca=${busca}` : ''}`,
    { autoFetch: true }
  );

  const statusColors: Record<string, string> = {
    enviado: 'bg-blue-100 text-blue-800',
    aberto: 'bg-green-100 text-green-800',
    clicado: 'bg-purple-100 text-purple-800',
    falhou: 'bg-red-100 text-red-800',
  };

  return (
    <MainLayout titulo="Histórico de E-mails">
      <div className="mb-6">
        <Link href="/notificacoes" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
          <ArrowLeft size={20} />
          Voltar para Notificações
        </Link>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <Input
          placeholder="Buscar por destinatário ou tipo..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />
      </div>

      {/* Tabela */}
      {carregando ? (
        <LoadingSpinner />
      ) : erro ? (
        <div className="card p-6 text-center text-red-600">
          <p>{erro}</p>
        </div>
      ) : !dados || dados.data.length === 0 ? (
        <div className="card p-6 text-center text-gray-600">
          <p>Nenhum e-mail encontrado</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Destinatário</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Assunto</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Aberturas</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Cliques</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dados.data.map((email: Email) => (
                  <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{email.tipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate">{email.destinatario}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate">{email.assunto}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[email.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{email.aberturas}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{email.cliques}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{email.dataPagamento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {dados.totalPaginas > 1 && (
            <Paginacao
              paginaAtual={pagina}
              totalPaginas={dados.totalPaginas}
              onMudarPagina={setPagina}
              carregando={carregando}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default HistoricoEmails;