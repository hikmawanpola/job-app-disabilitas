"use client";
import { API_BASE } from "./constants";
import { useAuthStore } from "./auth-store";

async function request(path: string, init?: RequestInit) {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const base = (API_BASE || "").trim();

  // Jika BASE kosong, jangan fetch ke frontend sendiri → kembalikan "skip"
  if (!base) return { ok: false, _skipped: true };

  try {
    const res = await fetch(base + path, { ...init, headers });
    // Coba parse JSON, kalau gagal ya balikin ok/status saja
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      /* ignore */
    }
    if (!res.ok) return { ok: false, status: res.status, ...data };
    return data ?? { ok: res.ok };
  } catch (e: any) {
    // Jangan lempar error—biar caller bisa fallback ke dev mode
    return { ok: false, _networkError: String(e?.message || e) };
  }
}

export const apiGet = (p: string) => request(p);
export const apiPost = (p: string, body?: any) =>
  request(p, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
export const apiPut = (p: string, body?: any) =>
  request(p, { method: "PUT", body: JSON.stringify(body) });
export const apiDel = (p: string) => request(p, { method: "DELETE" });
