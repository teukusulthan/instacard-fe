"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Eye, LogOut, Moon, Sun, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toPublicUrl } from "@/lib/image-url";

export type NavbarProps = {
  brand?: string;
  brandHref?: string;
  profileHandle?: string;
  userName?: string;
  avatarUrl?: string;
  baseDomain?: string;
  previewHref?: string;
  previewNewTab?: boolean;
  onEditProfile?: () => void;
  onLogout?: () => void;
  withBorder?: boolean;
  translucent?: boolean;
  rightActions?: React.ReactNode;
  showUserNameNearBrand?: boolean;
};

function getInitials(name?: string) {
  if (!name) return "U";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U"
  );
}

function useSimpleTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    let initial: "light" | "dark" = "light";
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") initial = stored;
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        initial = "dark";
    } catch {}
    setTheme(initial);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return {
    theme,
    mounted,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

export function Navbar({
  brand = "Instacard",
  brandHref = "",
  profileHandle,
  userName,
  avatarUrl,
  baseDomain = "instacard.app",
  previewHref,
  previewNewTab = true,
  onEditProfile,
  onLogout,
  withBorder = true,
  translucent = true,
  rightActions,
  showUserNameNearBrand = false,
}: NavbarProps) {
  const publicUrl = profileHandle ? `${baseDomain}/${profileHandle}` : null;
  const defaultPreviewHref =
    previewHref ?? (profileHandle ? `/${profileHandle}` : "#");
  const { theme, mounted, toggle } = useSimpleTheme();
  const avatarSrc = toPublicUrl(avatarUrl) || "";
  const title = mounted
    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
    : "Toggle theme";

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-all",
        translucent
          ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background",
        withBorder ? "border-b" : "",
        "shadow-sm",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-26">
        <div className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <Link href={brandHref} className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                Insta<span className="text-primary">Card</span>
              </span>
              {showUserNameNearBrand && userName ? (
                <span className="ml-2 hidden sm:inline text-sm text-muted-foreground">
                  — {userName}
                </span>
              ) : null}
            </Link>

            <Separator
              orientation="vertical"
              className="mx-2 h-7 hidden sm:block"
            />

            <Link
              href={defaultPreviewHref}
              target={previewNewTab ? "_blank" : undefined}
              className="inline-flex"
            >
              <Button
                variant="outline"
                className="cursor-pointer rounded-full h-9 px-4 text-sm"
                title="See preview"
              >
                <Eye className="mr-2 h-4 w-4" />
                See preview
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {rightActions ? (
              <div className="hidden sm:block">{rightActions}</div>
            ) : null}

            {publicUrl && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(publicUrl);
                  toast.success("Profile URL copied");
                }}
                className="hidden md:inline-flex cursor-pointer items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 text-[13px] text-muted-foreground shadow-sm"
                title="Copy profile URL"
              >
                <span className="truncate max-w-[200px]">{publicUrl}</span>
                <Copy className="h-3.5 w-3.5 opacity-70" />
              </button>
            )}

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full cursor-pointer"
              onClick={toggle}
              title={title}
              aria-label={title}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : null}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="outline-none rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9 ring-1 cursor-pointer ring-border">
                    <AvatarImage src={avatarSrc} alt={userName || "User"} />
                    <AvatarFallback className="text-[11px] font-medium">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => onEditProfile?.()}>
                  <Pencil /> Edit profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onLogout?.()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
