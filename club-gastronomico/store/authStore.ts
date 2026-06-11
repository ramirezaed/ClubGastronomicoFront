// src/store/authStore.ts
import { create } from "zustand";
import { AuthUser } from "@/types/auth.types";

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
