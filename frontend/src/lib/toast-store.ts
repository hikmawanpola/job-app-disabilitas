"use client";
import { create } from "zustand";

export type ToastType = "success" | "error" | "info";
type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type Store = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  remove: (id: number) => void;
};

export const useToast = create<Store>((set, get) => ({
  toasts: [],
  push: (toast) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    set({ toasts: [...get().toasts, { ...toast, id }] });
    setTimeout(() => get().remove(id), 3000);
  },
  remove: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
