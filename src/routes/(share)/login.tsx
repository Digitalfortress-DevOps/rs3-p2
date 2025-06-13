import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "@/features/(admin)/(unauthenticated)/login";
import { ClientLogin } from "@/features/(client)/(unauthenticated)/login";
import { getSubdomain } from "@/utils";

export const Route = createFileRoute("/(share)/login")({
  component: () => {
    const subdomain = getSubdomain();
    if (subdomain) {
      return <ClientLogin />;
    }

    return <AdminLogin />;
  },
});
