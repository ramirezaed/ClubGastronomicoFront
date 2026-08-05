"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hook/useUser";
import { CheckCircle, XCircle, User as UserIcon, Mail, Building2 } from "lucide-react";
import { StatusToggle } from "@/app/components/ui/togleStatus";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/app/components/ui/DeleteButton";
import Modal from "@/app/components/ui/Modal";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useRoles } from "@/hook/useRoles";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { loading, updating, user, error, fetchById, toogglestatus, deleteUser, updateRolUser } = useUser();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { roles, fetchRoles } = useRoles();
  // const [selectedRole, setSelectedRole] = useState("");
  const [selectedRole, setSelectedRole] = useState(user?.role?.id || "");

  // Cargar datos al renderizar la pagina
  useEffect(() => {
    const loadData = async () => {
      if (id) {
        await fetchById(id);
        await fetchRoles();
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Solo depende de id

  // Función para recargar el usuario
  const loadUser = async () => {
    if (id) {
      await fetchById(id);
    }
  };

  // Manejar cambio de estado
  const handleToggleStatus = async () => {
    if (!user) return;
    const response = await toogglestatus(user.id, user.is_active);
    if (response) {
      await loadUser(); // Recargar para actualizar el estado
    }
  };

  // Manejar eliminación
  const handleDelete = async () => {
    if (!user) return;
    const response = await deleteUser(user.id);
    if (response) {
      setModalMessage(response.message || "Usuario eliminado exitosamente");
      setModalOpen(true);
    }
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/users");
  };

  //  Badges para roles
  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-purple-100 text-purple-700",
      owner: "bg-blue-100 text-blue-700",
      employee: "bg-green-100 text-green-700",
    };
    return roleMap[roleName] || "bg-gray-100 text-gray-700";
  };

  //  Cambiar rol
  const handleChangeRole = async () => {
    if (!user) return;
    if (selectedRole === user.role.id) return; // No hacer nada si es el mismo rol

    const response = await updateRolUser(user.id, selectedRole);
    if (response) {
      await loadUser(); // Recargar para actualizar el estado
    }
  };

  // Estados de carga y error
  if (loading) {
    return <LoadingState title="Cargando datos del usuario" description="Espere un momento por favor" />;
  }

  if (error) {
    return <ErrorState title={error} onRetry={loadUser} />;
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
    <div className="w-full min-h-screen bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 flex flex-col overflow-hidden">
      {/* Header con ícono y título */}
      <div className="p-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
            <UserIcon className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-[Poppins] font-extrabold text-gray-800 flex items-center gap-3 flex-wrap">
              {user.name} {user.lastname}
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
            </h1>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-1 mx-auto mb-4" />

      <div className="p-2 space-y-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información de contacto */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
              Información de Contacto
            </h2>
            <div className="flex items-center gap-3 p-4 rounded-xl">
              <Mail className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-gray-800 font-medium break-all">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Información de empresa */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
              Información de Empresa
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl">
                <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Empresa</p>
                  <p className="text-gray-800 font-medium">{user.company?.name ?? "Sin empresa asignada"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del usuario */}
      <div className="rounded-2xl p-4 mx-4 md:mx-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Estado del usuario</h3>
            <p className="text-sm text-gray-500 mt-1">Activa o desactiva el acceso de este usuario al sistema.</p>
          </div>
          <StatusToggle isActive={user.is_active} loading={updating} onToggle={handleToggleStatus} />
        </div>
      </div>

      {/* Rol del usuario */}
      <div className="rounded-2xl p-4 mx-4 md:mx-6 mt-0.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Rol del usuario</h3>
            <p className="text-sm text-gray-500 mt-1">Selecciona un nuevo rol para este usuario.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="
                w-full
                sm:min-w-70
                lg:min-w-[320px]
                px-4 py-3
                rounded-xl
                border-2 border-orange-200
                bg-white
                text-gray-700
                font-medium
                shadow-sm
                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-100
                outline-none
                transition-all
                cursor-pointer
              "
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleChangeRole}
              disabled={selectedRole === user.role.id}
              className="
                px-6 py-3
                rounded-xl
                bg-linear-to-r
                from-orange-500
                to-orange-600
                text-white
                font-medium
                shadow-md
                hover:scale-[1.02]
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
                whitespace-nowrap
                cursor-pointer
              "
            >
              Cambiar rol
            </button>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="px-4 md:px-8 py-4 md:py-6 mt-4">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-16 mb-4 mx-auto" />

        <div className="mt-2 flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
          <button
            onClick={() => router.back()}
            className="
              w-full sm:w-auto
              px-6 py-2.5
              rounded-xl
              bg-linear-to-r
              from-orange-500
              to-orange-600
              text-white
              font-medium
              shadow-md
              hover:scale-[1.02]
              transition-all
              duration-200
              cursor-pointer
              order-2 sm:order-1
            "
          >
            Volver
          </button>

          <DeleteButton loading={loading} itemName={`al usuario ${user.name}`} onDelete={handleDelete} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Usuario Eliminado!" message={modalMessage} />
    </div>
  );
}
