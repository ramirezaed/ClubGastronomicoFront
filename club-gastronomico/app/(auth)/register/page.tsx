// app/(auth)/register/page.tsx
"use client";

import { registerUser } from "@/services/auth.service";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/ui/Modal";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // seteo los valores iniciales del formulario, por defecto estan en blanco
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setCargando(true);
      setError("");

      const response = await registerUser({
        name,
        lastname,
        email,
        password,
      });

      setModalMessage(response.message || "Usuario registrado exitosamente");
      setModalOpen(true);

      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        {/* <div className="w-full max-w-6xl mx-auto"> */}
        <div className="w-full">
          <div className="bg-white  shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Lado izquierdo - Logo y descripción */}
              <div className="w-full md:w-1/2 bg-linear-to-br from-orange-500 to-orange-700 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl">🍽️</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Club Gastronómico</h1>
                  <p className="text-orange-100 text-lg text-center">
                    La plataforma completa para la gestión de tu negocio gastronómico
                  </p>
                </div>

                <div className="mt-8 space-y-3 text-orange-100 text-center">
                  <p className="flex justify-center gap-2">
                    <span>✓</span> Gestión de negocio
                  </p>
                  <p className="flex justify-center gap-2">
                    <span>✓</span> Menús digitales interactivos
                  </p>
                  <p className="flex justify-center gap-2">
                    <span>✓</span> Asistente IA
                  </p>
                  <p className="flex justify-center gap-2">
                    <span>✓</span> Reportes avanzados
                  </p>
                </div>
              </div>

              {/* Lado derecho - Formulario */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold  text-gray-800">Crear cuenta</h2>
                  <p className="text-gray-500 mt-2">Regístrate para comenzar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                      <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition pr-10"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? (
                          <Eye size={18} className="text-gray-400" />
                        ) : (
                          <EyeOff size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showConfirmPassword ? (
                          <Eye size={18} className="text-gray-400" />
                        ) : (
                          <EyeOff size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={cargando}
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 cursor-pointer transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cargando ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registrando...</span>
                      </div>
                    ) : (
                      "Registrarse"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition">
                      Iniciar sesión
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Registro exitoso!" message={modalMessage} />
    </>
  );
}
