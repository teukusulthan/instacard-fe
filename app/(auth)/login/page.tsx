"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

/* shadcn/ui */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { LoginSchema, LoginValues } from "@/shemas/auth.schema";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordValue = React.useRef("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Welcome back 👋");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left: Hero Image */}
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1628431668031-6e3db588c9e3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Workspace illustration"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background/60" />
      </div>

      {/* Right: Form area */}
      <div className="flex flex-col h-full p-6 md:p-10">
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-2">
              <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Continue to your board and manage your links with ease.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              passwordValue.current = e.target.value;
                            }}
                          />
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      {passwordValue.current && <FormMessage />}
                    </FormItem>
                  )}
                />

                {/* Forgot password link */}
                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <Separator />

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>

        <div className="mt-8 text-xs text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Instacard App</p>
        </div>
      </div>
    </div>
  );
}
