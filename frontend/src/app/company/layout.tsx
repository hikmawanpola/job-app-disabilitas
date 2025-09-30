"use client";
import { ReactNode } from "react";
import RoleGuard from "@/components/RoleGuard";
import CompanyLeftbar from "@/components/company/Leftbar";
import CompanyRightbar from "@/components/company/Rightbar";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allow={["company"]}>
      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <aside className="hidden lg:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
          <CompanyLeftbar />
        </aside>

        <section className="min-w-0">{children}</section>

        <aside className="hidden xl:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
          <CompanyRightbar />
        </aside>
      </div>
    </RoleGuard>
  );
}
