import React from 'react';

type BadgeVariant =
  | 'ativo'
  | 'inativo'
  | 'suspenso'
  | 'online'
  | 'offline'
  | 'concluida'
  | 'cancelada'
  | 'pago'
  | 'pendente'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  ativo: 'status-ativo',
  inativo: 'status-inativo',
  suspenso: 'status-suspenso',
  online: 'status-online',
  offline: 'status-offline',
  concluida: 'status-concluida',
  cancelada: 'status-cancelada',
  pago: 'status-pago',
  pendente: 'status-pendente',
  default: 'bg-gray-100 text-gray-800',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  return (
    <span
      className={`
        badge px-3 py-1 text-xs font-semibold rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;