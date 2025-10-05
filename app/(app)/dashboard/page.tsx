"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Copy } from "lucide-react";
import { FaInstagram, FaSpotify, FaTiktok, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
  handle: string;
  socials: { key: string; label: string; icon: IconType }[];
};

export default function DashboardPage() {
  const profile: Profile = {
    name: "Teuku Sulthan",
    bio: "The quick brown fox jumps over the lazy dog.",
    avatarUrl: "/avatar-placeholder.jpg",
    handle: "teukusulthan",
    socials: [
      { key: "instagram", label: "Instagram", icon: FaInstagram },
      { key: "spotify", label: "Spotify", icon: FaSpotify },
      { key: "tiktok", label: "TikTok", icon: FaTiktok },
      { key: "linkedin", label: "LinkedIn", icon: FaLinkedin },
    ],
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <TopBar handle={profile.handle} />
        <Separator className="my-5" />

        {/* GAP DIPERKECIL & PREVIEW SEDIKIT LEBIH LEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-6">
          <div className="max-w-3xl">
            <EditorPanel profile={profile} />
          </div>
          <div className="hidden lg:block lg:sticky top-6 self-start">
            <PhonePreview profile={profile} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* Top bar */
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
        <Button variant="outline" className="rounded-full h-8 px-4">
          Enhance
        </Button>
        <Button variant="outline" className="rounded-full h-8 px-4">
          More
        </Button>
      </div>
    </div>
  );
}

/* Editor (left) */
function EditorPanel({ profile }: { profile: Profile }) {
  return (
    <section className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 md:p-7 shadow-sm">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 ring-1 ring-border">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback className="text-sm">TS</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-lg font-semibold leading-none">{profile.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>

          <div className="mt-3 flex items-center gap-2.5">
            {profile.socials.map((s) => (
              <button
                key={s.key}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent hover:ring-accent transition"
                aria-label={s.label}
              >
                <s.icon className="h-4 w-4 opacity-90" />
              </button>
            ))}

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent transition"
              aria-label="Add social"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-2xl text-base font-medium shadow-sm border-0"
        style={{
          background:
            "linear-gradient(90deg,#7C3AED 0%,#8B5CF6 50%,#7C3AED 100%)",
        }}
      >
        <Plus className="mr-2 h-5 w-5" /> Add
      </Button>

      <Separator className="my-8" />

      <div className="grid place-items-center text-center">
        <div className="h-16 w-16 rounded-full border grid place-items-center text-muted-foreground">
          *
        </div>
        <p className="mt-6 text-lg font-medium">Show the world who you are.</p>
        <p className="text-sm text-muted-foreground">
          Add a link to get started.
        </p>
      </div>
    </section>
  );
}

/* Phone preview (right) */
function PhonePreview({ profile }: { profile: Profile }) {
  return (
    <div className="relative mx-auto h-[520px] w-[320px] rounded-[28px] bg-black text-white shadow-xl ring-1 ring-zinc-800">
      {/* Bintang di kiri-atas DIHILANGKAN */}

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
          {profile.socials.map((s) => (
            <s.icon key={s.key} className="h-4 w-4 opacity-90" />
          ))}
        </div>

        <Button className="mt-10 rounded-full bg-white px-5 text-black text-xs hover:bg-zinc-100">
          Join {profile.handle} on Instacard
        </Button>
      </div>
    </div>
  );
}
