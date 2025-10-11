"use client";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/lib/auth-store";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardPathFor, Role } from "@/lib/paths";

type FormData = { email: string; password: string; role?: Role };

export default function LoginPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });
  const { role: currentRole, setAuth } = useAuthStore();
  const router = useRouter();
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentRole) router.replace(dashboardPathFor(currentRole));
  }, [currentRole, router]);


  const go = (role: Role) => router.replace(dashboardPathFor(role));

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
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
      if (!data.role) {
        push("Pilih role terlebih dahulu untuk dev login");
        return;
      }
      const guess = data.role as Role;
      setAuth({ token: "dev", role: guess, profile: { email: data.email } });
      push(`Signed in as ${guess} (dev)`);
      go(guess);
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 " +
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100";

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-6 rounded-2xl border border-slate-300 dark:border-neutral-700 shadow-sm">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label
          htmlFor="email"
          className="text-sm text-slate-700 dark:text-slate-200"
        >
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Email"
          className={field}
          required
        />

        <label
          htmlFor="password"
          className="text-sm text-slate-700 dark:text-slate-200"
        >
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Password"
          className={field}
          required
        />

        <label
          htmlFor="role"
          className="text-sm text-slate-700 dark:text-slate-200"
        >
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          className="w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-slate-900 dark:text-slate-100"
        >
          <option value="">Choose role (dev)</option>
          <option value="user">Sign in as User</option>
          <option value="company">Sign in as Company</option>
          <option value="admin">Sign in as Admin</option>
        </select>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Pilih role untuk demo cepat (email otomatis terisi). Jika backend
          offline, dev login akan dipakai.
        </p>

        <p className="mt-3 text-xs">
          <Link
            className="text-brand-600 dark:text-brand-400 hover:underline"
            href="/auth/forgot"
          >
            Forgot password?
          </Link>
        </p>

        <button
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        No account?{" "}
        <Link
          href="/auth/register"
          className="text-brand-600 dark:text-brand-400 hover:underline"
        >
          Create one
        </Link>
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {(["user", "company", "admin"] as const).map((r) => (
          <button
            key={r}
            className="px-2 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800"
            onClick={() => {
              useAuthStore.getState().setAuth({
                token: "dev",
                role: r,
                profile: { name: `Dev ${r}` },
              });
              window.location.href =
                r === "company"
                  ? "/company/dashboard"
                  : r === "admin"
                  ? "/admin/dashboard"
                  : "/user/dashboard";
            }}
          >
            Dev {r}
          </button>
        ))}
      </div>
    </div>
  );
}
