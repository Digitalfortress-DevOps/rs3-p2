import { Route as AuthenticatedIndexImport } from "./routes/_authenticated/index";
import { Route as AuthenticatedRouteImport } from "./routes/_authenticated/route";
import { Route as rootRoute } from "./routes/_root";

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedRouteRoute,
} as any);

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedRouteImport;
      parentRoute: typeof rootRoute;
    };

    "/_authenticated/": {
      id: "/_authenticated/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof AuthenticatedIndexImport;
      parentRoute: typeof AuthenticatedRouteImport;
    };
  }
}
interface AuthenticatedRouteRouteChildren {
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute;
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
};

export interface FileRoutesByFullPath {
  "": typeof AuthenticatedRouteRouteWithChildren;
  "/": typeof AuthenticatedIndexRoute;
}

export interface FileRoutesByTo {
  "": typeof AuthenticatedRouteRouteWithChildren;
  "/": typeof AuthenticatedIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_authenticated": typeof AuthenticatedRouteRouteWithChildren;
  "/_authenticated/": typeof AuthenticatedIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "" | "/";
  fileRoutesByTo: FileRoutesByTo;
  to: "/";
  id: "__root__" | "/_authenticated";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren;
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();
