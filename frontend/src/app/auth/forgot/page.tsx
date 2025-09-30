"use client";
import { useForm } from "react-hook-form";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";

export default function ForgotPage() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const { push } = useToast();

  const onSubmit = async (d: { email: string }) => {
    const res = await apiPost("/auth/forgot", d);
    if (res?.ok) push("Reset link sent to your email");
    else push("Mock: reset link generated. Check your email (dev)");
  };

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-6 rounded-2xl border border-slate-300 dark:border-neutral-700 shadow-sm">
      <h1 className="text-2xl font-bold">Forgot Password</h1>

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
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
        />
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Send reset link
        </button>
      </form>
    </div>
  );
}
