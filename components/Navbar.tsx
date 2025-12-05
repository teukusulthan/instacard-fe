"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { getMe, type User } from "@/services/user.services";
import { logoutRequest } from "@/services/auth.services";
import { EditProfileDialog } from "./dialogs/EditProfileDialog";

export type NavbarProps = {
  brandHref?: string;
  profileHandle?: string;
  baseDomain?: string;
  previewHref?: string;
  previewNewTab?: boolean;
  onLogout?: () => void;
  withBorder?: boolean;
  translucent?: boolean;
  rightActions?: React.ReactNode;
  showUserNameNearBrand?: boolean;
  onProfileUpdated?: (user: User) => void;
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
    } catch {
      // ignore
    }
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme, mounted]);

  return {
    theme,
    mounted,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function toPublicUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return `/${path}`;
}

export function Navbar({
  brandHref = "",
  profileHandle,
  baseDomain = "instacard.app",
  previewHref,
  previewNewTab = true,
  onLogout,
  withBorder = true,
  translucent = true,
  rightActions,
  showUserNameNearBrand = false,
  onProfileUpdated,
}: NavbarProps) {
  const router = useRouter();
  const publicUrl = profileHandle ? `${baseDomain}/${profileHandle}` : null;
  const defaultPreviewHref =
    previewHref ?? (profileHandle ? `/${profileHandle}` : "#");
  const { theme, mounted, toggle } = useSimpleTheme();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [profile, setProfile] = React.useState<{
    name: string;
    bio: string;
    avatarUrl: string;
  }>({
    name: "User",
    bio: "",
    avatarUrl: "",
  });
  const [loggingOut, setLoggingOut] = React.useState(false);

  React.useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const u: User = await getMe();
        if (!ok) return;
        const name = (u?.name?.trim() || u?.username?.trim() || "User").slice(
          0,
          80
        );
        const bio = (u?.bio ?? "") || "";
        const avatarUrl = toPublicUrl(u.avatar_url ?? u.avatar ?? "") || "";
        setProfile({ name, bio, avatarUrl });
      } catch {
        // ignore
      }
    })();
    return () => {
      ok = false;
    };
  }, []);

  const avatarSrc = toPublicUrl(profile.avatarUrl) || "";
  const title = mounted
    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
    : "Toggle theme";

  const editKey = React.useMemo(
    () => [profile.name, profile.bio, avatarSrc].join("|"),
    [profile.name, profile.bio, avatarSrc]
  );

  const handleLogout = React.useCallback(async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logoutRequest();
      toast.success("Logged out");
      onLogout?.();
      router.replace("/login");
    } catch {
      toast.error("Failed to logout");
    } finally {
      setLoggingOut(false);
    }
  }, [loggingOut, onLogout, router]);

  const handleCopyPublicUrl = React.useCallback(async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(`https://${publicUrl}`);
      toast.success("Public link copied");
    } catch {
      toast.error("Failed to copy link");
    }
  }, [publicUrl]);

  const handleToggleTheme = React.useCallback(() => {
    toggle();
    if (mounted) {
      if (theme === "dark") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    }
  }, [toggle, mounted, theme]);

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
              {showUserNameNearBrand && profile.name ? (
                <span className="ml-2 hidden sm:inline text-sm text-muted-foreground">
                  — {profile.name}
                </span>
              ) : null}
            </Link>

            <Separator
              orientation="vertical"
              className="mx-2 h-7 hidden sm:block"
            />

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              {publicUrl ? (
                <>
                  <span className="hidden md:inline">Public profile:</span>
                  <button
                    type="button"
                    onClick={handleCopyPublicUrl}
                    className="inline-flex items-center gap-1 rounded-full border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm transition hover:bg-muted"
                  >
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">
                      {publicUrl}
                    </span>
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Connect your profile to go live faster.
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {rightActions ? (
              <div className="hidden sm:block">{rightActions}</div>
            ) : null}

            {previewHref ? (
              <Link
                href={previewHref}
                target={previewNewTab ? "_blank" : "_self"}
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
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleToggleTheme}
              title={title}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-muted/60 text-xs font-medium shadow-sm transition hover:bg-muted"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={avatarSrc}
                      alt={profile.name || "User avatar"}
                    />
                    <AvatarFallback className="text-[11px]">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={avatarSrc}
                      alt={profile.name || "User avatar"}
                    />
                    <AvatarFallback className="text-[11px]">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {profile.name || "User"}
                    </p>
                    {profileHandle ? (
                      <p className="truncate text-xs text-muted-foreground">
                        @{profileHandle}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Separator className="my-1" />
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={() => setOpenEdit(true)}
                >
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit profile
                </DropdownMenuItem>
                {publicUrl ? (
                  <DropdownMenuItem
                    className="cursor-pointer text-xs"
                    onClick={handleCopyPublicUrl}
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy public link
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  className="cursor-pointer text-xs text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  {loggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <EditProfileDialog
        key={editKey}
        open={openEdit}
        onOpenChange={setOpenEdit}
        initial={{
          avatarUrl: avatarSrc,
          name: profile.name,
          bio: profile.bio,
        }}
        onSuccess={(user: User) => {
          setProfile((p) => ({
            name: user.name ?? p.name,
            bio: user.bio ?? p.bio,
            avatarUrl:
              toPublicUrl(user.avatar_url ?? user.avatar ?? "") ?? p.avatarUrl,
          }));
          toast.success("Profile updated");
          onProfileUpdated?.(user);
        }}
      />
    </header>
  );
}

export default Navbar;
