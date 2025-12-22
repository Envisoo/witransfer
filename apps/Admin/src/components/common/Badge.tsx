/** @format */

import React from "react";

type BadgeVariant =
  | "ativo"
  | "inativo"
  | "suspenso"
  | "online"
  | "offline"
  | "concluida"
  | "cancelada"
  | "pago"
  | "pendente"
  | "success"
  | "warning"
  | "info"
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  ativo: "status-ativo",
  inativo: "status-inativo",
  suspenso: "status-suspenso",
  online: "status-online",
  offline: "status-offline",
  concluida: "status-concluida",
  cancelada: "status-cancelada",
  pago: "status-pago",
  pendente: "status-pendente",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  secondary: "status-secondary",
  outline: "status-outline",
  destructive: "status-destructive",
  error: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
}) => {
  return (
    <span
      className={`
        badge px-3 py-1 text-xs font-semibold rounded-full
        ${variantClasses[variant]}
        ${className}
      `}>
      {children}
    </span>
  );
};

export default Badge;
