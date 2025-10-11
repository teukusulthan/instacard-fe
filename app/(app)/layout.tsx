"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileHandle = "teukusulthan";
  const userName = "Teuku Sulthan";
  const avatarUrl = "/avatar-placeholder.jpg";

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Navbar
        brand="Instacard"
        brandHref="/dashboard"
        profileHandle={profileHandle}
        userName={userName}
        avatarUrl={avatarUrl}
        rightActions={
          <Button
            variant="outline"
            className="cursor-pointer rounded-full h-8 px-4"
          >
            Design
          </Button>
        }
      />

      <main>{children}</main>

      <Toaster richColors />
    </div>
  );
}
