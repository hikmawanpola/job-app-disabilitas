import type { Metadata } from "next";
import Script from "next/script"; // ⬅️ tambahkan
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import Toasts from "@/components/Toasts";

export const metadata: Metadata = {
  title: "Inclusive Jobs",
  description:
    "Job platform for seniors and people with disabilities in Indonesia",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head /> {/* optional placeholder, aman dibiarkan kosong */}
      <body className="min-h-screen text-slate-900 dark:text-slate-100">
        {/* Seed theme SEBELUM hydration agar tidak flicker & tanpa error */}
        <Script id="theme-seed" strategy="beforeInteractive">{`
          try {
            var s = localStorage.getItem('theme');
            if (s) {
              var st = JSON.parse(s);
              if (st?.state?.dark) {
                document.documentElement.classList.add('dark');
              }
            }
          } catch (e) {}
        `}</Script>

        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6 page-content">
          {children}
        </main>
        <Toasts />
      </body>
    </html>
  );
}
