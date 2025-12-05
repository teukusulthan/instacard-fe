"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Spinner } from "@/components/ui/spinner";

import { getMe } from "@/services/user.services";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await getMe();
        if (!cancelled) setChecking(false);
      } catch {
        if (!cancelled) {
          setChecking(false);
          router.replace("/login?redirect=/dashboard");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <>
      <Navbar brandHref="/dashboard" showUserNameNearBrand />

      <main className="flex pt-10 w-full h-150 justify-center items-center">
        {checking ? <Spinner className="size-8 text-neutral-400" /> : children}
      </main>
    </>
  );
}
