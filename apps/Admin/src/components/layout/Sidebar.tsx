/** @format */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Car,
  MapPin,
  DollarSign,
  BarChart3,
  Bell,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/motoristas", label: "Motoristas", icon: Car },
  { href: "/viaturas", label: "Viaturas", icon: Car },
  { href: "/viagens", label: "Viagens", icon: MapPin },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/notificacoes", label: "Notificações", icon: Bell },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`
        bg-gradient-to-b from-primary-700 to-primary-800 text-white
        ${
          mobile
            ? "fixed inset-0 z-50 w-64 overflow-y-auto"
            : "hidden md:flex flex-col w-64 sticky top-0 h-screen"
        }
      `}>
      {/* Header */}
      <div className="p-4 border-b border-primary-600">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">witransfer</h1>
          {mobile && (
            <button onClick={onClose} className="p-1">
              <X size={20} />
            </button>
          )}
        </div>
        <p className="text-xs text-primary-100 mt-1">Sistema de Gestão</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={mobile ? onClose : undefined}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg 
                hover:bg-primary-600 transition-colors duration-200
                ${
                  isActive
                    ? "bg-white text-primary-700 font-semibold"
                    : "text-primary-100"
                }
              `}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}>
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-600">
        <div className="text-xs text-primary-200">
          <p>v1.0.0</p>
          <p>© 2024 witransfer</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
