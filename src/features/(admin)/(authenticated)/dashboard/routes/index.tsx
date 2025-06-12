import { createFileRoute } from "@tanstack/react-router"
import AdminDashboard from ".."

/**
 * It is protected by the auth middleware.
 * ? If you face the error of the typescript in createFileRoute, you need to define the type of the route in the routerTree.gen.ts file in the declare module "@tanstack/react-router".
 * ? Go to src/routerTree.gen.ts and import this file. Then define the type of the route in the RouteChildren interface.
 */

export const Route = createFileRoute("/(admin)/dashboard")({
  component: AdminDashboard,
  loader: async () => {
    //add protected logic here
  },
})
