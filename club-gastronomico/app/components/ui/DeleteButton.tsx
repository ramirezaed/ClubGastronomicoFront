"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  loading?: boolean;
  itemName?: string;
  onDelete: () => Promise<void> | void;
}

export function DeleteButton({ loading = false, itemName = "este elemento", onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await onDelete();
    setOpen(false);
  };

  return (
    <>
      {/* Botón eliminar centrado */}
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center justify-center gap-2
          w-full sm:w-auto
          px-5 py-2.5 rounded-xl
          bg-red-50 text-red-600
          hover:bg-red-100
          cursor-pointer
          border border-red-200
          font-semibold text-sm
          transition-all duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <Trash2 size={16} />
        <span>{loading ? "Eliminando..." : "Eliminar"}</span>
      </button>

      {/* Modal con línea superior */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">¿Eliminar {itemName}?</h3>
                <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    flex-1 py-2.5 rounded-xl
                    bg-gray-100 text-gray-700
                    hover:bg-gray-200
                    cursor-pointer
                    font-semibold text-sm
                    transition
                  "
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="
                    flex-1 py-2.5
                   bg-gray-100 text-gray-700
                    rounded-xl shadow-xs
                    hover:scale-[1.02]
                    transition-all duration-200
                    cursor-pointer
                    disabled:opacity-50
                    disabled:hover:scale-100
                  "
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
