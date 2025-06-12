import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/client/")({
  component: () => <div>Client Home Page</div>,
});
