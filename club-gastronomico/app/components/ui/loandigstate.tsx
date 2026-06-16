"use client";

import { AuthBackground } from "@/app/components/auth/authBackground";

interface LoadingStateProps {
  title?: string;
  description?: string;
  maxWidth?: "md" | "lg" | "xl";
}

export function LoadingState({
  title = "Cargando información",
  description = "Por favor, espera unos segundos.",
  maxWidth = "lg",
}: LoadingStateProps) {
  const widthClasses = {
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AuthBackground>
      <div className={`w-full ${widthClasses[maxWidth]}`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600" />

          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

            <p className="text-gray-500 mt-2">{description}</p>

            <div className="mt-8">
              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="
                    h-full
                    w-full
                    origin-left
                    rounded-full
                    bg-linear-to-r
                    from-orange-500
                    to-orange-600
                    animate-loading-bar
                  "
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">Gestiona tu negocio de manera inteligente</p>
      </div>
    </AuthBackground>
  );
}
