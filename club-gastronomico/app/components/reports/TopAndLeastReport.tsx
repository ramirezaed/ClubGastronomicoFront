"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Trophy, Crown, Medal, XCircle, Package } from "lucide-react";
import { getTopAndLeastResponse } from "@/types/reports.types";

interface TopAndLeastProps {
  data: getTopAndLeastResponse | null;
  loading?: boolean;
  onSearch?: (fromDate: string, toDate: string) => void;
  today?: string;
}

export function TopAndLeastReport({ data, loading, onSearch, today }: TopAndLeastProps) {
  const [dateFrom, setDateFrom] = useState(today || "");
  const [dateTo, setDateTo] = useState(today || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && dateFrom && dateTo) {
      onSearch(dateFrom, dateTo);
    }
  };

  // Íconos para los primeros puestos
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-400">{index + 1}</span>
        );
    }
  };

  // Obtener color de categoría
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Bebidas: "bg-blue-100 text-blue-700",
      Lomitos: "bg-orange-100 text-orange-700",
      Hamburguesas: "bg-red-100 text-red-700",
      Pizzas: "bg-yellow-100 text-yellow-700",
      Empanadas: "bg-green-100 text-green-700",
      Postres: "bg-purple-100 text-purple-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Formatear número con separadores de miles
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-AR").format(value);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-slate-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const topSellers = data?.top_sellers || [];
  const leastSellers = data?.least_sellers || [];

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      {onSearch && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Resumen */}
      {topSellers.length > 0 || leastSellers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Top Producto</span>
              </div>
              <p className="text-lg font-bold text-emerald-900 truncate">{topSellers[0]?.item_name || "N/A"}</p>
              <p className="text-sm text-emerald-700">{topSellers[0]?.total_quantity || 0} unidades vendidas</p>
            </div>

            <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-xs font-medium text-red-700 uppercase tracking-wider">Último Producto</span>
              </div>
              <p className="text-lg font-bold text-red-900 truncate">{leastSellers[0]?.item_name || "N/A"}</p>
              <p className="text-sm text-red-700">{leastSellers[0]?.total_quantity || 0} unidades vendidas</p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">Total Productos</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{topSellers.length + leastSellers.length}</p>
              <p className="text-sm text-blue-700">Entre más y menos vendidos</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700 uppercase tracking-wider">Categoría Top</span>
              </div>
              <p className="text-lg font-bold text-purple-900 truncate">{topSellers[0]?.category_name || "N/A"}</p>
              <p className="text-sm text-purple-700">Más vendida</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Sellers */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-linear-to-r from-emerald-50 to-emerald-100/50 px-6 py-4 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-semibold text-emerald-900">Productos Más Vendidos</h3>
                  <span className="ml-auto text-xs text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">
                    {topSellers.length} productos
                  </span>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {topSellers.length > 0 ? (
                  topSellers.map((item, index) => (
                    <div
                      key={item.menuItems_id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="shrink-0 w-8 text-center">{getRankIcon(index)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{item.item_name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category_name)}`}>
                            {item.category_name}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-emerald-600">{formatNumber(item.total_quantity)}</p>
                        <p className="text-xs text-slate-400">unidades</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-sm">No hay productos más vendidos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Least Sellers */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-linear-to-r from-red-50 to-red-100/50 px-6 py-4 border-b border-red-200">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <h3 className="text-base font-semibold text-red-900">Productos Menos Vendidos</h3>
                  <span className="ml-auto text-xs text-red-700 bg-red-200 px-2 py-1 rounded-full">
                    {leastSellers.length} productos
                  </span>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {leastSellers.length > 0 ? (
                  leastSellers.map((item) => (
                    <div
                      key={item.menuItems_id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="shrink-0 w-8 text-center">
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{item.item_name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category_name)}`}>
                            {item.category_name}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-red-500">{formatNumber(item.total_quantity)}</p>
                        <p className="text-xs text-slate-400">unidades</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-sm">No hay productos menos vendidos</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No hay datos de productos para mostrar</p>
          <p className="text-sm text-slate-400 mt-1">
            Selecciona un rango de fechas para ver los productos más y menos vendidos
          </p>
        </div>
      )}
    </div>
  );
}
