"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  LinkIcon,
  LineChart,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  // Content sources (easy to maintain)
  const socialProof = ["Creator", "Coach", "Agency", "Designer", "Developer"];

  const features = [
    {
      icon: <LinkIcon className="h-5 w-5" />,
      title: "Beautiful link blocks",
      desc: "Buttons, cards, and grids styled with shadcn/ui and your amethyst haze accent.",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Actionable analytics",
      desc: "See clicks by link, device, and country with privacy‑friendly tracking.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Privacy‑first",
      desc: "Own your data. Export at any time. No invasive tracking.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Blazing fast",
      desc: "Optimized Next.js + Tailwind. Lighthouse‑friendly out of the box.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Themes & branding",
      desc: "Tune typography, radii, and accents with tweakcn in minutes.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "One‑click setup",
      desc: "Sign in and publish your page in under 60 seconds.",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Create your profile",
      desc: "Add avatar, bio, and choose the amethyst haze theme.",
    },
    {
      step: 2,
      title: "Drop your links",
      desc: "Paste URLs or usernames. Reorder with drag & drop.",
    },
    {
      step: 3,
      title: "Share everywhere",
      desc: "Use your unique link on Instagram, TikTok, YouTube, and more.",
    },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10 lg:px-16">
          <Link href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">InstaCard</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="#features"
              className="text-muted-foreground transition hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how"
              className="text-muted-foreground transition hover:text-foreground"
            >
              How it works
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground transition hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link href="/signup" className="inline-flex items-center gap-2">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <Badge
              variant="secondary"
              className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur"
            >
              <Star className="h-3.5 w-3.5 text-primary" /> New: Theme “Amethyst
              Haze”
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
              Link‑in‑bio that actually{" "}
              <span className="text-primary">converts</span>.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground md:text-lg">
              Build a beautiful, fast profile hub for all your links. Designed
              with shadcn/ui and the “tweakcn – amethyst haze” palette so your
              brand looks premium from day one.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/signup" className="inline-flex items-center gap-2">
                  Create your InstaCard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl"
              >
                <Link href="#features">See features</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Privacy‑first
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4" /> Quick setup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LineChart className="h-4 w-4" /> Analytics built‑in
              </span>
            </div>
          </div>

          {/* Phone Preview Mock */}
          <div className="mx-auto w-full max-w-sm">
            <div className="mx-auto w-[21rem] rounded-[2rem] border bg-card p-4 shadow-lg">
              <div className="mx-auto h-[40rem] overflow-hidden rounded-[1.5rem] border bg-background">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/90 p-4 backdrop-blur">
                  <div className="inline-flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                    <div>
                      <p className="text-sm font-semibold">@yourhandle</p>
                      <p className="text-xs text-muted-foreground">
                        Creator • Jakarta
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                  >
                    Follow
                  </Button>
                </div>

                <div className="space-y-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-full rounded-xl py-6"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" /> Sample Link {i + 1}
                    </Button>
                  ))}
                  <Card className="rounded-xl border-dashed">
                    <CardContent className="flex items-center justify-between gap-4 p-4">
                      <div className="text-sm">
                        <p className="font-medium">Boost with Pro</p>
                        <p className="text-muted-foreground">
                          Custom domain • Advanced analytics
                        </p>
                      </div>
                      <Button size="sm" className="rounded-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 md:px-10 lg:px-16 pt-0 pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-6 text-sm text-muted-foreground md:grid-cols-5">
          {socialProof.map((label) => (
            <div
              key={label}
              className="flex items-center justify-center rounded-xl border bg-card/40 p-3"
            >
              <span className="tracking-wide">{label}s trust InstaCard</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to grow
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Thoughtful defaults, elegant UI, and the essentials to turn clicks
              into customers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon, title, desc }) => (
              <Card key={title} className="rounded-2xl">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Set up in three steps
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              No fuss. No fluff. Just ship.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ step, title, desc }) => (
              <Card key={step} className="rounded-2xl">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit rounded-full">
                    Step {step}
                  </Badge>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                “We switched to InstaCard and CTR jumped 28% in two weeks.”
              </h3>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Clean design, clear hierarchy, faster loads — the small things
                compound. Crafted with shadcn/ui so it feels native to your
                brand.
              </p>
              <div className="mt-6 inline-flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20" />
                <div>
                  <p className="text-sm font-medium">Aisyah Ramadhani</p>
                  <p className="text-xs text-muted-foreground">
                    Content Lead, HaloStudio
                  </p>
                </div>
              </div>
            </div>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Why creators love it</CardTitle>
                <CardDescription>
                  Top highlights from real users
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Looks
                  premium by default
                </div>
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Easy to
                  maintain
                </div>
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Genuine
                  performance gains
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full rounded-xl">
                  <Link href="/signup">Start free</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Can’t find what you’re looking for? Reach us anytime.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is there a free plan?</AccordionTrigger>
                <AccordionContent>
                  Yes. You can create and publish your InstaCard for free.
                  Upgrade anytime for advanced analytics and custom domains.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use my own domain?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Connect your custom domain on the Pro plan. We
                  guide you through DNS so it’s painless.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>
                  Yes. We follow your system preference and you can force light
                  or dark in settings. The amethyst haze theme looks great in
                  both.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 rounded-2xl border bg-gradient-to-b from-primary/5 to-transparent p-10 text-center">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ready to turn clicks into customers?
          </h3>
          <p className="max-w-2xl text-muted-foreground">
            Sign up in seconds, choose the amethyst haze theme, and ship a
            world‑class link‑in‑bio today.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/signup">Create your InstaCard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10 lg:px-16">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InstaCard. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
