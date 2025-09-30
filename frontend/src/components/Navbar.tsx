"use client";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  MessageSquare,
  Newspaper,
  Search,
  User2,
  BriefcaseBusiness,
  LayoutDashboard,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import A11yToolbar from "./A11yToolbar";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { role, logout } = useAuthStore();
  const pathname = usePathname();

  const linkCls = (href: string) =>
    [
      "p-2 rounded-lg",
      "text-slate-700 dark:text-slate-200",
      "hover:text-brand-600 dark:hover:text-brand-400",
      "hover:bg-rose-50 dark:hover:bg-neutral-800",
      pathname === href ? "bg-rose-50 dark:bg-neutral-800" : "",
    ].join(" ");

  return (
    <header
      className="sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur
                       border-b border-slate-200 dark:border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Inclusive Jobs" className="h-8 w-auto" />
        </Link>

        <div className="flex-1 hidden md:flex items-center gap-2">
          <div
            className="flex items-center gap-2 w-full max-w-xl rounded-full border
                          px-3 py-2 dark:border-neutral-700"
          >
            <Search className="h-5 w-5 text-slate-400" />
            <input
              className="flex-1 outline-none bg-transparent text-slate-800 dark:text-slate-100
                         placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Search jobs, companies, articles..."
            />
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Link
            href="/articles"
            aria-label="Articles"
            className={linkCls("/articles")}
          >
            <Newspaper />
          </Link>

          {role === "user" && (
            <>
              <Link
                href="/user/jobs"
                className={linkCls("/user/jobs")}
                aria-label="Jobs"
              >
                <BriefcaseBusiness />
              </Link>
              <Link
                href="/user/notifications"
                className={linkCls("/user/notifications")}
                aria-label="Notifications"
              >
                <Bell />
              </Link>
              <Link
                href="/user/chat"
                className={linkCls("/user/chat")}
                aria-label="Chat"
              >
                <MessageSquare />
              </Link>
              <Link
                href="/user/saved"
                className={linkCls("/user/saved")}
                aria-label="Saved"
              >
                <Bookmark />
              </Link>
              <Link
                href="/user/dashboard"
                className={linkCls("/user/dashboard")}
                aria-label="Profile"
              >
                <User2 />
              </Link>
            </>
          )}

          {role === "company" && (
            <>
              <Link
                href="/company/dashboard"
                className={linkCls("/company/dashboard")}
                aria-label="Dashboard"
              >
                <LayoutDashboard />
              </Link>
              <Link
                href="/company/search"
                className={linkCls("/company/search")}
                aria-label="Search candidates"
              >
                <Search />
              </Link>
              <Link
                href="/company/applicants"
                className={linkCls("/company/applicants")}
                aria-label="Applicants"
              >
                <BriefcaseBusiness />
              </Link>
            </>
          )}

          {role === "admin" && (
            <Link
              href="/admin/dashboard"
              className={linkCls("/admin/dashboard")}
              aria-label="Admin dashboard"
            >
              <LayoutDashboard />
            </Link>
          )}

          <ThemeToggle />
          <A11yToolbar />

          {role ? (
            <button
              onClick={() => {
                logout();
                window.location.href = "/auth/login";
              }} // ⬅️ redirect benar
              className="px-3 py-2 rounded-xl border
               border-slate-300 dark:border-neutral-700
               text-slate-700 dark:text-slate-200
               hover:border-brand-600 hover:text-brand-600"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="px-3 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
