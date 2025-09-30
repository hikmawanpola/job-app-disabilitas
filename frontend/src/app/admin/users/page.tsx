"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "Fatih", role: "user" },
    { id: 2, name: "Siti", role: "user" },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Manage Users
      </h1>

      <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-neutral-700 shadow-sm">
        <table className="w-full bg-white dark:bg-neutral-900">
          <thead className="bg-rose-50 dark:bg-neutral-800 text-left">
            <tr className="text-slate-700 dark:text-slate-200">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={[
                  "border-t border-slate-300 dark:border-neutral-700",
                  i % 2 === 1 ? "bg-rose-50/40 dark:bg-neutral-900/40" : "",
                ].join(" ")}
              >
                <td className="p-3 text-slate-900 dark:text-slate-100">
                  {u.name}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {u.role}
                </td>
                <td className="p-3">
                  <button className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RoleGuard>
  );
}
