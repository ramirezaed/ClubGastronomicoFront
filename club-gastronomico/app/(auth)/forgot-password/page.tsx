"use client";
import { KeyRound } from "lucide-react";
import { ForgotPasswordForm } from "@/app/components/auth/forgotPasswordForm";
import { AuthBackground } from "@/app/components/auth/authBackground";
import { AuthCard } from "@/app/components/auth/authcard";

export default function ForgotPasswordPage() {
  return (
    <AuthBackground>
      <AuthCard
        icon={KeyRound}
        title="Recuperar contraseña"
        subtitle="Te enviaremos un enlace para restablecer tu contraseña"
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthBackground>
  );
}
