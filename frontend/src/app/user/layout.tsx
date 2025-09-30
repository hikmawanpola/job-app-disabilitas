import { ReactNode } from "react";
import UserLeftbar from "@/components/user/Leftbar";
import UserRightbar from "@/components/user/Rightbar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
      <aside className="hidden lg:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
        <UserLeftbar />
      </aside>
      <section className="min-w-0">{children}</section>
      <aside className="hidden xl:block sticky top-[64px] self-start h-[calc(100vh-80px)] overflow-auto">
        <UserRightbar />
      </aside>
    </div>
  );
}
