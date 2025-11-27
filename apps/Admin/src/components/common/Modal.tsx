'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  aberto: boolean;
  onClose: () => void;
  titulo?: string;
  children: React.ReactNode;
  tamanho?: 'sm' | 'md' | 'lg' | 'xl';
  pé?: React.ReactNode;
}

const tamanhoClasses = {
  sm: 'w-full md:w-96',
  md: 'w-full md:w-2/3 lg:w-1/2',
  lg: 'w-full md:w-4/5 lg:w-3/4',
  xl: 'w-full md:w-11/12 lg:w-5/6',
};

const Modal: React.FC<ModalProps> = ({
  aberto,
  onClose,
  titulo,
  children,
  tamanho = 'md',
  pé,
}) => {
  // Fechar ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && aberto) {
        onClose();
      }
    };

    if (aberto) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [aberto, onClose]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-lg shadow-xl
          ${tamanhoClasses[tamanho]}
          max-h-[90vh] overflow-y-auto
          animate-slide-in-up
        `}
      >
        {/* Header */}
        {titulo && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{titulo}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fechar modal"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {pé && (
          <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
            {pé}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;