"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMenu } from "@/hook/useMenu";
import { getItemsParams, MenuItem } from "@/types/menu.types";
import { Search, Package, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";
import Pagination from "@/app/components/ui/pagination";
import { ErrorState } from "@/app/components/ui/errorState";

interface FilterState {
  is_active: string;
}

export default function MenuPage() {
  const router = useRouter();
  const { menu, loading, pageLoading, error, fetchMenu, goToPage, pagination } = useMenu();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    is_active: "",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const params: getItemsParams = {};
    if (filter.is_active !== "") params.is_active = filter.is_active === "true";
    fetchMenu(params);
  }, [fetchMenu, filter]);

  // Filtrar menú por búsqueda
  useEffect(() => {
    if (menu && menu.length > 0) {
      const filtered = menu.filter((item: MenuItem) => {
        const search = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          (item.category?.name && item.category.name.toLowerCase().includes(search))
        );
      });
      setFilteredMenu(filtered);
    } else {
      setFilteredMenu([]);
    }
  }, [searchTerm, menu]);

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Obtener color de stock
  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600";
    if (stock < 10) return "text-amber-600";
    return "text-emerald-600";
  };

  // Navegar a detalle
  const handleViewDetail = (id: string) => {
    router.push(`/menu/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">Cargando menú...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={fetchMenu} />;
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

        {/* Buscador - Derecha */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredMenu.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Stock
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
                  {filteredMenu.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="font-medium text-slate-800 text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700">
                          {item.category.name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-slate-600 truncate max-w-xs">{item.description}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-semibold text-slate-800 text-sm">{formatPrice(item.price)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <span className={`flex items-center gap-1 text-sm font-medium ${getStockColor(item.stock)}`}>
                            {item.stock === 0 ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : item.stock < 10 ? (
                              <AlertCircle className="w-3.5 h-3.5" />
                            ) : (
                              <CheckCircle className="w-3.5 h-3.5" />
                            )}
                            {item.stock}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <span
                            className={`flex items-center gap-1 text-xs font-medium ${
                              item.is_active ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {item.is_active ? (
                              <CheckCircle className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {item.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleViewDetail(item.id)}
                            className="inline-flex items-center hover:cursor-pointer gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Ver detalle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer con paginación */}
            {menu.length > 0 && pagination.totalPages > 1 && (
              <div className="shrink-0 flex flex-col sm:flex-row items-center justify-center gap-10 px-6 py-5.5 border-t border-slate-200">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => {
                    const params: getItemsParams = {};
                    if (filter.is_active !== "") params.is_active = filter.is_active === "true";
                    goToPage(page, params);
                  }}
                  isLoading={pageLoading}
                />
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            {searchTerm ? (
              <>
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No se encontraron resultados</p>
                <p className="text-sm text-slate-400 mt-1">
                  No hay productos que coincidan con &quot;{searchTerm}&quot;
                </p>
              </>
            ) : (
              <>
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No hay productos en el menú</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
