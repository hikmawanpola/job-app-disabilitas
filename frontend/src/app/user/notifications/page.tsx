"use client";
import RoleGuard from "@/components/RoleGuard";
import { notifications } from "@/mocks/notifications";

export default function NotificationsPage() {
  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className="card bg-white border rounded-2xl p-4">
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-slate-600">{n.body}</p>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
