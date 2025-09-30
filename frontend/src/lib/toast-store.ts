"use client";
import { create } from "zustand";

type Toast = { id: number; text: string };
type Store = {
  toasts: Toast[];
  push: (text: string) => void;
  remove: (id: number) => void;
};

export const useToast = create<Store>((set, get) => ({
  toasts: [],
  push: (text) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    set({ toasts: [...get().toasts, { id, text }] });
    setTimeout(() => get().remove(id), 2200);
  },
  remove: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
