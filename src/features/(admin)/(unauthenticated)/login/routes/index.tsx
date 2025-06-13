import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "..";

export const Route = createFileRoute("/(admin)/login" as never)({
  component: AdminLogin,
});
