"use client";

import { TrendingUp, Calendar, Package, DollarSign } from "lucide-react";
import { salesEvolutions, evolutionMonths } from "@/types/reports.types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

interface EvolutionsMonthsProps {
  evolutions: salesEvolutions | null;
  loading?: boolean;
}

export function EvolutionsMonths({ evolutions, loading }: EvolutionsMonthsProps) {
  // Formatear datos para el gráfico
  const chartData =
    evolutions?.months?.map((item: evolutionMonths) => ({
      month: formatMonth(item.month),
      fullMonth: item.month,
      orders: item.total_orders,
      amount: item.total_amount,
    })) || [];

  // Formatear mes para mostrar (ej: "2026-05" -> "May 2026")
  function formatMonth(monthStr: string) {
    const [year, month] = monthStr.split("-");
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calcular el rango del eje Y ajustado a los datos
  const minAmount = Math.min(...chartData.map((item) => item.amount), 0);
  const maxAmount = Math.max(...chartData.map((item) => item.amount), 0);

  // Rango ajustado: 10% del rango total
  const range = maxAmount - minAmount;
  const padding = range * 0.15 || 100000;

  // Forzar valores específicos para que se vea la diferencia
  const yAxisMin = Math.max(0, minAmount - padding);
  const yAxisMax = maxAmount + padding;

  // ✅ CORRECCIÓN: Eliminar ticks duplicados
  const customTicks = [yAxisMin, minAmount, (minAmount + maxAmount) / 2, maxAmount, yAxisMax];
  const uniqueTicks = customTicks.filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a - b);

  // Calcular totales
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);
  const totalAmount = chartData.reduce((sum, item) => sum + item.amount, 0);
  const averageOrders = chartData.length > 0 ? Math.round(totalOrders / chartData.length) : 0;

  // Encontrar el mes con más ventas
  const bestMonth = chartData.reduce(
    (max, item) => (item.orders > max.orders ? item : max),
    chartData[0] || { month: "", orders: 0, amount: 0, fullMonth: "" },
  );

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-slate-800 text-sm mb-2">{formatMonth(data.fullMonth)}</p>
          <div className="space-y-1">
            <p className="text-sm text-slate-600">
              Pedidos: <span className="font-bold text-blue-600">{data.orders}</span>
            </p>
            <p className="text-sm text-slate-600">
              Ventas: <span className="font-bold text-emerald-600">{formatCurrency(data.amount)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
          </div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas resumen */}
      {chartData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">Total Pedidos</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{totalOrders}</p>
              <p className="text-sm text-blue-700">En {chartData.length} meses</p>
            </div>

            <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Total Ventas</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900">{formatCurrency(totalAmount)}</p>
              <p className="text-sm text-emerald-700">En el período</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700 uppercase tracking-wider">Promedio Mensual</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{averageOrders}</p>
              <p className="text-sm text-purple-700">Pedidos por mes</p>
            </div>

            <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">Mejor Mes</span>
              </div>
              <p className="text-lg font-bold text-amber-900">{bestMonth?.month || "N/A"}</p>
              <p className="text-sm text-amber-700">{bestMonth?.orders || 0} pedidos</p>
            </div>
          </div>

          {/* Gráfico de líneas */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-semibold text-slate-800">Evolución de Ventas</h3>
              </div>
              <span className="text-xs text-slate-500">Últimos {chartData.length} meses</span>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

                  {/* Eje X - Meses abajo */}
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    padding={{ left: 10, right: 10 }}
                  />

                  {/* ✅ CORRECCIÓN: Usar uniqueTicks en lugar del array con duplicados */}
                  <YAxis
                    domain={[yAxisMin, yAxisMax]}
                    ticks={uniqueTicks}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickFormatter={(value) => formatCurrency(value)}
                    label={{
                      value: "Monto en ARS",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#64748b" },
                      offset: -5,
                    }}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend verticalAlign="top" height={36} iconType="circle" />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Ventas"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{
                      stroke: "#10b981",
                      strokeWidth: 2,
                      r: 6,
                      fill: "white",
                    }}
                    activeDot={{
                      stroke: "#10b981",
                      strokeWidth: 2,
                      r: 8,
                      fill: "#10b981",
                    }}
                  />

                  {/* Línea de referencia para el promedio */}
                  <ReferenceLine
                    y={totalAmount / chartData.length}
                    stroke="#94a3b8"
                    strokeDasharray="3 3"
                    label={{
                      value: "Promedio",
                      position: "insideBottomRight",
                      fill: "#94a3b8",
                      fontSize: 10,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Información de valores para debug */}
            <div className="mt-2 text-xs text-slate-400 flex flex-wrap justify-between">
              <span>Min: {formatCurrency(yAxisMin)}</span>
              <span>Max: {formatCurrency(yAxisMax)}</span>
              <span>Rango: {formatCurrency(range)}</span>
              <span>Padding: {formatCurrency(padding)}</span>
            </div>

            {/* Mostrar valores por mes para verificar */}
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
              {chartData.map((item, index) => (
                <span key={index}>
                  {item.month}: {formatCurrency(item.amount)}
                </span>
              ))}
            </div>
          </div>

          {/* Tabla de evolución */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Mes
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Pedidos
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Ventas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chartData.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-800">{item.month}</td>
                      <td className="py-3 px-4 text-right font-medium text-slate-700">{item.orders}</td>
                      <td className="py-3 px-4 text-right font-medium text-emerald-600">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700">Total</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600">{totalOrders}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-700">{formatCurrency(totalAmount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No hay datos de evolución para mostrar</p>
          <p className="text-sm text-slate-400 mt-1">No se encontraron ventas en los últimos meses</p>
        </div>
      )}
    </div>
  );
}
