import { Route as AuthenticatedIndexRouteImport } from "./routes/_authenticated/index";
import { Route as AuthenticatedRouteImport } from "./routes/_authenticated/route";
import { Route as RootRouteImport } from "./routes/_root";
import { Route as AdminIndexRouteImport } from "./routes/admin/index";
import { Route as AdminRouteImport } from "./routes/admin/route";
import { Route as ClientIndexRouteImport } from "./routes/client/index";
import { Route as ClientRouteImport } from "./routes/client/route";

// Root Route
const rootRoute = RootRouteImport;

// Authenticated Routes
const authenticatedRoute = AuthenticatedRouteImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const authenticatedIndexRoute = AuthenticatedIndexRouteImport.update({
  id: "/_authenticated/",
  path: "/",
  getParentRoute: () => authenticatedRoute,
} as any);

// Admin Routes
const adminRoute = AdminRouteImport.update({
  id: "/admin",
  getParentRoute: () => rootRoute,
} as any);

const adminIndexRoute = AdminIndexRouteImport.update({
  id: "/admin/",
  path: "/",
  getParentRoute: () => adminRoute,
} as any);

// Client Routes
const clientRoute = ClientRouteImport.update({
  id: "/client",
  getParentRoute: () => rootRoute,
} as any);

const clientIndexRoute = ClientIndexRouteImport.update({
  id: "/client/",
  path: "/",
  getParentRoute: () => clientRoute,
} as any);

// ==== TypeScript Module Augmentation for tanstack/react-router ====
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "/_authenticated";
      preLoaderRoute: typeof AuthenticatedRouteImport;
      parentRoute: typeof RootRouteImport;
    };

    "/_authenticated/": {
      id: "/_authenticated/";
      path: "/";
      fullPath: "/_authenticated/";
      preLoaderRoute: typeof AuthenticatedIndexRouteImport;
      parentRoute: typeof AuthenticatedRouteImport;
    };

    "/admin": {
      id: "/admin";
      path: "";
      fullPath: "/admin";
      preLoaderRoute: typeof AdminRouteImport;
      parentRoute: typeof RootRouteImport;
    };

    "/admin/": {
      id: "/admin/";
      path: "/";
      fullPath: "/admin/";
      preLoaderRoute: typeof AdminIndexRouteImport;
      parentRoute: typeof AdminRouteImport;
    };

    "/client": {
      id: "/client";
      path: "";
      fullPath: "/client";
      preLoaderRoute: typeof ClientRouteImport;
      parentRoute: typeof RootRouteImport;
    };

    "/client/": {
      id: "/client/";
      path: "/";
      fullPath: "/client/";
      preLoaderRoute: typeof ClientIndexRouteImport;
      parentRoute: typeof ClientRouteImport;
    };
  }
}

// ==== Group Children ====

interface AuthenticatedRouteChildren {
  authenticatedIndexRoute: typeof authenticatedIndexRoute;
}

interface AdminRouteChildren {
  adminIndexRoute: typeof adminIndexRoute;
}

const adminRouteChildren: AdminRouteChildren = {
  adminIndexRoute,
};

interface ClientRouteChildren {
  clientIndexRoute: typeof clientIndexRoute;
}

const clientRouteChildren: ClientRouteChildren = {
  clientIndexRoute,
};

const authenticatedRouteChildren: AuthenticatedRouteChildren = {
  authenticatedIndexRoute,
};

const authenticatedRouteWithChildren = authenticatedRoute._addFileChildren(
  authenticatedRouteChildren,
);

const adminRouteWithChildren = adminRoute._addFileChildren(adminRouteChildren);

const clientRouteWithChildren =
  clientRoute._addFileChildren(clientRouteChildren);

// ==== Root Children ====
interface RootRouteChildren {
  authenticatedRoute: typeof authenticatedRouteWithChildren;
  adminRoute: typeof adminRouteWithChildren;
  clientRoute: typeof clientRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  authenticatedRoute: authenticatedRouteWithChildren,
  adminRoute: adminRouteWithChildren,
  clientRoute: clientRouteWithChildren,
};

// ==== Route Typings for App ====

export interface FileRoutesByFullPath {
  "/_authenticated": typeof authenticatedRouteWithChildren;
  "/_authenticated/": typeof authenticatedIndexRoute;
  "/admin": typeof adminRoute;
  "/admin/": typeof adminIndexRoute;
  "/client": typeof clientRoute;
  "/client/": typeof clientIndexRoute;
}

export interface FileRoutesByTo {
  "/_authenticated": typeof authenticatedRouteWithChildren;
  "/_authenticated/": typeof authenticatedIndexRoute;
  "/admin": typeof adminRoute;
  "/admin/": typeof adminIndexRoute;
  "/client": typeof clientRoute;
  "/client/": typeof clientIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_authenticated": typeof authenticatedRouteWithChildren;
  "/_authenticated/": typeof authenticatedIndexRoute;
  "/admin": typeof adminRoute;
  "/admin/": typeof adminIndexRoute;
  "/client": typeof clientRoute;
  "/client/": typeof clientIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/_authenticated"
    | "/_authenticated/"
    | "/admin"
    | "/admin/"
    | "/client"
    | "/client/";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/_authenticated"
    | "/_authenticated/"
    | "/admin"
    | "/admin/"
    | "/client"
    | "/client/";
  id:
    | "__root__"
    | "/_authenticated"
    | "/_authenticated/"
    | "/admin"
    | "/admin/"
    | "/client"
    | "/client/";
  fileRoutesById: FileRoutesById;
}

// ==== Export final routeTree ====
export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();
