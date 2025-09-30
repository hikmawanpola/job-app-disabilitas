"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";

export default function CompanyProfile() {
  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4">Company Profile</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <section className="card bg-white border rounded-2xl p-4 space-y-3">
          <TextInput placeholder="Company name" />
          <TextInput placeholder="Address" />
          <TextArea placeholder="About company" rows={4} />
          <TextArea
            placeholder="Accessibility facilities (ramps, lifts, etc.)"
            rows={3}
          />
          <button className="px-4 py-3 rounded-xl bg-brand-600 text-white">
            Save
          </button>
        </section>
        <aside className="card bg-white border rounded-2xl p-4">
          <p className="text-sm text-slate-600">
            Upload activity photos or links
          </p>
          <TextArea rows={8} placeholder="https://…" />
        </aside>
      </div>
    </RoleGuard>
  );
}
