import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routerTree.gen";
import "./styles/index.css";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <HelmetProvider>
    <Helmet>
      <title>RS3</title>
      <meta name="description" content="RS3" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </HelmetProvider>
);

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<StrictMode>{app}</StrictMode>);
}
