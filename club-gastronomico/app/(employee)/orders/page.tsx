"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Plus, Ban } from "lucide-react";
import { useOrders } from "@/hook/useOrders";
import { Order, OrderItem, ORDER_COLUMNS, OrderStatus, CancelOrderPayload } from "@/types/ordertypes";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { ErrorState } from "@/app/components/ui/errorState";
import { ModalConfirmacion } from "@/app/components/ui/ModalConfirmacion";
import { CancelOrderModal } from "@/app/components/ui/CancelOrderModal";
import { useOrder } from "@/hook/useOrder";

/* ---------------------------------- Config ---------------------------------- */

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

const CANCELLABLE_COLUMNS: OrderStatus[] = ["Pendiente", "En Progreso"];

/* ---------------------------------- Helpers ---------------------------------- */

const toDateInputValue = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const isSameDay = (dateValue: Date | string, yyyyMmDd: string) => toDateInputValue(new Date(dateValue)) === yyyyMmDd;

const buildEmptyBoard = (): Record<OrderStatus, Order[]> => ({
  Pendiente: [],
  "En Progreso": [],
  Completo: [],
});

/* ---------------------------------- Página ---------------------------------- */

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders } = useOrders();
  const { cancelarOrden } = useOrder();
  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<OrderStatus | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => toDateInputValue(new Date()));
  const [overrides, setOverrides] = useState<Record<string, OrderStatus>>({});
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [showNewOrder, setShowNewOrder] = useState(false);

  useEffect(() => {
    fetchOrders({ limit: 100 });
  }, [fetchOrders]);

  const board = useMemo<Record<OrderStatus, Order[]>>(() => {
    const grouped = buildEmptyBoard();
    for (const order of orders) {
      if (!isSameDay(order.created_at, selectedDate)) continue;
      const status = (overrides[order.id] ?? order.status) as OrderStatus;
      grouped[status]?.push(order);
    }
    return grouped;
  }, [orders, selectedDate, overrides]);

  const handleDrop = useCallback(
    (e: React.DragEvent, target: OrderStatus) => {
      e.preventDefault();
      setDragOverColumn(null);
      if (!draggedOrder) return;

      const from = (overrides[draggedOrder.id] ?? draggedOrder.status) as OrderStatus;
      const adjacent = Math.abs(ORDER_COLUMNS.indexOf(target) - ORDER_COLUMNS.indexOf(from)) === 1;

      if (adjacent) {
        setOverrides((prev) => ({ ...prev, [draggedOrder.id]: target }));
      }
      setDraggedOrder(null);
    },
    [draggedOrder, overrides],
  );

  /* --------------------------------- Acciones -------------------------------- */

  const askCancel = useCallback((order: Order) => setOrderToCancel(order), []);

  const confirmCancel = useCallback(
    (id: string, payload: CancelOrderPayload) => cancelarOrden(id, payload),
    [cancelarOrden],
  );

  /* ---------------------------------- Render --------------------------------- */

  if (loading) return <LoadingState title="Cargando Ordenes" description="Espere un momento por favor" />;

  if (error) return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={fetchOrders} />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Botón Nuevo pedido */}
      <div className="mb-4 flex justify-center">
        <button
          type="button"
          onClick={() => setShowNewOrder(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nuevo pedido
        </button>
      </div>

      {/* Header */}
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
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={() => setSelectedDate(toDateInputValue(new Date()))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
          >
            Hoy
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ORDER_COLUMNS.map((column) => {
          const styles = COLUMN_STYLES[column];
          const isOver = dragOverColumn === column;
          const columnOrders = board[column];
          const canCancel = CANCELLABLE_COLUMNS.includes(column);

          return (
            <div
              key={column}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverColumn(column);
              }}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, column)}
              className={`flex min-h-125 flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${
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
                    canCancel={canCancel}
                    isDragging={draggedOrder?.id === order.id}
                    onDragStart={setDraggedOrder}
                    onDragEnd={() => {
                      setDraggedOrder(null);
                      setDragOverColumn(null);
                    }}
                    onCancel={askCancel}
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

      {/* Modal: Cancelar */}
      <CancelOrderModal
        order={orderToCancel}
        onClose={() => setOrderToCancel(null)}
        onConfirm={confirmCancel}
        onSuccess={() => fetchOrders({ limit: 100 })}
      />

      {/* Modal: Nuevo pedido (placeholder) */}
      <ModalConfirmacion
        open={showNewOrder}
        onClose={() => setShowNewOrder(false)}
        title="Nuevo pedido"
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowNewOrder(false)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled
              title="Pendiente: conectar hook de registro"
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white opacity-50"
            >
              Registrar pedido
            </button>
          </>
        }
      >
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <Plus className="mx-auto mb-2 h-8 w-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">Formulario de nuevo pedido</p>
          <p className="mt-1 text-xs text-slate-400">Aquí irá el formulario cuando esté listo el hook de registro.</p>
        </div>
      </ModalConfirmacion>
    </div>
  );
}

/* ----------------------------------- Card ----------------------------------- */

interface OrderCardProps {
  order: Order;
  borderClass: string;
  canCancel: boolean;
  isDragging: boolean;
  onDragStart: (order: Order) => void;
  onDragEnd: () => void;
  onCancel: (order: Order) => void;
}

const OrderCard = memo(function OrderCard({
  order,
  borderClass,
  canCancel,
  isDragging,
  onDragStart,
  onDragEnd,
  onCancel,
}: OrderCardProps) {
  const { customer, total_amount: total = 0 } = order;

  const time = useMemo(
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
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500">#{order.order_number}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>

      {customer && (
        <div className="mb-2 border-b border-gray-100 pb-2">
          <p className="truncate text-sm font-medium text-gray-800">{customer.name ?? "Sin nombre"}</p>
          {customer.phone && <p className="mt-0.5 text-xs text-gray-500">📞 {customer.phone}</p>}
        </div>
      )}

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

          {canCancel && (
            <button
              type="button"
              onClick={() => onCancel(order)}
              title="Cancelar orden"
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-amber-50 hover:text-amber-600"
            >
              <Ban className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
