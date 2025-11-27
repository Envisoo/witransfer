'use client';

import { useCallback } from 'react';
import toast from 'react-hot-toast';

//type TipoNotificacao = 'sucesso' | 'erro' | 'info' | 'aviso';

interface UseNotificationReturn {
  sucesso: (mensagem: string) => void;
  erro: (mensagem: string) => void;
  info: (mensagem: string) => void;
  aviso: (mensagem: string) => void;
  promise: <T>(
    promisse: Promise<T>,
    mensagens: {
      loading: string;
      success: string;
      error: string;
    }
  ) => Promise<T>;
}

export const useNotification = (): UseNotificationReturn => {
  const sucesso = useCallback((mensagem: string) => {
    toast.success(mensagem, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: '#fff',
        borderRadius: '0.5rem',
        padding: '1rem',
      },
    });
  }, []);

  const erro = useCallback((mensagem: string) => {
    toast.error(mensagem, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        borderRadius: '0.5rem',
        padding: '1rem',
      },
    });
  }, []);

  const info = useCallback((mensagem: string) => {
    toast(mensagem, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        borderRadius: '0.5rem',
        padding: '1rem',
      },
    });
  }, []);

  const aviso = useCallback((mensagem: string) => {
    toast(mensagem, {
      duration: 4000,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#000',
        borderRadius: '0.5rem',
        padding: '1rem',
      },
    });
  }, []);

  const promise = useCallback(
    <T>(
      promisse: Promise<T>,
      mensagens: {
        loading: string;
        success: string;
        error: string;
      }
    ): Promise<T> => {
      return toast.promise(
        promisse,
        {
          loading: mensagens.loading,
          success: mensagens.success,
          error: mensagens.error,
        },
        {
          style: {
            borderRadius: '0.5rem',
            padding: '1rem',
          },
        }
      );
    },
    []
  );

  return {
    sucesso,
    erro,
    info,
    aviso,
    promise,
  };
};

export default useNotification;