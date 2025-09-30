"use client";
import { useForm } from "react-hook-form";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";

export default function ResetPage({ params }: { params: { token: string } }) {
  const { register, handleSubmit } = useForm<{ password: string }>();
  const { push } = useToast();

  const onSubmit = async (d: { password: string }) => {
    const res = await apiPost(`/auth/reset/${params.token}`, d);
    push(res?.ok ? "Password updated" : "Mock: password updated");
    location.href = "/auth/login";
  };

  const field =
    "w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 " +
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100";

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-6 rounded-2xl border border-slate-300 dark:border-neutral-700 shadow-sm">
      <h1 className="text-2xl font-bold">Set New Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label
          htmlFor="password"
          className="text-sm text-slate-700 dark:text-slate-200"
        >
          New password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          minLength={8}
          required
          placeholder="New password"
          className={field}
        />
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Update password
        </button>
      </form>
    </div>
  );
}
