"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "user" | "company" | "admin";

interface AuthState {
  token?: string;
  role?: Role;
  profile?: any;
  setAuth: (v: { token?: string; role?: Role; profile?: any }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      role: undefined,
      profile: undefined,
      setAuth: (v) => set(v),
      logout: () =>
        set({ token: undefined, role: undefined, profile: undefined }),
    }),
    { name: "auth" }
  )
);
