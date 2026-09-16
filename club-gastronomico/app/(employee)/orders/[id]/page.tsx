"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useOrder } from "@/hook/useOrder";
import { OrderItem, OrderStatus } from "@/types/ordertypes";
import {
  ArrowLeft,
  Package,
  XCircle,
  Clock,
  User,
  MapPin,
  Phone,
  Send,
  Hash,
  Calendar,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { LoadingState } from "@/app/components/ui/loandigstate";

// Colores por estado (mismos que el board, con más variedad de clases)
const STATUS_STYLES: Record<
  OrderStatus,
  {
    badge: string;
    dot: string;
    label: string;
    cardBorder: string;
    accent: string; // color del borde superior de la card principal
    sectionBg: string; // fondo suave para cabeceras de sección
    sectionBorder: string;
  }
> = {
  Pendiente: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
    label: "Pendiente",
    cardBorder: "border-amber-200",
    accent: "border-t-amber-400",
    sectionBg: "bg-amber-50/60",
    sectionBorder: "border-amber-200",
  },
  "En Progreso": {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    label: "En Progreso",
    cardBorder: "border-blue-200",
    accent: "border-t-blue-500",
    sectionBg: "bg-blue-50/60",
    sectionBorder: "border-blue-200",
  },
  Completo: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Completo",
    cardBorder: "border-emerald-200",
    accent: "border-t-emerald-500",
    sectionBg: "bg-emerald-50/60",
    sectionBorder: "border-emerald-200",
  },
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { order, loading, error, fetchById } = useOrder();

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDateTime = (value: Date | string) =>
    new Date(value).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return <LoadingState title="Cargando orden..." description="Espere un momento por favor" />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-slate-800">Error al cargar la orden</h3>
          <p className="mb-6 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => fetchById(id)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-medium text-slate-500">Orden no encontrada</p>
          <Link
            href="/orders"
            className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a órdenes
          </Link>
        </div>
      </div>
    );
  }

  const statusStyle = STATUS_STYLES[order.status as OrderStatus] ?? STATUS_STYLES.Pendiente;

  const subtotal = order.items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0);

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      {/* Card principal con borde superior de color según estado */}
      <div
        className={`overflow-hidden rounded-xl border border-slate-200 ${statusStyle.accent} border-t-4 bg-white shadow-sm`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <Hash className="h-4 w-4" />
                <span className="text-sm font-medium">Orden #{order.order_number}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Detalle de la orden</h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                <span>{formatDateTime(order.created_at)}</span>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${statusStyle.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`} />
              {statusStyle.label}
            </span>
          </div>

          {/* Cliente — card con borde completo y color */}
          <div className={`mb-4 rounded-lg border ${statusStyle.cardBorder} bg-white p-4 shadow-sm`}>
            <div
              className={`mb-3 flex items-center gap-2 rounded-md -mx-1 -mt-1 px-3 py-2 ${statusStyle.sectionBg} border-b ${statusStyle.sectionBorder}`}
            >
              <User className="h-4 w-4 text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Cliente</p>
            </div>

            <p className="mb-3 text-lg font-semibold text-slate-800">{order.customer?.name ?? "Sin nombre"}</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoBlock
                icon={<MapPin className="h-4 w-4" />}
                label="Dirección"
                value={order.customer?.address || "—"}
              />
              <InfoBlock icon={<Phone className="h-4 w-4" />} label="Teléfono" value={order.customer?.phone || "—"} />
              <InfoBlock
                icon={<Send className="h-4 w-4" />}
                label="Telegram"
                value={order.customer?.telegram_username ? `@${order.customer.telegram_username}` : "—"}
              />
            </div>
          </div>

          {/* Items — card con borde completo */}
          <div className={`mb-4 overflow-hidden rounded-lg border ${statusStyle.cardBorder} bg-white shadow-sm`}>
            <div
              className={`flex items-center gap-2 border-b ${statusStyle.sectionBorder} ${statusStyle.sectionBg} px-4 py-3`}
            >
              <ShoppingBag className="h-4 w-4 text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Productos ({order.items.length})
              </p>
            </div>

            <ul className="divide-y divide-slate-100">
              {order.items.map((item: OrderItem, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${statusStyle.badge}`}
                  >
                    {item.quantity}×
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{item.items_name}</p>
                    <p className="text-xs text-slate-500">{item.category_name}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-800">
                      {formatPrice(item.quantity * item.unit_price)}
                    </p>
                    <p className="text-xs text-slate-500">{formatPrice(item.unit_price)} c/u</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Totales — card con borde completo */}
          <div className={`rounded-lg border ${statusStyle.cardBorder} bg-white p-4 shadow-sm`}>
            <div className="mb-2 flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700">Total</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">{formatPrice(order.total_amount)}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-slate-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}
