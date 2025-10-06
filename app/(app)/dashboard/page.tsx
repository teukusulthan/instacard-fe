"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Copy } from "lucide-react";
import { FaInstagram, FaSpotify, FaTiktok, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUserId } from "@/stores/auth.slice";
import { fetchMe, selectMe, selectUserStatus } from "@/stores/user.slice";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLinkRequest } from "@/services/link.services";

/* ===== Types ===== */
export type SocialItem = {
  key: string;
  label: string;
  icon: IconType;
  url?: string;
};
export type Profile = {
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

/* Icon map */
const ICONS: Record<string, { label: string; icon: IconType }> = {
  instagram: { label: "Instagram", icon: FaInstagram },
  spotify: { label: "Spotify", icon: FaSpotify },
  tiktok: { label: "TikTok", icon: FaTiktok },
  linkedin: { label: "LinkedIn", icon: FaLinkedin },
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const me = useAppSelector(selectMe);
  const userStatus = useAppSelector(selectUserStatus);

  React.useEffect(() => {
    if (userId && (userStatus === "idle" || userStatus === "error")) {
      dispatch(fetchMe());
    }
  }, [dispatch, userId, userStatus]);

  const profile: Profile = React.useMemo(
    () => ({
      name: me?.name ?? "—",
      bio: me?.bio ?? "",
      avatarUrl: me?.avatar ?? "/avatar-placeholder.jpg",
      handle: me?.username ?? "",
    }),
    [me]
  );

  const [socials, setSocials] = React.useState<SocialItem[]>([
    { key: "instagram", label: "Instagram", icon: FaInstagram },
    { key: "spotify", label: "Spotify", icon: FaSpotify },
    { key: "tiktok", label: "TikTok", icon: FaTiktok },
    { key: "linkedin", label: "LinkedIn", icon: FaLinkedin },
  ]);

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <TopBar handle={profile.handle} />
        <Separator className="my-5" />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-6">
          <div className="max-w-3xl">
            <EditorPanel
              profile={profile}
              socials={socials}
              onAddSocial={(s) => setSocials((prev) => [s, ...prev])}
            />
          </div>
          <div className="hidden lg:block lg:sticky top-6 self-start">
            <PhonePreview profile={profile} socials={socials} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===== Top Bar ===== */
function TopBar({ handle }: { handle: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-semibold tracking-tight">Links</h1>
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
          <span className="truncate max-w-[240px]">instacard.app/{handle}</span>
          <Copy className="h-3.5 w-3.5 opacity-70" />
        </div>
        <Button variant="outline" className="rounded-full h-8 px-4">
          Design
        </Button>
      </div>
    </div>
  );
}

/* ===== Editor Panel ===== */
function EditorPanel({
  profile,
  socials,
  onAddSocial,
}: {
  profile: Profile;
  socials: SocialItem[];
  onAddSocial: (s: SocialItem) => void;
}) {
  const [links, setLinks] = React.useState<LinkItem[]>([]);
  const [openAddLink, setOpenAddLink] = React.useState(false);
  const [openAddSocial, setOpenAddSocial] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  async function handleAddLink(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    let url = String(formData.get("url") || "").trim();
    if (!title || !url) return;

    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    try {
      setSaving(true);
      const res = await createLinkRequest({ title, url });
      const created = res.data;
      setLinks((prev) => [
        { id: created.id, title: created.title, url: created.url },
        ...prev,
      ]);
      setOpenAddLink(false);
      toast.success("Link created");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create link");
    } finally {
      setSaving(false);
    }
  }

  function handleAddSocial(formData: FormData) {
    const platform = String(formData.get("platform") || "");
    const url = String(formData.get("socialUrl") || "").trim();
    if (!platform || !ICONS[platform]) return;
    const { label, icon } = ICONS[platform];
    onAddSocial({ key: platform, label, icon, url });
    setOpenAddSocial(false);
  }

  return (
    <section className="rounded-3xl border bg-card/60 backdrop-blur-sm p-7 md:p-8 shadow-sm">
      <div className="flex items-start gap-5">
        <Avatar className="h-20 w-20 ring-1 ring-border">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback className="text-base">TS</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-xl font-semibold leading-none">{profile.name}</h2>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>

          <div className="mt-4 flex items-center gap-3">
            {socials.map((s, idx) => (
              <button
                key={`${s.key}-${idx}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent hover:ring-accent transition"
                aria-label={s.label}
                title={s.url || s.label}
              >
                <s.icon className="h-[18px] w-[18px] opacity-90" />
              </button>
            ))}

            {/* Add Social Dialog */}
            <Dialog open={openAddSocial} onOpenChange={setOpenAddSocial}>
              <DialogTrigger asChild>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent transition"
                  aria-label="Add social"
                >
                  <Plus className="h-[18px] w-[18px]" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add social</DialogTitle>
                  <DialogDescription>
                    Pilih platform dan masukkan URL profil kamu.
                  </DialogDescription>
                </DialogHeader>

                <form action={handleAddSocial} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select name="platform">
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ICONS).map(([key, v]) => (
                          <SelectItem key={key} value={key}>
                            {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="socialUrl">URL</Label>
                    <Input
                      id="socialUrl"
                      name="socialUrl"
                      type="url"
                      placeholder="https://instagram.com/username"
                      required
                    />
                  </div>

                  <DialogFooter className="mt-2">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Add Link Dialog */}
      <Dialog open={openAddLink} onOpenChange={setOpenAddLink}>
        <DialogTrigger asChild>
          <Button
            className="mt-7 h-12 w-full rounded-2xl text-base font-medium shadow-sm border-0"
            style={{
              background:
                "linear-gradient(90deg,#7C3AED 0%,#8B5CF6 50%,#7C3AED 100%)",
            }}
          >
            <Plus className="mr-2 h-5 w-5" /> Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a new link</DialogTitle>
            <DialogDescription>
              Enter the title and URL for your Instacard link.
            </DialogDescription>
          </DialogHeader>

          <form action={handleAddLink} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Portfolio, YouTube, Store..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                required
              />
            </div>

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={saving}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Separator className="my-8" />

      {/* Link List */}
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
    </section>
  );
}

/* ===== Phone Preview ===== */
function PhonePreview({
  profile,
  socials,
}: {
  profile: Profile;
  socials: SocialItem[];
}) {
  return (
    <div className="relative mx-auto h-[520px] w-[320px] rounded-[28px] bg-black text-white shadow-xl ring-1 ring-zinc-800">
      <div className="flex h-full flex-col items-center px-5 py-8">
        <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-zinc-700 bg-zinc-800">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={64}
            height={64}
          />
        </div>

        <h3 className="mt-4 text-base font-semibold">{profile.name}</h3>
        <div className="mt-1 text-center text-[10px] leading-relaxed text-zinc-300">
          <p>The quick brown fox</p>
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
