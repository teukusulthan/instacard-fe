"use client";

import * as React from "react";
import { Copy, Plus } from "lucide-react";
import { FaInstagram, FaSpotify, FaTiktok, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { EditProfileDialog } from "@/components/dialogs/EditProfileDialog";
import { AddSocialDialog } from "@/components/dialogs/AddSocialDialog";
import { AddLinkDialog } from "@/components/dialogs/AddlinkDialog";

import { getMe, type User } from "@/services/user.services";
import { toPublicUrl } from "@/lib/image-url";

type SocialItem = { key: string; label: string; icon: IconType; url?: string };
type Profile = { name: string; bio: string; avatarUrl: string; handle: string };
type LinkItem = { id: string; title: string; url: string };

const ICONS: Record<string, { label: string; icon: IconType }> = {
  instagram: { label: "Instagram", icon: FaInstagram },
  spotify: { label: "Spotify", icon: FaSpotify },
  tiktok: { label: "TikTok", icon: FaTiktok },
  linkedin: { label: "LinkedIn", icon: FaLinkedin },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "U";

const toProfile = (u: User | null | undefined): Profile => ({
  name: (u?.name?.trim() || u?.username?.trim() || "User").slice(0, 80),
  bio: (u?.bio ?? "") || "",
  avatarUrl: toPublicUrl((u as any)?.avatar_url ?? (u as any)?.avatar ?? ""),
  handle: u?.username || "username",
});

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<Profile>({
    name: "Loading…",
    bio: "",
    avatarUrl: "/avatar-placeholder.jpg",
    handle: "…",
  });

  const [socials, setSocials] = React.useState<SocialItem[]>([]);
  const [links, setLinks] = React.useState<LinkItem[]>([]);

  const [openAddLink, setOpenAddLink] = React.useState(false);
  const [openAddSocial, setOpenAddSocial] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const platforms = React.useMemo(
    () => Object.entries(ICONS).map(([key, v]) => ({ key, label: v.label })),
    []
  );

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getMe();
        if (!mounted) return;

        setProfile(toProfile(user));

        setLinks((prev) =>
          prev.length
            ? prev
            : [
                {
                  id: crypto.randomUUID(),
                  title: "My Instacard",
                  url: `https://instacard.app/${user?.username ?? "me"}`,
                },
              ]
        );
        setSocials((prev) =>
          prev.length
            ? prev
            : [
                { key: "instagram", label: "Instagram", icon: FaInstagram },
                { key: "tiktok", label: "TikTok", icon: FaTiktok },
              ]
        );
      } catch (e: any) {
        if (!mounted) return;
        const status = e?.response?.status;
        if (status === 401) {
          toast.error("Not authenticated");
        } else {
          toast.error(e?.message || "Failed to load user");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const avatarSrc = React.useMemo(
    () => toPublicUrl(profile.avatarUrl) || "/avatar-placeholder.jpg",
    [profile.avatarUrl]
  );

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Links</h1>
          <div />
        </div>

        <div className="grid grid-cols-1 mt-6 lg:grid-cols-[minmax(0,1fr)_340px] gap-4">
          <section className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 md:p-8 shadow-sm">
            {loading ? (
              <EditorSkeleton />
            ) : (
              <>
                <div className="flex items-start gap-5">
                  <Avatar className="h-20 w-20 ring-1 ring-border">
                    <AvatarImage src={avatarSrc} alt={profile.name} />
                    <AvatarFallback className="text-base">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold leading-none">
                          {profile.name}
                        </h2>
                        <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">
                          {profile.bio || "Add a short bio so people know you."}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full h-8 cursor-pointer px-4"
                        onClick={() => setOpenEdit(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      {socials.map((s, idx) => (
                        <a
                          key={`${s.key}-${idx}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent hover:ring-accent transition"
                          aria-label={s.label}
                          title={s.url || s.label}
                          href={s.url || "#"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <s.icon className="h-[18px] w-[18px] opacity-90" />
                        </a>
                      ))}

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer h-10 w-10"
                        onClick={() => setOpenAddSocial(true)}
                        title="Add social"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Your Links</p>
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer h-8 px-3"
                    onClick={() => setOpenAddLink(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>

                {links.length > 0 ? (
                  <ul className="space-y-3">
                    {links.map((l) => (
                      <li
                        key={l.id}
                        className="flex items-center justify-between rounded-xl border bg-background/70 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">{l.title}</p>
                          <p className="truncate text-sm text-muted-foreground">
                            {l.url}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full cursor-pointer h-8 w-8"
                          onClick={() => {
                            navigator.clipboard.writeText(l.url);
                            toast.success("Link copied");
                          }}
                          title="Copy link URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid place-items-center text-center">
                    <div className="h-16 w-16 rounded-full border grid place-items-center text-muted-foreground">
                      *
                    </div>
                    <p className="mt-6 text-lg font-medium">
                      Show the world who you are.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add a link to get started.
                    </p>
                  </div>
                )}

                <AddLinkDialog
                  open={openAddLink}
                  onOpenChange={setOpenAddLink}
                  onSubmit={(data) => {
                    const title = String(data.get("title") || "").trim();
                    let url = String(data.get("url") || "").trim();
                    if (!title || !url) return;
                    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
                    setLinks((prev) => [
                      { id: crypto.randomUUID(), title, url },
                      ...prev,
                    ]);
                    toast.success("Link added");
                    setOpenAddLink(false);
                  }}
                />

                <AddSocialDialog
                  open={openAddSocial}
                  onOpenChange={setOpenAddSocial}
                  platforms={platforms}
                  onSubmit={(data) => {
                    const platform = String(data.get("platform") || "");
                    const url = String(data.get("socialUrl") || "").trim();
                    if (!platform || !ICONS[platform]) return;
                    const { label, icon } = ICONS[platform];
                    setSocials((prev) => [
                      { key: platform, label, icon, url },
                      ...prev,
                    ]);
                    toast.success("Social added");
                    setOpenAddSocial(false);
                  }}
                />

                <EditProfileDialog
                  open={openEdit}
                  onOpenChange={setOpenEdit}
                  initial={{
                    avatarUrl: toPublicUrl(profile.avatarUrl) || "",
                    name: profile.name,
                    bio: profile.bio,
                  }}
                  onSuccess={(user) => {
                    setProfile((p) => ({
                      ...p,
                      name: user.name ?? p.name,
                      bio: user.bio ?? p.bio,
                      avatarUrl:
                        toPublicUrl(
                          (user as any).avatar_url ?? (user as any).avatar
                        ) || p.avatarUrl,
                    }));
                    toast.success("Profile updated");
                  }}
                />
              </>
            )}
          </section>

          <aside className="hidden lg:block lg:sticky top-6 self-start">
            <PhonePreview profile={profile} socials={socials} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function EditorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-5">
        <div className="h-20 w-20 rounded-full bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-56 rounded bg-muted" />
          <div className="h-4 w-full max-w-[480px] rounded bg-muted" />
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-10 w-10 rounded-full bg-muted" />
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="h-8 w-40 rounded-full bg-muted" />
      <div className="mt-4 space-y-3">
        <div className="h-14 rounded-xl bg-muted" />
        <div className="h-14 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

function PhonePreview({
  profile,
  socials,
}: {
  profile: Profile;
  socials: SocialItem[];
}) {
  const phoneAvatar =
    toPublicUrl(profile.avatarUrl) || "/avatar-placeholder.jpg";
  return (
    <div className="relative mx-auto h-[520px] w-[320px] rounded-[28px] bg-black text-white shadow-xl ring-1 ring-zinc-800">
      <div className="flex h-full flex-col items-center px-5 py-7">
        <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-zinc-700 bg-zinc-800 grid place-items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={phoneAvatar} alt={profile.name} />
            <AvatarFallback className="text-xs">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <h3 className="mt-4 text-base font-semibold">{profile.name}</h3>
        <div className="mt-1 text-center text-[10px] leading-relaxed text-zinc-300 px-2">
          <p>
            {profile.bio ? profile.bio.slice(0, 38) : "The quick brown fox"}
          </p>
          <p>jumps over the lazy dog.</p>
        </div>

        <div className="mt-4 flex items-center gap-4 text-zinc-200">
          {socials.map((s, idx) => (
            <s.icon key={`${s.key}-${idx}`} className="h-4 w-4 opacity-90" />
          ))}
        </div>
      </div>
    </div>
  );
}
