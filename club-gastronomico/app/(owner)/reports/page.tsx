"use client";

import { useEffect, useState } from "react";
import { useReports } from "@/hook/useReports";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { TrendingUp, XCircle, Trophy, Search, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ErrorState } from "@/app/components/ui/errorState";

export default function Reports() {
  const {
    dailySales,
    canceledSales,
    topItems,
    loading,
    error,
    topHours,
    fetchCanceledSales,
    fetchDailySales,
    fetchTopItems,
    fetchTopHours,
  } = useReports();
  const today = new Date().toISOString().split("T")[0];

  const [activeTab, setActiveTab] = useState<"ventas" | "top">("ventas");
  const [selectedDate, setSelectedDate] = useState(today);
  const [topFromDate, setTopFromDate] = useState(today);
  const [topToDate, setTopToDate] = useState(today);
  const [hourfromDate, setHourFromDate] = useState(today);
  const [hourToDate, setHourToate] = useState(today);

  //carga los reportes cuando se renderiza la pagina por primera vez
  useEffect(() => {
    fetchDailySales(today);
    fetchCanceledSales(today);
    fetchTopItems();
  }, [fetchDailySales, fetchCanceledSales, fetchTopItems]);

  //funcion para buscar por fecha las ventas y cancelaciones
  const handleDateSearch = async () => {
    await fetchDailySales(selectedDate);
    await fetchCanceledSales(selectedDate);
  };
  //funcion para buscar el top de items
  const handleTopItemsSearch = async () => {
    await fetchTopItems(topFromDate, topToDate);
  };
  //funcion muestra el dia y las horas con mas pedidos
  const handleTopHoursSearch = async () => {
    await fetchTopHours(hourfromDate, hourfromDate);
  };

  //define colores para el grafico de torta
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

  const chartData =
    topItems?.topItems?.map((item, index) => ({
      name: item.item_name,
      value: item.total_amount,
      quantity: item.total_quantity,
      category: item.category_name,
      color: COLORS[index % COLORS.length],
    })) || [];

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);

  if (error) {
    return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={() => fetchTopItems} />;
  }

  return (
    <div className="h-full bg-linear-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {loading && <LoadingState />}

        {/* Pestañas */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("ventas")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "ventas"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Ventas y Cancelaciones
                </div>
              </button>

              <button
                onClick={() => setActiveTab("top")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "top"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Productos mas vendidos
                </div>
              </button>
            </div>
          </div>

          {/* Contenido de la pestaña Ventas */}
          {activeTab === "ventas" && (
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Fecha:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    max={today}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                  />
                </div>
                <button
                  onClick={handleDateSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ventas Diarias */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">Ventas Diarias</h3>
                  </div>

                  {dailySales ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Fecha</span>
                        <span className="text-sm font-medium text-slate-800">{dailySales.date}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Total pedidos</span>
                        <span className="text-sm font-medium text-slate-800">{dailySales.total_orders}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-blue-50 rounded-lg px-3 -mx-1">
                        <span className="text-sm font-medium text-blue-700">Total vendido</span>
                        <span className="text-lg font-bold text-blue-700">
                          ${dailySales.total_amount.toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-sm">No hay datos para esta fecha</div>
                  )}
                </div>

                {/* Órdenes Canceladas */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">Cancelaciones</h3>
                  </div>

                  {canceledSales ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Fecha</span>
                        <span className="text-sm font-medium text-slate-800">{canceledSales.date}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-red-50 rounded-lg px-3 -mx-1">
                        <span className="text-sm font-medium text-red-700">Total canceladas</span>
                        <span className="text-lg font-bold text-red-700">{canceledSales.total_orders}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-sm">No hay datos para esta fecha</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña Top Productos */}
          {activeTab === "top" && (
            <div className="p-6">
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
                  onClick={handleTopItemsSearch}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </button>
              </div>

              {topItems && chartData.length > 0 ? (
                <>
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
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => `$${Number(value).toLocaleString("es-AR")}`}
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

                      {/* Leyenda de colores */}
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {chartData.map((item, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-slate-600">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tabla minimalista */}
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
                            {topItems.topItems.map((item, index) => (
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

                      {/* Total */}
                      <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
                        <span className="text-sm font-medium text-amber-600">
                          Total: ${totalAmount.toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  No hay datos para mostrar en el período seleccionado
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
