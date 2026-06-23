"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/hook/useplan";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ArrowLeft, Save, Package, DollarSign, AlignLeft } from "lucide-react";

export default function RegisterPlanPage() {
  const router = useRouter();
  const { register, loading, error } = usePlan();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validaciones
    if (!name.trim() || !price.trim() || !description.trim()) {
      setFormError("Todos los campos son obligatorios");
      return;
    }
    if (Number(price) < 0) {
      setFormError("El precio no puede ser menor a 0");
      return;
    }

    const response = await register({
      name,
      price,
      description,
    });

    if (response) {
      router.push("/planes");
    }
  };

  if (loading) {
    return <LoadingState title="Registrando plan" description="Espere un momento por favor" />;
  }

  return (
    <div className="w-full h-full bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 flex flex-col">
      {/* Header con ícono y título */}
      <div className="p-8 py-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Crear nuevo plan</h1>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="py-5 space-y-6 flex flex-col items-center">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mb-8" />

        {/* Campo: Nombre */}
        <div className="w-full max-w-xl ">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              Nombre del plan
            </span>
          </label>
          <input
            type="text"
            placeholder="Ej: Plan Básico, Plan Premium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-1 py-1 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
            required
          />
        </div>

        {/* Campo: Precio */}
        <div className="w-full max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              Precio
            </span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-12 pr-1 py-1 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        {/* Campo: Descripción */}
        <div className="w-full max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-gray-400" />
              Descripción
            </span>
          </label>
          <textarea
            placeholder="Describe las características del plan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none outline-none"
            required
          />
        </div>

        {/* Mensaje de error del formulario */}
        {formError && (
          <div className="w-full max-w-xl bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-xl">
            {formError}
          </div>
        )}

        {/* Mensaje de error de la API */}
        {error && (
          <div className="w-full max-w-xl bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-xl">{error}</div>
        )}

        {/* Botón Guardar */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full max-w-xl
            inline-flex items-center justify-center gap-2
            px-6 py-2
            rounded-xl
            bg-linear-to-r from-orange-500 to-orange-600
            text-white font-medium
            shadow-md
            cursor-pointer
            hover:scale-[1.02] hover:shadow-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Crear plan
            </>
          )}
        </button>
      </div>

      {/* Botón Volver */}
      <div className="from-orange-100 via-orange-50/20 to-orange-100  flex flex-col items-center">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mb-4" />
        <div className="flex flex-col sm:flex-row justify-center items-center ">
          <button
            onClick={() => router.back()}
            className="
              w-full sm:w-auto
              px-6 py-2.5
              rounded-xl
              bg-linear-to-r from-orange-500 to-orange-600
              text-white
              font-medium
              shadow-md
              hover:scale-[1.02]
              transition-all
              duration-200
              cursor-pointer
            "
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
