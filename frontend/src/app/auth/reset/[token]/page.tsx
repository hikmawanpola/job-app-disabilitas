"use client";
import { useForm } from "react-hook-form";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";

export default function ResetPage({ params }: { params: { token: string } }) {
  const { register, handleSubmit } = useForm<{ password: string }>();
  const { push } = useToast();

  const onSubmit = async (d: { password: string }) => {
    const res = await apiPost(`/auth/reset/${params.token}`, d);
    if (res?.ok) {
      push("Password updated");
      location.href = "/auth/login";
    } else {
      push("Mock: password updated");
      location.href = "/auth/login";
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 p-6 rounded-2xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold">Set New Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input
          {...register("password")}
          type="password"
          minLength={8}
          required
          placeholder="New password"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
        />
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3">
          Update password
        </button>
      </form>
    </div>
  );
}
