'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  titulo?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, titulo }) => {
  const { autenticado, carregando } = useAuth();
  const router = useRouter();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  useEffect(() => {
    if (!carregando && !autenticado) {
      router.push('/login');
    }
  }, [autenticado, carregando, router]);

  if (carregando) {
    return <LoadingSpinner fullHeight />;
  }

  if (!autenticado) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Sidebar Mobile */}
      {sidebarAberta && (
        <Sidebar mobile onClose={() => setSidebarAberta(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header titulo={titulo} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarAberta(!sidebarAberta)}
          className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;