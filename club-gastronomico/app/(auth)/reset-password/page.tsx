"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/app/components/auth/resetPasswordForm";
import { LockKeyhole } from "lucide-react";
import { AuthBackground } from "@/app/components/auth/authBackground";
import { AuthCard } from "@/app/components/auth/authcard";
import Link from "next/link";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
          Token no válido o expirado
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition"
          >
            Solicitar nuevo enlace de recuperación
          </Link>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <AuthBackground>
      <AuthCard icon={LockKeyhole} title="Restablecer contraseña" subtitle="Ingresa tu nueva contraseña">
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </AuthCard>
    </AuthBackground>
  );
}
