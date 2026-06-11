"use client";

import { useForgotPassword } from "@/hook/useForgotPassword";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ForgotPasswordForm = () => {
  const { email, setEmail, error, success, loading, handleSubmit } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50"
          placeholder="Correo electrónico"
          required
          disabled={loading}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">{error}</div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl text-sm text-center">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-orange-500 to-orange-600 cursor-pointer text-white py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Enviando...</span>
          </div>
        ) : (
          "Enviar enlace de recuperación"
        )}
      </button>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition"
        >
          <ArrowLeft size={16} />
          Volver al inicio de sesión
        </Link>
      </div>
    </form>
  );
};
