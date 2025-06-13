import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import type { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "./password-input";
import logoLogin from "@/assets/images/logo-login.png";
import { cn } from "@/lib/utils";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement> & {
  onLogin: (values: { email: string; password: string }) => void;
  isLoading?: boolean;
  errorMessage?: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});
export default function FormLogin({
  className,
  onLogin,
  isLoading,
  errorMessage,
  ...props
}: UserAuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-5">
          <img src={logoLogin} alt="logo-login" />
          <h3 className="bg-gradient-to-b from-secondary to-secondary-foreground bg-clip-text font-semibold text-[32px] text-transparent">
            Sign In
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onLogin)}
              className={cn("grid gap-3", className)}
              {...props}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-base text-card">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="input-login-autofill h-12 border-none bg-input-login text-card text-sm placeholder:text-placeholder"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col gap-2">
                    <FormLabel className="text-base text-card">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        className="input-login-autofill h-12 border-none bg-input-login text-card text-sm caret-card placeholder:text-placeholder"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-base text-placeholder">
                    Remember me
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="text-btn-login hover:opacity-75"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                variant="primary"
                className="mt-3 h-11 w-full cursor-pointer px-3 py-[10px] font-medium text-base"
                disabled={isLoading}
              >
                SIGN IN
              </Button>
              {errorMessage && (
                <div className="mt-2 text-red-600 text-sm">{errorMessage}</div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
