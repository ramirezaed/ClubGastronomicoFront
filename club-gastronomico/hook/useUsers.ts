import { getAllUser, getById } from "@/services/user.service";
import { getUserParams, User } from "@/types/user.types";

import { useCallback, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]); //si no hay ningun usuarios muestra vacios
  const [loading, setLoading] = useState(true); //por default true, para que aparezcala leyenda "cargando"
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  //useCallback memoriza la funcion, evita que se cree en cada renderizacion
  const fetchUser = useCallback(async (params?: getUserParams) => {
    setLoading(true); //se vuele a colocar para que cuando en la siguiente pagina aparezca
    setError(null);
    try {
      const response = await getAllUser(params);
      setUsers(response.users.data);
      if (response.users.page) {
        setPagination({
          page: response.users.page,
          limit: response.users.limit || 10,
          total: response.users.total || 0,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error, pagination, fetchUser };
};
