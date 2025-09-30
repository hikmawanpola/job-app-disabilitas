"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminDashboard() {
  const stats = [
    { label: "Users", value: 1200 },
    { label: "Companies", value: 220 },
    { label: "Jobs", value: 860 },
    { label: "Articles", value: 45 },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card bg-white border rounded-2xl p-4">
            <p className="text-sm text-slate-600">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </RoleGuard>
  );
}
