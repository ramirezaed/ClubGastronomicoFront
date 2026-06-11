import { useState } from "react";
import { forgotPassword } from "@/services/auth.service";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setSuccess(response.message);
      setEmail(""); // limpiar el campo
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, error, success, loading, handleSubmit };
};
