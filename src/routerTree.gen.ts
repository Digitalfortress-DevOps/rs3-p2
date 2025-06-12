/**
 * ? This file is the root of the routes.
 * ? It is the child of the root route.
 * ? If you need to protected routes, you need to add the auth middleware to the route.
 */

/**
 * ? How to define a route for the page?
 * ? 1. Define a feature folder in the src/features folder.
 * ? 2. Define a route file in the routes folder. ex: src/features/(admin)/(authenticated)/dashboard/routes/index.tsx
 * ? 3. Import the route in the src/routerTree.gen.ts file. ex: import { Route as adminDashboardRouteImport } from "./features/(admin)/(authenticated)/dashboard/routes"
 * ? 4. Update the route with the update function. ex: const adminDashboardRoute = adminDashboardRouteImport.update({...})
 * ? 5. Add the type of the route to the AdminRouteChildren object. ex: adminDashboardRoute: typeof adminDashboardRoute
 * ? 6. Add the route to the rootAdminRouteChildren object. ex: const rootAdminRouteChildren: AdminRouteChildren = { adminDashboardRoute, ... }
 * ? 7. Add the route to the routeTree object. ex: export const routeTree = rootRoute._addFileChildren({ ...rootAdminRouteChildren })._addFileTypes()
 */

//#region Root Route (This is step 3)
import { Route as rootRoute } from "./_root"
import { Route as adminDashboardRouteImport } from "./features/(admin)/(authenticated)/dashboard/routes"
import { Route as adminLoginRouteImport } from "./features/(admin)/(unauthenticated)/login/routes"
//#endregion Root Route

//#region Admin Routers (This is step 4 & 6)
const adminDashboardRoute = adminDashboardRouteImport.update({
  id: "/(admin)/dashboard",
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any)

const adminLoginRoute = adminLoginRouteImport.update({
  id: "/(admin)/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any)

const rootAdminRouteChildren: AdminRouteChildren = {
  adminDashboardRoute,
  adminLoginRoute,
}
//#endregion Admin Routers

export const routeTree = rootRoute
  ._addFileChildren({
    ...rootAdminRouteChildren,
  })
  ._addFileTypes()

//#region Admin Route Children (This is step 5)
export type AdminRouteChildren = {
  //#region authenticated
  adminDashboardRoute: typeof adminDashboardRoute
  //#endregion authenticated

  //#region unauthenticated
  adminLoginRoute: typeof adminLoginRoute
  //#endregion unauthenticated
}
//#endregion Admin Route Children
/**
 * ? If you face the error of the typescript the children router, you can add the type of the route in the declare module "@tanstack/react-router".
 */
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/(admin)/dashboard": {
      id: "/(admin)/dashboard"
      path: "/dashboard"
      fullPath: "/dashboard"
      preLoaderRoute: typeof adminDashboardRoute
      parentRoute: typeof rootRoute
    }

    "/(admin)/login": {
      id: "/(admin)/login"
      path: "/login"
      fullPath: "/login"
      preLoaderRoute: typeof adminLoginRoute
      parentRoute: typeof rootRoute
    }
  }
}
