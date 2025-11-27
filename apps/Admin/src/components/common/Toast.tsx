import React from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

type ToastType = 'sucesso' | 'erro' | 'info' | 'aviso';

interface ToastProps {
  tipo: ToastType;
  titulo: string;
  mensagem?: string;
  onClose?: () => void;
  autofecha?: boolean;
  duracao?: number;
}

const icones: Record<ToastType, React.ReactNode> = {
  sucesso: <CheckCircle className="text-green-600" size={24} />,
  erro: <XCircle className="text-red-600" size={24} />,
  info: <Info className="text-blue-600" size={24} />,
  aviso: <AlertCircle className="text-yellow-600" size={24} />,
};

const bgClasses: Record<ToastType, string> = {
  sucesso: 'bg-green-50 border-l-4 border-green-600',
  erro: 'bg-red-50 border-l-4 border-red-600',
  info: 'bg-blue-50 border-l-4 border-blue-600',
  aviso: 'bg-yellow-50 border-l-4 border-yellow-600',
};

const textClasses: Record<ToastType, string> = {
  sucesso: 'text-green-800',
  erro: 'text-red-800',
  info: 'text-blue-800',
  aviso: 'text-yellow-800',
};

const Toast: React.FC<ToastProps> = ({
  tipo,
  titulo,
  mensagem,
  onClose,
  autofecha = true,
  duracao = 3000,
}) => {
  React.useEffect(() => {
    if (autofecha && onClose) {
      const timer = setTimeout(onClose, duracao);
      return () => clearTimeout(timer);
    }
  }, [autofecha, duracao, onClose]);

  return (
    <div
      className={`
        ${bgClasses[tipo]} rounded-lg shadow-lg p-4 flex items-start gap-3
        animate-slide-in-up max-w-md
      `}
    >
      <div className="flex-shrink-0">{icones[tipo]}</div>

      <div className="flex-1">
        <p className={`font-semibold ${textClasses[tipo]}`}>{titulo}</p>
        {mensagem && <p className={`text-sm mt-1 ${textClasses[tipo]}`}>{mensagem}</p>}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white rounded transition-colors"
        >
          <X size={18} className={textClasses[tipo]} />
        </button>
      )}
    </div>
  );
};

export default Toast;