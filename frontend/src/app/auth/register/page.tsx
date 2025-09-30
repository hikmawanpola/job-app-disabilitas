"use client";
import { useForm } from "react-hook-form";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: "user" | "company";
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { push } = useToast();

  const onSubmit = async (data: FormData) => {
    const res = await apiPost("/auth/register", data);
    if (res?.ok) {
      push("Registered. Please sign in.");
      location.href = "/auth/login";
    } else {
      push("Registered (frontend mock). Please sign in.");
      location.href = "/auth/login";
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 p-6 rounded-2xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input
          {...register("name")}
          placeholder="Full / Company name"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          required
        />
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
          minLength={8}
          placeholder="Password (min 8)"
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          required
        />
        <select
          {...register("role")}
          className="w-full rounded-xl border dark:border-neutral-700 bg-transparent px-4 py-3"
          required
        >
          <option value="">Choose role</option>
          <option value="user">Job Seeker</option>
          <option value="company">Company</option>
        </select>
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold">
          Register
        </button>
      </form>
    </div>
  );
}
