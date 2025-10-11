"use client";

import * as React from "react";
import { Copy, Plus } from "lucide-react";
import { FaInstagram, FaSpotify, FaTiktok, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { EditProfileDialog } from "@/components/dialogs/EditProfileDialog";
import { AddSocialDialog } from "@/components/dialogs/AddSocialDialog";
import { AddLinkDialog } from "@/components/dialogs/AddlinkDialog";

type SocialItem = {
  key: string;
  label: string;
  icon: IconType;
  url?: string;
};
type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
  handle: string;
};
type LinkItem = {
  id: string;
  title: string;
  url: string;
};

const ICONS: Record<string, { label: string; icon: IconType }> = {
  instagram: { label: "Instagram", icon: FaInstagram },
  spotify: { label: "Spotify", icon: FaSpotify },
  tiktok: { label: "TikTok", icon: FaTiktok },
  linkedin: { label: "LinkedIn", icon: FaLinkedin },
};

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U"
  );
}

export default function DashboardPage() {
  const [profile, setProfile] = React.useState<Profile>({
    name: "Teuku Sulthan",
    bio: "Building Instacard — link in bio that actually converts.",
    avatarUrl: "/avatar-placeholder.jpg",
    handle: "teukusulthan",
  });

  const [socials, setSocials] = React.useState<SocialItem[]>([
    {
      key: "instagram",
      label: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/teuku",
    },
    {
      key: "spotify",
      label: "Spotify",
      icon: FaSpotify,
      url: "https://open.spotify.com/user/teuku",
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: FaTiktok,
      url: "https://tiktok.com/@teuku",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com/in/teuku",
    },
  ]);

  const [links, setLinks] = React.useState<LinkItem[]>([
    {
      id: crypto.randomUUID(),
      title: "My Portfolio",
      url: "https://instacard.app/teuku",
    },
  ]);

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-16 py-6">
        <TopBar handle={profile.handle} />
        <Separator className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-2 lg:gap-2">
          <div className="max-w-3xl">
            <EditorPanel
              profile={profile}
              onUpdateProfile={setProfile}
              socials={socials}
              onAddSocial={(s) => setSocials((prev) => [s, ...prev])}
              links={links}
              onAddLink={(l) => setLinks((prev) => [l, ...prev])}
            />
          </div>
          <div className="hidden lg:block lg:sticky top-6 self-start lg:-ml-4">
            <PhonePreview profile={profile} socials={socials} />
          </div>
        </div>
      </div>
    </main>
  );
}

function TopBar({ handle }: { handle: string }) {
  const url = `instacard.app/${handle || ""}`;
  return (
    <div className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-semibold tracking-tight">Links</h1>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success("URL copied");
          }}
          className="hidden md:flex cursor-pointer items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
          title="Copy profile URL"
        >
          <span className="truncate max-w-[240px]">{url}</span>
          <Copy className="h-3.5 w-3.5 opacity-70" />
        </button>
        <Button
          variant="outline"
          className="cursor-pointer rounded-full h-8 px-4"
        >
          Design
        </Button>
      </div>
    </div>
  );
}

function EditorPanel({
  profile,
  onUpdateProfile,
  socials,
  onAddSocial,
  links,
  onAddLink,
}: {
  profile: Profile;
  onUpdateProfile: (next: Profile) => void;
  socials: SocialItem[];
  onAddSocial: (s: SocialItem) => void;
  links: LinkItem[];
  onAddLink: (l: LinkItem) => void;
}) {
  const [openAddLink, setOpenAddLink] = React.useState(false);
  const [openAddSocial, setOpenAddSocial] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const platforms = React.useMemo(
    () => Object.entries(ICONS).map(([key, v]) => ({ key, label: v.label })),
    []
  );

  return (
    <section className="rounded-3xl border bg-card/60 backdrop-blur-sm p-7 md:p-8 shadow-sm">
      <div className="flex items-start gap-5">
        <Avatar className="h-20 w-20 ring-1 ring-border">
          <AvatarImage
            src={profile.avatarUrl || "/avatar-placeholder.jpg"}
            alt={profile.name}
          />
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
                {profile.bio}
              </p>
            </div>
            <Button
              variant="outline"
              className="cursor-pointer rounded-full h-8 px-4"
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
              className="cursor-pointer rounded-full h-10 w-10"
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
          className="cursor-pointer rounded-full h-8 px-3"
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
                className="cursor-pointer rounded-full h-8 w-8"
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
          onAddLink({ id: crypto.randomUUID(), title, url });
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
          onAddSocial({ key: platform, label, icon, url });
          toast.success("Social added");
          setOpenAddSocial(false);
        }}
      />

      <EditProfileDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        initial={{
          avatarUrl: profile.avatarUrl,
          name: profile.name,
          bio: profile.bio,
        }}
        onSubmit={(data) => {
          const file = data.get("avatar") as File | null;
          const avatarUrl = String(data.get("avatarUrl") || "").trim();
          const name = String(data.get("name") || "").trim();
          const bio = String(data.get("bio") || "").trim();

          let nextAvatar = profile.avatarUrl;
          if (file && file.size > 0) nextAvatar = URL.createObjectURL(file);
          else if (avatarUrl) nextAvatar = avatarUrl;

          onUpdateProfile({
            ...profile,
            avatarUrl: nextAvatar || "/avatar-placeholder.jpg",
            name: name || profile.name,
            bio,
          });

          toast.success("Profile updated (UI only)");
          setOpenEdit(false);
        }}
      />
    </section>
  );
}

function PhonePreview({
  profile,
  socials,
}: {
  profile: Profile;
  socials: SocialItem[];
}) {
  return (
    <div className="relative mx-auto h-[520px] w-[320px] rounded-[28px] bg-black text-white shadow-xl ring-1 ring-zinc-800">
      <div className="flex h-full flex-col items-center px-5 py-7">
        <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-zinc-700 bg-zinc-800 grid place-items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={profile.avatarUrl || "/avatar-placeholder.jpg"}
              alt={profile.name}
            />
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
