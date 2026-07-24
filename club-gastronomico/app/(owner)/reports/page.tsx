"use client";

import { useEffect, useState } from "react";
import { useReports } from "@/hook/useReports";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ErrorState } from "@/app/components/ui/errorState";

export default function Reports() {
  const { dailySales, canceledSales, loading, error, fetchCanceledSales, fetchDailySales } = useReports();
  const today = new Date().toISOString().split("T")[0];
  //se define el estado de las fechas para cada reporte, por default, las fechas del dia
  const [dailyDate, setDailyDate] = useState(today);
  const [canceledDate, setCanceledDate] = useState(today);
  //se define la fecha del dia de hoy

  //funcion que se inicia cada vez que se renderiza la pagina, por defecto se inicia con la fehca del dia
  useEffect(() => {
    fetchDailySales(today);
    fetchCanceledSales(today);
  }, [fetchDailySales, fetchCanceledSales]);

  //funcion para buscar las ventas de un dia en especifico
  const handleDailySearch = async () => {
    await fetchDailySales(dailyDate);
  };
  //buscar cancelaciones
  const handleCanceledSearch = async () => {
    await fetchCanceledSales(canceledDate);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Dashboard de Reportes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Ventas diarias */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>📈 Ventas diarias</h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <input type="date" value={dailyDate} max={today} onChange={(e) => setDailyDate(e.target.value)} />

            <button onClick={handleDailySearch}>Buscar</button>
          </div>

          {dailySales && (
            <>
              <p>
                <strong>Fecha:</strong> {dailySales.date}
              </p>

              <p>
                <strong>Total de pedidos:</strong> {dailySales.total_orders}
              </p>

              <p>
                <strong>Total vendido:</strong> ${dailySales.total_amount.toLocaleString("es-AR")}
              </p>
            </>
          )}
        </div>

        {/* Órdenes canceladas */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>❌ Órdenes canceladas</h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <input type="date" value={canceledDate} max={today} onChange={(e) => setCanceledDate(e.target.value)} />

            <button onClick={handleCanceledSearch}>Buscar</button>
          </div>

          {canceledSales && (
            <>
              <p>
                <strong>Fecha:</strong> {canceledSales.date}
              </p>

              <p>
                <strong>Total de órdenes canceladas:</strong> {canceledSales.total_orders}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
