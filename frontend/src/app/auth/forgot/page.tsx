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
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 p-6 rounded-2xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input
          {...register("email")}
          type="email"
          required
          placeholder="Your email"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
        />
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3">
          Send reset link
        </button>
      </form>
    </div>
  );
}
