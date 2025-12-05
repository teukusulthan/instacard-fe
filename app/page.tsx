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
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

const DUMMY_PROFILE = {
  name: "Instacard",
  handle: "@instacard",
  location: "Jakarta",
  bio: "A link-in-bio built for conversion—not just a list of links.",
  avatarUrl: "",
};

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
    platform: "tiktok",
    username: "instacard",
    url: "#",
    is_active: false,
  },
  {
    id: "5",
    platform: "youtube",
    username: "instacard",
    url: "#",
    is_active: false,
  },
  {
    id: "6",
    platform: "github",
    username: "instacard",
    url: "#",
    is_active: true,
  },
];

const DUMMY_LINKS: {
  id: string;
  title: string;
  description?: string;
  href: string;
  clicks: number;
}[] = [
  {
    id: "1",
    title: "Product Landing Page",
    description: "Learn how Instacard helps you convert more visitors.",
    href: "#",
    clicks: 1289,
  },
  {
    id: "2",
    title: "Creator Case Studies",
    description: "Real stories from creators who grew with Instacard.",
    href: "#",
    clicks: 987,
  },
  {
    id: "3",
    title: "Pricing & Features",
    description: "Compare plans and choose what fits your workflow.",
    href: "#",
    clicks: 763,
  },
  {
    id: "4",
    title: "Join the Community",
    description: "Connect with other creators and share best practices.",
    href: "#",
    clicks: 542,
  },
];

const PLATFORM_ICON: Record<SocialPlatform, React.ReactNode> = {
  instagram: <FaInstagram className="h-4 w-4 text-pink-500" />,
  tiktok: <FaTiktok className="h-4 w-4" />,
  linkedin: <FaLinkedin className="h-4 w-4 text-sky-600" />,
  youtube: <FaYoutube className="h-4 w-4 text-red-500" />,
  github: <FaGithub className="h-4 w-4" />,
  x: <FaXTwitter className="h-4 w-4" />,
};

function useThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("theme")) as "light" | "dark" | null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next);
      }
      return next;
    });
  }, []);

  return { theme, toggle };
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
        "relative mx-auto h-[540px] w-[280px] rounded-[40px] border bg-gradient-to-b from-background/80 to-background shadow-xl",
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

export default function LandingPage() {
  const { theme, toggle } = useThemeToggle();

  const steps = [
    {
      step: 1,
      title: "Create your Instacard",
      desc: "Set up your profile, add links, and connect your social accounts in minutes.",
    },
    {
      step: 2,
      title: "Customize to match your brand",
      desc: "Pick a layout, tune the colors, and align it with your tone of voice.",
    },
    {
      step: 3,
      title: "Share everywhere",
      desc: "Use it in your Instagram, TikTok, YouTube, and X bios—or via QR.",
    },
  ];

  const profile = DUMMY_PROFILE;
  const socials = DUMMY_SOCIALS.filter((s) => s.is_active);
  const links = DUMMY_LINKS;

  return (
    <main className="bg-background text-foreground">
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

      <section className="border-b bg-gradient-to-b from-background via-background/90 to-background/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 md:flex-row md:items-center md:py-16 lg:px-8 lg:py-20">
          <div className="w-full space-y-6 md:w-1/2">
            <Badge className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-2.5 py-1 text-[11px] font-medium">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>For creators, small brands & studios</span>
            </Badge>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn your{" "}
              <span className="inline-flex items-center gap-1">
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  one link
                </span>
                <span className="relative inline-flex h-5 w-[72px] items-center">
                  <span className="absolute inset-0 animate-pulse rounded-full bg-primary/5" />
                  <span className="relative mx-auto h-1 w-[72px] rounded-full bg-primary/40" />
                </span>
              </span>{" "}
              into more clicks, clients, and sales.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Instacard is a link-in-bio that feels like a mini landing page.
              Clean layout, priority links, and built-in analytics—so you know
              what actually converts.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="cursor-pointer rounded-full px-5 text-sm sm:px-6 sm:text-base"
                asChild
              >
                <Link href="/register">
                  Start free in 2 minutes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="cursor-pointer rounded-full text-sm text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="#how-it-works">
                  See how it works
                  <Eye className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                <span>No design skills required</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>Own your audience, not algorithms</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span>Optimized for mobile-first traffic</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-sm md:mt-0 md:w-1/2">
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_60%)] opacity-75" />
            <Card className="relative border bg-background/90 shadow-xl">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/instacard-avatar.png" alt="Instacard" />
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold leading-none">
                      {profile.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/40 bg-emerald-500/5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      Creator-ready
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile.handle} · {profile.location}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 pt-2">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {socials.map((social) => (
                    <button
                      key={social.id}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:bg-muted"
                    >
                      {PLATFORM_ICON[social.platform]}
                      <span>{social.username}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {links.map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl border bg-background px-3 py-2 text-left text-xs shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {link.title}
                        </span>
                        {link.description ? (
                          <span className="text-[11px] text-muted-foreground">
                            {link.description}
                          </span>
                        ) : null}
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {link.clicks.toLocaleString()} clicks
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-4 py-3">
                <QrBadge />
                <span className="text-[11px] text-muted-foreground">
                  Built for mobile traffic ·{" "}
                  <span className="font-medium">3x</span> faster setup vs. a
                  custom site
                </span>
              </CardFooter>
            </Card>

            <div className="pointer-events-none absolute -bottom-10 left-1/2 flex w-full -translate-x-1/2 items-center justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border bg-background/80 px-4 py-2 text-xs shadow-lg">
                <div className="inline-flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-pink-500" />
                  <span className="font-medium">
                    Loved by creators & small teams
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-muted-foreground">
                  Designed for the feeds your audience actually use.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-b bg-background/80 py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Built like a landing page, not just a list of links.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Most link-in-bio tools throw everything into one long list.
              Instacard helps you prioritize the links that matter, tell your
              story, and measure what works.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <Card
                key={step.step}
                className="border bg-background/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader>
                  <Badge className="h-6 w-6 rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                    {step.step}
                  </Badge>
                  <CardTitle className="mt-3 text-sm font-semibold sm:text-base">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            <div className="order-2 space-y-4 text-sm text-muted-foreground md:order-1 md:text-base">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-[11px] font-medium">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Designed for conversion</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                Give each visitor a clear next step.
              </h3>
              <p>
                Instead of a crowded grid of buttons, Instacard lets you
                highlight key links with clear hierarchy, supporting copy, and
                simple visuals. That means less decision fatigue and more people
                doing what you want them to do—book a call, visit your store, or
                watch a key video.
              </p>
              <p>
                You decide which links appear first, which ones are “primary”,
                and which are more like secondary routes. And because everything
                is built with mobile in mind, it feels natural inside Instagram,
                TikTok, and YouTube&apos;s in-app browsers.
              </p>
            </div>

            <div className="order-1 flex justify-center md:order-2">
              <PhoneFrame>
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage
                      src="/instacard-avatar.png"
                      alt={profile.name}
                    />
                    <AvatarFallback>IC</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-semibold">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.handle} · Creator & studio owner
                    </p>
                  </div>

                  <div className="w-full space-y-2">
                    {links.slice(0, 3).map((link) => (
                      <button
                        key={link.id}
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl border bg-background px-3 py-2 text-left text-xs shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {link.title}
                          </span>
                          {link.description ? (
                            <span className="text-[11px] text-muted-foreground">
                              {link.description}
                            </span>
                          ) : null}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-emerald-500/50 bg-emerald-500/5 text-[11px] text-emerald-600 dark:text-emerald-400"
                    >
                      +28% more clicks in 2 weeks
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-sky-500/50 bg-sky-500/5 text-[11px] text-sky-600 dark:text-sky-400"
                    >
                      3x faster to set up
                    </Badge>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background/90 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            <div className="order-2 space-y-4 text-sm text-muted-foreground md:order-1 md:text-base">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-[11px] font-medium">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>Own your data & audience</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                Built with privacy & control in mind.
              </h3>
              <p>
                Instacard doesn&apos;t run ads on top of your traffic or flood
                your visitors with distractions. It&apos;s your page, your
                links, and your data. You decide what to show and where people
                go next.
              </p>
              <p>
                Use basic analytics to see which links perform best, then refine
                over time. Think of it as an always-on, always-updating mini
                landing page that works across every platform where you share
                your link.
              </p>
            </div>

            <div className="order-1 flex justify-center md:order-2">
              <Card className="w-full max-w-md border bg-background/95 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">
                    See what&apos;s working, quickly.
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Simple analytics for creators and small teams who want
                    signal, not noise.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border bg-muted/60 px-3 py-2 text-xs">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        Top link this week
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Product Landing Page
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      +32% vs last week
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="rounded-lg border bg-muted/60 px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">
                        Weekly clicks
                      </p>
                      <p className="mt-1 text-lg font-semibold">4,382</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        +18% vs last week
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/60 px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">
                        Top source
                      </p>
                      <p className="mt-1 text-lg font-semibold">Instagram</p>
                      <p className="text-[11px] text-muted-foreground">
                        63% of traffic
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/60 px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">
                        Avg. CTR
                      </p>
                      <p className="mt-1 text-lg font-semibold">9.4%</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        +2.1 pts
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-4 py-3">
                  <span className="text-[11px] text-muted-foreground">
                    Works with your existing analytics tools.
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer rounded-full text-[11px]"
                  >
                    View details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            <div className="space-y-4 text-sm text-muted-foreground md:text-base">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-[11px] font-medium">
                <Heart className="h-3 w-3 text-pink-500" />
                <span>Made for real creators & teams</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                “After using Instacard, our CTR jumped 28% in two weeks.”
              </h3>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Clean design, clear hierarchy, and fast performance. Those are
                the small things that make a real impact on sales.
              </p>
              <div className="mt-6 inline-flex items-center gap-3">
                <Avatar className="h-16 w-16 ring-2 ring-border bg-muted">
                  <AvatarImage src="/ricat.jpg" alt={profile.name} />
                  <AvatarFallback className="text-muted-foreground font-medium">
                    IC
                  </AvatarFallback>
                </Avatar>
                <div className="pl-2">
                  <p className="text-md font-medium">Alvin Rikardo</p>
                  <p className="text-sm text-muted-foreground">
                    Content Lead, WGN Studio
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md space-y-4 rounded-2xl border bg-muted/70 p-4 text-xs text-muted-foreground shadow-sm sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    Who this works best for
                  </span>
                  <Badge className="h-5 rounded-full px-2 text-[10px]">
                    Creator-first
                  </Badge>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-foreground">
                        Solo creators & freelancers
                      </p>
                      <p>
                        Designers, devs, editors, and consultants who need a
                        clean way to share their work and offers.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-foreground">
                        Small studios & agencies
                      </p>
                      <p>
                        Teams that work across multiple platforms and want a
                        single, consistent entry point.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-foreground">
                        Product & course creators
                      </p>
                      <p>
                        People who ship things regularly and want to highlight
                        launches without rebuilding a full site each time.
                      </p>
                    </div>
                  </li>
                </ul>
                <Separator />
                <p className="text-[11px] text-muted-foreground">
                  If you&apos;re tired of link pages that feel like static link
                  dumps, Instacard gives you something closer to a living
                  landing page—without the overhead of a full site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/70 px-3 py-1 text-[11px] text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-pink-500" />
            <span>Ready when you are</span>
          </div>
          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Your audience is already clicking your link.
            <br className="hidden sm:block" />
            Make sure it leads somewhere worth visiting.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Set up your Instacard once, refine over time, and keep sending
            people to a link that actually reflects what you&apos;re building.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="cursor-pointer rounded-full px-6 text-sm sm:text-base"
              asChild
            >
              <Link href="/register">
                Start free in 2 minutes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="cursor-pointer rounded-full text-sm text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/login">Already have an account? Log in</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
