"use client";
import RoleGuard from "@/components/RoleGuard";
import TextInput from "@/components/form/TextInput";
import TextArea from "@/components/form/TextArea";

export default function AdminArticles() {
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4">Articles</h1>
      <form className="grid gap-3 max-w-2xl mb-6">
        <TextInput placeholder="Title" />
        <TextArea rows={6} placeholder="Content…" />
        <div className="flex gap-2">
          <button className="px-4 py-3 rounded-xl bg-brand-600 text-white">
            Publish
          </button>
          <button className="px-4 py-3 rounded-xl border">Save draft</button>
        </div>
      </form>
      <p className="text-sm text-slate-600">
        List of articles will appear here…
      </p>
    </RoleGuard>
  );
}
