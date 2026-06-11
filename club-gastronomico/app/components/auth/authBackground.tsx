"use client";

import { ReactNode } from "react";

interface AuthBackgroundProps {
  children: ReactNode;
}

export const AuthBackground = ({ children }: AuthBackgroundProps) => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-orange-50 to-amber-50 overflow-hidden">
      {/* Fondo con texto diagonal paralelo */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Diagonal 1 - arriba */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 -rotate-12 w-[200%]">
              <p className="text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-orange-400/20 whitespace-nowrap text-center tracking-wide">
                Club Gastronómico
              </p>
            </div>
            {/* Diagonal 2 - centro */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 w-[200%]">
              <p className="text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-orange-400/40 whitespace-nowrap text-center tracking-wide">
                Club Gastronómico
              </p>
            </div>
            {/* Diagonal 3 - abajo */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 -rotate-12 w-[200%]">
              <p className="text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-orange-400/10 whitespace-nowrap text-center tracking-wide">
                Club Gastronómico
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">{children}</div>
    </div>
  );
};
