// components/reports/TopHoursReport.tsx

"use client";

import { useState } from "react";
import { Calendar, Search, Clock, TrendingUp, Award, BarChart3 } from "lucide-react";
import { TopHoursResponse, topDayHour } from "@/types/reports.types";

interface TopHoursReportProps {
  topHours: TopHoursResponse | null;
  onSearch: (dateFrom: string, dateTo: string) => Promise<void>;
  today: string;
}

export function TopHoursReport({ topHours, onSearch, today }: TopHoursReportProps) {
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  const handleSearch = async () => {
    await onSearch(dateFrom, dateTo);
  };

  // Calcular el total de pedidos para mostrar estadísticas
  const totalOrders = topHours?.top_hours?.reduce((sum: number, hour: topDayHour) => sum + hour.total_orders, 0) || 0;

  // Encontrar la hora con más pedidos
  const topHour = topHours?.top_hours?.reduce((max: topDayHour | null, hour: topDayHour) => {
    if (!max || hour.total_orders > max.total_orders) return hour;
    return max;
  }, null);

  // Calcular el promedio
  const averageOrders = topHours?.top_hours?.length ? Math.round(totalOrders / topHours.top_hours.length) : 0;

  return (
    <div>
      {/* Filtros de búsqueda */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 rounded-xl">
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-sm text-slate-600">Desde:</span>
          <input
            type="date"
            value={dateFrom}
            max={today}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Hasta:</span>
          <input
            type="date"
            value={dateTo}
            max={today}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-1"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>

      {/* Estadísticas resumen */}
      {topHours && topHours.top_hours.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-700 uppercase tracking-wider">Hora Pico</span>
            </div>
            <p className="text-lg font-bold text-purple-900">{topHour?.label || "N/A"}</p>
            <p className="text-sm text-purple-700">{topHour?.total_orders || 0} pedidos</p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">Total Pedidos</span>
            </div>
            <p className="text-lg font-bold text-blue-900">{totalOrders}</p>
            <p className="text-sm text-blue-700">En {topHours.top_hours.length} horas</p>
          </div>

          <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Promedio por Hora</span>
            </div>
            <p className="text-lg font-bold text-emerald-900">{averageOrders}</p>
            <p className="text-sm text-emerald-700">Pedidos por hora</p>
          </div>
        </div>
      )}

      {/* Tabla simplificada */}
      {topHours && topHours.top_hours.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">#</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Hora
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Día
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Pedidos
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topHours.top_hours.map((hour: topDayHour, index: number) => {
                  // Extraer el día de la hora (asumiendo que label tiene formato "HH:00 - DD/MM")
                  const day = hour.label.split(" - ")[1] || "N/A";
                  const time = hour.label.split(" - ")[0] || hour.label;

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-slate-50 transition-colors ${index === 0 ? "bg-purple-50/50" : ""}`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            index === 0 ? "text-purple-600" : index === 1 ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{time}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-600">{day}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-bold ${index === 0 ? "text-purple-700" : "text-slate-700"}`}>
                          {hour.total_orders}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <td className="py-3 px-4" colSpan={3}>
                    <span className="font-medium text-slate-700">Total</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-purple-700">{totalOrders}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No hay datos de horas para mostrar</p>
          <p className="text-sm text-slate-400 mt-1">Selecciona un rango de fechas y busca para ver los resultados</p>
        </div>
      )}
    </div>
  );
}
