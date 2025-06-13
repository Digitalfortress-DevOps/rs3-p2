import { getSubdomain } from "@/utils";

export function AdminLayout() {
  const subdomain = getSubdomain();

  if (subdomain) return <div>🚫 Access Denied</div>;

  return <div className="font-bold text-2xl text-chart-2">Admin</div>;
}
