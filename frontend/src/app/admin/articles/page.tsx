"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";

export default function AdminArticles() {
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Articles
      </h1>

      <form className="grid gap-3 max-w-2xl mb-6 card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
        </label>
        <TextInput placeholder="Title" />

        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Content
        </label>
        <TextArea rows={6} placeholder="Content…" />

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            Publish
          </button>
          <button
            type="button"
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
          >
            Save draft
          </button>
        </div>
      </form>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        List of articles will appear here…
      </p>
    </RoleGuard>
  );
}
