'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderOpen,
  Activity,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mes Contenus',
    href: '/contents',
    icon: FileText,
  },
  {
    title: 'Gestion des Contenus',
    href: '/admin/contents',
    icon: FolderOpen,
    adminOnly: true,
  },
  {
    title: 'Gestion des Utilisateurs',
    href: '/users',
    icon: Users,
    adminOnly: true,
  },
  {
    title: 'Logs',
    href: '/logs',
    icon: Activity,
    adminOnly: true,
  },
];

export function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 lg:translate-x-0 overflow-hidden',
          isCollapsed ? 'w-20' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header with collapse button */}
        <div className={cn(
          "flex items-center border-b border-gray-200 p-4 min-h-[64px]",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">NT</span>
              </div>
              {/* Toggle button (desktop) - en dessous du logo */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
                title="Agrandir"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                NG TECH
              </h2>
              
              {/* Toggle button (desktop) */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
                title="Réduire"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Close button (mobile) */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            // Skip admin-only items if user is not admin
            if (item.adminOnly && !isAdmin) return null;

            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:scale-105 active:scale-95',
                  'hover:shadow-sm',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50',
                  isCollapsed && 'justify-center'
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )} />
                {!isCollapsed && (
                  <span className="animate-in fade-in slide-in-from-left duration-200">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
