"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Search,
  User2,
} from "lucide-react";

const items = [
  { href: "/company/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/company/post-job", icon: BriefcaseBusiness, label: "Post Job" },
  { href: "/company/applicants", icon: BriefcaseBusiness, label: "Applicants" },
  { href: "/company/search", icon: Search, label: "Search Candidates" },
  { href: "/company/profile", icon: User2, label: "Company Profile" },
];

export default function CompanyLeftbar() {
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
