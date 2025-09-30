"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminCompanies() {
  const companies = [
    { id: 1, name: "PT Akses Nusantara" },
    { id: 2, name: "CV Ramah Karya" },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4">Manage Companies</h1>
      <ul className="space-y-3">
        {companies.map((c) => (
          <li
            key={c.id}
            className="card bg-white border rounded-2xl p-4 flex items-center justify-between"
          >
            <span>{c.name}</span>
            <button className="px-3 py-2 rounded-xl bg-slate-200">
              Suspend
            </button>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
