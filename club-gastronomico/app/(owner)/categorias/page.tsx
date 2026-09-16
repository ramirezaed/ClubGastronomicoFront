"use client";

import { useEffect, useState } from "react";
import { useCategoryGetAll } from "@/hook/category/UseCategoriesGetAlL";
import { categoryResponse } from "@/types/category.types";
import { Search, Package, CheckCircle, XCircle, Eye, Plus } from "lucide-react";
import { ErrorState } from "@/app/components/ui/errorState";
import Link from "next/link";
import { LoadingState } from "@/app/components/ui/loandigstate";

interface FilterState {
  is_active: string;
}

export default function CategoriesPage() {
  const { loading, error, getAllCategories } = useCategoryGetAll();
  const [categories, setCategories] = useState<categoryResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<categoryResponse[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    is_active: "",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response?.data) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, [getAllCategories]);

  // Filtrar categorías por búsqueda y estado
  useEffect(() => {
    let filtered = categories;

    // Filtrar por estado
    if (filter.is_active !== "") {
      const isActive = filter.is_active === "true";
      filtered = filtered.filter((cat) => cat.is_active === isActive);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((cat) => cat.name.toLowerCase().includes(search));
    }

    setFilteredCategories(filtered);
  }, [searchTerm, filter, categories]);

  if (loading) {
    return <LoadingState title="Cargando categorias" description="Espere un momento por favor" />;
  }

  if (error) {
    return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={getAllCategories} />;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Filtros y Buscador */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        {/* Filtro de Estado - Izquierda */}
        <div className="w-full sm:w-64">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
          <select
            value={filter.is_active}
            onChange={(e) =>
              setFilter({
                ...filter,
                is_active: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <Link href="/categorias/create">
            <button className="w-full sm:w-auto border border-slate-200 hover:cursor-pointer px-6 py-2 bg-white text-indigo-950 rounded-xl hover:bg-indigo-10 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" />
              <span>Agregar Categoría</span>
            </button>
          </Link>
        </div>

        {/* Buscador - Derecha */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredCategories.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="font-medium text-slate-800 text-sm">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <span
                            className={`flex items-center gap-1 text-xs font-medium ${
                              category.is_active ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {category.is_active ? (
                              <CheckCircle className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {category.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <Link
                            href={`/categorias/${category.id}`}
                            className="inline-flex items-center hover:cursor-pointer gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Ver detalle</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            {searchTerm ? (
              <>
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No se encontraron resultados</p>
                <p className="text-sm text-slate-400 mt-1">
                  No hay categorías que coincidan con &quot;{searchTerm}&quot;
                </p>
              </>
            ) : (
              <>
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No hay categorías disponibles</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
