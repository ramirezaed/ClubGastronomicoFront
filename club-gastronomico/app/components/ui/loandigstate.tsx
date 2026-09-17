"use client";

import { AuthBackground } from "@/app/components/auth/authBackground";

interface LoadingStateProps {
  title?: string;
  description?: string;
  maxWidth?: "sm" | "md" | "lg";
}

export function LoadingState({
  title = "Cargando...",
  description = "Por favor, espera un momento.",
  maxWidth = "sm",
}: LoadingStateProps) {
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <AuthBackground>
      <div className={`w-full ${widthClasses[maxWidth]}`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <div className="h-0.5 bg-linear-to-r from-gray-300 to-gray-400" />

          <div className="p-6 text-center">
            {/* Spinner - Ruedita de carga en lugar de la barra */}
            <div className="flex justify-center mb-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">Cargando información</p>
      </div>
    </AuthBackground>
  );
}
