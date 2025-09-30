"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  dark: boolean;
  setDark: (v: boolean) => void;
  toggle: () => void;
};
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      dark: false,
      setDark: (v) => {
        set({ dark: v });
        if (typeof document !== "undefined")
          document.documentElement.classList.toggle("dark", v);
      },
      toggle: () => {
        const v = !get().dark;
        set({ dark: v });
        if (typeof document !== "undefined")
          document.documentElement.classList.toggle("dark", v);
      },
    }),
    { name: "theme" }
  )
);
