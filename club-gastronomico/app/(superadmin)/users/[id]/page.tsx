"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hook/useUser";
import { User } from "@/types/user.types";
import { CheckCircle, XCircle, User as UserIcon, Mail, Building2, Store, Briefcase } from "lucide-react";
import { StatusToggle } from "@/app/components/ui/togleStatus";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/app/components/ui/DeleteButton";
import Modal from "@/app/components/ui/Modal";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { loading, updating, error, fetchById, toogglestatus, deleteUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false); //seteo el modal, por defecto false (cerrado)
  const [modalMessage, setModalMessage] = useState(""); //mensaje del modal, por defcto vacio

  const handleToggleStatus = async () => {
    if (!user) return;
    const response = await toogglestatus(user.id, user.is_active);
    if (response) {
      setUser({
        ...user,
        is_active: response.userActualizado.is_active,
      });
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const response = await deleteUser(user.id);
    if (response) {
      setModalMessage(response.message || "Usuario eliminado exitosamente");
      setModalOpen(true);
    }
  };
  //funcion cerrar modal, al cerrar vuelve a la pagina usuarios
  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/users");
  };

  useEffect(() => {
    async function loadUser() {
      const response = await fetchById(id);
      if (response) {
        setUser(response);
      }
    }
    if (id) {
      loadUser();
    }
  }, [id]);

  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-purple-100 text-purple-700",
      owner: "bg-blue-100 text-blue-700",
      employee: "bg-green-100 text-green-700",
    };
    return roleMap[roleName] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg mb-4"></div>
              <p className="text-gray-600">Cargando datos del usuario...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border-l-4 border-red-500">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-gray-600">Usuario no encontrado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-8 relative">
      {/* Fondo con texto repetido */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl font-bold text-gray-800 whitespace-nowrap"
              style={{
                top: `${(i * 120) % 1000}px`,
                left: `${(i * 80) % 1000}px`,
                transform: `rotate(12deg)`,
                opacity: i % 3 === 0 ? 0.2 : i % 3 === 1 ? 0.4 : 0.1,
              }}
            >
              Club Gastronómico
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Card principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Barra naranja superior */}
          <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600"></div>

          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.name} {user.lastname}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleBadgeClass(user.role.name)}`}>
                    {user.role.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {user.is_active ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Activo</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-red-600">Inactivo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8 space-y-6">
            {/* Información de contacto */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-r from-orange-500 to-orange-600 rounded-full"></div>
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <StatusToggle isActive={user.is_active} loading={updating} onToggle={handleToggleStatus} />
            <DeleteButton loading={loading} itemName={`al usuario ${user.name}`} onDelete={handleDelete} />
            {/* Información de empresa */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-r from-orange-500 to-orange-600 rounded-full"></div>
                Información de Empresa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Empresa</p>
                    <p className="text-gray-800 font-medium">{user.company?.name ?? "Sin empresa asignada"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Store className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Sucursal</p>
                    <p className="text-gray-800 font-medium">{user.branch?.name ?? "Sin sucursal asignada"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer con botón de volver */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-linear-to-r cursor-pointer from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Registro exitoso!" message={modalMessage} />
    </div>
  );
}
