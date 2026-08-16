"use client";

import { useState } from "react";
import { Calendar, Search, TrendingUp, XCircle } from "lucide-react";
import { canceledSalesResponse, DailySalesResponse } from "@/types/reports.types";

interface SalesReportProps {
  dailySales: DailySalesResponse | null;
  canceledSales: canceledSalesResponse | null;
  onSearch: (date: string) => Promise<void>;
  today: string;
}

export function SalesReport({ dailySales, canceledSales, onSearch, today }: SalesReportProps) {
  const [selectedDate, setSelectedDate] = useState(today);

  const handleSearch = async () => {
    await onSearch(selectedDate);
  };

  return (
    <div>
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
          onClick={handleSearch}
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
  );
}
