"use client";

import { useEffect, useState } from "react";
import { Ban, AlertCircle, CheckCircle } from "lucide-react";

import { ModalConfirmacion } from "@/app/components/ui/ModalConfirmacion";
import { Order, CANCEL_REASONS, CancelReason, CancelOrderPayload } from "@/types/ordertypes";

interface CancelOrderModalProps {
  order: Order | null;
  onClose: () => void;
  onConfirm: (id: string, payload: CancelOrderPayload) => Promise<unknown>;
  onSuccess?: () => void | Promise<void>;
}

export function CancelOrderModal({ order, onClose, onConfirm, onSuccess }: CancelOrderModalProps) {
  const [reason, setReason] = useState<CancelReason | null>(null);
  const [custom, setCustom] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset cada vez que se abre con una orden nueva
  useEffect(() => {
    if (order) {
      setReason(null);
      setCustom("");
      setMessage(null);
      setError(null);
      setIsCancelling(false);
    }
  }, [order]);

  const needsCustom = reason === "OTHER";
  const canConfirm = !!reason && !(needsCustom && !custom.trim()) && !isCancelling;

  const handleConfirm = async () => {
    if (!order || !reason) return;

    if (needsCustom && !custom.trim()) {
      setError("Por favor escribí el motivo");
      return;
    }

    setIsCancelling(true);
    setError(null);

    const payload: CancelOrderPayload = {
      reason: CANCEL_REASONS[reason],
      ...(needsCustom && { custom_reason: custom.trim() }),
    };

    try {
      const response = await onConfirm(order.id, payload);
      const msg = (response as { message?: string } | undefined)?.message ?? "Orden cancelada correctamente";
      setMessage(msg);

      await onSuccess?.();

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cancelar la orden");
      setIsCancelling(false);
    }
  };

  return (
    <ModalConfirmacion
      open={!!order}
      onClose={() => !isCancelling && onClose()}
      title="Cancelar orden"
      maxWidth="md"
      footer={
        message ? null : (
          <>
            <button
              type="button"
              onClick={onClose}
              disabled={isCancelling}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              No, volver
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!canConfirm}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCancelling ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Cancelando...
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4" />
                  Sí, cancelar
                </>
              )}
            </button>
          </>
        )
      }
    >
      {message ? (
        <SuccessState message={message} />
      ) : (
        <div className="space-y-3">
          <Header orderNumber={order?.order_number} />

          <ReasonList
            value={reason}
            disabled={isCancelling}
            onChange={(key) => {
              setReason(key);
              setError(null);
            }}
          />

          {needsCustom && (
            <CustomReasonInput
              value={custom}
              disabled={isCancelling}
              onChange={(v) => {
                setCustom(v);
                setError(null);
              }}
            />
          )}

          {error && <ErrorBox message={error} />}
        </div>
      )}
    </ModalConfirmacion>
  );
}

/* ------------------------------ Sub-componentes ------------------------------ */

function SuccessState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-2 text-center">
      <CheckCircle className="h-10 w-10 text-emerald-500" />
      <p className="text-sm font-medium text-slate-700">{message}</p>
    </div>
  );
}

function Header({ orderNumber }: { orderNumber?: number }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">¿Cancelar la orden #{orderNumber}?</p>
        <p className="mt-1 text-sm text-slate-500">Seleccioná el motivo de la cancelación.</p>
      </div>
    </div>
  );
}

function ReasonList({
  value,
  disabled,
  onChange,
}: {
  value: CancelReason | null;
  disabled: boolean;
  onChange: (key: CancelReason) => void;
}) {
  return (
    <div className="space-y-1.5">
      {(Object.keys(CANCEL_REASONS) as CancelReason[]).map((key) => {
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            disabled={disabled}
            className={`flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors disabled:opacity-50 ${
              selected
                ? "border-red-300 bg-red-50 text-red-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? "border-red-500" : "border-slate-300"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-red-500" />}
            </span>
            <span className="flex-1">{CANCEL_REASONS[key]}</span>
          </button>
        );
      })}
    </div>
  );
}

function CustomReasonInput({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor="custom-reason" className="mb-1 block text-xs font-medium text-slate-600">
        Contanos el motivo
      </label>
      <textarea
        id="custom-reason"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
        maxLength={200}
        placeholder="Escribí el motivo de la cancelación..."
        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
      />
      <p className="mt-1 text-right text-xs text-slate-400">{value.length}/200</p>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
