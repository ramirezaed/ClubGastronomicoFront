import { useState } from "react";
import { useRouter } from "next/navigation"; // si usas Next.js App Router
// import { useNavigate } from 'react-router-dom'; // si usas React Router v6
import { resetPassword } from "@/services/auth.service";

export const useResetPassword = (token: string) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await resetPassword(token, newPassword);
      setSuccess(response.message);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { newPassword, setNewPassword, confirmPassword, setConfirmPassword, error, success, loading, handleSubmit };
};
