"use client";

import { useResetPassword } from "@/hook/useResetPassword";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { newPassword, setNewPassword, confirmPassword, setConfirmPassword, error, success, loading, handleSubmit } =
    useResetPassword(token);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nueva contraseña */}
      <div className="relative">
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 pr-12"
          placeholder="Nueva contraseña"
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirmar contraseña */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 pr-12"
          placeholder="Confirmar contraseña"
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
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
        className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Actualizando...</span>
          </div>
        ) : (
          "Restablecer contraseña"
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
