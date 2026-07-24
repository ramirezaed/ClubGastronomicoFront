"use client";

import { useEffect, useState } from "react";
import { useReports } from "@/hook/useReports";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ErrorState } from "@/app/components/ui/errorState";

export default function Reports() {
  const { dailySales, canceledSales, topItems, loading, error, fetchCanceledSales, fetchDailySales, fetchTopItems } =
    useReports();
  const today = new Date().toISOString().split("T")[0];
  //se define el estado de las fechas para cada reporte, por default, las fechas del dia
  const [dailyDate, setDailyDate] = useState(today);
  const [canceledDate, setCanceledDate] = useState(today);
  const [topFromDate, setTopFromDate] = useState(today);
  const [topToDate, setTopToDate] = useState(today);
  //se define la fecha del dia de hoy

  //funcion que se inicia cada vez que se renderiza la pagina, por defecto se inicia con la fehca del dia
  useEffect(() => {
    fetchDailySales(today);
    fetchCanceledSales(today);
    fetchTopItems();
  }, [fetchDailySales, fetchCanceledSales, fetchTopItems]);

  //funcion para buscar las ventas de un dia en especifico
  const handleDailySearch = async () => {
    await fetchDailySales(dailyDate);
  };
  //buscar cancelaciones
  const handleCanceledSearch = async () => {
    await fetchCanceledSales(canceledDate);
  };
  //buscar top items mas vendidos
  const handleTopItemsSearch = async () => {
    await fetchTopItems(topFromDate, topToDate);
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

        {/* Top de productos */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>🏆 Top de productos</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <label>Desde:</label>
              <input type="date" value={topFromDate} max={today} onChange={(e) => setTopFromDate(e.target.value)} />
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <label>Hasta:</label>
              <input type="date" value={topToDate} max={today} onChange={(e) => setTopToDate(e.target.value)} />
            </div>

            <button onClick={handleTopItemsSearch}>Buscar</button>
          </div>

          {topItems && (
            <>
              <p>
                <strong>Período:</strong> {topItems.date_from} - {topItems.date_to}
              </p>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "1rem",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Producto</th>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Categoría</th>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>Cantidad</th>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "right" }}>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {topItems.topItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem 0" }}>{item.item_name}</td>
                      <td>{item.category_name}</td>
                      <td style={{ textAlign: "center" }}>{item.total_quantity}</td>
                      <td style={{ textAlign: "right" }}>${item.total_amount.toLocaleString("es-AR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
