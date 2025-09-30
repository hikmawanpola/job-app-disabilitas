import { ReactNode } from "react";
import RoleGuard from "@/components/RoleGuard";
import AdminLeftbar from "@/components/admin/Leftbar";
import AdminRightbar from "@/components/admin/Rightbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allow={["admin"]}>
      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <aside className="hidden lg:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
          <AdminLeftbar />
        </aside>
        <section className="min-w-0">{children}</section>
        <aside className="hidden xl:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
          <AdminRightbar />
        </aside>
      </div>
    </RoleGuard>
  );
}
