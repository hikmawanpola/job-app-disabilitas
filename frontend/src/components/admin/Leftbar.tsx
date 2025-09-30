"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  Newspaper,
} from "lucide-react";

const items = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/companies", icon: Building2, label: "Companies" },
  { href: "/admin/jobs", icon: BriefcaseBusiness, label: "Jobs" },
  { href: "/admin/articles", icon: Newspaper, label: "Articles" },
];

export default function AdminLeftbar() {
  const pathname = usePathname();
  const li = (href: string) =>
    [
      "flex items-center gap-2 px-3 py-2 rounded-lg",
      "text-slate-700 dark:text-slate-200",
      "hover:bg-rose-50 dark:hover:bg-neutral-800",
      "hover:text-brand-600 dark:hover:text-brand-400",
      pathname === href ? "bg-rose-50 dark:bg-neutral-800" : "",
    ].join(" ");

  return (
    <div className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 space-y-2 shadow-sm">
      {items.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} className={li(href)}>
          <Icon className="h-4 w-4" /> <span className="text-sm">{label}</span>
        </Link>
      ))}
    </div>
  );
}
