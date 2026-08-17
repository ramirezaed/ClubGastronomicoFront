"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMenuItems } from "@/hook/useMenuItem";
import { ArrowLeft, Package, CheckCircle, XCircle, Clock, Edit, Trash2 } from "lucide-react";

export default function MenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { menuItems, loading, error, fetchById } = useMenuItems();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-slate-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />

          <h3 className="mb-2 text-lg font-semibold text-slate-800">Error al cargar el producto</h3>

          <p className="mb-6 text-sm text-slate-600">{error}</p>

          <button
            onClick={() => fetchById(id)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!menuItems) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-slate-300" />

          <p className="font-medium text-slate-500">Producto no encontrado</p>

          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(menuItems.price);

  const stockColor =
    menuItems.stock === 0
      ? "text-red-600 bg-red-50 border-red-200"
      : menuItems.stock < 10
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-emerald-600 bg-emerald-50 border-emerald-200";

  const stockText = menuItems.stock === 0 ? "Sin stock" : menuItems.stock < 10 ? "Poco stock" : "En stock";

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Volver al menú</span>
      </button>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{menuItems.name}</h1>

              <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                {menuItems.category?.name || "Sin categoría"}
              </span>
            </div>

            <p className="text-2xl font-bold text-emerald-600">{price}</p>
          </div>

          <p className="mb-6 text-slate-600">{menuItems.description}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Tiempo de preparación</p>
              </div>

              <p className="text-lg font-semibold text-slate-800">{menuItems.preparation_time_minutes} minutos</p>
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Stock disponible</p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${stockColor}`}
                >
                  {menuItems.stock === 0 ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  {menuItems.stock} unidades
                </span>

                <span className="text-sm text-slate-500">{stockText}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-t border-slate-200 pt-6">
            <button
              onClick={() => router.push(`/menu/${menuItems.id}/edit`)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              <Edit className="h-4 w-4" />
              Editar
            </button>

            <button
              onClick={() => {
                if (confirm(`¿Estás seguro de que quieres eliminar "${menuItems.name}"?`)) {
                  console.log("Eliminar:", menuItems.id);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
