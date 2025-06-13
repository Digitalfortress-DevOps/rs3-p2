/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * ? How to define a route for the page?
 * ? 1. Define a feature folder in the src/features folder.
 * ? 2. Define a route file in the routes folder. ex: src/features/(admin)/(authenticated)/dashboard/routes/index.tsx
 * ? 3. If you want to share the route, you need to define a route file in the routes (share) folder. ex: src/routes/(share)/dashboard.tsx
 * ? 4. Import the route in the src/routerTree.gen.ts file. ex: import { Route as shareDashboardRouteImport } from "./routes/(share)/dashboard"
 * ? 5. Update the route with the update function. ex: const shareDashboardRoute = shareDashboardRouteImport.update({...})
 * ? 6. Add the type of the route to the ShareRouteChildren object. ex: shareDashboardRoute: typeof shareDashboardRoute
 * ? 7. Add the route to the rootShareRouteChildren object. ex: const rootShareRouteChildren: ShareRouteChildren = { shareDashboardRoute, ... }
 * ? 8. Add the route to the routeTree object. ex: export const routeTree = rootRoute._addFileChildren({ ...rootShareRouteChildren })._addFileTypes()
 */

//#region Root Route (This is step 3)
import { Route as shareDashboardRouteImport } from "./routes/(share)/dashboard";
import { Route as shareLoginRouteImport } from "./routes/(share)/login";
import { Route as rootRoute } from "./routes/_root";

//#endregion Root Route

//#region Admin Routers (This is step 4 & 6)
// const adminDashboardRoute = adminDashboardRouteImport.update({
//   id: "/(admin)/dashboard",
//   path: "/dashboard",
//   getParentRoute: () => rootRoute,
// } as any)

const shareDashboardRoute = shareDashboardRouteImport.update({
  id: "/(share)/dashboard",
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any);

const shareLoginRoute = shareLoginRouteImport.update({
  id: "/(share)/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

// const rootAdminRouteChildren: AdminRouteChildren = {};
//#endregion Admin Routers

//#region Client Routers (This is step 4 & 6)

// const rootClientRouteChildren: ClientRouteChildren = {
//   // clientDashboardRoute,
// };
//#endregion Client Routers

const rootShareRouteChildren: ShareRouteChildren = {
  shareDashboardRoute,
  shareLoginRoute,
};

export const routeTree = rootRoute
  ._addFileChildren({
    // ...rootAdminRouteChildren,
    // ...rootClientRouteChildren,
    ...rootShareRouteChildren,
  })
  ._addFileTypes();

//#region Share Route Children (This is step 5)
export type ShareRouteChildren = {
  shareDashboardRoute: typeof shareDashboardRoute;
  shareLoginRoute: typeof shareLoginRoute;
};
//#endregion Share Route Children

//#region Admin Route Children (This is step 5)
// export type AdminRouteChildren = {
//   //#region authenticated
//   //#endregion authenticated
//   //
//   //#region unauthenticated
//   //#endregion unauthenticated
// };
//#endregion Admin Route Children

//#region Client Route Children (This is step 5)
// export type ClientRouteChildren = {};
//#endregion Client Route Children

/**
 * ? If you face the error of the typescript the children router, you can add the type of the route in the declare module "@tanstack/react-router".
 */
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    //#region admin

    //#endregion admin

    //#region client

    //#endregion client

    //#region share
    "/(share)/dashboard": {
      id: "/(share)/dashboard";
      path: "/dashboard";
      fullPath: "/dashboard";
      preLoaderRoute: typeof shareDashboardRoute;
      parentRoute: typeof rootRoute;
    };
    "/(share)/login": {
      id: "/(share)/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof shareLoginRoute;
      parentRoute: typeof rootRoute;
    };
    //#endregion share
  }
}
