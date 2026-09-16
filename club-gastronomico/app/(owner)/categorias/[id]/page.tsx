"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCategoryById } from "@/hook/category/UseCategoryGetById";
import { useCategoryActivateDeactivate } from "@/hook/category/useCategoryActivateDeactivate";
import { StatusToggle } from "@/app/components/ui/togleStatus";
import { ArrowLeft, Package, CheckCircle, XCircle } from "lucide-react";

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { category, loading, error, fetchById } = useCategoryById();
  const { toogglestatus, loading: toggleLoading } = useCategoryActivateDeactivate();

  // Cargar datos iniciales
  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleToggleStatus = async () => {
    if (!category) return;
    const response = await toogglestatus(category.id, category.is_active);
    if (response) {
      await fetchById(id);
    }
  };

  // Loading inicial
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-slate-600">Cargando categoría...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-slate-800">Error al cargar la categoría</h3>
          <p className="mb-6 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => fetchById(id)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // No encontrado
  if (!category) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-medium text-slate-500">Categoría no encontrada</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a categorías
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          {/* Encabezado */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <Package className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{category.name}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                  category.is_active
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {category.is_active ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {category.is_active ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {/* Estado - Toggle */}
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">Estado de la categoría</h3>
              <p className="mt-1 text-sm text-slate-500">
                Activa o desactiva la visibilidad de esta categoría en el sistema.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusToggle isActive={category.is_active} onToggle={handleToggleStatus} isLoading={toggleLoading} />
              <span className="min-w-15 text-sm font-medium text-slate-600">
                {category.is_active ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
