// page.tsx

"use client";

import { useEffect, useState } from "react";
import { useReports } from "@/hook/useReports";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ErrorState } from "@/app/components/ui/errorState";
import { TrendingUp, Trophy, Clock } from "lucide-react";
import { ReportsTabs } from "@/app/components/reports/ReportsTabs";
import { SalesReport } from "@/app/components/reports/SalesReport";
import { TopItemsReport } from "@/app/components/reports/TopItemsReport";
import { TopHoursReport } from "@/app/components/reports/TopHoursReport";

// Definir el tipo de las pestañas disponibles
type TabId = "ventas" | "top" | "horas";

export default function Reports() {
  const {
    dailySales,
    canceledSales,
    topItems,
    topHours,
    loading,
    error,
    fetchCanceledSales,
    fetchDailySales,
    fetchTopItems,
    fetchTopHours,
  } = useReports();

  const today = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState<TabId>("ventas");

  // Definición de pestañas
  const tabs = [
    {
      id: "ventas" as const,
      label: "Ventas y Cancelaciones",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "top" as const,
      label: "Productos más vendidos",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: "horas" as const,
      label: "Horas pico",
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  // Carga inicial
  useEffect(() => {
    fetchDailySales(today);
    fetchCanceledSales(today);
    fetchTopItems();
    fetchTopHours(today, today); // Carga las horas del día actual
  }, [today, fetchDailySales, fetchCanceledSales, fetchTopItems, fetchTopHours]);

  // Manejadores de búsqueda
  const handleSalesSearch = async (date: string) => {
    await fetchDailySales(date);
    await fetchCanceledSales(date);
  };

  const handleTopItemsSearch = async (fromDate: string, toDate: string) => {
    await fetchTopItems(fromDate, toDate);
  };

  const handleTopHoursSearch = async (dateFrom: string, dateTo: string) => {
    await fetchTopHours(dateFrom, dateTo);
  };

  if (error) {
    return (
      <ErrorState
        title={error}
        subtitle="Por favor intentelo más tarde"
        onRetry={() => {
          fetchTopItems();
          fetchTopHours(today, today);
        }}
      />
    );
  }

  return (
    <div className="h-full bg-linear-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {loading && <LoadingState />}

        <ReportsTabs tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as TabId)}>
          {activeTab === "ventas" && (
            <SalesReport
              dailySales={dailySales}
              canceledSales={canceledSales}
              onSearch={handleSalesSearch}
              today={today}
            />
          )}

          {activeTab === "top" && <TopItemsReport topItems={topItems} onSearch={handleTopItemsSearch} today={today} />}

          {activeTab === "horas" && (
            <TopHoursReport topHours={topHours} onSearch={handleTopHoursSearch} today={today} />
          )}
        </ReportsTabs>
      </div>
    </div>
  );
}
