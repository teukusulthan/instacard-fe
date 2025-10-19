"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getMe, type User } from "@/services/user.services";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getMe();
        if (!mounted) return;
        setUser(u);
      } catch {
        setUser(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const profileHandle = user?.username ?? "";
  const userName = user?.name || user?.username || "User";
  const avatarUrlRaw = (user as any)?.avatar_url ?? (user as any)?.avatar ?? "";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <Navbar
        brand="Instacard"
        brandHref="/dashboard"
        profileHandle={profileHandle}
        userName={userName}
        avatarUrl={avatarUrlRaw}
        rightActions={
          <Button
            variant="outline"
            className="h-8 rounded-full px-4 cursor-pointer"
          >
            Design
          </Button>
        }
      />
      <main id="main-content" className="flex-1 md:px-10">
        <div>{children}</div>
      </main>
    </div>
  );
}
