// app/menu/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMenuItems } from "@/hook/useMenuItem";
import { UpdateMenuItems } from "@/types/menu.types";
import { StatusToggle } from "@/app/components/ui/togleStatus";
import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { ArrowLeft, Package, CheckCircle, XCircle, Clock, Edit, Save, AlertCircle } from "lucide-react";

export default function MenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { menuItems, loading, error, fetchById, itemsUpdate, toogglestatus, deleteItems } = useMenuItems();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateMenuItems>({
    name: "",
    description: "",
    price: 0,
    preparation_time_minutes: 0,
    stock: 0,
    is_active: true,
  });

  // Cargar datos iniciales
  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  // Actualizar formData cuando se carguen los datos
  useEffect(() => {
    if (menuItems) {
      setFormData({
        name: menuItems.name || "",
        description: menuItems.description || "",
        price: menuItems.price || 0,
        preparation_time_minutes: menuItems.preparation_time_minutes || 0,
        stock: menuItems.stock || 0,
        is_active: menuItems.is_active ?? true,
      });
    }
  }, [menuItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleToggleStatus = async () => {
    if (!menuItems) return;
    const response = await toogglestatus(menuItems.id, menuItems.is_active);
    if (response) {
      await fetchById(id);
    }
  };

  const handleSave = async () => {
    if (!id) return;

    if (!formData.name.trim()) {
      setSaveError("El nombre es obligatorio");
      return;
    }
    if (!formData.description.trim()) {
      setSaveError("La descripción es obligatoria");
      return;
    }
    if (formData.price <= 0) {
      setSaveError("El precio debe ser mayor a 0");
      return;
    }
    if (formData.stock < 0) {
      setSaveError("El stock no puede ser negativo");
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      await itemsUpdate(id, formData);
      setIsEditing(false);
      await fetchById(id);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (menuItems) {
      setFormData({
        name: menuItems.name || "",
        description: menuItems.description || "",
        price: menuItems.price || 0,
        preparation_time_minutes: menuItems.preparation_time_minutes || 0,
        stock: menuItems.stock || 0,
        is_active: menuItems.is_active ?? true,
      });
    }
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteItems(id);
      router.push("/menu");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Error al eliminar el producto");
      throw error;
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Solo loading inicial
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
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-slate-800">Error al cargar el producto</h3>
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

  if (!menuItems) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-medium text-slate-500">Producto no encontrado</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const stockColor =
    formData.stock === 0
      ? "text-red-600 bg-red-50 border-red-200"
      : formData.stock < 10
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-emerald-600 bg-emerald-50 border-emerald-200";

  const stockText = formData.stock === 0 ? "Sin stock" : formData.stock < 10 ? "Poco stock" : "En stock";

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          {saveSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-emerald-700 border border-emerald-200">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{saveSuccess}</span>
            </div>
          )}

          {saveError && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{saveError}</span>
            </div>
          )}

          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-2xl font-bold text-slate-800 bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
                  placeholder="Nombre del producto"
                />
              ) : (
                <h1 className="text-2xl font-bold text-slate-800">{menuItems.name}</h1>
              )}
            </div>

            <div className="flex items-start gap-3">
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="text-2xl font-bold text-emerald-600 bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 w-32 text-right"
                  min="0"
                  step="1"
                />
              ) : (
                <p className="text-2xl font-bold text-emerald-600">{formatPrice(menuItems.price)}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full text-slate-600 bg-transparent border-2 border-blue-200 focus:border-blue-500 rounded-lg p-2 focus:outline-none resize-none"
                rows={3}
                placeholder="Descripción del producto"
              />
            ) : (
              <p className="text-slate-600">{menuItems.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Tiempo de preparación</p>
              </div>

              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="preparation_time_minutes"
                    value={formData.preparation_time_minutes}
                    onChange={handleInputChange}
                    className="w-20 text-lg font-semibold text-slate-800 bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
                    min="0"
                    step="1"
                  />
                  <span className="text-sm text-slate-500">minutos</span>
                </div>
              ) : (
                <p className="text-lg font-semibold text-slate-800">{menuItems.preparation_time_minutes} minutos</p>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Stock disponible</p>
              </div>

              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-24 text-lg font-semibold text-slate-800 bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
                    min="0"
                    step="1"
                  />
                  <span className="text-sm text-slate-500">unidades</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${stockColor}`}
                  >
                    {formData.stock === 0 ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    {formData.stock} unidades
                  </span>
                  <span className="text-sm text-slate-500">{stockText}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div>
              <h3 className="font-semibold text-slate-800">Estado del producto</h3>
              <p className="text-sm text-slate-500 mt-1">
                Activa o desactiva la visibilidad de este producto en el menú.
              </p>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <StatusToggle isActive={menuItems.is_active} onToggle={handleToggleStatus} />
              <span className="text-sm font-medium text-slate-600 min-w-15">
                {menuItems.is_active ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Guardar
                    </>
                  )}
                </button>

                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex hover:cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </button>

                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm font-medium hover:cursor-pointer"
                >
                  Volver
                </button>

                <DeleteButton onDelete={handleDelete} itemName={menuItems.name} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
