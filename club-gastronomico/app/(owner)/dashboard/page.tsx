"use client";

import { useEffect, useState } from "react";
import { useReports } from "@/hook/useReports";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ErrorState } from "@/app/components/ui/errorState";
import { TrendingUp, Trophy, Clock, XCircle, BarChart3, ArrowUpDown } from "lucide-react";
import { ReportsTabs } from "@/app/components/reports/ReportsTabs";
import { SalesReport } from "@/app/components/reports/SalesReport";
import { TopItemsReport } from "@/app/components/reports/TopItemsReport";
import { TopAndLeastReport } from "@/app/components/reports/TopAndLeastReport";
import { TopHoursReport } from "@/app/components/reports/TopHoursReport";
import { CancellationsAnalysisReport } from "@/app/components/reports/CancelledAnalisys";
import { EvolutionsMonths } from "@/app/components/reports/EvolutionsMonths";

type TabId = "ventas" | "top" | "topandleast" | "horas" | "cancelaciones" | "evolucion";

export default function Reports() {
  const {
    dailySales,
    canceledSales,
    topItems,
    topAndLeast,
    topHours,
    analysisCancelled,
    evolutions,
    loading,
    error,
    fetchCanceledSales,
    fetchDailySales,
    fetchTopItems,
    fetchTopAndLeast,
    fetchTopHours,
    fetchCancellationsAnalysis,
    fetchEvolutions,
  } = useReports();

  const today = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState<TabId>("ventas");

  const tabs = [
    {
      id: "ventas" as const,
      label: "Ventas y Cancelaciones",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "top" as const,
      label: "Top 5 Productos",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: "topandleast" as const,
      label: "Más y Menos Vendidos",
      icon: <ArrowUpDown className="w-4 h-4" />,
    },
    {
      id: "horas" as const,
      label: "Horas pico",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "cancelaciones" as const,
      label: "Análisis de Cancelaciones",
      icon: <XCircle className="w-4 h-4" />,
    },
    {
      id: "evolucion" as const,
      label: "Evolución de Ventas",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    fetchDailySales(today);
    fetchCanceledSales(today);
    fetchTopItems();
    fetchTopAndLeast();
    fetchTopHours(today, today);
    fetchCancellationsAnalysis(today, today);
    fetchEvolutions();
  }, [
    today,
    fetchDailySales,
    fetchCanceledSales,
    fetchTopItems,
    fetchTopAndLeast,
    fetchTopHours,
    fetchCancellationsAnalysis,
    fetchEvolutions,
  ]);

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

  const handleCancellationsAnalysisSearch = async (dateFrom: string, dateTo: string) => {
    await fetchCancellationsAnalysis(dateFrom, dateTo);
  };

  if (error) {
    return (
      <ErrorState
        title={error}
        subtitle="Por favor intentelo más tarde"
        onRetry={() => {
          fetchTopItems();
          fetchTopAndLeast();
          fetchTopHours(today, today);
          fetchCancellationsAnalysis(today, today);
          fetchEvolutions();
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

          {activeTab === "topandleast" && <TopAndLeastReport data={topAndLeast} loading={loading} />}

          {activeTab === "horas" && (
            <TopHoursReport topHours={topHours} onSearch={handleTopHoursSearch} today={today} />
          )}

          {activeTab === "cancelaciones" && (
            <CancellationsAnalysisReport
              analysis={analysisCancelled}
              onSearch={handleCancellationsAnalysisSearch}
              today={today}
            />
          )}

          {activeTab === "evolucion" && <EvolutionsMonths evolutions={evolutions} loading={loading} />}
        </ReportsTabs>
      </div>
    </div>
  );
}
