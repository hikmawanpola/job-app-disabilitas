"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";
import FileDrop from "@/components/form/FileDrop";
import TagInput from "@/components/form/TagInput";
import ExperienceEditor, { Exp } from "@/components/profile/ExperienceEditor";
import AvatarUploader from "@/components/AvatarUploader";
import { useAuthStore } from "@/lib/auth-store";
import { useState } from "react";
import { useToast } from "@/lib/toast-store";

export default function UserProfile() {
  const [cvFile, setCvFile] = useState<File | undefined>();
  const [skills, setSkills] = useState<string[]>(["React", "A11y", "Tailwind"]);
  const [exp, setExp] = useState<Exp[]>([]);
  const { push } = useToast();

  const { token, role, profile, setAuth } = useAuthStore();

  const save = () => {
    console.log({ skills, exp, cvFile, avatarUrl: profile?.avatarUrl });
    push("Profile saved (frontend)");
  };

  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        My Profile
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="font-semibold">Profile photo</h2>
          <AvatarUploader
            value={profile?.avatarUrl}
            onChange={(url) => {
              if (!token || !role) return;
              setAuth({ token, role, profile: { ...profile, avatarUrl: url } });
            }}
          />

          <h2 className="font-semibold mt-4">Basic</h2>
          <TextInput placeholder="Full name" defaultValue={profile?.name} />
          <TextInput placeholder="Headline (e.g., Frontend Dev • A11y Enthusiast)" />
          <TextInput placeholder="Location" />
          <TextArea placeholder="About / Bio" rows={4} />

          <h2 className="font-semibold mt-4">Accessibility preferences</h2>
          <TextArea
            placeholder="Wheelchair access, larger text, high contrast, etc."
            rows={3}
          />

          <h2 className="font-semibold mt-4">Skills</h2>
          <TagInput
            value={skills}
            onChange={setSkills}
            placeholder="Add a skill and press Enter"
          />

          <h2 className="font-semibold mt-4">Experience</h2>
          <ExperienceEditor value={exp} onChange={setExp} />

          <h2 className="font-semibold mt-4">Education</h2>
          <TextInput placeholder="School / University" />
          <TextInput placeholder="Degree / Major" />
          <div className="grid grid-cols-2 gap-2">
            <TextInput placeholder="Start (YYYY-MM)" />
            <TextInput placeholder="End (or Present)" />
          </div>

          <h2 className="font-semibold mt-4">Portfolio links</h2>
          <TextArea rows={3} placeholder="https://…" />

          <h2 className="font-semibold mt-4">CV / Resume</h2>
          <FileDrop onFile={setCvFile} />

          <div className="mt-4">
            <button
              onClick={save}
              className="px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              Save Profile
            </button>
          </div>
        </section>

        <aside className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Preview</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This is a quick preview of your public profile.
          </p>
          <ul className="mt-3 text-sm list-disc pl-4">
            <li className="text-slate-800 dark:text-slate-100">
              <b>Skills</b>: {skills.join(", ") || "–"}
            </li>
            <li className="text-slate-800 dark:text-slate-100">
              <b>Experience items</b>: {exp.length}
            </li>
            <li className="text-slate-800 dark:text-slate-100">
              <b>CV</b>: {cvFile?.name || "–"}
            </li>
          </ul>
        </aside>
      </div>
    </RoleGuard>
  );
}
