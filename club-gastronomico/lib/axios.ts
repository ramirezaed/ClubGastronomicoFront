import axios from "axios";
import { getSession } from "next-auth/react";
/**
 * Instancia de axios para Client Components y hooks.
 * Agrega el token JWT automáticamente en cada request.
 * Redirige a /login si el servidor devuelve 401.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(error.response?.data?.message ?? error.message ?? "Ocurrió un error"));
    }
    return Promise.reject(error);
  },
);

export default api;
