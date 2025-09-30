"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";
import AvatarUploader from "@/components/AvatarUploader";
import { useAuthStore } from "@/lib/auth-store";

export default function CompanyProfile() {
  const { token, role, profile, setAuth } = useAuthStore();

  const save = () => {
    console.log("company profile", profile?.logoUrl);
    alert("Saved (frontend)");
  };

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Company Profile
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="font-semibold">Company logo</h2>
          <AvatarUploader
            label="Company logo"
            value={profile?.logoUrl}
            onChange={(url) => {
              if (!token || !role) return;
              setAuth({ token, role, profile: { ...profile, logoUrl: url } });
            }}
          />

          <label className="text-sm text-slate-700 dark:text-slate-200">
            Name
          </label>
          <TextInput placeholder="Company name" defaultValue={profile?.name} />

          <label className="text-sm text-slate-700 dark:text-slate-200">
            Address
          </label>
          <TextInput placeholder="Address" />

          <label className="text-sm text-slate-700 dark:text-slate-200">
            About
          </label>
          <TextArea placeholder="About company" rows={4} />

          <label className="text-sm text-slate-700 dark:text-slate-200">
            Accessibility facilities
          </label>
          <TextArea placeholder="Ramps, lifts, large signage, etc." rows={3} />

          <button
            onClick={save}
            className="px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            Save
          </button>
        </section>

        <aside className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Upload activity photos or links
          </p>
          <TextArea rows={8} placeholder="https://…" />
        </aside>
      </div>
    </RoleGuard>
  );
}
