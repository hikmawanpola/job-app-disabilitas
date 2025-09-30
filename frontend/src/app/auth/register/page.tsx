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
    push(
      res?.ok
        ? "Registered. Please sign in."
        : "Registered (frontend mock). Please sign in."
    );
    location.href = "/auth/login";
  };

  const field =
    "w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 " +
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100";

  return (
    <div className="max-w-md mx-auto card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-6 rounded-2xl border border-slate-300 dark:border-neutral-700 shadow-sm">
      <h1 className="text-2xl font-bold">Create account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label
          htmlFor="name"
          className="text-sm text-slate-700 dark:text-slate-200"
        >
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Full / Company name"
          className={field}
          required
        />

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
          minLength={8}
          placeholder="Password (min 8)"
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
          required
        >
          <option value="">Choose role</option>
          <option value="user">Job Seeker</option>
          <option value="company">Company</option>
        </select>

        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Register
        </button>
      </form>
    </div>
  );
}
