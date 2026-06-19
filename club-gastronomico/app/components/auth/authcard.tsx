"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface AuthCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const AuthCard = ({ icon: Icon, title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600"></div>

        <div className="p-8">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="bg-linear-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-500 mt-1">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Texto decorativo */}
      <p className="text-center text-gray-400 text-sm mt-6">Gestiona tu negocio de manera inteligente</p>
    </div>
  );
};
