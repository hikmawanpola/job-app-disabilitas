"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "Fatih", role: "user" },
    { id: 2, name: "Siti", role: "user" },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      <table className="w-full bg-white border rounded-2xl overflow-hidden">
        <thead className="bg-rose-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">
                <button className="px-3 py-2 rounded-xl bg-slate-200">
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </RoleGuard>
  );
}
