"use client";

import { useState } from "react";
import { Calendar, Search, XCircle, BarChart3, PieChart } from "lucide-react";
import { cancellationsAnalysisResponse, reasonCancellations } from "@/types/reports.types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface CancellationsAnalysisReportProps {
  analysis: cancellationsAnalysisResponse | null;
  onSearch: (dateFrom: string, dateTo: string) => Promise<void>;
  today: string;
}

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#8b5cf6", "#3b82f6", "#ec4899", "#14b8a6", "#f43f5e"];

export function CancellationsAnalysisReport({ analysis, onSearch, today }: CancellationsAnalysisReportProps) {
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  const handleSearch = async () => {
    await onSearch(dateFrom, dateTo);
  };

  // Preparar datos para los gráficos
  const chartData =
    analysis?.reasons?.map((item: reasonCancellations, index: number) => ({
      name: item.reason.length > 20 ? item.reason.substring(0, 20) + "..." : item.reason,
      fullName: item.reason,
      total: item.total,
      percentage: item.percentage_of_cancellations,
      color: COLORS[index % COLORS.length],
    })) || [];

  const pieData = chartData.map((item) => ({
    name: item.name,
    value: item.total,
    percentage: item.percentage,
  }));

  return (
    <div>
      {/* Filtros de búsqueda */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-50 rounded-xl">
            <Calendar className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-sm text-slate-600">Desde:</span>
          <input
            type="date"
            value={dateFrom}
            max={today}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Hasta:</span>
          <input
            type="date"
            value={dateTo}
            max={today}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>

      {/* Mostrar datos */}
      {analysis && analysis.reasons && analysis.reasons.length > 0 ? (
        <div className="space-y-6">
          {/* Resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">Total Pedidos</p>
              <p className="text-2xl font-bold text-blue-900">{analysis.total_orders}</p>
            </div>
            <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-red-700 font-medium">Total Cancelaciones</p>
              <p className="text-2xl font-bold text-red-900">{analysis.total_cancellations}</p>
            </div>
            <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <p className="text-sm text-orange-700 font-medium">Tasa de Cancelación</p>
              <p className="text-2xl font-bold text-orange-900">{analysis.cancellation_percentage}%</p>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Barras */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-semibold text-slate-700">Cancelaciones por Razón</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: any) => [`${value} cancelaciones`, ""]}
                      labelFormatter={(label: any) => {
                        const item = chartData.find((d) => d.name === label);
                        return item?.fullName || label;
                      }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    />
                    <Bar dataKey="total" fill="#ef4444" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico de Torta */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-semibold text-slate-700">Distribución de Cancelaciones</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => {
                        const item = pieData.find((d) => d.name === name);
                        return [`${value} cancelaciones (${item?.percentage || 0}%)`, ""];
                      }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabla de razones */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Razón
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Cancelaciones
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Porcentaje
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {analysis.reasons.map((item: reasonCancellations, index: number) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-800">{item.reason}</td>
                      <td className="py-3 px-4 text-right font-medium text-slate-700">{item.total}</td>
                      <td className="py-3 px-4 text-right font-medium text-red-600">
                        {item.percentage_of_cancellations}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700">Total</td>
                    <td className="py-3 px-4 text-right font-bold text-red-700">{analysis.total_cancellations}</td>
                    <td className="py-3 px-4 text-right font-bold text-red-700">{analysis.cancellation_percentage}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <XCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No hay datos de cancelaciones para mostrar</p>
          <p className="text-sm text-slate-400 mt-1">Selecciona un rango de fechas y busca para ver los resultados</p>
        </div>
      )}
    </div>
  );
}
