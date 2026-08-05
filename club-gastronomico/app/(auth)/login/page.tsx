"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { AuthCard } from "@/app/components/auth/authcard";
import { AuthBackground } from "@/app/components/auth/authBackground";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(form);
    } catch {
      console.log("buscando error", error);
      setError("Email o contraseña incorrectos");
      setIsLoading(false);
    }
  };

  return (
    <AuthBackground>
      <AuthCard icon={LogIn} title="Bienvenido" subtitle="Inicia sesión en tu cuenta">
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
            <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 transition">
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
            className="w-full bg-linear-to-r from-orange-500 to-orange-600 cursor-pointer text-white py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
      </AuthCard>
    </AuthBackground>
  );
}
