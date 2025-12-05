// app/(app)/layout.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "./dashboard-shell";
import { useAppSelector } from "@/stores/hooks";
import { selectUser, selectAuthStatus } from "@/stores/auth.slice";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectAuthStatus);

  React.useEffect(() => {
    if (status === "loading") return;

    if (!user?.id) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [user, status, router]);

  // Bisa kasih loader di sini kalau mau
  if (!user?.id) {
    return null;
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
