"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, CheckCircle, Trash2, Plus, Minus, Search, RefreshCw } from "lucide-react";

import { useOrder } from "@/hook/useOrder";
import { getMenu } from "@/services/menu.service";
import { MenuItem } from "@/types/menu.types";
import { RegisterOrderItems } from "@/types/ordertypes";

type CartLine = { item: MenuItem; quantity: number };

export default function CreateOrderPage() {
  const router = useRouter();
  const { RegisterNewOrder, loading: orderLoading } = useOrder();

  const [productos, setProductos] = useState<MenuItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [search, setSearch] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Traer los productos
  const loadProducts = async () => {
    setCargando(true);
    try {
      const res = await getMenu({ page: 1, limit: 100 });
      const itemsData = res?.items?.data || (res as any)?.data || [];
      setProductos(itemsData);
    } catch (err: any) {
      console.error("Error al cargar menú:", err);
      setError(err.message || "Error al traer productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtro de búsqueda
  const filtered = useMemo(() => {
    return productos.filter((i) => {
      return (
        !search ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [productos, search]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Carrito con control de stock
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((l) => l.item.id === item.id);
      if (found) {
        if (found.quantity >= item.stock) return prev; // No permitir más que el stock
        return prev.map((l) => (l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((l) => {
        if (l.item.id === id) {
          // Limitar entre 1 y el stock disponible
          const newQty = Math.max(1, Math.min(l.item.stock, l.quantity + delta));
          return { ...l, quantity: newQty };
        }
        return l;
      }),
    );
  };

  const removeLine = (id: string) => setCart((prev) => prev.filter((l) => l.item.id !== id));

  const total = useMemo(() => cart.reduce((acc, l) => acc + l.item.price * l.quantity, 0), [cart]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customer.name.trim()) return setError("El nombre es obligatorio");
    if (!customer.address.trim()) return setError("La dirección es obligatoria");
    if (!customer.phone.trim()) return setError("El teléfono es obligatorio");
    if (cart.length === 0) return setError("Agrega al menos un producto");

    setError(null);

    const itemsPayload: RegisterOrderItems[] = cart.map((l) => ({
      menuItems_id: l.item.id,
      quantity: l.quantity,
    }));

    const response = await RegisterNewOrder({
      customer: {
        name: customer.name.trim(),
        address: customer.address.trim(),
        phone: customer.phone.trim(),
      },
      items: itemsPayload,
    });

    if (!response) return;

    setCreatedOrderNumber(response.order_number);
    setShowSuccessModal(true);
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    setCreatedOrderNumber(null);
    setCart([]);
  };

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="relative flex items-center justify-center mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 inline-flex hover:cursor-pointer items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> <span className="text-sm font-medium">Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Registrar pedido</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* Datos del cliente */}
          {/* <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"> */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Datos del cliente</h2>
            {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección *</label>
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            {/* Título y buscador al lado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-800 shrink-0">Menú</h2>
                <button
                  onClick={loadProducts}
                  title="Recargar"
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${cargando ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {cargando && <div className="text-center py-6 text-slate-500 text-sm">Cargando menú...</div>}

            {!cargando && filtered.length === 0 && (
              <div className="text-center py-6 text-slate-400 text-sm">No hay productos disponibles.</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {!cargando &&
                filtered.map((item) => {
                  const inCart = cart.find((l) => l.item.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      {item.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                        {/* Aquí está el stock nuevamente */}
                        <p className="text-xs text-slate-500 truncate">
                          {item.category?.name} · ${item.price} · stock {item.stock}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        disabled={!!inCart && inCart.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" /> {inCart ? `${inCart.quantity}` : "Agregar"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Carrito */}
        <aside className="bg-white rounded-xl border border-slate-200 shadow-sm h-fit lg:sticky lg:top-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
            <h2 className="text-lg font-semibold text-slate-800">Pedido</h2>
          </div>

          {cart.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">Sin productos aún</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {cart.map((l) => (
                <li key={l.item.id} className="space-y-1.5 pb-3 border-b border-slate-100 last:border-0">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-800 truncate">{l.item.name}</span>
                    <button onClick={() => removeLine(l.item.id)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 border border-slate-300 rounded-lg">
                      <button
                        onClick={() => changeQty(l.item.id, -1)}
                        disabled={l.quantity <= 1}
                        className="p-1.5 hover:bg-slate-50 disabled:opacity-40"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{l.quantity}</span>
                      {/* Botón de sumar bloqueado si llega al stock */}
                      <button
                        onClick={() => changeQty(l.item.id, +1)}
                        disabled={l.quantity >= l.item.stock}
                        className="p-1.5 hover:bg-slate-50 disabled:opacity-40"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">
                      ${(l.item.price * l.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-slate-200 mb-4">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-lg font-bold">${total.toLocaleString("es-AR")}</span>
          </div>

          <button
            onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
            disabled={orderLoading || cart.length === 0}
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {orderLoading ? "Registrando..." : "Registrar pedido"}
          </button>
        </aside>
      </div>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl overflow-hidden p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Pedido registrado!</h3>
            <p className="text-sm text-gray-500 mb-6">
              {createdOrderNumber && (
                <>
                  Número de pedido: <span className="font-bold text-gray-700">#{createdOrderNumber}</span>
                </>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/orders")}
                className="flex-1 py-2.5 border border-slate-400 rounded-xl bg-gray-100 font-semibold text-sm hover:bg-gray-200"
              >
                Ir a pedidos
              </button>
              <button
                onClick={handleCreateAnother}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
              >
                Crear otro
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
