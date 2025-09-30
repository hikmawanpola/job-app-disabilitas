"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";
import Select from "@/components/form/Select";
import { apiPost } from "@/lib/api";
import { useToast } from "@/lib/toast-store";

export default function PostJobPage() {
  const { push } = useToast();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await apiPost("/company/jobs", payload);
      push(res?.ok ? "Job posted" : "Posted (frontend mock)");
      (e.target as HTMLFormElement).reset();
    } catch {
      push("Posted (frontend mock)");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Post a Job
      </h1>

      <form
        onSubmit={submit}
        className="grid gap-4 max-w-2xl card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm"
      >
        <label className="text-sm text-slate-700 dark:text-slate-200">
          Job title
        </label>
        <TextInput name="title" placeholder="Job title" required />

        <label className="text-sm text-slate-700 dark:text-slate-200">
          Location
        </label>
        <TextInput name="location" placeholder="Location" required />

        <label className="text-sm text-slate-700 dark:text-slate-200">
          Category
        </label>
        <Select name="category" required>
          <option value="">Select category</option>
          <option>Senior</option>
          <option>Diffable access</option>
          <option>Visual impairment friendly</option>
        </Select>

        <label className="text-sm text-slate-700 dark:text-slate-200">
          Description
        </label>
        <TextArea
          name="description"
          rows={6}
          placeholder="Job description, requirements, benefits…"
          required
        />

        <label className="text-sm text-slate-700 dark:text-slate-200">
          Accessibility criteria
        </label>
        <TextArea
          name="criteria"
          rows={4}
          placeholder="Ramp, lift, large text, etc."
        />

        <button className="px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Publish
        </button>
      </form>
    </RoleGuard>
  );
}
