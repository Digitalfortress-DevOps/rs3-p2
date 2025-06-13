import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState, type HTMLAttributes } from "react";
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

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

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
export default function FormLogin({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="">
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
              onSubmit={form.handleSubmit(onSubmit)}
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
                        className="h-12 border-none bg-input-login text-card text-sm placeholder:text-placeholder"
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
                className="mt-3 h-11 w-full cursor-pointer bg-btn-login px-3 py-[10px] font-medium text-base text-foreground hover:border hover:border-btn-login hover:text-btn-login"
                disabled={isLoading}
              >
                SIGN IN
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
