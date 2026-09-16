"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, CheckCircle } from "lucide-react";
import { useCreateCategory } from "@/hook/category/UseCreateCategory";

export default function CreateCategoryPage() {
  const router = useRouter();

  const { createCa, loading } = useCreateCategory();

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación
    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio");
      return;
    }

    setError(null);

    try {
      const response = await createCa({ name: name.trim() });

      if (response) {
        // Mostrar modal de éxito
        setShowSuccessModal(true);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al crear la categoría");
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setName("");
  };

  // Manejar "Crear otra"
  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    resetForm();
  };

  // Manejar "Ir a categorías"
  const handleGoToCategories = () => {
    setShowSuccessModal(false);
    router.push("/categorias");
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header con Volver centrado */}
      <div className="relative flex items-center justify-center mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 inline-flex hover:cursor-pointer items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Crear categoría</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6">
          {/* Mensajes de error */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre de la categoría */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de la categoría <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Bebidas, Entradas, Postres..."
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <p className="mt-1.5 text-xs text-slate-400">Ingresa un nombre único y descriptivo para la categoría</p>
            </div>

            {/* Botones */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex hover:cursor-pointer items-center justify-center px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creando...
                  </>
                ) : (
                  <>
                    <Package className="h-4 w-4" />
                    Crear categoría
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Categoría creada!</h3>
                <p className="text-sm text-gray-500 mb-6">
                  La categoría <span className="font-medium text-gray-700">{name}</span> ha sido creada exitosamente.
                  <br />
                  <span className="text-gray-400">¿Desea registrar otra categoría?</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoToCategories}
                  className="flex-1 py-2.5 border border-slate-400 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors hover:cursor-pointer"
                >
                  No, ir a categorías
                </button>
                <button
                  type="button"
                  onClick={handleCreateAnother}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors hover:cursor-pointer"
                >
                  Sí, crear otra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
