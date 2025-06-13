import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/features/(admin)/(authenticated)/dashboard";
import ClientDashboard from "@/features/(client)/(authenticated)/dashboard";
import { getSubdomain } from "@/utils";

/**
 * It is protected by the auth middleware.
 * ? If you face the error of the typescript in createFileRoute, you need to define the type of the route in the routerTree.gen.ts file in the declare module "@tanstack/react-router".
 * ? Go to src/routerTree.gen.ts and import this file. Then define the type of the route in the RouteChildren interface.
 * ? If you want to share the route, you need to define a route file in the routes (share) folder. ex: src/routes/(share)/dashboard.tsx
 */

export const Route = createFileRoute("/(share)/dashboard")({
  component: () => {
    const subdomain = getSubdomain();

    // ? If the subdomain is not null, it is a client.
    if (subdomain) {
      return <ClientDashboard />;
    }

    return <AdminDashboard />;
  },
});
