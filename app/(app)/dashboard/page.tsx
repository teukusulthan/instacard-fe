"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  LinkIcon,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Heart,
  Sun,
  Moon,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "github"
  | "x";

const socialLabel: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  github: "GitHub",
  x: "X (Twitter)",
};

const navLinks: { id: string; label: string; url: string }[] = [
  { id: "l1", label: "Features", url: "#features" },
  { id: "l2", label: "How it works", url: "#how-it-works" },
  { id: "l3", label: "Templates", url: "#templates" },
];

const heroTabs = [
  { id: "creators", label: "Creators" },
  { id: "businesses", label: "Small teams" },
  { id: "studios", label: "Studios & agencies" },
];

const primaryLinks = [
  { id: "l1", title: "Portfolio & services", url: "#" },
  { id: "l2", title: "Notion or blog", url: "#" },
  { id: "l3", title: "Product or store", url: "#" },
];

const secondaryLinks = [
  { id: "l1", title: "Newsletter", url: "#" },
  { id: "l2", title: "YouTube playlist", url: "#" },
  { id: "l3", title: "Pricing & Plans", url: "#" },
];

const platformIcon: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  github: FaGithub,
  x: FaXTwitter,
};

type DummyLink = {
  id: string;
  title: string;
  url: string;
  clicks?: number;
};

type DummySocial = {
  id: string;
  platform: SocialPlatform;
  username: string;
  url: string;
};

const dummyHeroLinks: DummyLink[] = [
  {
    id: "l1",
    title: "Client-ready portfolio",
    url: "#",
    clicks: 1240,
  },
  {
    id: "l2",
    title: "Template store",
    url: "#",
    clicks: 987,
  },
  {
    id: "l3",
    title: "Book a discovery call",
    url: "#",
    clicks: 412,
  },
];

const dummySocials: DummySocial[] = [
  {
    id: "s1",
    platform: "instagram",
    username: "instacard.app",
    url: "#",
  },
  {
    id: "s2",
    platform: "linkedin",
    username: "instacard",
    url: "#",
  },
  {
    id: "s3",
    platform: "x",
    username: "instacard",
    url: "#",
  },
];

const DUMMY_PROFILE = {
  name: "Instacard",
  handle: "instacard.app",
  bio: "Turn your link in bio into a mini landing page that actually converts.",
};

const DUMMY_LINKS: DummyLink[] = [
  {
    id: "1",
    title: "Portfolio & case studies",
    url: "https://instacard.app/portfolio",
    clicks: 1780,
  },
  {
    id: "2",
    title: "Template store",
    url: "https://instacard.app/templates",
    clicks: 963,
  },
  {
    id: "3",
    title: "Book a call",
    url: "https://cal.com/instacard/demo",
    clicks: 421,
  },
];

const DUMMY_SOCIALS: {
  id: string;
  platform: SocialPlatform;
  username: string;
  url: string;
  is_active: boolean;
}[] = [
  {
    id: "1",
    platform: "instagram",
    username: "instacard.app",
    url: "#",
    is_active: true,
  },
  { id: "2", platform: "x", username: "instacard", url: "#", is_active: true },
  {
    id: "3",
    platform: "linkedin",
    username: "instacard",
    url: "#",
    is_active: true,
  },
  {
    id: "4",
    platform: "youtube",
    username: "instacard",
    url: "#",
    is_active: false,
  },
];

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

function useThemeToggle() {
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
    toggle: () =>
      setTheme((prev) => (prev === "dark" ? "light" : ("dark" as const))),
  };
}

function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative mx-auto h-[540px] w-[280px] rounded-[36px] border bg-gradient-to-b from-background/80 to-background shadow-xl",
        "before:absolute before:inset-x-10 before:top-2 before:h-5 before:rounded-full before:bg-muted/80",
        "after:absolute after:inset-x-4 after:bottom-2 after:h-1.5 after:rounded-full after:bg-muted/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute inset-[14px] rounded-[32px] border bg-background/90 p-4">
        {children}
      </div>
    </div>
  );
}

function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground shadow-sm">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="h-3 w-3 text-primary" />
      </span>
      <span>Built for creators, small brands & studios</span>
    </div>
  );
}

function QrBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
        <QrCode className="h-3.5 w-3.5 text-primary" />
      </span>
      <span>Scan or tap — one link for everything</span>
    </div>
  );
}

function SocialPills({ socials }: { socials: DummySocial[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socials.map((item) => {
        const Icon = platformIcon[item.platform];
        return (
          <button
            key={item.id}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border bg-muted/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm transition hover:bg-muted"
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{socialLabel[item.platform]}</span>
            <span className="text-muted-foreground">@{item.username}</span>
          </button>
        );
      })}
    </div>
  );
}

function HeroLinks({ links }: { links: DummyLink[] }) {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className="flex w-full items-center justify-between rounded-xl border bg-background px-3 py-2 text-left text-xs shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex flex-col">
            <span className="font-medium">{link.title}</span>
            <span className="text-[11px] text-muted-foreground">
              {link.url}
            </span>
          </div>
          {typeof link.clicks === "number" ? (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {link.clicks.toLocaleString()} clicks
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function getDomain(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function PreviewCard({
  profile,
  links,
  socials,
}: {
  profile: typeof DUMMY_PROFILE;
  links: DummyLink[];
  socials: typeof DUMMY_SOCIALS;
}) {
  const avatarInitials = getInitials(profile.name);

  return (
    <PhoneFrame>
      <div className="flex flex-col items-center">
        <Avatar className="h-16 w-16 border border-border">
          <AvatarImage src="" alt={profile.name} />
          <AvatarFallback className="text-xs">{avatarInitials}</AvatarFallback>
        </Avatar>

        <div className="mt-3 flex flex-col items-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active link-in-bio
          </div>
          <h2 className="mt-1 max-w-[180px] truncate text-sm font-semibold">
            {profile.name}
          </h2>
          <p className="mt-1 line-clamp-2 max-w-[200px] text-center text-[11px] text-muted-foreground">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {socials
          .filter((s) => s.is_active)
          .map((s) => {
            const Icon = platformIcon[s.platform];
            return (
              <button
                key={s.id}
                type="button"
                className="inline-flex items-center gap-1 rounded-full border bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                <Icon className="h-3 w-3" />
                <span>{socialLabel[s.platform]}</span>
              </button>
            );
          })}
      </div>

      <div className="mt-4 space-y-2">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            className="block w-full rounded-2xl bg-primary px-3 py-2 text-left text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">{link.title}</span>
              <span className="text-[10px] text-primary-foreground/80">
                {getDomain(link.url)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground">
          instacard.app/{profile.handle}
        </span>
      </div>
    </PhoneFrame>
  );
}

function FeatureIcon({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
  );
}

function StatChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600">
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {label}
    </span>
  );
}

export default function LandingPage() {
  const { theme, toggle } = useThemeToggle();
  const [activeTab, setActiveTab] =
    React.useState<(typeof heroTabs)[number]["id"]>("creators");

  const heroSubtitle =
    activeTab === "creators"
      ? "Turn your bio link into a mini landing page that feels like you."
      : activeTab === "businesses"
      ? "Give your clients one clear place to see what you do and how to work with you."
      : "Share your work, services, and launches with a link that actually converts.";

  return (
    <main className="bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <LinkIcon className="h-4 w-4 text-primary" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Instacard
              </span>
              <span className="text-xs text-muted-foreground">
                One link, built to convert.
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs text-muted-foreground sm:flex">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              className="cursor-pointer rounded-full text-xs sm:text-sm"
              asChild
            >
              <Link href="/login">
                <span className="hidden sm:inline">Go to dashboard</span>
                <span className="inline sm:hidden">Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-10 sm:px-6 md:flex-row md:items-center md:gap-12 md:pb-16 md:pt-14 lg:px-8 lg:pb-20 lg:pt-18">
          <div className="flex-1 space-y-4">
            <HeroBadge />

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                One link that feels like a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    mini website
                  </span>
                  <span className="absolute -inset-1 rounded-full bg-primary/10 blur-md" />
                </span>
                — not a list of buttons.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Instacard helps you build a beautiful, conversion-ready link in
                bio that actually looks and feels like your brand — without
                needing a designer or a dev.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 p-1 text-xs">
              {heroTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "rounded-full px-3 py-1 transition",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="cursor-pointer rounded-full text-sm"
                asChild
              >
                <Link href="/login">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted/70">
                  <Heart className="h-3.5 w-3.5" />
                </span>
                <span>Designed for real-world creators & small brands</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
              <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-2.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>No code, no card required to start</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-2.5 py-1">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>Set up your page in under 10 minutes</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.12),_transparent_60%)]" />

              <div className="relative flex items-center justify-center">
                <PreviewCard
                  profile={DUMMY_PROFILE}
                  links={DUMMY_LINKS}
                  socials={DUMMY_SOCIALS}
                />
              </div>

              <div className="pointer-events-none absolute -bottom-5 left-1/2 hidden -translate-x-1/2 sm:block">
                <QrBadge />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-b bg-background px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:gap-10">
          <div className="max-w-sm space-y-3">
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 bg-primary/5 text-[11px] font-medium text-primary"
            >
              <Sparkles className="mr-1.5 h-3 w-3" />
              Why Instacard
            </Badge>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Not just “another link in bio” — a tiny, focused landing page.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Stop cramming everything into a long list of generic buttons. With
              Instacard, every section is designed to guide visitors toward the
              actions that matter most.
            </p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>
                  Highlight a few key links, not everything you’ve ever made.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>
                  Route social traffic to your portfolio, services, or products.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Stay on brand with clean, focused layouts.</span>
              </li>
            </ul>
          </div>

          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <FeatureIcon icon={LinkIcon} />
                <div>
                  <CardTitle className="text-sm">
                    Links that feel intentional
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Group your most important destinations into a layout that
                    makes sense at a glance.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <HeroLinks links={dummyHeroLinks} />
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                <StatChip label="Clients are 2–3x more likely to click a clear next step." />
              </CardFooter>
            </Card>

            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <FeatureIcon icon={FaInstagram} />
                <div>
                  <CardTitle className="text-sm">
                    All your socials, one clean row
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Show people exactly where to follow & connect — without
                    cluttering your page.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <SocialPills socials={dummySocials} />
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                <StatChip label="Make it easy for your best followers to find you everywhere." />
              </CardFooter>
            </Card>

            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <FeatureIcon icon={ShieldCheck} />
                <div>
                  <CardTitle className="text-sm">
                    Built to feel premium
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Thoughtful spacing, typography, and hierarchy — so your link
                    in bio doesn’t feel like an afterthought.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    Clean, modern layouts
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    Mobile-first design
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    Works with your brand
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                Your Instacard feels like a tiny branded website — not a generic
                list.
              </CardFooter>
            </Card>

            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <FeatureIcon icon={Zap} />
                <div>
                  <CardTitle className="text-sm">
                    Set up in minutes, not hours
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Start from a sensible default, then tweak your content as
                    you go — no overthinking.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Add your main links and socials in one place.</li>
                  <li>• Reorder and refine as your focus changes.</li>
                  <li>• Share one URL everywhere.</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                Most people publish a polished Instacard in under 10 minutes.
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-b bg-muted/40 px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/5 text-[11px] font-medium text-primary"
              >
                Simple steps
              </Badge>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                From “what do I even link?” to “this feels like my brand” in 3
                steps.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                No complex setup, no endless configuration. Just the essentials,
                arranged in a way that makes sense for visitors.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl border bg-card/80">
              <CardHeader className="space-y-3 pb-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  1
                </div>
                <div>
                  <CardTitle className="text-sm">Add your essentials</CardTitle>
                  <CardDescription className="text-xs">
                    Start with the links and socials that matter most — your
                    portfolio, services, store, and one or two key channels.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Portfolio or main website</li>
                  <li>• Booking / contact</li>
                  <li>• One core social platform</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                You can always add more later, but start with the main path.
              </CardFooter>
            </Card>

            <Card className="rounded-2xl border bg-card/80">
              <CardHeader className="space-y-3 pb-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  2
                </div>
                <div>
                  <CardTitle className="text-sm">Arrange for clarity</CardTitle>
                  <CardDescription className="text-xs">
                    Order your links by priority, not chronology. Put the “most
                    likely to help your goals” link at the very top.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Lead with your primary offer</li>
                  <li>• Group related destinations</li>
                  <li>• Keep secondary items lower</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                Your Instacard should answer “What do you want visitors to do
                first?” clearly.
              </CardFooter>
            </Card>

            <Card className="rounded-2xl border bg-card/80">
              <CardHeader className="space-y-3 pb-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  3
                </div>
                <div>
                  <CardTitle className="text-sm">
                    Share once, reuse everywhere
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Drop your Instacard link into your social bios, email
                    footer, and anywhere else you show up online.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-3">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Instagram, TikTok, X bios</li>
                  <li>• YouTube descriptions</li>
                  <li>• Email signatures & QR codes</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0 text-[11px] text-muted-foreground">
                One link that stays consistent, even as your focus evolves.
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section
        id="templates"
        className="border-b bg-background px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/5 text-[11px] font-medium text-primary"
              >
                Layouts that just work
              </Badge>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                A layout for each kind of creator — no overthinking required.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Whether you’re a solo creator, a small team, or running a
                studio, you can start from a template that already matches how
                you work.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="space-y-2 pb-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-2.5 py-1 text-[11px]">
                  <FaInstagram className="h-3.5 w-3.5" />
                  <span>Creators & educators</span>
                </div>
                <CardTitle className="text-sm">
                  “Hub for everything I do”
                </CardTitle>
                <CardDescription className="text-xs">
                  Perfect if you publish content regularly and want to send
                  people to your best, most current work.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 pb-3 text-xs text-muted-foreground">
                <p>🧩 Ideal for:</p>
                <ul className="space-y-1">
                  <li>• Content creators</li>
                  <li>• Newsletter writers</li>
                  <li>• Online educators</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="h-8 w-full cursor-pointer rounded-full text-xs"
                >
                  Use this layout
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="space-y-2 pb-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-2.5 py-1 text-[11px]">
                  <FaLinkedin className="h-3.5 w-3.5" />
                  <span>Freelancers & small teams</span>
                </div>
                <CardTitle className="text-sm">
                  “Client-ready one-pager”
                </CardTitle>
                <CardDescription className="text-xs">
                  A clean, professional layout that feels like a one-page
                  website — perfect for pitching services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 pb-3 text-xs text-muted-foreground">
                <p>🧩 Ideal for:</p>
                <ul className="space-y-1">
                  <li>• Freelancers & consultants</li>
                  <li>• Small studios & agencies</li>
                  <li>• Service business owners</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="h-8 w-full cursor-pointer rounded-full text-xs"
                >
                  Use this layout
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col rounded-2xl border bg-card/80">
              <CardHeader className="space-y-2 pb-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-2.5 py-1 text-[11px]">
                  <FaGithub className="h-3.5 w-3.5" />
                  <span>Builders & makers</span>
                </div>
                <CardTitle className="text-sm">“Ship log” view</CardTitle>
                <CardDescription className="text-xs">
                  Showcase your projects, experiments, and changelogs — ideal if
                  you’re always building something new.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 pb-3 text-xs text-muted-foreground">
                <p>🧩 Ideal for:</p>
                <ul className="space-y-1">
                  <li>• Indie hackers</li>
                  <li>• Product builders</li>
                  <li>• Engineers & tinkerers</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="h-8 w-full cursor-pointer rounded-full text-xs"
                >
                  Use this layout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden rounded-3xl border bg-background/80 shadow-sm">
            <CardContent className="relative space-y-6 px-6 py-8 sm:px-10 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.12),_transparent_60%)]" />
              <div className="relative space-y-3 text-center">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Ready to turn visitors into customers?
                </h3>
                <p className="max-w-2xl text-muted-foreground">
                  Sign up in seconds, and publish a world-class link-in-bio
                  today. No code, no design skills, no overthinking.
                </p>
              </div>
              <div className="relative flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer rounded-full text-sm"
                >
                  <Link href="/login">
                    Get started free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required. Just bring your links.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10 lg:px-16">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Instacard. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
