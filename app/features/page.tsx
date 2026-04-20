import { Route } from "next";
import Link from "next/link";
import { MarketingShell } from "../components/layout/marketing-shell";
import { features } from "../lib/data";

const deviceExperience = [
  {
    title: "Small devices",
    desc: "Essential metrics are stacked first, forms stay short, and actions remain thumb-friendly so users can log transactions quickly on any phone.",
  },
  {
    title: "Medium devices",
    desc: "Cards shift into balanced two-column layouts, giving more context without clutter so users can review spending and budgets side by side.",
  },
  {
    title: "Large devices",
    desc: "Expanded visualizations, wider tables, and richer comparisons make deep financial analysis easier on laptops and desktop screens.",
  },
];

const featureOutcomes = [
  "Stop guessing where your money goes each month.",
  "Catch budget drift before it turns into overspending.",
  "Measure growth in savings with clear progress trends.",
  "Track every account in one secure, organized workspace.",
];

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <section className="relative z-[1] mx-auto max-w-4xl px-4 pt-40 pb-14 text-center sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36">
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{
            color: "#38bdf8",
            background: "rgba(56,189,248,0.12)",
            borderColor: "rgba(56,189,248,0.3)",
          }}
        >
          Features
        </span>
        <h1 className="mt-4 font-display text-[clamp(30px,6vw,54px)] font-extrabold leading-[1.1] tracking-tight">
          Every tool you need
          <br />
          to stay ahead of your money
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          WealthWise combines transaction tracking, category budgeting, account
          visibility, and analytics into one clean workflow built for daily use.
        </p>
      </section>

      <section className="relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon, title, desc }, idx) => (
            <article
              key={title}
              className="rounded-2xl border border-base bg-transparent p-6 transition-all duration-300 landing-card"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{icon}</span>
                <span className="rounded-lg border border-base px-2 py-1 text-[11px] font-semibold text-dim">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mb-2.5 font-display text-[18px] font-bold text-text">
                {title}
              </h2>
              <p className="text-[14px] leading-relaxed text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-base bg-input/30 p-6 sm:p-8 lg:p-10">
          <h2 className="text-center font-display text-[clamp(24px,4vw,38px)] font-extrabold tracking-tight">
            Built to be responsive on every device size
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[14px] text-muted sm:text-[15px]">
            The interface adapts naturally across smaller, medium, and larger
            screens without losing clarity or speed.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {deviceExperience.map(({ title, desc }) => (
              <article
                key={title}
                className="rounded-2xl border border-base bg-bg/40 p-5"
              >
                <h3 className="mb-2 font-display text-[18px] font-bold text-text">
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] mx-auto mb-20 max-w-6xl px-4 sm:mb-24 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-[clamp(24px,4vw,36px)] font-extrabold tracking-tight">
          What this unlocks for users
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {featureOutcomes.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-xl border border-base bg-transparent px-4 py-3 text-[14px] text-muted"
            >
              <span className="mt-0.5 shrink-0 text-brand">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href={"/register" as Route}
            className="rounded-xl px-6 py-3 text-[14px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90"
          >
            Start free
          </Link>
          <Link
            href={"/pricing" as Route}
            className="rounded-xl border border-base bg-transparent px-6 py-3 text-[14px] font-semibold text-muted no-underline transition-all hover:bg-input"
          >
            View pricing
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
