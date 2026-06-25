"use client";

import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import Modal from "@/app/components/ui/Modal";
import { useRole } from "@/hook/useRole";
import { ArrowLeft, CheckCircle, Shield, XCircle, Save, AlignLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function roleDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { role, loading, error, fetchRoleById, softDeleteRole, updateRole } = useRole();
  const [modalOpen, setModalOpen] = useState(false); //modal por defecto cerrado
  const [modalMessage, setModalMessage] = useState(""); // por defecto el mensaje en el modal es ""

  const [description, setDescription] = useState(""); //seteo el campo description para modificar
  const [formError, setFormError] = useState("");

  //carga los datos del rol cuando se renderiza la pagina
  useEffect(() => {
    fetchRoleById(id);
  }, [id]); //cuando cambia el id se vuelve a ejecutar la funcion

  //funcion para manejar el boton eliminar
  const handleDelete = async () => {
    if (!role) return;
    const response = await softDeleteRole(role.id);
    if (response) {
      setModalMessage(response.message || "Rol eliminado exitosamente");
      setModalOpen(true);
    }
  };

  //funcion para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/roles");
  };

  //funcion para cargar el formulario con los datos que se puede modificar
  useEffect(() => {
    if (role) {
      setDescription(role.description || "");
    }
  }, [role]); //se ejecuta cada vez que cambia la descripcion del rol

  //funcion para modificar el rol
  const handleUpdate = async () => {
    setFormError("");
    if (!description.trim()) {
      setFormError("La descripción es obligatoria");
      return;
    }
    const response = await updateRole(id, description);
    if (response) {
      await fetchRoleById(id);
    }
  };

  //si esta cargando muestra la barra
  if (loading) {
    return <LoadingState title="Cargando datos del Rol" description="Espere un momento por favor" />;
  }

  //si hay un error lanza el error que viene desde la api
  if (error) {
    return <ErrorState title={error} onRetry={() => fetchRoleById(id)} />;
  }

  if (!role) {
    return (
      <div className="h-screen flex flex-col bg-linear-to-r from-orange-100 via-orange-50 to-orange-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No contamos con datos del rol</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 flex flex-col">
      {/* Header con ícono y título */}
      <div className="p-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-[Poppins] font-extrabold text-gray-800 flex items-center gap-3">
              Rol {role.name}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  role.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {role.is_active ? "Activo" : "Inactivo"}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-2 space-y-3 flex flex-col items-center">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mb-10" />
        {/* Descripción */}
        <div className="w-full max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-gray-400" />
              Descripción
            </span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
            placeholder="Ingresa la descripción del rol"
          />
        </div>

        {/* Estado */}
        <div className="w-full max-w-xl mb-10">
          <label className="block text-sm font-medium text-gray-500 mb-1">Estado</label>
          <div className="bg-white/80 px-4 py-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              {role?.is_active ? (
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

        {formError && (
          <div className="w-full max-w-xl bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-xl">
            {formError}
          </div>
        )}

        {/* Botón Guardar cambios */}
        <button
          onClick={handleUpdate}
          className="
            w-full max-w-xl
            inline-flex items-center justify-center gap-2
            px-6 py-3
            rounded-xl
            bg-linear-to-r from-orange-500 to-orange-600
            text-white font-medium
            shadow-md
            cursor-pointer
            hover:scale-[1.02] hover:shadow-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          <Save className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>

      {/* Botones Volver y Eliminar */}

      <div className="  from-orange-100 via-orange-50/20 to-orange-100 px-6 py-4 flex flex-col items-center">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-14 mb-4" />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-3">
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
            "
          >
            Volver
          </button>

          <DeleteButton loading={loading} itemName={`el plan ${role.name}`} onDelete={handleDelete} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Rol Eliminado!" message={modalMessage} />
    </div>
  );
}
