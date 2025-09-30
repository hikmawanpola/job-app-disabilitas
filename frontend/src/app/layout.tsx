import type { Metadata } from "next";
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
      <body className="min-h-screen bg-white text-slate-900 dark:bg-neutral-950 dark:text-slate-100">
        {/* Hindari FOUC theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try{var s=localStorage.getItem('theme'); if(s){var st=JSON.parse(s); if(st?.state?.dark){document.documentElement.classList.add('dark');}}}catch(e){}
        `,
          }}
        />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Toasts />
      </body>
    </html>
  );
}
