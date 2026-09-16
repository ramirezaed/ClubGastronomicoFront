"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

import { useMenuItems } from "@/hook/useMenuItem";
import { useCategoryGetAll } from "@/hook/category/UseCategoriesGetAlL";
import { createMenu } from "@/types/menu.types";
import { categoryResponse } from "@/types/category.types";

export default function CreateItemsPage() {
  const router = useRouter();

  const { registerItems, loading } = useMenuItems();
  const { getAllCategories, loading: categoriesLoading } = useCategoryGetAll();

  const [categories, setCategories] = useState<categoryResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<createMenu>({
    category_id: "",
    name: "",
    description: "",
    price: 0,
    preparation_time_minutes: 0,
    stock: 0,
  });

  const [error, setError] = useState<string | null>(null);

  // Obtener categorías
  useEffect(() => {
    const loadCategories = async () => {
      const response = await getAllCategories();
      if (response?.data) {
        setCategories(response.data);
      }
    };
    loadCategories();
  }, [getAllCategories]);

  // Cambiar valores del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Seleccionar categoría
  const handleSelectCategory = (id: string) => {
    setFormData({
      ...formData,
      category_id: id,
    });
    setShowDropdown(false);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación de categoría
    if (!formData.category_id) {
      setError("Debes seleccionar una categoría");
      return;
    }

    setError(null);

    const response = await registerItems(formData);

    if (!response) return;

    // Mostrar modal de éxito
    setShowSuccessModal(true);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      category_id: "",
      name: "",
      description: "",
      price: 0,
      preparation_time_minutes: 0,
      stock: 0,
    });
    setShowDropdown(false);
  };

  // Manejar "Crear otro"
  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    resetForm();
  };

  // Manejar "Ir a menú"
  const handleGoToMenu = () => {
    setShowSuccessModal(false);
    router.push("/menu");
  };

  // Nombre de la categoría seleccionada
  const selectedCategory = categories.find((category) => category.id === formData.category_id);

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
        <h1 className="text-2xl font-bold text-slate-800">Crear producto</h1>
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
            {/* Grid de 2 columnas para campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    disabled={categoriesLoading}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-left text-sm flex items-center justify-between hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <span className={formData.category_id ? "text-slate-800" : "text-slate-400"}>
                      {categoriesLoading ? "Cargando categorías..." : selectedCategory?.name || "Seleccionar categoría"}
                    </span>
                    {showDropdown ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleSelectCategory(category.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
                          >
                            {category.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-400 text-center">
                          No hay categorías disponibles
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Lomito completo"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Descripción - ocupa todo el ancho */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                placeholder="Descripción del producto"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Precio, Tiempo y Stock - 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (ARS) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tiempo prep. (min)</label>
                <input
                  type="number"
                  name="preparation_time_minutes"
                  value={formData.preparation_time_minutes || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
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
                    Crear producto
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
            {/* Línea superior verde */}
            {/* <div className="h-1 bg-emerald-500"></div> */}

            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Producto creado!</h3>
                <p className="text-sm text-gray-500 mb-6">
                  <span className="font-medium text-gray-700"> ¿Desea registrar otro items?</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoToMenu}
                  className="flex-1 py-2.5 border border-slate-400 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors hover:cursor-pointer"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={handleCreateAnother}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors hover:cursor-pointer"
                >
                  Si
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
