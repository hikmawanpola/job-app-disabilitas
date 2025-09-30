export type Role = "user" | "company" | "admin";
export const dashboardPathFor = (role?: Role) =>
  role === "company"
    ? "/company/dashboard"
    : role === "admin"
    ? "/admin/dashboard"
    : "/user/dashboard";
