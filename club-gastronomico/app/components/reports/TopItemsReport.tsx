// components/TopItemsReport.tsx

"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { topItemsResponse, topItem } from "@/types/reports.types";

interface TopItemsReportProps {
  topItems: topItemsResponse | null;
  onSearch: (fromDate: string, toDate: string) => Promise<void>;
  today: string;
}

const COLORS = [
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#ec4899",
  "#14b8a6",
  "#f43f5e",
  "#8b5cf6",
];

interface ChartDataItem {
  name: string;
  value: number;
  quantity: number;
  category: string;
  color: string;
}

export function TopItemsReport({ topItems, onSearch, today }: TopItemsReportProps) {
  const [topFromDate, setTopFromDate] = useState(today);
  const [topToDate, setTopToDate] = useState(today);

  const handleSearch = async () => {
    await onSearch(topFromDate, topToDate);
  };

  // Transformar datos para el gráfico con tipado correcto
  const chartData: ChartDataItem[] =
    topItems?.topItems?.map((item: topItem, index: number) => ({
      name: item.item_name,
      value: item.total_amount,
      quantity: item.total_quantity,
      category: item.category_name,
      color: COLORS[index % COLORS.length],
    })) || [];

  const totalAmount = chartData.reduce((sum: number, item: ChartDataItem) => sum + item.value, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Desde:</span>
          <input
            type="date"
            value={topFromDate}
            max={today}
            onChange={(e) => setTopFromDate(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Hasta:</span>
          <input
            type="date"
            value={topToDate}
            max={today}
            onChange={(e) => setTopToDate(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>

      {topItems && chartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Torta */}
          <div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry: ChartDataItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString("es-AR")}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {chartData.map((item: ChartDataItem, index: number) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabla */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="text-center py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Cant.
                    </th>
                    <th className="text-right py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topItems.topItems.map((item: topItem, index: number) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-2 text-slate-800">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          {item.item_name}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-slate-600">{item.category_name}</td>
                      <td className="py-2 px-2 text-center text-slate-700">{item.total_quantity}</td>
                      <td className="py-2 px-2 text-right font-medium text-slate-800">
                        ${item.total_amount.toLocaleString("es-AR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
              <span className="text-sm font-medium text-amber-600">Total: ${totalAmount.toLocaleString("es-AR")}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">No hay datos para mostrar en el período seleccionado</div>
      )}
    </div>
  );
}
