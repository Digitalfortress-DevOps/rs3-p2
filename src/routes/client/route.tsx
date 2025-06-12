import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { ClientLayout } from "@/components/layout/client";

export const Route = createFileRoute("/client")({
  component: () => (
    <div>
      <ClientLayout />
      <Outlet />
    </div>
  ),
});
