import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, TrendingUp } from "lucide-react";
import { MarketingShell } from "./components/layout/marketing-shell";
import { ScrollReveal } from "./components/landing/scroll-reveal";

const IMG = {
  hero:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
  features:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85&auto=format&fit=crop",
  howItWorks:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85&auto=format&fit=crop",
  pricing:
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=85&auto=format&fit=crop",
} as const;

const exploreLinks = [
  {
    href: "/features" as Route,
    title: "Features",
    blurb: "Dashboards, budgets, alerts, and analytics in one calm workspace.",
    image: IMG.features,
    alt: "Laptop showing financial charts and analytics",
    tag: "Product",
    tagStyle: {
      color: "#38bdf8",
      background: "rgba(56,189,248,0.12)",
      borderColor: "rgba(56,189,248,0.3)",
    },
  },
  {
    href: "/how-it-work" as Route,
    title: "How it works",
    blurb: "From signup to your first insight—three quick steps, no jargon.",
    image: IMG.howItWorks,
    alt: "Organizing receipts and planning a budget",
    tag: "Flow",
    tagStyle: {
      color: "#fbbf24",
      background: "rgba(251,191,36,0.12)",
      borderColor: "rgba(251,191,36,0.3)",
    },
  },
  {
    href: "/pricing" as Route,
    title: "Pricing",
    blurb: "Free to start, Premium when you want the full toolkit.",
    image: IMG.pricing,
    alt: "Coins stacked representing savings",
    tag: "Plans",
    tagStyle: {
      color: "#94a3b8",
      background: "rgba(148,163,184,0.1)",
      borderColor: "rgba(148,163,184,0.25)",
    },
  },
];

export default function LandingPage() {
  return (
    <MarketingShell>
      <section className="relative z-[1] mx-auto max-w-6xl px-4 pt-36 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up mb-5 flex justify-center lg:justify-start">
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-body font-bold uppercase tracking-widest"
                style={{
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.12)",
                  borderColor: "rgba(74,222,128,0.3)",
                }}
              >
                Built for clarity, not clutter
              </span>
            </div>
            <h1
              className="animate-fade-up-1 mb-6 font-display text-[clamp(34px,7vw,64px)] font-extrabold leading-[1.08] tracking-[-1.5px] sm:tracking-[-2px]"
              style={{
                background:
                  "linear-gradient(135deg, #f1f5f9 0%, #f1f5f9 45%, #4ade80 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your money,
              <br />
              finally making sense.
            </h1>
            <p className="animate-fade-up-2 mx-auto mb-8 max-w-lg text-[15px] leading-relaxed text-muted sm:text-[17px] lg:mx-0">
              Track income, expenses, and budgets across accounts. See patterns,
              catch drift early, and celebrate savings—without spreadsheet
              fatigue.
            </p>
            <div className="animate-fade-up-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-8"
              >
                Start for free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-muted lg:justify-start">
                <Link
                  href={"/features" as Route}
                  className="no-underline transition-colors hover:text-brand"
                >
                  Features
                </Link>
                <span className="text-dim" aria-hidden>
                  ·
                </span>
                <Link
                  href={"/how-it-work" as Route}
                  className="no-underline transition-colors hover:text-brand"
                >
                  How it works
                </Link>
                <span className="text-dim" aria-hidden>
                  ·
                </span>
                <Link
                  href={"/pricing" as Route}
                  className="no-underline transition-colors hover:text-brand"
                >
                  Pricing
                </Link>
              </div>
            </div>
            <p className="animate-fade-up-4 mt-6 text-[12px] text-dim">
              Join 12,000+ Nigerians who track their money with WealthWise
            </p>
          </div>

          <div className="animate-fade-up-2 relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(74,222,128,0.15), transparent 65%)",
              }}
            />
            <div className="landing-hero-ring relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-base shadow-glow">
              <Image
                src={IMG.hero}
                alt="Financial analytics dashboard on a screen"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-base/80 bg-[rgba(6,10,18,0.85)] px-3 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(74,222,128,0.15)] text-brand">
                  <TrendingUp className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <div className="truncate text-[13px] font-semibold text-text">
                    Live cash-flow pulse
                  </div>
                  <div className="text-[11px] text-dim">
                    See income, spend, and savings in one glance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="animate-float relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-base bg-transparent p-4 shadow-glow sm:p-6">
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Net Worth", "₦1,284,500", "+12.4%", true],
                ["Income", "₦420,000", "+20%", true],
                ["Expenses", "₦178,000", "-26%", false],
                ["Savings", "₦242,000", "57.6%", true],
              ] as const
            ).map(([label, value, change, up]) => (
              <div
                key={label}
                className="rounded-2xl border border-base bg-input p-4"
              >
                <div className="mb-1.5 text-[11px] uppercase tracking-wide text-dim">
                  {label}
                </div>
                <div className="mb-1 font-display text-[18px] font-extrabold text-text">
                  {value}
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${up ? "bg-[rgba(74,222,128,0.15)] text-brand" : "bg-[rgba(248,113,113,0.15)] text-danger"}`}
                >
                  {up ? "↑" : "↓"} {change}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-input">
            <div
              className="animate-landing-progress h-full rounded-full gradient-brand"
              style={{ width: "42%" }}
            />
          </div>
          <div className="mt-2 text-[12px] text-dim">
            Food budget: ₦42,000 / ₦60,000 used
          </div>
        </div>
      </div>

      <ScrollReveal>
        <section className="relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{
                color: "#38bdf8",
                background: "rgba(56,189,248,0.12)",
                borderColor: "rgba(56,189,248,0.3)",
              }}
            >
              Explore
            </span>
            <h2 className="mt-4 font-display text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight">
              Go deeper when you are ready
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
              Full write-ups live on their own pages—here is a visual peek and a
              shortcut.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {exploreLinks.map(
              ({ href, title, blurb, image, alt, tag, tagStyle }) => (
                <Link
                  key={title}
                  href={href}
                  className="landing-card group block overflow-hidden rounded-2xl border border-base bg-transparent no-underline"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
                    <span
                      className="absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={tagStyle}
                    >
                      {tag}
                    </span>
                  </div>
                  <div className="p-5 pt-4">
                    <h3 className="mb-2 font-display text-[18px] font-bold text-text">
                      {title}
                    </h3>
                    <p className="mb-4 text-[14px] leading-relaxed text-muted">
                      {blurb}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-base bg-input/20 p-6 shadow-glow sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-3 text-center lg:mb-10 lg:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    color: "#a78bfa",
                    background: "rgba(167,139,250,0.12)",
                    borderColor: "rgba(167,139,250,0.35)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Coming soon · Premium
                </span>
              </div>
              <h2 className="font-display text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight">
                AI that reads your habits—not your bank password
              </h2>
              <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-muted lg:mx-0">
                A Premium-only assistant will surface patterns in spending,
                compare months, and suggest small savings moves based on your
                own data. Built for nudges, not noise.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
              <ul className="space-y-4 text-[14px] leading-relaxed text-muted">
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-brand">✓</span>
                  <span>
                    Plain-language summaries of where cash leaked last month vs.
                    your averages.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-brand">✓</span>
                  <span>
                    Category-level flags before a budget line breaks—think
                    early warning, not guilt trips.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-brand">✓</span>
                  <span>
                    Optional &quot;what if&quot; savings tweaks sized to your
                    actual flows.
                  </span>
                </li>
              </ul>

              <div className="landing-ai-glow relative rounded-2xl border border-base bg-card/90 p-4 backdrop-blur-sm sm:p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-base pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(74,222,128,0.12)] text-brand">
                    <Bot className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <div className="font-display text-[15px] font-bold text-text">
                      WealthWise AI
                    </div>
                    <div className="text-[11px] text-dim">
                      Preview · Not financial advice
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-base bg-input/60 p-3.5 text-[13px] leading-snug text-muted">
                    <span className="font-semibold text-brand">Insight</span> —
                    Food spend is trending 18% above your 3-month average. A
                    weekly cap could steady the line.
                  </div>
                  <div className="rounded-xl border border-base bg-input/60 p-3.5 text-[13px] leading-snug text-muted">
                    <span className="font-semibold text-sky">Suggestion</span>{" "}
                    — Shifting ₦5,000/week into savings would reach your target
                    about two weeks sooner.
                  </div>
                  <div className="rounded-xl border border-dashed border-base/80 bg-bg/40 p-3 text-center text-[12px] text-dim">
                    Rolling out to Premium members—get notified at launch.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/register"
                className="inline-flex rounded-xl px-6 py-3 text-[14px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90"
              >
                Join the waitlist via free account
              </Link>
              <Link
                href={"/pricing" as Route}
                className="rounded-xl border border-base bg-transparent px-6 py-3 text-[14px] font-semibold text-muted no-underline transition-all hover:bg-input"
              >
                Compare plans
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-[1] mx-auto mb-24 max-w-4xl px-4 text-center sm:mb-28 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-base bg-input/15 px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-extrabold tracking-tight">
              Ready to see the full picture?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
              Create a free account in under a minute—no card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90"
              >
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-base px-6 py-3.5 text-[15px] font-semibold text-muted no-underline transition-all hover:bg-input"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </MarketingShell>
  );
}
