"use client";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/lib/auth-store";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";
import Link from "next/link";
import { useEffect, useState } from "react";

type Role = "user" | "company" | "admin";
type FormData = { email: string; password: string; role?: Role };

export default function LoginPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });
  const setAuth = useAuthStore((s) => s.setAuth);
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  const roleSel = watch("role");
  useEffect(() => {
    // Auto isi email contoh supaya jelas role apa yang dipilih
    if (roleSel === "admin") setValue("email", "admin@example.com");
    else if (roleSel === "company") setValue("email", "hr@example.com");
    else if (roleSel === "user") setValue("email", "user@example.com");
  }, [roleSel, setValue]);

  const go = (role: Role) => {
    if (role === "company") location.href = "/company/dashboard";
    else if (role === "admin") location.href = "/admin/dashboard";
    else location.href = "/user/dashboard";
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // 1) Coba ke backend
      const res = await apiPost("/auth/login", data);
      if (res?.token && res?.role) {
        setAuth({
          token: res.token,
          role: res.role as Role,
          profile: res.profile,
        });
        push("Signed in");
        return go(res.role as Role);
      }
      // 2) Dev fallback (jika _networkError atau _skipped atau res invalid)
      const guess: Role =
        data.role ||
        (data.email.includes("admin")
          ? "admin"
          : data.email.includes("hr@") || data.email.includes("company")
          ? "company"
          : "user");
      setAuth({ token: "dev", role: guess, profile: { email: data.email } });
      push(`Signed in as ${guess} (dev)`);
      go(guess);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 p-6 rounded-2xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          required
        />

        {/* Friendly role chooser (untuk dev / demo) */}
        <select
          {...register("role")}
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          onChange={(e) => {
            const v = e.target.value as "user" | "company" | "admin" | "";
            if (v === "admin") setValue("email", "admin@example.com");
            else if (v === "company") setValue("email", "hr@example.com");
            else if (v === "user") setValue("email", "user@example.com");
          }}
        >
          <option value="">Auto detect role (dev)</option>
          <option value="user">Sign in as User</option>
          <option value="company">Sign in as Company</option>
          <option value="admin">Sign in as Admin</option>
        </select>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Hint: pilih role untuk demo cepat (email otomatis terisi). Kalau
          backend offline, login dev dipakai otomatis.
        </p>

        <p className="mt-3 text-xs">
          <a className="text-brand-600" href="/auth/forgot">
            Forgot password?
          </a>
        </p>
        <button
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        No account?{" "}
        <Link href="/auth/register" className="text-brand-600">
          Create one
        </Link>
      </p>

      {/* Quick dev buttons tetap ada */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {(["user", "company", "admin"] as const).map((r) => (
          <button
            key={r}
            className="px-2 py-2 rounded-xl border dark:border-neutral-700"
            onClick={() => {
              useAuthStore.getState().setAuth({
                token: "dev",
                role: r,
                profile: { name: `Dev ${r}` },
              });
              go(r);
            }}
          >
            Dev {r}
          </button>
        ))}
      </div>
    </div>
  );
}
