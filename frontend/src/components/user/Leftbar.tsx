"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  Bell,
  MessageSquare,
  User2,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

const items = [
  { href: "/user/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/user/jobs", icon: BriefcaseBusiness, label: "Jobs" },
  { href: "/user/saved", icon: Bookmark, label: "Saved" },
  {
    href: "/user/applications",
    icon: BriefcaseBusiness,
    label: "Applications",
  },
  { href: "/user/chat", icon: MessageSquare, label: "Messages" },
  { href: "/user/notifications", icon: Bell, label: "Notifications" },
  { href: "/user/profile", icon: User2, label: "Edit Profile" },
];

export default function UserLeftbar() {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const li = (href: string) =>
    [
      "flex items-center gap-2 px-3 py-2 rounded-lg",
      "hover:bg-rose-50 dark:hover:bg-neutral-800",
      "hover:text-brand-600 dark:hover:text-brand-400",
      pathname === href ? "bg-rose-50 dark:bg-neutral-800" : "",
    ].join(" ");

  return (
    <div className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 space-y-4 shadow-sm dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-300 to-rose-500" />
        <div>
          <p className="font-semibold">
            {profile?.name || profile?.email || "You"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Job Seeker
          </p>
        </div>
      </div>
      <nav className="space-y-1">
        {items.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className={li(href)}>
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
