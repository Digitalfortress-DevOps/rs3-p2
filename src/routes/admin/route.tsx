import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/admin";

export const Route = createFileRoute("/admin")({
  component: () => (
    <div>
      <AdminLayout />
      <Outlet />
    </div>
  ),
});
