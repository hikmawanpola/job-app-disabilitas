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
      if (res?.ok) {
        push("Job posted");
        (e.target as HTMLFormElement).reset();
      } else {
        push("Posted (frontend mock)");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      push("Posted (frontend mock)");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={submit} className="grid gap-4 max-w-2xl">
        <TextInput name="title" placeholder="Job title" required />
        <TextInput name="location" placeholder="Location" required />
        <Select name="category" required>
          <option value="">Select category</option>
          <option>Senior</option>
          <option>Diffable access</option>
          <option>Visual impairment friendly</option>
        </Select>
        <TextArea
          name="description"
          rows={6}
          placeholder="Job description, requirements, benefits…"
          required
        />
        <TextArea
          name="criteria"
          rows={4}
          placeholder="Accessibility criteria (ramp, lift, large text, etc.)"
        />
        <button className="px-4 py-3 rounded-xl bg-brand-600 text-white">
          Publish
        </button>
      </form>
    </RoleGuard>
  );
}
