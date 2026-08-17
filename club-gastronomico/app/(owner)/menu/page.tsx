"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMenu } from "@/hook/useMenu";
import { MenuItem } from "@/types/menu.types";
import { Search, Package, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";

export default function MenuPage() {
  const router = useRouter();
  const { menu, loading, error, fetchMenu } = useMenu();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // Filtrar menú por búsqueda
  useEffect(() => {
    if (menu?.data) {
      const filtered = menu.data.filter((item: MenuItem) => {
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

  // Obtener nombre de categoría
  const getCategoryName = (item: MenuItem) => {
    if (item.category?.name) {
      return item.category.name;
    }
    return "Sin categoría";
  };

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
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-red-100">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Error al cargar el menú</h3>
          <p className="text-slate-600 text-sm mb-6">{error}</p>
          <button
            onClick={fetchMenu}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Menú</h1>
          <p className="text-sm text-slate-500">{menu?.data?.length || 0} productos</p>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                          {getCategoryName(item)}
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
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

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>
                Mostrando {filteredMenu.length} de {menu?.data?.length || 0} productos
              </span>
              {searchTerm && (
                <span>
                  Filtrado por: <strong className="text-slate-700">&quot;{searchTerm}&quot;</strong>
                </span>
              )}
            </div>
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
