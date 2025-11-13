"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getPublicProfile, type PublicProfile } from "@/services/user.services";
import {
  getActiveSocials,
  type SocialLink,
  type SocialPlatform,
} from "@/services/social.services";
import { toPublicUrl } from "@/lib/image-url";
import { QrForCurrentPage } from "@/components/QrForCurrentPage";

/* ---------- utils ---------- */
const platformIcon: Record<SocialPlatform, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  github: FaGithub,
};

function initials(name?: string | null) {
  if (!name) return "U";
  const p = name.trim().split(/\s+/).slice(0, 2);
  return p.map((s) => s[0]?.toUpperCase() ?? "").join("") || "U";
}

function normalizeUrl(u: string) {
  try {
    return new URL(u).toString();
  } catch {
    return u.startsWith("http") ? u : `https://${u}`;
  }
}

function domain(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u.replace(/^https?:\/\//, "");
  }
}

/* ---------- theming ---------- */
function Theming({
  theme,
  children,
}: {
  theme?: string | null;
  children: React.ReactNode;
}) {
  const isDark = theme ? theme === "dark" : true;
  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-zinc-950 text-zinc-50"
          : "min-h-screen bg-white text-zinc-900"
      }
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.6]"
        style={{
          background:
            "radial-gradient(40% 30% at 50% 0%, rgba(120,119,198,0.18) 0%, rgba(120,119,198,0) 60%), radial-gradient(40% 40% at 80% 20%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0) 0%)",
        }}
      />
      {children}
    </div>
  );
}

/* ---------- skeletons ---------- */
function HeaderSkeleton() {
  return (
    <header className="px-6 pt-16 pb-8">
      <div className="mx-auto max-w-2xl text-center animate-pulse">
        <div className="mx-auto h-20 w-20 rounded-full bg-white/10 ring-2 ring-white/10" />
        <div className="mx-auto mt-4 h-5 w-40 rounded bg-white/10" />
        <div className="mx-auto mt-2 h-3 w-28 rounded bg-white/10" />
        <div className="mx-auto mt-3 h-10 w-72 rounded bg-white/10" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-white/10" />
          ))}
        </div>
      </div>
    </header>
  );
}

function LinksSkeleton() {
  return (
    <main className="px-6 pb-16">
      <ul className="mx-auto grid max-w-lg gap-3 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <div className="mx-2 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
              <div className="h-4 w-40 rounded bg-white/10" />
              <div className="mt-2 h-3 w-28 rounded bg-white/10" />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center opacity-60">
        <div className="mx-auto h-px max-w-lg bg-white/10" />
        <div className="mx-auto mt-4 h-4 w-52 rounded bg-white/10" />
      </div>
    </main>
  );
}

/* ---------- portal helper (prevents hydration mismatch) ---------- */
function ClientOnlyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // SSR output === first client render -> no mismatch
  return createPortal(children as React.ReactNode, document.body);
}

/* ---------- page ---------- */
export default function PublicProfilePage() {
  const router = useRouter();
  const params = useParams();
  const raw =
    typeof (params as any)?.username === "string"
      ? (params as any).username
      : Array.isArray((params as any)?.username)
      ? (params as any).username[0]
      : "";
  const username = decodeURIComponent(raw ?? "");

  const [data, setData] = React.useState<PublicProfile | null | "loading">(
    "loading"
  );
  const [socials, setSocials] = React.useState<SocialLink[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ok = true;
    setData("loading");
    setError(null);
    Promise.all([
      getPublicProfile(username),
      getActiveSocials({ sort: "order", order: "asc" }),
    ])
      .then(([profile, actives]) => {
        if (!ok) return;
        setData(profile ?? null);
        const list = Array.isArray(actives?.data) ? actives.data : [];
        setSocials(
          list
            .filter((s) => s && s.url && s.is_active)
            .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
        );
      })
      .catch((e: any) => {
        if (!ok) return;
        setError(e?.message || "Failed to load profile");
        setData(null);
        setSocials([]);
      });
    return () => {
      ok = false;
    };
  }, [username]);

  const themeForRender =
    data !== "loading" && data ? (data as any).theme : undefined;

  if (data === "loading") {
    return (
      <Theming theme={themeForRender}>
        <HeaderSkeleton />
        <LinksSkeleton />
        <ClientOnlyPortal>
          <div
            className="fixed right-6 z-50 hidden lg:block"
            style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          >
            <div className="h-[200px] w-[200px] animate-pulse rounded-lg bg-white/5 ring-1 ring-white/10" />
          </div>
        </ClientOnlyPortal>
      </Theming>
    );
  }

  if (data === null || error) {
    return (
      <Theming theme={themeForRender}>
        <div className="min-h-screen grid place-items-center px-6">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold">
              {error ? "Gagal memuat profil" : "Profil tidak ditemukan"}
            </h2>
            {error ? (
              <p className="mt-2 text-sm text-zinc-500">{error}</p>
            ) : null}
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={() => router.refresh()}>Coba lagi</Button>
              <Button variant="secondary" onClick={() => router.push("/")}>
                Beranda
              </Button>
            </div>
          </div>
        </div>
      </Theming>
    );
  }

  const avatarSrc =
    toPublicUrl((data as any).avatar_url ?? (data as any).avatar ?? "") ||
    "/avatar-placeholder.jpg";

  const links = (data.links ?? [])
    .filter((l) => l.is_active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <Theming theme={data.theme}>
      <header className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <Avatar className="h-20 w-20 mx-auto ring-2 ring-zinc-800 bg-zinc-800">
            <AvatarImage
              className="object-cover w-full h-full"
              src={avatarSrc}
              alt={data.name ?? data.username}
            />
            <AvatarFallback className="text-sm">
              {initials(data.name)}
            </AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-xl font-semibold leading-none">
            {data.name ?? data.username}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">@{data.username}</p>
          {data.bio ? (
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">
              {data.bio}
            </p>
          ) : null}
          {socials.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-zinc-200">
              {socials.map((s) => {
                const Icon = platformIcon[s.platform];
                const href = normalizeUrl(s.url);
                return (
                  <Link
                    key={s.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="inline-grid h-8 w-8 place-items-center rounded-full bg-neutral-950 ring-1 ring-white/10 hover:bg-neutral-900"
                  >
                    <Icon className="h-4 w-4 opacity-90" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className="px-6 pb-16">
        <ul className="mx-auto grid max-w-lg gap-3">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={normalizeUrl(l.url)}
                target="_blank"
                rel="noopener noreferrer"
                title={l.url}
                className="block mx-2 rounded-2xl bg-neutral-950 px-5 py-4 ring-1 ring-white/10 transition hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{ minHeight: 52 }}
              >
                <p className="truncate text-base font-medium text-white leading-none">
                  {l.title}
                </p>
                <p className="mt-1 truncate text-[12px] leading-normal text-zinc-300">
                  {domain(l.url)}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <div className="mx-auto h-px max-w-lg bg-white/10" />
          <p className="mt-4 text-sm pt-10 text-zinc-500">
            Powered by{" "}
            <span className="text-secondary">
              Insta<span className="text-primary">Card</span>
            </span>
          </p>
        </div>
      </main>

      <ClientOnlyPortal>
        <div
          className="fixed right-6 z-50 hidden lg:block"
          style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <QrForCurrentPage
            size={200}
            className="shadow-xl ring-1 ring-white/10"
          />
        </div>
      </ClientOnlyPortal>
    </Theming>
  );
}
