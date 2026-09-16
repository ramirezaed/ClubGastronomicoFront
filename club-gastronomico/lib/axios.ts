import axios from "axios";
import { signOut } from "next-auth/react";
import { getSessionCached, invalidateSessionCache } from "@/lib/session-cache";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSessionCached();

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(new Error("No session"));
  }

  if (session.accessToken) {
    try {
      const payload = JSON.parse(atob(session.accessToken.split(".")[1]));
      const exp = payload.exp * 1000;

      if (Date.now() >= exp) {
        invalidateSessionCache(); // fuerza refetch real, no el cache viejo
        const newSession = await getSessionCached();
        if (!newSession) {
          await signOut({ redirect: false });
          window.location.href = "/login";
          return Promise.reject(new Error("Token expired"));
        }
        config.headers.Authorization = `Bearer ${newSession.accessToken}`;
        return config;
      }
    } catch (error) {
      await signOut({ redirect: false });
      window.location.href = "/";
      return Promise.reject(new Error("Invalid token"));
    }

    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      invalidateSessionCache();
      const session = await getSessionCached();
      if (!session) {
        if (typeof window !== "undefined") {
          await signOut({ redirect: false });
          window.location.href = "/login";
        }
      }
      if (error.config && session?.accessToken) {
        error.config.headers.Authorization = `Bearer ${session.accessToken}`;
        return api(error.config);
      }
    }

    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(error.response?.data?.message ?? error.message ?? "Ocurrió un error"));
    }
    return Promise.reject(error);
  },
);

export default api;
