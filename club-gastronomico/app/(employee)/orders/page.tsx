// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useOrders } from "@/hook/useOrders";
// import { Order, OrderItem, ORDER_COLUMNS, OrderStatus } from "@/types/ordertypes";
// import { useRouter } from "next/navigation";

// // --- Estilos por columna ---
// const COLUMN_STYLES: Record<OrderStatus, { header: string; dot: string; ring: string; cardBorder: string }> = {
//   Pendiente: {
//     header: "bg-amber-50 text-amber-800 border-amber-200",
//     dot: "bg-amber-400",
//     ring: "ring-amber-300",
//     cardBorder: "border-l-amber-400",
//   },
//   "En Progreso": {
//     header: "bg-blue-50 text-blue-800 border-blue-200",
//     dot: "bg-blue-500",
//     ring: "ring-blue-300",
//     cardBorder: "border-l-blue-500",
//   },
//   Completo: {
//     header: "bg-emerald-50 text-emerald-800 border-emerald-200",
//     dot: "bg-emerald-500",
//     ring: "ring-emerald-300",
//     cardBorder: "border-l-emerald-500",
//   },
// };

// // --- Utilidad: fecha local en formato YYYY-MM-DD ---
// const toDateInputValue = (d: Date) => {
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// // --- Utilidad: comparar si una orden pertenece a la fecha seleccionada ---
// const isSameDay = (dateValue: Date | string, yyyyMmDd: string) => {
//   const d = new Date(dateValue);
//   return toDateInputValue(d) === yyyyMmDd;
// };

// export default function OrdersPage() {
//   const { orders, loading, error, fetchOrders } = useOrders();
//   const router = useRouter();

//   const [board, setBoard] = useState<Record<OrderStatus, Order[]>>({
//     Pendiente: [],
//     "En Progreso": [],
//     Completo: [],
//   });

//   const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
//   const [dragOverColumn, setDragOverColumn] = useState<OrderStatus | null>(null);

//   // Filtro por fecha (por defecto hoy)
//   const [selectedDate, setSelectedDate] = useState<string>(() => toDateInputValue(new Date()));

//   useEffect(() => {
//     fetchOrders({ limit: 100 });
//   }, [fetchOrders]);

//   // Órdenes filtradas por fecha
//   const filteredOrders = useMemo(() => {
//     return orders.filter((o) => isSameDay(o.created_at, selectedDate));
//   }, [orders, selectedDate]);

//   // Distribuir en columnas
//   useEffect(() => {
//     const grouped: Record<OrderStatus, Order[]> = {
//       Pendiente: [],
//       "En Progreso": [],
//       Completo: [],
//     };
//     filteredOrders.forEach((o) => {
//       const status = o.status as OrderStatus;
//       if (grouped[status]) grouped[status].push(o);
//     });
//     setBoard(grouped);
//   }, [filteredOrders]);

//   // --- Drag & Drop ---
//   const handleDragStart = (order: Order) => setDraggedOrder(order);

//   const handleDragOver = (e: React.DragEvent, column: OrderStatus) => {
//     e.preventDefault();
//     setDragOverColumn(column);
//   };

//   const handleDragLeave = () => setDragOverColumn(null);

//   const canDrop = (from: OrderStatus, to: OrderStatus): boolean => {
//     const fromIdx = ORDER_COLUMNS.indexOf(from);
//     const toIdx = ORDER_COLUMNS.indexOf(to);
//     return Math.abs(toIdx - fromIdx) === 1;
//   };

//   const handleDrop = (e: React.DragEvent, targetColumn: OrderStatus) => {
//     e.preventDefault();
//     setDragOverColumn(null);
//     if (!draggedOrder) return;

//     const fromStatus = draggedOrder.status as OrderStatus;
//     if (!canDrop(fromStatus, targetColumn)) {
//       setDraggedOrder(null);
//       return;
//     }

//     setBoard((prev) => {
//       const next = { ...prev };
//       next[fromStatus] = next[fromStatus].filter((o) => o.id !== draggedOrder.id);
//       next[targetColumn] = [...next[targetColumn], { ...draggedOrder, status: targetColumn }];
//       return next;
//     });

//     // TODO: persistir en backend
//     setDraggedOrder(null);
//   };

//   // --- Acciones ---
//   const handleDelete = (order: Order) => {
//     const ok = window.confirm(`¿Eliminar la orden #${order.order_number}?`);
//     if (!ok) return;
//     // TODO: llamar a tu API: await deleteOrder(order.id);
//     setBoard((prev) => {
//       const status = order.status as OrderStatus;
//       return {
//         ...prev,
//         [status]: prev[status].filter((o) => o.id !== order.id),
//       };
//     });
//   };

//   if (loading) return <div className="p-6 text-sm text-gray-500">Cargando órdenes...</div>;
//   if (error) return <div className="p-6 text-sm text-red-500">{error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header con filtro de fecha */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Órdenes</h1>
//           <p className="text-sm text-gray-500 mt-1">Arrastra las órdenes entre columnas para actualizar su estado.</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <label htmlFor="date-filter" className="text-sm font-medium text-gray-600">
//             Fecha:
//           </label>
//           <input
//             id="date-filter"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
//           />
//           <button
//             type="button"
//             onClick={() => setSelectedDate(toDateInputValue(new Date()))}
//             className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm hover:bg-gray-50"
//           >
//             Hoy
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {ORDER_COLUMNS.map((column) => {
//           const styles = COLUMN_STYLES[column];
//           const isOver = dragOverColumn === column;
//           const canDeleteColumn = column === "Pendiente" || column === "En Progreso";

//           return (
//             <div
//               key={column}
//               onDragOver={(e) => handleDragOver(e, column)}
//               onDragLeave={handleDragLeave}
//               onDrop={(e) => handleDrop(e, column)}
//               className={`rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col min-h-[500px] transition-all ${
//                 isOver ? `ring-2 ${styles.ring} border-transparent` : ""
//               }`}
//             >
//               {/* Header */}
//               <div className={`flex items-center justify-between px-4 py-3 rounded-t-xl border-b ${styles.header}`}>
//                 <div className="flex items-center gap-2">
//                   <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
//                   <h2 className="font-semibold text-sm">{column}</h2>
//                 </div>
//                 <span className="text-xs font-medium bg-white/70 rounded-full px-2 py-0.5">{board[column].length}</span>
//               </div>

//               {/* Lista */}
//               <div className="flex flex-col gap-2 p-3 flex-1">
//                 {board[column].map((order) => (
//                   <OrderCard
//                     key={order.id}
//                     order={order}
//                     borderClass={styles.cardBorder}
//                     canDelete={canDeleteColumn}
//                     onDragStart={() => handleDragStart(order)}
//                     onDragEnd={() => setDraggedOrder(null)}
//                     onDelete={() => handleDelete(order)}
//                     onView={() => handleViewDetails(order)}
//                     isDragging={draggedOrder?.id === order.id}
//                   />
//                 ))}

//                 {board[column].length === 0 && (
//                   <div className="flex-1 flex items-center justify-center">
//                     <p className="text-xs text-gray-400">Sin órdenes</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ---------- Card ----------
// function OrderCard({
//   order,
//   borderClass,
//   canDelete,
//   onDragStart,
//   onDragEnd,
//   onDelete,
//   onView,
//   isDragging,
// }: {
//   order: Order;
//   borderClass: string;
//   canDelete: boolean;
//   onDragStart: () => void;
//   onDragEnd: () => void;
//   onDelete: () => void;
//   onView: () => void;
//   isDragging: boolean;
// }) {
//   const customer = order.customer;
//   const total = order.total_amount ?? 0;

//   const formattedTime = new Date(order.created_at).toLocaleTimeString("es-AR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div
//       draggable
//       onDragStart={onDragStart}
//       onDragEnd={onDragEnd}
//       className={`bg-white rounded-lg border border-gray-200 border-l-4 ${borderClass} p-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-sm ${
//         isDragging ? "opacity-40" : "opacity-100"
//       }`}
//     >
//       {/* Fila superior */}
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-xs font-semibold text-gray-500">#{order.order_number}</span>
//         <span className="text-xs text-gray-400">{formattedTime}</span>
//       </div>

//       {/* Cliente */}
//       {customer && (
//         <div className="mb-2 pb-2 border-b border-gray-100">
//           <p className="text-sm font-medium text-gray-800 truncate">{customer.name ?? "Sin nombre"}</p>
//           {customer.phone && <p className="text-xs text-gray-500 mt-0.5">📞 {customer.phone}</p>}
//         </div>
//       )}

//       {/* Items */}
//       <ul className="text-xs text-gray-600 space-y-1 mb-2">
//         {order.items.map((item: OrderItem, i) => (
//           <li key={i} className="flex justify-between gap-2">
//             <span className="truncate">
//               <span className="text-gray-400">{item.quantity}×</span> {item.items_name}
//             </span>
//             <span className="text-gray-500 shrink-0">${(item.quantity * item.unit_price).toFixed(2)}</span>
//           </li>
//         ))}
//       </ul>

//       {/* Footer: total + acciones */}
//       <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//         <div className="text-sm">
//           <span className="text-gray-500 text-xs">Total </span>
//           <span className="font-bold text-gray-900">${total.toLocaleString()}</span>
//         </div>

//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={onView}
//             title="Ver detalles"
//             className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
//           >
//             {/* Icono ojo */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//               />
//             </svg>
//           </button>

//           {canDelete && (
//             <button
//               type="button"
//               onClick={onDelete}
//               title="Eliminar"
//               className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
//             >
//               {/* Icono papelera */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { useOrders } from "@/hook/useOrders";
import { Order, OrderItem, ORDER_COLUMNS, OrderStatus } from "@/types/ordertypes";

/* ---------------------------------- Estilos ---------------------------------- */

const COLUMN_STYLES: Record<OrderStatus, { header: string; dot: string; ring: string; cardBorder: string }> = {
  Pendiente: {
    header: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-400",
    ring: "ring-amber-300",
    cardBorder: "border-l-amber-400",
  },
  "En Progreso": {
    header: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
    ring: "ring-blue-300",
    cardBorder: "border-l-blue-500",
  },
  Completo: {
    header: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
    ring: "ring-emerald-300",
    cardBorder: "border-l-emerald-500",
  },
};

const DELETABLE_COLUMNS: OrderStatus[] = ["Pendiente", "En Progreso"];

/* ---------------------------------- Helpers ---------------------------------- */

const toDateInputValue = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const isSameDay = (dateValue: Date | string, yyyyMmDd: string) => toDateInputValue(new Date(dateValue)) === yyyyMmDd;

const buildEmptyBoard = (): Record<OrderStatus, Order[]> => ({
  Pendiente: [],
  "En Progreso": [],
  Completo: [],
});

/* ------------------------------- Página principal ------------------------------ */

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders } = useOrders();

  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<OrderStatus | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => toDateInputValue(new Date()));

  // Estado local "override" tras un drag (antes de que el backend responda).
  // Empieza vacío: mientras no haya cambios, el board sale directo de `orders`.
  const [overrides, setOverrides] = useState<Record<string, OrderStatus>>({});
  // Estado local para eliminaciones optimistas (hasta que se persista en backend).
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchOrders({ limit: 100 });
  }, [fetchOrders]);

  // Board derivado (sin useEffect ni estado duplicado)
  const board = useMemo<Record<OrderStatus, Order[]>>(() => {
    const grouped = buildEmptyBoard();

    for (const order of orders) {
      if (deletedIds.has(order.id)) continue;

      const created = new Date(order.created_at);
      if (!isSameDay(created, selectedDate)) continue;

      const status = (overrides[order.id] ?? order.status) as OrderStatus;
      if (grouped[status]) grouped[status].push(order);
    }

    return grouped;
  }, [orders, selectedDate, overrides, deletedIds]);

  /* ------------------------------- Drag & Drop ------------------------------- */

  const handleDragStart = useCallback((order: Order) => {
    setDraggedOrder(order);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedOrder(null);
    setDragOverColumn(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, column: OrderStatus) => {
    e.preventDefault();
    setDragOverColumn(column);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumn: OrderStatus) => {
      e.preventDefault();
      setDragOverColumn(null);

      if (!draggedOrder) return;

      const fromStatus = (overrides[draggedOrder.id] ?? draggedOrder.status) as OrderStatus;

      const fromIdx = ORDER_COLUMNS.indexOf(fromStatus);
      const toIdx = ORDER_COLUMNS.indexOf(targetColumn);
      const canDrop = Math.abs(toIdx - fromIdx) === 1;

      if (!canDrop) {
        setDraggedOrder(null);
        return;
      }

      // Optimista: marcamos el override
      setOverrides((prev) => ({ ...prev, [draggedOrder.id]: targetColumn }));
      setDraggedOrder(null);

      // TODO: persistir en backend y, si falla, revertir:
      // try {
      //   await updateOrderStatus(draggedOrder.id, targetColumn);
      // } catch {
      //   setOverrides((prev) => {
      //     const next = { ...prev };
      //     delete next[draggedOrder.id];
      //     return next;
      //   });
      // }
    },
    [draggedOrder, overrides],
  );

  /* --------------------------------- Acciones -------------------------------- */

  const handleDelete = useCallback((order: Order) => {
    const ok = window.confirm(`¿Eliminar la orden #${order.order_number}?`);
    if (!ok) return;

    // Optimista
    setDeletedIds((prev) => {
      const next = new Set(prev);
      next.add(order.id);
      return next;
    });

    // TODO: persistir en backend y, si falla, quitar de deletedIds:
    // try {
    //   await deleteOrder(order.id);
    // } catch {
    //   setDeletedIds((prev) => {
    //     const next = new Set(prev);
    //     next.delete(order.id);
    //     return next;
    //   });
    // }
  }, []);

  const handleResetDate = useCallback(() => {
    setSelectedDate(toDateInputValue(new Date()));
  }, []);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  }, []);

  /* ---------------------------------- Render --------------------------------- */

  if (loading) return <div className="p-6 text-sm text-gray-500">Cargando órdenes...</div>;
  if (error) return <div className="p-6 text-sm text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header con filtro de fecha */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Órdenes</h1>
          <p className="mt-1 text-sm text-gray-500">Arrastra las órdenes entre columnas para actualizar su estado.</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="date-filter" className="text-sm font-medium text-gray-600">
            Fecha:
          </label>
          <input
            id="date-filter"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={handleResetDate}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
          >
            Hoy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ORDER_COLUMNS.map((column) => {
          const styles = COLUMN_STYLES[column];
          const isOver = dragOverColumn === column;
          const canDeleteColumn = DELETABLE_COLUMNS.includes(column);
          const columnOrders = board[column];

          return (
            <div
              key={column}
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
              className={`flex min-h-[500px] flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${
                isOver ? `ring-2 ${styles.ring} border-transparent` : ""
              }`}
            >
              <div className={`flex items-center justify-between rounded-t-xl border-b px-4 py-3 ${styles.header}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                  <h2 className="text-sm font-semibold">{column}</h2>
                </div>
                <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium">{columnOrders.length}</span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-3">
                {columnOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    borderClass={styles.cardBorder}
                    canDelete={canDeleteColumn}
                    isDragging={draggedOrder?.id === order.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDelete={handleDelete}
                  />
                ))}

                {columnOrders.length === 0 && (
                  <div className="flex flex-1 items-center justify-center">
                    <p className="text-xs text-gray-400">Sin órdenes</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------- Card ---------------------------------- */

interface OrderCardProps {
  order: Order;
  borderClass: string;
  canDelete: boolean;
  isDragging: boolean;
  onDragStart: (order: Order) => void;
  onDragEnd: () => void;
  onDelete: (order: Order) => void;
}

const OrderCard = memo(function OrderCard({
  order,
  borderClass,
  canDelete,
  isDragging,
  onDragStart,
  onDragEnd,
  onDelete,
}: OrderCardProps) {
  const customer = order.customer;
  const total = order.total_amount ?? 0;

  const formattedTime = useMemo(
    () =>
      new Date(order.created_at).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [order.created_at],
  );

  return (
    <div
      draggable
      onDragStart={() => onDragStart(order)}
      onDragEnd={onDragEnd}
      className={`cursor-grab rounded-lg border border-l-4 border-gray-200 bg-white p-3 transition-all hover:shadow-sm active:cursor-grabbing ${borderClass} ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Fila superior */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500">#{order.order_number}</span>
        <span className="text-xs text-gray-400">{formattedTime}</span>
      </div>

      {/* Cliente */}
      {customer && (
        <div className="mb-2 border-b border-gray-100 pb-2">
          <p className="truncate text-sm font-medium text-gray-800">{customer.name ?? "Sin nombre"}</p>
          {customer.phone && <p className="mt-0.5 text-xs text-gray-500">📞 {customer.phone}</p>}
        </div>
      )}

      {/* Items */}
      <ul className="mb-2 space-y-1 text-xs text-gray-600">
        {order.items.map((item: OrderItem, i) => (
          <li key={i} className="flex justify-between gap-2">
            <span className="truncate">
              <span className="text-gray-400">{item.quantity}×</span> {item.items_name}
            </span>
            <span className="shrink-0 text-gray-500">${(item.quantity * item.unit_price).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-2">
        <div className="text-sm">
          <span className="text-xs text-gray-500">Total </span>
          <span className="font-bold text-gray-900">${total.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={`/orders/${order.id}`}
            title="Ver detalles"
            onClick={(e) => e.stopPropagation()}
            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(order)}
              title="Eliminar"
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
