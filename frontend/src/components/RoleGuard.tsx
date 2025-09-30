"use client";
import { useAuthStore } from "@/lib/auth-store";
import { ReactNode, useEffect } from "react";

export default function RoleGuard({
  allow,
  children,
}: {
  allow: Array<"user" | "company" | "admin">;
  children: ReactNode;
}) {
  const { role } = useAuthStore();
  useEffect(() => {
    if (!role) window.location.href = "/auth/login";
    else if (!allow.includes(role)) window.location.href = "/";
  }, [role, allow]);
  if (!role || !allow.includes(role)) return null;
  return <>{children}</>;
}
