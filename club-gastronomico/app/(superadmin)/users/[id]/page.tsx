"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hook/useUser";
import { User } from "@/types/user.types";

export default function UserDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { loading, error, fetchById } = useUser();
  const [user, setUser] = useState<User | null>(null);

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

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!user) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h1 className="text-2xl font-bold">Detalle del Usuario</h1>

      <p>
        <strong>ID:</strong> {user.id}
      </p>

      <p>
        <strong>Nombre:</strong> {user.name}
      </p>

      <p>
        <strong>Apellido:</strong> {user.lastname}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Estado:</strong> {user.is_active ? "Activo" : "Inactivo"}
      </p>

      <p>
        <strong>Rol:</strong> {user.role.name}
      </p>

      <p>
        <strong>Empresa:</strong> {user.company?.name ?? "Sin empresa"}
      </p>

      <p>
        <strong>Sucursal:</strong> {user.branch?.name ?? "Sin sucursal"}
      </p>
    </div>
  );
}
