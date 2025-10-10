"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "user" | "company" | "admin";
type Profile = {
  id?: number;
  name?: string;
  email?: string;
  avatarUrl?: string; // user avatar
  logoUrl?: string; // company logo
};

type AuthState = {
  token?: string;
  role?: Role;
  profile?: Profile;
  setAuth: (p: { token: string; role: Role; profile?: Profile }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      role: undefined,
      profile: undefined,
      setAuth: (p) => set(p),
      logout: () =>
        set({ token: undefined, role: undefined, profile: undefined }),
    }),
    { name: "auth" }
  )
);
