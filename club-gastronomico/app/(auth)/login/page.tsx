"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "@/hook/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(form);
    } catch {
      setError("Los datos ingresados no son correctos");
      setIsLoading(false);
    }
  };

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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card del formulario */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600"></div>

            <div className="p-8">
              {/* Logo y título */}
              <div className="text-center mb-8">
                <div className="bg-linear-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
                <p className="text-gray-500 mt-1">Inicia sesión en tu cuenta</p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50"
                    placeholder="Correo electrónico"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 pr-12"
                    placeholder="Contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700 transition"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Ingresando...</span>
                    </div>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/register" className="text-orange-600 font-semibold hover:text-orange-700 transition">
                    Regístrate
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Texto decorativo */}
          <p className="text-center text-gray-400 text-sm mt-6">Gestiona tu negocio de manera inteligente</p>
        </div>
      </div>
    </div>
  );
}
