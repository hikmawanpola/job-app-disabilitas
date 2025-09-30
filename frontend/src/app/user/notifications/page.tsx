"use client";
import RoleGuard from "@/components/RoleGuard";
import { notifications } from "@/mocks/notifications";

export default function NotificationsPage() {
  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Notifications
      </h1>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 shadow-sm
                       dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700"
          >
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {n.body}
            </p>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
